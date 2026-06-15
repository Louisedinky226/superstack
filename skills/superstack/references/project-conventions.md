# Project Conventions — the files we scaffold and the disciplines that keep the repo healthy

This file describes the standard file hierarchy this skill creates for every new
project, what each file is for in plain words, and the small set of disciplines
that keep a project organized, safe, and lean as it grows. The session rituals
that bookend every working session live in `rituals.md` — point there for those.

Templates for most of these files live in `assets/templates/`. When you scaffold
a project (kickoff phase 8), lay these down and fill in every placeholder.

---

## Contents

- The file hierarchy
- Built for human handoff, not just for Claude
- The agents.md standard (future-proofing)
- Testing anti-patterns guardrail
- Code style — auto-formatter + EditorConfig
- CI from day one (in plain words)
- Operational disciplines — pointers to operations.md
- The Constitution and the consistency gate (borrowed from Spec-Kit)
- Secret hygiene (never leak a key)
- The LEARNINGS log and the 3-strikes codification policy
- Just-in-time (JIT) loading of docs
- Efficiency and cleanup discipline (keep the repo lean)

---

## The file hierarchy

A new project gets a predictable shape. A person should be able to open the
folder and, in two minutes, understand what the project is, where it's going,
and how to work on it. Here is every file and what it's for, in plain words.

```
my-project/
├── AGENTS.md                  the canonical, tool-agnostic agent instructions
├── CLAUDE.md                  the project's brain — read first, every session
├── README.md                  the front door — what this is, how to run it
├── .gitignore                 the "do not save these" list
├── .editorconfig              shared editor/formatting rules (indent, line endings…)
├── LICENSE                    the legal terms for using the code
├── .env.example               a blank template of the secret settings
├── .env                       the REAL secrets (never saved to git)
├── design_guide_lines.md      the binding UI contract (typography, color, spacing…)
├── privacy-policy.md          draft privacy policy (if we collect personal data)
├── terms-of-service.md        draft terms of service (the rules for using the app)
├── docs/
│   ├── ROADMAP.md             the plan and schedule (the Gantt to production)
│   ├── BACKLOG.md             the full list of things we might build
│   ├── CHANGELOG.md           the human-readable list of what changed, per version
│   ├── CHATLOG.md             the running session log (one entry per session)
│   ├── ARCHITECTURE.md        how the system is put together
│   ├── api/openapi.yaml        the API contract (only if a custom HTTP API exists)
│   ├── BUSINESS.md / GOALS.md why this exists and what success looks like
│   ├── LEARNINGS.md           lessons learned + inferred build-time decisions
│   ├── RUNBOOK.md             the owner's plain-language operations manual
│   ├── COSTS.md               every recurring charge, when it renews, how to cut it
│   └── adr/                   one file per big, hard-to-reverse decision
└── .github/
    └── workflows/
        └── ci.yml             the robot that checks every change automatically
```

Beyond the files above, real projects also carry **staging/preview config** —
settings (often extra `.env` files or a hosting-provider setting) that point a
safe pre-production copy of the app at its own database and keys, so changes can
be tried on a live-like environment before real users see them. See
`operations.md` for how environments are set up.

### AGENTS.md — the canonical agent instructions

The tool-agnostic instruction file for any AI coding agent — now a
widely-adopted, Linux-Foundation-hosted standard backed by the major AI coding
tools. It holds the agent-facing guidance that isn't specific to one vendor, so
the project stays usable by any AI tool (or a future human reading it).
`CLAUDE.md` is kept as a thin layer that imports/points to it rather than
duplicating it. See *The agents.md standard* below.

### CLAUDE.md — the project's brain

The single most important file. It's the instructions Claude reads first in
every session. It carries the plan forward, the non-negotiable rules (security
caps, data-handling rules), the quality gates, the autonomy contract, the
`## granted-permissions` list, and pointers to everything else. If a project has
only one well-maintained file, this is it. When something should be true in
*every* future session, it belongs here.

### README.md — the front door

The first thing a human (or a new collaborator, or a future you) reads. In plain
words: what this project is, who it's for, how to install and run it, and where
to find the deeper docs. Short and welcoming. If CLAUDE.md is for the AI, README
is for the people. It must be a **real onboarding document, not a stub** — a
developer who has never met Claude should be able to clone the repo and run it
from the README alone. Use `assets/templates/starter_README.md` as the starting
shape and fill in every placeholder.

