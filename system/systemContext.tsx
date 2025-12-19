import React, { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react';
import { SignalSet } from '../types';
import { INITIAL_SIGNALS } from './systemSignals';
import { computeConfidence } from '../scoringModel';

interface SystemContextType {
  signals: SignalSet;
  confidence: number;
  isReady: boolean;
  syncSystemState: (signals: SignalSet, answeredCount: number, intentValue?: string) => void;
  resetSystem: () => void;
}

const SystemContext = createContext<SystemContextType | undefined>(undefined);

const STORAGE_KEY = 'kaza_system_intelligence_v2';

export const SystemProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isReady, setIsReady] = useState(false);
  const [signals, setSignals] = useState<SignalSet>(INITIAL_SIGNALS);
  const [confidence, setConfidence] = useState<number>(0.35);

  // Initialize from storage with defensive checks
  useEffect(() => {
    try {
      const saved = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          setSignals(parsed.signals || INITIAL_SIGNALS);
          setConfidence(parsed.confidence || 0.35);
        }
      }
    } catch (e) {
      console.warn("System Context recovery inhibited:", e);
    }
    setIsReady(true);
  }, []);

  // Sync back to storage with defensive checks
  useEffect(() => {
    if (isReady) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ signals, confidence }));
      } catch (e) {
        // Silent fail for storage quotas/restrictions
      }
    }
  }, [signals, confidence, isReady]);

  const syncSystemState = useCallback((newSignals: SignalSet, answeredCount: number, intentValue?: string) => {
    setSignals(newSignals);
    const nextConfidence = computeConfidence(answeredCount, newSignals, intentValue);
    setConfidence(nextConfidence);
  }, []);

  const resetSystem = useCallback(() => {
    setSignals(INITIAL_SIGNALS);
    setConfidence(0.35);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
  }, []);

  const value = useMemo(() => ({
    signals,
    confidence,
    isReady,
    syncSystemState,
    resetSystem
  }), [signals, confidence, isReady, syncSystemState, resetSystem]);

  return (
    <SystemContext.Provider value={value}>
      {children}
    </SystemContext.Provider>
  );
};

export const useSystem = () => {
  const context = useContext(SystemContext);
  if (!context) {
    throw new Error('useSystem must be used within a SystemProvider');
  }
  return context;
};