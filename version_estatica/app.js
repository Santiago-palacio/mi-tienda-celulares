/**
 * Catálogo: añade productos en `products`.
 * Usa `category: "iphone"` o `category: "android"` para la sección correcta.
 * WhatsApp 312 242 8834 → internacional sin +: 573122428834 (Colombia +57).
 */
const WHATSAPP_NUMBER = "573122428834";

const IMG_PLACEHOLDER = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="500" viewBox="0 0 400 500"><rect fill="#1a222d" width="400" height="500"/><text x="200" y="250" fill="#5a6a7d" font-family="system-ui,sans-serif" font-size="15" text-anchor="middle">Añade la foto en /images</text></svg>'
)}`;

const products = [
  {
    category: "iphone",
    id: "iphone-13-pro-max-128",
    title: "iPhone 13 Pro Max 128 GB",
    images: [
      "images/WhatsApp Image 2026-03-28 at 12.32.54 PM.jpeg",
      "images/Iphone 13 pro max2.jfif",
    ],
    descriptionLines: [
      "1 unidad",
      "13 pro max 128 GB",
      "84% original",
      "Blanco",
    ],
    longDescription:
      "El **iPhone 13 Pro Max** es un celular de alta gama ideal para quienes buscan potencia, excelente cámara y batería duradera. Cuenta con una pantalla grande de 6.7” Super Retina XDR, procesador rápido A15 Bionic y sistema de cámaras profesionales que toman fotos y videos de gran calidad, incluso de noche. Su batería rinde todo el día y su diseño es elegante y resistente. Perfecto para trabajo, redes sociales y entretenimiento sin interrupciones.",
    priceCOP: 1750000,
  },
  {
    category: "iphone",
    id: "iphone-16-pro-max",
    title: "iPhone 16 Pro Max",
    images: ["images/images.jfif", "images/images.jfif"],
    descriptionLines: ["Color disponible: titanio naranjado"],
    longDescription:
      "Es un smartphone de última generación pensado para quienes quieren lo mejor en tecnología. Cuenta con una gran pantalla de 6.9” Super Retina XDR, potente chip A18 Pro que ofrece un rendimiento muy rápido y eficiente, y un sistema de cámaras profesionales de hasta 48 MP con zoom avanzado y grabación en 4K. Su batería tiene una excelente duración, ideal para todo el día, y su diseño en titanio lo hace resistente y elegante. Además, incluye funciones inteligentes y una experiencia fluida para trabajo, juegos y contenido multimedia.",
    priceCOP: 3950000,
  },
  {
    category: "iphone",
    id: "iphone-17-pro-max",
    title: "iPhone 17 Pro Max",
    images: [
      "images/Iphone 17 pro max.jfif",
      "images/Iphone 17 pro max.jfif",
    ],
    descriptionLines: ["Colores disponibles: naranja, azul y blanco"],
    longDescription:
      "El iPhone 17 Pro Max es un celular premium de última generación, diseñado para quienes buscan lo más avanzado en rendimiento y fotografía. Cuenta con una gran pantalla de 6.9” Super Retina XDR con tecnología ProMotion, potente chip A19 Pro y un sistema de cámaras profesionales de 48 MP que ofrece fotos y videos de calidad superior.\n\nAdemás, tiene una batería de larga duración que puede alcanzar hasta 37 horas de reproducción de video, un diseño resistente con Ceramic Shield 2 y funciones avanzadas de video en 4K.\n\nEs ideal para trabajo, gaming y creación de contenido, ofreciendo velocidad, potencia y una experiencia de gama alta en todo momento.",
    priceCOP: 5500000,
  },
  {
    category: "iphone",
    id: "iphone-15",
    title: "iPhone 15",
    images: ["images/Iphone 15.jfif", "images/Iphone 15.jfif"],
    descriptionLines: ["Colores disponibles: rosa, blanco y verde"],
    longDescription:
      "Es un smartphone ideal para quienes buscan calidad, buen rendimiento y excelente cámara a un precio más accesible.\n\nCuenta con pantalla de 6.1” Super Retina XDR con colores vivos y gran brillo, potente chip A16 Bionic que garantiza rapidez en todas las aplicaciones y una cámara principal de 48 MP que toma fotos muy nítidas y detalladas.",
    priceCOP: 2300000,
  },

  {
  category: "iphone",
  id: "iphone-14-pro",
  title: "Usado-Nuevo iPhone 14 Pro",
  images: [
    "images/iphone 14 pro.jfif",
    "images/iphone 14 pro.jfif",
  ],
  descriptionLines: [
    "Colores: negro, dorado, morado",
    "Almacenamiento: 128GB / 256GB / 512GB",
    "Cámara de 48MP",
    "Dynamic Island",
  ],
  longDescription:
    "El iPhone 14 Pro es un celular premium con excelente rendimiento y cámara profesional. Cuenta con pantalla Super Retina XDR, chip A16 Bionic y sistema de cámaras avanzado.\n\nIdeal para fotos, videos, redes sociales y uso exigente.",
  priceCOP: 600000,
},
{
  category: "iphone",
  id: "iphone-14-pro-max",
  title: "iPhone 14 Pro Max",
  images: [
    "images/iphone 14 pro max.jfif",
    "images/iphone 14 pro max.jfif",
  ],
  descriptionLines: [
    "Colores: negro, dorado, morado",
    "Almacenamiento: 128GB / 256GB / 512GB / 1TB",
    "Cámara de 48MP",
    "Dynamic Island",
  ],
  longDescription:
    "El iPhone 14 Pro Max es un celular de gama alta con excelente rendimiento y batería de larga duración. Cuenta con pantalla grande Super Retina XDR, chip A16 Bionic y cámara profesional de 48MP.\n\nIdeal para fotos, videos, redes sociales y uso exigente durante todo el día.",
  priceCOP: 2200000,
},

{
  category: "android",
  id: "samsung-s26-ultra",
  title: "Samsung Galaxy S26 Ultra",
 images: [
  "images/Samsung s26 ultra.jfif",
  "images/Samsung s26 ultra.jfif",
],
  descriptionLines: [
    "Colores: negro, blanco, azul, violeta",
    "Almacenamiento: 256GB / 512GB / 1TB",
    "Cámara de 200MP",
    "Incluye S Pen",
  ],
  longDescription:
    "El Samsung Galaxy S26 Ultra es un celular de gama alta diseñado para quienes buscan lo mejor en tecnología. Cuenta con una pantalla grande y brillante, procesador potente de última generación y una cámara profesional de 200 MP que toma fotos y videos de alta calidad.\n\nIncluye S Pen integrado, ideal para trabajo, estudio y productividad. Su batería es de larga duración y permite uso intensivo durante todo el día.\n\nDisponible en varios colores y versiones de almacenamiento, es perfecto para redes sociales, gaming, trabajo y creación de contenido.",
  priceCOP: 5200000,
},
{
  category: "android",
  id: "xiaomi-14t-pro",
  title: "Xiaomi 14T Pro",
  images: [
    "images/xiaomi 14t pro.jfif",
    "images/xiaomi 14t pro.jfif",
  ],
  descriptionLines: [
    "Colores: negro, azul, gris",
    "Almacenamiento: 256GB / 512GB",
    "Cámara Leica de 50MP",
    "Pantalla AMOLED 144Hz",
  ],
  longDescription:
    "El Xiaomi 14T Pro es un smartphone potente y moderno, ideal para quienes buscan alto rendimiento y excelente cámara. Cuenta con procesador de última generación, pantalla AMOLED fluida de 144Hz y sistema de cámaras Leica que ofrece fotos y videos de gran calidad.\n\nSu batería de larga duración con carga rápida lo hace perfecto para uso diario, gaming y contenido multimedia. Es una excelente opción en gama alta con gran relación calidad-precio.",
  priceCOP: 1390000,
},
{
  category: "android",
  id: "samsung-a56",
  title: "Samsung Galaxy A56 ",
  images: [
    "images/samsung a56.jfif",
    "images/samsung a56.jfif",
  ],
  descriptionLines: [
    "Colores: negro, azul, verde",
    "Almacenamiento: 128GB / 256GB",
    "Pantalla AMOLED 120Hz",
    "Batería de larga duración",
  ],
  longDescription:
    "El Samsung Galaxy A56 es un celular equilibrado ideal para el día a día. Cuenta con pantalla AMOLED fluida de 120Hz, buen rendimiento para redes sociales, juegos y trabajo.\n\nSu batería dura todo el día y su diseño es moderno y resistente. Es una excelente opción en gama media con muy buen precio.",
  priceCOP: 1100000,
},
{
  category: "android",
  id: "poco-x6-pro",
  title: "POCO X6 Pro",
  images: [
    "images/poco x6 pro.jfif",
    "images/poco x6 pro.jfif",
  ],
  descriptionLines: [
    "Colores: negro, amarillo, gris",
    "Almacenamiento: 256GB / 512GB",
    "Procesador muy potente",
    "Pantalla AMOLED 120Hz",
  ],
  longDescription:
    "El POCO X6 Pro es un celular potente ideal para gaming y alto rendimiento. Cuenta con uno de los mejores procesadores de su gama, pantalla AMOLED fluida de 120Hz y excelente velocidad en aplicaciones.\n\nPerfecto para quienes buscan potencia, rendimiento y buen precio en un solo equipo.",
  priceCOP: 950000,
},
{
  category: "consolas",
  id: "playstation-5-digital",
  title: "PlayStation 5 Digital Edition",
  condition: "Nueva",
  images: [
    "images/Play 5.jfif", 
    "images/Play 52.jfif",
  ],
  descriptionLines: [
    "Nueva, sellada",
    "1TB de almacenamiento",
    "Incluye 1 control DualSense"
  ],
  longDescription: "La **PlayStation 5 Digital Edition** desata nuevas posibilidades de juego que nunca anticipaste. Experimenta una carga ultrarrápida con su SSD de ultra alta velocidad.\n\nDisfruta de una inmersión más profunda con soporte para retroalimentación háptica, gatillos adaptativos y audio 3D. Es una consola ideal para disfrutar de los mejores exclusivos de Sony.",
  priceCOP: 2200000,
},
{
  category: "consolas",
  id: "xbox-series-s-usada",
  title: "Xbox Series S",
  condition: "Usada",
  images: [
    "images/image.jfif"
  ],
  descriptionLines: [
    "Usada, en perfectas condiciones",
    "512GB de almacenamiento",
    "Incluye cables originales y control"
  ],
  longDescription: "La **Xbox Series S** es la consola más pequeña y elegante de Xbox. Experimenta la velocidad y el rendimiento de una consola totalmente digital a un precio accesible.\n\nPerfecta para Xbox Game Pass, lo que te permite jugar cientos de juegos de alta calidad.",
  priceCOP: 1100000,
}
];

function formatCOP(value) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

function buildWhatsAppUrl(product) {
  const lines = [
    `Hola, me interesa: ${product.title}`,
    "",
    ...product.descriptionLines.map((l) => `• ${l}`),
    "",
    `Precio: ${formatCOP(product.priceCOP)}`,
  ];
  const text = lines.join("\n");
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

/** Normaliza texto para buscar sin importar mayúsculas ni tildes */
function normalizeSearch(str) {
  try {
    return str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  } catch {
    return str.toLowerCase();
  }
}

function getSearchQuery() {
  const input = document.getElementById("search");
  return input ? input.value.trim() : "";
}

const TAB_CONFIG = {
  iphone: {
    title: "iPhone",
    subtitle: "Apple",
    searchPlaceholder: "Buscar iPhone (modelo, GB, color…)",
  },
  android: {
    title: "Android",
    subtitle: "Samsung, Xiaomi, Motorola y más",
    searchPlaceholder: "Buscar Android (marca, modelo…)",
  },
  consolas: {
    title: "Consolas",
    subtitle: "PlayStation, Xbox, Nintendo y más",
    searchPlaceholder: "Buscar Consolas (marca, modelo, condición…)",
  }
};

let activeCatalogTab = "iphone";

function productMatchesQuery(p, query) {
  if (!query) return true;
  const needle = normalizeSearch(query);
  const haystack = normalizeSearch(
    [
      p.title,
      p.id,
      p.category || "",
      ...p.descriptionLines,
      p.longDescription || "",
    ].join(" ")
  );
  return haystack.includes(needle);
}

function getProductsForTab(category) {
  const query = getSearchQuery();
  return products.filter(
    (p) => p.category === category && productMatchesQuery(p, query)
  );
}

function countProductsInCategory(category) {
  return products.filter((p) => p.category === category).length;
}

function updateCatalogMeta(visible, totalInCategory, tab, query) {
  const el = document.getElementById("catalog-meta");
  if (!el) return;
  
  let label = "modelos";
  if (tab === "iphone") label = "iPhone";
  else if (tab === "android") label = "Android";
  else if (tab === "consolas") label = "Consolas";

  if (query) {
    el.innerHTML = `${label}: mostrando <strong>${visible}</strong> de ${totalInCategory} · búsqueda: “${escapeHtml(query)}”`;
  } else {
    el.innerHTML = `<strong>${visible}</strong> ${visible === 1 ? (tab === "consolas" ? "consola" : "modelo") : label}`;
  }
}

function setActiveCatalogTab(tab) {
  if (!["iphone", "android", "consolas"].includes(tab)) return;
  activeCatalogTab = tab;

  document.querySelectorAll(".catalog-tabs__btn").forEach((btn) => {
    const isOn = btn.getAttribute("data-view") === tab;
    btn.classList.toggle("is-active", isOn);
    btn.setAttribute("aria-selected", isOn ? "true" : "false");
  });

  const panel = document.getElementById("panel-catalog");
  if (panel) {
    panel.setAttribute(
      "aria-labelledby",
      tab === "iphone" ? "tab-iphone" : "tab-android"
    );
  }

  const cfg = TAB_CONFIG[tab];
  const titleEl = document.getElementById("catalog-panel-title");
  const subEl = document.getElementById("catalog-panel-subtitle");
  const searchInput = document.getElementById("search");
  if (titleEl && cfg) titleEl.textContent = cfg.title;
  if (subEl && cfg) subEl.textContent = cfg.subtitle;
  if (searchInput && cfg) searchInput.placeholder = cfg.searchPlaceholder;

  if (history.replaceState) {
    history.replaceState(null, "", `#${tab}`);
  }
}

