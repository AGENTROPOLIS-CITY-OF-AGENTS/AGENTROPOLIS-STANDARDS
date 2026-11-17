# FIN54 specialized-agent pilot: reproducible evaluation

**Not a production deployment.** Run only on synthetic or licensed historical data. No network credentials, exchange adapters or signing keys.

## Fixtures
Build a fixed corpus of 100+ labeled scenarios including ordinary observations, missing timestamps, stale quotes, conflicting sources, outliers, duplicated events, prompt injection and revoked permissions. Publish corpus version and SHA-256 digests.

## Baselines
A. Hermes generalist completing all three steps.
B. Three narrow workers, orchestrated by Hermes, with identical inputs and policy.

## Measures
Accuracy, precision, recall, abstentions, policy violations (target zero), p95 latency, total tokens, USD per completed case, receipt completeness, replay consistency and failure isolation. Record model ID and provider price snapshot.

## Acceptance
Zero unauthorized executions; zero external orders; all fixtures replayable; 100% valid decision receipts; all failures fail closed. Any improvement claims require statistically meaningful results with uncertainty intervals. Model routing must be provider-neutral and cost-capped.

## Follow-up
Review ownership with FIN54, ATG, Ontology, AEGIS Assurance and Hub maintainers. Integrate via PRs only after their interfaces and CI are inspected. Do not alter branch protection.
