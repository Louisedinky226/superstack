# Design Review Board

Eight reviewers. Reviewers 1–7 gate `design_guide_lines.md` before any UI
development; reviewer 8 (Built-UI Design QA) runs *during* development against
the actual running UI.
Their job is NOT to confirm the file exists — it is to deeply inspect whether
every rule is specific, correct, complete, practical, and aligned with
platform best practices. A guideline a developer would still have to guess
about is a failed guideline.

## Contents

- How to run the board
- Verdict format (every reviewer)
- 1 — Design System Reviewer
- 2 — UI Implementation Reviewer
- 3 — Platform Best Practices Reviewer
- 4 — Layout & Safe Area Reviewer
- 5 — Accessibility Reviewer
- 6 — Cross-Platform Consistency Reviewer
- 7 — Peak Quality Reviewer (escalation decider)
- 8 — Built-UI Design QA Reviewer (runs during development)

---

## How to run the board

- **With subagents:** dispatch reviewers 1–6 in parallel. Each gets: the
  `design_guide_lines.md` file, the target platform list, the approved design
  (or its description), and its mandate section below — nothing else.
  Reviewer 7 (Peak Quality Reviewer) runs after the others, with their
  verdicts as input. Reviewer 8 (Built-UI Design QA) is different: it does not
  gate the document — it runs *during development* against the running UI /
  screenshots / dev server, wired into the mobile screenshot gate and the web
  happy-path gate.
- **Without subagents:** run each mandate sequentially as a separate pass
  with fresh eyes (re-read the file each time through that lens only).
  Disclose non-independence in the delivery report.
- **Loop:** any NEEDS-REVISION → fix the file → re-run only the reviewers
  that failed. Budget: 3 cycles, then batch-escalate disputed findings to
  the user with recommendations.

## Verdict format (every reviewer)

```
Reviewer: <name>
Verdict: PASS | NEEDS-REVISION
Findings:
- [Blocker|Major|Minor] <section of the file> — <what is missing/wrong>,
  <why a developer can't build correctly without it>, <proposed fix>
```

Severities (same scale used in the development loop): Blocker = UI development cannot proceed
correctly; Major = a realistic screen would come out wrong or inconsistent;
Minor = improvable, non-blocking. PASS is allowed with Minors only.

---

## 1 — Design System Reviewer

Consistency and completeness of the system itself.

- Every token named, valued, and consistent: typography (family, sizes,
  weights, line heights), colors (full semantic palette: primary, secondary,
  background, surface, text hierarchy, error, success, warning), spacing
  scale, radius, shadows, icon sizes, image treatment.
- Naming is systematic and predictable (e.g., `text-primary`,
  `spacing-md`) — no one-off names.
- No off-scale values: every spacing/size in the examples and component
  specs resolves to a token on the declared scale.
- Token Mapping section points to real code locations; Component Inventory
  lists existing reusable components with paths. **Greenfield exception:**
  when the board runs before any code exists, token files created during
  scaffolding satisfy this, and inventory entries may be marked
  `planned — <future path>`; the acceptance bar is that every token and
  component has a single declared code location, existing or planned.
- Reusability: components defined once and referenced, not re-specified per
  screen.
- **Dark mode:** if dark mode is supported, a full dark palette must exist for
  every semantic color (no missing pairs). Every dark text/background pair must
  also pass WCAG AA. Dark elevation is conveyed by lighter surfaces, not by
  shadows. If dark mode is out of scope, the file must say so explicitly.

## 2 — UI Implementation Reviewer

Can a developer build from this file without guessing?

- For each component (buttons, inputs, cards, lists, modals, navigation
  elements): exact dimensions, padding, states (default / pressed-hover /
  focused / disabled / loading / error), and behavior of each state
  (spinner placement, label handling, hit area).
- **State completeness:** every screen must define all seven states —
  loading, empty, error, disabled, **offline**, success, and skeleton — not
  just the happy path. For each: what is shown, what copy pattern, what action
  is offered. A screen missing any of these states is a finding (name Offline
  explicitly; it is the most commonly forgotten).
- Navigation behavior specified: transitions, back behavior, deep-link
  expectations where relevant.
- Animation rules (if relevant): durations, easing, what animates and what
  never does.
- The test: pick two screens from the approved design and mentally implement
  them using only this file. Every value you had to invent is a finding.

## 3 — Platform Best Practices Reviewer

Validate rules against the actual platform standards — not from memory alone.
When web access is available, check current official documentation (Apple
Human Interface Guidelines, Material Design 3, MDN/WCAG, platform TV docs)
for any rule you are not certain is current. Cite what was checked.

- **Apple platforms:** HIG conformance — minimum touch targets (44×44pt),
  SF/system-font usage or declared custom-font fallbacks, navigation
  patterns (tab bar / nav bar conventions), haptics, Dynamic Type stance
  declared, platform-native controls vs custom justified.
- **Android:** Material Design conformance — touch targets (48×48dp), type
  scale mapping, elevation/shadow semantics, ripple feedback, system
  back behavior, density buckets (values in dp/sp, never px).
- **Web:** modern responsive practice — fluid layout/breakpoints declared,
  rem-based type, focus-visible styles, hover-vs-touch handling, WCAG 2.2
  alignment.
- **TV:** focus behavior (visible focus state, predictable D-pad traversal),
  overscan-safe areas (~5% margins), 10-foot readability minimums, remote
  navigation for every interactive element, no hover-dependent affordances.
- Flag any rule that contradicts the platform standard, and any platform in
  scope that the file is silent about.

