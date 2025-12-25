import { useState, useCallback, useMemo } from 'react';
import { useSystem } from '../system/systemContext';
import { useCrmHandoff } from '../crm/useCrmHandoff';
import { SystemClass, SignalSet } from '../types';

export type ReviewStep = 'auth' | 'orientation' | 'context' | 'complexity' | 'ambition' | 'identity' | 'summary';

export interface SystemProfile {
  objective: string;
  stage: string;
  frictionPoints: string[];
  operatingStyle: string;
  changeTolerance: string;
  growthStressors: string[];
  decisionAuthority: string;
  timeline: string;
  name: string;
  company: string;
  email: string;
}

const INITIAL_PROFILE: SystemProfile = {
  objective: '',
  stage: '',
  frictionPoints: [],
  operatingStyle: '',
  changeTolerance: '',
  growthStressors: [],
  decisionAuthority: '',
  timeline: '',
  name: '',
  company: '',
  email: '',
};

export const useReviewRequest = () => {
  const [step, setStep] = useState<ReviewStep>('auth');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profile, setProfile] = useState<SystemProfile>(INITIAL_PROFILE);
  const { signals, confidence, syncSystemState } = useSystem();
  const { submitHandoff, isSubmitting } = useCrmHandoff();

  const applySignal = useCallback((updates: Partial<SystemProfile>) => {
    setProfile(prev => {
      const next = { ...prev, ...updates };
      
      // Update SystemContext signals for shared intelligence
      const nextSignals: SignalSet = { ...signals };
      
      if (updates.objective) {
        nextSignals.brandClarity = updates.objective === 'brand' ? 85 : 45;
        nextSignals.automationReadiness = updates.objective === 'automation' ? 80 : 50;
      }
      
      if (updates.frictionPoints) {
        nextSignals.technicalDebt = Math.min(100, updates.frictionPoints.length * 25);
        nextSignals.growthCeiling = updates.frictionPoints.includes('scaling') ? 80 : 50;
      }
      
      if (updates.growthStressors) {
        nextSignals.urgency = Math.min(100, updates.growthStressors.length * 20);
      }

      if (updates.stage) {
        nextSignals.businessMaturity = 
          updates.stage === 'enterprise' ? 90 : 
          updates.stage === 'scaling' ? 65 : 
          updates.stage === 'operating' ? 40 : 20;
      }

      if (updates.decisionAuthority) {
        nextSignals.decisionAuthority = updates.decisionAuthority === 'principal' ? 95 : 60;
      }
      
      syncSystemState(nextSignals, Object.keys(next).filter(k => !!(next as any)[k]).length);
      return next;
    });
  }, [signals, syncSystemState]);

  const systemClass = useMemo((): SystemClass => {
    const m = signals.businessMaturity;
    const f = signals.technicalDebt;
    const g = signals.growthCeiling;
    const a = signals.brandClarity;
    const c = signals.automationReadiness;

    // DETERMINISTIC CLASSIFICATION LOGIC
    if (m > 80 && f > 60) return 'Enterprise Drag System';
    if (g > 70 && f > 60) return 'Scaling Bottleneck Engine';
    if (a > 75 && c < 40) return 'Brand-Strong / System-Weak Chassis';
    if (m > 60 && c > 60 && f > 50) return 'Overbuilt / Under-Coordinated Stack';
    if (g > 75 && m < 50) return 'Lean but Volatile Growth Machine';
    if (f > 60 && m < 45) return 'Fragmented Operator System';
    
    return 'Indeterminate Configuration';
  }, [signals]);

  const nextCalibration = useCallback(() => {
    const sequence: ReviewStep[] = ['auth', 'orientation', 'context', 'complexity', 'ambition', 'identity', 'summary'];
    const currentIndex = sequence.indexOf(step);
    if (currentIndex < sequence.length - 1) {
      setStep(sequence[currentIndex + 1]);
    }
  }, [step]);

  const reconfigure = useCallback(() => {
    const sequence: ReviewStep[] = ['auth', 'orientation', 'context', 'complexity', 'ambition', 'identity', 'summary'];
    const currentIndex = sequence.indexOf(step);
    if (currentIndex > 0) {
      setStep(sequence[currentIndex - 1]);
    }
  }, [step]);

  const authenticate = useCallback((email: string) => {
    setIsAuthenticated(true);
    applySignal({ email });
    setStep('orientation');
  }, [applySignal]);

  const saveModel = useCallback(async () => {
    await submitHandoff({
      name: profile.name,
      email: profile.email,
      company: profile.company,
      consent: {
        dataUsageAccepted: true,
        resumeAllowed: true
      }
    });
    setStep('summary');
  }, [profile, submitHandoff]);

  return {
    step,
    profile,
    systemClass,
    isAuthenticated,
    isSubmitting,
    applySignal,
    nextCalibration,
    reconfigure,
    authenticate,
    saveModel,
    reset: () => {
      setStep('auth');
      setProfile(INITIAL_PROFILE);
      setIsAuthenticated(false);
    }
  };
};