import React from 'react';
import { motion } from 'framer-motion';

interface RevealProps {
  children: React.ReactNode;
  width?: 'fit-content' | '100%';
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  blur?: boolean;
}

const Reveal: React.FC<RevealProps> = ({ 
  children, 
  width = 'fit-content', 
  delay = 0, 
  duration = 0.8,
  direction = 'up',
  distance = 60,
  blur = true
}) => {
  const getInitialProps = () => {
    const initial = { opacity: 0, filter: blur ? 'blur(12px)' : 'none' };
    switch (direction) {
      case 'up': return { ...initial, y: distance };
      case 'down': return { ...initial, y: -distance };
      case 'left': return { ...initial, x: distance };
      case 'right': return { ...initial, x: -distance };
      case 'none': return initial;
      default: return initial;
    }
  };

  return (
    <div style={{ position: 'relative', width, overflow: 'visible' }}>
      <motion.div
        variants={{
          hidden: getInitialProps(),
          visible: { 
            opacity: 1, 
            y: 0, 
            x: 0, 
            filter: 'blur(0px)',
            transition: { 
              duration, 
              delay, 
              ease: [0.16, 1, 0.3, 1],
              opacity: { duration: duration * 0.6, delay }
            }
          },
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Reveal;