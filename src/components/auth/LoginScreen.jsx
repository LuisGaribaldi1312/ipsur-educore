import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import LiveClock from '../common/LiveClock';
import { 
  Lock, 
  Mail, 
  KeyRound, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight,
  School,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

export default function LoginScreen() {
  const { login, institutionalInfo } = useApp();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    setTimeout(() => {
      const res = login(identifier, password);
      setIsLoading(false);
      if (!res.success) {
        setErrorMessage(res.message || 'Usuario o contraseña inválidos');
      }
    }, 250);
  };

  const fillQuickCredentials = (email, pass) => {
    setIdentifier(email);
    setPassword(pass);
    setErrorMessage('');
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-b from-[#0A0D1F] via-[#101438] to-[#1E0824] text-slate-800 relative overflow-hidden">
      {/* Decorative ambient gradients */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-pink-600/15 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top Institutional Bar */}
      <header className="relative z-10 w-full border-b border-white/10 bg-black/20 backdrop-blur-md px-4 sm:px-8 py-3 text-white text-xs">
        <div className="max-w-[1920px] mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="font-bold tracking-wider text-xs sm:text-sm text-white">
              INSTITUTO PENINSULAR DEL SUR
            </span>
            <span className="text-white/40 hidden sm:inline">•</span>
            <span className="italic text-pink-200 text-xs hidden md:inline">
              "{institutionalInfo?.schoolMotto || 'La educación es el camino'}"
            </span>
          </div>

          <div className="flex items-center gap-3 ml-auto text-xs">
            {/* Real-time Clock on Login Bar */}
            <LiveClock variant="topbar" />
            <span className="inline-flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-full text-[11px] font-semibold border border-white/15">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Portal Seguro</span>
            </span>
          </div>
        </div>
      </header>

      {/* Central Login Container */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-4 sm:p-6 my-4">
        <div className="w-full max-w-md bg-white/95 backdrop-blur-xl rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.45)] border border-white/20 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          {/* Header Card */}
          <div className="bg-gradient-to-r from-[#0A0D1B] via-[#1E1F5C] to-[#800045] p-6 sm:p-8 text-center text-white relative">
            <div className="w-24 h-24 mx-auto mb-4 rounded-[28px] bg-white p-3 flex items-center justify-center shadow-[0_12px_32px_rgba(0,0,0,0.4)] border-2 border-white/90 transition-transform duration-300 hover:scale-105">
              <img 
                src="/ipsur-logo.png" 
                alt="IPSUR Logo Oficial" 
                className="w-full h-full object-contain filter drop-shadow-[0_4px_12px_rgba(46,48,146,0.22)]"
              />
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-black tracking-tight text-white">
              IPSUR <span className="bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">EDUCORE</span>
            </h1>
            <p className="text-[11px] font-bold text-pink-200/90 tracking-widest uppercase mt-1">
              ACCESO AL CAMPUS VIRTUAL OFICIAL
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4">
            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 flex items-center gap-2.5 text-rose-800 text-xs font-semibold animate-in shake duration-200">
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-600" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                Correo Institucional o Matrícula
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  required
                  autoFocus
                  placeholder="ejemplo@ipsur.edu.mx o matrícula"
                  value={identifier}
                  onChange={e => setIdentifier(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs font-medium bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-ipsur-navy-500 outline-none transition text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                Contraseña de Acceso
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 text-xs font-medium bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-ipsur-navy-500 outline-none transition text-slate-900"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-ipsur-navy-800 to-ipsur-pink-600 hover:from-ipsur-navy-900 hover:to-ipsur-pink-700 text-white font-bold rounded-xl shadow-lg transition active:scale-95 text-xs flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <span>Validando credenciales en el sistema...</span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 text-pink-300" />
                  <span>Iniciar Sesión en el Campus</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Super Admin Quick Access for platform owner */}
            <div className="pt-4 border-t border-slate-100 text-[11px] text-center">
              <button
                type="button"
                onClick={() => fillQuickCredentials('superadmin@ipsur.edu.mx', 'ipsurSuperAdmin2026*')}
                className="text-xs text-slate-400 hover:text-amber-700 transition underline inline-flex items-center gap-1.5 font-mono cursor-pointer"
                title="Acceso Super Administrador Oculto"
              >
                <Lock className="w-3 h-3 text-amber-500" />
                <span>Rellenar credenciales de Super Administrador</span>
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Institutional Footer */}
      <footer className="relative z-10 w-full border-t border-white/10 bg-black/30 backdrop-blur-md px-4 sm:px-8 py-3 text-center text-[11px] text-slate-400">
        <p>
          © {new Date().getFullYear()} Instituto Peninsular del Sur · Clave RVOE: {institutionalInfo?.rvoe || 'RVOE-SEP-DGB-2024-09882'} · Plataforma Oficial de Gestión Académica
        </p>
      </footer>
    </div>
  );
}
