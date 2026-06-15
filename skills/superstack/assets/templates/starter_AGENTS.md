# AGENTS.md — [PROJECT_NAME]

> **What this file is.** The canonical, **tool-agnostic** instructions for any AI
> coding agent that works on this project — a widely-adopted, Linux-Foundation-
> hosted standard backed by the major AI coding tools. It holds the agent-facing
> guidance that isn't specific to one vendor, so the project stays usable by any
> AI tool (or a future human reading it). `CLAUDE.md` is kept as a thin layer that
> points here rather than duplicating it. **One source of truth, no drift.**

## How to work on this project

- **Read `CLAUDE.md` first** for the project identity, the plan, the quality gates,
  the cost cap, the constitution, and `## granted-permissions`. This file holds the
  portable engineering guidance; `CLAUDE.md` holds the project-specific decisions.
- **All work and writing is in [LANGUAGE — default English].**

## Build / run / test

- **Install:** `[INSTALL_COMMAND]`
- **Run:** `[RUN_COMMAND]`
- **Test:** `[TEST_COMMAND]`
- **Lint / typecheck:** `[LINT_COMMAND]` / `[TYPECHECK_COMMAND]`

## Non-negotiables (the short version — full detail in CLAUDE.md)

- Test-driven development: no production code without a failing test first.
- No completion claim without fresh, in-this-message verifying output.
- No fix without a root-cause investigation first.
- No UI before the approved `design_guide_lines.md`.
- Never push to production or spend money without explicit owner approval.
- Never commit, log, or echo a secret; secrets live only in `.env` (gitignored).
- For mobile: a session isn't done without an on-device run + screenshot.

## Conventions

- Branch off `main`; one PR per feature; CI must be green to merge.
- Conventional Commits (`feat:`, `fix:`, `chore:`…); SemVer + a git tag per release.
- Keep files focused (one clear responsibility); reuse before creating.

> Project-specific rules, the MVP scope, the architecture, and the schedule live in
> `CLAUDE.md` and `docs/`. When something should be true in *every* session, it
> belongs in `CLAUDE.md` (or here, if it's tool-agnostic).
