// GitHub Pages serves static files only, so direct hits on deep client-side
// routes (e.g. /LawMate/app/cases) 404 unless we also serve index.html there.
// Copying index.html to 404.html lets GitHub Pages fall back to the SPA shell,
// which then lets react-router pick up the correct route on the client.
import { copyFileSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = dirname(dirname(fileURLToPath(import.meta.url)))
const distDir = join(rootDir, 'dist')
const indexPath = join(distDir, 'index.html')
const notFoundPath = join(distDir, '404.html')

if (!existsSync(indexPath)) {
  console.error('[copy-spa-fallback] dist/index.html not found, skipping.')
  process.exit(0)
}

copyFileSync(indexPath, notFoundPath)
console.log('[copy-spa-fallback] Created dist/404.html from index.html')
