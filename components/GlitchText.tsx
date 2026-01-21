import React, { useRef, useState, useEffect } from 'react';

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&';

interface GlitchTextProps {
  text: string;
  className?: string;
  speed?: number;
}

const GlitchText: React.FC<GlitchTextProps> = ({ text, className = '', speed = 30 }) => {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<any>(null);
  const [isHovered, setIsHovered] = useState(false);

  const scramble = () => {
    let iteration = 0;
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      if (iteration >= text.length) {
        clearInterval(intervalRef.current);
      }

      iteration += 1 / 3;
    }, speed);
  };

  // Scramble on mount
  useEffect(() => {
    scramble();
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <span 
        onMouseEnter={() => { setIsHovered(true); scramble(); }}
        onMouseLeave={() => setIsHovered(false)}
        className={`inline-block cursor-hover relative ${className}`}
    >
      {displayText}
    </span>
  );
};

export default GlitchText;