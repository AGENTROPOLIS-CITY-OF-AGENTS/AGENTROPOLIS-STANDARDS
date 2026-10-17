# Standards Video Production

The public Standards surface is video-first, but media is produced through a governed file pipeline rather than one large prompt.

## Six-job production chain

1. `reference/spec.md` — reference grammar, photogrammetry/spatial rules, pacing, camera and constraints.
2. `data/data.json` — verified facts used on screen.
3. `story/story.md` — one point, one hero idea, three beats.
4. `motion/Scene.tsx` — frame-level motion composition scaffold.
5. `direct/timing.ts` — timing constants that can be adjusted without rerolling the whole piece.
6. `ship/SHIP.md` — render, still review, approval and release requirements.

## Outputs

- `media/standards-hero.mp4` — 12–18 second silent/ambient landing loop.
- `media/standards-explainer.mp4` — 45–60 second explainer.
- poster stills for reduced motion and first paint.
- production receipt binding source files, render hash and approval state.

## Photogrammetry boundary

Classical photogrammetry requires multiple calibrated views of the same subject/environment.

For this Standards District, no multi-view capture source is currently committed. Therefore:

- the present page MUST NOT claim photogrammetric reconstruction;
- procedural browser 3D remains the interactive fallback;
- a future captured Standards District may use the canonical pipeline:
  `Capture → Calibrate → Reconstruct → Clean → Measure → Validate → Render → Archive`;
- 3DGS or photogrammetry media is intent-gated and must retain a poster/reduced-motion fallback.

## Authority

Video timing choreographs presentation only. It does not change standards maturity, governance state, authority or conformance results.
