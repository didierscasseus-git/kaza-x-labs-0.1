
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Fixed: Imported classifySystem and updateSignal from systemClassifier.
// Fixed: Imported INITIAL_SIGNALS from systemSignals and SignalSet from types.
import { classifySystem, updateSignal } from '../system/systemClassifier';
import { INITIAL_SIGNALS } from '../system/systemSignals';
import { SignalSet } from '../types';
import { MachineViewer } from './MachineViewer';

interface Question {
  id: string;
  text: string;
  options: { label: string; impact: Partial<SignalSet> }[];
}

const QUESTIONS: Question[] = [
  {
    id: 'market',
    text: "Current market perception relative to internal delivery quality:",
    options: [
      // Fixed: Updated property names to match SignalSet (brandAlignment -> brandClarity)
      { label: "Significant disconnect (Market lag)", impact: { brandClarity: -30 } },
      // Fixed: Updated property names to match SignalSet (brandAlignment -> brandClarity, maturity -> businessMaturity)
      { label: "Aligned at scale", impact: { brandClarity: 10, businessMaturity: 10 } },
      { label: "Not sure / Indeterminate", impact: {} }
    ]
  },
  {
    id: 'ops',
    text: "Operational dependency on manual human coordination:",
    options: [
      { label: "Critical path depends on manual tasks", impact: { automationReadiness: -30, technicalDebt: 20 } },
      { label: "Systems handle primary logic", impact: { automationReadiness: 20 } },
      { label: "Not sure / Indeterminate", impact: {} }
    ]
  },
  {
    id: 'tech',
    text: "Status of core infrastructure technical debt:",
    options: [
      { label: "Brittle / Legacy bottlenecks", impact: { technicalDebt: 30 } },
      // Fixed: Updated property name to match SignalSet (maturity -> businessMaturity)
      { label: "Modernized / Coordinated", impact: { technicalDebt: -20, businessMaturity: 10 } },
      { label: "Not sure / Indeterminate", impact: {} }
    ]
  }
];

export const IntakeEngine: React.FC = () => {
  const [step, setStep] = useState(0);
  const [signals, setSignals] = useState<SignalSet>(INITIAL_SIGNALS);
  const [isComplete, setIsComplete] = useState(false);

  const currentQuestion = QUESTIONS[step];
  const machineType = classifySystem(signals);
  const machineProgress = Math.min(step * 2 + 1, 8);

  const handleAnswer = (impact: Partial<SignalSet>) => {
    let nextSignals = { ...signals };
    Object.entries(impact).forEach(([key, value]) => {
      // Fixed: Type cast key as keyof SignalSet to resolve assignment error
      if (value !== undefined) {
        nextSignals = updateSignal(nextSignals, key as keyof SignalSet, value as number);
      }
    });
    setSignals(nextSignals);

    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      setIsComplete(true);
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <div className="w-1/2 p-16 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {!isComplete ? (
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-12"
            >
              <div className="space-y-2">
                <p className="text-white/30 text-xs font-mono uppercase tracking-[0.3em]">Module {step + 1} / {QUESTIONS.length}</p>
                <h2 className="text-3xl font-bold leading-tight max-w-md">{currentQuestion.text}</h2>
              </div>
              <div className="flex flex-col gap-4">
                {currentQuestion.options.map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() => handleAnswer(opt.impact)}
                    className="w-full text-left p-6 border border-white/10 bg-white/[0.02] hover:bg-white/5 hover:border-white/40 transition-all text-sm font-mono uppercase tracking-widest"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8"
            >
              <h2 className="text-xs font-mono uppercase tracking-[0.4em] text-white/40">Diagnostic Finalized</h2>
              <div className="space-y-2">
                <h1 className="text-5xl font-bold uppercase tracking-tighter">System Locked.</h1>
                <p className="text-white/40 font-mono text-sm uppercase tracking-widest">Type: {machineType.replace('_', ' ')}</p>
              </div>
              <div className="pt-8 border-t border-white/5 space-y-4">
                <button className="px-12 py-5 bg-white text-black font-bold uppercase tracking-widest text-xs">
                  Download Engineering Spec
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="w-1/2 relative">
        <MachineViewer type={machineType} step={isComplete ? 8 : machineProgress} />
      </div>
    </div>
  );
};
