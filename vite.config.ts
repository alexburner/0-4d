import { defineConfig } from 'vite'
import checker from 'vite-plugin-checker'

// https://vitejs.dev/config/
export default defineConfig({
  // For github pages
  // -> https://vitejs.dev/guide/static-deploy.html#github-pages
  base: '/0-4d/',
  build: { outDir: 'docs' },
  // Type-checking / linting
  plugins: [
    checker({
      overlay: false,
      typescript: true,
      eslint: {
        lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
      },
    }),
  ],
})
