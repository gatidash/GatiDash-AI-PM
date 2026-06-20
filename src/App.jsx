import React, { useState, useEffect } from 'react'
import { ArrowUpRight, Mail, Linkedin, MapPin } from 'lucide-react'

// ─────────────────────────────────────────────────────────────
// CONTENT — edit copy here without touching JSX
// ─────────────────────────────────────────────────────────────

const NAV = [
  { id: 'profile', label: 'Profile' },
  { id: 'career', label: 'Career' },
  { id: 'toolkit', label: 'Toolkit' },
  { id: 'capabilities', label: 'Capabilities' },
  { id: 'judgment', label: 'Judgment' },
  { id: 'work', label: 'Work' },
  { id: 'casestudy', label: 'Case Study' },
  { id: 'contact', label: 'Contact' },
]

const PROOF_LINES = [
  '17+ years across data, regulatory platforms, and (since 2023) production AI work — at PayPal.',
  'Most recent: led AI automation across compliance ops in 5 jurisdictions. Cut manual review by 60%, halved turnaround. Numbers held for two quarters past launch.',
  'Earlier: scaled a single regulatory-reporting platform from 0 to 60+ reports, 3 markets onboarded in a quarter.',
]

const PILLARS = [
  {
    n: '01',
    title: 'AI product strategy',
    body: 'I run the AI roadmap conversation that decides what gets built, what gets bought, and what gets killed. Most of my time is spent talking teams out of features that demo well and ship poorly.',
  },
  {
    n: '02',
    title: 'Agentic workflows in regulated ops',
    body: 'Multi-step LLM systems with structured outputs, validation, retries, and a human override path. I treat the override path as part of the product, not as a ticket queue that grows after launch.',
  },
  {
    n: '03',
    title: 'AI governance and controls',
    body: 'Lineage, policy enforcement, traceability, evals. The unglamorous controls that decide whether the AI feature still exists in month six.',
  },
  {
    n: '04',
    title: 'The data layer underneath',
    body: 'I came up in data engineering, so I am suspicious of AI roadmaps that skip lineage and validation work. That layer is usually what kills the demo in production.',
  },
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
    items: [
      'AI roadmap and prioritization',
      'Build vs. buy vs. partner decisions',
      'Pilot-to-production transition',
      'Vendor selection (model + tooling)',
    ],
  },
  {
    group: 'Execution',
    items: [
      'Agentic system design',
      'Eval design and benchmarking',
      'Schema-bound output / validation',
      'Platform vs. feature trade-off calls',
    ],
  },
  {
    group: 'Governance & risk',
    items: [
      'AI risk frameworks (in-house and external)',
      'Regulator-facing design choices',
      'Human-in-the-loop UX',
      'Data lineage and traceability',
    ],
  },
  {
    group: 'Leadership',
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
    years: '2009–2014',
    title: 'Data engineering and BI',
    body: 'Teradata, Informatica, Tableau. ETL pipelines, BI reporting, lineage and governance work at Wipro and Cognizant for Lloyds and Barclays Bank. The hands-on work that everything later sits on.',
  },
  {
    era: '02',
    years: '2014–2023',
    title: 'Compliance, Privacy & Regulatory platforms',
    body: 'Compliance, Privacy and regulatory reporting platforms at PayPal. AML, SAR, GDPR, KYC, customer risk. Cross-border launch work into China and the US. The shift from individual data work into platform product leadership.',
  },
  {
    era: '03',
    years: '2023–present',
    title: 'AI and agentic systems',
    body: 'Currently leading AI product work at PayPal, focused on turning the regulatory and compliance workflows I used to platform-ify into agent-driven systems. The earlier data and platform years are what make that transition possible.',
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
    'Claude generates and refreshes playbooks on demand',
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
        <a href="#profile" className="font-serif text-lg text-ink tracking-editorial hover:text-accent transition-colors">
          Gatikrishna Dash
        </a>
        <nav className="hidden md:flex items-center gap-7">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className="text-sm text-smoke hover:text-ink transition-colors"
            >
              {n.label}
            </a>
          ))}
        </nav>
      </Container>
    </header>
  )
}

// ─────────────────────────────────────────────────────────────
// SECTIONS
// ─────────────────────────────────────────────────────────────

