import React, { useState, useEffect } from 'react';
import { CheckCircle2, ShieldCheck, Sparkles, GraduationCap, BookOpen } from 'lucide-react';
import { playMsnNotificationSound } from '../../utils/soundEffects';

export default function LoginWelcomeScreen({ user, onComplete }) {
  const [step, setStep] = useState(0); // 0, 1, 2

  useEffect(() => {
    // Play celebratory welcoming sound
    playMsnNotificationSound();

    // Step progression over 3 seconds
    const timer1 = setTimeout(() => setStep(1), 1000);
    const timer2 = setTimeout(() => setStep(2), 2000);
    const timer3 = setTimeout(() => {
      if (onComplete) onComplete();
    }, 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  const isStudent = user?.role === 'student';
  const isTeacher = user?.role === 'teacher';

  return (
    <div className="fixed inset-0 z-[100000] flex flex-col items-center justify-center bg-[#060814]/98 text-white backdrop-blur-2xl select-none animate-welcome-fade-in overflow-hidden">
      
      {/* Dynamic Ambient Background Gradients */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-indigo-600/25 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-ipsur-pink-600/25 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Glassmorphic Card */}
      <div className="relative z-10 w-full max-w-sm mx-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-white/10 via-white/5 to-white/[0.02] border border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.8)] backdrop-blur-xl flex flex-col items-center text-center">
        
        {/* User Avatar with Glowing Animated Ring */}
        <div className="relative mb-4">
          <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-emerald-400 via-pink-500 to-indigo-500 opacity-75 blur-md animate-spin-slow" />
          
          <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-white/80 shadow-xl bg-slate-900 p-0.5">
            {user?.avatar ? (
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <div className="w-full h-full rounded-full bg-gradient-to-br from-indigo-700 to-ipsur-pink-600 flex items-center justify-center text-white font-bold text-xl">
                {isStudent ? <GraduationCap className="w-8 h-8" /> : isTeacher ? <BookOpen className="w-8 h-8" /> : <ShieldCheck className="w-8 h-8" />}
              </div>
            )}
          </div>

          {/* Glowing Green Online Status Badge */}
          <span className="absolute bottom-0 right-0 flex h-5 w-5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-5 w-5 bg-emerald-500 border-2 border-[#060814] shadow-md"></span>
          </span>
        </div>

        {/* Welcome Salutation */}
        <span className="text-[11px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 border border-pink-400/30 mb-2">
          {user?.title || (isStudent ? 'Estudiante' : isTeacher ? 'Docente Titular' : 'Directivo')}
        </span>

        <h2 className="font-display font-black text-xl sm:text-2xl text-white tracking-wide leading-tight">
          ¡Bienvenido(a)!
        </h2>

        <p className="font-semibold text-white/95 text-sm sm:text-base mt-1 line-clamp-1">
          {user?.name}
        </p>

        {user?.matricula && (
          <span className="text-xs text-slate-400 font-mono mt-0.5">
            Matrícula: {user.matricula}
          </span>
        )}

        {/* Step-by-Step Status Message */}
        <div className="mt-5 min-h-[36px] flex items-center justify-center gap-2 text-xs font-medium text-emerald-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 animate-pulse flex-shrink-0" />
          <span className="animate-in fade-in duration-200">
            {step === 0 && 'Validando credenciales institucionales...'}
            {step === 1 && 'Sincronizando materias y expediente...'}
            {step === 2 && 'Acceso autorizado · Abriendo Campus Virtual...'}
          </span>
        </div>

        {/* 3-Second Precision Progress Bar */}
        <div className="w-full mt-4 h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-emerald-400 via-ipsur-pink-500 to-indigo-500 rounded-full animate-welcome-progress" />
        </div>

        <div className="mt-2 text-[10px] text-slate-400 font-mono flex items-center justify-between w-full">
          <span>IPSUR EDUCORE</span>
          <span>Seguridad SSL 256-Bit</span>
        </div>
      </div>

      {/* Embedded CSS Animations */}
      <style>{`
        @keyframes welcomeFadeIn {
          0% {
            opacity: 0;
            transform: scale(0.96);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes welcomeProgress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-welcome-fade-in {
          animation: welcomeFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-welcome-progress {
          animation: welcomeProgress 3s linear forwards;
        }
        .animate-spin-slow {
          animation: spinSlow 8s linear infinite;
        }
      `}</style>
    </div>
  );
}
