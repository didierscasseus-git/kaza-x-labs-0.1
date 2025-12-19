import React from 'react';
import Reveal from '../UI/Reveal';

const CTA: React.FC = () => {
  const openIntake = () => {
    // Navigate via pushState to trigger overlay in App.tsx
    window.history.pushState({}, '', '/intake');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <section id="contact" className="relative py-60 px-6 md:px-12 bg-white overflow-hidden text-black">
      <div className="max-w-screen-xl mx-auto text-center relative z-10">
        <Reveal width="100%">
            <h2 className="text-[10px] uppercase tracking-[0.6em] text-neutral-400 mb-12 font-bold">Initialization</h2>
        </Reveal>
        
        <Reveal width="100%" delay={0.2}>
            <div className="font-heading text-5xl md:text-[9rem] font-black tracking-tighter leading-none mb-16">
                Let's build systems that compound.
            </div>
        </Reveal>

        <div className="flex flex-col md:flex-row justify-center items-center gap-8">
            <Reveal delay={0.4}>
                <button 
                  onClick={openIntake}
                  className="bg-black text-white px-12 py-6 font-bold uppercase tracking-widest text-[11px] hover:bg-neutral-800 transition-colors"
                >
                    Diagnose Your System
                </button>
            </Reveal>
            <Reveal delay={0.5}>
                <button className="border border-black px-12 py-6 font-bold uppercase tracking-widest text-[11px] hover:bg-black hover:text-white transition-all">
                    View Technical Deck
                </button>
            </Reveal>
        </div>

        <div className="mt-40 grid grid-cols-1 md:grid-cols-3 gap-12 text-left pt-20 border-t border-black/5">
            <div>
                <span className="text-[9px] uppercase tracking-widest text-neutral-400 block mb-4">Email</span>
                <span className="text-lg font-medium">systems@kazaxlabs.com</span>
            </div>
            <div>
                <span className="text-[9px] uppercase tracking-widest text-neutral-400 block mb-4">Presence</span>
                <span className="text-lg font-medium">Remote-First / Global Labs</span>
            </div>
            <div>
                <span className="text-[9px] uppercase tracking-widest text-neutral-400 block mb-4">Focus</span>
                <span className="text-lg font-medium">Scale. Retention. Engineering.</span>
            </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;