import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateLabResponse, ChatMessage, AIModelMode } from '../../lib/gemini';
import { useSystem } from '../../system/systemContext';

const LabAssistant: React.FC = () => {
  const { signals, confidence } = useSystem();
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<AIModelMode>('precision');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [attachedImage, setAttachedImage] = useState<{data: string, mime: string} | null>(null);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = (reader.result as string).split(',')[1];
        setAttachedImage({ data: base64, mime: file.type });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim() && !attachedImage) return;

    const userMsg: ChatMessage = { 
      role: 'user', 
      content: input, 
      image: attachedImage?.data 
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    const currentImage = attachedImage;
    setAttachedImage(null);
    setIsLoading(true);

    try {
      const response = await generateLabResponse(
        input || "Analyze this visual artifact.",
        mode,
        currentImage ? { data: currentImage.data, mimeType: currentImage.mime } : undefined,
        { signals, confidence }
      );

      setMessages(prev => [...prev, { role: 'assistant', content: response.text }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: "CRITICAL_SIGNAL_FAILURE: Could not establish connection to the neural core." }]);
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
            className="absolute bottom-20 left-0 w-[90vw] md:w-[450px] bg-black/90 backdrop-blur-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col h-[600px]"
          >
            {/* Header / Mode Switcher */}
            <div className="p-4 border-b border-white/5 bg-white/[0.02] flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-white/60">Lab_Assistant_v3.2</span>
              </div>
              <div className="flex bg-white/5 p-1 rounded-sm">
                {(['speed', 'precision', 'deep-thought'] as AIModelMode[]).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className={`text-[8px] uppercase tracking-widest px-3 py-1.5 transition-all ${
                      mode === m ? 'bg-white text-black font-bold' : 'text-white/40 hover:text-white'
                    }`}
                  >
                    {m.replace('-', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Message Feed */}
            <div 
              ref={scrollRef}
              className="flex-grow overflow-y-auto p-6 space-y-8 scrollbar-hide"
            >
              {messages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-20 space-y-4">
                  <div className="text-[40px] font-heading font-black">AI_CORE</div>
                  <p className="text-[10px] uppercase tracking-[0.4em] max-w-[200px]">
                    Awaiting technical mandate for system analysis.
                  </p>
                  {confidence > 0.5 && (
                    <div className="text-[8px] font-mono text-white/40 uppercase tracking-widest">
                      Signal strength established. Personalization active.
                    </div>
                  )}
                </div>
              )}
              
              {messages.map((msg, i) => (
                <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className="text-[8px] font-mono text-white/20 uppercase mb-2 tracking-widest">
                    {msg.role === 'user' ? 'SIGNAL_ORIGIN:USER' : 'SIGNAL_ORIGIN:LAB_CORE'}
                  </div>
                  <div className={`max-w-[85%] p-4 text-sm font-light leading-relaxed ${
                    msg.role === 'user' ? 'bg-white/5 text-white' : 'text-neutral-300'
                  }`}>
                    {msg.image && (
                      <img 
                        src={`data:image/jpeg;base64,${msg.image}`} 
                        className="mb-4 max-w-full grayscale border border-white/10" 
                        alt="Uploaded artifact"
                      />
                    )}
                    {msg.content}
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex flex-col items-start">
                  <div className="text-[8px] font-mono text-white/20 uppercase mb-2 tracking-widest animate-pulse">PROCESSING_SIGNAL...</div>
                  <div className="flex gap-1">
                    {[0, 1, 2].map(j => (
                      <motion.div 
                        key={j}
                        animate={{ opacity: [0.2, 1, 0.2] }}
                        transition={{ repeat: Infinity, duration: 1, delay: j * 0.2 }}
                        className="w-1 h-4 bg-white/20"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Input Module */}
            <div className="p-4 border-t border-white/5 bg-white/[0.01]">
              <div className="relative flex flex-col gap-3">
                {attachedImage && (
                  <div className="flex items-center gap-3 p-2 bg-white/5 border border-white/10 rounded-sm">
                    <div className="w-8 h-8 bg-neutral-800 grayscale overflow-hidden">
                       <img src={`data:image/jpeg;base64,${attachedImage.data}`} className="w-full h-full object-cover" />
                    </div>
                    <span className="text-[9px] font-mono text-white/40 uppercase">Artifact_Loaded.bin</span>
                    <button onClick={() => setAttachedImage(null)} className="ml-auto text-white/20 hover:text-white transition-colors">×</button>
                  </div>
                )}
                
                <div className="flex gap-2">
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    aria-label="Upload artifact"
                    className="w-12 h-12 flex items-center justify-center border border-white/10 text-white/40 hover:text-white hover:border-white transition-all bg-white/5"
                  >
                    <span className="text-xl">+</span>
                  </button>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*" 
                    onChange={handleImageUpload} 
                  />
                  
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="COMMAND_INPUT..."
                    className="flex-grow bg-white/5 border border-white/10 px-4 text-[11px] font-mono tracking-wider text-white placeholder:text-white/10 focus:outline-none focus:border-white/30 transition-all uppercase"
                  />
                  
                  <button
                    onClick={handleSendMessage}
                    disabled={isLoading}
                    aria-label="Send signal"
                    className="w-12 h-12 flex items-center justify-center bg-white text-black hover:bg-neutral-200 transition-all disabled:opacity-50"
                  >
                    <span className="rotate-[-45deg] translate-x-[2px] translate-y-[-2px] tracking-tighter">→</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open AI Lab Assistant"
        className="w-14 h-14 bg-white text-black flex items-center justify-center shadow-2xl relative group overflow-hidden"
      >
        <motion.div 
          className="absolute inset-0 bg-neutral-200 translate-y-full group-hover:translate-y-0 transition-transform duration-500"
        />
        <div className="relative z-10 flex flex-col items-center">
          <span className="text-[10px] font-bold tracking-tighter leading-none mb-0.5">LAB</span>
          <div className={`w-1 h-1 rounded-full ${isOpen ? 'bg-black animate-pulse' : 'bg-black/30'}`} />
        </div>
      </button>
    </div>
  );
};

export default LabAssistant;