### docs/ROADMAP.md — the plan and the schedule

The road to production. It holds the ordered schedule built during kickoff: the
design session, the design-guidelines step, the development sprints, QA,
security hardening, and going live / app-store release as the final milestone.
Each session, the "next ROADMAP item" tells us what to work on next. This is the
Gantt in document form.

### docs/BACKLOG.md — the full wish list

Everything we *might* build, in plain language, loosely ordered. The ROADMAP is
the committed near-term plan; the BACKLOG is the larger pool of ideas and tasks
we pull from. New ideas land here so they're not forgotten, without derailing
the current plan.

### docs/CHANGELOG.md — what changed, in human words

A running, human-readable list of what changed in each released version —
new features, fixes, and anything users or contributors should know about.
Grouped by version number (see SemVer in `operations.md`), newest at the top.
It follows the widely-used **"Keep a Changelog"** format — changes grouped under
Added / Changed / Fixed / Removed, newest version on top — so the release history
stays consistent and readable. Where the CHATLOG is the private "what we did each
session" log, the CHANGELOG is the public-facing "what's new in this release"
story.

### docs/CHATLOG.md — the running session log

One entry per working session, written during the closing ritual. Each entry is
a short, honest record: what we did, what worked, what didn't, the session
score, and a pointer to next session's focus. At the start of each session we
read the last few entries to remember where we left off. This is the project's
memory across days and weeks.

### docs/ARCHITECTURE.md — how it's built

A plain-language description of how the system fits together: the major pieces
(frontend, backend, database, external services), how they talk to each other,
and the key decisions about structure. Written so a non-technical founder can
follow the shape of their own system. Updated when the structure changes.

### docs/BUSINESS.md (or GOALS.md) — why this exists

The "why" behind the project: the problem it solves, who pays or uses it, the
monetization model, the success metrics, and any market context gathered during
kickoff. Keeps the building anchored to the goal. Use BUSINESS.md for a
commercial product, GOALS.md for a personal or open-source project — same role.

### docs/adr/ — Architecture Decision Records

A folder with one short file per big, hard-to-reverse decision (e.g. "why we
chose Postgres over Firestore", "why we went native instead of cross-platform").
Each record states the decision, the context, the options considered, and the
consequences. The value: six months later, when someone asks "why did we do it
this way?", the answer is written down instead of lost. ADRs are append-only —
if a decision is reversed, write a new ADR that supersedes the old one rather
than editing history.

### docs/LEARNINGS.md — lessons before they become rules

A running log of things we've learned the hard way — bugs that bit us, patterns
that worked, surprises about a tool or platform. Not yet rules; just observations
worth remembering. The 3-strikes policy below governs when a learning graduates
into a hard rule in CLAUDE.md. This file also holds **inferred build-time
decisions** — the smaller "why we did it this way" choices made during a build
that aren't big enough for a full ADR but would still puzzle a future reader. (A
project may instead keep these in a dedicated **`docs/DECISIONS.md`**; either
home is fine, as long as the reasoning is written down somewhere.)

### docs/RUNBOOK.md — the owner's operations manual

The **plain-language manual for running the live product**, written for the
non-technical owner, not for Claude. It answers the operational "how do I…?"
questions in concrete, copy-pasteable steps: how to **run it locally**, how to
**deploy**, how to **roll back** a bad release, how to **restart** the service,
where to **find the logs**, how to **rotate a key**, and — the one they'll reach
for in a panic — **"the site is down, what do I do?"** If README is how you start
working on the project, the RUNBOOK is how you keep the running product alive when
something goes wrong and Claude isn't around.

### docs/COSTS.md — the recurring-cost ledger

A single file listing **every recurring charge** the product incurs — hosting,
database, domain, Apple Developer ($99/yr), Google Play ($25 one-time), email/SMS,
monitoring, LLM/API — each with its amount, billing cycle, renewal date, who's
billed and on which card, and a one-line "how to reduce or cancel this." Reviewed
post-launch and whenever a service leaves its free tier. The goal: the owner opens
one file and knows what they pay, when it renews, and what they can cut. See
`post-launch.md`.

