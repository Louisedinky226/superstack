# [PRODUCT NAME]

> [ONE-LINE DESCRIPTION — what this product does, in a single sentence.]

<!--
  This README is written for a HUMAN STRANGER — a developer or reviewer who has
  never met Claude and may be seeing this repo for the first time. The goal: they
  can clone, install, configure, and run the project from this file ALONE, in an
  afternoon. Fill in every [PLACEHOLDER] and delete these comments. If a step
  doesn't actually work from a clean machine, fix it before you ship.
-->

## What it is / who it's for

[2–4 plain sentences: what problem this solves, who uses it, and what the product
does for them. No jargon. A non-technical reader should understand it.]

## Tech stack

[The main pieces, one line each — e.g. "Frontend: React + Vite · Backend:
Node/Express · Database: PostgreSQL · Hosting: [PROVIDER]." Keep it short; the
full picture lives in `docs/ARCHITECTURE.md`.]

## Prerequisites

Install these first. Exact versions matter — newer or older may not work:

- [RUNTIME, e.g. Node.js] **[EXACT VERSION, e.g. 20.x]**
- [PACKAGE MANAGER, e.g. pnpm 9.x / npm 10.x]
- [DATABASE, e.g. PostgreSQL 16] — running locally or a connection string to one
- [ANY OTHER TOOL — e.g. Docker, a specific CLI, an account/API key you'll need]

## Getting started (clone → install → configure → run)

Copy-paste these, in order, on a clean machine:

```bash
# 1. Clone the repository
git clone [REPO URL]
cd [REPO FOLDER NAME]

# 2. Install dependencies
[INSTALL COMMAND, e.g. pnpm install]

# 3. Create your local secrets file from the template
cp .env.example .env
# Now open .env and fill in every value. What each one is:
#   [VAR_NAME]      — [what it is / where to get it]
#   [VAR_NAME]      — [what it is / where to get it]

# 4. Set up the database (create it + run migrations + optional seed data)
[DB SETUP COMMAND, e.g. pnpm db:migrate]
[OPTIONAL SEED COMMAND, e.g. pnpm db:seed]

# 5. Run the app
[RUN COMMAND, e.g. pnpm dev]
```

The app should now be running at **[LOCAL URL, e.g. http://localhost:3000]**.
[Note any first-run gotcha — a login to create, a port to free, etc.]

## Running the tests

```bash
[TEST COMMAND, e.g. pnpm test]
```

[One line on what the suite covers and what "green" means. Note the coverage
floor if there is one. Mention any separate commands — e.g. `pnpm lint`,
`pnpm typecheck` — that CI also runs.]

## How it's deployed

[One short paragraph: where it runs in production, how a change ships (e.g. "merge
to `main` → CI runs → auto-deploys to [PROVIDER]"), and where staging lives.]

For the full operations manual — deploy, roll back, restart, read logs, rotate a
key, and "the site is down, what do I do?" — see **`docs/RUNBOOK.md`**.

## Project layout — the key folders

```
[REPO FOLDER NAME]/
├── [src/ or app/]      [what lives here — the application code]
├── [tests/]           [the test suite]
├── [config/]          [configuration]
├── [scripts/]         [setup / maintenance scripts]
└── docs/              project documentation (see below)
```

[Adjust the tree to match the real project. Name only the folders a newcomer
needs to find their way around — not every directory.]

## Where the deeper docs live

- **`docs/ARCHITECTURE.md`** — how the system fits together.
- **`docs/RUNBOOK.md`** — how to operate the live product (deploy, rollback, logs).
- **`docs/COSTS.md`** — every recurring charge and how to cut it.
- **`docs/ROADMAP.md`** / **`docs/BACKLOG.md`** — what's planned and what's queued.
- **`docs/CHANGELOG.md`** — what changed in each release.
- **`docs/adr/`** — the *why* behind big, hard-to-reverse decisions.
- **`CLAUDE.md`** — context for AI-assisted development (optional reading for a
  human developer).

## License

[LICENSE — e.g. "All rights reserved" or "MIT". See the LICENSE file.]
