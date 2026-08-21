import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
const root = path.dirname(fileURLToPath(import.meta.url))
function mimeFor(file) {
  const ext = path.extname(file).toLowerCase()
  if (ext === '.png') return 'image/png'
  if (ext === '.jpg' || ext === '.jpeg') return 'image/jpeg'
  if (ext === '.webp') return 'image/webp'
  if (ext === '.svg') return 'image/svg+xml'
  return 'application/octet-stream'
}
function serveFolder(urlPrefix, dir) {
  const resolved = path.resolve(dir)
  return {
    name: `serve-${urlPrefix.replace(/\W/g, '')}`,
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url?.split('?')[0] ?? ''
        if (!url.startsWith(urlPrefix)) return next()
        const rel = decodeURIComponent(url.slice(urlPrefix.length).replace(/^\/+/, ''))
        if (!rel || rel.includes('..')) return next()
        const file = path.normalize(path.join(resolved, rel))
        if (!file.startsWith(resolved)) return next()
        if (!fs.existsSync(file) || !fs.statSync(file).isFile()) return next()
        res.setHeader('Content-Type', mimeFor(file))
        res.setHeader('Cache-Control', 'public, max-age=86400')
        fs.createReadStream(file).pipe(res)
      })
    },
  }
}
export default defineConfig({

  plugins: [
    react(),
    serveFolder('/frames/', path.join(root, 'frames')),
    serveFolder('/brand/', path.join(root, 'Neuer Ordner')),
  ],
  server: {
    host: true,
    port: 5174,
    strictPort: true,
    watch: {
      ignored: ['**/frames/**', '**/*.mp4'],
    },
    fs: {
      allow: [root],
    },
  },
})
