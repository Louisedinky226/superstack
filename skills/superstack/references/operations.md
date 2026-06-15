# Operations — running your product safely once it's real

This is the "operate it safely" layer. Building the product is one job; keeping
it running, recoverable, and hard to break is another. This file is the deep
reference for both. The spine points here when the schedule reaches anything
that touches real users, real data, or going live.

Everything below is taught in plain words, and every decision the user faces is
a **clickable menu** — a short list of options they can pick from, recommended
option first, always with an "Other / something else" escape so they're never
boxed in. Lead with the recommendation; never auto-pick it.

---

## Contents

- Environments — keep "where you experiment" apart from "where real people are"
- Production database backups & disaster recovery
- Monitoring & observability — know it broke before your users tell you
- One uptime target & the error-budget stop-rule — monitoring you can act on
- CI/CD pipeline — the robot that checks and ships your code
- Branching & PR workflow — how changes get into main safely
- Versioning & releases — name every release so you can point at it
- Schema migrations tooling — change the database without breaking it
- Feature flags / kill switch — ship risky things you can turn off instantly
- Reproducibility — the same code builds the same way everywhere
- Rollback reality — what "undo" actually means per platform
- Back up the things git deliberately does NOT hold
- The owner's runbook (`docs/RUNBOOK.md`)
- Confirm the environment before any destructive command

---

## Environments — keep "where you experiment" apart from "where real people are"

An **environment** is just a separate copy of your product, with its own data
and its own secrets. Why separate copies? Because the place where you try risky
things must never be the place real users live. If you test a "delete all
records" button against the same database your users depend on, one mistake wipes
them out. Separation is the wall that stops a normal mistake from becoming a
disaster.

The three common environments, in plain words:
- **dev (development)** — your local sandbox. Break it freely; nobody sees it.
- **staging** — a near-identical rehearsal copy of production. The last place to
  catch a problem before real users do. Same setup as prod, fake data.
- **prod (production)** — the real thing your users actually use.

**The rule: each environment has its own separate database and its own separate
secrets.** Staging must never read or write the production database, and a
staging API key is different from a production API key. Mixing them is how test
data ends up in front of real users, or a test deletes real records.

**Menu — how many environments for this product?**
- **Three: dev + staging + production (Recommended for anything with real
  users)** — a real rehearsal step before users are affected; the safest setup.
- **Two: local dev + production** — simpler and cheaper; fine for early or
  low-risk products, but you test changes against prod's shape with no rehearsal.
- **Single (throwaway only)** — one environment, no separation. Only acceptable
  for a personal experiment with no real users and no real data.
- **Other / something else** — describe your situation and we'll fit it.

---

## Production database backups & disaster recovery

A backup is a saved copy of your real data you can restore from if something goes
wrong — a bad deploy, a buggy migration, a deleted table, a ransomware event, a
provider outage. Without backups, one bad moment can erase everything your users
ever created, permanently. **For any product with real user data, backups are
mandatory — not optional.**

Three things make a backup real:
- **Automatic** — it runs on a schedule by itself. A backup you have to remember
  to take is a backup you won't have when you need it.
- **Retained** — you keep multiple days/weeks of backups, not just last night's,
  so you can go back to *before* a problem started (some problems take days to
  notice).
- **Tested** — and this is the one everyone skips: **you must actually restore a
  backup once, before launch, and confirm the data comes back intact.** An
  untested backup is a guess. A restore you've done before is a plan.

**Disaster recovery** is just the written answer to "if production is destroyed,
how do we get back, and how long will it take?" One page: where backups live, how
to restore, who does it.

**Menu — backup approach for production data?**
- **Managed automatic backups + one tested restore before launch (Recommended)**
  — turn on the database provider's built-in daily backups with multi-day
  retention, then do a real restore rehearsal once and confirm it works.
- **Managed backups + periodic restore drills** — as above, plus you re-test the
  restore on a schedule (best for anything holding important or hard-to-recreate
  data).
- **Manual/scripted exports** — a scheduled job dumps the database to separate
  storage; more work to run and easier to forget, only sensible if managed
  backups aren't available.
- **No backups** — only valid when there is genuinely no real user data to lose.
- **Other / something else** — describe what you need.

