import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  BookOpen, 
  GraduationCap, 
  LogIn, 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  ExternalLink,
  Smartphone
} from 'lucide-react';

export default function LandingFooter() {
  const { goToPortalSelector, goToPortalApp, institutionalInfo, installPwa } = useApp();

  return (
    <footer className="bg-[#070D1B] text-slate-400 text-xs border-t border-slate-800 select-none">
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Col 1: Brand & Identity */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white p-1 flex items-center justify-center">
                <img 
                  src="/ipsur-logo.png" 
                  alt="IPSUR Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="text-base font-black text-white block leading-none">
                  IPSUR EDUCORE
                </span>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">
                  Prepa & Universidad en Línea
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed font-normal">
              {institutionalInfo.slogan} Educación media superior y superior 100% en línea con validez oficial SEP y la mejor tecnología en salas virtuales.
            </p>

            <div className="flex items-center gap-2 pt-1 text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="font-semibold text-[11px]">{institutionalInfo.rvoe}</span>
            </div>
          </div>

          {/* Col 2: Prepa en Línea IPSUR */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-ipsur-pink-500" />
              <span>Prepa en Línea IPSUR</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#prepa" className="hover:text-white transition">Bachillerato General en 2 Años</a>
              </li>
              <li>
                <a href="#prepa" className="hover:text-white transition">Especialidad en Informática</a>
              </li>
              <li>
                <a href="#prepa" className="hover:text-white transition">Especialidad en Administración</a>
              </li>
              <li>
                <a href="#prepa" className="hover:text-white transition">Certificado Oficial SEP</a>
              </li>
              <li>
                <button 
                  onClick={() => goToPortalApp('prepa')}
                  className="text-ipsur-pink-400 hover:text-ipsur-pink-300 font-bold flex items-center gap-1 text-[11px] mt-1 cursor-pointer"
                >
                  <span>Portal Prepa IPSUR</span>
                  <span>→</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Universidad en Línea */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-sky-400" />
              <span>Universidad en Línea</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#universidad" className="hover:text-white transition">Licenciaturas Ejecutivas</a>
              </li>
              <li>
                <a href="#universidad" className="hover:text-white transition">Ingeniería en Tecnologías de Software</a>
              </li>
              <li>
                <a href="#universidad" className="hover:text-white transition">Licenciatura en Administración</a>
              </li>
              <li>
                <a href="#universidad" className="hover:text-white transition">Posgrados y Maestrías</a>
              </li>
              <li>
                <button 
                  onClick={() => goToPortalApp('universidad')}
                  className="text-sky-400 hover:text-sky-300 font-bold flex items-center gap-1 text-[11px] mt-1 cursor-pointer"
                >
                  <span>Portal Universidad en Línea</span>
                  <span>→</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Acceso Rápido al Portal */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <LogIn className="w-3.5 h-3.5 text-emerald-400" />
              <span>Acceso al Portal</span>
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Ingresa a tus aulas virtuales, boleta cuatrimestral y control escolar:
            </p>
            <button
              onClick={() => goToPortalSelector()}
              className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-ipsur-pink-600 to-rose-600 hover:from-ipsur-pink-500 hover:to-rose-500 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Entrar al Portal</span>
            </button>

            <button
              onClick={installPwa}
              className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-semibold text-[11px] transition flex items-center justify-center gap-1.5 border border-slate-700 cursor-pointer"
            >
              <Smartphone className="w-3 h-3 text-sky-400" />
              <span>Descargar App Móvil</span>
            </button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <div>
            © 2026 {institutionalInfo.schoolName}. Todos los derechos reservados.
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Aviso de Privacidad</span>
            <span>·</span>
            <span>Términos de Servicio</span>
            <span>·</span>
            <span>Plataforma IPSUR EDUCORE {institutionalInfo.version}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
