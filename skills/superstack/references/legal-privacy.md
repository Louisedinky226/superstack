# Legal & privacy — protecting a non-technical founder from harm

This is the compliance layer. A non-technical founder usually doesn't know which
laws apply to their product until they've already broken one — and the penalties
for mishandling personal data can be large fines, lawsuits, app-store removal, or
worse. This file's job is to raise those issues early, in plain words, and turn
them into concrete steps and draft documents before launch.

> **Read this first.** The drafts and checklists here are **starting points, NOT
> legal advice.** They get you to a sensible, defensible baseline — but **have a
> qualified lawyer review everything before launch if you handle health data,
> financial data, children's data, or data from people in the EU or California.**
> Those areas carry the heaviest rules and the harshest penalties. When in doubt,
> get the review.

> **Legal specifics are starting points, not current law.** Every specific number
> and duty in this file — the 72-hour breach clock, the COPPA/GDPR age lines, what
> a privacy policy must contain, when CCPA applies — can change and varies by
> jurisdiction. Treat none of them as settled. Where a legal specific drives a
> decision, flag it: **"needs current verification against the official regulator
> source and a qualified lawyer."** The generated `privacy-policy.md` and
> `terms-of-service.md` drafts inherit this same caveat.

Every question below is a **clickable menu** — recommended/safe option first,
always with an "Other / something else" escape. We ask these early, because each
answer changes what you legally must do.

---

## Contents

- Trigger questions — asked early, because each one creates obligations
- Privacy policy & Terms of Service — the two public documents you need
- GDPR / CCPA data-subject rights — what users can demand, and you must honor
- Privacy by design & default + a simple data inventory (GDPR Art. 30-lite)
- COPPA / children — if kids are possible, the rules get much stricter
- Cookie / tracking consent (EU) — ask before you track
- PCI / payments — never touch raw card numbers
- Incident response — the one-page plan for when something goes wrong
- Responsible vulnerability disclosure + security.txt (RFC 9116)
- Account security — lock the front doors before someone walks in
- Recovery & continuity — 2FA without recovery is a lockout trap

---

## Trigger questions — asked early, because each one creates obligations

These are asked near the start (discovery / market phases), before any data-
handling code is written. They're plain yes/no menus, but each "yes" switches on
a set of legal duties.

**1. Do you collect any personal data (email, name, location, analytics,
payments)?**
- **Yes — at least email or login (most products)** → you need a privacy policy
  and a deletion path; everything below applies.
- **No — fully anonymous, nothing stored about a person** → obligations are
  light, but confirm analytics isn't quietly collecting data.
- **Not sure** → we'll walk through what counts as personal data.
- **Other / something else.**

**2. Could any of your users be under 13 (US COPPA) / under 16 (EU)?**
- **No — adults only, and we'll say so (Recommended default)** → simplest path.
- **Possibly / yes — the product could appeal to kids** → strict children's-
  privacy rules switch on; see the COPPA section.
- **Not sure** → we treat it as "possibly" until proven otherwise (the safe
  assumption).
- **Other / something else.**

**3. Will you have EU or California users?**
- **Assume yes unless you actively block them (Recommended)** → GDPR (EU) and
  CCPA/CPRA (California) apply; plan for data-subject rights and consent.
- **No — we geofence to one region without these laws** → fewer rules, but
  geofencing must be real, not wishful.
- **Not sure** → assume yes; it's the safe and usually-correct default for
  anything on the open internet.
- **Other / something else.**

**4. Will you use analytics or third-party tracking?**
- **Yes — analytics or ads SDKs** → you must disclose them and, for EU users, get
  consent *before* they load (see cookie/tracking consent).
- **No — no analytics, no third-party trackers** → simpler privacy policy, no
  consent banner needed.
- **Privacy-friendly analytics only (e.g. cookieless)** → lighter consent burden;
  still disclosed.
- **Other / something else.**

**5. Will you handle payments?**
- **Yes — via a processor like Stripe (Recommended)** → the processor handles
  card data; you must still verify webhooks and never log card data (see PCI).
- **Yes — and I was going to store card numbers myself** → stop; this carries
  serious PCI obligations. We'll route you to a processor instead.
- **No payments.**
- **Other / something else.**

---

