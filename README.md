# Streatra

Aplicación híbrida tipo SPA para que estudiantes consulten productos disponibles por categoría y realicen pedidos directamente por WhatsApp con el vendedor.

Proyecto desarrollado para la **Entrega 2 — APP Híbrida**, usando la alternativa **SPA con Vanilla JavaScript**.

## Prototipo de Figma

🔗 [Ver prototipo en Figma](https://www.figma.com/design/j1GUCFJ9RsgdevW9vR3Arp/Streatra?node-id=0-1&p=f&t=LYpXMJDZkZNiOV4K-0)

## Tecnologías utilizadas

- HTML5
- SASS / SCSS (con `@use`, arquitectura de parciales)
- JavaScript (Vanilla, ES Modules)
- Vite (bundler)
- Git / GitHub
- LocalStorage (persistencia de favoritos, tema e idioma)

## Características principales

- Navegación tipo SPA (una sola página, sin recargas) entre Home, Categorías, Lista de productos, Detalle, Favoritos y Ajustes.
- Categorías: Todos, Alimentos, Bisutería, Papelería.
- Búsqueda y filtrado de productos por subcategoría.
- Favoritos persistentes con LocalStorage.
- Modo oscuro persistente.
- Selector de idioma (Español / Inglés) para los textos de interfaz.
- Contacto directo con el vendedor vía WhatsApp.
- Funciona completamente offline: no depende de APIs externas ni imágenes remotas (salvo el enlace externo hacia WhatsApp, que sí requiere conexión).

## Instalación y ejecución

### Requisitos previos
- Node.js (v18 o superior recomendado)
- npm

### Pasos

1. Clonar el repositorio:
```bash
   git clone https://github.com/Nath4rce/Streatra
   cd streatra
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
   Los archivos optimizados se generan en la carpeta `dist/`.

5. Previsualizar el build de producción:
```bash
   npm run preview
```
   Esto sirve la app ya compilada en `http://localhost:4173/`.

## Integrantes

- Juan Felipe Cano Noreña
- Miguel Angel Ramirez Velasquez
- Natalia Arce Peñuela

## Notas de desarrollo

Este proyecto se desarrolló siguiendo un historial de commits progresivo (40+ commits), documentando cada funcionalidad de forma incremental. El historial completo puede revisarse en el repositorio de GitHub para ver la evolución del proyecto.