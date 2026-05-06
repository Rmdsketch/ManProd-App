import type { Product } from '../types/product';

interface Props {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

export default function ProductItem({ product, onEdit, onDelete }: Props) {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
      <div className="flex-1">
        <h3 className="text-lg font-medium text-gray-800">{product.name}</h3>
        <p className="text-sm text-gray-500">{product.description}</p>
        <div className="mt-1 flex items-center gap-4 text-sm text-gray-600">
          <span className="font-semibold text-blue-600">Rp {product.price.toLocaleString('id-ID')}</span>
          <span>•</span>
          <span>Stock: {product.stock}</span>
          <span>•</span>
          <span className="bg-gray-100 px-2 py-0.5 rounded text-xs">{product.category}</span>
        </div>
      </div>

      <div className="flex gap-2 ml-4">
        <button
          onClick={() => onEdit(product)}
          className="px-3 py-1 text-sm bg-amber-500 text-white rounded hover:bg-amber-600 transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => product.id && onDelete(product.id)}
          className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
