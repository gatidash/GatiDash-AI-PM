// Server entry used only at build time, by scripts/prerender.mjs.
// The site ships as a client-rendered SPA, which meant a crawler, an ATS
// or an LLM screener fetching the URL got an empty <div id="root">.
// This renders the same tree to static HTML so the text is in the document.
import React from 'react'
import { renderToString } from 'react-dom/server'
import App from './App.jsx'

export function render() {
  return renderToString(<App />)
}
