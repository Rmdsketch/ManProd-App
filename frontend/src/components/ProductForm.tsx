import { useState, useEffect } from 'react';
import type { Product } from '../types/product';
import { NumericFormat } from 'react-number-format';

interface Props {
  initialData?: Product | null;
  onSubmit: (data: Product) => void;
  onCancel: () => void;
}

export default function ProductForm({ initialData, onSubmit, onCancel }: Props) {
  const [formData, setFormData] = useState({
    name: '',
    price: '' as string | number,
    description: '',
    stock: '' as string | number,
    category: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        price: initialData.price,
        stock: initialData.stock
      });
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock)
    } as Product);
  };

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-light mb-8 text-center text-gray-700">
        {initialData ? 'Edit Product' : 'Add New Product'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-cyan-500"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
            <NumericFormat
              thousandSeparator="."
              decimalSeparator=","
              prefix="Rp "
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-cyan-500"
              value={formData.price}
              onValueChange={(values) => setFormData({...formData, price: values.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
            <input
              type="number"
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-cyan-500"
              value={formData.stock}
              onChange={(e) => setFormData({...formData, stock: e.target.value})}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <input
            type="text"
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-cyan-500"
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            required
            rows={4}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-cyan-500"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
          />
        </div>

        <div className="flex justify-end gap-4">
          <button type="button" onClick={onCancel} className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded">
            Cancel
          </button>
          <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}