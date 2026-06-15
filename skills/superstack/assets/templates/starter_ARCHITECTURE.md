# Architecture — [PRODUCT NAME]

> What this file is, in plain words: a simple picture of the pieces of your
> product and how they talk to each other — who stores the data, who does the
> work, what outside services are involved. Created in Phase 5 by the
> Architecture Advisor and kept up to date as the product grows. You do not need
> to be technical to read it: follow the arrows.

## The big picture

[A simple diagram. Mermaid renders on GitHub; labeled boxes in plain text are
fine too. Show who talks to whom and what lives where: on the user's device
(client), on a server, or with a third-party service.]

```mermaid
graph LR
  User[User] --> App[ [Platform] App ]
  App --> Backend[ [Backend / BaaS] ]
  Backend --> DB[( [Database] )]
  App --> Ext[ [External API, if any] ]
```

## What each piece is

- **Client (the app the user touches):** [platform + framework, plain words]
- **Backend (the brain on the server, if any):** [what it does, or "none —
  everything lives on the device (local-first)"]
- **Database (where data is kept):** [what it stores, in plain terms]
- **Third-party services:** [auth, payments, LLM API, email — list with one-line
  purpose each]

## The core data, in plain terms

[The main "things" the app remembers and how they relate. Example: "A user has
many Fridge Items; a Recipe matches a set of Fridge Items." No database jargon
needed — just the nouns and their relationships.]

## Decisions we're locking in now (and how hard they are to change)

| Decision | Why | Reversibility |
|---|---|---|
| [e.g., Postgres database] | [reason] | [Easy / Medium / Hard to change later] |

> Hard-to-reverse choices are flagged to the owner before they're locked in.

## In-product agents / automation (if any)

[LLM features, scheduled jobs, scrapers, notification senders: what each does,
how often it runs, what it costs, and what happens if it fails. Skip if none.]