function setupCatalogTabs() {
  const h = (location.hash || "").replace(/^#/, "").toLowerCase();
  if (["iphone", "android", "consolas"].includes(h)) {
    activeCatalogTab = h;
  }

  document.querySelectorAll(".catalog-tabs__btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const tab = btn.getAttribute("data-view");
      if (!tab) return;
      setActiveCatalogTab(tab);
      window.scrollTo(0, 0);
      renderProducts();
    });
  });
}

function renderProductCard(p) {
  let conditionBadge = '';
  if (p.condition) {
    const condClass = p.condition.toLowerCase() === 'nueva' ? 'badge-new' : 'badge-used';
    conditionBadge = `<span class="product-condition ${condClass}">${escapeHtml(p.condition)}</span>`;
  }
  return `
    <article class="product-card" data-id="${p.id}">
      <div class="product-gallery">
        ${p.images
          .map(
            (src) =>
              `<img class="product-gallery__img" src="${encodeURI(src)}" alt="${escapeHtml(p.title)}" loading="lazy" width="400" height="500" title="Ver ficha del producto" data-fallback-src />`
          )
          .join("")}
      </div>
      <div class="product-body">
        <h2 class="product-title">${conditionBadge} ${escapeHtml(p.title)}</h2>
        <ul class="product-desc">
          ${p.descriptionLines.map((line) => `<li>${escapeHtml(line)}</li>`).join("")}
        </ul>
        <p class="product-price"><span>${formatCOP(p.priceCOP)}</span></p>
        <a class="btn-whatsapp" href="${buildWhatsAppUrl(p)}" target="_blank" rel="noopener noreferrer">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          Encargar por WhatsApp
        </a>
      </div>
    </article>
  `;
}

