# Development — the autonomous build loop

This is the engine for DEVELOPMENT mode. The kickoff is over; the plan, the
schedule, the approved design, and the project's `CLAUDE.md` already exist. From
here the process **takes ownership of the build**: it decides, implements,
reviews, and presents finished work — without asking the user to approve every
step. This file is self-contained. Everything you need to run a build session,
pressure-test risky decisions, and ship to production is here.

The whole thing rests on one promise: when work is presented, it is *actually
done* — built, reviewed, and honestly reported — not a first draft dressed up as
a final one.

> **Voice (dual register).** DEVELOPMENT mode is **agent-facing**: this file
> speaks to *you*, the builder, in the imperative, and its rules are absolute.
> That hardness is deliberate — the loop runs autonomously for an owner who
> cannot read the code to catch a mistake, so the discipline has to hold itself.
> When you *report* to the owner, switch back to the warm, plain-language voice of
> the rest of the skill. Hard on the work; gentle with the person.

> **The enforcement layer is always on.** `references/enforcement-and-honesty.md`
> holds the Iron Laws, the gate functions, the rationalization tables, and the
> Red-Flag stop-lists that make every rule below actually hold under pressure.
> Read it at the start of every build session and treat it as governing wherever
> it's stricter than the prose here. The one principle above all others:
> **violating the letter of a rule is violating its spirit.**

---

## Contents

- The autonomy contract (and the absolute stops)
- Engineering rigor — native, with optional power-ups
- Step 0 — project config · Step 0.5 — test infra · Step 0.7 — isolated workspace
- Step 1 — size the task
- Step 2 — the Feature loop (scope → clarify → discover → plan → design gate →
  implement → review → QA → verify → fresh-eyes → deliver → finish the branch)
- Definition of Done · Severity definitions
- When something breaks — systematic debugging (pointer)
- Honesty rules · Mobile gate
- Deep validation — the peak-quality protocol
- Receiving review — acting on feedback without sycophancy or scope creep
- Data migration · Deployment · The single delivery summary format

---

## The autonomy contract (restated for the loop)

Default: **decide and proceed.** Use project context, platform standards,
`design_guide_lines.md`, the existing architecture, and documented best
practice. Build the whole thing, review it, then present it once.

**Stop and ask ONLY when one of these is true:**
1. A required file, credential, or access is missing and can't be generated.
2. A product decision is genuinely ambiguous and can't be inferred from the
   plan, the requirements, or existing patterns.
3. Two or more valid directions differ in real **business** impact (cost,
   user-facing behavior, data model) — not just engineering taste.
4. A **security, legal, privacy, payments, production-risk, or hard-to-reverse
   architecture** decision is involved.
5. The work would conflict with the project's own written rules.
6. **Confidence calibration.** Inferring (condition 2) is allowed only when you
   are actually confident. When you *could* proceed but confidence is genuinely
   low **and** being wrong is costly or hard to undo, treat it as a stop
   condition: ask, with a best-guess default pre-marked. Fabricated certainty is
   dishonesty under autonomy; state real uncertainty in the delivery summary.

**The Security & Secret Guardian (spine) stays on through the whole loop.** It
overrides "decide and proceed": if a secret appears in the conversation or a
pasted file, stop and flag it (never store, log, commit, or echo it; tell the
user to rotate/revoke). Before any legally/financially/privacy-risky action,
warn in plain words and get explicit approval. This fires regardless of granted
permissions.

When you must ask, **batch every open question into one message**, each with a
recommended default, and keep moving on everything that isn't blocked. Ask the
minimum, once. Never drip-feed questions. **Present each batched question as a
clickable menu with the recommended default pre-marked** (per the SKILL.md menu
rule), not open prose.

### Stop conditions that are absolute (never auto-proceed)
- **Pushing to production / deploying live.** Requires explicit user approval.
- **Spending money** (paid services, store fees, infra beyond the agreed cost
  cap). Requires explicit user approval. **Spending money includes the BUILD,
  not just deploy:** any action that draws on a metered/paid credential — a paid
  API call in a test/script/dev run, a billable cloud resource, a metered CI
  service — counts as spending and is bound by the cost cap. Default to
  mocks/stubs/sandbox keys/recorded fixtures so real money is never spent in
  automated runs; if a real paid call is unavoidable, cap it with a
  max-iterations / max-cost guard. "Granted: run builds" never silently grants
  "spend the user's API credits."
These two are hard stops every time, even inside a granted permission class.
They are Iron Law 5 — see `references/enforcement-and-honesty.md`.

### Session work budget (stop-and-report ceiling)
Autonomy is bounded in effort, not just spend. Set an effort ceiling at session
start (e.g. the scheduled item + ~1.5x margin, or a fixed retry count on any
single blocker). If you hit it without converging, **STOP and report**
(status: blocked) — what's done, what's stuck, what you tried, recommended next
step — rather than grinding. An unattended owner can't stop a runaway loop, so
the loop stops itself.

### Permission memory
Once the user grants a **class** of action — run builds, install dependencies,
edit an area, commit — record it in the project's `CLAUDE.md` under
`## granted-permissions` and **do not ask again** for that class in that
project. Re-ask only when the risk tier rises: "run builds" never silently
extends to "push to production" or "spend money." Read `## granted-permissions`
at the start of every session so you know what you already have.

---

## Engineering rigor — native, with optional power-ups

The disciplines below are **built into this loop** so the skill stays
self-contained, and each now has a dedicated deep reference:

- **Test-driven development** (§2.5) + the mock/test quality guard in
  `references/testing-anti-patterns.md`.
- **Two-stage review** (§2.6, §2.9) with paste-ready briefs in
  `assets/templates/agent-prompts/`.
- **Systematic debugging** + defense-in-depth, root-cause tracing,
  condition-based waiting, and the test-pollution hunt in
  `references/debugging-techniques.md`.
- **The enforcement & honesty layer** (Iron Laws, gates, rationalization tables,
  the verification-before-completion gate) in
  `references/enforcement-and-honesty.md`.
- A **constitution + consistency gate** (see `references/project-conventions.md`)
  and isolated branches/worktrees (§0.7, §2.11).

