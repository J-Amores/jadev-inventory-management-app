import { NextResponse } from 'next/server';

// GET, PUT, DELETE by id
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  // TODO: Implement GET single item
  return NextResponse.json({ message: `GET item ${params.id}` });
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  // TODO: Implement PUT update item
  return NextResponse.json({ message: `PUT item ${params.id}` });
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  // TODO: Implement DELETE item
  return NextResponse.json({ message: `DELETE item ${params.id}` });
}
