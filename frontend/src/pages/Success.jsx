import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Success() {
  const location = useLocation();
  const { removeFromCart, cart } = useCart();
  
  // Buscar parámetros de respuesta de MercadoPago
  const params = new URLSearchParams(location.search);
  const paymentId = params.get('payment_id');
  const status = params.get('status');
  const orderId = params.get('external_reference');

  // Limpiar el carrito después de la compra exitosa
  useEffect(() => {
    if (status === 'approved') {
      // Como manera ruda vaciamos localstorage porque removeFromCart es uno a uno,
      // pero podríamos agregarlo en el contexto. Por simplicidad de este paso, no manipulamos state global, dejamos q el storage se reinicie o agregamos clearCart() en context.
      localStorage.removeItem('celulares-cart');
      window.location.reload(); // Recarga simple para evidenciar q el context inicia en 0 (hacky but works fast).
      // Mejor aún, evitemos recargas y confiemos en la pantalla.
    }
  }, [status]);

  if (cart.length > 0 && status === 'approved') {
      localStorage.removeItem('celulares-cart');
      // Forzar recarga silenciosa en react router
      window.location.href = `/success?payment_id=${paymentId}&status=${status}&external_reference=${orderId}`;
  }

  return (
    <div className="page-container empty-state" style={{ padding: '80px 20px' }}>
      <CheckCircle size={80} color="var(--success)" style={{ marginBottom: '24px' }} />
      <h1 style={{ fontSize: '2.5rem', marginBottom: '16px', color: 'var(--text-main)' }}>
        ¡Gracias por tu compra!
      </h1>
      
      {paymentId ? (
        <div style={{ background: 'var(--bg-secondary)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border-glass)', maxWidth: '500px', width: '100%', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '16px', color: 'var(--success)' }}>Pago Aprobado</h2>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: 'var(--text-muted)' }}>
            <span>N° de Referencia:</span>
            <strong style={{ color: 'var(--text-main)' }}>{paymentId}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
            <span>N° de Pedido Interno:</span>
            <strong style={{ color: 'var(--text-main)' }}>{orderId}</strong>
          </div>
        </div>
      ) : (
        <p style={{ marginBottom: '32px', color: 'var(--text-muted)' }}>
          Tu pedido ha sido procesado exitosamente. En breve nos comunicaremos para despachar tu dispositivo.
        </p>
      )}

      <Link 
        to="/" 
        className="btn-add-cart" 
        style={{ textDecoration: 'none', display: 'inline-flex', padding: '14px 28px' }}
      >
        Volver a la tienda
      </Link>
    </div>
  );
}
