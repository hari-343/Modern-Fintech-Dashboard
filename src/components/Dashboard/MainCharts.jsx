import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { useFinance } from '../../context/FinanceContext';

const COLORS = ['#6366f1', '#f43f5e', '#10b981', '#f59e0b', '#8b5cf6', '#06b6d4'];

export default function MainCharts({ type }) {
  const { allTransactions, setFilterCategory } = useFinance();

  const pieData = Object.entries(
    allTransactions.filter(t => t.type === 'expense').reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  if (type === 'pie') {
    return (
      <div className="h-[300px] w-full">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={pieData}
              innerRadius={70}
              outerRadius={90}
              paddingAngle={8}
              dataKey="value"
              onClick={(data) => setFilterCategory(data.name)}
              className="cursor-pointer focus:outline-none"
            >
              {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer>
        <AreaChart data={allTransactions.slice(-10)}>
          <defs>
            <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="date" hide />
          <YAxis hide />
          <Tooltip />
          <Area type="monotone" dataKey="amount" stroke="#6366f1" fillOpacity={1} fill="url(#colorAmt)" strokeWidth={3} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}