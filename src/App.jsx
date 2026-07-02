import React, { useState, useEffect, useRef } from 'react'
import { ArrowUpRight, Mail, Linkedin, MapPin, ArrowLeft, ArrowRight } from 'lucide-react'
import { Analytics } from '@vercel/analytics/react'
import { track } from '@vercel/analytics'

// ─────────────────────────────────────────────────────────────
// CONTENT — edit copy here without touching JSX
// ─────────────────────────────────────────────────────────────

const NAV = [
  { id: 'profile', label: 'Profile' },
  { id: 'career', label: 'Career' },
  { id: 'leadership', label: 'Leadership' },
  { id: 'toolkit', label: 'Toolkit' },
  { id: 'capabilities', label: 'Capabilities' },
  { id: 'judgment', label: 'Judgment' },
  { id: 'work', label: 'Work' },
  { id: 'contact', label: 'Contact' },
]

const PROOF_LINES = [
  'Building production AI in a money-touching, regulated environment — agentic automation, evals, and governance — at PayPal. 17+ years of platform depth is the moat.',
  'Led AI automation across compliance ops in 5 jurisdictions: manual review down 60%, turnaround halved — and the numbers held two quarters past launch.',
  'Built the platform layer the AI now runs on — scaled one regulatory-reporting system from 0 to 60+ reports, 3 markets onboarded in a quarter.',
]

