import { NextResponse } from 'next/server';
import { mockEnhanceDescription } from '@/lib/mock-ai';

// POST - Mock description enhancement
export async function POST(request: Request) {
  try {
    const { name, description } = await request.json();

    // Add 800ms delay for realistic UX
    await new Promise(resolve => setTimeout(resolve, 800));

    const enhanced = mockEnhanceDescription(name, description);

    return NextResponse.json({ description: enhanced });
  } catch (error) {
    console.error('Error enhancing description:', error);
    return NextResponse.json({ error: 'Failed to enhance description' }, { status: 500 });
  }
}
