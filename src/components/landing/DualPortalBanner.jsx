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
  const { goToPortalApp } = useApp();

  return (
    <section className="py-16 sm:py-20 bg-white border-b border-slate-200 select-none">
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold mb-3 shadow-2xs">
            <Layers className="w-3.5 h-3.5 text-ipsur-pink-600" />
            <span>Portales Institucionales Independientes</span>
          </div>
          
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#0A1128] tracking-tight font-display">
            Dos Portales Educativos Especializados
          </h2>
          
          <p className="mt-4 text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed max-w-3xl mx-auto">
            Por disposición pedagógica y control escolar, la <strong className="text-ipsur-pink-600 font-bold">Prepa en Línea IPSUR</strong> y la <strong className="text-sky-600 font-bold">Universidad en Línea IUPS</strong> cuentan con portales separados. Haz clic en tu nivel educativo para iniciar sesión directamente:
          </p>
        </div>

        {/* The Two Distinct Portal Access Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto">
          
          {/* CARD 1: PREPA EN LÍNEA IPSUR */}
          <div className="bg-slate-50/70 hover:bg-white rounded-3xl p-6 sm:p-9 border-2 border-slate-200 hover:border-ipsur-pink-500 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between group relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-ipsur-pink-700 bg-pink-100 border border-pink-200 px-3.5 py-1 rounded-full">
                  Nivel Medio Superior · Bachillerato SEP
                </span>
                <span className="text-xs font-mono font-bold text-slate-400">Portal 01</span>
              </div>

              {/* Icon & Title */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-ipsur-pink-600 to-rose-500 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform flex-shrink-0">
                  <BookOpen className="w-8 h-8" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-ipsur-pink-600 uppercase tracking-widest block">
                    Instituto Peninsular del Sur
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-ipsur-pink-600 transition-colors font-display">
                    Prepa en Línea IPSUR
                  </h3>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                Campus virtual exclusivo para estudiantes, profesores y directivos de preparatoria. Ingresa con tu matrícula y contraseña oficial para consultar tus clases por Meet, entregas y boleta SEP.
              </p>

              <div className="space-y-2.5 pt-4 border-t border-slate-200/80 text-xs text-slate-700 mb-8 font-medium">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-ipsur-pink-600 flex-shrink-0" />
                  <span>4 Especialidades: Comunicación, Administración, Dibujo y General</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-ipsur-pink-600 flex-shrink-0" />
                  <span>Modalidad Modular de 1 día/semana y 100% en Línea</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-ipsur-pink-600 flex-shrink-0" />
                  <span>Validez oficial SEP en todo México para entrar a cualquier universidad</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => goToPortalApp('prepa')}
              className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-ipsur-pink-600 to-rose-600 hover:from-ipsur-pink-500 hover:to-rose-500 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition cursor-pointer group-hover:gap-2.5"
            >
              <LogIn className="w-4 h-4" />
              <span>Iniciar Sesión en Prepa en Línea</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* CARD 2: IUPS UNIVERSIDAD */}
          <div className="bg-slate-50/70 hover:bg-white rounded-3xl p-6 sm:p-9 border-2 border-slate-200 hover:border-sky-500 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between group relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-sky-800 bg-sky-100 border border-sky-200 px-3.5 py-1 rounded-full">
                  Nivel Superior · Licenciaturas & Posgrados
                </span>
                <span className="text-xs font-mono font-bold text-slate-400">Portal 02</span>
              </div>

              {/* Icon & Title */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#0A1128] via-[#141B41] to-sky-600 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform flex-shrink-0">
                  <GraduationCap className="w-8 h-8" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-sky-600 uppercase tracking-widest block">
                    Instituto Universitario Peninsular del Sur
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-sky-600 transition-colors font-display">
                    IUPS Universidad en Línea
                  </h3>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                Campus universitario oficial para estudiantes de carreras profesionales, ingenierías y posgrados. Accede a tus cátedras magistrales, biblioteca digital y seguimiento de titulación.
              </p>

              <div className="space-y-2.5 pt-4 border-t border-slate-200/80 text-xs text-slate-700 mb-8 font-medium">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-sky-600 flex-shrink-0" />
                  <span>8 Licenciaturas (Derecho, Administración, Contaduría, Psicología...)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-sky-600 flex-shrink-0" />
                  <span>3 Ingenierías (Civil, Eléctrica, Mecánica) y 8 Maestrías oficiales</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-sky-600 flex-shrink-0" />
                  <span>RVOE SEP Incorporado para emisión de cédula profesional federal</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => goToPortalApp('universidad')}
              className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-[#0A1128] via-[#141B41] to-sky-600 hover:from-[#141B41] hover:to-sky-500 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition cursor-pointer group-hover:gap-2.5"
            >
              <LogIn className="w-4 h-4" />
              <span>Iniciar Sesión en IUPS Universidad</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Informative Institutional Notice */}
        <div className="mt-10 p-4 rounded-2xl bg-slate-100 border border-slate-200 text-center max-w-3xl mx-auto text-xs text-slate-600 flex flex-col sm:flex-row items-center justify-center gap-2">
          <Lock className="w-4 h-4 text-slate-500 shrink-0" />
          <span>
            <strong>Aviso de Seguridad:</strong> Cada portal es independiente. Los alumnos de preparatoria ingresan exclusivamente en el Portal de Prepa y los de universidad en el Portal Universitario.
          </span>
        </div>

      </div>
    </section>
  );
}
