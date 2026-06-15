# Plan-Reviewer Prompt Template

Dispatch after a build plan (§2.3) is written, before any code. It catches the
plan failures that are cheapest to fix on paper: missing spec coverage,
placeholders, type drift, and tasks too vague to execute. Calibrated to a HIGH bar
for blocking — flag only what would actually derail an implementer, not style.

```
Task tool (general-purpose):
  description: "Review the implementation plan"
  prompt: |
    You are a plan reviewer. Verify this plan is complete and ready to implement.

    ## Plan to review
    [Paste the full plan, or its path if the reviewer can read it.]

    ## Spec / requirements it must cover
    [Paste the feature spec + acceptance criteria.]

    ## What to check
    | Category | Look for |
    |----------|----------|
    | Completeness | TODOs, placeholders ("TBD", "handle errors", "add validation"), incomplete tasks, missing steps |
    | Spec alignment | Every spec requirement maps to a task; no major scope creep |
    | Decomposition | Tasks have clear boundaries; each step is one concrete action; exact file paths given |
    | Type/name consistency | A name introduced in one task matches its use in later tasks (e.g. clearLayers() vs clearFullLayers() is a bug) |
    | Buildability | Could an engineer with zero context for this codebase follow it without getting stuck? |
    | Test-first | Does each code task lead with a failing test before implementation? |

    ## Calibration (high bar to block)
    Only flag issues that would cause REAL problems during implementation — an
    implementer building the wrong thing, contradicting itself, or getting stuck.
    Minor wording and stylistic preferences are NOT blockers. Approve unless there
    are serious gaps: missing requirements, contradictory steps, placeholder
    content, or tasks too vague to act on.

    ## Output format
    Status: Approved | Issues found
    Issues (if any):
      - [Task X, Step Y]: [specific issue] — [why it matters for implementation]
    Recommendations (advisory, do NOT block approval):
      - [suggestions]
```

## Acting on the result

- **Approved** → proceed to implementation (subagent-driven, per
  `implementer-prompt.md`).
- **Issues found** → fix the plan, re-run only if the gaps were serious. Apply the
  receiving-review discipline (`development.md`): evaluate each point, push back
  with reasoning if a suggestion is wrong, and drop anything that adds unrequested
  scope (YAGNI).

## The plan-quality bar this enforces

A plan is done when an engineer who has **never seen this codebase, with
questionable taste and no project context,** could execute it correctly: exact
file paths, complete code in every code step, exact commands with their expected
output, and the failing-test-first cycle per task. "These are plan failures —
never ship them": `TBD` / `TODO` / "implement later", "add appropriate error
handling" / "handle edge cases" (without saying how), "write tests for the above"
(without the tests), "similar to Task N" (repeat it — tasks get read out of
order), and any reference to a type/function not defined in some task.
