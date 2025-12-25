
import React from 'react';
import { SystemProvider } from './system/systemContext';
import { DiagnosticProvider } from './context/DiagnosticContext';
import { AppShell } from './components/AppShell';
import { DiagnosticOverlay } from './components/DiagnosticOverlay';

const App: React.FC = () => {
  return (
    <SystemProvider>
      <DiagnosticProvider>
        <div className="min-h-screen bg-[#050505] text-[#f0f0f0] selection:bg-white selection:text-black font-mono">
          <AppShell />
          <DiagnosticOverlay />
          
          {/* Footer HUD elements only - Branding moved exclusively to Navbar */}
          <div className="fixed bottom-8 left-8 pointer-events-none z-50 hidden md:block">
            <p className="text-[8px] font-mono text-white/20 uppercase tracking-[0.3em]">
              © 2024 Engineering Systems Rebuild // Restricted Access
            </p>
          </div>
        </div>
      </DiagnosticProvider>
    </SystemProvider>
  );
};

export default App;
