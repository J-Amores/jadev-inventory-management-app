'use client';

import { Plus } from 'lucide-react';

interface HeaderProps {
  title: string;
  showAddButton?: boolean;
  onAddClick?: () => void;
}

export default function Header({ title, showAddButton, onAddClick }: HeaderProps) {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 lg:px-8 flex-shrink-0 z-10">
      <h1 className="text-xl font-bold text-slate-800">{title}</h1>

      <div className="flex items-center gap-4">
        {showAddButton && (
          <button
            onClick={onAddClick}
            className="hidden sm:flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm shadow-indigo-200"
          >
            <Plus className="w-4 h-4" />
            Add Item
          </button>
        )}
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold ring-2 ring-white shadow-md">
          JD
        </div>
      </div>
    </header>
  );
}
