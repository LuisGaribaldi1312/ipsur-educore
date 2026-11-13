import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Volume2, 
  VolumeX, 
  GraduationCap, 
  BookOpen, 
  ShieldCheck, 
  Smartphone, 
  Laptop
} from 'lucide-react';
import { toggleSound, getSoundStatus } from '../../utils/soundEffects';

export default function MsnLoginToast() {
  const { msnAlerts, dismissMsnAlert } = useApp();
  const [soundActive, setSoundActive] = useState(() => getSoundStatus());

  // Strictly auto-dismiss after exactly 3 seconds as requested
  useEffect(() => {
    if (!msnAlerts || msnAlerts.length === 0) return;
    const timers = msnAlerts.map(alert => {
      return setTimeout(() => {
        dismissMsnAlert(alert.id);
      }, 3000);
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
    <div className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-[9999] flex flex-col gap-2 max-w-[310px] sm:max-w-[325px] w-full pointer-events-none">
      {msnAlerts.map((alert) => {
        const isStudent = alert.userRole === 'student';
        const isTeacher = alert.userRole === 'teacher';
        const isMobile = alert.device?.toLowerCase().includes('móvil') || alert.device?.toLowerCase().includes('celular');

        return (
          <div
            key={alert.id}
            className="pointer-events-auto rounded-xl overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.5)] border border-white/15 bg-[#090D1E]/95 backdrop-blur-xl text-white transform transition-all duration-300 ease-out hover:-translate-y-0.5 animate-msn-slide-in"
            role="alert"
          >
            {/* Top Compact MSN-Style Bar */}
            <div className="bg-gradient-to-r from-[#101838] via-[#172250] to-[#5C0034] px-2.5 py-1 flex items-center justify-between border-b border-white/10 text-[10px]">
              <div className="flex items-center gap-1.5">
                {/* Dual MSN dots */}
                <span className="flex items-center -space-x-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 border border-slate-900 inline-block shadow-xs" />
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-300 border border-slate-900 inline-block" />
                </span>
                <span className="tracking-wide uppercase font-black text-[9px] text-pink-300">
                  IPSUR Messenger
                </span>
                <span className="text-white/30">•</span>
                <span className="text-emerald-400 font-semibold text-[9px] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  En Línea
                </span>
              </div>

              <div className="flex items-center gap-0.5">
                {/* Mute/Unmute */}
                <button
                  type="button"
                  onClick={handleToggleSound}
                  className="p-0.5 rounded text-white/60 hover:text-white hover:bg-white/10 transition cursor-pointer"
                  title={soundActive ? "Silenciar tono" : "Activar tono"}
                >
                  {soundActive ? (
                    <Volume2 className="w-3 h-3 text-pink-300" />
                  ) : (
                    <VolumeX className="w-3 h-3 text-slate-400" />
                  )}
                </button>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => dismissMsnAlert(alert.id)}
                  className="p-0.5 rounded text-white/60 hover:text-white hover:bg-white/10 transition cursor-pointer"
                  title="Cerrar"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Notification Body - Clean, Executive & Compact */}
            <div className="px-3 py-2 flex items-center gap-2.5">
              {/* Compact Avatar with Subtle Green Dot */}
              <div className="relative flex-shrink-0">
                <div className="w-8 h-8 rounded-lg overflow-hidden bg-gradient-to-br from-indigo-700 to-ipsur-pink-600 p-[1px] shadow-sm">
                  {alert.avatar ? (
                    <img 
                      src={alert.avatar} 
                      alt={alert.userName} 
                      className="w-full h-full object-cover rounded-[7px]"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-900 rounded-[7px] flex items-center justify-center text-white">
                      {isStudent ? (
                        <GraduationCap className="w-4 h-4 text-pink-300" />
                      ) : isTeacher ? (
                        <BookOpen className="w-4 h-4 text-indigo-300" />
                      ) : (
                        <ShieldCheck className="w-4 h-4 text-amber-300" />
                      )}
                    </div>
                  )}
                </div>

                {/* Discreet Green Dot */}
                <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 border border-slate-900 shadow-xs"></span>
                </span>
              </div>

              {/* Information Text */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <h4 className="font-display font-bold text-white text-xs truncate leading-snug">
                    {alert.userName}
                  </h4>
                  <span className="font-mono text-[9px] text-slate-400 flex-shrink-0">
                    {alert.timeString?.slice(0, 5)}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 mt-0.5 text-[10px] text-slate-300">
                  <span className="text-emerald-300 font-medium">
                    {isStudent ? 'Estudiante' : isTeacher ? 'Docente' : 'Directivo'}
                  </span>
                  <span className="text-white/20">•</span>
                  <span className="flex items-center gap-1 text-slate-400">
                    {isMobile ? (
                      <Smartphone className="w-2.5 h-2.5 text-pink-400" />
                    ) : (
                      <Laptop className="w-2.5 h-2.5 text-blue-400" />
                    )}
                    <span>{alert.device || 'Campus'}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Discreet 3-Second Timer Bar */}
            <div className="h-[1.5px] w-full bg-white/10 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-emerald-400 via-ipsur-pink-500 to-indigo-500"
                style={{
                  animation: 'msnProgress 3s linear forwards'
                }}
              />
            </div>
          </div>
        );
      })}

      {/* Embedded CSS for smooth entrance and 3-second progress */}
      <style>{`
        @keyframes msnProgress {
          0% { width: 100%; }
          100% { width: 0%; }
        }
        @keyframes msnSlideIn {
          0% {
            opacity: 0;
            transform: translateY(12px) scale(0.96);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-msn-slide-in {
          animation: msnSlideIn 0.28s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
}
