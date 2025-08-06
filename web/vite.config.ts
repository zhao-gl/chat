import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@components': path.resolve(__dirname, './src/components'),
            '@pages': path.resolve(__dirname, './src/pages'),
        },
    },
    server: {
        proxy: {
            '/chat': {
                target: 'http://127.0.0.1:3000',
                changeOrigin: true,
                // rewrite: (path) => path.replace(/^\/chat/, ''),
            },
        },
    },
})
