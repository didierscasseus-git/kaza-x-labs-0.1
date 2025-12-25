import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, animate } from 'framer-motion';
import { WORK } from '../../constants/content';
import Reveal from '../UI/Reveal';

interface WorkProps {
  onOpenReview: () => void;
}

const LazyImage: React.FC<{ src: string; alt: string; className?: string }> = ({ src, alt, className }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative w-full h-full bg-neutral-100 overflow-hidden ${className}`}>
      <motion.div 
        initial={{ opacity: 1 }}
        animate={{ opacity: isLoaded ? 0 : 1 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 bg-neutral-200"
      />
      
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ 
          opacity: isLoaded ? 1 : 0, 
          scale: isLoaded ? 1 : 1.05 
        }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
      />
    </div>
  );
};

const Work: React.FC<WorkProps> = ({ onOpenReview }) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const handleStudyClick = () => {
    const element = document.getElementById('case-study-detail');
    if (element) {
      const navbar = document.querySelector('nav');
      const navbarHeight = navbar ? (navbar as HTMLElement).offsetHeight : 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const targetPosition = elementPosition - navbarHeight;

      animate(window.scrollY, targetPosition, {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (latest) => window.scrollTo(0, latest)
      });
    }
  };

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative bg-white text-black"
    >
      <div className="sticky top-0 min-h-screen flex items-center">
        <div className="w-full py-40 px-6 md:px-12">
          <div className="max-w-screen-xl mx-auto">
            <div className="mb-24 flex justify-between items-center">
              <Reveal>
                <h2 className="text-[10px] uppercase tracking-[0.5em] text-neutral-500 font-bold italic">
                  Rebuild Outcomes
                </h2>
              </Reveal>
            </div>

            <div className="space-y-40">
              {WORK.map((item, idx) => {
                const base = idx * 0.15;
                const imageY = useTransform(scrollYProgress, [base, base + 0.4], [80, 0]);
                const imageOpacity = useTransform(scrollYProgress, [base, base + 0.2], [0, 1]);

                return (
                  <div key={item.id} className={`flex flex-col ${idx % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 md:gap-24 items-center`}>
                    <motion.div style={{ y: imageY, opacity: imageOpacity }} className="w-full md:w-3/5 aspect-[4/3]">
                      <LazyImage src={item.image} alt={item.title} />
                    </motion.div>

                    <div className="w-full md:w-2/5 text-center md:text-left">
                      <Reveal>
                        <span className="text-[10px] uppercase tracking-[0.4em] text-neutral-400 mb-4 block font-bold">
                          {item.category}
                        </span>
                      </Reveal>
                      <Reveal delay={0.2}>
                        <h3 className="font-heading text-4xl md:text-6xl font-bold mb-8 tracking-tighter">
                          {item.title}
                        </h3>
                      </Reveal>
                      
                      <div className="flex flex-col gap-4 items-center md:items-start">
                        <Reveal delay={0.3}>
                          <button onClick={handleStudyClick} className="relative overflow-hidden text-[10px] uppercase tracking-widest font-bold border border-black px-10 py-5 group w-full sm:w-64">
                            <span className="relative z-10">Review Outcome Analysis</span>
                          </button>
                        </Reveal>
                        <Reveal delay={0.4}>
                          <button onClick={onOpenReview} className="relative overflow-hidden text-[10px] uppercase tracking-widest font-bold bg-black text-white px-10 py-5 group w-full sm:w-64">
                            <span className="relative z-10">Initiate Assessment</span>
                          </button>
                        </Reveal>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="h-[150vh]" />
    </section>
  );
};

export default Work;
