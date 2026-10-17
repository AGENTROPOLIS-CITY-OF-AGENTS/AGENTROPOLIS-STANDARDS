export const FPS = 30;

export const TIMING = {
  introStart: 0,
  introEnd: 60,

  protocolStart: 45,
  protocolEnd: 420,

  specificationStart: 390,
  specificationEnd: 930,

  conformanceStart: 900,
  conformanceEnd: 1500,

  endCardStart: 1470,
  endCardEnd: 1740,
} as const;

// Direction edits belong here when possible.
// Example: "title is a beat late" should change timing, not reroll the film.
