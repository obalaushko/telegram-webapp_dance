import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import basicSsl from '@vitejs/plugin-basic-ssl';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        https: {},
        proxy: {
            '/api': {
                target: 'https://telegrambot-homebalaushki.duckdns.org/host/test',
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@style': path.resolve(__dirname, './src/style'),
            '@components': path.resolve(__dirname, './src/components'),
            '@pages': path.resolve(__dirname, './src/pages'),
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@import "${path.resolve(__dirname, './src/style/constants.scss')}";`,
            },
        },
    },
    build: {
        sourcemap: true,
    },
    plugins: [react(), basicSsl()],
});
