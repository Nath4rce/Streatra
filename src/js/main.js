// ===================================
// Streatra - Orquestador SPA Principal
// ===================================

import '../styles/main.scss';
import { setIdioma } from './i18n.js';
import { state, aplicarTema, toggleModoOscuro, toggleFavorito } from './state.js';
import { renderSplash, renderHome } from './views/homeView.js';
import { renderProductsList, renderProductDetail } from './views/productsView.js';
import { renderFavorites, renderSettings, renderWhatsAppView } from './views/extraViews.js';

const app = document.getElementById('app');

export function navegarA(vista, categoriaId = null) {
  state.vistaActual = vista;
  state.modalInfoAbierto = false;
  state.modalWhatsappAbierto = false;
  if (categoriaId) {
    if (categoriaId !== state.categoriaActual) {
      state.filtroSubcategoria = 'todos';
      state.terminoBusqueda = '';
    }
    state.categoriaActual = categoriaId;
  }
  render();
}

function verDetalleProducto(productId) {
  state.productoIdActual = productId;
  state.vistaActual = 'detalle';
  state.modalInfoAbierto = false;
  state.modalWhatsappAbierto = false;
  render();
}

function bindGlobalEvents() {
  // Eventos de barra inferior
  document.querySelectorAll('.bottom-nav__item').forEach((item) => {
    item.addEventListener('click', () => navegarA(item.dataset.nav));
  });

  // Eventos de tarjetas y favoritos
  document.querySelectorAll('.product-card').forEach((card) => {
    card.addEventListener('click', () => verDetalleProducto(card.dataset.id));
  });

  document.querySelectorAll('.product-card__favorite-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.dataset.id;
      
      // Si estamos en la vista de favoritos, sí redibujamos para que desaparezca la tarjeta
      if (state.vistaActual === 'favoritos') {
        toggleFavorito(id, render);
      } else {
        // En la lista de productos o catálogo general:
        // Guardamos en estado y localStorage sin disparar render() para no perder el scroll
        toggleFavorito(id, () => {});
        
        // Alternamos el corazón visualmente en la misma tarjeta
        const esFav = state.favoritos.includes(String(id));
        btn.textContent = esFav ? '❤️' : '🤍';
      }
    });
  });
}

function bindViewEvents() {
  if (state.vistaActual === 'home' || state.vistaActual === 'categorias') {
    document.querySelectorAll('.category-card').forEach((card) => {
      card.addEventListener('click', () => navegarA('productos', card.dataset.category));
    });
  }

  if (state.vistaActual === 'productos') {
    document.getElementById('btn-volver-home')?.addEventListener('click', () => navegarA('home'));

    document.querySelectorAll('.filter-chip').forEach((chip) => {
      chip.addEventListener('click', () => {
        // 1. Guardamos la posición exacta del scroll horizontal actual
        const filtersContainer = document.querySelector('.product-filters');
        const scrollPos = filtersContainer ? filtersContainer.scrollLeft : 0;

        // 2. Cambiamos el filtro y renderizamos
        state.filtroSubcategoria = chip.dataset.filtro;
        render();

        // 3. Restauramos la posición al instante antes del siguiente frame visual
        requestAnimationFrame(() => {
          const updatedContainer = document.querySelector('.product-filters');
          if (updatedContainer) {
            updatedContainer.scrollLeft = scrollPos;
          }
        });
      });
    });

    const inputBusqueda = document.getElementById('product-search-input');
    inputBusqueda?.addEventListener('input', (e) => {
      state.terminoBusqueda = e.target.value;
      render();
      const inputActualizado = document.getElementById('product-search-input');
      inputActualizado?.focus();
      inputActualizado?.setSelectionRange(inputActualizado.value.length, inputActualizado.value.length);
    });
  }

  if (state.vistaActual === 'detalle') {
    document.getElementById('btn-volver-productos')?.addEventListener('click', () => navegarA('productos', state.categoriaActual));
    document.getElementById('btn-fav-detalle')?.addEventListener('click', () => toggleFavorito(state.productoIdActual, render));

    document.getElementById('btn-ver-info')?.addEventListener('click', () => {
      state.modalInfoAbierto = true;
      state.modalWhatsappAbierto = false;
      render();
    });

    document.getElementById('btn-comprar-wpp')?.addEventListener('click', () => {
      state.modalWhatsappAbierto = true;
      state.modalInfoAbierto = false;
      render();
    });

    if (state.modalInfoAbierto) {
      document.getElementById('btn-modal-cancelar')?.addEventListener('click', () => {
        state.modalInfoAbierto = false;
        render();
      });
      document.getElementById('btn-modal-continuar')?.addEventListener('click', () => {
        window.open('https://drive.google.com', '_blank');
        state.modalInfoAbierto = false;
        render();
      });
    }

    if (state.modalWhatsappAbierto) {
      document.getElementById('btn-wpp-cancelar')?.addEventListener('click', () => {
        state.modalWhatsappAbierto = false;
        render();
      });
      document.getElementById('btn-wpp-continuar')?.addEventListener('click', () => {
        state.modalWhatsappAbierto = false;
        state.vistaActual = 'whatsapp';
        render();
      });
    }
  }

  if (state.vistaActual === 'ajustes') {
    document.getElementById('btn-toggle-tema')?.addEventListener('click', () => toggleModoOscuro(render));
    document.querySelectorAll('.language-selector__btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        setIdioma(btn.dataset.lang);
        render();
      });
    });
  }

  if (state.vistaActual === 'whatsapp') {
    document.getElementById('btn-volver-detalle')?.addEventListener('click', () => verDetalleProducto(state.productoIdActual));
  }
}

function render() {
  switch (state.vistaActual) {
    case 'splash':
      app.innerHTML = renderSplash();
      setTimeout(() => navegarA('home'), 3000);
      return;
    case 'home':
    case 'categorias':
      app.innerHTML = renderHome();
      break;
    case 'productos':
      app.innerHTML = renderProductsList();
      break;
    case 'detalle':
      app.innerHTML = renderProductDetail();
      break;
    case 'favoritos':
      app.innerHTML = renderFavorites();
      break;
    case 'ajustes':
      app.innerHTML = renderSettings();
      break;
    case 'whatsapp':
      app.innerHTML = renderWhatsAppView();
      break;
    default:
      app.innerHTML = renderHome();
  }

  bindGlobalEvents();
  bindViewEvents();
}

// Inicialización de la aplicación
aplicarTema();
render();