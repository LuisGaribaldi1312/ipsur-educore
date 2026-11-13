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
  CheckCircle2,
  GraduationCap,
  BookOpen,
  Laptop,
  Video,
  Award,
  HelpCircle,
  Phone,
  Calendar,
  Layers,
  ChevronRight,
  Globe,
  Compass,
  Check,
  X,
  Smartphone,
  Download
} from 'lucide-react';

export default function LoginScreen() {
  const { login, institutionalInfo, users, installPwa, isPwaInstalled } = useApp();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [activeRoleTab, setActiveRoleTab] = useState('all'); // 'student' | 'teacher' | 'coordinator' | 'director' | 'superadmin' | 'all'
  const [supportModalOpen, setSupportModalOpen] = useState(false);

  // Filter demo / quick profiles if user clicks on quick role tabs
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
        setErrorMessage(res.message || 'Usuario o contraseña inválidos. Verifica tu correo institucional o matrícula.');
      }
    }, 250);
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
    <div className="min-h-screen w-full flex flex-col justify-between bg-[#060813] text-slate-100 relative overflow-x-hidden selection:bg-ipsur-pink-500 selection:text-white">
      
      {/* Dynamic Background Ambient Gradients */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-32 -left-32 w-[700px] h-[700px] bg-indigo-600/15 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 -right-32 w-[650px] h-[650px] bg-ipsur-pink-600/15 rounded-full blur-[150px]" />
        <div className="absolute -bottom-32 left-1/3 w-[600px] h-[600px] bg-blue-700/10 rounded-full blur-[140px]" />
        
        {/* Subtle Geometric Grid */}
        <div 
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `radial-gradient(rgba(255,255,255,0.7) 1px, transparent 1px)`,
            backgroundSize: '36px 36px'
          }}
        />
      </div>

      {/* Top Institutional Header Bar */}
      <header className="relative z-20 w-full border-b border-white/10 bg-black/40 backdrop-blur-xl px-4 sm:px-8 py-3.5 transition">
        <div className="max-w-[1920px] mx-auto flex flex-wrap items-center justify-between gap-3">
          
          {/* Logo & School Name */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white p-1.5 flex items-center justify-center shadow-md border border-white/30">
              <img 
                src="/ipsur-logo.png" 
                alt="IPSUR Logo Oficial" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-black tracking-wider text-xs sm:text-sm text-white">
                  INSTITUTO PENINSULAR DEL SUR
                </span>
                <span className="hidden md:inline-flex items-center gap-1 bg-ipsur-pink-500/20 text-pink-300 border border-ipsur-pink-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  <Award className="w-3 h-3 text-ipsur-pink-400" />
                  <span>RVOE Oficial SEP</span>
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block font-medium">
                Campus Digital & Bachillerato General en Línea · <span className="text-pink-300 italic">"La educación es el camino"</span>
              </p>
            </div>
          </div>

          {/* Right Live Indicators */}
          <div className="flex items-center gap-2.5 sm:gap-4 ml-auto text-xs">
            {/* PWA Mobile App Install Pill */}
            {!isPwaInstalled && (
              <button
                type="button"
                onClick={installPwa}
                className="inline-flex items-center gap-1.5 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-indigo-500/20 hover:from-pink-500/30 hover:to-indigo-500/30 text-pink-200 border border-pink-400/40 px-3 py-1 rounded-full text-[11px] font-bold transition shadow-xs cursor-pointer group"
                title="Descargar e instalar IPSUR EDUCORE como aplicación en Android o iPhone"
              >
                <Smartphone className="w-3.5 h-3.5 text-pink-300 group-hover:scale-110 transition-transform" />
                <span>Instalar App Móvil</span>
              </button>
            )}

            <LiveClock variant="topbar" className="hidden sm:flex" />

            <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full text-emerald-300 text-[11px] font-bold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Campus Virtual Activo</span>
            </div>
          </div>

        </div>
      </header>

      {/* Main Hero & Split Vanguardist Layout */}
      <main className="relative z-10 flex-1 w-full max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-10 py-6 sm:py-10 flex items-center justify-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* ======================================================== */}
          {/* LEFT COLUMN: Educational Vanguardist Showcase (7 cols)  */}
          {/* ======================================================== */}
          <div className="hidden lg:flex lg:col-span-7 flex-col justify-center space-y-7 pr-4">
            
            {/* Accreditation Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md w-fit">
              <div className="w-2 h-2 rounded-full bg-ipsur-pink-500 animate-pulse" />
              <span className="text-xs font-bold text-pink-200 uppercase tracking-widest">
                Plataforma Académica de Nueva Generación
              </span>
              <span className="text-white/30">•</span>
              <span className="text-xs text-slate-400 font-mono">
                {institutionalInfo?.rvoe || 'RVOE-SEP-DGB-2024-09882'}
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="font-display text-4xl xl:text-5xl 2xl:text-6xl font-black text-white tracking-tight leading-[1.1]">
                Aprende, Colabora y <br />
                <span className="bg-gradient-to-r from-pink-400 via-rose-300 to-indigo-300 bg-clip-text text-transparent">
                  Construye tu Futuro
                </span>
              </h1>
              <p className="text-base xl:text-lg text-slate-300/90 font-normal max-w-2xl leading-relaxed">
                Bienvenido al ecosistema educativo digital del <strong className="text-white font-bold">Instituto Peninsular del Sur</strong>. Gestiona tus materias, participa en clases virtuales en vivo y consulta tu progreso formativo en tiempo real.
              </p>
            </div>

            {/* 3 Vanguardist Educational Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              
              {/* Feature 1 */}
              <div className="group p-4 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-pink-500/40 transition-all duration-300 shadow-lg backdrop-blur-md">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-ipsur-pink-500/30 to-purple-600/30 border border-pink-400/30 flex items-center justify-center text-pink-300 mb-3 group-hover:scale-110 transition-transform">
                  <Video className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-white text-sm">Aulas en Vivo</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Google Meet integrado, sesiones sincrónicas y foros interactivos.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="group p-4 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-indigo-500/40 transition-all duration-300 shadow-lg backdrop-blur-md">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/30 to-blue-600/30 border border-indigo-400/30 flex items-center justify-center text-indigo-300 mb-3 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-white text-sm">Rúbricas al 100%</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Evaluación continua SEP, entregas digitales y retroalimentación docente.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="group p-4 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-emerald-500/40 transition-all duration-300 shadow-lg backdrop-blur-md">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/30 to-teal-600/30 border border-emerald-400/30 flex items-center justify-center text-emerald-300 mb-3 group-hover:scale-110 transition-transform">
                  <Laptop className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-white text-sm">Sincronización Total</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Acceso fluido desde celular en 4G/5G, laptop o tablet en tiempo real.
                </p>
              </div>

            </div>

            {/* Educational Testimonial Quote */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-white/[0.03] to-white/[0.01] border-l-4 border-ipsur-pink-500 border-y border-r border-white/5 flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-white/10 p-1 flex items-center justify-center border border-white/20 flex-shrink-0">
                <GraduationCap className="w-6 h-6 text-pink-300" />
              </div>
              <div className="text-xs">
                <p className="text-slate-200 font-medium italic">
                  "Formamos bachilleres con pensamiento crítico, liderazgo humano y competencias tecnológicas preparadas para los retos del siglo XXI."
                </p>
                <span className="text-[11px] text-pink-300 font-bold block mt-1">
                  — Dirección Académica IPSUR Peninsular
                </span>
              </div>
            </div>

          </div>

          {/* ======================================================== */}
          {/* RIGHT COLUMN: The Vanguardist Smart Access Card (5 cols) */}
          {/* ======================================================== */}
          <div className="lg:col-span-5 w-full max-w-md mx-auto">
            
            {/* The Glassmorphism Card */}
            <div className="relative rounded-3xl bg-white/[0.07] backdrop-blur-2xl border border-white/15 p-6 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.65)] overflow-hidden transition-all duration-300 hover:border-white/25">
              
              {/* Subtle Card Glow Highlights */}
              <div className="absolute top-0 right-0 w-36 h-36 bg-ipsur-pink-500/20 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-36 h-36 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none" />

              {/* Card Header with Emblem */}
              <div className="relative text-center mb-6">
                
                {/* Floating Institutional Logo */}
                <div className="inline-block relative mb-3">
                  <div className="w-20 h-20 sm:w-22 sm:h-22 mx-auto rounded-3xl bg-white p-2.5 flex items-center justify-center shadow-[0_15px_35px_rgba(230,0,126,0.25)] border-2 border-white/90 transform transition-transform duration-300 hover:scale-105">
                    <img 
                      src="/ipsur-logo.png" 
                      alt="IPSUR Logo" 
                      className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(46,48,146,0.25)]"
                    />
                  </div>
                  <span className="absolute -bottom-1 -right-1 p-1 bg-gradient-to-r from-ipsur-pink-500 to-rose-600 rounded-full text-white shadow-md">
                    <Sparkles className="w-3.5 h-3.5" />
                  </span>
                </div>

                <h2 className="font-display text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Iniciar Sesión
                </h2>
                <p className="text-xs text-slate-300 mt-1">
                  Portal Seguro de Acceso al Campus Digital
                </p>
              </div>

              {/* Quick Role Selection Tabs for Easy Access */}
              <div className="mb-5">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Tipo de Usuario:
                  </span>
                  <button
                    type="button"
                    onClick={() => setSupportModalOpen(true)}
                    className="text-[11px] text-pink-300 hover:text-pink-200 transition font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <HelpCircle className="w-3 h-3" />
                    <span>Ayuda escolar</span>
                  </button>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5 p-1 rounded-2xl bg-black/30 border border-white/10 text-[11px] font-bold">
                  {[
                    { key: 'student', label: 'Alumno', icon: GraduationCap },
                    { key: 'teacher', label: 'Docente', icon: BookOpen },
                    { key: 'coordinator', label: 'Coord.', icon: Layers },
                    { key: 'director', label: 'Director', icon: School },
                    { key: 'superadmin', label: 'Rector', icon: ShieldCheck }
                  ].map(role => {
                    const Icon = role.icon;
                    const isActive = activeRoleTab === role.key;
                    return (
                      <button
                        key={role.key}
                        type="button"
                        onClick={() => handleQuickFill(role.key)}
                        className={`py-1.5 px-2 rounded-xl flex flex-col items-center justify-center gap-0.5 transition cursor-pointer ${
                          isActive
                            ? 'bg-gradient-to-r from-ipsur-navy-700 to-ipsur-pink-600 text-white shadow-md font-black scale-102'
                            : 'text-slate-400 hover:text-white hover:bg-white/5'
                        }`}
                        title={`Acceder como ${role.label}`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span className="text-[10px] tracking-tight">{role.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Error Banner */}
                {errorMessage && (
                  <div className="p-3.5 rounded-2xl bg-rose-500/15 border border-rose-500/30 flex items-start gap-2.5 text-rose-200 text-xs font-semibold animate-in shake duration-200">
                    <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Identifier Input (Email or Matricula) */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                    Correo Institucional o Matrícula
                  </label>
                  <div className="relative group">
                    <div className="absolute left-3.5 top-3 text-slate-400 group-focus-within:text-pink-400 transition-colors">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      required
                      autoFocus
                      placeholder={
                        activeRoleTab === 'student' 
                          ? 'Ej. ALU-2026-001 o correo' 
                          : 'Ej. usuario@ipsur.edu.mx'
                      }
                      value={identifier}
                      onChange={e => setIdentifier(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 text-xs font-medium bg-white/[0.08] hover:bg-white/[0.12] focus:bg-white/[0.15] border border-white/15 focus:border-pink-500/80 rounded-xl outline-none text-white placeholder-slate-400 transition shadow-inner focus:ring-2 focus:ring-pink-500/20"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                      Contraseña de Acceso
                    </label>
                    <button
                      type="button"
                      onClick={() => setSupportModalOpen(true)}
                      className="text-[11px] text-pink-300 hover:text-pink-200 transition font-medium"
                    >
                      ¿Olvidaste tu contraseña?
                    </button>
                  </div>

                  <div className="relative group">
                    <div className="absolute left-3.5 top-3 text-slate-400 group-focus-within:text-pink-400 transition-colors">
                      <KeyRound className="w-4 h-4" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="••••••••••••"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-2.5 text-xs font-medium bg-white/[0.08] hover:bg-white/[0.12] focus:bg-white/[0.15] border border-white/15 focus:border-pink-500/80 rounded-xl outline-none text-white placeholder-slate-400 transition shadow-inner focus:ring-2 focus:ring-pink-500/20"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-3 text-slate-400 hover:text-white transition cursor-pointer"
                      title={showPassword ? "Ocultar contraseña" : "Ver contraseña"}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me Checkbox */}
                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none text-slate-300">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={e => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-white/20 bg-white/10 text-ipsur-pink-600 focus:ring-0 focus:ring-offset-0 cursor-pointer accent-ipsur-pink-500"
                    />
                    <span>Recordar sesión en este equipo</span>
                  </label>

                  <span className="text-[10px] text-slate-400 flex items-center gap-1 font-mono">
                    <Lock className="w-3 h-3 text-emerald-400" />
                    <span>SSL 256-Bit</span>
                  </span>
                </div>

                {/* Submit Action Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-3 py-3.5 px-5 bg-gradient-to-r from-ipsur-navy-700 via-indigo-800 to-ipsur-pink-600 hover:from-ipsur-navy-800 hover:via-indigo-900 hover:to-ipsur-pink-700 text-white font-bold rounded-xl shadow-[0_8px_25px_rgba(230,0,126,0.35)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 text-xs sm:text-sm flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed group border border-white/20"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Verificando credenciales...</span>
                    </div>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4 text-pink-300 group-hover:scale-110 transition-transform" />
                      <span>Ingresar al Campus Virtual</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>

                {/* Direct quick credentials loader for Super Admin (Owner) */}
                <div className="pt-3 border-t border-white/10 text-center flex flex-col items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuickFill('superadmin')}
                    className="text-[11px] text-slate-400 hover:text-amber-300 transition inline-flex items-center gap-1.5 cursor-pointer font-medium"
                    title="Cargar credenciales directas de Super Administrador"
                  >
                    <Lock className="w-3 h-3 text-amber-400" />
                    <span>Acceso Directo: Super Administrador</span>
                  </button>

                  {/* PWA Mobile App Install Action for Students & Teachers */}
                  {!isPwaInstalled && (
                    <button
                      type="button"
                      onClick={installPwa}
                      className="w-full mt-1 py-2 px-3 rounded-xl bg-gradient-to-r from-emerald-500/15 to-teal-500/15 hover:from-emerald-500/25 hover:to-teal-500/25 border border-emerald-400/30 text-emerald-300 text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-xs group"
                    >
                      <Smartphone className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                      <span>📲 Descargar / Instalar App Móvil (Android / iOS)</span>
                    </button>
                  )}
                </div>

              </form>

            </div>

            {/* Micro Badge Under Card on Mobile/Desktop */}
            <div className="mt-4 text-center">
              <span className="text-[11px] text-slate-400 inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Compatible con PC, Mac, Teléfonos y Tablets</span>
              </span>
            </div>

          </div>

        </div>
      </main>

      {/* Support & School Help Modal */}
      {supportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden text-slate-800">
            
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#0A0D1B] via-[#141B41] to-[#750042] text-white p-5 sm:p-6 relative">
              <button
                onClick={() => setSupportModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-3 mb-1">
                <div className="w-10 h-10 rounded-2xl bg-white/15 p-2 flex items-center justify-center border border-white/20">
                  <HelpCircle className="w-6 h-6 text-pink-300" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-white">
                    Mesa de Ayuda Escolar
                  </h3>
                  <p className="text-xs text-indigo-200">
                    Soporte Técnico & Control Escolar IPSUR
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 text-xs">
              <div className="p-3.5 rounded-2xl bg-indigo-50/80 border border-indigo-200 text-indigo-950 space-y-1.5">
                <strong className="block font-bold text-sm text-indigo-900">
                  ¿Cómo ingreso al sistema?
                </strong>
                <p className="text-slate-600 leading-relaxed">
                  • <strong>Alumnos:</strong> Ingresa con tu <strong>matrícula</strong> (ej. <code className="bg-white px-1.5 py-0.5 rounded text-indigo-700 font-mono">MAT-2026-001</code>) o tu correo institucional.<br />
                  • <strong>Docentes y Personal:</strong> Ingresa con tu correo oficial <code className="bg-white px-1.5 py-0.5 rounded text-indigo-700 font-mono">@ipsur.edu.mx</code>.
                </p>
              </div>

              <div className="space-y-2 pt-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Canales de Atención Oficial
                </span>
                
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <Mail className="w-4 h-4 text-ipsur-pink-600 flex-shrink-0" />
                  <div>
                    <span className="font-bold text-slate-900 block">Correo de Soporte:</span>
                    <a href="mailto:soporte.educore@ipsur.edu.mx" className="text-blue-600 hover:underline">
                      {institutionalInfo?.supportEmail || 'soporte.educore@ipsur.edu.mx'}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <Phone className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <div>
                    <span className="font-bold text-slate-900 block">Línea Directa / Control Escolar:</span>
                    <span className="text-slate-600">
                      {institutionalInfo?.phone || '+52 (998) 845-2100'} (Ext. 102)
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2 text-right">
                <button
                  type="button"
                  onClick={() => setSupportModalOpen(false)}
                  className="px-5 py-2 rounded-xl bg-ipsur-navy-800 hover:bg-ipsur-navy-900 text-white font-bold text-xs transition cursor-pointer"
                >
                  Entendido
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Modern Institutional Footer Bar */}
      <footer className="relative z-20 w-full border-t border-white/10 bg-black/40 backdrop-blur-xl px-4 sm:px-8 py-3 text-center text-[11px] text-slate-400">
        <div className="max-w-[1920px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            © {new Date().getFullYear()} <strong className="text-slate-200 font-semibold">{institutionalInfo?.schoolName || 'Instituto Peninsular del Sur'}</strong> · Clave de Centro de Trabajo SEP: <strong className="text-pink-300 font-mono">23PBH0091X</strong>
          </div>
          <div className="flex items-center gap-3 text-slate-400">
            <span>RVOE: {institutionalInfo?.rvoe || 'RVOE-SEP-DGB-2024-09882'}</span>
            <span>•</span>
            <span className="text-emerald-400 flex items-center gap-1 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Cifrado de Alta Seguridad</span>
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
}
