import React, { useState } from 'react';
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
  Globe
} from 'lucide-react';

export default function LandingNavbar() {
  const { 
    goToPortalSelector, 
    currentUserId, 
    currentUser, 
    institutionalInfo,
    installPwa,
    isPwaInstalled
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Prepa IPSUR', href: '#prepa', badge: 'Bachillerato' },
    { label: 'IUPS Universidad', href: '#universidad', badge: 'Superior' },
    { label: 'Modelo Educativo', href: '#modelo' },
    { label: 'Admisiones & Becas', href: '#admisiones' },
    { label: 'Campus & Contacto', href: '#contacto' }
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
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-xl border-b border-slate-200/90 shadow-xs select-none transition-all">
      {/* Top Announcement Bar - Full Width Widescreen */}
      <div className="bg-gradient-to-r from-[#070b1c] via-ipsur-navy-900 to-[#18081c] text-white text-[11px] font-semibold py-2 px-4 sm:px-8 lg:px-12 xl:px-16 border-b border-white/10">
        <div className="w-full max-w-[1920px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-4">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ipsur-pink-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-ipsur-pink-500"></span>
            </span>
            <span className="tracking-wide">
              Playa del Carmen, Q. Roo · Inscripciones Abiertas con Becas en <strong className="text-pink-300 font-bold">Prepa IPSUR</strong> e <strong className="text-sky-300 font-bold">IUPS Universidad</strong>
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-300">
            <span className="hidden md:inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/80">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span>RVOE SEP Oficial</span>
            </span>
            <span className="hidden md:inline text-white/20">|</span>
            <a 
              href="https://wa.me/529843623473" 
              target="_blank" 
              rel="noreferrer"
              className="hover:text-white flex items-center gap-1.5 text-slate-200 font-bold transition group"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
              <span>WhatsApp Admisiones: (984) 362-3473</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Full-Width Navigation Bar */}
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-3 sm:py-3.5 flex items-center justify-between gap-4">
        
        {/* Brand / Logo */}
        <a 
          href="#inicio" 
          onClick={(e) => handleLinkClick(e, '#inicio')}
          className="flex items-center gap-3.5 group cursor-pointer"
        >
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white p-1.5 border border-slate-200/90 shadow-md shadow-slate-200/50 flex items-center justify-center group-hover:scale-105 transition-all">
            <img 
              src="/ipsur-logo.png" 
              alt="IPSUR Logo Oficial" 
              className="w-full h-full object-contain filter drop-shadow-[0_1px_4px_rgba(46,48,146,0.2)]"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg sm:text-xl font-black text-ipsur-navy-900 tracking-tight leading-none font-display">
                IPSUR <span className="text-ipsur-pink-600">·</span> IUPS
              </span>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-ipsur-pink-600 bg-pink-50 px-2 py-0.5 rounded-md border border-pink-200 shadow-2xs">
                EDUCORE
              </span>
            </div>
            <span className="text-[11px] sm:text-xs font-semibold text-slate-500 block leading-tight mt-0.5">
              Prepa IPSUR & IUPS Instituto Universitario Peninsular del Sur
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
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-ipsur-navy-900 hover:bg-slate-100/80 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>{link.label}</span>
              {link.badge && (
                <span className={`text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded-md ${
                  link.badge === 'Bachillerato' 
                    ? 'bg-pink-100 text-ipsur-pink-700 border border-pink-200/60' 
                    : 'bg-sky-100 text-sky-800 border border-sky-200/60'
                }`}>
                  {link.badge}
                </span>
              )}
            </a>
          ))}
        </nav>

        {/* Right Area: Highlights and PORTAL Button */}
        <div className="flex items-center gap-3">
          
          {/* PWA Mobile Quick Button */}
          {!isPwaInstalled && (
            <button
              onClick={installPwa}
              title="Descargar aplicación oficial en tu teléfono o computadora"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition cursor-pointer border border-slate-200 shadow-2xs"
            >
              <Smartphone className="w-3.5 h-3.5 text-sky-600" />
              <span>Instalar App</span>
            </button>
          )}

          {/* THE HIGHLIGHTED "PORTAL" MENU TAB / BUTTON */}
          <button
            onClick={() => goToPortalSelector()}
            className="inline-flex items-center gap-2.5 px-5 sm:px-6 py-2.5 sm:py-3 rounded-2xl text-xs sm:text-sm font-black text-white bg-gradient-to-r from-ipsur-navy-700 via-ipsur-navy-800 to-ipsur-pink-600 hover:from-ipsur-navy-600 hover:to-ipsur-pink-500 shadow-lg shadow-ipsur-pink-600/25 hover:shadow-xl hover:shadow-ipsur-pink-600/35 transition-all transform hover:-translate-y-0.5 cursor-pointer ring-2 ring-white/20"
          >
            <LogIn className="w-4 h-4 text-ipsur-pink-300" />
            <span>Portal</span>
            <span className="hidden sm:inline-block text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded text-white tracking-wider uppercase">
              {currentUser ? 'Mi Sesión' : 'Alumnos & Docentes'}
            </span>
          </button>

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
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 shadow-xl space-y-3">
          <nav className="space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-100 hover:text-ipsur-navy-700 transition"
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md ${
                    link.badge === 'Bachillerato' 
                      ? 'bg-pink-100 text-ipsur-pink-700' 
                      : 'bg-sky-100 text-sky-800'
                  }`}>
                    {link.badge}
                  </span>
                )}
              </a>
            ))}
          </nav>

          <div className="pt-3 border-t border-slate-200 space-y-2">
            {/* Direct Portal Button in Mobile Menu */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                goToPortalSelector();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-black text-white bg-gradient-to-r from-ipsur-navy-700 to-ipsur-pink-600 shadow-md"
            >
              <LogIn className="w-4 h-4" />
              <span>Entrar al Portal (Prepa & Universidad)</span>
            </button>

            {!isPwaInstalled && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  installPwa();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200"
              >
                <Smartphone className="w-4 h-4 text-sky-600" />
                <span>Instalar Aplicación en el Teléfono</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
