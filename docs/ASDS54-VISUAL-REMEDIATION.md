# ASDS-54 Standards District visual remediation

Status: review candidate. This is a functional geometry upgrade, **not** an assertion of cinematic-production fidelity.

## Source-derived issue
`app.js` previously used plain `BoxGeometry` bodies and roof boxes for every APS landmark. The supplied screenshot showed basic turquoise cuboids and an almost empty black scene.

## Changed
- Replaced prototype towers with layered metallic/glass facade bands, window mullions, podiums, entrances, rooftop machinery, central registry spire, and differentiated crown treatments.
- Added simple walkway and lighting detail to establish an urban corridor without changing the APS registry data or source links.
- Kept existing Three.js camera, orbit controls, raycast selection, focus, provenance links, fallback and label system.
- No API keys, camera capture, new dependencies or backend actions.

## Remaining before production approval
- Browser/mobile visual QA, viewport sizing and performance profile measurements.
- Replace procedural city materials with approved/verified high-fidelity assets where licensing allows.
- Add actual street-walk/drone navigation and enterable interiors through ASDS-54 once the runtime exists.
- Do not describe clickable landmark focus as fully enterable buildings.
- Record screenshots and validate source asset provenance; preserve reduced-motion and non-3D cards.

## Quality gate
`agentropolis-design-core/docs/ASDS-54-VISUAL-QUALITY-GATE.md` in current integration PR.
