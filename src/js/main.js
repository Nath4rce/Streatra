// ===================================
// Streatra - Punto de entrada de la SPA (Vanilla JS)
// ===================================

const app = document.getElementById('app');

// Estado inicial de la pantalla
let pantallaActual = 'inicio';

// Función principal para renderizar la vista en el contenedor #app
function render() {
  app.innerHTML = `
    <main class="spa-container">
      <header class="brand-strip">
        <span>Streatra</span>
      </header>
      <section style="padding: 24px; text-align: center;">
        <p style="color: #8A827C; font-size: 14px;">
          Estructura base SPA inicializada.
        </p>
        <p style="color: #333; font-size: 12px; margin-top: 8px;">
          Pantalla actual: <strong>${pantallaActual}</strong>
        </p>
      </section>
    </main>
  `;
}

// Ejecución inicial
render();