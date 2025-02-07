import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        open: true,
        port: 3000,
        proxy: {
            '/api': {
                target: 'http://localhost:4000',
                changeOrigin: true,
                secure: false,
            },
        },
    }
});
