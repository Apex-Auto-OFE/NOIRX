import React, { useRef } from 'react';
import { useOnScreen } from '../hooks/useOnScreen';

interface RevealProps {
  children: React.ReactNode;
  delay?: number; // in seconds
  className?: string;
  animation?: 'fade-up' | 'fade-in' | 'slide-in-right';
}

const Reveal: React.FC<RevealProps> = ({ children, delay = 0, className = '', animation = 'fade-up' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const onScreen = useOnScreen(ref, 0.15);

  const getAnimationClass = () => {
    switch (animation) {
      case 'fade-up':
        return onScreen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10';
      case 'fade-in':
        return onScreen ? 'opacity-100' : 'opacity-0';
      case 'slide-in-right':
        return onScreen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10';
      default:
        return onScreen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10';
    }
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${getAnimationClass()} ${className}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
};

export default Reveal;