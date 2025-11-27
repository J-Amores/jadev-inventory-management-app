'use client';

import React, { useState, useEffect } from 'react';
import { X, Sparkles, Wand2, Upload } from 'lucide-react';
import { CATEGORIES } from '@/lib/constants';

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

interface ItemFormProps {
  initialData?: InventoryItem;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

export default function ItemForm({ initialData, isOpen, onClose, onSubmit }: ItemFormProps) {
  const [formData, setFormData] = useState<Partial<InventoryItem>>({
    name: '',
    sku: '',
    category: '',
    quantity: 0,
    price: 0,
    description: '',
    lowStockThreshold: 5,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=400'
  });
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [isCategorizing, setIsCategorizing] = useState(false);
  const [isAnalyzingImage, setIsAnalyzingImage] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        name: '',
        sku: '',
        category: '',
        quantity: 0,
        price: 0,
        description: '',
        lowStockThreshold: 5,
        rating: 4.5,
        image: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=400'
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' || name === 'price' || name === 'lowStockThreshold' || name === 'rating' ? parseFloat(value) || 0 : value
    }));
  };

  const handleEnhanceDescription = async () => {
    if (!formData.name && !formData.description) return;
    setIsEnhancing(true);
    try {
      const response = await fetch('/api/ai/enhance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: formData.name, description: formData.description })
      });
      const data = await response.json();
      setFormData(prev => ({ ...prev, description: data.description }));
    } catch (error) {
      console.error('Error enhancing description:', error);
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleSuggestCategory = async () => {
    if (!formData.name) return;
    setIsCategorizing(true);
    try {
      const response = await fetch('/api/ai/categorize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: formData.name, description: formData.description })
      });
      const data = await response.json();
      setFormData(prev => ({ ...prev, category: data.category }));
    } catch (error) {
      console.error('Error suggesting category:', error);
    } finally {
      setIsCategorizing(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsAnalyzingImage(true);
    try {
      const formDataUpload = new FormData();
      formDataUpload.append('image', file);

      const response = await fetch('/api/ai/parse-image', {
        method: 'POST',
        body: formDataUpload
      });
      const data = await response.json();

      setFormData(prev => ({
        ...prev,
        name: data.name || prev.name,
        price: data.price || prev.price,
        description: data.description || prev.description
      }));
    } catch (error) {
      console.error('Error parsing image:', error);
    } finally {
      setIsAnalyzingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const method = initialData ? 'PUT' : 'POST';
    const url = initialData ? `/api/inventory/${initialData.id}` : '/api/inventory';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        onSubmit();
        onClose();
      } else {
        console.error('Failed to save item');
      }
    } catch (error) {
      console.error('Error saving item:', error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
          <h2 className="text-xl font-bold text-slate-800">
            {initialData ? 'Edit Item' : 'Add New Item'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {!initialData && (
             <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100 mb-4">
                <div className="flex items-center gap-3">
                   <div className="p-2 bg-indigo-100 rounded-full">
                       <Upload className="w-5 h-5 text-indigo-600" />
                   </div>
                   <div className="flex-1">
                       <h4 className="text-sm font-semibold text-indigo-900">Auto-fill from Image</h4>
                       <p className="text-xs text-indigo-700">Upload a product photo or tag to auto-fill details.</p>
                   </div>
                   <label className={`cursor-pointer px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium rounded-md transition-all ${isAnalyzingImage ? 'opacity-50 pointer-events-none' : ''}`}>
                       {isAnalyzingImage ? 'Analyzing...' : 'Upload'}
                       <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={isAnalyzingImage} />
                   </label>
                </div>
             </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Item Name</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="e.g. Wireless Mouse"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">SKU / ID</label>
              <input
                type="text"
                name="sku"
                required
                value={formData.sku}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="e.g. WM-001"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Price ($)</label>
              <input
                type="number"
                name="price"
                min="0"
                step="0.01"
                required
                value={formData.price}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Quantity</label>
              <input
                type="number"
                name="quantity"
                min="0"
                required
                value={formData.quantity}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Low Stock Alert</label>
              <input
                type="number"
                name="lowStockThreshold"
                min="0"
                required
                value={formData.lowStockThreshold}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-slate-700">Category</label>
              <button
                type="button"
                onClick={handleSuggestCategory}
                disabled={isCategorizing || !formData.name}
                className="text-xs flex items-center gap-1 text-indigo-600 hover:text-indigo-700 disabled:opacity-50"
              >
                <Sparkles className="w-3 h-3" />
                {isCategorizing ? 'Suggesting...' : 'Auto-Categorize'}
              </button>
            </div>
            <div className="relative">
                <input
                    list="categories"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="Select or type a category..."
                />
                <datalist id="categories">
                    {CATEGORIES.map(c => <option key={c} value={c} />)}
                </datalist>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-slate-700">Description</label>
              <button
                type="button"
                onClick={handleEnhanceDescription}
                disabled={isEnhancing || !formData.name}
                className="text-xs flex items-center gap-1 text-indigo-600 hover:text-indigo-700 disabled:opacity-50"
              >
                <Wand2 className="w-3 h-3" />
                {isEnhancing ? 'Enhancing...' : 'Enhance with AI'}
              </button>
            </div>
            <textarea
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
              placeholder="Brief product description..."
            />
          </div>

          <div className="pt-4 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm shadow-indigo-200 transition-all transform active:scale-95"
            >
              {initialData ? 'Save Changes' : 'Add Item'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
