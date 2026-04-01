import React from 'react';
import { useCart } from '../context/CartContext';
import { formatCOP } from '../components/ProductCard';
import { Trash2, ShoppingBag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_API_URL || "http://localhost:3001";

  if (cart.length === 0) {
    return (
      <div className="page-container empty-state">
        <ShoppingBag size={64} style={{ marginBottom: '20px', color: 'var(--text-muted)' }} />
        <h1>Tu carrito está vacío</h1>
        <p style={{ marginTop: '10px', marginBottom: '30px' }}>¡Explora nuestro catálogo y encuentra tecnología increíble!</p>
        <Link to="/" style={{ background: 'var(--accent)', color: 'white', padding: '12px 24px', borderRadius: '50px', textDecoration: 'none', fontWeight: '600' }}>
          Volver a la tienda
        </Link>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h1 style={{ marginBottom: '30px', fontSize: '2rem' }}>Carrito de Compras</h1>
      
      <div className="cart-page-wrapper">
        <div className="cart-items">
          {cart.map(item => {
            const displayImage = item.images && item.images.length > 0 
              ? `${backendUrl}${item.images[0]}` 
              : null;

            return (
              <div key={item.id} className="cart-item">
                <img src={displayImage} alt={item.title} className="cart-item-img" />
                <div className="cart-item-details">
                  <h3 className="cart-item-title">{item.title}</h3>
                  <div className="cart-item-price">{formatCOP(item.priceCOP)}</div>
                </div>
                
                <div className="cart-actions">
                  <div className="qty-control">
                    <button className="qty-btn" onClick={() => updateQuantity(item.id, item.qty - 1)}>-</button>
                    <span>{item.qty}</span>
                    <button className="qty-btn" onClick={() => updateQuantity(item.id, item.qty + 1)}>+</button>
                  </div>
                  
                  <button className="btn-remove" onClick={() => removeFromCart(item.id)} title="Eliminar del carrito">
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="cart-summary">
          <h2 className="summary-title">Resumen de Orden</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>{formatCOP(cartTotal)}</span>
          </div>
          <div className="summary-row">
            <span>Envío</span>
            <span>Calculado al final</span>
          </div>
          <div className="summary-total">
            <span>Total</span>
            <span>{formatCOP(cartTotal)}</span>
          </div>
          <button 
            className="btn-checkout"
            onClick={() => navigate('/checkout')}
          >
            Proceder al Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
