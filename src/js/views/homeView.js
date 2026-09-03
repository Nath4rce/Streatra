// ===================================
// Streatra - Vistas de Splash y Categorías
// ===================================

import { categorias } from '../data.js';
import { t } from '../i18n.js';
import { renderHeader, renderBottomNav } from './components.js';

export function renderSplash() {
  return `
    <main class="splash-screen">
      <div class="splash-screen__content">
        <img src="/assets/logo.png" alt="Streatra Logo" class="splash-screen__logo" />
        <div class="splash-screen__loader">
          <div class="splash-screen__loader-bar"></div>
        </div>
      </div>
    </main>
  `;
}

export function renderHome() {
  const listaCategoriasHTML = categorias
    .map((cat) => {
      const nombreTraducido = t(cat.nombreKey);
      return `
        <button class="category-card" data-category="${cat.id}">
          <span class="category-card__icon">
            <img class="category-card__img" src="${cat.icono}" alt="${nombreTraducido}" />
          </span>
          <span class="category-card__name">${nombreTraducido}</span>
        </button>
      `;
    })
    .join('');

  return `
    <div class="main-content-wrapper">
      ${renderHeader()}
      <main class="home-content">
        <section class="categories-section">
          <h2 class="categories-section__title">${t('categoriasTitle')}</h2>
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
}