# ROADMAP — The Road to Production

> This is the plan that takes [PROJECT_NAME] from today to live. It is a
> Gantt-style schedule: one concrete, finishable deliverable per row, with
> plain calendar dates and real buffer time. The milestones below are
> **mandatory and ordered** — production is planned here and shipped at the end,
> never as an afterthought. Update the boxes as items complete.

- **Start date:** [START_DATE]
- **Target go-live:** [GO_LIVE_DATE]
- **Available time per week:** [HOURS_PER_WEEK]

---

## Mandatory Milestones (in order)

1. **Design Session** — decide how the product looks and feels.
2. **Design Guidelines** — write `design_guide_lines.md`, the binding UI contract.
3. **Data Migration** *(only if there are existing assets — delete this row if not)* — back up the source, trial-run on a copy and verify, then the real migration with the user's approval.
4. **Dev Sprints** — one sprint per MVP IN item, built in order.
5. **QA Pass** — test everything end-to-end; fix what breaks.
6. **Security Pass** — review auth, data, secrets, permissions; harden.
7. **Legal & Privacy artifacts** *(required before go-live if any personal data is collected)* — finalize `privacy-policy.md` and `terms-of-service.md`, wire up consent where needed. See `legal-privacy.md`.
8. **Backups & Monitoring live** *(go-live prerequisite)* — production backups running with a tested restore, plus uptime/error/alerts monitoring in place. See `operations.md`.
9. **Beta / soft-launch** *(optional)* — release to a small group first to catch real-world issues before the full launch.
10. **GO-LIVE / Store Release** — the final milestone, run as a sequence, not a single day:
    - **Submit** — send the build to the app store / deploy to production.
    - **Store review** — wait for Apple/Google approval (typically **1–3 days**, and they **may reject**).
    - **Rejection buffer** — reserved slack to fix and resubmit if rejected.
    - **Release** — flip it live to users.
    - **Post-launch watch (48h)** — actively watch monitoring and incidents for the first 48 hours.
11. **Post-launch** — after go-live: triage incidents, watch metrics, and plan the next iteration. See `post-launch.md`.

No UI code starts before milestone 2 is approved. Go-live is always last. The
migration milestone (3) only appears when Phase 1 found existing data/systems to
carry over; place it so features that depend on the migrated data come after it.
The Legal & Privacy milestone (7) is required whenever any personal data is
collected; Backups & Monitoring (8) is always a go-live prerequisite.

---

## Schedule (Gantt-to-Production)

| Week | Day(s) | Dates | Deliverable | Milestone | Depends on | Status |
|------|--------|-------|-------------|-----------|------------|--------|
| 1 | Day 1 | [DATE] | Design session — flows, look & feel, key screens | Design Session | — | ☐ |
| 1 | Day 2 | [DATE] | Write `design_guide_lines.md`; pass Design Review Board | Design Guidelines | Design Session | ☐ |
| 1 | Day 3–5 | [DATE] | Dev sprint — [MVP_IN_ITEM_1] | Dev Sprints | Design Guidelines | ☐ |
| 2 | Day 1–3 | [DATE] | Dev sprint — [MVP_IN_ITEM_2] | Dev Sprints | [MVP_IN_ITEM_1] | ☐ |
| 2 | Day 4–5 | [DATE] | Dev sprint — [MVP_IN_ITEM_3] | Dev Sprints | [MVP_IN_ITEM_2] | ☐ |
| 3 | Day 1 | [DATE] | **Buffer** — slack for overruns and surprises | — | — | ☐ |
| 3 | Day 2–3 | [DATE] | QA pass — full end-to-end testing, bug fixes | QA Pass | Dev Sprints | ☐ |
| 3 | Day 4 | [DATE] | Security pass — auth, data, secrets, permissions | Security Pass | QA Pass | ☐ |
| 4 | Day 1 | [DATE] | Finalize privacy policy + ToS, consent *(if personal data)* | Legal & Privacy | Security Pass | ☐ |
| 4 | Day 2 | [DATE] | Backups running + monitoring/alerts live | Backups & Monitoring | Security Pass | ☐ |
| 4 | Day 3 | [DATE] | **Beta / soft-launch** *(optional)* — small group first | Beta | Backups & Monitoring | ☐ |
| 4 | Day 4 | [DATE] | **Buffer** — final fixes and release prep | — | — | ☐ |
| 4 | Day 5 | [DATE] | **Submit** to store / deploy to production | GO-LIVE | Legal & Privacy, Backups & Monitoring | ☐ |
| 5 | Day 1–3 | [DATE] | **Store review** *(1–3 days, may reject)* | GO-LIVE | Submit | ☐ |
| 5 | Day 4 | [DATE] | **Rejection buffer** — fix & resubmit if needed | GO-LIVE | Store review | ☐ |
| 5 | Day 5 | [DATE] | **Release** — flip live to users | GO-LIVE | Store review | ☐ |
| 6 | Day 1–2 | [DATE] | **Post-launch watch (48h)** — monitoring + incidents | GO-LIVE | Release | ☐ |
| 6 | Day 3+ | [DATE] | **Post-launch** — triage, metrics, next iteration | Post-launch | Release | ☐ |

> Add or remove dev-sprint rows so there is **exactly one per MVP IN item**.
> Keep at least one buffer day before QA and one before go-live.
> The **Depends on** column names what must finish first — use it to spot what
> blocks what and reorder safely.
> **Buffer scales with risk:** the more uncertain or irreversible the work, the
> more slack to reserve. And **app-store review is elapsed wait time**, not your
> effort — you can't speed it up, so treat **go-live as a window, not a single
> day**.

---

## Notes

- Each deliverable is something you could demo or check off — not a vague phase.
- If a row slips, the buffer absorbs it; if the buffer is gone, the go-live
  date moves, not the quality gates.
- Mark `☑` when a deliverable is complete and its quality gates have passed.
