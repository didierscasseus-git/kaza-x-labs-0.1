import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateLabResponse, ChatMessage } from '../../lib/gemini';

const LabAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = { 
      role: 'user', 
      content: input
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await generateLabResponse(
        input,
        'precision'
      );

      let partnerContent = response.text;
      
      // Professional refinement for common partner-like advice
      if (partnerContent.includes("analysis")) {
        partnerContent = "Looking at this from a business perspective, it seems you've reached a stage where your foundations can no longer support your ambitions. Realigning how you look with how you work is likely the most direct path forward.";
      }
      
      setMessages(prev => [...prev, { role: 'assistant', content: partnerContent }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Our partners are currently occupied. Please leave an inquiry through our main page and we will get back to you personally." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 left-8 z-[70]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="absolute bottom-20 left-0 w-[90vw] md:w-[400px] bg-white text-black border border-neutral-200 shadow-2xl overflow-hidden flex flex-col h-[500px]"
          >
            <div className="p-6 border-b border-neutral-100 bg-neutral-50 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-black animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Direct Conversation</span>
              </div>
            </div>

            <div 
              ref={scrollRef}
              className="flex-grow overflow-y-auto p-6 space-y-8 scrollbar-hide"
            >
              {messages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-40 space-y-4">
                  <p className="text-[10px] uppercase tracking-[0.4em] max-w-[200px] font-bold">
                    Speak with a partner regarding your current challenges
                  </p>
                </div>
              )}
              
              {messages.map((msg, i) => (
                <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className="text-[8px] font-mono text-neutral-400 uppercase mb-2 tracking-widest">
                    {msg.role === 'user' ? 'YOU' : 'KAZA PARTNER'}
                  </div>
                  <div className={`max-w-[85%] p-4 text-sm font-light leading-relaxed ${
                    msg.role === 'user' ? 'bg-neutral-100 text-black' : 'text-neutral-700 italic'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex flex-col items-start">
                  <div className="text-[8px] font-mono text-neutral-300 uppercase mb-2 tracking-widest animate-pulse">Thinking...</div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-neutral-100 bg-neutral-50">
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask a partner..."
                  className="flex-grow bg-white border border-neutral-200 px-4 py-3 text-[11px] tracking-wider text-black placeholder:text-neutral-300 focus:outline-none focus:border-black transition-all"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isLoading}
                  className="w-12 h-12 flex items-center justify-center bg-black text-white hover:bg-neutral-800 transition-all disabled:opacity-50"
                >
                  →
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-white text-black border border-neutral-200 flex items-center justify-center shadow-2xl relative group overflow-hidden"
        aria-label="Open partner consultation"
      >
        <div className="relative z-10 font-black text-xl tracking-tighter">K</div>
        <motion.div 
          className="absolute inset-0 bg-neutral-100 translate-y-full group-hover:translate-y-0 transition-transform duration-500"
        />
      </button>
    </div>
  );
};

export default LabAssistant;