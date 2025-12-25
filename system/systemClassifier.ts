
import { MachineType } from './machineManifests';
import { SignalSet } from '../types';

/**
 * Kaza X Labs - System Classification Engine
 */

export type SystemClassId = MachineType;

export interface SystemClassDefinition {
  id: SystemClassId;
  name: string;
  machineName: string;
  description: string;
  bottleneck: string;
  prioritySequence: string[];
}

export const SYSTEM_CLASSES: Record<SystemClassId, SystemClassDefinition> = {
  BRAND_CHASSIS: {
    id: 'BRAND_CHASSIS',
    name: 'Brand-Strong / System-Weak Chassis',
    machineName: 'V01_IDENTITY_CORE',
    description: 'High visual fidelity masking structural operational gaps.',
    bottleneck: 'Perception-Delivery Divergence',
    prioritySequence: ['Back-end Synchronization', 'Workflow Mapping', 'Core Refactor']
  },
  WEB_TRANSMISSION: {
    id: 'WEB_TRANSMISSION',
    name: 'Fragmented Operator System',
    machineName: 'T02_TRANS_ENGINE',
    description: 'Manual coordination slowing high-potential output.',
    bottleneck: 'Manual Labor Dependency',
    prioritySequence: ['Workflow Codification', 'Logic Automation', 'System Unification']
  },
  AUTOMATION_ARM: {
    id: 'AUTOMATION_ARM',
    name: 'Overbuilt / Under-Coordinated Stack',
    machineName: 'A03_AUTOMATION_HUB',
    description: 'Complex toolset without a unified management layer.',
    bottleneck: 'Tool Sprawl Friction',
    prioritySequence: ['Centralized Governance', 'License Consolidation', 'Data Flow Sync']
  },
  PLATFORM_RACK: {
    id: 'PLATFORM_RACK',
    name: 'Enterprise Drag System',
    machineName: 'P04_PLATFORM_CORE',
    description: 'Legacy gravity preventing rapid structural agility.',
    bottleneck: 'Architectural Inertia',
    prioritySequence: ['Decoupling', 'Modularization', 'Process Pruning']
  },
  GROWTH_TURBO: {
    id: 'GROWTH_TURBO',
    name: 'Scaling Bottleneck Engine',
    machineName: 'G05_GROWTH_TURBO',
    description: 'Demand-heavy environment with constricted throughput.',
    bottleneck: 'Operational Constraint',
    prioritySequence: ['Horizontal Scaling', 'Latency Reduction', 'Edge Optimization']
  }
};

export const classifySystem = (signals: SignalSet, objective?: string): SystemClassId => {
  const { technicalDebt, growthCeiling, automationReadiness } = signals;

  if (objective === 'brand') return 'BRAND_CHASSIS';
  if (objective === 'automation' || automationReadiness < 40) return 'AUTOMATION_ARM';
  if (technicalDebt > 70) return 'PLATFORM_RACK';
  if (growthCeiling > 75) return 'GROWTH_TURBO';
  
  return 'WEB_TRANSMISSION';
};

export const updateSignal = (signals: SignalSet, key: keyof SignalSet, delta: number): SignalSet => {
  return {
    ...signals,
    [key]: Math.min(100, Math.max(0, signals[key] + delta))
  };
};
