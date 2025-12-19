import React, { useRef } from 'react';
import { motion, useScroll, useTransform, animate } from 'framer-motion';
import { WORK } from '../../constants/content';
import Reveal from '../UI/Reveal';

const Work: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const handleStudyClick = () => {
    const element = document.getElementById('case-study-detail');
    if (element) {
      const navbar = document.querySelector('nav');
      const navbarHeight = navbar ? navbar.offsetHeight : 80;
      
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const targetPosition = elementPosition - navbarHeight;

      // High-precision easing [0.16, 1, 0.3, 1] for a technical, smooth feel
      animate(window.scrollY, targetPosition, {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (latest) => window.scrollTo(0, latest)
      });
    }
  };

  const handleDiagnoseClick = () => {
    // Push state to trigger overlay logic in App.tsx
    window.history.pushState({}, '', '/intake');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative bg-white text-black"
    >
      {/* STICKY CONTAINER */}
      <div className="sticky top-0 min-h-screen flex items-center">
        <div className="w-full py-40 px-6 md:px-12">
          <div className="max-w-screen-xl mx-auto">

            {/* HEADER */}
            <div className="mb-24 flex justify-between items-center">
              <Reveal>
                <h2 className="text-[10px] uppercase tracking-[0.5em] text-neutral-500 font-bold">
                  Selected Artifacts
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <a
                  href="#"
                  className="text-[10px] uppercase tracking-widest font-bold border-b border-black/10 pb-2 hover:border-black transition-all"
                >
                  View All Work
                </a>
              </Reveal>
            </div>

            {/* WORK ITEMS */}
            <div className="space-y-40">
              {WORK.map((item, idx) => {
                const base = idx * 0.15;

                const imageY = useTransform(
                  scrollYProgress,
                  [base, base + 0.4],
                  [80, 0]
                );

                const imageOpacity = useTransform(
                  scrollYProgress,
                  [base, base + 0.2],
                  [0, 1]
                );

                return (
                  <div
                    key={item.id}
                    className={`flex flex-col ${
                      idx % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'
                    } gap-12 md:gap-24 items-center`}
                  >
                    {/* IMAGE */}
                    <motion.div
                      style={{ y: imageY, opacity: imageOpacity }}
                      className="w-full md:w-3/5 overflow-hidden bg-neutral-100 aspect-[4/3]"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                      />
                    </motion.div>

                    {/* TEXT */}
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
                      
                      <div className="flex flex-col gap-4 items-center md:items-start perspective-[1500px]">
                        <Reveal delay={0.3}>
                          <motion.button 
                            onClick={handleStudyClick}
                            className="relative overflow-hidden text-[10px] uppercase tracking-widest font-bold border border-black px-10 py-5 group w-full sm:w-64"
                            initial="rest"
                            whileHover="hover"
                            whileTap="tap"
                            variants={{
                              rest: { 
                                scale: 1, 
                                rotate: 0,
                                y: 0,
                                borderWidth: "1px",
                                borderColor: "rgba(0,0,0,1)",
                                transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
                              },
                              hover: { 
                                scale: 1, 
                                rotate: idx % 2 === 0 ? 2 : -2, // Subtle ±2 degree rotation
                                y: -1, // Very subtle lift
                                borderWidth: "2px", // Subtle thickness increase
                                transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
                              },
                              tap: { 
                                scale: 0.97, // Pronounced but smooth press
                                rotate: 0,
                                y: 2,
                                borderWidth: "3px", // Technical feedback on press
                                transition: { duration: 0.1, ease: "linear" }
                              }
                            }}
                          >
                            <motion.div 
                              className="absolute inset-0 bg-black z-0"
                              variants={{
                                rest: { y: "100%" },
                                hover: { y: "0%" }
                              }}
                              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            />
                            
                            {/* Technical Metadata Glyph */}
                            <motion.span 
                              className="absolute top-1 right-2 text-[5px] font-mono text-black mix-blend-difference group-hover:text-white/40 uppercase tracking-tighter transition-colors"
                              animate={{ 
                                opacity: [0.4, 0.8, 0.4, 1, 0.4],
                              }}
                              transition={{ 
                                repeat: Infinity, 
                                duration: 3,
                                times: [0, 0.2, 0.25, 0.3, 1]
                              }}
                            >
                              REF_NODE_0{idx+1}
                            </motion.span>

                            <span className="relative z-10 flex items-center justify-center gap-3 mix-blend-difference text-white">
                              <span className="relative">
                                Study System
                                <motion.span 
                                  className="absolute bottom-[-4px] left-0 w-full h-[1px] bg-white origin-left"
                                  variants={{
                                    rest: { scaleX: 0 },
                                    hover: { scaleX: 1 }
                                  }}
                                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                />
                              </span>
                              <motion.span 
                                variants={{
                                  rest: { x: -4, opacity: 0 },
                                  hover: { x: 0, opacity: 1 }
                                }}
                                transition={{ duration: 0.3 }}
                              >
                                →
                              </motion.span>
                            </span>
                          </motion.button>
                        </Reveal>

                        <Reveal delay={0.4}>
                          <motion.button 
                            onClick={handleDiagnoseClick}
                            className="relative overflow-hidden text-[10px] uppercase tracking-widest font-bold bg-black text-white px-10 py-5 group w-full sm:w-64 border border-transparent"
                            initial="rest"
                            whileHover="hover"
                            whileTap="tap"
                            variants={{
                              rest: { scale: 1, y: 0, rotate: 0 },
                              hover: { scale: 1, y: -2, rotate: idx % 2 === 0 ? -1 : 1 },
                              tap: { scale: 0.97, y: 1, rotate: 0 }
                            }}
                          >
                            <motion.div 
                              className="absolute inset-0 bg-neutral-800 z-0"
                              variants={{
                                rest: { x: "-100%" },
                                hover: { x: "0%" }
                              }}
                              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            />
                            <span className="relative z-10">Diagnose Your System</span>
                          </motion.button>
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

      {/* EXIT SCROLL SPACE */}
      <div className="h-[150vh]" />
    </section>
  );
};

export default Work;