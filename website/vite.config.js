import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: resolve(__dirname, 'src'),
  build: {
    minify: true,
    cssMinify: true,
    outDir: '../dist',
  },
  base: "/initcss/",
});