## Privacy policy & Terms of Service — the two public documents you need

A **privacy policy** is the public page that honestly explains what you do with
people's data. It's legally required almost everywhere the moment you collect
*any* personal data, and app stores won't list you without one. **Terms of
Service** is the rulebook for using your product — what's allowed, your
liability limits, how disputes work.

A compliant privacy policy must clearly list, in plain language:
- **What data** you collect (each type: email, name, location, device info,
  analytics, payment info).
- **Why** you collect each type (the purpose / lawful basis).
- **How long** you keep it (retention).
- **Who you share it with** (third parties: hosting, analytics, payment
  processor, email sender).
- **How users contact you** about their data (an email or form).
- **What rights users have** (access, export, deletion, correction) and how to
  use them.

These are generated as **draft files before launch** — `privacy-policy.md` and
`terms-of-service.md` — pre-filled from the trigger-question answers, then handed
to the user (and their lawyer, where the warning above applies) to review and
publish. They are drafts to start from, not final legal text.

---

## GDPR / CCPA data-subject rights — what users can demand, and you must honor

If GDPR (EU) or CCPA/CPRA (California) applies — and per trigger question 3 you
should usually assume it does — users have enforceable rights over their own
data. You must be able to actually fulfill these, not just promise them:

- **Access / export** — a user can ask for a copy of everything you hold about
  them, in a portable form. Build a way to export a user's data.
- **Deletion ("right to be forgotten")** — a user can ask you to delete their
  data, and you must **truly erase or fully anonymize it — not just flip an
  `active = false` flag.** Marking an account "inactive" while keeping all their
  data is a common and serious mistake; the data must really be gone or
  irreversibly anonymized. **An account-deletion path is mandatory** — users (and
  app stores) require a clear way to delete an account and its data.
- **Rectification** — a user can correct wrong data you hold about them.

Two more disciplines GDPR expects:
- **Lawful basis** — for each piece of data, you can state *why* you're allowed
  to have it (consent, contract, legitimate interest, legal obligation).
- **Retention periods** — for each data field, how long you keep it and when it's
  deleted. Don't keep personal data forever "just in case"; that's a liability.

Document the lawful basis and retention period **per data field** — a small table
in the privacy notes — so deletion and audits are straightforward later.

---

## Privacy by design & default + a simple data inventory (GDPR Art. 30-lite)

Adopt **privacy by design and by default** as a principle: collect the minimum
personal data you actually need, and default to the most private setting. Keep a
simple **data inventory / data map** — what personal data you collect, why, where
it's stored, how long, and which third parties / sub-processors touch it (a light
version of GDPR's "records of processing"). This keeps the privacy policy accurate
and makes an audit survivable. (Drafting help, not legal advice.)

---

## COPPA / children — if kids are possible, the rules get much stricter

If your product could be used by children (trigger question 2 = possibly/yes),
US **COPPA** and equivalent EU rules apply, and they are strict: you generally
need **verifiable parental consent** before collecting *any* data from a child,
plus tighter limits on what you collect, how you use it, and no behavioral ads.

The practical guardrail: **stop-and-warn before collecting any data from a
minor.** If the design implies children might sign up, the Security & Privacy
layer raises a plain-language flag to the founder ("this could be used by kids,
which triggers strict children's-privacy law — here's what that means") *before*
any data-collecting code ships. The safe default when age is unknown is to treat
it as "children possible" and get the legal review.

---

## Cookie / tracking consent (EU) — ask before you track

In the EU, you must get a user's **consent before loading non-essential
trackers** — analytics, ad pixels, anything that follows them. The order matters:
the trackers do **not** load until the user agrees. Essential cookies (the ones
that just make the site work, like keeping you logged in) don't need consent;
analytics and advertising do. If trigger question 4 said you use analytics or
ads and question 3 said EU users are possible, you need a real consent mechanism
that actually blocks trackers until consent — not a banner that tracks anyway.

---

## PCI / payments — never touch raw card numbers

Handling credit-card data directly drags you into **PCI DSS**, a heavy security
standard most small teams cannot meet. The whole point of a payment processor is
that you never have to. The rules:

- **Never store card numbers** (or CVV, or full magnetic-stripe data) on your
  servers — ever.
- **Use the processor's hosted fields or redirect** — with Stripe, Paddle,
  PayPal, etc., the card details go straight from the user's browser to the
  processor; they never pass through your server. You get back a token, not a
  card number.
- **Verify webhook signatures** — when the processor calls your server to say "a
  payment succeeded," confirm the message is genuinely from them (signature
  check), so an attacker can't fake a "paid" event.
