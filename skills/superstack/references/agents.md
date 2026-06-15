# Agent Roster — experts on every step

This skill runs each phase with a dedicated expert agent. This file defines
every agent: when to spawn it, the brief it receives, what it must return, and
the format it returns options in. Read it at the start of a kickoff.

Two kinds of agents:
- **Advisor agents** turn a decision into a transparent menu for the user.
- **Overseer agents** check a deliverable for completeness before the process
  moves on. The high-stakes KICKOFF gates are technology, architecture, MVP,
  schedule, and build-readiness — plus the Security & Privacy Reviewer at the
  scheduled security pass (not a kickoff phase).

## Contents

- How to dispatch
- The mandatory option format
- Advisor agents
- Overseer agents
- Efficiency notes for agent use
- Rules for acting on review and running in parallel

---

## How to dispatch

With subagents available, spawn the relevant agent with a **clean, minimal
brief** — the specific inputs it needs, the reference file to read, and the
required output format. **Never hand an agent the whole conversation**; that
wastes tokens and dilutes its focus. Independent agents (e.g., several design
reviewers) run in parallel in one batch. Without subagents, play each role
inline, sequentially, with the same briefs and formats, and disclose the
non-independence in the kickoff summary.

The orchestrator (you) owns the conversation with the user and every gate. An
advisor produces the menu; **you present it to the user and the user chooses**
— an advisor never finalizes a decision on the user's behalf during kickoff.

## The mandatory option format

Every advisor presents each option exactly like this, so a non-technical user
can compare at a glance:

```
Option: <name>
In plain words: <one sentence — what it actually is, no jargon>
Best for: <the situation where this is the right pick>
Pros: <2–4 short concrete bullets>
Cons / costs: <2–4 short concrete bullets — money, lock-in, learning curve, limits>
Cost & limits: <real price/billing model in plain numbers; free-tier ceiling;
  and whether it meets the user's stated cost-control needs — hard spend cap vs alert-only>
Verified: <what was checked against current official docs, and when — especially the user's hard requirements>
Reversible?: <plain words — how hard to change later: "easy, a config change" / "moderate, some rework" / "hard, a migration & data move" — so lock-in is visible per option, not buried in cons>
Exit / portability: <can the owner export ALL their data + user accounts in a standard format, and the rough cost of leaving — flag proprietary/high-lock-in honestly; don't claim portable unless a real export was verified>
```

Every advisor uses these two lines, mirrored conceptually: each option must make
its reversibility and its exit/portability cost visible, so lock-in is never
hidden in the cons.

And every menu ends with one line:

```
Recommendation — <option>, because <one-sentence reason tied to THIS user and product>.
```

The recommendation must be reasoned from what this specific user said (their
skill level, audience, budget, timeline), not a generic default.

