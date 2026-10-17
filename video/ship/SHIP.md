# Ship Gate

No final video is considered released until these steps pass.

## Render targets

Hero:
- 1920×1080 master
- 16:9
- 12–18 seconds
- silent-safe
- loop-safe
- poster still

Explainer:
- 1920×1080 master
- 16:9
- 45–60 seconds
- captions-safe composition
- mobile-readable text
- poster still

## Review

1. Render stills at major beats.
2. Compare stills against `reference/spec.md`.
3. Verify every factual overlay against `data/data.json`.
4. Verify timing against `direct/timing.ts`.
5. Verify no screen implies an external standards status that has not been granted.
6. Verify photogrammetry/3DGS claims against actual source evidence.
7. Verify reduced-motion poster.
8. Human approval.
9. Hash final files and record release receipt.

## Release paths

- `media/standards-hero.mp4`
- `media/standards-explainer.mp4`
- `media/standards-hero-poster.webp`
- `media/standards-explainer-poster.webp`

The website automatically detects the video files. Until they exist, it uses the lightweight cinematic fallback instead of pretending a render is available.
