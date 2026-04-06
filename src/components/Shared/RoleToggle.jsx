import React from 'react';
import { useFinance } from '../../context/FinanceContext';
import { ShieldCheck, Eye } from 'lucide-react';

export default function RoleToggle() {
  const { role, setRole } = useFinance();

  return (
    <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200 w-fit">
      <button 
        onClick={() => setRole('admin')}
        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
          role === 'admin' 
          ? 'bg-white text-indigo-600 shadow-sm' 
          : 'text-slate-500 hover:text-slate-700'
        }`}
      >
        <ShieldCheck size={14} />
        Admin
      </button>
      
      <button 
        onClick={() => setRole('viewer')}
        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
          role === 'viewer' 
          ? 'bg-white text-indigo-600 shadow-sm' 
          : 'text-slate-500 hover:text-slate-700'
        }`}
      >
        <Eye size={14} />
        Viewer
      </button>
    </div>
  );
}