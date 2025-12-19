import { OutcomeTrack } from '../types';

export interface ProposalModule {
  id: string;
  title: string;
  description: string;
  reasoning: string;
  included: boolean;
  impact: 'HIGH' | 'MEDIUM' | 'FOUNDATIONAL';
}

export interface TimelinePhase {
  title: string;
  duration: string;
  deliverables: string[];
}

export interface PricingBand {
  min: number;
  max: number;
  currency: string;
}

export interface LivingProposal {
  track: OutcomeTrack;
  title: string;
  summary: string;
  modules: ProposalModule[];
  timeline: TimelinePhase[];
  pricing: PricingBand;
  assumptions: string[];
  risks: string[];
  nextActions: string[];
  confidence: number;
}
