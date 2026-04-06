import React from 'react';
import { useFinance } from '../../context/FinanceContext';
import { Search, Trash2, Filter } from 'lucide-react';

export default function TransactionList() {
  const { transactions, searchQuery, setSearchQuery, filterCategory, setFilterCategory, deleteTransaction, role } = useFinance();

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h3 className="font-bold text-lg">Recent Transactions</h3>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search notes..."
              className="pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button 
            onClick={() => setFilterCategory('All')}
            className={`p-2 rounded-xl transition-colors ${filterCategory !== 'All' ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-50 text-slate-400'}`}
          >
            <Filter size={18} />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 text-slate-500 text-xs uppercase tracking-wider">
              <th className="px-6 py-4 font-semibold">Transaction</th>
              <th className="px-6 py-4 font-semibold">Category</th>
              <th className="px-6 py-4 font-semibold">Date</th>
              <th className="px-6 py-4 font-semibold">Amount</th>
              {role === 'admin' && <th className="px-6 py-4 font-semibold">Action</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {transactions.map((t) => (
              <tr key={t.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-4">
                  <p className="font-medium text-slate-900">{t.note}</p>
                </td>
                <td className="px-6 py-4 text-sm text-slate-500">
                  <span className="px-3 py-1 bg-slate-100 rounded-full text-xs font-medium">{t.category}</span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-500">{t.date}</td>
                <td className={`px-6 py-4 font-bold ${t.type === 'income' ? 'text-green-600' : 'text-rose-600'}`}>
                  {t.type === 'income' ? '+' : '-'}₹{t.amount}
                </td>
                {role === 'admin' && (
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => deleteTransaction(t.id)}
                      className="text-slate-300 hover:text-rose-500 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        {transactions.length === 0 && (
          <div className="p-20 text-center text-slate-400">
            <p>No transactions found for your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}