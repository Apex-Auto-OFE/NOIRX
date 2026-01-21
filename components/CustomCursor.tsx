import React, { useEffect, useState } from 'react';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
      
      // Check if hovering over a clickable element
      const target = e.target as HTMLElement;
      const clickable = target.closest('a, button, input, .cursor-hover');
      setIsHovering(!!clickable);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', updateCursor);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', updateCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* The trailing circle */}
      <div 
        className="fixed pointer-events-none z-[9999] rounded-full border border-white transition-transform duration-300 ease-out mix-blend-difference"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: isHovering ? '64px' : '32px',
          height: isHovering ? '64px' : '32px',
          transform: `translate(-50%, -50%)`,
          backgroundColor: isHovering ? 'rgba(255,255,255,0.1)' : 'transparent',
          borderColor: isHovering ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.3)',
        }}
      />
      {/* The center dot */}
      <div 
        className="fixed pointer-events-none z-[9999] rounded-full bg-white transition-all duration-100 ease-out mix-blend-difference"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: isHovering ? '8px' : '4px',
          height: isHovering ? '8px' : '4px',
          transform: `translate(-50%, -50%)`,
        }}
      />
    </>
  );
};

export default CustomCursor;