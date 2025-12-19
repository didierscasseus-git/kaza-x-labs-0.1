import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCrmHandoff } from './useCrmHandoff';

interface CrmHandoffViewProps {
  onClose: () => void;
}

const CrmHandoffView: React.FC<CrmHandoffViewProps> = ({ onClose }) => {
  const { submitHandoff, isSubmitting, isSuccess } = useCrmHandoff();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    submitHandoff({
      name,
      email,
      company,
      consent: {
        dataUsageAccepted: true,
        resumeAllowed: true
      }
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[130] bg-black/80 backdrop-blur-xl flex items-center justify-center p-6"
    >
      <div className="w-full max-w-xl bg-[#050505] border border-white/10 p-12 relative overflow-hidden">
        {/* Aesthetic Background Grid */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <div className="w-full h-full border border-white" style={{ backgroundSize: '20px 20px', backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)' }} />
        </div>

        <button 
          onClick={onClose}
          className="absolute top-8 right-8 text-white/20 hover:text-white transition-colors"
        >
          Close
        </button>

        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.div 
              key="form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div className="mb-12">
                <span className="text-[9px] font-mono uppercase tracking-[0.5em] text-white/30 mb-4 block">Handoff Protocol // Secure Transfer</span>
                <h3 className="text-3xl font-heading font-black text-white tracking-tighter uppercase mb-4">Lock your blueprint.</h3>
                <p className="text-neutral-500 text-sm font-light leading-relaxed">
                  Provide your identity coordinates to finalize the diagnostic sync. Your system roadmap will be encrypted and delivered to your inbox.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                <div className="space-y-6">
                  <div className="group">
                    <label className="text-[8px] font-mono text-white/20 uppercase tracking-widest block mb-2 transition-colors group-focus-within:text-white/60">Email_Address*</label>
                    <input 
                      required
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="NAME@ORGANIZATION.COM"
                      className="w-full bg-white/[0.03] border border-white/10 px-4 py-4 text-xs font-mono tracking-widest text-white focus:outline-none focus:border-white/40 transition-all uppercase"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="group">
                      <label className="text-[8px] font-mono text-white/20 uppercase tracking-widest block mb-2 transition-colors group-focus-within:text-white/60">Full_Name</label>
                      <input 
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="NAME"
                        className="w-full bg-white/[0.03] border border-white/10 px-4 py-4 text-xs font-mono tracking-widest text-white focus:outline-none focus:border-white/40 transition-all uppercase"
                      />
                    </div>
                    <div className="group">
                      <label className="text-[8px] font-mono text-white/20 uppercase tracking-widest block mb-2 transition-colors group-focus-within:text-white/60">Organization</label>
                      <input 
                        type="text" 
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="COMPANY_ID"
                        className="w-full bg-white/[0.03] border border-white/10 px-4 py-4 text-xs font-mono tracking-widest text-white focus:outline-none focus:border-white/40 transition-all uppercase"
                      />
                    </div>
                  </div>
                </div>

                <button 
                  disabled={isSubmitting || !email}
                  className="w-full py-6 bg-white text-black font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-neutral-200 transition-colors disabled:opacity-50 relative overflow-hidden"
                >
                  <span className="relative z-10">{isSubmitting ? 'Syncing System Signals...' : 'Execute Handoff'}</span>
                  {isSubmitting && (
                    <motion.div 
                      className="absolute bottom-0 left-0 h-1 bg-black/20"
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 2 }}
                    />
                  )}
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="w-16 h-16 border border-white/20 rounded-full flex items-center justify-center mx-auto mb-8">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-8 h-8 bg-white rounded-full"
                />
              </div>
              <h3 className="text-3xl font-heading font-black text-white tracking-tighter uppercase mb-4">Handoff Success.</h3>
              <p className="text-neutral-500 text-sm font-light leading-relaxed mb-12">
                Lead identity verified. Diagnostic payload successfully ingested by CRM core. Check your inbox for the encrypted blueprint.
              </p>
              <button 
                onClick={onClose}
                className="text-[10px] uppercase tracking-widest font-bold border-b border-white/20 pb-1 hover:border-white transition-all text-white/40"
              >
                Return to Laboratory
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default CrmHandoffView;
