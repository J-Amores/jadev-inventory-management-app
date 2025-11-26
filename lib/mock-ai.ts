// Mock AI functions

/**
 * Mock category suggestion based on simple keyword matching
 */
export function mockSuggestCategory(name: string, description?: string): string {
  // TODO: Implement simple keyword matching → category
  return 'Electronics';
}

/**
 * Mock description enhancement using template-based approach
 */
export function mockEnhanceDescription(name: string, notes?: string): string {
  // TODO: Implement template-based enhancement
  return `Enhanced description for ${name}`;
}

/**
 * Mock inventory analysis - calculate stats
 */
export function mockAnalyzeInventory(items: any[]): {
  lowStockCount: number;
  totalValue: number;
  topCategory: string;
  insights: string[];
} {
  // TODO: Calculate stats (low stock, value, top category)
  return {
    lowStockCount: 0,
    totalValue: 0,
    topCategory: '',
    insights: []
  };
}

/**
 * Mock receipt parsing - return mock extracted data
 */
export function mockParseReceipt(): {
  name: string;
  quantity: number;
  price: number;
} {
  // TODO: Return mock extracted data
  return {
    name: 'Sample Item',
    quantity: 1,
    price: 0
  };
}
