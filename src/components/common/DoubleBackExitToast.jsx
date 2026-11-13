import React from 'react';
import { LogOut, ArrowLeft } from 'lucide-react';

export default function DoubleBackExitToast({ visible }) {
  if (!visible) return null;

  return (
    <div className="fixed bottom-6 inset-x-0 mx-auto z-[999999] max-w-xs px-4 pointer-events-none animate-in fade-in slide-in-from-bottom-4 duration-200">
      <div className="bg-[#0A0D1B]/95 text-white border border-pink-500/40 px-4 py-2.5 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.6)] backdrop-blur-xl flex items-center gap-3">
        <div className="w-7 h-7 rounded-xl bg-pink-500/20 text-pink-300 flex items-center justify-center flex-shrink-0 border border-pink-400/30">
          <ArrowLeft className="w-4 h-4 animate-pulse" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold text-white leading-tight">
            Presiona atrás una vez más
          </p>
          <p className="text-[10px] text-pink-200 mt-0.5">
            para salir de la sesión
          </p>
        </div>
      </div>
    </div>
  );
}
