import React, { useState, useEffect, useRef, useMemo } from 'react'
import { Menu, X, ChevronDown, Sun, Moon, ArrowUpRight, FileText, Linkedin } from 'lucide-react'

// 21st.dev "Portfolio Hero" — ported to JSX, driven by the global site theme.
// Neon lime in dark mode; a deep sage stands in when the page is light (lime on
// paper is illegible). Both come from one place:
const nameColor = (dark) => (dark ? '#C3E41D' : '#54632B')

const EMAIL = 'gati4dash@gmail.com'
const LINKEDIN = 'https://www.linkedin.com/in/gati-dash'
const RESUME = '/GatiDash_Resume.pdf'

// BlurText animation component
const BlurText = ({ text, delay = 50, animateBy = 'words', direction = 'top', className = '', style, instant = false }) => {
  const [inView, setInView] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true)
      },
      { threshold: 0.1 }
    )
    if (node) observer.observe(node)
    return () => {
      if (node) observer.unobserve(node)
    }
  }, [])

  const byWords = animateBy === 'words'
  const segments = useMemo(() => (byWords ? text.split(' ') : text.split('')), [text, byWords])

  // `instant` opts an element out of the entrance animation entirely.
  // The wordmark uses it: it is the largest text on the page, so it is the
  // LCP element, and starting it at opacity 0 meant the headline did not
  // paint until JS had hydrated and the observer had fired. It also left the
  // prerendered HTML invisible to anyone without JS.
  if (instant) {
    return (
      <p className={`flex ${byWords ? 'gap-x-[0.3em]' : ''} ${className}`} style={style}>
        {segments.map((segment, i) => (
          <span key={i} style={{ display: 'inline-block', whiteSpace: 'pre' }}>
            {segment}
          </span>
        ))}
      </p>
    )
  }

  // The segments are flex items, so a literal space between them collapses.
  // Word mode needs a real gap or the sentence renders as one long word.
  return (
    <p ref={ref} className={`flex ${byWords ? 'gap-x-[0.3em]' : ''} ${className}`} style={style}>
      {segments.map((segment, i) => (
        <span
          key={i}
          style={{
            display: 'inline-block',
            whiteSpace: 'pre',
            filter: inView ? 'blur(0px)' : 'blur(10px)',
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : `translateY(${direction === 'top' ? '-20px' : '20px'})`,
            transition: `all 0.5s ease-out ${i * delay}ms`,
          }}
        >
          {segment}
        </span>
      ))}
    </p>
  )
}

