// ===================================
// Streatra - Sistema de Internacionalización (i18n)
// ===================================

const IDIOMA_KEY = 'streatra_idioma';

const translations = {
  es: {
    navHome: 'Home',
    navFavoritos: 'Favoritos',
    navAjustes: 'Ajustes',
    categoriasTitle: 'Categorías',
    searchPlaceholder: 'Buscar producto',
    filterAll: 'Todos',
    filterComida: 'Comida',
    filterBebidas: 'Bebidas',
    filterAccesorios: 'Accesorios',
    filterUtiles: 'Útiles',
    noResults: 'No hay productos que coincidan con tu búsqueda.',
    categoriaDefault: 'Tiendas',
    detalleTitle: 'Detalles de la tienda',
    vendedorLabel: 'Vendedor',
    horarioLabel: 'Horario: {horario}',
    verMasInfo: 'Ver más información',
    comprarWpp: 'Comprar por WhatsApp',
    modalInfoTitle: '¿Ver más información?',
    modalInfoText: 'Serás redirigido al catálogo de <strong>{vendedor}</strong>.',
    cancelar: 'Cancelar',
    continuar: 'Continuar',
    modalWppTitle: '¿Ir a WhatsApp?',
    modalWppText: 'Se abrirá un chat con el vendedor <strong>{vendedor}</strong>.',
    favoritosEmpty: 'Aún no tienes productos favoritos.',
    favoritosTitle: 'Favoritos',
    ajustesTitle: 'Ajustes',
    apariencia: 'Apariencia',
    modoOscuro: 'Modo oscuro',
    idiomaGroup: 'Idioma',
    idiomaLabel: 'Idioma de la aplicación',
    whatsappConectando: 'Conectando con WhatsApp',
    whatsappTexto: 'Estás a punto de contactar a <strong>{vendedor}</strong> por "{producto}".',
    whatsappAbrir: 'Abrir WhatsApp',
    productoNoEncontrado: 'Producto no encontrado.',
    horarioTitle: 'Horario',
  },
  en: {
    navHome: 'Home',
    navFavoritos: 'Favorites',
    navAjustes: 'Settings',
    categoriasTitle: 'Categories',
    searchPlaceholder: 'Search product',
    filterAll: 'All',
    filterComida: 'Food',
    filterBebidas: 'Drinks',
    filterAccesorios: 'Accessories',
    filterUtiles: 'Supplies',
    noResults: 'No products match your search.',
    categoriaDefault: 'Shops',
    detalleTitle: 'Shop details',
    vendedorLabel: 'Seller',
    horarioLabel: 'Hours: {horario}',
    verMasInfo: 'See more information',
    comprarWpp: 'Buy via WhatsApp',
    modalInfoTitle: 'See more information?',
    modalInfoText: 'You will be redirected to the catalog of <strong>{vendedor}</strong>.',
    cancelar: 'Cancel',
    continuar: 'Continue',
    modalWppTitle: 'Go to WhatsApp?',
    modalWppText: 'A chat with seller <strong>{vendedor}</strong> will open.',
    favoritosEmpty: "You don't have any favorite products yet.",
    favoritosTitle: 'Favorites',
    ajustesTitle: 'Settings',
    apariencia: 'Appearance',
    modoOscuro: 'Dark mode',
    idiomaGroup: 'Language',
    idiomaLabel: 'App language',
    whatsappConectando: 'Connecting to WhatsApp',
    whatsappTexto: 'You are about to contact <strong>{vendedor}</strong> about "{producto}".',
    whatsappAbrir: 'Open WhatsApp',
    productoNoEncontrado: 'Product not found.',
    horarioTitle: 'Hours',
  },
};

export function cargarIdioma() {
  try {
    const guardado = localStorage.getItem(IDIOMA_KEY);
    return guardado === 'en' ? 'en' : 'es';
  } catch (error) {
    console.error('Error al cargar idioma desde localStorage:', error);
    return 'es';
  }
}

let idiomaActivo = cargarIdioma();

export function setIdioma(idioma) {
  idiomaActivo = idioma;
  try {
    localStorage.setItem(IDIOMA_KEY, idioma);
  } catch (error) {
    console.error('Error al guardar idioma en localStorage:', error);
  }
}

export function getIdioma() {
  return idiomaActivo;
}

export function t(key, vars = {}) {
  let texto = translations[idiomaActivo]?.[key] ?? translations.es[key] ?? key;
  Object.keys(vars).forEach((k) => {
    texto = texto.replace(`{${k}}`, vars[k]);
  });
  return texto;
}