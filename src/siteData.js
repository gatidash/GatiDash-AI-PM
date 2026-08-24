// ─────────────────────────────────────────────────────────────
// Shared facts. One source, imported by both App.jsx and
// Heroes.jsx — these used to be duplicated in two files and had
// already drifted apart.
//
// Every figure carries its provenance:
//   Shipped — measured in production
//   Modeled — a projection built on real data
//   Concept — illustrative; never built
//
// Numbers here are traceable to public/GatiDash_Resume.pdf.
// See REMOVED_CLAIMS.md for what was taken out and why.
// ─────────────────────────────────────────────────────────────

export const HERO_METRICS = [
  { v: '60%', l: 'Less manual intervention on high-volume workflows', proof: 'Shipped' },
  { v: '5', l: 'Jurisdictions running the agentic platform', proof: 'Shipped' },
  { v: '60+', l: 'Regulatory reports onboarded in three months', proof: 'Shipped' },
  { v: '15+', l: 'Years in data and product', proof: 'Shipped' },
]

export const IDENTITY = {
  name: 'Gatikrishna Dash',
  role: 'AI Product & Transformation Leader',
  employer: 'PayPal',
  email: 'gati4dash@gmail.com',
  linkedin: 'https://www.linkedin.com/in/gati-dash',
  location: 'Hyderabad, India',
  resume: '/GatiDash_Resume.pdf',
  avatar: '/profile-avatar.webp',
  portrait: '/profile-cutout.webp',
}
