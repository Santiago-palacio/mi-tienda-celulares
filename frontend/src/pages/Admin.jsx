import React, { useState, useEffect } from 'react';
import { ArrowLeft, PlusCircle, Package } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatCOP } from '../components/ProductCard';

export default function Admin() {
  const [activeTab, setActiveTab] = useState('nuevo');
  
  // Estado para el formulario de nuevo producto
  const [formData, setFormData] = useState({
    id: '',
    category: 'iphone',
    title: '',
    condition: '',
    priceCOP: '',
    descriptionLines: '',
    longDescription: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [statusMsg, setStatusMsg] = useState('');
  
  // Estado para la lista de pedidos
  const [pedidos, setPedidos] = useState([]);

  // Cargar pedidos
  useEffect(() => {
    if (activeTab === 'pedidos') {
      const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      fetch(`${backendUrl}/api/pedidos`)
        .then(res => res.json())
        .then(data => setPedidos(data))
        .catch(err => console.error(err));
    }
  }, [activeTab]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMsg('Subiendo...');

    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => data.append(key, formData[key]));
      if (imageFile) {
        data.append('image', imageFile);
      }

      const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const res = await fetch(`${backendUrl}/api/productos`, {
        method: 'POST',
        body: data, // El navegador pone el Content-Type multipart/form-data automático
      });

      if (!res.ok) throw new Error('Error al guardar el producto');
      
      setStatusMsg('¡Celular agregado al catálogo de manera exitosa!');
      setFormData({
        id: '', category: 'iphone', title: '', condition: '', priceCOP: '', descriptionLines: '', longDescription: ''
      });
      setImageFile(null);
    } catch (err) {
      console.error(err);
      setStatusMsg('Ocurrió un error al guardar.');
    }
  };

  return (
    <div className="page-container">
      <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', textDecoration: 'none', marginBottom: '20px' }}>
        <ArrowLeft size={20} />
        Volver a la tienda
      </Link>
      
      <h1 style={{ marginBottom: '20px', fontSize: '2rem' }}>Panel de Administración</h1>

      <div className="tabs-container" style={{ marginBottom: '30px', display: 'inline-flex' }}>
        <button 
          className={`tab-btn ${activeTab === 'nuevo' ? 'active' : ''}`}
          onClick={() => setActiveTab('nuevo')}
        >
          <PlusCircle size={18} style={{ display: 'inline', marginRight: '5px', verticalAlign: 'middle' }}/>
          Agregar Celular
        </button>
        <button 
          className={`tab-btn ${activeTab === 'pedidos' ? 'active' : ''}`}
          onClick={() => setActiveTab('pedidos')}
        >
          <Package size={18} style={{ display: 'inline', marginRight: '5px', verticalAlign: 'middle' }}/>
          Ver Pedidos
        </button>
      </div>

      {activeTab === 'nuevo' && (
        <form onSubmit={handleSubmit} style={{ background: 'var(--bg-secondary)', padding: '30px', borderRadius: '16px', border: '1px solid var(--border-glass)'}}>
          <h2 style={{ marginBottom: '20px' }}>Crear Nuevo Producto</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(200px, 1fr) minmax(200px, 1fr)', gap: '20px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>ID único (ej. iphone-18)</label>
              <input type="text" name="id" required value={formData.id} onChange={handleInputChange} className="form-input" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-glass)', background: 'var(--bg-primary)', color: 'white' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Categoría</label>
              <select name="category" value={formData.category} onChange={handleInputChange} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-glass)', background: 'var(--bg-primary)', color: 'white' }}>
                <option value="iphone">iPhone</option>
                <option value="android">Android</option>
                <option value="consolas">Consolas</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Título Comercial</label>
              <input type="text" name="title" required value={formData.title} onChange={handleInputChange} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-glass)', background: 'var(--bg-primary)', color: 'white' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Precio (COP)</label>
              <input type="number" name="priceCOP" required value={formData.priceCOP} onChange={handleInputChange} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-glass)', background: 'var(--bg-primary)', color: 'white' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Condición (Nueva/Usada) - Opcional</label>
              <input type="text" name="condition" value={formData.condition} onChange={handleInputChange} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-glass)', background: 'var(--bg-primary)', color: 'white' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Subir Imagen Físicamente</label>
              <input type="file" accept="image/*" onChange={handleFileChange} style={{ width: '100%', padding: '10px', color: 'white' }} />
            </div>
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Mini Características (separadas por coma)</label>
            <input type="text" name="descriptionLines" placeholder="ej: 128GB, Color Azul, 1 año de garantía" value={formData.descriptionLines} onChange={handleInputChange} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-glass)', background: 'var(--bg-primary)', color: 'white' }} />
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Descripción Larga</label>
            <textarea name="longDescription" rows="4" value={formData.longDescription} onChange={handleInputChange} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-glass)', background: 'var(--bg-primary)', color: 'white', fontFamily: 'inherit' }}></textarea>
          </div>

          <button type="submit" className="btn-add-cart" style={{minWidth: '200px'}}>Guardar Producto</button>
          {statusMsg && <p style={{ marginTop: '15px', color: 'var(--success)' }}>{statusMsg}</p>}
        </form>
      )}

      {activeTab === 'pedidos' && (
        <div style={{ background: 'var(--bg-secondary)', padding: '30px', borderRadius: '16px', border: '1px solid var(--border-glass)'}}>
          <h2 style={{ marginBottom: '20px' }}>Órdenes Recientes</h2>
          {pedidos.length === 0 ? (
            <p style={{ color: 'var(--text-muted)' }}>Aún no hay pedidos registrados.</p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-glass)' }}>
                    <th style={{ padding: '12px', color: 'var(--text-muted)' }}>ID</th>
                    <th style={{ padding: '12px', color: 'var(--text-muted)' }}>Fecha</th>
                    <th style={{ padding: '12px', color: 'var(--text-muted)' }}>Cliente</th>
                    <th style={{ padding: '12px', color: 'var(--text-muted)' }}>Ciudad</th>
                    <th style={{ padding: '12px', color: 'var(--text-muted)' }}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {pedidos.map(p => (
                    <tr key={p.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '12px' }}>#{p.id}</td>
                      <td style={{ padding: '12px' }}>{new Date(p.fecha).toLocaleString()}</td>
                      <td style={{ padding: '12px' }}>
                        {p.nombre}<br/>
                        <span style={{color: 'var(--text-muted)', fontSize: '0.85em'}}>{p.telefono}</span>
                      </td>
                      <td style={{ padding: '12px' }}>{p.ciudad}</td>
                      <td style={{ padding: '12px', color: 'var(--accent)', fontWeight: 'bold' }}>{formatCOP(p.total)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
