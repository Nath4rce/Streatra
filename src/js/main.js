// ===================================
// Streatra - Sistema de Navegación SPA
// ===================================

import '../styles/main.scss';
import { categorias, productos } from './data.js';


const app = document.getElementById('app');
const FAVORITOS_KEY = 'streatra_favoritos';
const TEMA_KEY = 'streatra_tema';

let vistaActual = 'splash';
let categoriaActual = 'todos';
let filtroSubcategoria = 'todos';
let terminoBusqueda = '';
let productoIdActual = null;
let modalInfoAbierto = false; // Controla la visibilidad del modal "Ver más información"
let modalWhatsappAbierto = false; // Controla la visibilidad del modal "¿Ir a WhatsApp?"

function cargarTema() {
  try {
    return localStorage.getItem(TEMA_KEY) === 'oscuro';
  } catch (error) {
    console.error('Error al cargar tema desde localStorage:', error);
    return false;
  }
}

function toggleModoOscuro() {
  modoOscuro = !modoOscuro;
  try {
    localStorage.setItem(TEMA_KEY, modoOscuro ? 'oscuro' : 'claro');
  } catch (error) {
    console.error('Error al guardar tema en localStorage:', error);
  }
  aplicarTema();
  render();
}

function aplicarTema() {
  document.body.classList.toggle('dark-mode', modoOscuro);
}

let modoOscuro = cargarTema();

function cargarFavoritos() {
  try {
    const guardado = localStorage.getItem(FAVORITOS_KEY);
    return guardado ? JSON.parse(guardado) : [];
  } catch (error) {
    console.error('Error al cargar favoritos desde localStorage:', error);
    return [];
  }
}

function guardarFavoritos() {
  try {
    localStorage.setItem(FAVORITOS_KEY, JSON.stringify(favoritos));
  } catch (error) {
    console.error('Error al guardar favoritos en localStorage:', error);
  }
}

let favoritos = cargarFavoritos();

export function navegarA(vista, categoriaId = null) {
  vistaActual = vista;
  modalInfoAbierto = false;
  modalWhatsappAbierto = false;
  if (categoriaId) {
    if (categoriaId !== categoriaActual) {
      filtroSubcategoria = 'todos';
      terminoBusqueda = '';
    }
    categoriaActual = categoriaId;
  }
  render();
}

function verDetalleProducto(productId) {
  productoIdActual = productId;
  vistaActual = 'detalle';
  modalInfoAbierto = false;
  modalWhatsappAbierto = false;
  render();
}

function toggleFavorito(id) {
  const idStr = String(id);
  if (favoritos.includes(idStr)) {
    favoritos = favoritos.filter((favId) => favId !== idStr);
  } else {
    favoritos.push(idStr);
  }
  guardarFavoritos();
  render();
}

// Componente reutilizable: Barra de Navegación Inferior
function renderBottomNav() {
  return `
    <nav class="bottom-nav">
      <button class="bottom-nav__item ${vistaActual === 'home' || vistaActual === 'categorias' || vistaActual === 'productos' ? 'bottom-nav__item--active' : ''}" data-nav="home">
        <span class="bottom-nav__icon">🏠</span>
        <span class="bottom-nav__label">Home</span>
      </button>
      <button class="bottom-nav__item ${vistaActual === 'favoritos' ? 'bottom-nav__item--active' : ''}" data-nav="favoritos">
        <span class="bottom-nav__icon">🤍</span>
        <span class="bottom-nav__label">Favoritos</span>
      </button>
      <button class="bottom-nav__item ${vistaActual === 'ajustes' ? 'bottom-nav__item--active' : ''}" data-nav="ajustes">
        <span class="bottom-nav__icon">⚙️</span>
        <span class="bottom-nav__label">Ajustes</span>
      </button>
    </nav>
  `;
}

function setupBottomNavEvents() {
  document.querySelectorAll('.bottom-nav__item').forEach((item) => {
    item.addEventListener('click', () => {
      const destino = item.dataset.nav;
      navegarA(destino);
    });
  });
}

