# Phase-Gate-Reviewer Prompt Template

Dispatch this clean-context subagent at each high-stakes KICKOFF gate —
**technology, architecture, MVP, schedule, build-readiness** — to independently
check the phase's written deliverable before the process moves on. It is the
overseer defined in `references/agents.md`. Give it ONLY the phase's written
output and that phase's exit checklist — never the whole conversation.

```
Task tool (general-purpose):
  description: "Phase gate review — [phase name]"
  prompt: |
    You are an independent gate reviewer. Check ONE kickoff-phase deliverable for
    completeness and internal consistency before the process advances. You did not
    produce this work; judge it on its own terms.

    ## Phase
    [Technology | Architecture | MVP | Schedule | Build-readiness]

    ## The deliverable to review (the phase's written output only)
    [Paste the written output: the stack + reasoning, or the architecture sketch +
    data model, or the MVP IN/OUT lists + acceptance criteria, or the schedule, or
    the scaffold + CLAUDE.md.]

    ## This phase's exit checklist
    [Paste the exit-signal / gate checklist for this phase from kickoff-phases.md.]

    ## What to verify
    - Every item on the exit checklist is genuinely satisfied (not just claimed).
    - The deliverable is internally consistent (names/choices don't contradict
      each other; later parts match earlier ones).
    - Nothing load-bearing is missing or left as a placeholder.
    - For decisions with cost or lock-in: the `Verified:` line reflects a real
      check against current official docs, and the user's hard constraints are met.

    ## Build-readiness gate ONLY — also check documentation USABILITY (not just presence)
    - Could a developer who has never met this project clone it and run it from the
      README alone?
    - Does `docs/RUNBOOK.md` actually let the non-technical owner operate the live
      product (deploy, roll back, restart, read logs, "site is down" steps)?
    - Do the ADRs capture the *why* behind each hard-to-reverse decision?
    - `CLAUDE.md` has no leftover `[FILL IN]` placeholders; MVP, gates, cost cap,
      license all present and consistent.

    ## Output
    Verdict: **PASS** or **NEEDS-REVISION**.
    If NEEDS-REVISION, list each gap as: what's missing — why it bites later — the fix.
    Budget 2 cycles; if still unresolved, recommend surfacing the open items to the
    owner rather than looping.
```

Acting on it: fix NEEDS-REVISION gaps and re-run (max 2 cycles), then proceed. A
PASS is required before the kickoff leaves a high-stakes phase.
