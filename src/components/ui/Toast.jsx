import { useEffect } from 'react';
import { X, CheckCircle } from 'lucide-react';

const Toast = ({ message, type, onClose }) => {
  useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, [onClose]);
  return (
    <div className={`fixed bottom-5 right-5 px-6 py-4 rounded-xl shadow-2xl backdrop-blur-md border animate-slideIn z-50 flex items-center gap-3 ${
      type === 'error' ? 'bg-red-500/10 border-red-500/50 text-red-200' : 'bg-emerald-500/10 border-emerald-500/50 text-emerald-200'
    }`}>
      {type === 'error' ? <X size={18}/> : <CheckCircle size={18}/>}
      <span className="font-medium text-sm">{message}</span>
    </div>
  );
};

export default Toast;