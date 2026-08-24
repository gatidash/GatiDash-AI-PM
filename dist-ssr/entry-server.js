import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { renderToString } from "react-dom/server";
import { ArrowUpRight, X, Menu, Moon, Sun, FileText, Linkedin, ChevronDown, ArrowLeft, ArrowRight, Mail, MapPin } from "lucide-react";
import { Analytics } from "@vercel/analytics/react";
import { track } from "@vercel/analytics";
import { motion, useReducedMotion } from "motion/react";
const HERO_METRICS = [
  { v: "60%", l: "Less manual intervention on high-volume workflows", proof: "Shipped" },
  { v: "5", l: "Jurisdictions running the agentic platform", proof: "Shipped" },
  { v: "60+", l: "Regulatory reports onboarded in three months", proof: "Shipped" },
  { v: "15+", l: "Years in data and product", proof: "Shipped" }
];
const HERO = {
  role: "AI Product & Transformation Leader · PayPal",
  available: "Currently open to AI product leadership roles",
  headA: "I lead AI and platform product work at PayPal.",
  headB: "The kind that has to clear an audit,",
  headC: "not just a demo.",
  sub: "AI product leadership for regulated, high-stakes systems — turning compliance, risk, and regulatory operations into governed, AI-native products. The controls most teams bolt on last, I design in first.",
  email: "gati4dash@gmail.com",
  linkedin: "https://www.linkedin.com/in/gati-dash",
  photo: "/profile-avatar.webp",
  metrics: HERO_METRICS
};
const EASE$1 = [0.2, 0.7, 0.2, 1];
function WordReveal({ text, className = "", delay = 0, accent = false }) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  return /* @__PURE__ */ jsx("span", { className, children: words.map((w, i) => /* @__PURE__ */ jsx("span", { className: "inline-block overflow-hidden align-bottom", children: /* @__PURE__ */ jsxs(
    motion.span,
    {
      className: `inline-block ${accent ? "hero-accent-text" : ""}`,
      initial: reduce ? false : { y: "115%" },
      animate: { y: 0 },
      transition: { duration: 0.7, delay: delay + i * 0.05, ease: EASE$1 },
      children: [
        w,
        " "
      ]
    }
  ) }, i)) });
}
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: EASE$1 }
});
function Ctas({ tone }) {
  const light = tone === "light";
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-x-7 gap-y-4", children: [
    /* @__PURE__ */ jsxs("a", { href: `mailto:${HERO.email}`, className: "btn-launch", children: [
      "Start a conversation ",
      /* @__PURE__ */ jsx("span", { className: "lr-arrow", children: "→" })
    ] }),
    /* @__PURE__ */ jsxs(
      "a",
      {
        href: HERO.linkedin,
        target: "_blank",
        rel: "noopener noreferrer",
        className: `inline-flex items-center gap-2 text-sm font-medium transition-colors ${light ? "text-ink hover:text-accent" : "text-white/70 hover:text-white"}`,
        children: [
          "Connect on LinkedIn ",
          /* @__PURE__ */ jsx(ArrowUpRight, { className: "h-4 w-4" })
        ]
      }
    )
  ] });
}
function HeroPortrait({ tone }) {
  const dark = tone === "dark";
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 0, scale: 0.96, y: 12 },
      animate: { opacity: 1, scale: 1, y: 0 },
      transition: { duration: 0.8, delay: 0.45, ease: EASE$1 },
      className: "relative mx-auto lg:mx-0 w-44 sm:w-52 lg:w-full lg:max-w-[300px]",
      children: [
        /* @__PURE__ */ jsx("span", { className: `hero-portrait-glow ${dark ? "is-dark" : "is-light"}`, "aria-hidden": "true" }),
        /* @__PURE__ */ jsx("div", { className: `hero-portrait ${dark ? "hero-portrait-dark" : "hero-portrait-light"}`, children: /* @__PURE__ */ jsx(
          "img",
          {
            src: HERO.photo,
            alt: "Portrait of Gatikrishna Dash",
            className: "h-full w-full object-cover",
            loading: "eager"
          }
        ) })
      ]
    }
  );
}
function HeroDark() {
  const reduce = useReducedMotion();
  return /* @__PURE__ */ jsxs("section", { id: "profile", className: "hero-dark relative overflow-hidden", children: [
    /* @__PURE__ */ jsxs("div", { className: "pointer-events-none absolute inset-0 -z-0", children: [
      /* @__PURE__ */ jsx(
        motion.div,
        {
          className: "hero-aurora hero-aurora-1",
          animate: reduce ? {} : { x: [0, 40, -20, 0], y: [0, -30, 20, 0] },
          transition: { duration: 22, repeat: Infinity, ease: "easeInOut" }
        }
      ),
      /* @__PURE__ */ jsx(
        motion.div,
        {
          className: "hero-aurora hero-aurora-2",
          animate: reduce ? {} : { x: [0, -50, 30, 0], y: [0, 25, -25, 0] },
          transition: { duration: 26, repeat: Infinity, ease: "easeInOut" }
        }
      ),
      /* @__PURE__ */ jsx(
        motion.div,
        {
          className: "hero-aurora hero-aurora-3",
          animate: reduce ? {} : { x: [0, 30, -35, 0], y: [0, -20, 30, 0] },
          transition: { duration: 30, repeat: Infinity, ease: "easeInOut" }
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "hero-grid-overlay absolute inset-0" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-12 pt-32 pb-24", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-[1.5fr_0.85fr] gap-10 lg:gap-14 items-center", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs(motion.p, { ...fade(0.05), className: "hero-pill mb-7", children: [
            /* @__PURE__ */ jsx("span", { className: "hero-pill-dot" }),
            " ",
            HERO.available
          ] }),
          /* @__PURE__ */ jsx("p", { className: "font-mono text-[11px] uppercase tracking-[0.16em] text-white/45 mb-6", children: HERO.role }),
          /* @__PURE__ */ jsxs("h1", { className: "font-serif font-medium text-white leading-[1.05] tracking-tight text-4xl sm:text-5xl lg:text-[62px]", children: [
            /* @__PURE__ */ jsx(WordReveal, { text: HERO.headA, delay: 0.15, className: "block" }),
            /* @__PURE__ */ jsx(WordReveal, { text: HERO.headB, delay: 0.5, className: "block" }),
            /* @__PURE__ */ jsx(WordReveal, { text: HERO.headC, delay: 0.85, className: "block", accent: true })
          ] }),
          /* @__PURE__ */ jsx(motion.p, { ...fade(1.05), className: "mt-7 text-lg text-white/60 leading-relaxed max-w-xl", children: HERO.sub }),
          /* @__PURE__ */ jsx(motion.div, { ...fade(1.2), className: "mt-9", children: /* @__PURE__ */ jsx(Ctas, { tone: "dark" }) })
        ] }),
        /* @__PURE__ */ jsx(HeroPortrait, { tone: "dark" })
      ] }),
      /* @__PURE__ */ jsx(
        motion.dl,
        {
          ...fade(1.35),
          className: "mt-14 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4",
          children: HERO.metrics.map((m) => /* @__PURE__ */ jsxs("div", { className: "hero-glass", children: [
            /* @__PURE__ */ jsx("dt", { className: "font-serif font-medium text-3xl sm:text-4xl text-white leading-none", children: m.v }),
            /* @__PURE__ */ jsx("dd", { className: "mt-3 font-mono text-[10px] uppercase tracking-[0.13em] text-white/45 leading-snug", children: m.l })
          ] }, m.l))
        }
      )
    ] })
  ] });
}
function HeroLight() {
  return /* @__PURE__ */ jsxs("section", { id: "profile", className: "relative overflow-hidden bg-paper pt-32 pb-20", children: [
    /* @__PURE__ */ jsx("div", { className: "hero-light-glow pointer-events-none absolute inset-0" }),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-12", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-[1.5fr_0.85fr] gap-10 lg:gap-14 items-center", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs(motion.p, { ...fade(0.05), className: "inline-flex items-center gap-2 text-sm text-accent mb-7", children: [
            /* @__PURE__ */ jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-accent" }),
            " ",
            HERO.available
          ] }),
          /* @__PURE__ */ jsx("p", { className: "eyebrow mb-6", children: HERO.role }),
          /* @__PURE__ */ jsxs("h1", { className: "font-serif font-medium text-ink leading-[1.03] tracking-tight text-5xl sm:text-6xl lg:text-[66px]", children: [
            /* @__PURE__ */ jsx(WordReveal, { text: HERO.headA, delay: 0.1, className: "block" }),
            /* @__PURE__ */ jsx(WordReveal, { text: HERO.headB, delay: 0.45, className: "block" }),
            /* @__PURE__ */ jsx(WordReveal, { text: HERO.headC, delay: 0.8, className: "block", accent: true })
          ] }),
          /* @__PURE__ */ jsx(motion.p, { ...fade(1), className: "mt-7 text-lg text-smoke leading-relaxed max-w-xl", children: HERO.sub }),
          /* @__PURE__ */ jsx(motion.div, { ...fade(1.15), className: "mt-9", children: /* @__PURE__ */ jsx(Ctas, { tone: "light" }) })
        ] }),
        /* @__PURE__ */ jsx(HeroPortrait, { tone: "light" })
      ] }),
      /* @__PURE__ */ jsx(motion.dl, { ...fade(1.3), className: "mt-14 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4", children: HERO.metrics.map((m, i) => /* @__PURE__ */ jsxs("div", { className: `hero-bento ${i === 0 ? "hero-bento-accent" : ""}`, children: [
        /* @__PURE__ */ jsx("dt", { className: "font-serif font-medium text-3xl sm:text-4xl leading-none", children: m.v }),
        /* @__PURE__ */ jsx("dd", { className: "mt-3 font-mono text-[10px] uppercase tracking-[0.13em] leading-snug opacity-70", children: m.l })
      ] }, m.l)) })
    ] })
  ] });
}
function HeroSwitcher({ variant }) {
  const forced = typeof window !== "undefined" && new URLSearchParams(window.location.search).get("dev") === "1";
  if (!forced) return null;
  return /* @__PURE__ */ jsxs("div", { className: "hero-switch", children: [
    /* @__PURE__ */ jsx("span", { className: "hero-switch-label", children: "Hero" }),
    /* @__PURE__ */ jsx("a", { href: "/", className: `hero-switch-btn ${variant === "dark" ? "on" : ""}`, children: "A · Dark" }),
    /* @__PURE__ */ jsx("a", { href: "/?v=light", className: `hero-switch-btn ${variant === "light" ? "on" : ""}`, children: "B · Light" }),
    /* @__PURE__ */ jsx("a", { href: "/?v=portfolio", className: `hero-switch-btn ${variant === "portfolio" ? "on" : ""}`, children: "C · 21st" })
  ] });
}
const nameColor = (dark) => dark ? "#C3E41D" : "#54632B";
const EMAIL = "gati4dash@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/gati-dash";
const RESUME = "/GatiDash_Resume.pdf";
const BlurText = ({ text, delay = 50, animateBy = "words", direction = "top", className = "", style, instant = false }) => {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const node = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.1 }
    );
    if (node) observer.observe(node);
    return () => {
      if (node) observer.unobserve(node);
    };
  }, []);
  const byWords = animateBy === "words";
  const segments = useMemo(() => byWords ? text.split(" ") : text.split(""), [text, byWords]);
  if (instant) {
    return /* @__PURE__ */ jsx("p", { className: `flex ${byWords ? "gap-x-[0.3em]" : ""} ${className}`, style, children: segments.map((segment, i) => /* @__PURE__ */ jsx("span", { style: { display: "inline-block", whiteSpace: "pre" }, children: segment }, i)) });
  }
  return /* @__PURE__ */ jsx("p", { ref, className: `flex ${byWords ? "gap-x-[0.3em]" : ""} ${className}`, style, children: segments.map((segment, i) => /* @__PURE__ */ jsx(
    "span",
    {
      style: {
        display: "inline-block",
        whiteSpace: "pre",
        filter: inView ? "blur(0px)" : "blur(10px)",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : `translateY(${direction === "top" ? "-20px" : "20px"})`,
        transition: `all 0.5s ease-out ${i * delay}ms`
      },
      children: segment
    },
    i
  )) });
};
function PortfolioHero({ theme = "dark", onToggleTheme = () => {
}, workedWith = [] }) {
  const isDark = theme === "dark";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && menuRef.current && buttonRef.current && !menuRef.current.contains(event.target) && !buttonRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const fg = isDark ? "hsl(0 0% 100%)" : "hsl(0 0% 10%)";
  const bg = isDark ? "#000000" : "#F2F0EA";
  const surface = isDark ? "#0C0C0E" : "#EAE7DD";
  const accent = nameColor(isDark);
  const muted = isDark ? "rgba(255,255,255,0.55)" : "#6B6859";
  const menuItems = [
    { label: "HOME", href: "#profile", highlight: true },
    { label: "THE ANGLE", href: "#angle" },
    { label: "CAREER", href: "#career" },
    { label: "WORK", href: "#work" },
    { label: "JUDGMENT", href: "#judgment" },
    { label: "CASE STUDIES", href: "#case-studies" },
    { label: "WRITING", href: "#blogs" },
    { label: "CONTACT", href: "#contact" }
  ];
  const nameClass = "hero-name font-bold text-[68px] sm:text-[120px] md:text-[164px] lg:text-[200px] leading-[0.78] tracking-tighter uppercase justify-center whitespace-nowrap";
  const nameStyle = { color: accent, fontFamily: "'Fira Code', monospace" };
  return /* @__PURE__ */ jsxs("section", { id: "profile", className: "relative min-h-screen transition-colors", style: { backgroundColor: bg, color: fg }, children: [
    /* @__PURE__ */ jsx(
      "header",
      {
        className: "fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300",
        style: {
          backgroundColor: scrolled ? isDark ? "rgba(0,0,0,0.72)" : "rgba(242,240,234,0.82)" : "transparent",
          backdropFilter: scrolled ? "blur(14px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(14px)" : "none",
          borderBottom: `1px solid ${scrolled ? isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.10)" : "transparent"}`
        },
        children: /* @__PURE__ */ jsxs("nav", { className: "flex items-center justify-between max-w-screen-2xl mx-auto", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                ref: buttonRef,
                type: "button",
                className: "p-2 transition-colors duration-300 z-50",
                style: { color: isMenuOpen ? accent : void 0 },
                "aria-label": isMenuOpen ? "Close menu" : "Open menu",
                onClick: () => setIsMenuOpen(!isMenuOpen),
                children: isMenuOpen ? /* @__PURE__ */ jsx(X, { className: "w-7 h-7", strokeWidth: 2 }) : /* @__PURE__ */ jsx(Menu, { className: "w-7 h-7", strokeWidth: 2 })
              }
            ),
            isMenuOpen && /* @__PURE__ */ jsx(
              "div",
              {
                ref: menuRef,
                className: "absolute top-full left-0 w-[220px] md:w-[260px] shadow-2xl mt-2 ml-2 p-4 rounded-xl z-[100] border",
                style: { backgroundColor: surface, borderColor: isDark ? "rgba(255,255,255,0.08)" : "#E1DDD0" },
                children: menuItems.map((item) => /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: item.href,
                    className: "block text-base md:text-lg font-bold tracking-tight py-1.5 px-2 cursor-pointer transition-colors duration-200",
                    style: { color: item.highlight ? accent : fg },
                    onMouseEnter: (e) => {
                      e.currentTarget.style.color = accent;
                    },
                    onMouseLeave: (e) => {
                      e.currentTarget.style.color = item.highlight ? accent : fg;
                    },
                    onClick: () => setIsMenuOpen(false),
                    children: item.label
                  },
                  item.label
                ))
              }
            )
          ] }),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "#profile",
              className: "text-3xl leading-none",
              style: { color: fg, fontFamily: "'Brush Script MT', 'Lucida Handwriting', cursive" },
              children: "G"
            }
          ),
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: onToggleTheme,
              className: "relative w-16 h-8 rounded-full hover:opacity-80 transition-opacity flex items-center",
              style: { backgroundColor: isDark ? "hsl(0 0% 15%)" : "hsl(0 0% 82%)" },
              "aria-label": "Toggle light/dark theme",
              children: [
                /* @__PURE__ */ jsx("span", { className: "absolute left-1.5 text-[hsl(0_0%_100%)]", children: /* @__PURE__ */ jsx(Moon, { className: "w-3.5 h-3.5", style: { opacity: isDark ? 0.9 : 0.3, color: "#fff" } }) }),
                /* @__PURE__ */ jsx("span", { className: "absolute right-1.5", children: /* @__PURE__ */ jsx(Sun, { className: "w-3.5 h-3.5", style: { opacity: isDark ? 0.3 : 0.9, color: "#111" } }) }),
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "absolute top-1 left-1 w-6 h-6 rounded-full transition-transform duration-300",
                    style: {
                      backgroundColor: isDark ? "hsl(0 0% 100%)" : "hsl(0 0% 10%)",
                      transform: isDark ? "translateX(2rem)" : "translateX(0)"
                    }
                  }
                )
              ]
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxs("main", { className: "hero-stack relative min-h-screen flex flex-col items-center justify-center px-6 pt-28 pb-24 sm:pb-28", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center sm:flex-row sm:items-end sm:justify-center", children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: "/profile-cutout-400.webp",
            srcSet: "/profile-cutout-240.webp 240w, /profile-cutout-400.webp 400w, /profile-cutout-760.webp 760w",
            sizes: "(max-width: 640px) 122px, (max-width: 768px) 196px, (max-width: 1024px) 264px, 318px",
            width: "760",
            height: "824",
            fetchPriority: "high",
            decoding: "async",
            alt: "Portrait of Gatikrishna Dash",
            className: "hero-portrait-img pointer-events-none select-none relative z-0 mb-4 h-[132px] w-auto sm:order-2 sm:mb-0 sm:-ml-10 md:-ml-12 lg:-ml-14 sm:h-[212px] md:h-[286px] lg:h-[344px]",
            style: { filter: `drop-shadow(0 18px 40px ${isDark ? "rgba(0,0,0,0.6)" : "rgba(60,58,48,0.25)"})` }
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "relative z-10 text-center sm:order-1", children: [
          /* @__PURE__ */ jsx(BlurText, { text: "GATI", instant: true, animateBy: "letters", className: nameClass, style: nameStyle }),
          /* @__PURE__ */ jsx(BlurText, { text: "DASH", instant: true, animateBy: "letters", className: nameClass, style: nameStyle })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-10 sm:mt-12 w-full max-w-2xl flex flex-col items-center gap-3 text-center", children: [
        /* @__PURE__ */ jsx(
          "span",
          {
            className: "text-[10px] sm:text-[11px] uppercase tracking-[0.22em]",
            style: { color: isDark ? "rgba(255,255,255,0.4)" : "#94917F", fontFamily: "'Fira Code', monospace" },
            children: "AI Product & Transformation Leader · PayPal"
          }
        ),
        /* @__PURE__ */ jsx(
          BlurText,
          {
            text: "Agents that take actions you can't undo.",
            delay: 80,
            animateBy: "words",
            direction: "top",
            className: "w-full flex-wrap justify-center text-[17px] sm:text-[19px] md:text-[21px] lg:text-[23px] leading-snug",
            style: { color: isDark ? "rgba(255,255,255,0.75)" : "#4A4840", fontFamily: "'Antic', sans-serif" }
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-3", children: [
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: `mailto:${EMAIL}`,
            className: "inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-transform duration-150 hover:-translate-y-0.5",
            style: {
              backgroundColor: accent,
              color: isDark ? "#0A0A0A" : "#F7F6F1",
              fontFamily: "'Space Grotesk', sans-serif"
            },
            children: [
              "Start a conversation ",
              /* @__PURE__ */ jsx(ArrowUpRight, { className: "h-4 w-4" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: RESUME,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold border transition-colors",
            style: {
              borderColor: isDark ? "rgba(255,255,255,0.22)" : "rgba(0,0,0,0.18)",
              color: fg,
              fontFamily: "'Space Grotesk', sans-serif"
            },
            children: [
              /* @__PURE__ */ jsx(FileText, { className: "h-4 w-4" }),
              " Résumé"
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "#artifacts",
            className: "inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold border transition-colors",
            style: {
              borderColor: isDark ? "rgba(255,255,255,0.22)" : "rgba(0,0,0,0.18)",
              color: fg,
              fontFamily: "'Space Grotesk', sans-serif"
            },
            children: "Read the artifacts"
          }
        ),
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: LINKEDIN,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "inline-flex items-center gap-2 px-2 py-3 text-sm font-medium transition-opacity hover:opacity-100",
            style: { color: muted, opacity: 0.85, fontFamily: "'Space Grotesk', sans-serif" },
            children: [
              /* @__PURE__ */ jsx(Linkedin, { className: "h-4 w-4" }),
              " LinkedIn"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        "p",
        {
          className: "mt-6 text-center text-[14px] sm:text-[15px] leading-relaxed max-w-2xl",
          style: { color: isDark ? "rgba(255,255,255,0.5)" : "#6B6859" },
          children: "Refunds, pricing, merges to main — anything with a blast radius. I've shipped it where the blast radius is a regulator: five jurisdictions in production, and four artifacts below you can check line by line."
        }
      ),
      workedWith.length > 0 && /* @__PURE__ */ jsxs("div", { className: "hero-proof mt-12 sm:mt-14 w-full max-w-4xl", children: [
        /* @__PURE__ */ jsx(
          "p",
          {
            className: "text-center text-[9px] tracking-[0.16em] sm:text-[11px] sm:tracking-[0.22em] uppercase mb-5",
            style: { color: isDark ? "rgba(255,255,255,0.34)" : "#9C9887", fontFamily: "'Fira Code', monospace" },
            children: "Platforms & institutions I've built for"
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "marquee marquee--hero", children: /* @__PURE__ */ jsx("div", { className: "marquee-track", children: [...workedWith, ...workedWith].map((name, i) => /* @__PURE__ */ jsx(
          "span",
          {
            className: "wordmark",
            "aria-hidden": i >= workedWith.length ? "true" : void 0,
            children: name
          },
          i
        )) }) })
      ] }),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "#angle",
          className: "absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 transition-opacity duration-300 hover:opacity-100",
          style: { opacity: 0.45 },
          "aria-label": "Scroll to content",
          children: /* @__PURE__ */ jsx(ChevronDown, { className: "w-6 h-6 md:w-8 md:h-8", style: { color: fg } })
        }
      )
    ] })
  ] });
}
const EASE = [0.2, 0.7, 0.2, 1];
function Carousel({ slides, ariaLabel = "carousel", slideLabels, index, onIndex }) {
  const [internal, setInternal] = useState(0);
  const n = slides.length;
  const i = index != null ? index : internal;
  const setI = (updater) => {
    const next = typeof updater === "function" ? updater(i) : updater;
    if (onIndex) onIndex(next);
    else setInternal(next);
  };
  const go = (d) => setI((p) => (p + d + n) % n);
  const slideRefs = useRef([]);
  const [height, setHeight] = useState(null);
  const measure = useCallback(() => {
    const el = slideRefs.current[i];
    if (el) setHeight(el.offsetHeight);
  }, [i]);
  useEffect(() => {
    measure();
    const el = slideRefs.current[i];
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [i, measure]);
  useEffect(() => {
    if (typeof document === "undefined" || !document.fonts) return;
    document.fonts.ready.then(measure).catch(() => {
    });
  }, [measure]);
  return /* @__PURE__ */ jsxs("div", { "aria-roledescription": "carousel", "aria-label": ariaLabel, children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-4 border-t border-sand pt-5", children: [
      /* @__PURE__ */ jsx("span", { className: "eyebrow truncate", children: slideLabels ? slideLabels[i] : "" }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 flex-shrink-0", children: [
        /* @__PURE__ */ jsxs("span", { className: "font-mono text-sm text-dust tabular-nums", children: [
          String(i + 1).padStart(2, "0"),
          " / ",
          String(n).padStart(2, "0")
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => go(-1),
            "aria-label": "Previous",
            className: "h-9 w-9 rounded-full border border-sand flex items-center justify-center text-ink hover:border-accent hover:text-accent transition-colors",
            children: /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" })
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => go(1),
            "aria-label": "Next",
            className: "h-9 w-9 rounded-full border border-sand flex items-center justify-center text-ink hover:border-accent hover:text-accent transition-colors",
            children: /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      motion.div,
      {
        className: "overflow-hidden mt-6",
        animate: { height: height ?? "auto" },
        initial: false,
        transition: { duration: 0.4, ease: EASE },
        children: /* @__PURE__ */ jsx(
          motion.div,
          {
            className: "flex items-start touch-pan-y",
            animate: { x: `-${i * 100}%` },
            transition: { duration: 0.5, ease: EASE },
            drag: "x",
            dragConstraints: { left: 0, right: 0 },
            dragElastic: 0.12,
            onDragEnd: (_, info) => {
              if (info.offset.x < -60) go(1);
              else if (info.offset.x > 60) go(-1);
            },
            children: slides.map((slide, idx) => /* @__PURE__ */ jsx("div", { className: "w-full flex-shrink-0", "aria-hidden": i !== idx, children: /* @__PURE__ */ jsx("div", { className: "px-0.5", ref: (el) => slideRefs.current[idx] = el, children: slide }) }, idx))
          }
        )
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "mt-8 flex items-center gap-2", children: slides.map((_, idx) => /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => setI(idx),
        "aria-label": `Go to slide ${idx + 1}`,
        className: `h-1.5 rounded-full transition-all ${i === idx ? "w-7 bg-accent" : "w-1.5 bg-sand hover:bg-dust"}`
      },
      idx
    )) })
  ] });
}
const prefersReducedMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const cardsOf = (el) => Array.from(el.querySelectorAll(":scope > [data-card]"));
function CardCarousel({
  items,
  renderItem,
  ariaLabel = "carousel",
  // Tailwind width classes for one card at each breakpoint — controls the peek.
  cardClass = "w-[85%] sm:w-[58%] lg:w-[46%]",
  itemKey = (_, i) => i,
  onReady
}) {
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [overflowing, setOverflowing] = useState(false);
  const [gutter, setGutter] = useState(0);
  const n = items.length;
  const measure = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const cards = cardsOf(el);
    if (!cards.length) return;
    const last = cards[cards.length - 1];
    const content = last.offsetLeft + last.offsetWidth - cards[0].offsetLeft;
    const overflows = content > el.clientWidth + 2;
    setOverflowing(overflows);
    setGutter(overflows ? Math.max(0, Math.round(el.clientWidth - last.offsetWidth)) : 0);
  }, []);
  const sync = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const cards = cardsOf(el);
    if (!cards.length) return;
    let best = 0;
    let bestDist = Infinity;
    cards.forEach((c, i) => {
      const d = Math.abs(c.offsetLeft - cards[0].offsetLeft - el.scrollLeft);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    });
    setActive(best);
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft >= el.scrollWidth - el.clientWidth - 2);
  }, []);
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(sync);
    };
    const onResize = () => {
      measure();
      sync();
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(onResize) : null;
    ro == null ? void 0 : ro.observe(el);
    onResize();
    return () => {
      cancelAnimationFrame(frame);
      ro == null ? void 0 : ro.disconnect();
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [sync, measure]);
  useEffect(() => {
    if (typeof document === "undefined" || !document.fonts) return;
    document.fonts.ready.then(() => {
      measure();
      sync();
    }).catch(() => {
    });
  }, [measure, sync]);
  const scrollToIndex = useCallback((i) => {
    const el = trackRef.current;
    if (!el) return;
    const cards = cardsOf(el);
    const target = cards[Math.max(0, Math.min(i, cards.length - 1))];
    if (!target) return;
    el.scrollTo({
      left: target.offsetLeft - cards[0].offsetLeft,
      behavior: prefersReducedMotion() ? "auto" : "smooth"
    });
  }, []);
  const go = (d) => scrollToIndex(active + d);
  useEffect(() => {
    onReady == null ? void 0 : onReady({ scrollToIndex });
  }, [onReady, scrollToIndex]);
  const drag = useRef(null);
  const onPointerDown = (e) => {
    if (e.pointerType === "touch") return;
    const el = trackRef.current;
    if (!el) return;
    drag.current = {
      startX: e.clientX,
      startScroll: el.scrollLeft,
      lastX: e.clientX,
      lastT: e.timeStamp,
      v: 0,
      moved: false,
      captured: false
    };
  };
  const onPointerMove = (e) => {
    var _a;
    const d = drag.current;
    const el = trackRef.current;
    if (!d || !el) return;
    const dx = e.clientX - d.startX;
    if (!d.moved && Math.abs(dx) > 4) {
      d.moved = true;
      d.captured = true;
      el.style.scrollSnapType = "none";
      (_a = el.setPointerCapture) == null ? void 0 : _a.call(el, e.pointerId);
    }
    if (!d.moved) return;
    el.scrollLeft = d.startScroll - dx;
    const dt = e.timeStamp - d.lastT;
    if (dt > 0) d.v = (e.clientX - d.lastX) / dt;
    d.lastX = e.clientX;
    d.lastT = e.timeStamp;
  };
  const endDrag = (e) => {
    var _a;
    const d = drag.current;
    const el = trackRef.current;
    if (!d || !el) {
      drag.current = null;
      return;
    }
    if (d.captured) {
      (_a = el.releasePointerCapture) == null ? void 0 : _a.call(el, e.pointerId);
      el.style.scrollSnapType = "";
    }
    if (!d.moved) {
      drag.current = null;
      return;
    }
    const cards = cardsOf(el);
    let nearest = 0;
    let bestDist = Infinity;
    cards.forEach((c, i) => {
      const dist = Math.abs(c.offsetLeft - cards[0].offsetLeft - el.scrollLeft);
      if (dist < bestDist) {
        bestDist = dist;
        nearest = i;
      }
    });
    const flick = Math.abs(d.v) > 0.45 ? d.v < 0 ? 1 : -1 : 0;
    scrollToIndex(nearest + flick);
    setTimeout(() => {
      drag.current = null;
    }, 0);
  };
  const onClickCapture = (e) => {
    var _a;
    if ((_a = drag.current) == null ? void 0 : _a.moved) {
      e.preventDefault();
      e.stopPropagation();
    }
    drag.current = null;
  };
  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    }
  };
  const showControls = n > 1 && overflowing;
  const display = atEnd ? n - 1 : active;
  return /* @__PURE__ */ jsxs("div", { "aria-roledescription": "carousel", "aria-label": ariaLabel, children: [
    showControls && /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-4 border-t border-sand pt-5", children: [
      /* @__PURE__ */ jsxs("span", { className: "font-mono text-sm text-dust tabular-nums", children: [
        String(display + 1).padStart(2, "0"),
        " / ",
        String(n).padStart(2, "0")
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => go(-1),
            "aria-label": "Previous",
            disabled: atStart,
            className: "h-9 w-9 rounded-full border border-sand flex items-center justify-center text-ink hover:border-accent hover:text-accent transition-colors disabled:opacity-30 disabled:hover:border-sand disabled:hover:text-ink",
            children: /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" })
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => go(1),
            "aria-label": "Next",
            disabled: atEnd,
            className: "h-9 w-9 rounded-full border border-sand flex items-center justify-center text-ink hover:border-accent hover:text-accent transition-colors disabled:opacity-30 disabled:hover:border-sand disabled:hover:text-ink",
            children: /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        ref: trackRef,
        role: "group",
        tabIndex: 0,
        onKeyDown,
        onPointerDown,
        onPointerMove,
        onPointerUp: endDrag,
        onPointerCancel: endDrag,
        onClickCapture,
        className: `card-track ${showControls ? "mt-6" : ""} flex gap-5 sm:gap-6 overflow-x-auto overscroll-x-contain snap-x snap-mandatory pb-2`,
        children: [
          items.map((item, i) => /* @__PURE__ */ jsx(
            "div",
            {
              "data-card": "",
              className: `snap-start shrink-0 ${n === 1 ? "w-full" : cardClass}`,
              children: renderItem(item, i, i === active)
            },
            itemKey(item, i)
          )),
          gutter > 0 && /* @__PURE__ */ jsx("div", { "aria-hidden": "true", className: "shrink-0", style: { width: gutter } })
        ]
      }
    ),
    showControls && /* @__PURE__ */ jsx("div", { className: "mt-6 flex items-center gap-2", children: items.map((item, i) => /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => scrollToIndex(i),
        "aria-label": `Go to card ${i + 1}`,
        className: `h-1.5 rounded-full transition-all duration-300 ${i === display ? "w-7 bg-accent" : "w-1.5 bg-sand hover:bg-dust"}`
      },
      itemKey(item, i)
    )) })
  ] });
}
const NAV = [
  { id: "work", label: "Work" },
  { id: "judgment", label: "Judgment" },
  { id: "case-studies", label: "Case Studies" },
  { id: "blogs", label: "Writing" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" }
];
const WORK = [
  {
    n: "01",
    title: "Two market entries that were blocked on compliance data",
    meta: "Market entry · CRR · Crypto & SAR reporting · GDPR · 2018–2021",
    kicker: "2018–2021 · Market entry",
    context: "PayPal wanted to sell crypto to US customers and to process payments inside China. Neither was a product problem. Both were blocked on regulatory reporting that did not exist yet, and on financial-crime data nobody fully trusted. I had just moved into a product role inside the data-engineering org, and this was the job.",
    move: "I stood the platform up end to end — across identity, payments, privacy, credit and crypto — and fixed the upstream data gaps before anything landed in it. On top of it I built products. Customer Risk Rating was the flagship: PayPal had been scoring users reactively, after an AML event. CRR scores every user at onboarding and continuously after, then auto-triggers the diligence that score demands. I led it with the Data Science and ML team. Alongside it came the crypto transfer reporting infrastructure the US launch needed, the SAR pipeline China required, and the privacy platform that carried GDPR across our international markets.",
    proves: "Compliance data is the cheapest way into a market you cannot otherwise enter. PayPal opened crypto to US customers in October 2020 under the first conditional BitLicense New York regulators ever granted, and became the first foreign company licensed to run a payments platform in China. I did not negotiate those licences. I built the reporting they were conditioned on.",
    marketNote: "Public record: PayPal announced US crypto buy/hold/sell on 21 October 2020; NYDFS granted its first conditional BitLicense that same month; PayPal was the first foreign firm to hold a Chinese online-payment licence, later the first with full ownership of the platform.",
    metrics: [
      { v: "24 hrs", l: "To risk-score every new user at onboarding", proof: "Shipped" },
      { v: "100+", l: "Data privacy rules monitored and tracked", proof: "Shipped" },
      { v: "Oct 2020", l: "US crypto launched on the reporting this platform produced", proof: "Shipped" },
      { v: "3", l: "Regulatory regimes the same platform carried — US, China, EU", proof: "Shipped" }
    ]
  },
  {
    n: "02",
    title: "One regulatory-reporting platform, not one tool per regulator",
    meta: "Platform consolidation · 2022–2023",
    kicker: "2022–2023 · Consolidation",
    context: "We were building a separate tool for every regulator. The team spent more time maintaining than shipping, and post-Brexit mandates were about to make that worse.",
    move: "I made the case for a single platform with one report-onboarding lifecycle. The engineering was the easy half. The hard half was sitting with Legal and compliance in each jurisdiction — sometimes with the regulators themselves — and turning each ask into a requirement the whole platform could carry. One regulator’s rule has to coexist with the next without either breaking. Templates and triggering rules are configurable, so the next mandate is a config change.",
    proves: "The platform is now where the AI plugs in — validation, narrative generation, agent-assisted review — instead of needing one integration per legacy tool. I built the thing my later work depends on.",
    metrics: [
      { v: "60+", l: "Regulatory reports onboarded across three markets", proof: "Shipped" },
      { v: "3 months", l: "To onboard all of them, enterprise-wide", proof: "Shipped" },
      { v: "60%+", l: "Operational efficiency gain", proof: "Shipped" },
      { v: "80%", l: "Reduction in reporting turnaround time", proof: "Shipped" }
    ]
  },
  {
    n: "03",
    title: "Agentic AI in live compliance operations",
    meta: "Agentic AI · Human-in-the-loop · 5 jurisdictions · 2023–present",
    kicker: "2023–present · Agentic AI",
    context: "Compliance review queues were running behind across five jurisdictions. The business wanted headcount. The regulator wanted speed. The team was stuck between the two.",
    move: "I brought an agentic layer onto the platform we had already unified rather than adding people. LLM agents handle structured extraction and first-pass policy mapping. Every call is schema-validated before it reaches a queue. Anything policy-sensitive routes to a human with the agent’s reasoning attached. I designed the override path and the validator before the first agent shipped. It ran in shadow mode until we trusted it, and only then did any decision get acted on.",
    proves: "The agents were the easy part. What made it survive was deciding, up front, which calls the system is never allowed to make. I submitted a patent application on the agentic design.",
    metrics: [
      { v: "60%", l: "Reduction in manual intervention", proof: "Shipped" },
      { v: "50%", l: "Faster processing turnaround, high-volume workflows", proof: "Shipped" },
      { v: "5", l: "Jurisdictions running it", proof: "Shipped" },
      { v: "Patent", l: "Application filed on the agentic design — an application, not a grant", proof: "Shipped" }
    ]
  }
];
const JUDGMENT = [
  {
    n: "01",
    title: "When to let an agent decide, and when not to",
    tension: "Agent throughput vs. accountability on policy-sensitive calls.",
    judgment: "Automate the deterministic steps. Anything policy-sensitive escalates. I build that path as a product surface, before the agents ship.",
    why: "It kept agent speed high without quietly handing accountability to the model."
  },
  {
    n: "02",
    title: "Structured output is non-negotiable",
    tension: "LLM flexibility vs. inspectability.",
    judgment: "Every agent call emits a JSON-schema-valid object. Validation runs before the result touches downstream code. Retries are bounded.",
    why: "It is the difference between a prototype the team can demo and a system the regulator can inspect."
  },
  {
    n: "03",
    title: "Build the platform before the third feature",
    tension: "Every AI feature wants its own scaffolding. Nobody wants to fund the scaffolding.",
    judgment: "I build the shared layer on the second feature, not the fifth. Evals, validation, the human override path, lineage — once, in the primitives, so the next team inherits them instead of rebuilding them badly.",
    why: "The agentic layer I shipped only worked because a unified reporting platform already existed underneath it. Pointed at the mess that came before, the same agents would have produced a good demo and nothing an auditor would accept."
  },
  {
    n: "04",
    title: "Sequence around what can be governed",
    tension: "Business urgency to ship AI vs. jurisdiction-specific compliance work.",
    judgment: "Roll AI out in markets where the governance work is already done, not in the markets where it would be the hardest to retrofit.",
    why: "It avoids the post-launch retrofits that quietly consume the AI engineering budget for years."
  }
];
const CAPABILITIES = [
  {
    group: "AI strategy",
    blurb: "Deciding what gets built, bought, or killed — and getting the roadmap to survive contact with production.",
    items: [
      "AI roadmap and prioritization",
      "Build vs. buy vs. partner decisions",
      "Pilot-to-production transition",
      "Vendor selection (model + tooling)"
    ]
  },
  {
    group: "Execution",
    blurb: "Multi-step agentic systems with validation, evals, and a human override path treated as part of the product.",
    items: [
      "Agentic system design",
      "Eval design and benchmarking",
      "Schema-bound output / validation",
      "Platform vs. feature trade-off calls"
    ]
  },
  {
    group: "Governance & risk",
    blurb: "The lineage, controls, and traceability that decide whether an AI feature still exists in month six.",
    items: [
      "AI risk frameworks (in-house and external)",
      "Regulator-facing design choices",
      "Human-in-the-loop UX",
      "Data lineage and traceability"
    ]
  },
  {
    group: "Adoption & enablement",
    blurb: "Getting an organisation to actually use what gets built — the half of a transformation that no platform solves for you.",
    items: [
      "CFO-sponsored AI transformation programme",
      "200+ colleagues trained",
      "Enablement inside a regulated environment",
      "Teaching that continues outside work, informally"
    ]
  },
  {
    group: "Influence without authority",
    blurb: "I have never had a reporting line into the people whose agreement I needed. Every decision below was won on argument and evidence.",
    items: [
      "Aligning risk, legal and compliance across regulated entities",
      "Regulator-facing work — interpreting an ask, then defending the design",
      "Go/No-Go input on launches through the Business Advisory Group",
      "Carrying one jurisdiction’s mandate without breaking the next"
    ]
  }
];
const CAREER_ARC = [
  {
    era: "01",
    theme: "Data & BI",
    years: "2009–2018",
    title: "Pipelines, then platforms",
    body: "ETL and Teradata work at Wipro, then Barclays’ global banking data at Cognizant, then six years as a BI analyst inside PayPal — data visualisation, product planning, and the scanning and regulatory datasets from the Xoom and Venmo acquisitions.",
    tools: ["Teradata", "Informatica", "Tableau", "SQL"],
    companies: ["Wipro", "Cognizant", "Altimetrik", "PayPal"],
    instinct: "Where I learned to distrust any roadmap that skips the data layer."
  },
  {
    era: "02",
    theme: "Product Manager",
    years: "2018–2023",
    title: "Compliance & regulatory platforms",
    body: "My first product role, in 2018, inside the data-engineering org. Customer risk rating, AML and SAR reporting, GDPR privacy, crypto transfer reporting — and the market entries those unlocked. Then the consolidation of it all into one regulatory-reporting platform.",
    tools: ["AML", "SAR", "GDPR", "KYC"],
    companies: ["PayPal"],
    instinct: "Where data work turned into platform product work.",
    workIndex: 0
  },
  {
    era: "03",
    theme: "Lead Product Manager",
    years: "2023–present",
    title: "AI & agentic systems",
    body: "Leading AI product work at PayPal — turning the compliance workflows I used to platform-ify into governed, agent-driven systems. Alongside it, a CFO-sponsored transformation programme: 200+ colleagues taught to use AI inside a regulated environment.",
    tools: ["LLM agents", "Evals", "Governance", "Enablement"],
    companies: ["PayPal"],
    instinct: "Where the earlier layers became the reason the AI ships.",
    workIndex: 2
  }
];
const GOVERNANCE_TOOLKIT = [
  {
    group: "Execution controls",
    items: [
      { title: "Structured outputs", body: "JSON-schema-bound generation so agents emit machine-verifiable artifacts." },
      { title: "Validation pipelines", body: "Schema, semantic, and policy gates before any downstream action." },
      { title: "Retry & backoff logic", body: "Bounded retries for transient failures and degraded model output." },
      { title: "Fail-safe handling", body: "Graceful degradation paths that fail safe under load or anomaly, rather than failing silently." }
    ]
  },
  {
    group: "Audit & trust",
    items: [
      { title: "End-to-end traceability", body: "Every decision is reproducible from input through model output to the final artifact." },
      { title: "Decision rationale capture", body: "Agent reasoning preserved so reviewers and regulators can follow the logic." },
      { title: "Audit-ready artifacts", body: "Outputs built to be inspected later, by someone who was not in the room." },
      { title: "Explainability surfaces", body: "Per-decision context exposed where review, dispute, or escalation happen." }
    ]
  },
  {
    group: "Operational safety",
    items: [
      { title: "Human-in-the-loop thresholds", body: "Escalation criteria defined per workflow and built into the agent loop, not bolted on once the queue starts overflowing." },
      { title: "Circuit breakers", body: "Automated stop conditions when agent behavior drifts from operating intent." },
      { title: "Reversibility", body: "Agent actions designed to be undone or compensated where consequences require it." },
      { title: "Shadow mode and evaluations", body: "Run the agent alongside production for weeks before any decision is acted on. Online evals tied to the operating metric that triggered the project." }
    ]
  }
];
const POV_IDEAS = [
  "Reliability and traceability earn enterprise trust. Benchmarks do not.",
  "In regulated work, governance belongs in the product spec. Bolt it on at the launch gate and you will rebuild.",
  "Human review is a designed surface. If you discover it after launch as a queue, you designed it wrong.",
  "LLM systems need schema validation, retries and failure paths from the first call. Most teams add them after the first incident instead.",
  "The most valuable AI products improve operating discipline. Productivity gains follow."
];
const BLOGS = [
  {
    title: "From Parrot to Colleague",
    excerpt: "A true story of every AI buzzword — and how each public, expensive, occasionally absurd failure became the blueprint for the next win.",
    href: "/from-parrot-to-colleague.html",
    slug: "from-parrot-to-colleague",
    topic: "Essay · AI",
    read: "11 min read",
    date: "Aug 2026",
    cover: "/blog-parrot-to-colleague.svg"
  }
];
const CASE_STUDIES = [
  {
    n: "01",
    title: "Agentic AI in live compliance operations",
    kicker: "2023–present · PayPal · Shipped",
    excerpt: "The one that actually runs. An agentic layer on top of the regulatory platform I had already consolidated: schema-validated extraction, first-pass policy mapping, and a human gate on every call that carries policy consequence. Five jurisdictions, in production.",
    href: "/agentic-compliance-case-study.html",
    tags: [
      { t: "60% less manual intervention", proof: "Shipped" },
      { t: "5 jurisdictions", proof: "Shipped" }
    ],
    kind: "Shipped"
  },
  {
    n: "02",
    title: "Meridian — Agentic Regulatory-Change Intelligence",
    kicker: "Agentic · RegTech · Concept",
    excerpt: "An agent that watches every regulator you answer to, maps each change to the specific internal controls it breaks, and hands a compliance officer a defensible package to sign. Never a chatbot that answers questions about the law.",
    href: "/meridian-case-study.html",
    tags: [
      { t: "AUSTRAC / MAS / CSSF", proof: "Concept" },
      { t: "~150 alerts a day", proof: "Concept" },
      { t: "Never built", proof: "Concept" }
    ],
    kind: "Concept"
  },
  {
    n: "03",
    title: "Retention, Rebuilt: Generative → Agentic",
    kicker: "2024 → 2026 · Retention · Concept",
    excerpt: "The 2024 version generated a playbook from a merchant's signals. The 2026 rebuild runs the loop — an accountable retention agent with tiered autonomy, always-on guardrails, and a human gate on every action that touches money.",
    href: "/merchant-retention-case-study.html",
    tags: [
      { t: "−60% churn", proof: "Modeled" },
      { t: "+25–40% LTV", proof: "Modeled" },
      { t: "3 autonomy tiers", proof: "Concept" }
    ],
    kind: "Concept"
  }
];
const ARTIFACTS = [
  {
    slug: "validated-agent-call",
    title: "The Validated Agent Call",
    stack: "JSON Schema · Python",
    body: "The schema a regulatory-impact call has to satisfy, the repair loop when it doesn’t, and abstention treated as a real answer."
  },
  {
    slug: "eval-rubric",
    title: "An Eval Rubric That Can Say No",
    stack: "Rubric · Scorer",
    body: "Eight dimensions, four of them blocking. Includes a worked scorecard that fails and stops the ship."
  },
  {
    slug: "escalation-matrix",
    title: "The Escalation Matrix",
    stack: "Policy · Router",
    body: "Who decides what, by when, and what the system does when nobody answers. It fails closed."
  },
  {
    slug: "shadow-mode-readout",
    title: "The Shadow Mode Readout",
    stack: "Template · Metrics",
    body: "What I measure before an agent is allowed to touch anything — including the disagreement taxonomy that matters more than the agreement rate."
  }
];
const LINKS = {
  email: "gati4dash@gmail.com",
  linkedin: "https://www.linkedin.com/in/gati-dash",
  // file lives in /public
  photo: "/profile-avatar.webp",
  location: "Hyderabad, India"
};
const PROOF_STYLE = {
  Shipped: "text-accent border-accent/45",
  Modeled: "text-plasma border-plasma/45",
  Concept: "text-dust border-sand"
};
function Proof({ level, className = "" }) {
  if (!level) return null;
  return /* @__PURE__ */ jsx(
    "span",
    {
      title: PROOF_TITLE[level],
      className: `inline-block align-middle rounded-full border px-1.5 py-px font-mono text-[9px] uppercase tracking-[0.11em] leading-[1.5] whitespace-nowrap ${PROOF_STYLE[level] || PROOF_STYLE.Concept} ${className}`,
      children: level
    }
  );
}
const PROOF_TITLE = {
  Shipped: "Measured in production.",
  Modeled: "A projection built on real data. Nobody measured this one.",
  Concept: "Illustrative. This system was never built."
};
function Container({ children, className = "" }) {
  return /* @__PURE__ */ jsx("div", { className: `mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-12 ${className}`, children });
}
function SectionLabel({ n, children }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
    /* @__PURE__ */ jsx("span", { className: "font-serif text-base text-accent", children: n }),
    /* @__PURE__ */ jsx("span", { className: "h-px w-8 bg-ink/20" }),
    /* @__PURE__ */ jsx("span", { className: "eyebrow", children })
  ] });
}
function NavBar({ heroVariant = "dark" }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const onDark = heroVariant === "dark" && !scrolled;
  return /* @__PURE__ */ jsx(
    "header",
    {
      className: `fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${scrolled ? "bg-paper/85 backdrop-blur-md border-b border-sand/60" : "bg-transparent border-b border-transparent"}`,
      children: /* @__PURE__ */ jsxs(Container, { className: "h-16 flex items-center justify-between", children: [
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "#profile",
            className: `font-serif text-lg tracking-editorial transition-colors ${onDark ? "text-white hover:text-white/80" : "text-ink hover:text-accent"}`,
            children: "Gatikrishna Dash"
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-5 sm:gap-7", children: [
          /* @__PURE__ */ jsx("nav", { className: "hidden md:flex items-center gap-7", children: NAV.map((n) => /* @__PURE__ */ jsx(
            "a",
            {
              href: n.href || `#${n.id}`,
              className: `text-sm transition-colors ${onDark ? "text-white/70 hover:text-white" : "text-smoke hover:text-ink"}`,
              children: n.label
            },
            n.id
          )) }),
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: "/case-studies.html",
              onClick: () => track("open_case_studies", { from: "nav" }),
              className: "btn-launch !text-sm !py-2 !px-4",
              children: [
                "Case Studies",
                /* @__PURE__ */ jsx(ArrowUpRight, { className: "h-4 w-4 lr-arrow" })
              ]
            }
          )
        ] })
      ] })
    }
  );
}
function WorkCard({ w, onOpen }) {
  return /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => onOpen(w.n), className: "pcard w-full p-7 sm:p-8 group", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-baseline gap-4", children: [
      /* @__PURE__ */ jsx("span", { className: "font-serif text-3xl sm:text-4xl text-accent leading-none", children: w.n }),
      /* @__PURE__ */ jsx("span", { className: "eyebrow truncate", children: w.kicker })
    ] }),
    /* @__PURE__ */ jsx("h3", { className: "display-serif text-xl sm:text-2xl text-ink leading-[1.2] mt-5 group-hover:text-accent transition-colors", children: w.title }),
    /* @__PURE__ */ jsx("p", { className: "mt-4 text-[15px] text-smoke leading-relaxed line-clamp-4", children: w.context }),
    /* @__PURE__ */ jsx("dl", { className: "mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-sand pt-5", children: w.metrics.slice(0, 2).map((m) => /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("dt", { className: "font-serif text-xl text-ink leading-none", children: [
        m.v,
        " ",
        /* @__PURE__ */ jsx(Proof, { level: m.proof, className: "ml-1" })
      ] }),
      /* @__PURE__ */ jsx("dd", { className: "mt-1.5 text-xs text-smoke leading-snug line-clamp-2", children: m.l })
    ] }, m.l)) }),
    /* @__PURE__ */ jsxs("span", { className: "mt-auto pt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent group-hover:gap-3 transition-all", children: [
      "Read the case ",
      /* @__PURE__ */ jsx(ArrowUpRight, { className: "h-4 w-4" })
    ] })
  ] });
}
function WorkReader({ n, onClose }) {
  const w = WORK.find((x) => x.n === n);
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    window.scrollTo(0, 0);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);
  if (!w) return null;
  return /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-[100] bg-paper overflow-y-auto", children: [
    /* @__PURE__ */ jsx("div", { className: "sticky top-0 z-10 bg-paper/90 backdrop-blur-md border-b border-sand", children: /* @__PURE__ */ jsxs(Container, { className: "h-14 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: onClose,
          className: "inline-flex items-center gap-2 text-sm text-ink hover:text-accent transition-colors",
          children: [
            /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }),
            " Back to portfolio"
          ]
        }
      ),
      /* @__PURE__ */ jsx("span", { className: "font-serif text-sm text-ink tracking-editorial", children: "Selected work" })
    ] }) }),
    /* @__PURE__ */ jsxs(Container, { className: "py-12 sm:py-16", children: [
      /* @__PURE__ */ jsx("div", { className: "eyebrow", children: w.meta }),
      /* @__PURE__ */ jsx("h1", { className: "display-serif text-3xl sm:text-4xl lg:text-5xl leading-[1.1] mt-4 max-w-4xl", children: w.title }),
      /* @__PURE__ */ jsxs("div", { className: "mt-10 grid lg:grid-cols-12 gap-y-10 gap-x-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "lg:col-span-8 space-y-6 max-w-prose-wide", children: [
          /* @__PURE__ */ jsx(Paragraph, { label: "Context", body: w.context }),
          /* @__PURE__ */ jsx(Paragraph, { label: "What I did", body: w.move }),
          /* @__PURE__ */ jsx(Paragraph, { label: "What I would tell the next team", body: w.proves, accent: true })
        ] }),
        /* @__PURE__ */ jsxs("aside", { className: "lg:col-span-4 lg:pl-8 lg:border-l border-sand", children: [
          /* @__PURE__ */ jsx("div", { className: "eyebrow mb-6", children: "Operating impact" }),
          /* @__PURE__ */ jsx("dl", { className: "divide-y divide-sand", children: w.metrics.map((m) => /* @__PURE__ */ jsxs("div", { className: "py-4 first:pt-0", children: [
            /* @__PURE__ */ jsxs("dt", { className: "font-serif text-2xl sm:text-3xl text-ink leading-none", children: [
              m.v,
              " ",
              /* @__PURE__ */ jsx(Proof, { level: m.proof, className: "ml-1.5" })
            ] }),
            /* @__PURE__ */ jsx("dd", { className: "mt-1.5 text-sm text-smoke leading-snug", children: m.l })
          ] }, m.l)) })
        ] })
      ] })
    ] })
  ] });
}
function SelectedWork({ i, onOpen }) {
  const api = useRef(null);
  useEffect(() => {
    var _a;
    (_a = api.current) == null ? void 0 : _a.scrollToIndex(i);
  }, [i]);
  return /* @__PURE__ */ jsx("section", { id: "work", className: "py-14 sm:py-20 border-t border-sand", children: /* @__PURE__ */ jsxs(Container, { children: [
    /* @__PURE__ */ jsx(SectionLabel, { n: "01", children: "Work" }),
    /* @__PURE__ */ jsx("h2", { className: "display-serif mt-4 text-3xl sm:text-4xl max-w-3xl leading-[1.1]", children: "Three pieces of work that explain how I think." }),
    /* @__PURE__ */ jsx("p", { className: "mt-3 text-base text-smoke max-w-2xl leading-relaxed", children: "AI that clears an audit, not just a demo — that is the hardest version of the problem, and it is the one I have shipped. Anonymized where it has to be. Each case names what shipped, what it took, and what I would tell the next team." }),
    /* @__PURE__ */ jsx("div", { className: "mt-8", children: /* @__PURE__ */ jsx(
      CardCarousel,
      {
        ariaLabel: "Selected work",
        items: WORK,
        itemKey: (w) => w.n,
        onReady: (a) => api.current = a,
        renderItem: (w) => /* @__PURE__ */ jsx(WorkCard, { w, onOpen })
      }
    ) })
  ] }) });
}
function Paragraph({ label, body, accent = false }) {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("div", { className: `eyebrow mb-2 ${accent ? "text-accent" : ""}`, children: label }),
    /* @__PURE__ */ jsx("p", { className: `text-sm sm:text-base leading-relaxed ${accent ? "text-ink font-medium font-serif" : "text-ink-soft"}`, children: body })
  ] });
}
function DetailedCapabilities() {
  const [open, setOpen] = useState(false);
  return /* @__PURE__ */ jsx("section", { id: "detail", className: "border-t border-sand py-12 sm:py-16", children: /* @__PURE__ */ jsxs(Container, { children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        onClick: () => setOpen((v) => !v),
        "aria-expanded": open,
        className: "group flex w-full items-center justify-between gap-6 text-left",
        children: [
          /* @__PURE__ */ jsxs("span", { children: [
            /* @__PURE__ */ jsx("span", { className: "eyebrow", children: "Reference" }),
            /* @__PURE__ */ jsx("span", { className: "mt-2 block display-serif text-xl sm:text-2xl text-ink group-hover:text-accent transition-colors", children: "Detailed capabilities" })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "flex-shrink-0 h-9 w-9 rounded-full border border-sand flex items-center justify-center text-ink group-hover:border-accent group-hover:text-accent transition-colors", children: /* @__PURE__ */ jsx(ChevronDown, { className: `h-4 w-4 transition-transform duration-300 ${open ? "rotate-180" : ""}` }) })
        ]
      }
    ),
    !open && /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm text-smoke max-w-2xl leading-relaxed", children: "The full list — five capability areas and the governance controls I argue for. Open it if you want the detail; the work above is the argument." }),
    open && /* @__PURE__ */ jsxs("div", { className: "mt-10 space-y-14", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "eyebrow mb-6", children: "What I do" }),
        /* @__PURE__ */ jsx("div", { className: "grid gap-x-12 gap-y-9 md:grid-cols-2", children: CAPABILITIES.map((c) => /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "display-serif text-lg text-ink leading-snug", children: c.group }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-smoke leading-relaxed max-w-prose-tight", children: c.blurb }),
          /* @__PURE__ */ jsx("ul", { className: "mt-4 space-y-2", children: c.items.map((item) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3 text-sm text-ink-soft leading-snug", children: [
            /* @__PURE__ */ jsx("span", { className: "mt-1.5 h-1 w-1 rounded-full bg-accent flex-shrink-0" }),
            item
          ] }, item)) })
        ] }, c.group)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "eyebrow mb-6", children: "Controls I argue for" }),
        /* @__PURE__ */ jsx("div", { className: "grid gap-x-12 gap-y-9 md:grid-cols-2", children: GOVERNANCE_TOOLKIT.map((t) => /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "display-serif text-lg text-ink leading-snug", children: t.group }),
          /* @__PURE__ */ jsx("dl", { className: "mt-4 space-y-3", children: t.items.map((item) => /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("dt", { className: "font-serif text-[15px] text-ink tracking-editorial", children: item.title }),
            /* @__PURE__ */ jsx("dd", { className: "mt-1 text-sm text-ink-soft leading-relaxed", children: item.body })
          ] }, item.title)) })
        ] }, t.group)) }),
        /* @__PURE__ */ jsx("ol", { className: "mt-10 grid sm:grid-cols-2 gap-x-12 gap-y-4", children: POV_IDEAS.map((idea, k) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-4", children: [
          /* @__PURE__ */ jsx("span", { className: "font-serif text-sm text-accent mt-0.5 w-6 flex-shrink-0", children: String(k + 1).padStart(2, "0") }),
          /* @__PURE__ */ jsx("span", { className: "text-sm text-ink-soft leading-relaxed", children: idea })
        ] }, k)) })
      ] })
    ] })
  ] }) });
}
function JudgmentSlide({ j }) {
  return /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-y-7 gap-x-16", children: [
    /* @__PURE__ */ jsxs("div", { className: "lg:col-span-4", children: [
      /* @__PURE__ */ jsx("span", { className: "font-serif text-4xl sm:text-5xl text-accent leading-none", children: j.n }),
      /* @__PURE__ */ jsx("h3", { className: "font-serif text-2xl sm:text-3xl text-ink tracking-editorial mt-6 leading-snug", children: j.title })
    ] }),
    /* @__PURE__ */ jsxs("dl", { className: "lg:col-span-8 space-y-4 text-base leading-relaxed self-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid sm:grid-cols-[8rem_1fr] gap-x-6 gap-y-1", children: [
        /* @__PURE__ */ jsx("dt", { className: "eyebrow pt-1", children: "Tension" }),
        /* @__PURE__ */ jsx("dd", { className: "text-ink-soft", children: j.tension })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid sm:grid-cols-[8rem_1fr] gap-x-6 gap-y-1", children: [
        /* @__PURE__ */ jsx("dt", { className: "eyebrow pt-1", children: "Call I make" }),
        /* @__PURE__ */ jsx("dd", { className: "text-ink", children: j.judgment })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid sm:grid-cols-[8rem_1fr] gap-x-6 gap-y-1", children: [
        /* @__PURE__ */ jsx("dt", { className: "eyebrow pt-1", children: "Why" }),
        /* @__PURE__ */ jsx("dd", { className: "text-smoke italic", children: j.why })
      ] })
    ] })
  ] });
}
function Judgment() {
  return /* @__PURE__ */ jsx("section", { id: "judgment", className: "py-16 sm:py-24 border-t border-sand", children: /* @__PURE__ */ jsxs(Container, { children: [
    /* @__PURE__ */ jsx(SectionLabel, { n: "03", children: "Judgment" }),
    /* @__PURE__ */ jsx("h2", { className: "display-serif mt-6 text-3xl sm:text-4xl lg:text-5xl max-w-3xl leading-[1.1]", children: "Calls I keep making." }),
    /* @__PURE__ */ jsx("p", { className: "mt-5 text-lg text-smoke max-w-2xl leading-relaxed", children: "The most important AI product decisions in regulated work are rarely about model choice. They are about where to standardize, where to keep humans, and what to refuse to ship." }),
    /* @__PURE__ */ jsx("div", { className: "mt-12", children: /* @__PURE__ */ jsx(
      Carousel,
      {
        ariaLabel: "Judgment calls",
        slideLabels: JUDGMENT.map((j) => j.title),
        slides: JUDGMENT.map((j) => /* @__PURE__ */ jsx(JudgmentSlide, { j }, j.n))
      }
    ) })
  ] }) });
}
const AVAILABLE_LOGOS = /* @__PURE__ */ new Set(["paypal"]);
function CompanyLogo({ name }) {
  const [failed, setFailed] = useState(false);
  const slug = name.toLowerCase().replace(/\s+/g, "-");
  if (failed || !AVAILABLE_LOGOS.has(slug)) {
    return /* @__PURE__ */ jsx("span", { className: "career-co-text", children: name });
  }
  return /* @__PURE__ */ jsx(
    "img",
    {
      src: `/logos/${slug}.svg`,
      alt: name,
      title: name,
      onError: () => setFailed(true),
      className: "career-logo"
    }
  );
}
function About({ onSelectWork }) {
  return /* @__PURE__ */ jsx("section", { id: "about", className: "py-16 sm:py-24 border-t border-sand", children: /* @__PURE__ */ jsxs(Container, { children: [
    /* @__PURE__ */ jsx(SectionLabel, { n: "06", children: "About" }),
    /* @__PURE__ */ jsx("h2", { className: "display-serif mt-6 text-3xl sm:text-4xl lg:text-5xl max-w-4xl leading-[1.08]", children: "I don't come at product from the feature side. I come from the launch side." }),
    /* @__PURE__ */ jsxs("div", { className: "mt-8 grid lg:grid-cols-12 gap-8 lg:gap-16", children: [
      /* @__PURE__ */ jsx("p", { className: "lg:col-span-7 text-lg text-ink-soft leading-relaxed max-w-prose-wide", children: "For two years I sat on PayPal's Business Advisory Group, shaping go/no-go calls on new launches. Before that and ever since, I've been building the layer those calls depend on — one source of truth for product, customer and transaction data that audit and compliance can actually use." }),
      /* @__PURE__ */ jsx("p", { className: "lg:col-span-5 text-base text-ink-soft leading-relaxed", children: "Get AML or crypto disclosure wrong in global payments and it's a regulatory event, not a bug ticket. Regulators like Australia's AUSTRAC have fined major banks hundreds of millions for exactly these gaps." })
    ] }),
    /* @__PURE__ */ jsx("p", { className: "mt-9 display-serif text-xl sm:text-2xl text-ink max-w-prose-wide leading-snug", children: "That's why I can tell which AI products survive contact with a regulator." }),
    /* @__PURE__ */ jsxs("div", { className: "mt-12 border-t border-sand pt-10", children: [
      /* @__PURE__ */ jsx("div", { className: "eyebrow mb-5", children: "What I actually learned doing it" }),
      /* @__PURE__ */ jsx("p", { className: "display-serif text-2xl sm:text-3xl text-ink max-w-prose-wide leading-[1.25]", children: "Put an agent next to a human process and the first thing you find is that the humans never agreed with each other either." }),
      /* @__PURE__ */ jsx("p", { className: "mt-6 text-lg text-ink-soft leading-relaxed max-w-prose-wide", children: "Shadow mode was supposed to tell me how good the agent was. It told me something more useful. Reviewers had been resolving the same ambiguous obligations different ways for years, and nobody had noticed, because nothing had ever put their answers side by side. Some of the best output from that phase was written guidance for people rather than changes to the model." }),
      /* @__PURE__ */ jsx("p", { className: "mt-5 text-lg text-ink-soft leading-relaxed max-w-prose-wide", children: "It changed how I start. I now measure how much the humans agree before I build anything, because that number is the ceiling on what any agent can score. It is why reviewer agreement is a blocking gate in my eval rubric, and why I think AI in regulated work pays first by measuring the process it was hired to replace." })
    ] }),
    /* @__PURE__ */ jsx(CareerArc, { onSelectWork })
  ] }) });
}
function CareerArc({ onSelectWork }) {
  return /* @__PURE__ */ jsxs("div", { id: "career", className: "mt-16 sm:mt-20 border-t border-sand pt-12", children: [
    /* @__PURE__ */ jsx("div", { className: "eyebrow mb-4", children: "How I got here" }),
    /* @__PURE__ */ jsx("p", { className: "text-base text-smoke max-w-2xl leading-relaxed", children: "Data engineering, then regulatory platforms, then AI. Each one is the reason the next one worked." }),
    /* @__PURE__ */ jsx("div", { className: "mt-8 grid md:grid-cols-3 gap-5", children: CAREER_ARC.map((e, i) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: "career-card card-lift relative flex flex-col h-full rounded-xl border border-sand border-t-2 border-t-accent bg-paper p-5 pt-6",
        style: { animationDelay: `${i * 130}ms` },
        children: [
          /* @__PURE__ */ jsx("span", { className: "career-node" }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-baseline gap-3", children: [
            /* @__PURE__ */ jsx("span", { className: "font-serif text-base text-accent", children: e.era }),
            /* @__PURE__ */ jsx("span", { className: "eyebrow text-dust", children: e.years })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "eyebrow text-accent mt-2.5 flex items-center gap-1.5", children: [
            i > 0 && /* @__PURE__ */ jsx("span", { className: "text-dust", children: "→" }),
            e.theme
          ] }),
          /* @__PURE__ */ jsx("h3", { className: "font-serif text-xl text-ink tracking-editorial leading-snug mt-1 min-h-[2.8rem]", children: e.title }),
          /* @__PURE__ */ jsx("p", { className: "mt-1.5 text-sm text-ink-soft leading-relaxed", children: e.body }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
            /* @__PURE__ */ jsx("div", { className: "eyebrow text-dust mb-2", children: "Tools" }),
            /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: e.tools.map((c) => /* @__PURE__ */ jsx("span", { className: "career-chip", children: c }, c)) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-3", children: [
            /* @__PURE__ */ jsx("div", { className: "eyebrow text-dust mb-2", children: "Worked with" }),
            /* @__PURE__ */ jsx("div", { className: "flex flex-wrap items-center gap-x-4 gap-y-2", children: e.companies.map((c) => /* @__PURE__ */ jsx(CompanyLogo, { name: c }, c)) })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "mt-auto pt-4 border-t border-sand text-sm text-smoke italic leading-relaxed", children: [
            /* @__PURE__ */ jsx("span", { className: "not-italic text-accent font-serif mr-1.5", children: "↳" }),
            e.instinct
          ] }),
          e.workIndex != null && /* @__PURE__ */ jsxs(
            "a",
            {
              href: "#work",
              onClick: () => onSelectWork(e.workIndex),
              className: "mt-3 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide-caps text-accent hover:gap-2.5 transition-all",
              children: [
                "See the work from this era",
                /* @__PURE__ */ jsx(ArrowUpRight, { className: "h-3 w-3" })
              ]
            }
          )
        ]
      },
      e.era
    )) })
  ] });
}
function BlogReader({ slug, onClose }) {
  const [post, setPost] = useState(null);
  useEffect(() => {
    let live = true;
    import("./assets/blogPosts-mn6R-OxW.js").then((m) => {
      if (live) setPost(m.POSTS[slug] || null);
    });
    return () => {
      live = false;
    };
  }, [slug]);
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    window.scrollTo(0, 0);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);
  return /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-[100] bg-paper overflow-y-auto", children: [
    /* @__PURE__ */ jsx("div", { className: "sticky top-0 z-10 bg-paper/90 backdrop-blur-md border-b border-sand", children: /* @__PURE__ */ jsxs(Container, { className: "h-14 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: onClose,
          className: "inline-flex items-center gap-2 text-sm text-ink hover:text-accent transition-colors",
          children: [
            /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }),
            " Back to portfolio"
          ]
        }
      ),
      /* @__PURE__ */ jsx("span", { className: "font-serif text-sm text-ink tracking-editorial", children: "Gatikrishna Dash" })
    ] }) }),
    post ? /* @__PURE__ */ jsx("div", { className: "blog-reader pb-24", dangerouslySetInnerHTML: { __html: post.html } }) : /* @__PURE__ */ jsx(Container, { className: "py-24", children: /* @__PURE__ */ jsx("p", { className: "eyebrow", children: "Loading the essay…" }) })
  ] });
}
function CaseStudyCard({ c }) {
  return /* @__PURE__ */ jsxs(
    "a",
    {
      href: c.href,
      onClick: () => track("open_case_study", { href: c.href }),
      className: "pcard p-7 sm:p-8 group",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-4", children: [
          /* @__PURE__ */ jsx("span", { className: "eyebrow truncate", children: c.kicker }),
          /* @__PURE__ */ jsx("span", { className: "text-[10px] font-semibold uppercase tracking-wide-caps text-accent border border-accent/40 rounded-full px-2.5 py-1 flex-shrink-0", children: c.kind })
        ] }),
        /* @__PURE__ */ jsx("h3", { className: "display-serif text-xl sm:text-2xl text-ink leading-[1.2] mt-5 group-hover:text-accent transition-colors", children: c.title }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 text-[15px] text-smoke leading-relaxed", children: c.excerpt }),
        /* @__PURE__ */ jsx("ul", { className: "mt-6 flex flex-wrap gap-2", children: c.tags.map((tag) => /* @__PURE__ */ jsxs(
          "li",
          {
            className: "inline-flex items-center gap-2 rounded-full border border-sand px-3 py-1 font-mono text-[11px] text-ink-soft",
            children: [
              tag.t,
              /* @__PURE__ */ jsx(Proof, { level: tag.proof })
            ]
          },
          tag.t
        )) }),
        /* @__PURE__ */ jsxs("span", { className: "mt-auto pt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent group-hover:gap-3 transition-all", children: [
          "Explore case ",
          /* @__PURE__ */ jsx(ArrowUpRight, { className: "h-4 w-4" })
        ] })
      ]
    }
  );
}
function CaseStudies() {
  return /* @__PURE__ */ jsx("section", { id: "case-studies", className: "py-16 sm:py-24 border-t border-sand", children: /* @__PURE__ */ jsxs(Container, { children: [
    /* @__PURE__ */ jsx(SectionLabel, { n: "04", children: "Case studies" }),
    /* @__PURE__ */ jsx("h2", { className: "display-serif mt-6 text-3xl sm:text-4xl lg:text-5xl max-w-3xl leading-[1.1]", children: "Interactive deep-dives." }),
    /* @__PURE__ */ jsx("p", { className: "mt-5 text-lg text-smoke max-w-2xl leading-relaxed", children: "How I frame a problem, scope it for governance, and design AI that has to clear an audit. Each one opens end to end." }),
    /* @__PURE__ */ jsx("div", { className: "mt-10", children: /* @__PURE__ */ jsx(
      CardCarousel,
      {
        ariaLabel: "Case studies",
        items: CASE_STUDIES,
        itemKey: (c) => c.href,
        cardClass: "w-[86%] sm:w-[64%] lg:w-[52%]",
        renderItem: (c) => /* @__PURE__ */ jsx(CaseStudyCard, { c })
      }
    ) }),
    /* @__PURE__ */ jsxs(
      "a",
      {
        href: "/case-studies.html",
        className: "mt-10 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:gap-3 transition-all",
        children: [
          "All case studies ",
          /* @__PURE__ */ jsx(ArrowUpRight, { className: "h-4 w-4" })
        ]
      }
    )
  ] }) });
}
function FeatureBlogCard({ b, onOpen }) {
  return /* @__PURE__ */ jsxs(
    "button",
    {
      type: "button",
      onClick: () => {
        track("open_blog", { slug: b.slug });
        onOpen(b.slug);
      },
      className: "pcard w-full grid lg:grid-cols-[1.05fr_1fr] group",
      children: [
        /* @__PURE__ */ jsx("div", { className: "pcard-media aspect-[16/10] lg:aspect-auto", children: /* @__PURE__ */ jsx("img", { src: b.cover, alt: "", loading: "lazy" }) }),
        /* @__PURE__ */ jsxs("div", { className: "p-7 sm:p-10 lg:p-12 flex flex-col justify-center", children: [
          /* @__PURE__ */ jsx("span", { className: "text-[11px] font-semibold uppercase tracking-wide-caps text-accent", children: b.topic }),
          /* @__PURE__ */ jsx("h3", { className: "display-serif text-2xl sm:text-3xl lg:text-[38px] text-ink leading-[1.08] mt-3 group-hover:text-accent transition-colors", children: b.title }),
          /* @__PURE__ */ jsx("p", { className: "mt-4 text-base sm:text-lg text-smoke leading-relaxed", children: b.excerpt }),
          /* @__PURE__ */ jsxs("div", { className: "mt-6 flex items-center gap-2.5 text-sm text-dust", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: LINKS.photo,
                alt: "",
                width: "24",
                height: "24",
                loading: "lazy",
                decoding: "async",
                className: "h-6 w-6 rounded-full object-cover border border-sand"
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "text-ink-soft", children: "Gatikrishna Dash" }),
            /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: "·" }),
            /* @__PURE__ */ jsx("span", { children: b.date }),
            /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: "·" }),
            /* @__PURE__ */ jsx("span", { children: b.read })
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "mt-7 inline-flex items-center gap-2 text-sm font-semibold text-accent group-hover:gap-3 transition-all", children: [
            "Read essay ",
            /* @__PURE__ */ jsx(ArrowUpRight, { className: "h-4 w-4" })
          ] })
        ] })
      ]
    }
  );
}
function BlogCard({ b, onOpen }) {
  return /* @__PURE__ */ jsxs(
    "button",
    {
      type: "button",
      onClick: () => {
        track("open_blog", { slug: b.slug });
        onOpen(b.slug);
      },
      className: "pcard w-full group",
      children: [
        /* @__PURE__ */ jsx("div", { className: "pcard-media", children: /* @__PURE__ */ jsx("img", { src: b.cover, alt: "", loading: "lazy" }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-col p-7 sm:p-8", children: [
          /* @__PURE__ */ jsx("span", { className: "text-[11px] font-semibold uppercase tracking-wide-caps text-accent", children: b.topic }),
          /* @__PURE__ */ jsx("h3", { className: "display-serif text-xl sm:text-2xl text-ink leading-[1.18] mt-3 group-hover:text-accent transition-colors", children: b.title }),
          /* @__PURE__ */ jsx("p", { className: "mt-4 text-[15px] text-smoke leading-relaxed", children: b.excerpt }),
          /* @__PURE__ */ jsxs("div", { className: "mt-6 flex items-center gap-2.5 text-sm text-dust", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: LINKS.photo,
                alt: "",
                width: "24",
                height: "24",
                loading: "lazy",
                decoding: "async",
                className: "h-6 w-6 rounded-full object-cover border border-sand"
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "text-ink-soft", children: "Gatikrishna Dash" }),
            /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: "·" }),
            /* @__PURE__ */ jsx("span", { children: b.date }),
            /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: "·" }),
            /* @__PURE__ */ jsx("span", { children: b.read })
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "mt-auto pt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent group-hover:gap-3 transition-all", children: [
            "Read essay ",
            /* @__PURE__ */ jsx(ArrowUpRight, { className: "h-4 w-4" })
          ] })
        ] })
      ]
    }
  );
}
function Artifacts() {
  return /* @__PURE__ */ jsx("section", { id: "artifacts", className: "py-16 sm:py-24 border-t border-sand", children: /* @__PURE__ */ jsxs(Container, { children: [
    /* @__PURE__ */ jsx(SectionLabel, { n: "02", children: "Artifacts" }),
    /* @__PURE__ */ jsx("h2", { className: "display-serif mt-6 text-3xl sm:text-4xl lg:text-5xl max-w-3xl leading-[1.1]", children: "The actual objects." }),
    /* @__PURE__ */ jsx("p", { className: "mt-5 text-lg text-smoke max-w-2xl leading-relaxed", children: "Anyone can say they design governed agents. These are four of the artifacts that work produces — the schema, the rubric, the routing matrix, the pre-launch readout. Read them and decide for yourself." }),
    /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm text-dust max-w-2xl leading-relaxed", children: "Reference implementations, written against my own concept systems — Meridian and the retention agent. I can’t publish my employer’s code, so I wrote these from scratch to show the reasoning." }),
    /* @__PURE__ */ jsx("ul", { className: "mt-10 grid gap-px bg-sand border border-sand sm:grid-cols-2", children: ARTIFACTS.map((a, i) => /* @__PURE__ */ jsx("li", { className: "bg-paper", children: /* @__PURE__ */ jsxs("a", { href: `/artifact-${a.slug}.html`, className: "group flex h-full flex-col p-7 sm:p-8 transition-colors hover:bg-paper-dark", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-baseline justify-between gap-4", children: [
        /* @__PURE__ */ jsx("span", { className: "font-serif text-sm text-accent", children: String(i + 1).padStart(2, "0") }),
        /* @__PURE__ */ jsx("span", { className: "font-mono text-[10px] uppercase tracking-wide-caps text-dust", children: a.stack })
      ] }),
      /* @__PURE__ */ jsx("h3", { className: "display-serif text-xl text-ink leading-snug mt-4 group-hover:text-accent transition-colors", children: a.title }),
      /* @__PURE__ */ jsx("p", { className: "mt-3 text-[15px] text-smoke leading-relaxed", children: a.body }),
      /* @__PURE__ */ jsxs("span", { className: "mt-auto pt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent group-hover:gap-3 transition-all", children: [
        "Read it ",
        /* @__PURE__ */ jsx(ArrowUpRight, { className: "h-4 w-4" })
      ] })
    ] }) }, a.slug)) })
  ] }) });
}
function Blogs({ onOpen }) {
  return /* @__PURE__ */ jsx("section", { id: "blogs", className: "py-16 sm:py-24 border-t border-sand", children: /* @__PURE__ */ jsxs(Container, { children: [
    /* @__PURE__ */ jsx(SectionLabel, { n: "05", children: "Writing" }),
    /* @__PURE__ */ jsx("h2", { className: "display-serif mt-6 text-3xl sm:text-4xl lg:text-5xl max-w-3xl leading-[1.1]", children: "Field notes on AI." }),
    /* @__PURE__ */ jsx("p", { className: "mt-5 text-lg text-smoke max-w-2xl leading-relaxed", children: "Essays on where AI product work is actually heading — written for the people who have to ship it under governance." }),
    /* @__PURE__ */ jsx("div", { className: "mt-10", children: BLOGS.length > 1 ? /* @__PURE__ */ jsx(
      CardCarousel,
      {
        ariaLabel: "Essays",
        items: BLOGS,
        itemKey: (b) => b.slug,
        cardClass: "w-[85%] sm:w-[58%] lg:w-[42%]",
        renderItem: (b) => /* @__PURE__ */ jsx(BlogCard, { b, onOpen })
      }
    ) : (
      // One essay so far — a lone 42%-wide card in a 1160px row reads as a
      // mistake, so a single post gets the wide split card. The carousel
      // takes over automatically at two.
      /* @__PURE__ */ jsx(FeatureBlogCard, { b: BLOGS[0], onOpen })
    ) })
  ] }) });
}
function Contact() {
  return /* @__PURE__ */ jsx("section", { id: "contact", className: "py-16 sm:py-24 border-t border-sand", children: /* @__PURE__ */ jsxs(Container, { children: [
    /* @__PURE__ */ jsx(SectionLabel, { n: "07", children: "Contact" }),
    /* @__PURE__ */ jsxs("div", { className: "mt-10 grid lg:grid-cols-12 gap-12 lg:gap-20", children: [
      /* @__PURE__ */ jsxs("div", { className: "lg:col-span-7", children: [
        /* @__PURE__ */ jsxs("p", { className: "inline-flex items-center gap-2 text-sm text-accent mb-5", children: [
          /* @__PURE__ */ jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-accent" }),
          "Currently open to AI product leadership roles"
        ] }),
        /* @__PURE__ */ jsx("h2", { className: "display-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.05]", children: "Let's talk." }),
        /* @__PURE__ */ jsx("p", { className: "mt-8 text-lg sm:text-xl text-ink leading-relaxed max-w-prose-tight font-serif", children: "If you're looking to drive an AI transformation — especially where it has to clear an audit, not just a demo — I'm happy to discuss." }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 text-base sm:text-lg text-ink-soft leading-relaxed max-w-prose-tight", children: "The work generalises past compliance. If you are letting an agent take actions that are expensive to undo — refunds, pricing, merges to main, anything with a blast radius — the problems are the same ones. Those are my favourite conversations." }),
        /* @__PURE__ */ jsx("div", { className: "mt-8 flex flex-wrap items-center gap-x-8 gap-y-4", children: /* @__PURE__ */ jsx("a", { href: `mailto:${LINKS.email}`, className: "btn-quiet font-medium", children: "Start a conversation" }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "lg:col-span-5", children: /* @__PURE__ */ jsxs("dl", { className: "divide-y divide-sand", children: [
        /* @__PURE__ */ jsx(
          ContactRow,
          {
            icon: Mail,
            label: "Email",
            value: LINKS.email,
            href: `mailto:${LINKS.email}`
          }
        ),
        /* @__PURE__ */ jsx(
          ContactRow,
          {
            icon: Linkedin,
            label: "LinkedIn",
            value: "linkedin.com/in/gati-dash",
            href: LINKS.linkedin,
            external: true
          }
        ),
        /* @__PURE__ */ jsx(
          ContactRow,
          {
            icon: MapPin,
            label: "Location",
            value: LINKS.location
          }
        )
      ] }) })
    ] })
  ] }) });
}
function ContactRow({ icon: Icon, label, value, href, external, download }) {
  const content = /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2.5", children: [
      /* @__PURE__ */ jsx(Icon, { className: "h-3.5 w-3.5 text-dust" }),
      /* @__PURE__ */ jsx("span", { className: "eyebrow", children: label })
    ] }),
    /* @__PURE__ */ jsxs("span", { className: "font-serif text-xl sm:text-2xl text-ink mt-1 inline-flex items-center gap-2", children: [
      value,
      href && /* @__PURE__ */ jsx(ArrowUpRight, { className: "h-4 w-4 text-dust group-hover:text-accent transition-colors" })
    ] })
  ] });
  if (!href) {
    return /* @__PURE__ */ jsx("div", { className: "py-5 flex flex-col first:pt-0", children: content });
  }
  return /* @__PURE__ */ jsx(
    "a",
    {
      href,
      target: external ? "_blank" : void 0,
      rel: external ? "noopener noreferrer" : void 0,
      download: download ? "" : void 0,
      className: "py-5 flex flex-col first:pt-0 group hover:text-accent transition-colors",
      children: content
    }
  );
}
function Footer() {
  return /* @__PURE__ */ jsx("footer", { className: "border-t border-sand py-12", children: /* @__PURE__ */ jsxs(Container, { children: [
    /* @__PURE__ */ jsxs("div", { className: "border-b border-sand pb-8 mb-8", children: [
      /* @__PURE__ */ jsx("div", { className: "eyebrow mb-4", children: "How to read the numbers" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-smoke max-w-2xl leading-relaxed", children: "Every figure on this site carries one of three labels, and the label travels with the number wherever it appears." }),
      /* @__PURE__ */ jsxs("dl", { className: "mt-5 grid gap-x-10 gap-y-4 sm:grid-cols-3 max-w-3xl", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("dt", { children: /* @__PURE__ */ jsx(Proof, { level: "Shipped" }) }),
          /* @__PURE__ */ jsx("dd", { className: "mt-2 text-sm text-ink-soft leading-relaxed", children: "Measured in production, on a system real people used." })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("dt", { children: /* @__PURE__ */ jsx(Proof, { level: "Modeled" }) }),
          /* @__PURE__ */ jsx("dd", { className: "mt-2 text-sm text-ink-soft leading-relaxed", children: "A projection built on real data. Nobody measured this one." })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("dt", { children: /* @__PURE__ */ jsx(Proof, { level: "Concept" }) }),
          /* @__PURE__ */ jsx("dd", { className: "mt-2 text-sm text-ink-soft leading-relaxed", children: "Illustrative. The system was designed but never built." })
        ] })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mt-6 text-sm text-smoke max-w-2xl leading-relaxed", children: "Figures from my time at PayPal come from my résumé and from what I can say publicly. They are point estimates without intervals, which is a weaker standard than the one I hold my own evals to — I can give you the baseline, the window and the denominator on any of them in a conversation, but I am not going to publish numbers I cannot show the working for. Where I could not substantiate a figure at all, I removed it rather than round it." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsx("p", { className: "text-sm text-smoke max-w-xl leading-relaxed", children: "Gatikrishna Dash — AI and platform product leadership in regulated industries." }),
      /* @__PURE__ */ jsxs("p", { className: "text-xs text-dust", children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " · Hyderabad, India"
      ] })
    ] })
  ] }) });
}
function App() {
  const [workI, setWorkI] = useState(0);
  const [openBlog, setOpenBlog] = useState(null);
  const [openWork, setOpenWork] = useState(null);
  const vParam = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("v") : null;
  const heroVariant = vParam === "dark" ? "dark" : vParam === "light" ? "light" : "portfolio";
  const [theme, setTheme] = useState("dark");
  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    if (saved === "light" || saved === "dark") setTheme(saved);
  }, []);
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    try {
      localStorage.setItem("theme", theme);
    } catch (e) {
    }
  }, [theme]);
  const toggleTheme = () => setTheme((t) => t === "dark" ? "light" : "dark");
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const secs = Array.from(document.querySelectorAll("main > section"));
    if (reduce) {
      secs.forEach((s) => s.classList.add("reveal", "in"));
      return;
    }
    const vh = window.innerHeight;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      }),
      { threshold: 0.06, rootMargin: "0px 0px -6% 0px" }
    );
    secs.forEach((s) => {
      if (s.getBoundingClientRect().top < vh * 0.92) s.classList.add("reveal", "in");
      else {
        s.classList.add("reveal");
        io.observe(s);
      }
    });
    return () => io.disconnect();
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "relative min-h-screen", children: [
    /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
      heroVariant !== "portfolio" && /* @__PURE__ */ jsx(NavBar, { heroVariant }),
      /* @__PURE__ */ jsxs("main", { children: [
        heroVariant === "portfolio" ? /* @__PURE__ */ jsx(PortfolioHero, { theme, onToggleTheme: toggleTheme }) : heroVariant === "light" ? /* @__PURE__ */ jsx(HeroLight, {}) : /* @__PURE__ */ jsx(HeroDark, {}),
        /* @__PURE__ */ jsx(SelectedWork, { i: workI, onOpen: setOpenWork }),
        /* @__PURE__ */ jsx(Artifacts, {}),
        /* @__PURE__ */ jsx(Judgment, {}),
        /* @__PURE__ */ jsx(CaseStudies, {}),
        /* @__PURE__ */ jsx(Blogs, { onOpen: setOpenBlog }),
        /* @__PURE__ */ jsx(About, { onSelectWork: setWorkI }),
        /* @__PURE__ */ jsx(Contact, {}),
        /* @__PURE__ */ jsx(DetailedCapabilities, {})
      ] }),
      /* @__PURE__ */ jsx(Footer, {})
    ] }),
    openBlog && /* @__PURE__ */ jsx(BlogReader, { slug: openBlog, onClose: () => setOpenBlog(null) }),
    openWork && /* @__PURE__ */ jsx(WorkReader, { n: openWork, onClose: () => setOpenWork(null) }),
    /* @__PURE__ */ jsx(HeroSwitcher, { variant: heroVariant }),
    /* @__PURE__ */ jsx(Analytics, {})
  ] });
}
function render() {
  return renderToString(/* @__PURE__ */ jsx(App, {}));
}
export {
  render
};
