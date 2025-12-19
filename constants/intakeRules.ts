
import { QuestionNode } from '../types';

/**
 * Kaza X Labs - Directed Decision Graph
 * 
 * Logic Architecture:
 * 1. Root Anchor: Intent & Identity
 * 2. Calibration Anchor: Business Maturity
 * 3. Specialized Diagnostic Modules: (Adaptive based on Intent/Signals)
 * 4. Constraint Anchor: Urgency & Resource Allocation
 * 5. Final Anchor: Decision Mandate
 */

export const QUESTION_GRAPH: QuestionNode[] = [
  // --- ROOT ANCHOR ---
  {
    id: 'primary_intent',
    category: 'intent',
    prompt: "Initialize system diagnostic: What is your primary objective?",
    subPrompt: "This selection calibrates the adaptive pathing engine and signal weighting.",
    answerType: 'single',
    confidenceImpact: 0.15,
    answers: [
      { label: 'Brand Evolution & Positioning', value: 'brand', signalDeltas: [{ signal: 'brandClarity', value: 10 }] },
      { label: 'High-Performance Web/eCom', value: 'web', signalDeltas: [{ signal: 'technicalDebt', value: 5 }] },
      { label: 'Full-Stack Platform Engineering', value: 'build', signalDeltas: [{ signal: 'technicalDebt', value: 15 }] },
      { label: 'Workflow & Business Automation', value: 'automation', signalDeltas: [{ signal: 'automationReadiness', value: 10 }] },
      { label: 'System Recovery / General Audit', value: 'audit', signalDeltas: [{ signal: 'technicalDebt', value: 10 }, { signal: 'brandClarity', value: -5 }] }
    ],
    branchingRules: [
      {
        when: { all: [{ left: 'intent', op: '==', right: 'automation' }] },
        nextQuestionId: 'automation_complexity'
      }
    ]
  },

  // --- CALIBRATION ANCHOR ---
  {
    id: 'business_stage',
    category: 'maturity',
    prompt: "Define operational maturity.",
    subPrompt: "System complexity must scale proportionally with business velocity.",
    answerType: 'single',
    confidenceImpact: 0.1,
    answers: [
      { label: 'Pre-Revenue / Founding Stage', value: 'pre', signalDeltas: [{ signal: 'businessMaturity', value: -20 }] },
      { label: 'Post-Seed / Operational', value: 'operating', signalDeltas: [{ signal: 'businessMaturity', value: 10 }] },
      { label: 'Series A+ / Rapid Scaling', value: 'scaling', signalDeltas: [{ signal: 'businessMaturity', value: 25 }, { signal: 'urgency', value: 10 }] },
      { label: 'Enterprise / Market Authority', value: 'enterprise', signalDeltas: [{ signal: 'businessMaturity', value: 45 }, { signal: 'automationReadiness', value: -10 }] }
    ],
    branchingRules: [
      {
        when: { all: [{ left: 'businessMaturity', op: '>', right: 65 }] },
        nextQuestionId: 'revenue_bottleneck'
      }
    ]
  },

  // --- ADAPTIVE MODULE: REVENUE BOTTLENECK (High Maturity Only) ---
  {
    id: 'revenue_bottleneck',
    category: 'maturity',
    prompt: "Identify the primary growth ceiling.",
    subPrompt: "At your scale, small friction points create massive revenue leakage.",
    answerType: 'single',
    confidenceImpact: 0.15,
    answers: [
      { label: 'Acquisition / CAC Inefficiency', value: 'cac', signalDeltas: [{ signal: 'growthCeiling', value: 20 }] },
      { label: 'LTV / Retention Friction', value: 'retention', signalDeltas: [{ signal: 'growthCeiling', value: 30 }] },
      { label: 'Operational Margin Erosion', value: 'margins', signalDeltas: [{ signal: 'automationReadiness', value: -20 }] },
      { label: 'Infrastructure Fragility', value: 'infra', signalDeltas: [{ signal: 'technicalDebt', value: 25 }] }
    ],
    branchingRules: []
  },

  // --- SPECIALIZED MODULE: AUTOMATION (Adaptive) ---
  {
    id: 'automation_complexity',
    category: 'automation',
    prompt: "Map the entropy: Where is manual friction highest?",
    subPrompt: "We analyze high-variance manual processes to locate high-ROI automation nodes.",
    answerType: 'single',
    confidenceImpact: 0.12,
    answers: [
      { label: 'Data Silos / CRM Syncing', value: 'crm', signalDeltas: [{ signal: 'automationReadiness', value: 5 }] },
      { label: 'Internal Ops / Fulfillment', value: 'fulfillment', signalDeltas: [{ signal: 'automationReadiness', value: 15 }] },
      { label: 'Customer Support Workflows', value: 'support', signalDeltas: [{ signal: 'automationReadiness', value: 20 }] },
      { label: 'Legacy Manual Reporting', value: 'reporting', signalDeltas: [{ signal: 'automationReadiness', value: 25 }, { signal: 'technicalDebt', value: 5 }] }
    ],
    branchingRules: []
  },

  // --- SPECIALIZED MODULE: BRAND (Adaptive) ---
  {
    id: 'brand_depth_positioning',
    category: 'brand',
    prompt: "Evaluate market resonance and clarity.",
    subPrompt: "Brand systems function as the trust-layer of your digital architecture.",
    answerType: 'single',
    confidenceImpact: 0.1,
    answers: [
      { label: 'Cohesive & Distinct', value: 'strong', signalDeltas: [{ signal: 'brandClarity', value: 30 }] },
      { label: 'Functional but Fragmented', value: 'fragmented', signalDeltas: [{ signal: 'brandClarity', value: 0 }] },
      { label: 'Legacy / Misaligned', value: 'legacy', signalDeltas: [{ signal: 'brandClarity', value: -20 }] },
      { label: 'Non-Existent / Early Stealth', value: 'none', signalDeltas: [{ signal: 'brandClarity', value: -40 }] }
    ],
    branchingRules: []
  },

  // --- SPECIALIZED MODULE: TECH DEBT (Adaptive) ---
  {
    id: 'tech_debt_assessment',
    category: 'build',
    prompt: "Assess the agility of the current technical core.",
    subPrompt: "Rigid systems cannot sustain rapid product evolution.",
    answerType: 'single',
    confidenceImpact: 0.12,
    answers: [
      { label: 'Modern / Headless / Cloud-Native', value: 'modern', signalDeltas: [{ signal: 'technicalDebt', value: -30 }] },
      { label: 'Monolithic / Legacy CMS', value: 'mono', signalDeltas: [{ signal: 'technicalDebt', value: 15 }] },
      { label: 'Brittle / No Documentation', value: 'brittle', signalDeltas: [{ signal: 'technicalDebt', value: 40 }] },
      { label: 'Starting from Zero (Greenfield)', value: 'zero', signalDeltas: [{ signal: 'technicalDebt', value: -10 }] }
    ],
    branchingRules: []
  },

  // --- URGENCY ANCHOR ---
  {
    id: 'urgency_timing',
    category: 'intent',
    prompt: "Define the required window for systemic impact.",
    subPrompt: "Timelines dictate engineering methodology: Speed vs. Theoretical Depth.",
    answerType: 'single',
    confidenceImpact: 0.05,
    answers: [
      { label: 'Immediate (Critical Intervention)', value: 'urgent', signalDeltas: [{ signal: 'urgency', value: 45 }] },
      { label: 'Strategic (Next Quarter)', value: 'strategic', signalDeltas: [{ signal: 'urgency', value: 15 }] },
      { label: 'Planned (Long-term Evolution)', value: 'planned', signalDeltas: [{ signal: 'urgency', value: -10 }] }
    ],
    branchingRules: []
  },

  // --- RESOURCE ANCHOR (Late Module) ---
  {
    id: 'budget_allocation',
    category: 'budget',
    prompt: "Calibrate capital allocation.",
    subPrompt: "System complexity is restricted by the available resource envelope.",
    answerType: 'single',
    confidenceImpact: 0.08,
    answers: [
      { label: '$15k — $30k (Foundational)', value: 'tier1', signalDeltas: [{ signal: 'budgetElasticity', value: -20 }] },
      { label: '$30k — $75k (Scale Ready)', value: 'tier2', signalDeltas: [{ signal: 'budgetElasticity', value: 10 }] },
      { label: '$75k — $150k (Deep Intervention)', value: 'tier3', signalDeltas: [{ signal: 'budgetElasticity', value: 25 }] },
      { label: '$150k+ (Enterprise Infrastructure)', value: 'tier4', signalDeltas: [{ signal: 'budgetElasticity', value: 50 }] }
    ],
    branchingRules: []
  },

  // --- FINAL ANCHOR ---
  {
    id: 'decision_authority',
    category: 'decision',
    prompt: "Identify the technical mandate holder.",
    subPrompt: "Direct access to decision authority is required for high-velocity engineering.",
    answerType: 'single',
    confidenceImpact: 0.1,
    answers: [
      { label: 'Founder / CEO / Principal', value: 'principal', signalDeltas: [{ signal: 'decisionAuthority', value: 50 }] },
      { label: 'CMO / CTO / VP Level', value: 'exec', signalDeltas: [{ signal: 'decisionAuthority', value: 30 }] },
      { label: 'Product Lead / Dept Manager', value: 'lead', signalDeltas: [{ signal: 'decisionAuthority', value: 15 }] },
      { label: 'Strategic Steering Committee', value: 'board', signalDeltas: [{ signal: 'decisionAuthority', value: 5 }] }
    ],
    branchingRules: []
  }
];

export const INITIAL_QUESTION_ID = 'primary_intent';
