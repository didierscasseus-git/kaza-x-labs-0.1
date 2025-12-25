
import { SignalSet } from '../types';

/**
 * Kaza X Labs - Signal Architecture
 * Standardized signal definitions for internal intelligence engine.
 */
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

export const normalizeSignal = (val: number): number => Math.min(100, Math.max(0, val));
