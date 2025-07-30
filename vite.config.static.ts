import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { copyFile } from 'fs/promises';

function copy404() {
  return {
    name: 'copy-404',
    closeBundle: async () => {
      const outDir = resolve(__dirname, 'public');
      await copyFile(resolve(outDir, 'index.html'), resolve(outDir, '404.html'));
    },
  };
}

export default defineConfig({
  base: '/portfolio/',
  plugins: [react(), copy404()],
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
