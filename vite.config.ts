import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  base: '/Front-end-Verdora/',
  plugins: [react(), tailwindcss(), svgr()],
  resolve: {
    tsconfigPaths: true,
  },
});
