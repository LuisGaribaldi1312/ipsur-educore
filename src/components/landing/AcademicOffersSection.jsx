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
  Compass,
  Building2,
  Wrench,
  Zap,
  Activity,
  Palette,
  Eye,
  Check,
  MessageCircle
} from 'lucide-react';
import { PREPA_DATA, IUPS_DATA } from '../../data/institutionalLandingData';

export default function AcademicOffersSection() {
  const { goToPortalApp } = useApp();
  const [activeTab, setActiveTab] = useState('prepa'); // 'prepa' | 'universidad'
  const [univSubTab, setUnivSubTab] = useState('licenciaturas'); // 'licenciaturas' | 'ingenierias' | 'maestrias'

  // Icon mapping helper
  const getPrepaIcon = (id) => {
    switch (id) {
      case 'prepa-comunicacion': return Share2;
      case 'prepa-administracion': return Briefcase;
      case 'prepa-dibujo': return Building2;
      default: return BookOpen;
    }
  };

  const getUnivIcon = (id) => {
    if (id.includes('derecho') || id.includes('amparo') || id.includes('juicios')) return Scale;
    if (id.includes('administracion') || id.includes('mba') || id.includes('gobierno')) return Briefcase;
    if (id.includes('pedagogia') || id.includes('educacion') || id.includes('calidad')) return BrainCircuit;
    if (id.includes('civil') || id.includes('interiorismo') || id.includes('inmobiliaria')) return Building2;
    if (id.includes('electrica')) return Zap;
    if (id.includes('mecanica')) return Wrench;
    if (id.includes('diseno')) return Palette;
    if (id.includes('deporte')) return Activity;
    if (id.includes('psicologia')) return HeartPulse;
    return GraduationCap;
  };

  return (
    <section id="oferta" className="py-16 sm:py-24 bg-white select-none">
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-ipsur-pink-600" />
            <span>Oferta Académica Oficial con RVOE SEP</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight font-display">
            Programas Educativos con Validez Nacional
          </h2>

          <p className="mt-3 text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Descubre los 4 bachilleratos de <strong className="text-ipsur-pink-600">Prepa IPSUR</strong> y las 19 carreras y posgrados de <strong className="text-sky-600">IUPS Universidad</strong> diseñados para impulsar tu éxito laboral:
          </p>

          {/* Level Segmented Pill Selector */}
          <div className="mt-8 inline-flex p-1.5 bg-slate-100 rounded-2xl border border-slate-200 shadow-inner max-w-md w-full">
            <button
              type="button"
              onClick={() => setActiveTab('prepa')}
              className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'prepa'
                  ? 'bg-gradient-to-r from-ipsur-pink-600 to-rose-600 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Prepa IPSUR (4 Bachilleratos)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('universidad')}
              className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'universidad'
                  ? 'bg-gradient-to-r from-ipsur-navy-700 via-blue-600 to-sky-500 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>IUPS Universidad (19 Programas)</span>
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* PREPA IPSUR TAB CONTENT                                  */}
        {/* ======================================================== */}
        {activeTab === 'prepa' && (
          <div className="space-y-12 animate-fadeIn">
            
            {/* Prepa Header Banner */}
            <div className="bg-gradient-to-r from-pink-50 via-rose-50/50 to-white rounded-3xl p-6 sm:p-8 border border-pink-100 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-ipsur-pink-700 bg-pink-100/80 px-2.5 py-1 rounded-full">
                    {PREPA_DATA.badge}
                  </span>
                  <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                    {PREPA_DATA.rvoe}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-display">
                  {PREPA_DATA.name} · {PREPA_DATA.institution}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {PREPA_DATA.description}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
                <button
                  type="button"
                  onClick={() => goToPortalApp('prepa')}
                  className="px-5 py-3 rounded-xl bg-gradient-to-r from-ipsur-pink-600 to-rose-600 hover:from-ipsur-pink-500 hover:to-rose-500 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Iniciar Sesión · Portal Prepa</span>
                </button>
                <a
                  href={`https://wa.me/${PREPA_DATA.whatsapp}?text=${encodeURIComponent('Hola, me interesa inscribirme en Prepa IPSUR.')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Pedir Beca</span>
                </a>
              </div>
            </div>

            {/* 3 Modalidades de Prepa */}
            <div>
              <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">
                3 Modalidades de Estudio para Tu Vida:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {PREPA_DATA.modalities.map((mod) => (
                  <div key={mod.id} className="bg-slate-50/70 hover:bg-white rounded-3xl p-6 border border-slate-200 transition-all hover:shadow-lg flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-ipsur-pink-600 bg-pink-50 border border-pink-200 px-2.5 py-1 rounded-full">
                          {mod.duration}
                        </span>
                        <Clock className="w-4 h-4 text-slate-400" />
                      </div>
                      <h5 className="text-base font-bold text-slate-900 mb-1">{mod.title}</h5>
                      <span className="text-xs font-semibold text-slate-500 block mb-3">{mod.subtitle}</span>
                      <p className="text-xs text-slate-600 leading-relaxed mb-4">{mod.desc}</p>
                      
                      <div className="space-y-2 border-t border-slate-200/60 pt-3">
                        {mod.highlights.map((h, i) => (
                          <div key={i} className="flex items-start gap-2 text-[11px] text-slate-600">
                            <CheckCircle2 className="w-3.5 h-3.5 text-ipsur-pink-500 flex-shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4 Programas de Bachillerato */}
            <div>
              <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">
                Los 4 Bachilleratos Oficiales de IPSUR:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {PREPA_DATA.programs.map((prog) => {
                  const Icon = getPrepaIcon(prog.id);
                  return (
                    <div 
                      key={prog.id}
                      className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-100 hover:border-ipsur-pink-400 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between group"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-[10px] font-black uppercase tracking-wider text-ipsur-pink-700 bg-pink-50 border border-pink-200 px-3 py-1 rounded-full">
                            {prog.badge}
                          </span>
                          <span className="text-xs font-mono font-bold text-slate-400">
                            {prog.duration}
                          </span>
                        </div>

                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-ipsur-pink-600 to-rose-500 text-white flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-105 transition-transform">
                            <Icon className="w-6 h-6" />
                          </div>
                          <div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                              {prog.type}
                            </span>
                            <h4 className="text-lg font-bold text-slate-900 group-hover:text-ipsur-pink-600 transition-colors">
                              {prog.name}
                            </h4>
                          </div>
                        </div>

                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                          {prog.desc}
                        </p>

                        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 mb-4 space-y-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                            Competencias y Habilidades Clave:
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {prog.skills.map((skill, sIdx) => (
                              <div key={sIdx} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                                <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                                <span className="line-clamp-1">{skill}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="text-xs text-slate-500">
                          <strong className="text-slate-700 font-bold">Continuidad Universitaria:</strong> {prog.careerPath}
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-xs font-mono text-emerald-600 font-bold">RVOE SEP Oficial</span>
                        <button
                          type="button"
                          onClick={() => goToPortalApp('prepa')}
                          className="text-xs font-bold text-ipsur-pink-600 hover:text-ipsur-pink-700 flex items-center gap-1.5 cursor-pointer"
                        >
                          <span>Iniciar Sesión en Prepa</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Prepa Mission / Vision / Principles */}
            <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 border border-slate-800 shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-ipsur-pink-400 block mb-2">Nuestra Esencia</span>
                  <h4 className="text-lg font-bold text-white mb-2">Misión Institucional</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{PREPA_DATA.mision}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-sky-400 block mb-2">Hacia Dónde Vamos</span>
                  <h4 className="text-lg font-bold text-white mb-2">Visión 2030</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{PREPA_DATA.vision}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 block mb-2">Principio Fundamental</span>
                  <h4 className="text-lg font-bold text-white mb-2">Centrado en la Persona</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{PREPA_DATA.principle}</p>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ======================================================== */}
        {/* IUPS UNIVERSIDAD TAB CONTENT                             */}
        {/* ======================================================== */}
        {activeTab === 'universidad' && (
          <div className="space-y-12 animate-fadeIn">
            
            {/* IUPS Header Banner */}
            <div className="bg-gradient-to-r from-sky-50 via-blue-50/50 to-white rounded-3xl p-6 sm:p-8 border border-sky-100 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-sky-800 bg-sky-100/80 px-2.5 py-1 rounded-full">
                    {IUPS_DATA.badge}
                  </span>
                  <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                    {IUPS_DATA.rvoe}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-display">
                  {IUPS_DATA.name} · {IUPS_DATA.institution}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {IUPS_DATA.description}
                </p>
                <p className="text-xs font-bold text-sky-700">
                  {IUPS_DATA.subSlogan}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
                <button
                  type="button"
                  onClick={() => goToPortalApp('universidad')}
                  className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#0A1128] via-[#141B41] to-sky-600 hover:from-[#141B41] hover:to-sky-500 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>Iniciar Sesión · Portal IUPS</span>
                </button>
                <a
                  href={`https://wa.me/${IUPS_DATA.whatsapp}?text=${encodeURIComponent('Hola, me interesa solicitar informes para las carreras de IUPS Universidad.')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Pedir Informes</span>
                </a>
              </div>
            </div>

            {/* IUPS 4 Ventajas Competitivas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {IUPS_DATA.advantages.map((adv, i) => (
                <div key={i} className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200 flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center mb-3">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <h5 className="text-sm font-bold text-slate-900 mb-1">{adv.title}</h5>
                    <p className="text-xs text-slate-600 leading-relaxed">{adv.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Sub-Filters for IUPS Offer: Licenciaturas (8) | Ingenierías (3) | Maestrías (8) */}
            <div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">
                    Catálogo de Programas Universitarios Oficiales:
                  </h4>
                  <span className="text-sm font-bold text-slate-700">
                    {univSubTab === 'licenciaturas' && '8 Licenciaturas con Alta Demanda Laboral'}
                    {univSubTab === 'ingenierias' && '3 Ingenierías con Formación Tecnológica Avanzada'}
                    {univSubTab === 'maestrias' && '8 Maestrías para Especialización y Alta Dirección'}
                  </span>
                </div>

                <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200">
                  <button
                    type="button"
                    onClick={() => setUnivSubTab('licenciaturas')}
                    className={`py-2 px-3.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                      univSubTab === 'licenciaturas'
                        ? 'bg-sky-600 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Licenciaturas (8)
                  </button>

                  <button
                    type="button"
                    onClick={() => setUnivSubTab('ingenierias')}
                    className={`py-2 px-3.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                      univSubTab === 'ingenierias'
                        ? 'bg-sky-600 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Ingenierías (3)
                  </button>

                  <button
                    type="button"
                    onClick={() => setUnivSubTab('maestrias')}
                    className={`py-2 px-3.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                      univSubTab === 'maestrias'
                        ? 'bg-sky-600 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Maestrías (8)
                  </button>
                </div>
              </div>

              {/* Subtab 1: 8 Licenciaturas */}
              {univSubTab === 'licenciaturas' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {IUPS_DATA.academicOffer.licenciaturas.map((carrera) => {
                    const Icon = getUnivIcon(carrera.id);
                    return (
                      <div 
                        key={carrera.id}
                        className="bg-white rounded-3xl p-6 border-2 border-slate-100 hover:border-sky-400 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between group"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700 bg-sky-50 border border-sky-200 px-2.5 py-0.5 rounded-full">
                              {carrera.area}
                            </span>
                            <span className="text-[11px] font-mono text-slate-400 font-semibold">{carrera.duration}</span>
                          </div>

                          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-ipsur-navy-700 to-sky-500 text-white flex items-center justify-center mb-3 shadow-md group-hover:scale-105 transition-transform">
                            <Icon className="w-5 h-5" />
                          </div>

                          <h5 className="text-base font-bold text-slate-900 group-hover:text-sky-600 transition-colors mb-2">
                            {carrera.name}
                          </h5>

                          <p className="text-xs text-slate-600 leading-relaxed mb-4">
                            {carrera.desc}
                          </p>

                          <div className="text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100 mb-2">
                            <strong className="text-slate-700 block">Campo de Aplicación:</strong>
                            {carrera.field}
                          </div>
                        </div>

                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                          <span className="font-mono text-emerald-600 font-bold">RVOE SEP</span>
                          <span className="text-sky-600 font-semibold group-hover:translate-x-1 transition-transform">Info →</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Subtab 2: 3 Ingenierías */}
              {univSubTab === 'ingenierias' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {IUPS_DATA.academicOffer.ingenierias.map((ing) => {
                    const Icon = getUnivIcon(ing.id);
                    return (
                      <div 
                        key={ing.id}
                        className="bg-white rounded-3xl p-6 border-2 border-slate-100 hover:border-sky-400 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between group"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700 bg-sky-50 border border-sky-200 px-2.5 py-0.5 rounded-full">
                              {ing.area}
                            </span>
                            <span className="text-[11px] font-mono text-slate-400 font-semibold">{ing.duration}</span>
                          </div>

                          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-slate-900 to-sky-600 text-white flex items-center justify-center mb-4 shadow-md group-hover:scale-105 transition-transform">
                            <Icon className="w-6 h-6" />
                          </div>

                          <h5 className="text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors mb-2">
                            {ing.name}
                          </h5>

                          <p className="text-xs text-slate-600 leading-relaxed mb-4">
                            {ing.desc}
                          </p>

                          <div className="text-[11px] text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-100 mb-2">
                            <strong className="text-slate-700 block mb-0.5">Especialización de la Carrera:</strong>
                            {ing.field}
                          </div>
                        </div>

                        <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                          <span className="font-mono text-emerald-600 font-bold">RVOE SEP Federal</span>
                          <span className="text-sky-600 font-semibold">Modalidad Ejecutiva</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Subtab 3: 8 Maestrías */}
              {univSubTab === 'maestrias' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {IUPS_DATA.academicOffer.maestrias.map((posgrado) => {
                    const Icon = getUnivIcon(posgrado.id);
                    return (
                      <div 
                        key={posgrado.id}
                        className="bg-white rounded-3xl p-6 border-2 border-slate-100 hover:border-sky-400 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between group"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 border border-purple-200 px-2.5 py-0.5 rounded-full">
                              Posgrado Oficial
                            </span>
                            <span className="text-[11px] font-mono text-slate-400 font-semibold">{posgrado.duration}</span>
                          </div>

                          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-800 to-sky-500 text-white flex items-center justify-center mb-3 shadow-md group-hover:scale-105 transition-transform">
                            <Icon className="w-5 h-5" />
                          </div>

                          <h5 className="text-base font-bold text-slate-900 group-hover:text-sky-600 transition-colors mb-2">
                            {posgrado.name}
                          </h5>

                          <p className="text-xs text-slate-600 leading-relaxed mb-4">
                            {posgrado.desc}
                          </p>

                          <div className="text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100 mb-2">
                            <strong className="text-slate-700 block">Dirigido a:</strong>
                            {posgrado.target}
                          </div>
                        </div>

                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                          <span className="font-mono text-emerald-600 font-bold">RVOE Grado Maestría</span>
                          <span className="text-sky-600 font-semibold group-hover:translate-x-1 transition-transform">Ver →</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

            </div>

            {/* Mensaje de Rectoría / Filosofía IUPS */}
            <div className="bg-gradient-to-br from-[#070D1B] via-[#0D1530] to-[#081024] text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-[100px] pointer-events-none" />
              
              <div className="relative z-10 max-w-4xl">
                <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-widest block mb-2">
                  {IUPS_DATA.welcomeDirector.title}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white font-display mb-4">
                  "{IUPS_DATA.welcomeDirector.quote}"
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed font-normal mb-6">
                  {IUPS_DATA.welcomeDirector.body}
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-800 text-xs text-slate-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Rectoría y Dirección General · Instituto Universitario Peninsular del Sur (IUPS)</span>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}