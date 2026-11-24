import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  BookOpen, 
  GraduationCap, 
  Clock, 
  Calendar, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Laptop, 
  Award,
  FileText,
  Sparkles,
  Layers,
  ChevronRight
} from 'lucide-react';

export default function AcademicOffersSection() {
  const { goToPortalApp } = useApp();
  const [activeTab, setActiveTab] = useState('prepa'); // 'prepa' | 'universidad'

  const prepaSpecialties = [
    {
      title: 'Tecnologías de la Información y Programación',
      desc: 'Desarrollo de habilidades en herramientas digitales, software, bases de datos y creación de contenido web.',
      duration: 'Modular',
      badge: 'Alta Demanda'
    },
    {
      title: 'Administración y Gestión de Pequeñas Empresas',
      desc: 'Fundamentos de emprendimiento, contabilidad práctica, mercadeo y organización administrativa.',
      duration: 'Modular',
      badge: 'Práctico'
    },
    {
      title: 'Auxiliar en Salud y Bienestar Comunitario',
      desc: 'Introducción a las ciencias biológicas, primeros auxilios, prevención de la salud y nutrición básica.',
      duration: 'Modular',
      badge: 'Vocacional'
    },
    {
      title: 'Comunicación, Medios Digitales y Diseño',
      desc: 'Redacción profesional, producción multimedia, diseño visual e interacción en entornos virtuales.',
      duration: 'Modular',
      badge: 'Creativo'
    }
  ];

  const universityDegrees = [
    {
      title: 'Licenciatura en Administración de Empresas y Negocios',
      level: 'Licenciatura',
      duration: '3 Años · Cuatrimestral',
      mode: '100% en Línea',
      desc: 'Lidera organizaciones con visión estratégica, gestión de recursos humanos, finanzas modernas y marketing digital.'
    },
    {
      title: 'Ingeniería en Tecnologías de la Información y Software',
      level: 'Ingeniería',
      duration: '3 Años · Cuatrimestral',
      mode: '100% en Línea',
      desc: 'Diseño y arquitectura de aplicaciones web, cloud computing, ciberseguridad, bases de datos y gestión de proyectos de software.'
    },
    {
      title: 'Licenciatura en Pedagogía y Tecnologías Educativas',
      level: 'Licenciatura',
      duration: '3 Años · Cuatrimestral',
      mode: '100% en Línea',
      desc: 'Formación de docentes y directivos expertos en diseño curricular, pedagogía contemporánea y entornos virtuales de aprendizaje.'
    },
    {
      title: 'Licenciatura en Mercadotecnia y Comercio Electrónico',
      level: 'Licenciatura',
      duration: '3 Años · Cuatrimestral',
      mode: '100% en Línea',
      desc: 'Estrategias de marca, ventas en línea, analítica digital, gestión de redes sociales y modelos de negocio en internet.'
    },
    {
      title: 'Licenciatura en Derecho y Gestión Corporativa',
      level: 'Licenciatura',
      duration: '3 Años · Cuatrimestral',
      mode: '100% en Línea',
      desc: 'Marco jurídico nacional e internacional, derecho civil, laboral, mercantil y resolución de controversias en la era digital.'
    },
    {
      title: 'Maestría en Innovación Educativa y Cátedra Digital',
      level: 'Posgrado',
      duration: '1.5 Años · Cuatrimestral',
      mode: '100% en Línea',
      desc: 'Especialización para profesionistas que lideran la transformación digital de escuelas, universidades y centros de capacitación.'
    }
  ];

  return (
    <section id="oferta" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold mb-3">
            <Layers className="w-3.5 h-3.5 text-ipsur-pink-600" />
            <span>Catálogo Curricular Oficial</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Nuestra Oferta Académica
          </h2>

          <p className="mt-3 text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed">
            Planes de estudio flexibles avalados con <strong className="text-slate-800">Validez Oficial SEP</strong>. Elige entre preparatoria acelerada o formación universitaria de alto impacto.
          </p>

          {/* Academic Tabs Toggle */}
          <div className="mt-8 flex items-center justify-center p-1.5 bg-slate-100 rounded-2xl border border-slate-200 max-w-md mx-auto shadow-inner">
            <button
              onClick={() => setActiveTab('prepa')}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'prepa'
                  ? 'bg-ipsur-pink-600 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Prepa en Línea IPSUR</span>
            </button>

            <button
              onClick={() => setActiveTab('universidad')}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'universidad'
                  ? 'bg-ipsur-navy-700 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Universidad en Línea</span>
            </button>
          </div>
        </div>

        {/* TAB CONTENT 1: PREPA EN LÍNEA IPSUR */}
        {activeTab === 'prepa' && (
          <div id="prepa" className="space-y-12">
            
            {/* Main Overview Banner */}
            <div className="bg-gradient-to-br from-pink-50 via-white to-slate-50 border-2 border-pink-100 rounded-3xl p-6 sm:p-10 shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 text-ipsur-pink-800 text-xs font-black uppercase tracking-wider">
                    Bachillerato General con Acreditación SEP
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-snug">
                    Preparatoria en Línea IPSUR: Tu certificado oficial en solo 2 años
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    La modalidad de <strong className="text-slate-800">Prepa IPSUR</strong> está diseñada para adaptarse a tu ritmo de vida laboral y personal. A través de nuestro portal virtual, avanzas por materias cuatrimestrales, cuentas con asesoría permanente de docentes y entregas actividades semanales sin presiones de horario.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-slate-700 font-medium">
                    <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
                      <div className="font-bold text-slate-900 mb-0.5">Duración</div>
                      <div className="text-slate-500">2 Años (6 Cuatrimestres)</div>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
                      <div className="font-bold text-slate-900 mb-0.5">Validez</div>
                      <div className="text-slate-500">Certificado SEP Oficial</div>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
                      <div className="font-bold text-slate-900 mb-0.5">Modalidad</div>
                      <div className="text-slate-500">100% en Línea / Asíncrono</div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-pink-200 shadow-md text-center space-y-4">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-pink-100 text-ipsur-pink-600 flex items-center justify-center">
                    <BookOpen className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900">¿Listo para estudiar?</h4>
                    <p className="text-xs text-slate-500 mt-1">Inscripciones abiertas todo el año sin examen de admisión.</p>
                  </div>
                  <button
                    onClick={() => goToPortalApp('prepa')}
                    className="w-full py-3 px-4 rounded-xl bg-ipsur-pink-600 hover:bg-ipsur-pink-700 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Entrar al Portal Prepa IPSUR</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Specialties & Vocational Training */}
            <div>
              <div className="mb-6">
                <span className="text-[11px] font-bold text-ipsur-pink-600 uppercase tracking-wider block">
                  Capacitación para el Trabajo
                </span>
                <h4 className="text-xl sm:text-2xl font-black text-slate-900">
                  Especializaciones Incluidas en el Bachillerato IPSUR
                </h4>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Obtén competencias laborales certificadas que te preparan tanto para ingresar a la universidad como para el campo de trabajo:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {prepaSpecialties.map((item, index) => (
                  <div 
                    key={index}
                    className="bg-slate-50 hover:bg-white rounded-2xl p-5 border border-slate-200 hover:border-pink-300 hover:shadow-md transition-all flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-ipsur-pink-600 bg-pink-50 border border-pink-100 px-2 py-0.5 rounded">
                        {item.badge}
                      </span>
                      <h5 className="text-sm font-bold text-slate-900 mt-2.5 leading-snug">
                        {item.title}
                      </h5>
                      <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                      <span>Módulos prácticos</span>
                      <span className="text-ipsur-pink-600 font-bold">Incluido</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB CONTENT 2: UNIVERSIDAD EN LÍNEA */}
        {activeTab === 'universidad' && (
          <div id="universidad" className="space-y-12">
            
            {/* Main Overview Banner */}
            <div className="bg-gradient-to-br from-sky-50 via-white to-slate-50 border-2 border-sky-100 rounded-3xl p-6 sm:p-10 shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-black uppercase tracking-wider">
                    Educación Superior · Licenciaturas, Ingenierías y Maestrías
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-snug">
                    Universidad en Línea: Carreras profesionales para el mundo global
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Diseñada para personas que buscan titularse sin pausar su vida profesional. Nuestro modelo universitario cuatrimestral te permite cursar materias con catedráticos con posgrado, realizar proyectos aplicados reales y obtener tu título con validez oficial SEP.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-slate-700 font-medium">
                    <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
                      <div className="font-bold text-slate-900 mb-0.5">Duración Licenciaturas</div>
                      <div className="text-slate-500">3 Años (9 Cuatrimestres)</div>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
                      <div className="font-bold text-slate-900 mb-0.5">Titulación Ágil</div>
                      <div className="text-slate-500">Por Promedio o Proyecto</div>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
                      <div className="font-bold text-slate-900 mb-0.5">Acompañamiento</div>
                      <div className="text-slate-500">Cátedra y Asesoría 24/7</div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-sky-200 shadow-md text-center space-y-4">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center">
                    <GraduationCap className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900">Portal Universitario</h4>
                    <p className="text-xs text-slate-500 mt-1">Ingresa a tus cátedras, biblioteca digital y expediente de créditos.</p>
                  </div>
                  <button
                    onClick={() => goToPortalApp('universidad')}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-ipsur-navy-700 to-sky-600 hover:from-ipsur-navy-800 hover:to-sky-700 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Entrar al Portal Universidad</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* University Careers Grid */}
            <div>
              <div className="mb-6">
                <span className="text-[11px] font-bold text-sky-600 uppercase tracking-wider block">
                  Planes de Estudio de Nivel Superior
                </span>
                <h4 className="text-xl sm:text-2xl font-black text-slate-900">
                  Carreras Profesionales y Posgrados en Línea
                </h4>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Programas actualizados con alta empleabilidad y desarrollo de habilidades directivas:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {universityDegrees.map((deg, index) => (
                  <div 
                    key={index}
                    className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 hover:border-sky-400 hover:shadow-lg transition-all flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${
                          deg.level === 'Posgrado'
                            ? 'bg-purple-100 text-purple-700 border border-purple-200'
                            : 'bg-sky-100 text-sky-800 border border-sky-200'
                        }`}>
                          {deg.level}
                        </span>
                        <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {deg.duration}
                        </span>
                      </div>

                      <h5 className="text-base font-bold text-slate-900 leading-snug">
                        {deg.title}
                      </h5>

                      <p className="text-xs text-slate-600 leading-relaxed font-normal">
                        {deg.desc}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        RVOE SEP Oficial
                      </span>

                      <button
                        onClick={() => goToPortalApp('universidad')}
                        className="font-bold text-sky-700 hover:text-sky-900 flex items-center gap-1 text-[11px] cursor-pointer"
                      >
                        <span>Ver en Portal</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