- **Never log card data** — not in logs, error messages, analytics, or chat.

This is also a spine-level Security Guardian stop: if the user proposes storing
cards themselves, pause, explain the PCI risk in plain words, and route them to a
processor.

---

## Incident response — the one-page plan for when something goes wrong

A breach is not the time to improvise. Keep a **one-page plan** the founder can
follow under stress:

- **Who to contact** — the founder, any technical helper, the cloud/processor
  support lines, and (for serious breaches) a lawyer.
- **Rotate all secrets fast** — assume anything exposed is compromised;
  regenerate API keys, database passwords, and tokens immediately (this is the
  Security Guardian reflex from the spine, applied at scale).
- **The GDPR 72-hour clock** — if personal data of EU users is breached, GDPR
  generally requires notifying the relevant authority **within 72 hours** of
  becoming aware. The clock is short; know it exists *before* you need it.
- **How to take the service down** — the exact steps to put the product into
  maintenance mode or offline, to stop ongoing damage while you fix the cause.

Write this once, store it where the founder can find it fast, and keep the
contact details current.

---

## Responsible vulnerability disclosure + security.txt (RFC 9116)

Once you're live, publish a security contact so researchers can report holes
safely instead of exploiting them. Add a **`/.well-known/security.txt`** file
(RFC 9116) with a contact email and a link to your policy, plus a one-paragraph
"how we handle reports" disclosure policy. Cheap and standard — it turns a found
vulnerability into a heads-up instead of a breach.

---

## Account security — lock the front doors before someone walks in

Most "hacks" of small products are really just stolen logins to the accounts that
control everything. Close those doors:

- **Enable 2FA (two-factor authentication) everywhere that matters** — GitHub,
  your cloud/hosting account, Apple Developer, Google/Play, and your domain
  registrar. 2FA means a password alone isn't enough to get in; this single step
  prevents the most common account takeovers.
- **Turn on domain auto-renew** — if your domain registration lapses, someone can
  grab your domain and hijack your brand, email, and site. Auto-renew (plus a
  valid payment method on file) prevents an expensive, sometimes unrecoverable
  loss to a simple missed renewal.

These are cheap, take minutes, and protect the accounts that, if lost, can sink
the whole product.

---

## Recovery & continuity — 2FA without recovery is a lockout trap

We push 2FA hard because these accounts are critical. But that's exactly why being
locked out of one is also catastrophic — turning on 2FA without setting up recovery
just swaps "someone steals it" for "you lose it forever." For every account you
enable 2FA on (GitHub, cloud/hosting, Apple, Google/Play, domain registrar, payment
processor), set up recovery *at the same time*:

- **Recovery before you need it.** At 2FA setup, the service shows you **backup /
  recovery codes once.** Save them into a safe **offline** place right then, and
  register a **second factor** (a backup phone, a second security key, or printed
  codes) so losing one device doesn't lock you out permanently.
- **Use a password manager.** A non-technical solo founder is handed 6–8 accounts
  that, if lost, sink the product. Put them all in a password manager (Bitwarden,
  1Password, iCloud Keychain) behind a **strong master password with its own
  recovery.** Store the one-time GitHub token here too.
- **Keep an accounts & key-locations map — never the secrets themselves.** Keep one
  private inventory (in the password manager, **NEVER in the repo**): every account,
  which email/login owns each, where each account's 2FA recovery codes live, and
  **where each secret lives** (which `.env`, which host's secret page) — **by name
  only, never the value.** This map is the difference between "I lost my phone" being
  a 20-minute fix and a permanent loss, and it's the first thing a co-founder, a
  hired dev, or future-you will need.
- **Write a one-page bus-factor plan.** A solo founder is a single point of failure.
  On one page for the founder: which accounts control the product, where recovery
  codes live, and how a trusted person could recover access in an emergency. This is
  the insurance for "what if you lose access."
