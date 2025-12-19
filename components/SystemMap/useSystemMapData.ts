import { useSystem } from '../../system/systemContext';
import { SignalSet } from '../../types';

export interface SurfaceData {
  id: string;
  label: string;
  state: string;
  pressurePoints: string[];
  dependencies: string[];
  recommendedAction: string;
  depth: number;
  drift: number;
  pulse: number;
  stability: number;
}

export const useSystemMapData = () => {
  const { signals, confidence } = useSystem();

  const getSurfaceConfig = (id: string): SurfaceData => {
    const urgencyPulse = signals.urgency / 50; // 0.5 to 2.0
    const maturityStability = signals.businessMaturity / 100;

    switch (id) {
      case 'brand':
        return {
          id: 'brand',
          label: 'Brand System',
          state: signals.brandClarity > 70 ? 'Coherent' : signals.brandClarity > 40 ? 'Fragmented' : 'Obscured',
          pressurePoints: ['Market Positioning', 'Visual Narrative', 'Emotional Resonance'],
          dependencies: ['Customer Sentiment', 'Internal Vision'],
          recommendedAction: signals.brandClarity < 40 ? 'Immediate Positioning Audit' : 'Refine Visual Assets',
          depth: 0.1,
          drift: 15 * (1 - maturityStability),
          pulse: urgencyPulse,
          stability: maturityStability
        };
      case 'web':
        return {
          id: 'web',
          label: 'Web / Conversion',
          state: signals.technicalDebt < 30 ? 'High Performance' : 'Friction Detected',
          pressurePoints: ['Checkout Velocity', 'Lighthouse Metrics', 'UX Pathing'],
          dependencies: ['Brand System', 'Platform Core'],
          recommendedAction: signals.technicalDebt > 50 ? 'Performance Refactor' : 'Conversion Optimization',
          depth: 0.3,
          drift: 20 * (1 - maturityStability),
          pulse: urgencyPulse * 1.2,
          stability: maturityStability
        };
      case 'automation':
        return {
          id: 'automation',
          label: 'Automation',
          state: signals.automationReadiness > 60 ? 'Leveraged' : 'Manual Dependency',
          pressurePoints: ['CRM Sync', 'Lead Routing', 'Internal Reporting'],
          dependencies: ['Web Signals', 'Decision Authority'],
          recommendedAction: signals.automationReadiness < 40 ? 'Workflow Mapping' : 'API Expansion',
          depth: -0.2,
          drift: 10 * (1 - maturityStability),
          pulse: urgencyPulse * 0.8,
          stability: maturityStability
        };
      case 'platform':
        return {
          id: 'platform',
          label: 'Platform / Build',
          state: signals.technicalDebt > 60 ? 'Brittle' : 'Modernized',
          pressurePoints: ['Database Latency', 'API Security', 'Deployment Pipelines'],
          dependencies: ['Infrastructure', 'Automation'],
          recommendedAction: signals.technicalDebt > 60 ? 'Legacy Decoupling' : 'Scaling Infrastructure',
          depth: 0.5,
          drift: 25 * (1 - maturityStability),
          pulse: urgencyPulse,
          stability: maturityStability
        };
      case 'growth':
        return {
          id: 'growth',
          label: 'Growth Engine',
          state: signals.growthCeiling > 70 ? 'Capped' : 'Elastic',
          pressurePoints: ['CAC / LTV Ratio', 'Churn Velocity', 'Market Expansion'],
          dependencies: ['All Systems'],
          recommendedAction: signals.growthCeiling > 60 ? 'Strategic Pivoting' : 'Scale Operations',
          depth: -0.5,
          drift: 12 * (1 - maturityStability),
          pulse: urgencyPulse * 1.5,
          stability: maturityStability
        };
      default:
        throw new Error(`Unknown surface: ${id}`);
    }
  };

  return { getSurfaceConfig, confidence };
};