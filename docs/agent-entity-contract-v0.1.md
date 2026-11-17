# AGENTROPOLIS AGENT-ENTITY Contract v0.1 (proposal)

Status: **draft / simulation-only**. Canonical standards owner: AGENTROPOLIS-STANDARDS. No authority is granted by this document.

## Design
A deployable AGENT-ENTITY is a versioned, independently evaluated, narrowly scoped business-process worker. Hermes/VERITY orchestrates; ENTITY54 identifies; ATG describes typed semantics; 54-T/AEGIS/APEX54 govern consequential actions. Tools and MCP servers are capabilities, not independent authorization.

## Mandatory manifest fields
- schema_version, agent_id, version, owner, domain, purpose
- inputs and outputs (JSON Schema references)
- dependencies, allowed_capabilities, denied_capabilities
- execution_mode, authority, evaluation, observability, rollback
- provenance, artifact_digest, signature_verification

## Enforcement invariants
1. Default deny. An absent permission means denied.
2. A signed manifest does not grant execution rights; effective authorization must be evaluated at invocation time.
3. No secrets in prompts, manifests, logs or receipts.
4. Every consequential operation follows Inspect -> Simulate -> Preview -> Approve -> Execute -> Verify -> Record.
5. Receipts must bind identity, artifact digest, policy version, input digest, decision and result.
6. Reject unknown schema versions and unverified dependencies.
7. Agents may not grant permissions to themselves or other agents.
8. Financial signals are evidence, never orders. Live trading requires independent policy gates and explicit authorization.
9. Timeouts, budgets, retry limits, idempotency and rollback are required for production admission.
10. A human-readable approval is not a substitute for a machine-enforced policy decision.

## FIN54 pilot (simulation only)
- market-observation: validate timestamped source observations and output MarketEvidence candidates.
- pattern-evaluation: score a declared pattern against historical/synthetic observations; output an evidence report, not an order.
- risk-review: evaluate exposure and risk constraints; output allow/deny recommendation, not execution authority.

Pipeline: Data -> FIN54 -> MarketEvidence -> Ontology/Thesis -> ATG -> compiled risk -> Execution Envelope -> AEGIS/Fiscal gates -> execution adapter -> receipt -> audit/drift.

## Evaluation protocol
Compare the three narrow workers with a general-purpose orchestrated baseline on the same fixed, replayable cases. Report task accuracy, false positives, policy violations, p50/p95 latency, input/output tokens, USD cost, abstention rate, provenance completeness and drift. No claimed cost or efficacy improvement without measured results. Use adversarial cases: stale evidence, malformed schema, conflicting sources, missing signatures, prompt injection, revoked capability and duplicate execution.

## Portability
Keep agent manifest separate from runtime bindings. Implement adapters for Hermes, MCP and other runtimes only after compatibility testing. Standard Agents 0.1.0 is an external candidate requiring license, schema and security verification; do not claim compatibility without tests.

## Promotion gates
Draft -> local schema tests -> deterministic simulation -> adversarial review -> security review -> approved staging -> production. Production blocked until signatures, runtime enforcement, receipts, rollback and operator approval are verified.
