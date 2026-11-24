import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  BookOpen, 
  GraduationCap, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Laptop, 
  FileText, 
  Award,
  LogIn,
  CheckCircle2,
  Lock,
  Layers,
  MapPin,
  Clock
} from 'lucide-react';
import { PREPA_DATA, IUPS_DATA } from '../../data/institutionalLandingData';

export default function DualPortalBanner() {
  const { goToPortalApp, goToPortalSelector } = useApp();

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-white via-slate-50 to-white border-y border-slate-200/80 select-none">
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-ipsur-pink-50 border border-ipsur-pink-200 text-ipsur-pink-700 text-xs font-bold mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-ipsur-pink-600" />
            <span>Pestaña "Portal" en el Menú Principal</span>
          </div>
          
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight font-display">
            Dos Portales Educativos en un Solo Ecosistema Digital
          </h2>
          
          <p className="mt-4 text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed max-w-3xl mx-auto">
            Nuestra institución cuenta con accesos directos e independientes para cada nivel educativo. Al hacer clic en la pestaña <strong className="text-ipsur-navy-900 font-bold">"Portal"</strong> del menú, los estudiantes, docentes y directivos pueden elegir su campus correspondiente:
          </p>
        </div>

        {/* The Two Distinct Portal Access Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-6xl mx-auto">
          
          {/* CARD 1: PREPA EN LÍNEA IPSUR */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-slate-200 hover:border-ipsur-pink-500 transition-all duration-300 shadow-md hover:shadow-2xl flex flex-col justify-between group transform hover:-translate-y-1 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-pink-100/50 rounded-full blur-[60px] pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-ipsur-pink-700 bg-pink-50 border border-pink-200 px-3.5 py-1.5 rounded-full shadow-2xs">
                  Nivel Medio Superior · Bachillerato
                </span>
                <span className="text-xs font-mono font-bold text-slate-400">Portal 01</span>
              </div>

              {/* Icon & Title */}
              <div className="flex items-center gap-4 sm:gap-5 mb-5">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-ipsur-pink-600 to-rose-500 text-white flex items-center justify-center shadow-lg shadow-ipsur-pink-600/30 group-hover:scale-105 transition-transform flex-shrink-0">
                  <BookOpen className="w-8 h-8 sm:w-10 sm:h-10" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-ipsur-pink-600 uppercase tracking-widest block">
                    Bachillerato Oficial
                  </span>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 group-hover:text-ipsur-pink-600 transition-colors font-display">
                    Prepa en Línea IPSUR
                  </h3>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                Espacio virtual exclusivo para alumnos de preparatoria, docentes y directivos del <strong className="text-slate-800">Instituto Peninsular del Sur</strong>. Accede a tus materias por cuatrimestre, guías didácticas oficiales, entregas de actividades, boletas y exámenes en línea.
              </p>

              <div className="space-y-3 pt-4 border-t border-slate-100 text-xs text-slate-700 mb-8 font-medium">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-ipsur-pink-500 flex-shrink-0" />
                  <span>4 Bachilleratos: Comunicación, Administración, Dibujo y General</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-ipsur-pink-500 flex-shrink-0" />
                  <span>Modalidad Modular Intensiva (1 día/semana), Mixta y 100% en Línea</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-ipsur-pink-500 flex-shrink-0" />
                  <span>Certificado oficial SEP con validez nacional para cualquier universidad</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => goToPortalApp('prepa')}
              className="relative z-10 w-full py-4 px-5 rounded-2xl bg-gradient-to-r from-ipsur-pink-600 via-pink-600 to-rose-600 hover:from-ipsur-pink-500 hover:to-rose-500 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-ipsur-pink-600/25 transition cursor-pointer group-hover:gap-3"
            >
              <span>Ingresar a Prepa en Línea IPSUR</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* CARD 2: IUPS UNIVERSIDAD */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-slate-200 hover:border-sky-500 transition-all duration-300 shadow-md hover:shadow-2xl flex flex-col justify-between group transform hover:-translate-y-1 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-sky-100/50 rounded-full blur-[60px] pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-sky-800 bg-sky-50 border border-sky-200 px-3.5 py-1.5 rounded-full shadow-2xs">
                  Nivel Superior · Licenciaturas & Posgrados
                </span>
                <span className="text-xs font-mono font-bold text-slate-400">Portal 02</span>
              </div>

              {/* Icon & Title */}
              <div className="flex items-center gap-4 sm:gap-5 mb-5">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-ipsur-navy-700 via-blue-600 to-sky-400 text-white flex items-center justify-center shadow-lg shadow-sky-600/30 group-hover:scale-105 transition-transform flex-shrink-0">
                  <GraduationCap className="w-8 h-8 sm:w-10 sm:h-10" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-sky-600 uppercase tracking-widest block">
                    Educación Superior
                  </span>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 group-hover:text-sky-600 transition-colors font-display">
                    IUPS Universidad en Línea
                  </h3>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                Campus virtual del <strong className="text-slate-800">Instituto Universitario Peninsular del Sur (IUPS)</strong>. Creado para estudiar sin dejar de trabajar. Acceso a cátedras con docentes especializados, biblioteca digital, materias cuatrimestrales y titulación ágil.
              </p>

              <div className="space-y-3 pt-4 border-t border-slate-100 text-xs text-slate-700 mb-8 font-medium">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-sky-500 flex-shrink-0" />
                  <span>8 Licenciaturas: Derecho, Administración, Contaduría, Pedagogía y más</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-sky-500 flex-shrink-0" />
                  <span>3 Ingenierías (Civil, Eléctrica, Mecánica) y 8 Maestrías de Posgrado</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-sky-500 flex-shrink-0" />
                  <span>Modalidad Ejecutiva & RVOE SEP Incorporado para cédula profesional</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => goToPortalApp('universidad')}
              className="relative z-10 w-full py-4 px-5 rounded-2xl bg-gradient-to-r from-ipsur-navy-700 via-blue-600 to-sky-500 hover:from-ipsur-navy-800 hover:to-sky-600 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-sky-600/25 transition cursor-pointer group-hover:gap-3"
            >
              <span>Ingresar a IUPS Universidad en Línea</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Global Access Link */}
        <div className="mt-12 text-center">
          <button
            onClick={() => goToPortalSelector()}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-600 hover:text-ipsur-navy-900 bg-white border border-slate-300 px-5 py-2.5 rounded-xl shadow-xs hover:shadow-md transition cursor-pointer"
          >
            <Layers className="w-4 h-4 text-ipsur-pink-600" />
            <span>Ver Pantalla Completa del Selector de Portales</span>
            <ArrowRight className="w-4 h-4 text-slate-400" />
          </button>
        </div>

      </div>
    </section>
  );
}