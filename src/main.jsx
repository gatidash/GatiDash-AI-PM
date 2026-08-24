import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const container = document.getElementById('root')
const tree = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// The build prerenders the app into #root (see scripts/prerender.mjs), so in
// production there is markup to hydrate. In dev there isn't — fall back.
if (container.hasChildNodes()) {
  hydrateRoot(container, tree)
} else {
  createRoot(container).render(tree)
}
