import { ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full py-8 text-center border-t border-white/5 bg-black/40 backdrop-blur-sm z-10">
      <a href="https://www.linkedin.com/in/tauqeer-alam/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-sm px-4 py-2 rounded-full hover:bg-white/5">
        <span>Created by</span><span className="text-zinc-300 font-bold">Tauqeer Alam</span><ArrowRight size={14} className="-rotate-45"/>
      </a>
    </footer>
  );
};

export default Footer;