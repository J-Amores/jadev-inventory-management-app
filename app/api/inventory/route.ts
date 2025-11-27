import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// GET all inventory items, optionally filtered by category
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    const items = await prisma.inventoryItem.findMany({
      where: category ? { category } : undefined,
      orderBy: { lastUpdated: 'desc' }
    });

    return NextResponse.json(items);
  } catch (error) {
    console.error('Error fetching inventory items:', error);
    return NextResponse.json({ error: 'Failed to fetch items' }, { status: 500 });
  }
}

// POST new item
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const item = await prisma.inventoryItem.create({
      data: {
        name: body.name,
        sku: body.sku,
        category: body.category,
        quantity: body.quantity,
        price: body.price,
        description: body.description || '',
        lowStockThreshold: body.lowStockThreshold || 5,
        rating: body.rating || 4.5,
        image: body.image || 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=400',
        lastUpdated: new Date()
      }
    });

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error('Error creating inventory item:', error);
    return NextResponse.json({ error: 'Failed to create item' }, { status: 500 });
  }
}
