# Post-launch — the day-2 stage (owned by the Release & Deployment Advisor)

Launch is not the finish line; it's the moment the product meets reality. This is
the "day-2" stage — what happens *after* the first deploy — and it's owned by the
**Release & Deployment Advisor.** Shipping and then walking away is how small
problems become big ones quietly. This file is the plain-language playbook for the
hours, days, and weeks after going live.

As everywhere in this skill, any question the user is asked here is a **clickable
menu** — recommended option first, with an "Other / something else" escape.

---

## Contents

- First, confirm the safety nets are actually live
- The first-48-hours watch
- Where feedback lands — and how it flows back into the plan
- Blameless postmortems — the learning loop after something breaks
- The update / patch loop — different per target
- Reviewing real usage against your Phase 1 goals
- Continuing the build — v0.2 and onward
- Maintenance keeps coming — even with zero new features
- Knowing and controlling recurring cost (`docs/COSTS.md`)
- Turn data into the next decision — close the loop
- Winding down responsibly — the honest exit
- Post-launch is a loop, not a finish line

---

## First, confirm the safety nets are actually live

Before relaxing after a launch, confirm the operations layer
(`operations.md`) is genuinely *on*, not just "set up earlier":
- **Monitoring is reporting** — your error/crash tool (Sentry/Crashlytics) is
  receiving events from production, not just configured.
- **Crash reporting works** — trigger or confirm at least one real event reached
  the dashboard, so you know it's wired correctly.
- **Uptime alerts will reach you** — the uptime check is pinging the live health
  endpoint and a test alert actually arrived in your inbox/phone.

If any of these is silent, fix it now — a monitor that isn't reporting is worse
than none, because it gives false comfort.

---

## The first-48-hours watch

The riskiest window is right after launch, when real users hit paths your testing
never did. For the first 48 hours, **watch actively** rather than assuming it's
fine:

- **Watch error rates** — keep the crash/error dashboard open or check it
  frequently. A sudden spike right after launch usually means a real, fresh bug.
- **Watch the core flow** — confirm the one thing the product must do (sign up,
  the main action, checkout) is actually working for real users.
- **Be ready to act** — have the kill switch and the rollback reality
  (`operations.md`) fresh in mind: flip a feature flag off, halt a mobile phased
  rollout, or redeploy the prior tagged web build if something's clearly wrong.
- **Don't ship more on top of a fire** — if errors are climbing, stabilize first;
  don't pile a new change onto an unstable launch.

**Menu — first-48-hours watch intensity?**
- **Active watch with alerts on (Recommended)** — check the dashboard regularly
  and keep alerting live, ready to flip a kill switch or roll back.
- **Alerts-only** — rely on automated alerts to pull you in; lighter, fine for a
  low-traffic or low-risk launch.
- **Scheduled check-ins** — set fixed times to review; simplest, but slower to
  catch a fast-moving problem.
- **Other / something else.**

---

## Where feedback lands — and how it flows back into the plan

Real users will tell you what's wrong and what they want. That signal is gold, but
only if it lands somewhere and gets acted on. Decide where feedback arrives:
- **Store reviews** (iOS/Android) — public ratings and complaints; watch them,
  and reply where the store allows.
- **Support email** — a real address users can reach you at, monitored.
- **In-app feedback form** — the lowest-friction way for a user to report a
  problem from inside the product.

**Every piece of feedback flows back into `docs/BACKLOG.md`** so nothing is lost.
Tag each item with a priority marker so the important things rise:
- **P0** — broken/critical: data loss, security, the product is down or unusable.
  Drop everything.
- **P1** — important: a real problem hurting many users, fix soon.
- **P2** — nice-to-have: improvements and smaller asks, scheduled later.

Keep a dedicated **Bugs / Incidents lane** in the backlog separate from new-
feature ideas, so a launch bug isn't buried under wishlist items. P0s and P1s in
that lane jump the queue.

---

## Blameless postmortems — the learning loop after something breaks

Incident response (the kill switch, the rollback) is **reactive** — it stops the
bleeding. The postmortem is the **learning loop** that keeps the same wound from
reopening. After any incident or outage, write a short **blameless** postmortem:

- **What happened** — the user-visible impact, in plain words.
- **The timeline** — when it started, when it was noticed, when it was fixed.
- **What in the PROCESS or TOOLING allowed it** — and this is the whole point:
  *not who erred.* Blame finds a person and stops; blameless finds the missing
  guardrail (a check CI didn't run, an alert that didn't fire, a step with no
  confirmation) and fixes the system so a normal mistake can't cause this again.
- **The concrete fix** — the specific change that makes recurrence impossible or
  much harder.

**Feed the fix into the backlog**, and where it's a durable rule, into the
**Constitution / LEARNINGS** so the whole system gets smarter. A bug fixed once is
a fix; a bug whose *cause* is removed is a lesson.

---

## The update / patch loop — different per target

When you ship a fix or improvement after launch, how fast it reaches users depends
entirely on the platform — and a non-technical owner needs to know this so they
set the right expectations:

- **Web** — **redeploy.** A fix can be live in minutes through your CI/CD
  pipeline. Fastest loop; this is why web problems are the least stressful.
- **iOS** — **new build + Apple review.** Every update is a fresh build with a
  higher build number, submitted for App Store review, which **takes days** (an
  expedited review for a critical fix is possible but not guaranteed). Plan
  around the latency.
- **Android** — **new build + Google review.** Same shape: a new build with a
  higher build number, reviewed before release; review is often faster than
  Apple's but still **not instant**, and rollout is staged.

