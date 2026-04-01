import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { Search } from 'lucide-react';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('iphone');
  const [searchQuery, setSearchQuery] = useState('');

  // Efecto para buscar los datos cuando el componente se monta
  useEffect(() => {
    const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
    fetch(`${backendUrl}/api/productos`)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Error fetching productos:', err);
        setIsLoading(false);
      });
  }, []);

  // Lógica de filtrado
  const filteredProducts = products.filter(p => {
    // 1. Filtrar por pestaña
    if (p.category !== activeTab) return false;
    
    // 2. Filtrar por la búsqueda (ignorar mayúsculas)
    if (!searchQuery) return true;
    const term = searchQuery.toLowerCase();
    const haystack = [p.title, ...p.descriptionLines, p.longDescription].join(' ').toLowerCase();
    return haystack.includes(term);
  });

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Cargando lo mejor en tecnología...</p>
      </div>
    );
  }

  return (
    <div className="page-container home-page">
      <header className="home-header">
        <div className="hero-text">
          <h1>Encuentra tu próximo dispositivo</h1>
          <p>Innovación, potencia y diseño al mejor precio.</p>
        </div>
        
        <div className="search-bar">
          <Search className="search-icon" />
          <input 
            type="text" 
            placeholder="Buscar modelo, capacidad, color..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="tabs-container">
          <button 
            className={`tab-btn ${activeTab === 'iphone' ? 'active' : ''}`}
            onClick={() => setActiveTab('iphone')}
          >
            iPhone
          </button>
          <button 
            className={`tab-btn ${activeTab === 'android' ? 'active' : ''}`}
            onClick={() => setActiveTab('android')}
          >
            Android
          </button>
          <button 
            className={`tab-btn ${activeTab === 'consolas' ? 'active' : ''}`}
            onClick={() => setActiveTab('consolas')}
          >
            Consolas
          </button>
        </div>
      </header>

      {/* Grid de Productos */}
      <section className="catalog-section">
        <div className="product-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="empty-state">
              <p>No encontramos dispositivos que coincidan con "{searchQuery}"</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
