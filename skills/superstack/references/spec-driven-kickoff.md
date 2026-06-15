# Spec-Driven Kickoff — the planning mindset, adapted for a non-technical founder

This file upgrades the *planning* side of the skill with the best ideas from
**spec-driven development** (GitHub Spec-Kit) — but translated into the skill's own
language: warm, plain, and protective of a non-technical founder's limited
decision budget. Read it at the start of a kickoff, alongside `kickoff-phases.md`.

**The adaptation rule (non-negotiable).** Spec-Kit was built for engineers. Every
mechanism below keeps its *protective value* but runs in plain language; the
founder never sees engineering bureaucracy (no requirement IDs, no "articles," no
coverage matrices). Claude holds the rigor; the founder sees a sentence, a
recommendation, and a choice. If an addition here would make the kickoff colder,
heavier, or more like an interrogation, it's being done wrong.

---

## Contents

- The Power Inversion — the founder owns the intent, Claude owns the code
- The triage — light path vs. full path (so simple projects stay simple)
- The Simplicity Gate — protect the founder from an over-built v1
- The Visual Companion — show, don't just tell
- The open-decisions ledger — a visible "still to decide" list
- How this wires into the existing phases

---

## The Power Inversion — the founder owns the intent, Claude owns the code

The single most freeing thing you can tell a non-technical founder, and you should
tell them early (Phase 1), in plain words:

> "Here's how this works: **your job is to be clear about what you want and why —
> the intent. My job is to turn that into working code.** You never have to read or
> write code. The thing we're really building together is a clear description of
> the product; the code is just how I express it. So when I ask you questions, I'm
> helping you sharpen the intent — that's the part only you can do."

Why this matters: a non-technical founder's biggest fear is that they're not
"technical enough" to do this. The power inversion removes that fear by naming
their real role. It also sets up everything downstream — the spec (the MVP, the
acceptance criteria, the success metrics) is *the* artifact they own and approve;
the code serves it. Keep returning to it when they feel out of their depth: *"You
don't need to know how — just tell me what good looks like, and I'll handle the
how."*

This is a framing principle, not a gate. It costs nothing and changes the whole
emotional register of the kickoff.

---

## The triage — light path vs. full path (so simple projects stay simple)