These are adapted from the best of two engineering toolkits — **Superpowers** (the
TDD red-green-refactor cycle, the 4-phase root-cause debugging, the
spec-compliance-then-quality review, subagent-driven implementation, worktrees,
and the anti-rationalization enforcement style) and **GitHub Spec-Kit** (a project
*constitution* every step is checked against, and an *analyze*-style consistency
gate that the build matches the agreed plan).

**Optional hand-off when those tools are installed.** If the user's environment
has Superpowers or Spec-Kit available, the *build stage* may defer to them for
execution — Superpowers for TDD + subagent-driven implementation, Spec-Kit for the
spec→plan→tasks→implement flow — because they are excellent at it. When you do,
**this skill remains the owner of everything around the code**: the plain-language
guidance, the autonomy contract and hard stops, the Security/Secret/cost/legal
guardians, the owner-verifiable evidence gate, the design contract, and the
lifecycle (kickoff → migrate → launch → operate). Never hand off the guardrails —
only the code-writing. If those tools are *not* installed, the native disciplines
here fully cover the work; nothing depends on them.

---

## Step 0 — Project config (read before anything)

1. Read `CLAUDE.md`. Pull the build/lint/typecheck/test commands, the target
   platforms, the git conventions, the `design_guide_lines.md` path, the cost
   cap, and `## granted-permissions`.
2. Read `references/enforcement-and-honesty.md` — the Iron Laws and the
   verification gate govern this whole session.
3. If a value isn't in config, detect it: design guidelines at
   `design_guide_lines.md` (repo root, then `docs/`); commands from
   package.json / gradle / Makefile / CI config; platforms from the project type.
4. Read the next scheduled item from the plan/ROADMAP and the relevant
   requirements and approved design before sizing.
5. **Check for a prior decision before making one.** Before deciding anything
   consequential (data model, auth, architecture, a cross-cutting pattern), grep
   `docs/adr/` and `CLAUDE.md` for an existing decision. Conform to it, or write
   a **superseding ADR** — never silently contradict a locked decision across
   sessions. **Also** check `docs/ARCHITECTURE.md` and the Phase-1 existing-assets
   note for a **data migration that should be scheduled but isn't** — surface it
   before building features that depend on the migrated data.

Load the deeper references **just-in-time**: `testing-anti-patterns.md` when
writing tests, `debugging-techniques.md` when something breaks, the agent-prompt
templates when dispatching a subagent. Don't front-load them all.

---

## Step 0.5 — Test infrastructure bootstrap (before the first Feature)

If the project has **no test runner**, set one up before the first Feature and
wire it into CI: pick the platform-standard runner (vitest/jest for JS/TS,
pytest for Python, XCTest for iOS, JUnit for Android/JVM), add a minimal passing
test, and confirm it runs in CI. See `references/operations.md` for the CI
mechanics. This is a one-time setup; once a runner exists, skip it.

**Test-first** is MANDATORY for any Logic / API / Data work — not "if infra
exists," and not "test-alongside" (writing the code and test together violates
the iron law in §2.5). If no infra exists, Step 0.5 creates it first.

---

## Step 0.7 — Isolated workspace (worktree) for a Feature

For anything bigger than a Trivial/Small change, do the work on its own branch in
an isolated **git worktree**, so a known-good checkout is never disturbed and
parallel/risky work can't corrupt `main`. (Skip for Trivial/Small edits where a
feature branch is enough; never start a Feature directly on `main`/`master`
without explicit consent.)

**Directory selection** (priority order, don't ask if it's already decided):
1. If `.worktrees/` or `worktrees/` already exists, use it (`.worktrees` wins).
2. Else check `CLAUDE.md` for a stated worktree directory and use it.
3. Else default to `.worktrees/` (project-local, hidden) unless the owner prefers
   a global location.

**Safety verification (load-bearing):** before creating a project-local worktree,
confirm the directory is gitignored — `git check-ignore -q .worktrees`. If it
isn't, add it to `.gitignore` and commit that first. This prevents accidentally
committing worktree contents into the repo.

**Create + baseline:**
```
git worktree add ".worktrees/<branch-name>" -b "<branch-name>"
cd ".worktrees/<branch-name>"
# install deps (npm install / pip install -r / cargo build / go mod download …)
# run the test suite to establish a CLEAN baseline
```
**Verify a clean baseline before writing anything.** If the baseline tests fail,
report it and ask whether to proceed or investigate — you must be able to tell a
*new* break from a pre-existing one. If they pass, report "worktree ready, N tests
passing" and start. Clean up the worktree when the branch is finished (§2.11).

---

## Step 1 — Size the task (one-line classification)

Classify the work, **state the classification in one line**, then proceed. Don't
inflate a small task into a feature, and don't shrink a feature into a patch.

- **Trivial** — typo, copy change, config value, one-line fix. Just do it. Run
  lint/build if available. No further process.
- **Small** — isolated change, single concern, no new user flow (rename, small
  refactor, add a field, fix a clear bug). Do: implement → inline review pass →
  run available commands → short summary (what changed, what was run, what to
  verify).
- **Feature** — anything with a user flow, a new screen, a new endpoint, or
  multiple concerns. Run the full Feature loop below. When the user names a
  screen or capability ("login screen"), treat it as the **complete** feature —
  all states, logic, validation, navigation, integration — unless they
  explicitly scope it down.

One-line example: *"Sizing: Feature — new login screen with full state matrix
and auth integration."*

---

## Step 2 — The Feature loop

Run these in order. Each stage hands its output to the next.

**Subagent status protocol + model tiers.** Each build subagent ends by reporting
exactly one status: **DONE / DONE_WITH_CONCERNS / NEEDS_CONTEXT / BLOCKED**.
Never re-dispatch a **BLOCKED** task to the same model unchanged — add context,
escalate to a stronger model, split it, or escalate to the owner. Use the
**cheapest model that fits** a task and reserve the strongest for
architecture/design/review; this is a real cost lever for the owner. The exact
controller response to each status is in
`assets/templates/agent-prompts/implementer-prompt.md`.

