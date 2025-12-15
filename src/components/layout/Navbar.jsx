const Navbar = ({ activeTab, setActiveTab, setDashboardData, setNewLink }) => {
  return (
    <div className="fixed top-4 left-0 right-0 z-50 px-2 sm:px-4 flex justify-center">
      <nav className="bg-zinc-900/90 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl px-1.5 py-1.5 sm:px-2 sm:py-2 flex items-center justify-between w-full max-w-4xl">
          
          <div className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-4 cursor-pointer shrink-0" onClick={() => window.location.reload()}>
              <img src="/logo.png" alt="Logo" className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-white/10" />
              <span className="font-bold tracking-tight text-white text-base sm:text-lg">Linkify</span>
          </div>

          <div className="flex bg-black/40 rounded-full p-1 border border-white/5 shrink-0">
              {['create', 'manage'].map((tab) => (
              <button key={tab} onClick={() => { setActiveTab(tab); setDashboardData(null); setNewLink(null); }}
                  className={`px-3 py-1.5 sm:px-6 sm:py-2 rounded-full text-[10px] sm:text-xs font-bold transition-all uppercase tracking-wider ${activeTab === tab ? 'bg-white text-black' : 'text-zinc-500 hover:text-white'}`}>
                  {tab}
              </button>
              ))}
          </div>
      </nav>
    </div>
  );
};

export default Navbar;