### design_guide_lines.md — the UI contract

The binding specification for how the product looks and behaves: typography,
colors, spacing, components, states, safe areas, accessibility, and per-platform
behavior, with exact build-ready values. It must exist and pass the Design
Review Board before any UI code is written. Once approved, the build conforms to
it — it's a contract, not a suggestion.

### privacy-policy.md & terms-of-service.md — the legal drafts

Two plain-text drafts that most public products eventually need. The
**privacy policy** tells users what personal data you collect and how you use
it (required by law in many places the moment you collect *any* personal data).
The **terms of service** are the rules for using your app — what's allowed, what
you promise, what you don't. These start as drafts in the repo and must be
reviewed before go-live; they are **not** legal advice. See `legal-privacy.md`
for when each is required and what goes in them.

### .gitignore — the "do not save these" list

Tells git which files to never copy to the online repository: secret files
(`.env`), big build folders, dependency caches, editor junk, OS clutter. Keeps
the repo clean and — critically — keeps secrets out. A correct `.gitignore` is
the first line of defense for secret hygiene.

### LICENSE — the legal terms

States how others may (or may not) use the code. For a private commercial
product this is often "All rights reserved"; for open source it's a standard
license (MIT, Apache-2.0, etc.). The Technology/Release advisor helps the user
pick during kickoff. Having an explicit license removes ambiguity.

### .env.example — the blank secrets template

A committed file that lists *which* secret settings the project needs, with the
values blanked out (e.g. `DATABASE_URL=` , `API_KEY=`). It's safe to save
because it contains no real secrets. A new developer copies it to `.env` and
fills in the real values. It documents what's required without exposing anything.

### .editorconfig — shared formatting rules

A committed `.editorconfig` sets baseline editor rules (indent style and size,
line endings, trailing whitespace, final newline) that every editor and IDE
respects automatically. Pairs with the auto-formatter convention below.

### .github/workflows/ci.yml — the automatic checker

The configuration for "Continuous Integration" — the robot that runs checks on
every change automatically. Explained in full below.

---

## Built for human handoff, not just for Claude

A non-technical founder must be able to hand this project to **a hired developer
or a buyer's reviewer** and have them productive **in an afternoon — without
Claude in the loop.** The owner can't vouch for the code themselves, so the repo
has to speak for itself to a human stranger. Three standing consequences:

- **README.md is a real onboarding doc, not a stub.** A developer who has never
  met Claude should be able to clone, install, configure, and run the project
  from the README alone. (Template: `assets/templates/starter_README.md`.)
- **Code favors clarity over cleverness — as a standing quality lens.** Clear
  names, small focused functions, and comments that explain **why** (not what).
  Because the owner can't review the code, "would a stranger understand this?"
  is the bar on every change, not a nice-to-have.
- **ADRs (and inferred-decision notes) capture the *why* for a human stranger.**
  The reasoning behind hard-to-reverse choices is written down so the next person
  inherits the thinking, not just the result.

**Build-readiness check — the handoff test:** before calling a milestone done,
ask **"Could a developer who's never met Claude clone this and run it from the
README alone?"** If not, it isn't handoff-ready — fix the README, the setup
steps, or the clarity gap before moving on.

---

## The agents.md standard (future-proofing)

Scaffold an **`AGENTS.md`** as the canonical, **tool-agnostic** agent-instruction
file. It's now a widely-adopted, **Linux-Foundation-hosted** standard backed by
the major AI coding tools, so writing the agent guidance there — instead of in a
single vendor's file — keeps the project usable by **any** AI coding tool or a
future human developer. Keep **`CLAUDE.md` as a thin layer** that imports from /
points to `AGENTS.md` rather than duplicating it: Claude-specific bits stay in
CLAUDE.md, everything portable lives in AGENTS.md. One source of truth, no drift.

---

## Testing anti-patterns guardrail

Tests must assert on **observable behavior** — what the feature does from the
outside — **not internal implementation** (private methods, call order, exact
intermediate values). And every test must be **capable of failing**:

- **Red before green.** Confirm a new test **fails before the code exists**, then
  **passes after** it's written. A test that was never seen to fail may be
  asserting nothing.
