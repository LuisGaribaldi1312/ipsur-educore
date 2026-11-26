import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Laptop, 
  Users, 
  Clock, 
  ShieldCheck, 
  Smartphone, 
  Award, 
  Sparkles, 
  BookOpen, 
  GraduationCap,
  CheckCircle2,
  ArrowRight,
  Bell,
  MapPin,
  CalendarCheck
} from 'lucide-react';
import { INSTITUTIONAL_CAMPUS } from '../../data/institutionalLandingData';

export default function EducationalModelSection() {
  const { goToPortalApp, installPwa, isPwaInstalled } = useApp();

  const pillars = [
    {
      icon: Laptop,
      title: 'Plataforma Virtual EDUCORE 24/7',
      desc: 'Salas virtuales interactivas, repositorios didácticos oficiales, videoconferencias integradas y seguimiento de tareas en tiempo real desde cualquier dispositivo.',
      color: 'pink'
    },
    {
      icon: Users,
      title: 'Docentes Titulados y Asesoría Personalizada',
      desc: 'Profesores y catedráticos con nivel posgrado que resuelven dudas académicas, evalúan con rúbricas claras y brindan retroalimentación continua.',
      color: 'blue'
    },
    {
      icon: Clock,
      title: 'Modalidad Modular & Ejecutiva',
      desc: '¡Estudia sin tener que dejar de trabajar! Modalidad Modular de 1 día a la semana en Prepa y esquemas ejecutivos cuatrimestrales en Universidad IUPS.',
      color: 'pink'
    },
    {
      icon: ShieldCheck,
      title: 'Validez Oficial SEP Garantizada',
      desc: 'Todos nuestros planes cuentan con RVOE oficial SEP federal y estatal. Tu certificado de prepa, título y cédula profesional universitaria tienen validez nacional.',
      color: 'blue'
    },
    {
      icon: MapPin,
      title: 'Campus Físico en Playa del Carmen',
      desc: 'Instalaciones ubicadas en Calle 6 Norte entre Av. 20 y 25, Centro. Acceso a biblioteca, asesorías presenciales, laboratorios y trámites de control escolar.',
      color: 'pink'
    },
    {
      icon: Smartphone,
      title: 'App Móvil PWA Instalable',
      desc: 'Descarga directa en tu teléfono Android o iPhone. Acceso inmediato a tus clases con un solo toque, notificaciones en vivo y consumo de datos optimizado.',
      color: 'blue'
    }
  ];

  return (
    <section id="modelo" className="py-16 sm:py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-ipsur-pink-600/15 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-sky-500/15 rounded-full blur-[130px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-slate-200 text-xs font-bold mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-ipsur-pink-400" />
            <span>Modelo Pedagógico Integral Peninsular</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-display">
            ¿Por qué estudiar en IPSUR e IUPS?
          </h2>

          <p className="mt-3 text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Combinamos tecnología educativa de vanguardia, flexibilidad de horarios para trabajadores y el respaldo institucional de la Secretaría de Educación Pública:
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            const isPink = item.color === 'pink';

            return (
              <div 
                key={idx}
                className="bg-slate-800/70 hover:bg-slate-800/90 backdrop-blur-md border border-slate-700/80 rounded-3xl p-6 sm:p-7 transition-all duration-300 hover:border-slate-500 shadow-lg flex flex-col justify-between group"
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110 ${
                    isPink 
                      ? 'bg-ipsur-pink-950 text-ipsur-pink-400 border border-ipsur-pink-800/80' 
                      : 'bg-sky-950 text-sky-400 border border-sky-800/80'
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white mb-2 group-hover:text-pink-300 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-700/50 flex items-center justify-between text-xs text-slate-400">
                  <span className="font-mono text-[11px]">Garantía Institucional</span>
                  <CheckCircle2 className={`w-4 h-4 ${isPink ? 'text-ipsur-pink-400' : 'text-sky-400'}`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA within section */}
        <div className="mt-12 sm:mt-16 bg-gradient-to-r from-slate-800/90 via-slate-800/60 to-slate-800/90 border border-slate-700 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 max-w-5xl mx-auto shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base sm:text-lg font-bold text-white">¿Ya eres alumno o docente de la institución?</h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Ingresa directamente a tu aula virtual con tus credenciales asignadas:
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => goToPortalApp('prepa')}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-gradient-to-r from-ipsur-pink-600 to-rose-600 hover:from-ipsur-pink-500 hover:to-rose-500 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 cursor-pointer transition"
            >
              <span>Iniciar Sesión en Prepa</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={() => goToPortalApp('universidad')}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-gradient-to-r from-[#0A1128] via-[#141B41] to-sky-600 hover:from-[#141B41] hover:to-sky-500 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 cursor-pointer transition"
            >
              <span>Iniciar Sesión en IUPS</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}