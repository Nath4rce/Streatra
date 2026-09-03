// ===================================
// Streatra - Estado Global y Almacenamiento
// ===================================

const FAVORITOS_KEY = 'streatra_favoritos';
const TEMA_KEY = 'streatra_tema';

export const state = {
  vistaActual: 'splash',
  categoriaActual: 'todos',
  filtroSubcategoria: 'todos',
  terminoBusqueda: '',
  productoIdActual: null,
  modalInfoAbierto: false,
  modalWhatsappAbierto: false,
  modoOscuro: cargarTema(),
  favoritos: cargarFavoritos()
};

function cargarTema() {
  try {
    return localStorage.getItem(TEMA_KEY) === 'oscuro';
  } catch (error) {
    console.error('Error al cargar tema:', error);
    return false;
  }
}

export function toggleModoOscuro(renderCallback) {
  state.modoOscuro = !state.modoOscuro;
  try {
    localStorage.setItem(TEMA_KEY, state.modoOscuro ? 'oscuro' : 'claro');
  } catch (error) {
    console.error('Error al guardar tema:', error);
  }
  aplicarTema();
  renderCallback();
}

export function aplicarTema() {
  document.body.classList.toggle('dark-mode', state.modoOscuro);
}

function cargarFavoritos() {
  try {
    const guardado = localStorage.getItem(FAVORITOS_KEY);
    return guardado ? JSON.parse(guardado) : [];
  } catch (error) {
    console.error('Error al cargar favoritos:', error);
    return [];
  }
}

export function toggleFavorito(id, renderCallback) {
  const idStr = String(id);
  if (state.favoritos.includes(idStr)) {
    state.favoritos = state.favoritos.filter((favId) => favId !== idStr);
  } else {
    state.favoritos.push(idStr);
  }
  try {
    localStorage.setItem(FAVORITOS_KEY, JSON.stringify(state.favoritos));
  } catch (error) {
    console.error('Error al guardar favoritos:', error);
  }
  renderCallback();
}