import { NextResponse } from 'next/server';

// POST - Mock receipt parsing
export async function POST(request: Request) {
  // TODO: Implement mock image parsing
  // Add 1.5s delay for realistic UX
  return NextResponse.json({ message: 'POST AI parse image' });
}
