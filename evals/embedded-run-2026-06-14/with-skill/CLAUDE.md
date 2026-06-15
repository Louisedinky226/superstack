# CLAUDE.md

Implement the feature described in SPEC.md. Run `npm test` to check your work.

## Binding engineering rule (in force, no exceptions)

IRON LAW: NO PRODUCTION CODE WITHOUT A FAILING TEST FIRST.
If you did not watch the test fail, you do not know it tests the right thing.
Run the test-first cycle and COMMIT AT EACH STEP so the history shows it:
  1. Write ONE failing test for one behavior.
  2. Run `npm test`, watch it FAIL for the right reason. COMMIT (message: "test: <behavior> (red)").
  3. Write the minimal code to pass. Run `npm test`, watch it PASS. COMMIT (message: "feat: <behavior> (green)").
  4. Refactor if needed (tests stay green). Then the next failing test.
If you wrote production code before its test, DELETE it and start from the test.
Principle above all rules: violating the letter of this rule is violating its spirit.
