'use client';

// Add/edit modal form (Client Component)
interface ItemFormProps {
  item?: any;
  onClose: () => void;
  onSave: () => void;
}

export default function ItemForm({ item, onClose, onSave }: ItemFormProps) {
  // TODO: Replace AI service calls:
  // - suggestCategory() → fetch('/api/ai/categorize', { method: 'POST' })
  // - enhanceDescription() → fetch('/api/ai/enhance', { method: 'POST' })
  // - parseReceipt() → fetch('/api/ai/parse-image', { method: 'POST' })
  // TODO: Submit: POST /api/inventory (new) or PUT /api/inventory/${id} (edit)

  return (
    <div>
      <h2>{item ? 'Edit Item' : 'Add Item'}</h2>
      {/* Modal form with AI features (categorize, enhance, image parsing) */}
    </div>
  );
}
