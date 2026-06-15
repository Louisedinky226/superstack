# Glossary — plain-language definitions

One-line, jargon-free definitions of the terms a non-technical founder will meet
in this skill. Pull from here when a term first appears so definitions stay
consistent. Alphabetical.

- **Accessibility** — designing the product so people with disabilities (low
  vision, color blindness, motor or hearing differences) can use it.

- **ADR (Architecture Decision Record)** — a short written note capturing one big,
  hard-to-reverse decision and why it was made, so the reasoning isn't lost.

- **API** — a defined "menu" of requests one piece of software can make to
  another; how programs talk to each other.

- **API versioning** — labeling your API by version (v1, v2…) so you can change
  it without breaking the apps that already rely on the old behavior.

- **App store review** — the approval check Apple or Google runs on your app
  before it's allowed into their store.

- **Auth (authentication)** — how the app confirms who a user is, e.g. logging in
  with email and password or "Sign in with Google."

- **BaaS (Backend-as-a-Service)** — a ready-made backend (database, login, file
  storage) you rent instead of building, e.g. Firebase or Supabase.

- **Backend** — the part of the system the user never sees: the server, the
  business logic, and the database behind the scenes.

- **Backlog** — the full list of everything you might build, loosely ordered;
  the pool you pull the next task from.

- **Backup / restore** — regularly saving a copy of your real data, and the
  tested process for putting it back if something is lost or corrupted.

- **Branch** — a separate line of work in git, so you can build something without
  disturbing the main code until it's ready.

- **Branch protection** — rules on the main branch that block risky changes, e.g.
  requiring review and green checks before anything can merge.

- **C4 (architecture diagram)** — a simple way to draw a system as nested boxes;
  this skill uses only the two readable levels — **Context** (your product as one
  box, plus the people and outside services it talks to) and **Container** (the
  major pieces inside: the app, the server, the database).

- **CAC (Customer Acquisition Cost)** — the average money you spend on marketing
  and sales to win one new paying customer.

- **CHANGELOG** — a human-readable list of what changed in each released version,
  so users and contributors can see what's new or fixed.

- **Churn / retention** — churn is the rate at which users leave; retention is the
  share who stay and keep using the product.

- **CI/CD** — Continuous Integration / Continuous Delivery: robots that
  automatically test every change (CI) and can automatically ship it (CD).

- **CI/CD required checks** — the automated jobs (build, tests, lint, scans) that
  must all pass green before a change is allowed to merge.

- **Code signing** — attaching a verified digital signature to an app so the
  app store and the user's device trust it came from you.

- **Cookie consent** — the banner or prompt that asks users to agree before you
  set tracking cookies, required in many regions.

- **COPPA** — a US law that puts strict rules on collecting personal data from
  children under 13.

- **Commit** — a saved, labeled snapshot of your code at a moment in time; the
  basic unit of saving in git.

- **Cross-platform** — one shared codebase that runs on several platforms (e.g.
  both iPhone and Android) instead of writing each separately. (See "native.")

- **Dark mode** — an alternate color scheme with dark backgrounds and light text,
  offered alongside the normal "light" look.

- **Database** — the organized store where the app's data lives (users, posts,
  orders) so it can be saved and looked up reliably.

- **Dependency vulnerability scan** — an automatic check of the third-party
  packages your app uses against lists of known security holes.

- **Deployment** — the act of putting your code onto a live server (or store) so
  real users can actually use it.

- **Design guidelines / design system** — the binding rulebook for how the
  product looks and behaves: fonts, colors, spacing, components, states.

- **Environment (dev / staging / prod)** — separate copies of the system:
  **dev** for building, **staging** for a live-like test, **prod** (production)
  for real users.

- **.env / secrets** — a private settings file holding passwords and keys; kept
  out of the shared code so secrets never leak.

- **Feature flag** — an on/off switch around a feature so you can turn it on or
  off instantly without redeploying; a flag used to disable something fast is a
  **kill switch**.

- **Framework** — a pre-built foundation that handles common plumbing so you
  build your app on top of it instead of from scratch (e.g. React, Django).

- **Frontend** — the part of the product the user sees and touches: the screens,
  buttons, and layout.

