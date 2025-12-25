import React from 'react';
import Reveal from '../UI/Reveal';

const Process: React.FC = () => {
  const steps = [
    { title: "Diagnostic", description: "Weeks 1-3. A partner-led audit to find where your brand and operations have fallen out of sync with your goals." },
    { title: "Implementation", description: "Weeks 4-10. We build your new identity and your business tools in parallel as one integrated foundation." },
    { title: "Transference", description: "Weeks 11-12. Launching the new system and ensuring your team has the training to take full ownership." }
  ];

  return (
    <section id="process" className="py-40 px-6 md:px-12 bg-neutral-950">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            <div className="lg:col-span-4">
                <Reveal>
                    <h2 className="text-[10px] uppercase tracking-[0.5em] text-neutral-500 mb-8 font-bold italic">The Roadmap</h2>
                </Reveal>
                <Reveal delay={0.2}>
                    <h3 className="font-heading text-4xl font-bold text-white mb-8 uppercase tracking-tighter">A certain path <br/>to clarity.</h3>
                </Reveal>
                <Reveal delay={0.3}>
                    <p className="text-neutral-500 leading-relaxed font-light">
                        The Brand & Systems Rebuild follows a strict 12-week timeline. We do not operate in silos; every part of the intervention is planned to move your business from clutter to authority in one cycle.
                    </p>
                </Reveal>
            </div>

            <div className="lg:col-span-8 space-y-24">
                {steps.map((step, idx) => (
                    <div key={idx} className="flex gap-12 group">
                        <div className="text-neutral-800 font-heading text-6xl md:text-8xl font-bold leading-none select-none transition-colors group-hover:text-white/10">
                            0{idx + 1}
                        </div>
                        <div className="pt-2 md:pt-4 border-t border-white/5 flex-grow">
                            <Reveal delay={0.2}>
                                <h4 className="text-2xl font-bold text-white mb-4 uppercase tracking-wider">{step.title}</h4>
                            </Reveal>
                            <Reveal delay={0.3}>
                                <p className="text-neutral-500 max-w-lg leading-relaxed font-light">{step.description}</p>
                            </Reveal>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
};

export default Process;