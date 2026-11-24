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
  ChevronRight,
  Code,
  Briefcase,
  HeartPulse,
  Share2,
  Scale,
  BrainCircuit,
  Compass
} from 'lucide-react';

export default function AcademicOffersSection() {
  const { goToPortalApp } = useApp();
  const [activeTab, setActiveTab] = useState('prepa'); // 'prepa' | 'universidad'

  const prepaSpecialties = [
    {
      title: 'Informática y Programación Web',
      desc: 'Desarrollo de software, mantenimiento de equipos, bases de datos y creación de sitios web modernos.',
      duration: 'Modular Cuatrimestral',
      badge: 'Tecnología',
      icon: Code,
      topics: ['Algoritmos', 'Diseño Web', 'Bases de Datos', 'Ofimática Avanzada']
    },
    {
      title: 'Administración y Emprendimiento de Negocios',
      desc: 'Fundamentos de finanzas personales, mercadotecnia, constitución legal de empresas y gestión de proyectos.',
      duration: 'Modular Cuatrimestral',
      badge: 'Negocios',
      icon: Briefcase,
      topics: ['Contabilidad Básica', 'Modelos de Negocio', 'Ventas Digitales', 'Liderazgo']
    },
    {
      title: 'Auxiliar en Salud Comunitaria y Primeros Auxilios',
      desc: 'Introducción a la anatomía, nutrición, prevención de enfermedades y primeros auxilios asistenciales.',
      duration: 'Modular Cuatrimestral',
      badge: 'Salud',
      icon: HeartPulse,
      topics: ['Anatomía', 'Primeros Auxilios', 'Nutrición', 'Salud Preventiva']
    },
    {
      title: 'Comunicación, Medios Digitales y Publicidad',
      desc: 'Redacción publicitaria, producción multimedia para redes sociales y creación de contenido estratégico.',
      duration: 'Modular Cuatrimestral',
      badge: 'Creatividad',
      icon: Share2,
      topics: ['Contenido Digital', 'Diseño Gráfico', 'Redes Sociales', 'Expresión Oral']
    }
  ];

  const universityDegrees = [
    {
      title: 'Licenciatura en Administración y Negocios Digitales',
      level: 'Licenciatura',
      duration: '3 Años · Cuatrimestral',
      mode: '100% en Línea',
      icon: Briefcase,
      desc: 'Lidera organizaciones con visión estratégica, gestión de recursos humanos, finanzas modernas y marketing digital.',
      topics: ['Dirección Estratégica', 'Finanzas Corporativas', 'E-commerce', 'Gestión de Talento']
    },
    {
      title: 'Ingeniería en Tecnologías de la Información y Software',
      level: 'Ingeniería',
      duration: '3 Años · Cuatrimestral',
      mode: '100% en Línea',
      icon: Code,
      desc: 'Diseño y arquitectura de aplicaciones web, cloud computing, ciberseguridad, bases de datos y gestión de proyectos de software.',
      topics: ['Arquitectura Cloud', 'Desarrollo Full Stack', 'Ciberseguridad', 'DevOps & Git']
    },
    {
      title: 'Licenciatura en Pedagogía y Tecnologías Educativas',
      level: 'Licenciatura',
      duration: '3 Años · Cuatrimestral',
      mode: '100% en Línea',
      icon: BrainCircuit,
      desc: 'Formación de docentes y directivos expertos en diseño curricular, pedagogía contemporánea y entornos virtuales de aprendizaje.',
      topics: ['Diseño Instruccional', 'E-learning', 'Evaluación Curricular', 'Psicología Educativa']
    },
    {
      title: 'Licenciatura en Mercadotecnia y Comercio Electrónico',
      level: 'Licenciatura',
      duration: '3 Años · Cuatrimestral',
      mode: '100% en Línea',
      icon: Compass,
      desc: 'Estrategias de marca, ventas en línea, analítica digital, gestión de redes sociales y modelos de negocio en internet.',
      topics: ['Growth Marketing', 'SEO & Analytics', 'Social Media Ads', 'Logística E-commerce']
    },
    {
      title: 'Licenciatura en Derecho y Gestión Corporativa',
      level: 'Licenciatura',
      duration: '3 Años · Cuatrimestral',
      mode: '100% en Línea',
      icon: Scale,
      desc: 'Marco jurídico nacional e internacional, derecho civil, laboral, mercantil y resolución de controversias en la era digital.',
      topics: ['Derecho Mercantil', 'Contratos Digitales', 'Juicios Orales', 'Derecho Laboral']
    },
    {
      title: 'Maestría en Innovación Educativa y Cátedra Digital',
      level: 'Posgrado',
      duration: '1.5 Años · Cuatrimestral',
      mode: '100% en Línea',
      icon: Award,
      desc: 'Especialización para profesionistas que lideran la transformación digital de escuelas, universidades y centros de capacitación.',
      topics: ['Liderazgo Directivo', 'Inteligencia Artificial Educativa', 'Políticas Públicas', 'Investigación']
    }
  ];

  return (
    <section id="oferta" className="py-16 sm:py-24 bg-white border-b border-slate-200 select-none">
      {/* FULL-WIDTH WIDESCREEN CONTAINER */}
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        
        {/* Section Heading */}
        <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold mb-3 shadow-2xs">
            <Layers className="w-3.5 h-3.5 text-ipsur-pink-600" />
            <span>Catálogo Curricular Nacional con Validez SEP</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight font-display">
            Planes de Estudio Diseñados para Crecer
          </h2>

          <p className="mt-3 text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed max-w-3xl mx-auto">
            Descubre nuestra oferta académica integral. Ambos niveles cuentan con acreditación oficial y están integrados al portal virtual para tu comodidad.
          </p>

          {/* Academic Tabs Toggle */}
          <div className="mt-8 flex items-center justify-center p-1.5 bg-slate-100 rounded-2xl border border-slate-200 max-w-md mx-auto shadow-inner">
            <button
              onClick={() => setActiveTab('prepa')}
              className={`flex-1 py-3 px-5 rounded-xl text-xs sm:text-sm font-black transition flex items-center justify-center gap-2 cursor-pointer ${
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
              className={`flex-1 py-3 px-5 rounded-xl text-xs sm:text-sm font-black transition flex items-center justify-center gap-2 cursor-pointer ${
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
          <div id="prepa" className="space-y-12 animate-in fade-in duration-300">
            
            {/* Main Overview Bento Box */}
            <div className="bg-gradient-to-br from-pink-50/70 via-white to-slate-50 border-2 border-pink-100 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-100 text-ipsur-pink-800 text-xs font-black uppercase tracking-wider">
                    Bachillerato General Acreditado · SEP DGB
                  </div>

                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-tight font-display">
                    Preparatoria en Línea IPSUR: Obtén tu Certificado en 2 Años
                  </h3>

                  <p className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed font-normal">
                    La modalidad de <strong className="text-slate-900 font-bold">Prepa IPSUR</strong> te permite cursar tu bachillerato general con acompañamiento docente personalizado en el portal virtual. Avanza materia por materia, entrega actividades con fecha programada y cuenta con tutores que te respaldan en cada paso.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2 text-xs text-slate-700 font-medium">
                    <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
                      <div className="font-bold text-slate-900 text-sm mb-0.5">Duración</div>
                      <div className="text-slate-500">2 Años (6 Periodos Modulares)</div>
                    </div>
                    <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
                      <div className="font-bold text-slate-900 text-sm mb-0.5">Validez SEP</div>
                      <div className="text-slate-500">Certificado Digital Oficial</div>
                    </div>
                    <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
                      <div className="font-bold text-slate-900 text-sm mb-0.5">Metodología</div>
                      <div className="text-slate-500">100% en Línea con Horarios Libres</div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4 bg-white p-6 sm:p-8 rounded-3xl border border-pink-200 shadow-lg text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-ipsur-pink-600 to-rose-500 text-white flex items-center justify-center shadow-md">
                    <BookOpen className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-slate-900 font-display">¿Listo para comenzar?</h4>
                    <p className="text-xs text-slate-500 mt-1">Inscripciones abiertas todo el año sin examen de admisión.</p>
                  </div>
                  <button
                    onClick={() => goToPortalApp('prepa')}
                    className="w-full py-3.5 px-5 rounded-2xl bg-ipsur-pink-600 hover:bg-ipsur-pink-700 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Entrar al Portal Prepa IPSUR</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Specialties Bento Grid */}
            <div>
              <div className="mb-6">
                <span className="text-[11px] font-bold text-ipsur-pink-600 uppercase tracking-wider block">
                  Capacitación para el Trabajo Integrada
                </span>
                <h4 className="text-xl sm:text-2xl font-black text-slate-900 font-display">
                  Especializaciones del Bachillerato IPSUR
                </h4>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Desarrolla habilidades laborales prácticas certificadas que te abren puertas profesionales:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {prepaSpecialties.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div 
                      key={index}
                      className="bg-slate-50 hover:bg-white rounded-3xl p-6 border border-slate-200 hover:border-pink-300 hover:shadow-xl transition-all flex flex-col justify-between space-y-4 group"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[10px] font-black uppercase tracking-wider text-ipsur-pink-600 bg-pink-50 border border-pink-100 px-2.5 py-0.5 rounded-full">
                            {item.badge}
                          </span>
                          <div className="w-8 h-8 rounded-lg bg-pink-100 text-ipsur-pink-600 flex items-center justify-center">
                            <Icon className="w-4 h-4" />
                          </div>
                        </div>

                        <h5 className="text-base font-bold text-slate-900 leading-snug group-hover:text-ipsur-pink-600 transition-colors">
                          {item.title}
                        </h5>
                        <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                          {item.desc}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {item.topics.map((t, i) => (
                            <span key={i} className="text-[10px] font-semibold text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500 font-medium">
                        <span>{item.duration}</span>
                        <span className="text-emerald-600 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Oficial
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}

        {/* TAB CONTENT 2: UNIVERSIDAD EN LÍNEA */}
        {activeTab === 'universidad' && (
          <div id="universidad" className="space-y-12 animate-in fade-in duration-300">
            
            {/* Main Overview Bento Box */}
            <div className="bg-gradient-to-br from-sky-50/70 via-white to-slate-50 border-2 border-sky-100 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-black uppercase tracking-wider">
                    Nivel Superior · Licenciaturas, Ingenierías y Maestrías
                  </div>

                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-tight font-display">
                    Universidad en Línea: Carreras Profesionales con Alta Empleabilidad
                  </h3>

                  <p className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed font-normal">
                    Diseñada para personas que desean titularse con un modelo cuatrimestral dinámico. Cursa materias con docentes con grado de maestría y doctorado, desarrolla proyectos de valor y titúlate por promedio o diplomado.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2 text-xs text-slate-700 font-medium">
                    <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
                      <div className="font-bold text-slate-900 text-sm mb-0.5">Duración Licenciaturas</div>
                      <div className="text-slate-500">3 Años (9 Cuatrimestres)</div>
                    </div>
                    <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
                      <div className="font-bold text-slate-900 text-sm mb-0.5">Titulación Ágil</div>
                      <div className="text-slate-500">Por Promedio o Diplomado</div>
                    </div>
                    <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
                      <div className="font-bold text-slate-900 text-sm mb-0.5">Cátedra Virtual</div>
                      <div className="text-slate-500">Sesiones en Vivo y Grabadas</div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4 bg-white p-6 sm:p-8 rounded-3xl border border-sky-200 shadow-lg text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-ipsur-navy-700 to-sky-500 text-white flex items-center justify-center shadow-md">
                    <GraduationCap className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-slate-900 font-display">Portal Universitario</h4>
                    <p className="text-xs text-slate-500 mt-1">Accede a tus cátedras, biblioteca y expediente académico.</p>
                  </div>
                  <button
                    onClick={() => goToPortalApp('universidad')}
                    className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-ipsur-navy-700 to-sky-600 hover:from-ipsur-navy-800 hover:to-sky-700 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Entrar al Portal Universidad</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* University Careers Bento Grid */}
            <div>
              <div className="mb-6">
                <span className="text-[11px] font-bold text-sky-600 uppercase tracking-wider block">
                  Catálogo de Educación Superior
                </span>
                <h4 className="text-xl sm:text-2xl font-black text-slate-900 font-display">
                  Licenciaturas, Ingenierías y Posgrados
                </h4>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Programas universitarios actualizados con validez oficial SEP nacional:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {universityDegrees.map((deg, index) => {
                  const Icon = deg.icon;
                  return (
                    <div 
                      key={index}
                      className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 hover:border-sky-400 hover:shadow-xl transition-all flex flex-col justify-between space-y-4 group"
                    >
                      <div className="space-y-3.5">
                        <div className="flex items-center justify-between">
                          <span className={`text-[10px] font-extrabold uppercase px-3 py-1 rounded-full ${
                            deg.level === 'Posgrado'
                              ? 'bg-purple-100 text-purple-700 border border-purple-200'
                              : 'bg-sky-100 text-sky-800 border border-sky-200'
                          }`}>
                            {deg.level}
                          </span>
                          <span className="text-xs font-mono text-slate-400 flex items-center gap-1 font-semibold">
                            <Clock className="w-3.5 h-3.5" />
                            {deg.duration}
                          </span>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center flex-shrink-0 mt-0.5 border border-sky-100">
                            <Icon className="w-5 h-5" />
                          </div>
                          <h5 className="text-base font-bold text-slate-900 leading-snug group-hover:text-sky-600 transition-colors">
                            {deg.title}
                          </h5>
                        </div>

                        <p className="text-xs text-slate-600 leading-relaxed font-normal">
                          {deg.desc}
                        </p>

                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {deg.topics.map((t, i) => (
                            <span key={i} className="text-[10px] font-semibold text-slate-600 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          RVOE SEP Oficial
                        </span>

                        <button
                          onClick={() => goToPortalApp('universidad')}
                          className="font-bold text-sky-700 hover:text-sky-900 flex items-center gap-1 text-xs cursor-pointer group-hover:translate-x-0.5 transition-transform"
                        >
                          <span>Ver en Portal</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
