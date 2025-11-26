import { NextResponse } from 'next/server';

// POST - Mock category suggestion
export async function POST(request: Request) {
  // TODO: Implement mock category suggestion
  // Add 600ms delay for realistic UX
  return NextResponse.json({ message: 'POST AI categorize' });
}
