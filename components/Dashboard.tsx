'use client';

import React, { useEffect, useState, useMemo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, Cell
} from 'recharts';
import { Package, AlertTriangle, DollarSign, TrendingUp, Sparkles, RefreshCw } from 'lucide-react';
import StatCard from './ui/StatCard';

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'];

// Format large numbers (e.g., 8315200000 -> 8.3B, 16864227 -> 16.9M)
const formatNumber = (num: number): string => {
  if (num >= 1000000000) {
    return `${(num / 1000000000).toFixed(1)}B`;
  } else if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  } else if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
};

// Format date for chart (e.g., 2023-05 -> May '23)
const formatChartDate = (dateStr: string): string => {
  const [year, month] = dateStr.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1);
  const monthShort = date.toLocaleDateString('en-US', { month: 'short' });
  const yearShort = year.slice(2);
  return `${monthShort} '${yearShort}`;
};

interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  quantity: number;
  price: number;
  description: string;
  lastUpdated: string;
  lowStockThreshold: number;
  rating: number;
  image: string;
}

interface FinancialDataPoint {
  date: string;
  revenue: number;
  expenses: number;
}

export default function Dashboard() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [financialData, setFinancialData] = useState<FinancialDataPoint[]>([]);
  const [insights, setInsights] = useState<string | null>(null);
  const [loadingInsights, setLoadingInsights] = useState(false);
  const [loading, setLoading] = useState(true);

  const stats = useMemo(() => {
    const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
    const lowStockItems = items.filter(item => item.quantity <= item.lowStockThreshold).length;
    const totalValue = items.reduce((acc, item) => acc + (item.quantity * item.price), 0);
    const uniqueProducts = items.length;

    return { totalItems, lowStockItems, totalValue, uniqueProducts };
  }, [items]);

  const categoryData = useMemo(() => {
    const cats: Record<string, number> = {};
    items.forEach(item => {
      cats[item.category] = (cats[item.category] || 0) + item.quantity;
    });
    return Object.keys(cats).map(key => ({ name: key, value: cats[key] }));
  }, [items]);

  const topStockData = useMemo(() => {
    return [...items]
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5)
      .map(item => ({ name: item.name.substring(0, 15) + (item.name.length > 15 ? '...' : ''), value: item.quantity }));
  }, [items]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/dashboard');
      const data = await response.json();
      setItems(data.items || []);
      setFinancialData(data.financialHistory || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  const handleGenerateInsights = async () => {
    if (items.length === 0) return;

    setLoadingInsights(true);
    try {
      const response = await fetch('/api/ai/insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items })
      });
      const data = await response.json();
      setInsights(data.insights);
    } catch (error) {
      console.error('Error generating insights:', error);
      setInsights('Could not generate insights at this time.');
    } finally {
      setLoadingInsights(false);
    }
  };

  useEffect(() => {
    if (!insights && items.length > 0) {
      handleGenerateInsights();
    }
  }, [items]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in pb-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Stock Units"
          value={formatNumber(stats.totalItems)}
          icon={<Package className="w-6 h-6 text-blue-600" />}
          color="blue"
        />
        <StatCard
          title="Inventory Value"
          value={`$${formatNumber(stats.totalValue)}`}
          icon={<DollarSign className="w-6 h-6 text-green-600" />}
          color="green"
        />
        <StatCard
          title="Low Stock Alerts"
          value={stats.lowStockItems}
          icon={<AlertTriangle className="w-6 h-6 text-rose-600" />}
          color="rose"
        />
        <StatCard
          title="Unique Products"
          value={stats.uniqueProducts}
          icon={<TrendingUp className="w-6 h-6 text-purple-600" />}
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Financial Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Financial Overview (Revenue vs Expenses)</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={financialData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={formatChartDate} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}M`} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <Tooltip
                    contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                    formatter={(value: number) => [`$${value.toFixed(2)}M`, '']}
                    labelFormatter={formatChartDate}
                />
                <Area type="monotone" dataKey="revenue" stroke="#10b981" fillOpacity={1} fill="url(#colorRevenue)" name="Revenue" />
                <Area type="monotone" dataKey="expenses" stroke="#ef4444" fillOpacity={1} fill="url(#colorExpenses)" name="Expenses" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Insights Section */}
        <div className="bg-gradient-to-br from-indigo-50 to-white p-6 rounded-xl shadow-sm border border-indigo-100 flex flex-col h-[380px]">
          <div className="flex items-center justify-between mb-4 flex-shrink-0">
            <h3 className="text-lg font-semibold text-indigo-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-500" />
              Gemini Insights
            </h3>
            <button
              onClick={handleGenerateInsights}
              disabled={loadingInsights}
              className="p-2 hover:bg-white rounded-full transition-colors disabled:opacity-50"
              title="Refresh Insights"
            >
              <RefreshCw className={`w-4 h-4 text-indigo-500 ${loadingInsights ? 'animate-spin' : ''}`} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
            {loadingInsights ? (
              <div className="flex flex-col items-center justify-center h-full space-y-3 text-slate-500">
                <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-500 rounded-full animate-spin"></div>
                <p className="text-sm">Analyzing inventory...</p>
              </div>
            ) : (
              <div className="text-slate-700 text-sm">
                {insights ? (
                    <div className="space-y-3 leading-relaxed">
                      {insights.split('\n').map((line, i) => {
                        // Bold headers
                        if (line.startsWith('**') && line.endsWith('**')) {
                          return (
                            <h4 key={i} className="font-bold text-indigo-900 text-base mt-3 mb-1">
                              {line.replace(/\*\*/g, '')}
                            </h4>
                          );
                        }
                        // Bullet points
                        if (line.startsWith('•')) {
                          return (
                            <div key={i} className="flex items-start gap-2 ml-1">
                              <span className="text-indigo-500 mt-0.5">•</span>
                              <span className="flex-1">{line.substring(1).trim()}</span>
                            </div>
                          );
                        }
                        // Numbered list
                        if (/^\d+\./.test(line)) {
                          return (
                            <div key={i} className="flex items-start gap-2 ml-1">
                              <span className="text-indigo-600 font-medium">{line.match(/^\d+\./)?.[0]}</span>
                              <span className="flex-1">{line.replace(/^\d+\.\s*/, '')}</span>
                            </div>
                          );
                        }
                        // Empty lines
                        if (line.trim() === '') {
                          return <div key={i} className="h-1"></div>;
                        }
                        // Regular text
                        return <p key={i} className="text-slate-600">{line}</p>;
                      })}
                    </div>
                ) : (
                    <p className="text-sm text-slate-400 italic">No insights generated yet.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Inventory by Shoe Category</h3>
             <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => val >= 1000 ? `${(val/1000).toFixed(0)}k` : val}/>
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  cursor={{ fill: '#f1f5f9' }}
                />
                <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={40}>
                    {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
         </div>

         <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Top Highest Stock Items</h3>
             <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topStockData} layout="vertical">
                 <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e2e8f0" />
                <XAxis type="number" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => val >= 1000 ? `${(val/1000).toFixed(0)}k` : val} />
                <YAxis dataKey="name" type="category" width={120} stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip cursor={{ fill: '#f1f5f9' }} contentStyle={{ backgroundColor: '#fff', borderRadius: '8px' }} />
                <Bar dataKey="value" fill="#10b981" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
         </div>
      </div>
    </div>
  );
}
