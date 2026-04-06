import React from 'react';
import { Bell, Search, UserCircle, Command } from 'lucide-react';
import RoleToggle from '../Shared/RoleToggle';

export default function Navbar() {
  return (
    <header className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
      <div className="flex flex-col">
        <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">
          <span>Pages</span>
          <span>/</span>
          <span className="text-slate-900">Dashboard</span>
        </div>
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Main Dashboard</h2>
      </div>

      <div className="flex items-center gap-4 w-full md:w-auto">
        {/* Search Bar */}
        <div className="relative flex-1 md:w-64 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none text-sm shadow-sm"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden lg:flex items-center gap-1 text-[10px] font-bold text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100">
            <Command size={10} /> K
          </div>
        </div>

        {/* Role Switcher */}
        <RoleToggle />
        
        {/* Actions */}
        <div className="flex items-center gap-2 border-l border-slate-200 pl-4 ml-2">
          <button className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all relative">
            <Bell size={20} />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
          </button>
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 p-0.5 cursor-pointer hover:scale-105 transition-transform">
            <div className="h-full w-full bg-white rounded-[10px] flex items-center justify-center overflow-hidden">
              <UserCircle size={28} className="text-slate-300" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}