import { SignalSet, OutcomeTrack } from './types';

/**
 * Kaza X Labs - Qualitative Diagnostic Logic
 */

export interface RecommendationResult {
  track: OutcomeTrack;
  label: string;
  snapshot: string;
  bottleneck: string;
  priorities: string[];
  trackDescription: string;
}

export const allCriticalSignalsCaptured = (signals: SignalSet, intent: string | undefined): boolean => {
  const hasMaturity = Math.abs(signals.businessMaturity - 50) > 5;
  const hasUrgency = Math.abs(signals.urgency - 50) > 5;
  const hasAuthority = Math.abs(signals.decisionAuthority - 50) > 5;
  
  let coreSignalCaptured = false;
  if (intent === 'brand') coreSignalCaptured = Math.abs(signals.brandClarity - 50) > 10;
  else if (intent === 'automation') coreSignalCaptured = Math.abs(signals.automationReadiness - 50) > 10;
  else coreSignalCaptured = Math.abs(signals.technicalDebt - 50) > 10;

  return hasMaturity && hasUrgency && hasAuthority && coreSignalCaptured;
};

export const computeConfidence = (
  answeredCount: number,
  signals: SignalSet,
  intentValue: string | undefined
): number => {
  const progressScore = (Math.min(answeredCount, 12) / 12);
  const coreSignals: (keyof SignalSet)[] = ['businessMaturity', 'brandClarity', 'technicalDebt', 'automationReadiness', 'urgency'];
  const totalDeviation = coreSignals.reduce((acc, key) => acc + Math.abs(signals[key] - 50), 0);
  const varianceScore = totalDeviation / (coreSignals.length * 50);
  let intentClarity = intentValue ? ((intentValue === 'audit' || intentValue === 'unsure') ? 0.5 : 1.0) : 0;
  
  return (progressScore * 0.35) + (varianceScore * 0.30) + (intentClarity * 0.35);
};

export const determineRecommendation = (
  signals: SignalSet, 
  confidence: number
): RecommendationResult => {
  const { technicalDebt, brandClarity, urgency, businessMaturity, growthCeiling } = signals;

  // 1. Generate Narrative Snapshot
  let snapshot = "The current system configuration demonstrates moderate stability but lacks the technical orchestration required for exponential scale. ";
  if (technicalDebt > 60) snapshot = "Your infrastructure is approaching a state of critical fragility, where legacy constraints are actively cannibalizing growth velocity. ";
  else if (brandClarity < 40) snapshot = "Market positioning remains fragmented, creating high cognitive load for acquisition channels and eroding brand equity. ";
  
  if (businessMaturity > 70) snapshot += "Existing operational scale provides a strong foundation for high-leverage technical intervention.";
  else snapshot += "Fundamental structural alignment is required before aggressive scaling protocols are initiated.";

  // 2. Identify Primary Bottleneck
  let bottleneck = "Structural Data Silos";
  if (technicalDebt > 65) bottleneck = "Legacy Infrastructure Fragility";
  else if (brandClarity < 40) bottleneck = "Positioning Fragmentation";
  else if (urgency > 80) bottleneck = "Market-Entry Latency";
  else if (growthCeiling > 60) bottleneck = "Operational Scaling Friction";

  // 3. Define Priority Sequence
  const priorities: string[] = [];
  if (technicalDebt > 50) priorities.push("Audit and refactor the technical core to eliminate operational leakage.");
  if (brandClarity < 60) priorities.push("Realign the brand narrative to match current market maturity.");
  if (businessMaturity > 50) priorities.push("Deploy custom automation pipelines to replace high-variance manual tasks.");
  else priorities.push("Stabilize foundational MVP architecture for rapid market validation.");

  // Limit priorities to 3
  const finalPriorities = priorities.slice(0, 3);

  // 4. Determine Track (Deterministic Mapping)
  if (technicalDebt > 70 || brandClarity < 30) {
    return {
      track: 'DIAGNOSTIC_AUDIT',
      label: 'Paid Diagnostic Audit',
      snapshot,
      bottleneck,
      priorities: finalPriorities,
      trackDescription: "A deep-dive technical and strategic forensic audit to identify and mitigate critical failure nodes."
    };
  }

  if (businessMaturity > 60 && confidence > 0.7) {
    return {
      track: 'STRATEGY_SESSION',
      label: 'Executive Strategy Session',
      snapshot,
      bottleneck,
      priorities: finalPriorities,
      trackDescription: "High-level architectural consultation for mature operations ready for systemic optimization."
    };
  }

  return {
    track: 'GUIDED_STARTER',
    label: 'Guided Starter Path',
    snapshot,
    bottleneck,
    priorities: finalPriorities,
    trackDescription: "A structured implementation roadmap designed for rapid alignment and foundational scaling."
  };
};
