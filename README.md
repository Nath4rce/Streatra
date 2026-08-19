# Streatra - App de Ventas Moviles UPB

Aplicacion hibrida (SPA - Vanilla JS) que promociona los productos autorizados por
Bienestar Estudiantil dentro de la Resolucion Rectoral General No. 060 de 2022
(Alimentos, Bisuteria, Papeleria). Conecta al comprador directamente con el
vendedor por WhatsApp, sin necesidad de conexion a internet dentro de la app
(los datos de productos y vendedores estan precargados en el codigo).

## Prototipo en Figma

> TODO: pegar aqui el link del archivo de Figma actualizado

## Como ejecutar el proyecto

1. Clonar el repositorio
   ```
   git clone <url-del-repo>
   cd streatra-ventas-moviles
   ```
2. Instalar dependencias
   ```
   npm install
   ```
3. Correr en modo desarrollo
   ```
   npm run dev
   ```
4. Generar el build final (bundle minificado, para el "instalador web")
   ```
   npm run build
   ```
   Esto genera la carpeta `dist/` con el html, css y js listos para distribuir.

## Equipo

- Juan David Parra Sierra
- Santiago Viana Ayala
- Natalia Arce Peñuela
- Miguel Angel Ramirez Velasquez
- Sara Soto Solis

## Estructura del proyecto

```
src/
  index.html
  styles/
    _variables.scss   -> paleta de colores
    _base.scss        -> reset y estilos globales
    main.scss         -> punto de entrada de estilos
  js/
    main.js           -> punto de entrada de la app
```
