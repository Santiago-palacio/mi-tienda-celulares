const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Conectamos o creamos la base de datos de SQLite
const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error al abrir la base de datos:', err.message);
  } else {
    console.log('Conectado a la base de datos SQLite.');
    initDb();
  }
});

function initDb() {
  db.serialize(() => {
    // 1. Crear tabla productos
    db.run(`
      CREATE TABLE IF NOT EXISTS productos (
        id TEXT PRIMARY KEY,
        category TEXT,
        title TEXT,
        condition TEXT,
        priceCOP INTEGER,
        images TEXT,
        descriptionLines TEXT,
        longDescription TEXT
      )
    `);

    // 2. Verificar si la tabla está vacía para inyectar los datos iniciales
    db.get('SELECT COUNT(*) AS count FROM productos', (err, row) => {
      if (err) {
        console.error('Error verificando productos:', err);
        return;
      }
      if (row.count === 0) {
        console.log('La tabla productos está vacía. Insertando celulares por defecto...');
        seedProducts();
      } else {
        console.log(`La base de datos ya contiene ${row.count} productos.`);
      }
    });

    // 3. Crear tabla de pedidos (para el checkout)
    db.run(`
      CREATE TABLE IF NOT EXISTS pedidos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT,
        telefono TEXT,
        direccion TEXT,
        ciudad TEXT,
        total INTEGER,
        estado TEXT DEFAULT 'pendiente',
        fecha DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 4. Crear tabla de items_pedido (los detalles de cada carrito)
    db.run(`
      CREATE TABLE IF NOT EXISTS items_pedido (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        pedido_id INTEGER,
        producto_id TEXT,
        cantidad INTEGER,
        precio_unitario INTEGER,
        FOREIGN KEY (pedido_id) REFERENCES pedidos(id)
      )
    `);
  });
}

function seedProducts() {
  const products = [
    {
      category: "iphone",
      id: "iphone-13-pro-max-128",
      title: "iPhone 13 Pro Max 128 GB",
      images: [
        "images/WhatsApp Image 2026-03-28 at 12.32.54 PM.jpeg",
        "images/Iphone 13 pro max2.jfif",
      ],
      descriptionLines: ["1 unidad", "13 pro max 128 GB", "84% original", "Blanco"],
      longDescription: "El **iPhone 13 Pro Max** es un celular de alta gama ideal para quienes buscan potencia, excelente cámara y batería duradera.",
      priceCOP: 1750000,
    },
    {
      category: "iphone",
      id: "iphone-16-pro-max",
      title: "iPhone 16 Pro Max",
      images: ["images/images.jfif", "images/images.jfif"],
      descriptionLines: ["Color disponible: titanio naranjado"],
      longDescription: "Es un smartphone de última generación pensado para quienes quieren lo mejor en tecnología...",
      priceCOP: 3950000,
    },
    {
      category: "iphone",
      id: "iphone-17-pro-max",
      title: "iPhone 17 Pro Max",
      images: ["images/Iphone 17 pro max.jfif", "images/Iphone 17 pro max.jfif"],
      descriptionLines: ["Colores disponibles: naranja, azul y blanco"],
      longDescription: "El iPhone 17 Pro Max es un celular premium de última generación...",
      priceCOP: 5500000,
    },
    {
      category: "iphone",
      id: "iphone-15",
      title: "iPhone 15",
      images: ["images/Iphone 15.jfif", "images/Iphone 15.jfif"],
      descriptionLines: ["Colores disponibles: rosa, blanco y verde"],
      longDescription: "Es un smartphone ideal para quienes buscan calidad...",
      priceCOP: 2300000,
    },
    {
      category: "iphone",
      id: "iphone-14-pro",
      title: "Usado-Nuevo iPhone 14 Pro",
      images: ["images/iphone 14 pro.jfif", "images/iphone 14 pro.jfif"],
      descriptionLines: ["Colores: negro, dorado, morado", "Almacenamiento: 128GB / 256GB / 512GB", "Cámara de 48MP", "Dynamic Island"],
      longDescription: "El iPhone 14 Pro es un celular premium con excelente rendimiento y cámara profesional.",
      priceCOP: 600000,
    },
    {
      category: "iphone",
      id: "iphone-14-pro-max",
      title: "iPhone 14 Pro Max",
      images: ["images/iphone 14 pro max.jfif", "images/iphone 14 pro max.jfif"],
      descriptionLines: ["Colores: negro, dorado, morado", "Almacenamiento: 128GB / 256GB / 512GB / 1TB", "Cámara de 48MP", "Dynamic Island"],
      longDescription: "El iPhone 14 Pro Max es un celular de gama alta con excelente rendimiento y batería de larga duración.",
      priceCOP: 2200000,
    },
    {
      category: "android",
      id: "samsung-s26-ultra",
      title: "Samsung Galaxy S26 Ultra",
      images: ["images/Samsung s26 ultra.jfif", "images/Samsung s26 ultra.jfif"],
      descriptionLines: ["Colores: negro, blanco, azul, violeta", "Almacenamiento: 256GB / 512GB / 1TB", "Cámara de 200MP", "Incluye S Pen"],
      longDescription: "El Samsung Galaxy S26 Ultra es un celular de gama alta diseñado para quienes buscan lo mejor en tecnología.",
      priceCOP: 5200000,
    },
    {
      category: "android",
      id: "xiaomi-14t-pro",
      title: "Xiaomi 14T Pro",
      images: ["images/xiaomi 14t pro.jfif", "images/xiaomi 14t pro.jfif"],
      descriptionLines: ["Colores: negro, azul, gris", "Almacenamiento: 256GB / 512GB", "Cámara Leica de 50MP", "Pantalla AMOLED 144Hz"],
      longDescription: "El Xiaomi 14T Pro es un smartphone potente y moderno, ideal para quienes buscan alto rendimiento...",
      priceCOP: 1390000,
    },
    {
      category: "android",
      id: "samsung-a56",
      title: "Samsung Galaxy A56 ",
      images: ["images/samsung a56.jfif", "images/samsung a56.jfif"],
      descriptionLines: ["Colores: negro, azul, verde", "Almacenamiento: 128GB / 256GB", "Pantalla AMOLED 120Hz", "Batería de larga duración"],
      longDescription: "El Samsung Galaxy A56 es un celular equilibrado ideal para el día a día.",
      priceCOP: 1100000,
    },
    {
      category: "android",
      id: "poco-x6-pro",
      title: "POCO X6 Pro",
      images: ["images/poco x6 pro.jfif", "images/poco x6 pro.jfif"],
      descriptionLines: ["Colores: negro, amarillo, gris", "Almacenamiento: 256GB / 512GB", "Procesador muy potente", "Pantalla AMOLED 120Hz"],
      longDescription: "El POCO X6 Pro es un celular potente ideal para gaming y alto rendimiento.",
      priceCOP: 950000,
    },
    {
      category: "consolas",
      condition: "Nueva",
      id: "playstation-5-digital",
      title: "PlayStation 5 Digital Edition",
      images: ["images/Play 5.jfif", "images/Play 52.jfif"],
      descriptionLines: ["Nueva, sellada", "1TB de almacenamiento", "Incluye 1 control DualSense"],
      longDescription: "La PlayStation 5 Digital Edition desata nuevas posibilidades de juego que nunca anticipaste.",
      priceCOP: 2200000,
    },
    {
      category: "consolas",
      condition: "Usada",
      id: "xbox-series-s-usada",
      title: "Xbox Series S",
      images: ["images/image.jfif"],
      descriptionLines: ["Usada, en perfectas condiciones", "512GB de almacenamiento", "Incluye cables originales y control"],
      longDescription: "La Xbox Series S es la consola más pequeña y elegante de Xbox.",
      priceCOP: 1100000,
    }
  ];

  const stmt = db.prepare('INSERT INTO productos VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
  products.forEach(p => {
    stmt.run(
      p.id,
      p.category,
      p.title,
      p.condition || null,
      p.priceCOP,
      JSON.stringify(p.images),
      JSON.stringify(p.descriptionLines),
      p.longDescription || ""
    );
  });
  stmt.finalize();
  console.log('Datos iniciales insertados correctamente.');
}

module.exports = db;
