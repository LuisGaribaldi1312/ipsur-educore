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
  CheckCircle2
} from 'lucide-react';

export default function DualPortalBanner() {
  const { goToPortalApp, goToPortalSelector } = useApp();

  return (
    <section className="py-16 sm:py-20 bg-slate-50 border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-ipsur-pink-50 border border-ipsur-pink-200 text-ipsur-pink-700 text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-ipsur-pink-600" />
            <span>Acceso Centralizado para Estudiantes y Docentes</span>
          </div>
          
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Dos Portales Educativos, un Solo Ecosistema Digital
          </h2>
          
          <p className="mt-3 text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed">
            Nuestra plataforma unifica tanto la educación media superior como la superior. Al pulsar en la pestaña <strong className="text-ipsur-navy-700 font-bold">"Portal"</strong> del menú, podrás ingresar directamente a cualquiera de los dos niveles con tu cuenta institucional:
          </p>
        </div>

        {/* The Two Distinct Portal Access Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* CARD 1: PREPA EN LÍNEA IPSUR */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 hover:border-ipsur-pink-500 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-[10px] font-black uppercase tracking-wider text-ipsur-pink-700 bg-pink-50 border border-pink-200 px-3 py-1 rounded-full">
                  Nivel Medio Superior
                </span>
                <span className="text-xs font-mono font-bold text-slate-400">Portal 01</span>
              </div>

              {/* Icon & Title */}
              <div className="flex items-center gap-4 mb-5">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-ipsur-pink-600 to-rose-500 text-white flex items-center justify-center shadow-lg shadow-ipsur-pink-600/20 group-hover:scale-105 transition-transform flex-shrink-0">
                  <BookOpen className="w-8 h-8" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-ipsur-pink-600 uppercase tracking-widest block">
                    Bachillerato Oficial
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-ipsur-pink-600 transition-colors">
                    Prepa en Línea IPSUR
                  </h3>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                Espacio exclusivo para alumnos de bachillerato, docentes y directivos. Accede a tus materias, guías didácticas, entregas con fecha límite y boleta cuatrimestral.
              </p>

              <div className="space-y-2.5 pt-4 border-t border-slate-100 text-xs text-slate-600 mb-8">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-ipsur-pink-500 flex-shrink-0" />
                  <span>Salas Virtuales interactivas y material de estudio</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-ipsur-pink-500 flex-shrink-0" />
                  <span>Entrega de tareas escolares con rúbricas y criterios</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-ipsur-pink-500 flex-shrink-0" />
                  <span>Boleta de calificaciones y actas institucionales</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => goToPortalApp('prepa')}
              className="w-full py-3.5 px-4 rounded-2xl bg-ipsur-pink-600 hover:bg-ipsur-pink-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-ipsur-pink-600/20 transition cursor-pointer group-hover:gap-3"
            >
              <span>Ingresar a Prepa en Línea IPSUR</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* CARD 2: UNIVERSIDAD EN LÍNEA */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 hover:border-sky-500 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-[10px] font-black uppercase tracking-wider text-sky-700 bg-sky-50 border border-sky-200 px-3 py-1 rounded-full">
                  Educación Superior
                </span>
                <span className="text-xs font-mono font-bold text-slate-400">Portal 02</span>
              </div>

              {/* Icon & Title */}
              <div className="flex items-center gap-4 mb-5">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-ipsur-navy-700 via-blue-600 to-sky-500 text-white flex items-center justify-center shadow-lg shadow-sky-600/20 group-hover:scale-105 transition-transform flex-shrink-0">
                  <GraduationCap className="w-8 h-8" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-sky-600 uppercase tracking-widest block">
                    Nivel Universitario
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-sky-600 transition-colors">
                    Universidad en Línea
                  </h3>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                Campus virtual universitario para licenciaturas, ingenierías y posgrados. Acceso a cátedras superiores, biblioteca digital y seguimiento de créditos para titulación.
              </p>

              <div className="space-y-2.5 pt-4 border-t border-slate-100 text-xs text-slate-600 mb-8">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-500 flex-shrink-0" />
                  <span>Cátedra virtual con docentes de maestría y doctorado</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-500 flex-shrink-0" />
                  <span>Gestión de proyectos de grado y materias ejecutivas</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-500 flex-shrink-0" />
                  <span>Historial de créditos acumulados y trámites de titulación</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => goToPortalApp('universidad')}
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-ipsur-navy-700 to-blue-600 hover:from-ipsur-navy-800 hover:to-blue-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-ipsur-navy-700/20 transition cursor-pointer group-hover:gap-3"
            >
              <span>Ingresar a Universidad en Línea</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
