import { CheckCircle, Globe, Copy } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

const SuccessView = ({ newLink, setNewLink, showToast }) => {
  return (
    <div className="w-full max-w-lg animate-scaleIn">
      <div className="bg-[#0A0A0A] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
          <div className="p-8 text-center border-b border-white/5 bg-white/5">
              <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
                  <CheckCircle size={32} className="text-emerald-500" />
              </div>
              <h2 className="text-3xl font-bold text-white">Link Ready!</h2>
          </div>

          <div className="p-8 space-y-6">
              <div className="bg-black border border-white/10 p-4 rounded-2xl flex items-center gap-3 hover:border-indigo-500/50 transition-colors">
                  <Globe className="text-zinc-600 shrink-0"/>
                  <a href={`/${newLink.short_code}`} target="_blank" className="flex-1 font-mono text-lg text-indigo-400 underline truncate">
                      linkify.app/{newLink.short_code}
                  </a>
                  <button onClick={() => {navigator.clipboard.writeText(`linkify.app/${newLink.short_code}`); showToast("Copied!")}} 
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                      <Copy className="text-zinc-400 hover:text-white" size={20}/>
                  </button>
              </div>

              <div className="bg-amber-500/5 p-4 rounded-2xl border border-amber-500/10 flex justify-between items-center">
                  <div>
                      <div className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">Ownership PIN</div>
                      <div className="text-xs text-amber-500/60">Save this to edit later</div>
                  </div>
                  <code className="text-xl font-mono font-bold text-amber-500 tracking-[0.2em]">{newLink.pin}</code>
              </div>

              <div className="flex justify-center">
                  <div className="bg-white p-6 rounded-3xl shadow-[0_0_30px_rgba(255,255,255,0.05)] w-full max-w-[250px] flex justify-center items-center">
                      <QRCodeSVG value={`https://linkify.app/${newLink.short_code}`} size={180} />
                  </div>
              </div>
          </div>

          <button onClick={() => setNewLink(null)} className="w-full py-5 text-sm font-medium text-zinc-500 hover:text-white hover:bg-white/5 transition-colors border-t border-white/5">
              Create Another Link
          </button>
      </div>
    </div>
  );
};

export default SuccessView;