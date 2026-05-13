// ===============================
// VARIABLES GLOBALES
// ===============================

const API_URL = 'https://dummyjson.com/products';

const productsGrid =
  document.getElementById('productsGrid');

const paginationContainer =
  document.getElementById('pagination');

let currentPage = 1;

const itemsPerPage = 10;

let totalProducts = 0;


// ===============================
// MÓDULO LOADER
// ===============================

function showLoader(message = 'Cargando productos...') {

  productsGrid.innerHTML = `
    <div style="text-align:center; padding: 3rem;">
      <p>${message}</p>
    </div>
  `;

}


// ===============================
// MÓDULO ERROR
// ===============================

function showError(message = 'Ocurrió un error') {

  productsGrid.innerHTML = `
    <div style="text-align:center; padding: 3rem;">
      <p>${message}</p>
    </div>
  `;

}


// ===============================
// MÓDULO FETCH PRODUCTS
// ===============================

async function fetchProducts(page = 1) {

  currentPage = page;

  showLoader();

  try {

    // CALCULAR CUÁNTOS PRODUCTOS SALTAR

    const skip =
      (currentPage - 1) * itemsPerPage;

    // PETICIÓN A LA API

    const response = await fetch(
      `${API_URL}?limit=${itemsPerPage}&skip=${skip}`
    );

    // CONVERTIR RESPUESTA A JSON

    const data = await response.json();

    // GUARDAR TOTAL DE PRODUCTOS

    totalProducts = data.total;

    // RENDERIZAR PRODUCTOS

    renderProducts(data.products);

    // RENDERIZAR PAGINACIÓN

    renderPagination();

  } catch (error) {

    console.error(error);

    showError('Error al cargar productos');

  }

}


// ===============================
// MÓDULO RENDER PRODUCTS
// ===============================

function renderProducts(products) {

  // SI NO HAY PRODUCTOS

  if (products.length === 0) {

    productsGrid.innerHTML = `
      <p>No hay productos disponibles</p>
    `;

    return;
  }

  // CREAR HTML DINÁMICO

  productsGrid.innerHTML = products.map(product => {

    return `
      <div class="product-card">

        <img
          src="${product.thumbnail}"
          alt="${product.title}"
          class="product-img"
        >

        <h3>${product.title}</h3>

        <p>$${product.price}</p>

        <button
          class="btn-add"
          onclick="addToCart(${product.id})"
        >
          Agregar
        </button>

      </div>
    `;

  }).join('');

}


// ===============================
// MÓDULO PAGINACIÓN
// ===============================

function renderPagination() {

  // CALCULAR TOTAL DE PÁGINAS

  const totalPages =
    Math.ceil(totalProducts / itemsPerPage);

  let html = '';

  // BOTÓN ANTERIOR

  html += `
    <button
      class="page-btn"
      ${currentPage === 1 ? 'disabled' : ''}
      onclick="fetchProducts(${currentPage - 1})"
    >
      Anterior
    </button>
  `;

  // BOTONES DE PÁGINAS

  for (let i = 1; i <= totalPages; i++) {

    html += `
      <button
        class="page-btn ${i === currentPage ? 'active' : ''}"
        onclick="fetchProducts(${i})"
      >
        ${i}
      </button>
    `;

  }

  // BOTÓN SIGUIENTE

  html += `
    <button
      class="page-btn"
      ${currentPage === totalPages ? 'disabled' : ''}
      onclick="fetchProducts(${currentPage + 1})"
    >
      Siguiente
    </button>
  `;

  // INSERTAR HTML

  paginationContainer.innerHTML = html;

}


// ===============================
// MÓDULO CARRITO
// ===============================

function addToCart(id) {

  alert(`Producto ${id} agregado al carrito`);

}


// ===============================
// START APP
// ===============================

fetchProducts();