import React, { useState, useEffect } from 'react';
import { Sparkles, ShieldCheck } from 'lucide-react';

export default function AppSplashScreen({ onFinish }) {
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Splash screen visible for 1.8 seconds, then 300ms fade-out
    const timer = setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(() => {
        if (onFinish) onFinish();
      }, 350);
    }, 1800);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div 
      className={`fixed inset-0 z-[100000] flex flex-col items-center justify-center bg-[#060814] text-white transition-opacity duration-300 select-none overflow-hidden ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-indigo-600/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-ipsur-pink-600/20 rounded-full blur-[100px] pointer-events-none" />

      {/* Central Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 animate-splash-fade-in">
        
        {/* Animated App Icon with Pulsing Ambient Ring */}
        <div className="relative mb-6">
          {/* Glowing expanding pulse rings */}
          <div className="absolute -inset-3 rounded-3xl bg-gradient-to-r from-ipsur-pink-500/30 to-indigo-500/30 blur-xl animate-pulse" />
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-ipsur-pink-500/40 via-purple-500/40 to-indigo-500/40 opacity-70 animate-ping duration-1000" />

          {/* Icon Box */}
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-white/20 bg-[#070B1E] p-1">
            <img 
              src="/icon-512.png" 
              alt="IPSUR EDUCORE" 
              className="w-full h-full object-cover rounded-[22px] transform transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>

        {/* Brand Typography with Animated Gradient Sheen */}
        <h1 className="font-display font-black text-2xl sm:text-3xl text-white tracking-wider">
          IPSUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-pink-300 to-indigo-300">EDUCORE</span>
        </h1>

        <p className="text-xs sm:text-sm text-slate-400 font-medium mt-1 tracking-wide">
          Campus Virtual & Sistema Académico
        </p>

        {/* Micro Accreditation Badge */}
        <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] text-pink-200 font-bold">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Instituto Peninsular del Sur · RVOE SEP</span>
        </div>

        {/* Sleek Bottom Loading Line */}
        <div className="mt-8 w-44 h-1 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-indigo-500 via-ipsur-pink-500 to-emerald-400 rounded-full animate-splash-progress" />
        </div>

        <p className="text-[10px] text-slate-500 font-mono mt-2 animate-pulse">
          Iniciando plataforma educativa...
        </p>
      </div>

      {/* Embedded Animation Styles */}
      <style>{`
        @keyframes splashFadeIn {
          0% {
            opacity: 0;
            transform: scale(0.92);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes splashProgress {
          0% { width: 0%; transform: translateX(-100%); }
          50% { width: 70%; transform: translateX(20%); }
          100% { width: 100%; transform: translateX(0); }
        }
        .animate-splash-fade-in {
          animation: splashFadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-splash-progress {
          animation: splashProgress 1.6s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
}
