import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Bot, Loader2 } from 'lucide-react';
import { httpsCallable } from 'firebase/functions';
import { functions } from '../../config/firebase';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const SYSTEM_PROMPT_TEMPLATE = `You are the official smart digital assistant for The Ludo League South Africa (LLSA).

YOUR EXHAUSTIVE KNOWLEDGE BASE BY PAGE:

1. ABOUT & CORE IDENTITY
- Core Mission: Centralized in Pretoria, LLSA elevates Ludo from a township pastime to a professional athletic sport. Combines competitive play on physical boards with modern digital scaling.
- Leadership: Founder and President Joe Setladi, Finance Executive Matebatso (Tibi) Matheta, Operations Executive Masego Baloyi, Head of Design Bernard Makama.
- Tournaments & Clinics: Create vibrant, positive spaces to learn, compete, and grow. Clinics introduce new players to fundamentals, while tournaments showcase talent. These events stimulate local township economies, creating opportunities for facilitators, judges/referees, and small businesses.
- Offline Footprint: Establishes a permanent, ambient presence directly in grassroots social hubs, including local parks and community halls.

2. STANDARDISED PLAY DISPUTES FRAMEWORK
Below are the official dispute categories recognized by the league:
- A. Dice Roll Disputes: Dice falling off the board, not shaken properly, rolling with two hands, or rolling before opponent finishes moving.
- B. Touch Disputes ("Touch is a Move"): Player touching a token and trying to move another, opponent touching the board/tokens during your turn, or touching the dice before the opponent finishes playing.
- C. Token Movement Disputes: Incorrect counting, illegal splitting of married tokens, moving out of order, or moving without an exact number.
- D. Capture Disputes: Disputing whether a capture was legal, token moved incorrectly before capture, or capture was missed/ignored.
- E. Time-Wasting Disputes: Intentionally delaying moves, repeatedly asking unnecessary questions, or refusing to roll.
- F. Coaching & Interference: Coaching during active play, spectator interference, or manager gestures/signals.
- G. Behavioural Misconduct: Inappropriate language, aggression, touching opponent's tokens, wearing unapproved brands, or substance use.
- H. Venue & Environmental: Poor lighting, unsafe environment, or noise interference.

3. LEAGUES & REGIONAL HUBS
- Soweto Ludo League (Est. 2022): Hosted in one of the largest and most iconic townships. Rich in history, Ludo has found a natural home among the people of Soweto.
- Mamelodi Ludo League (Est. Feb 2019): Pretoria region.
- Battle of the Kasis (BOTK): Soweto vs Alexandra vs Mamelodi Knockout. The ultimate township showdown—a high-stakes, winner-takes-all knockout tournament. Rivalries are ignited, champions are crowned, and legends are born.

4. HISTORY TIMELINE & CHAMPIONS
- 2013 Foundation: Started as a community tournament in Alexandra, Johannesburg.
- 2017 Regional Circuit: Expanded across Gauteng with professional rules.
- 2019 League Evolution: Developed into a professional Local League format.
- 2019 Champion: Kea Mdawe representing Mamelodi.
- 2024 Champion: Thabo 'The Dice' Nkosi (Alexandra Club, 9-1 record).

5. SHOP & DONATION PORTALS
- Official Boards: Premium wooden boards (Royal Purple, Classic Teal, Amber Orange, Obsidian Black, Electric Blue) constructed from heavy-duty 3mm/6mm MDF/Perspex, retailing at R1200.00 (reduced from R1500.00).
- Supporter Donations: Contributions start from as little as R20.00. Support is tracked dynamically. Supporter totals adding up to R500.00 or more are eligible to receive a special Gift.
- Corporate Sponsorship & Investments: Sponsors can back tournaments or the league. Corporate investors can request an offline phone consultation by submitting an Investment Callback Request with their contact details.

RULES:
1. Base all answers strictly on your Knowledge Base. If a query is outside this scope, politely guide them to check ludoleague.co.za.
2. Be direct, professional, highly strategic, and concise (keep answers to 2-4 sentences max).
3. STRICT TEXT FORMATTING RULE: NEVER use asterisks, hash symbols, or any markdown syntax for text styling. Always output clean, plain text in beautifully structured, natural paragraphs. Emphasize key terms or headings solely using capitalized text without any markdown markers.`;

export const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hello! I am your Ludo League assistant. How can I help you compete, purchase boards, or back our community fund today?' }
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
      role: msg.role === 'assistant' ? 'assistant' : 'user',
      content: msg.content
    }));

    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
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
                <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center text-slate-950 font-black"><Bot size={18} /></div>
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

      <button onClick={() => setIsOpen(!isOpen)} className="w-14 h-14 bg-[#FFD700] hover:bg-white hover:scale-105 text-slate-950 rounded-full flex items-center justify-center shadow-2xl transition-all border border-amber-400">
        <MessageSquare size={24} />
      </button>
    </div>
  );
};
