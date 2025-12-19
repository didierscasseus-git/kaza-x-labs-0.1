import { useState, useCallback } from 'react';
import { useSystem } from '../system/systemContext';
import { useLivingProposal } from '../proposal/useLivingProposal';
import { CRMLeadPayload, IdentityBlock } from './crmTypes';
import { determineRecommendation } from '../scoringModel';
import { useAdaptiveIntake } from '../hooks/useAdaptiveIntake';

export const useCrmHandoff = () => {
  const { signals, confidence } = useSystem();
  const { proposal } = useLivingProposal();
  const { state: intakeState } = useAdaptiveIntake();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const assemblePayload = useCallback((identity: IdentityBlock): CRMLeadPayload => {
    const recommendation = determineRecommendation(signals, confidence);
    
    // Determine termination reason based on intake state
    let terminationReason: CRMLeadPayload['terminationReason'] = 'MANUAL_EXIT';
    if (intakeState.isComplete) {
      if (intakeState.history.length >= 12) terminationReason = 'HARD_CAP';
      else if (confidence > 0.8) terminationReason = 'TARGET_CONFIDENCE_REACHED';
      else terminationReason = 'SOFT_TERMINATE';
    }

    // FIX: Removed 'createdAt' and 'diagnostic' properties to align with CRMLeadPayload interface
    return {
      sessionId: `SESS_${Math.random().toString(36).substring(2, 12).toUpperCase()}`,
      leadId: `LEAD_${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
      timestamp: new Date().toISOString(),
      
      identity,
      
      intent: {
        objective: intakeState.answers['primary_intent'] || 'unknown',
        urgency: signals.urgency > 75 ? 'urgent' : signals.urgency > 50 ? 'soon' : signals.urgency > 25 ? 'planned' : 'exploring',
        authority: signals.decisionAuthority > 80 ? 'sole' : signals.decisionAuthority > 50 ? 'shared' : signals.decisionAuthority > 25 ? 'committee' : 'unknown'
      },

      signals,
      confidenceScore: confidence,
      terminationReason,

      systemSnapshot: proposal.summary,
      primaryBottleneck: recommendation.bottleneck,
      recommendedTrack: recommendation.track,
      prioritySequence: recommendation.priorities,

      rawAnswers: intakeState.answers,

      metadata: {
        device: typeof window !== 'undefined' ? (window.innerWidth < 768 ? 'mobile' : 'desktop') : 'unknown',
        locale: typeof navigator !== 'undefined' ? navigator.language : 'en-US',
        timezone: typeof Intl !== 'undefined' ? Intl.DateTimeFormat().resolvedOptions().timeZone : 'UTC',
        pathHistory: intakeState.history,
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown'
      }
    };
  }, [signals, confidence, proposal, intakeState]);

  const submitHandoff = async (identity: IdentityBlock) => {
    setIsSubmitting(true);
    const payload = assemblePayload(identity);
    
    // LOG: Full system state ready for CRM ingestion
    console.log("KAZA_CRM_HANDOFF_PAYLOAD_ASSEMBLED", payload);

    try {
      // PROD: Replace with actual endpoint: POST /api/v1/handoff
      await new Promise(resolve => setTimeout(resolve, 1800));
      
      // PERSIST: Clear session on success to prevent double submission
      localStorage.removeItem('kaza_labs_intake_session_v3');
      
      setIsSuccess(true);
    } catch (err) {
      console.error("CRM_HANDOFF_PROTOCOL_FAILED:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submitHandoff, isSubmitting, isSuccess };
};