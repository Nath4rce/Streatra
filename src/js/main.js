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
    }, );
  }

  if (vistaActual === 'home') {
    app.innerHTML = `
      <header class="home-header">
        <h1 class="home-header__brand">Streatra</h1>
      </header>

      <main class="home-content">
        <section class="categories-section">
          <h2 class="categories-section__title">Categorías</h2>
          <div class="categories-list" id="categories-list">
            <!-- Las categorías se agregan en el commit #12 -->
          </div>
        </section>
      </main>
    `;
    return;
  }
}

// Render inicial
render();