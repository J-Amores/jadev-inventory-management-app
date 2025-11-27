import React from 'react';

export interface InventoryItem {
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

export interface User {
  userId: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'ADMIN' | 'STAFF' | 'VIEWER';
  status: 'ACTIVE' | 'INACTIVE';
}

export enum AppView {
  DASHBOARD = 'DASHBOARD',
  INVENTORY = 'INVENTORY',
  USERS = 'USERS',
  SETTINGS = 'SETTINGS',
}

export interface StatCardProps {
  title: string;
  value: string | number;
  trend?: number;
  icon: React.ReactNode;
  color: 'blue' | 'green' | 'amber' | 'rose' | 'purple';
}

export interface ChartData {
  name: string;
  value: number;
}

export interface FinancialDataPoint {
  date: string;
  revenue: number;
  expenses: number;
  profit: number;
}
