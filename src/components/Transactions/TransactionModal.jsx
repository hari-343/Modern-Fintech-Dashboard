import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';
import { CATEGORIES } from '../../data/mockData';

export default function TransactionModal({ isOpen, onClose }) {
  const { addTransaction } = useFinance();
  const [formData, setFormData] = useState({
    amount: '', category: 'Food', type: 'expense', note: '', date: new Date().toISOString().split('T')[0]
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    addTransaction({ ...formData, id: Date.now(), amount: parseFloat(formData.amount) });
    onClose();
    setFormData({ amount: '', category: 'Food', type: 'expense', note: '', date: new Date().toISOString().split('T')[0] });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h2 className="font-bold text-xl">Add Transaction</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors"><X size={20}/></button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <button type="button" onClick={() => setFormData({...formData, type: 'income'})} className={`py-3 rounded-xl font-bold transition-all ${formData.type === 'income' ? 'bg-green-600 text-white shadow-lg' : 'bg-slate-100 text-slate-500'}`}>Income</button>
            <button type="button" onClick={() => setFormData({...formData, type: 'expense'})} className={`py-3 rounded-xl font-bold transition-all ${formData.type === 'expense' ? 'bg-rose-600 text-white shadow-lg' : 'bg-slate-100 text-slate-500'}`}>Expense</button>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-400 uppercase">Amount (₹)</label>
            <input required type="number" className="w-full mt-1 p-3 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-indigo-500 text-lg font-bold" value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})} />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-400 uppercase">Category</label>
            <select className="w-full mt-1 p-3 bg-slate-50 rounded-xl border-none" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-400 uppercase">Description</label>
            <input required type="text" className="w-full mt-1 p-3 bg-slate-50 rounded-xl border-none" value={formData.note} onChange={(e) => setFormData({...formData, note: e.target.value})} />
          </div>

          <button type="submit" className="w-full py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all mt-4">Save Transaction</button>
        </form>
      </div>
    </div>
  );
}