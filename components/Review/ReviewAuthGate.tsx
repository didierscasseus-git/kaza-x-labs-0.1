import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ReviewAuthGateProps {
  onAuth: (data: { name: string; email: string; company: string }) => void;
}

export const ReviewAuthGate: React.FC<ReviewAuthGateProps> = ({ onAuth }) => {
  const [formData, setFormData] = useState({ name: '', email: '', company: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.email && formData.company) {
      onAuth(formData);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }} 
      animate={{ opacity: 1, x: 0 }}
      className="space-y-12"
    >
      <div className="space-y-6">
        <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-neutral-500 block font-bold">
          [ Sequence 00: Authentication ]
        </span>
        <h2 className="text-4xl md:text-6xl font-heading font-black text-white uppercase tracking-tighter leading-tight">
          Establish <br/>Workspace.
        </h2>
        <p className="text-lg text-neutral-500 font-light max-w-sm">
          We only build diagnostic models for real entities. No sensitive data required.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-6">
          <div className="group">
            <label className="text-[8px] font-mono text-white/20 uppercase tracking-widest block mb-2">Full_Identity</label>
            <input 
              required
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-white/[0.03] border border-white/10 px-5 py-4 text-xs font-mono tracking-widest text-white focus:outline-none focus:border-white transition-all uppercase"
            />
          </div>
          <div className="group">
            <label className="text-[8px] font-mono text-white/20 uppercase tracking-widest block mb-2">Secure_Contact</label>
            <input 
              required
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-white/[0.03] border border-white/10 px-5 py-4 text-xs font-mono tracking-widest text-white focus:outline-none focus:border-white transition-all uppercase"
            />
          </div>
          <div className="group">
            <label className="text-[8px] font-mono text-white/20 uppercase tracking-widest block mb-2">Entity_Name</label>
            <input 
              required
              type="text"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="w-full bg-white/[0.03] border border-white/10 px-5 py-4 text-xs font-mono tracking-widest text-white focus:outline-none focus:border-white transition-all uppercase"
            />
          </div>
        </div>

        <button 
          type="submit"
          className="w-full py-6 bg-white text-black font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-neutral-200 transition-colors"
        >
          Initialize Protocol
        </button>
      </form>
    </motion.div>
  );
};
