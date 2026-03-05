import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import path from 'node:path'
import fs from 'node:fs'

function serveParentAssets() {
  return {
    name: 'serve-parent-assets',
    configureServer(server) {
      const dirs = [
        { from: path.resolve(fileURLToPath(import.meta.url), '../images'), url: '/images' },
        { from: path.resolve(fileURLToPath(import.meta.url), '../css'), url: '/css' },
        { from: path.resolve(fileURLToPath(import.meta.url), '../videos'), url: '/videos' }
      ]
      dirs.forEach(({ from, url }) => {
        if (!fs.existsSync(from)) return
        server.middlewares.use(url, (req, res, next) => {
          const subPath = req.url.split('?')[0].replace(/^\//, '')
          const file = path.join(from, subPath)
          if (fs.existsSync(file) && fs.statSync(file).isFile()) {
            res.setHeader('Content-Type', getMime(path.extname(file)))
            fs.createReadStream(file).pipe(res)
          } else next()
        })
      })
    }
  }
}
function getMime(ext) {
  const m = { '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.css': 'text/css', '.mp4': 'video/mp4', '.webm': 'video/webm' }
  return m[ext] || 'application/octet-stream'
}

export default defineConfig({
  base: process.env.VITE_BASE_PATH || '/',
  plugins: [vue(), serveParentAssets()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    copyPublicDir: true
  }
})
