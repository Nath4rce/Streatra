// ===================================
// Streatra - Sistema de Navegación SPA
// ===================================

import '../styles/main.scss';

const app = document.getElementById('app');

// Estado global de navegación
let vistaActual = 'splash';

// Cambia la vista activa y vuelve a renderizar
export function navegarA(vista) {
  vistaActual = vista;
  render();
}

// Función principal de renderizado según la vista activa
function render() {
  if (vistaActual === 'splash') {
    app.innerHTML = `
      <main class="splash-screen">
        <div class="splash-screen__content">
          <img src="/assets/logo/logo.png" alt="Streatra Logo" class="splash-screen__logo" />
          <div class="splash-screen__loader">
            <div class="splash-screen__loader-bar"></div>
          </div>
        </div>
      </main>
    `;

    setTimeout(() => {
      navegarA('home');
    }, 2500);
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