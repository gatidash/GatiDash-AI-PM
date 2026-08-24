import React from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { HERO_METRICS } from './siteData'

// ─────────────────────────────────────────────────────────────
// Shared hero content (same copy + proof across both variants)
// ─────────────────────────────────────────────────────────────
const HERO = {
  role: 'AI Product & Transformation Leader · PayPal',
  available: 'Currently open to AI product leadership roles',
  headA: 'I lead AI and platform product work at PayPal.',
  headB: 'The kind that has to clear an audit,',
  headC: 'not just a demo.',
  sub: 'AI product leadership for regulated, high-stakes systems — turning compliance, risk, and regulatory operations into governed, AI-native products. The controls most teams bolt on last, I design in first.',
  email: 'gati4dash@gmail.com',
  linkedin: 'https://www.linkedin.com/in/gati-dash',
  location: 'Hyderabad, India',
  photo: '/profile-avatar.webp',
  metrics: HERO_METRICS,
}

const EASE = [0.2, 0.7, 0.2, 1]

// Word-by-word mask reveal (used for the headline)
function WordReveal({ text, className = '', delay = 0, accent = false }) {
  const reduce = useReducedMotion()
  const words = text.split(' ')
  return (
    <span className={className}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className={`inline-block ${accent ? 'hero-accent-text' : ''}`}
            initial={reduce ? false : { y: '115%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.7, delay: delay + i * 0.05, ease: EASE }}
          >
            {w}&nbsp;
          </motion.span>
        </span>
      ))}
    </span>
  )
}

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: EASE },
})

