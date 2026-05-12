// =======================================
// CONFIGURACIÓN DE LA API
// =======================================
const API_URL = 'https://dummyjson.com';

// Estado de la aplicación (donde guardamos los datos)
let allProducts = [];

// =======================================
// LÓGICA DE NAVEGACIÓN (Fase 2)
// =======================================
const navButtons = document.querySelectorAll('.nav-link');

navButtons.forEach(button => {
  button.addEventListener('click', () => {
    const targetSection = button.dataset.section;
    
    navButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    
    document.querySelectorAll('.section').forEach(section => {
      section.classList.remove('active');
    });
    
    document.getElementById(targetSection).classList.add('active');
  });
});

// =======================================
// CONSUMO DE API - PRODUCTOS (Fase 3)
// =======================================

// 1. Función para obtener los datos de DummyJSON
async function fetchProducts() {
  const grid = document.getElementById('productsGrid');
  
  // Mostramos un estado de carga mientras esperamos la API
  grid.innerHTML = `
    <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 0;">
      <div class="loader" style="margin-bottom: 1rem;"></div>
      <p style="color:var(--text-muted);">Consultando la API de DummyJSON...</p>
    </div>
  `;

  try {
    // Hacemos la petición GET
    const response = await fetch(`${API_URL}/products?limit=30`);
    
    // Si la respuesta no es OK, lanzamos un error
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    // Convertimos la respuesta a JSON
    const data = await response.json();
    
    // Guardamos los productos en nuestro estado
    allProducts = data.products;

    // 2. Renderizamos los productos en el DOM
    renderProducts(allProducts);

  } catch (error) {
    console.error("Error al obtener los productos:", error);
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 0;">
        <i class="bi bi-exclamation-triangle" style="font-size: 3rem; color: var(--danger);"></i>
        <p style="color:var(--danger); margin-top: 1rem;">Error al cargar los productos.</p>
      </div>
    `;
  }
}

// 3. Función para inyectar el HTML de las tarjetas
function renderProducts(productsArray) {
  const grid = document.getElementById('productsGrid');

  // Si no hay productos (pasará en la Fase 4 cuando filtremos y no haya resultados)
  if (productsArray.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 0;">
        <p style="color:var(--text-muted);">No se encontraron productos.</p>
      </div>
    `;
    return;
  }

  // Mapeamos el array de productos y creamos el HTML para cada uno
  const htmlString = productsArray.map(p => {
    // Calculamos el descuento y precio final
    const discount = Math.round(p.discountPercentage);
    const finalPrice = (p.price - (p.price * (discount / 100))).toFixed(2);
    const hasDiscount = discount > 0;

    // Retornamos la tarjeta HTML para este producto
    return `
      <div class="product-card">
        <div class="product-img-container">
          ${hasDiscount ? `<span class="discount-badge">-${discount}%</span>` : ''}
          <img src="${p.thumbnail}" alt="${p.title}" class="product-img" loading="lazy">
        </div>
        <div class="product-info">
          <span class="product-category">${p.category}</span>
          <h3 class="product-title">${p.title}</h3>
          <div class="product-rating">
            <i class="bi bi-star-fill"></i> ${p.rating.toFixed(1)}
          </div>
          <div class="product-price-container">
            <div>
              <span class="product-price">$${finalPrice}</span>
              ${hasDiscount ? `<span class="product-original-price">$${p.price}</span>` : ''}
            </div>
            <button class="btn-add" onclick="addToCart(${p.id})" title="Agregar al carrito">
              <i class="bi bi-plus"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join(''); // Unimos todo el array en un solo string de HTML

  // Inyectamos el HTML en el DOM
  grid.innerHTML = htmlString;
}

// Función temporal para el carrito (la construiremos en la Fase 5)
function addToCart(id) {
  alert(`Producto ${id} agregado. (Carrito real en la Fase 5)`);
}

// =======================================
// INICIALIZACIÓN DE LA APP
// =======================================
// Cuando el script carga, ejecutamos la función para traer los productos
fetchProducts();

console.log("NEXUS inicializado (Fase 3: Consumo de API activo).");