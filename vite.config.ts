import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/diary/',
  plugins: [
    vue(),
    tailwindcss(),
    AutoImport({
      imports: ['vue', 'pinia'],
      dirs: ['./src/stores', './src/composables', './src/types', './src/utils'],
    }),
    Components({
      dirs: ['src/components'],
    }),
  ],
  server: {
    host: true,
    port: 5175,
  },
})