function Profile() {
  return (
    <section id="profile" className="relative pt-36 pb-28 sm:pt-44 sm:pb-36 lg:pt-52">
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

            <h1 className="display-serif text-5xl sm:text-6xl lg:text-7xl leading-[1.04] max-w-prose-wide">
              I lead AI and platform product work in PayPal. The kind that has to clear an audit, not just a demo.
            </h1>

            <p className="mt-8 text-xl sm:text-2xl text-smoke leading-snug max-w-prose-wide font-serif font-normal">
              Most of the last decade was compliance, risk, and regulatory reporting platforms. Most of the next is the AI-native versions of the same systems.
            </p>

            <p className="mt-10 text-base sm:text-lg text-ink-soft leading-relaxed max-w-prose-tight">
              I started in data engineering — ETL, lineage, BI — and spent the middle of my career on regulatory-reporting and AML platforms at PayPal. The AI work is the third act, and the through-line is the same: shipping systems that have to be audited, not just admired. ISB Senior Digital Leadership Programme alum; Post Graduate Certification in Product Management from Kellogg School of Management; B-Tech in Computer Science &amp; Engineering from ITER.
            </p>

            {/* Restrained proof — three short lines with hairline dividers */}
            <ul className="mt-12 max-w-prose-wide divide-y divide-sand">
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
            <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
              <a href={`mailto:${LINKS.email}`} className="btn-quiet font-medium">
                Start a conversation
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
                    ISB · Senior Digital Leadership Programme<br />
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
  return (
    <section id="work" className="py-24 sm:py-32 border-t border-sand">
      <Container>
        <SectionLabel n="05">Work</SectionLabel>
        <h2 className="display-serif mt-6 text-3xl sm:text-4xl lg:text-5xl max-w-3xl leading-[1.1]">
          Three pieces of work that explain how I think.
        </h2>
        <p className="mt-5 text-lg text-smoke max-w-2xl leading-relaxed">
          Anonymized where it has to be. The numbers are not. Each case names what shipped, what it took, and what I would tell the next team trying the same thing.
        </p>

        <div className="mt-20 space-y-24">
          {WORK.map((w, i) => (
            <article
              key={w.n}
              className={`grid lg:grid-cols-12 gap-y-10 gap-x-16 ${i > 0 ? 'pt-24 border-t border-sand' : ''}`}
            >
              {/* Left — narrative */}
              <div className="lg:col-span-8">
                <div className="flex items-baseline gap-4 mb-5">
                  <span className="font-serif text-sm text-accent">{w.n}</span>
                  <span className="eyebrow">{w.meta}</span>
                </div>

                <h3 className="display-serif text-2xl sm:text-3xl lg:text-4xl leading-[1.15] max-w-prose-wide">
                  {w.title}
                </h3>

                <div className="mt-8 space-y-6 max-w-prose-wide">
                  <Paragraph label="Context" body={w.context} />
                  <Paragraph label="What I did" body={w.move} />
                  {i === 0 && <AgenticDiagram />}
                  <Paragraph label="What I would tell the next team" body={w.proves} accent />
                </div>
              </div>

              {/* Right — metrics */}
              <aside className="lg:col-span-4 lg:pl-8 lg:border-l border-sand">
                <div className="eyebrow mb-6">Operating impact</div>
                <dl className="divide-y divide-sand">
                  {w.metrics.map((m) => (
                    <div key={m.l} className="py-4 first:pt-0">
                      <dt className="font-serif text-2xl sm:text-3xl text-ink leading-none">
                        {m.v}
                      </dt>
                      <dd className="mt-1.5 text-sm text-smoke leading-snug">{m.l}</dd>
                    </div>
                  ))}
                </dl>
              </aside>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}

function Paragraph({ label, body, accent = false }) {
  return (
    <div>
      <div className={`eyebrow mb-2 ${accent ? 'text-accent' : ''}`}>{label}</div>
      <p className={`text-base sm:text-lg leading-relaxed ${accent ? 'text-ink font-medium font-serif' : 'text-ink-soft'}`}>
        {body}
      </p>
    </div>
  )
}

function AgenticDiagram() {
  const stages = [
    { label: 'Case intake', sub: 'Regulatory case in' },
    { label: 'Extraction', sub: 'LLM agent' },
    { label: 'Policy mapping', sub: 'LLM + tools' },
    { label: 'Schema validation', sub: 'Gate' },
    { label: 'Human review', sub: 'Policy-sensitive' },
  ]
  return (
    <figure className="my-16 max-w-prose-wide" aria-label="Agentic workflow for PayPal compliance review with human review gate and continuous audit trail">
      <figcaption className="eyebrow mb-5">The architecture we shipped (Case 1, anonymized)</figcaption>

      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 sm:gap-2 items-stretch">
        {stages.map((s, i) => (
          <div key={s.label} className="relative">
            <div className="border border-sand bg-paper rounded-md px-3 py-4 h-full flex flex-col justify-center">
              <div className="font-serif text-base text-ink leading-tight">{s.label}</div>
              <div className="text-[11px] text-dust mt-1 tracking-wide">{s.sub}</div>
            </div>
            {i < stages.length - 1 && (
              <div className="hidden sm:flex absolute top-1/2 -right-1.5 -translate-y-1/2 z-10 text-accent">
                <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M0 5h10M6 1l5 4-5 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-5 grid sm:grid-cols-2 gap-4 text-sm">
        <div className="flex items-start gap-3 text-ink-soft">
          <span className="font-serif text-accent leading-tight">↳</span>
          <span><strong className="font-medium text-ink">Shadow mode</strong> ran for 6 weeks before any decision was acted on.</span>
        </div>
        <div className="flex items-start gap-3 text-ink-soft">
          <span className="font-serif text-accent leading-tight">⎯⎯</span>
          <span><strong className="font-medium text-ink">Audit trail</strong> beneath every stage; every decision logged with reasoning; agent actions reversible.</span>
        </div>
      </div>
    </figure>
  )
}

function CaseStudy() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const seg = CASE_SEGMENTS[active]

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <section id="casestudy" className="cs-section">
      <div className="cs-section-glow" aria-hidden="true" />
      <Container className="relative z-10">
        <div className="cs-eyebrow">06 // CASE FILES</div>
        <h2 className="cs-h2">Case Studies</h2>
        <p className="cs-sub">Selected build logs. Open a file to inspect the system — signals in, playbook out.</p>

        <div className="cs-grid">
          <button type="button" className="cs-card" onClick={() => setOpen(true)}>
            <span className="cs-corner tl" /><span className="cs-corner tr" /><span className="cs-corner bl" /><span className="cs-corner br" />
            <div className="cs-card-top">
              <span className="cs-status"><span className="cs-dot" /> ACTIVE</span>
              <span className="cs-tag">GENAI · RETENTION</span>
            </div>
            <div className="cs-id">FILE — MERCHANT-RETENTION-01</div>
            <h3 className="cs-card-title">From 30% Churn to Proactive Retention</h3>
            <p className="cs-card-sum">Claude turns reactive, one-size-fits-all merchant support into personalized, early-intervention retention.</p>
            <div className="cs-card-metrics">
              <div><b>−60%</b><span>churn</span></div>
              <div><b>+25–40%</b><span>LTV</span></div>
              <div><b>4</b><span>segments</span></div>
            </div>
            <div className="cs-open">OPEN FILE <span className="cs-open-arrow">▸</span></div>
          </button>
        </div>
      </Container>

      {open && (
        <div className="cs-overlay" onClick={() => setOpen(false)}>
          <div
            className="cs-window"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Case study: merchant retention"
          >
            <div className="cs-scanline" aria-hidden="true" />
            <span className="cs-corner tl big" /><span className="cs-corner tr big" /><span className="cs-corner bl big" /><span className="cs-corner br big" />
            <div className="cs-winhead">
              <span className="cs-winhead-id"><span className="cs-dot" /> CASE FILE // MERCHANT-RETENTION-01</span>
              <button className="cs-winclose" onClick={() => setOpen(false)} aria-label="Close">✕</button>
            </div>
            <div className="cs-winbody">
              <h3 className="cs-wintitle">From 30% Churn to Proactive Retention</h3>
              <p className="cs-winlede">Using Claude to turn reactive, one-size-fits-all merchant support into personalized, early-intervention retention.</p>

              <div className="cs-metrics">
                {CASE_METRICS.map((m) => (
                  <div key={m.l} className="cs-metric"><b>{m.v}</b><span>{m.l}</span></div>
                ))}
              </div>

              <div className="cs-console">
                <div className="cs-console-head">
                  <span>MERCHANT LIFECYCLE CONSOLE</span>
                  <span className="cs-blink">▌ CLAUDE-GENERATED</span>
                </div>
                <div className="cs-segs">
                  {CASE_SEGMENTS.map((s, i) => (
                    <button key={s.key} className={`cs-seg ${active === i ? 'on' : ''}`} onClick={() => setActive(i)}>
                      {s.key}
                    </button>
                  ))}
                </div>
                <div className="cs-panel">
                  <div className="cs-col">
                    <div className="cs-label">▸ DETECTED MERCHANT</div>
                    <div className="cs-merch">{seg.name}</div>
                    <p className="cs-merchdesc">{seg.desc}</p>
                    <div className="cs-label">▸ SIGNALS DETECTED</div>
                    <ul className="cs-signals">
                      {seg.signals.map((s) => (
                        <li key={s}><span className="cs-sigmark">!</span>{s}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="cs-col">
                    <div className="cs-label">▸ GENERATED PLAYBOOK</div>
                    <ol className="cs-steps">
                      {seg.steps.map((s, i) => (
                        <li key={s}><span className="cs-stepn">{i + 1}</span>{s}</li>
                      ))}
                    </ol>
                    <div className="cs-impact"><b>{seg.impactBig}</b><span>{seg.impactTxt}</span></div>
                  </div>
                </div>
              </div>

              <div className="cs-shift">
                <div className="cs-shiftcol">
                  <div className="cs-shifth red">// BEFORE — REACTIVE</div>
                  <ul>{CASE_SHIFT.before.map((x) => (<li key={x}>{x}</li>))}</ul>
                </div>
                <div className="cs-shiftcol">
                  <div className="cs-shifth green">// AFTER — PROACTIVE</div>
                  <ul>{CASE_SHIFT.after.map((x) => (<li key={x}>{x}</li>))}</ul>
                </div>
              </div>

              <div className="cs-disc">Illustrative prototype · synthetic data · figures from industry benchmarks.</div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

function Capabilities() {
  return (
    <section id="capabilities" className="py-24 sm:py-32 border-t border-sand">
      <Container>
        <SectionLabel n="03">Capabilities</SectionLabel>
        <h2 className="display-serif mt-6 text-3xl sm:text-4xl lg:text-5xl max-w-3xl leading-[1.1]">
          What I actually do.
        </h2>
        <p className="mt-5 text-lg text-smoke max-w-2xl leading-relaxed">
          Four areas I spend my time on, and the concrete capabilities underneath each.
        </p>

        {/* Lead block — the four pillars in long form */}
        <div className="mt-16 grid md:grid-cols-2 gap-y-12 gap-x-16">
          {PILLARS.map((p) => (
            <div key={p.n} className="border-t border-sand pt-6">
              <div className="flex items-baseline gap-4">
                <span className="font-serif text-sm text-accent">{p.n}</span>
                <h3 className="font-serif text-xl sm:text-2xl text-ink tracking-editorial">
                  {p.title}
                </h3>
              </div>
              <p className="mt-4 text-base text-ink-soft leading-relaxed max-w-md">
                {p.body}
              </p>
            </div>
          ))}
        </div>

        {/* Capabilities grid — concrete skills underneath */}
        <div className="mt-24 pt-12 border-t border-sand">
          <p className="eyebrow mb-8">Concrete capabilities</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-10">
            {CAPABILITIES.map((c) => (
              <div key={c.group} className="border-t border-sand pt-5">
                <h3 className="eyebrow text-ink mb-5">{c.group}</h3>
                <ul className="space-y-3">
                  {c.items.map((item) => (
                    <li key={item} className="text-base text-ink-soft leading-snug">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

function Judgment() {
  return (
    <section id="judgment" className="py-24 sm:py-32 border-t border-sand">
      <Container>
        <SectionLabel n="04">Judgment</SectionLabel>
        <h2 className="display-serif mt-6 text-3xl sm:text-4xl lg:text-5xl max-w-3xl leading-[1.1]">
          Calls I keep making.
        </h2>
        <p className="mt-5 text-lg text-smoke max-w-2xl leading-relaxed">
          The most important AI product decisions in regulated work are rarely about model choice. They are about where to standardize, where to keep humans, and what to refuse to ship.
        </p>

        <div className="mt-20 max-w-prose-wide divide-y divide-sand">
          {JUDGMENT.map((j) => (
            <div key={j.n} className="grid grid-cols-12 gap-6 py-10 first:pt-0">
              <div className="col-span-12 sm:col-span-2">
                <span className="font-serif text-3xl text-accent leading-none">{j.n}</span>
              </div>
              <div className="col-span-12 sm:col-span-10">
                <h3 className="font-serif text-xl sm:text-2xl text-ink tracking-editorial mb-5">
                  {j.title}
                </h3>
                <dl className="space-y-3 text-base leading-relaxed">
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
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

function GovernanceToolkit() {
  return (
    <section id="toolkit" className="py-24 sm:py-32 bg-paper-dark border-t border-sand">
      <Container>
        <SectionLabel n="02">Toolkit</SectionLabel>
        <h2 className="display-serif mt-6 text-3xl sm:text-4xl lg:text-5xl max-w-3xl leading-[1.1]">
          The controls I argue for.
        </h2>
        <p className="mt-5 text-lg text-smoke max-w-2xl leading-relaxed">
          Most of these are dull. Most of them are the difference between an AI feature that gets to production and one that gets pulled in week six.
        </p>

        <div className="mt-16 space-y-14">
          {GOVERNANCE_TOOLKIT.map((g) => (
            <div key={g.group} className="grid lg:grid-cols-12 gap-y-6 gap-x-12">
              <div className="lg:col-span-3">
                <h3 className="eyebrow text-ink">{g.group}</h3>
              </div>
              <dl className="lg:col-span-9 grid sm:grid-cols-2 gap-x-10 gap-y-6">
                {g.items.map((item) => (
                  <div key={item.title}>
                    <dt className="font-serif text-lg text-ink tracking-editorial">{item.title}</dt>
                    <dd className="mt-1.5 text-sm text-ink-soft leading-relaxed">{item.body}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>

        {/* Operating beliefs — folded in from the cut Writing section */}
        <div className="mt-24 pt-12 border-t border-sand">
          <p className="eyebrow mb-6">Operating beliefs</p>
          <ol className="divide-y divide-sand max-w-3xl">
            {POV_IDEAS.map((idea, i) => (
              <li key={i} className="flex items-start gap-6 py-5 first:pt-0">
                <span className="font-serif text-sm text-accent mt-1 w-6 flex-shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-base sm:text-lg text-ink-soft leading-relaxed">{idea}</span>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  )
}

function CareerArc() {
  return (
    <section id="career" className="py-24 sm:py-32 border-t border-sand">
      <Container>
        <SectionLabel n="01">Career</SectionLabel>
        <h2 className="display-serif mt-6 text-3xl sm:text-4xl lg:text-5xl max-w-3xl leading-[1.1]">
          Three acts.
        </h2>
        <p className="mt-5 text-lg text-smoke max-w-2xl leading-relaxed">
          Seventeen years in three acts — data engineering, regulatory platforms, and now AI. Each one built the foundation for the next, and together they shape how I work: shipping systems that have to be audited, not just admired.
        </p>

        <ol className="mt-16 divide-y divide-sand">
          {CAREER_ARC.map((e) => (
            <li key={e.era} className="grid lg:grid-cols-12 gap-y-5 gap-x-12 py-10 first:pt-0">
              <div className="lg:col-span-3">
                <div className="font-serif text-3xl text-accent leading-none">{e.era}</div>
                <div className="eyebrow mt-3">{e.years}</div>
              </div>
              <div className="lg:col-span-9">
                <h3 className="font-serif text-2xl sm:text-3xl text-ink tracking-editorial leading-snug">
                  {e.title}
                </h3>
                <p className="mt-4 text-base sm:text-lg text-ink-soft leading-relaxed max-w-prose-wide">
                  {e.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="py-24 sm:py-32 border-t border-sand">
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

export default function App() {
  return (
    <div className="min-h-screen bg-paper">
      <NavBar />
      <main>
        <Profile />
        <CareerArc />
        <GovernanceToolkit />
        <Capabilities />
        <Judgment />
        <SelectedWork />
        <CaseStudy />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
