# Spec-Reviewer Prompt Template (Stage 1 — spec compliance)

The first review gate. It answers one question: **did the implementer build
exactly what was requested — nothing missing, nothing extra?** It is deliberately
**adversarial**: the reviewer is told not to trust the implementer's report and to
re-derive compliance from the actual code. This stage is pass/fail (✅/❌), not
severity-graded — either it matches the spec or it doesn't.

Dispatch it only after the implementer reports DONE. It must pass before the
code-quality reviewer runs.

```
Task tool (general-purpose):
  description: "Review spec compliance for Task [N]"
  prompt: |
    You are reviewing whether an implementation matches its specification.

    ## What was requested
    [FULL TEXT of the task requirements.]

    ## Acceptance criteria it must satisfy
    [The Given/When/Then "Done when" scenarios, verbatim.]

    ## What the implementer claims they built
    [Paste the implementer's report.]

    ## Git range to inspect
    Base: [BASE_SHA]   Head: [HEAD_SHA]
    (Read the actual diff and the actual files — not just the report.)

    ## CRITICAL: do not trust the report
    The implementer finished quickly and their report may be incomplete,
    inaccurate, or optimistic. You MUST verify everything independently.
    DO NOT: take their word for what they built; trust their completeness claims;
            accept their interpretation of the requirements.
    DO:     read the actual code; compare it to the requirements line by line;
            check for things they claimed but didn't implement; look for extra
            things they added that weren't asked for.

    ## What to verify (by reading the code, not the report)
    Missing requirements:
      - Did they implement everything requested?
      - Did they skip or miss any requirement?
      - Did they claim something works that isn't actually implemented?
      - Does each acceptance scenario actually hold? Cite it by its Given/When/Then.
    Extra / unneeded work:
      - Did they build things that weren't requested (scope creep)?
      - Did they over-engineer or add "nice to haves" not in the spec?
    Misunderstandings:
      - Did they interpret a requirement differently than intended?
      - Did they solve the wrong problem, or the right one the wrong way?

    ## Report
    - ✅ Spec compliant — everything matches after reading the code, every
      acceptance scenario holds (cite each), nothing extra.
    - ❌ Issues found — list each precisely with file:line:
        - MISSING: [what was requested but isn't there]
        - EXTRA: [what's there but wasn't requested]
        - MISMATCH: [what was built differently than specified]
    Verdict must be one of ✅ / ❌. Do not soften a ❌ into "mostly fine."
```

## Acting on the result

- **✅** → proceed to Stage 2 (`code-quality-reviewer-prompt.md`).
- **❌** → send the specific gaps back to the SAME implementer subagent to fix,
  then re-dispatch this spec review. Loop until ✅. Do not "accept close enough"
  on spec compliance, and do not start Stage 2 with spec issues open.

A mismatch caught here is the cheapest possible bug to fix and the one most
invisible to a non-technical owner — which is exactly why this gate is adversarial
and pass/fail.
