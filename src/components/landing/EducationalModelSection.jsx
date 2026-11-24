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
  Bell
} from 'lucide-react';

export default function EducationalModelSection() {
  const { goToPortalSelector, installPwa, isPwaInstalled } = useApp();

  const pillars = [
    {
      icon: Laptop,
      title: 'Plataforma Virtual EDUCORE 24/7',
      desc: 'Salas virtuales interactivas, repositorios didácticos, videoconferencias integradas y seguimiento de tareas en tiempo real.',
      color: 'pink'
    },
    {
      icon: Users,
      title: 'Docentes Titulados y Asesoría Continua',
      desc: 'Profesores especializados que resuelven tus dudas académicas, califican tus actividades con rúbricas oficiales y te acompañan paso a paso.',
      color: 'blue'
    },
    {
      icon: Clock,
      title: 'Flexibilidad Total de Horarios',
      desc: 'Estudia a tu propio ritmo. Ideal para estudiantes que trabajan o tienen responsabilidades familiares sin sacrificar la calidad educativa.',
      color: 'pink'
    },
    {
      icon: ShieldCheck,
      title: 'Validez Oficial SEP Garantizada',
      desc: 'Planes con reconocimiento oficial de validez de estudios (RVOE). Tu certificado de prepa o título universitario tiene valor en todo México y el extranjero.',
      color: 'blue'
    },
    {
      icon: Smartphone,
      title: 'App Móvil PWA Instalable',
      desc: 'Instala la aplicación en tu celular Android o iPhone. Accede a tus clases, recibe alertas cuando tus compañeros o docentes se conectan y consulta tus calificaciones.',
      color: 'pink'
    },
    {
      icon: Award,
      title: 'Becas y Colegiaturas Congeladas',
      desc: 'Precios justos, sin costos ocultos, sin examen de admisión y con opciones de becas académicas de hasta 40% durante toda tu trayectoria.',
      color: 'blue'
    }
  ];

  return (
    <section id="modelo" className="py-16 sm:py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-ipsur-pink-600/15 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-sky-500/15 rounded-full blur-[130px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-slate-200 text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-ipsur-pink-400" />
            <span>Innovación en Educación a Distancia</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            ¿Por qué estudiar en IPSUR EDUCORE?
          </h2>

          <p className="mt-3 text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed">
            Hemos transformado la experiencia de estudiar en línea combinando tecnología intuitiva, calidad pedagógica y un entorno seguro para tu crecimiento:
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

                  <h3 className="text-base sm:text-lg font-bold text-white mb-2 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-700/60 flex items-center justify-between text-xs">
                  <span className={`font-mono text-[11px] font-bold ${isPink ? 'text-ipsur-pink-400' : 'text-sky-400'}`}>
                    IPSUR · Garantía Oficial
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Experience Banner */}
        <div className="mt-12 sm:mt-16 bg-gradient-to-r from-ipsur-navy-900 via-slate-900 to-ipsur-pink-950 border border-slate-700/90 rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-[10px] font-black uppercase tracking-wider text-ipsur-pink-400 bg-pink-950/80 px-2.5 py-1 rounded-full border border-pink-800/80">
              Acceso a la Plataforma
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              ¿Ya eres alumno o docente de Prepa o Universidad?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Ingresa con tu matrícula y contraseña al Portal Educativo para revisar tus salas virtuales y calificaciones.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => goToPortalSelector()}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-ipsur-pink-600 to-rose-600 hover:from-ipsur-pink-500 hover:to-rose-500 text-white font-extrabold text-xs sm:text-sm shadow-xl flex items-center gap-2 cursor-pointer transition-all"
            >
              <span>Ingresar al Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {!isPwaInstalled && (
              <button
                onClick={installPwa}
                className="px-4 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs flex items-center gap-2 border border-white/20 transition cursor-pointer"
              >
                <Smartphone className="w-4 h-4 text-sky-400" />
                <span>Instalar en Celular</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
