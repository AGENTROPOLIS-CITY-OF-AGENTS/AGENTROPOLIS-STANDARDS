# AGENTROPOLIS Protocol Standards Charter

## Purpose
The AGENTROPOLIS Protocol Standards program converts proven system protocols into public, implementation-neutral specifications that can be implemented outside AGENTROPOLIS.

## Core distinction
A **protocol** describes how AGENTROPOLIS currently performs an operation.

A **standard** defines interoperable behavior independent of any single repository, vendor, chain, runtime, model or deployment.

## Non-negotiable rules
1. **Implementation before assertion.** A standard MUST be grounded in real protocol behavior or a working reference implementation.
2. **No standards theater.** Internal architecture diagrams, product names and marketing claims are not standards.
3. **Authority separation.** Identity, authentication, authorization, mandate, execution and evidence MUST remain distinguishable when the domain requires it.
4. **Evidence over claims.** Conformance MUST be testable.
5. **Chain neutrality by default.** Blockchain-specific requirements MUST be isolated to blockchain profiles or external ERC/EIP candidates.
6. **No silent privilege expansion.** Adapters, agents, models and providers MUST NOT infer authority beyond explicit grants.
7. **Portable semantics.** A standard SHOULD state what an independent implementer must do, not how AGENTROPOLIS happens to store it.
8. **Backward compatibility is explicit.** Breaking changes MUST receive a new version and migration notes.
9. **Security and privacy are normative concerns.** They are not optional appendices.
10. **Independent implementation is the graduation test.** APS Final requires evidence that another implementation can conform without private AGENTROPOLIS internals.

## Required APS sections
Every APS draft SHOULD contain:
- Title
- Status
- Authors / Editors
- Abstract
- Motivation
- Terminology
- Specification
- Data Model
- Interfaces
- State Machine, when applicable
- Normative Requirements
- Security Considerations
- Privacy Considerations
- Failure Modes
- Threat Model
- Reference Implementation
- Test Vectors
- Conformance Requirements
- Backward Compatibility
- Examples
- Rationale
- Versioning
- Governance
- External Standards Mapping

## Normative language
APS specifications SHOULD use RFC-style terms: **MUST, MUST NOT, REQUIRED, SHOULD, SHOULD NOT, MAY**.

## Candidate review
Each public repository is reviewed for reusable primitives, implementation-independent semantics, overlap with other AGENTROPOLIS implementations, schemas/contracts/receipts/test vectors, overlap with external standards, suitability as a core APS/profile/adapter/reference implementation, and independently verifiable conformance.

## External status
No proposal is described as an ERC, EIP, W3C Recommendation, IETF RFC or other external standard until the relevant external process actually grants that status.
