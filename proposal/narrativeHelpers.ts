
import { SignalSet } from '../types';

/**
 * Kaza X Labs - Narrative Logic
 * Provides deterministic proof bullets and action plans without exposing numeric scores.
 */

export const getWhyThisPath = (signals: SignalSet): string[] => {
  const points: string[] = [];

  if (signals.urgency > 70) {
    points.push("Timeline alignment confirms immediate execution capacity for high-priority targets.");
  } else {
    points.push("Strategic window identified for structural hardening ahead of planned expansion.");
  }

  if (signals.technicalDebt > 60) {
    points.push("Direct resolution of technical bottlenecks required to restore operational velocity.");
  } else if (signals.automationReadiness < 40) {
    points.push("Codification of manual logic identified as the primary lever for throughput growth.");
  }

  if (signals.brandClarity < 40) {
    points.push("Identity-to-market sync confirmed as a critical path for high-tier trust acquisition.");
  } else {
    points.push("Engineering foundations mapped to existing operational volume for sustained stability.");
  }

  return points;
};

export const getImmediateWins = (): string[] => [
  "Constraint map finalized and shared with the leadership board.",
  "System surfaces ranked by immediate impact on conversion.",
  "First automation candidate selected for the initial build sprint.",
  "Structural tracking baseline created for zero-latency monitoring."
];

export const getRefinedSummaryPrompt = () => "";
export const getRefinedReasoningPrompt = () => "";
