import path from 'node:path'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: 'https://rolling-scopes-school.github.io/bitbybit-JSFE2024Q4/decision-making-tool/',

  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src')
    }
  },

  build: {
    assetsInlineLimit: 0,
    cssCodeSplit: false,
    cssMinify: false,
    sourcemap: true,
    minify: false,

    rollupOptions: {
      input: {
        index: 'index.html'
      }
    }
  },

  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern'
      }
    }
  },

  plugins: [tailwindcss()]
})
