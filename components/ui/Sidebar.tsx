'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Package, Users, Settings, BrainCircuit, Box } from 'lucide-react';
import React from 'react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Inventory', href: '/inventory', icon: Package },
  { name: 'Users', href: '/users', icon: Users },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-20 lg:w-64 bg-slate-900 text-white flex flex-col flex-shrink-0 transition-all duration-300 z-20 shadow-xl">
      <div className="h-16 flex items-center justify-center lg:justify-start lg:px-6 border-b border-slate-800">
        <div className="bg-indigo-500 p-2 rounded-lg">
          <Box className="w-6 h-6 text-white" />
        </div>
        <span className="hidden lg:block ml-3 font-bold text-lg tracking-tight">InventAI</span>
      </div>

      <nav className="flex-1 py-6 px-3 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-900/20'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <div className={`${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`}>
                <item.icon size={20} />
              </div>
              <span className="hidden lg:block font-medium text-sm">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-800 rounded-xl p-4 hidden lg:block">
          <div className="flex items-center gap-3 mb-2">
            <BrainCircuit className="w-5 h-5 text-indigo-400" />
            <span className="font-semibold text-sm text-slate-200">AI Powered</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Gemini assists with categorization and insights.
          </p>
        </div>
      </div>
    </aside>
  );
}
