import React from 'react';
import { useFinance } from '../../context/FinanceContext';
import { ArrowUpRight, ArrowDownRight, Wallet, TrendingUp, CreditCard } from 'lucide-react';

export default function SummaryCards() {
  const { totals } = useFinance();

  const cards = [
    { title: 'Total Balance', value: totals.balance, icon: Wallet, color: 'text-blue-600', bg: 'bg-blue-50', trend: '+2.5%' },
    { title: 'Total Income', value: totals.income, icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50', trend: '+10%' },
    { title: 'Total Expenses', value: totals.expenses, icon: CreditCard, color: 'text-rose-600', bg: 'bg-rose-50', trend: '-4%' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card, i) => (
        <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div className={`${card.bg} ${card.color} p-3 rounded-xl`}>
              <card.icon size={24} />
            </div>
            <span className={`flex items-center text-xs font-bold ${card.trend.includes('+') ? 'text-green-500' : 'text-rose-500'}`}>
              {card.trend} {card.trend.includes('+') ? <ArrowUpRight size={14}/> : <ArrowDownRight size={14}/>}
            </span>
          </div>
          <h4 className="text-slate-500 text-sm font-medium mt-4">{card.title}</h4>
          <p className="text-2xl font-bold text-slate-900 mt-1">₹{card.value.toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}