const WORK = [
  {
    n: '01',
    title: 'Agentic AI for compliance review at PayPal',
    meta: 'LLM agents · 5 jurisdictions · 2023–2025',
    context:
      'Compliance review queues across 5 jurisdictions were running 4+ days behind. The business wanted to add headcount; the regulator wanted faster turnaround. The team was caught between both.',
    move:
      'We replaced the manual triage step with LLM agents that did the structured extraction and first-pass policy mapping, then routed everything policy-sensitive to a human reviewer with the agent’s reasoning attached. Every agent call went through schema validation before it touched the queue. We shipped in shadow mode for six weeks before any decision was acted on.',
    proves:
      'The hard part was not the agents. It was wiring every agent call through a validator and a human override path before the first one shipped, not after the first incident.',
    metrics: [
      { v: '60%', l: 'Reduction in manual review volume' },
      { v: '2 days → 8 hrs', l: 'Median case turnaround' },
      { v: '5', l: 'Jurisdictions live' },
      { v: '6 weeks', l: 'Shadow mode before go-live' },
    ],
  },
  {
    n: '02',
    title: 'One regulatory reporting platform instead of sixty',
    meta: 'Platform consolidation · 2020–2023',
    context:
      'We were building one tool per regulator. Each report took roughly a quarter to onboard, and the team was spending more time maintaining than shipping. Brexit and a handful of new mandates were about to make the maintenance load worse.',
    move:
      'I led the case for a single platform with a common report-onboarding lifecycle. The hard work was not the engineering. It was talking three product groups and two ops teams into giving up their per-jurisdiction tooling. We shipped the platform in 14 months and onboarded 60+ reports onto it over the following two years.',
    proves:
      'New reports went from a quarter to about two weeks. More importantly, the platform is now where the AI augmentation plugs in cleanly — validation, narrative generation, agent-assisted review — instead of needing one integration per legacy tool.',
    metrics: [
      { v: '60+', l: 'Reports onboarded' },
      { v: '3 markets', l: 'Live in 3 months once platform was up' },
      { v: '80%', l: 'Reduction in per-report onboarding time' },
      { v: '14 months', l: 'Platform build to v1' },
    ],
  },
  {
    n: '03',
    title: 'Compliance reporting as a go-to-market unlock',
    meta: 'AML · SAR · Crypto reporting · 2018–2021',
    context:
      'Two new markets — China payments and US crypto — were blocked on missing AML and jurisdiction-specific reporting infrastructure. The business was treating compliance as a launch tax. The launches kept slipping.',
    move:
      'I delivered the AML and SAR reporting capabilities, the online-payments expansion support in China, and the crypto-transfer reporting infrastructure in the US. I also sat on the Go/No-Go forums for both launches and rewrote how compliance scope was estimated up-front, so future launches did not slip on the same surprises.',
    proves:
      'Compliance reporting infrastructure is not a launch tax. It is the cleanest path into a new market, and now the cleanest foundation for AI-driven risk detection on top of it.',
    metrics: [
      { v: '~$4B', l: 'Revenue opportunity unlocked across two markets' },
      { v: 'AML · SAR · Crypto', l: 'Capabilities shipped' },
      { v: '2 launches', l: 'Off the slip list' },
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

function NavBar() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-paper/85 backdrop-blur-md border-b border-sand/60">
      <Container className="h-16 flex items-center justify-between">
        <a href="#profile" className="flex items-center gap-2.5 font-serif text-lg text-ink tracking-editorial hover:text-accent transition-colors">
          <span className="nav-rocket" aria-hidden="true">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2c3.5 4 5 8 4 14H8c-1-6 .5-10 4-14Z" fill="#240e00"/>
              <path d="M8 16l-3 4 4-1m6-3l3 4-4-1" stroke="#240e00" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="9" r="1.8" fill="#FF9E2C"/>
            </svg>
          </span>
          Gatikrishna Dash
        </a>
        <div className="flex items-center gap-5 sm:gap-7">
          <nav className="hidden md:flex items-center gap-7">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={n.href || `#${n.id}`}
                className="text-sm text-smoke hover:text-ink transition-colors"
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
      <div className="hero-trajectory hidden lg:block" aria-hidden="true">
        <svg className="absolute right-0 top-8 w-[42vw] max-w-[620px] h-auto opacity-50" viewBox="0 0 600 440" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M-20 430 C 170 410, 360 280, 478 70" stroke="url(#traj)" strokeWidth="1.5" strokeDasharray="5 8" fill="none" />
          <circle cx="-10" cy="424" r="3" fill="#FF8A3D" />
          <g className="rocket-bob" transform="translate(458 38) rotate(38)">
            <path d="M0 -16 C7 -4 8 10 5 22 H-5 C-8 10 -7 -4 0 -16 Z" fill="#E9ECF7" />
            <circle cx="0" cy="-2" r="3.4" fill="#070B1A" stroke="#5BD6E8" strokeWidth="1.2" />
            <path d="M-5 16 L-12 28 L-5 23 Z" fill="#FF5E3A" />
            <path d="M5 16 L12 28 L5 23 Z" fill="#FF5E3A" />
            <path d="M-3 22 C-2 32 0 40 0 40 C0 40 2 32 3 22 Z" fill="#FF9E2C" />
          </g>
          <defs>
            <linearGradient id="traj" x1="0" y1="440" x2="500" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#FF5E3A" stopOpacity="0.05" />
              <stop offset="1" stopColor="#5BD6E8" stopOpacity="0.75" />
            </linearGradient>
          </defs>
        </svg>
      </div>
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

function SelectedWork() {
  const [i, setI] = useState(0)
  const total = WORK.length
  const w = WORK[i]
  const go = (d) => setI((i + d + total) % total)
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
          <div className="flex items-center justify-between gap-4 border-t border-sand pt-5">
            <div className="flex items-baseline gap-4 min-w-0">
              <span className="font-serif text-4xl sm:text-5xl text-accent leading-none">{w.n}</span>
              <span className="eyebrow truncate">{w.meta}</span>
            </div>
            <div className="flex items-center gap-4 flex-shrink-0">
              <span className="text-sm text-dust tabular-nums">
                {String(i + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </span>
              <button
                onClick={() => go(-1)}
                aria-label="Previous case"
                className="h-9 w-9 rounded-full border border-sand flex items-center justify-center text-ink hover:border-accent hover:text-accent transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => go(1)}
                aria-label="Next case"
                className="h-9 w-9 rounded-full border border-sand flex items-center justify-center text-ink hover:border-accent hover:text-accent transition-colors"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div key={w.n} className="work-fade grid lg:grid-cols-12 gap-y-6 gap-x-12 mt-6">
            <div className="lg:col-span-8">
              <h3 className="display-serif text-2xl sm:text-3xl leading-[1.15] max-w-prose-wide">
                {w.title}
              </h3>
              <div className="mt-5 space-y-4 max-w-prose-wide">
                <Paragraph label="Context" body={w.context} />
                <Paragraph label="What I did" body={w.move} />
                <Paragraph label="What I would tell the next team" body={w.proves} accent />
              </div>
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

          <div className="mt-8 flex items-center gap-2">
            {WORK.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                aria-label={`Go to case ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all ${i === idx ? 'w-7 bg-accent' : 'w-1.5 bg-sand hover:bg-dust'}`}
              />
            ))}
          </div>
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

function Capabilities() {
  const [tab, setTab] = useState(0)
  const c = CAPABILITIES[tab]
  return (
    <section id="capabilities" className="py-16 sm:py-24 border-t border-sand">
      <Container>
        <SectionLabel n="04">Capabilities</SectionLabel>
        <h2 className="display-serif mt-6 text-3xl sm:text-4xl lg:text-5xl max-w-3xl leading-[1.1]">
          What I actually do.
        </h2>
        <p className="mt-5 text-lg text-smoke max-w-2xl leading-relaxed">
          Four areas I spend my time on. Select one for the concrete work underneath.
        </p>

        <div className="mt-12 flex flex-wrap gap-2.5">
          {CAPABILITIES.map((x, idx) => (
            <button
              key={x.group}
              onClick={() => setTab(idx)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors border ${
                tab === idx
                  ? 'bg-accent text-paper border-accent'
                  : 'bg-paper text-ink-soft border-sand hover:border-accent-soft hover:text-accent'
              }`}
            >
              {x.group}
            </button>
          ))}
        </div>

        <div key={c.group} className="work-fade mt-10 grid lg:grid-cols-12 gap-y-8 gap-x-16 border-t border-sand pt-10">
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
      </Container>
    </section>
  )
}

function Judgment() {
  const [i, setI] = useState(0)
  const total = JUDGMENT.length
  const j = JUDGMENT[i]
  const go = (d) => setI((i + d + total) % total)
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

        <div className="mt-12 max-w-prose-wide">
          <div className="flex items-center justify-between border-t border-sand pt-6">
            <span className="font-serif text-4xl sm:text-5xl text-accent leading-none">{j.n}</span>
            <div className="flex items-center gap-4">
              <span className="text-sm text-dust tabular-nums">
                {String(i + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </span>
              <button
                onClick={() => go(-1)}
                aria-label="Previous"
                className="h-9 w-9 rounded-full border border-sand flex items-center justify-center text-ink hover:border-accent hover:text-accent transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => go(1)}
                aria-label="Next"
                className="h-9 w-9 rounded-full border border-sand flex items-center justify-center text-ink hover:border-accent hover:text-accent transition-colors"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div key={j.n} className="judgment-fade">
            <h3 className="font-serif text-2xl sm:text-3xl text-ink tracking-editorial mt-8 leading-snug min-h-[2.6em]">
              {j.title}
            </h3>
            <dl className="mt-7 space-y-4 text-base leading-relaxed">
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

          <div className="mt-10 flex items-center gap-2">
            {JUDGMENT.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                aria-label={`Go to ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all ${i === idx ? 'w-7 bg-accent' : 'w-1.5 bg-sand hover:bg-dust'}`}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

function GovernanceToolkit() {
  const TABS = [...GOVERNANCE_TOOLKIT, { group: 'Operating beliefs', beliefs: POV_IDEAS }]
  const [tab, setTab] = useState(0)
  const t = TABS[tab]
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

        <div className="mt-12 flex flex-wrap gap-2.5">
          {TABS.map((x, idx) => (
            <button
              key={x.group}
              onClick={() => setTab(idx)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors border ${
                tab === idx
                  ? 'bg-accent text-paper border-accent'
                  : 'bg-paper text-ink-soft border-sand hover:border-accent-soft hover:text-accent'
              }`}
            >
              {x.group}
            </button>
          ))}
        </div>

        <div key={t.group} className="work-fade mt-10 border-t border-sand pt-10">
          {t.beliefs ? (
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
          )}
        </div>
      </Container>
    </section>
  )
}

function CompanyLogo({ name }) {
  const [failed, setFailed] = useState(false)
  const slug = name.toLowerCase().replace(/\s+/g, '-')
  if (failed) {
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

function CareerArc() {
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
              className="career-card relative flex flex-col h-full rounded-xl border border-sand border-t-2 border-t-accent bg-paper p-5 pt-6"
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
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

function Leadership() {
  const [flipped, setFlipped] = useState(null)
  return (
    <section id="leadership" className="py-16 sm:py-24 border-t border-sand">
      <Container>
        <SectionLabel n="02">Leadership</SectionLabel>
        <h2 className="display-serif mt-6 text-3xl sm:text-4xl lg:text-5xl max-w-3xl leading-[1.1]">
          How I lead.
        </h2>
        <p className="mt-5 text-lg text-smoke max-w-2xl leading-relaxed">
          Three principles that shape every product call I make. Select one to read it.
        </p>
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {LEADERSHIP.map((p, i) => (
            <button
              key={p.n}
              type="button"
              onClick={() => setFlipped(flipped === i ? null : i)}
              aria-pressed={flipped === i}
              className={`lead-card ${flipped === i ? 'is-flipped' : ''}`}
            >
              <div className="lead-inner">
                <div className="lead-face lead-front">
                  <span className="font-serif text-base text-accent">{p.n}</span>
                  <h3 className="display-serif text-2xl sm:text-[27px] text-ink leading-[1.15] mt-5">
                    {p.title}
                  </h3>
                  <span className="lead-hint">
                    Read <span className="lead-arrow">→</span>
                  </span>
                </div>
                <div className="lead-face lead-back">
                  <p className="text-base text-ink-soft leading-relaxed">{p.body}</p>
                  <span className="lead-hint">← Back</span>
                </div>
              </div>
            </button>
          ))}
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
              Currently open to AI product leadership roles
            </p>
            <h2 className="display-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.05]">
              Let&apos;s talk.
            </h2>
            <p className="mt-8 text-lg sm:text-xl text-ink-soft leading-relaxed max-w-prose-tight">
              Most useful conversations I have are with founders, CPOs and CXOs at banks, fintechs, and regulated SaaS companies trying to ship AI under governance. If that sounds like your problem, email me.
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
  return (
    <div className="space-backdrop" aria-hidden="true">
      <div className="starfield" />
      <div className="starfield layer-2" />
    </div>
  )
}

function CaseBanner() {
  return (
    <section id="casestudies" className="py-16 sm:py-24 border-t border-sand">
      <Container>
        <a
          href="/case-studies.html"
          onClick={() => track('open_case_studies', { from: 'banner' })}
          className="group block rounded-2xl border border-accent bg-accent text-paper p-10 sm:p-14 transition-transform hover:-translate-y-1"
        >
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8">
            <div>
              <span className="text-[11px] uppercase tracking-wide-caps font-semibold text-paper/70">Case Studies</span>
              <h2 className="display-serif text-3xl sm:text-4xl lg:text-5xl mt-4 leading-tight max-w-2xl">
                Explore the interactive case studies.
              </h2>
              <p className="mt-4 text-lg text-paper/80 max-w-prose-tight leading-relaxed">
                Two product deep-dives — a retention agent rebuilt from generative (2024) to agentic (2026), and an agentic RegTech strategy — each interactive, each with its own discussion.
              </p>
            </div>
            <span className="inline-flex items-center gap-2 text-sm font-medium whitespace-nowrap">
              Open case studies
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </a>
      </Container>
    </section>
  )
}

export default function App() {
  return (
    <div className="relative min-h-screen">
      <SpaceBackdrop />
      <div className="relative z-10">
        <NavBar />
        <main>
          <Profile />
          <CareerArc />
          <Leadership />
          <GovernanceToolkit />
          <Capabilities />
          <Judgment />
          <SelectedWork />
          <CaseBanner />
          <Contact />
        </main>
        <Footer />
      </div>
      <Analytics />
    </div>
  )
}
