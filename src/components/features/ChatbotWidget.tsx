import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Loader2 } from 'lucide-react';
import { httpsCallable } from 'firebase/functions';
import { functions } from '../../config/firebase';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hello! I am your LLSA assistant. How can I assist you with tournaments, Ludo4Schools, or custom board purchases today?' }
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    
    const historyToSend = messages.map(msg => ({
      role: msg.role,
      content: msg.content
    }));

    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      if (!functions) {
        throw new Error('Chat service unavailable');
      }
      const chatFn = httpsCallable(functions, 'ludoLeagueChatBot');
      const result = await chatFn({ message: userMessage, history: historyToSend }) as any;
      const botReply = result?.data?.reply || 'Pardon me, I encountered a communication delay. Please try again.';
      setMessages(prev => [...prev, { role: 'assistant', content: botReply }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Connection timed out. Please check your network and try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-[340px] sm:w-[380px] h-[480px] bg-[#1E293B]/95 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden mb-4"
          >
            <div className="bg-[#2C3E50] p-4 border-b border-slate-700 flex items-center justify-between text-white">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden bg-slate-800">
                  <img src="https://res.cloudinary.com/dfzeb1s54/image/upload/q_auto/f_auto/v1782024034/GoldDiceHero_1_kusjkg.png" alt="Bot Icon" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-black font-display italic">League Assistant</h4>
                  <span className="text-[9px] text-[#00f0c2] font-bold">Online</span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-slate-800 rounded-lg transition-colors"><X size={18} /></button>
            </div>
            
            <div ref={scrollRef} className="flex-grow p-4 overflow-y-auto space-y-3.5 text-xs">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-xl leading-relaxed ${msg.role === 'user' ? 'bg-[#FFD700] text-slate-950 rounded-tr-none font-semibold' : 'bg-slate-800 text-slate-100 rounded-tl-none'}`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-slate-800 text-slate-100 p-3 rounded-xl rounded-tl-none flex items-center gap-2">
                    <Loader2 size={14} className="animate-spin text-amber-500" />
                    Thinking...
                  </div>
                </div>
              )}
            </div>
            
            <form onSubmit={handleSend} className="p-3 border-t border-slate-700 bg-slate-900/50 flex gap-2">
              <input required type="text" placeholder="Type your message..." value={input} onChange={e => setInput(e.target.value)} className="flex-grow bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-xs outline-none focus:border-amber-500 transition-colors" />
              <button type="submit" disabled={loading || !input.trim()} className="p-2.5 bg-[#FFD700] hover:bg-white text-slate-950 rounded-xl transition-all shadow-md flex items-center justify-center disabled:opacity-50"><Send size={14} /></button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      <button onClick={() => setIsOpen(!isOpen)} className="w-14 h-14 bg-slate-900 hover:scale-105 text-white rounded-full flex items-center justify-center shadow-2xl transition-all border border-amber-400 overflow-hidden">
        <img src="https://res.cloudinary.com/dfzeb1s54/image/upload/q_auto/f_auto/v1782024034/GoldDiceHero_1_kusjkg.png" alt="Chat" className="w-full h-full object-cover" />
      </button>
    </div>
  );
};
