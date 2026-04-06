import React, { useState } from 'react';
import { FinanceProvider, useFinance } from './context/FinanceContext';
import Sidebar from './components/Layout/Sidebar';
import Navbar from './components/Layout/Navbar';
import SummaryCards from './components/Dashboard/SummaryCards';
import MainCharts from './components/Dashboard/MainCharts';
import TransactionList from './components/Transactions/TransactionList';
import TransactionModal from './components/Transactions/TransactionModal';
import InsightsPanel from './components/Dashboard/InsightsPanel';
import { Plus } from 'lucide-react';

const DashboardContent = () => {
  const { role } = useFinance();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <main className="p-4 lg:p-10 max-w-7xl w-full mx-auto space-y-8 animate-fade-in">
        <Navbar />
        
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Overview</h2>
          {role === 'admin' && (
            <button 
              onClick={() => setIsModalOpen(true)}
              className="btn-primary"
            >
              <Plus size={20} /> Add New
            </button>
          )}
        </div>

        <SummaryCards />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 glass-card p-6 rounded-3xl">
            <MainCharts type="line" />
          </div>
          <div className="glass-card p-6 rounded-3xl">
            <MainCharts type="pie" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <InsightsPanel />
          </div>
          <div className="lg:col-span-2">
            <TransactionList />
          </div>
        </div>
      </main>

      <TransactionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default function App() {
  return (
    <FinanceProvider>
      <div className="flex bg-[#F8FAFC]">
        <Sidebar />
        <DashboardContent />
      </div>
    </FinanceProvider>
  );
}