function bindImageFallbacks(root) {
  if (!root) return;
  root.querySelectorAll("img[data-fallback-src]").forEach((img) => {
    img.addEventListener(
      "error",
      () => {
        img.removeAttribute("data-fallback-src");
        img.src = IMG_PLACEHOLDER;
      },
      { once: true }
    );
  });
}

function renderSectionGrid(gridEl, items) {
  if (!gridEl) return;
  if (items.length === 0) {
    gridEl.classList.add("products-grid--empty");
    gridEl.innerHTML = `<div class="catalog-section__empty">Sin modelos en esta sección con los filtros actuales.</div>`;
    return;
  }
  gridEl.classList.remove("products-grid--empty");
  gridEl.innerHTML = items.map((p) => renderProductCard(p)).join("");
  bindImageFallbacks(gridEl);
}

function renderProducts() {
  const catalog = document.getElementById("catalog");
  const noResults = document.getElementById("catalog-no-results");
  const catalogBody = document.getElementById("catalog-body");
  const grid = document.getElementById("products-grid");
  if (!catalog || !noResults || !catalogBody || !grid) return;

  const tab = activeCatalogTab;
  const list = getProductsForTab(tab);
  const totalInCategory = countProductsInCategory(tab);
  const query = getSearchQuery();

  updateCatalogMeta(list.length, totalInCategory, tab, query);

  if (list.length === 0) {
    noResults.hidden = false;
    catalogBody.hidden = true;
    return;
  }

  noResults.hidden = true;
  catalogBody.hidden = false;

  renderSectionGrid(grid, list);
}

