import React, { useEffect, useState } from 'react';

const Preloader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [text, setText] = useState("INITIALIZING");

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 800); // Fade out delay
          return 100;
        }
        return prev + Math.floor(Math.random() * 5) + 1;
      });
    }, 50);

    const textInterval = setInterval(() => {
        const phrases = ["CALIBRATING STRATEGY", "VERIFYING ASSETS", "ESTABLISHING LINK", "NOIR PROTOCOL"];
        setText(phrases[Math.floor(Math.random() * phrases.length)]);
    }, 400);

    return () => {
      clearInterval(interval);
      clearInterval(textInterval);
    };
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[10000] bg-black flex flex-col items-center justify-center transition-opacity duration-700 ${progress === 100 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <div className="w-64 mb-4">
         <div className="flex justify-between text-[10px] font-mono text-white/50 mb-2 uppercase tracking-widest">
            <span>System</span>
            <span>{progress}%</span>
         </div>
         <div className="h-[1px] w-full bg-white/10 relative overflow-hidden">
            <div 
                className="absolute top-0 left-0 h-full bg-white transition-all duration-100 ease-linear" 
                style={{ width: `${progress}%` }}
            ></div>
         </div>
      </div>
      <div className="h-4">
        <p className="text-[10px] font-mono text-white/30 tracking-[0.3em] uppercase animate-pulse">
            {progress < 100 ? text : 'ACCESS GRANTED'}
        </p>
      </div>
    </div>
  );
};

export default Preloader;