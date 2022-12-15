import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  esbuild: {
    loader: 'jsx',
  },
  root: './',
  build: {
    outDir: './build',
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
        '.ts': 'tsx',
      },
    },
  },
  plugins: [react()],
});
