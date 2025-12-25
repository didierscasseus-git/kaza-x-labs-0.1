import React from 'react';
import Reveal from '../UI/Reveal';

interface CTAProps {
  onOpenReview: () => void;
}

const CTA: React.FC<CTAProps> = ({ onOpenReview }) => {
  return (
    <section id="contact" className="relative py-60 px-6 md:px-12 bg-[#0a0a0a] overflow-hidden text-white border-t border-white/5">
      <div className="max-w-screen-xl mx-auto text-center relative z-10">
        <Reveal width="100%">
            <h2 className="text-[10px] uppercase tracking-[0.8em] text-neutral-600 mb-12 font-bold italic">The Resolution</h2>
        </Reveal>
        
        <Reveal width="100%" delay={0.2}>
            <div className="font-heading text-5xl md:text-[8rem] font-black tracking-tighter leading-[0.9] mb-16 uppercase">
                Resolve the gap. <br/>Scale with intent.
            </div>
        </Reveal>

        <div className="flex flex-col md:flex-row justify-center items-center gap-8">
            <Reveal delay={0.4}>
                <button 
                  onClick={onOpenReview}
                  className="bg-white text-black px-12 py-6 font-bold uppercase tracking-[0.4em] text-[10px] hover:bg-neutral-200 transition-all duration-500 shadow-2xl active:scale-95"
                >
                    Initiate Assessment
                </button>
            </Reveal>
        </div>

        <div className="mt-40 flex flex-col md:flex-row justify-between items-center pt-20 border-t border-white/5 font-mono text-[9px] uppercase tracking-[0.4em] text-neutral-600 gap-8">
            <div className="flex items-center gap-4">
               <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
               <span className="text-white/60">Partner Availability: 2 Engagement Slots Open for Q3</span>
            </div>
            <div className="text-center md:text-right">
                <span className="block mb-2">Partner Correspondence</span>
                <span className="text-white">HELLO@KAZAXLABS.COM</span>
            </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
