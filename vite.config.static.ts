import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  base: '/portfolio/',
  plugins: [react()],
  root: 'client',
  build: {
    outDir: '../public',
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'client/src'),
      '@assets': resolve(__dirname, 'assets'),
    },
  },
});