function render() {
  if (vistaActual === 'splash') {
    app.innerHTML = `
      <main class="splash-screen">
        <div class="splash-screen__content">
          <img src="/assets/logo.png" alt="Streatra Logo" class="splash-screen__logo" />
          <div class="splash-screen__loader">
            <div class="splash-screen__loader-bar"></div>
          </div>
        </div>
      </main>
    `;

    setTimeout(() => {
      navegarA('home');
    }, 3000);
    return;
  }

  if (vistaActual === 'home' || vistaActual === 'categorias') {
    const listaCategoriasHTML = categorias
      .map(
        (cat) => `
        <button class="category-card" data-category="${cat.id}">
          <span class="category-card__icon">${cat.icono}</span>
          <span class="category-card__name">${cat.nombre}</span>
        </button>
      `
      )
      .join('');

    app.innerHTML = `
      <div class="main-content-wrapper">
        <header class="home-header">
          <h1 class="home-header__brand">Streatra</h1>
        </header>

        <main class="home-content">
          <section class="categories-section">
            <h2 class="categories-section__title">Categorías</h2>
            <div class="categories-container">
              <div class="categories-list" id="categories-list">
                ${listaCategoriasHTML}
              </div>
            </div>
          </section>
        </main>
        ${renderBottomNav()}
      </div>
    `;

    document.querySelectorAll('.category-card').forEach((card) => {
      card.addEventListener('click', () => {
        navegarA('productos', card.dataset.category);
      });
    });

    setupBottomNavEvents();
    return;
  }

  if (vistaActual === 'productos') {
    const productosDeCategoria = categoriaActual === 'todos'
      ? productos
      : productos.filter((p) => p.categoria === categoriaActual);

    const subcategoriasDisponibles = [
      ...new Set(productosDeCategoria.map((p) => p.subcategoria)),
    ];

    const productosPorSubcategoria = filtroSubcategoria === 'todos'
      ? productosDeCategoria
      : productosDeCategoria.filter((p) => p.subcategoria === filtroSubcategoria);

    const terminoNormalizado = terminoBusqueda.trim().toLowerCase();
    const productosFiltrados = terminoNormalizado === ''
      ? productosPorSubcategoria
      : productosPorSubcategoria.filter((p) =>
          p.nombre.toLowerCase().includes(terminoNormalizado)
        );

    const etiquetasSubcategoria = {
      comida: 'Comida',
      bebidas: 'Bebidas',
      accesorios: 'Accesorios',
      utiles: 'Útiles',
    };

    const filtrosHTML = `
      <button class="filter-chip ${filtroSubcategoria === 'todos' ? 'filter-chip--active' : ''}" data-filtro="todos">
        Todos
      </button>
      ${subcategoriasDisponibles
        .map(
          (sub) => `
        <button class="filter-chip ${filtroSubcategoria === sub ? 'filter-chip--active' : ''}" data-filtro="${sub}">
          ${etiquetasSubcategoria[sub] || sub}
        </button>
      `
        )
        .join('')}
    `;

    const listaProductosHTML = productosFiltrados.length > 0
      ? productosFiltrados
          .map(
            (prod) => `
            <article class="product-card" data-id="${prod.id}">
              <div class="product-card__thumb">
                <span class="product-card__thumb-icon">📦</span>
              </div>
              <div class="product-card__content">
                <h3 class="product-card__name">${prod.nombre}</h3>
                <p class="product-card__description">${prod.descripcion}</p>
              </div>
              <button class="product-card__favorite-btn" data-id="${prod.id}" aria-label="Favorito">
                ${favoritos.includes(String(prod.id)) ? '❤️' : '🤍'}
              </button>
            </article>
          `
          )
          .join('')
      : `<p style="text-align: center; color: #8A827C; margin-top: 32px;">No hay productos que coincidan con tu búsqueda.</p>`;

    const nombreCategoriaMostrar = categorias.find((c) => c.id === categoriaActual)?.nombre || 'Tiendas';

    app.innerHTML = `
      <div class="main-content-wrapper">
        <header class="home-header">
          <h1 class="home-header__brand">Streatra</h1>
        </header>

        <main class="products-screen">
          <div class="products-screen__nav">
            <button class="products-screen__back-btn" id="btn-volver-home" aria-label="Volver">←</button>
            <h2 class="products-screen__heading">${nombreCategoriaMostrar}</h2>
          </div>

          <div class="products-screen__search">
            <input
              type="text"
              id="product-search-input"
              class="search-input"
              placeholder="Buscar producto"
              value="${terminoBusqueda}"
            />
          </div>

          <div class="product-filters" id="product-filters">
            ${filtrosHTML}
          </div>

          <section class="products-container">
            <div class="products-list" id="products-list">
              ${listaProductosHTML}
            </div>
          </section>
        </main>
        ${renderBottomNav()}
      </div>
    `;

    document.getElementById('btn-volver-home').addEventListener('click', () => {
      navegarA('home');
    });

    document.querySelectorAll('.filter-chip').forEach((chip) => {
      chip.addEventListener('click', () => {
        filtroSubcategoria = chip.dataset.filtro;
        render();
      });
    });

    document.querySelectorAll('.product-card').forEach((card) => {
      card.addEventListener('click', () => {
        verDetalleProducto(card.dataset.id);
      });
    });

     document.querySelectorAll('.product-card__favorite-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation(); // evita que también dispare la navegación al detalle
        toggleFavorito(btn.dataset.id);
      });
    });

    const inputBusqueda = document.getElementById('product-search-input');
    inputBusqueda.addEventListener('input', (e) => {
      terminoBusqueda = e.target.value;
      render();
      const inputActualizado = document.getElementById('product-search-input');
      inputActualizado.focus();
      inputActualizado.setSelectionRange(inputActualizado.value.length, inputActualizado.value.length);
    });

    setupBottomNavEvents();
    return;
  }

  if (vistaActual === 'detalle') {
    const producto = productos.find((p) => p.id === productoIdActual);

    if (!producto) {
      app.innerHTML = `
        <div class="main-content-wrapper">
          <p style="padding: 24px; text-align: center; color: #8A827C;">Producto no encontrado.</p>
        </div>
      `;
      return;
    }

    // Modal "Ver más información" — capa flotante condicional
    const modalHTML = modalInfoAbierto ? `
      <div class="modal-overlay" id="modal-overlay">
        <div class="modal-card">
          <span class="modal-card__icon">🔗</span>
          <h3 class="modal-card__title">¿Ver más información?</h3>
          <p class="modal-card__text">
            Serás redirigido al catálogo o archivo de <strong>${producto.vendedor}</strong>.
          </p>
          <div class="modal-card__actions">
            <button class="modal-card__btn modal-card__btn--cancel" id="btn-modal-cancelar">Cancelar</button>
            <button class="modal-card__btn modal-card__btn--confirm" id="btn-modal-continuar">Continuar</button>
          </div>
        </div>
      </div>
    ` : '';

    // Modal "¿Ir a WhatsApp?" — capa flotante condicional, con modificador de estilo propio
    const modalWhatsappHTML = modalWhatsappAbierto ? `
      <div class="modal-overlay" id="modal-overlay-whatsapp">
        <div class="modal-card modal-card--whatsapp">
          <span class="modal-card__icon">💬</span>
          <h3 class="modal-card__title">¿Ir a WhatsApp?</h3>
          <p class="modal-card__text">
            Vas a contactar a <strong>${producto.vendedor}</strong> por WhatsApp para preguntar por "${producto.nombre}".
          </p>
          <div class="modal-card__actions">
            <button class="modal-card__btn modal-card__btn--cancel" id="btn-wpp-cancelar">Cancelar</button>
            <button class="modal-card__btn modal-card__btn--confirm" id="btn-wpp-continuar">Continuar</button>
          </div>
        </div>
      </div>
    ` : '';

    app.innerHTML = `
      <div class="main-content-wrapper">
        <header class="home-header">
          <h1 class="home-header__brand">Streatra</h1>
        </header>

        <main class="products-screen">
          <div class="products-screen__nav">
            <button class="products-screen__back-btn" id="btn-volver-productos" aria-label="Volver">←</button>
            <h2 class="products-screen__heading">Detalles de la tienda</h2>
          </div>

          <div class="product-detail">
            <div class="product-detail__hero">
              <span class="product-detail__hero-icon">📦</span>
              <button class="product-detail__favorite-btn" id="btn-fav-detalle" aria-label="Favorito">
                ${favoritos.includes(String(producto.id)) ? '❤️' : '🤍'}
              </button>
            </div>

            <h2 class="product-detail__name">${producto.nombre}</h2>
            <p class="product-detail__description">${producto.descripcion}</p>

            <div class="product-detail__seller-box">
              <p class="product-detail__seller-label">Vendedor</p>
              <p class="product-detail__seller-name">${producto.vendedor}</p>
              <p class="product-detail__seller-schedule">Horario: ${producto.horario}</p>
            </div>

            <div class="product-detail__actions">
              <button class="product-detail__btn product-detail__btn--info" id="btn-ver-info">
                <span>Ver más información</span>
                <span>🔗</span>
              </button>
              <button class="product-detail__btn product-detail__btn--whatsapp" id="btn-comprar-wpp">
                <span>Comprar por WhatsApp</span>
                <span>💬</span>
              </button>
            </div>
          </div>
        </main>
        ${modalHTML}
        ${modalWhatsappHTML}
      </div>
    `;

    document.getElementById('btn-volver-productos').addEventListener('click', () => {
      navegarA('productos', categoriaActual);
    });

    // Abre el modal de "Ver más información"
    document.getElementById('btn-ver-info').addEventListener('click', () => {
      modalInfoAbierto = true;
      render();
    });

    // Abre el modal de confirmación de WhatsApp
    document.getElementById('btn-comprar-wpp').addEventListener('click', () => {
      modalWhatsappAbierto = true;
      render();
    });

    document.getElementById('btn-fav-detalle').addEventListener('click', () => {
      toggleFavorito(producto.id);
    });

    // Cierra el modal de "Ver más información" sin desmontar la pantalla
    if (modalInfoAbierto) {
      document.getElementById('btn-modal-cancelar').addEventListener('click', () => {
        modalInfoAbierto = false;
        render();
      });

      document.getElementById('btn-modal-continuar').addEventListener('click', () => {
        window.open('https://drive.google.com', '_blank');
        modalInfoAbierto = false;
        render();
      });
    }

    // Cierra o confirma el modal de WhatsApp
    if (modalWhatsappAbierto) {
      document.getElementById('btn-wpp-cancelar').addEventListener('click', () => {
        modalWhatsappAbierto = false;
        render();
      });

      document.getElementById('btn-wpp-continuar').addEventListener('click', () => {
        modalWhatsappAbierto = false;
        vistaActual = 'whatsapp';
        render();
      });
    }

    return;
  }

  if (vistaActual === 'favoritos') {
    const productosFavoritos = productos.filter((p) => favoritos.includes(String(p.id)));

    const listaFavoritosHTML = productosFavoritos.length > 0
      ? productosFavoritos
          .map(
            (prod) => `
            <article class="product-card" data-id="${prod.id}">
              <div class="product-card__thumb">
                <span class="product-card__thumb-icon">📦</span>
              </div>
              <div class="product-card__content">
                <h3 class="product-card__name">${prod.nombre}</h3>
                <p class="product-card__description">${prod.descripcion}</p>
              </div>
              <button class="product-card__favorite-btn" data-id="${prod.id}" aria-label="Favorito">❤️</button>
            </article>
          `
          )
          .join('')
      : `<p class="favorites-screen__empty">Aún no tienes productos favoritos.</p>`;

    app.innerHTML = `
      <div class="main-content-wrapper">
        <header class="home-header">
          <h1 class="home-header__brand">Streatra</h1>
        </header>

        <main class="favorites-screen">
          <div class="products-screen__nav">
            <h2 class="products-screen__heading">Favoritos</h2>
          </div>

          <section class="products-container">
            <div class="products-list" id="favorites-list">
              ${listaFavoritosHTML}
            </div>
          </section>
        </main>
        ${renderBottomNav()}
      </div>
    `;

    document.querySelectorAll('.product-card').forEach((card) => {
      card.addEventListener('click', () => {
        verDetalleProducto(card.dataset.id);
      });
    });

    document.querySelectorAll('.product-card__favorite-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleFavorito(btn.dataset.id);
      });
    });

    setupBottomNavEvents();
    return;
  }

  if (vistaActual === 'ajustes') {
    app.innerHTML = `
      <div class="main-content-wrapper">
        <header class="home-header">
          <h1 class="home-header__brand">Streatra</h1>
        </header>

        <main class="settings-screen">
          <div class="products-screen__nav">
            <h2 class="products-screen__heading">Ajustes</h2>
          </div>

          <section class="settings-screen__group">
            <h3 class="settings-screen__group-title">Apariencia</h3>
            <div class="settings-screen__item">
              <span class="settings-screen__item-label">Modo oscuro</span>
              <button
                class="settings-toggle ${modoOscuro ? 'settings-toggle--active' : ''}"
                id="btn-toggle-tema"
                aria-label="Alternar modo oscuro"
                aria-pressed="${modoOscuro}"
              >
                <span class="settings-toggle__thumb"></span>
              </button>
            </div>
          </section>

          <section class="settings-screen__group">
            <h3 class="settings-screen__group-title">Idioma</h3>
            <div class="settings-screen__item">
              <span class="settings-screen__item-label">Idioma de la aplicación</span>
              <span class="settings-screen__item-value">Español</span>
            </div>
          </section>
        </main>
        ${renderBottomNav()}
      </div>
    `;

    document.getElementById('btn-toggle-tema').addEventListener('click', () => {
      toggleModoOscuro();
    });
    
    setupBottomNavEvents();
    return;
  }

      if (vistaActual === 'whatsapp') {
    const producto = productos.find((p) => p.id === productoIdActual);

    if (!producto) {
      app.innerHTML = `
        <div class="main-content-wrapper">
          <p style="padding: 24px; text-align: center; color: #8A827C;">Producto no encontrado.</p>
        </div>
      `;
      return;
    }

    const mensaje = encodeURIComponent(
      `Hola ${producto.vendedor}, vi tu producto de: "${producto.nombre}" en la app Streatra y quiero conocer más información al respecto de este producto.`
    );
    const linkWhatsapp = `https://wa.me/${producto.telefono}?text=${mensaje}`;

    app.innerHTML = `
      <div class="main-content-wrapper">
        <main class="whatsapp-screen">
          <button class="whatsapp-screen__back-btn" id="btn-volver-detalle" aria-label="Volver">←</button>

          <div class="whatsapp-screen__content">
            <span class="whatsapp-screen__icon">💬</span>
            <h2 class="whatsapp-screen__title">Conectando con WhatsApp</h2>
            <p class="whatsapp-screen__text">
              Estás a punto de contactar a <strong>${producto.vendedor}</strong> por "${producto.nombre}".
            </p>
            <a href="${linkWhatsapp}" target="_blank" rel="noopener noreferrer" class="whatsapp-screen__open-btn" id="btn-abrir-whatsapp">
              Abrir WhatsApp
            </a>
          </div>
        </main>
      </div>
    `;

    document.getElementById('btn-volver-detalle').addEventListener('click', () => {
      verDetalleProducto(producto.id);
    });

    return;
  }
}

// Render inicial
aplicarTema();
render();