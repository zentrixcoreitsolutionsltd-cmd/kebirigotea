import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  esbuild: {
    jsx: 'automatic',
  },
  base: './',
  server: {
    port: 3000,
    host: '0.0.0.0',
    hmr: process.env.DISABLE_HMR !== 'true',
    watch: process.env.DISABLE_HMR === 'true' ? null : {},
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        shop: path.resolve(__dirname, 'index-1.html'),
        pay: path.resolve(__dirname, 'pay$submit.html'),
        product: path.resolve(__dirname, 'product.html'),
        view: path.resolve(__dirname, 'view.html'),
        admin: path.resolve(__dirname, 'admin.html'),
      },
    },
  },
});
