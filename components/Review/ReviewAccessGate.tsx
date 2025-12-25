import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Reveal from '../UI/Reveal';

interface ReviewAccessGateProps {
  onSuccess: (email: string) => void;
}

const ReviewAccessGate: React.FC<ReviewAccessGateProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'login' | 'create'>('create');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) onSuccess(email);
  };

  return (
    <div className="w-full max-w-xl mx-auto py-20">
      <Reveal>
        <span className="text-[10px] font-mono uppercase tracking-[0.6em] text-neutral-600 mb-8 block font-bold italic">
          [ Sequence 00: Authentication ]
        </span>
      </Reveal>
      
      <Reveal delay={0.2}>
        <h2 className="text-4xl md:text-6xl font-heading font-black text-white tracking-tighter leading-none mb-8 uppercase">
          Secure <br/>Workspace Access.
        </h2>
      </Reveal>

      <Reveal delay={0.3}>
        <p className="text-neutral-500 text-lg font-light leading-relaxed mb-12 max-w-md">
          We only review requests tied to a real workspace. This ensures all strategic feedback remains focused and actionable.
        </p>
      </Reveal>

      <motion.form 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        onSubmit={handleSubmit} 
        className="space-y-8"
      >
        <div className="space-y-6">
          <div className="group">
            <label className="text-[9px] font-mono text-white/20 uppercase tracking-widest block mb-3 transition-colors group-focus-within:text-white/60">Professional_Email</label>
            <input 
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="NAME@ORGANIZATION.COM"
              className="w-full bg-white/[0.03] border border-white/10 px-6 py-5 text-sm font-mono tracking-widest text-white focus:outline-none focus:border-white transition-all uppercase placeholder:text-white/5"
            />
          </div>
          <div className="group">
            <label className="text-[9px] font-mono text-white/20 uppercase tracking-widest block mb-3 transition-colors group-focus-within:text-white/60">Secure_Key</label>
            <input 
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-white/[0.03] border border-white/10 px-6 py-5 text-sm font-mono tracking-widest text-white focus:outline-none focus:border-white transition-all uppercase placeholder:text-white/5"
            />
          </div>
        </div>

        <button 
          type="submit"
          className="w-full py-7 bg-white text-black font-bold uppercase tracking-[0.4em] text-[10px] hover:bg-neutral-200 transition-all active:scale-[0.98]"
        >
          {mode === 'create' ? 'Establish Access' : 'Authenticate Workspace'}
        </button>

        <div className="flex justify-between items-center pt-4">
          <button 
            type="button"
            onClick={() => setMode(mode === 'create' ? 'login' : 'create')}
            className="text-[9px] font-mono uppercase tracking-widest text-white/20 hover:text-white transition-colors"
          >
            {mode === 'create' ? 'Already have a workspace? Sign in' : 'New partner? Establish access'}
          </button>
        </div>
      </motion.form>
    </div>
  );
};

export default ReviewAccessGate;
