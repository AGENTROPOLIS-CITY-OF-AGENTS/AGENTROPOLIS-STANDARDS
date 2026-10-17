/**
 * Standards explainer motion scaffold.
 *
 * This is intentionally provider-neutral production code.
 * It defines frame choreography and consumes timing/data rather than
 * embedding project facts into animation logic.
 */

import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { TIMING } from "../direct/timing";

export const StandardsExplainerScene: React.FC = () => {
  const frame = useCurrentFrame();

  const intro = interpolate(
    frame,
    [TIMING.introStart, TIMING.introEnd],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const protocol = interpolate(
    frame,
    [TIMING.protocolStart, TIMING.protocolEnd],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const specification = interpolate(
    frame,
    [TIMING.specificationStart, TIMING.specificationEnd],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const conformance = interpolate(
    frame,
    [TIMING.conformanceStart, TIMING.conformanceEnd],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ background: "#000", color: "#f4f1ea" }}>
      {/* Replace with approved spatial plates / captured renders. */}
      <div data-phase="intro" style={{ opacity: intro }} />
      <div data-phase="protocol" style={{ opacity: protocol }} />
      <div data-phase="specification" style={{ opacity: specification }} />
      <div data-phase="conformance" style={{ opacity: conformance }} />
    </AbsoluteFill>
  );
};
