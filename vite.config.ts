import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'motion/react': 'framer-motion'
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
});
