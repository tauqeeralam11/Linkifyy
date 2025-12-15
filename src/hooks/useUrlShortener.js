import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { nanoid } from 'nanoid';

export const useUrlShortener = () => {
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('linkify_history');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  const addToHistory = (linkData) => {
    const newHistory = [linkData, ...history].filter((v,i,a)=>a.findIndex(t=>(t.short_code===v.short_code))===i).slice(0, 10);
    setHistory(newHistory);
    localStorage.setItem('linkify_history', JSON.stringify(newHistory));
  };

  const removeFromHistory = (id) => {
    const newHistory = history.filter(item => item.id !== id);
    setHistory(newHistory);
    localStorage.setItem('linkify_history', JSON.stringify(newHistory));
  };

  const createShortUrl = async (originalUrl, customAlias = '') => {
    setLoading(true);
    let formattedUrl = originalUrl.trim();
    if (!formattedUrl) { setLoading(false); return { success: false, message: "Enter a valid URL" }; }
    if (!/^https?:\/\//i.test(formattedUrl)) formattedUrl = `https://${formattedUrl}`;

    const shortCode = customAlias.trim() || nanoid(6);
    if (customAlias && !/^[a-zA-Z0-9-_]+$/.test(shortCode)) {
        setLoading(false); return { success: false, message: "Invalid custom name format" };
    }

    const pin = Math.floor(100000 + Math.random() * 900000).toString();

    const { data, error } = await supabase
      .from('urls')
      .insert([{ original_url: formattedUrl, short_code: shortCode, pin: pin }])
      .select()
      .single();

    setLoading(false);
    
    if (error) {
       if (error.code === '23505') return { success: false, message: "Name already taken" };
       return { success: false, message: "Error creating link" };
    }

    addToHistory(data);
    return { success: true, data };
  };

  const getLinkDetails = async (shortCode, pin) => {
    setLoading(true);
    
    const { data: link, error } = await supabase
      .from('urls')
      .select('*')
      .eq('short_code', shortCode)
      .eq('pin', pin)
      .single();

    if (error || !link) { setLoading(false); return { success: false, message: "Invalid credentials" }; }

    const { data: clicks } = await supabase.from('clicks').select('device').eq('url_id', link.id);
    
    const stats = { mobile: 0, desktop: 0, tablet: 0 };
    clicks?.forEach(c => {
        if(c.device === 'Mobile') stats.mobile++;
        else if(c.device === 'Tablet') stats.tablet++;
        else stats.desktop++;
    });

    setLoading(false);
    return { success: true, data: link, stats };
  };

  const deleteLink = async (id) => {
      setLoading(true);
      const { error } = await supabase.from('urls').delete().eq('id', id);
      setLoading(false);
      
      if(error) return { success: false, message: "Failed to delete" };
      
      removeFromHistory(id);
      return { success: true };
  };

  const updateLink = async (id, newUrl, newShortCode) => {
    setLoading(true);
    const { error } = await supabase.from('urls').update({ original_url: newUrl, short_code: newShortCode }).eq('id', id);
    setLoading(false);
    if (error) return { success: false, message: error.code === '23505' ? "Name taken" : "Failed" };
    return { success: true };
  };

  const handleRedirect = async (shortCode) => {
    setLoading(true);
    const { data, error } = await supabase.from('urls').select('id, original_url, visit_count').eq('short_code', shortCode).single();
    if (error || !data) return { success: false };

    const ua = navigator.userAgent;
    let device = 'Desktop';
    if (/Mobi|Android/i.test(ua)) device = 'Mobile';
    if (/Tablet|iPad/i.test(ua)) device = 'Tablet';

    supabase.from('urls').update({ visit_count: (data.visit_count || 0) + 1 }).eq('id', data.id).then();
    supabase.from('clicks').insert({ url_id: data.id, device: device }).then();

    return { success: true, url: data.original_url };
  };

  return { createShortUrl, getLinkDetails, deleteLink, updateLink, handleRedirect, loading, history };
};