- **Gantt** — a calendar-style chart showing each task as a bar across time, so
  you can see the schedule and what depends on what.

- **GDPR / CCPA** — European (GDPR) and California (CCPA) privacy laws that give
  users rights over their personal data and place duties on those who collect it.

- **GraphQL** — one way an app's front end asks the back end for data: a single
  flexible endpoint where the client requests exactly the fields it wants. (See
  also REST, tRPC.)

- **Incident response** — the planned way you detect, fix, and communicate about
  something going wrong in production (an outage, a breach, a bad bug).

- **Linter** — an automatic tool that flags style mistakes and likely bugs in
  code, like spellcheck for programming.

- **LTV (Lifetime Value)** — the total money you expect to earn from one customer
  over the whole time they stay with you.

- **MFA / 2FA** — multi-factor / two-factor authentication: requiring a second
  proof of identity (like a phone code) on top of the password.

- **Monitoring / observability** — tools that watch the live app's health, errors,
  and performance and alert you when something goes wrong.

- **MVP (Minimum Viable Product)** — the smallest version that does one core job
  end-to-end for one user; the first thing worth shipping.

- **Native** — software built specifically for one platform using its own tools
  (e.g. Swift for iPhone), usually fastest and most polished. (See
  "cross-platform.")

- **PCI** — the security standard you must follow if you handle credit-card data
  directly; most teams avoid it by using a payment provider like Stripe.

- **Positioning** — the short, clear story of who your product is for and why it's
  the right choice over the alternatives.

- **Privacy policy** — the public document that tells users what personal data you
  collect and how you use it; legally required in many places once you collect any.

- **Pull request (PR)** — a proposed set of changes opened for review before it's
  merged into the main code; where teammates and checks weigh in.

- **Push** — uploading your saved commits from your computer to the online
  repository.

- **Rate limiting** — capping how many requests a user or client can make in a
  window, to prevent abuse and protect the system.

- **Remote** — the online copy of your repository (commonly named "origin") that
  your local code uploads to and downloads from.

- **Repository / repo** — your project's folder under git's tracking; the home of
  all its code and history, local and online.

- **REST** — the simplest and most common way an app's front end talks to its back
  end: plain web addresses (endpoints) over HTTP that nearly everything understands.

- **Roadmap** — the committed, ordered plan and schedule of what gets built when;
  the near-term route to launch.

- **Rollback** — quickly reverting to the previous working version when a release
  causes problems, to limit the damage.

- **Safe area** — the part of a phone screen that isn't blocked by notches,
  rounded corners, or the home bar, where content should stay.

- **Scaffold / scaffolding** — creating the project's folder and its starting
  files so the project exists on disk and is ready to build on.

- **SDK (Software Development Kit)** — a bundle of tools and code a company gives
  you to build on their platform or service.

- **SemVer (Semantic Versioning)** — a version-numbering scheme (major.minor.patch)
  where each part signals how big a change is.

- **Soak (post-deploy soak)** — watching a freshly-released product for a short
  window (e.g. 15–60 min) to confirm it's healthy before calling it done.

- **STRIDE** — a quick, structured security walk-through that lists how a feature
  could be attacked (spoofing, tampering, etc.) so it can be designed against.

- **Sprint** — a short, focused block of work that delivers one concrete piece
  of the product (for example, "the recipe-search screen").

- **Stack** — the named set of technology choices a product is built with:
  language, framework, database, and hosting, together.

- **Staging** — a live-like pre-production copy of the app where changes are
  tested with realistic settings before real users see them.

- **tRPC** — a way for an app's front end and back end to talk when one team owns
  both in TypeScript: you call server functions as if they were local, fully typed.

- **Types** — labels that say what kind of value something is (number, text,
  date), letting tools catch mistakes before the app runs.

- **Unit economics** — the profit or loss of a single unit (one customer or one
  sale), e.g. comparing what a customer is worth (LTV) to what they cost (CAC).

- **Uptime** — the share of time your service is up and working, often quoted as
  a percentage (e.g. "99.9% uptime").

- **Value proposition** — the core promise of your product: the main benefit a
  user gets and why it matters to them.
