// ===================================
// Streatra - Sistema de Navegación SPA
// ===================================

import '../styles/main.scss';
import { categorias } from './data.js';

const app = document.getElementById('app');

let vistaActual = 'splash';
let categoriaActual = null;

export function navegarA(vista, categoriaId = null) {
  vistaActual = vista;
  if (categoriaId) categoriaActual = categoriaId;
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

// Configuración de eventos para la barra inferior
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
          <img src="/assets/logo/logo.png" alt="Streatra Logo" class="splash-screen__logo" />
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
    app.innerHTML = `
      <div class="main-content-wrapper">
        <header class="products-header">
          <button class="products-header__back" id="btn-volver-home" aria-label="Volver">←</button>
          <h1 class="products-header__title">${categoriaActual}</h1>
        </header>

        <main class="products-content">
          <section class="products-section">
            <div class="products-list" id="products-list">
              <!-- Los productos se agregan en el commit #17 -->
            </div>
          </section>
        </main>
        ${renderBottomNav()}
      </div>
    `;

    document.getElementById('btn-volver-home').addEventListener('click', () => {
      navegarA('home');
    });

    setupBottomNavEvents();
    return;
  }

  if (vistaActual === 'favoritos') {
    app.innerHTML = `
      <div class="main-content-wrapper">
        <header class="home-header">
          <h1 class="home-header__brand">Streatra</h1>
        </header>
        <main class="spa-container" style="padding: 24px; text-align: center;">
          <h2>Favoritos</h2>
          <p style="color: #8A827C; margin-top: 8px;">Tus productos guardados aparecerán aquí.</p>
        </main>
        ${renderBottomNav()}
      </div>
    `;
    setupBottomNavEvents();
    return;
  }

  if (vistaActual === 'ajustes') {
    app.innerHTML = `
      <div class="main-content-wrapper">
        <header class="home-header">
          <h1 class="home-header__brand">Streatra</h1>
        </header>
        <main class="spa-container" style="padding: 24px; text-align: center;">
          <h2>Ajustes</h2>
          <p style="color: #8A827C; margin-top: 8px;">Configuración de idioma y tema.</p>
        </main>
        ${renderBottomNav()}
      </div>
    `;
    setupBottomNavEvents();
    return;
  }
}

// Render inicial
render();