import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.mkv'],
  optimizeDeps: {
    include: ['styled-components', '@react-spring/parallax']
  },
})