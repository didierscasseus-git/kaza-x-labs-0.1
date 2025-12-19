import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { DURATION_TOKENS, EASING_TOKENS } from '../../constants/motionTokens';

const Hero: React.FC = () => {
  const { scrollYProgress } = useScroll();
  
  // Transition values for the headline (fade out/scale slightly as we scroll)
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.25], [1, 0.96]);

  // Transition values for the scroll-revealed subline
  const sublineOpacity = useTransform(scrollYProgress, [0.12, 0.28], [0, 0.65]);
  const sublineY = useTransform(scrollYProgress, [0.12, 0.28], [24, 0]);

  const lines = [
    "Reimagined brands.",
    "Engineered systems.",
    "Built for what’s next."
  ];

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.4,
      }
    }
  };

  const lineVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      filter: 'blur(8px)'
    },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: DURATION_TOKENS.SLOW,
        ease: EASING_TOKENS.PRECISION
      }
    }
  };

  return (
    <section className="relative min-h-[180vh] bg-[#0a0a0a] flex flex-col pt-[10vh]">
      {/* Sticky container for the Hero elements */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        <motion.div 
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="max-w-screen-xl mx-auto w-full px-6 md:px-12 relative z-10 -translate-y-[12%]"
        >
          {/* Primary Editorial Headline - Line by line reveal */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start md:items-center text-left md:text-center"
          >
            <h1 className="font-heading text-5xl sm:text-7xl md:text-[9.5rem] leading-[1.15] md:leading-[1.15] tracking-tight md:tracking-[-0.04em] font-extrabold text-white uppercase select-none max-w-[12ch]">
              {lines.map((line, i) => (
                <span key={i} className="block overflow-hidden pb-2">
                  <motion.span 
                    variants={lineVariants}
                    className="block"
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>
          </motion.div>

          {/* Scroll-Revealed Subline */}
          <motion.div 
            style={{ 
              opacity: sublineOpacity, 
              y: sublineY,
            }}
            className="mt-24 flex justify-center w-full"
          >
            <p className="text-lg md:text-xl text-white font-light leading-[1.7] max-w-[45ch] text-left md:text-center px-6">
              We redesign identity, rebuild digital foundations, and engineer the systems that let modern companies scale with clarity.
            </p>
          </motion.div>
        </motion.div>

        {/* Ambient background indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ delay: 2.5, duration: 2 }}
          className="absolute bottom-12 left-6 md:left-12 text-neutral-800 text-[7px] tracking-[1.2em] uppercase font-mono pointer-events-none"
        >
          SYSTEM_ESTABLISHED // KERNEL_V2
        </motion.div>

        {/* Subtle bottom gradient to blend into content */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none" />
      </div>
      
      {/* Scrollable buffer */}
      <div className="h-[80vh] pointer-events-none" />
    </section>
  );
};

export default Hero;