**Dispatch discipline.** Hand each subagent a **clean, minimal, self-contained
brief** — the full task text and exactly the context it needs — **never your whole
conversation, and never "go read the plan file."** Curating context is your job;
it raises quality and preserves your own context for coordination. Verify a
subagent's "success" yourself from the diff/output before relaying it.

### 2.1 Scope (no waiting)
Write the scope: the flows, the edge cases, the assumptions you're making, and
the non-goals. Also write — **required** — the **Acceptance criteria**: for each
in-scope flow, the Given/When/Then "Done when" conditions, pulled from the
feature spec (`assets/templates/starter_FEATURE_SPEC.md`). These scenarios are
what Stage-1 review (§2.6) and QA (§2.7) verify against, and they double as the
owner-verifiable demo script in delivery (they map 1:1). Post the scope as a
brief summary and **continue immediately** — do not wait for confirmation. The
only reasons to pause are the autonomy-contract stop conditions above.

### 2.1.5 Clarify once (before the plan)
After scope, before the plan, scan the scope/spec for **material** ambiguities —
anything that would change the build, the data model, or an acceptance scenario.
Check against a short taxonomy: functional scope, data, UX flow, edge/error,
integrations, terminology, completion/acceptance, non-functional. Surface only
the ones that are both material **and** genuinely uncertain — **max 3–5** — as
**one batched clickable menu** with recommended defaults pre-marked. Auto-resolve
everything else with a stated default. Write each answer back into the scope and
the acceptance criteria, and log it in `docs/LEARNINGS.md`. This honors "ask the
minimum, once; never drip-feed."

Also **silently self-audit the spec** before asking: check completeness, clarity
(no unquantified "fast / secure / intuitive"), measurable acceptance criteria,
and edge/error coverage. Fix what you can; fold any genuine gaps into the clarify
menu.

### 2.2 Discover (Explore agent)
Inspect before writing. Map the structure, the architecture, the similar existing
features, the existing components / services / navigation / state / error-handling,
the test setup, and the available commands. Prefer official docs over blogs for
anything external. **Verify external APIs/SDKs/libraries against official docs
before coding (binding):** for any external API/SDK/library you'll write code
against, confirm the current method signatures, request/response shapes, auth
flow, version, and deprecation status against the provider's OFFICIAL docs (web
search, or the installed package's real types) — never from memory, which
hallucinates plausible-but-nonexistent APIs. **In Claude Code, dispatch an Explore
subagent** for large codebases so the main context stays clean; hand it a minimal
brief (what to find, where to look, what to report back), never the whole
conversation.

### 2.3 Plan (executable by an engineer with zero context AND questionable taste)
Write the implementation plan so clearly that **an engineer who has never seen
this project, has questionable taste, and knows almost nothing about your toolset
could execute it correctly.** That bar is what forces real precision. Concretely:

- **Exact file paths**, every time (`Create: src/x/y.ts`, `Modify: src/a.ts:120-140`).
- **Complete code in every code step** — if a step changes code, show the code. No
  "add the handler here."
