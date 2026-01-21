import { useState, useEffect } from 'react';

export const useTypewriter = (text: string, speed: number = 50, startDelay: number = 0) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let timeoutId: any;
    
    const startTyping = () => {
      let i = 0;
      setDisplayedText('');
      setIsComplete(false);

      const typeChar = () => {
        if (i < text.length) {
          setDisplayedText(text.substring(0, i + 1));
          i++;
          timeoutId = setTimeout(typeChar, speed + (Math.random() * 20)); // Subtle random variance for realism
        } else {
          setIsComplete(true);
        }
      };
      
      typeChar();
    };

    const initialTimeout = setTimeout(startTyping, startDelay);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(initialTimeout);
    };
  }, [text, speed, startDelay]);

  return { displayedText, isComplete };
};