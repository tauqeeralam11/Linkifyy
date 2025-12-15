import { useState, useEffect } from 'react';
import { useUrlShortener } from './hooks/useUrlShortener';
import { supabase } from './supabaseClient';
import { Loader2 } from 'lucide-react';
import Toast from './components/ui/Toast';
import FaqItem from './components/ui/FaqItem';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CreateLinkView from './components/views/CreateLinkView';
import SuccessView from './components/views/SuccessView';
import ManageLoginView from './components/views/ManageLoginView';
import DashboardView from './components/views/DashboardView';

function App() {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const { handleRedirect, createShortUrl, getLinkDetails, deleteLink, updateLink, loading, history } = useUrlShortener();

  const [activeTab, setActiveTab] = useState(() => sessionStorage.getItem('linkify_tab') || 'create');
  const [dashboardData, setDashboardData] = useState(() => JSON.parse(sessionStorage.getItem('linkify_dashboard') || 'null'));
  const [urlInput, setUrlInput] = useState('');
  const [customAlias, setCustomAlias] = useState('');
  const [manageCode, setManageCode] = useState('');
  const [managePin, setManagePin] = useState('');
  const [analytics, setAnalytics] = useState({ mobile: 0, tablet: 0, desktop: 0 });
  const [editUrl, setEditUrl] = useState('');
  const [editAlias, setEditAlias] = useState('');
  const [newLink, setNewLink] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'success') => setToast({ message: msg, type });

  useEffect(() => { sessionStorage.setItem('linkify_tab', activeTab); }, [activeTab]);
  useEffect(() => {
    if (dashboardData) sessionStorage.setItem('linkify_dashboard', JSON.stringify(dashboardData));
    else sessionStorage.removeItem('linkify_dashboard');
  }, [dashboardData]);

  useEffect(() => {
    const path = window.location.pathname.substring(1);
    if (path && path !== 'create' && path !== 'manage') {
        setIsRedirecting(true);
        handleRedirect(path).then((res) => {
            if (res.success) window.location.href = res.url;
            else setIsRedirecting(false);
        });
    }
  }, []);

  const refreshAnalytics = async () => {
    if (!dashboardData) return;
    const { data: urlData } = await supabase.from('urls').select('visit_count').eq('id', dashboardData.id).single();
    if (urlData) setDashboardData(prev => ({ ...prev, visit_count: urlData.visit_count }));

    const { data: clicks } = await supabase.from('clicks').select('device').eq('url_id', dashboardData.id);
    const stats = { mobile: 0, desktop: 0, tablet: 0 };
    clicks?.forEach(c => {
        if(c.device === 'Mobile') stats.mobile++;
        else if(c.device === 'Tablet') stats.tablet++;
        else stats.desktop++;
    });
    setAnalytics(stats);
  };

  useEffect(() => { if(dashboardData) refreshAnalytics(); }, [dashboardData?.id]);

  const handleCreate = async (e) => {
    e.preventDefault();
    const res = await createShortUrl(urlInput, customAlias);
    if (res.success) {
      setNewLink(res.data);
      setUrlInput(''); setCustomAlias('');
      showToast("Link created!");
    } else showToast(res.message, 'error');
  };

  const handleLogin = async (e, code = manageCode, pin = managePin) => {
    e?.preventDefault();
    const res = await getLinkDetails(code, pin);
    if (res.success) {
      setDashboardData(res.data);
      setAnalytics(res.stats);
      setEditUrl(res.data.original_url);
      setEditAlias(res.data.short_code);
      showToast("Dashboard accessed");
    } else showToast(res.message, 'error');
  };

  const handleUpdate = async () => {
    if (editAlias !== dashboardData.short_code && !confirm("Changing alias breaks old links. Continue?")) return;
    const res = await updateLink(dashboardData.id, editUrl, editAlias);
    if (res.success) {
        setDashboardData(prev => ({ ...prev, original_url: editUrl, short_code: editAlias }));
        showToast("Updated successfully");
    } else showToast(res.message, 'error');
  };

  const handleDelete = async () => {
      if(!confirm("Are you sure? This action cannot be undone.")) return;
      const res = await deleteLink(dashboardData.id);
      if(res.success) {
          setDashboardData(null);
          showToast("Link deleted successfully");
      } else {
          showToast(res.message, 'error');
      }
  };

  const handleLogout = () => {
      setDashboardData(null);
      sessionStorage.removeItem('linkify_dashboard');
  };

  if (isRedirecting) return <div className="min-h-screen bg-black flex items-center justify-center text-white"><Loader2 className="animate-spin text-indigo-500" size={48} /></div>;

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 font-sans flex flex-col relative overflow-hidden selection:bg-indigo-500/30">
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #333 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      <div className="fixed top-0 left-0 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none z-0"></div>

      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} setDashboardData={setDashboardData} setNewLink={setNewLink} />

      <main className="flex-1 flex flex-col items-center pt-32 px-4 pb-20 relative z-10 w-full max-w-4xl mx-auto">
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

        {activeTab === 'create' && !newLink && (
          <CreateLinkView 
            urlInput={urlInput} setUrlInput={setUrlInput} 
            customAlias={customAlias} setCustomAlias={setCustomAlias} 
            handleCreate={handleCreate} loading={loading} 
          />
        )}

        {activeTab === 'create' && newLink && (
          <SuccessView newLink={newLink} setNewLink={setNewLink} showToast={showToast} />
        )}

        {activeTab === 'manage' && !dashboardData && (
          <ManageLoginView 
            handleLogin={handleLogin} 
            manageCode={manageCode} setManageCode={setManageCode} 
            managePin={managePin} setManagePin={setManagePin} 
            loading={loading} history={history} 
          />
        )}

        {activeTab === 'manage' && dashboardData && (
          <DashboardView 
            dashboardData={dashboardData} setDashboardData={setDashboardData}
            analytics={analytics} refreshAnalytics={refreshAnalytics}
            handleLogout={handleLogout}
            editUrl={editUrl} setEditUrl={setEditUrl}
            editAlias={editAlias} setEditAlias={setEditAlias}
            handleUpdate={handleUpdate} handleDelete={handleDelete}
            loading={loading}
          />
        )}

        <div className="w-full max-w-2xl mt-20 mb-10 border-t border-white/10 pt-10">
            <h3 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h3>
            <div className="space-y-2">
                <FaqItem question="Is Linkifyy free to use?" answer="Yes, Linkifyy is completely free for personal and commercial use. You can create unlimited links." />
                <FaqItem question="Do links expire?" answer="No, your links will remain active indefinitely unless you choose to delete them or update them." />
                <FaqItem question="Can I track my link's performance?" answer="Absolutely. Our dashboard provides real-time analytics including total clicks and device breakdowns (Mobile vs Desktop)." />
                <FaqItem question="What happens if I lose my PIN?" answer="For security reasons, we cannot recover PINs. We recommend saving your PIN or checking the 'Recent Links' section on the device you used to create the link." />
            </div>
        </div>
      </main>

      <Footer />

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        .animate-fadeIn { animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-scaleIn { animation: scaleIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
      `}</style>
    </div>
  );
}

export default App;
