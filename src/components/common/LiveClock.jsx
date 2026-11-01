import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Sparkles } from 'lucide-react';

export default function LiveClock({ variant = 'executive', className = '' }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // Tick every second in real time
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format date in Spanish: "Sábado, 31 de octubre de 2026"
  const formattedDay = time.toLocaleDateString('es-MX', { weekday: 'long' });
  const formattedDayCapitalized = formattedDay.charAt(0).toUpperCase() + formattedDay.slice(1);
  const formattedDate = time.toLocaleDateString('es-MX', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
  const formattedFullDate = time.toLocaleDateString('es-MX', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  // Time in 12h format with AM/PM (p. m. / a. m.)
  const formattedTime12 = time.toLocaleTimeString('es-MX', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });

  if (variant === 'topbar') {
    return (
      <div className={`flex items-center gap-2 sm:gap-2.5 bg-black/25 hover:bg-black/35 px-3 py-1 rounded-full border border-white/15 shadow-inner text-[10px] sm:text-[11px] text-white transition ${className}`}>
        <span className="relative flex h-2 w-2 flex-shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <div className="flex items-center gap-1.5 font-sans">
          <Calendar className="w-3 h-3 text-pink-300" />
          <span className="font-semibold text-white/95">{formattedDayCapitalized}, {formattedDate}</span>
        </div>
        <span className="text-white/40">•</span>
        <div className="flex items-center gap-1.5 font-mono">
          <Clock className="w-3 h-3 text-pink-300" />
          <span className="font-black text-pink-200 tracking-wider">{formattedTime12}</span>
        </div>
      </div>
    );
  }

  if (variant === 'hero') {
    return (
      <div className={`bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/15 px-4 py-2 rounded-2xl flex items-center gap-3 shadow-sm transition ${className}`}>
        <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
        </span>
        <div>
          <div className="flex items-center gap-1.5 text-[11px] text-indigo-200 font-medium">
            <Calendar className="w-3 h-3 text-pink-300" />
            <span>{formattedDayCapitalized}, {formattedFullDate}</span>
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="font-mono text-base sm:text-lg font-black text-white tracking-wider">
              {formattedTime12}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 bg-emerald-500/25 px-1.5 py-0.2 rounded border border-emerald-400/40">
              Tiempo Real
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Default: 'executive' (for the main navbar)
  return (
    <div className={`hidden md:flex items-center gap-3 px-3.5 py-1.5 rounded-2xl bg-gradient-to-b from-slate-50 to-white border border-slate-200/90 shadow-sm ${className}`}>
      <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
      </span>
      <div className="text-left leading-tight">
        <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-slate-500 tracking-wider">
          <Calendar className="w-3 h-3 text-ipsur-pink-600" />
          <span>{formattedDayCapitalized}, {formattedDate}</span>
        </div>
        <div className="flex items-center gap-2 mt-0.5 font-mono">
          <Clock className="w-3.5 h-3.5 text-ipsur-navy-700" />
          <span className="text-xs sm:text-sm font-black text-slate-900 tracking-wider">
            {formattedTime12}
          </span>
          <span className="text-[9px] font-bold text-emerald-800 bg-emerald-100/80 px-1.5 py-0.2 rounded-full border border-emerald-300">
            En Vivo
          </span>
        </div>
      </div>
    </div>
  );
}
