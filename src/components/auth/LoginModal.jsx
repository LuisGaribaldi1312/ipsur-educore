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
  AlertCircle,
  GraduationCap,
  BookOpen,
  Layers,
  X
} from 'lucide-react';

export default function LoginModal({ isOpen, onClose }) {
  const { login, institutionalInfo, users } = useApp();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeRoleTab, setActiveRoleTab] = useState('all');

  if (!isOpen) return null;

  const studentUser = users.find(u => u.role === 'student');
  const teacherUser = users.find(u => u.role === 'teacher');
  const coordinatorUser = users.find(u => u.role === 'coordinator');
  const directorUser = users.find(u => u.role === 'director');
  const superadminUser = users.find(u => u.isSuperAdmin || u.role === 'superadmin');

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    setTimeout(() => {
      const res = login(identifier, password);
      setIsLoading(false);
      if (!res.success) {
        setErrorMessage(res.message || 'Credenciales inválidas. Verifica tu usuario o contraseña.');
      } else {
        if (onClose) onClose();
      }
    }, 200);
  };

  const handleQuickFill = (roleKey) => {
    setActiveRoleTab(roleKey);
    setErrorMessage('');

    if (roleKey === 'superadmin' && superadminUser) {
      setIdentifier(superadminUser.email || 'superadmin@ipsur.edu.mx');
      setPassword(superadminUser.password || 'ipsurSuperAdmin2026*');
    } else if (roleKey === 'director' && directorUser) {
      setIdentifier(directorUser.email);
      setPassword(directorUser.password || 'ipsurDirector2026*');
    } else if (roleKey === 'coordinator' && coordinatorUser) {
      setIdentifier(coordinatorUser.email);
      setPassword(coordinatorUser.password || 'ipsurCoordinador2026*');
    } else if (roleKey === 'teacher' && teacherUser) {
      setIdentifier(teacherUser.email);
      setPassword(teacherUser.password || 'ipsurDocente2026*');
    } else if (roleKey === 'student' && studentUser) {
      setIdentifier(studentUser.matricula || studentUser.email);
      setPassword(studentUser.password || 'ipsurAlumno2026*');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#0D1024] rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.7)] border border-white/15 overflow-hidden text-white">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Top Banner */}
        <div className="bg-gradient-to-r from-[#0A0D1B] via-[#1E1F5C] to-[#800045] p-6 text-center text-white relative">
          <div className="w-20 h-20 mx-auto mb-3 rounded-2xl bg-white p-2.5 flex items-center justify-center border-2 border-white/90 shadow-[0_10px_25px_rgba(230,0,126,0.3)]">
            <img 
              src="/ipsur-logo.png" 
              alt="IPSUR Logo" 
              className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(46,48,146,0.2)]"
            />
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white font-display">
            Acceso al Campus Virtual
          </h2>
          <p className="text-[11px] text-pink-200/90 font-semibold tracking-wider uppercase mt-0.5">
            Instituto Peninsular del Sur · IPSUR EDUCORE
          </p>
        </div>

        {/* Quick Role Select Tabs */}
        <div className="px-6 pt-4 pb-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
            Selección Rápida de Perfil:
          </span>
          <div className="grid grid-cols-5 gap-1 p-1 rounded-xl bg-black/40 border border-white/10 text-[10px] font-bold">
            {[
              { key: 'student', label: 'Alumno', icon: GraduationCap },
              { key: 'teacher', label: 'Docente', icon: BookOpen },
              { key: 'coordinator', label: 'Coord.', icon: Layers },
              { key: 'director', label: 'Director', icon: School },
              { key: 'superadmin', label: 'Rector', icon: ShieldCheck }
            ].map(r => {
              const Icon = r.icon;
              const isActive = activeRoleTab === r.key;
              return (
                <button
                  key={r.key}
                  type="button"
                  onClick={() => handleQuickFill(r.key)}
                  className={`py-1 rounded-lg flex flex-col items-center justify-center gap-0.5 transition cursor-pointer ${
                    isActive 
                      ? 'bg-gradient-to-r from-ipsur-navy-700 to-ipsur-pink-600 text-white font-black shadow-xs' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  <span>{r.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 pt-2 space-y-4">
          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center gap-2 text-rose-300 text-xs font-semibold animate-in shake duration-200">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
              Correo Institucional o Matrícula
            </label>
            <div className="relative group">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                required
                placeholder="ejemplo@ipsur.edu.mx o matrícula"
                value={identifier}
                onChange={e => setIdentifier(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 text-xs font-medium bg-white/[0.08] hover:bg-white/[0.12] focus:bg-white/[0.15] border border-white/15 focus:border-pink-500/80 rounded-xl outline-none text-white placeholder-slate-400 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
              Contraseña
            </label>
            <div className="relative group">
              <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 text-xs font-medium bg-white/[0.08] hover:bg-white/[0.12] focus:bg-white/[0.15] border border-white/15 focus:border-pink-500/80 rounded-xl outline-none text-white placeholder-slate-400 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3 text-slate-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-ipsur-navy-700 to-ipsur-pink-600 hover:from-ipsur-navy-800 hover:to-ipsur-pink-700 text-white font-bold rounded-xl shadow-lg transition active:scale-95 text-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
          >
            {isLoading ? (
              <span>Validando credenciales...</span>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4 text-pink-300" />
                <span>Ingresar al Sistema</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

      </div>
    </div>
  );
}
