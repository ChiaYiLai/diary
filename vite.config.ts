import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import pugPlugin from 'vite-plugin-pug'

// https://vite.dev/config/
export default defineConfig({
    base: '/diary/',
    plugins: [vue(), pugPlugin()],
    server: {
        port: 5175
    }
})
