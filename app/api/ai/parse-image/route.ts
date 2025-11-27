import { NextResponse } from 'next/server';
import { mockParseReceipt } from '@/lib/mock-ai';

// POST - Mock receipt parsing
export async function POST(request: Request) {
  try {
    // Note: In a real implementation, you would parse the FormData to get the image
    // For mocking purposes, we ignore the image and return mock data

    // Add 1.5s delay for realistic UX
    await new Promise(resolve => setTimeout(resolve, 1500));

    const result = mockParseReceipt();

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error parsing image:', error);
    return NextResponse.json({ error: 'Failed to parse image' }, { status: 500 });
  }
}
