import React, { useState, useRef } from 'react';

/**
 * Institutional Tooltip component for IPSUR EDUCORE
 * Renders a lightweight, high-contrast, elegant tooltip on hover and focus.
 */
export default function Tooltip({ 
  children, 
  text, 
  position = 'top',
  maxWidth = 'max-w-xs',
  delay = 120,
  className = ''
}) {
  const [isVisible, setIsVisible] = useState(false);
  const timerRef = useRef(null);

  if (!text) return children;

  const handleMouseEnter = () => {
    timerRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsVisible(false);
  };

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2'
  };

  const arrowClasses = {
    top: 'top-full left-1/2 -translate-x-1/2 border-t-[#0A0D1B] border-x-transparent border-b-transparent',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-[#0A0D1B] border-x-transparent border-t-transparent',
    left: 'left-full top-1/2 -translate-y-1/2 border-l-[#0A0D1B] border-y-transparent border-r-transparent',
    right: 'right-full top-1/2 -translate-y-1/2 border-r-[#0A0D1B] border-y-transparent border-l-transparent'
  };

  return (
    <div 
      className={`relative inline-flex items-center ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
    >
      {children}
      {isVisible && (
        <div 
          role="tooltip"
          className={`absolute z-[100] px-3 py-1.5 text-[11px] font-medium text-white bg-[#0A0D1B]/95 backdrop-blur-md rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.5)] border border-ipsur-pink-500/40 pointer-events-none transition-all duration-150 animate-in fade-in zoom-in-95 text-center leading-tight whitespace-normal ${maxWidth} ${positionClasses[position] || positionClasses.top}`}
        >
          {text}
          <div className={`absolute w-0 h-0 border-4 ${arrowClasses[position] || arrowClasses.top}`} />
        </div>
      )}
    </div>
  );
}