**Research-backed and constraint-verified (binding).** For any consequential
decision (architecture, platform/host, database, payments, anything with cost or
lock-in), the advisor must check the facts against the provider's **current
official documentation and pricing pages via web search before recommending** —
never from training memory, which is stale on pricing, limits, and features.
First write down the user's hard constraints (budget, a required spending cap, a
region, a compliance need, an existing tool to reuse); then verify each option
against each constraint and fill the `Verified:` line with what was checked. If a
constraint can't be confirmed in the docs, say so and do NOT present the option
as meeting it. **Never print "Verified" on a fact you didn't actually check this
session** — if it isn't checked yet, write `Verified: NOT YET CHECKED — will
confirm before this becomes the locked choice` and confirm before locking it in.
Hard constraints and load-bearing cost/limit facts must be verified before you
recommend; a fake "Verified" is worse than an honest "not yet checked." (See SKILL.md → *Recommendations are researched and
constraint-verified* and its cautionary tale about a host recommended without
checking its spend-cap support.)

**Present every menu as clickable options, not a text question** (see SKILL.md →
*Always ask with a clickable menu*). In Cowork, surface the options through the
`AskUserQuestion` tool — recommendation first and labeled "(Recommended)", each
option with its plain-language description, and always an "Other / something
else" free-text escape. The user picks by clicking; they should rarely have to
type.

---

## Advisor agents

### 1. Product Discovery Advisor — Phase 1

**Mandate:** help the user articulate what they're really building and for
whom, and stress-test it honestly. Open by naming the **Power Inversion** — the
founder owns the intent, Claude owns the code — and set the planning **triage**
(light vs. full); see `references/spec-driven-kickoff.md`.

**Brief it receives:** the user's raw idea description (as they told it).

**Returns:**
- A one-paragraph product description in plain language.
- A working product name (proposed if the user has none).
- A one-sentence pitch: "<name> helps <audience> do <thing> so they can <outcome>."
- 3-month and 1-year success metrics, concrete.
- **Honest pushback:** 1–3 specific failure modes or concerns, each with why
  it matters and a question for the user. This is mandatory — a discovery pass
  with no concerns is incomplete.

### 2. Market & Growth Advisor — Phase 2

**Mandate:** give a non-technical founder the lightweight business and
marketing thinking they need, without pretending to be a full GTM plan.

**Brief it receives:** the product, persona, and audience from Phase 1.

**Returns, each explained plainly:**
- The specific user/buyer persona (not "everyone").
- A monetization menu in the option format: free, one-time purchase,
  subscription, ad-supported, freemium, open-source/donations, internal-only —
  with what each means for a product like theirs.
- Where the audience already is (app store, web search, a community, a
  workplace) and the single most realistic first channel to reach them.
- One honest note on the hardest growth challenge for this product.

### 3. Technology Advisor — Phase 3  **[high-stakes: overseer gate follows]**

**Mandate:** present the *complete* honest menu of technology choices for this
product's nature — never a truncated list. Read `tech-options.md` for the full
catalog and keep it current with your own knowledge.

**Hard rule (this is why the skill exists):** when the product is mobile, the
menu MUST include, at minimum: native (Swift/SwiftUI + Kotlin/Compose),
Flutter, React Native/Expo, **Kotlin Multiplatform (shared logic, native UI)**,
and **Compose Multiplatform (shared UI across iOS+Android, optionally dropping
native Apple UI)**, and mention .NET MAUI where relevant. For each, the option
format with honest pros/cons. Do not present only the two most common
cross-platform frameworks. The same completeness rule applies to web, desktop,
backend, database, auth, and hosting menus.

**Covers, each as an option menu:** platform(s) and which ships first;
framework per platform; backend (or "none / local-first"); database; auth;
hosting; and a **mandatory cost cap** (monthly ceiling + alert threshold +
who pays + what happens at the ceiling) for any paid or LLM/cloud service.

**Honors existing infrastructure.** Read the existing assets recorded in Phase
1 first. If the user already has a cloud account (AWS/GCP/Azure), a server, or a
database, build *with* it — do not recommend a fresh stack that discards what
they already pay for and depend on. If switching away genuinely is better,
present it as an explicit option with the migration cost named, and let the user
choose.

**Verify cost-control claims against the docs.** When the user states a
cost-control requirement — a hard spending cap, a budget ceiling, "I must not be
able to be surprised by a bill" — treat it as a hard constraint and **check each
candidate host/service's current official billing documentation** to confirm
whether it offers a *hard cap that stops usage* versus only *alerts after the
fact*. State what you found in the `Verified:` line. Do not recommend a service
as meeting a spend-cap requirement unless its docs confirm it. (This is the
literal mistake the cautionary tale in SKILL.md was written to prevent.)

**Returns:** the chosen stack, one sentence of reasoning per choice (for
ADR-0001), the cost cap if any, and a note on which existing assets the stack
reuses.

### 4. Architecture Advisor — Phase 5  **[high-stakes: overseer gate follows]**

**Mandate:** turn the chosen stack and MVP into a simple system picture the
user can actually understand, and flag the few decisions that are expensive to
reverse. Apply the **Simplicity Gate** (`references/spec-driven-kickoff.md`):
fewest moving parts, justify any complexity in plain words, and offer to cut a
feature before adding a moving part. Offer the **Visual Companion** for the sketch. **Name the exit door:** assess data/vendor portability and lock-in as a
first-class factor, and ensure an owner-controlled full-data export exists.

**Brief it receives:** the chosen stack (Phase 3), the MVP scope (Phase 5b), and the existing-assets record (Phase 1).

**Returns:** a simple architecture sketch (Mermaid or labeled boxes: who talks
to whom, what lives where — client / server / third-party), the core data
model in plain terms, and a short list of "decisions we're locking in now and
why," each with its reversibility cost. Hard-to-reverse choices are flagged for
the user explicitly. **When existing assets are involved,** the sketch also
shows the old system and the migration path (one-time import / ongoing sync /
gradual cutover), what gets migrated and in what order, and how arrival is
verified (row counts, spot-checks) — feeding the Phase 6 migration milestone.

### 5. Project Management Advisor — Phases 5–6  **[high-stakes: overseer gates]**

**Mandate:** be the producer. Teach MVP, backlog, and schedule in plain words
and produce all three, sized to the user's real availability.

**Returns:**
- **MVP**, taught in one or two sentences ("the smallest version that proves
  the core value — one user, one use case, working start to finish"), then
  written as strict lists:
  ```
  MVP — v0.1
  IN (ships in v0.1):
  - As a <user>, I can <action>, so that <outcome>.
  OUT (deliberately deferred):
  - <feature> — why it's deferred.
  ```
  Push back on 5+ IN items, on IN items that aren't end-to-end, and on OUT
  items that are actually core.
- **Backlog** — a plain list of everything-else, so nothing is lost without
  cluttering v0.1.
- **Schedule / Gantt-to-production** — a realistic day/week plan that respects
  how many hours the user actually has, with one concrete deliverable per
  working block. It MUST contain, in order: the design session, the design-
  guidelines step, development sprints for the IN items, a QA pass, a security
  pass, and **going live / app-store release as the final milestone.** Plain
  dates and tasks, no Gantt jargon; buffer time included.

### 6. Design & UX Advisor — Phases 4 and the design gate

**Mandate:** decide whether design work is needed, plan the design session, and
later drive the creation of `design_guide_lines.md`.

**Brief it receives:** the product, audience, and platform list; for the guidelines, the approved design artifacts.

**Returns:** a clear yes/no on design need; if yes, a scheduled design session
before any UI code, recommended tools (Figma free tier, Penpot, paper, an
AI-UI tool), and later the first draft of `design_guide_lines.md` to hand to
the Design Review Board.

### 7. Spec & Clarify Advisor — per-feature spec

**Mandate:** own the per-feature spec (`assets/templates/starter_FEATURE_SPEC.md`).
Draft the user stories and Given/When/Then acceptance criteria in plain language,
run the clarify-before-plan ambiguity pass (max 3–5 batched menu questions, write
the answers back into the spec), and confirm with the owner via menus. The output
is the testable "definition of done" the build targets — nothing is built until
this exists and the owner has signed off.

**Returns:** the filled feature spec — user stories, Given/When/Then acceptance
criteria, the clarifying questions asked and the owner's answers, and a confirmed
definition of done.

### 8. Release & Deployment Advisor — final Gantt milestone

**Mandate:** when the schedule reaches "going live," explain in plain words how
this specific product reaches real users, lay out the path, and **own day-2
operations** — what happens after launch, not just the launch itself. Read
`references/post-launch.md` and `references/operations.md`.

**Returns, as option menus where there's a real choice:** the deployment target
(web host, Apple App Store, Google Play, desktop distribution), what each
requires from the user in advance (e.g., an Apple Developer account at $99/yr,
a Google Play account at a one-time $25, store listing assets, privacy policy,
review timelines), the CI/CD path to ship safely, and a simple go-live
checklist. This advisor surfaces the real-world, non-code prerequisites early
enough (during scheduling) that they don't block the launch.

**Also owns and returns (day-2 operations):**
- **Monitoring & crash reporting** set up before launch — how errors and crashes
  are seen in production (see `references/operations.md`).
- **Rollback plan per target** — how to undo a bad release on each platform,
  noting that **mobile app-store releases can't be rolled back** (you ship a
  fix-forward update), unlike web/server.
- **Versioning & build-number scheme** — the rule for version names and the
  always-incrementing build numbers stores require.
- **Post-launch update loop** — how fixes and new versions reach users after
  go-live (see `references/post-launch.md`).

This advisor (or, after launch, the owner) is responsible that `docs/RUNBOOK.md`
and `docs/COSTS.md` exist before go-live.

---

## Overseer agents

### Phase Gate Reviewer — high-stakes phases

**Mandate:** before the process leaves a high-stakes kickoff phase (technology,
architecture, MVP, schedule, build-readiness), independently check the phase's
deliverable for completeness and internal consistency. (Security is handled
separately by the Security & Privacy Reviewer at the scheduled security pass,
not as a kickoff phase.)

**Brief:** the phase's written output only (not the conversation) + this
phase's exit checklist from `kickoff-phases.md`. At the **build-readiness** gate,
also check documentation *usability* (not just presence): can a stranger run the
project from the README, does `docs/RUNBOOK.md` actually let the owner operate it,
do the ADRs capture the *why*, and are there no leftover placeholders?

**Returns:** PASS, or NEEDS-REVISION with specific gaps, each as: what's
missing, why it bites later, and the fix. Budget 2 cycles per phase; if still
unresolved, surface the open items to the user with a recommendation rather
than looping.

### Security & Privacy Reviewer — security gate

**Mandate:** for any product that **stores or transmits ANY personal data —
including email addresses, IP addresses, device IDs, or analytics** — or that
touches accounts, payments, or permissions, check that the plan handles
secrets, auth, and data storage, and that it covers the compliance items in
`references/legal-privacy.md` (privacy policy, data deletion/export, consent,
COPPA where children may use it, PCI where card data is involved). Explain it to
the user in plain terms, not as a checklist they can't parse. Findings
classified Blocker / Major / Minor; Blockers must be resolved before the build
proceeds. This is the scheduled, deep layer; the always-on **Security & Secret
Guardian** (SKILL.md) runs in *every* session on top of it.

### Code Reviewer — two-stage review gate

> Dispatch using the paste-ready briefs in `assets/templates/agent-prompts/`:
> `spec-reviewer-prompt.md` for Stage 1 (adversarial, pass/fail ✅/❌) and
> `code-quality-reviewer-prompt.md` for Stage 2 (four lenses, graded
> **Blocker / Major / Minor** — the canonical severity names). Implementer
> dispatch uses `implementer-prompt.md`; plan review uses `plan-reviewer-prompt.md`.

**Mandate:** review every build deliverable in two stages. **Stage 1** checks
compliance with the feature spec and its acceptance criteria — does the code
actually do what the Given/When/Then says? **Stage 2** applies the four quality
lenses (correctness, clarity/maintainability, security, performance). Runs as one
clean-context subagent so its judgment isn't anchored by the build's reasoning.

**Returns:** findings tagged **Blocker / Major / Minor** (the canonical severity
names used in `development.md`). Blockers and Majors are fixed before the feature
is called done; Minors are logged (LEARNINGS or backlog) rather than blocking.

### Threat Modeler — conditional security design pass

**Mandate:** for features touching **auth, payments, personal or health data, or
file uploads**, run a quick **STRIDE** pass at design time (spoofing, tampering,
repudiation, info disclosure, denial of service, elevation of privilege) and hand
concrete mitigations to the build. Skipped for features that touch none of these.

**Returns:** the per-threat findings and the mitigations the build must implement.

### How the four security layers relate (one map)

Security is intentionally layered; each fires at a different moment and altitude:
- **Security & Secret Guardian** (SKILL.md) — *always on*, interrupts any session
  the instant a secret/financial/legal risk appears.
- **Threat Modeler** — *proactive, at design time*, STRIDE on high-risk features.
- **Code Reviewer Lens 2** — *reactive, per feature*, security review of the diff.
- **Security & Privacy Reviewer** — *scheduled milestone gate*, the deep compliance
  pass. Together: guard continuously, model before building, review each change,
  and harden once at the security pass.

### Design Review Board — UI guidelines gate

Eight reviewers defined in `design-review-board.md`. Reviewers 1–7 run on
`design_guide_lines.md` before any UI development.

### Built-UI Design QA Reviewer — during development

The **8th reviewer** in `design-review-board.md`. Unlike the guidelines gate,
it runs *during the build* against the running UI / screenshots / dev server,
checking the actual product against `design_guide_lines.md` (colors, spacing,
type, the full state set, touch targets, safe-area insets). Wired into the
mobile screenshot gate and the web happy-path gate.

### Development reviewers — build loop

The review pass, QA pass, and fresh-eyes reviewer defined in `development.md`.

### Deep-Validation (Peak-Quality) Reviewer — on demand

Invoked when a decision is high-impact, hard to reverse, security/performance
sensitive, platform-complex, or when external best-practice validation would
change the answer. Runs the peak-quality protocol (map → research → generate →
critique → certify) in `development.md`. Used both on the product and as a
final pressure-test of risky kickoff decisions.

---

## Efficiency notes for agent use

- Spawn independent agents in one parallel batch; don't serialize what can run
  at once.
- Keep briefs minimal and typed: inputs, the one reference file to read, the
  output format. A focused agent is a cheap agent.
- Reuse an advisor's output as the next agent's input rather than re-deriving.
- An overseer that keeps failing the same way is a signal the upstream brief
  was wrong — fix the brief, don't loop the reviewer.

## Rules for acting on review and running in parallel

- **Receiving-review YAGNI defense.** When the implementer acts on review
  feedback, evaluate each item technically rather than complying reflexively.
  Verify the point against the actual code; if a suggestion adds a feature nobody
  asked for, apply YAGNI and **drop it** instead of expanding scope. Reviewers
  advise — they don't get to grow the product beyond the approved spec and
  acceptance criteria.
- **Parallel-agents rule.** Only parallelize subagents across **independent**
  domains — no shared files or state. After they return, run the **full test
  suite** to confirm the changes integrate without conflict.
