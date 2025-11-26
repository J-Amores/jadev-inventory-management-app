import { NextResponse } from 'next/server';

// GET dashboard stats & financial data
export async function GET(request: Request) {
  // TODO: Implement GET dashboard data
  // Fetch inventory items, sales summary, expenses
  // Aggregate by month-year
  // Return items + financialHistory
  return NextResponse.json({ message: 'GET dashboard data' });
}
