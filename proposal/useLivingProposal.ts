import { useMemo, useState, useEffect } from 'react';
import { useSystem } from '../system/systemContext';
import { LivingProposal, ProposalModule, TimelinePhase, PricingBand } from './proposalTypes';
import { determineRecommendation } from '../scoringModel';
import { refineNarrative, getRefinedSummaryPrompt } from './narrativeHelpers';

export const useLivingProposal = () => {
  const { signals, confidence } = useSystem();
  const recommendation = determineRecommendation(signals, confidence);
  const [refinedSummary, setRefinedSummary] = useState<string | null>(null);
  const [isRefining, setIsRefining] = useState(false);

  // Core Deterministic Proposal Structure
  const baseProposal = useMemo((): LivingProposal => {
    const modules: ProposalModule[] = [
      {
        id: 'brand-recovery',
        title: 'Brand Identity Realignment',
        description: 'Deep positioning pivot and visual system engineering to resolve market fragmentation.',
        reasoning: 'Signals indicate current brand clarity is below threshold for scaling.',
        included: signals.brandClarity < 50,
        impact: 'FOUNDATIONAL'
      },
      {
        id: 'web-infra',
        title: 'High-Performance Web Architecture',
        description: 'A headless, edge-first digital platform built for 10ms TTFB and infinite scale.',
        reasoning: 'Technical debt levels suggest current infrastructure will bottleneck growth.',
        included: signals.technicalDebt > 40 || signals.businessMaturity > 60,
        impact: 'HIGH'
      },
      {
        id: 'automation-orchestration',
        title: 'Business Logic Automation',
        description: 'Custom API-driven pipelines to eliminate manual ops friction in lead flow and retention.',
        reasoning: 'Automation readiness score confirms high ROI on workflow orchestration.',
        included: signals.automationReadiness < 70,
        impact: 'MEDIUM'
      },
      {
        id: 'growth-engine',
        title: 'Growth Acceleration Protocol',
        description: 'Performance optimization and conversion systems to breach the current growth ceiling.',
        reasoning: 'Identified growth ceiling requires strategic conversion-layer intervention.',
        included: signals.growthCeiling > 50,
        impact: 'HIGH'
      }
    ];

    const pricing: PricingBand = {
      min: signals.budgetElasticity < 20 ? 15000 : signals.budgetElasticity < 50 ? 30000 : 75000,
      max: signals.budgetElasticity < 20 ? 30000 : signals.budgetElasticity < 50 ? 75000 : 250000,
      currency: 'USD'
    };

    const isRapid = signals.urgency > 70;
    const timeline: TimelinePhase[] = [
      {
        title: 'Discovery & Audit',
        duration: isRapid ? '1 Week' : '3 Weeks',
        deliverables: ['System Map', 'Technical Blueprint', 'Risk Registry']
      },
      {
        title: 'Execution & Sprint Cycle',
        duration: isRapid ? '4 Weeks' : '8 Weeks',
        deliverables: ['Core Architecture', 'Visual Systems', 'Alpha Deployment']
      },
      {
        title: 'Optimization & Handover',
        duration: isRapid ? '1 Week' : '3 Weeks',
        deliverables: ['Performance Stress Test', 'Documentation', 'Scale Launch']
      }
    ];

    return {
      track: recommendation.track,
      title: recommendation.label,
      summary: recommendation.snapshot, // Using the snapshot for the proposal summary
      modules: modules.filter(m => m.included),
      timeline,
      pricing,
      assumptions: [
        'Decision authority remains with primary stakeholder.',
        'Existing technical debt is documented and accessible.',
        'Market conditions remain stable during execution.'
      ],
      risks: [
        signals.technicalDebt > 70 ? 'Legacy system fragility may delay integration.' : '',
        signals.brandClarity < 30 ? 'Positioning pivot requires significant internal alignment.' : '',
        isRapid ? 'Accelerated timeline increases resource intensity.' : ''
      ].filter(Boolean),
      nextActions: [
        'Approve Strategic Surface Map',
        'Execute Deposit & Retainer Protocol',
        'Initialize System Mapping Workshop'
      ],
      confidence: confidence
    };
  }, [signals, confidence, recommendation]);

  // AI-Assisted Narrative Enhancement
  useEffect(() => {
    let active = true;
    const triggerRefinement = async () => {
      setIsRefining(true);
      const prompt = getRefinedSummaryPrompt(signals, baseProposal.summary, baseProposal.track);
      const refined = await refineNarrative(prompt);
      if (active && refined) {
        setRefinedSummary(refined);
        setIsRefining(false);
      }
    };

    triggerRefinement();
    return () => { active = false; };
  }, [signals, baseProposal.summary, baseProposal.track]);

  const proposal = useMemo(() => ({
    ...baseProposal,
    summary: refinedSummary || baseProposal.summary
  }), [baseProposal, refinedSummary]);

  return { proposal, signals, isRefining };
};
