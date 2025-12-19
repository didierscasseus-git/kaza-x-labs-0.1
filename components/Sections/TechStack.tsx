
import React from 'react';
import Reveal from '../UI/Reveal';

const TechStack: React.FC = () => {
  const techs = [
    'Frontend / Next.js, React, TS',
    'Backend / Node, Go, Rust',
    'Infrastructure / AWS, GCP, Vercel',
    'Data / Postgre, Redis, Vector',
    'Intelligence / OpenAI, Gemini, Custom LLMs',
    'Ops / GitHub Actions, CI/CD, Terraform'
  ];

  return (
    <section className="py-40 px-6 md:px-12 bg-[#0a0a0a] border-t border-white/5">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            <div>
                <Reveal>
                    <h2 className="text-[10px] uppercase tracking-[0.5em] text-neutral-500 mb-8 font-bold">Stack Architecture</h2>
                </Reveal>
                <Reveal delay={0.2}>
                    <h3 className="font-heading text-4xl font-bold text-white mb-8 max-w-md">Built for zero latency and infinite horizontal scale.</h3>
                </Reveal>
            </div>
            <div className="space-y-6">
                {techs.map((tech, i) => (
                    <Reveal key={tech} delay={0.1 * i}>
                        <div className="flex items-center gap-6 group cursor-default">
                            <div className="w-2 h-2 rounded-full bg-white/10 group-hover:bg-white transition-colors" />
                            <span className="text-neutral-400 font-mono text-sm tracking-tight group-hover:text-white transition-colors">{tech}</span>
                        </div>
                    </Reveal>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
