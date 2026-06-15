# CLAUDE.md — The Project Brain

> This file is the single source of truth for this project. Every working
> session reads it first. It carries the plan, the rules, the quality gates,
> and the working pattern forward across sessions and across people.
> Keep it current. If the project changes, this file changes with it.
> **All work and all writing on this project is in English.**
>
> **See also `AGENTS.md`** — the canonical, tool-agnostic agent instructions. This
> file is the Claude-specific layer; portable build/run/test commands and
> non-negotiables live in `AGENTS.md` (one source of truth, no drift).

---

## Project Identity

- **Name:** [PROJECT_NAME]
- **One-line pitch:** [ONE_SENTENCE_PITCH]
- **Audience:** [WHO_IT_IS_FOR]
- **Language:** English (all code, comments, docs, and conversation)
- **Status:** [e.g., Kickoff complete — entering development]

---

## Constitution

The non-negotiable principles this project always obeys, no matter the feature.
Written once at kickoff; changing one is a deliberate decision recorded as an ADR,
never a silent drift. Every session is checked against these (the consistency
gate). Fill in the ones that apply:

- All work and writing is in English.
- No feature ships without tests (test-driven development).
- [Data protection, e.g. "all personal/health data encrypted at rest and in transit"].
- [Accessibility bar, e.g. "WCAG AA is mandatory"].
- [The cost cap below is never exceeded without explicit re-approval].
- [Privacy/legal commitments, e.g. "we honor data-deletion requests"].
- [Any other principle the owner considers inviolable].

---

## Tech Stack

What this project is built with, and why each piece was chosen.

- **Frontend / Client:** [FRONTEND_STACK]
- **Backend:** [BACKEND_STACK]
- **Database:** [DATABASE]
- **Auth:** [AUTH_PROVIDER]
- **Hosting / Deployment:** [HOSTING]
- **Key libraries / services:** [KEY_DEPENDENCIES]

---

## MVP Scope

The smallest version that delivers the core value end-to-end: one user, one
use case, working start to finish. Everything not on the IN list is OUT for
now — on purpose.

### IN (build these)
- [ ] [MVP_IN_ITEM_1]
- [ ] [MVP_IN_ITEM_2]
- [ ] [MVP_IN_ITEM_3]

### OUT (deliberately not now)
- [MVP_OUT_ITEM_1]
- [MVP_OUT_ITEM_2]
- [MVP_OUT_ITEM_3]

---

## Quality Gates

Work is not "done" until every gate that applies has passed. Never claim a
gate passed without the real command output to prove it.

- **Build:** `[BUILD_COMMAND]` must succeed with no errors.
- **Lint:** `[LINT_COMMAND]` must pass clean.
- **Tests:** `[TEST_COMMAND]` must pass; new logic ships with tests.
- **Design compliance:** UI matches `design_guide_lines.md` (no off-token values).
- **Mobile on-device rule (mandatory for mobile work):** every mobile dev
  session, after delivery, must **build and run on a real device or simulator,
  confirm the app actually launches, be looked at by eye, and have a screenshot
  captured and saved.** A mobile session is not done without this. "It compiles"
  is not the same as "it runs and looks right."
- **CI:** continuous integration runs the gates on every push (set up day one).

---

## Cost Cap

Hard limit on money this project may spend without explicit re-approval.

- **Monthly cost cap:** [COST_CAP] (paid services, LLM/API usage, hosting)
- If a change would push spending over this cap, **stop and ask** before proceeding.

---

## License & Repository

- **License:** [LICENSE]
- **Repository visibility:** [public / private]
- **Remote:** [REPO_URL]

---

## Build Configuration (autonomous development loop)

Settings the autonomous development loop reads before building.

- **Design guidelines path:** `design_guide_lines.md` (binding UI contract)
- **Build command:** `[BUILD_COMMAND]`
- **Lint command:** `[LINT_COMMAND]`
- **Test command:** `[TEST_COMMAND]`
- **Run/launch command:** `[RUN_COMMAND]`
- **Target platforms:** [iOS / Android / Web / TV / Desktop]
- **Git conventions (sensible defaults — change only with reason):**
  - Branch naming: `feature/<short-name>` — feature branches off `main`.
  - Commit style: **Conventional Commits** (`feat:`, `fix:`, `chore:` …).
  - Main branch: `main`, **protected — no direct pushes**; all changes land via PR.
  - PR / review policy: **one PR per feature**, all required CI checks green
    before merge. See `operations.md`.
  - Versioning: **SemVer** (major.minor.patch) with a git **tag** per release.
