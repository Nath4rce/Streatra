// ===================================
// Streatra - Vistas de Lista y Detalle
// ===================================

import { categorias, productos } from '../data.js';
import { t } from '../i18n.js';
import { state } from '../state.js';
import { renderHeader, renderBottomNav, renderProductCard } from './components.js';

export function renderProductsList() {
  const productosDeCategoria = state.categoriaActual === 'todos'
    ? productos
    : productos.filter((p) => p.categoria === state.categoriaActual);

  const subcategoriasDisponibles = [
    ...new Set(productosDeCategoria.map((p) => p.subcategoria)),
  ];

  const productosPorSubcategoria = state.filtroSubcategoria === 'todos'
    ? productosDeCategoria
    : productosDeCategoria.filter((p) => p.subcategoria === state.filtroSubcategoria);

  const terminoNormalizado = state.terminoBusqueda.trim().toLowerCase();
  const productosFiltrados = terminoNormalizado === ''
    ? productosPorSubcategoria
    : productosPorSubcategoria.filter((p) => {
        const desc = t(p.descripcionKey).toLowerCase();
        const nom = t(p.nombreKey).toLowerCase();
        return nom.includes(terminoNormalizado) || desc.includes(terminoNormalizado);
      });

  const etiquetasSubcategoria = {
    comida: t('filterComida'),
    bebidas: t('filterBebidas'),
    accesorios: t('filterAccesorios'),
    utiles: t('filterUtiles'),
  };

  const filtrosHTML = `
    <button class="filter-chip ${state.filtroSubcategoria === 'todos' ? 'filter-chip--active' : ''}" data-filtro="todos">
      ${t('filterAll')}
    </button>
    ${subcategoriasDisponibles
      .map(
        (sub) => `
      <button class="filter-chip ${state.filtroSubcategoria === sub ? 'filter-chip--active' : ''}" data-filtro="${sub}">
        ${etiquetasSubcategoria[sub] || sub}
      </button>
    `
      )
      .join('')}
  `;

  const listaProductosHTML = productosFiltrados.length > 0
    ? productosFiltrados.map(renderProductCard).join('')
    : `<p class="empty-state-message">${t('noResults')}</p>`;

  const catObj = categorias.find((c) => c.id === state.categoriaActual);
  const nombreCategoriaMostrar = catObj ? t(catObj.nombreKey) : 'Streatra';

  return `
    <div class="main-content-wrapper">
      ${renderHeader()}
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
            placeholder="${t('searchPlaceholder')}"
            value="${state.terminoBusqueda}"
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
}

export function renderProductDetail() {
  const producto = productos.find((p) => p.id === state.productoIdActual);

  if (!producto) {
    return `
      <div class="main-content-wrapper">
        <p class="empty-state-message empty-state-message--padded">${t('productoNoEncontrado')}</p>
      </div>
    `;
  }

  const nombreTraducido = t(producto.nombreKey);
  const descripcionTraducida = t(producto.descripcionKey);

  const modalHTML = state.modalInfoAbierto ? `
    <div class="modal-overlay" id="modal-overlay">
      <div class="modal-card">
        <span class="modal-card__icon">🔗</span>
        <h3 class="modal-card__title">${t('verMasInfo')}</h3>
        <p class="modal-card__text">${t('modalInfoText', { vendedor: producto.vendedor })}</p>
        <div class="modal-card__actions">
          <button class="modal-card__btn modal-card__btn--cancel" id="btn-modal-cancelar">${t('cancelar')}</button>
          <button class="modal-card__btn modal-card__btn--confirm" id="btn-modal-continuar">${t('continuar')}</button>
        </div>
      </div>
    </div>
  ` : '';

  const modalWhatsappHTML = state.modalWhatsappAbierto ? `
    <div class="modal-overlay" id="modal-overlay-whatsapp">
      <div class="modal-card modal-card--whatsapp">
        <span class="modal-card__icon">💬</span>
        <h3 class="modal-card__title">${t('comprarWpp')}</h3>
        <p class="modal-card__text">${t('modalWppText', { vendedor: producto.vendedor })}</p>
        <div class="modal-card__actions">
          <button class="modal-card__btn modal-card__btn--cancel" id="btn-wpp-cancelar">${t('cancelar')}</button>
          <button class="modal-card__btn modal-card__btn--confirm" id="btn-wpp-continuar" style="background-color: #25D366; border-color: #25D366;">${t('continuar')}</button>
        </div>
      </div>
    </div>
  ` : '';

  return `
    <div class="main-content-wrapper">
      ${renderHeader()}
      <main class="products-screen">
        <div class="products-screen__nav">
          <button class="products-screen__back-btn" id="btn-volver-productos" aria-label="Volver">←</button>
          <h2 class="products-screen__heading">${t('detalleTitle')}</h2>
        </div>

        <div class="product-detail">
          <div class="product-detail__hero">
            <span class="product-detail__hero-icon">📦</span>
            <button class="product-detail__favorite-btn" id="btn-fav-detalle" aria-label="Favorito">
              ${state.favoritos.includes(String(producto.id)) ? '❤️' : '🤍'}
            </button>
          </div>

          <h2 class="product-detail__name">${nombreTraducido}</h2>
          <p class="product-detail__description">${descripcionTraducida}</p>

          <div class="product-detail__seller-box">
            <p class="product-detail__seller-label">${t('vendedorLabel')}</p>
            <p class="product-detail__seller-name">${producto.vendedor}</p>
            <p class="product-detail__seller-label product-detail__seller-label--horario">${t('horarioTitle')}</p>
            <p class="product-detail__seller-name">${producto.horario}</p>
          </div>

          <div class="product-detail__actions">
            <button class="product-detail__btn product-detail__btn--info" id="btn-ver-info">
              <span>${t('verMasInfo')}</span>
              <span>🔗</span>
            </button>
            <button class="product-detail__btn product-detail__btn--whatsapp" id="btn-comprar-wpp">
              <span>${t('comprarWpp')}</span>
              <span>💬</span>
            </button>
          </div>
        </div>
      </main>
      ${modalHTML}
      ${modalWhatsappHTML}
    </div>
  `;
}