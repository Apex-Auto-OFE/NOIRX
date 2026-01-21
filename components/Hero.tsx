import React, { useEffect, useState } from 'react';
import { useTypewriter } from '../hooks/useTypewriter';
import GlitchText from './GlitchText';

const Hero: React.FC = () => {
  const [offset, setOffset] = useState(0);
  const { displayedText } = useTypewriter("THE INVISIBLE HAND", 100, 1500);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-transparent">
      {/* Background with Parallax */}
      <div 
        className="absolute inset-0 z-0 opacity-30 select-none pointer-events-none transition-transform duration-75 ease-linear"
        style={{ transform: `scale(1.1) translateY(${offset * 0.3}px)` }}
      >
        <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
            alt="Monolith" 
            className="w-full h-full object-cover grayscale brightness-[0.4] contrast-[1.2]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/80"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,1)_100%)]"></div>
        
        {/* Scanner Effect */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-white/30 shadow-[0_0_20px_rgba(255,255,255,0.5)] animate-[scan_5s_ease-in-out_infinite]"></div>
      </div>

      {/* Vertical Guides */}
      <div className="absolute inset-0 max-w-7xl mx-auto border-x border-white/[0.03] pointer-events-none z-10"></div>
      <div className="absolute inset-0 w-px bg-white/[0.05] left-1/2 -translate-x-1/2 pointer-events-none z-10"></div>

      {/* Content */}
      <div className="z-20 text-center max-w-6xl px-4 flex flex-col items-center">
        <div className="h-8 mb-8 flex items-center">
          <h2 className="text-white/40 text-[9px] md:text-[11px] uppercase tracking-[0.8em] font-sans font-medium">
            {displayedText}
            <span className="animate-blink text-white ml-2">_</span>
          </h2>
        </div>
        
        <div className="relative mb-12 mix-blend-lighten animate-slide-up" style={{ animationDelay: '0.5s' }}>
            <h1 className="text-6xl md:text-8xl lg:text-[11rem] font-serif text-white tracking-tighter leading-[0.85]">
                <GlitchText text="SILENCE" /> IS <br/> 
            </h1>
            <span className="text-6xl md:text-8xl lg:text-[11rem] font-serif italic font-extralight text-white/90 leading-[0.85]">
                <GlitchText text="STRATEGY" speed={50} />
            </span>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-6 animate-fade-in pb-12 cursor-hover group" style={{ animationDelay: '1.2s' }}>
        <span className="text-[9px] uppercase tracking-[0.4em] text-white/30 group-hover:text-white transition-colors duration-500">Scroll</span>
        <div className="w-[1px] h-24 bg-gradient-to-b from-white/50 via-white/20 to-transparent relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-white animate-[slideUp_2s_infinite]"></div>
        </div>
      </div>
      <style>{`
        @keyframes scan {
            0% { top: -10%; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { top: 110%; opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default Hero;