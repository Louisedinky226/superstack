# BACKLOG — [PROJECT_NAME]

> The running list of work, simplest possible. Three buckets by when, plus a
> set of standing checks that apply to everything we ship. Pull from **Now**;
> promote items up as priorities shift. Keep it short and honest.

> **Priority markers** — tag each item so its urgency is obvious:
> **P0** = ship now (broken / unsafe / blocking), **P1** = important soon,
> **P2** = nice to have. P0 jumps the queue ahead of everything else.

---

## Standing Checks (apply to every item)

- [ ] Passes build, lint, and tests.
- [ ] Matches `design_guide_lines.md` (no off-token values).
- [ ] Mobile work: built, ran on device/simulator, screenshot captured.
- [ ] Security reviewed if it touches auth, data, payments, storage, or permissions.
- [ ] No secrets committed.

---

## Now (active — being worked on)

- [ ] [ITEM]

---

## Next (queued — coming soon)

- [ ] [ITEM]

---

## Later (someday / maybe)

- [ ] [ITEM]

---

## Bugs / Incidents (things that broke — give them a home)

Post-launch issues, regressions, and reported bugs land here with a priority
marker so they're triaged, not lost. **P0** items are dropped on and fixed
immediately, ahead of planned work.

- [ ] [P0 / P1 / P2] [BUG_OR_INCIDENT]
