# Regulated Intelligence Operating System — Portfolio

A premium, executive one-page portfolio for **Gatikrishna Dash** — Senior Product Leader (AI, Automation & Strategy). Positioned as an *Operating System for Regulated Intelligence*: governed, audit-grade AI-native platforms for regulated enterprise workflows.

Built with **Vite + React + Tailwind CSS**, deployable on **Vercel** for free.

---

## Project structure

```
portfolio/
├── public/
│   ├── favicon.svg
│   └── GatiDash_Resume.pdf        ← drop your resume here (you add this)
├── src/
│   ├── App.jsx                ← all sections & content (edit copy here)
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
├── .gitignore
└── README.md
```

---

## 1 · Run locally

**Prereqs:** [Node.js 18+](https://nodejs.org) (LTS recommended).

```bash
# from inside the project folder
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

To preview a production build:

```bash
npm run build
npm run preview
```

---

## 2 · Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: Regulated Intelligence OS portfolio"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

---

## 3 · Deploy on Vercel (free)

1. Sign in at **https://vercel.com** with your GitHub account.
2. Click **Add New → Project**.
3. Import your portfolio repository.
4. Vercel will auto-detect Vite. Confirm:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
5. Click **Deploy**. You'll get a `https://<project>.vercel.app` URL in ~60 seconds.

### Add your resume

1. Place your PDF at `public/GatiDash_Resume.pdf`.
2. Commit & push — Vercel redeploys automatically.
3. The "Download Resume" buttons resolve to `/GatiDash_Resume.pdf` at runtime.

### Custom domain (optional)

Vercel → **Project → Settings → Domains** → add your domain and follow the DNS instructions.

---

## 4 · Editing copy later

All section content lives in **`src/App.jsx`** at the top, in clearly named arrays:

| Array | Section |
|---|---|
| `NAV` | Top navigation |
| `PROOF_CHIPS` | Hero proof tiles |
| `STACK_LAYERS` | OS Stack layers (each with tagline + desc) |
| `PROOF_MODULES` | Proof Modules (headline + 8-row structure) |
| `DECISIONS` | Decision Kernel (tension / judgment / anti-pattern) |
| `PROTOCOL_GROUPS` | Governance Protocols (grouped into 3 themes) |
| `HEADLINE_NUMBERS` | Scale Metrics headline strip |
| `METRIC_GROUPS` | Scale Metrics categorized grid |
| `MANIFESTO_LINES` | Manifesto principles |
| `ROLE_FITS` | Operator Manual role-fit cards |

Change a string → save → refresh.

---

## 5 · Troubleshooting

**`npm install` fails**
- Make sure Node ≥ 18 (`node -v`). Upgrade via [nodejs.org](https://nodejs.org).
- Delete `node_modules` and `package-lock.json`, then retry.
- If behind a corporate proxy: `npm config set registry https://registry.npmjs.org/`.

**Tailwind styles don't load**
- Confirm `tailwind.config.js` `content` paths include `./index.html` and `./src/**/*.{js,jsx}`.
- Confirm `src/index.css` starts with the three `@tailwind` directives.
- Restart `npm run dev` after editing config files.

**Vercel build fails**
- Re-check the project's **Output Directory** is `dist` (not `build`).
- Inspect the Vercel build log — usually an unused import or a typo.
- Re-run locally: `npm run build` must succeed before Vercel will.

**Resume download doesn't work**
- File must be exactly at `public/GatiDash_Resume.pdf` (case-sensitive).
- After adding it, push to GitHub — Vercel will redeploy.
- Hit `https://<your-site>.vercel.app/GatiDash_Resume.pdf` directly to verify it serves.

**Updating the site**
- Edit a file → `git add . && git commit -m "..." && git push`.
- Vercel auto-deploys every push to `main`. New URL preview per PR.

---

## 6 · Future improvement ideas

- Add a `/case-studies` route with deeper write-ups behind each Proof Module.
- Inline a **live status console** that streams real-time governance telemetry.
- Add a press / writing section that pulls from a simple Markdown frontmatter.
- Wire **Vercel Analytics** (free) → Project Settings → Analytics → Enable.
- Add an **og-image.png** for richer LinkedIn / Twitter previews.
- Implement a contact form using a free Formspree / Resend endpoint.
- Animate the OS Stack layers with subtle entrance transitions on scroll.

---

Designed as a Regulated Intelligence Operating System.
