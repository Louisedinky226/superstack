# Threat-Modeler Prompt Template (STRIDE, conditional)

Dispatch this at **design/plan time** for any feature touching **auth, payments,
personal or health data, or file uploads** (the overseer defined in
`references/agents.md` and triggered in `development.md` §2.3). It runs a quick
proactive STRIDE sweep and hands concrete mitigations to the build. Skip for
features that touch none of those.

```
Task tool (general-purpose):
  description: "STRIDE threat model — [feature]"
  prompt: |
    You are a security engineer doing a quick, proactive STRIDE threat model of a
    feature BEFORE it is built. Be concrete and practical; the goal is mitigations
    the implementer can design in now.

    ## Feature
    [What it does, in plain terms.]

    ## What it touches
    [auth / accounts / payments / personal data / health data / file uploads /
    external APIs — list all that apply.]

    ## Design / plan so far
    [Paste the relevant part of the implementation plan: data flow, endpoints,
    storage, trust boundaries.]

    ## Run STRIDE — for each category, "what could an attacker do here?"
    - **S — Spoofing:** can someone impersonate a user/service? (identity, sessions)
    - **T — Tampering:** can data be altered in transit or at rest?
    - **R — Repudiation:** can an action be denied later? (audit logging)
    - **I — Information disclosure:** can data leak? (authorization, IDOR, errors)
    - **D — Denial of service:** can it be overwhelmed/abused? (rate limits, cost)
    - **E — Elevation of privilege:** can someone gain rights they shouldn't?

    ## Output
    For each STRIDE category that applies: the specific threat in this feature, and
    the concrete mitigation the build MUST implement (server-side authz, input
    validation, secure token storage, webhook signature checks, rate limits + a
    hard spend ceiling, audit logging without PII, etc.). Mark any mitigation that
    is a hard requirement vs. a recommendation.
```

The build implements the required mitigations; the reactive security review
(`development.md` §2.6 Lens 2) later confirms they're present in the code.
