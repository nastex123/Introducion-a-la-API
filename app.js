// ======================================
// CLASE PADRE
// ======================================

class BaseManager {
  constructor() {
    this.API_URL = 'https://dummyjson.com';
  }

  // Loader reutilizable
  showLoader(container, message = 'Cargando...') {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 0;">
        <p style="color:var(--text-muted);">${message}</p>
      </div>
    `;
  }

  // Error reutilizable
  showError(container, message = 'Ocurrió un error') {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 0;">
        <i class="bi bi-exclamation-triangle"
           style="font-size: 3rem; color: var(--danger);"></i>

        <p style="color:var(--danger); margin-top: 1rem;">
          ${message}
        </p>
      </div>
    `;
  }

  // Request reutilizable
  async request(endpoint) {
    const response = await fetch(`${this.API_URL}${endpoint}`);

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    return response.json();
  }
}


// ======================================
// MÓDULO 1: ROUTER
// ======================================

class Router {
  constructor() {
    this.navButtons = document.querySelectorAll('.nav-link');
    this.init();
  }

  init() {
    this.navButtons.forEach(button => {
      button.addEventListener('click', () => this.switchSection(button));
    });
  }

  switchSection(button) {
    const targetSection = button.dataset.section;

    this.navButtons.forEach(btn => btn.classList.remove('active'));

    button.classList.add('active');

    document.querySelectorAll('.section')
      .forEach(section => section.classList.remove('active'));

    document.getElementById(targetSection)
      .classList.add('active');
  }
}


// ======================================
// MÓDULO 2: PRODUCT MANAGER
// HEREDA DE BASEMANAGER
// ======================================

class ProductManager extends BaseManager {

  constructor() {

    // SUPER LLAMA AL CONSTRUCTOR PADRE
    super();

    this.products = [];
    this.currentPage = 1;
    this.itemsPerPage = 10;
    this.totalProducts = 0;

    this.grid = document.getElementById('productsGrid');
    this.paginationContainer = document.getElementById('pagination');

    this.init();
  }

  init() {

    this.fetchProducts();

    // PAGINACIÓN
    this.paginationContainer.addEventListener('click', (e) => {

      const btn = e.target.closest('.page-btn');

      if (btn && !btn.disabled) {

        const page = parseInt(btn.dataset.page);

        if (page) {
          this.fetchProducts(page);
        }
      }
    });

    // AGREGAR AL CARRITO
    this.grid.addEventListener('click', (e) => {

      const addBtn = e.target.closest('.btn-add');

      if (addBtn) {

        const id = parseInt(addBtn.dataset.id);

        this.addToCart(id);
      }
    });
  }

  // ======================================
  // FETCH PRODUCTS
  // ======================================

  async fetchProducts(page = 1) {

    this.currentPage = page;

    // MÉTODO HEREDADO
    this.showLoader(this.grid, 'Cargando productos...');

    try {

      const skip =
        (this.currentPage - 1) * this.itemsPerPage;

      // MÉTODO HEREDADO
      const data = await this.request(
        `/products?limit=${this.itemsPerPage}&skip=${skip}`
      );

      this.products = data.products;
      this.totalProducts = data.total;

      this.renderProducts();

      this.renderPagination();

      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });

    } catch (error) {

      console.error(error);

      // MÉTODO HEREDADO
      this.showError(
        this.grid,
        'Error al cargar los productos.'
      );
    }
  }


  // ======================================
  // RENDER PRODUCTS
  // ======================================

  renderProducts() {

    if (this.products.length === 0) {

      this.grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center;">
          <p style="color:var(--text-muted);">
            No se encontraron productos.
          </p>
        </div>
      `;

      return;
    }

    this.grid.innerHTML = this.products.map(p => {

      const discount =
        Math.round(p.discountPercentage);

      const finalPrice =
        (p.price - (p.price * (discount / 100)))
        .toFixed(2);

      const hasDiscount = discount > 0;

      return `
        <div class="product-card">

          <div class="product-img-container">

            ${hasDiscount
              ? `<span class="discount-badge">-${discount}%</span>`
              : ''
            }

            <img
              src="${p.thumbnail}"
              alt="${p.title}"
              class="product-img"
              loading="lazy"
            >

          </div>

          <div class="product-info">

            <span class="product-category">
              ${p.category}
            </span>

            <h3 class="product-title">
              ${p.title}
            </h3>

            <div class="product-rating">
              <i class="bi bi-star-fill"></i>
              ${p.rating.toFixed(1)}
            </div>

            <div class="product-price-container">

              <div>

                <span class="product-price">
                  $${finalPrice}
                </span>

                ${hasDiscount
                  ? `<span class="product-original-price">$${p.price}</span>`
                  : ''
                }

              </div>

              <button
                class="btn-add"
                data-id="${p.id}"
                title="Agregar al carrito"
              >
                <i class="bi bi-plus"></i>
              </button>

            </div>

          </div>

        </div>
      `;

    }).join('');
  }


  // ======================================
  // PAGINACIÓN
  // ======================================

  renderPagination() {

    const totalPages =
      Math.ceil(this.totalProducts / this.itemsPerPage);

    let html = '';

    html += `
      <button
        class="page-btn"
        data-page="${this.currentPage - 1}"
        ${this.currentPage === 1 ? 'disabled' : ''}
      >
        <i class="bi bi-chevron-left"></i>
        Anterior
      </button>
    `;

    for (let i = 1; i <= totalPages; i++) {

      html += `
        <button
          class="page-btn ${i === this.currentPage ? 'active' : ''}"
          data-page="${i}"
        >
          ${i}
        </button>
      `;
    }

    html += `
      <button
        class="page-btn"
        data-page="${this.currentPage + 1}"
        ${this.currentPage === totalPages ? 'disabled' : ''}
      >
        Siguiente
        <i class="bi bi-chevron-right"></i>
      </button>
    `;

    this.paginationContainer.innerHTML = html;
  }


  // ======================================
  // CARRITO
  // ======================================

  addToCart(id) {

    alert(`
      Producto ${id} agregado.
      (Simulación)
    `);

  }

}


// ======================================
// APP
// ======================================

class App {

  constructor() {
    this.init();
  }

  init() {

    new Router();

    new ProductManager();

    console.log(`
      Aplicación inicializada
      con HERENCIA y POO.
    `);

  }

}


// ======================================
// START APP
// ======================================

document.addEventListener('DOMContentLoaded', () => {

  new App();

});