- **Don't over-mock.** Mocking away the very thing under test makes a test pass
  whether or not the feature works. Mock external boundaries, not the behavior
  you're verifying.

A test that cannot fail is **worse than none** — it gives the owner false
confidence that the product works when it may not. This is a standing quality
lens on every test written.

---

## Code style — auto-formatter + EditorConfig

Formatting is automatic, never debated. The project uses an agreed
**auto-formatter** (Prettier for JS/TS, Black for Python, gofmt for Go, etc.)
plus a committed **`.editorconfig`**, both **enforced in CI**. Style is settled
by the tool, not by review comments — and a consistently formatted codebase is
far easier for a future human developer or a buyer to read.

---

## CI from day one (in plain words)

"CI" stands for Continuous Integration. In plain words: **a robot that checks
your code every single time you save a change to the online repository.** Each
time you push, the CI robot wakes up, downloads your code, installs it, and runs
your checks — does it build? do the tests pass? is the formatting clean? If
anything fails, it tells you immediately, with a red X next to your change.

Why set it up on day one, before there's much to check?

- **It's cheapest to add when the project is empty.** Bolting CI onto a large,
  messy project later is painful. Starting with it means every change is checked
  from the very first one.
- **It catches mistakes you can't see.** "It works on my machine" is a classic
  trap — CI runs in a clean environment, so it catches the missing file, the
  uninstalled dependency, the thing that only worked because of something on
  your laptop.
- **It builds the habit.** When green checks are normal, a red X stands out and
  gets fixed. When there are no checks, broken code piles up unnoticed.

The starter `ci.yml` does the minimum that fits the project type — install,
build, lint, run tests — and grows as the project does. It's the seatbelt you
put on before you start driving, not after the crash.

### The required (blocking) jobs

These jobs run on every push and **every one must pass green** before a change
can merge. They are configured as **required status checks** on the main branch,
so a red X physically blocks the merge button — see `operations.md` for how
branch protection wires these in:

- **install** — fetch and install all dependencies in a clean machine.
- **typecheck** — confirm the code's types line up (catches whole classes of bugs).
- **lint** — confirm the code follows the agreed style and has no obvious smells.
- **test + coverage floor** — run the test suite *and* fail if test coverage
  drops below the agreed minimum percentage.
- **build** — confirm the project actually compiles/bundles into a shippable form.
- **secret-scan** — scan the push for leaked credentials (see below).
- **dependency-vulnerability scan** — check the project's third-party packages
  against known-vulnerability databases and fail on serious, fixable issues, so
  you don't ship a library with a publicly known hole.

**CI also runs a blocking secret scanner from day one.** Add a secret-scanning
step (e.g., **gitleaks** as a GitHub Action, or trufflehog) that inspects every
push and **fails the build if a credential is found** in the code or its
history. This is a hard, automatic backstop: even if a secret slips past a human,
CI refuses to let it land. A failing secret scan is a Blocker — fix it (remove
the secret, rotate it) before anything proceeds.

---

## Operational disciplines — pointers to operations.md

These keep a project safe and reproducible as it grows. They have their own deep
reference in `operations.md`; the one-liners below are just the signposts:

- **Environments (dev / staging / prod)** — separate copies of the system so you
  build and test safely before real users are touched. → `operations.md`
- **Branching & PRs, protected main** — work happens on branches and merges via
  pull requests; the main branch is protected so nothing lands unreviewed or
  red. → `operations.md`
- **Versioning (SemVer / tags / CHANGELOG)** — number releases predictably, tag
  them in git, and record each in the CHANGELOG. → `operations.md`
- **Schema migrations** — use a migrations tool to change the database's shape
  safely and reversibly, never by hand. → `operations.md`
- **Feature flags / kill switch** — ship code that can be turned on or off
  instantly without a redeploy, so risky features have an off switch. →
  `operations.md`
- **Reproducibility** — pin exact dependency versions and commit lockfiles so the
  same code builds the same way on any machine, today or next year. →
  `operations.md`
- **Production backups & disaster recovery** — back up real data regularly and
  know how to restore it, so an outage or mistake isn't fatal. → `operations.md`
