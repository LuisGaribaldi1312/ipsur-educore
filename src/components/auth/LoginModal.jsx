import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
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
  AlertCircle
} from 'lucide-react';

export default function LoginModal({ isOpen, onClose }) {
  const { login, showToast } = useApp();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    setTimeout(() => {
      const res = login(identifier, password);
      setIsLoading(false);
      if (!res.success) {
        setErrorMessage(res.message || 'Credenciales incorrectas');
      } else {
        if (onClose) onClose();
      }
    }, 200);
  };

  const fillQuickCredentials = (email, pass) => {
    setIdentifier(email);
    setPassword(pass);
    setErrorMessage('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Top Strip */}
        <div className="bg-gradient-to-r from-[#0E1026] via-[#1E1F5C] to-[#990054] p-6 text-center text-white relative">
          <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-white/10 backdrop-blur-md p-2 flex items-center justify-center border border-white/20 shadow-xl">
            <img 
              src="/ipsur-logo.png" 
              alt="IPSUR Logo Oficial" 
              className="w-full h-full object-contain filter drop-shadow-md"
            />
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            IPSUR <span className="text-pink-300">EDUCORE</span>
          </h2>
          <p className="text-[11px] text-pink-200/90 font-semibold tracking-wider uppercase mt-0.5">
            Portal de Autenticación Institucional
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-7 space-y-4">
          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-center gap-2 text-rose-700 text-xs font-semibold">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
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
                placeholder="ejemplo@ipsur.edu.mx"
                value={identifier}
                onChange={e => setIdentifier(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 text-xs font-medium bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-ipsur-navy-500 outline-none transition text-slate-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
              Contraseña de Seguridad
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
              <span>Validando credenciales...</span>
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
    </div>
  );
}
