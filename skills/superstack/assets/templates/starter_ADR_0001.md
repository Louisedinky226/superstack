# ADR 0001 — Kickoff Decisions

> **What is an ADR?** An ADR (Architecture Decision Record) is a short, dated
> note that captures a big decision and *why* we made it. Months from now,
> nobody remembers why we picked this database or that framework — so we write
> it down once, in plain words. Each record says: what the situation was
> (Context), what we chose (Decision), why we chose it (Reasoning), and how
> hard it would be to undo (Reversibility). When a decision changes later, we
> don't edit the old record — we write a new ADR that replaces it.

- **Date:** [DATE]
- **Status:** Accepted
- **Author:** [AUTHOR]

This first record captures the major decisions made during the project
kickoff, so the foundations of [PROJECT_NAME] are never a mystery.

---

## Summary Table

| # | Decision area | What we chose | How reversible |
|---|---------------|---------------|----------------|
| 1 | Tech stack | [CHOICE] | [Hard / Medium / Easy] |
| 2 | Architecture | [CHOICE] | [Hard / Medium / Easy] |
| 3 | Database | [CHOICE] | [Hard / Medium / Easy] |
| 4 | Auth | [CHOICE] | [Hard / Medium / Easy] |
| 5 | Hosting / deployment | [CHOICE] | [Hard / Medium / Easy] |
| 6 | MVP scope | [SUMMARY] | [Easy] |

---

## Decision 1 — Tech Stack

- **Context:** [What problem / need led to this choice. What options existed.]
- **Decision:** [What we chose.]
- **Reasoning:** [Why this option won over the others, in plain words.]
- **Reversibility:** [How hard it would be to change later, and what it would cost.]

---

## Decision 2 — Architecture

- **Context:** [The situation and the alternatives considered.]
- **Decision:** [What we chose.]
- **Reasoning:** [Why.]
- **Reversibility:** [How hard to change.]

---

## Decision 3 — Database

- **Context:** [Data shape, scale, and the options weighed.]
- **Decision:** [What we chose.]
- **Reasoning:** [Why.]
- **Reversibility:** [How hard to change — data migrations are usually costly.]

---

## Decision 4 — Auth

- **Context:** [Who logs in, how, and what was considered.]
- **Decision:** [What we chose.]
- **Reasoning:** [Why.]
- **Reversibility:** [How hard to change.]

---

## Decision 5 — Hosting / Deployment

- **Context:** [Where it runs, cost cap, and the options.]
- **Decision:** [What we chose.]
- **Reasoning:** [Why.]
- **Reversibility:** [How hard to change.]

---

## Decision 6 — MVP Scope

- **Context:** [The full idea vs. what ships first.]
- **Decision:** [The IN list — the smallest end-to-end version.]
- **Reasoning:** [Why these items and not the others; what was cut and why.]
- **Reversibility:** [Easy — scope can be expanded in later sprints.]

---

> New significant decisions get their own numbered file: `ADR_0002.md`, and so
> on. To change a decision here, write a new ADR that supersedes it — don't
> rewrite history.
