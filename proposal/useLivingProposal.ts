import { useMemo } from 'react';
import { LivingProposal, ProposalModule, TimelinePhase, PricingBand } from './proposalTypes';
import { useSystem } from '../system/systemContext';

export const useLivingProposal = () => {
  const { signals } = useSystem();

  const proposal = useMemo((): LivingProposal => {
    // These are the integrated layers of the Brand & Systems Rebuild.
    const modules: ProposalModule[] = [
      {
        id: 'brand-layer',
        title: 'Brand Realignment',
        description: 'Strategic modernization of your visual identity and core brand narrative.',
        reasoning: 'Ensures your image reflects your current business authority.',
        included: true,
        impact: 'FOUNDATIONAL'
      },
      {
        id: 'tech-layer',
        title: 'Digital Foundation',
        description: 'Full-stack rebuild of your digital home to remove technical drag and debt.',
        reasoning: 'Provides a fast, dependable core for all future growth.',
        included: true,
        impact: 'HIGH'
      },
      {
        id: 'ops-layer',
        title: 'Operational Simplification',
        description: 'Automation of high-friction manual tasks to clear your team’s daily workload.',
        reasoning: 'Allows you to scale volume without increasing headcount.',
        included: true,
        impact: 'MEDIUM'
      }
    ];

    const pricing: PricingBand = {
      min: 45000,
      max: 125000,
      currency: 'USD'
    };

    const timeline: TimelinePhase[] = [
      {
        title: 'The Review',
        duration: '2 Weeks',
        deliverables: ['System Map', 'Technical Blueprint']
      },
      {
        title: 'The Rebuild',
        duration: '8 Weeks',
        deliverables: ['Identity Core', 'Digital Foundation']
      },
      {
        title: 'The Handover',
        duration: '2 Weeks',
        deliverables: ['Team Training', 'System Documentation']
      }
    ];

    return {
      track: 'REBUILD_PROTOCOL',
      title: 'The Brand & Systems Rebuild',
      summary: "A single, 12-week intervention designed to bridge the gap between how your business is seen and how it actually works. We remove the clutter and replace it with a singular, high-performance foundation.",
      modules,
      timeline,
      pricing,
      assumptions: [
        'Direct leadership access during the 12-week cycle.',
        'Technical access provided within the first 48 hours.',
        'Core business objectives remain stable throughout the engagement.'
      ],
      risks: [
        'Legacy data integrity may require an additional cleanup phase.',
        'Internal culture shifts during operational simplification.'
      ],
      nextActions: [
        'Approve the Rebuild Roadmap',
        'Initialize Phase 01: The Review'
      ],
      confidence: 1.0
    };
  }, []);

  return { proposal, signals, isRefining: false };
};