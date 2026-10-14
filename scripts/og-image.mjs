// Renders scripts/og-image.html → public/og-image.png (1200×630).
// Serves /public so the self-hosted fonts and the portrait resolve the same
// way they do on the site. Needs playwright on the PATH (npx playwright is
// fine); it is not a dependency of the site itself.
//
//   node scripts/og-image.mjs
//
import { createServer } from 'node:http'
import { readFileSync, existsSync, statSync } from 'node:fs'
import { resolve, extname, join } from 'node:path'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
let chromium
try {
  ;({ chromium } = require('playwright'))
} catch {
  console.error('playwright not found — `npm i -D playwright` or point NODE_PATH at a global install')
  process.exit(1)
}

const root = resolve(new URL('..', import.meta.url).pathname)
const pub = join(root, 'public')
const types = { '.html': 'text/html', '.css': 'text/css', '.webp': 'image/webp', '.woff2': 'font/woff2' }

const server = createServer((req, res) => {
  const path = req.url === '/og' ? join(root, 'scripts/og-image.html') : join(pub, req.url.split('?')[0])
  if (!existsSync(path) || statSync(path).isDirectory()) { res.statusCode = 404; return res.end() }
  res.setHeader('Content-Type', types[extname(path)] || 'application/octet-stream')
  res.end(readFileSync(path))
})

await new Promise((r) => server.listen(0, r))
const port = server.address().port
const browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {})
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 })
await page.goto(`http://localhost:${port}/og`, { waitUntil: 'networkidle' })
await page.evaluate(() => document.fonts.ready)
const out = join(pub, 'og-image.png')
await page.screenshot({ path: out, type: 'png' })
await browser.close()
server.close()
console.log('wrote', out)
