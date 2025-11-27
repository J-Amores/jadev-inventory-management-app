import { NextResponse } from 'next/server';
import { mockSuggestCategory } from '@/lib/mock-ai';

// POST - Mock category suggestion
export async function POST(request: Request) {
  try {
    const { name, description } = await request.json();

    // Add 600ms delay for realistic UX
    await new Promise(resolve => setTimeout(resolve, 600));

    const category = mockSuggestCategory(name, description);

    return NextResponse.json({ category });
  } catch (error) {
    console.error('Error suggesting category:', error);
    return NextResponse.json({ error: 'Failed to suggest category' }, { status: 500 });
  }
}