- **Isolated work (git worktrees)** — where the harness supports it, do each
  feature on its own branch in a separate worktree, so parallel or risky work
  never disturbs a known-good checkout (from Superpowers' worktree practice).
  **Close it out when done:** once a feature is delivered and merged (via PR),
  remove its worktree and delete the branch, so a non-coder owner doesn't
  accumulate invisible stale branches and folders they can't see or clean up.

---

## The Constitution and the consistency gate (borrowed from Spec-Kit)

**The Constitution** is a short, stable list of the project's non-negotiable
principles — the things that must hold no matter what feature is being built
(e.g. "all user data is encrypted at rest," "no feature ships without tests,"
"accessibility AA is mandatory," the cost cap, the language rule). It lives in a
`## Constitution` section of `CLAUDE.md` and is written once at kickoff. Unlike
the backlog or the roadmap, it rarely changes; every session is expected to obey
it, and changing it is a deliberate, recorded decision (an ADR), not a drift.

**The consistency gate** is the matching check (Spec-Kit's `analyze` idea): at
delivery, confirm the work is consistent *with the constitution, the MVP scope,
the plan, and the design contract* — not just internally correct. This is the
same spirit as the delivery scope-check in `development.md`: catch the build
quietly diverging from what was agreed, in a place a non-technical owner can't
see for themselves. If the work conflicts with a constitution principle, that's
a Blocker — fix it or, if the principle itself should change, surface it and
write a superseding ADR; never silently violate it.

---

## Secret hygiene (never leak a key)

Secrets are passwords, API keys, database URLs, tokens — anything that, if
leaked, lets a stranger into your accounts or runs up your bills. The rules,
always:

1. **Real secrets live only in `.env`, and `.env` is gitignored.** The `.env`
   file holds the real values; it must be listed in `.gitignore` so it is never
   copied to the online repository. A leaked `.env` in a public repo is one of
   the most common and most expensive mistakes in software — bots scan for them
   within minutes.
2. **`.env.example` is committed; it has the keys but blank values.** This
   documents what secrets the project needs without exposing any of them. New
   contributors copy it to `.env` and fill in their own values.
3. **Never log secrets, never print them, never paste them into chat.** Don't
   write a secret into a log line, an error message, a commit message, a CHATLOG
   entry, or a screenshot. If a secret is ever exposed by accident, treat it as
   compromised: rotate it (generate a new one and revoke the old) immediately.

4. **Run pre-commit hooks locally.** Install **pre-commit hooks** that run
   format + lint + a secret-scan on your own machine *before* a push ever
   reaches the online repo — catching a stray key or messy code at the earliest,
   cheapest moment, instead of waiting for CI to reject it.
5. **Commit the lockfile.** Keep the dependency **lockfile** (e.g.
   `package-lock.json`, `pnpm-lock.yaml`, `poetry.lock`) committed to git. It
   pins the exact versions of every dependency so everyone — and CI — installs
   the identical, vetted set, which is both a reproducibility and a security
   measure (no surprise package swaps). See `operations.md`.

When in doubt, assume a value is a secret and keep it out of git and out of logs.

---

## The LEARNINGS log and the 3-strikes codification policy

We want to get smarter over time without drowning in rigid rules. The mechanism:

**Log freely.** Whenever something teaches us a lesson — a bug, a gotcha, a tool
quirk, a pattern that worked — write a short note in `docs/LEARNINGS.md`. Logging
is cheap and has no downside; we log generously.

**Codify rarely — only on the 3rd strike.** A learning becomes a *hard rule*
(written into CLAUDE.md, enforced every session) only when the same class of
problem has recurred **three times**. The reasoning: most one-off lessons are
just that — one-offs. Turning every single lesson into a permanent rule would
bury the genuinely important rules under noise. The third recurrence is the
signal that this is a real, recurring pattern worth the weight of a rule.

**The money / user-data / irreversible exception — codify on the 1st strike.**
There is one carve-out. If a learning touches **money, user data, security, or
any irreversible action** (deleting data, sending to all users, charging cards,
deploying to production), it becomes a hard rule the **first** time, not the
third. We do not get three chances to mishandle a user's data or spend their
money by accident. For this class, one lesson is enough to make a rule.

So: log everything; promote to a rule on the 3rd recurrence — or the 1st time if
it touches money, user data, security, or anything you can't undo.

---

## Just-in-time (JIT) loading of docs

A growing project accumulates a lot of documentation. Reading all of it at the
start of every session is slow and wasteful. The discipline: **read the minimum
to orient, then read deeper docs only when a task needs them.**

- The opening ritual reads only the last few CHATLOG entries, the next ROADMAP
  item, and `git status` — just enough to choose a focus; it then presents a Focus
Menu of the 3 most relevant tasks and loads only that focus's files (see
`rituals.md`).
- ARCHITECTURE.md, the relevant ADRs, and design_guide_lines.md are read **when
  the task at hand touches them**, not before.
- Use a "trigger guide" mindset: "about to write UI → load design guidelines";
  "about to change the data model → load ARCHITECTURE and the relevant ADR";
  "about to push → load the pre-handoff checklist." When in doubt whether a doc
  applies, load it — a wrong skip is more expensive than an extra read.

This keeps each session fast and focused while still pulling in deep context
exactly when it matters.

---

## Efficiency and cleanup discipline (keep the repo lean)

A codebase rots if no one tends it: dead files accumulate, unused dependencies
linger, large artifacts bloat the repo. Periodically — a natural moment is the
closing ritual, or whenever the repo feels heavy — run a lightweight cleanup:

- **Find large files.** Look for unexpectedly big files committed to the repo
  (stray build outputs, large assets, accidental data dumps). Large files in git
  history are hard to remove later, so catch them early. Move genuinely needed
  large assets to appropriate storage; gitignore the rest.
- **Remove dead code.** Hunt for code that nothing calls anymore — old functions,
  commented-out blocks, abandoned files, feature flags for shipped features.
  Dead code confuses readers and hides bugs. Delete it; git history keeps it if
  it's ever needed again.
- **Prune unused dependencies.** Every dependency is a maintenance and security
  liability. Periodically check which packages are actually imported and remove
  the ones that aren't. Fewer dependencies means faster installs, smaller
  builds, and a smaller attack surface.
- **Keep the structure tidy.** Files in the right folders, no stray temp files,
  no duplicated docs. A lean, well-organized repo is faster to work in and
  cheaper to reason about.

### Document hygiene — trim long docs carefully (never lose what matters)

The project's own documents (`CLAUDE.md`, `CHATLOG.md`, `LEARNINGS.md`, ADRs,
design docs) grow over time. Long documents cost context (tokens) to load every
session and eventually slow the work down. So tend them — but **with great
care**, because these files are the project's memory and deleting the wrong line
loses a decision forever. You know this project best; use that judgment.

