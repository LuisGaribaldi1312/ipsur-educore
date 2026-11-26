import React from 'react';
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
  MessageCircle,
  FileCheck
} from 'lucide-react';
import { PREPA_DATA, IUPS_DATA, INSTITUTIONAL_CAMPUS } from '../../data/institutionalLandingData';

export default function HeroSection() {
  const { goToPortalApp } = useApp();

  return (
    <section id="inicio" className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-800 pt-8 sm:pt-14 pb-16 sm:pb-20 select-none border-b border-slate-200">
      
      {/* Subtle Institutional Architectural Lines (Prestigious Mexican Academic Vibe) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: 'radial-gradient(#0A1128 1px, transparent 1px)',
        backgroundSize: '24px 24px'
      }} />

      <div className="relative z-10 w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        
        {/* Top Accreditation & Institutional Badge */}
        <div className="flex items-center justify-center mb-6 text-center">
          <div className="inline-flex items-center gap-2 sm:gap-2.5 px-4 sm:px-5 py-2 rounded-full bg-white border border-slate-200 shadow-sm text-slate-700 text-xs sm:text-sm font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-bold text-[#0A1128]">Instituto Peninsular del Sur & IUPS Universidad</span>
            <span className="text-slate-300">•</span>
            <span className="inline-flex items-center gap-1 text-emerald-700 font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Validez Oficial SEP · RVOE</span>
            </span>
          </div>
        </div>

        {/* Hero Grid: Main Headline & Dual Portal Direct Login Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Academic Title, Value Proposition & Actions (Spans 7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-pink-50 border border-pink-200 text-ipsur-pink-700 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-ipsur-pink-600" />
              <span>Inscripciones Abiertas Ciclo 2026-2027 · Becas de hasta 40%</span>
            </div>

            <h1 className="text-3xl sm:text-5xl xl:text-6xl font-black tracking-tight leading-[1.15] text-[#0A1128] font-display">
              Bachillerato y Universidad en Línea con{' '}
              <span className="text-ipsur-pink-600">
                Excelencia Académica
              </span>{' '}
              y Validez Oficial SEP
            </h1>

            <p className="text-sm sm:text-base xl:text-lg text-slate-600 max-w-2xl leading-relaxed font-normal mx-auto lg:mx-0">
              Estudia tu preparatoria en modalidad modular de 1 día a la semana o cursa tu licenciatura, ingeniería o maestría 100% en línea. Diseñado para jóvenes y trabajadores que buscan superarse sin descuidar su empleo.
            </p>

            {/* Direct Portal Access Highlight Cards (The user's key request) */}
            <div className="pt-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-3 text-center lg:text-left">
                Accesos Directos para Iniciar Sesión en el Campus Virtual:
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto lg:mx-0">
                
                {/* Direct Card: Prepa en Línea IPSUR */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white border-2 border-pink-100 hover:border-ipsur-pink-500 shadow-md hover:shadow-xl transition-all duration-200 flex flex-col justify-between group text-left">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-pink-50 text-ipsur-pink-700 border border-pink-200">
                        Nivel Medio Superior
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-400">IPSUR</span>
                    </div>

                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-ipsur-pink-600 to-rose-500 text-white flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-display font-black text-base text-slate-900 group-hover:text-ipsur-pink-600 transition-colors">
                          Prepa en Línea
                        </h3>
                        <span className="text-[11px] text-slate-500 font-medium">4 Bachilleratos Técnicos</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-snug mb-4">
                      Salas virtuales, tareas con rúbricas al 100% y boletas oficiales SEP.
                    </p>
                  </div>

                  {/* DIRECT LOGIN BUTTON FOR PREPA */}
                  <button
                    type="button"
                    onClick={() => goToPortalApp('prepa')}
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-ipsur-pink-600 to-rose-600 hover:from-ipsur-pink-500 hover:to-rose-500 text-white font-extrabold text-xs shadow-md transition flex items-center justify-center gap-2 cursor-pointer group-hover:gap-2.5"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>Iniciar Sesión en Prepa</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Direct Card: IUPS Universidad en Línea */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white border-2 border-sky-100 hover:border-sky-500 shadow-md hover:shadow-xl transition-all duration-200 flex flex-col justify-between group text-left">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-800 border border-sky-200">
                        Educación Superior
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-400">IUPS</span>
                    </div>

                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0A1128] to-sky-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                        <GraduationCap className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-display font-black text-base text-slate-900 group-hover:text-sky-600 transition-colors">
                          Universidad IUPS
                        </h3>
                        <span className="text-[11px] text-slate-500 font-medium">19 Carreras & Posgrados</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-snug mb-4">
                      Licenciaturas e ingenierías con cédula profesional y titulación ágil.
                    </p>
                  </div>

                  {/* DIRECT LOGIN BUTTON FOR UNIVERSIDAD */}
                  <button
                    type="button"
                    onClick={() => goToPortalApp('universidad')}
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#0A1128] via-[#141B41] to-sky-600 hover:from-[#141B41] hover:to-sky-500 text-white font-extrabold text-xs shadow-md transition flex items-center justify-center gap-2 cursor-pointer group-hover:gap-2.5"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>Iniciar Sesión en IUPS</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            </div>

            {/* Secondary Public Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <a
                href="#preinscripcion"
                className="px-5 py-3 rounded-xl bg-white hover:bg-slate-50 border-2 border-slate-300 hover:border-slate-400 text-slate-800 font-bold text-xs sm:text-sm flex items-center gap-2 transition shadow-xs cursor-pointer"
              >
                <FileCheck className="w-4 h-4 text-ipsur-pink-600" />
                <span>Preinscripción en Línea (Ficha Oficial con QR)</span>
              </a>

              <a
                href="https://wa.me/529843623473?text=Hola,%20me%20gustar%C3%ADa%20solicitar%20informes%20y%20beca%20para%20estudiar%20en%20IPSUR/IUPS."
                target="_blank"
                rel="noreferrer"
                className="px-4 py-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-800 font-bold text-xs sm:text-sm flex items-center gap-2 transition cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Pedir Beca por WhatsApp</span>
              </a>
            </div>

          </div>

          {/* Right Column: Authentic Academic Photo Showcase (Spans 5 cols) */}
          <div className="lg:col-span-5 relative">
            
            {/* Main Authentic Student Image Container */}
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100 aspect-[4/3] sm:aspect-[14/11]">
                <img
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1000&auto=format&fit=crop&q=80"
                  alt="Estudiantes universitarios y de preparatoria en campus"
                  className="w-full h-full object-cover object-top"
                />

                {/* Gradient bottom overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128]/80 via-transparent to-transparent" />

                {/* Bottom Photo Caption */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-pink-300 block">
                    Comunidad Estudiantil
                  </span>
                  <p className="text-sm font-bold leading-tight drop-shadow">
                    Formando líderes y profesionales en Playa del Carmen y todo México
                  </p>
                </div>
              </div>

              {/* Floating Academic Trust Badge 1: Top Right */}
              <div className="absolute -top-4 -right-2 sm:-right-4 bg-white p-3 sm:p-3.5 rounded-2xl shadow-xl border border-slate-200 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Acreditación Oficial</span>
                  <span className="text-xs font-black text-slate-900">RVOE SEP Federal & Estatal</span>
                </div>
              </div>

              {/* Floating Academic Trust Badge 2: Bottom Left */}
              <div className="absolute -bottom-5 -left-2 sm:-left-4 bg-white p-3 sm:p-3.5 rounded-2xl shadow-xl border border-slate-200 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-pink-100 text-ipsur-pink-600 flex items-center justify-center font-bold">
                  <Laptop className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Campus Virtual EDUCORE</span>
                  <span className="text-xs font-black text-slate-900">Salas en Vivo & 24/7</span>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Global Academic Trust & Stat Ribbon */}
        <div className="mt-12 sm:mt-16 p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          
          <div className="space-y-1">
            <span className="text-2xl sm:text-3xl font-black font-display text-[#0A1128]">+5,200</span>
            <span className="text-xs font-bold text-slate-600 block">Alumnos Egresados</span>
            <span className="text-[11px] text-slate-400 font-medium">Con certificado y título oficial</span>
          </div>

          <div className="space-y-1">
            <span className="text-2xl sm:text-3xl font-black font-display text-ipsur-pink-600">100%</span>
            <span className="text-xs font-bold text-slate-600 block">Validez Oficial SEP</span>
            <span className="text-[11px] text-slate-400 font-medium">Reconocimiento nacional RVOE</span>
          </div>

          <div className="space-y-1">
            <span className="text-2xl sm:text-3xl font-black font-display text-sky-600">23</span>
            <span className="text-xs font-bold text-slate-600 block">Programas Educativos</span>
            <span className="text-[11px] text-slate-400 font-medium">4 Bachilleratos y 19 Carreras</span>
          </div>

          <div className="space-y-1">
            <span className="text-2xl sm:text-3xl font-black font-display text-emerald-600">Playa del Carmen</span>
            <span className="text-xs font-bold text-slate-600 block">Plantel Central Físico</span>
            <span className="text-[11px] text-slate-400 font-medium">Calle 6 Norte entre 20 y 25</span>
          </div>

        </div>

      </div>
    </section>
  );
}
