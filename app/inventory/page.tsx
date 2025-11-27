'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import Sidebar from '@/components/ui/Sidebar';
import Header from '@/components/ui/Header';
import InventoryList from '@/components/InventoryList';
import ItemForm from '@/components/ItemForm';

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

export default function InventoryPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | undefined>(undefined);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleEdit = (item: InventoryItem) => {
    setEditingItem(item);
    setIsFormOpen(true);
  };

  const handleAdd = () => {
    setEditingItem(undefined);
    setIsFormOpen(true);
  };

  const handleFormSubmit = () => {
    setRefreshKey(prev => prev + 1);
  };

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 flex flex-col">
        <Header title="Inventory Management" showAddButton onAddClick={handleAdd} />
        <div className="flex-1 overflow-auto p-6 lg:p-8 relative">
          <InventoryList key={refreshKey} onEdit={handleEdit} onRefresh={handleRefresh} />

          {/* Mobile FAB */}
          <button
            onClick={handleAdd}
            className="sm:hidden fixed bottom-6 right-6 w-14 h-14 bg-indigo-600 text-white rounded-full shadow-lg shadow-indigo-300 flex items-center justify-center z-30 active:scale-90 transition-transform"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>
      </main>

      <ItemForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingItem}
      />
    </div>
  );
}
