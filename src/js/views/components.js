// ===================================
// Streatra - Componentes UI Reutilizables
// ===================================

import { t } from '../i18n.js';
import { state } from '../state.js';

export function renderHeader() {
  return `
    <header class="home-header">
      <img src="/assets/streatra-wordmark.png" alt="Streatra" class="home-header__logo" />
    </header>
  `;
}

export function renderBottomNav() {
  const isHomeActive = ['home', 'categorias', 'productos'].includes(state.vistaActual);
  const isFavActive = state.vistaActual === 'favoritos';
  const isSettingsActive = state.vistaActual === 'ajustes';

  return `
    <nav class="bottom-nav">
      <button class="bottom-nav__item ${isHomeActive ? 'bottom-nav__item--active' : ''}" data-nav="home">
        <span class="bottom-nav__icon">🏠</span>
        <span class="bottom-nav__label">${t('navHome')}</span>
      </button>
      <button class="bottom-nav__item ${isFavActive ? 'bottom-nav__item--active' : ''}" data-nav="favoritos">
        <span class="bottom-nav__icon">${isFavActive ? '❤️' : '🤍'}</span>
        <span class="bottom-nav__label">${t('navFavoritos')}</span>
      </button>
      <button class="bottom-nav__item ${isSettingsActive ? 'bottom-nav__item--active' : ''}" data-nav="ajustes">
        <span class="bottom-nav__icon">⚙️</span>
        <span class="bottom-nav__label">${t('navAjustes')}</span>
      </button>
    </nav>
  `;
}

export function renderProductCard(prod) {
  const esFavorito = state.favoritos.includes(String(prod.id));
  const nombreTraducido = t(prod.nombreKey);
  const descripcionTraducida = t(prod.descripcionKey);

  return `
    <article class="product-card" data-id="${prod.id}">
      <div class="product-card__thumb">
        <span class="product-card__thumb-icon">📦</span>
      </div>
      <div class="product-card__content">
        <h3 class="product-card__name">${nombreTraducido}</h3>
        <p class="product-card__description">${descripcionTraducida}</p>
      </div>
      <button class="product-card__favorite-btn" data-id="${prod.id}" aria-label="Favorito">
        ${esFavorito ? '❤️' : '🤍'}
      </button>
    </article>
  `;
}