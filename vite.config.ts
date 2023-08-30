import reactRefresh from '@vitejs/plugin-react-refresh'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [reactRefresh(), tsconfigPaths()],
  root: './',
  base: './',
  server: {
    // Enable open on the local network.
    open: true,
    host: true,
    proxy: {
      '/access': {
        target: 'https://www.reddit.com/api/v1/access_token',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/access/, ''),
      },
      '/me': {
        target: 'https://oauth.reddit.com/api/v1/me',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/me/, ''),
      },
      '/collection': {
        target: 'https://www.reddit.com/api/v1/collections/collection',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/collection/, ''),
      },
    },
  },
  build: {
    sourcemap: true, // Enable sourcemaps
  },
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
    },
  },
})
