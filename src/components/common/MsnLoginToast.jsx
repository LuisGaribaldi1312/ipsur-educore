import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Volume2, 
  VolumeX, 
  GraduationCap, 
  BookOpen, 
  School, 
  ShieldCheck, 
  Smartphone, 
  Laptop,
  Sparkles,
  Users
} from 'lucide-react';
import { toggleSound, getSoundStatus } from '../../utils/soundEffects';

export default function MsnLoginToast() {
  const { msnAlerts, dismissMsnAlert, currentUser } = useApp();
  const [soundActive, setSoundActive] = useState(() => getSoundStatus());

  // Auto-dismiss each MSN alert after 7 seconds
  useEffect(() => {
    if (!msnAlerts || msnAlerts.length === 0) return;
    const timers = msnAlerts.map(alert => {
      return setTimeout(() => {
        dismissMsnAlert(alert.id);
      }, 7000);
    });
    return () => {
      timers.forEach(t => clearTimeout(t));
    };
  }, [msnAlerts, dismissMsnAlert]);

  const handleToggleSound = (e) => {
    e.stopPropagation();
    const next = toggleSound();
    setSoundActive(next);
  };

  if (!msnAlerts || msnAlerts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9999] flex flex-col gap-3 max-w-[360px] sm:max-w-sm w-full pointer-events-none">
      {msnAlerts.map((alert) => {
        const isStudent = alert.userRole === 'student';
        const isTeacher = alert.userRole === 'teacher';
        const isMobile = alert.device?.toLowerCase().includes('móvil') || alert.device?.toLowerCase().includes('celular');

        return (
          <div
            key={alert.id}
            className="pointer-events-auto rounded-2xl overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.5)] border border-blue-400/30 bg-gradient-to-b from-[#0F142E] via-[#141C42] to-[#0A0E23] text-white animate-in slide-in-from-bottom-5 duration-300 backdrop-blur-xl group transition-transform hover:-translate-y-0.5"
            role="alert"
          >
            {/* Top MSN-Style Header Bar */}
            <div className="bg-gradient-to-r from-[#172354] via-[#1E2D6E] to-[#70003E] px-3.5 py-1.5 flex items-center justify-between border-b border-white/10 text-[10px] font-bold">
              <div className="flex items-center gap-1.5 text-blue-200">
                {/* Classic MSN double-people emblem representation */}
                <span className="flex items-center -space-x-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 border border-slate-900 inline-block shadow-xs" />
                  <span className="w-2 h-2 rounded-full bg-blue-300 border border-slate-900 inline-block" />
                </span>
                <span className="tracking-wide uppercase font-black text-pink-300">
                  IPSUR Messenger
                </span>
                <span className="text-white/40">•</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  En Línea
                </span>
              </div>

              <div className="flex items-center gap-1">
                {/* Sound Toggle */}
                <button
                  type="button"
                  onClick={handleToggleSound}
                  className="p-1 rounded-md text-white/70 hover:text-white hover:bg-white/10 transition cursor-pointer"
                  title={soundActive ? "Silenciar sonido MSN" : "Activar sonido MSN"}
                >
                  {soundActive ? (
                    <Volume2 className="w-3.5 h-3.5 text-pink-300" />
                  ) : (
                    <VolumeX className="w-3.5 h-3.5 text-slate-400" />
                  )}
                </button>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => dismissMsnAlert(alert.id)}
                  className="p-1 rounded-md text-white/70 hover:text-white hover:bg-white/10 transition cursor-pointer"
                  title="Cerrar aviso"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Notification Body */}
            <div className="p-3.5 flex items-start gap-3">
              {/* User Avatar with MSN Glowing Green Ring */}
              <div className="relative flex-shrink-0">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-600 to-ipsur-pink-600 p-0.5 shadow-md">
                  {alert.avatar ? (
                    <img 
                      src={alert.avatar} 
                      alt={alert.userName} 
                      className="w-full h-full object-cover rounded-[14px]"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-900/90 rounded-[14px] flex items-center justify-center text-white font-black text-sm">
                      {isStudent ? (
                        <GraduationCap className="w-6 h-6 text-pink-300" />
                      ) : isTeacher ? (
                        <BookOpen className="w-6 h-6 text-indigo-300" />
                      ) : (
                        <ShieldCheck className="w-6 h-6 text-amber-300" />
                      )}
                    </div>
                  )}
                </div>

                {/* Glowing Green Online Dot */}
                <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-slate-900 shadow-md"></span>
                </span>
              </div>

              {/* Information Text */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/10 text-pink-200 border border-white/10">
                    {alert.userTitle || (isStudent ? 'Estudiante' : isTeacher ? 'Docente' : 'Directivo')}
                  </span>
                  {alert.matricula && (
                    <span className="text-[10px] text-slate-400 font-mono">
                      {alert.matricula}
                    </span>
                  )}
                </div>

                <h4 className="font-display font-black text-white text-xs sm:text-sm mt-0.5 truncate leading-tight">
                  {alert.userName}
                </h4>

                <p className="text-[11px] text-emerald-300 font-semibold mt-0.5 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-pink-400" />
                  <span>¡Acaba de iniciar sesión!</span>
                </p>

                {/* Connection Metadata: Device + Exact Time */}
                <div className="mt-1.5 pt-1.5 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-400 font-medium">
                  <span className="flex items-center gap-1">
                    {isMobile ? (
                      <Smartphone className="w-3 h-3 text-pink-400" />
                    ) : (
                      <Laptop className="w-3 h-3 text-blue-400" />
                    )}
                    <span>{alert.device || 'Campus Web'}</span>
                  </span>

                  <span className="font-mono text-slate-300 font-bold bg-white/5 px-1.5 py-0.5 rounded border border-white/10">
                    {alert.timeString} hrs
                  </span>
                </div>
              </div>
            </div>

            {/* Animated Bottom Timer Bar */}
            <div className="h-0.5 w-full bg-white/10 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-emerald-400 via-ipsur-pink-500 to-indigo-500 animate-[msnProgress_7s_linear_forwards]"
                style={{
                  animation: 'msnProgress 7s linear forwards'
                }}
              />
            </div>
          </div>
        );
      })}

      {/* Global CSS keyframe animation for the progress bar */}
      <style>{`
        @keyframes msnProgress {
          0% { width: 100%; }
          100% { width: 0%; }
        }
      `}</style>
    </div>
  );
}
