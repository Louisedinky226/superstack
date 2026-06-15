# Debugging Techniques — root cause, then make the bug impossible

This is the deep reference for the systematic-debugging discipline summarized in
`development.md` ("When something breaks"). The loop tells you *that* you debug by
root cause; this file is *how* — the four phases in full, plus four concrete
techniques (root-cause tracing, defense-in-depth, condition-based waiting, and the
test-pollution hunt) that turn "I fixed it" into "I made it impossible."

**Audience:** this is agent-facing and imperative. The *reporting* of a bug to a
non-technical owner stays plain and warm ("something was creating files in the
wrong place; I found why and fixed it so it can't recur") — but the *work* below
is disciplined and absolute.

---

## Contents

- The Iron Law (no fix without root-cause first)
- The four phases (root cause → pattern → hypothesis → fix)
- The 3-fix rule (when fixing means the architecture is wrong)
- Technique 1 — root-cause tracing (fix at the source)
- Technique 2 — defense-in-depth (make the bug impossible)
- Technique 3 — condition-based waiting (kill the flaky test)
- Technique 4 — find the test polluter (state-pollution bisection)
- Quick reference + Red flags

---

## THE IRON LAW

```
NO FIX WITHOUT A ROOT-CAUSE INVESTIGATION FIRST.
```

You may not propose, write, or commit a fix until Phase 1 is complete. A change
that makes the symptom disappear while leaving the cause intact is **not a fix** —
it is a second bug hiding the first. Violating the letter of this law is violating
its spirit: "I'm pretty sure it's X, let me just try changing X" is skipping
Phase 1, no matter how you word it.

**Why this matters most here:** the owner cannot tell a root-cause fix from a
lucky-looking patch. A wrong guess spends their money on rework and ships new bugs
they can't see. Systematic debugging is also simply *faster* — measured against
guess-and-check, far higher first-time-fix rates and far less thrashing. The
shortcut is the slow path.

---

## The four phases (complete each before the next)

### Phase 1 — Root-cause investigation (BEFORE any fix)

1. **Read the error completely.** The stack trace, the message, the codes, the
   line numbers, the file paths. The fix is often named *in* the error. Don't skim.
2. **Reproduce it reliably.** Exact steps, every time. If you can't reproduce it,
   gather more data — do not guess at a fix for a bug you can't trigger.
3. **Check what recently changed.** `git diff`, recent commits, new dependencies,
   config or environment changes. Most new bugs entered with a recent change.
4. **In a multi-component system, instrument the boundaries.** When the path
   crosses layers (app → API → DB → external service), add temporary logging at
   each boundary and run *once* to see **which layer** breaks, then investigate
   that layer. Don't theorize about which component is at fault — measure it.
5. **Trace the bad value to its origin** (see *Root-cause tracing* below) and fix
   at the **deepest correct layer**, not where the error surfaced.

### Phase 2 — Pattern analysis

1. **Find working examples** of the same thing elsewhere in the codebase.
2. **Read any reference implementation completely** — every line, not a skim.
   Partial understanding guarantees a partial fix.
3. **List every difference** between the broken code and the working reference,
   however small. "That can't matter" is how the cause gets missed.
4. **Understand the dependencies and assumptions** each side relies on.

### Phase 3 — Hypothesis and minimal test

1. **State one hypothesis, specifically:** "I think X is the root cause because Y."
   Write it down. Vague hypotheses produce vague fixes.
2. **Test it with the smallest possible change, one variable at a time.** Never
   change several things at once — you won't know which mattered.
3. **Verify before continuing.** Worked? → Phase 4. Didn't? → form a *new*
   hypothesis. **Do not stack a second fix on top of a failed one.**
4. **When you don't understand something, say so** and investigate further. Do not
   pretend, and do not paper over the gap with a guess.

### Phase 4 — Fix the root cause

1. **Write a failing test that reproduces the bug first** (per TDD). Prove it red
   before you fix it (the red-green proof in `enforcement-and-honesty.md`).
2. **Make the single root-cause change.** No "while I'm here" extras, no bundled
   refactor — those hide what actually fixed it.
3. **Verify:** the new test passes, and nothing else broke (real command output).
4. **Consider defense-in-depth** (below) to make this class of bug structurally
   impossible, not merely gone this once.

---

## The 3-fix rule — when fixing means the architecture is wrong

```
BEFORE attempting fix #4 on the same bug:
  COUNT the fixes already tried.
  IF < 3:  return to Phase 1 and re-investigate with the new information.
  IF >= 3: STOP. Do NOT attempt another fix. Surface it to the owner.
```

Three failed fixes is not a failed hypothesis — it is a **wrong architecture**.
The tell: each fix reveals a new problem somewhere else, or each fix needs
"massive refactoring," or each fix creates a new symptom elsewhere. When you see
that pattern, stop patching and ask the real question in plain words for the
owner: *"We've patched this three times and it keeps moving. I think the
underlying structure is the problem, not any single bug. I recommend we rework
[X] rather than attempt a fourth patch — here's the trade-off."* This ties into
the session work budget: an unattended loop must stop itself.

> **"No root cause found" is almost always incomplete investigation.** A genuinely
> root-cause-less bug is rare (truly environmental, timing-dependent, or external).
> The vast majority of "I can't find the cause" cases are Phase 1 done too
> shallowly. Before you declare a bug unfixable or "flaky," redo Phase 1 properly.
> If it really is external/timing, *document it* and implement explicit handling
> (retry, timeout, a clear error, monitoring) — don't leave it as a shrug.

---

## Technique 1 — Root-cause tracing (fix at the source, never the symptom)

> **NEVER fix only where the error appears. Trace backward to the original
> trigger, and fix there.**

The method, walking *up* the call chain:

1. **Observe the symptom** — e.g. `git init failed in packages/core` (a `.git`
   appearing where source code lives).
2. **Find the immediate cause** — what line directly does this?
3. **Ask what called it** — and with what value?
4. **Keep tracing up**, inspecting the value at each level — e.g. the directory
   arrived as an empty string, which silently resolved to the current working
   directory.
5. **Find the original trigger** — e.g. a test read a temp-dir property before the
   setup hook had assigned it. Fix *there* (make the property throw if accessed
   too early), not at the `git init` call.

**When you can't trace it by reading, instrument it.** Before the dangerous
operation (not after it fails), log the inputs and the call stack:

```
// in tests, use console.error — a logger may be suppressed and you'll see nothing
console.error('DEBUG <site>', { directory, cwd, nodeEnv, stack: new Error().stack });
```

Rules that make instrumentation actually work:
- **Log before the operation**, not in the failure handler — you need the state
  that *led* to the failure.
- **Include context:** the directory, cwd, relevant env vars, timestamps.
- **Capture the stack** with `new Error().stack` to see the full caller chain.
- In tests, **`console.error`, not the project logger** — loggers are often
  filtered out under the test runner.
- Run once, read the evidence, then remove the instrumentation as part of the fix.

---

## Technique 2 — Defense-in-depth (make the bug *impossible*, not *fixed*)

> Validate at **every layer** the data passes through. One validation point means
> "we fixed the bug." Validation at every layer means **"we made the bug
> impossible."**

After you've found the root cause, add guards at each layer the bad value could
travel through. The four layers, with what each catches:

1. **Entry-point validation** — reject obviously-invalid input at the boundary
   (empty/whitespace, missing, wrong type, nonexistent path). Catches most bugs.
2. **Business-logic validation** — enforce what must be true for *this* operation
   (e.g. "a project directory is required and must be under the workspace root").
   Catches the edge cases entry validation lets through.
3. **Environment guards** — refuse dangerous operations in the wrong context
   (e.g. in a test environment, refuse to run `git init` anywhere outside the
   resolved temp directory). Catches context-specific disasters.
4. **Debug instrumentation** — log enough context before the risky operation that
   if all else fails, the next person has forensics. Catches the unknown unknowns.

Then **test each layer by trying to bypass the one before it:** feed input that
slips past layer 1 and confirm layer 2 stops it. In practice all four earn their
place — different code paths bypass entry validation, mocks bypass business
checks, other platforms trip environment guards, and the logging is what cracks
the case the first three missed.

**Judgement, not zealotry:** apply the number of layers the risk warrants. A
one-user local utility doesn't need four guards on every function; anything
touching money, user data, deletion, or production does. Match the armor to the
blast radius (this mirrors the skill's informed-consent gates).

---

## Technique 3 — Condition-based waiting (kill the flaky test)

> **Wait for the actual condition you care about — never for a guess about how
> long it takes.**

Arbitrary delays (`setTimeout(…, 50)`, `sleep(0.2)`) are the most common source
of tests that pass on a fast laptop and fail in CI under load. They are a race
condition you wrote on purpose.

```
// ❌ flaky: a guess about timing
await new Promise(r => setTimeout(r, 50));
const result = getResult();

// ✅ deterministic: poll the real condition
await waitFor(() => getResult() !== undefined);
const result = getResult();
```

A minimal `waitFor` primitive (poll the condition, return when truthy, throw a
clear timeout): poll every ~10ms, default timeout ~5s, and **throw with a
descriptive message** (`Timeout waiting for <description> after <ms>ms`) so a real
failure is legible. Common mistakes: polling every 1ms (wastes CPU), no timeout
(loops forever), or caching the value once before the loop instead of re-reading
it fresh each poll.

**The one legitimate arbitrary delay:** when you must test *known* timed behavior
(a 200ms debounce = two 100ms ticks), it's allowed *only if* you (1) first
`waitFor` the triggering condition, (2) base the delay on a documented known
interval rather than a guess, and (3) comment *why*. Don't use a fixed delay to
test the timing mechanism itself (debounce/throttle) — test that directly.

---

## Technique 4 — Find the test polluter (state-pollution bisection)

When something leaks state across tests — a stray file, a `.git`, a shared row, a
global left mutated — and the suite only fails *in combination*, isolate the
culprit with `find-polluter.sh` (shipped alongside this file). It runs each test
file one at a time and watches for a sentinel artifact appearing:

```
./find-polluter.sh '.git' 'src/**/*.test.ts'
#                   ^sentinel  ^which tests to scan
```

Mechanically it: checks whether the sentinel already exists *before* each file
(so pre-existing pollution isn't mis-blamed), runs the file with output
suppressed and **ignoring its pass/fail** (we care about side-effects, not
assertions), then checks whether the sentinel *now* exists — if so, that file is
the polluter. It's a linear isolation harness; adapt the sentinel to whatever the
leak produces.

---

## Quick reference

| Situation | Reach for |
|---|---|
| Any bug, test failure, or surprise | The four phases — Phase 1 first, always |
| Error surfaces far from its cause | Root-cause tracing (trace up, fix at source) |
| Bug you don't want to ever see again | Defense-in-depth (guard every layer) |
| Test passes locally, fails in CI | Condition-based waiting (replace sleeps) |
| Suite fails only in combination | find-polluter.sh (bisect for the leak) |
| Three fixes have failed | STOP — question the architecture, surface to owner |
| "I can't find the cause" | Redo Phase 1 — it's almost always incomplete |

## Red flags — STOP and return to Phase 1

"Quick fix now, investigate later" · "Just try changing X and see" · "Add a few
changes and run the tests" · "It's probably X, let me fix that" · "I don't fully
get it but this might work" · "One more attempt" (after 2+) · "Each fix reveals a
new problem somewhere else" · proposing fixes before tracing the data flow. All of
these mean: stop guessing, investigate.
