# Adversarial review log

After the build, the site was handed to two reviewers with clean context. Each
saw only the rendered artifact — homepage text, both fold screenshots, the four
artifact pages, and all three case studies. Neither was told anything about the
work, the intentions behind it, or the previous round's feedback. Both were
instructed to be hostile by default and recalibrated hostile every round.

**Reviewer 1** — Head of Technical Recruiting / hiring committee at a top-tier
tech company, calibrating against the Principal PM (L7) bar. Job: find reasons
to reject.

**Reviewer 2** — Angel investor writing first cheques, who also vets "employee
#1 on product" for portfolio companies. Job: decide whether to back or place.

## Scores

| Round | Reviewer 1 (L7 bar) | Reviewer 2 (investor) |
|---|---|---|
| 1 | **5** / 10 | **6** / 10 |
| 2 | **6** / 10 | — |
| 3 | **6** / 10 | **7** / 10 |

Neither reached 8. Three rounds was the cap. **The reasons they stopped short
are, with one exception, things I cannot fix without you** — they are listed in
`OPEN_GAPS.md`.

Sub-scores moved where the work could reach:

| Dimension (Reviewer 1) | R1 | R3 |
|---|---|---|
| Would I read past the first screen | 6 | **8** |
| Claims survive a screen | 4 | 5 |
| Judgment vs. assertion | 7 | 7 |
| IC scope vs. platform leadership | 4 | 4 |
| Fintech framing | 3 | 5 |

---

## Round 1

**Reviewer 1 — 5/10.** *"Genuinely unusual depth on agent evaluation and
human-in-the-loop design… but the scope is a Lead PM running one internal
compliance surface at one company, the headline dollar figures don't survive
contact."*

**Reviewer 2 — 6/10.** *"Rare craft, one deep and genuinely real insight, honest
about failure in a way most candidates can't fake, and no demonstrated ability
to create demand rather than serve it."*

Both independently identified the same two things:

1. **The `$4B` and `$10B+` tiles are the problem.** Reviewer 1: *"unfalsifiable,
   unattributable, and the MODELED label makes it worse by proving he knew…
   inflation wearing a lab coat."* Reviewer 2: *"rendered at hero size next to
   real SHIPPED numbers, they contaminate the honest ones."*
2. **The best thing on the site was buried.** Both quoted the same sentence,
   sitting in paragraph 30 of one case study: *"Building the system surfaced an
   interpretation problem that predated the system."* Reviewer 2: *"That is a
   company, and he wrote it as an aside."*

Reviewer 1 also caught the logo marquee — Lloyds and Hyperwallet appear nowhere
else on the site, Wipro and Cognizant were employers rather than institutions
built for — and a 30% arithmetic contradiction on Meridian's headline stats
(`200+/day` beside `56k/yr across 1,000+ regulators`).

**Changed:** cut both dollar tiles; cut the unsupported logos; fixed the Meridian
contradiction and deleted a `$14.8M` tile whose own footnote conceded it was
unvalidated; promoted the reviewer-disagreement finding into its own block;
moved Artifacts from scroll depth 4 to position 2; broadened the contact section
past "banks, fintechs and regulated SaaS"; added a section 9 to the shadow-mode
artifact showing a **GO** decision with a named residual risk, because four
artifacts that all ended in a refusal read as a mannerism.

---

## Round 2

**Reviewer 1 — 6/10.** Fold up from 6 to 7. Then it read the code properly and
found **two real defects**:

1. `hitl/router.py` resolved the timeout as `override or tier`, letting an
   override that *raised* the tier hand back a *weaker* failure path — a direct
   violation of the file's own stated invariant I6.
2. `score.py` gated `reviewer_kappa` — the one dimension that invalidates every
   other number — on a bare point estimate, *on the page arguing you must never
   gate on a point estimate*.

Both were real. Both are fixed and the fixes are verified:
`_strictest_timeout("suspend", "escalate")` now returns `suspend` where the old
code returned `escalate`; kappa now carries a seeded bootstrap lower bound
(point 0.812 → bound 0.759).

It also flagged the fold as filing him under *compliance specialist* before
anyone scrolled, and pointed out that the generalisation he needed was already
written — in the footer, below his email address.

**Changed:** the fold now leads with *"Agents that take actions you can't undo"*
and names refunds, pricing and merges to main; the audit line moved down into
Work where it works as evidence; the hero stopped claiming a title the rest of
the site contradicts; killed the "How I work" principles (three abstractions,
no evidence) and two unfalsifiable lines; Judgment went from 6 cards to 4 (three
made one argument, and two closed with an identical sentence structure two cards
apart); the escalation matrix gained four non-financial action classes.

---

## Round 3

**Reviewer 1 — 6/10.** Fold up to 8: *"the best line on the site: it's a
category claim, not a title, and it's falsifiable."* But it took the
"check line by line" invitation literally and found that **three of eight rows
in the eval scorecard did not reproduce under the published code**. It ran the
Wilson bounds by hand.

That was the correct finding and the worst possible one — on a page whose entire
argument is evidentiary discipline. Every worked number in all four artifacts
was then recomputed by extracting the code from the page, running it against its
own policy and rubric JSON, and pasting back the real output. Six rows changed.
One row that had been marked PASS actually fails, and now says so.

**Reviewer 2 — 7/10.** *"The strongest technical-credibility portfolio I've read
this year, and I'd make introductions for a product hire tomorrow. Not an 8,
because an 8 means I'd spend reputation on him as a founder, and a founder has
to be able to answer 'how do you get the first customer' — a question this site
never once asks itself."*

**Changed:** all of the above, plus the reviewer-disagreement finding moved above
the fold; the self-refuting provenance sentence cut (*"I can give you the
denominator in a conversation, but I'm not going to publish numbers I cannot
show the working for"* — which publishes exactly such a number in its first
clause); the four identically-templated `THE TRADEOFF` blocks differentiated;
third-party benchmarks off the retention card entirely.

---

## What the reviewers agreed on that I could not fix

Three findings appeared in every round from both reviewers, and none of them is
a writing problem:

- **No evidence of org scope.** No team, no headcount, no budget, no PM
  mentored, no roadmap another team was held to. Reviewer 1: *"He published
  craft objects, not leverage objects."*
- **Every checkable object on the site is fiction he wrote himself.** The four
  artifacts are reference implementations; the one genuinely shipped system has
  no artifact attached to it.
- **No evidence of creating demand.** No user acquired, no customer found, no
  conversation with a buyer outside his employer.

These are in `OPEN_GAPS.md` with what would close each one.
