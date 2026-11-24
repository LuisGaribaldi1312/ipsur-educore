import React, { useState } from 'react';
import { 
  Building2, 
  Target, 
  Eye, 
  Sparkles, 
  HeartHandshake, 
  ShieldCheck, 
  Award, 
  Users, 
  BookOpen, 
  GraduationCap, 
  CheckCircle2, 
  ArrowRight,
  Compass,
  Scale,
  MapPin,
  CalendarCheck
} from 'lucide-react';
import { PREPA_DATA, IUPS_DATA, INSTITUTIONAL_CAMPUS } from '../../data/institutionalLandingData';
import { useApp } from '../../context/AppContext';

export default function AboutUsSection() {
  const { goToPortalApp, goToPortalSelector } = useApp();
  const [activeTab, setActiveTab] = useState('prepa'); // 'prepa' | 'universidad'

  return (
    <section id="nosotros" className="py-16 sm:py-24 bg-gradient-to-b from-white via-slate-50/50 to-white relative overflow-hidden select-none border-b border-slate-200/80">
      
      {/* Background Decorative Accents */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-pink-100/40 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-sky-100/40 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-ipsur-pink-600" />
            <span>Identidad & Filosofía Institucional</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight font-display">
            Quiénes Somos: Educación con Sentido Humano
          </h2>

          <p className="mt-3 text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Conoce la historia, misión, visión y valores que sustentan el liderazgo educativo de <strong className="text-ipsur-pink-600">Prepa IPSUR</strong> y la <strong className="text-sky-600">Universidad IUPS</strong> en Playa del Carmen y la Riviera Maya:
          </p>

          {/* Interactive Switcher */}
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
              <span>Prepa IPSUR</span>
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
              <span>IUPS Universidad</span>
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {activeTab === 'prepa' ? (
          /* PREPA IPSUR ABOUT US CONTENT */
          <div className="space-y-12 animate-fadeIn max-w-6xl mx-auto">
            
            {/* Master Identity Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-pink-100 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-pink-50 rounded-full blur-[80px] pointer-events-none" />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="text-[10px] font-black uppercase tracking-wider text-ipsur-pink-700 bg-pink-50 border border-pink-200 px-3 py-1 rounded-full">
                      {PREPA_DATA.badge}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                      Playa del Carmen, Q. Roo
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
                    {PREPA_DATA.institution} ({PREPA_DATA.acronym})
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {PREPA_DATA.description}
                  </p>

                  <div className="p-4 rounded-2xl bg-pink-50/60 border border-pink-100/80 text-xs text-slate-700 leading-relaxed">
                    <strong className="text-ipsur-pink-700 font-bold block mb-1">
                      Principio Rector:
                    </strong>
                    "{PREPA_DATA.principle}"
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-slate-500">
                    <span className="flex items-center gap-1.5 font-semibold text-slate-700">
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                      {PREPA_DATA.rvoe}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5 text-slate-600">
                      <MapPin className="w-4 h-4 text-ipsur-pink-500" />
                      {INSTITUTIONAL_CAMPUS.address}
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-gradient-to-br from-ipsur-pink-600 to-rose-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                      <HeartHandshake className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-pink-200">
                      Lema Oficial
                    </span>
                    <h4 className="text-lg sm:text-xl font-black leading-snug">
                      "{PREPA_DATA.slogan}"
                    </h4>
                    <p className="text-xs text-pink-100 leading-relaxed">
                      {PREPA_DATA.subSlogan}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-white/20 flex items-center justify-between text-xs text-pink-100">
                    <span>Bachillerato en 2 Años</span>
                    <button
                      onClick={() => goToPortalApp('prepa')}
                      className="text-white font-bold underline cursor-pointer"
                    >
                      Portal Prepa →
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Misión y Visión Side-by-Side Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              
              {/* Misión Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-ipsur-pink-50 text-ipsur-pink-600 flex items-center justify-center mb-4 border border-ipsur-pink-100">
                    <Target className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-ipsur-pink-600 block mb-1">
                    Propósito Fundamental
                  </span>
                  <h4 className="text-xl font-bold text-slate-900 mb-3 font-display">
                    Misión Institucional Prepa IPSUR
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {PREPA_DATA.mision}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-400">
                  <CheckCircle2 className="w-4 h-4 text-ipsur-pink-500" />
                  <span>Desarrollo tecnológico, académico y humano</span>
                </div>
              </div>

              {/* Visión Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center mb-4 border border-sky-100">
                    <Eye className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-sky-600 block mb-1">
                    Nuestra Proyección
                  </span>
                  <h4 className="text-xl font-bold text-slate-900 mb-3 font-display">
                    Visión Institucional Prepa IPSUR
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {PREPA_DATA.vision}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-400">
                  <CheckCircle2 className="w-4 h-4 text-sky-500" />
                  <span>Incorporación exitosa a la universidad y campo laboral</span>
                </div>
              </div>

            </div>

            {/* 5 Valores Institucionales Prepa */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-800">
              <div className="mb-6">
                <span className="text-[10px] font-black uppercase tracking-widest text-ipsur-pink-400 block mb-1">
                  Nuestra Brújula Ética
                </span>
                <h4 className="text-xl sm:text-2xl font-black text-white font-display">
                  Valores que Rigen a la Comunidad IPSUR
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {PREPA_DATA.values.map((val, idx) => (
                  <div key={idx} className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700/80 space-y-2">
                    <span className="w-7 h-7 rounded-xl bg-pink-950 text-ipsur-pink-400 flex items-center justify-center text-xs font-mono font-bold border border-pink-800/80">
                      0{idx + 1}
                    </span>
                    <h5 className="text-sm font-bold text-white">{val.title}</h5>
                    <p className="text-xs text-slate-300 leading-relaxed">{val.desc}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        ) : (
          /* IUPS UNIVERSIDAD ABOUT US CONTENT */
          <div className="space-y-12 animate-fadeIn max-w-6xl mx-auto">
            
            {/* Master Identity Card IUPS */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-sky-100 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-sky-50 rounded-full blur-[80px] pointer-events-none" />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="text-[10px] font-black uppercase tracking-wider text-sky-800 bg-sky-50 border border-sky-200 px-3 py-1 rounded-full">
                      {IUPS_DATA.badge}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                      Playa del Carmen, Q. Roo
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
                    {IUPS_DATA.institution} ({IUPS_DATA.acronym})
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {IUPS_DATA.description}
                  </p>

                  <div className="p-4 rounded-2xl bg-sky-50/60 border border-sky-100/80 text-xs text-slate-700 leading-relaxed">
                    <strong className="text-sky-700 font-bold block mb-1">
                      Filosofía Universitaria:
                    </strong>
                    "{IUPS_DATA.philosophy}"
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-slate-500">
                    <span className="flex items-center gap-1.5 font-semibold text-slate-700">
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                      {IUPS_DATA.rvoe}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5 text-slate-600">
                      <MapPin className="w-4 h-4 text-sky-500" />
                      {INSTITUTIONAL_CAMPUS.address}
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-gradient-to-br from-ipsur-navy-700 via-blue-700 to-sky-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-200">
                      Lema Universitario
                    </span>
                    <h4 className="text-lg sm:text-xl font-black leading-snug">
                      "{IUPS_DATA.slogan}"
                    </h4>
                    <p className="text-xs text-sky-100 leading-relaxed font-medium">
                      {IUPS_DATA.subSlogan}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-white/20 flex items-center justify-between text-xs text-sky-100">
                    <span>19 Carreras & Posgrados</span>
                    <button
                      onClick={() => goToPortalApp('universidad')}
                      className="text-white font-bold underline cursor-pointer"
                    >
                      Portal Universidad →
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Misión y Visión Side-by-Side Cards IUPS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              
              {/* Misión Card IUPS */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center mb-4 border border-sky-100">
                    <Target className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-sky-600 block mb-1">
                    Compromiso Educativo
                  </span>
                  <h4 className="text-xl font-bold text-slate-900 mb-3 font-display">
                    Misión Institucional IUPS
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {IUPS_DATA.mision}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-400">
                  <CheckCircle2 className="w-4 h-4 text-sky-500" />
                  <span>Formación de líderes con rigor científico y pertinencia laboral</span>
                </div>
              </div>

              {/* Visión Card IUPS */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4 border border-purple-100">
                    <Eye className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-purple-600 block mb-1">
                    Nuestra Meta 2030
                  </span>
                  <h4 className="text-xl font-bold text-slate-900 mb-3 font-display">
                    Visión Institucional IUPS
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {IUPS_DATA.vision}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-400">
                  <CheckCircle2 className="w-4 h-4 text-purple-500" />
                  <span>Referencia universitaria en Quintana Roo y el sureste mexicano</span>
                </div>
              </div>

            </div>

            {/* 5 Valores Institucionales IUPS */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-800">
              <div className="mb-6">
                <span className="text-[10px] font-black uppercase tracking-widest text-sky-400 block mb-1">
                  Pilares de Formación Superior
                </span>
                <h4 className="text-xl sm:text-2xl font-black text-white font-display">
                  Valores que Rigen a la Comunidad Universitaria IUPS
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {IUPS_DATA.values.map((val, idx) => (
                  <div key={idx} className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700/80 space-y-2">
                    <span className="w-7 h-7 rounded-xl bg-sky-950 text-sky-400 flex items-center justify-center text-xs font-mono font-bold border border-sky-800/80">
                      0{idx + 1}
                    </span>
                    <h5 className="text-sm font-bold text-white">{val.title}</h5>
                    <p className="text-xs text-slate-300 leading-relaxed">{val.desc}</p>
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