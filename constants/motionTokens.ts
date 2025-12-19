/**
 * Kaza X Labs - Motion Token System
 * Rigid technical definitions for spatial and physical behavior.
 * Designed for clinical, deliberate, and high-precision interaction.
 */

export const SPRING_TOKENS = {
  STIFF: { stiffness: 300, damping: 30, mass: 1 },
  FLUID: { stiffness: 120, damping: 40, mass: 1.2 },
  ETHER: { stiffness: 40, damping: 90, mass: 2 },
  REDUCED: { stiffness: 200, damping: 100 },
};

export const DURATION_TOKENS = {
  INSTANT: 0.1,
  FAST: 0.2,
  BASE: 0.4,
  SLOW: 0.8,
  CONVERGENCE: 1.2, // For complex assembly animations
};

export const EASING_TOKENS = {
  PRECISION: [0.16, 1, 0.3, 1] as [number, number, number, number],
  LINEAR: [0, 0, 1, 1] as [number, number, number, number],
  IN_OUT: [0.42, 0, 0.58, 1] as [number, number, number, number],
};

export const SPATIAL_TOKENS = {
  DEPTH_SCALE: 0.15, // Max scale delta between background and foreground
  DEPTH_OPACITY: 0.6, // Base opacity for deep nodes
  PARALLAX_AMPLITUDE: 120, // Max pixel shift for parallax
  DRIFT_BASE: 0.0005, // Speed of continuous drift
  CURSOR_STRENGTH: 40, // Pixel influence of mouse position
  PULSE_FREQUENCY: 1.5, // Base seconds for pulse cycle
};

export const INTERACTION_TOKENS = {
  HOVER_SCALE: 1.05,
  ACTIVE_SCALE: 0.98,
  TRANSITION_PRECISION: EASING_TOKENS.PRECISION,
};

/**
 * Standard transition configurations for consistent behavior
 */
export const TRANSITION_PRESETS = {
  FADE: {
    duration: DURATION_TOKENS.BASE,
    ease: EASING_TOKENS.PRECISION,
  },
  SLIDE: {
    duration: DURATION_TOKENS.BASE,
    ease: EASING_TOKENS.PRECISION,
  },
  CONVERGE: {
    duration: DURATION_TOKENS.CONVERGENCE,
    ease: EASING_TOKENS.PRECISION,
  },
};

export type MotionTier = keyof typeof SPRING_TOKENS;
