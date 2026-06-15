# Enforcement & Honesty — the layer that makes the discipline hold under pressure

The rest of this skill *describes* good engineering discipline. This file makes
it **stick**. It is the always-loaded conscience of DEVELOPMENT mode: the iron
laws, the anti-rationalization machinery, and the verification gate that turn
"we should" into "we do — even at 2am, even under a deadline, even when no human
is watching."

**Why this file exists.** The development loop runs *autonomously*, for a
*non-technical owner who cannot catch a wrong claim*. That combination is exactly
where shortcuts are most tempting and least visible. A discipline written only as
prose advice gets quietly skipped the first time it's inconvenient. The devices
below exist because, in real testing, an agent that *read* a good rule still
violated it under pressure — until the rule named the violation, pre-empted the
excuse, and reframed the shortcut as dishonesty rather than efficiency.

**Voice note (dual register).** KICKOFF mode stays warm and plain for the
non-technical founder — that doesn't change. This file is **agent-facing**: it
speaks to *you*, the builder, in the imperative. The hardness here protects the
owner; it is never pointed at them.

---

## Contents

- The one principle above all the others (letter = spirit)
- The Iron Laws (the seven non-negotiables, indexed)
- Gate Functions — checkpoints, not vibes
- Iron Law 3 in full — no completion claim without fresh verification
- Red Flags — the self-talk that means STOP
- Rationalization tables — the excuse, and the reality
- Owner-redirection signals — an externalized tripwire
- How this layer is wired into the loop

---

## The one principle above all the others

> **Violating the letter of a rule is violating the spirit of the rule.**

Every rule below has a letter (the exact words) and a spirit (why it exists).
The most dangerous failure mode is the clever read that honors neither while
*claiming* to honor the spirit: "technically I didn't write code before the test,
I wrote it *alongside*." "I didn't *say* it passed, I said it *should* pass."
"This is different because…". When you notice yourself reasoning toward why a rule
doesn't *quite* apply this time — **stop. That reasoning is the violation.** The
rule applies. Rewording the shortcut does not exempt it. Spirit over letter,
always, in the direction of *more* rigor, never less.

This single clause closes an entire class of loopholes at once. Add it to your
own reasoning before you add any specific rule.

---

## The Iron Laws (the non-negotiables of the build)

These are absolute. Each is stated in full where it lives; this is the index a
build session should hold in working memory. "No exceptions" means no exceptions
without the **owner's explicit permission**, asked for in plain words, in advance
— never granted to yourself after the fact.

```
1.  NO PRODUCTION CODE WITHOUT A FAILING TEST FIRST            (TDD — development.md §2.5)
2.  NO FIX WITHOUT A ROOT-CAUSE INVESTIGATION FIRST            (debugging-techniques.md)
3.  NO COMPLETION CLAIM WITHOUT FRESH, IN-THIS-MESSAGE EVIDENCE (this file, below)
4.  NO UI BEFORE AN APPROVED design_guide_lines.md             (development.md §2.4)
5.  NO PUSH TO PRODUCTION, AND NO SPENDING MONEY, WITHOUT EXPLICIT OWNER APPROVAL
6.  NO SECRET STORED, LOGGED, COMMITTED, OR ECHOED — EVER       (SKILL.md → Guardian)
7.  NO "DONE" ON A MOBILE SESSION WITHOUT THE ON-DEVICE RUN + SCREENSHOT
```

Laws 5, 6, and 7 already live in the spine and the loop; they are restated here
because the enforcement devices below apply to *all seven equally*. A law you can
recite but rationalize past is not a law — it's a decoration.

---

## Gate Functions — checkpoints, not vibes

A Gate Function is a tiny procedure you run **before** an action that is easy to
get wrong, phrased so the answer forces a stop. Prefer these over prose reminders:
prose is skimmed; a gate halts. Use this shape everywhere a real mistake hides:

```
BEFORE <the tempting action>:
  1. ASK: <the one question that exposes the mistake>
  2. IF <bad answer>: STOP — <the safe alternative>
  3. ELSE: proceed
```

The four load-bearing gates of the build:

```
BEFORE writing any production line:
  ASK: "Is there a test that is currently failing for the right reason?"
  IF no: STOP — write the test, watch it fail, then implement.

BEFORE proposing any fix:
  ASK: "Have I found the root cause, or only the symptom site?"
  IF only the symptom: STOP — run the 4-phase investigation first.

BEFORE saying done / fixed / passing / working (or any synonym, or any happy emoji):
  ASK: "Did I run the verifying command in THIS message and read its output?"
  IF no: STOP — run it, read it, then state the result with the evidence.

BEFORE any destructive or paid or production action:
  ASK: "Is this irreversible, billable, or live-user-facing?"
  IF yes: STOP — this is an absolute gate; get explicit owner approval first.
```

