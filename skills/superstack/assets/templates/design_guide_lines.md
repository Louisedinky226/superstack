# Design Guidelines — [PROJECT_NAME]

> This is the **binding UI contract** for the project. Every screen and
> component must follow it exactly. The development loop treats this file as
> authoritative: it uses the named tokens below, never raw values that merely
> look similar. No UI code ships before this file is filled in and approved.
> Fill in every `[PLACEHOLDER]`. Delete nothing — if a section doesn't apply,
> write "Not applicable" and say why.

---

## Token Mapping

Where these values live in code. The build must reference these constants,
never hardcoded values that happen to match this document.

- **Colors:** [e.g., ui/theme/Color.kt, tailwind.config.js, Assets.xcassets]
- **Typography:** [e.g., ui/theme/Type.kt, styles/typography.css]
- **Spacing:** [e.g., ui/theme/Dimens.kt, tokens.css custom properties]
- **Radius / shadows:** [PATH]
- **Compliance check command:** `[scripts/check_design_compliance.sh]`

---

## Component Inventory

Existing reusable components, with file paths. **Check here before creating
anything new** — reusing an existing component is mandatory when one fits.

- [PrimaryButton — ui/components/PrimaryButton.kt]
- [AppTextField — ui/components/AppTextField.kt]
- [Card — path]
- [...]

---

## Colors

Names and exact values. Values must match the token files above.

