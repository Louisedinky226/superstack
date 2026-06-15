# Session Rituals — how every working session opens and closes

Every chat in this skill is bookended by a ritual. The opening ritual orients us
so multi-session work stays coherent; the closing ritual captures what we
learned and leaves the project safely backed up. Together they make the work
**compound**: each session starts where the last one ended and ends a little
better than it began.

This file gives the exact steps. The project's own `CLAUDE.md` carries the
project-specific identity (name, non-negotiables, language, style); these rituals
are the generic "how the work happens around it."

**Efficiency promise.** Both rituals are deliberately fast: orient, decide focus,
move. The opening ritual reads only a handful of files and then loads *only what
the chosen focus needs*; the closing ritual is a tight wrap-up, never a second
project. A ritual that becomes bureaucracy is being run wrong. (The one exception is a
long-gap *stale resume* — step 4 — which is intentionally a bigger first turn; the
everyday open stays fast.)

---

## Contents

- The opening ritual (greet → confirm repo → protocol loaded → orient → **Focus Menu** → go)
- Focus → files map (what to load for each kind of focus)
- The closing ritual (retro+score → write log → report → commit/push block → **3-task next-session menu**)
- The continuous-improvement principle (how the two halves lock together)
- Refusal clause (if the user tries to skip)

---

## The opening ritual (first message of every chat)

Fires on the **first message of any chat** — a greeting, a question, a direct
work request, even one word. The trigger is "first message," not a specific
phrase. Do these steps in order; don't turn a first message into bureaucracy —
orient, then move.

1. **Greet briefly.** One warm line. Sets the tone, no more.

2. **Confirm the right folder / repo is loaded.** Verify the correct project
   workspace is open. If it isn't, ask for it before doing anything else — work
   in the wrong folder is worse than no work.

3. **Say "protocol loaded."** Explicitly tell the user the protocol is active so
   they know you're operating under this pattern, not improvising.

4. **Orient on project state (minimum reads).** Read only what you need to choose
   a focus — not the whole library:
   - the **last few entries of `docs/CHATLOG.md`** — where we left off, what's in
     flight, and (key) the **3-task menu the last closing ritual proposed**;
   - the **next items on `docs/ROADMAP.md`** — the scheduled work;
   - **`git status`** — any uncommitted changes or drift to surface first.
   The deeper files are loaded *after* the focus is chosen (step 5), so the
   session stays lean.

   **Stale-resume freshness pass (only when time has passed).** Look at the date
   of the last `CHATLOG.md` entry; if it's been ~2 weeks or more, the project may
   have drifted even though the files didn't. Before proposing work, do a quick
   freshness pass and report it as a short menu:
   - **Dependencies** — new security advisories or major version bumps; run the
     ecosystem's audit/outdated check.
   - **Credentials & accounts** — could any token, certificate, API key, or domain
     have EXPIRED, or a free trial converted to paid, during the gap? Flag the ones
     the user must check themselves; you can't.
   - **Platform/tooling** — did the OS, framework, or a key provider ship a
     breaking change?
   Surface these as "worth a look before we build." If it's only been a day or
   two, skip this.

   **Continuity — check for a prior decision.** When this session will make a
   consequential decision, check `docs/adr/` and `CLAUDE.md` for an existing
   decision in that area first, and conform to it (or write a superseding ADR) —
   never silently contradict a locked decision.

5. **Present the Focus Menu — then run.** This is where the session gets a clear
   direction, so the rest of the chat (and which files we open) follows from it.
   Never open with a vague "what do you want to do?"

   - **DEVELOPMENT mode** (the plan and schedule exist **and the first push /
     build-readiness gate has passed** — if a kickoff was started but not
     finished, resume KICKOFF at the first incomplete phase instead): present a **clickable
     Focus Menu of the 3 most relevant tasks** — normally the same three the last
     closing ritual proposed (they carry over), refreshed against the ROADMAP and
     anything a blocker/decision pushed up. The **single most important one is
     first and marked "(Recommended — most critical)"**, with one plain line each
     on what it is and why it's next, plus an **"Other / something else"** escape.
     This is a quick focus check, not a request to approve every step.

     Once the user picks (or stays silent on the recommendation): **load only the
     files that focus needs** (see the Focus → files map below), say in one line
     which you're loading, then **go** — build the whole thing under the autonomy
     contract and return the finished, reviewed delivery. The user picks the
     focus, then waits for the result; only stop mid-way for a genuine stop
     condition.

   - **KICKOFF mode** (session 1 of a brand-new product): there's no schedule
     yet, so there's nothing to choose from — the focus is simply to **begin
     discovery.** Say so and start the guided interview, opening with the **Power
     Inversion** framing (`spec-driven-kickoff.md`). No menu on the very first
     message.

