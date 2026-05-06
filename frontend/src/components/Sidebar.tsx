import { Package, Plus, Ban } from 'lucide-react';

interface SidebarProps {
  currentView: 'list' | 'add';
  setView: (view: 'list' | 'add') => void;
}

export default function Sidebar({ currentView, setView }: SidebarProps) {
  return (
    <aside className="w-64 bg-sidebar min-h-screen text-gray-300 flex flex-col">
      <div className="p-8 text-2xl font-light tracking-widest text-white mb-6">
        ManProd App
      </div>
      <nav className="flex-1">
        <ul className="space-y-2">
          <li>
            <button 
              onClick={() => setView('list')}
              className={`w-full flex items-center gap-3 px-8 py-3 transition-colors ${currentView === 'list' ? 'bg-gray-700 text-white border-l-2 border-white' : 'hover:bg-gray-700 hover:text-white'}`}
            >
              <Package size={18} /> View Products
            </button>
          </li>
          <li>
            <button 
              onClick={() => setView('add')}
              className={`w-full flex items-center gap-3 px-8 py-3 transition-colors ${currentView === 'add' ? 'bg-gray-700 text-white border-l-2 border-white' : 'hover:bg-gray-700 hover:text-white'}`}
            >
              <Plus size={18} /> Add Product
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}