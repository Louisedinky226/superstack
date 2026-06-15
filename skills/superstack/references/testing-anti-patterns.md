# Testing Anti-Patterns — test the behavior, not the mock

Loaded whenever you write or change tests, or add a mock. The TDD cycle in
`development.md` §2.5 tells you to write the test first and watch it fail for the
right reason; this file guards the *quality* of that test, so a green suite
actually means the product works.

**Why it matters for this skill:** the owner cannot read the tests. A suite that
is green because it tests its own mocks gives them false confidence that the
product works when it may not — which is the same harm as reporting an unrun test
as passing. A test that cannot fail is **worse than no test.**

---

## Contents

- The Iron Laws (test behavior, not the mock)
- The five anti-patterns, each as a gate
- When mocks get too complex — a design smell
- What a good test asserts
- Quick reference + Red flags

---

## THE IRON LAWS

```
1. NEVER test mock behavior — test what the real code does.
2. NEVER add test-only methods to production code.
3. NEVER mock something you don't understand — understand the dependency first.
```

Core principle: **mocks are tools to isolate the slow/external edges, not things
to test.** Following TDD honestly prevents most of these — if you wrote the test
first against real code and watched it fail for the right reason, you never had a
chance to test a mock instead. When you catch one of these, it usually means TDD
was skipped.

---

## The five anti-patterns, each as a gate

### 1 — Testing mock behavior

**Tell:** an assertion checks for a mock element/value — e.g.
`getByTestId('sidebar-mock')`, or asserting the stub returned what you told the
stub to return. You're verifying the mock works, not the component.

```
BEFORE asserting on anything that came from a mock:
  ASK: "Am I testing real component behavior, or just that my mock exists?"
  IF testing the mock: STOP — assert on real behavior (getByRole('navigation')),
                       or unmock the thing under test.
```

### 2 — Test-only methods in production

**Tell:** a method on a production class is only ever called from test setup/
teardown (a `reset()` or `destroy()` that nothing in the app calls). It pollutes
production with test code, risks being called for real, and confuses the object's
lifecycle with the test's lifecycle.

```
BEFORE adding a method to a production class:
  ASK: "Is this used only by tests?"            IF yes: STOP — put it in test utilities.
  ASK: "Does this class own this resource's lifecycle?"  IF no: STOP — wrong home.
```

### 3 — Mocking without understanding

**Tell:** you mock a method "to be safe" without knowing its side effects, and a
test that depended on one of those side effects silently breaks or passes for the
wrong reason. Over-mocking to feel safe is how you mock away the very thing the
test needed to happen.

```
BEFORE mocking any method:
  STOP — don't mock yet. First answer:
    1. What side effects does the REAL method have?
    2. Does this test depend on any of them?
    3. Do I actually understand what this test needs?
  IF unsure: run the test with the REAL implementation first, observe what must
             happen, THEN add the minimal mock at the lowest level (mock the slow
             external edge, not the behavior under test).
```

### 4 — Incomplete mocks

**Tell:** a partial mock returns only the fields you *think* the code reads; then
downstream code reads `response.metadata.requestId`, which your mock omitted —
tests pass, integration fails. **Iron rule: mock the COMPLETE data structure as
it exists in reality, not just the fields your immediate test touches.**

```
BEFORE returning a mock data structure:
  ASK: "Does this match the real API/response schema completely?"
  IF you're guessing the shape: STOP — check the real response (docs/example),
     include every field the system might consume downstream.
```

### 5 — Tests as an afterthought

**Tell:** "implementation complete ✅ / tests: to be added later ⏳ / ready for
testing." Testing is *part* of implementation, not a follow-up. You cannot claim
complete without it (Iron Law 3, `enforcement-and-honesty.md`). TDD makes this
impossible by construction — the test came first.

```
BEFORE reporting a feature complete:
  ASK: "Were the tests written (test-first) and are they green with real output?"
  IF no: STOP — it is not complete. Finish the cycle, then claim done with evidence.
```

---

## When mocks get too complex — a design smell

Warning signs the mocking itself is the problem:

- **Mock setup is more than ~50% of the test.**
- You're mocking *everything* just to make the test pass.
- The mock is missing methods the real component has.
- The test breaks whenever the mock changes (not when behavior changes).

When you see these, ask: *"Do we even need a mock here?"* An integration test with
real components is often simpler and more honest than an elaborate mock. Heavy
mocking is frequently a signal of tight coupling — the fix may be dependency
injection or a smaller interface, not a bigger mock.

---

## What a good test asserts

- **Observable behavior**, from the outside — what the feature does, not its
  private methods, internal call order, or exact intermediate values.
- **Capable of failing** — you watched it go red before the code existed
  (TDD) and, for a bug fix, you proved red→green by reverting the fix
  (`enforcement-and-honesty.md` → regression proof). A test never seen failing may
  be asserting nothing.
- **One thing** — if the test name needs "and", split it.
- **Real code** — mocks only at unavoidable external/slow boundaries.

## Quick reference

| Anti-pattern | The fix |
|---|---|
| Asserting on mock elements/returns | Assert on real behavior, or unmock it |
| Test-only methods in production | Move them to test utilities |
| Mocking without understanding | Understand side effects first; run real, then mock minimally |
| Incomplete mocks | Mirror the real schema completely |
| Tests as afterthought | TDD — test first, no "complete" without them |
| Mock setup > 50% of the test | Reconsider: integration test or fix the coupling |

## Red flags — STOP

Assertion checks for `*-mock` ids · a method only ever called in test files · mock
setup is the majority of the test · the test fails when you *remove* the mock ·
you can't explain why the mock is needed · "I'll mock this just to be safe." All
mean: you may be testing the mock, not the code. Go back to real behavior.
