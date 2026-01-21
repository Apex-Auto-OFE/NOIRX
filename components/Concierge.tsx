import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { sendMessageToGemini } from '../services/geminiService';
import Reveal from './Reveal';
import { useTypewriter } from '../hooks/useTypewriter';

// Component to render individual message bubbles with typewriter effect
const TypewriterMessage: React.FC<{ text: string, role: string }> = ({ text, role }) => {
    // Only animate model messages
    const { displayedText } = useTypewriter(text, 20);
    const content = role === 'model' ? displayedText : text;
    
    return (
        <p className="font-mono text-xs md:text-sm tracking-wide">
            {content}
            {role === 'model' && content.length < text.length && <span className="animate-blink inline-block w-1.5 h-3 bg-white ml-1 align-middle"></span>}
        </p>
    );
};

// Fake Audio Visualizer
const Visualizer: React.FC<{ active: boolean }> = ({ active }) => {
    return (
        <div className="flex items-center gap-1 h-4">
            {[...Array(5)].map((_, i) => (
                <div 
                    key={i} 
                    className={`w-1 bg-white transition-all duration-100 ${active ? 'animate-pulse' : 'h-1 opacity-20'}`}
                    style={{ 
                        height: active ? `${Math.random() * 16 + 4}px` : '2px',
                        animationDelay: `${i * 0.1}s`
                    }}
                ></div>
            ))}
        </div>
    );
}

const Concierge: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init',
      role: 'model',
      text: 'Identity verified. I am Vanguard. How may I assist your strategy today?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const responseText = await sendMessageToGemini(messages, input);

    const modelMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, modelMsg]);
    setLoading(false);
  };

  return (
    <section className="py-48 px-6 bg-transparent flex justify-center border-t border-white/5 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      <div className="absolute bottom-0 right-0 w-1/2 h-px bg-gradient-to-l from-transparent via-white/10 to-transparent"></div>

      <div className="max-w-4xl w-full relative z-10">
        <Reveal className="text-center mb-20">
          <h2 className="text-white text-4xl font-serif mb-4">The Vanguard Interface</h2>
          <p className="text-neutral-500 text-[10px] uppercase tracking-[0.4em] font-mono">Secure Connection • Gemini 3.0 Protocol</p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="border border-white/10 bg-black/40 shadow-2xl shadow-black backdrop-blur-sm relative overflow-hidden">
             {/* Decorative Corners */}
             <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white"></div>
             <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white"></div>
             <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white"></div>
             <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white"></div>

            {/* Header of Chat */}
            <div className="flex justify-between items-center p-6 border-b border-white/5 bg-white/[0.02]">
              <div className="flex items-center space-x-4">
                <Visualizer active={loading} />
                <span className="text-white/60 text-[9px] font-mono tracking-[0.2em] uppercase">Status: {loading ? 'PROCESSING' : 'IDLE'}</span>
              </div>
              <span className="text-white/20 text-[9px] font-mono tracking-[0.2em]">ENC: AES-256</span>
            </div>

            {/* Chat Area */}
            <div 
              ref={scrollRef}
              className="h-[500px] overflow-y-auto p-8 space-y-12 scroll-smooth bg-transparent"
            >
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                >
                  <div 
                    className={`max-w-[80%] p-6 text-sm font-light leading-relaxed border backdrop-blur-md relative ${
                      msg.role === 'user' 
                        ? 'bg-white/5 text-white border-white/20 rounded-bl-xl' 
                        : 'bg-black/20 text-neutral-300 border-l-2 border-white/30 pl-6 border-y-0 border-r-0'
                    }`}
                  >
                    <TypewriterMessage text={msg.text} role={msg.role} />
                    <span className="block mt-4 text-[9px] opacity-30 font-mono uppercase tracking-widest text-right md:text-left">
                      {msg.role === 'model' ? 'VANGUARD' : 'CLIENT'} // {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start animate-pulse">
                   <div className="bg-transparent text-white/50 p-4 pl-0 text-[10px] font-mono flex items-center gap-3">
                      <span className="w-1 h-1 bg-white"></span>
                      <span className="tracking-[0.2em]">COMPUTING_STRATEGY...</span>
                   </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-0 border-t border-white/10 bg-black/60 flex relative">
              <span className="absolute left-6 top-1/2 -translate-y-1/2 text-white/30 font-mono text-xs">{'>'}</span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Enter command..."
                className="flex-1 bg-transparent text-white py-6 pl-12 pr-6 focus:outline-none font-mono text-xs tracking-wider placeholder-white/10 uppercase cursor-none"
              />
              <button
                onClick={handleSend}
                disabled={loading}
                className="px-10 py-2 bg-white text-black text-[9px] font-bold uppercase tracking-[0.25em] hover:bg-neutral-300 transition-colors disabled:opacity-50 border-l border-white/10 cursor-hover relative overflow-hidden group"
              >
                <span className="relative z-10">Execute</span>
                <div className="absolute inset-0 bg-neutral-200 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Concierge;