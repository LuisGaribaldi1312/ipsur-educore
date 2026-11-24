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
  Play,
  Smartphone,
  Check,
  Bell,
  Wifi,
  ExternalLink,
  MapPin,
  MessageCircle
} from 'lucide-react';
import { PREPA_DATA, IUPS_DATA, INSTITUTIONAL_CAMPUS } from '../../data/institutionalLandingData';

export default function HeroSection() {
  const { goToPortalSelector, goToPortalApp, installPwa, isPwaInstalled } = useApp();
  const [activePreviewTab, setActivePreviewTab] = useState('prepa'); // 'prepa' | 'universidad'

  return (
    <section id="inicio" className="relative overflow-hidden bg-[#060814] text-white pt-8 sm:pt-12 pb-16 sm:pb-24 select-none">
      
      {/* Dynamic Ambient Aurora Glows */}
      <div className="absolute top-0 right-1/4 w-[650px] h-[650px] bg-gradient-to-br from-ipsur-pink-600/25 to-rose-600/10 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[750px] h-[750px] bg-gradient-to-tr from-sky-500/20 via-blue-600/15 to-transparent rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-ipsur-navy-700/25 rounded-full blur-[170px] pointer-events-none" />

      {/* Modern High-End Grid Matrix Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.7) 1px, transparent 1px)',
          backgroundSize: '36px 36px'
        }}
      />

      {/* FULL-WIDTH WIDESCREEN CONTAINER */}
      <div className="relative z-10 w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        
        {/* Top Floating Pill Banner */}
        <div className="flex items-center justify-center mb-6 text-center">
          <div className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-2 rounded-full bg-slate-900/90 border border-slate-700/80 backdrop-blur-xl text-slate-200 text-xs sm:text-[13px] font-bold shadow-lg shadow-black/40">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34D399]" />
            <span className="text-white">Campus Virtual Peninsular · Riviera Maya</span>
            <span className="text-slate-500">•</span>
            <span className="text-pink-300 font-extrabold uppercase tracking-wide">Prepa IPSUR</span>
            <span className="text-slate-500">&</span>
            <span className="text-sky-300 font-extrabold uppercase tracking-wide">IUPS Universidad</span>
          </div>
        </div>

        {/* BENTO GRID ARCHITECTURE (Full Width 12-Column Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 items-stretch">
          
          {/* ======================================================== */}
          {/* BENTO CARD 1: MASTER HERO CARD (Spans 8 cols on desktop) */}
          {/* ======================================================== */}
          <div className="md:col-span-12 lg:col-span-8 bg-gradient-to-br from-slate-900/90 via-[#0a0f26]/95 to-[#0b1029]/90 border border-slate-700/70 hover:border-slate-600 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden flex flex-col justify-between group transition-all duration-300">
            {/* Subtle card glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-ipsur-pink-500/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10">
              <div className="flex flex-wrap items-center gap-2.5 mb-5">
                <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-ipsur-pink-400 bg-pink-950/70 border border-pink-800/80 px-3 py-1 rounded-full">
                  Validez Oficial SEP · RVOE Acreditado
                </span>
                <span className="text-[10px] sm:text-[11px] font-bold text-sky-300 bg-sky-950/70 border border-sky-800/80 px-3 py-1 rounded-full flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-sky-400" />
                  Playa del Carmen, Quintana Roo
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl xl:text-6xl font-black tracking-tight leading-[1.1] text-white font-display">
                Bachillerato y Universidad con{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-ipsur-pink-400 via-pink-300 to-sky-400 drop-shadow-sm">
                  Excelencia y Validez SEP
                </span>
              </h1>

              <p className="mt-5 text-sm sm:text-base xl:text-lg text-slate-300 max-w-2xl leading-relaxed font-normal">
                Bienvenido al portal institucional oficial de <strong className="text-white font-bold">Prepa IPSUR</strong> (Instituto Peninsular del Sur) y <strong className="text-white font-bold">IUPS</strong> (Instituto Universitario Peninsular del Sur). Estudia tu preparatoria en 2 años o tu carrera universitaria y posgrado sin dejar de trabajar.
              </p>

              {/* Main Call to Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
                <button
                  type="button"
                  onClick={() => goToPortalSelector()}
                  className="px-6 sm:px-7 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-ipsur-pink-600 via-pink-600 to-rose-600 hover:from-ipsur-pink-500 hover:to-rose-500 text-white font-black text-xs sm:text-sm tracking-wide shadow-xl shadow-ipsur-pink-600/30 flex items-center gap-2.5 transition-all transform hover:-translate-y-0.5 cursor-pointer ring-2 ring-white/20"
                >
                  <LogIn className="w-4 h-4 text-pink-200" />
                  <span>Entrar al Portal Educativo</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="#preinscripcion"
                  className="px-6 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white font-black text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-sky-600/25 ring-2 ring-white/10 transform hover:-translate-y-0.5"
                >
                  <Sparkles className="w-4 h-4 text-sky-200" />
                  <span>Preinscribirme en Línea</span>
                </a>

                <a
                  href="#oferta"
                  className="px-5 py-3.5 sm:py-4 rounded-2xl bg-slate-800/90 hover:bg-slate-700/90 border border-slate-600/80 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-md"
                >
                  <BookOpen className="w-4 h-4 text-sky-400" />
                  <span>Oferta Académica (19 Carreras & 4 Bachilleratos)</span>
                </a>

                <a
                  href={`https://wa.me/${activePreviewTab === 'prepa' ? PREPA_DATA.whatsapp : IUPS_DATA.whatsapp}?text=${encodeURIComponent('Hola, me interesa recibir informes sobre inscripciones y becas oficiales.')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3.5 sm:py-4 rounded-2xl bg-emerald-950/70 hover:bg-emerald-900/80 border border-emerald-600/60 text-emerald-300 hover:text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-all"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp Admisiones</span>
                </a>
              </div>
            </div>

            {/* Interactive Inside-Bento Level Switcher */}
            <div className="mt-10 pt-6 border-t border-slate-800/80 relative z-10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Exploración Rápida de Programas Oficiales:
                </span>
                
                {/* Switcher Toggle */}
                <div className="flex items-center p-1 bg-slate-950/90 rounded-xl border border-slate-800">
                  <button
                    type="button"
                    onClick={() => setActivePreviewTab('prepa')}
                    className={`py-1.5 px-3 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                      activePreviewTab === 'prepa'
                        ? 'bg-ipsur-pink-600 text-white shadow-xs'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Prepa IPSUR</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActivePreviewTab('universidad')}
                    className={`py-1.5 px-3 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                      activePreviewTab === 'universidad'
                        ? 'bg-sky-600 text-white shadow-xs'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>IUPS Universidad</span>
                  </button>
                </div>
              </div>

              {/* Dynamic Quick Preview Card */}
              {activePreviewTab === 'prepa' ? (
                <div className="bg-slate-950/70 rounded-2xl p-4 sm:p-5 border border-slate-800/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-pink-400 uppercase">Prepa IPSUR · 4 Bachilleratos Oficiales</span>
                      <span className="text-[10px] text-emerald-400 bg-emerald-950/80 border border-emerald-800/80 px-2 py-0.5 rounded font-mono font-bold">RVOE SEP</span>
                    </div>
                    <h4 className="text-sm sm:text-base font-bold text-white">Comunicación, Administración, Dibujo Arquitectónico y General</h4>
                    <p className="text-xs text-slate-400 leading-relaxed max-w-xl">
                      Modalidades Modular Intensiva (1 día a la semana), Mixta y 100% en Línea. Certificado oficial con validez nacional.
                    </p>
                  </div>
                  <button
                    onClick={() => goToPortalApp('prepa')}
                    className="flex-shrink-0 px-4 py-2.5 rounded-xl bg-ipsur-pink-600 hover:bg-ipsur-pink-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md cursor-pointer"
                  >
                    <span>Entrar a Prepa IPSUR</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="bg-slate-950/70 rounded-2xl p-4 sm:p-5 border border-slate-800/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-sky-400 uppercase">IUPS · Instituto Universitario Peninsular del Sur</span>
                      <span className="text-[10px] text-sky-300 bg-sky-950/80 border border-sky-800/80 px-2 py-0.5 rounded font-mono font-bold">8 Lic · 3 Ing · 8 Mae</span>
                    </div>
                    <h4 className="text-sm sm:text-base font-bold text-white">Derecho, Administración, Contaduría, Pedagogía, Ingenierías y Posgrados</h4>
                    <p className="text-xs text-slate-400 leading-relaxed max-w-xl">
                      Filosofía "Ciencia con Valores". Estudia en modalidad ejecutiva y mixta sin dejar de trabajar. Titulación ágil.
                    </p>
                  </div>
                  <button
                    onClick={() => goToPortalApp('universidad')}
                    className="flex-shrink-0 px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md cursor-pointer"
                  >
                    <span>Entrar a IUPS Universidad</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* ======================================================== */}
          {/* BENTO CARD 2: THE DUAL PORTAL ACCESS (Spans 4 cols)      */}
          {/* ======================================================== */}
          <div className="md:col-span-12 lg:col-span-4 bg-gradient-to-b from-slate-900/95 to-[#0b1328] border-2 border-slate-800 hover:border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-[80px] pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-full border border-slate-700">
                  Acceso Institucional
                </span>
                <span className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Portales Independientes</span>
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-white leading-snug">
                Portal Alumnos & Docentes
              </h3>
              <p className="text-xs text-slate-300 mt-2 mb-6 leading-relaxed">
                Selecciona tu nivel para ingresar directamente a tus salas virtuales, material de estudio y boletas:
              </p>

              {/* The Two Dedicated Portal Icons requested by User */}
              <div className="space-y-3.5">
                
                {/* PORTAL ICON 1: PREPA EN LÍNEA IPSUR */}
                <div 
                  onClick={() => goToPortalApp('prepa')}
                  className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 hover:border-ipsur-pink-500 transition-all cursor-pointer flex items-center justify-between group shadow-sm hover:shadow-lg hover:shadow-ipsur-pink-600/20"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-ipsur-pink-600 to-rose-500 text-white flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-105 transition-transform">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-ipsur-pink-400 uppercase tracking-wider block">
                        Nivel Medio Superior
                      </span>
                      <h4 className="text-sm font-black text-white group-hover:text-ipsur-pink-300 transition-colors">
                        Prepa en Línea IPSUR
                      </h4>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:bg-ipsur-pink-600 transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>

                {/* PORTAL ICON 2: IUPS UNIVERSIDAD */}
                <div 
                  onClick={() => goToPortalApp('universidad')}
                  className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 hover:border-sky-400 transition-all cursor-pointer flex items-center justify-between group shadow-sm hover:shadow-lg hover:shadow-sky-600/20"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-ipsur-navy-700 via-blue-600 to-sky-400 text-white flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-105 transition-transform">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider block">
                        Educación Superior & Posgrado
                      </span>
                      <h4 className="text-sm font-black text-white group-hover:text-sky-300 transition-colors">
                        IUPS Universidad en Línea
                      </h4>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:bg-sky-600 transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>

              </div>
            </div>

            {/* Bottom Card Footer */}
            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span className="text-[11px]">Control Escolar Sincronizado</span>
              <button
                onClick={() => goToPortalSelector()}
                className="text-pink-300 hover:text-white font-bold underline cursor-pointer text-[11px]"
              >
                Selector Completo →
              </button>
            </div>
          </div>

          {/* ======================================================== */}
          {/* BENTO CARD 3: RVOE SEP VALIDEZ OFICIAL (Spans 4 cols)    */}
          {/* ======================================================== */}
          <div className="md:col-span-12 sm:col-span-6 lg:col-span-4 bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-950/80 border border-emerald-800/80 text-emerald-400 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
                Validez Oficial Nacional
              </span>
              <h3 className="text-lg font-bold text-white">RVOE SEP Incorporado</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-normal">
                Tanto la Preparatoria IPSUR como las Licenciaturas, Ingenierías y Maestrías de IUPS cuentan con validez oficial ante la SEP. Tu certificado o cédula profesional son reconocidos en todo el país.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span className="font-mono text-[11px] text-emerald-300">SEP Federal & Estatal</span>
              <Check className="w-4 h-4 text-emerald-400" />
            </div>
          </div>

          {/* ======================================================== */}
          {/* BENTO CARD 4: PLATAFORMA EDUCORE 24/7 (Spans 4 cols)     */}
          {/* ======================================================== */}
          <div className="md:col-span-12 sm:col-span-6 lg:col-span-4 bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-ipsur-pink-950/80 border border-ipsur-pink-800/80 text-ipsur-pink-400 flex items-center justify-center">
                <Laptop className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold text-ipsur-pink-400 uppercase tracking-wider block">
                Tecnología de Vanguardia
              </span>
              <h3 className="text-lg font-bold text-white">Salas Virtuales y Material Didáctico</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-normal">
                Campus digital con material didáctico interactivo, clases virtuales, tareas con retroalimentación oportuna y seguimiento de calificaciones en tiempo real.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span className="font-mono text-[11px] text-pink-300">Plataforma 24/7 Activa</span>
              <Wifi className="w-4 h-4 text-ipsur-pink-400" />
            </div>
          </div>

          {/* ======================================================== */}
          {/* BENTO CARD 5: PWA APP MOVIL PARA TELÉFONO (Spans 4 cols) */}
          {/* ======================================================== */}
          <div className="md:col-span-12 lg:col-span-4 bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-sky-950/80 border border-sky-800/80 text-sky-400 flex items-center justify-center">
                <Smartphone className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider block">
                App para Android & iOS
              </span>
              <h3 className="text-lg font-bold text-white">Descarga la App en tu Celular</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-normal">
                Lleva tu escuela en tu bolsillo. Splash screen animado instantáneo, notificaciones en vivo de sesiones y tareas, con soporte móvil integral.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <button
                onClick={installPwa}
                className="text-sky-300 hover:text-white font-bold flex items-center gap-1.5 cursor-pointer text-xs"
              >
                <span>Instalar Aplicación Móvil</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <span className="text-[11px] text-slate-500 font-mono">PWA v3</span>
            </div>
          </div>

        </div>

        {/* Global Floating Marquee / Stat Ribbon */}
        <div className="mt-8 sm:mt-10 p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex flex-wrap items-center justify-around gap-4 text-center">
          <div className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl font-black font-mono text-white">+5,200</span>
            <span className="text-xs text-slate-400 font-medium">Alumnos Graduados</span>
          </div>
          <div className="hidden sm:block text-slate-700">|</div>
          <div className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl font-black font-mono text-ipsur-pink-400">4</span>
            <span className="text-xs text-slate-400 font-medium">Bachilleratos Especializados</span>
          </div>
          <div className="hidden sm:block text-slate-700">|</div>
          <div className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl font-black font-mono text-sky-400">19</span>
            <span className="text-xs text-slate-400 font-medium">Carreras y Posgrados IUPS</span>
          </div>
          <div className="hidden sm:block text-slate-700">|</div>
          <div className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl font-black font-mono text-emerald-400">100%</span>
            <span className="text-xs text-slate-400 font-medium">Validez Oficial SEP</span>
          </div>
        </div>

      </div>
    </section>
  );
}