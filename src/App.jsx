import React, { useState, useEffect, useRef } from 'react'
import { ArrowUpRight, Mail, Linkedin, MapPin, ArrowLeft, ArrowRight } from 'lucide-react'
import { Analytics } from '@vercel/analytics/react'
import { POSTS } from './blogPosts'
import { track } from '@vercel/analytics'
import { HeroDark, HeroLight, HeroSwitcher } from './Heroes'
import PortfolioHero from '@/components/ui/portfolio-hero'
import { Carousel } from '@/components/ui/carousel'
import { CardCarousel } from '@/components/ui/card-carousel'

// ─────────────────────────────────────────────────────────────
// CONTENT — edit copy here without touching JSX
// ─────────────────────────────────────────────────────────────

const NAV = [
  { id: 'profile', label: 'Profile' },
  { id: 'angle', label: 'The Angle' },
  { id: 'career', label: 'Career' },
  { id: 'leadership', label: 'Leadership' },
  { id: 'toolkit', label: 'Toolkit' },
  { id: 'capabilities', label: 'Capabilities' },
  { id: 'judgment', label: 'Judgment' },
  { id: 'work', label: 'Work' },
  { id: 'case-studies', label: 'Case Studies' },
  { id: 'blogs', label: 'Blogs' },
  { id: 'contact', label: 'Contact' },
]

const PROOF_LINES = [
  'Building production AI in a money-touching, regulated environment — agentic automation, evals, and governance — at PayPal. 17+ years of platform depth is the moat.',
  'Shipped agentic AI into live compliance operations across 5 jurisdictions — in production, under governance, and durable well past launch, not just in the demo.',
  'Built the platform layer the AI now runs on — scaled regulatory reporting to 1,000+ reports across 15+ regulated entities.',
]

const HERO_METRICS = [
  { v: '17+', l: 'Years across regulated fintech' },
  { v: '1,000+', l: 'Regulatory reports on the platform' },
  { v: '15+', l: 'Regulated entities served' },
  { v: '5', l: 'Jurisdictions live on agentic AI' },
]

// Typographic wordmark strip (21st "logo cloud marquee" pattern)
const WORKED_WITH = ['PayPal', 'Venmo', 'Xoom', 'Hyperwallet', 'Barclays', 'Lloyds', 'Wipro', 'Cognizant']

const WORK = [
  {
    n: '01',
    title: 'The data foundation for financial crime — and the launches it unlocked',
    meta: 'GFC/AML data platform · CRR · Crypto & SAR reporting · 2018–2021',
    kicker: '2018–2021 · Data platform',
    context:
      'New bets — PayPal offering crypto to US customers for the first time (gated by NYDFS licensing) and a payments license in China — were blocked on regulatory reporting infrastructure that didn’t exist yet, while PayPal’s financial-crime teams needed a data layer they could actually trust for AML and risk decisions. Compliance was being treated as a launch tax — and I’d just been moved into a new product role inside the data-engineering org to fix exactly that.',
    move:
      'I stood up the platform end to end — working across identity, payments, privacy, credit, and crypto; flagging upstream data gaps and getting them corrected before anything entered the platform; and designing the data lifecycle itself: what has to be real-time versus what can wait, and how governance and lineage are enforced. On that foundation I built products from scratch. The flagship — Customer Risk Rating (CRR) — was GFC’s shift from scoring users reactively, after AML events, to proactively risk-rating every user in real time. I led it with the Data Science and ML team (my first product role): an ML and weighted-scoring model that scores each customer at onboarding and continuously on account activity, then auto-triggers the due diligence that risk level demands — essential as PayPal onboarded higher-risk businesses like crypto and trading. Alongside it: PayPal’s first crypto reporting platform, a prerequisite for the company to offer crypto in the US under NYDFS licensing; and the SAR reporting pipeline required for the payments license in China.',
    proves:
      'Financial-crime and compliance data isn’t a launch tax. It’s the cleanest path into a new market — and the trusted foundation everything since, the reporting platform and the agentic AI, has been built on.',
    metrics: [
      { v: '0 → 1', l: 'Customer Risk Rating built from scratch — ML + weighted scoring' },
      { v: 'Real-time', l: 'Proactive risk rating of every user — auto-triggering due diligence' },
      { v: 'Crypto', l: 'First crypto reporting platform — enabled PayPal’s first US crypto offering, Q4 2020' },
      { v: 'China', l: 'SAR reporting pipeline — cleared the payments license in China' },
    ],
  },
  {
    n: '02',
    title: 'One regulatory-reporting platform, not one tool per regulator',
    meta: 'Platform consolidation · 2020–2023',
    kicker: '2020–2023 · Consolidation',
    context:
      'We were building one tool per regulator. Each report took roughly a quarter to onboard, and the team was spending more time maintaining than shipping. Brexit and a handful of new mandates were about to make the maintenance load worse.',
    move:
      'I led the case for a single platform with a common report-onboarding lifecycle. The hard part was never the engineering — it was sitting with Legal and compliance across jurisdictions, and often directly with the regulators, to interpret each ask and translate it into requirements the whole platform could carry. The real discipline: making one regulator’s rule coexist with the next without breaking either, and designing customizable templates and auto-triggering rules so the next mandate is a configuration change, not a rebuild. Shipped in 14 months, grown to 1,000+ reports across 15+ regulated entities.',
    proves:
      'New reports went from a quarter to about two weeks. More importantly, the platform is now where the AI augmentation plugs in cleanly — validation, narrative generation, agent-assisted review — instead of needing one integration per legacy tool.',
    metrics: [
      { v: '1,000+', l: 'Reports onboarded onto the platform' },
      { v: '15+', l: 'Regulated entities served' },
      { v: '80%', l: 'Reduction in per-report onboarding time' },
      { v: '14 months', l: 'Platform build to v1' },
    ],
  },
  {
    n: '03',
    title: 'Agentic AI for compliance review at PayPal',
    meta: 'Agentic AI · Human-in-the-loop · 5 jurisdictions · 2023–2025',
    kicker: '2023–2025 · Agentic AI',
    context:
      'On the regulatory platform we had already unified, compliance review queues across 5 jurisdictions were running 4+ days behind. The business wanted to add headcount; the regulator wanted faster turnaround. The team was caught between both.',
    move:
      'Rather than add headcount, I brought an agentic layer onto that existing platform. LLM agents handled the structured extraction and first-pass policy mapping; every call was schema-validated before it touched the queue; and anything policy-sensitive routed to a human reviewer with the agent’s reasoning attached — the human trust boundary designed in, not bolted on. The same layer runs automated regulatory assessment on every product change, surfacing the regulatory triggers a launch would create and routing them for resolution before they ever become an audit finding. It ran in shadow mode for six weeks before a single decision was acted on.',
    proves:
      'The hard part was never the agents. It was designing the human override path and the validator before the first agent shipped — not after the first incident. Because the platform underneath was already built for audit, the AI had somewhere trustworthy to plug in.',
    metrics: [
      { v: '80%+', l: 'Reduction in manual review volume' },
      { v: '2 weeks → 2 hrs', l: 'Median case turnaround' },
      { v: '5', l: 'Jurisdictions live' },
      { v: '6 weeks', l: 'Shadow mode before go-live' },
    ],
  },
]