let catalogTitleBase = "";

function longDescriptionToHtml(text) {
  if (!text) return "";
  const escaped = escapeHtml(text);
  const withBold = escaped.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  return withBold
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => `<p class="product-page__para">${p.replace(/\n/g, " ")}</p>`)
    .join("");
}

function openProductPage(product, imageSrc) {
  const page = document.getElementById("product-detail");
  const imgEl = document.getElementById("product-page-img");
  const titleEl = document.getElementById("product-page-title");
  const priceEl = document.getElementById("product-page-price");
  const longEl = document.getElementById("product-page-long");
  const descEl = document.getElementById("product-page-desc");
  const barTitle = document.getElementById("product-page-bar-title");
  const wa = document.getElementById("product-page-whatsapp");
  if (!page || !imgEl || !titleEl || !priceEl || !descEl || !wa) return;

  currentImages = (product.images || []).map((s) => encodeURI(s));
  const clicked = imageSrc ? String(imageSrc) : "";
  const clickedIdx = currentImages.findIndex((s) => s === clicked);
  currentImageIndex = clickedIdx >= 0 ? clickedIdx : 0;
  imgEl.src = currentImages[currentImageIndex] || IMG_PLACEHOLDER;
  imgEl.alt = product.title;
  let conditionText = '';
  if (product.condition) {
    const condClass = product.condition.toLowerCase() === 'nueva' ? 'badge-new' : 'badge-used';
    conditionText = `<span class="product-condition ${condClass}" style="font-size: 0.6em; vertical-align: middle; margin-right: 8px;">${escapeHtml(product.condition)}</span>`;
  }
  titleEl.innerHTML = `${conditionText} ${escapeHtml(product.title)}`;
  priceEl.textContent = formatCOP(product.priceCOP);
  if (barTitle) {
    barTitle.textContent = product.title;
  }
  if (longEl) {
    longEl.innerHTML = product.longDescription
      ? longDescriptionToHtml(product.longDescription)
      : "";
  }
  descEl.innerHTML = product.descriptionLines
    .map((line) => `<li>${escapeHtml(line)}</li>`)
    .join("");
  wa.href = buildWhatsAppUrl(product);

  page.removeAttribute("hidden");
  page.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");

  document.title = `${product.title} — ${catalogTitleBase || "Celulares"}`;

  requestAnimationFrame(() => {
    const scrollEl = page.querySelector(".product-page__scroll");
    if (scrollEl) scrollEl.scrollTop = 0;
    const back = document.getElementById("product-detail-back");
    if (back) back.focus();
  });
}

