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
  Smartphone,
  MessageCircle,
  Clock
} from 'lucide-react';
import { PREPA_DATA, IUPS_DATA, INSTITUTIONAL_CAMPUS } from '../../data/institutionalLandingData';

export default function LandingFooter() {
  const { goToPortalSelector, goToPortalApp, institutionalInfo, installPwa } = useApp();

  return (
    <footer className="bg-[#070D1B] text-slate-400 text-xs border-t border-slate-800 select-none">
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Col 1: Brand & Identity (Spans 4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white p-1 flex items-center justify-center shadow-md">
                <img 
                  src="/ipsur-logo.png" 
                  alt="IPSUR Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="text-base font-black text-white block leading-none">
                  IPSUR · IUPS EDUCORE
                </span>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">
                  Prepa & Universidad Peninsular
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed font-normal">
              Ecosistema educativo digital para el nivel Medio Superior y Superior. Validez oficial de estudios (RVOE SEP), salas virtuales en vivo y programas flexibles para trabajadores.
            </p>

            <div className="space-y-2 pt-2 text-slate-300 text-[11px]">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-ipsur-pink-500 flex-shrink-0 mt-0.5" />
                <span>{INSTITUTIONAL_CAMPUS.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <span>{INSTITUTIONAL_CAMPUS.schedule}</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span className="font-semibold">{PREPA_DATA.rvoe} · {IUPS_DATA.rvoe}</span>
              </div>
            </div>
          </div>

          {/* Col 2: Prepa en Línea IPSUR (Spans 3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-ipsur-pink-500" />
              <span>Prepa IPSUR</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#oferta" className="hover:text-white transition">Bachillerato en Comunicación</a>
              </li>
              <li>
                <a href="#oferta" className="hover:text-white transition">Bachillerato en Administración</a>
              </li>
              <li>
                <a href="#oferta" className="hover:text-white transition">Bachillerato en Dibujo Arquitectónico</a>
              </li>
              <li>
                <a href="#oferta" className="hover:text-white transition">Bachillerato General (2 Años)</a>
              </li>
              <li>
                <a href="#modelo" className="hover:text-white transition">Modalidad Modular (1 día/semana)</a>
              </li>
              <li className="pt-1">
                <a 
                  href={`tel:${PREPA_DATA.phone.replace(/[^0-9+]/g, '')}`} 
                  className="text-slate-300 hover:text-white flex items-center gap-1.5 text-[11px]"
                >
                  <Phone className="w-3.5 h-3.5 text-pink-400" />
                  <span>Tel: {PREPA_DATA.phone}</span>
                </a>
              </li>
              <li>
                <a 
                  href={`https://wa.me/${PREPA_DATA.whatsapp}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 text-[11px]"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp: {PREPA_DATA.whatsappDisplay}</span>
                </a>
              </li>
              <li>
                <button 
                  onClick={() => goToPortalApp('prepa')}
                  className="text-ipsur-pink-400 hover:text-ipsur-pink-300 font-bold flex items-center gap-1 text-[11px] mt-1 cursor-pointer"
                >
                  <span>Portal Prepa en Línea IPSUR</span>
                  <span>→</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: IUPS Universidad (Spans 3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-sky-400" />
              <span>IUPS Universidad</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#oferta" className="hover:text-white transition">8 Licenciaturas (Derecho, Administración...)</a>
              </li>
              <li>
                <a href="#oferta" className="hover:text-white transition">3 Ingenierías (Civil, Eléctrica, Mecánica)</a>
              </li>
              <li>
                <a href="#oferta" className="hover:text-white transition">8 Maestrías Oficiales de Posgrado</a>
              </li>
              <li>
                <a href="#modelo" className="hover:text-white transition">Modalidad Ejecutiva sin Dejar de Trabajar</a>
              </li>
              <li>
                <a href="#modelo" className="hover:text-white transition">Cátedras con Catedráticos de Posgrado</a>
              </li>
              <li className="pt-1">
                <a 
                  href={`tel:${IUPS_DATA.phone.replace(/[^0-9+]/g, '')}`} 
                  className="text-slate-300 hover:text-white flex items-center gap-1.5 text-[11px]"
                >
                  <Phone className="w-3.5 h-3.5 text-sky-400" />
                  <span>Tel: {IUPS_DATA.phone}</span>
                </a>
              </li>
              <li>
                <a 
                  href={`https://wa.me/${IUPS_DATA.whatsapp}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 text-[11px]"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp: {IUPS_DATA.whatsappDisplay}</span>
                </a>
              </li>
              <li>
                <button 
                  onClick={() => goToPortalApp('universidad')}
                  className="text-sky-400 hover:text-sky-300 font-bold flex items-center gap-1 text-[11px] mt-1 cursor-pointer"
                >
                  <span>Portal IUPS Universidad</span>
                  <span>→</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Acceso Rápido al Portal (Spans 2) */}
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

            <a
              href="#preinscripcion"
              className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white font-bold text-[11px] transition flex items-center justify-center gap-1.5 shadow-sm text-center"
            >
              <span>Ficha de Preinscripción Online</span>
            </a>

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
            © 2026 {PREPA_DATA.institution} & {IUPS_DATA.institution}. Todos los derechos reservados.
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Aviso de Privacidad</span>
            <span>·</span>
            <span>Términos de Servicio</span>
            <span>·</span>
            <span>Plataforma EDUCORE {institutionalInfo.version}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}