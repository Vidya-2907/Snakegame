import React from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
}

export const GlitchText: React.FC<GlitchTextProps> = ({ text, className = '' }) => {
  return (
    <span 
      className={`glitch-text-raw ${className}`} 
      data-text={text}
      id={`glitch-${text.replace(/\s+/g, '-').toLowerCase()}`}
    >
      {text}
    </span>
  );
};
