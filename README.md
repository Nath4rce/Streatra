# Streatra

Aplicación híbrida tipo SPA para que estudiantes consulten productos disponibles por categoría y realicen pedidos directamente por WhatsApp con el vendedor.

Proyecto desarrollado para la **Entrega 2 — APP Híbrida**, usando la alternativa **SPA con Vanilla JavaScript**.

## Prototipo de Figma

🔗 [Ver prototipo en Figma](https://www.figma.com/design/j1GUCFJ9RsgdevW9vR3Arp/Streatra?node-id=0-1&p=f&t=LYpXMJDZkZNiOV4K-0)

## Tecnologías utilizadas

- HTML5
- SASS / SCSS (con `@use`, arquitectura de parciales modulares)
- JavaScript (Vanilla ES Modules, enrutador dinámico SPA)
- Vite (bundler, compilación optimizada)
- Git / GitHub (Conventional Commits)
- LocalStorage (persistencia de favoritos, tema e idioma)

## Características principales

- **Navegación SPA:** Enrutamiento dinámico sin recargas entre Splash, Home/Categorías, Listado con filtros, Detalle de Producto, Favoritos, Ajustes y Pantalla de WhatsApp.
- **Categorías:** Todos, Alimentos, Bisutería, Papelería.
- **Búsqueda y filtrado** de productos por subcategoría.
- **Favoritos persistentes** con LocalStorage.
- **Modo oscuro/claro** persistente con selector en Ajustes y adaptación de contraste en tipografías, tarjetas e iconos.
- **Internacionalización completa (i18n):** Soporte bilingüe Español/Inglés en tiempo real con preferencia guardada en LocalStorage.
- **Contacto directo con el vendedor** vía WhatsApp con generación dinámica de enlaces y mensaje preconfigurado.
- **Modales superpuestos** con efecto glassmorphism (`backdrop-filter: blur()`) para confirmar redirecciones.
- **100% Offline First:** Funciona de manera completamente autónoma sin conexión a internet para catálogo, filtros y navegación. Solo requiere conexión para acceder a WhatsApp.

## Instalación y ejecución

### Requisitos previos

- Node.js (v18 o superior recomendado)
- npm

### Pasos

1. Clonar el repositorio:

```bash
git clone https://github.com/Nath4rce/Streatra
cd Streatra
```

2. Instalar dependencias:

```bash
npm install
```

3. Ejecutar en modo desarrollo:

```bash
npm run dev
```

Esto abre la app en `http://localhost:5173/`.

4. Generar el build de producción:

```bash
npm run build
```

Los archivos optimizados se generan en la carpeta `dist/`, listos para empaquetar con Capacitor JS en Android Studio.

5. Previsualizar el build de producción:

```bash
npm run preview
```

Esto sirve la app ya compilada en `http://localhost:4173/`.

## Estructura del proyecto

```
Streatra/
├── public/
│   └── assets/
│       ├── logo.png
│       ├── streatra-wordmark.png
│       ├── Hamburguesa.png
│       ├── Alimentos.png
│       ├── Bisuteria.png
│       └── Papeleria.png
├── src/
│   ├── js/
│   │   ├── data.js              # Catálogo offline de categorías y productos
│   │   ├── i18n.js              # Motor de traducción y diccionarios ES/EN
│   │   ├── main.js              # Enrutador SPA, estado y renderizado dinámico
│   │   └── views/
│   │       └── splash.js        # Pantalla de splash
│   └── styles/
│       ├── _variables.scss      # Paleta de colores, tipografía y espaciados
│       ├── _base.scss           # Reset CSS y estilos globales
│       ├── _header.scss         # Encabezado con imagen de marca
│       ├── _navigation.scss     # Barra de navegación inferior persistente
│       ├── _cards.scss          # Tarjetas de categorías y productos
│       ├── _screens.scss        # Vistas (Splash, Detalle, Favoritos, Ajustes, WhatsApp)
│       ├── _modals.scss         # Modales flotantes de confirmación
│       └── main.scss            # Archivo raíz que importa los partials
├── .gitignore                   # Archivos ignorados por Git (node_modules, dist, env)
├── index.html                   # Entrada principal de la aplicación
├── package.json                 # Scripts npm y dependencias
├── package-lock.json            # Bloqueo exacto de versiones de dependencias
├── vite.config.js               # Configuración de Vite y Sass
└── README.md                     # Documentación del proyecto
```

## Integrantes

- Miguel Ángel Ramírez Velásquez
- Juan Felipe Cano Noreña
- Natalia Arce Peñuela

## Notas de desarrollo

Este proyecto se desarrolló siguiendo un historial de commits progresivo (40+ commits), documentando cada funcionalidad de forma incremental con **Conventional Commits**. El historial completo puede revisarse en el [repositorio de GitHub](https://github.com/Nath4rce/Streatra) para ver la evolución del proyecto desde la arquitectura inicial hasta la versión final optimizada.