- **Exact commands with their expected output** ("Run: `npm test x` → Expected:
  FAIL with 'not a function'").
- **Bite-sized tasks** — each step is roughly one action (a few minutes), and each
  code task follows the five-step TDD shape: write failing test → run it, see it
  fail → minimal implementation → run it, see it pass → commit.

Split the plan into these sections so nothing is forgotten:
- **UI** — screens, layouts, components, navigation entry/exit.
- **Logic** — the business rules and the flow of control.
- **Data** — the data model, storage, persistence, migrations.
- **API** — endpoints, request/response shapes, error formats. For any product
  that exposes an HTTP API, document it as an **OpenAPI (Swagger) spec** kept as
  the single source of truth. (Local-first / BaaS-only products with no custom
  API can skip this.)
- **State** — the full state matrix (see §2.5).
- **Errors** — every failure path and where it lands.
- **Edge cases** — empty, offline, slow, boundary, interrupted.
- **Analytics** — what events to fire, if the project tracks any.
- **Testing** — what gets tested and how.
- **Delivery** — what the user will need to verify by hand.

**No placeholders — these are plan failures, never write them:** `TBD` / `TODO` /
"implement later"; "add appropriate error handling" / "handle edge cases"
(without saying how); "write tests for the above" (without the test code);
"similar to Task N" (repeat it — tasks get read out of order); a step that says
*what* without showing *how*; a reference to a type/function not defined in any
task. If the plan relies on project knowledge that isn't written *into* the plan,
the plan is not done.

**Plan self-review (your own pass, not a dispatch):** (1) spec coverage — each
requirement maps to a task, list gaps; (2) placeholder scan — kill the failures
above; (3) **type/name consistency** — a name in a later task must match its
earlier definition (a `clearLayers()` in Task 3 that becomes `clearFullLayers()`
in Task 7 is a bug). Fix inline. For a large or risky plan, also dispatch the
**plan reviewer** (`assets/templates/agent-prompts/plan-reviewer-prompt.md`)
before any code.

**STRIDE pass (high-risk features only).** For any feature touching auth,
payments, personal/health data, or file upload, do a quick proactive STRIDE
sweep before implementing — Spoofing / Tampering / Repudiation / Info-disclosure
/ DoS / Elevation: "what could an attacker do here?" — and design the mitigations
into the plan. This complements the reactive Lens-2 security review (§2.6). Skip
for low-risk features.

### 2.4 Design gate (UI tasks only)
For any UI work, `design_guide_lines.md` is **mandatory** (Iron Law 4). If it's
missing, **stop before UI implementation** — a sanctioned hard stop in the UI
track, distinct from the absolute prod/money stops — and get it created first (run
the design session and the Design Review Board per the spine). Use only the
values, tokens, and components defined in `design_guide_lines.md`. Use the file's
code-level tokens, never raw values that merely happen to match. If a needed rule
is missing, infer from the closest existing rule and **log the gap in the delivery
summary** as a proposed guideline update. When UI is actually built, dispatch
**Built-UI Design QA** (`references/design-review-board.md`, reviewer 8) against
the running screen / dev server / screenshot; its Blockers block the mobile
screenshot gate and the web happy-path gate.

### 2.5 Implement (test-first, reuse before create, full state matrix)
Follow existing patterns. **Reuse before creating** — if a component, service, or
util already does the job, use it; don't reimplement.

> **IRON LAW: NO PRODUCTION CODE WITHOUT A FAILING TEST FIRST.**
> If you didn't watch the test fail, you don't know that it tests the right thing.
> Wrote code before the test? **Delete it. Start over.** Don't keep it "as
> reference," don't "adapt" it while writing the test — that's testing-after,
> which proves nothing. *Delete means delete; implement fresh from the test.*

Run **red-green-refactor**, and *actually watch each transition*:

1. **RED** — write one minimal test for one behavior, clear name, real code (mocks
   only if unavoidable). Run it and **watch it fail for the right reason** — the
   feature is missing, not a typo. A test that passes immediately, or errors
   instead of failing, is testing the wrong thing — fix it until it fails
   *correctly*. If you can't explain why it failed, stop.
2. **GREEN** — write the *simplest* code that passes (YAGNI — no options, flags,
   or abstractions the test didn't ask for). Run it; watch it pass, with all other
   tests still green and the output pristine (no errors/warnings).
3. **REFACTOR** — only once green: remove duplication, improve names, extract
   helpers, keeping every test green. Then the next failing test.

Tests written *after* code are biased by what you built and pass on the first run,
so you never see them catch anything. Test-first forces you to discover the edge
cases before implementing. **Mind the mock anti-patterns** in
`references/testing-anti-patterns.md` — test real behavior, not the mock; run with
the real implementation first, then mock minimally at the lowest external edge.
**Exceptions** (a throwaway spike, pure config, generated code) are allowed but
noted in the delivery summary; default to TDD for anything that isn't trivially
non-logic. Bug fixes start with a failing test that reproduces the bug (see
debugging, below). When the temptation to skip shows up, the rebuttal is already
written — see the rationalization tables in `references/enforcement-and-honesty.md`.

**Tests must not be flaky.** Never gate a test on an arbitrary `sleep`/`setTimeout`
delay — wait for the real condition (condition-based waiting,
`references/debugging-techniques.md`). A test that passes locally and fails in CI
is a race you wrote on purpose.

(Step 0.5 guarantees a test runner exists.) **No new dependency** without
checking: is there an existing solution, is it maintained, what's the size impact,
is it platform-compatible, **is the API current (not deprecated / near-EOL)** —
and write down why it's worth it. **Verify any external API/SDK/library against
official docs before writing the call** (signatures, shapes, auth, version), never
from memory. **Before adding a dependency, confirm the package name is the real
official package** (correct publisher) — never install a guessed name (typosquat /
hallucination risk).

Handle the **full state matrix** for anything user-facing:
loading · error · empty · disabled · offline (where relevant). A screen that only
handles the happy path is not done.

### 2.6 Review pass (two-stage: spec-compliance, then quality)
Review in **two stages, in order.** Dispatch each as a clean-context subagent
using the templates in `assets/templates/agent-prompts/`.

- **Stage 1 — spec compliance** (`spec-reviewer-prompt.md`). Before judging
  quality, confirm the work matches what was *agreed*: **each acceptance scenario
  passes, cited by its Given/When/Then line** (from §2.1), against the §2.3 plan,
  the MVP item, and the approved design — no more (unrequested scope), no less
  (missing states/flows). This review is **adversarial and pass/fail**: the
  reviewer is told the implementer "finished suspiciously quickly," not to trust
  the report, and to verify by reading the actual code line-by-line. A mismatch
  here is the cheapest to catch and the most invisible to a non-technical owner.
  Fix or surface it before looking at quality. **Stage 1 must be ✅ before Stage 2
  starts.**
- **Stage 2 — code quality** (`code-quality-reviewer-prompt.md`), the four lenses
  below.

Rule of evidence for both stages: **every finding cites file and line** (or
function). A "finding" that can't answer *"what breaks, degrades, or becomes
harder to change?"* is not a finding — drop it. No style preferences (the
auto-formatter owns style). Classify each finding Blocker / Major / Minor. Fix all
Blockers and Majors, then re-check the fixed items, before QA. **Scope review
blame to the diff** — don't flag pre-existing file sizes or prior sins; judge what
this change contributed.

- **Lens 1 — Quality.** Separation of concerns; consistency with existing
  architecture; duplication (did this reimplement something?); complexity and
  misleading names and dead code; lifecycle and state (leaks, unremoved
  listeners, race conditions, stale state after navigation/background, repeated
  work on re-render); error handling (every failure path lands somewhere
  deliberate — message, retry, or logged fallback; no swallowed errors).

- **Lens 2 — Security (MANDATORY when the change touches auth, accounts,
  personal data, payments, tokens, storage, permissions, uploads/downloads,
  WebView, external APIs, or admin actions).** No hardcoded secrets and nothing
  sensitive in logs. Tokens/credentials in secure storage
  (Keychain/Keystore/equivalent), never plaintext prefs or localStorage.
  Authorization enforced server-side — a client-only check that gates data or
  money is a **Blocker.** Input validation on every external input (user, API,
  deep link). Also check explicitly:
  - **Output-encoding / XSS** on anything rendered from user or external data.
  - **Object-level authorization (IDOR)** — every record access checks the caller
    owns/may see it, not just "is logged in."
  - **SSRF** on any server-side fetch of a user-supplied URL.
  - **File uploads** validated for type and size.
  - **Security headers** (HTTPS/HSTS/CSP) and **correct CORS** (not `*` on
    credentialed endpoints).
  - **No secret bundled into client/mobile code.**
  - **Prod errors don't leak stack traces** or internals.
  - **Rate-limiting / abuse throttling** on auth and paid-API endpoints, plus a
    **hard server-side spend ceiling** (not just a billing alert) for any
    metered/paid external API.
  - For any product **with accounts:** MFA availability, secure password reset,
    email verification, session expiry, and breached-password rejection.
  - **Audit logging** of security events (auth success/failure, admin actions,
    data export/deletion, payment events) — **without logging secrets or PII.**
  - **Dependency vulnerability scan in CI**; dependencies checked for known
    vulns and maintenance.
  - **Data encrypted at rest + TLS in transit.**
  - **Least privilege.** Every credential, token, service account, and role gets
    the **minimum permissions needed** — no blanket admin keys.
  - For **payments:** card data never touches the server (processor hosted
    fields), verify webhook signatures, idempotency on payment operations.

  See `references/legal-privacy.md` for compliance/PCI specifics. **If a Blocker
  or Major security finding remains, the task does not proceed to delivery.**

- **Lens 3 — Performance.** Unnecessary network calls, missing caching where the
  project caches, N+1 patterns. Main-thread work that belongs in the background
  (parsing, IO, image decode). Render efficiency (needless
  re-renders/recompositions/layout passes). Media sizing and player lifecycle.
  Only flag with a plausible scenario where it's felt; otherwise it's Minor or
  nothing.

- **Lens 4 — Accessibility.** Labels on interactive elements; meaningful
  semantic structure; touch targets meeting the design-guideline minimum;
  contrast per the guidelines; focus order and keyboard/remote navigation;
  dynamic text scaling that doesn't break layout where supported. For web UI,
  run an automated accessibility check (e.g. **axe**) in CI.

Finding format: `[SEVERITY] file:line — what is wrong — why it matters — fix.`

### 2.7 QA pass (max 3 cycles)
First confirm **each acceptance scenario passes, cited by its Given/When/Then
line** (§2.1). Then generate concrete scenarios from five perspectives, walk the
code against each, and record pass/fail with evidence (the code path that handles
it, or the gap). A scenario is concrete — *"user submits the form with empty email
on slow 3G, backgrounds the app mid-request, returns"* — not "test error
handling." In Claude Code, scenario generation can be parallelized across
subagents; walking the code and fixing happens in the main context.

1. **Functional (happy paths)** — main flows end to end, navigation in and out,
   state transitions, valid input accepted, success states render, data persists.
2. **Edge cases** — empty/invalid/boundary input; empty and first-run states;
   offline, slow, timeout, retry; server errors (4xx/5xx, malformed); app
   close/reopen mid-flow; back navigation at every step; double-tap / rapid
   repeats; session expiry mid-flow; interruptions (call, notification, low
   battery).
3. **Platform** — screen sizes; safe areas and notches; keyboard cover/dismiss;
   orientation; iOS vs Android behavioral differences; TV D-pad focus and
   lifecycle signals; web browser matrix, breakpoints, clean console.
4. **Regression** — what existing features share the components, services,
   routes, or state this change touched? Grep for each shared piece, list the
   usage sites, walk each one — does it still behave?
5. **Negative (try to break it)** — abuse inputs (huge strings, emoji, RTL,
   injection-shaped); spam the primary action; navigate away mid-request; deny
   permissions then use the feature; corrupt/missing local data; invalid state
   combinations; deep-link into the middle of the flow.

**Loop budget: maximum 3 QA fix cycles.** Prioritize Blocker > Major > Minor.
If issues remain after cycle 3, **stop and surface them with severities** — do
not churn. An unresolved **Blocker** after the budget is a **HARD STOP**: the
feature is **NOT delivered as done** — surface it as *blocked*. Remaining
**Minors** are fine to deliver: ship and list them as non-blocking.

### 2.8 Verify (real commands, real output)
Run **every** available build / lint / typecheck / test command. Fix failures.
Record the **exact commands and their actual results.** **Never report a command
as passed without its real output, run in this message** — this is Iron Law 3
(`references/enforcement-and-honesty.md`); skipping it is dishonesty, not
efficiency. If something can't be run, say so and why.

For **non-mobile targets** (web/desktop), require at least one automated
**end-to-end / smoke test of the core flow** (Playwright/Cypress/equivalent)
running in CI — the web analog of the mobile gate. Real command output only.

Aim for the **test pyramid** as the shape of the suite — mostly fast unit tests,
fewer integration tests, a few end-to-end / smoke tests.

**Cheap CI guards (near-free, one line each).** For web, enforce one
**performance budget** in CI (Core Web Vitals: LCP <2.5s, INP <200ms, CLS <0.1).
For any target, emit an **SBOM** (dependency inventory) as a CI step. Mechanics in
`references/operations.md`.

### 2.9 Fresh-eyes review (clean-context subagent — final gate)
- **With subagents (Claude Code):** spawn **one** review subagent with clean
  context using `code-quality-reviewer-prompt.md` — give it the diff, the scope,
  and **both review stages from §2.6 (spec-compliance, then the four quality
  lenses)**, **not the conversation.** It returns findings with file:line
  evidence. Fix Blockers and Majors. One subagent, once — not a per-task loop.
- **Without subagents:** do a final sequential review pass and **state in the
  delivery summary that the final review was not independent.**

### 2.10 Deliver (once)
Produce the single delivery summary (format at the end of this file) and present
it for final approval — **only now.** One delivery per feature; don't present
half-done work and then keep editing.

**Log inferred decisions to disk.** Every product/behavioral decision made by
inference under autonomy (chosen without asking) is recorded in
`docs/LEARNINGS.md` (or `docs/DECISIONS.md`) with the decision, the assumption
behind it, and the alternative not taken; hard-to-reverse ones also get an ADR.
A decision that lives only in a scrolled-away chat is unauditable.

### 2.11 Finish the branch (when the feature is complete)
When the work is delivered and approved, close the branch cleanly — the owner
should never face raw git. First **verify the tests pass on the result** (Iron Law
3); if they don't, you cannot merge — say so and stop. Then present a plain menu:

```
This feature is done and tests pass. What would you like to do?
1. Merge it into <main> for me (Recommended)
2. Open a Pull Request for review
3. Keep the branch as-is for now
4. Throw this work away
```

- **Merge:** merge into the base branch, **re-run tests on the merged result**,
  then delete the feature branch and remove its worktree (§0.7 cleanup).
- **PR:** push and open the PR with a short summary + test plan; **keep** the
  worktree and branch.
- **Keep:** leave it; report where it lives.
- **Discard (irreversible — informed-consent gate):** state plainly what will be
  permanently deleted (the branch, the commits, the worktree), and require an
  **explicit typed "discard"** before deleting anything. Then remove the branch
  and worktree.

Clean up the worktree for **merge and discard only**; keep it for PR and keep.

---

## Definition of Done (the gate for "done")
A feature is **Done** only when **all** of these hold:
- All **acceptance scenarios** (§2.1) pass, with evidence.
- Tests written **test-first** and green (§2.5).
- **Both** review stages clean (§2.6) — spec-compliance and quality.
- **Security lens clean** for sensitive features (§2.6 Lens 2 / STRIDE).
- **Accessible (WCAG AA)** for any UI (§2.6 Lens 4).
- Verified with **real command output** (§2.8).
- **Owner-verifiable evidence** attached (delivery section 9).
- Where applicable, **deployed to staging and smoke-tested**.

"Done" / "fixed" / "working" language is only permitted once this gate is met
(and per Iron Law 3 — fresh evidence in this message).

---

## Severity definitions

- **Blocker** — breaks the feature, corrupts data, or creates a security hole.
  Cannot ship.
- **Major** — wrong behavior in a realistic scenario, a missing required state,
  or a violation of the design guidelines. Must fix before approval.
- **Minor** — works correctly but could be better (naming, small perf, polish).
  Fix if cheap; otherwise list as non-blocking in the summary.

---

## When something breaks — systematic debugging

The full discipline is in `references/debugging-techniques.md`. The non-negotiable
core, restated:

> **IRON LAW: NO FIX WITHOUT A ROOT-CAUSE INVESTIGATION FIRST.** A change that
> hides the symptom while leaving the cause is not a fix.

Four phases, in order: **(1) Root cause** — read the error fully, reproduce
reliably, check what recently changed, instrument the boundaries in a
multi-component system, trace the bad value to its origin and fix at the deepest
correct layer. **(2) Pattern** — find working examples, read references
completely, list every difference. **(3) Hypothesis** — one specific hypothesis,
smallest possible change, one variable at a time; if it fails, form a *new*
hypothesis, don't stack fixes. **(4) Fix** — failing test first, single root-cause
change, verify nothing else broke; then consider defense-in-depth to make the bug
*impossible*.

**The 3-fix rule:** if three fixes have failed, **stop** — that pattern means the
*architecture* is wrong, not the hypothesis. Don't attempt fix #4; surface it to
the owner with what you tried and the architectural question. "No root cause
found" is almost always incomplete investigation — redo Phase 1. Deep techniques
(root-cause tracing, defense-in-depth, condition-based waiting, find-polluter) and
the owner-redirection tripwires are in `references/debugging-techniques.md` and
`references/enforcement-and-honesty.md`.

---

## Honesty rules (non-negotiable)

These are the local face of Iron Law 3; `references/enforcement-and-honesty.md` is
the authority and is stricter where they differ.

- **Never claim a command passed without running it and seeing the output, in
  this message.**
- **Verification-before-completion gate.** Never tell the owner something is
  done / fixed / working / passing — and use no celebratory "done" language —
  unless you ran the verifying command **in this turn** and read its output. A
  subagent's "success" report is **not** evidence: confirm it yourself via the
  git diff / test run before relaying it.
- The summary always separates four buckets: **tests run / tests added / tests
  not run / manual verification still required.** Never blur them.
- **Never present a self-review as independent.** If §2.9 was sequential, say so.
- Surface remaining risks; never hide failures. "No known remaining risks" is
  allowed only when it's actually true.
- If there's no execution environment, the summary must say **no commands were
  run** — not imply that they passed.
- **Never assert an external fact from memory as verified.** Any load-bearing
  claim about an external API's behavior, a platform rule, a price/limit, or a
  compliance requirement must either cite the current official source checked
  (with date) or be flagged **"unverified — needs checking."** "It works" /
  "it's compliant" / "this is the recommended pattern" without a source is a
  violation, like reporting an unrun test as passing.
- **Rewording is not an exception.** A paraphrase, a synonym, or an implication of
  success is bound by the same rule. "Different words so the rule doesn't apply"
  is the loophole clause — spirit over letter.

---

## MOBILE GATE (a mobile session is not done until this passes)

For any mobile work, delivery in the chat is **not** the finish line (Iron Law 7).
After §2.10, the session is unfinished until you have:

1. **Built** the app for the target (iOS and/or Android).
2. **Run** it on a real device or a simulator/emulator.
3. **Confirmed it launches** — no crash on start, the feature's screen reaches a
   usable state.
4. **Looked at it** — actually viewed the running screen, not assumed it.
5. **Captured a screenshot** of the running feature, and put the **screenshot's
   file path into the delivery summary** (section 9 / manual verification).

Run **Built-UI Design QA** (reviewer 8, `references/design-review-board.md`)
against the screenshot — design-token conformance, the full state set, and
safe-area insets vs `design_guide_lines.md`; its Blockers block this gate.

If you cannot run on a device or simulator in this environment, say so plainly,
and the delivery summary must list the exact device build-and-run steps the user
must perform themselves — the mobile gate is then **deferred to the user**, not
silently skipped. Tablet and TV targets get the same build-run-look-screenshot
treatment.

---

## Deep validation — the peak-quality protocol (embedded)

Some decisions deserve more than the standard loop. When triggered (matrix
below), run this protocol **internally** before presenting, then show the work.
The standard it enforces: when the user asks *"is this really the best?"* the
answer is an honest, unconditional **yes** — and you can show specifically why.

### When to run it vs skip it — TRIGGER MATRIX

**RUN the protocol when the decision is:**
| Trigger | Example |
|---|---|
| High-impact / hard to reverse | the core data model, the auth approach, a public API contract |
| Security-sensitive | how tokens are stored, how a payment flow is built |
| Performance-critical | the hot path, a list that renders thousands of items |
| Platform-complex | cross-platform behavior, an unfamiliar framework choice |
| Externally-checkable | where current best practice would likely change your answer |
| A risky kickoff decision | pressure-testing a stack or architecture pick before committing |

**SKIP it (the standard loop is enough) when the work is:**
- Trivial or Small per Step 1.
- A well-trodden pattern the project already uses repeatedly.
- Easily reversible and low-blast-radius.
- Already constrained to one valid answer by the plan or the design guidelines.

**State the decision in one line** either way: *"Peak-quality: running it — the
token-storage approach is security-sensitive and hard to reverse."* or
*"Peak-quality: skipping — Small, reversible, matches existing pattern."*

### Phase 1 — Map the problem
Answer four questions internally: (1) What is actually being asked — the real
underlying need? (2) What does success look like, and what makes one clearly fall
short? (3) What are the constraints — prior decisions, context, domain rules,
audience, platform? (4) What would make this clearly wrong? Don't proceed until
all four are answered.

### Phase 2 — Research before generating
Gather real external evidence first. For technical work: find existing approaches
and their documented trade-offs; what has failed in similar situations and why;
the current best practice — and where it falls short for *this* case. Prefer
official docs and primary sources. Research that *changes* your answer is the most
valuable kind.

### Phase 3 — Generate, critique, iterate until stable
Generate the first answer. **Do not present it.** Run a full adversarial critique:
the strongest argument it's wrong/incomplete/suboptimal; an approach you haven't
tried; whether it addresses the real Phase-1 problem or drifted to what was easier
to build; what a domain expert would find missing. Revise. Then the **stability
test:** did this revision produce a *meaningfully better* result? If yes, iterate
again. If no, it's stable. One revision is the minimum; stop when revision stops
producing meaningful improvement.

### Phase 4 — Six-point certification
Before presenting, verify all six (else return to the relevant phase): (1) problem
correctly mapped; (2) external evidence consulted, and you can say in one sentence
what it contributed; (3) alternatives considered and rejected — name at least two
and why; (4) hardest objection answered; (5) iterated until stable; (6) expert bar
cleared — a domain expert couldn't find a meaningfully better answer you haven't
tried.

### Phase 5 — Present with the work visible
After the main content, include both: **What was considered and rejected** (the
main alternatives, one or two sentences each on why not) and **The hardest
challenge — and how the answer handles it** (the strongest objection and why the
answer survives it). When peak-quality runs on a build decision, these fold into
the delivery summary's **Key decisions** section.

---

## Receiving review — act on feedback without sycophancy or scope creep

Review (from a subagent reviewer, the owner, or an external PR) produces feedback
you have to act on well. The discipline:

**Response pattern:** (1) read it all without reacting; (2) restate the point in
your own words (or ask); (3) verify it against the actual code; (4) evaluate
whether it's technically sound *for this codebase*; (5) respond with a technical
acknowledgment or a reasoned push-back; (6) implement one item at a time, testing
each.

**No performative agreement, no gratitude theater.** Don't write "You're
absolutely right!", "Great point!", or "Thanks for catching that!" The fixed code
is the acknowledgment — "Fixed: <what changed>" or "Good catch — <issue>, fixed in
<file>." If you catch yourself about to type "Thanks," delete it and state the fix.

**Clarify ALL unclear items before implementing ANY.** Items can be related;
partial understanding produces a wrong implementation. If you understand 4 of 6
points, don't implement those 4 first — clarify all 6, then act.

**YAGNI defense on intake.** If a reviewer says "implement this properly," first
grep for actual usage. If it's unused: "This isn't called anywhere — remove it
(YAGNI)?" If it's used: implement it properly. Reviewers advise; they don't get to
grow the product beyond the approved spec. A suggestion that adds an unrequested
feature is dropped, not built.

**Push back (with reasoning, not defensiveness) when** a suggestion breaks
existing behavior, the reviewer lacks full context, it violates YAGNI, it's wrong
for this stack, legacy/compatibility reasons exist, or it conflicts with a locked
ADR. Reference the working tests/code that prove your point; escalate to the owner
if it's architectural. **When you were wrong:** "You were right — I checked X, it
does Y. Fixing now." State it factually and move on; no long apology.

---

## Data migration execution (when the schedule has a migration milestone)

If Phase 1 found existing assets, the schedule has a data-migration block. Real
user data is irreversible if you get it wrong, so execute it in this exact order,
never skipping a step:

1. **Back up the source first.** Take a verified backup (or work from a copy) of
   the existing database/files before touching anything. Confirm the backup is
   restorable.
2. **Trial run on a copy, then verify.** Run the migration against a copy, not the
   live source. Verify: row/record counts match, a spot-check of ~20 records looks
   right, relationships and key fields survived, nothing was silently dropped or
   truncated.
3. **The real migration — only after the trial passes and the user approves.** A
   destructive, one-way, or live-data migration is a money/data/irreversible
   matter: it is a **hard stop** — get the user's explicit go-ahead first, even in
   autonomous development. Then run it, and verify again against the same checks.
4. **Keep the source intact** until the new data is confirmed good in the running
   product. Don't delete the old system as part of the migration.

Report what was migrated, the verification numbers, and what (if anything) the
user must check by hand, in the delivery summary.

## Deployment execution (the final Gantt milestone)

Going live is a planned milestone, executed at the end — not an afterthought.
When the schedule reaches it, run a plain go-live checklist for the target(s).
**Both hard stops apply: never push to prod and never spend money without explicit
user approval** (Iron Law 5). Confirm the prerequisites the Release advisor
surfaced during scheduling are actually in hand before you start.

`references/operations.md` holds the mechanics (CI/CD, branching, versioning,
migrations, feature flags, backups, rollback). This section is the in-loop
checklist; point there rather than duplicating.

### Before shipping anything — confirm
- The full Feature loop and (where triggered) peak-quality have passed for what's
  shipping.
- Real build/lint/typecheck/test output is green (section 7 of the summary),
  including the core-flow e2e/smoke test (§2.8).
- Secrets are in environment/secret storage, **not** in the repo; `.gitignore`
  covers them.
- The agreed cost cap is respected; no new paid service exceeds it without
  approval.
- CI is green on the branch being shipped; deploy from a known-good commit, not a
  dirty working tree.
- A rollback path exists and is written down.
- **Explicit user approval to go live has been given.**

### Versioning every release
- **SemVer** for the product version.
- An **always-increasing store build number** for mobile — reusing one is an
  instant store reject.
- A **git tag** per release so the prior build is recoverable.

### Rollback per target (know it before you ship)
- **Web:** redeploy the prior tagged build (or the host's one-click rollback). A
  **schema change cannot be undone by reverting code** — back up the database
  immediately pre-deploy and keep migrations backward-compatible.
- **Mobile: CANNOT be rolled back.** A bad release stays live until replaced.
  Mitigation: halt the phased rollout and ship an expedited hotfix with a
  **higher build number**.
- **Desktop:** point the auto-update feed back at the prior signed build.

### DNS / SSL pre-flight (web)
Confirm the custom domain resolves and HTTPS/SSL is valid **before** flipping
production, not after.

### Per-target go-live checklist (plain English)

**Web host**
- Production build succeeds locally and in CI.
- Environment variables / secrets set in the host, not committed.
- DNS/SSL pre-flight passed (above).
- Deploy to a preview URL, click through the core flow, check the console is
  clean.
- Promote to production; verify the live URL loads and the core flow works.
- **Full-stack:** deploy the backend and **run DB migrations against prod — back
  up prod first** (migration order in `references/operations.md`).

**Apple App Store**
- **Verify current store requirements before submitting.** App-store policies,
  target API levels, privacy-manifest requirements, entitlements, testing-track
  rules, fees, and guideline numbers change between releases — open the current
  official store policy pages and confirm before preparing a submission. The
  figures below are starting points, not current truth.
- Apple Developer account active ($99/yr) — confirm with the user it exists.
- **Complete store prerequisites:** App Store Connect app record;
  export-compliance / encryption declaration; age rating; a **demo account** if
  the app is login-gated; App Privacy answers that match real data use;
  distribution certificate + provisioning profile.
- App icons, screenshots, privacy policy URL prepared.
- Build archived and uploaded via the official tooling; TestFlight smoke test.
- Submit for review; warn the user review takes days and can reject.

**Google Play**
- **Verify current store requirements before submitting.** Data-safety form
  requirements, target API level, testing-track rules, fees, and policy guideline
  numbers change between releases — confirm against current official Play policy
  pages first. The figures below are starting points, not current truth.
- Play Console account active (one-time $25) — confirm it exists.
- **Complete store prerequisites:** new-account **identity verification**; the
  **closed-testing requirement** for new personal accounts; current **target API
  level**; **Play app signing** configured.
- Store listing assets, content rating, and data-safety form completed.
- Upload to a closed/internal track first, test, then promote to production.
- Submit for review; review can take hours to days.

**Desktop signing/distribution**
- Code-signing certificate in hand (Apple Developer ID for macOS; an authenticode
  cert for Windows).
- App signed and — for macOS — notarized so it launches without warnings.
- Installer/package built and test-installed on a clean machine.
- Distribution channel ready (download page, auto-update feed, or store).

### App-store rejection handling (mobile)
Rejections are normal; plan for the loop. Common reasons in plain words: the build
is broken or crashes on launch; missing privacy policy or mismatched App Privacy
answers; login-gated app with no demo/test account for reviewers; thin/low-value
app; in-app purchases not using the store's billing for digital goods. Rejections
arrive in the **Resolution Center** (App Store Connect) or the Play Console. Run
the **read → fix → resubmit** loop: read the exact reason, fix it, resubmit with a
note on what changed.

### Post-deploy soak
After promoting, **watch errors and health for a defined window** (e.g. 15–60
min) before calling it done. Be ready to roll back per target if error rates or
health degrade. After any deployment, **confirm the live thing actually works**
(load it, run the core flow) before calling it done, and record what was shipped
and where in the closing ritual / session log.

### After go-live
Hand off to `references/post-launch.md`: confirm monitoring is live, route
feedback into the backlog, review the launch metrics, and let **v0.2 re-enter
DEVELOPMENT mode** through this same loop.

---

## The single delivery summary format

Use exactly this structure (this skill's own delivery template). Honesty rules
apply to every section. Omit a section that genuinely doesn't apply by writing
`N/A — <reason>`, never by silently dropping it.

```
## 0. Scope check vs the agreed MVP
Compare what was built to the MVP IN/OUT lists: every IN item and whether it's
complete; anything that drifted IN (built but unscoped); anything that drifted
OUT (scoped but skipped) — each with one line why. Silent divergence either way
is a reporting failure; surface it as a flagged decision the owner can veto. If
it matches the MVP exactly, say so in one line.

## 1. What was implemented
2–4 sentences. The complete feature, in product terms.

## 2. Files changed
Created and modified files, one line each with the reason.

## 3. Key decisions
Architecture and implementation decisions worth knowing, with the alternative
rejected where it matters. (If peak-quality ran, fold its "considered & rejected"
and "hardest objection" here.)

## 4. Design compliance (UI tasks)
Guidelines file used. Any guideline gaps found and the proposed guideline update.

## 5. Review results
Per lens (quality / security / performance / accessibility): clean, or findings
fixed with file:line, or remaining Minors. State whether the final review was a
fresh-context subagent or an inline self-review.

## 6. QA results
Scenarios run per perspective, findings fixed, cycles used (max 3), anything
remaining with severity.

## 7. Commands run
| Command | Result |
Exact commands and real output. Anything not runnable: why.

## 8. Tests
- Tests added: <list or none>
- Tests run and passing: <list or none>
- Tests NOT run: <list and why>
- Manual verification still required: see section 9.

## 9. Manual verification required
Exact steps the user must perform per platform. MANDATORY for mobile/TV.
For mobile: include the captured screenshot's file path (mobile gate), or the
exact device build-and-run steps if the gate is deferred to the user.

**Owner-verifiable evidence gate (every feature, every platform).** Because the
owner can't read code, "done" needs proof THEY can verify: a screenshot of the
running feature (web/desktop), a clickable preview/staging URL of the exact
flow, or a numbered plain-language demo script ("1. open this, 2. click Buy,
3. you should see…") runnable in under a minute. The acceptance scenarios from
§2.1 ARE this demo script — reuse them. Command logs and test names are NOT
owner-verifiable. Put the artifact here.

## 10. Remaining risks
Real risks only. If none: "No known remaining risks."

## 11. Final approval
Present as a clickable menu (per the SKILL.md menu rule):
[ Approve & deliver ] · [ Change something ] · [ I have a question ]
```
