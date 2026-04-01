import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { ArrowLeft, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Checkout() {
  const { cart, cartTotal } = useCart();
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    direccion: '',
    ciudad: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Llamar al backend para que registre el pedido y genere la preferencia en MercadoPago
      const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const response = await fetch(`${backendUrl}/api/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userData: formData,
          cartItems: cart,
          total: cartTotal
        })
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Error al iniciar pago');

      // Redirigir al cliente a la página segura de MercadoPago (usando sandbox para pruebas locales)
      // Si quieres que reciba pagos reales en el futuro, cambia sandbox_url por url
      if (data.sandbox_url) {
        window.location.href = data.sandbox_url;
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <Link to="/cart" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', textDecoration: 'none', marginBottom: '20px' }}>
        <ArrowLeft size={20} />
        Volver al carrito
      </Link>
      
      <h1 style={{ marginBottom: '30px', fontSize: '2rem' }}>Finalizar Compra</h1>
      
      <form onSubmit={handlePayment} className="cart-page-wrapper">
        <div className="cart-items" style={{ padding: '30px' }}>
          <h2 style={{ marginBottom: '20px', fontSize: '1.2rem', color: 'var(--text-main)' }}>
            Datos de Envío
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Nombre Completo</label>
              <input type="text" name="nombre" required value={formData.nombre} onChange={handleChange} className="form-input" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-glass)', background: 'var(--bg-primary)', color: 'white' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Teléfono</label>
              <input type="tel" name="telefono" required value={formData.telefono} onChange={handleChange} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-glass)', background: 'var(--bg-primary)', color: 'white' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Dirección de Entrega</label>
              <input type="text" name="direccion" required value={formData.direccion} onChange={handleChange} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-glass)', background: 'var(--bg-primary)', color: 'white' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Ciudad</label>
              <input type="text" name="ciudad" required value={formData.ciudad} onChange={handleChange} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-glass)', background: 'var(--bg-primary)', color: 'white' }} />
            </div>
          </div>
        </div>

        <div className="cart-summary">
          <h2 className="summary-title">Resumen de Orden</h2>
          {cart.map(item => (
            <div key={item.id} className="summary-row" style={{ fontSize: '0.9rem' }}>
              <span>{item.qty}x {item.title}</span>
            </div>
          ))}
          <div className="summary-total" style={{ marginTop: '20px' }}>
            <span>Total a Pagar</span>
            <span>$ {cartTotal.toLocaleString('es-CO')}</span>
          </div>
          
          {error && <div style={{ color: 'var(--danger)', marginTop: '15px', fontSize: '0.9rem' }}>{error}</div>}

          <button 
            type="submit"
            disabled={loading || cart.length === 0}
            className="btn-checkout"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', background: '#009ee3', color: 'white' }}
          >
            <CreditCard size={20} />
            {loading ? 'Procesando...' : 'Pagar con MercadoPago'}
          </button>
        </div>
      </form>
    </div>
  );
}