Trigger this pass when a document has clearly grown heavy, or at the closing
ritual when you notice it.

**Two speeds, deliberately different:**

- **Auto-clean (safe, do it without asking) — only genuinely dead content:**
  exact duplicate lines, leftover `[FILL IN]`/placeholder text that's been
  filled elsewhere, completed TODOs, broken links to deleted files, obvious
  formatting cruft, and verbose passages that can be said in fewer words
  **without changing their meaning**. Rewriting something to be shorter and
  clearer is encouraged; this is efficiency, and you should do it confidently.
- **Archive, don't delete (for bulk that's still history):** when a log like
  `CHATLOG.md` gets long, move older entries to `docs/archive/CHATLOG-<period>.md`
  and keep the recent ones live. Nothing is lost; the working file stays light.

**Never remove (these are load-bearing — when in doubt, keep or archive):**
decisions and their reasoning (ADRs), the MVP scope, requirements, the cost cap,
granted-permissions, security/privacy notes, anything touching money, user data,
or irreversible actions, and any learning that hasn't clearly been superseded.

**The rule when unsure:** if you cannot tell whether a line still matters, do
NOT delete it — shorten it, archive it, or leave it and flag it in the closing
retrospective for the user to decide. A lean doc is good; a lost decision is a
real cost that's hard to undo. Trimming is reversible only via git history, so
treat every deletion as if history might be lost.

Efficiency is a first-class goal of this skill: every session should leave the
project better on two axes — Performance (the product works better) and
Efficiency (we work better, and the repo and its docs stay lean). See
`rituals.md` for how the closing ritual captures both.
