import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  GraduationCap, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  Laptop, 
  Users, 
  Award,
  LogIn,
  ChevronRight,
  School,
  Play
} from 'lucide-react';

export default function HeroSection() {
  const { goToPortalSelector, goToPortalApp } = useApp();
  const [activePreviewTab, setActivePreviewTab] = useState('prepa'); // 'prepa' | 'universidad'

  return (
    <section id="inicio" className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-ipsur-navy-900 to-[#070b1c] text-white pt-10 pb-16 sm:pb-24">
      {/* Background Ambient Glows with Fucsia, Navy and Sky Blue */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-ipsur-pink-600/20 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-sky-500/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-[450px] h-[450px] bg-ipsur-navy-600/30 rounded-full blur-[140px] pointer-events-none" />

      {/* Decorative Grid Mesh */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.7) 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Institutional Badge */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-slate-200 text-xs font-bold shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-ipsur-pink-400" />
            <span>Sistema Educativo Integral Peninsular · Preparatoria & Universidad 100% en Línea</span>
          </div>
        </div>

        {/* Main Hero Header */}
        <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-14">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight sm:leading-none text-white">
            Tu Futuro Profesional en una Sola{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-ipsur-pink-400 via-pink-300 to-sky-400">
              Plataforma Virtual
            </span>
          </h1>
          
          <p className="mt-5 text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Estudia <strong className="text-white">Prepa en Línea IPSUR</strong> o tu <strong className="text-white">Carrera Universitaria</strong> con validez oficial, horarios flexibles y acompañamiento docente continuo desde cualquier computadora o dispositivo móvil.
          </p>

          {/* Call to Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {/* Primary: Go to Portal */}
            <button
              onClick={() => goToPortalSelector()}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-ipsur-pink-600 via-pink-600 to-rose-600 hover:from-ipsur-pink-500 hover:to-rose-500 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-ipsur-pink-600/30 flex items-center gap-2.5 transition-all transform hover:-translate-y-0.5 cursor-pointer ring-1 ring-white/20"
            >
              <LogIn className="w-4 h-4 text-white" />
              <span>Entrar al Portal Educativo</span>
              <ArrowRight className="w-4 h-4 text-pink-200" />
            </button>

            {/* Secondary: Explore Academic Offers */}
            <a
              href="#prepa"
              className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/20 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-sky-400" />
              <span>Ver Prepa IPSUR</span>
            </a>

            <a
              href="#universidad"
              className="px-6 py-3.5 rounded-2xl bg-sky-950/70 hover:bg-sky-900/80 border border-sky-600/40 text-sky-200 hover:text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer"
            >
              <GraduationCap className="w-4 h-4 text-sky-400" />
              <span>Ver Universidad en Línea</span>
            </a>
          </div>
        </div>

        {/* Dual Interactive Switcher Card: Prepa IPSUR vs Universidad en Línea */}
        <div className="max-w-4xl mx-auto bg-slate-900/85 backdrop-blur-xl border border-slate-700/80 rounded-3xl p-5 sm:p-8 shadow-2xl">
          
          {/* Switcher Tab Controls */}
          <div className="flex items-center justify-center p-1.5 bg-slate-950/80 rounded-2xl border border-slate-800 max-w-md mx-auto mb-6">
            <button
              type="button"
              onClick={() => setActivePreviewTab('prepa')}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                activePreviewTab === 'prepa'
                  ? 'bg-gradient-to-r from-ipsur-pink-600 to-rose-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Prepa en Línea (IPSUR)</span>
            </button>

            <button
              type="button"
              onClick={() => setActivePreviewTab('universidad')}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                activePreviewTab === 'universidad'
                  ? 'bg-gradient-to-r from-ipsur-navy-600 to-sky-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Universidad en Línea</span>
            </button>
          </div>

          {/* Tab 1 Preview: PREPA EN LÍNEA IPSUR */}
          {activePreviewTab === 'prepa' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-7 space-y-4 text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-950/80 border border-pink-800/80 text-ipsur-pink-300 text-[11px] font-bold">
                  <span>Bachillerato General Oficial</span>
                  <span>·</span>
                  <span>RVOE SEP Acreditado</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-white">
                  Termina tu Preparatoria en Línea en 2 Años con la calidad IPSUR
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  Diseñado para jóvenes y adultos. Estudia a tus horas con materias modulares, material didáctico descargable, tareas con retroalimentación docente y exámenes en línea.
                </p>

                <div className="grid grid-cols-2 gap-2 text-xs text-slate-300 pt-1">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-ipsur-pink-400 flex-shrink-0" />
                    <span>Validez Oficial SEP</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-ipsur-pink-400 flex-shrink-0" />
                    <span>Plan Modular Flexible</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-ipsur-pink-400 flex-shrink-0" />
                    <span>Sin Examen de Admisión</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-ipsur-pink-400 flex-shrink-0" />
                    <span>Tutoría 24/7 en Portal</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap gap-3">
                  <button
                    onClick={() => goToPortalApp('prepa')}
                    className="px-5 py-2.5 rounded-xl bg-ipsur-pink-600 hover:bg-ipsur-pink-700 text-white font-bold text-xs flex items-center gap-2 shadow-md cursor-pointer"
                  >
                    <span>Entrar al Portal Prepa IPSUR</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <a
                    href="#prepa"
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5"
                  >
                    <span>Ver Plan de Estudios</span>
                  </a>
                </div>
              </div>

              {/* Graphic Feature Box */}
              <div className="md:col-span-5 bg-gradient-to-tr from-[#0e1630] to-slate-800 p-5 rounded-2xl border border-slate-700/80 text-left space-y-3">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-ipsur-pink-400">
                  Panel del Alumno en Vivo
                </span>
                <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-700/60 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-white">
                    <span>Matemáticas y Álgebra II</span>
                    <span className="text-emerald-400 font-mono text-[11px]">En curso</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-ipsur-pink-500 h-full w-3/4 rounded-full" />
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span>Avance curricular: 75%</span>
                    <span>3 Tareas entregadas</span>
                  </div>
                </div>

                <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-700/60 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-400" />
                    <span className="font-semibold text-slate-200">Boleta de Calificaciones</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-400">9.8 Promedio</span>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2 Preview: UNIVERSIDAD EN LÍNEA */}
          {activePreviewTab === 'universidad' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-7 space-y-4 text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950/80 border border-sky-800/80 text-sky-300 text-[11px] font-bold">
                  <span>Nivel Superior & Posgrados</span>
                  <span>·</span>
                  <span>Instituto de Estudios Superiores</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-white">
                  Licenciaturas e Ingenierías en Línea diseñadas para el mercado actual
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  Formación profesional universitaria con enfoque práctico, cátedras dictadas por especialistas y titulación ágil. Estudia sin descuidar tu trabajo ni tu familia.
                </p>

                <div className="grid grid-cols-2 gap-2 text-xs text-slate-300 pt-1">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-sky-400 flex-shrink-0" />
                    <span>Licenciaturas e Ingenierías</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-sky-400 flex-shrink-0" />
                    <span>Titulación por Promedio o Proyecto</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-sky-400 flex-shrink-0" />
                    <span>Cátedras Virtuales en Vivo</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-sky-400 flex-shrink-0" />
                    <span>Biblioteca Digital & Campus 24/7</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap gap-3">
                  <button
                    onClick={() => goToPortalApp('universidad')}
                    className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center gap-2 shadow-md cursor-pointer"
                  >
                    <span>Entrar al Portal Universidad</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <a
                    href="#universidad"
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5"
                  >
                    <span>Ver Carreras y Posgrados</span>
                  </a>
                </div>
              </div>

              {/* Graphic Feature Box */}
              <div className="md:col-span-5 bg-gradient-to-tr from-[#0b1b36] to-slate-800 p-5 rounded-2xl border border-slate-700/80 text-left space-y-3">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-sky-400">
                  Campus Virtual Superior
                </span>
                <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-700/60 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-white">
                    <span>Ingeniería en Sistemas y Software</span>
                    <span className="text-sky-400 font-mono text-[11px]">8vo Cuatrimestre</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-sky-400 h-full w-4/5 rounded-full" />
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span>Créditos acumulados: 85%</span>
                    <span>Proyecto de Titulación activo</span>
                  </div>
                </div>

                <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-700/60 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Laptop className="w-4 h-4 text-sky-400" />
                    <span className="font-semibold text-slate-200">Sala Virtual de Cátedra</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-400">Enlace Activo</span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Bottom Key Stats Bar */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-center border-t border-slate-800/80 pt-8">
          <div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">+5,200</div>
            <div className="text-xs text-slate-400 mt-1">Alumnos y Egresados</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-ipsur-pink-400 font-mono">100%</div>
            <div className="text-xs text-slate-400 mt-1">Modalidad en Línea</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-sky-400 font-mono">RVOE SEP</div>
            <div className="text-xs text-slate-400 mt-1">Validez Oficial Nacional</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">24 / 7</div>
            <div className="text-xs text-slate-400 mt-1">Acceso a Salas Virtuales</div>
          </div>
        </div>

      </div>
    </section>
  );
}
