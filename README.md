<div align="center">

<img src="https://raw.githubusercontent.com/tomzion90/superstack/main/assets/media/01_cover.png" alt="SuperStack — step by step, from idea to production" width="820">

# ⚡ SuperStack

### Step by step, from idea to production.

**Turn an idea into a real, launched product — even if you've never written a line of code.**

[![Built for Claude](https://img.shields.io/badge/Built%20for-Claude-8A2BE2)](https://claude.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.0-blue)](#)
[![Coding](https://img.shields.io/badge/coding-not%20required-ff69b4)](#)
[![Stars](https://img.shields.io/github/stars/tomzion90/superstack?style=social)](https://github.com/tomzion90/superstack)

**[📖 Read the User Guide »](docs/USER-GUIDE.md)**  ·  [🚀 Install](#-install)  ·  [🗺️ How it works](#️-how-it-works-the-full-process)  ·  [❓ FAQ](docs/USER-GUIDE.md#-faq)

</div>

---

SuperStack is a complete **product team inside Claude**: you bring the idea 💡, and it
**plans, builds, tests, and ships** the product end to end — to a professional standard.

> 🥞 One stack. **Idea in → real, launched product out.**

> [!NOTE]
> **New here? Start with the [📖 User Guide](docs/USER-GUIDE.md).** It's a fun, plain-English
> manual that shows you exactly how to start, what to type, and how to go from idea to live —
> no tech background needed.

---

## 🤔 Who this is for

Smart, **non-technical** founders, makers, and dreamers with a real idea — people who don't
know (and don't *need* to know) what an MVP, a stack, or a deployment is.

> **You own the idea. SuperStack owns the code.** You never read or write any. 🙌

---

## ✨ Why use it (the short version)

Claude can already write code. But on its own it won't *plan* your product, keep it simple
and cheap, *test* what it builds, stop before risky moves, or remember your project across
days. SuperStack adds all of that — so you get a **real, maintainable, launched product, not
a pile of unreviewed code.**

| 😬 Without it | ✅ With SuperStack |
|---|---|
| Jumps straight to code | **Plans first** — you build the right thing |
| Can over-engineer an expensive v1 | **Simplicity gate** — fewest parts, lowest cost |
| "Done" = it wrote something | **Done = tested, reviewed, proven** |
| Might leak secrets / spend / deploy on its own | **Always-on guardians** stop it before risk |
| Forgets between chats | **Remembers** — picks up where you left off |
| Needs you to read code | **You own the *what*; it owns the *how*** |

---

## 🚀 Install

### Claude Code (CLI)
```
/plugin marketplace add tomzion90/superstack
/plugin install superstack@yutom-plugins
```

### Cowork (the Claude desktop app)
1. Download **[`superstack.skill`](superstack.skill)** from this repo.
2. In Cowork, open it and click **Save skill** — or go to **Settings → Capabilities** and add it.

> [!IMPORTANT]
> After installing in either place, **start a new chat / restart** so the skill loads.

---

## ▶️ Quickstart (30 seconds)

Just tell Claude your idea, like you'd tell a friend:

> 💬 *"I have an idea for an app that reminds dog owners when they last walked their dog — help me build it from scratch."*

SuperStack greets you, says **"protocol loaded,"** and starts the guided kickoff. From there
it plans, builds, and ships — checking in only when a real decision or risk needs you. ✅

👉 Full walkthrough with examples, tips, and "what to type": **[📖 User Guide](docs/USER-GUIDE.md)**

---

## 📸 See it in action

**Day one — just tell it your idea.** No tech talk, no menus. It starts a warm, human conversation to understand what you're building.

<div align="center">

<img src="https://raw.githubusercontent.com/tomzion90/superstack/main/assets/media/03_in_action.png" alt="The SuperStack kickoff — a warm, plain-language conversation about your idea" width="780">

</div>

**Every session after — you just say hi.** It remembers where you left off and hands you the 3 most useful things to do next, with the top one recommended.

<div align="center">

<img src="https://raw.githubusercontent.com/tomzion90/superstack/main/assets/media/03b_session.png" alt="A returning session — SuperStack's opening ritual with a focus menu" width="780">

<br><br>

<em>One disciplined loop, idea to live product:</em>

<img src="https://raw.githubusercontent.com/tomzion90/superstack/main/assets/media/05_promo.gif" alt="The SuperStack loop: idea → kickoff → scaffold → build → launch" width="780">

</div>

---

## 🗺️ How it works (the full process)

<div align="center">

<img src="https://raw.githubusercontent.com/tomzion90/superstack/main/assets/media/02_flow.png" alt="SuperStack process: idea, kickoff, scaffold, build, launch, repeat" width="820">

</div>

```
💡 idea ─▶ 🧭 KICKOFF ─▶ 🏗️ SCAFFOLD ─▶ 🔬 BUILD ─▶ 🌍 LAUNCH ─▶ 🔁 v2
```

**1. 🧭 Kickoff — it plans the product *with* you, in plain language (you make the calls):**
Discovery (problem & audience) → Market (price & first users) → Tech & Design (the simplest
fit, explained) → MVP (the smallest version worth shipping) → Schedule (a real plan to launch).
**Creates:** a clear plan you understand and approve.

**2. 🏗️ Scaffold — it makes the project real:**
Creates the project, sets up **Git** (version control) and **CI from day one** — an automatic
checker that runs your build, tests, formatting, and a **secret-scanner** on every change.
**Creates:** a real, version-controlled project with its own docs.

**3. 🔬 Build — an autonomous, disciplined loop, one feature at a time:**
For each feature: **plan → failing test first (TDD) → build → two-stage review → QA → verify
with real output.** Nothing is "done" without proof. Always-on guardians stop before secrets,
spending, or going live. **Creates:** tested, reviewed, working features.

**4. 🌍 Launch & beyond:**
A planned go-live (web or app store) with monitoring + backups — then **day-2**: real feedback
flows into the next version, through the same loop. **Creates:** a live product, and a v2 plan.

**5. 🔄 Every session** opens with your **top-3 next tasks** and closes by saving progress — so
multi-day work never loses its thread.

---

## 🏆 What you actually get (a senior team's standard — done for you)

Most "AI builds your app" tools just write code and stop. SuperStack sets up the **entire
professional foundation** that real software teams use — automatically, so you never have to
know it exists. In plain words, you get:

- 🤖 **Automatic checks on every change (CI)** — a robot runs your build, your tests, the
  formatting, and a **leaked-password scanner** every time anything changes. Broken or unsafe
  code literally can't get in.
- 🚀 **Safe automatic delivery (CD)** — every change auto-ships to a private *staging* copy to
  try first; going **live to real users only happens when you say go.**
- 🧪 **Real tests, written first** — every feature gets automatic proof it works. "Done" means
  *proven*, with output you can see — not "it probably works."
- 👀 **Code reviewed twice** — *does it do what you asked?* then *is it well-built?* — before
  anything counts as finished.
- 🔐 **Security built in** — secrets never saved into the code, logins/payments/data handled the
  safe way, and a dedicated security check before launch.
- 💾 **Backups + monitoring** — your real data is backed up (with a *tested* restore), and you
  get alerted the moment something breaks — set up **before** you go live.
- ↩️ **An undo button (rollback)** — a bad release can be reverted, and risky features can be
  switched off instantly.
- 🗂️ **Version history + clean docs** — every change is saved with its history, and the project
  documents itself, so any developer (or future you) could pick it up in an afternoon.

> [!IMPORTANT]
> **You don't just get code — you get a product built the way a senior engineering team would
> build it.** And you never had to learn any of it. 🙌

---

## 🔒 What's safe (straight talk)

- 💸 **Never spends your money** without asking — and sets a spending cap with you.
- 🔐 **Never stores or commits your secrets.**
- 🚦 **Never goes live** without your explicit OK.
- 🙈 Your code can live in a **private** repo only you can see.

More in the [User Guide → What it costs & what's safe](docs/USER-GUIDE.md#-what-it-costs---whats-safe).

---

## 🧪 Proof, not promises

SuperStack ships with an **eval harness** (`evals/`) that tests its own discipline against real
artifacts. The headline, **git-verified** result: with enforcement on, the build wrote a
**failing test before the code** — where an unenforced build wrote the code first and tested
after. See [`evals/SCOREBOARD-and-pass-rate.md`](evals/SCOREBOARD-and-pass-rate.md) for the
honest, full picture.

---

## ❓ Questions?

The **[📖 User Guide](docs/USER-GUIDE.md)** has it all — a friendly FAQ, troubleshooting, a
plain-English dictionary (MVP? stack? deploy? all explained), and "if something goes wrong, say
this." Found a bug or have an idea? [Open an issue](https://github.com/tomzion90/superstack/issues). 🙌

---

## 📄 License & credits

**MIT** — built by **YuTom**. Engineering disciplines adapted (with gratitude, MIT-licensed) from
**[Superpowers](https://github.com/obra/superpowers)** by Jesse Vincent / Prime Radiant and
**[GitHub Spec-Kit](https://github.com/github/spec-kit)**; skill-authoring follows Anthropic's
published guidance.

<div align="center">

**Built something with SuperStack? Give it a ⭐ — it helps other founders find it.**

⚡ *Idea in → real product out.*

</div>
