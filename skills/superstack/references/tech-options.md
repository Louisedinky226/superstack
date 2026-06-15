# Tech Options — the honest, complete menu

Read this at the technology phase. The Technology Advisor presents from this
catalog using the option format (plain words · best for · pros · cons/costs)
and **never truncates the menu**. The cardinal sin this skill prevents:
offering a user only the two most popular options and hiding the rest. If your
current knowledge is newer than this file, trust your knowledge — this is a
starting catalog, not a contract. Money figures are rough and change; verify
costs before quoting them as fixed.

For every paid or LLM/cloud service chosen here, a **cost cap is mandatory**
(monthly ceiling + alert threshold + who pays + behavior at the ceiling).

**Verify before you recommend — never trust this file (or memory) on a hard
constraint.** Pricing, free-tier limits, and feature support change constantly,
and this catalog is a starting point, not current truth. When the user has a
hard requirement — most commonly a **hard spending cap that stops charges**
(not just an alert), but also a region, a compliance need, or an existing tool —
**open the provider's current official docs/pricing via web search and confirm
it before recommending**, and record what you checked in the option's `Verified:`
line. Hosts differ a lot here: some let you set a true hard cap, others only send
an alert after spending has already happened — and getting this wrong forces an
expensive mid-project migration. Do not present any option as meeting a
constraint you have not verified in its documentation.

---

## Contents

