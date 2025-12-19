import { SignalSet, OutcomeTrack } from '../types';

/**
 * Kaza X Labs - CRM Handoff Contract
 * Version: 2.1.0
 * Architecture: Deterministic JSON Payload for Sales & Engineering Alignment
 */

export interface IdentityBlock {
  name?: string;
  email: string;
  company?: string;
  role?: string;
  consent: {
    dataUsageAccepted: boolean;
    resumeAllowed: boolean;
  };
}

export interface IntentBlock {
  objective: string;
  urgency: 'exploring' | 'planned' | 'soon' | 'urgent';
  authority: 'sole' | 'shared' | 'committee' | 'unknown';
}

export interface MetadataBlock {
  device: string;
  locale: string;
  timezone: string;
  pathHistory: string[];
  userAgent: string;
}

export interface CRMLeadPayload {
  // Session Identity
  sessionId: string;
  leadId: string;
  timestamp: string;

  // Identity & Intent
  identity: IdentityBlock;
  intent: IntentBlock;

  // Diagnostic Data (The "System Snapshot")
  signals: SignalSet;
  confidenceScore: number;
  terminationReason: 'HARD_CAP' | 'TARGET_CONFIDENCE_REACHED' | 'SOFT_TERMINATE' | 'MANUAL_EXIT';
  
  // Executive Summary
  systemSnapshot: string;
  primaryBottleneck: string;
  recommendedTrack: OutcomeTrack;
  prioritySequence: string[];

  // Raw Diagnostic Data
  rawAnswers: Record<string, any>;
  
  // Contextual Metadata
  metadata: MetadataBlock;
}

/**
 * EXAMPLE JSON PAYLOAD:
 * {
 *   "sessionId": "SESSION-772A-X9",
 *   "leadId": "LEAD_XJ92K81",
 *   "timestamp": "2025-05-20T14:48:00Z",
 *   "identity": { "email": "vp@enterprise.com", "company": "Global Systems", "consent": { "dataUsageAccepted": true } },
 *   "intent": { "objective": "build", "urgency": "urgent", "authority": "sole" },
 *   "signals": { "businessMaturity": 85, "technicalDebt": 70, ... },
 *   "confidenceScore": 0.88,
 *   "systemSnapshot": "Legacy constraints are cannibalizing velocity...",
 *   "primaryBottleneck": "Technical Debt Anchor",
 *   "recommendedTrack": "DIAGNOSTIC_AUDIT"
 * }
 */