If a project has no session log, no ROADMAP, or no git yet, the reads are
best-effort: say "I'd normally read X here, but it doesn't exist — want me to
scaffold it or skip?" The structure still applies; it adapts to what's there. If the project has
started but has no ROADMAP yet, populate the Focus Menu from `git status` and the
last `CHATLOG.md` pointer, and make "build a ROADMAP" one of the options.

### Focus → files map (just-in-time, so context stays lean and relevant)

Load only the files the chosen focus actually needs. This is what keeps each
session fast and the context clear — you read the few files for *this* task, not
the whole library.

*Paths: skill files live under `references/`; project files live at the project
root (e.g. `design_guide_lines.md`) or under `docs/` (e.g. `docs/ARCHITECTURE.md`,
`docs/adr/`).*

| If the focus is… | Load (only) |
|---|---|
| Any build task | `references/enforcement-and-honesty.md` (Iron Laws) + the feature's spec + the next ROADMAP item |
| A UI / screen | the above **+** `design_guide_lines.md` and the approved design |
| Data model / architecture change | the above **+** `docs/ARCHITECTURE.md` and the relevant ADR in `docs/adr/` |
| A bug / something broken | the above **+** `references/debugging-techniques.md` |
| Planning / kickoff / scoping a new feature | `references/spec-driven-kickoff.md` + `references/kickoff-phases.md` |
| Deploy / go-live / post-launch | `references/operations.md` + `references/post-launch.md` |
| Security / privacy / legal | `references/legal-privacy.md` |

When in doubt whether a doc applies, load it — a wrong skip costs more than an
extra read. But default to *this focus's* files, not all of them.

---

## The closing ritual (only on an explicit farewell)

Fires **only on an explicit farewell** — "thanks, that's it for today," "see you
tomorrow," "we're done," "good night," or any clear close. **Finishing a task is
NOT a farewell.** Completing the work is a completion signal, not a session-end
signal — wait for the explicit close before running this. Do these steps in
order:

> **Kickoff exception:** the very first session (the kickoff) always ends by
> running this full closing ritual at Phase 9, farewell or not — completing the
> first git push *is* the session boundary. After session 1, the
> explicit-farewell trigger applies normally.
>
> **Kickoff paused mid-flight:** a founder with limited hours will often stop
> *before* Phase 9 (say, after Phase 3), when there's no repo to push to yet. On
> a farewell mid-kickoff, run a lightweight close instead: write a short resume
> note to `docs/KICKOFF-RESUME.md` (which phase we reached, the decisions locked
> so far) and tell the founder exactly which phase we resume next time — don't
> force the git-push steps when there's nothing to push yet.

1. **Retrospective + honest session score (the most important step).** Three
   honest bullets: what worked, what didn't, and ONE concrete improvement for
   next session. Then a session score on three axes — product/code quality,
   protocol compliance, and efficiency. **Be honest.** An inflated score is
   worthless; the retrospective only compounds if it tells the truth. If there's
   no improvement worth recording, say "none this session" and notice the
   absence — a string of sessions with no improvement is itself a signal.

2. **Compose the session-log entry.** Strict, skimmable format: max 5 content
   bullets plus 2 trailing bullets (one process-improvement, one next-session
   pointer). Each bullet ≤ 2 sentences. Tight enough that next session's opening
   ritual can read it in seconds.

3. **WRITE the session-log entry to disk.** This is a **real file write** to
   `docs/CHATLOG.md` — not just prose in the chat. Composing the entry in chat
   without writing the file is a protocol violation: next session reads the file,
   not this conversation, so an unwritten entry is a lost session. Write it.

4. **Report uncommitted work.** Run `git status`; list what's changed and what's
   not yet committed, so nothing is silently left behind.

5. **Give the exact gate-first commit + push commands, in one block.** A single
   fenced code block, ordered **gate first**: run the verification gate (build /
   lint / tests), then `git add`, then `git commit` (the message is the `-m`
   argument inside the block, not separate prose), then `git push`. One block the
   user can run start to finish. Gate-first means we never push code that hasn't
   passed its checks.

   ```bash
   # gate: verify before committing
   <build/lint/test command for this project>
   # then stage, commit, push
   git add -A
   git commit -m "<concise summary of this session's work>"
   git push
   ```