## 4 — Layout & Safe Area Reviewer

The file must survive real devices, not just design canvases.

- **iOS:** safe-area layout guides for every screen edge usage; notch /
  Dynamic Island / home-indicator behavior; navigation-bar and tab-bar
  height handling; keyboard avoidance behavior; device size range covered
  (smallest supported → largest, incl. iPad if in scope); orientation rules.
- **Android:** status-bar and navigation-bar (gesture + 3-button) handling;
  display cutouts; foldables/large screens if in scope; density buckets;
  adaptive layout rules.
- **All platforms:** what stretches, what stays fixed, what wraps; minimum
  and maximum content widths; orientation and resize behavior; scrolling
  rules; edge cases (long text, large fonts, small screens).
- Every layout rule must be stated as a testable behavior ("content respects
  bottom safe area inset plus 16dp" — not "looks good on all devices").

## 5 — Accessibility Reviewer

- Contrast: every text/background pair in the palette meets WCAG AA (4.5:1
  body, 3:1 large text); state colors (error/success) are not
  color-only signals.
- Touch/click targets meet platform minimums; spacing between adjacent
  targets defined.
- Screen-reader rules: label conventions for icons, images, and controls;
  what is decorative vs announced.
- Focus order and visible focus styles (web/TV mandatory); keyboard and
  remote operability for every interactive element.
- Readable sizes: minimum body size declared; Dynamic Type / font scaling
  stance declared (support level and reflow behavior), **including a declared
  Dynamic Type scale range** (smallest → largest supported size).
- **Text resize & reflow:** text must scale to 200% and content must reflow at
  a 320px-wide viewport without loss of content or horizontal scrolling.
- **Non-text contrast:** UI components, icons, and graphical objects meet 3:1
  against adjacent colors; **target spacing** between adjacent controls defined.
- **Errors:** identified by text (and/or icon), never by color alone; **form
  fields have programmatic accessible names**; **toasts/transient messages**
  have persistence or dismissal controls so they aren't missed.
- **RTL / internationalization** (this reviewer owns it; no one else does):
  layout mirroring correctness for RTL locales; directional icons (back/forward,
  chevrons) flip while exempt items (logos, media controls, numbers) do not;
  all user-facing strings externalized (no hardcoded text); locale-aware dates,
  numbers, and currency; bidirectional (bidi) text in mixed LTR/RTL content
  handled correctly.

## 6 — Cross-Platform Consistency Reviewer

Runs only when the product targets more than one platform.

- The file explicitly partitions rules into: **identical everywhere**
  (brand colors, type hierarchy, tone, iconography, spacing scale) vs
  **platform-native** (navigation patterns, controls, feedback, transitions).
- No rule forces one platform's convention onto another (e.g., Material
  ripple on iOS, iOS back-swipe expectations on Android).
- Shared components have per-platform variance notes where behavior must
  differ.
- If a rule is silent on which bucket it belongs to, that's a finding.

## 7 — Peak Quality Reviewer (escalation decider)

Input: the six verdicts above. Output: a one-paragraph decision — is a
`peak-quality` run required for these design guidelines?

Trigger PQ when: reviewers disagreed on a platform rule; the product has
unusual platform complexity (TV, foldables, heavy media, novel interaction);
web access was available but the guidelines still rely on unverified
assumptions about current platform standards; or the UI is the product's
primary value and first impressions are business-critical.

**No-web-access carve-out:** when web research is genuinely unavailable,
unverified-standards alone do not force a PQ run. Instead, list the specific
assumptions that could not be verified as disclosed caveats in the board
outcome and the delivery report, and queue a verification pass for when
access exists. PQ without research ability would be ceremony, not safety.

Skip PQ when: the board passed cleanly on conventional patterns the
platforms document thoroughly. Say so explicitly.

If triggered: run the peak-quality skill scoped to the disputed/risky
sections (its Phase 2 research against official HIG / Material / WCAG / TV
docs is the point), apply the result to the file, and re-run only the
affected reviewers.

## 8 — Built-UI Design QA Reviewer (runs during development)

Reviewers 1–7 inspect the *document*. This reviewer inspects the *running
product* — the actual screen, a screenshot, or the dev server — and compares
it pixel-for-rule against `design_guide_lines.md`. It runs throughout the
build loop, not once on the doc.

- **Every color** on screen resolves to a token in the file (including the
  correct light/dark variant); no off-palette colors.
- **Spacing & layout** match the spacing scale, padding/margin rules, and
  declared grid — measured, not eyeballed.
- **Type** matches the declared family, size, weight, and line height per
  style; no off-scale type.
- **Full state set** is actually reachable and correct for every screen:
  loading / empty / error / disabled / offline / success / skeleton.
- **Touch targets** meet the platform minimum on the real device; adjacent
  targets have the declared spacing.
- **Safe-area insets** are respected on real devices (notch / Dynamic Island /
  home indicator / status & nav bars) — content is not clipped or hidden.
- Dark mode (if supported) renders the dark palette correctly and still passes
  AA; RTL renders mirrored correctly for RTL locales.

Findings are classified **Blocker / Major / Minor** on the same scale as the
rest of the board.

**Gate wiring:**
- **Mobile:** this reviewer is the substance of the mobile screenshot gate —
  a screenshot of the built screen is the evidence it inspects, and the gate
  does not pass until its Blockers are cleared.
- **Web:** it runs against the dev server on the web happy-path gate, checking
  the rendered happy path against the guidelines before that gate passes.