- **Environments:** dev / staging / prod kept separate; build and test in
  dev/staging, never directly on prod. See `operations.md`.
- **Backups:** production data backed up regularly with a tested restore path.
  See `operations.md`.
- **Monitoring:** uptime, errors, and key metrics watched in production with
  alerts. See `operations.md`.

---

## Compliance Flags (captured at kickoff)

Recorded answers that drive what legal/privacy work is required. Update if the
product changes. See `legal-privacy.md` for what each triggers.

- **Collects personal data?** [yes / no]
- **Targets or may reach under-13 users?** [yes / no]
- **Has EU or California users?** [yes / no]
- **Uses analytics / tracking?** [yes / no]
- **Handles payments?** [yes / no]

---

## granted-permissions

This list records the **classes of action the user has approved** so they are
**never asked for again** in this project. When the user grants a class (run
builds, install dependencies, edit an area, commit), record it here with the
date. Do **not** re-ask for anything on this list. Re-ask only when the risk
tier rises — a grant to "run builds" never extends to "push to production",
"spend money", or "delete data".

_(Starts empty. Add entries as they are granted.)_

| Date | Granted action-class | Notes / scope |
|------|---------------------|---------------|
|      |                     |               |

---

## Session Rituals

Every session opens and closes with a ritual so multi-session work stays
coherent and keeps compounding.

- **Opening trigger:** the **first message of any chat** (a greeting, a
  question, or a direct work request). Orient: confirm the right project is
  loaded, say "protocol loaded", read the last session-log entries + the next
  ROADMAP item + `git status`, then present a Focus Menu of the 3 most relevant
  tasks (most critical recommended), load that focus's files, and go.
- **Closing trigger:** an **explicit farewell** ("thanks, that's it for today",
  "see you tomorrow"). Finishing a task is **not** a farewell. On close: honest
  retrospective + session score → **write the session-log entry to disk** →
  report uncommitted changes → give the exact gate-first commit + push commands
  → preview the next session as a Focus Menu of the 3 most relevant tasks (most
  critical recommended), each with its tool + model tier.

---

## Continuous Improvement

Every session must leave the project better on two axes:
- **Performance** — the product itself (working features, quality, polish).
- **Efficiency** — how we work (faster, cleaner, fewer repeated mistakes).

Improvement is not optional or occasional; it is the standing expectation of
every session.

---

## 3-Strikes Codification Policy

When the same mistake or friction happens **three times**, it stops being a
one-off and becomes a **hard rule**. Log each occurrence in
`docs/LEARNINGS.md`. On the third strike, promote the learning into an explicit
rule in this file (or the relevant config) so it can't happen a fourth time.

---

## ADR Practice (Architecture Decision Records)

Every significant, hard-to-reverse decision (stack, architecture, data model,
auth, deployment target) is recorded as a numbered **ADR** in `docs/adr/`. An
ADR captures the **Context, Decision, Reasoning, and Reversibility** of a
choice so future contributors understand *why*, not just *what*. Start from
`starter_ADR_0001.md`. Never silently reverse an ADR — write a new one that
supersedes it.

---

## Refusal Clauses (non-negotiables)

These are declined kindly, with a plain explanation, then the protocol
proceeds correctly. The assistant will **not**:
- Skip the planning, the schedule, the design guidelines, or the first push.
- Ship UI before an approved `design_guide_lines.md` exists.
- Claim a build/test/lint passed without showing the real command output.
- Mark a mobile session done without the on-device run + screenshot.
- Spend money past the cost cap, or take an irreversible/production-risk action,
  without explicit approval.
- Commit secrets, keys, or credentials to the repository.

## Security & Secret Guardian (always on — overrides autonomy)

This protects the owner, who may not be technical, every session — not just at
the security pass. It is never disabled by granted permissions.
- **If a secret is shared** (password, API key, private key, token, DB string,
  card/bank number): stop, flag it plainly, never store/log/commit/echo it, and
  tell the owner to rotate or revoke it. Decline to hard-code it even if asked;
  guide it into `.env` or a secret manager instead.
- **Before any legal / financial / privacy-risky action** (collecting personal
  data without a privacy policy, handling card data directly, messaging real
  users at scale, making personal data public, deleting real data, spending
  money): pause, explain the risk in plain words, get explicit approval.
- **Built in:** security is a mandatory review lens for any feature touching
  auth/data/payments/storage/permissions; a blocking secret scanner runs in CI.
