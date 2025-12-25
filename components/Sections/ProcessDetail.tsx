import React from 'react';
import Reveal from '../UI/Reveal';

interface PhaseBlockProps {
  number: string;
  title: string;
  subtitle: string;
  conversations: string[];
  decisions: string[];
  changes: string[];
  bgColor?: string;
  textColor?: string;
  accentColor?: string;
}

const PhaseBlock: React.FC<PhaseBlockProps> = ({ 
  number, title, subtitle, conversations, decisions, changes, 
  bgColor = "bg-[#0a0a0a]", textColor = "text-white", accentColor = "text-neutral-500" 
}) => (
  <section className={`px-6 md:px-12 py-40 border-t border-white/5 ${bgColor} ${textColor}`}>
    <div className="max-w-screen-xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
        <div className="lg:col-span-5">
          <Reveal>
            <div className="flex items-center gap-6 mb-8">
              <span className={`text-4xl font-heading font-black ${textColor}`}>{number}</span>
              <span className={`text-[10px] uppercase tracking-[0.5em] ${accentColor} font-bold`}>{title}</span>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <h2 className={`text-4xl md:text-6xl font-heading font-black tracking-tighter uppercase mb-12 ${textColor}`}>
              {subtitle}
            </h2>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="opacity-60 font-light leading-relaxed mb-8 max-w-sm">
              We begin each phase with a partner-led session. Our goal is to ensure the work is grounded in your specific business reality, not just a template.
            </p>
          </Reveal>
        </div>
        
        <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-16">
          <Reveal delay={0.4} width="100%">
            <div className="space-y-6">
              <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-40 border-b border-current/10 pb-4">The Conversations</h4>
              <ul className="space-y-4">
                {conversations.map((c, i) => (
                  <li key={i} className="text-lg font-light leading-snug flex gap-4">
                    <span className="opacity-20 shrink-0">—</span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.5} width="100%">
            <div className="space-y-6">
              <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-40 border-b border-current/10 pb-4">The Decisions</h4>
              <ul className="space-y-4">
                {decisions.map((d, i) => (
                  <li key={i} className="text-lg font-light leading-snug flex gap-4">
                    <span className="opacity-20 shrink-0">—</span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.6} width="100%">
            <div className="md:col-span-2 p-8 bg-current/[0.03] border border-current/5">
              <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-40 mb-6">What changes for you</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {changes.map((ch, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-current mt-2 shrink-0 opacity-40" />
                    <p className="text-sm opacity-60 font-light italic leading-relaxed">{ch}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  </section>
);

const ProcessDetail: React.FC = () => {
  return (
    <div className="pt-32 pb-40">
      {/* 00: Overview */}
      <section className="px-6 md:px-12 mb-40">
        <div className="max-w-screen-xl mx-auto">
          <Reveal>
            <span className="text-[10px] font-mono uppercase tracking-[0.6em] text-neutral-600 mb-8 block font-bold italic">The Way We Work</span>
          </Reveal>
          <Reveal delay={0.2}>
            <h1 className="text-5xl md:text-8xl font-heading font-black text-white tracking-tighter leading-[0.95] mb-12 uppercase">
              The 12-Week <br/>Rebuild Cycle.
            </h1>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="text-2xl md:text-3xl font-light text-neutral-400 leading-tight max-w-3xl">
              Our engagement is a structured intervention. We follow a fixed timeline to move your business from structural friction to operational clarity.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Phase 01: Diagnose */}
      <PhaseBlock 
        number="01"
        title="Diagnostic"
        subtitle="Mapping the gap."
        conversations={[
          "Identifying the brand messages that no longer feel true.",
          "Walking through the manual tasks your team performs daily.",
          "Pinpointing exactly where your current tools are resisting growth."
        ]}
        decisions={[
          "Approval of the Rebuild Scope: What we fix, and what we don't.",
          "Defining the 'North Star' brand narrative.",
          "Selection of the core technical stack for the foundation."
        ]}
        changes={[
          "You move from guessing where the friction is to having a documented map.",
          "The internal team feels the first signs of relief as the 'Review' uncovers hidden bottlenecks."
        ]}
      />

      {/* Phase 02: Rebuild */}
      <PhaseBlock 
        number="02"
        title="Implementation"
        subtitle="Building the foundation."
        bgColor="bg-white"
        textColor="text-black"
        accentColor="text-neutral-400"
        conversations={[
          "Reviewing the new visual identity in real-world applications.",
          "Demonstrating the first automated workflow prototypes.",
          "Weekly technical progress reviews on the digital home."
        ]}
        decisions={[
          "Approval of the finalized visual assets and style guide.",
          "Validation of the database and tool integration logic.",
          "Final sign-off on the content and message architecture."
        ]}
        changes={[
          "Legacy clutter is replaced by modern, dependable tools.",
          "The visual brand finally starts to match the actual caliber of your work."
        ]}
      />

      {/* Phase 03: Activate */}
      <PhaseBlock 
        number="03"
        title="Transference"
        subtitle="The Handover."
        conversations={[
          "Internal team training sessions on the new workflows.",
          "Reviewing the system documentation for long-term ownership.",
          "Final performance checks and launch protocols."
        ]}
        decisions={[
          "Choosing the timing for the public brand transition.",
          "Confirmation of technical handover and password security.",
          "Setting the internal roadmap for future system updates."
        ]}
        changes={[
          "Full ownership is returned to your team, with the training to maintain it.",
          "The business communicates a singular, authoritative identity to the market."
        ]}
      />

      {/* Conclusion */}
      <section className="px-6 md:px-12 py-40 border-t border-white/5">
        <div className="max-w-screen-xl mx-auto text-center">
          <Reveal width="100%">
            <p className="text-neutral-600 font-mono text-[10px] uppercase tracking-[0.8em] mb-12">
              Predictable. Transparent. Partner-Led.
            </p>
          </Reveal>
          <Reveal width="100%" delay={0.2}>
            <div className="flex justify-center items-center gap-12 opacity-20 grayscale">
              <div className="h-[1px] w-24 bg-white" />
              <div className="w-4 h-4 border border-white rotate-45" />
              <div className="h-[1px] w-24 bg-white" />
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default ProcessDetail;