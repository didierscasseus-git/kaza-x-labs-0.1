
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ReviewAuthGate } from './ReviewAuthGate';
import { ReviewForm } from './ReviewForm';
import { MachineViewer } from './MachineViewer';
import { classifySystem, SystemClassId, SYSTEM_CLASSES } from '../../system/systemClassifier';
import { INITIAL_SIGNALS } from '../../system/systemSignals';
import { buildCrmPayload } from '../../crm/crmPayloadBuilder';
import { SignalSet } from '../../types';

interface InitiateReviewOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const InitiateReviewOverlay: React.FC<InitiateReviewOverlayProps> = ({ isOpen, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [identity, setIdentity] = useState({ name: '', email: '', company: '' });
  const [step, setStep] = useState(0);
  const [signals, setSignals] = useState<SignalSet>(INITIAL_SIGNALS);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isComplete, setIsComplete] = useState(false);
  const [isTransmitting, setIsTransmitting] = useState(false);

  // Corrected classifySystem call
  const currentClassId = classifySystem(signals, answers['objective'] || '');
  const progress = Math.min(step / 6, 1);

  const handleAuth = (data: typeof identity) => {
    setIdentity(data);
    setIsAuthenticated(true);
  };

  const handleAnswer = (key: string, value: any, signalDeltas: Partial<SignalSet> = {}) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
    setSignals(prev => {
      const next = { ...prev };
      Object.entries(signalDeltas).forEach(([s, delta]) => {
        (next as any)[s] = Math.min(100, Math.max(0, (next as any)[s] + (delta as number)));
      });
      return next;
    });
    setStep(prev => prev + 1);
  };

  const finalize = async () => {
    setIsTransmitting(true);
    const payload = buildCrmPayload(identity, signals, currentClassId, answers);
    console.log("TRANSMITTING_PAYLOAD", payload);
    await new Promise(r => setTimeout(r, 2000));
    setIsTransmitting(false);
    setIsComplete(true);
  };

  if (!isOpen) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-[#050505] overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full p-8 md:p-12 flex justify-between items-start z-[110] pointer-events-none">
        <div className="flex flex-col gap-2 pointer-events-auto">
          <div className="text-[10px] font-mono uppercase tracking-[0.5em] text-white/40 flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            System Diagnostic Protocol // Kaza X Labs
          </div>
        </div>
        <button 
          onClick={onClose}
          className="w-12 h-12 border border-white/10 flex items-center justify-center hover:border-white transition-colors bg-white/5 pointer-events-auto"
        >
          <span className="text-xl">×</span>
        </button>
      </div>

      <div className="w-full h-full grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-5 h-full overflow-y-auto scrollbar-hide px-8 md:px-16 py-32 flex items-center">
          <div className="w-full max-w-xl">
            <AnimatePresence mode="wait">
              {!isAuthenticated ? (
                <ReviewAuthGate onAuth={handleAuth} />
              ) : isComplete ? (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-12"
                >
                  <h2 className="text-4xl md:text-7xl font-heading font-black text-white uppercase tracking-tighter leading-none">
                    Model <br/>Locked.
                  </h2>
                  <div className="p-8 border border-white/10 bg-white/[0.02] space-y-6">
                    <p className="text-lg text-neutral-400 font-light italic">
                      "System snapshot for {identity.company} finalized. Your structural roadmap has been transmitted to the partner board."
                    </p>
                    <div className="h-[1px] w-full bg-white/5" />
                    <button 
                      onClick={onClose}
                      className="w-full py-6 bg-white text-black font-bold uppercase tracking-widest text-[10px]"
                    >
                      Return to Command
                    </button>
                  </div>
                </motion.div>
              ) : (
                <ReviewForm 
                  step={step} 
                  onAnswer={handleAnswer} 
                  onFinalize={finalize} 
                  isTransmitting={isTransmitting}
                  currentClass={SYSTEM_CLASSES[currentClassId]}
                />
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="lg:col-span-7 relative h-full bg-[#030303] hidden lg:block border-l border-white/5">
          {isAuthenticated && (
            <>
              <MachineViewer classId={currentClassId} progress={progress} />
              <div className="absolute bottom-12 right-12 text-right space-y-4 pointer-events-none">
                <div className="text-[9px] font-mono text-white/20 uppercase tracking-[0.4em]">
                  Diagnostic_Artifact:
                </div>
                <div className="text-xl font-bold text-white uppercase tracking-wider">
                  {SYSTEM_CLASSES[currentClassId].machineName}
                </div>
              </div>
              <div className="absolute top-32 right-12 text-right space-y-1 pointer-events-none">
                <div className="text-[7px] font-mono text-white/10 uppercase tracking-widest">Assembly Integrity</div>
                <div className="w-32 h-[1px] bg-white/5 overflow-hidden">
                  <motion.div 
                    animate={{ width: `${progress * 100}%` }}
                    className="h-full bg-white/40"
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default InitiateReviewOverlay;