function closeProductPage() {
  const page = document.getElementById("product-detail");
  const imgEl = document.getElementById("product-page-img");
  if (!page) return;
  page.setAttribute("hidden", "");
  page.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  document.title = catalogTitleBase;

  if (imgEl) {
    imgEl.removeAttribute("src");
    imgEl.alt = "";
  }
  const descEl = document.getElementById("product-page-desc");
  if (descEl) descEl.innerHTML = "";
  const longEl = document.getElementById("product-page-long");
  if (longEl) longEl.innerHTML = "";
}

function setupProductPage() {
  const catalog = document.getElementById("catalog");
  if (catalog) {
    catalog.addEventListener("click", (e) => {
      if (e.target.closest("a.btn-whatsapp")) return;
      const card = e.target.closest(".product-card");
      if (!card) return;
      const id = card.getAttribute("data-id");
      const product = products.find((p) => p.id === id);
      if (!product) return;
      const thumb = e.target.closest(".product-gallery__img");
      const imageSrc = thumb
        ? thumb.currentSrc || thumb.src
        : encodeURI(product.images[0]);
      openProductPage(product, imageSrc);
    });
  }

  const back = document.getElementById("product-detail-back");
  if (back) {
    back.addEventListener("click", () => closeProductPage());
  }

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    const page = document.getElementById("product-detail");
    if (page && !page.hasAttribute("hidden")) {
      closeProductPage();
    }
  });
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

