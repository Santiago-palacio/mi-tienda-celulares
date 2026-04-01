import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Smartphone, Package, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { cartItemCount } = useCart();
  const location = useLocation();

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <Smartphone size={28} />
          <h1>Celumin</h1>
        </Link>
        <nav className="navbar-nav">
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
            Catálogo
          </Link>
          <Link to="/cart" className={`nav-link cart-link ${location.pathname === '/cart' ? 'active' : ''}`}>
            <ShoppingCart size={24} />
            {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
          </Link>
        </nav>
      </div>
    </header>
  );
}
