import { NextResponse } from 'next/server';

// GET all users
export async function GET(request: Request) {
  // TODO: Implement GET all users
  return NextResponse.json({ message: 'GET all users' });
}
