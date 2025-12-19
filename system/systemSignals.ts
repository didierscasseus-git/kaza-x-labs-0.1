import { SignalSet, SignalDelta } from '../types';

export const INITIAL_SIGNALS: SignalSet = {
  businessMaturity: 50,
  brandClarity: 50,
  technicalDebt: 50,
  automationReadiness: 50,
  growthCeiling: 50,
  urgency: 50,
  budgetElasticity: 50,
  decisionAuthority: 50,
};

/**
 * Normalizes a signal value to the canonical 0-100 range.
 */
export const normalizeSignal = (val: number): number => Math.min(100, Math.max(0, val));

/**
 * Merges a set of signal deltas into a current signal state.
 */
export const mergeSignalDeltas = (current: SignalSet, deltas: SignalDelta[]): SignalSet => {
  const next = { ...current };
  deltas.forEach(d => {
    const key = d.signal as keyof SignalSet;
    if (key in next) {
      next[key] = normalizeSignal(next[key] + d.value);
    }
  });
  return next;
};

/**
 * Computes the aggregate variance from the baseline (50).
 * Used as a measure of "signal strength" or "informedness".
 */
export const computeSignalVariance = (signals: SignalSet): number => {
  const values = Object.values(signals);
  const totalDeviation = values.reduce((acc, val) => acc + Math.abs(val - 50), 0);
  const maxPossibleDeviation = values.length * 50; 
  return totalDeviation / maxPossibleDeviation;
};
