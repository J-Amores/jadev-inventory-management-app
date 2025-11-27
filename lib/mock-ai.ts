// Mock AI functions for Next.js app

interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  quantity: number;
  price: number;
  description: string;
  lastUpdated: string;
  lowStockThreshold: number;
  rating: number;
  image: string;
}

/**
 * Mock category suggestion based on simple keyword matching
 */
export function mockSuggestCategory(name: string, description?: string): string {
  const nameLower = name.toLowerCase();
  const descLower = (description || '').toLowerCase();
  const combined = nameLower + ' ' + descLower;

  // Simple keyword-based categorization
  if (combined.includes('flower') || combined.includes('rose') || combined.includes('tulip') || combined.includes('lily')) {
    return 'Flowers';
  }
  if (combined.includes('succulent') || combined.includes('cactus') || combined.includes('aloe')) {
    return 'Succulents';
  }
  if (combined.includes('shrub') || combined.includes('bush')) {
    return 'Shrubs';
  }
  if (combined.includes('tree') || combined.includes('oak') || combined.includes('pine')) {
    return 'Trees';
  }
  if (combined.includes('herb') || combined.includes('basil') || combined.includes('mint') || combined.includes('thyme')) {
    return 'Herbs';
  }
  if (combined.includes('climb') || combined.includes('vine') || combined.includes('ivy')) {
    return 'Climbers';
  }
  if (combined.includes('fern')) {
    return 'Ferns';
  }
  if (combined.includes('ground') || combined.includes('cover') || combined.includes('moss')) {
    return 'Ground Cover';
  }

  // Default
  return 'Flowers';
}

/**
 * Mock description enhancement using template-based approach
 */
export function mockEnhanceDescription(name: string, notes?: string): string {
  const hasNotes = notes && notes.trim().length > 0;

  if (hasNotes) {
    // Enhance existing notes
    return `Premium quality ${name}. ${notes} Perfect for both indoor and outdoor cultivation. Carefully selected for optimal growth and vitality.`;
  } else {
    // Generate from scratch
    return `Exquisite ${name}, expertly cultivated for superior quality. This exceptional specimen offers outstanding visual appeal and easy maintenance. Ideal for gardens, patios, and interior spaces.`;
  }
}

/**
 * Mock inventory analysis - calculate stats
 */
export function mockAnalyzeInventory(items: InventoryItem[]): {
  insights: string;
} {
  const lowStockCount = items.filter(item => item.quantity <= item.lowStockThreshold).length;
  const totalValue = items.reduce((acc, item) => acc + (item.quantity * item.price), 0);

  // Count items per category
  const categoryCount: Record<string, number> = {};
  items.forEach(item => {
    categoryCount[item.category] = (categoryCount[item.category] || 0) + 1;
  });

  const topCategory = Object.entries(categoryCount)
    .sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

  const insights = `
📊 Inventory Analysis:

• Stock Status: ${lowStockCount > 0 ? `${lowStockCount} items need restocking` : 'All items adequately stocked'}
• Total Inventory Value: $${(totalValue / 1000000).toFixed(2)}M
• Dominant Category: ${topCategory} leads your collection
${lowStockCount > 3 ? '• Recommendation: Schedule bulk order to optimize stock levels' : ''}
${totalValue > 5000000 ? '• Consider diversifying to reduce capital concentration' : ''}
`.trim();

  return { insights };
}

/**
 * Mock receipt parsing - return mock extracted data
 */
export function mockParseReceipt(): {
  name: string;
  price: number;
  description: string;
} {
  const mockItems = [
    { name: 'English Lavender', price: 12.99, description: 'Fragrant purple flowering herb' },
    { name: 'Japanese Maple', price: 89.99, description: 'Ornamental tree with red foliage' },
    { name: 'Snake Plant', price: 24.99, description: 'Hardy air-purifying succulent' },
    { name: 'Climbing Roses', price: 34.50, description: 'Beautiful climbing flowering plant' },
  ];

  return mockItems[Math.floor(Math.random() * mockItems.length)];
}