const JUDGMENT = [
  {
    n: '01',
    title: 'When to let an agent decide, and when not to',
    tension: 'Agent throughput vs. accountability on policy-sensitive calls.',
    judgment:
      'Automate the deterministic steps. For anything policy-sensitive, escalation is a designed product surface, not a backlog item.',
    why: 'It kept agent speed high without quietly handing accountability to the model.',
  },
  {
    n: '02',
    title: 'Structured output is non-negotiable',
    tension: 'LLM flexibility vs. inspectability.',
    judgment:
      'Every agent call emits a JSON-schema-valid object. Validation runs before the result touches downstream code. Retries are bounded.',
    why: 'It is the difference between a prototype the team can demo and a system the regulator can inspect.',
  },
  {
    n: '03',
    title: 'Build the AI platform before the third AI feature',
    tension: 'Pressure to ship the next AI feature vs. discipline to build shared infrastructure.',
    judgment:
      'Invest in shared orchestration and eval infrastructure before the third feature. Otherwise you end up with three prompt-handling stacks and nobody who can debug any of them.',
    why: 'The teams that scale AI in production are the ones that did this once. The teams that ship demos are the ones that did not.',
  },
  {
    n: '04',
    title: 'Sequence around what can be governed',
    tension: 'Business urgency to ship AI vs. jurisdiction-specific compliance work.',
    judgment:
      'Roll AI out in markets where the governance work is already done, not in the markets where it would be the hardest to retrofit.',
    why: 'It avoids the post-launch retrofits that quietly consume the AI engineering budget for years.',
  },
  {
    n: '05',
    title: 'Governance is not friction',
    tension: 'Treating compliance as a brake on AI ambition.',
    judgment:
      'Lineage, evals, and override paths are part of the product. Built once, they are how the next AI feature ships faster, not slower.',
    why: 'I have watched the same governance investment cost six months on the first feature and save twelve on the third.',
  },
  {
    n: '06',
    title: 'Boring data work first',
    tension: 'AI roadmap ambition vs. messy underlying data.',
    judgment:
      'Fix lineage, validation, and ownership of the data first. Then build the AI on top. The reverse order has cost me more product wins than any model choice ever has.',
    why: 'Every AI feature that lasted in production sat on clean data work. The ones that did not, did not last.',
  },
]

const CAPABILITIES = [
  {
    group: 'AI strategy',
    blurb: 'Deciding what gets built, bought, or killed — and getting the AI roadmap to survive contact with production.',
    items: [
      'AI roadmap and prioritization',
      'Build vs. buy vs. partner decisions',
      'Pilot-to-production transition',
      'Vendor selection (model + tooling)',
    ],
  },
  {
    group: 'Execution',
    blurb: 'Multi-step agentic systems with validation, evals, and a human override path treated as part of the product.',
    items: [
      'Agentic system design',
      'Eval design and benchmarking',
      'Schema-bound output / validation',
      'Platform vs. feature trade-off calls',
    ],
  },
  {
    group: 'Governance & risk',
    blurb: 'The lineage, controls, and traceability that decide whether an AI feature still exists in month six.',
    items: [
      'AI risk frameworks (in-house and external)',
      'Regulator-facing design choices',
      'Human-in-the-loop UX',
      'Data lineage and traceability',
    ],
  },
  {
    group: 'Leadership',
    blurb: 'Aligning risk, legal, and compliance; communicating to boards and regulators; hiring and growing senior PMs.',
    items: [
      'Cross-functional alignment with risk/legal/compliance',
      'Board and executive communication',
      'Regulator engagement (specific examples on request)',
      'Hiring and growing senior PMs',
    ],
  },
]

const CAREER_ARC = [
  {
    era: '01',
    theme: 'Data Engineer',
    years: '2009–2014',
    title: 'Data engineering & BI',
    body: 'ETL pipelines, BI reporting, and lineage and governance for Lloyds and Barclays — at Wipro and Cognizant. The hands-on data craft everything later sits on.',
    tools: ['Teradata', 'Informatica', 'Tableau'],
    companies: ['Lloyds', 'Barclays'],
    instinct: 'Where I learned to distrust any roadmap that skips the data layer.',
  },
  {
    era: '02',
    theme: 'Product Leader',
    years: '2014–2023',
    title: 'Compliance & regulatory platforms',
    body: 'Compliance, privacy, and regulatory-reporting platforms at PayPal — AML, SAR, GDPR, KYC, customer risk — plus cross-border launches into China and the US.',
    tools: ['AML', 'SAR', 'GDPR', 'KYC'],
    companies: ['PayPal'],
    instinct: 'Where individual data work became platform product leadership.',
    workIndex: 0,
  },
  {
    era: '03',
    theme: 'AI Product Leader',
    years: '2023–present',
    title: 'AI & agentic systems',
    body: 'Leading AI product work at PayPal — turning the regulatory and compliance workflows I used to platform-ify into governed, agent-driven systems.',
    tools: ['LLM agents', 'Evals', 'Governance'],
    companies: ['PayPal'],
    instinct: 'Where the earlier layers became the reason the AI ships.',
    workIndex: 2,
  },
]

const GOVERNANCE_TOOLKIT = [
  {
    group: 'Execution controls',
    items: [
      { title: 'Structured outputs', body: 'JSON-schema-bound generation so agents emit machine-verifiable artifacts.' },
      { title: 'Validation pipelines', body: 'Schema, semantic, and policy gates before any downstream action.' },
      { title: 'Retry & backoff logic', body: 'Bounded retries for transient failures and degraded model output.' },
      { title: 'Fail-safe handling', body: 'Graceful degradation paths that fail safe under load or anomaly, rather than failing silently.' },
    ],
  },
  {
    group: 'Audit & trust',
    items: [
      { title: 'End-to-end traceability', body: 'Every decision is reproducible from input through model output to the final artifact.' },
      { title: 'Decision rationale capture', body: 'Agent reasoning preserved so reviewers and regulators can follow the logic.' },
      { title: 'Audit-ready artifacts', body: 'Outputs designed to be inspected, not just generated.' },
      { title: 'Explainability surfaces', body: 'Per-decision context exposed where review, dispute, or escalation happen.' },
    ],
  },
  {
    group: 'Operational safety',
    items: [
      { title: 'Human-in-the-loop thresholds', body: 'Escalation criteria defined per workflow and built into the agent loop, not bolted on once the queue starts overflowing.' },
      { title: 'Circuit breakers', body: 'Automated stop conditions when agent behavior drifts from operating intent.' },
      { title: 'Reversibility', body: 'Agent actions designed to be undone or compensated where consequences require it.' },
      { title: 'Shadow mode and evaluations', body: 'Run the agent alongside production for weeks before any decision is acted on. Online evals tied to the operating metric that triggered the project.' },
    ],
  },
]

