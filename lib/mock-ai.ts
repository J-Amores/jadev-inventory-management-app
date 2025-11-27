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

  // Simple keyword-based categorization for shoes
  if (combined.includes('sneaker') || combined.includes('trainer') || combined.includes('athletic')) {
    return 'Sneakers';
  }
  if (combined.includes('boot') || combined.includes('ankle') || combined.includes('combat')) {
    return 'Boots';
  }
  if (combined.includes('sandal') || combined.includes('flip') || combined.includes('slide')) {
    return 'Sandals';
  }
  if (combined.includes('loafer') || combined.includes('slip-on') || combined.includes('moccasin')) {
    return 'Loafers';
  }
  if (combined.includes('running') || combined.includes('jogging') || combined.includes('sports')) {
    return 'Running Shoes';
  }
  if (combined.includes('dress') || combined.includes('oxford') || combined.includes('formal')) {
    return 'Dress Shoes';
  }
  if (combined.includes('heel') || combined.includes('pump') || combined.includes('stiletto')) {
    return 'High Heels';
  }
  if (combined.includes('flat') || combined.includes('ballet') || combined.includes('casual')) {
    return 'Flats';
  }

  // Default
  return 'Sneakers';
}

/**
 * Mock description enhancement using template-based approach
 */
export function mockEnhanceDescription(name: string, notes?: string): string {
  const hasNotes = notes && notes.trim().length > 0;

  if (hasNotes) {
    // Enhance existing notes
    return `Premium ${name} combining style and comfort. ${notes} Features advanced cushioning technology and durable materials for long-lasting wear. Perfect for everyday use and special occasions.`;
  } else {
    // Generate from scratch
    return `Expertly crafted ${name} offering exceptional comfort and contemporary design. Features premium materials, ergonomic fit, and versatile styling. Ideal for both professional and casual wear, providing all-day comfort and durability.`;
  }
}

/**
 * Mock inventory analysis - comprehensive summary report
 */
export function mockAnalyzeInventory(items: InventoryItem[]): {
  insights: string;
} {
  if (items.length === 0) {
    return { insights: '📊 No inventory data available for analysis.' };
  }

  // Calculate key metrics
  const lowStockCount = items.filter(item => item.quantity <= item.lowStockThreshold).length;
  const totalValue = items.reduce((acc, item) => acc + (item.quantity * item.price), 0);
  const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);
  const avgRating = items.reduce((acc, item) => acc + item.rating, 0) / items.length;

  // Category analysis
  const categoryStats: Record<string, { count: number; value: number; quantity: number }> = {};
  items.forEach(item => {
    if (!categoryStats[item.category]) {
      categoryStats[item.category] = { count: 0, value: 0, quantity: 0 };
    }
    categoryStats[item.category].count += 1;
    categoryStats[item.category].value += item.quantity * item.price;
    categoryStats[item.category].quantity += item.quantity;
  });

  const topCategoryByValue = Object.entries(categoryStats)
    .sort((a, b) => b[1].value - a[1].value)[0];

  const topCategoryByQuantity = Object.entries(categoryStats)
    .sort((a, b) => b[1].quantity - a[1].quantity)[0];

  // Top performing items
  const topValueItems = [...items]
    .sort((a, b) => (b.quantity * b.price) - (a.quantity * a.price))
    .slice(0, 3);

  const highestRatedItems = [...items]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 2);

  // Format large numbers
  const formatValue = (val: number) => {
    if (val >= 1e9) return `$${(val / 1e9).toFixed(1)}B`;
    if (val >= 1e6) return `$${(val / 1e6).toFixed(1)}M`;
    if (val >= 1e3) return `$${(val / 1e3).toFixed(1)}K`;
    return `$${val.toFixed(0)}`;
  };

  const formatQty = (qty: number) => {
    if (qty >= 1e6) return `${(qty / 1e6).toFixed(1)}M`;
    if (qty >= 1e3) return `${(qty / 1e3).toFixed(1)}K`;
    return qty.toLocaleString();
  };

  // Generate insights
  const insights = `
📊 **INVENTORY SUMMARY REPORT**

**Overview:**
• Total Products: ${items.length} unique items
• Total Stock Units: ${formatQty(totalQuantity)}
• Total Inventory Value: ${formatValue(totalValue)}
• Average Rating: ${avgRating.toFixed(1)}/5.0 ⭐

**Stock Health:**
${lowStockCount === 0
  ? '✅ All items adequately stocked - no immediate restocking needed'
  : `⚠️ ${lowStockCount} items require restocking (${((lowStockCount/items.length)*100).toFixed(0)}% of inventory)`}
• Stock Coverage: ${((items.length - lowStockCount) / items.length * 100).toFixed(0)}% healthy

**Category Performance:**
• Top Value Category: ${topCategoryByValue[0]} (${formatValue(topCategoryByValue[1].value)})
• Highest Volume: ${topCategoryByQuantity[0]} (${formatQty(topCategoryByQuantity[1].quantity)} units)
• Total Categories: ${Object.keys(categoryStats).length}

**Top Performers:**
${topValueItems.slice(0, 2).map((item, i) =>
  `${i + 1}. ${item.name.substring(0, 25)} - ${formatValue(item.quantity * item.price)}`
).join('\n')}

**Quality Leaders:**
${highestRatedItems.map((item, i) =>
  `• ${item.name.substring(0, 30)} (${item.rating.toFixed(1)}⭐)`
).join('\n')}

**🎯 Recommendations:**
${lowStockCount > 5 ? '• Priority: Schedule bulk restocking for low-inventory items\n' : ''}${totalValue > 5e9 ? '• Consider diversifying portfolio to reduce capital concentration\n' : ''}${avgRating < 3.0 ? '• Focus on improving product quality and customer satisfaction\n' : ''}${Object.keys(categoryStats).length < 5 ? '• Opportunity: Expand product categories to increase market reach\n' : ''}• Revenue Potential: ${formatValue(totalValue * 1.15)} with 15% turnover optimization
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
    { name: 'Nike Air Max 270', price: 149.99, description: 'Lightweight running shoes with Air cushioning' },
    { name: 'Timberland Classic Boots', price: 189.99, description: 'Premium leather waterproof boots' },
    { name: 'Adidas Ultraboost', price: 179.99, description: 'High-performance running shoes with Boost technology' },
    { name: 'Birkenstock Arizona Sandals', price: 99.50, description: 'Comfortable cork footbed sandals' },
    { name: 'Cole Haan Dress Shoes', price: 249.99, description: 'Elegant leather oxford dress shoes' },
    { name: 'Vans Old Skool Sneakers', price: 69.99, description: 'Classic skateboarding sneakers' },
  ];

  return mockItems[Math.floor(Math.random() * mockItems.length)];
}
