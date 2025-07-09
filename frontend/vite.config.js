import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-cname',
      closeBundle() {
        try {
          fs.copyFileSync('../CNAME', 'dist/CNAME');
          console.log('CNAME file copied successfully');
        } catch (error) {
          console.error('Error copying CNAME file:', error);
        }
      },
    },
  ],
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
})