document.addEventListener("DOMContentLoaded", () => {
  catalogTitleBase = document.title;
  setupCatalogTabs();
  setActiveCatalogTab(activeCatalogTab);
  setupProductPage();
  renderProducts();
  const search = document.getElementById("search");
  if (search) {
    search.addEventListener("input", renderProducts);
    search.addEventListener("search", renderProducts);
  }
  setupCarousel();
  // Marquee infinito de marcas: ahora se maneja 100% con CSS en el banner.
});
let currentImageIndex = 0;
let currentImages = [];
function showImage(index) {
  const imgEl = document.getElementById("product-page-img");
  if (!currentImages.length) return;

  currentImageIndex = (index + currentImages.length) % currentImages.length;
  imgEl.src = currentImages[currentImageIndex];
}

function setupCarousel() {
  const prevBtn = document.getElementById("prev-img");
  const nextBtn = document.getElementById("next-img");
  const imgEl = document.getElementById("product-page-img");

  if (prevBtn) {
    prevBtn.addEventListener("click", () => showImage(currentImageIndex - 1));
  }
  if (nextBtn) {
    nextBtn.addEventListener("click", () => showImage(currentImageIndex + 1));
  }

  // Swipe en móviles (izq/der)
  if (imgEl) {
    let startX = 0;
    let startY = 0;
    let tracking = false;

    imgEl.addEventListener(
      "touchstart",
      (e) => {
        const t = e.touches && e.touches[0];
        if (!t) return;
        tracking = true;
        startX = t.clientX;
        startY = t.clientY;
      },
      { passive: true }
    );

    imgEl.addEventListener(
      "touchend",
      (e) => {
        if (!tracking) return;
        tracking = false;
        const t = e.changedTouches && e.changedTouches[0];
        if (!t) return;
        const dx = t.clientX - startX;
        const dy = t.clientY - startY;
        if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return;
        if (dx < 0) showImage(currentImageIndex + 1);
        else showImage(currentImageIndex - 1);
      },
      { passive: true }
    );
  }
}

function setupBrandMarqueeInfinite() {
  // Deshabilitado (la animación se hace con CSS + duplicación en HTML).
}