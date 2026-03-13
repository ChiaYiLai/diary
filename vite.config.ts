import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import Components from 'unplugin-vue-components/vite'

// https://vite.dev/config/
export default defineConfig({
    base: '/diary/',
    plugins: [
        vue(),
        tailwindcss(),
        Components({
            dirs: ['src/components', 'src/svg', 'src/layouts', 'src/modal']
        })
    ],
    server: {
        host: true,
        port: 5175
    }
})