// Case study — interactive merchant lifecycle console
const CASE_METRICS = [
  { v: '25–40%', l: 'Potential lift in merchant lifetime value' },
  { v: '−60%', l: 'Churn reduction through early intervention' },
  { v: '4', l: 'Lifecycle segments with tailored playbooks' },
  { v: '0', l: 'Manual playbooks to maintain — fully generated' },
]

const CASE_SEGMENTS = [
  {
    key: 'New (0–30 days)',
    name: 'New merchant · Onboarding',
    desc: 'Signed up 11 days ago. Account configured but no first live transaction yet.',
    signals: [
      'No first transaction after 11 days (activation risk)',
      'Only 2 of 8 core features set up',
      'Opened the integration docs 3× but did not finish',
    ],
    steps: [
      'Trigger a guided activation flow targeting the unfinished integration step',
      'Send a day-3 / day-7 / day-14 nudge sequence tied to setup milestones',
      'Offer a 15-min onboarding call if no transaction by day 14',
    ],
    impactBig: '2.3×',
    impactTxt: 'faster time-to-first-transaction',
  },
  {
    key: 'At-risk (declining)',
    name: 'At-risk merchant · Declining volume',
    desc: 'Established merchant whose processing volume fell 42% over the last 6 weeks.',
    signals: [
      'Transaction volume down 42% vs. trailing 3-month average',
      'Support tickets up 3× — mostly fees and settlement timing',
      'Logins dropped from daily to weekly',
    ],
    steps: [
      'Flag for proactive success outreach before the next billing cycle',
      'Run a fee / pricing review and surface relevant lower-cost options',
      'Share a tailored tip on settlement timing addressing their top ticket',
    ],
    impactBig: '−60%',
    impactTxt: 'churn risk on early-intervention saves',
  },
  {
    key: 'Growth (expanding)',
    name: 'Growth merchant · Expanding fast',
    desc: 'Volume up 64% this quarter; consistently approaching current plan limits.',
    signals: [
      'Processing volume up 64% QoQ, nearing tier cap',
      'Started using 2 new product features unprompted',
      'Added 3 team members to the dashboard',
    ],
    steps: [
      'Proactively offer an upgrade to the higher tier before the cap is hit',
      'Cross-sell the payout and reporting add-ons their usage pattern predicts',
      'Assign a named contact to support the expansion',
    ],
    impactBig: '+34%',
    impactTxt: 'expansion revenue per account',
  },
  {
    key: 'Dormant (60+ days)',
    name: 'Dormant merchant · Win-back',
    desc: 'No transactions or logins in 67 days. Previously a steady mid-volume merchant.',
    signals: [
      'Zero transactions and no logins for 67 days',
      'Never re-engaged after a failed payout 9 weeks ago',
      'Historically processed steadily for 14 months prior',
    ],
    steps: [
      'Launch a personalized win-back acknowledging the past payout issue',
      'Offer a re-onboarding session plus a time-boxed fee incentive',
      'If no response in 14 days, route to a final value-recap message',
    ],
    impactBig: '18%',
    impactTxt: 'dormant merchants reactivated',
  },
]

const CASE_SHIFT = {
  before: [
    'Intervention triggered after volume already dropped',
    'Same generic lifecycle email for every merchant',
    'Analysts hand-built playbooks that went stale',
    'Expansion and win-back happened by luck, not design',
  ],
  after: [
    'Early signals surface risk before the drop',
    'Each merchant gets a playbook tuned to its stage',
    'The model generates and refreshes playbooks on demand',
    'Retention, expansion and win-back are designed surfaces',
  ],
}

const POV_IDEAS = [
  'Reliability and traceability earn enterprise trust. Benchmarks do not.',
  'In regulated work, governance is part of the product spec, not a launch-gate afterthought.',
  'Human review is a designed surface. If you discover it after launch as a queue, you designed it wrong.',
  'LLM systems need schema validation, retries, and failure paths from the first call, not the first incident.',
  'The most valuable AI products improve operating discipline. Productivity gains follow.',
]

const LEADERSHIP = [
  {
    n: '01',
    title: 'Simplicity is a strategic advantage',
    body: 'Complexity rarely comes from a lack of technology, vision, or talent — it comes from fragmented processes, ambiguous ownership, and over-engineering. I lead with clarity: find the root-level problem, then architect platforms that scale with trust and adaptability.',
  },
  {
    n: '02',
    title: 'Innovation is won in the operating layer',
    body: 'Innovation doesn’t live or die in the 5–10% of teams building cutting-edge tech — it’s decided by the other 90–95%, where alignment and execution turn ideas into value. I empower that core through deliberate product architecture and disciplined prioritization.',
  },
  {
    n: '03',
    title: 'Precision over volume',
    body: 'I don’t chase complexity. I lead with a clear lens on customer value, business alignment, and simplicity — because real transformation isn’t about doing more; it’s about doing what matters most, with precision and purpose.',
  },
]

const BLOGS = [
  {
    title: 'From Parrot to Colleague',
    excerpt:
      'A true story of every AI buzzword — and how each public, expensive, occasionally absurd failure became the blueprint for the next win.',
    href: '/from-parrot-to-colleague.html',
    slug: 'from-parrot-to-colleague',
    topic: 'Essay · AI',
    read: '11 min read',
    date: 'Aug 2026',
    cover: '/blog-parrot-to-colleague.svg',
  },
]

// Standalone deep-dive pages that live in /public
const CASE_STUDIES = [
  {
    n: '01',
    title: 'Retention, Rebuilt: Generative \u2192 Agentic',
    kicker: '2024 \u2192 2026 \u00b7 Retention',
    excerpt:
      "The 2024 version generated a playbook from a merchant's signals. The 2026 rebuild runs the loop \u2014 an accountable retention agent with tiered autonomy, always-on guardrails, and a human gate on every action that touches money.",
    href: '/merchant-retention-case-study.html',
    tags: ['\u221260% churn', '+25\u201340% LTV', '3 autonomy tiers'],
    kind: 'Interactive',
  },
  {
    n: '02',
    title: 'Meridian \u2014 Agentic Regulatory-Change Intelligence',
    kicker: 'Agentic \u00b7 RegTech',
    excerpt:
      'An agent that watches every regulator you answer to, maps each change to the specific internal controls it breaks, and hands a compliance officer a defensible package to sign \u2014 not a chatbot that answers questions about the law.',
    href: '/meridian-case-study.html',
    tags: ['AUSTRAC \u00b7 MAS \u00b7 CSSF', '200+ changes/day', 'Concept'],
    kind: 'Concept',
  },
]

const LINKS = {
  email: 'gati4dash@gmail.com',
  linkedin: 'https://www.linkedin.com/in/gati-dash',
  resume: '/GatiDash_Resume.pdf', // file lives in /public
  photo: '/profile.png',
  location: 'Hyderabad, India',
}

// ─────────────────────────────────────────────────────────────
// PRIMITIVES
// ─────────────────────────────────────────────────────────────

