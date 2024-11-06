import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@Pages": path.resolve(__dirname, "src/pages"),
      "@Admin": path.resolve(__dirname, "src/pages/Admin"),
      "@Teacher": path.resolve(__dirname, "src/pages/Teacher"),
      "@Dashboard": path.resolve(__dirname, "src/pages/Dashboard"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@components": path.resolve(__dirname, "src/components"),
      "@services": path.resolve(__dirname, "src/services"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@store": path.resolve(__dirname, "src/store"),
    }
  }
})
