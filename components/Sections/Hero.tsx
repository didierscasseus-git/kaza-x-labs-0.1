import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform, Variants, useReducedMotion } from 'framer-motion';

interface HeroProps {
  onOpenReview: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenReview }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  
  // Triggers every time the section enters the viewport (once: false)
  const isInView = useInView(containerRef, { amount: 0.15, once: false });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Global section transforms
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const sublineOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0.3]);

  // Subtle X-axis Parallax for each line
  const line1X = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const line2X = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const line3X = useTransform(scrollYProgress, [0, 1], [0, -20]);
  const lineTransforms = [line1X, line2X, line3X];

  const lines = [
    "REIMAGINED BRANDS.",
    "ENGINEERED SYSTEMS.",
    "BUILT FOR WHAT’S NEXT.",
  ];

  // Orchestrator for high-level blocks (Headline -> Subline -> Button)
  const containerVariants: Variants = {
    hidden: { 
      opacity: 0 
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4, // Deliberate gap between major blocks
        delayChildren: 0.2,
      }
    }
  };

  // Internal stagger for headline lines
  const headlineVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      }
    }
  };

  const lineVariants: Variants = {
    hidden: { 
      y: prefersReducedMotion ? 0 : "110%", 
      opacity: 0,
      rotate: prefersReducedMotion ? 0 : 2
    },
    visible: {
      y: 0,
      opacity: 1,
      rotate: 0,
      transition: { 
        duration: 1.4, 
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const fadeUpVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: prefersReducedMotion ? 0 : 30 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 1.6, 
        ease: [0.16, 1, 0.3, 1] 
      }
    }
  };

  return (
    <section 
      ref={containerRef}
      id="hero" 
      className="relative min-h-screen bg-[#050505] flex flex-col justify-center items-center overflow-hidden"
    >
      <motion.div 
        style={{ scale: heroScale, y: contentY }}
        className="max-w-screen-xl mx-auto w-full px-6 md:px-12 relative z-10"
      >
        <motion.div 
          className="flex flex-col items-start md:items-center text-left md:text-center"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Primary Headline with subtle X parallax */}
          <motion.h1 
            variants={headlineVariants}
            className="font-heading text-6xl sm:text-7xl md:text-[8rem] lg:text-[10rem] leading-[0.82] tracking-tighter font-black text-white uppercase select-none"
          >
            {lines.map((line, i) => (
              <div key={i} className="block overflow-hidden pb-4 md:pb-6">
                <motion.span 
                  variants={lineVariants}
                  style={{ x: prefersReducedMotion ? 0 : lineTransforms[i] }}
                  className="block whitespace-nowrap origin-bottom-left"
                >
                  {line}
                </motion.span>
              </div>
            ))}
          </motion.h1>

          {/* Secondary Headline (Subline) */}
          <motion.div 
            style={{ opacity: sublineOpacity }}
            variants={fadeUpVariants}
            className="mt-12 md:mt-20 flex justify-center w-full"
          >
            <p className="text-xl md:text-3xl text-neutral-400 font-light leading-relaxed max-w-[36ch] text-left md:text-center uppercase tracking-tight">
              A singular 12-week intervention. <br className="hidden md:block" /> 
              We realign your <span className="text-white font-medium">brand identity</span> and <span className="text-white font-medium">operations</span> into a high-performance system.
            </p>
          </motion.div>

          {/* Diagnosis CTA */}
          <motion.div
            variants={fadeUpVariants}
            className="mt-16 md:mt-24"
          >
            <button 
              onClick={onOpenReview}
              className="group flex flex-col items-center gap-6 transition-all hover:scale-105 active:scale-95 outline-none"
            >
              <div className="px-12 py-5 border border-white/20 bg-white/5 backdrop-blur-sm text-[11px] uppercase tracking-[0.6em] text-white font-bold group-hover:bg-white group-hover:text-black group-focus:bg-white group-focus:text-black transition-all">
                The Diagnosis
              </div>
              <motion.div 
                animate={prefersReducedMotion ? {} : { y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                className="w-[1px] h-16 bg-gradient-to-b from-white/40 to-transparent"
              />
            </button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Atmospheric Ambience */}
      <div className="absolute inset-0 pointer-events-none opacity-20" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vh] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]" />
      </div>
    </section>
  );
};

export default Hero;