import React, { useState, useEffect } from 'react';

const SystemStatus: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    
    const handleMouseMove = (e: MouseEvent) => {
      setCoords({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      clearInterval(timer);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-[100] hidden md:flex flex-col items-end pointer-events-none mix-blend-difference select-none">
      <div className="flex flex-col items-end space-y-1 text-[9px] font-mono text-white/50 tracking-widest uppercase">
        <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
            <span>VANGUARD_OS v4.0.2</span>
        </div>
        <div>
            SESSION: <span className="text-white">{Math.random().toString(36).substring(7).toUpperCase()}</span>
        </div>
        <div>
            LATENCY: <span className="text-white">{Math.floor(Math.random() * 20) + 10}ms</span>
        </div>
        <div>
            COORDS: <span className="text-white">{coords.x.toString().padStart(4, '0')} : {coords.y.toString().padStart(4, '0')}</span>
        </div>
        <div className="pt-2 border-t border-white/20 mt-2 w-24 text-right">
            {time.toLocaleTimeString([], { hour12: false })} UTC
        </div>
      </div>
    </div>
  );
};

export default SystemStatus;