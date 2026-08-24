// ===================================
// Streatra - Sistema de Internacionalización (i18n)
// ===================================

const IDIOMA_KEY = 'streatra_idioma';

export const traducciones = {
  es: {
    // Navegación Inferior
    navHome: 'Home',
    navFavoritos: 'Favoritos',
    navAjustes: 'Ajustes',

    // Pantalla Home / Categorías
    categoriasTitle: 'Categorías',
    cat_all: 'Todos',
    cat_food: 'Alimentos',
    cat_jewelry: 'Bisutería',
    cat_stationery: 'Papelería',

    // Filtros de Productos
    filterAll: 'Todos',
    filterComida: 'Comida',
    filterBebidas: 'Bebidas',
    filterAccesorios: 'Accesorios',
    filterUtiles: 'Útiles',

    // Búsqueda y Estados vacíos
    searchPlaceholder: 'Buscar producto',
    noResults: 'No hay productos que coincidan con tu búsqueda.',
    favoritosEmpty: 'Aún no tienes productos guardados en favoritos.',
    productoNoEncontrado: 'Producto no encontrado.',

    // Descripciones de Productos
    desc_empanadas: 'Pollo o Carne, unidad',
    desc_brownies: 'Porción individual con arequipe',
    desc_jugos: 'Botella 500ml (Mora, Mango, Fresa)',
    desc_pulsera: 'Diseño ajustable hecho a mano',
    desc_cuaderno: '80 hojas cuadriculadas ecológicas',

    // Pantalla Detalle
    detalleTitle: 'Detalles de la tienda',
    vendedorLabel: 'Vendedor',
    horarioTitle: 'Horario',
    verMasInfo: 'Ver más información',
    comprarWpp: 'Comprar por WhatsApp',

    // Modales
    cancelar: 'Cancelar',
    continuar: 'Continuar',
    modalInfoText: 'Se abrirá un canva o un drive del vendedor {vendedor}',
    modalWppText: 'Te comunicaremos directamente con {vendedor} para gestionar tu pedido.',

    // Pantalla WhatsApp
    whatsappConectando: 'Conectando con la tienda',
    whatsappTexto: 'Estás a punto de comunicarte con {vendedor} para realizar tu pedido de "{producto}".',
    whatsappAbrir: 'Abrir chat de WhatsApp',

    // Pantalla Ajustes
    ajustesTitle: 'Ajustes',
    apariencia: 'Apariencia',
    modoOscuro: 'Modo oscuro',
    idiomaGroup: 'Idioma',
    idiomaLabel: 'Idioma de la aplicación'
  },
  en: {
    // Bottom Navigation
    navHome: 'Home',
    navFavoritos: 'Favorites',
    navAjustes: 'Settings',

    // Home Screen / Categories
    categoriasTitle: 'Categories',
    cat_all: 'All',
    cat_food: 'Food',
    cat_jewelry: 'Jewelry',
    cat_stationery: 'Stationery',

    // Product Filters
    filterAll: 'All',
    filterComida: 'Food',
    filterBebidas: 'Beverages',
    filterAccesorios: 'Accessories',
    filterUtiles: 'Supplies',

    // Search and Empty States
    searchPlaceholder: 'Search product',
    noResults: 'No products match your search.',
    favoritosEmpty: 'You do not have any favorite products yet.',
    productoNoEncontrado: 'Product not found.',

    // Product Descriptions
    desc_empanadas: 'Chicken or Beef, 1 unit',
    desc_brownies: 'Individual slice with caramel',
    desc_jugos: '500ml bottle (Blackberry, Mango, Strawberry)',
    desc_pulsera: 'Handmade adjustable design',
    desc_cuaderno: '80 eco-friendly grid pages',

    // Detail Screen
    detalleTitle: 'Shop details',
    vendedorLabel: 'Seller',
    horarioTitle: 'Schedule',
    verMasInfo: 'More information',
    comprarWpp: 'Buy via WhatsApp',

    // Modals
    cancelar: 'Cancel',
    continuar: 'Continue',
    modalInfoText: 'A Canva or Drive link from {vendedor} will open.',
    modalWppText: 'You will connect directly with {vendedor} to place your order.',

    // WhatsApp Screen
    whatsappConectando: 'Connecting with the store',
    whatsappTexto: 'You are about to connect with {vendedor} to order "{producto}".',
    whatsappAbrir: 'Open WhatsApp chat',

    // Settings Screen
    ajustesTitle: 'Settings',
    apariencia: 'Appearance',
    modoOscuro: 'Dark mode',
    idiomaGroup: 'Language',
    idiomaLabel: 'App language'
  }
};

export function getIdioma() {
  try {
    return localStorage.getItem(IDIOMA_KEY) || 'es';
  } catch {
    return 'es';
  }
}

export function setIdioma(lang) {
  try {
    localStorage.setItem(IDIOMA_KEY, lang);
  } catch (error) {
    console.error('Error al guardar idioma en localStorage:', error);
  }
}

export function t(clave, params = {}) {
  const lang = getIdioma();
  let texto = traducciones[lang]?.[clave] || traducciones['es']?.[clave] || clave;

  Object.keys(params).forEach((param) => {
    texto = texto.replace(new RegExp(`{${param}}`, 'g'), params[param]);
  });

  return texto;
}