
import { SignalSet } from '../types';
import { SystemClassId, SYSTEM_CLASSES } from '../system/systemClassifier';
import { getWhyThisPath, getImmediateWins } from '../proposal/narrativeHelpers';

export interface CrmPayload {
  sessionId: string;
  leadId: string;
  timestamp: string;
  identity: {
    name: string;
    email: string;
    company: string;
  };
  signals: SignalSet;
  systemClass: SystemClassId;
  systemSnapshot: string;
  primaryBottleneck: string;
  prioritySequence: string[];
  systemContractAccepted: boolean;
  whyThisPath: string[];
  immediateWins: string[];
  rawAnswers: Record<string, any>;
  metadata: {
    device: string;
    locale: string;
  };
}

export const buildCrmPayload = (
  identity: { name: string; email: string; company: string },
  signals: SignalSet,
  systemClassId: SystemClassId,
  answers: Record<string, any>
): CrmPayload => {
  const classDef = SYSTEM_CLASSES[systemClassId];
  return {
    sessionId: `SESS-${Math.random().toString(36).substring(7).toUpperCase()}`,
    leadId: `LEAD-${Math.random().toString(36).substring(7).toUpperCase()}`,
    timestamp: new Date().toISOString(),
    identity,
    signals,
    systemClass: systemClassId,
    systemSnapshot: classDef.description,
    primaryBottleneck: classDef.bottleneck,
    prioritySequence: classDef.prioritySequence,
    systemContractAccepted: true,
    whyThisPath: getWhyThisPath(signals),
    immediateWins: getImmediateWins(),
    rawAnswers: answers,
    metadata: {
      device: navigator.userAgent,
      locale: navigator.language,
    },
  };
};
