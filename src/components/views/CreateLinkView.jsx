import { Loader2 } from 'lucide-react';

const CreateLinkView = ({ urlInput, setUrlInput, customAlias, setCustomAlias, handleCreate, loading }) => {
  return (
    <div className="w-full flex flex-col items-center text-center animate-fadeIn">
      
      <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-zinc-600">
        Shorten links.<br/>Expand reach.
      </h1>
      <p className="text-zinc-500 text-lg mb-12 max-w-xl">
        Professional URL shortener with built-in analytics and custom branding.
      </p>

      <form onSubmit={handleCreate} className="w-full max-w-2xl space-y-4">
        <div className="relative group">
          
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500 pointer-events-none"></div>
          
          <div className="hidden sm:flex relative z-10 gap-3 bg-black border border-white/10 p-3 rounded-2xl">
              <input type="text" placeholder="Paste your long link here..." className="flex-1 bg-transparent px-6 py-4 text-white placeholder-zinc-500 outline-none text-lg"
                value={urlInput} onChange={(e) => setUrlInput(e.target.value)} />
              <button disabled={loading} className="bg-white hover:bg-zinc-200 text-black px-10 py-4 rounded-xl font-bold transition-transform active:scale-95 disabled:opacity-50">
                {loading ? <Loader2 className="animate-spin mx-auto" /> : 'Shorten'}
              </button>
          </div>

          <div className="sm:hidden flex flex-col gap-4 relative z-10">
              <div className="bg-black border border-white/10 rounded-2xl flex items-center shadow-lg">
                  <input type="text" placeholder="Paste your long link here..." className="w-full bg-transparent px-6 py-4 text-white placeholder-zinc-500 outline-none text-lg"
                      value={urlInput} onChange={(e) => setUrlInput(e.target.value)} />
              </div>
              
              <div className="bg-black border border-white/10 rounded-2xl px-6 py-4 flex items-center shadow-lg">
                  <span className="text-zinc-500 text-base font-mono shrink-0 select-none">linkify.app/</span>
                  <input type="text" placeholder="alias (optional)" className="bg-transparent flex-1 text-base text-white outline-none font-mono ml-0.5 placeholder-zinc-500"
                      value={customAlias} onChange={(e) => setCustomAlias(e.target.value.replace(/[^a-zA-Z0-9-_]/g, ''))} maxLength={20}/>
              </div>
              
              <button disabled={loading} className="w-full bg-white hover:bg-zinc-200 text-black py-4 rounded-xl font-bold transition-transform active:scale-95 disabled:opacity-50 shadow-lg shadow-white/5">
                {loading ? <Loader2 className="animate-spin mx-auto" /> : 'Shorten Link'}
              </button>
          </div>
        </div>
        
        <div className="hidden sm:flex justify-center pt-2">
           <div className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 flex items-center w-full max-w-md focus-within:border-indigo-500/50 transition-colors">
              <span className="text-zinc-500 text-base font-mono shrink-0 select-none">linkify.app/</span>
              <input type="text" placeholder="alias (optional)" className="bg-transparent flex-1 text-base text-white outline-none font-mono ml-0.5 placeholder-zinc-600"
                  value={customAlias} onChange={(e) => setCustomAlias(e.target.value.replace(/[^a-zA-Z0-9-_]/g, ''))} maxLength={20}/>
           </div>
        </div>
      </form>
    </div>
  );
};

export default CreateLinkView;
