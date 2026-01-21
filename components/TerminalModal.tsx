import React, { useState, useEffect, useRef } from 'react';

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TerminalModal: React.FC<TerminalModalProps> = ({ isOpen, onClose }) => {
  const [lines, setLines] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [stage, setStage] = useState<'init' | 'input' | 'success'>('init');
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setLines([]);
      setStage('init');
      setInput('');
      
      const bootSequence = [
        "ESTABLISHING SECURE CONNECTION...",
        "HANDSHAKE PROTOCOL: INITIATED",
        "VERIFYING ENCRYPTION KEYS...",
        "ACCESS GRANTED.",
        "WELCOME TO VANGUARD REQUEST CHANNEL."
      ];

      let delay = 0;
      bootSequence.forEach((line, index) => {
        delay += 500 + Math.random() * 500;
        setTimeout(() => {
          setLines(prev => [...prev, line]);
          if (index === bootSequence.length - 1) {
            setStage('input');
            setTimeout(() => inputRef.current?.focus(), 100);
          }
        }, delay);
      });
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLines(prev => [...prev, `> ${input}`]);
    setInput('');
    setStage('init'); // temporarily lock

    setTimeout(() => {
      setLines(prev => [...prev, "TRANSMITTING DATA PACKAGE...", "PACKET SENT.", "AN AGENT WILL CONTACT YOU IF YOU MEET THE CRITERIA."]);
      setStage('success');
      setTimeout(onClose, 4000);
    }, 800);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-black border border-white/20 shadow-2xl relative overflow-hidden flex flex-col h-[60vh]">
        
        {/* Header */}
        <div className="bg-white/5 border-b border-white/10 p-2 flex items-center justify-between px-4">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/50 cursor-pointer hover:bg-red-500" onClick={onClose}></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
          </div>
          <div className="text-[10px] font-mono text-white/30 tracking-widest uppercase">SECURE_SHELL v1.0</div>
        </div>

        {/* Body */}
        <div className="flex-1 p-6 font-mono text-sm text-green-500 overflow-y-auto" onClick={() => inputRef.current?.focus()}>
          {lines.map((line, i) => (
            <div key={i} className="mb-2 tracking-wide leading-relaxed">{line}</div>
          ))}
          
          {stage === 'input' && (
            <form onSubmit={handleSubmit} className="flex mt-4">
              <span className="mr-2 text-white">{'>'}</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-white caret-green-500"
                autoFocus
                placeholder="ENTER EMAIL OR CODE..."
              />
            </form>
          )}
          <div ref={bottomRef}></div>
        </div>

        {/* Footer Decor */}
        <div className="p-2 border-t border-white/10 flex justify-between text-[9px] text-white/20 font-mono uppercase">
             <span>MEM: 64TB</span>
             <span>CPU: QUANTUM</span>
        </div>
      </div>
    </div>
  );
};

export default TerminalModal;