The takeaway: web you can fix on the fly; mobile fixes carry **days of review
latency**, which is exactly why the operations layer pushes phased rollouts,
feature flags, and the on-device gate so hard for apps.

---

## Reviewing real usage against your Phase 1 goals

In discovery (Phase 1), you defined **success metrics** and usually a **leading
indicator** with a **tripwire** (the early signal that tells you it's working — or
the threshold that says something's wrong). Post-launch is when those stop being
theoretical:

- **Compare real usage to the success metrics** — are people actually doing the
  thing the product is for, at the level you hoped?
- **Watch the leading indicator** — the early proxy for success, before the full
  metric can be measured.
- **Honor the tripwire** — if usage crosses the "this isn't working / something's
  wrong" threshold you set, take it seriously and revisit the plan rather than
  hoping it turns around.

This is the moment the honest discovery work pays off: you can tell whether the
product is succeeding by the numbers you chose in advance, not by gut feel.

**Review the SLO / error budget here too.** The uptime target and error-budget
stop-rule (`operations.md`) are part of this day-2 loop: check where the app
stands against its target over the rolling 30-day window. **If the budget is
blown, reliability work outranks new features** — Claude pauses building and fixes
stability first, and says so in plain words.

---

## Continuing the build — v0.2 and onward

Improving the product after launch doesn't need a new process. **Subsequent build
sessions simply re-enter DEVELOPMENT mode** (`development.md`): the next session
reads the backlog (now fed by real feedback and the priority markers above), picks
the top item — a P0 bug, a P1 fix, or the next planned feature — sizes it, runs
the feature loop, and ships it through the same CI/CD and release path. v0.2 is
just another development session, now informed by what real users actually did.

---

## Maintenance keeps coming — even with zero new features

A launched product is a *running* one, and a running product needs upkeep
whether or not you ever build another feature. The work doesn't stop just because
the roadmap does:

- **Security patches.** The CI dependency-vulnerability scan flags known holes in
  your third-party packages; some are urgent and must be patched promptly.
- **Dependency & runtime EOL updates.** Languages, frameworks, and runtimes reach
  end-of-life and stop getting security fixes; you have to move to a supported
  version before that happens.
- **Platform-forced changes.** Apple and Google periodically **raise the minimum
  target SDK/API level** and will reject updates — or delist live apps — that
  don't comply by a stated deadline. OS and browser changes can break things you
  never touched.

Someone has to do this — **Claude in a maintenance session, or a hired developer.**
So budget a recurring **"maintenance / dependency-update" block** (e.g. monthly)
in `docs/BACKLOG.md`, and tell the founder plainly at launch: **expect a few hours
of upkeep periodically, forever.** A product is a garden, not a statue.

---

## Knowing and controlling recurring cost (`docs/COSTS.md`)

The **cost cap** stops a runaway spike. But the owner also needs the *steady*
picture — the quiet monthly bleed that's easy to forget. Keep a **`docs/COSTS.md`**
that lists **every recurring charge**: hosting, database, domain, Apple Developer
($99/yr), Google Play ($25 one-time), email/SMS, monitoring, LLM/API usage.

For each line, record:
- the **amount** and **billing cycle** (monthly/annual/one-time),
- the **renewal date**,
- **who's billed** and **on which card**,
- a one-line **"how to reduce or cancel this."**

**Review it post-launch, and again whenever a service leaves its free tier** (the
classic surprise bill). The test: the owner should open **one file** and answer
*"what am I paying, when does it renew, what can I cut?"* — without Claude.

---

## Turn data into the next decision — close the loop

Comparing real usage to your metrics isn't the end of the analysis; it's the
**input to what gets built next.** Collecting analytics and *learning* from them
are different things — the difference is whether the numbers re-rank the backlog:

- **Where do users drop off?** The biggest fall in your funnel is the
  highest-leverage fix — go there first.
- **What's never used?** Cut it; don't polish a feature nobody touches.
- **What contradicts the original plan?** Let the evidence override the
  assumption, and **re-rank `docs/BACKLOG.md` accordingly.**

So **v0.2 is informed by what real users actually *did*** — not only by what they
said they wanted, or what the plan assumed they'd do. That's the line between
*having* analytics and *learning* from them.

---

## Winding down responsibly — the honest exit

Sometimes the right call is to stop — the owner moves on, or a tripwire fired and
the product isn't working. Stopping is fine; **walking away carelessly is not.**
Leaving charges running and user data sitting unguarded is the expensive — and
sometimes illegal — way to leave. The responsible shutdown:

- **Tell users, and give them a window to export their data** before anything is
  turned off.
- **Export and archive the data and the code** safely, so nothing is lost.
- **Delete personal data you no longer have a basis to keep, and honor any
  outstanding deletion requests** — GDPR and similar duties don't end because you
  lost interest.
- **Cancel every recurring charge** (from `docs/COSTS.md`) and **turn OFF domain
  auto-renew** — or hand the domain over to whoever's taking it.
- **Decommission cleanly, and revoke/rotate keys last**, once nothing legitimate
  still needs them.

A clean exit protects the owner and the users both. An abandoned-but-still-billing
product protects no one.

---

## Post-launch is a loop, not a finish line

Launching is the start of the real work, not the end of it. Monitor → gather
feedback → prioritize into the backlog → fix and improve → ship → measure against
your goals → repeat. The product you launched is version one of something that
keeps getting better as long as you keep tending it. Treat post-launch as a
**permanent loop**, and each turn of it leaves the product stronger and your
understanding of your users sharper.
