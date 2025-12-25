
import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { useDiagnostic } from '../context/DiagnosticContext';
import InitiateReviewOverlay from './Review/InitiateReviewOverlay';

export const DiagnosticOverlay: React.FC = () => {
  const { isOpen, closeDiagnostic } = useDiagnostic();

  return (
    <AnimatePresence>
      {isOpen && (
        <InitiateReviewOverlay 
          isOpen={isOpen} 
          onClose={closeDiagnostic} 
        />
      )}
    </AnimatePresence>
  );
};
