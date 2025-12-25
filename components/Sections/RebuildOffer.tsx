import React from 'react';
import { motion } from 'framer-motion';
import Reveal from '../UI/Reveal';

const RebuildOffer: React.FC = () => {
  return (
    <div className="pt-32 pb-40">
      {/* 01: The Definition - Opening Statement */}
      <section className="px-6 md:px-12 mb-40">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            <div className="lg:col-span-8">
              <Reveal>
                <span className="text-[10px] font-mono uppercase tracking-[0.6em] text-neutral-500 mb-8 block font-bold">The Engagement</span>
              </Reveal>
              <Reveal delay={0.2}>
                <h1 className="text-5xl md:text-8xl font-heading font-black text-white tracking-tighter leading-[0.9] mb-12 uppercase">
                  A Unified <br/>Rebuild.
                </h1>
              </Reveal>
              <Reveal delay={0.3}>
                <p className="text-2xl md:text-3xl font-light text-neutral-400 leading-tight max-w-3xl">
                  The Brand & Systems Rebuild is a single, 12-week engagement designed to bridge the gap between how your business is seen and how it actually works. We remove the clutter and replace it with a singular, high-performance foundation.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 02: The Problems in Plain Language */}
      <section className="px-6 md:px-12 py-40 bg-white text-black">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
          <div>
            <Reveal>
              <h2 className="text-[10px] uppercase tracking-[0.5em] text-neutral-400 mb-8 font-bold italic">The Challenge</h2>
            </Reveal>
            <Reveal delay={0.2}>
              <h3 className="text-4xl md:text-6xl font-heading font-black tracking-tight leading-none uppercase">
                Success often <br/>brings confusion.
              </h3>
            </Reveal>
          </div>
          <div className="space-y-16">
            <Reveal delay={0.4}>
              <div className="space-y-6">
                <h4 className="text-xl font-bold uppercase tracking-wider">The Trust Gap</h4>
                <p className="text-neutral-700 leading-relaxed font-light text-lg">
                  You’ve grown, but your visual identity is still stuck in your earlier stages. When your brand feels "smaller" than the quality of your work, you lose trust with high-level partners before the conversation even begins.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.5}>
              <div className="space-y-6">
                <h4 className="text-xl font-bold uppercase tracking-wider">Operational Friction</h4>
                <p className="text-neutral-700 leading-relaxed font-light text-lg">
                  Your team is spending hours on manual tasks that should be invisible. Slow websites and disjointed tools aren't just annoying—they are a daily tax on your company's momentum.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 03: The Changes (Post-Rebuild) */}
      <section className="px-6 md:px-12 py-40 bg-[#0a0a0a]">
        <div className="max-w-screen-xl mx-auto">
          <div className="mb-24">
            <Reveal>
              <span className="text-[10px] uppercase tracking-[0.6em] text-neutral-500 mb-8 block font-bold">The Outcome</span>
            </Reveal>
            <Reveal delay={0.2}>
              <h2 className="text-4xl md:text-7xl font-heading font-black text-white tracking-tighter uppercase leading-[0.9]">What changes.</h2>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-1px bg-white/5 border border-white/5">
            {[
              {
                title: "Absolute Clarity",
                desc: "Your brand and your message finally match. You no longer have to explain away an outdated website or a disjointed visual style."
              },
              {
                title: "Invisible Systems",
                desc: "Your foundations just work. Pages load instantly, tools are reliable, and your team stops managing clutter and starts leading growth."
              },
              {
                title: "Ready to Scale",
                desc: "You move from a brittle setup to a stable one. You can take on more volume and higher-tier clients without the fear of your systems breaking."
              }
            ].map((outcome, i) => (
              <Reveal key={outcome.title} delay={0.3 + i * 0.1} width="100%">
                <div className="p-12 md:p-16 bg-[#0a0a0a] h-full flex flex-col">
                  <span className="text-[10px] font-mono text-white/20 mb-10 block">0{i+1}</span>
                  <h4 className="text-2xl font-bold text-white mb-6 uppercase tracking-widest">{outcome.title}</h4>
                  <p className="text-neutral-400 font-light leading-relaxed text-lg">{outcome.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 04: Engagement Structure */}
      <section className="px-6 md:px-12 py-40 bg-neutral-900">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20">
          <div className="lg:col-span-5">
            <Reveal>
              <h2 className="text-[10px] uppercase tracking-[0.5em] text-neutral-500 mb-8 font-bold">The Structure</h2>
            </Reveal>
            <Reveal delay={0.2}>
              <h3 className="text-4xl md:text-5xl font-heading font-black text-white tracking-tighter uppercase mb-10">
                A 12-Week <br/>Roadmap.
              </h3>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="text-neutral-400 font-light leading-relaxed text-lg">
                We follow a rigorous, phase-based sequence to move your business from confusion to clarity. There are no loose ends—every part of the rebuild is planned and executed as a single unit.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-7 space-y-12">
            {[
              { phase: "Diagnostic", detail: "Weeks 1-2. We audit your brand perception and find the manual bottlenecks in your daily operations." },
              { phase: "Infrastructure Blueprint", detail: "Weeks 3-4. We design your new visual language and map the digital foundations needed to support it." },
              { phase: "Implementation", detail: "Weeks 5-10. We build the new system and identity in parallel. You see steady, visible progress every week." },
              { phase: "Transference", detail: "Weeks 11-12. We launch, train your team, and ensure you have full ownership of the new foundations." }
            ].map((p, i) => (
              <Reveal key={p.phase} delay={0.4 + i * 0.1} width="100%">
                <div className="flex gap-10 border-b border-white/5 pb-12 group">
                  <span className="text-4xl font-heading font-black text-white/10 group-hover:text-white/40 transition-colors">0{i+1}</span>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-3 uppercase tracking-widest">{p.phase}</h4>
                    <p className="text-neutral-500 text-lg leading-relaxed font-light">{p.detail}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 05: What working together feels like */}
      <section className="px-6 md:px-12 py-40">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
            <div className="lg:col-span-7">
              <Reveal>
                <span className="text-[10px] uppercase tracking-[0.6em] text-neutral-500 mb-8 block font-bold italic">The Partnership</span>
              </Reveal>
              <Reveal delay={0.2}>
                <h2 className="text-4xl md:text-7xl font-heading font-black text-white tracking-tighter uppercase leading-[0.9] mb-12">How it feels.</h2>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="space-y-8 text-neutral-400 text-xl font-light leading-relaxed">
                  <p>
                    Working with us feels like gaining a senior partner who understands both your vision and your operations. We don't wait for you to tell us what to do—we come to the table with a clear perspective.
                  </p>
                  <p>
                    We take the heavy lifting off your team’s plate. You stay involved in the direction and the strategy, while we handle the execution and the technical precision.
                  </p>
                </div>
              </Reveal>
            </div>
            <div className="lg:col-span-5">
              <div className="p-12 border border-white/5 bg-white/[0.02]">
                <h4 className="text-[10px] uppercase tracking-[0.4em] text-white/30 mb-10 font-bold border-b border-white/5 pb-4 w-fit">Our Promise</h4>
                <div className="space-y-8">
                  <div className="flex gap-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-white mt-1.5 shrink-0" />
                    <p className="text-sm text-neutral-400 font-light italic">"You are never left wondering what happens next. Our process is as transparent as it is precise."</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-white mt-1.5 shrink-0" />
                    <p className="text-sm text-neutral-400 font-light italic">"We build for the long term. Everything we deliver is designed to be managed easily by your team."</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RebuildOffer;