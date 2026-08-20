// ===================================
// Streatra - Sistema de Navegación SPA
// ===================================

const app = document.getElementById('app');

// Estado global de navegación
let vistaActual = 'splash';

// Función para cambiar de pantalla
function navegarA(nuevaVista) {
  vistaActual = nuevaVista;
  render();
}

// Función principal de renderizado según la vista activa
function render() {
  if (vistaActual === 'splash') {
    app.innerHTML = `
      <main class="spa-container" style="padding: 24px; text-align: center;">
        <h2>Pantalla: Splash</h2>
        <p style="margin: 16px 0; color: #8A827C;">Vista temporal de carga</p>
        <button id="btn-ir-home" style="padding: 10px 20px; cursor: pointer;">
          Ir a Home
        </button>
      </main>
    `;

    document.getElementById('btn-ir-home').addEventListener('click', () => {
      navegarA('home');
    });
    return;
  }

  if (vistaActual === 'home') {
    app.innerHTML = `
      <main class="spa-container" style="padding: 24px; text-align: center;">
        <header class="brand-strip">
          <span>Streatra</span>
        </header>
        <h2 style="margin-top: 16px;">Pantalla: Home / Categorías</h2>
        <p style="margin: 16px 0; color: #8A827C;">Vista principal de navegación</p>
        <button id="btn-ir-splash" style="padding: 10px 20px; cursor: pointer;">
          Volver a Splash
        </button>
      </main>
    `;

    document.getElementById('btn-ir-splash').addEventListener('click', () => {
      navegarA('splash');
    });
  }
}

// Render inicial
render();