export default function PortfolioHero({ theme = 'dark', onToggleTheme = () => {}, workedWith = [] }) {
  const isDark = theme === 'dark'
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const menuRef = useRef(null)
  const buttonRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isMenuOpen])

  // The header is fixed for the whole page — without a backdrop the body copy
  // scrolls straight through the signature.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const fg = isDark ? 'hsl(0 0% 100%)' : 'hsl(0 0% 10%)'
  const bg = isDark ? '#000000' : '#F2F0EA'
  const surface = isDark ? '#0C0C0E' : '#EAE7DD'
  const accent = nameColor(isDark)
  const muted = isDark ? 'rgba(255,255,255,0.55)' : '#6B6859'

  const menuItems = [
    { label: 'HOME', href: '#profile', highlight: true },
    { label: 'WORK', href: '#work' },
    { label: 'ARTIFACTS', href: '#artifacts' },
    { label: 'JUDGMENT', href: '#judgment' },
    { label: 'CASE STUDIES', href: '#case-studies' },
    { label: 'WRITING', href: '#blogs' },
    { label: 'ABOUT', href: '#about' },
    { label: 'CONTACT', href: '#contact' },
  ]

  const nameClass =
    'hero-name font-bold text-[68px] sm:text-[120px] md:text-[164px] lg:text-[200px] leading-[0.78] tracking-tighter uppercase justify-center whitespace-nowrap'
  const nameStyle = { color: accent, fontFamily: "'Fraunces', Georgia, serif" }

  return (
    <section id="profile" className="relative min-h-screen transition-colors" style={{ backgroundColor: bg, color: fg }}>
      {/* Fixed header — doubles as the site nav */}
      <header
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? (isDark ? 'rgba(0,0,0,0.72)' : 'rgba(242,240,234,0.82)') : 'transparent',
          backdropFilter: scrolled ? 'blur(14px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(14px)' : 'none',
          borderBottom: `1px solid ${scrolled ? (isDark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.10)') : 'transparent'}`,
        }}
      >
        <nav className="flex items-center justify-between max-w-screen-2xl mx-auto">
          <div className="relative">
            <button
              ref={buttonRef}
              type="button"
              className="p-2 transition-colors duration-300 z-50"
              style={{ color: isMenuOpen ? accent : undefined }}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-7 h-7" strokeWidth={2} /> : <Menu className="w-7 h-7" strokeWidth={2} />}
            </button>

            {isMenuOpen && (
              <div
                ref={menuRef}
                className="absolute top-full left-0 w-[220px] md:w-[260px] shadow-2xl mt-2 ml-2 p-4 rounded-xl z-[100] border"
                style={{ backgroundColor: surface, borderColor: isDark ? 'rgba(255,255,255,0.08)' : '#E1DDD0' }}
              >
                {menuItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="block text-base md:text-lg font-bold tracking-tight py-1.5 px-2 cursor-pointer transition-colors duration-200"
                    style={{ color: item.highlight ? accent : fg }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = accent
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = item.highlight ? accent : fg
                    }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Signature */}
          <a
            href="#profile"
            className="text-3xl leading-none"
            style={{ color: fg, fontFamily: "'Brush Script MT', 'Lucida Handwriting', cursive" }}
          >
            G
          </a>

          {/* Theme Toggle (drives the whole site) */}
          <button
            type="button"
            onClick={onToggleTheme}
            className="relative w-16 h-8 rounded-full hover:opacity-80 transition-opacity flex items-center"
            style={{ backgroundColor: isDark ? 'hsl(0 0% 15%)' : 'hsl(0 0% 82%)' }}
            aria-label="Toggle light/dark theme"
          >
            <span className="absolute left-1.5 text-[hsl(0_0%_100%)]">
              <Moon className="w-3.5 h-3.5" style={{ opacity: isDark ? 0.9 : 0.3, color: '#fff' }} />
            </span>
            <span className="absolute right-1.5">
              <Sun className="w-3.5 h-3.5" style={{ opacity: isDark ? 0.3 : 0.9, color: '#111' }} />
            </span>
            <div
              className="absolute top-1 left-1 w-6 h-6 rounded-full transition-transform duration-300"
              style={{
                backgroundColor: isDark ? 'hsl(0 0% 100%)' : 'hsl(0 0% 10%)',
                transform: isDark ? 'translateX(2rem)' : 'translateX(0)',
              }}
            />
          </button>
        </nav>
      </header>

      {/* Hero — a real flow column so mobile stacks instead of stranding the
          wordmark in the middle of an empty screen. */}
      <main className="hero-stack relative min-h-screen flex flex-col items-center justify-center px-6 pt-28 pb-24 sm:pb-28">
        {/* Wordmark + portrait */}
        <div className="flex flex-col items-center sm:flex-row sm:items-end sm:justify-center">
          {/* Cut-out portrait — no card, no grey studio backdrop. Stacked above
              the wordmark on phones; from sm up it stands beside it and tucks
              behind the final letter, so the face and every letter stay clear. */}
          <img
            src="/profile-cutout-400.webp"
            srcSet="/profile-cutout-240.webp 240w, /profile-cutout-400.webp 400w, /profile-cutout-760.webp 760w"
            sizes="(max-width: 640px) 122px, (max-width: 768px) 196px, (max-width: 1024px) 264px, 318px"
            width="760"
            height="824"
            fetchPriority="high"
            decoding="async"
            alt="Portrait of Gatikrishna Dash"
            className="hero-portrait-img pointer-events-none select-none relative z-0 mb-4 h-[132px] w-auto sm:order-2 sm:mb-0 sm:-ml-10 md:-ml-12 lg:-ml-14 sm:h-[212px] md:h-[286px] lg:h-[344px]"
            style={{ filter: `drop-shadow(0 18px 40px ${isDark ? 'rgba(0,0,0,0.6)' : 'rgba(60,58,48,0.25)'})` }}
          />

          <div className="relative z-10 text-center sm:order-1">
            <BlurText text="GATI" instant animateBy="letters" className={nameClass} style={nameStyle} />
            <BlurText text="DASH" instant animateBy="letters" className={nameClass} style={nameStyle} />
          </div>
        </div>

        {/* Role + tagline */}
        <div className="mt-10 sm:mt-12 w-full max-w-2xl flex flex-col items-center gap-3 text-center">
          <span
            className="text-[11px] sm:text-[13px] font-semibold uppercase tracking-[0.15em]"
            style={{ color: isDark ? 'rgba(255,255,255,0.82)' : '#3A382E', fontFamily: "'Fraunces', Georgia, serif" }}
          >
            Lead Product Manager, AI &amp; Transformation
            <span className="mx-2 opacity-40">·</span>
            <span style={{ color: accent }}>PayPal</span>
          </span>
          <BlurText
            text="Agents that take actions you can't undo."
            delay={80}
            animateBy="words"
            direction="top"
            className="w-full flex-wrap justify-center text-[17px] sm:text-[19px] md:text-[21px] lg:text-[23px] leading-snug"
            style={{ color: isDark ? 'rgba(255,255,255,0.75)' : '#4A4840', fontFamily: "'Fraunces', Georgia, serif" }}
          />
        </div>

        {/* Above-the-fold CTAs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-3">
          <a
            href={`mailto:${EMAIL}`}
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-transform duration-150 hover:-translate-y-0.5"
            style={{
              backgroundColor: accent,
              color: isDark ? '#0A0A0A' : '#F7F6F1',
              fontFamily: "'Hanken Grotesk', system-ui, sans-serif",
            }}
          >
            Start a conversation <ArrowUpRight className="h-4 w-4" />
          </a>
          <a
            href={RESUME}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold border transition-colors"
            style={{
              borderColor: isDark ? 'rgba(255,255,255,0.22)' : 'rgba(0,0,0,0.18)',
              color: fg,
              fontFamily: "'Hanken Grotesk', system-ui, sans-serif",
            }}
          >
            <FileText className="h-4 w-4" /> Résumé
          </a>
          <a
            href="#artifacts"
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold border transition-colors"
            style={{
              borderColor: isDark ? 'rgba(255,255,255,0.22)' : 'rgba(0,0,0,0.18)',
              color: fg,
              fontFamily: "'Hanken Grotesk', system-ui, sans-serif",
            }}
          >
            Read the artifacts
          </a>
          <a
            href={LINKEDIN}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-2 py-3 text-sm font-medium transition-opacity hover:opacity-100"
            style={{ color: muted, opacity: 0.85, fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }}
          >
            <Linkedin className="h-4 w-4" /> LinkedIn
          </a>
        </div>

        <p
          className="mt-6 text-center text-[14px] sm:text-[15px] leading-relaxed max-w-2xl"
          style={{ color: isDark ? 'rgba(255,255,255,0.5)' : '#6B6859' }}
        >
          The first thing I found putting an agent next to a human process: the
          reviewers didn't agree with each other either. That number is the ceiling on
          anything you build on top of them. Five jurisdictions in production, and four
          artifacts below you can check line by line.
        </p>

        {/* Proof strip — the names carry more weight up here than they did
            as a standalone band below the fold. */}
        {workedWith.length > 0 && (
          <div className="hero-proof mt-12 sm:mt-14 w-full max-w-4xl">
            <p
              className="text-center text-[9px] tracking-[0.16em] sm:text-[11px] sm:tracking-[0.22em] uppercase mb-5"
              style={{ color: isDark ? 'rgba(255,255,255,0.34)' : '#9C9887', fontFamily: "'Fraunces', Georgia, serif" }}
            >
              Platforms &amp; institutions I&apos;ve built for
            </p>
            <div className="marquee marquee--hero">
              <div className="marquee-track">
                {[...workedWith, ...workedWith].map((name, i) => (
                  <span
                    key={i}
                    className="wordmark"
                    aria-hidden={i >= workedWith.length ? 'true' : undefined}
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Scroll indicator */}
        <a
          href="#work"
          className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 transition-opacity duration-300 hover:opacity-100"
          style={{ opacity: 0.45 }}
          aria-label="Scroll to content"
        >
          <ChevronDown className="w-6 h-6 md:w-8 md:h-8" style={{ color: fg }} />
        </a>
      </main>
    </section>
  )
}
