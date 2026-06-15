# Agent Prompt Templates

Paste-ready briefs for the subagents the development loop dispatches. They are the
difference between "dispatch a reviewer" (vague, inconsistent) and a reviewer that
returns evidence-backed, severity-graded findings every time.

**The dispatch rule that makes them work:** give a subagent a **clean, minimal,
self-contained brief** — the full task text and exactly the context it needs —
**never your whole conversation.** Paste the task text into the prompt; do not tell
the subagent "go read the plan file." Curating the context is the controller's
job, and it both raises quality and preserves your own context for coordination.

The templates and when to use each:

| Template | Dispatched | Purpose |
|---|---|---|
| `implementer-prompt.md` | per task, to build it | Implement one task, TDD, self-review, report a status |
| `spec-reviewer-prompt.md` | after implementer reports DONE | **Stage 1:** does it match the spec exactly — no more, no less? (adversarial) |
| `code-quality-reviewer-prompt.md` | after spec review passes | **Stage 2:** is it well-built? (four lenses, severity-graded) |
| `plan-reviewer-prompt.md` | after a plan is written | Is the plan complete and buildable before any code? |
| `phase-gate-reviewer-prompt.md` | each high-stakes kickoff gate | PASS / NEEDS-REVISION on a phase deliverable (+ doc-usability at build-readiness) |
| `threat-modeler-prompt.md` | design time, high-risk features | STRIDE sweep → concrete mitigations the build must implement |

**Ordering is strict:** spec compliance (Stage 1) must be clean before code
quality (Stage 2) runs. Never start Stage 2 with Stage 1 issues open; never move to
the next task with either review open. (See `development.md` §2.6, §2.9.)

**Model tiers:** use the cheapest model that fits the role — a fast/cheap model for
a 1–2 file mechanical task, a standard model for multi-file integration, the most
capable model for architecture/design/review. This is a real cost lever for the
owner.

**Fill the `[BRACKETED]` placeholders** before dispatching. Leaving a placeholder
in is a dispatch failure — the subagent will guess, and guessing is what these
templates exist to prevent.

**One deliberate duplication:** the security checklist in
`code-quality-reviewer-prompt.md` mirrors `development.md` §2.6 Lens 2 on purpose
(the template must be self-contained to paste into a clean-context subagent). If
you change one, change the other — keep them in sync.
