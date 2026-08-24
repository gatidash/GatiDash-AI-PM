// Injects the statically rendered app into dist/index.html, plus JSON-LD.
// Runs after `vite build` and `vite build --ssr`. No headless browser, so it
// works anywhere the build runs — including Vercel.
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const htmlPath = resolve(root, 'dist/index.html')
const { render } = await import(resolve(root, 'dist-ssr/entry-server.js'))

const appHtml = render()
let html = readFileSync(htmlPath, 'utf8')

if (!html.includes('<div id="root"></div>')) {
  throw new Error('prerender: could not find an empty #root to fill')
}
html = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)

// ── structured data ───────────────────────────────────────────
const jsonLd = JSON.parse(readFileSync(resolve(root, 'scripts/person.json'), 'utf8'))
html = html.replace(
  '</head>',
  `  <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>\n  </head>`
)

writeFileSync(htmlPath, html)

const bodyText = appHtml.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
console.log(`prerender: ${(appHtml.length / 1024).toFixed(1)} KB of markup, ${bodyText.split(' ').length} words of body text in the HTML`)
