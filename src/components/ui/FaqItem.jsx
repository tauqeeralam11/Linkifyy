import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FaqItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-white/10 last:border-0">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center py-4 text-left hover:text-white transition-colors text-zinc-400">
                <span className="font-medium">{question}</span>
                <ChevronDown className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} size={16}/>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-40 opacity-100 pb-4' : 'max-h-0 opacity-0'}`}>
                <p className="text-zinc-500 text-sm leading-relaxed">{answer}</p>
            </div>
        </div>
    );
};

export default FaqItem;