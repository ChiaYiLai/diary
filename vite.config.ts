import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
    base: '/diary/',
    plugins: [vue()],
    server: {
        host: true,
        port: 5175
    }
})
