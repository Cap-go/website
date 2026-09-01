import { access, readFile } from 'node:fs/promises'
import { createServer } from 'node:http'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')

export function isPathWithinRoot(filePath, rootDir) {
  const resolvedFile = path.resolve(filePath)
  const resolvedRoot = path.resolve(rootDir)
  const relative = path.relative(resolvedRoot, resolvedFile)
  return relative === '' || (!relative.startsWith('..') && !path.isAbsolute(relative))
}

export async function pathExists(target) {
  try {
    await access(target)
    return true
  } catch {
    return false
  }
}

function contentType(filePath) {
  if (filePath.endsWith('.html')) return 'text/html; charset=utf-8'
  if (filePath.endsWith('.css')) return 'text/css; charset=utf-8'
  if (filePath.endsWith('.js')) return 'text/javascript; charset=utf-8'
  if (filePath.endsWith('.webp')) return 'image/webp'
  if (filePath.endsWith('.png')) return 'image/png'
  if (filePath.endsWith('.jpg') || filePath.endsWith('.jpeg')) return 'image/jpeg'
  if (filePath.endsWith('.svg')) return 'image/svg+xml'
  if (filePath.endsWith('.woff2')) return 'font/woff2'
  if (filePath.endsWith('.woff')) return 'font/woff'
  if (filePath.endsWith('.json')) return 'application/json'
  return 'application/octet-stream'
}

export async function startStaticServer(distDir, port) {
  const absoluteDist = path.join(ROOT, distDir)
  const server = createServer(async (req, res) => {
    try {
      const url = new URL(req.url || '/', `http://127.0.0.1:${port}`)
      let pathname = decodeURIComponent(url.pathname)
      if (pathname.endsWith('/')) pathname += 'index.html'
      const filePath = path.resolve(absoluteDist, `.${pathname}`)
      if (!isPathWithinRoot(filePath, absoluteDist)) {
        res.writeHead(403).end('Forbidden')
        return
      }
      const data = await readFile(filePath)
      res.writeHead(200, { 'Content-Type': contentType(filePath) })
      res.end(data)
    } catch {
      res.writeHead(404).end('Not found')
    }
  })

  await new Promise((resolve) => server.listen(port, '127.0.0.1', resolve))
  return server
}
