const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./database');
const multer = require('multer');
const { MercadoPagoConfig, Preference } = require('mercadopago');

// --- CONFIGURACIÓN DE MERCADOPAGO ---
// NOTA: Reemplaza este Access Token con tu token real ('TEST-....') desde tu panel de desarrolladores
const client = new MercadoPagoConfig({ accessToken: 'TEST-1234567890123456-abcdef-123456-abcdefghijklmnopqrstuvwxyz' });

const app = express();
const PORT = process.env.PORT || 3001;

// Configuración de Multer para subir imágenes al disco local
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Se guardarán en la misma carpeta public/images de donde las servimos
    cb(null, path.join(__dirname, 'public', 'images'));
  },
  filename: (req, file, cb) => {
    // Creamos un nombre único respetando la extensión
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Middlewares
app.use(cors()); // Permite peticiones desde el Frontend (React)
app.use(express.json()); // Permite leer datos en formato JSON enviados en el body

// Servir la carpeta estática de imágenes
// Para que el frontend pueda cargar 'http://localhost:3001/images/algo.jpg'
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));

// Rutas de la API

// 1. Obtener todos los productos
app.get('/api/productos', (req, res) => {
  db.all('SELECT * FROM productos', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    // Parseamos los JSON de las columnas arrays (images, descriptionLines)
    const productos = rows.map(r => ({
      ...r,
      images: JSON.parse(r.images || '[]'),
      descriptionLines: JSON.parse(r.descriptionLines || '[]')
    }));
    res.json(productos);
  });
});

// 2. Crear una orden y preferencia de pago
app.post('/api/create-order', (req, res) => {
  const { userData, cartItems, total } = req.body;

  // Primero, guardamos el pedido en nuestra base de datos (estado inicial 'pendiente')
  db.run(
    'INSERT INTO pedidos (nombre, telefono, direccion, ciudad, total) VALUES (?, ?, ?, ?, ?)',
    [userData.nombre, userData.telefono, userData.direccion, userData.ciudad, total],
    function (err) {
      if (err) {
        return res.status(500).json({ error: 'Error guardando datos en la base de datos' });
      }

      const orderId = this.lastID;

      // Generar los items para MercadoPago mapeando desde nuestro carrito
      const preferenceItems = cartItems.map(item => ({
        title: item.title,
        unit_price: Number(item.priceCOP),
        quantity: Number(item.qty),
        currency_id: 'COP' // Moneda local de Colombia
      }));

      const testToken = 'TEST-1234567890123456-abcdef-123456-abcdefghijklmnopqrstuvwxyz';

      // SI EL USUARIO AÚN TIENE EL TOKEN FALSO, SIMULAMOS EL PAGO PARA QUE LA PÁGINA "FUNCIONE" EN ESTA DEMO
      if (client.accessToken === testToken) {
        console.log("Modo Prueba Local Activado: Simulando pago sin MercadoPago");
        return res.json({
          id: `simulated_pref_${orderId}`,
          sandbox_url: `http://localhost:5173/success?status=approved&payment_id=SIMULADO-${Math.floor(Math.random() * 10000)}&external_reference=${orderId}`,
          url: `http://localhost:5173/success?status=approved&payment_id=SIMULADO-${Math.floor(Math.random() * 10000)}&external_reference=${orderId}`,
          orderId: orderId
        });
      }

      // Creamos la preferencia en MercadoPago (Sólo funciona si el token es real)
      const preference = new Preference(client);
      
      preference.create({
        body: {
          items: preferenceItems,
          back_urls: {
            success: 'http://localhost:5173/success',
            failure: 'http://localhost:5173/cart',
            pending: 'http://localhost:5173/cart',
          },
          auto_return: 'approved',
          external_reference: orderId.toString()
        }
      })
      .then((response) => {
        res.json({
          id: response.id,
          sandbox_url: response.sandbox_init_point,
          url: response.init_point,
          orderId: orderId
        });
      })
      .catch((error) => {
        console.error('Error procesando MercadoPago', error);
        res.status(500).json({ error: 'Error creando preferencia de pago' });
      });
    }
  );
});

// 3. Crear nuevo producto (Ruta de Administrador)
// Usamos upload.single('image') para capturar la imagen envíada en el form
app.post('/api/productos', upload.single('image'), (req, res) => {
  const { id, category, title, condition, priceCOP, descriptionLines, longDescription } = req.body;
  
  // Si multer guardó un archivo, guardamos la ruta relativa
  // Ejemplo de cómo se guardaba antes: "images/mi_foto.jpg"
  const imagePath = req.file ? `images/${req.file.filename}` : '';
  const imagesArray = imagePath ? [imagePath] : [];

  // Lo insertamos en la BD de SQLite
  db.run(
    'INSERT INTO productos (id, category, title, condition, priceCOP, images, descriptionLines, longDescription) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [
      id, 
      category, 
      title, 
      condition || null, 
      Number(priceCOP), 
      JSON.stringify(imagesArray), 
      JSON.stringify(descriptionLines ? descriptionLines.split(',') : []), 
      longDescription || ''
    ],
    function (err) {
      if (err) {
        console.error('Error insertando producto:', err);
        return res.status(500).json({ error: 'No se pudo guardar el producto.' });
      }
      res.json({ message: 'Producto creado exitosamente!', productId: id });
    }
  );
});

// 4. Ver todos los pedidos (Panel de Admin)
app.get('/api/pedidos', (req, res) => {
  db.all('SELECT * FROM pedidos ORDER BY fecha DESC', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// 5. Ruta de prueba
app.get('/api/health', (req, res) => {
  res.json({ message: 'El servidor funciona correctamente!' });
});

// Arrancar el servidor
app.listen(PORT, () => {
  console.log(`Servidor Backend corriendo en http://localhost:${PORT}`);
});