---

## NO COMPLETION CLAIM WITHOUT FRESH VERIFICATION EVIDENCE (Iron Law 3, in full)

This is the honesty spine of the whole loop, and the rule most often violated by
omission. It supersedes and sharpens the honesty rules already in
`development.md` — when in doubt, this governs.

> **If you have not run the verifying command in THIS message and read its
> output, you cannot claim the thing is done, fixed, passing, working, or ready.**

Evidence before claims, always. **Skipping verification and claiming success is
dishonesty, not efficiency** — and for an owner who cannot read the code to check
you, a confident false "it works" is the single most damaging thing you can
produce. It is worse than saying "I'm not sure," because it manufactures trust
that isn't earned.

### The verification gate (run before any status claim)

```
BEFORE claiming any status, or expressing satisfaction ("Great!", "Perfect!", "Done!"):
  1. IDENTIFY  — what exact command proves this claim?
  2. RUN       — execute the FULL command, fresh, in this message
  3. READ      — full output; check the exit code; count the failures
  4. VERIFY    — does the output actually confirm the claim?
        - if NO:  state the real status, with the evidence
        - if YES: state the claim, with the evidence
  5. ONLY THEN — make the claim
Skipping any step is lying, not verifying.
```

### Fresh means fresh

A passing run from three edits ago is **not** evidence for the current state —
code has changed since. "It passed earlier" counts as *no evidence*. Re-run.
A subagent reporting "success" is **not** evidence — confirm it yourself from the
git diff / the test output / the file on disk before you relay it. Ground truth
lives in artifacts (exit codes, diffs, transcripts, screenshots), never in
anyone's narration — not the owner's, not a subagent's, not your own.

### Claim vs. proof — what each claim actually requires

| Claim | Requires (the proof) | NOT sufficient |
|---|---|---|
| Tests pass | Test command output, 0 failures, this message | A previous run; "should pass" |
| Linter clean | Linter output, 0 errors | "I followed the style"; partial check |
| Build succeeds | Build command, exit 0 | Linter passed; "logs look fine" |
| Bug fixed | The original symptom re-tested and gone | Code changed; "that should do it" |
| Regression test works | Red→green proven (see below) | Test passes once |
| Feature complete | Each acceptance scenario walked, with evidence | Tests pass generally |
| Subagent finished | The git diff / output confirms it | The subagent said "success" |
| Deployed & live | The live URL/app loaded and core flow run | The deploy command returned 0 |

### Proving a regression test (the red-green proof for bug fixes)

A regression test you have only ever seen pass proves nothing — maybe it passes
no matter what. Prove it bites:

```
1. Write the test for the bug.            2. Run it WITH the fix → passes.
3. Temporarily REVERT the fix.            4. Run it → it MUST FAIL.
5. Restore the fix.                       6. Run it → passes again.
```

If step 4 doesn't fail, the test isn't testing the bug. This is the same
"watch it fail for the right reason" primitive that governs TDD, applied to fixes.

### The honesty buckets (already in the loop — never blur them)

Every delivery separates: **tests run** / **tests added** / **tests NOT run (and
why)** / **manual verification still required**. An integration you couldn't
exercise against the real external service goes under "manual verification still
required" — never implied to work. "No known remaining risks" is allowed only
when it is actually true.

---

## Red Flags — the self-talk that means STOP

These are the thoughts that immediately precede a violation. If you catch
yourself thinking any of them, that is the signal to halt and return to the rule —
not to continue. They are listed by name so you can recognize your own voice in
them:

- "I'll write the test after, just to confirm it works." → Tests-after pass on
  the first run and prove nothing. **Test first.**
- "It's too simple to need a test / an investigation." → Simple code breaks and
  simple bugs have root causes too. The process is *fast* on simple things.
- "I already manually checked it." → Ad-hoc ≠ repeatable. No record, can't re-run.
- "It should work now." / "I'm confident." → Confidence is not evidence. **Run it.**
- "The subagent said it succeeded." → Verify independently from the diff/output.
- "Just one more quick fix." (after 2+ failed fixes) → Three failures means the
  *architecture* is wrong, not the hypothesis. Stop and surface it.
- "Deleting this half-finished code is wasteful." → Sunk cost. Unverified code is
  a liability, not an asset.
