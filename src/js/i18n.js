// ===================================
// Streatra - Sistema de Internacionalización (i18n)
// ===================================

const IDIOMA_KEY = 'streatra_idioma';

export const traducciones = {
  es: {
    navHome: 'Home',
    navFavoritos: 'Favoritos',
    navAjustes: 'Ajustes',

    categoriasTitle: 'Categorías',
    cat_all: 'Todos',
    cat_food: 'Alimentos',
    cat_jewelry: 'Bisutería',
    cat_stationery: 'Papelería',

    filterAll: 'Todos',
    filterComida: 'Comida',
    filterBebidas: 'Bebidas',
    filterAccesorios: 'Accesorios',
    filterUtiles: 'Útiles',

    searchPlaceholder: 'Buscar producto',
    noResults: 'No hay productos que coincidan con tu búsqueda.',
    favoritosEmpty: 'Aún no tienes productos guardados en favoritos.',
    productoNoEncontrado: 'Producto no encontrado.',

    // Títulos traducibles
    prod_empanadas_name: 'Empanadas',
    prod_brownies_name: 'Brownies Caseros',
    prod_jugos_name: 'Jugos Naturales',
    prod_pulsera_name: 'Pulsera tejida artesanal',
    prod_cuaderno_name: 'Cuaderno de notas A5',
    prod_sandwich_name: 'Sandwich Artesanal Mixto',
    prod_cafe_name: 'Café Caliente con Galleta',

    // Descripciones
    desc_empanadas: 'Pollo o Carne, unidad',
    desc_brownies: 'Porción individual con arequipe',
    desc_jugos: 'Botella 500ml (Mora, Mango, Fresa)',
    desc_pulsera: 'Diseño ajustable hecho a mano',
    desc_cuaderno: '80 hojas cuadriculadas ecológicas',
    desc_sandwich: 'Jamón, queso, lechuga y salsa especial en pan baguette',
    desc_cafe: 'Vaso de 8oz recién preparado con galleta artesanal',

    detalleTitle: 'Detalles de la tienda',
    vendedorLabel: 'Vendedor',
    horarioTitle: 'Horario',
    verMasInfo: 'Ver más información',
    comprarWpp: 'Comprar por WhatsApp',

    cancelar: 'Cancelar',
    continuar: 'Continuar',
    modalInfoText: 'Se abrirá un canva o un drive del vendedor {vendedor}',
    modalWppText: 'Te comunicaremos directamente con {vendedor} para gestionar tu pedido.',

    whatsappConectando: 'Conectando con la tienda',
    whatsappTexto: 'Estás a punto de comunicarte con {vendedor} para realizar tu pedido de "{producto}".',
    whatsappAbrir: 'Abrir chat de WhatsApp',
    whatsappMensaje: '¡Hola, {vendedor}! Vi tu producto "{producto}" en Streatra y me gustaría coordinar la compra.',

    ajustesTitle: 'Ajustes',
    apariencia: 'Apariencia',
    modoOscuro: 'Modo oscuro',
    idiomaGroup: 'Idioma',
    idiomaLabel: 'Idioma de la aplicación'
  },
  en: {
    navHome: 'Home',
    navFavoritos: 'Favorites',
    navAjustes: 'Settings',

    categoriasTitle: 'Categories',
    cat_all: 'All',
    cat_food: 'Food',
    cat_jewelry: 'Jewelry',
    cat_stationery: 'Stationery',

    filterAll: 'All',
    filterComida: 'Food',
    filterBebidas: 'Drinks',
    filterAccesorios: 'Accessories',
    filterUtiles: 'Supplies',

    searchPlaceholder: 'Search product',
    noResults: 'No products match your search.',
    favoritosEmpty: 'You do not have any favorite products yet.',
    productoNoEncontrado: 'Product not found.',

    // Títulos traducibles
    prod_empanadas_name: 'Empanadas',
    prod_brownies_name: 'Homemade Brownies',
    prod_jugos_name: 'Natural Juices',
    prod_pulsera_name: 'Handmade Woven Bracelet',
    prod_cuaderno_name: 'A5 Notebook',
    prod_sandwich_name: 'Artisan Mixed Sandwich',
    prod_cafe_name: 'Hot Coffee with Cookie',

    // Descripciones
    desc_empanadas: 'Chicken or Beef, 1 unit',
    desc_brownies: 'Individual slice with caramel',
    desc_jugos: '500ml bottle (Blackberry, Mango, Strawberry)',
    desc_pulsera: 'Handmade adjustable design',
    desc_cuaderno: '80 eco-friendly grid pages',
    desc_sandwich: 'Ham, cheese, lettuce and special sauce on baguette',
    desc_cafe: 'Freshly brewed 8oz cup served with handmade cookie',

    detalleTitle: 'Shop details',
    vendedorLabel: 'Seller',
    horarioTitle: 'Schedule',
    verMasInfo: 'More information',
    comprarWpp: 'Buy via WhatsApp',

    cancelar: 'Cancel',
    continuar: 'Continue',
    modalInfoText: 'A Canva or Drive link from {vendedor} will open.',
    modalWppText: 'You will connect directly with {vendedor} to place your order.',

    whatsappConectando: 'Connecting with the store',
    whatsappTexto: 'You are about to connect with {vendedor} to order "{producto}".',
    whatsappAbrir: 'Open WhatsApp chat',
    whatsappMensaje: 'Hello {vendedor}! I saw your product "{producto}" on Streatra and I would like to place an order.',

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