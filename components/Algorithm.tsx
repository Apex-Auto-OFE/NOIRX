import React, { useEffect, useState, useRef } from 'react';
import Reveal from './Reveal';

const Algorithm: React.FC = () => {
  const [lines, setLines] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dataStream = [
      "INITIALIZING VANGUARD_CORE...",
      "LOADING NEURAL_WEIGHTS [v9.2]...",
      "ANALYZING MARKET_SENTIMENT... COMPLETE",
      "DETECTING ANOMALIES IN SECTOR 7G...",
      "OPTIMIZING ASSET ALLOCATION...",
      "CROSS-REFERENCING GEOPOLITICAL VECTORS...",
      "SIMULATING OUTCOMES (n=1,000,000)...",
      "RISK_ASSESSMENT: MINIMAL",
      "OPPORTUNITY_INDEX: 98.4%",
      "EXECUTING SHADOW_TRADE...",
      "UPDATING LEDGER...",
      "ENCRYPTING TRAFFIC...",
      "WAITING FOR INPUT..."
    ];

    let index = 0;
    const interval = setInterval(() => {
      setLines(prev => {
        const newLines = [...prev, dataStream[index % dataStream.length]];
        if (newLines.length > 15) newLines.shift();
        return newLines;
      });
      index++;
    }, 800);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  return (
    <section className="py-32 bg-transparent border-t border-white/5 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative z-10">
        
        <Reveal>
          <div className="relative backdrop-blur-md bg-black/60 p-8 border border-white/10 rounded-sm shadow-2xl">
            <h4 className="text-[10px] font-mono uppercase tracking-[0.3em] text-emerald-500 mb-6">Proprietary Technology</h4>
            <h2 className="text-4xl md:text-6xl font-serif text-white mb-8 leading-none">
              The Black Box <br/> Advantage
            </h2>
            <p className="text-neutral-400 text-sm font-light leading-relaxed mb-8">
              Decisions are no longer made by intuition alone. Our proprietary 'Vanguard' engine processes 
              trillions of data points in real-time, identifying market shifts before they manifest in the public domain.
            </p>
            <ul className="space-y-4">
              {['Predictive Modeling', 'Sentiment Analysis', 'High-Frequency Execution'].map((item, i) => (
                <li key={i} className="flex items-center text-xs font-mono text-white tracking-wider">
                  <span className="w-1.5 h-1.5 bg-white mr-4"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.2} className="relative h-[400px] bg-[#050505]/90 border border-white/10 p-6 font-mono text-xs overflow-hidden group shadow-2xl">
            {/* Terminal Window */}
            <div className="absolute top-0 left-0 w-full h-8 bg-white/5 border-b border-white/5 flex items-center px-4 gap-2">
                <div className="w-2 h-2 rounded-full bg-white/20"></div>
                <div className="w-2 h-2 rounded-full bg-white/20"></div>
                <div className="ml-auto text-[9px] text-white/30 uppercase tracking-widest">v.3.0.1 (Stable)</div>
            </div>
            
            <div ref={scrollRef} className="mt-8 h-full overflow-hidden flex flex-col justify-end pb-4">
                {lines.map((line, i) => (
                    <div key={i} className="mb-2 text-white/60 font-light tracking-wide">
                        <span className="text-emerald-500/50 mr-4">[{new Date().toLocaleTimeString()}]</span>
                        {line}
                    </div>
                ))}
                <div className="animate-pulse text-emerald-500">_</div>
            </div>

            {/* Scanline Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_4px] pointer-events-none opacity-20"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent h-[10%] animate-[scan_3s_linear_infinite] pointer-events-none"></div>
        </Reveal>

      </div>
    </section>
  );
};

export default Algorithm;