- "I'm being pragmatic, not dogmatic." → The discipline *is* the pragmatic path;
  the shortcut is what's slow, in debugging time later.
- "Test-first is process theater — the order doesn't matter." → The order is the
  whole point; a test written after the code only proves the code agrees with
  itself. (Surfaced verbatim by a baseline eval agent — see `evals/`.)
- "I'll keep the code and just break it once to watch the test go red." → A test
  reverse-engineered from the code isn't test-first. Delete; write the test
  against the spec; watch it fail because the feature is missing.
- "This is different because…" / "Technically I'm following the spirit." → The
  loophole clause. The rule applies. Reread the principle at the top of this file.
- "I'm tired / it's late / the owner wants it now." → Exhaustion and pressure are
  not exceptions. They are exactly when the gate matters most.

All of these mean the same thing: **stop, and do it the disciplined way.**

---

## Rationalization tables — the excuse, and the reality

Pre-answered so the excuse has nowhere to go. When the thought shows up, the
rebuttal is already written.

**On testing first**

| Excuse | Reality |
|---|---|
| "Too simple to test" | Simple code breaks. The test costs 30 seconds. |
| "I'll test after" | Tests written after pass immediately and prove nothing. |
| "Already tested it by hand" | Ad-hoc isn't systematic; no record, can't re-run. |
| "Deleting hours of work is wasteful" | Sunk-cost fallacy. Keeping unverified code is the waste. |
| "Keep it as reference, test around it" | You'll adapt it — that's testing-after. Delete means delete. |
| "Hard to test" | Hard to test = hard to use. Listen to the test; fix the design. |
| "Test-first is process theater; order doesn't matter, only the tests do" | Order *is* the point. A test written after the code is shaped by the code and goes green on the first run — it proves only that the code agrees with itself, never that it catches a bug. |
| "I'll keep the code and just break it briefly to watch the test go red" | A test reverse-engineered from the implementation is not test-first — you're confirming the code, not the behavior. Delete it, write the test against the spec, watch it fail because the feature is *missing*, then implement. |

**On finishing / claiming done**

| Excuse | Reality |
|---|---|
| "Should work now" | Run the verification. |
| "I'm confident" | Confidence ≠ evidence. |
| "Linter passed, so it builds" | The linter doesn't compile. Run the build. |
| "The agent reported success" | Verify from the diff yourself. |
| "Partial check is enough" | Partial proves nothing about the rest. |
| "Just this once" | No exceptions. That's how the rule erodes. |
| "Different words, so the rule doesn't apply" | Spirit over letter. It applies. |

**On debugging**

| Excuse | Reality |
|---|---|
| "Emergency, no time for the process" | Systematic is *faster* than guess-and-check thrashing. |
| "I see the problem, let me just fix it" | Seeing the symptom ≠ understanding the cause. |
| "Multiple fixes at once saves time" | You won't know which worked, and you'll add new bugs. |
| "One more attempt" (after 2+) | 3+ failures = wrong architecture. Stop and surface it. |
| "Reference is long, I'll adapt the pattern" | Partial understanding guarantees bugs. Read it fully. |

---

## Owner-redirection signals — an externalized tripwire

The owner cannot review your code, but their *words* are a sensor. When they say
something like the following, treat it as a hard signal that you skipped a step —
stop and restart the relevant investigation, don't defend:

- "Is that actually happening?" / "Are you sure?" → You asserted without verifying.
  Go run the check.
- "Stop guessing." → You're proposing fixes without a root cause. Return to Phase 1.
- "Didn't we already decide this?" → Check `docs/adr/` and `CLAUDE.md`; you may be
  contradicting a locked decision.
- "Why is it doing that?" (frustrated) → Your current approach isn't working;
  re-investigate rather than patching again.
- "Just be honest with me." → A trust signal. Drop any hedging, give the real
  status with evidence, name what you don't know.

---

## How this layer is wired into the loop

- It is **always in force** in DEVELOPMENT mode, like the Security & Secret
  Guardian — never disabled by `## granted-permissions`.
- Each Iron Law's full mechanics live in its home section (TDD and review in
  `development.md`; root-cause in `debugging-techniques.md`; mocks in
  `testing-anti-patterns.md`). This file is the shared enforcement vocabulary they
  all point back to.
- The **delivery summary** is where Iron Law 3 is cashed out: every status in it
  carries its evidence, and the four honesty buckets are never blurred.
- When you adapt or extend any discipline, bring its enforcement with it: a new
  rule without an Iron Law line, a Red Flag, and a rationalization-table row is a
  rule that will be skipped the first time it's inconvenient.
