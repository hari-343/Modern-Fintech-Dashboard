import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { initialTransactions } from '../data/mockData';

const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
  // --- 1. EXISTING DATA STATE ---
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('finance_v1');
    return saved ? JSON.parse(saved) : initialTransactions;
  });

  // --- 2. AUTH & NAVIGATION STATE ---
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('finance_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [activeTab, setActiveTab] = useState('Dashboard'); // Controls Sidebar navigation
  const [role, setRole] = useState('admin');
  const [filterCategory, setFilterCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // --- 3. PERSISTENCE PERSISTENCE ---
  useEffect(() => {
    localStorage.setItem('finance_v1', JSON.stringify(transactions));
  }, [transactions]);

  // --- 4. AUTH LOGIC ---
  const login = (userData) => {
    const userObj = { name: 'Harikaran C', ...userData };
    setUser(userObj);
    localStorage.setItem('finance_user', JSON.stringify(userObj));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('finance_user');
    setActiveTab('Dashboard'); // Reset to home for next login
  };

  // --- 5. DERIVED CALCULATIONS (EXISTING) ---
  const totals = useMemo(() => {
    const income = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
    const expenses = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
    return { income, expenses, balance: income - expenses };
  }, [transactions]);

  const insights = useMemo(() => {
    const expenseData = transactions.filter(t => t.type === 'expense');
    const categories = expenseData.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});
    
    const topCategory = Object.keys(categories).reduce((a, b) => categories[a] > categories[b] ? a : b, 'N/A');
    return {
      topCategory,
      topAmount: categories[topCategory] || 0,
      suggestion: `By cutting ${topCategory} by 10%, you'd save ₹${((categories[topCategory] || 0) * 0.1).toFixed(0)}.`
    };
  }, [transactions]);

  // --- 6. FILTERING LOGIC ---
  const filteredTransactions = transactions
    .filter(t => (filterCategory === 'All' || t.category === filterCategory))
    .filter(t => t.note.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  // --- 7. ACTIONS ---
  const addTransaction = (t) => setTransactions([t, ...transactions]);
  
  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };
  
  return (
    <FinanceContext.Provider value={{
      // Data
      transactions: filteredTransactions,
      allTransactions: transactions,
      totals, 
      insights,
      
      // Auth
      user, 
      login, 
      logout,
      
      // UI / Navigation
      role, 
      setRole,
      activeTab, 
      setActiveTab,
      filterCategory, 
      setFilterCategory,
      searchQuery, 
      setSearchQuery,
      
      // Methods
      addTransaction, 
      deleteTransaction
    }}>
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => useContext(FinanceContext);



/*import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { initialTransactions } from '../data/mockData';

const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('finance_v1');
    return saved ? JSON.parse(saved) : initialTransactions;
  });

  const [role, setRole] = useState('admin');
  const [filterCategory, setFilterCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    localStorage.setItem('finance_v1', JSON.stringify(transactions));
  }, [transactions]);

  const totals = useMemo(() => {
    const income = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
    const expenses = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
    return { income, expenses, balance: income - expenses };
  }, [transactions]);

  const insights = useMemo(() => {
    const expenseData = transactions.filter(t => t.type === 'expense');
    const categories = expenseData.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});
    
    const topCategory = Object.keys(categories).reduce((a, b) => categories[a] > categories[b] ? a : b, 'N/A');
    return {
      topCategory,
      topAmount: categories[topCategory] || 0,
      suggestion: `By cutting ${topCategory} by 10%, you'd save ₹${((categories[topCategory] || 0) * 0.1).toFixed(0)}.`
    };
  }, [transactions]);

  const filteredTransactions = transactions
    .filter(t => (filterCategory === 'All' || t.category === filterCategory))
    .filter(t => t.note.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const addTransaction = (t) => setTransactions([t, ...transactions]);
  const deleteTransaction = (id) => setTransactions(transactions.filter(t => t.id !== id));
  
  return (
    <FinanceContext.Provider value={{
      transactions: filteredTransactions,
      allTransactions: transactions,
      role, setRole,
      totals, insights,
      filterCategory, setFilterCategory,
      searchQuery, setSearchQuery,
      addTransaction, deleteTransaction
    }}>
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => useContext(FinanceContext);


*/