import React from 'react';
import { useFinance } from '../../context/FinanceContext';
import { Sparkles, TrendingDown, Lightbulb } from 'lucide-react';

export default function InsightsPanel() {
  const { insights, totals } = useFinance();

  // Calculate savings potential based on total expenses
  const savingsPotential = (totals.expenses * 0.1).toFixed(0);

  return (
    <div className="bg-indigo-600 text-white p-8 rounded-3xl shadow-xl shadow-indigo-100 flex flex-col justify-between h-full hover:shadow-2xl transition-shadow duration-300">
      <div>
        <div className="bg-white/20 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md">
          <Sparkles size={24} className="text-indigo-100" />
        </div>
        
        <h3 className="text-2xl font-bold mb-3">Financial AI Insights</h3>
        
        <div className="space-y-4 mb-8">
          <div className="flex gap-3">
            <TrendingDown size={20} className="text-indigo-200 shrink-0 mt-1" />
            <p className="text-indigo-100 text-sm leading-relaxed">
              Your spending in <span className="font-bold text-white uppercase tracking-wider">{insights.topCategory}</span> is higher than usual this month.
            </p>
          </div>
          
          <div className="flex gap-3">
            <Lightbulb size={20} className="text-indigo-200 shrink-0 mt-1" />
            <p className="text-indigo-100 text-sm leading-relaxed">
              {insights.suggestion} 
              <br/>
              <span className="text-white font-medium italic">"Small changes lead to big growth."</span>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-auto pt-6 border-t border-white/10">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-xs uppercase font-bold tracking-widest text-indigo-200 opacity-80">Monthly Potential</p>
            <p className="text-3xl font-black mt-1 text-white">₹{savingsPotential}</p>
          </div>
          <button className="bg-white text-indigo-600 px-4 py-2 rounded-xl text-xs font-bold hover:bg-indigo-50 transition-colors">
            Optimize Now
          </button>
        </div>
      </div>
    </div>
  );
}