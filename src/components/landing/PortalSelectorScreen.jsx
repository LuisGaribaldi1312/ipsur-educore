import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  GraduationCap, 
  School, 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  BookOpen, 
  Laptop, 
  Smartphone, 
  Download, 
  Lock,
  ExternalLink,
  Users,
  Award,
  Phone
} from 'lucide-react';

export default function PortalSelectorScreen() {
  const { 
    goToLanding, 
    goToPortalApp, 
    institutionalInfo,
    installPwa,
    isPwaInstalled
  } = useApp();

  return (
    <div className="min-h-screen bg-[#060814] text-slate-100 flex flex-col relative overflow-hidden select-none">
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-ipsur-pink-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[550px] h-[550px] bg-sky-500/15 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-ipsur-navy-700/20 rounded-full blur-[160px] pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)',
          backgroundSize: '28px 28px'
        }}
      />

      {/* Top Header Bar */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 py-5 flex items-center justify-between border-b border-slate-800/80">
        <button
          onClick={() => goToLanding()}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white text-xs font-bold transition shadow-sm cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 text-ipsur-pink-500 group-hover:-translate-x-0.5 transition-transform" />
          <span>Volver a la Página Principal</span>
        </button>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white p-1 shadow-md flex items-center justify-center">
            <img 
              src="/ipsur-logo.png" 
              alt="IPSUR Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <div className="hidden sm:block text-left">
            <span className="text-xs font-black text-white tracking-wide block leading-none">
              IPSUR EDUCORE
            </span>
            <span className="text-[10px] text-slate-400 font-medium tracking-wider uppercase">
              Portal Alumnos y Docentes
            </span>
          </div>
        </div>

        {!isPwaInstalled && (
          <button
            onClick={installPwa}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-700/90 text-slate-300 hover:text-white text-[11px] font-semibold transition cursor-pointer"
          >
            <Smartphone className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden md:inline">Instalar App</span>
          </button>
        )}
      </header>

      {/* Main Content: Central Hero and Two Primary Portal Icons */}
      <main className="relative z-10 flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col items-center justify-center text-center">
        
        {/* Institutional Pill Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 shadow-inner mb-4">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] font-bold tracking-wider uppercase text-slate-300">
            Campus Virtual Activo · Ciclo Lectivo 2026-2027
          </span>
        </div>

        {/* Section Heading */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight max-w-3xl">
          Selecciona tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-ipsur-pink-500 via-pink-400 to-sky-400">Portal Institucional</span>
        </h1>
        <p className="text-xs sm:text-sm md:text-base text-slate-400 max-w-2xl mt-3 mb-8 sm:mb-12 leading-relaxed">
          Bienvenido al centro de acceso de <strong className="text-slate-200">IPSUR EDUCORE</strong>. Elige el nivel educativo al que perteneces para ingresar a tus salas virtuales, tareas, boletas y servicios académicos.
        </p>

        {/* The Two Main Educational Portal Icons / Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 w-full max-w-4xl">
          
          {/* ICON / CARD 1: PREPA EN LÍNEA (IPSUR) */}
          <div 
            onClick={() => goToPortalApp('prepa')}
            className="group relative bg-gradient-to-b from-slate-900/95 via-slate-900/85 to-[#0b1024] rounded-3xl p-6 sm:p-8 border-2 border-slate-800 hover:border-ipsur-pink-500/80 transition-all duration-300 shadow-xl hover:shadow-[0_20px_50px_rgba(230,0,126,0.22)] cursor-pointer flex flex-col justify-between text-left transform hover:-translate-y-1.5"
          >
            {/* Top Badge */}
            <div className="flex items-center justify-between gap-2 mb-6">
              <span className="text-[10px] font-black uppercase tracking-wider text-ipsur-pink-400 bg-ipsur-pink-950/60 border border-ipsur-pink-800/60 px-3 py-1 rounded-full shadow-xs">
                Nivel Medio Superior · Bachillerato
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-ipsur-pink-500 shadow-[0_0_8px_#E6007E]" />
            </div>

            {/* Icon Graphic */}
            <div className="flex items-center gap-4 mb-5">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-ipsur-pink-700 via-pink-600 to-rose-400 flex items-center justify-center text-white shadow-[0_10px_25px_rgba(230,0,126,0.35)] group-hover:scale-105 transition-transform duration-300 flex-shrink-0">
                <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>

              <div>
                <span className="text-[11px] font-bold text-ipsur-pink-400 uppercase tracking-widest block">
                  Bachillerato Virtual
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white group-hover:text-ipsur-pink-300 transition-colors">
                  Prepa en Línea IPSUR
                </h2>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs text-slate-300 leading-relaxed mb-6 font-normal">
              Acceso a la plataforma de Preparatoria para alumnos, docentes y tutores. Consulta materias, entrega actividades escolares, revisa tu boleta de calificaciones y comunícate con tus profesores en vivo.
            </p>

            {/* Highlights List */}
            <div className="space-y-2.5 border-t border-slate-800/90 pt-4 mb-6 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-ipsur-pink-400 flex-shrink-0" />
                <span>Salas Virtuales y Material de Estudio 24/7</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-ipsur-pink-400 flex-shrink-0" />
                <span>Entrega de Tareas y Rúbricas Oficiales</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-ipsur-pink-400 flex-shrink-0" />
                <span>Boleta de Calificaciones y Control Escolar</span>
              </div>
            </div>

            {/* Primary Action Button */}
            <button
              type="button"
              className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-ipsur-pink-600 via-pink-600 to-rose-600 hover:from-ipsur-pink-500 hover:to-rose-500 text-white font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-ipsur-pink-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer group-hover:gap-3"
            >
              <span>Entrar a Prepa en Línea IPSUR</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* ICON / CARD 2: UNIVERSIDAD EN LÍNEA */}
          <div 
            onClick={() => goToPortalApp('universidad')}
            className="group relative bg-gradient-to-b from-slate-900/95 via-slate-900/85 to-[#0b1428] rounded-3xl p-6 sm:p-8 border-2 border-slate-800 hover:border-sky-400/80 transition-all duration-300 shadow-xl hover:shadow-[0_20px_50px_rgba(56,189,248,0.22)] cursor-pointer flex flex-col justify-between text-left transform hover:-translate-y-1.5"
          >
            {/* Top Badge */}
            <div className="flex items-center justify-between gap-2 mb-6">
              <span className="text-[10px] font-black uppercase tracking-wider text-sky-400 bg-sky-950/60 border border-sky-800/60 px-3 py-1 rounded-full shadow-xs">
                Educación Superior · Licenciaturas & Posgrados
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-sky-400 shadow-[0_0_8px_#38BDF8]" />
            </div>

            {/* Icon Graphic */}
            <div className="flex items-center gap-4 mb-5">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-ipsur-navy-600 via-blue-600 to-sky-400 flex items-center justify-center text-white shadow-[0_10px_25px_rgba(56,189,248,0.3)] group-hover:scale-105 transition-transform duration-300 flex-shrink-0">
                <GraduationCap className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>

              <div>
                <span className="text-[11px] font-bold text-sky-400 uppercase tracking-widest block">
                  Educación Superior
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white group-hover:text-sky-300 transition-colors">
                  Universidad en Línea
                </h2>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs text-slate-300 leading-relaxed mb-6 font-normal">
              Campus virtual universitario para licenciaturas, ingenierías y posgrados. Accede a tus asignaturas superiores, bibliotecas digitales, proyectos de titulación y cátedras con docentes especializados.
            </p>

            {/* Highlights List */}
            <div className="space-y-2.5 border-t border-slate-800/90 pt-4 mb-6 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <span>Licenciaturas e Ingenierías 100% en Línea</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <span>Cátedras Universitarias y Proyectos Profesionales</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <span>Historial Académico, Créditos y Titulación</span>
              </div>
            </div>

            {/* Primary Action Button */}
            <button
              type="button"
              className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-ipsur-navy-600 via-blue-600 to-sky-500 hover:from-ipsur-navy-500 hover:to-sky-400 text-white font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-sky-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer group-hover:gap-3"
            >
              <span>Entrar a Universidad en Línea</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Security & Access Info Note */}
        <div className="mt-10 sm:mt-12 bg-slate-900/60 border border-slate-800 rounded-2xl p-4 max-w-xl w-full flex items-center gap-3.5 text-left">
          <div className="p-2.5 rounded-xl bg-slate-800 text-slate-300 flex-shrink-0">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-xs text-slate-400 leading-relaxed">
            <span className="font-bold text-slate-200 block mb-0.5">Acceso Institucional Seguro</span>
            Alumnos, docentes, directores y administradores ingresan con su matrícula o usuario único. Todos los datos están sincronizados en tiempo real.
          </div>
        </div>

      </main>

      {/* Bottom Sub-Footer Bar */}
      <footer className="relative z-10 w-full border-t border-slate-800/80 py-4 px-4 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>{institutionalInfo.name} · {institutionalInfo.schoolName}</span>
          <span className="text-[11px] text-slate-400">Prepa en Línea IPSUR & Universidad en Línea · RVOE SEP</span>
          <button
            onClick={() => goToLanding()}
            className="text-ipsur-pink-400 hover:text-ipsur-pink-300 underline font-semibold cursor-pointer"
          >
            Ir a la Página Informativa
          </button>
        </div>
      </footer>
    </div>
  );
}
