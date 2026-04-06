import React from 'react';
import { useFinance } from '../../context/FinanceContext';
import { LayoutDashboard, Receipt, PieChart, Settings, LogOut, TrendingUp } from 'lucide-react';

const MenuItem = ({ icon: Icon, label, active }) => (
  <div className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${active ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-slate-500 hover:bg-slate-100'}`}>
    <Icon size={20} />
    <span className="font-medium">{label}</span>
  </div>
);

export default function Sidebar() {
  const { logout } = useFinance();
  return (
    <aside className="w-64 hidden lg:flex flex-col border-r border-slate-200 h-screen sticky top-0 bg-white p-6">
      <div className="flex items-center gap-2 mb-10 px-2">
        <div className="bg-indigo-600 p-2 rounded-lg text-white">
          <TrendingUp size={24} />
        </div>
        <h1 className="text-xl font-bold tracking-tight">Finance<span className="text-indigo-600">Flow</span></h1>
      </div>
      
      <nav className="flex-1 space-y-2">
        <MenuItem icon={LayoutDashboard} label="Dashboard" active />
        <MenuItem icon={Receipt} label="Transactions" />
        <MenuItem icon={PieChart} label="Reports" />
        <MenuItem icon={Settings} label="Settings" />
      </nav>

      <div className="mt-auto border-t border-slate-100 pt-6">
        <MenuItem icon={LogOut} label="Logout" />
      </div>
    </aside>
  );
}