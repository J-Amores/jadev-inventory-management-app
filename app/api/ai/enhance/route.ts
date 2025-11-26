import { NextResponse } from 'next/server';

// POST - Mock description enhancement
export async function POST(request: Request) {
  // TODO: Implement mock description enhancement
  // Add 800ms delay for realistic UX
  return NextResponse.json({ message: 'POST AI enhance' });
}
