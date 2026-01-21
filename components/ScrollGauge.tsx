import React, { useEffect, useState } from 'react';

const ScrollGauge: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-1/2 left-8 -translate-y-1/2 hidden md:flex flex-col items-center gap-4 z-[90] mix-blend-difference pointer-events-none select-none">
      <div className="text-[9px] font-mono text-white/50 writing-vertical-lr rotate-180 tracking-widest uppercase mb-2">
        Depth Status
      </div>
      
      {/* The Gauge Track */}
      <div className="w-[1px] h-64 bg-white/10 relative">
        {/* The Indicator */}
        <div 
            className="absolute left-1/2 -translate-x-1/2 w-1 bg-white transition-all duration-100 ease-out"
            style={{ 
                height: `${Math.max(scrollProgress, 5)}%`, // Minimum height visual
                top: 0
            }}
        ></div>
        
        {/* Tick Marks */}
        {[0, 25, 50, 75, 100].map((tick) => (
            <div 
                key={tick} 
                className="absolute left-1/2 -translate-x-1/2 w-3 h-[1px] bg-white/30"
                style={{ top: `${tick}%` }}
            ></div>
        ))}
      </div>

      <div className="text-[9px] font-mono text-white tracking-widest tabular-nums">
        {Math.round(scrollProgress).toString().padStart(3, '0')}%
      </div>
    </div>
  );
};

export default ScrollGauge;