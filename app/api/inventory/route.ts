import { NextResponse } from 'next/server';

// GET all inventory items, POST new item
export async function GET(request: Request) {
  // TODO: Implement GET all items with optional category filter
  return NextResponse.json({ message: 'GET inventory items' });
}

export async function POST(request: Request) {
  // TODO: Implement POST new item
  return NextResponse.json({ message: 'POST new item' });
}
