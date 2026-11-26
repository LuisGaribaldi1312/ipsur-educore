import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Menu, 
  X, 
  LogIn, 
  GraduationCap, 
  BookOpen, 
  Phone, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  Smartphone,
  ExternalLink,
  MessageCircle,
  ChevronDown,
  Layers,
  MapPin,
  Clock
} from 'lucide-react';

export default function LandingNavbar() {
  const { 
    goToPortalApp, 
    currentUserId, 
    currentUser, 
    institutionalInfo,
    installPwa,
    isPwaInstalled
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [portalDropdownOpen, setPortalDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setPortalDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Quiénes Somos', href: '#nosotros' },
    { label: 'Oferta Académica', href: '#oferta' },
    { label: 'Modelo en Línea', href: '#modelo' },
    { label: 'Preinscripción Web', href: '#preinscripcion', badge: 'Ficha QR' },
    { label: 'Admisiones & Contacto', href: '#admisiones' }
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-xs select-none transition-all">
      {/* Top Academic Utility Bar */}
      <div className="bg-[#0A1128] text-white text-[11px] font-semibold py-2 px-4 sm:px-8 lg:px-12 xl:px-16 border-b border-slate-800">
        <div className="w-full max-w-[1920px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-4">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-300 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-700/80">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span>Validez Oficial SEP · RVOE Acreditado</span>
            </span>
            <span className="hidden md:inline text-slate-400">·</span>
            <span className="hidden md:inline text-slate-300">
              Plantel Central: <strong className="text-white font-bold">Playa del Carmen, Quintana Roo</strong>
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 text-slate-300">
            <a 
              href="https://wa.me/529843623473" 
              target="_blank" 
              rel="noreferrer"
              className="hover:text-white flex items-center gap-1.5 text-slate-200 font-bold transition group"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
              <span>WhatsApp Admisiones: (984) 362-3473</span>
            </a>

            <span className="hidden lg:inline text-slate-600">|</span>

            {/* Direct Quick Portal Buttons in Top Bar */}
            <div className="hidden lg:flex items-center gap-2">
              <button
                type="button"
                onClick={() => goToPortalApp('prepa')}
                className="px-2.5 py-0.5 rounded-md bg-ipsur-pink-600 hover:bg-ipsur-pink-500 text-white font-bold text-[10px] transition cursor-pointer flex items-center gap-1"
                title="Acceso directo a iniciar sesión en Prepa en Línea IPSUR"
              >
                <BookOpen className="w-3 h-3" />
                <span>Portal Prepa</span>
              </button>

              <button
                type="button"
                onClick={() => goToPortalApp('universidad')}
                className="px-2.5 py-0.5 rounded-md bg-sky-600 hover:bg-sky-500 text-white font-bold text-[10px] transition cursor-pointer flex items-center gap-1"
                title="Acceso directo a iniciar sesión en IUPS Universidad en Línea"
              >
                <GraduationCap className="w-3 h-3" />
                <span>Portal Universidad</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-3 sm:py-3.5 flex items-center justify-between gap-4">
        
        {/* Institutional Crest / Logo */}
        <a 
          href="#inicio" 
          onClick={(e) => handleLinkClick(e, '#inicio')}
          className="flex items-center gap-3.5 group cursor-pointer"
        >
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white p-1.5 border border-slate-200 shadow-sm flex items-center justify-center group-hover:scale-105 transition-all">
            <img 
              src="/ipsur-logo.png" 
              alt="IPSUR Logo Oficial" 
              className="w-full h-full object-contain filter drop-shadow-[0_1px_3px_rgba(10,17,40,0.15)]"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg sm:text-xl font-black text-[#0A1128] tracking-tight leading-none font-display">
                IPSUR <span className="text-ipsur-pink-600">·</span> IUPS
              </span>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-ipsur-pink-600 bg-pink-50 px-2 py-0.5 rounded-md border border-pink-200">
                EDUCORE
              </span>
            </div>
            <span className="text-[11px] sm:text-xs font-semibold text-slate-500 block leading-tight mt-0.5">
              Instituto Peninsular del Sur & IUPS Universidad
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-ipsur-navy-900 hover:bg-slate-100 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>{link.label}</span>
              {link.badge && (
                <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-md bg-pink-100 text-ipsur-pink-700 border border-pink-200">
                  {link.badge}
                </span>
              )}
            </a>
          ))}
        </nav>

        {/* Right Area: Direct Portal Dropdown / Login Access */}
        <div className="flex items-center gap-3">
          
          {/* PWA Mobile Quick Button */}
          {!isPwaInstalled && (
            <button
              onClick={installPwa}
              title="Instalar campus virtual en tu celular o computadora"
              className="hidden xl:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition cursor-pointer border border-slate-200"
            >
              <Smartphone className="w-3.5 h-3.5 text-sky-600" />
              <span>Instalar App</span>
            </button>
          )}

          {/* THE DIRECT PORTAL LOGIN BUTTON WITH DROPDOWN */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setPortalDropdownOpen(prev => !prev)}
              className="inline-flex items-center gap-2.5 px-5 sm:px-6 py-2.5 sm:py-3 rounded-2xl text-xs sm:text-sm font-black text-white bg-gradient-to-r from-[#0A1128] via-[#141B41] to-ipsur-pink-600 hover:from-[#141B41] hover:to-ipsur-pink-500 shadow-md hover:shadow-lg transition-all cursor-pointer ring-2 ring-slate-100"
            >
              <LogIn className="w-4 h-4 text-pink-300" />
              <span>Portal / Iniciar Sesión</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${portalDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Direct Portal Selector Dropdown Menu */}
            {portalDropdownOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 p-3 z-50 animate-fadeIn">
                <div className="pb-2 mb-2 border-b border-slate-100 px-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Acceso Oficial a Campus Virtual
                  </span>
                  <span className="text-xs font-black text-slate-800">
                    Selecciona tu nivel para iniciar sesión:
                  </span>
                </div>

                <div className="space-y-2">
                  {/* Option 1: Prepa en Línea IPSUR */}
                  <button
                    type="button"
                    onClick={() => {
                      setPortalDropdownOpen(false);
                      goToPortalApp('prepa');
                    }}
                    className="w-full p-3 rounded-xl bg-slate-50 hover:bg-pink-50/70 border border-slate-200 hover:border-pink-300 text-left transition flex items-center justify-between group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-ipsur-pink-600 to-rose-500 text-white flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-ipsur-pink-600 uppercase tracking-wide block">
                          Bachillerato General SEP
                        </span>
                        <h4 className="text-xs font-black text-slate-900 group-hover:text-ipsur-pink-600">
                          Prepa en Línea IPSUR
                        </h4>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-ipsur-pink-600 group-hover:translate-x-0.5 transition" />
                  </button>

                  {/* Option 2: IUPS Universidad en Línea */}
                  <button
                    type="button"
                    onClick={() => {
                      setPortalDropdownOpen(false);
                      goToPortalApp('universidad');
                    }}
                    className="w-full p-3 rounded-xl bg-slate-50 hover:bg-sky-50/70 border border-slate-200 hover:border-sky-300 text-left transition flex items-center justify-between group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0A1128] to-sky-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                        <GraduationCap className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-sky-600 uppercase tracking-wide block">
                          Licenciaturas & Posgrados
                        </span>
                        <h4 className="text-xs font-black text-slate-900 group-hover:text-sky-600">
                          IUPS Universidad en Línea
                        </h4>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-sky-600 group-hover:translate-x-0.5 transition" />
                  </button>
                </div>

                <div className="pt-2 mt-2 border-t border-slate-100 px-2 text-center">
                  <span className="text-[10px] text-slate-400">
                    Alumnos, docentes y directivos de la institución
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-slate-100 text-slate-700 hover:text-slate-900 hover:bg-slate-200 transition"
            aria-label="Abrir Menú"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 shadow-xl space-y-4 animate-fadeIn">
          
          {/* Two Direct Portal Login Cards on Mobile */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block text-center">
              Acceso Inmediato al Portal para Iniciar Sesión:
            </span>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                goToPortalApp('prepa');
              }}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-ipsur-pink-600 to-rose-600 text-white font-bold text-xs shadow-md"
            >
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                <span>Iniciar Sesión · Prepa IPSUR</span>
              </div>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                goToPortalApp('universidad');
              }}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-[#0A1128] to-sky-600 text-white font-bold text-xs shadow-md"
            >
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                <span>Iniciar Sesión · IUPS Universidad</span>
              </div>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <nav className="space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 hover:text-ipsur-navy-900 transition"
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-pink-100 text-ipsur-pink-700">
                    {link.badge}
                  </span>
                )}
              </a>
            ))}
          </nav>

          {!isPwaInstalled && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                installPwa();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200"
            >
              <Smartphone className="w-4 h-4 text-sky-600" />
              <span>Instalar Aplicación en el Teléfono</span>
            </button>
          )}
        </div>
      )}
    </header>
  );
}
