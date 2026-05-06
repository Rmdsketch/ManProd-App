import { useState, useEffect } from 'react';
import type { Product } from '../types/product';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductList from '../components/ProductItem';
import ProductForm from '../components/ProductForm';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../services/api';

export default function Dashboard() {
  const [view, setView] = useState<'list' | 'add' | 'edit'>('list');
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const fetchProducts = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data.data);
    } catch (error) {
      console.error("Gagal mengambil produk", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

const handleSave = async (productData: Product) => {
    try {
      const isEditing = view === 'edit' && selectedProduct?.id;
      if (isEditing) {
        await updateProduct(selectedProduct.id, productData);
      } else {
        await createProduct(productData);
      }
      await fetchProducts(); 
      if (isEditing) {
        alert('Berhasil mengedit produk!');
      } else {
        alert('Berhasil menambahkan produk!');
      }
      setView('list');
      setSelectedProduct(null);
    } catch (error) {
      console.error("Gagal menyimpan produk", error);
      alert("Terjadi kesalahan sistem.");
    }
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setView('edit');
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Yakin ingin menghapus?')) {
      try {
        await deleteProduct(id);
        await fetchProducts();
      } catch (error) {
        console.error("Gagal menghapus produk", error);
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        currentView={view === 'edit' ? 'add' : view}
        setView={(v) => {
          setView(v);
          if (v === 'add') setSelectedProduct(null);
        }}
      />

      <div className="flex-1 flex flex-col">
        <Header />

        <main className="flex-1 p-8 bg-white m-4 shadow-sm rounded-lg overflow-auto">
          {view === 'list' && (
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-light text-center text-gray-700 mb-8">Product List</h2>
              <div className="border-t border-gray-200">
                {products.map(product => (
                  <ProductList
                    key={product.id}
                    product={product}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            </div>
          )}

          {(view === 'add' || view === 'edit') && (
            <ProductForm
              initialData={selectedProduct}
              onSubmit={handleSave}
              onCancel={() => {
                setView('list');
                setSelectedProduct(null);
              }}
            />
          )}
        </main>

        <Footer />
      </div>
    </div>
  );
}