6. **Next-session preview — a ready Focus Menu of the 3 most relevant tasks.**
   Don't end on a vague "what next?" Hand the next session a running start: the
   **three most relevant items from the ROADMAP**, presented as a clickable menu
   the user can pick from when they return, with the **single most critical one
   first and marked "(Recommended — most critical)"** and one sentence on why.
   For **each of the three**, give a compact line carrying its own **tool** and
   **model**, so whichever the user picks, they already know where and with what
   to run it:

   ```
   Next session — pick a focus:
   1. <task>  (Recommended — most critical) — <why it's most urgent now>.
      Tool: <Cowork chat / Claude Code / browser>   Model: <the strong one (deep thinking) / the fast one (routine)>
   2. <task> — <why it matters>.
      Tool: <…>   Model: <…>
   3. <task> — <why it matters>.
      Tool: <…>   Model: <…>
   • Other / something else
   ```

   - **Choosing the three:** the next scheduled ROADMAP items, plus anything a
     fired blocker, failed gate, or new decision made more urgent. Rank by what
     actually unblocks or de-risks the project — the most critical is the
     recommendation, not just the next line in the file. When nothing is an obvious blocker, rank by:
     (1) what unblocks other work, then (2) what has a deadline or cost/risk
     attached, then (3) the next scheduled item. If the kickoff isn't finished yet
     (no ROADMAP), the recommended item is simply "resume kickoff at Phase N".
   - **Tool guide:** Cowork chat for planning, decisions, documents, research; a
     coding tool (e.g. Claude Code) for hands-on building in the repo; the browser
     for anything needing a real website (host signup, app-store console, DNS).
   - **Model guide:** a **top-tier reasoning model** for heavy thinking
     (architecture, security, tricky design/debugging, any peak-quality
     validation pass); a **fast, economical model** for routine edits, small
     fixes, mechanical work. If unsure, default to the more capable model for
     anything consequential.

   This menu is written into the session-log entry (step 2) and **becomes next
   session's opening Focus Menu (step 5)** — so the two rituals lock together and
   the next chat opens already knowing what, where, and with what.

**Document-hygiene check (light, every close).** Glance at whether any project
doc has grown heavy this session (a long `CHATLOG.md`, a bloated `CLAUDE.md`).
If so, run the careful trim/archive pass from `project-conventions.md` →
*Document hygiene*: auto-clean only genuinely dead content, shorten verbose
passages without changing meaning, archive old log entries rather than delete,
and never remove decisions, scope, permissions, or anything touching money or
data. When unsure, keep or archive — never delete.

Keep it warm and brief. The closing ritual is a wrap-up, not a second project.

---

## The continuous-improvement principle (what ties the rituals together)

The two rituals are the two halves of a loop that makes the work compound:

1. A session runs. Somewhere a mistake is made or a friction is felt.
2. The **closing ritual** surfaces it in the retrospective and captures one
   concrete improvement, and proposes the 3-task focus menu for next time.
3. The improvement is recorded — as a learning in `docs/LEARNINGS.md`, or, when
   the pattern recurs (3-strikes policy in `project-conventions.md`), promoted to
   a hard rule in `CLAUDE.md`.
4. The next session's **opening ritual** reads that menu and that context forward,
   confirms the focus, and the rule applies — so the mistake doesn't happen again
   and no time is lost re-deciding what's next.

Each session is one click of a ratchet. Over weeks and months these small
lessons accumulate into a project that's both **more performant** (the product
keeps getting better) and **more efficient** (the way we work keeps getting
better, and the repo stays lean). Every session must move both axes —
**Performance** and **Efficiency** — even slightly.

---

## Refusal clause (if the user tries to skip a ritual)

If the user asks to skip a ritual — "just start," "skip the wrap-up," "we don't
need the log today" — **decline kindly once and explain why.** In plain words:
the opening ritual stops us working in the wrong folder or repeating finished
work; the closing ritual is what lets next session pick up cleanly and keeps the
code backed up. These rituals are the reason multi-session work stays coherent
instead of drifting.

If the user **insists a second time**, run the ritual anyway (it's fast) and
**flag in the response that they overrode it**, so the override is on the record.
The one part that is never optional is **writing the session-log entry to disk
and backing up the work** — those protect the project itself, not just the
process.
