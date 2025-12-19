export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
}

export interface WorkItem {
  id: string;
  title: string;
  category: string;
  image: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

// ACIE Core Types
export interface SignalSet {
  businessMaturity: number;
  brandClarity: number;
  technicalDebt: number;
  automationReadiness: number;
  growthCeiling: number;
  urgency: number;
  budgetElasticity: number;
  decisionAuthority: number;
}

export interface SignalDelta {
  signal: keyof SignalSet;
  value: number;
}

export type ConditionOp = '>' | '>=' | '<' | '<=' | '==' | '!=';

export interface Condition {
  left: keyof SignalSet | 'confidence' | 'answeredCount' | 'intent';
  op: ConditionOp;
  right: number | string;
}

export interface BranchRule {
  when: {
    all?: Condition[];
    any?: Condition[];
  };
  nextQuestionId: string;
}

export interface AnswerOption {
  value: string;
  label: string;
  signalDeltas: SignalDelta[];
  nextOverride?: string;
}

export interface QuestionNode {
  id: string;
  category: 'intent' | 'brand' | 'web' | 'automation' | 'build' | 'budget' | 'decision' | 'maturity';
  prompt: string;
  subPrompt?: string;
  answerType: 'single' | 'multi' | 'scale' | 'text';
  answers: AnswerOption[];
  branchingRules: BranchRule[];
  confidenceImpact: number;
}

export type OutcomeTrack = 'STRATEGY_SESSION' | 'DIAGNOSTIC_AUDIT' | 'GUIDED_STARTER' | 'RAPID_DEPLOYMENT';

export interface IntakeState {
  currentQuestionId: string;
  history: string[];
  answers: Record<string, any>;
  signals: SignalSet;
  confidenceScore: number;
  isComplete: boolean;
  phase: 'orientation' | 'loop' | 'summary';
}