function Container({ children, className = '' }) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-12 ${className}`}>
      {children}
    </div>
  )
}

function SectionLabel({ n, children }) {
  return (
    <div className="flex items-center gap-4">
      <span className="font-serif text-base text-accent">{n}</span>
      <span className="h-px w-8 bg-ink/20" />
      <span className="eyebrow">{children}</span>
    </div>
  )
}

function Avatar({ src, alt, size = 'large' }) {
  const [failed, setFailed] = useState(false)

  const dim =
    size === 'small'
      ? 'w-20 h-20'
      : 'w-48 h-48 sm:w-52 sm:h-52'
  const monogram = size === 'small' ? 'text-xl' : 'text-5xl'

  if (failed) {
    return (
      <div
        className={`${dim} rounded-md border border-sand bg-paper-dark flex items-center justify-center flex-shrink-0`}
        aria-label={alt}
      >
        <span className={`font-serif ${monogram} text-accent leading-none`}>GD</span>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      className={`${dim} rounded-md object-cover border border-sand grayscale-[8%] flex-shrink-0`}
      loading="eager"
    />
  )
}

function NavBar({ heroVariant = 'dark' }) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  // Over the dark hero at the top, use light text on a transparent bar.
  const onDark = heroVariant === 'dark' && !scrolled
  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-paper/85 backdrop-blur-md border-b border-sand/60' : 'bg-transparent border-b border-transparent'
      }`}
    >
      <Container className="h-16 flex items-center justify-between">
        <a
          href="#profile"
          className={`font-serif text-lg tracking-editorial transition-colors ${
            onDark ? 'text-white hover:text-white/80' : 'text-ink hover:text-accent'
          }`}
        >
          Gatikrishna Dash
        </a>
        <div className="flex items-center gap-5 sm:gap-7">
          <nav className="hidden md:flex items-center gap-7">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={n.href || `#${n.id}`}
                className={`text-sm transition-colors ${
                  onDark ? 'text-white/70 hover:text-white' : 'text-smoke hover:text-ink'
                }`}
              >
                {n.label}
              </a>
            ))}
          </nav>
          <a
            href="/case-studies.html"
            onClick={() => track('open_case_studies', { from: 'nav' })}
            className="btn-launch !text-sm !py-2 !px-4"
          >
            Case Studies
            <ArrowUpRight className="h-4 w-4 lr-arrow" />
          </a>
        </div>
      </Container>
    </header>
  )
}

// ─────────────────────────────────────────────────────────────
// SECTIONS
// ─────────────────────────────────────────────────────────────


