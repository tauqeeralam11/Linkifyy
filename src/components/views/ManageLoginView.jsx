import { Loader2, History } from 'lucide-react';

const ManageLoginView = ({ handleLogin, manageCode, setManageCode, managePin, setManagePin, loading, history }) => {
  return (
    <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 animate-fadeIn">
      <div className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-8 h-fit">
        <h2 className="text-2xl font-bold mb-6">Dashboard Login</h2>
        <form onSubmit={(e) => handleLogin(e)} className="space-y-4">
          <div><label className="text-xs font-bold text-zinc-500 uppercase">Short Code</label>
            <input type="text" placeholder="XYZ123" className="w-full mt-2 bg-white/5 border border-white/10 rounded-xl p-4 text-white outline-none font-mono focus:border-indigo-500 transition-colors"
              value={manageCode} onChange={(e) => setManageCode(e.target.value)} />
          </div>
          <div><label className="text-xs font-bold text-zinc-500 uppercase">PIN</label>
            <input type="text" maxLength="6" placeholder="••••••" className="w-full mt-2 bg-white/5 border border-white/10 rounded-xl p-4 text-white outline-none text-center tracking-[0.5em] font-mono focus:border-indigo-500 transition-colors"
              value={managePin} onChange={(e) => setManagePin(e.target.value)} />
          </div>
          <button disabled={loading} className="w-full bg-white text-black p-4 rounded-xl font-bold hover:bg-zinc-200 shadow-lg">
            {loading ? <Loader2 className="animate-spin mx-auto"/> : 'Access Dashboard'}
          </button>
        </form>
      </div>

      <div className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-8">
          <div className="flex items-center gap-2 mb-6 text-zinc-400">
              <History size={20}/> <span className="font-bold">Recent Links</span>
          </div>
          {history.length === 0 ? (
              <p className="text-zinc-600 text-sm italic">No recent links found.</p>
          ) : (
              <div className="space-y-3 max-h-[380px] overflow-y-auto pr-2 custom-scrollbar">
                  {history.map((link, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5 hover:border-white/20 transition-colors group">
                          <div className="overflow-hidden mr-2">
                              <div className="text-indigo-400 font-mono text-sm">/{link.short_code}</div>
                              <div className="text-zinc-600 text-[10px] truncate">{link.original_url}</div>
                          </div>
                          <button onClick={() => handleLogin(null, link.short_code, link.pin)} className="bg-black border border-white/10 hover:bg-white hover:text-black text-xs px-3 py-1.5 rounded-lg font-bold text-zinc-400 transition-all">
                              Manage
                          </button>
                      </div>
                  ))}
              </div>
          )}
      </div>
    </div>
  );
};

export default ManageLoginView;