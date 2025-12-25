import { QuestionNode } from '../types';

export const QUESTION_GRAPH: QuestionNode[] = [
  {
    id: 'structural_symptom',
    category: 'maturity',
    prompt: "Which of these best describes the friction your business is currently feeling?",
    subPrompt: "Every business reaches a stage where its foundations can no longer support its potential. We need to identify where your system is diverging.",
    answerType: 'single',
    confidenceImpact: 0.15,
    answers: [
      { 
        label: 'Our image no longer reflects our true quality', 
        value: 'brand_disconnect', 
        signalDeltas: [{ signal: 'brandClarity', value: 15 }] 
      },
      { 
        label: 'Our tools feel slow and prevent us from moving fast', 
        value: 'technical_drag', 
        signalDeltas: [{ signal: 'technicalDebt', value: 15 }] 
      },
      { 
        label: 'Daily tasks are too manual and consume too much time', 
        value: 'operational_clutter', 
        signalDeltas: [{ signal: 'automationReadiness', value: 15 }] 
      },
      { 
        label: 'We are preparing for a major move and need a stable core', 
        value: 'growth_transition', 
        signalDeltas: [{ signal: 'businessMaturity', value: 10 }, { signal: 'urgency', value: 10 }] 
      }
    ],
    branchingRules: []
  },
  {
    id: 'business_stage',
    category: 'maturity',
    prompt: "How would you describe the current scale of your business?",
    subPrompt: "The depth of the rebuild depends on the complexity of your current team and market position.",
    answerType: 'single',
    confidenceImpact: 0.1,
    answers: [
      { label: 'We are just getting started', value: 'pre', signalDeltas: [{ signal: 'businessMaturity', value: -20 }] },
      { label: 'We are established and growing', value: 'operating', signalDeltas: [{ signal: 'businessMaturity', value: 10 }] },
      { label: 'We are scaling rapidly and need better systems', value: 'scaling', signalDeltas: [{ signal: 'businessMaturity', value: 25 }] },
      { label: 'We are an industry leader looking for efficiency', value: 'enterprise', signalDeltas: [{ signal: 'businessMaturity', value: 45 }] }
    ],
    branchingRules: []
  },
  {
    id: 'urgency_timing',
    category: 'maturity',
    prompt: "When do you need the new foundations in place?",
    subPrompt: "The 12-week rebuild cycle is fixed, but the start date determines our scheduling priority.",
    answerType: 'single',
    confidenceImpact: 0.05,
    answers: [
      { label: 'We need to move immediately', value: 'urgent', signalDeltas: [{ signal: 'urgency', value: 45 }] },
      { label: 'We are planning for the next quarter', value: 'strategic', signalDeltas: [{ signal: 'urgency', value: 15 }] },
      { label: 'We are reviewing options for later this year', value: 'planned', signalDeltas: [{ signal: 'urgency', value: -10 }] }
    ],
    branchingRules: []
  },
  {
    id: 'decision_authority',
    category: 'decision',
    prompt: "Who will lead the partnership on your side?",
    subPrompt: "This engagement requires direct access to those who set the company direction.",
    answerType: 'single',
    confidenceImpact: 0.1,
    answers: [
      { label: 'The Founder or CEO', value: 'principal', signalDeltas: [{ signal: 'decisionAuthority', value: 50 }] },
      { label: 'A Department Head or VP', value: 'exec', signalDeltas: [{ signal: 'decisionAuthority', value: 30 }] },
      { label: 'A Project Manager', value: 'lead', signalDeltas: [{ signal: 'decisionAuthority', value: 15 }] }
    ],
    branchingRules: []
  }
];

export const INITIAL_QUESTION_ID = 'structural_symptom';