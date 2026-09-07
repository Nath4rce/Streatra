// ===================================
// Streatra - Vistas de Favoritos, Ajustes y WhatsApp
// ===================================

import { productos } from '../data.js';
import { t, getIdioma } from '../i18n.js';
import { state } from '../state.js';
import { renderHeader, renderBottomNav, renderProductCard } from './components.js';

export function renderFavorites() {
  const productosFavoritos = productos.filter((p) => state.favoritos.includes(String(p.id)));

  const listaFavoritosHTML = productosFavoritos.length > 0
    ? productosFavoritos.map(renderProductCard).join('')
    : `<p class="favorites-screen__empty">${t('favoritosEmpty')}</p>`;

  return `
    <div class="main-content-wrapper">
      ${renderHeader()}
      <main class="favorites-screen">
        <div class="products-screen__nav">
          <h2 class="products-screen__heading">${t('navFavoritos')}</h2>
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
}

export function renderSettings() {
  return `
    <div class="main-content-wrapper">
      ${renderHeader()}
      <main class="settings-screen">
        <div class="products-screen__nav">
          <h2 class="products-screen__heading">${t('ajustesTitle')}</h2>
        </div>

        <section class="settings-screen__group">
          <h3 class="settings-screen__group-title">${t('apariencia')}</h3>
          <div class="settings-screen__item">
            <span class="settings-screen__item-label">${t('modoOscuro')}</span>
            <button
              class="settings-toggle ${state.modoOscuro ? 'settings-toggle--active' : ''}"
              id="btn-toggle-tema"
              aria-label="Alternar modo oscuro"
              aria-pressed="${state.modoOscuro}"
            >
              <span class="settings-toggle__thumb"></span>
            </button>
          </div>
        </section>

        <section class="settings-screen__group">
          <h3 class="settings-screen__group-title">${t('idiomaGroup')}</h3>
          <div class="settings-screen__item">
            <span class="settings-screen__item-label">${t('idiomaLabel')}</span>
            <div class="language-selector">
              <button class="language-selector__btn ${getIdioma() === 'es' ? 'language-selector__btn--active' : ''}" data-lang="es">ES</button>
              <button class="language-selector__btn ${getIdioma() === 'en' ? 'language-selector__btn--active' : ''}" data-lang="en">EN</button>
            </div>
          </div>
        </section>
      </main>
      ${renderBottomNav()}
    </div>
  `;
}

export function renderWhatsAppView() {
  const producto = productos.find((p) => p.id === state.productoIdActual);

  if (!producto) {
    return `
      <div class="main-content-wrapper">
        <p class="empty-state-message empty-state-message--padded">${t('productoNoEncontrado')}</p>
      </div>
    `;
  }

  const nombreTraducido = t(producto.nombreKey);
  
  // Obtenemos el texto traducido según el idioma activo (es / en)
  const textoMensaje = t('whatsappMensaje', {
    vendedor: producto.vendedor,
    producto: nombreTraducido
  });

  const mensajeCodificado = encodeURIComponent(textoMensaje);
  const linkWhatsapp = `https://wa.me/${producto.telefono}?text=${mensajeCodificado}`;

  return `
    <div class="main-content-wrapper">
      <main class="whatsapp-screen">
        <button class="whatsapp-screen__back-btn" id="btn-volver-detalle" aria-label="Volver">←</button>
        <div class="whatsapp-screen__content">
          <span class="whatsapp-screen__icon">💬</span>
          <h2 class="whatsapp-screen__title">${t('whatsappConectando')}</h2>
          <p class="whatsapp-screen__text">
            ${t('whatsappTexto', { vendedor: producto.vendedor, producto: nombreTraducido })}
          </p>
          <a href="${linkWhatsapp}" target="_blank" rel="noopener noreferrer" class="whatsapp-screen__open-btn" id="btn-abrir-whatsapp">
            ${t('whatsappAbrir')}
          </a>
        </div>
      </main>
    </div>
  `;
}