The planning gates in this skill (the Simplicity Gate below, the clarify pass, the
phase reviewers) are valuable exactly when a project is risky — and *overkill* when
it isn't. So before applying them, make a quick, **silent** judgment about how much
rigor this specific project needs, and scale accordingly. This is the same
decision-budget discipline the spine already follows ("spend the user's attention
where it counts; default the rest") — made explicit for planning.

**Assess (internally) on three axes:**
- **Ambiguity** — is it clear what's being built, or genuinely fuzzy?
- **Stakes / reversibility** — money, personal data, a public launch, a one-way
  data migration → high stakes; a personal tool or throwaway → low.
- **Surface area** — one screen and one use case → small; multiple subsystems → large.

**Then pick the path:**
- **Light path** (low on all three): keep planning fast and conversational. One
  pass of discovery and MVP scope, sensible defaults stated out loud, minimal
  gating. Don't manufacture ceremony a weekend project doesn't need.
- **Full path** (high on any): run the full kickoff with the Simplicity Gate, the
  clarify pass surfacing material unknowns, and the phase reviewers. The rigor is
  earned here.

State the choice in one plain line so the founder knows what to expect: *"This one
is straightforward, so I'll keep the planning light and fast."* or *"This touches
payments and real user data, so I'll be more thorough in the planning — it'll save
us pain later."* When in doubt, lean to the fuller path for anything touching
money, personal data, or an irreversible step — but never gate a simple idea to
death.

---

## The Simplicity Gate — protect the founder from an over-built v1

**The gap this closes.** A non-technical founder cannot tell a clean, simple build
from an over-engineered one — and over-engineering is the quiet, expensive
failure: more moving parts to pay for, more to break, more that a future developer
has to untangle. The skill already protects them on cost and lock-in (Phase 3) and
on scope (the MVP IN/OUT lists); the Simplicity Gate extends that same protection
to *technical complexity*. It runs at the architecture/tech decisions (Phase 3 and
5), on the full path (and lightly even on the light path).

**The internal check (Claude runs this; the founder doesn't see the checklist).**
Before locking the architecture and stack, confirm:
- **Fewest moving parts that meet the real need.** Every additional service,
  database, queue, or moving piece must earn its place against the *stated* MVP —
  not a hypothetical future.
- **Use the framework/platform directly.** Prefer the built-in, standard way over a
  custom abstraction or a clever wrapper.
- **No future-proofing.** Don't build for scale, features, or flexibility the
  founder hasn't asked for and the metrics don't yet justify (YAGNI). The skill's
  Phase 3 already right-sizes to expected scale — honor that here.
- **No speculative features** sneaking in under "we'll probably need it."

**The plain-language surface (what the founder actually hears).** Don't show a
table or a checklist. Make the simplicity visible in one warm sentence, and offer
the *why* on demand:

> "I've kept this deliberately simple — one database and no extra services — because
> that's all v0.1 needs, and it's cheaper and easier to maintain. Want me to walk
> through why, or any place you'd want more?"

**When complexity IS warranted, justify it in plain words — don't just add it.**
If the right design genuinely needs an extra moving part, name it the way the rest
of the skill names trade-offs: what it adds, what it costs, and why the simpler
option won't do — in a sentence a non-technical person can weigh. This is the
"justify complexity" discipline from Spec-Kit, kept as plain speech, never an
engineer's worksheet:

> "I'd normally avoid adding a separate background-job service, but your 'email me a
> weekly summary' feature genuinely needs one — the simpler alternatives would miss
> sends. It's a small managed add-on, ~$X/mo. Good with that, or should we drop
> weekly summaries from v0.1?"

That last move — offering to *cut the feature* instead of *adding the complexity* —
is the heart of the gate. The founder, not Claude, decides; but the simple path is
always the one Claude presents first.

**Tie-in:** this is the planning-time partner to the dev loop's YAGNI rule and the
constitution's simplicity principle. The cautionary-tale spirit of the spine (the
host who got burned by an unverified spend cap) applies here too: an over-built v1
is a slow version of the same harm.

---

## The Visual Companion — show, don't just tell

A non-technical founder understands a picture far faster than a paragraph. At the
moments where *seeing beats reading*, offer a quick visual they can react to before
anything is locked. This is opt-in and judgment-based — not every question is
visual.

**When to offer it:**
- **Design (Phase 4)** — a rough wireframe of a key screen, or the click-path of a
  user flow, before any UI is built.
- **Architecture (Phase 5)** — the simple "who talks to whom" box diagram (the
  readable C4 Context/Container levels the skill already uses), rendered as an
  actual picture rather than described.

**How to run it (stays inside the menu rule):**
- Offer once, as a choice, not a default: *"Want me to sketch this as a quick
  picture so you can see it, or is the description enough?"* — recommendation
  first, with an easy "just describe it" escape.
- Use whatever visual capability is available in the environment (an inline diagram
  /mockup renderer, or generated mockup images the founder approves). A labeled
  box-diagram or a greyscale wireframe is plenty — this is for *understanding*, not
  final art.
- Decide **per question** with one test: *would the founder understand this better
  by seeing it than by reading it?* A question about a business rule is not visual;
  a question about screen layout or system shape is.

**Why it's worth it:** approving a wireframe you can see catches "that's not what I
meant" before it becomes built UI — the cheapest possible moment to catch it. It's
also what makes the skill feel built *for* a non-technical person, not adapted to
them.

Keep it light. A visual that takes longer to make than it saves in understanding is
the wrong call — fall back to plain words.

---

## The open-decisions ledger — a visible "still to decide" list

The skill's clarify pass already surfaces material unknowns in a batched menu and
auto-resolves the rest with stated defaults — keep that; it's the warm way. This
adds one small thing on the full path: keep a short, **visible** list of the
genuinely-open decisions (in plain words, in the spec/`CLAUDE.md`), so a founder
who isn't ready to decide something can see it's *parked, not forgotten*, and come
back to it.

- Write each as a plain line: *"⏳ Still to decide: do guests check out without an
  account, or is sign-up required? (I've assumed guest checkout for now.)"*
- It is **not** a gate that blocks the conversation — the build's existing
  sign-off (the clarify pass + the design-guidelines + the MVP agreement) is what
  governs when building starts. The ledger is just memory the founder can see.
- Resolve items as the founder decides; clear the list before v0.1 is called done.

This gives the founder the *visibility* of Spec-Kit's "[NEEDS CLARIFICATION]"
markers without the interrogation — a record, not a roadblock.

---

## How this wires into the existing phases

- **Phase 1 (Discovery):** open with the **Power Inversion** framing; set the
  **triage** (light vs. full) once you understand the shape of the idea.
- **Phase 3 (Technology) & Phase 5 (Architecture):** apply the **Simplicity Gate**
  — fewest moving parts, justify any complexity in plain words, offer to cut a
  feature before adding a part.
- **Phase 4 (Design) & Phase 5 (Architecture sketch):** offer the **Visual
  Companion** where seeing beats reading.
- **Throughout the full path:** keep the **open-decisions ledger** visible.

None of this replaces a phase or adds a hard new gate; it deepens the planning
the skill already does, scaled by triage so a simple project stays simple. The
goal is unchanged — take a non-technical founder from idea to a real product —
with one more layer of protection (against over-building) and one more way to
make the plan *understandable* (seeing it), wrapped in the same warm voice.
