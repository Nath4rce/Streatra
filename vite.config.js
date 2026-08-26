import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // Permite que el index.html use rutas relativas locales
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler'
      }
    }
  }
});