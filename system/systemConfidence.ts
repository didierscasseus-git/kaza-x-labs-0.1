/**
 * Diagnostic Confidence Thresholds
 * Used by the branching engine to determine depth and termination paths.
 */
export const CONFIDENCE_THRESHOLDS = {
  CONTINUE: 0.4,
  DEEPEN: 0.6,
  PREPARE_TERMINATION: 0.8,
  EARLY_TERMINATION: 0.9,
};

/**
 * Calculates a consolidated confidence score based on progress, signal strength, and intent clarity.
 * 
 * Weights:
 * - Progress (Answers): 35%
 * - Signal Variance: 30%
 * - Intent Clarity: 35%
 */
export const computeConfidenceScore = (
  answeredCount: number,
  signalVariance: number,
  intentClarity: number // Range 0 to 1
): number => {
  const progressWeight = (Math.min(answeredCount, 12) / 12) * 0.35;
  const varianceWeight = signalVariance * 0.30;
  const intentWeight = intentClarity * 0.35;
  
  return Math.min(1, Math.max(0, progressWeight + varianceWeight + intentWeight));
};
