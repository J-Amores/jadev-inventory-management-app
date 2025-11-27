import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// GET dashboard stats & financial data
export async function GET(request: Request) {
  try {
    // Fetch inventory items
    const items = await prisma.inventoryItem.findMany();

    // Fetch sales summary and expenses
    const salesSummaries = await prisma.salesSummary.findMany({
      orderBy: { date: 'asc' }
    });

    const expenses = await prisma.expense.findMany({
      orderBy: { timestamp: 'asc' }
    });

    // Aggregate financial data by month-year
    const financialMap: Record<string, { revenue: number; expenses: number }> = {};

    salesSummaries.forEach(sale => {
      const date = new Date(sale.date);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      if (!financialMap[key]) {
        financialMap[key] = { revenue: 0, expenses: 0 };
      }
      financialMap[key].revenue += sale.totalValue;
    });

    expenses.forEach(expense => {
      const date = new Date(expense.timestamp);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      if (!financialMap[key]) {
        financialMap[key] = { revenue: 0, expenses: 0 };
      }
      financialMap[key].expenses += expense.amount;
    });

    // Convert to array format
    const financialHistory = Object.entries(financialMap)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([date, data]) => ({
        date,
        revenue: parseFloat((data.revenue / 1000000).toFixed(2)),
        expenses: parseFloat((data.expenses / 1000000).toFixed(2))
      }));

    return NextResponse.json({
      items,
      financialHistory
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return NextResponse.json({ error: 'Failed to fetch dashboard data' }, { status: 500 });
  }
}
