import React from 'react';

interface RedactedTextProps {
  text: string;
  delay?: number;
}

const RedactedText: React.FC<RedactedTextProps> = ({ text, delay = 0 }) => {
  return (
    <span className="relative inline-block group cursor-help">
      <span className="relative z-10 text-transparent bg-white group-hover:bg-transparent group-hover:text-white transition-all duration-700 ease-in-out select-none">
        {text}
      </span>
      <span className="absolute inset-0 bg-white group-hover:w-0 transition-all duration-700 ease-in-out"></span>
      <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 text-white select-text">
        {text}
      </span>
    </span>
  );
};

export default RedactedText;