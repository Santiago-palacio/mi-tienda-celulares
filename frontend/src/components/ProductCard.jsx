import React from 'react';
import { useCart } from '../context/CartContext';

/**
 * Función auxiliar para formatear a pesos colombianos
 */
export function formatCOP(value) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  // El backend debe servir la imagen
  const backendUrl = import.meta.env.VITE_API_URL || "http://localhost:3001";
  
  // Extraemos la primera imagen para mostrarla
  const displayImage = product.images && product.images.length > 0 
    ? `${backendUrl}${product.images[0]}` 
    : null;

  return (
    <article className="product-card">
      <div className="product-image-container">
        {product.condition && (
          <span className={`product-badge ${product.condition.toLowerCase() === 'nueva' ? 'badge-new' : 'badge-used'}`}>
            {product.condition}
          </span>
        )}
        {displayImage ? (
          <img src={displayImage} alt={product.title} className="product-image" loading="lazy" />
        ) : (
          <div className="product-image-placeholder">Sin imagen</div>
        )}
      </div>
      <div className="product-info">
        <h2 className="product-title">{product.title}</h2>
        <ul className="product-specs">
          {product.descriptionLines && product.descriptionLines.map((line, idx) => (
            <li key={idx}>{line}</li>
          ))}
        </ul>
        <div className="product-footer">
          <span className="product-price">{formatCOP(product.priceCOP)}</span>
          <button className="btn-add-cart" onClick={() => addToCart(product)}>
            Agregar al carrito
          </button>
        </div>
      </div>
    </article>
  );
}
