# APS Conformance

An APS does not graduate because the document is persuasive. It graduates because independent implementations can be tested.

## Minimum conformance package
A C3 candidate SHOULD have:
- machine-readable schema or interface definition where applicable
- positive test vectors
- negative test vectors
- authorization-boundary tests
- malformed-input tests
- version-compatibility tests
- deterministic receipt or evidence checks where applicable
- reference implementation
- conformance runner or documented test procedure

## Graduation
- **C0 -> C1:** reusable protocol behavior identified
- **C1 -> C2:** draftable data model + normative behavior
- **C2 -> C3:** reference implementation + security analysis + conformance material
- **C3 -> C4:** stable implementation evidence + external mapping + independent implementation path

## Evidence rule
A green UI, successful request or passing unit test is not by itself standards conformance.

Conformance evidence MUST identify implementation, APS version, test suite version, timestamp, result, failing vectors if any, and cryptographic/content hashes where useful.