function Profile() {
  return (
    <section id="profile" className="relative pt-24 pb-20 overflow-hidden">
      <Container>
        {/* Mobile-only identity strip */}
        <div className="lg:hidden flex items-center gap-5 mb-10">
          <Avatar src={LINKS.photo} alt="Portrait of Gatikrishna Dash" size="small" />
          <div className="min-w-0">
            <p className="font-serif text-2xl text-ink leading-tight">Gatikrishna Dash</p>
            <p className="text-sm text-smoke mt-1.5 inline-flex items-center gap-1.5">
              <MapPin className="h-3 w-3 text-dust" />
              Hyderabad, India
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Main column */}
          <div className="lg:col-span-8">
            <p className="eyebrow mb-6">AI Product and Transformation Leader  ·  PayPal</p>
            <p className="inline-flex items-center gap-2 text-sm text-accent mb-7">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Currently open to AI product leadership roles
            </p>

            <h1 className="display-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.05] max-w-prose-wide">
              I lead AI and platform product work in PayPal. The kind that has to <span className="ignite-text">clear an audit</span>, not just a demo.
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-smoke leading-snug max-w-prose-wide font-serif font-normal">
              AI product leadership for regulated, high-stakes systems — turning compliance, risk, and regulatory operations into governed, AI-native products. The controls most teams bolt on last, I design in first.
            </p>

            {/* Restrained proof — three short lines with hairline dividers */}
            <ul className="mt-9 max-w-prose-wide divide-y divide-sand">
              {PROOF_LINES.map((p, i) => (
                <li key={i} className="flex items-start gap-5 py-4">
                  <span className="font-serif text-sm text-accent mt-1 w-6 flex-shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-base text-ink-soft leading-relaxed">{p}</span>
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
              <a href={`mailto:${LINKS.email}`} className="btn-launch">
                Start a conversation <span className="lr-arrow">→</span>
              </a>
              <a
                href={LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-quiet font-medium"
              >
                Connect on LinkedIn
              </a>
            </div>

            {/* Proof-at-a-glance metric band */}
            <dl className="metric-band mt-11 max-w-prose-wide">
              {HERO_METRICS.map((m) => (
                <div key={m.l} className="metric-cell">
                  <dt className="metric-v">{m.v}</dt>
                  <dd className="metric-l">{m.l}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Right-aligned profile card */}
          <aside className="hidden lg:block lg:col-span-4 lg:pl-8 lg:border-l border-sand">
            <div className="lg:sticky lg:top-28">
              <Avatar src={LINKS.photo} alt="Portrait of Gatikrishna Dash" />
              <dl className="mt-7 space-y-5 text-sm">
                <div>
                  <dt className="eyebrow mb-1.5">Name</dt>
                  <dd className="text-ink">Gatikrishna Dash</dd>
                </div>
                <div>
                  <dt className="eyebrow mb-1.5">Role</dt>
                  <dd className="text-ink-soft leading-relaxed">
                    AI Product and Transformation Leader<br />
                    PayPal
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow mb-1.5">Credentials</dt>
                  <dd className="text-ink-soft leading-relaxed">
                    ISB · Strategic Digital Leadership Programme<br />
                    Kellogg · PG Cert, Product Management<br />
                    ITER · B-Tech, Computer Science &amp; Engineering
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow mb-1.5">Location</dt>
                  <dd className="text-ink-soft inline-flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-dust" />
                    {LINKS.location}
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow mb-1.5">Email</dt>
                  <dd>
                    <a href={`mailto:${LINKS.email}`} className="link-underline text-ink">
                      {LINKS.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow mb-1.5">LinkedIn</dt>
                  <dd>
                    <a
                      href={LINKS.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline text-ink"
                    >
                      gati-dash
                      <ArrowUpRight className="h-3 w-3" />
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  )
}

function WorkCard({ w, onOpen }) {
  return (
    <button type="button" onClick={() => onOpen(w.n)} className="pcard w-full p-7 sm:p-8 group">
      <div className="flex items-baseline gap-4">
        <span className="font-serif text-3xl sm:text-4xl text-accent leading-none">{w.n}</span>
        <span className="eyebrow truncate">{w.kicker}</span>
      </div>

      <h3 className="display-serif text-xl sm:text-2xl text-ink leading-[1.2] mt-5 group-hover:text-accent transition-colors">
        {w.title}
      </h3>

      <p className="mt-4 text-[15px] text-smoke leading-relaxed line-clamp-4">{w.context}</p>

      <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-sand pt-5">
        {w.metrics.slice(0, 2).map((m) => (
          <div key={m.l}>
            <dt className="font-serif text-xl text-ink leading-none">{m.v}</dt>
            <dd className="mt-1.5 text-xs text-smoke leading-snug line-clamp-2">{m.l}</dd>
          </div>
        ))}
      </dl>

      <span className="mt-auto pt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent group-hover:gap-3 transition-all">
        Read the case <ArrowUpRight className="h-4 w-4" />
      </span>
    </button>
  )
}

// Full detail for one piece of work, opened from a card.
function WorkReader({ n, onClose }) {
  const w = WORK.find((x) => x.n === n)
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    window.scrollTo(0, 0)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])
  if (!w) return null
  return (
    <div className="fixed inset-0 z-[100] bg-paper overflow-y-auto">
      <div className="sticky top-0 z-10 bg-paper/90 backdrop-blur-md border-b border-sand">
        <Container className="h-14 flex items-center justify-between">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 text-sm text-ink hover:text-accent transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to portfolio
          </button>
          <span className="font-serif text-sm text-ink tracking-editorial">Selected work</span>
        </Container>
      </div>

      <Container className="py-12 sm:py-16">
        <div className="eyebrow">{w.meta}</div>
        <h1 className="display-serif text-3xl sm:text-4xl lg:text-5xl leading-[1.1] mt-4 max-w-4xl">
          {w.title}
        </h1>

        <div className="mt-10 grid lg:grid-cols-12 gap-y-10 gap-x-12">
          <div className="lg:col-span-8 space-y-6 max-w-prose-wide">
            <Paragraph label="Context" body={w.context} />
            <Paragraph label="What I did" body={w.move} />
            <Paragraph label="What I would tell the next team" body={w.proves} accent />
          </div>
          <aside className="lg:col-span-4 lg:pl-8 lg:border-l border-sand">
            <div className="eyebrow mb-6">Operating impact</div>
            <dl className="divide-y divide-sand">
              {w.metrics.map((m) => (
                <div key={m.l} className="py-4 first:pt-0">
                  <dt className="font-serif text-2xl sm:text-3xl text-ink leading-none">{m.v}</dt>
                  <dd className="mt-1.5 text-sm text-smoke leading-snug">{m.l}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </Container>
    </div>
  )
}

function SelectedWork({ i, onOpen }) {
  const api = useRef(null)
  useEffect(() => {
    api.current?.scrollToIndex(i)
  }, [i])
  return (
    <section id="work" className="py-14 sm:py-20 border-t border-sand">
      <Container>
        <SectionLabel n="06">Work</SectionLabel>
        <h2 className="display-serif mt-4 text-3xl sm:text-4xl max-w-3xl leading-[1.1]">
          Three pieces of work that explain how I think.
        </h2>
        <p className="mt-3 text-base text-smoke max-w-2xl leading-relaxed">
          Anonymized where it has to be. The numbers are not. Each case names what shipped, what it took, and what I would tell the next team.
        </p>

        <div className="mt-8">
          <CardCarousel
            ariaLabel="Selected work"
            items={WORK}
            itemKey={(w) => w.n}
            onReady={(a) => (api.current = a)}
            renderItem={(w) => <WorkCard w={w} onOpen={onOpen} />}
          />
        </div>
      </Container>
    </section>
  )
}

function Paragraph({ label, body, accent = false }) {
  return (
    <div>
      <div className={`eyebrow mb-2 ${accent ? 'text-accent' : ''}`}>{label}</div>
      <p className={`text-sm sm:text-base leading-relaxed ${accent ? 'text-ink font-medium font-serif' : 'text-ink-soft'}`}>
        {body}
      </p>
    </div>
  )
}

function CapabilitySlide({ c }) {
  return (
    <div className="grid lg:grid-cols-12 gap-y-8 gap-x-16">
      <div className="lg:col-span-5">
        <h3 className="display-serif text-2xl sm:text-3xl text-ink leading-[1.15]">{c.group}</h3>
        <p className="mt-4 text-lg text-smoke leading-relaxed max-w-prose-tight">{c.blurb}</p>
      </div>
      <ul className="lg:col-span-7 grid sm:grid-cols-2 gap-x-10 gap-y-4 self-center">
        {c.items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-base text-ink-soft leading-snug">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

function Capabilities() {
  return (
    <section id="capabilities" className="py-16 sm:py-24 border-t border-sand">
      <Container>
        <SectionLabel n="04">Capabilities</SectionLabel>
        <h2 className="display-serif mt-6 text-3xl sm:text-4xl lg:text-5xl max-w-3xl leading-[1.1]">
          What I actually do.
        </h2>
        <p className="mt-5 text-lg text-smoke max-w-2xl leading-relaxed">
          Four areas I spend my time on. Step through the concrete work under each.
        </p>

        <div className="mt-10">
          <Carousel
            ariaLabel="Capability areas"
            slideLabels={CAPABILITIES.map((c) => c.group)}
            slides={CAPABILITIES.map((c) => <CapabilitySlide key={c.group} c={c} />)}
          />
        </div>
      </Container>
    </section>
  )
}

function JudgmentSlide({ j }) {
  return (
    <div className="grid lg:grid-cols-12 gap-y-7 gap-x-16">
      <div className="lg:col-span-4">
        <span className="font-serif text-4xl sm:text-5xl text-accent leading-none">{j.n}</span>
        <h3 className="font-serif text-2xl sm:text-3xl text-ink tracking-editorial mt-6 leading-snug">
          {j.title}
        </h3>
      </div>
      <dl className="lg:col-span-8 space-y-4 text-base leading-relaxed self-center">
        <div className="grid sm:grid-cols-[8rem_1fr] gap-x-6 gap-y-1">
          <dt className="eyebrow pt-1">Tension</dt>
          <dd className="text-ink-soft">{j.tension}</dd>
        </div>
        <div className="grid sm:grid-cols-[8rem_1fr] gap-x-6 gap-y-1">
          <dt className="eyebrow pt-1">Call I make</dt>
          <dd className="text-ink">{j.judgment}</dd>
        </div>
        <div className="grid sm:grid-cols-[8rem_1fr] gap-x-6 gap-y-1">
          <dt className="eyebrow pt-1">Why</dt>
          <dd className="text-smoke italic">{j.why}</dd>
        </div>
      </dl>
    </div>
  )
}

function Judgment() {
  return (
    <section id="judgment" className="py-16 sm:py-24 border-t border-sand">
      <Container>
        <SectionLabel n="05">Judgment</SectionLabel>
        <h2 className="display-serif mt-6 text-3xl sm:text-4xl lg:text-5xl max-w-3xl leading-[1.1]">
          Calls I keep making.
        </h2>
        <p className="mt-5 text-lg text-smoke max-w-2xl leading-relaxed">
          The most important AI product decisions in regulated work are rarely about model choice. They are about where to standardize, where to keep humans, and what to refuse to ship.
        </p>

        <div className="mt-12">
          <Carousel
            ariaLabel="Judgment calls"
            slideLabels={JUDGMENT.map((j) => j.title)}
            slides={JUDGMENT.map((j) => <JudgmentSlide key={j.n} j={j} />)}
          />
        </div>
      </Container>
    </section>
  )
}

function ToolkitSlide({ t }) {
  return t.beliefs ? (
    <ol className="grid sm:grid-cols-2 gap-x-12 gap-y-6 max-w-prose-wide">
      {t.beliefs.map((idea, i) => (
        <li key={i} className="flex items-start gap-4">
          <span className="font-serif text-sm text-accent mt-1 w-6 flex-shrink-0">
            {String(i + 1).padStart(2, '0')}
          </span>
          <span className="text-base text-ink-soft leading-relaxed">{idea}</span>
        </li>
      ))}
    </ol>
  ) : (
    <dl className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-8">
      {t.items.map((item) => (
        <div key={item.title}>
          <dt className="font-serif text-lg text-ink tracking-editorial">{item.title}</dt>
          <dd className="mt-1.5 text-sm text-ink-soft leading-relaxed">{item.body}</dd>
        </div>
      ))}
    </dl>
  )
}

function GovernanceToolkit() {
  const TABS = [...GOVERNANCE_TOOLKIT, { group: 'Operating beliefs', beliefs: POV_IDEAS }]
  return (
    <section id="toolkit" className="py-16 sm:py-24 bg-paper-dark border-t border-sand">
      <Container>
        <SectionLabel n="03">Toolkit</SectionLabel>
        <h2 className="display-serif mt-6 text-3xl sm:text-4xl lg:text-5xl max-w-3xl leading-[1.1]">
          The controls I argue for.
        </h2>
        <p className="mt-5 text-lg text-smoke max-w-2xl leading-relaxed">
          Most are dull. Most are the difference between an AI feature that reaches production and one that gets pulled in week six.
        </p>

        <div className="mt-10">
          <Carousel
            ariaLabel="Governance toolkit"
            slideLabels={TABS.map((t) => t.group)}
            slides={TABS.map((t) => <ToolkitSlide key={t.group} t={t} />)}
          />
        </div>
      </Container>
    </section>
  )
}

// Only these have an SVG in /public/logos. Anything else renders as a wordmark
// instead of firing a request that 404s in the network tab. Drop a new file in
// public/logos/<slug>.svg and add the slug here to switch a name to its mark.
const AVAILABLE_LOGOS = new Set(['paypal'])

function CompanyLogo({ name }) {
  const [failed, setFailed] = useState(false)
  const slug = name.toLowerCase().replace(/\s+/g, '-')
  if (failed || !AVAILABLE_LOGOS.has(slug)) {
    return <span className="career-co-text">{name}</span>
  }
  return (
    <img
      src={`/logos/${slug}.svg`}
      alt={name}
      title={name}
      onError={() => setFailed(true)}
      className="career-logo"
    />
  )
}

function TheAngle() {
  return (
    <section id="angle" className="py-16 sm:py-24 border-t border-sand">
      <Container>
        <div className="flex items-center gap-4">
          <span className="h-px w-8 bg-ink/20" />
          <span className="eyebrow">The angle I bring</span>
        </div>
        <h2 className="display-serif mt-6 text-3xl sm:text-4xl lg:text-5xl max-w-4xl leading-[1.08]">
          I don&apos;t come at product from the feature side. I come from the launch side.
        </h2>
        <div className="mt-8 grid lg:grid-cols-12 gap-8 lg:gap-16">
          <p className="lg:col-span-7 text-lg text-ink-soft leading-relaxed max-w-prose-wide">
            For the last five years I&apos;ve sat in the go/no-go seat for core product launches across PayPal and its brands — Venmo, Xoom, Hyperwallet — spanning 15+ regulated entities and jurisdictions, each with its own rules. Most PMs ship a handful of products in a career; I&apos;ve pressure-tested and post-mortemed more launches than most people ever see.
          </p>
          <p className="lg:col-span-5 text-base text-ink-soft leading-relaxed">
            Then I built what almost no one does: a single source of truth unifying product, customer, and transaction data for audit and compliance — and the launch standards the company now runs on.
          </p>
        </div>

        <div className="mt-8 border-l-2 border-accent pl-5 max-w-prose-wide">
          <p className="text-base sm:text-lg text-ink-soft leading-relaxed">
            In global payments, getting AML, cross-border, or crypto disclosure wrong isn&apos;t a bug ticket — it&apos;s a regulatory event. Regulators like Australia&apos;s AUSTRAC have handed major banks penalties from the hundreds of millions to well over a billion dollars for exactly these gaps, and the US, EU, UK, and Singapore do the same. The data platforms, automated governance, and audit logs I&apos;ve built over a decade are what keep a payments company defensible when the regulator comes looking.
          </p>
        </div>

        <p className="mt-9 display-serif text-xl sm:text-2xl text-ink max-w-prose-wide leading-snug">
          That vantage is exactly why I can tell which AI products will survive contact with a regulator — and which won&apos;t.
        </p>
      </Container>
    </section>
  )
}

function CareerArc({ onSelectWork }) {
  return (
    <section id="career" className="py-14 sm:py-20 border-t border-sand">
      <Container>
        <SectionLabel n="01">Career</SectionLabel>
        <h2 className="display-serif mt-4 text-3xl sm:text-4xl max-w-3xl leading-[1.1]">
          Three acts.
        </h2>
        <p className="mt-3 text-base text-smoke max-w-2xl leading-relaxed">
          Seventeen years in three acts — data engineering, regulatory platforms, and now AI. Each one built the foundation for the next: shipping systems that have to be audited, not just admired.
        </p>

        <div className="mt-8 grid md:grid-cols-3 gap-5">
          {CAREER_ARC.map((e, i) => (
            <div
              key={e.era}
              className="career-card card-lift relative flex flex-col h-full rounded-xl border border-sand border-t-2 border-t-accent bg-paper p-5 pt-6"
              style={{ animationDelay: `${i * 130}ms` }}
            >
              <span className="career-node" />
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-base text-accent">{e.era}</span>
                <span className="eyebrow text-dust">{e.years}</span>
              </div>
              <div className="eyebrow text-accent mt-2.5 flex items-center gap-1.5">
                {i > 0 && <span className="text-dust">→</span>}
                {e.theme}
              </div>
              <h3 className="font-serif text-xl text-ink tracking-editorial leading-snug mt-1 min-h-[2.8rem]">
                {e.title}
              </h3>
              <p className="mt-1.5 text-sm text-ink-soft leading-relaxed">{e.body}</p>
              <div className="mt-4">
                <div className="eyebrow text-dust mb-2">Tools</div>
                <div className="flex flex-wrap gap-2">
                  {e.tools.map((c) => (
                    <span key={c} className="career-chip">{c}</span>
                  ))}
                </div>
              </div>
              <div className="mt-3">
                <div className="eyebrow text-dust mb-2">Worked with</div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  {e.companies.map((c) => (
                    <CompanyLogo key={c} name={c} />
                  ))}
                </div>
              </div>
              <p className="mt-auto pt-4 border-t border-sand text-sm text-smoke italic leading-relaxed">
                <span className="not-italic text-accent font-serif mr-1.5">↳</span>
                {e.instinct}
              </p>
              {e.workIndex != null && (
                <a
                  href="#work"
                  onClick={() => onSelectWork(e.workIndex)}
                  className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide-caps text-accent hover:gap-2.5 transition-all"
                >
                  See the work from this era
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

function LeadershipSlide({ p }) {
  return (
    <div className="grid lg:grid-cols-12 gap-y-6 gap-x-16">
      <div className="lg:col-span-5">
        <span className="font-serif text-4xl sm:text-5xl text-accent leading-none">{p.n}</span>
        <h3 className="display-serif text-2xl sm:text-3xl text-ink leading-[1.15] mt-5">{p.title}</h3>
      </div>
      <p className="lg:col-span-7 text-lg text-ink-soft leading-relaxed max-w-prose-wide self-center">
        {p.body}
      </p>
    </div>
  )
}

function Leadership() {
  return (
    <section id="leadership" className="py-16 sm:py-24 border-t border-sand">
      <Container>
        <SectionLabel n="02">Leadership</SectionLabel>
        <h2 className="display-serif mt-6 text-3xl sm:text-4xl lg:text-5xl max-w-3xl leading-[1.1]">
          How I lead.
        </h2>
        <p className="mt-5 text-lg text-smoke max-w-2xl leading-relaxed">
          Three principles that shape every product call I make. Step through them.
        </p>
        <div className="mt-10">
          <Carousel
            ariaLabel="Leadership principles"
            slideLabels={LEADERSHIP.map((p) => p.title)}
            slides={LEADERSHIP.map((p) => <LeadershipSlide key={p.n} p={p} />)}
          />
        </div>
      </Container>
    </section>
  )
}

function BlogReader({ slug, onClose }) {
  const post = POSTS[slug]
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    window.scrollTo(0, 0)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])
  if (!post) return null
  return (
    <div className="fixed inset-0 z-[100] bg-paper overflow-y-auto">
      <div className="sticky top-0 z-10 bg-paper/90 backdrop-blur-md border-b border-sand">
        <Container className="h-14 flex items-center justify-between">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 text-sm text-ink hover:text-accent transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to portfolio
          </button>
          <span className="font-serif text-sm text-ink tracking-editorial">Gatikrishna Dash</span>
        </Container>
      </div>
      <div className="blog-reader pb-24" dangerouslySetInnerHTML={{ __html: post.html }} />
    </div>
  )
}

function CaseStudyCard({ c }) {
  return (
    <a
      href={c.href}
      onClick={() => track('open_case_study', { href: c.href })}
      className="pcard p-7 sm:p-8 group"
    >
      <div className="flex items-center justify-between gap-4">
        <span className="eyebrow truncate">{c.kicker}</span>
        <span className="text-[10px] font-semibold uppercase tracking-wide-caps text-accent border border-accent/40 rounded-full px-2.5 py-1 flex-shrink-0">
          {c.kind}
        </span>
      </div>

      <h3 className="display-serif text-xl sm:text-2xl text-ink leading-[1.2] mt-5 group-hover:text-accent transition-colors">
        {c.title}
      </h3>

      <p className="mt-4 text-[15px] text-smoke leading-relaxed">{c.excerpt}</p>

      <ul className="mt-6 flex flex-wrap gap-2">
        {c.tags.map((t) => (
          <li
            key={t}
            className="rounded-full border border-sand px-3 py-1 font-mono text-[11px] text-ink-soft"
          >
            {t}
          </li>
        ))}
      </ul>

      <span className="mt-auto pt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent group-hover:gap-3 transition-all">
        Explore case <ArrowUpRight className="h-4 w-4" />
      </span>
    </a>
  )
}

function CaseStudies() {
  return (
    <section id="case-studies" className="py-16 sm:py-24 border-t border-sand">
      <Container>
        <SectionLabel n="07">Case studies</SectionLabel>
        <h2 className="display-serif mt-6 text-3xl sm:text-4xl lg:text-5xl max-w-3xl leading-[1.1]">
          Interactive deep-dives.
        </h2>
        <p className="mt-5 text-lg text-smoke max-w-2xl leading-relaxed">
          How I frame a problem, scope it for governance, and design AI that has to clear an audit. Each one opens end to end.
        </p>

        <div className="mt-10">
          <CardCarousel
            ariaLabel="Case studies"
            items={CASE_STUDIES}
            itemKey={(c) => c.href}
            cardClass="w-[86%] sm:w-[64%] lg:w-[52%]" 
            renderItem={(c) => <CaseStudyCard c={c} />}
          />
        </div>

        <a
          href="/case-studies.html"
          className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:gap-3 transition-all"
        >
          All case studies <ArrowUpRight className="h-4 w-4" />
        </a>
      </Container>
    </section>
  )
}

function FeatureBlogCard({ b, onOpen }) {
  return (
    <button
      type="button"
      onClick={() => {
        track('open_blog', { slug: b.slug })
        onOpen(b.slug)
      }}
      className="pcard w-full grid lg:grid-cols-[1.05fr_1fr] group"
    >
      <div className="pcard-media aspect-[16/10] lg:aspect-auto">
        <img src={b.cover} alt="" loading="lazy" />
      </div>
      <div className="p-7 sm:p-10 lg:p-12 flex flex-col justify-center">
        <span className="text-[11px] font-semibold uppercase tracking-wide-caps text-accent">
          {b.topic}
        </span>
        <h3 className="display-serif text-2xl sm:text-3xl lg:text-[38px] text-ink leading-[1.08] mt-3 group-hover:text-accent transition-colors">
          {b.title}
        </h3>
        <p className="mt-4 text-base sm:text-lg text-smoke leading-relaxed">{b.excerpt}</p>
        <div className="mt-6 flex items-center gap-2.5 text-sm text-dust">
          <img
            src={LINKS.photo}
            alt=""
            className="h-6 w-6 rounded-full object-cover border border-sand"
          />
          <span className="text-ink-soft">Gatikrishna Dash</span>
          <span aria-hidden="true">·</span>
          <span>{b.date}</span>
          <span aria-hidden="true">·</span>
          <span>{b.read}</span>
        </div>
        <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-accent group-hover:gap-3 transition-all">
          Read essay <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </button>
  )
}

function BlogCard({ b, onOpen }) {
  return (
    <button
      type="button"
      onClick={() => {
        track('open_blog', { slug: b.slug })
        onOpen(b.slug)
      }}
      className="pcard w-full group"
    >
      <div className="pcard-media">
        <img src={b.cover} alt="" loading="lazy" />
      </div>
      <div className="flex flex-1 flex-col p-7 sm:p-8">
        <span className="text-[11px] font-semibold uppercase tracking-wide-caps text-accent">
          {b.topic}
        </span>
        <h3 className="display-serif text-xl sm:text-2xl text-ink leading-[1.18] mt-3 group-hover:text-accent transition-colors">
          {b.title}
        </h3>
        <p className="mt-4 text-[15px] text-smoke leading-relaxed">{b.excerpt}</p>
        <div className="mt-6 flex items-center gap-2.5 text-sm text-dust">
          <img
            src={LINKS.photo}
            alt=""
            className="h-6 w-6 rounded-full object-cover border border-sand"
          />
          <span className="text-ink-soft">Gatikrishna Dash</span>
          <span aria-hidden="true">·</span>
          <span>{b.date}</span>
          <span aria-hidden="true">·</span>
          <span>{b.read}</span>
        </div>
        <span className="mt-auto pt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent group-hover:gap-3 transition-all">
          Read essay <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </button>
  )
}

function Blogs({ onOpen }) {
  return (
    <section id="blogs" className="py-16 sm:py-24 border-t border-sand">
      <Container>
        <SectionLabel n="08">Blogs</SectionLabel>
        <h2 className="display-serif mt-6 text-3xl sm:text-4xl lg:text-5xl max-w-3xl leading-[1.1]">
          Field notes on AI.
        </h2>
        <p className="mt-5 text-lg text-smoke max-w-2xl leading-relaxed">
          Essays on where AI product work is actually heading — written for people who have to ship it under governance, not just talk about it.
        </p>

        <div className="mt-10">
          {BLOGS.length > 1 ? (
            <CardCarousel
              ariaLabel="Essays"
              items={BLOGS}
              itemKey={(b) => b.slug}
              cardClass="w-[85%] sm:w-[58%] lg:w-[42%]"
              renderItem={(b) => <BlogCard b={b} onOpen={onOpen} />}
            />
          ) : (
            // One essay so far — a lone 42%-wide card in a 1160px row reads as a
            // mistake, so a single post gets the wide split card. The carousel
            // takes over automatically at two.
            <FeatureBlogCard b={BLOGS[0]} onOpen={onOpen} />
          )}
        </div>
      </Container>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="py-16 sm:py-24 border-t border-sand">
      <Container>
        <SectionLabel n="09">Contact</SectionLabel>

        <div className="mt-10 grid lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-7">
            <p className="inline-flex items-center gap-2 text-sm text-accent mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Currently open to AI product leadership roles
            </p>
            <h2 className="display-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.05]">
              Let&apos;s talk.
            </h2>
            <p className="mt-8 text-lg sm:text-xl text-ink leading-relaxed max-w-prose-tight font-serif">
              If you&apos;re looking to drive an AI transformation — especially where it has to clear an audit, not just a demo — I&apos;m happy to discuss.
            </p>
            <p className="mt-4 text-base sm:text-lg text-ink-soft leading-relaxed max-w-prose-tight">
              Most of my best conversations are with founders, CPOs, and CXOs at banks, fintechs, and regulated SaaS companies trying to ship AI under governance.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
              <a href={`mailto:${LINKS.email}`} className="btn-quiet font-medium">
                Start a conversation
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <dl className="divide-y divide-sand">
              <ContactRow
                icon={Mail}
                label="Email"
                value={LINKS.email}
                href={`mailto:${LINKS.email}`}
              />
              <ContactRow
                icon={Linkedin}
                label="LinkedIn"
                value="linkedin.com/in/gati-dash"
                href={LINKS.linkedin}
                external
              />
              <ContactRow
                icon={MapPin}
                label="Location"
                value={LINKS.location}
              />
            </dl>
          </div>
        </div>
      </Container>
    </section>
  )
}

function ContactRow({ icon: Icon, label, value, href, external, download }) {
  const content = (
    <>
      <div className="flex items-center gap-2.5">
        <Icon className="h-3.5 w-3.5 text-dust" />
        <span className="eyebrow">{label}</span>
      </div>
      <span className="font-serif text-xl sm:text-2xl text-ink mt-1 inline-flex items-center gap-2">
        {value}
        {href && <ArrowUpRight className="h-4 w-4 text-dust group-hover:text-accent transition-colors" />}
      </span>
    </>
  )

  if (!href) {
    return (
      <div className="py-5 flex flex-col first:pt-0">{content}</div>
    )
  }

  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      download={download ? '' : undefined}
      className="py-5 flex flex-col first:pt-0 group hover:text-accent transition-colors"
    >
      {content}
    </a>
  )
}

function Footer() {
  return (
    <footer className="border-t border-sand py-12">
      <Container>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-sm text-smoke max-w-xl leading-relaxed">
            Gatikrishna Dash — AI and platform product leadership in regulated industries.
          </p>
          <p className="text-xs text-dust">
            © {new Date().getFullYear()} · Hyderabad, India
          </p>
        </div>
      </Container>
    </footer>
  )
}

// ─────────────────────────────────────────────────────────────
// ROOT
// ─────────────────────────────────────────────────────────────

function SpaceBackdrop() {
  return null
}

export default function App() {
  const [workI, setWorkI] = useState(0)
  const [openBlog, setOpenBlog] = useState(null)
  const [openWork, setOpenWork] = useState(null)

  // Hero variant: default → 21st Portfolio Hero; ?v=dark / ?v=light show the legacy comparison heroes
  const vParam =
    typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('v') : null
  const heroVariant = vParam === 'dark' ? 'dark' : vParam === 'light' ? 'light' : 'portfolio'

  // Global light/dark theme — drives the CSS-variable tokens on <html>. Default dark.
  const [theme, setTheme] = useState('dark')
  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('theme') : null
    if (saved === 'light' || saved === 'dark') setTheme(saved)
  }, [])
  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    try { localStorage.setItem('theme', theme) } catch (e) { /* ignore */ }
  }, [theme])
  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  // Reveal-on-scroll — fade each section up as it enters. Sections already
  // in view on load are shown immediately (no flash); reduced-motion opts out.
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const secs = Array.from(document.querySelectorAll('main > section'))
    if (reduce) { secs.forEach((s) => s.classList.add('reveal', 'in')); return }
    const vh = window.innerHeight
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) }
      }),
      { threshold: 0.06, rootMargin: '0px 0px -6% 0px' }
    )
    secs.forEach((s) => {
      if (s.getBoundingClientRect().top < vh * 0.92) s.classList.add('reveal', 'in')
      else { s.classList.add('reveal'); io.observe(s) }
    })
    return () => io.disconnect()
  }, [])

  return (
    <div className="relative min-h-screen">
      <div className="relative z-10">
        {/* Variant C brings its own header (hamburger + signature + theme toggle) */}
        {heroVariant !== 'portfolio' && <NavBar heroVariant={heroVariant} />}
        <main>
          {heroVariant === 'portfolio' ? (
            <PortfolioHero theme={theme} onToggleTheme={toggleTheme} workedWith={WORKED_WITH} />
          ) : heroVariant === 'light' ? (
            <HeroLight />
          ) : (
            <HeroDark />
          )}
          <TheAngle />
          <CareerArc onSelectWork={setWorkI} />
          <Leadership />
          <GovernanceToolkit />
          <Capabilities />
          <Judgment />
          <SelectedWork i={workI} onOpen={setOpenWork} />
          <CaseStudies />
          <Blogs onOpen={setOpenBlog} />
          <Contact />
        </main>
        <Footer />
      </div>
      {openBlog && <BlogReader slug={openBlog} onClose={() => setOpenBlog(null)} />}
      {openWork && <WorkReader n={openWork} onClose={() => setOpenWork(null)} />}
      <HeroSwitcher variant={heroVariant} />
      <Analytics />
    </div>
  )
}
