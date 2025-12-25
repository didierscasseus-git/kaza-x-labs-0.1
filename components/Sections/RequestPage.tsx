import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Reveal from '../UI/Reveal';

const RequestPage: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    problem: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    // Deliberate delay for partner review simulation - reinforces that this is a manual, human process
    setTimeout(() => {
      setStatus('success');
    }, 4500);
  };

  return (
    <div className="pt-40 pb-60 px-6 min-h-screen bg-[#0a0a0a]">
      <div className="max-w-screen-xl mx-auto">
        <AnimatePresence mode="wait">
          {status !== 'success' ? (
            <motion.div 
              key="form-container"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-20"
            >
              <div className="lg:col-span-5">
                <Reveal>
                  <span className="text-[10px] font-mono uppercase tracking-[0.8em] text-neutral-600 mb-8 block font-bold italic">Correspondence</span>
                </Reveal>
                <Reveal delay={0.2}>
                  <h1 className="text-5xl md:text-7xl font-heading font-black text-white tracking-tighter leading-[0.9] mb-12 uppercase">
                    Initiate <br/>Partnership <br/>Review.
                  </h1>
                </Reveal>
                <Reveal delay={0.3}>
                  <p className="text-xl text-neutral-500 font-light leading-relaxed max-w-md">
                    Our partners manually evaluate every inquiry to identify structural alignment. Expect a clinical perspective on your core friction within 48 business hours.
                  </p>
                </Reveal>
                
                <div className="mt-20 space-y-10 border-t border-white/5 pt-12">
                   <div className="flex flex-col gap-2">
                      <span className="text-[9px] font-mono text-white/10 uppercase tracking-[0.4em]">Evaluation Cycle</span>
                      <span className="text-white text-[11px] uppercase tracking-[0.3em] font-bold">48 Hours</span>
                   </div>
                   <div className="flex flex-col gap-2">
                      <span className="text-[9px] font-mono text-white/10 uppercase tracking-[0.4em]">Confidentiality</span>
                      <span className="text-white text-[11px] uppercase tracking-[0.3em] font-bold italic">Privileged Business Communication</span>
                   </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <form onSubmit={handleSubmit} className="space-y-12 bg-white/[0.01] border border-white/5 p-10 md:p-20 relative overflow-hidden">
                  {status === 'submitting' && (
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-white/5 z-20">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 4.5, ease: "linear" }}
                        className="h-full bg-white"
                      />
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-4">
                      <label className="text-[9px] font-mono text-white/20 uppercase tracking-[0.5em] block">Full Name</label>
                      <input 
                        required
                        type="text"
                        placeholder="NAME"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-transparent border-b border-white/10 py-5 text-white text-lg font-light focus:outline-none focus:border-white transition-colors placeholder:text-white/5 uppercase tracking-widest"
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[9px] font-mono text-white/20 uppercase tracking-[0.5em] block">Company Name</label>
                      <input 
                        required
                        type="text"
                        placeholder="ORGANIZATION"
                        value={formData.company}
                        onChange={(e) => setFormData({...formData, company: e.target.value})}
                        className="w-full bg-transparent border-b border-white/10 py-5 text-white text-lg font-light focus:outline-none focus:border-white transition-colors placeholder:text-white/5 uppercase tracking-widest"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[9px] font-mono text-white/20 uppercase tracking-[0.5em] block">Strategic Email</label>
                    <input 
                      required
                      type="email" 
                      placeholder="NAME@ORGANIZATION.COM"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-transparent border-b border-white/10 py-5 text-white text-lg font-light focus:outline-none focus:border-white transition-colors placeholder:text-white/5 uppercase tracking-widest"
                    />
                  </div>

                  <div className="space-y-4">
                    <label className="text-[9px] font-mono text-white/20 uppercase tracking-[0.5em] block">Structural Friction</label>
                    <textarea 
                      required
                      rows={4}
                      placeholder="DESCRIBE THE CORE BOTTLENECKS CURRENTLY IMPACTING YOUR VELOCITY..."
                      value={formData.problem}
                      onChange={(e) => setFormData({...formData, problem: e.target.value})}
                      className="w-full bg-transparent border-b border-white/10 py-5 text-white text-lg font-light focus:outline-none focus:border-white transition-colors placeholder:text-white/5 uppercase resize-none tracking-widest leading-relaxed"
                    />
                  </div>

                  <button 
                    disabled={status === 'submitting'}
                    className="w-full py-10 bg-white text-black font-bold uppercase tracking-[0.5em] text-[10px] hover:bg-neutral-200 transition-all duration-500 flex items-center justify-center gap-6 relative overflow-hidden shadow-2xl active:scale-[0.99]"
                  >
                    <span className="relative z-10">
                      {status === 'submitting' ? 'Transmitting for Partner Review' : 'Submit for Review'}
                    </span>
                    {status === 'submitting' && (
                       <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-3 h-3 border-2 border-black border-t-transparent rounded-full relative z-10"
                       />
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="success-screen"
              initial={{ opacity: 0, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-3xl mx-auto text-center py-20"
            >
              <div className="w-24 h-24 border-2 border-white/20 rounded-full flex items-center justify-center mx-auto mb-20">
                 <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="w-10 h-10 bg-white rounded-full"
                 />
              </div>
              
              <span className="text-[10px] font-mono uppercase tracking-[1em] text-neutral-600 mb-10 block font-bold">Transmission Complete</span>
              
              <h2 className="text-5xl md:text-8xl font-heading font-black text-white tracking-tighter uppercase mb-16 leading-[0.9]">
                Review <br/>Locked.
              </h2>
              
              <p className="text-2xl text-neutral-500 font-light leading-relaxed mb-24 max-w-2xl mx-auto">
                Your data has been successfully transmitted to the partner board. We will review your structural needs and contact you via the provided email with our formal perspective.
              </p>
              
              <button 
                onClick={() => window.location.href = '/'}
                className="mt-40 text-[9px] uppercase tracking-[1em] font-bold border-b border-white/10 pb-3 hover:border-white transition-all duration-700 text-neutral-600 hover:text-white"
              >
                Return Home
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RequestPage;