function Ctas({ tone }) {
  const light = tone === 'light'
  return (
    <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
      <a href={`mailto:${HERO.email}`} className="btn-launch">
        Start a conversation <span className="lr-arrow">→</span>
      </a>
      <a
        href={HERO.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-2 text-sm font-medium transition-colors ${
          light ? 'text-ink hover:text-accent' : 'text-white/70 hover:text-white'
        }`}
      >
        Connect on LinkedIn <ArrowUpRight className="h-4 w-4" />
      </a>
    </div>
  )
}

function HeroPortrait({ tone }) {
  const dark = tone === 'dark'
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.45, ease: EASE }}
      className="relative mx-auto lg:mx-0 w-44 sm:w-52 lg:w-full lg:max-w-[300px]"
    >
      <span className={`hero-portrait-glow ${dark ? 'is-dark' : 'is-light'}`} aria-hidden="true" />
      <div className={`hero-portrait ${dark ? 'hero-portrait-dark' : 'hero-portrait-light'}`}>
        <img
          src={HERO.photo}
          alt="Portrait of Gatikrishna Dash"
          className="h-full w-full object-cover"
          loading="eager"
        />
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────
// VARIANT A — Dark, AI-premium (animated aurora + glass)
// ─────────────────────────────────────────────────────────────
export function HeroDark() {
  const reduce = useReducedMotion()
  return (
    <section id="profile" className="hero-dark relative overflow-hidden">
      {/* animated aurora blobs */}
      <div className="pointer-events-none absolute inset-0 -z-0">
        <motion.div
          className="hero-aurora hero-aurora-1"
          animate={reduce ? {} : { x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="hero-aurora hero-aurora-2"
          animate={reduce ? {} : { x: [0, -50, 30, 0], y: [0, 25, -25, 0] }}
          transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="hero-aurora hero-aurora-3"
          animate={reduce ? {} : { x: [0, 30, -35, 0], y: [0, -20, 30, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="hero-grid-overlay absolute inset-0" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-12 pt-32 pb-24">
        <div className="grid lg:grid-cols-[1.5fr_0.85fr] gap-10 lg:gap-14 items-center">
          <div>
            <motion.p {...fade(0.05)} className="hero-pill mb-7">
              <span className="hero-pill-dot" /> {HERO.available}
            </motion.p>

            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/45 mb-6">
              {HERO.role}
            </p>

            <h1 className="font-serif font-medium text-white leading-[1.05] tracking-tight text-4xl sm:text-5xl lg:text-[62px]">
              <WordReveal text={HERO.headA} delay={0.15} className="block" />
              <WordReveal text={HERO.headB} delay={0.5} className="block" />
              <WordReveal text={HERO.headC} delay={0.85} className="block" accent />
            </h1>

            <motion.p {...fade(1.05)} className="mt-7 text-lg text-white/60 leading-relaxed max-w-xl">
              {HERO.sub}
            </motion.p>

            <motion.div {...fade(1.2)} className="mt-9">
              <Ctas tone="dark" />
            </motion.div>
          </div>

          <HeroPortrait tone="dark" />
        </div>

        {/* glass metric cards */}
        <motion.dl
          {...fade(1.35)}
          className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
        >
          {HERO.metrics.map((m) => (
            <div key={m.l} className="hero-glass">
              <dt className="font-serif font-medium text-3xl sm:text-4xl text-white leading-none">
                {m.v}
              </dt>
              <dd className="mt-3 font-mono text-[10px] uppercase tracking-[0.13em] text-white/45 leading-snug">
                {m.l}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// VARIANT B — Bold light (warm paper + gradient accent + bento)
// ─────────────────────────────────────────────────────────────
export function HeroLight() {
  return (
    <section id="profile" className="relative overflow-hidden bg-paper pt-32 pb-20">
      <div className="hero-light-glow pointer-events-none absolute inset-0" />
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-[1.5fr_0.85fr] gap-10 lg:gap-14 items-center">
          <div>
            <motion.p {...fade(0.05)} className="inline-flex items-center gap-2 text-sm text-accent mb-7">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" /> {HERO.available}
            </motion.p>

            <p className="eyebrow mb-6">{HERO.role}</p>

            <h1 className="font-serif font-medium text-ink leading-[1.03] tracking-tight text-5xl sm:text-6xl lg:text-[66px]">
              <WordReveal text={HERO.headA} delay={0.1} className="block" />
              <WordReveal text={HERO.headB} delay={0.45} className="block" />
              <WordReveal text={HERO.headC} delay={0.8} className="block" accent />
            </h1>

            <motion.p {...fade(1.0)} className="mt-7 text-lg text-smoke leading-relaxed max-w-xl">
              {HERO.sub}
            </motion.p>

            <motion.div {...fade(1.15)} className="mt-9">
              <Ctas tone="light" />
            </motion.div>
          </div>

          <HeroPortrait tone="light" />
        </div>

        {/* bento metric grid */}
        <motion.dl {...fade(1.3)} className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {HERO.metrics.map((m, i) => (
            <div key={m.l} className={`hero-bento ${i === 0 ? 'hero-bento-accent' : ''}`}>
              <dt className="font-serif font-medium text-3xl sm:text-4xl leading-none">{m.v}</dt>
              <dd className="mt-3 font-mono text-[10px] uppercase tracking-[0.13em] leading-snug opacity-70">
                {m.l}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  )
}

// Small fixed A/B switch so you can flip variants without editing the URL.
// Dev-only: it never renders in a production build unless you explicitly ask
// for it with ?dev=1 — visitors should never see the authoring controls.
export function HeroSwitcher({ variant }) {
  const forced =
    typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('dev') === '1'
  if (!import.meta.env.DEV && !forced) return null
  return (
    <div className="hero-switch">
      <span className="hero-switch-label">Hero</span>
      <a href="/" className={`hero-switch-btn ${variant === 'dark' ? 'on' : ''}`}>A · Dark</a>
      <a href="/?v=light" className={`hero-switch-btn ${variant === 'light' ? 'on' : ''}`}>B · Light</a>
      <a href="/?v=portfolio" className={`hero-switch-btn ${variant === 'portfolio' ? 'on' : ''}`}>C · 21st</a>
    </div>
  )
}
