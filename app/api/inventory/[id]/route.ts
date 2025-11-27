import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// GET single item by id
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const item = await prisma.inventoryItem.findUnique({
      where: { id: params.id }
    });

    if (!item) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    return NextResponse.json(item);
  } catch (error) {
    console.error('Error fetching inventory item:', error);
    return NextResponse.json({ error: 'Failed to fetch item' }, { status: 500 });
  }
}

// PUT update item
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    const item = await prisma.inventoryItem.update({
      where: { id: params.id },
      data: {
        name: body.name,
        sku: body.sku,
        category: body.category,
        quantity: body.quantity,
        price: body.price,
        description: body.description,
        lowStockThreshold: body.lowStockThreshold,
        rating: body.rating,
        image: body.image,
        lastUpdated: new Date()
      }
    });

    return NextResponse.json(item);
  } catch (error) {
    console.error('Error updating inventory item:', error);
    return NextResponse.json({ error: 'Failed to update item' }, { status: 500 });
  }
}

// DELETE item
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.inventoryItem.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting inventory item:', error);
    return NextResponse.json({ error: 'Failed to delete item' }, { status: 500 });
  }
}
