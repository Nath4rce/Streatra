// ===================================
// Streatra - Sistema de Navegación SPA
// ===================================

import '../styles/main.scss';
import { categorias } from './data.js';

const app = document.getElementById('app');

let vistaActual = 'splash';

export function navegarA(vista) {
  vistaActual = vista;
  render();
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

  if (vistaActual === 'home') {
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
    `;
    return;
  }
}

// Render inicial
render();