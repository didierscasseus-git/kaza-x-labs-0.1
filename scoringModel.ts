import { OutcomeTrack, SignalSet } from './types';

/**
 * Kaza X Labs - Deterministic Logic
 * We recommend the same foundational fix for every business at this stage.
 */
export const determineRecommendation = (signals: SignalSet, confidence: number) => {
  return {
    track: 'REBUILD_PROTOCOL' as OutcomeTrack,
    label: 'The Brand & Systems Rebuild',
    bottleneck: "Structural Friction",
    priorities: [
      "Brand Modernization",
      "Digital Core Refactor",
      "Workflow Simplification"
    ]
  };
};

export const computeConfidence = (answeredCount: number, signals: SignalSet, intentValue?: string) => {
  const progress = Math.min(answeredCount / 12, 1);
  return 0.35 + (progress * 0.65);
};

export const allCriticalSignalsCaptured = (signals: SignalSet, intent?: string) => true;