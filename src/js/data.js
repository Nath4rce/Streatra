// ===================================
// Streatra - Datos locales offline
// ===================================

export const categorias = [
  {
    id: 'todos',
    nombre: 'Todos',
    icono: '☰'
  },
  {
    id: 'alimentos',
    nombre: 'Alimentos',
    icono: '🍴'
  },
  {
    id: 'bisuteria',
    nombre: 'Bisutería',
    icono: '💎'
  },
  {
    id: 'papeleria',
    nombre: 'Papelería',
    icono: '📖'
  }
];

export const productos = [
  {
    id: 'prod-1',
    nombre: 'Empanadas',
    descripcion: 'Pollo o Carne, unidad',
    categoria: 'alimentos',
    subcategoria: 'comida',
    imagen: '/assets/productos/empanada.png',
    vendedor: 'Juan David P.',
    horario: '10:00am - 2:00pm',
    telefono: '573001234567'
  },
  {
    id: 'prod-2',
    nombre: 'Brownies Caseros',
    descripcion: 'Porción individual',
    categoria: 'alimentos',
    subcategoria: 'comida',
    imagen: '/assets/productos/brownie.png',
    vendedor: 'Juan David P.',
    horario: '10:00am - 2:00pm',
    telefono: '573009876543'
  },
  {
    id: 'prod-3',
    nombre: 'Jugos naturales',
    descripcion: 'Botella 500ml',
    categoria: 'alimentos',
    subcategoria: 'bebidas',
    imagen: '/assets/productos/jugo.png',
    vendedor: 'Juan David P.',
    horario: '10:00am - 2:00pm',
    telefono: '573105551234'
  },
  {
    id: 'prod-4',
    nombre: 'Pulsera artesanal',
    descripcion: 'Ajustable, varios colores',
    categoria: 'bisuteria',
    subcategoria: 'accesorios',
    imagen: '/assets/productos/pulsera.png',
    vendedor: 'Laura B.',
    horario: '11:00am - 3:00pm',
    telefono: '573204449876'
  },
  {
    id: 'prod-5',
    nombre: 'Cuaderno A5',
    descripcion: 'Hojas cuadriculadas',
    categoria: 'papeleria',
    subcategoria: 'utiles',
    imagen: '/assets/productos/cuaderno.png',
    vendedor: 'Santiago G.',
    horario: '1:00pm - 5:00pm',
    telefono: '573017778899'
  }
];