**RPO / RTO recovery targets (pairs with the SLO).** Have the owner pick, in
plain words, two targets: **RPO** ("how much recent data could we afford to lose
if something fails?" → sets how often backups run) and **RTO** ("how fast must we
be back up?" → sets the restore plan). Size backup frequency and the restore
drill to meet them. E.g. "lose at most 1 hour of data, be back within 4 hours."

---

## Monitoring & observability — know it broke before your users tell you

You can't fix what you can't see. **Observability** means your product tells you
how it's doing without you having to guess. Four cheap pieces cover the basics,
and the free tiers are enough to start:

- **Error / crash tracking** — a service that catches errors and crashes the
  moment they happen and shows you what broke, where, and for how many users.
  Sentry (web/backend) and Crashlytics (mobile) have free tiers.
- **Uptime checks** — a service that pings your site every few minutes from
  outside and alerts you if it goes down. UptimeRobot has a free tier.
- **Basic alerting to the owner** — when something serious happens, *you* get a
  message (email/SMS/push). An alert nobody receives is not an alert.
- **A health-check endpoint** — a tiny URL (like `/health`) that returns "I'm
  OK" when the app is alive. Uptime checks ping it; it's the product's pulse.

**Menu — monitoring setup?**
- **Sentry/Crashlytics + UptimeRobot + health endpoint + owner alerts
  (Recommended)** — full basic coverage, all on free tiers, set up before launch.
- **Crash tracking + uptime only** — lighter; good for a small product where the
  health endpoint and custom alerting can wait.
- **Provider's built-in monitoring** — if your host already includes error and
  uptime dashboards, start there and add tools as you grow.
- **None yet** — only for a pre-launch experiment with no users.
- **Other / something else** — describe your stack and we'll match it.

---

## One uptime target & the error-budget stop-rule — monitoring you can act on

Monitoring tells you the app is down; an **SLO (Service Level Objective)** turns
that into a number the owner picks and Claude defends. At launch, the owner
chooses **ONE uptime target** — that's all. Plain words: "what fraction of the
time should the app be working?"

**Menu — uptime target (SLO)?**
- **99.5% (Recommended default)** — down at most ~3.6 hours a month. A sensible
  bar for most small products.
- **99.9%** — down at most ~43 minutes a month; stricter, costs more discipline.
- **99%** — down at most ~7.2 hours a month; fine for low-stakes/early products.
- **Other / something else** — describe what uptime your users actually need.

The matching half is the **error budget**: the allowed downtime under that target
(at 99.5%, about 3.6 hours per 30 days). Claude tracks uptime against the target
over a **rolling 30-day window**. **The stop-rule, in plain words: if the app
falls below its target over that window, Claude PAUSES new features and works only
on reliability and bug-fixes until the target is restored** — and tells the owner
why, in plain language ("we've been down more than your 99.5% target allows this
month, so I'm fixing stability before building anything new"). This makes existing
monitoring a decision the owner understands, not just a dashboard.

---

## CI/CD pipeline — the robot that checks and ships your code

CI (Continuous Integration) is the robot that checks every change automatically
(see `project-conventions.md`). CD (Continuous Delivery/Deployment) is the same
robot *shipping* a change once it passes. Together they make releasing routine
and safe instead of scary and manual.

**The required (blocking) jobs — every one of these must pass, or the change does
not merge or ship.** These are set up as **REQUIRED status checks** on the
repository, meaning the platform itself refuses to merge a pull request until they
are green:
- **install** — dependencies install cleanly from the lockfile.
- **typecheck** — the types line up (for typed stacks).
- **lint** — formatting and code-style rules pass.
- **format check + EditorConfig** — CI also runs the agreed auto-formatter's
  check and respects a committed `.editorconfig`, so style is consistent and
  never hand-argued (detail/why in `project-conventions.md`).
- **test + coverage floor** — tests pass and coverage stays at or above an agreed
  minimum, so test quality can't silently erode.
- **build** — the production build actually compiles/bundles.
- **secret-scan** — gitleaks/trufflehog finds no leaked credential (blocking from
  day one, per `project-conventions.md`).
- **dependency-vulnerability scan** — checks installed packages for known
  security holes.
- **SBOM (Software Bill of Materials)** — a near-free CI step that emits an
  inventory of every dependency the build includes. It's the ingredient list for
  your software: when a new vulnerability is announced, you can answer "do we even
  use that?" in seconds. Good supply-chain hygiene alongside the dependency-vuln
  and secret scans above.
- **performance budget (web)** — enforce Core Web Vitals limits so speed can't
  silently regress: **LCP under 2.5s** (how fast the main content shows), **INP
  under 200ms** (how fast the page responds to a tap/click), **CLS under 0.1**
  (how much the layout jumps around). The build **fails or is flagged** when a
  change pushes any metric past budget, so a slow page gets caught in CI instead
  of by your users.

Then the delivery side:
- **preview / staging deploy** — a passing change is auto-deployed to a preview
  URL or staging so it can be clicked through before prod.
- **promote-to-prod** — a deliberate, approved step that ships the known-good
  build to production (subject to the spine's hard stop: never deploy to prod
  without explicit user approval).

Because these checks are **required status checks**, a red check is a wall, not a
warning. That's the point — the robot enforces the standard so a tired human
can't skip it at 2am.

---

## Branching & PR workflow — how changes get into main safely

`main` is the trusted line of code your releases come from. The workflow protects
it so a half-finished or broken change can't land in it by accident.

- **Feature branches off main** — each piece of work happens on its own branch,
  not directly on main.
- **One PR per feature** — a Pull Request ("please pull my branch into main") is
  where the change is reviewed and where CI runs.
- **CI green to merge** — the required checks above must pass before merge.
- **Protected main** — the platform blocks direct pushes and force-pushes to
  main; the only way in is a reviewed, CI-green PR. This prevents rewriting
  history or sneaking changes past the checks.

**Menu — branching model?**
- **PR + protected main (Recommended)** — every change is a PR, CI must be green,
  no direct or force pushes to main. Safest, and what required status checks
  assume.
- **Direct to main** — commit straight to main; faster for a solo throwaway, but
  no safety net and no review.
- **Trunk-based with short-lived branches** — tiny branches merged fast behind
  feature flags; powerful for experienced teams, more discipline to run well.
- **Other / something else** — describe how you'd like to work.

**Closing out a feature branch — never show raw git.** When a feature is
finished, the owner should never face cryptic git commands. Claude first **verifies
the tests pass**, then offers plain choices:
- **Ship it** — merge the branch into main through the normal CI-green PR.
- **Keep working on it later** — leave the branch as-is to return to.
- **Throw it away** — discard the work. Because this is unrecoverable, Claude
  **requires an explicit typed confirmation** before deleting anything.

After the choice, Claude **cleans up the worktree and branch** so the repo doesn't
fill with stale leftovers. The owner decides in plain words; Claude handles the git.

---

## Versioning & releases — name every release so you can point at it

Versioning gives every release a clear name so you can say exactly what's live and
roll back to a specific past version.

- **SemVer (Semantic Versioning)** — versions look like `MAJOR.MINOR.PATCH`
  (e.g. `1.4.2`): bump PATCH for fixes, MINOR for new features, MAJOR for
  breaking changes. It tells users at a glance how big a change is.
- **Git tags per release** — tag the exact commit each release ships from
  (`v1.4.2`), so "the version that's live" maps to a precise, recoverable point.
- **CHANGELOG.md** — a human-readable list of what changed in each version. Future
  you, and your users, will thank you.
- **Build number (apps)** — mobile and desktop apps also carry a **monotonically
  increasing build number** that goes up by one every single build and is **never
  reused.** App stores reject a re-used build number, and you can't undo a release
  except by shipping a *higher* one — so the number only ever climbs.

---

## Schema migrations tooling — change the database without breaking it

Your database has a **schema** — the shape of its tables and columns. Changing
that shape on a live database holding real data is one of the most dangerous
things you can do, so it's done through **migrations**: small, ordered,
**reversible** change scripts managed by your stack's migration tool (Prisma
Migrate, Rails/Active Record, Django migrations, Alembic, Flyway, etc.).

The rules that keep migrations safe:
- **Every schema change is a migration file**, version-controlled like code —
  never typed by hand into a live database.
- **Migrations run in CI against a scratch (throwaway) database** so a broken
  migration is caught before it touches anything real.
- **Migrations run on staging before prod**, so the rehearsal copy proves the
  change works.
- **Never hand-edit a live database.** Manual edits aren't recorded, aren't
  reversible, and can't be reproduced — they're how environments silently drift
  apart.
- **Expand/contract for backward compatibility** — make additive changes first
  (expand: add the new column, keep the old), deploy code that works with both,
  *then* later remove the old (contract). This way the old and new code can
  briefly coexist during a deploy without breaking, and you avoid an all-or-
  nothing flip.

---

## Feature flags / kill switch — ship risky things you can turn off instantly

A **feature flag** is an on/off switch for a feature, controlled without a new
deploy. Ship anything risky **behind a default-off flag**: the code is live but
the feature is dark until you choose to turn it on, and you can turn it on for a
few users first.

The companion is a **kill switch** — an owner-flippable off switch for a feature
that's misbehaving. If a new feature starts causing errors in production, you flip
the switch *off* in seconds instead of scrambling to deploy a fix. For a non-
technical owner this is the calm-in-a-crisis button: it buys time to fix things
properly without your users feeling the pain.

---

## Reproducibility — the same code builds the same way everywhere

If your project builds differently on your laptop than in CI than in production,
you get bugs nobody can explain. Reproducibility closes that gap:

- **Pin runtime versions** — state the exact language/runtime version the project
  uses (Node 20.x, Python 3.12, a specific JDK), not "whatever's installed."
- **Commit lockfiles** — the lockfile (`package-lock.json`, `yarn.lock`,
  `poetry.lock`, `Gemfile.lock`, etc.) records the exact version of every
  dependency. Commit it so everyone and CI install identical versions.
- **CI uses the pinned versions** — the robot builds with the same runtime and
  the same lockfile, so "passes in CI" really means "will pass in prod."

---

## Rollback reality — what "undo" actually means per platform

When something ships broken, you want to undo it. The honest truth is that "undo"
means very different things depending on what you're running, and a non-technical
owner must understand this *before* a bad deploy, not during one.

- **Web — roll back by redeploying the prior tagged build.** Because you tag every
  release, going back is: deploy the previous good tag. Fast and clean — *as long
  as the database schema didn't change.*
- **A schema change can't be undone by reverting code.** If a deploy changed the
  database shape, rolling the *code* back to yesterday does not roll the
  *database* back — the data has already moved. This is why the rules above
  matter: **back up immediately before a schema-changing deploy**, and keep
  changes **backward-compatible** (expand/contract) so the old code can still run
  against the new database while you recover.
- **Mobile CANNOT be rolled back.** Once users install a version, you cannot
  reach into their phones and replace it. There is no "undo" button. If a mobile
  release is bad you must: **halt the phased rollout** immediately (stores let you
  pause a staged release), then **ship an expedited hotfix with a higher build
  number** and wait for store review. This is the single biggest reason mobile
  releases get the extra caution (phased rollout, the on-device gate, feature
  flags) — the cost of a mistake is days, not minutes.

The practical takeaways: tag every release; back up before any schema change;
keep schema changes backward-compatible; roll web out gradually and mobile *very*
gradually behind flags; and never assume "undo" exists until you know which of
these three worlds you're in.

---

## Back up the things git deliberately does NOT hold

Some things are correctly kept **out of git** — `.env` secrets, signing
certificates, and the mobile app-signing **keystore**. The catch: that means they
have only **one copy, on the laptop**, and they **can't be regenerated from the
repo.** Back them up separately into a secure place (password manager / encrypted
vault).

- **The Android keystore / iOS signing identity is IRREPLACEABLE.** Lose it and you
  can **never ship an update** to your already-published app — users would have to
  uninstall and reinstall a brand-new listing. **Back it up the day it's created**,
  not later.
- **Prefer managed signing where available** — Play App Signing, Expo EAS-managed
  credentials, and similar move the irreplaceable key off your laptop and remove
  this single point of failure. Verify it's actually in place before relying on it.

**Secret rotation + least privilege.** Issue every credential with the least
privilege it needs, and **rotate it periodically** (and immediately if exposed).
Document where each secret lives (above), and set a rotation reminder for any
long-lived keys.

---

## The owner's runbook (`docs/RUNBOOK.md`)

Every project ships a **`docs/RUNBOOK.md`** — a plain-language, copy-paste
operations manual the **owner can follow ALONE**, written for a stressed
non-technical person, with exact commands and exact dashboard URLs filled in for
**this** project (not generic placeholders). It covers:

- how to run it locally,
- how to deploy / redeploy,
- how to roll back,
- how to restart,
- how to read the logs,
- how to rotate a key (per service, by name),
- and a **"the site is down — first 5 things to check"** list.

Keep it current. **Test it once before launch** by having the owner do one real
deploy and one real restart from the runbook alone — if they can't, it isn't done.
A working runbook is a **go-live prerequisite.**

---

## Confirm the environment before any destructive command

Before any command that destroys or replaces something — `drop`, `delete`,
force-push, deprovision — **confirm which environment your terminal and keys are
actually pointed at.** The classic disaster is the prod-vs-staging mixup: running a
"wipe it" command against production while thinking you're on staging. A destructive
command against a resource that **might** hold real data or config is a **hard
stop** — confirm the target is genuinely throwaway *first*, then run it.
