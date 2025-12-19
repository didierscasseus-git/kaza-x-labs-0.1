import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { IntakeState, SignalSet, QuestionNode, Condition, BranchRule } from '../types';
import { QUESTION_GRAPH, INITIAL_QUESTION_ID } from '../constants/intakeRules';
import { computeConfidence, allCriticalSignalsCaptured } from '../scoringModel';
import { useSystem } from '../system/systemContext';

const STORAGE_KEY = 'kaza_labs_intake_session_v3';

const INITIAL_STATE: Omit<IntakeState, 'signals' | 'confidenceScore'> = {
  currentQuestionId: INITIAL_QUESTION_ID,
  history: [INITIAL_QUESTION_ID],
  answers: {},
  isComplete: false,
  phase: 'orientation'
};

export const useAdaptiveIntake = (onComplete?: (state: IntakeState) => void) => {
  const { signals: globalSignals, confidence: globalConfidence, syncSystemState, resetSystem: resetGlobal } = useSystem();
  const hasTriggeredComplete = useRef(false);

  const [localState, setLocalState] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed && typeof parsed === 'object' && parsed.currentQuestionId) {
            return parsed;
          }
        }
      } catch (e) {}
    }
    return INITIAL_STATE;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(localState));
  }, [localState]);

  const fullState = useMemo<IntakeState>(() => ({
    ...localState,
    signals: globalSignals,
    confidenceScore: globalConfidence
  }), [localState, globalSignals, globalConfidence]);

  useEffect(() => {
    if (fullState.isComplete && onComplete && !hasTriggeredComplete.current) {
      onComplete(fullState);
      hasTriggeredComplete.current = true;
    }
    if (!fullState.isComplete) {
      hasTriggeredComplete.current = false;
    }
  }, [fullState, onComplete]);

  const currentQuestion = useMemo(() => {
    return QUESTION_GRAPH.find(q => q.id === fullState.currentQuestionId) || QUESTION_GRAPH[0];
  }, [fullState.currentQuestionId]);

  const evaluateCondition = (
    cond: Condition, 
    answers: Record<string, any>, 
    signals: SignalSet, 
    confidence: number
  ): boolean => {
    let leftVal: any;
    if (cond.left === 'confidence') leftVal = confidence;
    else if (cond.left === 'answeredCount') leftVal = Object.keys(answers).length;
    else if (cond.left === 'intent') leftVal = answers['primary_intent'];
    else if (cond.left in signals) leftVal = (signals as any)[cond.left];
    else leftVal = answers[cond.left as string];

    const rightVal = cond.right;

    switch (cond.op) {
      case '>': return leftVal > rightVal;
      case '>=': return leftVal >= rightVal;
      case '<': return leftVal < rightVal;
      case '<=': return leftVal <= rightVal;
      case '==': return leftVal == rightVal;
      case '!=': return leftVal != rightVal;
      default: return false;
    }
  };

  const evaluateRules = (
    rules: BranchRule[], 
    answers: Record<string, any>, 
    signals: SignalSet, 
    confidence: number
  ): string | null => {
    for (const rule of rules) {
      const allMet = rule.when.all ? rule.when.all.every(c => evaluateCondition(c, answers, signals, confidence)) : true;
      const anyMet = rule.when.any ? rule.when.any.some(c => evaluateCondition(c, answers, signals, confidence)) : true;
      if (allMet && anyMet) return rule.nextQuestionId;
    }
    return null;
  };

  /**
   * Kaza Adaptive Termination Controller
   */
  const findNextQuestion = useCallback((
    prevHistory: string[],
    answers: Record<string, any>,
    signals: SignalSet,
    confidence: number,
    lastAnswerValue: any,
    currentQuestion: QuestionNode
  ): string | null => {
    const answeredCount = Object.keys(answers).length;
    const intent = answers['primary_intent'];

    // --- RULE 1: HARD CAP TERMINATION ---
    if (answeredCount >= 12) return null;

    // --- RULE 2: FORCE TERMINATE (HIGH CONFIDENCE) ---
    if (confidence > 0.80 && allCriticalSignalsCaptured(signals, intent)) {
      return null;
    }

    // --- RULE 3: SOFT TERMINATE (LOW URGENCY) ---
    if (confidence > 0.70 && signals.urgency < 30) {
      return null;
    }

    // --- THRESHOLD-BASED BRANCHING ---
    
    // TIER 1: CORE (Confidence < 0.45)
    if (confidence < 0.45) {
      if (!prevHistory.includes('business_stage')) return 'business_stage';
      if (!prevHistory.includes('urgency_timing')) return 'urgency_timing';
    }

    // TIER 2: DEPTH MODULES (Confidence 0.45 - 0.65)
    if (confidence >= 0.45 && confidence < 0.65) {
      // Intent-driven specialization
      if (intent === 'brand' && !prevHistory.includes('brand_depth_positioning')) return 'brand_depth_positioning';
      if (intent === 'automation' && !prevHistory.includes('automation_complexity')) return 'automation_complexity';
      if ((intent === 'build' || intent === 'web' || signals.technicalDebt > 60) && !prevHistory.includes('tech_debt_assessment')) return 'tech_debt_assessment';
      
      // High maturity adaptive depth
      if (signals.businessMaturity > 65 && !prevHistory.includes('revenue_bottleneck')) return 'revenue_bottleneck';
    }

    // TIER 3: PREPARE TERMINATION (Confidence 0.65 - 0.80)
    if (confidence >= 0.65) {
      if (!prevHistory.includes('budget_allocation')) return 'budget_allocation';
      if (!prevHistory.includes('decision_authority')) return 'decision_authority';
    }

    // FALLBACK: Ensure mandatory anchors are present before completing
    const mandatory = ['business_stage', 'urgency_timing', 'decision_authority'];
    for (const anchorId of mandatory) {
      if (!prevHistory.includes(anchorId)) return anchorId;
    }

    return null; 
  }, []);

  const submitAnswer = useCallback((answer: any) => {
    setLocalState(prev => {
      const node = QUESTION_GRAPH.find(q => q.id === prev.currentQuestionId);
      if (!node) return prev;

      const updatedSignals = { ...globalSignals };
      const selectedOption = node.answers.find(a => a.value === answer);
      if (selectedOption?.signalDeltas) {
        selectedOption.signalDeltas.forEach(d => {
          const key = d.signal as keyof SignalSet;
          updatedSignals[key] = Math.min(100, Math.max(0, updatedSignals[key] + d.value));
        });
      }

      const updatedAnswers = { ...prev.answers, [prev.currentQuestionId]: answer };
      const answeredCount = Object.keys(updatedAnswers).length;
      const intentValue = updatedAnswers['primary_intent'];
      const updatedConfidence = computeConfidence(answeredCount, updatedSignals, intentValue);

      const nextId = findNextQuestion(
        prev.history, 
        updatedAnswers, 
        updatedSignals, 
        updatedConfidence, 
        answer, 
        node
      );
      
      const isComplete = !nextId;
      syncSystemState(updatedSignals, answeredCount, intentValue);

      return {
        ...prev,
        answers: updatedAnswers,
        currentQuestionId: nextId || prev.currentQuestionId,
        history: nextId ? [...prev.history, nextId] : prev.history,
        isComplete,
        phase: isComplete ? 'summary' : prev.phase
      };
    });
  }, [findNextQuestion, globalSignals, syncSystemState]);

  const goBack = useCallback(() => {
    setLocalState(prev => {
      if (prev.history.length <= 1) return prev;
      const newHistory = [...prev.history];
      newHistory.pop();
      const lastId = newHistory[newHistory.length - 1];
      return {
        ...prev,
        history: newHistory,
        currentQuestionId: lastId,
        isComplete: false
      };
    });
  }, []);

  const reset = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setLocalState(INITIAL_STATE);
    resetGlobal();
    hasTriggeredComplete.current = false;
  }, [resetGlobal]);

  const setPhase = (phase: IntakeState['phase']) => setLocalState(prev => ({ ...prev, phase }));

  return { 
    state: fullState, 
    currentQuestion, 
    submitAnswer, 
    goBack, 
    reset, 
    setPhase,
    hasActiveSession: localState.history.length > 1 || localState.phase !== 'orientation'
  };
};