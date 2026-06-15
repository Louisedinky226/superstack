# Implementer Prompt Template

Dispatch one subagent to build one task. Front-loads questions, enforces TDD and a
self-review, and makes escalation safe. Paste the FULL task text — never make the
subagent read the plan file.

```
Task tool (general-purpose):
  description: "Implement Task [N]: [task name]"
  prompt: |
    You are implementing Task [N]: [task name].

    ## Task description
    [FULL TEXT of the task — paste it; do not tell the subagent to read a file.]

    ## Acceptance criteria (the definition of done)
    [The Given/When/Then "Done when" scenarios for this task, verbatim from the
    feature spec. These are what the spec reviewer and QA will check against.]

    ## Context (where this fits)
    [Scene-setting: the relevant existing components/services to reuse, the data
    model, the navigation entry/exit, dependencies, and the architectural context.
    Include the design_guide_lines.md token names if this is UI work.]

    ## Working rules (non-negotiable)
    - Work from: [directory / worktree path].
    - TEST-FIRST. No production code without a failing test first. Write one
      minimal test, run it, watch it fail for the RIGHT reason (feature missing,
      not a typo), then write the simplest code to pass. Red → green → refactor.
      If you wrote code before the test, delete it and re-implement from the test.
    - REUSE before creating: if a component/service/util already does the job, use
      it. Don't reimplement.
    - Handle the FULL state matrix for anything user-facing: loading, error,
      empty, disabled, offline (where relevant) — not just the happy path.
    - If this touches auth / personal data / payments / storage / permissions /
      uploads: apply the security lens and say so in your report.
    - Verify any external API/SDK against its official docs before calling it —
      never from memory. Confirm a new dependency's package name is the real
      official one before installing.
    - Use only values/tokens/components from design_guide_lines.md for UI; never
      raw values that merely match.

    ## Before you begin
    If anything about the requirements, approach, dependencies, or acceptance
    criteria is unclear — ASK NOW, before writing code. It is always OK to pause
    and clarify. Don't guess.

    ## Code organization
    - One clear responsibility per file, with a well-defined interface.
    - If a file you're creating grows beyond the plan's intent, STOP and report it
      as DONE_WITH_CONCERNS — do not split files on your own.
    - In an existing codebase, follow established patterns; improve what you touch,
      but don't restructure things outside your task.

    ## When you're in over your head
    It is always OK to stop and say "this is too hard for me right now." Bad work
    is worse than no work, and you will NOT be penalized for escalating. STOP and
    escalate when: the task needs an architectural decision with multiple valid
    approaches; you can't get clarity from the context provided; you're unsure your
    approach is correct; the task means restructuring code the plan didn't
    anticipate; or you've been reading file after file without progress.

    ## Before reporting back: self-review (fresh eyes)
    - Completeness: did I implement every acceptance scenario? Any requirement or
      edge case missed?
    - Quality: is this my best work? Are names accurate (what things do, not how)?
      Is it clean and maintainable?
    - Discipline: did I avoid overbuilding (YAGNI)? Build only what was requested?
      Follow existing patterns?
    - Testing: do the tests verify real behavior (not mock behavior)? Did I follow
      TDD? Are edge/error cases covered?
    Fix anything you find before reporting.

    ## Verification (do this, don't assume it)
    Run the build / lint / typecheck / test commands and READ the output. Do not
    report anything as passing that you did not run in this turn.

    ## Report format
    - Status: DONE | DONE_WITH_CONCERNS | BLOCKED | NEEDS_CONTEXT
    - What you implemented (or attempted, if blocked)
    - What you tested, and the REAL command output (tests run / added / not run)
    - Files created/changed, one line each with why
    - Security-lens note (if it applied)
    - Self-review findings, and any concerns or remaining risks

    Use DONE_WITH_CONCERNS if you finished but have doubts about correctness or
    scope. Use BLOCKED if you cannot complete it. Use NEEDS_CONTEXT if information
    was missing. Never silently produce work you're unsure about.
```

## Controller response to each status

- **DONE** → dispatch the spec reviewer (`spec-reviewer-prompt.md`).
- **DONE_WITH_CONCERNS** → read the concerns first. If they're about correctness
  or scope, resolve before review; if they're observations (e.g. "this file is
  getting large"), note them and proceed.
- **NEEDS_CONTEXT** → provide the missing context, re-dispatch.
- **BLOCKED** → diagnose: a context gap → add context, re-dispatch the same model;
  needs more reasoning → re-dispatch a more capable model; too large → split it;
  the *plan* is wrong → escalate to the owner. **Never re-dispatch a BLOCKED task
  to the same model unchanged. Never ignore an escalation.**

Verify the implementer's "success" yourself from the git diff / test output before
relaying it (Iron Law 3). A subagent's report is not evidence.
