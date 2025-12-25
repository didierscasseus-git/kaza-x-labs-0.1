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
    
    let terminationReason: CRMLeadPayload['terminationReason'] = 'MANUAL_EXIT';
    if (intakeState.isComplete) {
      if (intakeState.history.length >= 12) terminationReason = 'HARD_CAP';
      else if (confidence > 0.8) terminationReason = 'TARGET_CONFIDENCE_REACHED';
      else terminationReason = 'SOFT_TERMINATE';
    }

    return {
      sessionId: `SESS_${Math.random().toString(36).substring(2, 12).toUpperCase()}`,
      leadId: `LEAD_${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
      timestamp: new Date().toISOString(),
      identity,
      intent: {
        objective: intakeState.answers['primary_intent'] || 'REBUILD_PROTOCOL',
        urgency: signals.urgency > 75 ? 'urgent' : 'soon',
        authority: signals.decisionAuthority > 50 ? 'sole' : 'shared'
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
        device: 'prototype_env',
        locale: 'en-US',
        timezone: 'UTC',
        pathHistory: intakeState.history,
        userAgent: 'Kaza_Prototype_Core'
      }
    };
  }, [signals, confidence, proposal, intakeState]);

  const submitHandoff = async (identity: IdentityBlock) => {
    setIsSubmitting(true);
    const payload = assemblePayload(identity);
    
    // Simulate data ingestion
    console.log("KAZA_CRM_SIMULATION_INGESTED", payload);

    try {
      // Simulate network wait
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear local session simulation
      localStorage.removeItem('kaza_labs_intake_session_v3');
      setIsSuccess(true);
    } catch (err) {
      console.error("SIMULATION_FAILURE", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submitHandoff, isSubmitting, isSuccess };
};
