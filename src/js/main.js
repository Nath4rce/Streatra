// ===================================
// Streatra - Punto de entrada de la SPA (Vanilla JS)
// ===================================

const app = document.getElementById('app');

// Datos "quemados" - se van a mover a un archivo aparte (data.js) a medida
// que crezca, para no mezclar datos con logica de render.
const categorias = [
  { id: 'alimentos', nombre: 'Alimentos' },
  { id: 'bisuteria', nombre: 'Bisuteria' },
  { id: 'papeleria', nombre: 'Papeleria' },
];

// Enrutamiento simple basado en un estado en memoria (sin libreria de router)
let pantallaActual = 'categorias';

function render() {
  app.innerHTML = `
    <div class="brand-strip"><span>Streatra</span></div>
    <p style="padding: 16px; color: #8A827C; font-size: 13px;">
      Pantalla actual: ${pantallaActual} - siguiente paso: armar cada vista
    </p>
  `;
}

render();

// Exportamos por si otros módulos necesitan re-renderizar
export { render, categorias };
