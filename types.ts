export interface EngagementLayer {
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

export type SystemClass = 
  | 'Fragmented Operator System'
  | 'Scaling Bottleneck Engine'
  | 'Brand-Strong / System-Weak Chassis'
  | 'Overbuilt / Under-Coordinated Stack'
  | 'Lean but Volatile Growth Machine'
  | 'Enterprise Drag System'
  | 'Indeterminate Configuration';

/**
 * Kaza X Labs - Singular Engagement Model
 */
export type OutcomeTrack = 'REBUILD_PROTOCOL' | 'SYSTEM_REFACTOR' | 'IDENTITY_SYNC';

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

export interface Condition {
  left: string;
  op: '>' | '>=' | '<' | '<=' | '==' | '!=';
  right: any;
}

export interface BranchRule {
  when: {
    all?: Condition[];
    any?: Condition[];
  };
  nextQuestionId: string;
}

export interface AnswerOption {
  label: string;
  value: any;
  signalDeltas?: SignalDelta[];
}

export interface QuestionNode {
  id: string;
  category: string;
  prompt: string;
  subPrompt?: string;
  answerType: 'single' | 'multi';
  confidenceImpact: number;
  answers: AnswerOption[];
  branchingRules: BranchRule[];
}

export interface IntakeState {
  currentQuestionId: string;
  history: string[];
  answers: Record<string, any>;
  isComplete: boolean;
  phase: 'orientation' | 'loop' | 'summary';
  signals: SignalSet;
  confidenceScore: number;
}