- MOBILE — present the FULL menu, always
- WEB
- DESKTOP
- CLI (terminal tools)
- BACKEND
- DATABASE (when not bundled with a BaaS)
- AUTHENTICATION
- PAYMENTS
- SUPPORTING SERVICES (mention when relevant)
- OBSERVABILITY (how you find out it's broken before users tell you)
- API STYLE (how the front end talks to the back end)
- DEPLOYMENT TARGETS & their real-world prerequisites
- DNS & DOMAINS (the address users type to reach you)
- Closing rules for the technology phase

---

## MOBILE — present the FULL menu, always

When the product is mobile, the user must see all of these, each with honest
pros/cons. This is the section that was failing users before.

### Native, one platform at a time
- **Swift / SwiftUI (iOS)** — Apple's own language and modern UI toolkit.
  *Best for:* iOS-first products where feel and performance matter most.
  *Pros:* best performance and platform integration; first to get new iOS
  features; great tooling. *Cons:* iOS only — Android is a separate codebase;
  requires a Mac; you build everything twice if you also want Android.
- **Kotlin / Jetpack Compose (Android)** — Google's language and modern UI
  toolkit. *Best for:* Android-first products. *Pros:* native Android feel,
  Google's recommended path, strong tooling. *Cons:* Android only; iOS is a
  separate build.

### Share the logic, keep native UI
- **Kotlin Multiplatform (KMP)** — write the business logic once in Kotlin,
  share it across iOS and Android, but build each platform's screens natively
  (SwiftUI on iOS, Compose on Android). *Best for:* teams that want each app to
  feel 100% native but don't want to write the rules/logic twice. *Pros:*
  native look and feel on both; no duplicated logic; incremental — you can add
  it to an existing native app. *Cons:* you still build two UIs; newer
  ecosystem than Flutter/RN; iOS UI still needs a Mac and Swift knowledge.

### Share (almost) everything, one UI codebase
- **Compose Multiplatform (CMP)** — JetBrains' framework that shares both logic
  AND the UI across Android and iOS (and desktop/web) using Kotlin + Compose.
  Lets you **drop the separate native Apple UI** and write the screens once.
  *Best for:* teams fluent in Kotlin/Compose who want one UI for both phones.
  *Pros:* one UI codebase for both platforms; reuses Android Compose skills;
  shares logic too. *Cons:* iOS support is younger than Flutter's; some
  iOS-native polish needs bridging; still need a Mac to build/ship iOS.
- **Flutter** — Google's framework; one Dart codebase renders its own UI on
  both platforms. *Best for:* pixel-consistent UI across platforms with fast,
  smooth animations. *Pros:* mature cross-platform, excellent UI control, large
  package ecosystem, also targets web/desktop. *Cons:* Dart is a new language to
  learn; apps don't use the OS's native widgets (can feel slightly non-native);
  larger app size.
- **React Native + Expo** — one JavaScript/TypeScript codebase; uses real
  native widgets under the hood. Expo is the managed, beginner-friendly way to
  run it. *Best for:* teams already fluent in React/JS. *Pros:* reuse web/React
  skills, huge ecosystem, Expo handles builds and app-store delivery (EAS),
  over-the-air updates. *Cons:* dropping to custom native code is harder than in
  Flutter/KMP; performance ceiling below native for heavy graphics.
- **.NET MAUI** — Microsoft's cross-platform framework in C#. *Best for:* teams
  already in the .NET/C# world. *Pros:* one C# codebase, strong if you have
  .NET skills/backends. *Cons:* smaller mobile community than the others; less
  common for consumer apps.

**Recommendation guidance:** JS/React-fluent and want speed → React Native +
Expo. Want one consistent UI with great animation and don't mind learning Dart
→ Flutter. Want each app to feel truly native and are willing to build two UIs
→ KMP. Already love Kotlin/Compose and want one UI for both → Compose
Multiplatform. iOS-only, top quality → Swift/SwiftUI. Already a .NET shop →
MAUI. Always state the trade-off, never hide an option because it's less common.

---

## WEB

### App frameworks
- **Next.js (React)** — full-stack React: pages, server rendering, and a
  backend in one. *Best for:* most web apps and SaaS. *Pros:* huge ecosystem,
  SEO-friendly, one-click deploy on Vercel, can hold the whole app. *Cons:* more
  concepts to learn than a plain SPA; can be overkill for a tiny site.
- **Astro** — content-first; ships almost no JavaScript by default. *Best for:*
  blogs, marketing sites, docs, anything SEO/content-driven. *Pros:* very fast
  pages, great SEO, can still drop in React/Vue/Svelte islands. *Cons:* not
  aimed at heavily interactive app UIs.
- **SvelteKit** — elegant, smaller bundles. *Best for:* developers who like
  Svelte's simplicity. *Pros:* less boilerplate, fast, small. *Cons:* smaller
  ecosystem than React.
- **Remix (React)** — web-standards-focused React framework. *Best for:* apps
  that lean on forms and progressive enhancement. *Pros:* strong data/forms
  model. *Cons:* smaller community than Next.
- **Nuxt (Vue)** — the Next.js of the Vue world. *Best for:* Vue lovers. *Pros:*
  full-stack Vue, good ecosystem. *Cons:* smaller than React's world.
- **Vite + plain React/Vue/Svelte (SPA)** — a single-page app, no server
  rendering. *Best for:* simple interactive apps where SEO doesn't matter.
  *Pros:* lightest setup, fast dev. *Cons:* weaker SEO; you add a backend
  separately if needed.

### Styling
- **Tailwind CSS** — utility classes; fastest once learned. **shadcn/ui** —
  copy-paste accessible components on top of Tailwind. **CSS Modules** — plain
  scoped CSS for those who prefer it.

---

## DESKTOP
- **Electron** — web tech in a desktop shell (VS Code, Slack use it). *Pros:*
  ship to Mac/Windows/Linux from one codebase, biggest ecosystem. *Cons:* large
  (~100MB) and memory-hungry.
- **Tauri** — web UI + Rust core. *Pros:* tiny binaries (~10MB), low memory,
  secure. *Cons:* smaller ecosystem; Rust for native bits.
- **Wails** — like Tauri but Go. *Native per-OS* (Swift/.NET/GTK) — only when
  size and native feel are both critical.

---

## CLI (terminal tools)
- **Python + Typer** — easiest, huge ecosystem. **Node + Commander** — for JS
  folks. **Go + Cobra** — single binary, nothing for users to install (best for
  distribution). **Rust + Clap** — single binary plus Rust's safety.

---

## BACKEND
First question: does it even need one? Local-first apps (data only on the
user's device) skip this entirely and are simpler to ship.

### Backend-as-a-Service (server-in-a-box)
- **Supabase** — Postgres database + auth + file storage + realtime, generous
  free tier, open-source. *Best default for most apps with users and data.*
- **Firebase** — Google's BaaS; realtime NoSQL + auth + storage. *Best for:*
  realtime sync, Google ecosystem. *Cons:* NoSQL data modeling, some lock-in.
- **Convex** — TypeScript-first, opinionated, great DX. **PocketBase** — one
  small self-hosted binary (SQLite + auth + APIs) for full control.

### Hosting / serverless
- **Vercel** — best for Next.js. **Cloudflare Workers/Pages** — global edge,
  cheapest at scale (R2 storage, D1 SQLite, KV). **Railway / Render** — easiest
  deploys for Docker/Node/Python. **fly.io** — stateful/long-running apps.

### Self-hosted
- **VPS (Hetzner / DigitalOcean / Linode)** + Docker, optionally **Coolify /
  Dokploy** for one-click deploys. *Best for:* full control, compliance, or
  learning ops; costs the least per resource but you run it.

### Hyperscalers (AWS / GCP / Azure)
The big three clouds. Everything else here is, in part, a friendlier wrapper
over what these offer raw. *Best for:* products that need to scale far,
enterprises with compliance requirements, and — most often — **any user who
already has an account and infrastructure on one of them**. *Pros:* the most
powerful and complete option, effectively infinite scale, every service you
could need under one bill and one identity system, strong compliance
certifications. *Cons:* the steepest learning curve here; the easiest place to
overspend (a forgotten resource bills silently — cost caps and billing alerts
are not optional); the most moving parts to wire together and secure.
- **AWS** — the bread-and-butter services: **RDS / Aurora** (managed Postgres/
  MySQL), **S3** (file storage), **Lambda** (serverless functions), **ECS /
  Fargate** (run containers without managing servers), **Cognito** (auth),
  **CloudFront** (CDN), **API Gateway** (front your APIs), **Amplify**
  (managed full-stack hosting, the simplest on-ramp).
- **GCP** — **Cloud SQL** (managed Postgres/MySQL), **Cloud Run** (run a
  container as a serverless service, very easy), **GCS** (file storage), and
  **Firebase** (Google's BaaS — auth, NoSQL, hosting; the gentlest GCP entry).
- **Azure** — equivalents: **Azure SQL / Database for PostgreSQL**, **Blob
  Storage**, **Azure Functions**, **Container Apps**, **Entra ID** (auth),
  **Azure CDN / Front Door**. *Best for:* Microsoft/.NET shops and enterprises
  already on Microsoft licensing.

If Phase 1 recorded an existing cloud account, this is usually the answer —
build with it. Honoring infrastructure the user already pays for and knows
beats introducing a new vendor.

### LLM APIs (if the product uses AI)
- **Anthropic Claude**, **OpenAI**, **Google Gemini**, or **self-hosted
  (Ollama)** for privacy/cost. Cost cap mandatory — an unbounded loop can run a
  huge bill overnight. Each provider also enforces **rate limits and per-tier
  token quotas**; the architecture must decide what happens when one is hit —
  retry with backoff, queue the request, or degrade gracefully — and that
  behavior ties directly back to the cost cap.

---

## DATABASE (when not bundled with a BaaS)
- **Postgres** — default relational choice (hosts: Supabase, Neon, Railway).
- **SQLite** — local-first or single-server; Cloudflare D1 for serverless.
- **MongoDB** — document data. **Redis/Upstash** — cache, queues, sessions.

---

## AUTHENTICATION
Use the BaaS-bundled auth if you picked one. Otherwise: **Clerk** (best DX),
**Auth.js/NextAuth** (Next.js), **WorkOS** (enterprise SSO). Avoid custom auth
— it's a security minefield. Apple Sign-in is required for iOS apps offering
any social login.

---

## PAYMENTS
- **Stripe** — default for cards/subscriptions on web. **Paddle / Lemon
  Squeezy** — Merchant of Record (they handle global tax/VAT) — great for indie
  SaaS. **RevenueCat** — manages Apple/Google in-app subscriptions on mobile.

---

## SUPPORTING SERVICES (mention when relevant)
- **Analytics:** PostHog (product analytics, self-hostable), Plausible/Umami
  (privacy-friendly web), GA4 (free, privacy trade-offs).
- **Transactional email:** Resend (best DX), Postmark (deliverability), AWS SES
  (cheapest at scale). *Each has a sending rate limit and free-tier monthly
  quota — decide what happens when it's hit (queue, retry, degrade) and tie it
  to the cost cap.*
- **SMS / push:** Twilio (SMS, the default), Vonage; push via APNs/FCM or
  OneSignal/Expo. *Hard per-second rate limits and pay-per-message quotas —
  same rule: define the behavior at the limit and cap the spend.*
- **File storage:** BaaS-bundled, S3, Cloudflare R2 (no egress fees), Backblaze
  B2 (cheapest).
- **CI/CD:** GitHub Actions (default on GitHub), GitLab CI, Bitbucket Pipelines.
- **Any other third-party API:** assume it has a rate limit or free-tier quota.
  The architecture must decide the behavior when it's exceeded — retry with
  backoff, queue, or degrade — and that decision is part of the cost cap.

---

## OBSERVABILITY (how you find out it's broken before users tell you)
A product with real users needs to know when something fails and whether it's
up at all. Three layers, usually all worth wiring from launch:
- **Error / crash tracking** — captures exceptions with stack traces so you
  learn about failures the moment they happen. **Sentry** is the default for web
  and backend (generous free tier); **Crashlytics** (part of Firebase, free) is
  the standard for mobile crash reporting. *Pros:* turns vague "it broke" into a
  precise line of code. *Cons:* needs a little setup per platform; noisy if you
  don't triage.
- **Uptime monitoring** — pings your site/API from outside and alerts you when
  it goes down. **UptimeRobot** (free tier covers basic checks) or the
  **built-in monitoring** your host provides (Vercel, Render, Railway, the
  hyperscalers all offer some). *Pros:* cheap insurance, instant alerting.
  *Cons:* external pings only tell you up/down, not why.
- **Product analytics** — already covered above under SUPPORTING SERVICES
  (PostHog, Plausible/Umami, GA4); cross-referenced here because it's the third
  observability layer — it tells you what users actually do, not just whether
  the server is alive.

---

## API STYLE (how the front end talks to the back end)
- **REST** — the simplest and the default; plain HTTP endpoints, understood by
  everything. Reach for this unless you have a clear reason not to.
- **GraphQL** — one flexible endpoint where the client asks for exactly the
  fields it wants. *Pros:* great when many different screens need different
  slices of data. *Cons:* heavier to set up and operate; easy to over-engineer.
- **tRPC / RPC** — call server functions as if they were local. Best when **one
  TypeScript team owns both the front end and the back end** — full type safety
  end to end, no schema to maintain. *Cons:* TypeScript-only; not for public or
  third-party consumers.
- **Rule:** if a mobile app or any third party will call the API, **version it
  from day one** (e.g. `/v1/`). You can't force users to update an installed
  app, so old clients must keep working when you change the API.

---

## DEPLOYMENT TARGETS & their real-world prerequisites
Surface these during scheduling so they never block the launch:
- **Web:** a host (Vercel/Cloudflare/Netlify/VPS) + a domain (~$10–15/yr).
- **Apple App Store:** an Apple Developer account (~$99/yr), a Mac to build,
  app icons + screenshots, a privacy policy, and Apple's review (days). Apple
  enforces its Human Interface Guidelines in review.
- **Google Play:** a Play Console account (one-time ~$25), store listing
  assets, a privacy policy, and review.
- **Desktop:** code-signing certificates (Apple/Windows) to avoid scary
  "unknown developer" warnings.

---

## DNS & DOMAINS (the address users type to reach you)
- **Where to buy (registrar):** **Cloudflare** (at-cost pricing, free DNS, the
  usual pick), **Namecheap** (cheap, long-established), **Porkbun** (cheap, good
  UX). A domain runs roughly $10–15/yr.
- **Nameservers** tell the world which company answers DNS questions for your
  domain — you point them at your registrar or host once, and that company then
  manages your records.
- **A record** maps your domain to a server's IP address; a **CNAME** points one
  name at another name (e.g. `www` → your host's address).
- **Propagation:** DNS changes are cached around the world, so a change can take
  **up to a day** (usually minutes) to be visible everywhere — don't panic if it
  isn't instant.
- **Email deliverability:** if the product sends email, you must add **SPF,
  DKIM, and DMARC** DNS records that prove your mail is legitimate. Skip them and
  your messages land in spam (or get rejected). Your email provider gives you the
  exact records to paste in.

> **Environments:** real products run in separate **dev / staging / prod**
> environments, each with its own database, so test traffic never touches live
> user data. Decide how many environments you need and how they're wired in
> `references/operations.md`.

---

## Closing rules for the technology phase
- When the user has no preference, recommend with a one-sentence reason tied to
  their skills, audience, budget, and timeline — never a bare default.
- When the user has a strong preference, accept it unless it would actively
  hurt the product; if so, explain the concern once, then respect their call.
- Record every choice and its reasoning in `docs/adr/0001-kickoff-decisions.md`
  (copied from the `starter_ADR_0001.md` template during scaffolding).
