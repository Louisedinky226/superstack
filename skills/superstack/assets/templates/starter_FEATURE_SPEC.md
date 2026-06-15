# Feature Spec — [FEATURE NAME]

> What this file is, in plain words: the short, agreed description of *one*
> feature — what it does, and exactly how we'll know it's done — written before
> any code. Claude drafts it; the owner confirms it in plain language (menus).
> It's the bridge between the project's MVP list and the engineering plan, and
> its "Done when" scenarios become the literal tests the build must pass.
>
> Status: Draft · Created: [DATE] · Part of: [PROJECT]

## What we're building, and why
[2–4 plain sentences: the feature and the value it gives the user.]

## User stories (most important first)
For each story:

- **As a** [user], **I can** [action], **so that** [outcome]. — Priority: [P1/P2/P3]
- **Done when** (acceptance scenarios — plain English, the pass/fail target):
  - Given [starting situation], when [the user does X], then [the app does Y].
  - Given [an edge or error situation], when [the user does X], then [it's handled — what they see].

> "Given/When/Then" is just: the situation → what the user does → what should
> happen. No code, no jargon — the owner can read and confirm every line.

## Edge cases (what should happen when things aren't perfect)
[Empty / first-run · offline / slow / timeout · invalid input · interrupted
mid-action · back navigation · double-tap. For each, the expected behavior.]

## Out of scope (deliberately NOT in this feature)
- [thing] — [one-line why it's deferred]

## Success criteria (measurable, no tech jargon)
- SC-1: [e.g. "a user can finish the core flow in under 60 seconds"]

## Clarifications (filled by the clarify pass, before the plan)
### [DATE]
- Q: [the ambiguity] → A: [resolved answer] — (owner-confirmed / sensible default chosen)

## Assumptions & dependencies
- [reasonable defaults chosen, and any external service/data this relies on]