| Role | Name | Value (light) | Value (dark) | Notes |
|------|------|---------------|--------------|-------|
| Primary | [name] | [#hex] | [#hex] | [usage] |
| Secondary | [name] | [#hex] | [#hex] | [usage] |
| Background | [name] | [#hex] | [#hex] | |
| Surface | [name] | [#hex] | [#hex] | cards, sheets |
| Text primary | [name] | [#hex] | [#hex] | |
| Text secondary | [name] | [#hex] | [#hex] | |
| Error | [name] | [#hex] | [#hex] | |
| Success | [name] | [#hex] | [#hex] | |
| Warning | [name] | [#hex] | [#hex] | |
| Border / divider | [name] | [#hex] | [#hex] | |

- **Dark mode:** [supported? if yes, the "Value (dark)" column above is
  required for every role.]
- **Dark-mode rules:** every dark text/background pair must also pass WCAG AA
  (4.5:1 body, 3:1 large text). In dark mode, convey elevation with **lighter
  surfaces** (raise lightness as things sit higher) — not with shadows.

---

## Typography

- **Font family:** [PRIMARY_FAMILY] (fallback: [FALLBACK])
- **Sizes / weights / line-heights:**

| Style | Size | Weight | Line height | Used for |
|-------|------|--------|-------------|----------|
| Display | [px] | [700] | [1.2] | hero / large headers |
| Title | [px] | [600] | [1.3] | screen + section titles |
| Body | [px] | [400] | [1.5] | paragraphs |
| Caption | [px] | [400] | [1.4] | helper / meta text |
| Button | [px] | [600] | [1.0] | button labels |

- **Units (per platform — never `px` for type):** web → **rem**;
  Android → **sp**; iOS → **pt**. This lets text respect the user's OS
  font-size setting.
- **Minimum body size:** body text is at least **16px / 16sp** (or the rem
  equivalent). Never smaller for primary reading text.
- **Usage rules:** [which style for which context; max lines; truncation]

---

## Spacing

A single scale. **No off-scale values.**
Scale: `4, 8, 12, 16, 24, 32, 48` ([px / dp / pt] per platform).

---

## Padding & Margins

- **Default screen padding:** [value]
- **Component / card padding:** [value]
- **List item spacing:** [value]
- **Form field spacing (between fields):** [value]
- **Section spacing:** [value]

---

## Radius

| Element | Radius |
|---------|--------|
| Button | [value] |
| Card | [value] |
| Input | [value] |
| Modal / sheet | [value] |
| Image / avatar | [value] |

---

## Shadows / Elevation

| Level | Use | Definition |
|-------|-----|------------|
| 0 | flat surfaces | none |
| 1 | cards | [offset / blur / color / opacity] |
| 2 | menus, sheets | [definition] |
| 3 | modals, dialogs | [definition] |

---

## Buttons

- **Variants:** [primary / secondary / tertiary / destructive]
- **Heights:** [value]
- **Horizontal padding:** [value]
- **States:** default, pressed, disabled, loading.
  - **Disabled behavior:** [reduced opacity / muted color; not interactive]
  - **Loading behavior:** [spinner placement; label hidden or kept]
- **Min touch target:** [44pt / 48dp]

---

## Inputs

- **Height:** [value]
- **Border:** [width / color default / color focus]
- **Focus state:** [definition]
- **Error state:** [border color, message placement]
- **Placeholder behavior:** [color; never used as a label substitute]
- **Helper / error text placement:** [below field, fixed-height slot]
- **Label rules:** [always visible; not placeholder-only]

---

## Icons

- **Icon set / library:** [name]
- **Sizes:** [16 / 20 / 24 / 32]
- **Color rules:** [inherit text color / role-based]
- **Stroke / fill style:** [definition]
- **Touch target around tappable icons:** [min size]
- **Accessible labels:** every icon-only control (no visible text) needs an
  accessible label describing its action (e.g., "Close", "Search").

---

## Images

- **Aspect ratios:** [allowed ratios]
- **Corner radius:** [value]
- **Placeholder / fallback:** [behavior while loading or on failure]
- **Loading behavior:** [skeleton / blur-up / spinner]
- **Resolution / asset density:** [@1x/@2x/@3x; webp; max dimensions]
- **Alt text:** every meaningful image has alt text describing its content;
  purely decorative images are marked decorative (empty alt / hidden from
  screen readers) so they aren't announced.

---

## Layout

- **Grid:** [columns, gutters]
- **Alignment:** [default alignment rules]
- **Max content width:** [value, for large screens]
- **Vertical rhythm:** [how spacing stacks]

---

## Safe Area Behavior

- **Top inset (status bar / notch):** [respect / extend behind]
- **Bottom inset (home indicator / nav bar):** [respect / extend behind]
- **Keyboard avoidance:** [content scrolls / shifts above keyboard]
- **Edge-to-edge content rules:** [which elements may bleed to edges]

---

## Responsive Behavior

- **Breakpoints:** [mobile / tablet / desktop widths]
- **Layout shifts per breakpoint:** [single column → multi-column, etc.]
- **Touch vs. pointer:** [hover states only where pointer exists]
- **Orientation:** [portrait / landscape handling]

---

## Platform-Specific Behavior

- **iOS:** [haptics, swipe-back gesture, system fonts, sheet styles]
- **Android:** [ripple effect, back button, material defaults, edge-to-edge]
- **Web:** [hover/focus rings, keyboard nav, browser back, scroll behavior]
- **TV:** [focus states, D-pad navigation, focus scaling, overscan-safe margins]

---

## Accessibility

- **Minimum touch target:** [44pt / 48dp]
- **Contrast:** [WCAG AA — 4.5:1 text, 3:1 large text / UI]
- **Labels:** [every interactive element has an accessible label]
- **Dynamic text:** [respect OS font-size settings; layouts must not break]
- **Focus order:** [logical, follows reading order]
- **Focus indicator:** [color], [2px offset], [width] — visible on every
  focusable element. **Never `outline: none` without a clearly visible
  replacement.**
- **Motion:** [respect reduce-motion setting]

---

## Screen States

Every screen defines all seven states below — not just the happy path.

- **Loading:** [spinner; where and when]
- **Skeleton:** [placeholder shapes shown while content loads]
- **Empty:** [illustration + message + primary action]
- **Error:** [inline vs. full-screen; retry affordance; tone of copy]
- **Disabled:** [how a non-interactive screen/section looks and reads]
- **Offline:** [behavior and messaging when there's no connection]
- **Success:** [confirmation state after a completed action]

---

## Navigation Behavior

- **Pattern:** [tab bar / drawer / stack]
- **Transitions:** [push / modal / fade]
- **Back behavior:** [per platform]
- **Deep links:** [supported routes]
- **Active / selected state:** [definition]

---

## Animation Rules

- **Durations:** [fast 150ms / normal 250ms / slow 400ms]
- **Easing:** [standard / decelerate / accelerate curves]
- **What animates:** [page transitions, button press, list inserts]
- **What does NOT animate:** [avoid distracting or gratuitous motion]
- **Respect reduce-motion:** [fall back to instant / fade]

---

## RTL / Localization

- **RTL languages:** [Hebrew / Arabic — mirror layout and navigation]
- **Mirroring rules:** [horizontal layouts flip; icons that imply direction flip]
- **Text alignment:** [follows reading direction]
- **Exempt from mirroring:** [logos, media controls, numbers, code, phone numbers]
- **Bidirectional text:** [handling mixed LTR/RTL content]
- **String externalization:** [no hardcoded user-facing strings; all in resources]
- **Number / date / currency formatting:** [locale-aware]

---

## Voice & UX Writing

How the product talks. Consistent copy is part of the design contract.

- **Tone:** [e.g., friendly and plain, professional, playful — pick one]
- **Capitalization:** [pick one and apply everywhere — **sentence case**
  ("Save changes") or **Title Case** ("Save Changes"). Sentence case is the
  common default.]
- **Button labels:** start with a **verb** that names the action ("Save",
  "Delete account", "Send invite") — never vague ("OK", "Submit") where a
  specific verb is possible.
- **Error messages:** follow **"what happened + how to fix"**
  (e.g., "We couldn't save your changes. Check your connection and try again.").
  No blame, no error codes alone.
- **Empty-state copy:** follow **what this is + why it's empty + what to do
  next** (e.g., "No projects yet. Create your first project to get started.").

---

## Do Not

- Do not invent new spacing, color, radius, or type values.
- Do not use colors outside this file.
- Do not create one-off components when the Component Inventory has a fit.
- Do not hardcode values that exist as tokens (run the compliance check).
- Do not ship UI that fails contrast or touch-target minimums.
- [PROJECT_SPECIFIC_PROHIBITION]
