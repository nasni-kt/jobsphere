import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'docs', // Ensure build output is directed to the docs directory
    emptyOutDir: true, // Clear the docs directory before building
  },
});
