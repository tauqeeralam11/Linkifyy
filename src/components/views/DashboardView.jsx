import { RefreshCw, Smartphone, Monitor, Tablet, Settings, Trash2, Loader2 } from 'lucide-react';

const DashboardView = ({ 
    dashboardData, setDashboardData, analytics, refreshAnalytics, 
    handleLogout, editUrl, setEditUrl, editAlias, setEditAlias, 
    handleUpdate, handleDelete, loading 
}) => {
  return (
    <div className="w-full max-w-3xl animate-scaleIn pb-10">
      <div className="flex justify-between mb-8 bg-[#0A0A0A] border border-white/10 p-6 rounded-3xl items-center">
        <div className="flex gap-4 items-center">
           <div className="w-12 h-12 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center font-bold text-xl">{dashboardData.short_code[0].toUpperCase()}</div>
           <div>
              <h2 className="text-2xl font-bold">/{dashboardData.short_code}</h2>
              <div className="flex items-center gap-2 text-xs text-zinc-500 mt-1">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span> Active
              </div>
           </div>
        </div>
        
        <div className="flex gap-2">
          <button onClick={refreshAnalytics} className="p-2 rounded-xl bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 transition-all">
              <RefreshCw size={16} />
          </button>
          <button onClick={handleLogout} className="px-5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-zinc-400 hover:text-white hover:bg-white/10 transition-all">
              LOGOUT
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-[#0A0A0A] border border-white/10 p-6 rounded-3xl text-center">
           <div className="text-zinc-500 text-[10px] font-bold uppercase mb-2">Total Clicks</div>
           <div className="text-4xl font-black text-white">{dashboardData.visit_count}</div>
        </div>
        
        <div className="col-span-2 md:col-span-3 bg-[#0A0A0A] border border-white/10 p-6 rounded-3xl flex flex-col justify-center gap-4">
            {[
                { icon: Smartphone, label: 'Mobile', count: analytics.mobile, color: 'bg-indigo-500' },
                { icon: Monitor, label: 'Desktop', count: analytics.desktop, color: 'bg-blue-500' },
                { icon: Tablet, label: 'Tablet', count: analytics.tablet, color: 'bg-purple-500' }
            ].map((device, i) => (
              <div key={i} className="flex items-center gap-3">
                  <device.icon size={16} className="text-zinc-500"/>
                  <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                      <div style={{width: `${(device.count / (dashboardData.visit_count || 1)) * 100}%`}} className={`h-full ${device.color} transition-all duration-1000`}></div>
                  </div>
                  <span className="text-xs font-mono w-8 text-right">{device.count}</span>
              </div>
            ))}
        </div>
      </div>

      <div className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-8">
          <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-lg flex items-center gap-2 text-white"><Settings size={20} className="text-indigo-500" /> Settings</h3>
              <button onClick={handleDelete} className="text-xs bg-red-500/10 text-red-500 px-3 py-1.5 rounded-lg border border-red-500/20 hover:bg-red-500 hover:text-white transition-all flex items-center gap-1">
                  <Trash2 size={12}/> Delete Link
              </button>
          </div>
          
          <div className="space-y-6">
              <div><label className="text-xs font-bold text-zinc-500 uppercase">Destination URL</label>
                  <input type="text" className="w-full mt-2 bg-white/5 border border-white/10 rounded-xl p-4 text-zinc-200 outline-none focus:border-indigo-500 font-mono text-sm"
                      value={editUrl} onChange={(e) => setEditUrl(e.target.value)}/>
              </div>
              
              <div><label className="text-xs font-bold text-zinc-500 uppercase">Alias</label>
                  <div className="flex mt-2 bg-white/5 border border-white/10 rounded-xl p-4 items-center focus-within:border-indigo-500 transition-colors">
                      <span className="text-zinc-500 font-mono select-none">linkify.app/</span>
                      <input type="text" className="bg-transparent flex-1 text-zinc-200 outline-none font-mono ml-0.5"
                          value={editAlias} onChange={(e) => setEditAlias(e.target.value.replace(/[^a-zA-Z0-9-_]/g, ''))}/>
                  </div>
              </div>

              <button onClick={handleUpdate} disabled={loading} className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold mt-2 hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-500/20">
                  {loading ? <Loader2 className="animate-spin mx-auto"/> : 'Save Changes'}
              </button>
          </div>
      </div>
    </div>
  );
};

export default DashboardView;