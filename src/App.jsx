import React, { useState, useEffect, useRef } from 'react'
import { ArrowUpRight, Mail, Linkedin, MapPin, ArrowLeft, ArrowRight, ChevronDown } from 'lucide-react'
import { Analytics } from '@vercel/analytics/react'
import { track } from '@vercel/analytics'
import { HeroDark, HeroLight, HeroSwitcher } from './Heroes'
import PortfolioHero from '@/components/ui/portfolio-hero'
import { Carousel } from '@/components/ui/carousel'
import { HERO_METRICS } from './siteData'
import { CardCarousel } from '@/components/ui/card-carousel'

// ─────────────────────────────────────────────────────────────
// CONTENT — edit copy here without touching JSX
// ─────────────────────────────────────────────────────────────

const NAV = [
  { id: 'work', label: 'Work' },
  { id: 'judgment', label: 'Judgment' },
  { id: 'case-studies', label: 'Case Studies' },
  { id: 'blogs', label: 'Writing' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
]


const PROOF_LINES = [
  'I build production AI where the money moves and the regulator is watching — agentic automation, evals, and governance at PayPal. Fifteen years in data and product is the moat.',
  'The agentic layer runs in live compliance operations across five jurisdictions. In production, under governance, still running well past launch.',
  'I built the platform it runs on: sixty-plus regulatory reports onboarded across three markets in three months.',
]




// Typographic wordmark strip (21st "logo cloud marquee" pattern)

const WORK = [
  {
    n: '01',
    title: 'Two market entries that were blocked on compliance data',
    meta: 'Market entry · CRR · Crypto & SAR reporting · GDPR · 2018–2021',
    kicker: '2018–2021 · Market entry',
    context:
      'PayPal wanted to sell crypto to US customers and to process payments inside China. Neither was a product problem. Both were blocked on regulatory reporting that did not exist yet, and on financial-crime data nobody fully trusted. I had just moved into a product role inside the data-engineering org, and this was the job.',
    move:
      'I stood the platform up end to end — across identity, payments, privacy, credit and crypto — and fixed the upstream data gaps before anything landed in it. On top of it I built products. Customer Risk Rating was the flagship: PayPal had been scoring users reactively, after an AML event. CRR scores every user at onboarding and continuously after, then auto-triggers the diligence that score demands. I led it with the Data Science and ML team. Alongside it came the crypto transfer reporting infrastructure the US launch needed, the SAR pipeline China required, and the privacy platform that carried GDPR across our international markets.',
    proves:
      'Compliance data is the cheapest way into a market you cannot otherwise enter. PayPal opened crypto to US customers in October 2020 under the first conditional BitLicense New York regulators ever granted, and became the first foreign company licensed to run a payments platform in China. I did not negotiate those licences. I built the reporting they were conditioned on.',
    marketNote:
      'Public record: PayPal announced US crypto buy/hold/sell on 21 October 2020; NYDFS granted its first conditional BitLicense that same month; PayPal was the first foreign firm to hold a Chinese online-payment licence, later the first with full ownership of the platform.',
    metrics: [
      { v: '24 hrs', l: 'To risk-score every new user at onboarding', proof: 'Shipped' },
      { v: '100+', l: 'Data privacy rules monitored and tracked', proof: 'Shipped' },
      { v: 'Oct 2020', l: 'US crypto launched on the reporting this platform produced', proof: 'Shipped' },
      { v: '3', l: 'Regulatory regimes the same platform carried — US, China, EU', proof: 'Shipped' },
    ],
  },
  {
    n: '02',
    title: 'One regulatory-reporting platform, not one tool per regulator',
    meta: 'Platform consolidation · 2022–2023',
    kicker: '2022–2023 · Consolidation',
    context:
      'We were building a separate tool for every regulator. The team spent more time maintaining than shipping, and post-Brexit mandates were about to make that worse.',
    move:
      'I made the case for a single platform with one report-onboarding lifecycle. The engineering was the easy half. The hard half was sitting with Legal and compliance in each jurisdiction — sometimes with the regulators themselves — and turning each ask into a requirement the whole platform could carry. One regulator’s rule has to coexist with the next without either breaking. Templates and triggering rules are configurable, so the next mandate is a config change.',
    proves:
      'The platform is now where the AI plugs in — validation, narrative generation, agent-assisted review — instead of needing one integration per legacy tool. I built the thing my later work depends on.',
    metrics: [
      { v: '60+', l: 'Regulatory reports onboarded across three markets', proof: 'Shipped' },
      { v: '3 months', l: 'To onboard all of them, enterprise-wide', proof: 'Shipped' },
      { v: '60%+', l: 'Operational efficiency gain', proof: 'Shipped' },
      { v: '80%', l: 'Reduction in reporting turnaround time', proof: 'Shipped' },
    ],
  },
  {
    n: '03',
    title: 'Agentic AI in live compliance operations',
    meta: 'Agentic AI · Human-in-the-loop · 5 jurisdictions · 2023–present',
    kicker: '2023–present · Agentic AI',
    context:
      'Compliance review queues were running behind across five jurisdictions. The business wanted headcount. The regulator wanted speed. The team was stuck between the two.',
    move:
      'I brought an agentic layer onto the platform we had already unified rather than adding people. LLM agents handle structured extraction and first-pass policy mapping. Every call is schema-validated before it reaches a queue. Anything policy-sensitive routes to a human with the agent’s reasoning attached. I designed the override path and the validator before the first agent shipped. It ran in shadow mode until we trusted it, and only then did any decision get acted on.',
    proves:
      'The agents were the easy part. What made it survive was deciding, up front, which calls the system is never allowed to make. I submitted a patent application on the agentic design.',
    metrics: [
      { v: '60%', l: 'Reduction in manual intervention', proof: 'Shipped' },
      { v: '50%', l: 'Faster processing turnaround, high-volume workflows', proof: 'Shipped' },
      { v: '5', l: 'Jurisdictions running it', proof: 'Shipped' },
      { v: 'Patent', l: 'Application filed on the agentic design — an application, not a grant', proof: 'Shipped' },
    ],
  },
]


const JUDGMENT = [
  {
    n: '01',
    title: 'When to let an agent decide, and when not to',
    tension: 'Agent throughput vs. accountability on policy-sensitive calls.',
    judgment:
      'Automate the deterministic steps. Anything policy-sensitive escalates. I build that path as a product surface, before the agents ship.',
    why: 'It kept agent speed high without quietly handing accountability to the model.',
  },
  {
    n: '02',
    title: 'Structured output is non-negotiable',
    tension: 'LLM flexibility vs. inspectability.',
    judgment:
      'Every agent call emits a JSON-schema-valid object. Validation runs before the result touches downstream code. Retries are bounded.',
    why: 'It is the difference between a prototype the team can demo and a system the regulator can inspect.',
  },  {
    n: '03',
    title: 'Build the platform before the third feature',
    tension: 'Every AI feature wants its own scaffolding. Nobody wants to fund the scaffolding.',
    judgment:
      'I build the shared layer on the second feature, not the fifth. Evals, validation, the human override path, lineage — once, in the primitives, so the next team inherits them instead of rebuilding them badly.',
    why:
      'The agentic layer I shipped only worked because a unified reporting platform already existed underneath it. Pointed at the mess that came before, the same agents would have produced a good demo and nothing an auditor would accept.',
  },

  {
    n: '04',
    title: 'Sequence around what can be governed',
    tension: 'Business urgency to ship AI vs. jurisdiction-specific compliance work.',
    judgment:
      'Roll AI out in markets where the governance work is already done, not in the markets where it would be the hardest to retrofit.',
    why: 'It avoids the post-launch retrofits that quietly consume the AI engineering budget for years.',
  },
]

const CAPABILITIES = [
  {
    group: 'AI strategy',
    blurb: 'Deciding what gets built, bought, or killed — and getting the roadmap to survive contact with production.',
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
    group: 'Adoption & enablement',
    blurb: 'Getting an organisation to actually use what gets built — the half of a transformation that no platform solves for you.',
    items: [
      'CFO-sponsored AI transformation programme',
      '200+ colleagues trained',
      'Enablement inside a regulated environment',
      'Teaching that continues outside work, informally',
    ],
  },
  {
    group: 'Influence without authority',
    blurb: 'I have never had a reporting line into the people whose agreement I needed. Every decision below was won on argument and evidence.',
    items: [
      'Aligning risk, legal and compliance across regulated entities',
      'Regulator-facing work — interpreting an ask, then defending the design',
      'Go/No-Go input on launches through the Business Advisory Group',
      'Carrying one jurisdiction’s mandate without breaking the next',
    ],
  },
]


const CAREER_ARC = [
  {
    era: '01',
    theme: 'Data & BI',
    years: '2009–2018',
    title: 'Pipelines, then platforms',
    body: 'ETL and Teradata work at Wipro, then Barclays’ global banking data at Cognizant, then six years as a BI analyst inside PayPal — data visualisation, product planning, and the scanning and regulatory datasets from the Xoom and Venmo acquisitions.',
    tools: ['Teradata', 'Informatica', 'Tableau', 'SQL'],
    companies: ['Wipro', 'Cognizant', 'Altimetrik', 'PayPal'],
    instinct: 'Where I learned to distrust any roadmap that skips the data layer.',
  },
  {
    era: '02',
    theme: 'Product Manager',
    years: '2018–2023',
    title: 'Compliance & regulatory platforms',
    body: 'My first product role, in 2018, inside the data-engineering org. Customer risk rating, AML and SAR reporting, GDPR privacy, crypto transfer reporting — and the market entries those unlocked. Then the consolidation of it all into one regulatory-reporting platform.',
    tools: ['AML', 'SAR', 'GDPR', 'KYC'],
    companies: ['PayPal'],
    instinct: 'Where data work turned into platform product work.',
    workIndex: 0,
  },
  {
    era: '03',
    theme: 'Lead Product Manager',
    years: '2023–present',
    title: 'AI & agentic systems',
    body: 'Leading AI product work at PayPal — turning the compliance workflows I used to platform-ify into governed, agent-driven systems. Alongside it, a CFO-sponsored transformation programme: 200+ colleagues taught to use AI inside a regulated environment.',
    tools: ['LLM agents', 'Evals', 'Governance', 'Enablement'],
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
      { title: 'Audit-ready artifacts', body: 'Outputs built to be inspected later, by someone who was not in the room.' },
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
  { v: '25–40%', l: 'Lift in merchant lifetime value — published industry benchmark, not mine', proof: 'Concept' },
  { v: '−60%', l: 'Churn reduction from early intervention — published benchmark, not mine', proof: 'Concept' },
  { v: '4', l: 'Lifecycle segments with tailored playbooks', proof: 'Concept' },
  { v: '0', l: 'Manual playbooks to maintain — all generated', proof: 'Concept' },
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
  'In regulated work, governance belongs in the product spec. Bolt it on at the launch gate and you will rebuild.',
  'Human review is a designed surface. If you discover it after launch as a queue, you designed it wrong.',
  'LLM systems need schema validation, retries and failure paths from the first call. Most teams add them after the first incident instead.',
  'The most valuable AI products improve operating discipline. Productivity gains follow.',
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
    title: 'Agentic AI in live compliance operations',
    kicker: '2023–present · PayPal · Shipped',
    excerpt:
      'The one that actually runs. An agentic layer on top of the regulatory platform I had already consolidated: schema-validated extraction, first-pass policy mapping, and a human gate on every call that carries policy consequence. Five jurisdictions, in production.',
    href: '/agentic-compliance-case-study.html',
    tags: [
      { t: '60% less manual intervention', proof: 'Shipped' },
      { t: '5 jurisdictions', proof: 'Shipped' },
    ],
    kind: 'Shipped',
  },
  {
    n: '02',
    title: 'Meridian — Agentic Regulatory-Change Intelligence',
    kicker: 'Agentic · RegTech · Concept',
    excerpt:
      'An agent that watches every regulator you answer to, maps each change to the specific internal controls it breaks, and hands a compliance officer a defensible package to sign. Never a chatbot that answers questions about the law.',
    href: '/meridian-case-study.html',
    tags: [
      { t: 'AUSTRAC / MAS / CSSF', proof: 'Concept' },
      { t: '~150 alerts a day', proof: 'Concept' },
      { t: 'Never built', proof: 'Concept' },
    ],
    kind: 'Concept',
  },
  {
    n: '03',
    title: 'Retention, Rebuilt: Generative → Agentic',
    kicker: '2024 → 2026 · Retention · Concept',
    excerpt:
      "The 2024 version generated a playbook from a merchant's signals. The 2026 rebuild runs the loop — an accountable retention agent with tiered autonomy, always-on guardrails, and a human gate on every action that touches money.",
    href: '/merchant-retention-case-study.html',
    tags: [
      { t: '3 autonomy tiers', proof: 'Concept' },
      { t: 'Synthetic merchants', proof: 'Concept' },
      { t: 'Never built', proof: 'Concept' },
    ],
    kind: 'Concept',
  },
]


const ARTIFACTS = [
  {
    slug: 'validated-agent-call',
    title: "The Validated Agent Call",
    stack: 'JSON Schema · Python',
    body: "The schema a regulatory-impact call has to satisfy, the repair loop when it doesn\u2019t, and abstention treated as a real answer.",
  },
  {
    slug: 'eval-rubric',
    title: "An Eval Rubric That Can Say No",
    stack: 'Rubric · Scorer',
    body: "Eight dimensions, four of them blocking. Includes a worked scorecard that fails and stops the ship.",
  },
  {
    slug: 'escalation-matrix',
    title: "The Escalation Matrix",
    stack: 'Policy · Router',
    body: "Who decides what, by when, and what the system does when nobody answers. It fails closed.",
  },
  {
    slug: 'shadow-mode-readout',
    title: "The Shadow Mode Readout",
    stack: 'Template · Metrics',
    body: "What I measure before an agent is allowed to touch anything \u2014 including the disagreement taxonomy that matters more than the agreement rate.",
  },
]

const LINKS = {
  email: 'gati4dash@gmail.com',
  linkedin: 'https://www.linkedin.com/in/gati-dash',
  resume: '/GatiDash_Resume.pdf', // file lives in /public
  photo: '/profile-avatar.webp',
  location: 'Hyderabad, India',
}

// ─────────────────────────────────────────────────────────────
// PRIMITIVES
// ─────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────
// PROVENANCE
// Every number on this site carries one of three labels. The
// convention is explained once, in the footer.
//   Shipped  — measured in production
//   Modeled  — a projection built on real data
//   Concept  — illustrative; this one was never built
// ─────────────────────────────────────────────────────────────
const PROOF_STYLE = {
  Shipped: 'text-accent border-accent/45',
  Modeled: 'text-plasma border-plasma/45',
  Concept: 'text-dust border-sand',
}

function Proof({ level, className = '' }) {
  if (!level) return null
  return (
    <span
      title={PROOF_TITLE[level]}
      className={`inline-block align-middle rounded-full border px-1.5 py-px font-mono text-[9px] uppercase tracking-[0.11em] leading-[1.5] whitespace-nowrap ${
        PROOF_STYLE[level] || PROOF_STYLE.Concept
      } ${className}`}
    >
      {level}
    </span>
  )
}

const PROOF_TITLE = {
  Shipped: 'Measured in production.',
  Modeled: 'A projection built on real data. Nobody measured this one.',
  Concept: 'Illustrative. This system was never built.',
}


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
              Open to work where agents take consequential actions
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
            <dt className="font-serif text-xl text-ink leading-none">
              {m.v} <Proof level={m.proof} className="ml-1" />
            </dt>
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
                  <dt className="font-serif text-2xl sm:text-3xl text-ink leading-none">
                    {m.v} <Proof level={m.proof} className="ml-1.5" />
                  </dt>
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
        <SectionLabel n="01">Work</SectionLabel>
        <h2 className="display-serif mt-4 text-3xl sm:text-4xl max-w-3xl leading-[1.1]">
          Three pieces of work that explain how I think.
        </h2>
        <p className="mt-3 text-base text-smoke max-w-2xl leading-relaxed">
          AI that clears an audit, not just a demo — that is the hardest version of
          the problem, and it is the one I have shipped. Anonymized where it has to
          be. Each case names what shipped, what it took, and what I would tell the
          next team.
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

function DetailedCapabilities() {
  const [open, setOpen] = useState(false)
  return (
    <section id="detail" className="border-t border-sand py-12 sm:py-16">
      <Container>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="group flex w-full items-center justify-between gap-6 text-left"
        >
          <span>
            <span className="eyebrow">Reference</span>
            <span className="mt-2 block display-serif text-xl sm:text-2xl text-ink group-hover:text-accent transition-colors">
              Detailed capabilities
            </span>
          </span>
          <span className="flex-shrink-0 h-9 w-9 rounded-full border border-sand flex items-center justify-center text-ink group-hover:border-accent group-hover:text-accent transition-colors">
            <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
          </span>
        </button>

        {!open && (
          <p className="mt-4 text-sm text-smoke max-w-2xl leading-relaxed">
            The full list — five capability areas and the governance controls I argue for. Open it
            if you want the detail; the work above is the argument.
          </p>
        )}

        {open && (
          <div className="mt-10 space-y-14">
            <div>
              <div className="eyebrow mb-6">What I do</div>
              <div className="grid gap-x-12 gap-y-9 md:grid-cols-2">
                {CAPABILITIES.map((c) => (
                  <div key={c.group}>
                    <h3 className="display-serif text-lg text-ink leading-snug">{c.group}</h3>
                    <p className="mt-2 text-sm text-smoke leading-relaxed max-w-prose-tight">{c.blurb}</p>
                    <ul className="mt-4 space-y-2">
                      {c.items.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-sm text-ink-soft leading-snug">
                          <span className="mt-1.5 h-1 w-1 rounded-full bg-accent flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="eyebrow mb-6">Controls I argue for</div>
              <div className="grid gap-x-12 gap-y-9 md:grid-cols-2">
                {GOVERNANCE_TOOLKIT.map((t) => (
                  <div key={t.group}>
                    <h3 className="display-serif text-lg text-ink leading-snug">{t.group}</h3>
                    <dl className="mt-4 space-y-3">
                      {t.items.map((item) => (
                        <div key={item.title}>
                          <dt className="font-serif text-[15px] text-ink tracking-editorial">{item.title}</dt>
                          <dd className="mt-1 text-sm text-ink-soft leading-relaxed">{item.body}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                ))}
              </div>
              <ol className="mt-10 grid sm:grid-cols-2 gap-x-12 gap-y-4">
                {POV_IDEAS.map((idea, k) => (
                  <li key={k} className="flex items-start gap-4">
                    <span className="font-serif text-sm text-accent mt-0.5 w-6 flex-shrink-0">
                      {String(k + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm text-ink-soft leading-relaxed">{idea}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}
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
        <SectionLabel n="03">Judgment</SectionLabel>
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

function About({ onSelectWork }) {
  return (
    <section id="about" className="py-16 sm:py-24 border-t border-sand">
      <Container>
        <SectionLabel n="06">About</SectionLabel>
        <h2 className="display-serif mt-6 text-3xl sm:text-4xl lg:text-5xl max-w-4xl leading-[1.08]">
          I don&apos;t come at product from the feature side. I come from the launch side.
        </h2>

        <div className="mt-8 grid lg:grid-cols-12 gap-8 lg:gap-16">
          <p className="lg:col-span-7 text-lg text-ink-soft leading-relaxed max-w-prose-wide">
            For two years I sat on PayPal&apos;s Business Advisory Group, shaping go/no-go calls on
            new launches. Before that and ever since, I&apos;ve been building the layer those calls
            depend on — one source of truth for product, customer and transaction data that audit
            and compliance can actually use.
          </p>
          <p className="lg:col-span-5 text-base text-ink-soft leading-relaxed">
            Get AML or crypto disclosure wrong in global payments and it&apos;s a regulatory event,
            not a bug ticket. Regulators like Australia&apos;s AUSTRAC have fined major banks
            hundreds of millions for exactly these gaps.
          </p>
        </div>

        <p className="mt-9 display-serif text-xl sm:text-2xl text-ink max-w-prose-wide leading-snug">
          That&apos;s why I can tell which AI products survive contact with a regulator.
        </p>

        <div className="mt-12 border-t border-sand pt-10">
          <div className="eyebrow mb-5">What I actually learned doing it</div>
          <p className="display-serif text-2xl sm:text-3xl text-ink max-w-prose-wide leading-[1.25]">
            Put an agent next to a human process and the first thing you find is
            that the humans never agreed with each other either.
          </p>
          <p className="mt-6 text-lg text-ink-soft leading-relaxed max-w-prose-wide">
            I ran the agent alongside the humans expecting to learn how good the agent
            was. What I got was a map of where the humans diverged from each other. On the
            genuinely ambiguous obligations, two reviewers would reach two defensible answers
            and both would file. Nobody was wrong. Nobody had ever looked.
          </p>
          <p className="mt-5 text-lg text-ink-soft leading-relaxed max-w-prose-wide">
            It changed how I start. I now measure how much the humans agree before I
            build anything, because that number is the ceiling on what any agent can
            score. It is why reviewer agreement is a blocking gate in my eval rubric,
            and why I think AI in regulated work pays first by measuring the process
            it was hired to replace.
          </p>
        </div>

        <CareerArc onSelectWork={onSelectWork} />
      </Container>
    </section>
  )
}


function CareerArc({ onSelectWork }) {
  return (
    <div id="career" className="mt-16 sm:mt-20 border-t border-sand pt-12">
      <div className="eyebrow mb-4">How I got here</div>
        <p className="text-base text-smoke max-w-2xl leading-relaxed">
          Data engineering, then regulatory platforms, then AI. Each one is the reason the next
          one worked.
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
    </div>
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


function BlogReader({ slug, onClose }) {
  // The essay is ~25KB of HTML string. Loading it with the app made every
  // visitor pay for a page most of them never open.
  const [post, setPost] = useState(null)
  useEffect(() => {
    let live = true
    import('./blogPosts').then((m) => {
      if (live) setPost(m.POSTS[slug] || null)
    })
    return () => {
      live = false
    }
  }, [slug])
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
      {post ? (
        <div className="blog-reader pb-24" dangerouslySetInnerHTML={{ __html: post.html }} />
      ) : (
        <Container className="py-24">
          <p className="eyebrow">Loading the essay…</p>
        </Container>
      )}
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
        {c.tags.map((tag) => (
          <li
            key={tag.t}
            className="inline-flex items-center gap-2 rounded-full border border-sand px-3 py-1 font-mono text-[11px] text-ink-soft"
          >
            {tag.t}
            <Proof level={tag.proof} />
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
        <SectionLabel n="04">Case studies</SectionLabel>
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
            width="24"
            height="24"
            loading="lazy"
            decoding="async"
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
            width="24"
            height="24"
            loading="lazy"
            decoding="async"
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

function Artifacts() {
  return (
    <section id="artifacts" className="py-16 sm:py-24 border-t border-sand">
      <Container>
        <SectionLabel n="02">Artifacts</SectionLabel>
        <h2 className="display-serif mt-6 text-3xl sm:text-4xl lg:text-5xl max-w-3xl leading-[1.1]">
          The actual objects.
        </h2>
        <p className="mt-5 text-lg text-smoke max-w-2xl leading-relaxed">
          Anyone can say they design governed agents. These are four of the artifacts that work
          produces — the schema, the rubric, the routing matrix, the pre-launch readout. Read them
          and decide for yourself.
        </p>
        <p className="mt-4 text-sm text-dust max-w-2xl leading-relaxed">
          Reference implementations, written against my own concept systems — Meridian and the
          retention agent. I can’t publish my employer’s code, so I wrote these from scratch to
          show the reasoning.
        </p>

        <ul className="mt-10 grid gap-px bg-sand border border-sand sm:grid-cols-2">
          {ARTIFACTS.map((a, i) => (
            <li key={a.slug} className="bg-paper">
              <a href={`/artifact-${a.slug}.html`} className="group flex h-full flex-col p-7 sm:p-8 transition-colors hover:bg-paper-dark">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="font-serif text-sm text-accent">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-wide-caps text-dust">
                    {a.stack}
                  </span>
                </div>
                <h3 className="display-serif text-xl text-ink leading-snug mt-4 group-hover:text-accent transition-colors">
                  {a.title}
                </h3>
                <p className="mt-3 text-[15px] text-smoke leading-relaxed">{a.body}</p>
                <span className="mt-auto pt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent group-hover:gap-3 transition-all">
                  Read it <ArrowUpRight className="h-4 w-4" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}

function Blogs({ onOpen }) {
  return (
    <section id="blogs" className="py-16 sm:py-24 border-t border-sand">
      <Container>
        <SectionLabel n="05">Writing</SectionLabel>
        <h2 className="display-serif mt-6 text-3xl sm:text-4xl lg:text-5xl max-w-3xl leading-[1.1]">
          Field notes on AI.
        </h2>
        <p className="mt-5 text-lg text-smoke max-w-2xl leading-relaxed">
          Essays on where AI product work is actually heading — written for the people who have to ship it under governance.
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
        <SectionLabel n="07">Contact</SectionLabel>

        <div className="mt-10 grid lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-7">
            <p className="inline-flex items-center gap-2 text-sm text-accent mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Open to work where agents take consequential actions
            </p>
            <h2 className="display-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.05]">
              Let&apos;s talk.
            </h2>
            <p className="mt-8 text-lg sm:text-xl text-ink leading-relaxed max-w-prose-tight font-serif">
              If you are putting agents somewhere the mistakes are expensive, I have
              done that and I have the scars to show for it.
            </p>
            <p className="mt-4 text-base sm:text-lg text-ink-soft leading-relaxed max-w-prose-tight">
              The work generalises past compliance. If you are letting an agent take actions that are expensive to undo — refunds, pricing, merges to main, anything with a blast radius — the problems are the same ones. Those are my favourite conversations.
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
        <div className="border-b border-sand pb-8 mb-8">
          <div className="eyebrow mb-4">How to read the numbers</div>
          <p className="text-sm text-smoke max-w-2xl leading-relaxed">
            Every figure on this site carries one of three labels, and the label travels
            with the number wherever it appears.
          </p>
          <dl className="mt-5 grid gap-x-10 gap-y-4 sm:grid-cols-3 max-w-3xl">
            <div>
              <dt><Proof level="Shipped" /></dt>
              <dd className="mt-2 text-sm text-ink-soft leading-relaxed">
                Measured in production, on a system real people used.
              </dd>
            </div>
            <div>
              <dt><Proof level="Modeled" /></dt>
              <dd className="mt-2 text-sm text-ink-soft leading-relaxed">
                A projection built on real data. Nobody measured this one.
              </dd>
            </div>
            <div>
              <dt><Proof level="Concept" /></dt>
              <dd className="mt-2 text-sm text-ink-soft leading-relaxed">
                Illustrative. The system was designed but never built.
              </dd>
            </div>
          </dl>
          <p className="mt-6 text-sm text-smoke max-w-2xl leading-relaxed">
            Figures from my time at PayPal come from my résumé and from what I can say
            publicly. They are point estimates without intervals, which is a weaker standard than the
            one my own evals hold. Read them as the résumé claims they are, and ask me for the
            baseline and the denominator. Where I could not substantiate a figure at all, I
            removed it rather than round it.
          </p>
        </div>

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
            <PortfolioHero theme={theme} onToggleTheme={toggleTheme} />
          ) : heroVariant === 'light' ? (
            <HeroLight />
          ) : (
            <HeroDark />
          )}
          <SelectedWork i={workI} onOpen={setOpenWork} />
          <Artifacts />
          <Judgment />
          <CaseStudies />
          <Blogs onOpen={setOpenBlog} />
          <About onSelectWork={setWorkI} />
          <Contact />
          <DetailedCapabilities />
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
