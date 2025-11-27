import { NextResponse } from 'next/server';
import { mockAnalyzeInventory } from '@/lib/mock-ai';

// POST - Mock inventory analysis
export async function POST(request: Request) {
  try {
    const { items } = await request.json();

    // Add 1s delay for realistic UX
    await new Promise(resolve => setTimeout(resolve, 1000));

    const result = mockAnalyzeInventory(items);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error analyzing inventory:', error);
    return NextResponse.json({ error: 'Failed to analyze inventory' }, { status: 500 });
  }
}
