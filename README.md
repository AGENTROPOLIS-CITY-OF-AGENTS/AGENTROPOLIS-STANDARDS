# AGENTROPOLIS-STANDARDS

**Open standards for accountable autonomous agents.**

AGENTROPOLIS-STANDARDS is the canonical public standards authority for the AGENTROPOLIS ecosystem. It extracts proven protocols from working implementations and turns them into implementation-neutral specifications that independent systems can adopt.

## Canonical rule

> **PUBLIC REPOSITORY != STANDARD**  
> **PUBLIC REPOSITORY = STANDARDIZATION CANDIDATE**

A protocol becomes a standard only after its reusable primitive is isolated, specified, tested for conformance, implemented independently, and governed as a versioned public contract.

## Standards lifecycle

```text
Research
  -> Protocol
  -> APS Candidate
  -> APS Draft
  -> Reference Implementation
  -> Conformance + Test Vectors
  -> Independent Implementation
  -> APS Final
  -> External Standards Submission
```

## Maturity

- **C0 DISCOVERY** - public repository is in scope; reusable primitive not yet isolated.
- **C1 CANDIDATE** - reusable protocol behavior identified.
- **C2 DRAFTABLE** - data model and normative behavior are sufficiently clear to draft.
- **C3 STANDARDS READY** - specification, implementation, security and conformance material substantially exist.
- **C4 EXTERNAL CANDIDATE** - stable enough for an external standards process where appropriate.

## Initial domains

Identity • Delegation • Mandates • Capabilities • MCP • Execution Envelopes • Receipts • Audit • Payments • Provenance • Rights • UGC Distribution • Attribution • Evidence • Reputation • Runtime Handoff • Ontology • Conformance

## Repository structure

- `standards/APS-CHARTER.md` - governance and standards doctrine
- `standards/templates/` - normative specification templates
- `standards/conformance/` - conformance requirements
- `standards/candidates/` - extraction priorities
- `standards/registry/` - candidate registry
- `index.html` - GitHub Pages standards portal

## Licensing

- **Specifications and documentation:** CC BY 4.0
- **Code, schemas, SDKs, test vectors and reference implementations:** Apache License 2.0

See `NOTICE.md`.

## Status

Bootstrap phase. Candidate IDs are provisional and are **not** permanent APS numbers.
