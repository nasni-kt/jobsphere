import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Make sure this matches where you expect your build output to go
    rollupOptions: {
      input: 'index.html' // Ensure this matches the path to your HTML entry point
    }
  }
});
