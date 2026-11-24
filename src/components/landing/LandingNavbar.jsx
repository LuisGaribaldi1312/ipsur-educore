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
  MessageCircle
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
    { label: 'Universidad en Línea', href: '#universidad', badge: 'Superior' },
    { label: 'Modelo Educativo', href: '#modelo' },
    { label: 'Admisiones & Becas', href: '#admisiones' },
    { label: 'Contacto', href: '#contacto' }
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
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs select-none transition-all">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-ipsur-navy-900 via-ipsur-navy-700 to-ipsur-pink-900 text-white text-[11px] font-semibold py-1.5 px-4 sm:px-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-ipsur-pink-400 animate-ping inline-block" />
            <span>Inscripciones Abiertas Ciclo 2026-2027 · Preparatoria IPSUR y Universidad en Línea</span>
          </div>

          <div className="flex items-center gap-4 text-slate-300">
            <span className="hidden md:inline">RVOE SEP Oficial</span>
            <span className="hidden md:inline">·</span>
            <a 
              href="https://wa.me/529988452100" 
              target="_blank" 
              rel="noreferrer"
              className="hover:text-white flex items-center gap-1 text-slate-200 font-bold transition"
            >
              <MessageCircle className="w-3 h-3 text-emerald-400" />
              <span>WhatsApp Admisiones: (998) 845-2100</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        
        {/* Brand / Logo */}
        <a 
          href="#inicio" 
          onClick={(e) => handleLinkClick(e, '#inicio')}
          className="flex items-center gap-3 group cursor-pointer"
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-white p-1 border border-slate-200 shadow-sm flex items-center justify-center group-hover:scale-105 transition-transform">
            <img 
              src="/ipsur-logo.png" 
              alt="IPSUR Logo Oficial" 
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-base sm:text-lg font-black text-ipsur-navy-900 tracking-tight leading-none">
                IPSUR
              </span>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-ipsur-pink-600 bg-pink-50 px-1.5 py-0.5 rounded border border-pink-200">
                EDUCORE
              </span>
            </div>
            <span className="text-[10px] sm:text-[11px] font-semibold text-slate-500 block leading-tight mt-0.5">
              Prepa IPSUR & Universidad en Línea
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
              className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 hover:text-ipsur-navy-700 hover:bg-slate-100 transition flex items-center gap-1.5 cursor-pointer"
            >
              <span>{link.label}</span>
              {link.badge && (
                <span className={`text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded-md ${
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

        {/* Right Area: Highlights and PORTAL Button */}
        <div className="flex items-center gap-2.5">
          
          {/* PWA Mobile Quick Button */}
          {!isPwaInstalled && (
            <button
              onClick={installPwa}
              title="Descargar aplicación oficial en tu teléfono"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition cursor-pointer border border-slate-200"
            >
              <Smartphone className="w-3.5 h-3.5 text-sky-600" />
              <span>Instalar App</span>
            </button>
          )}

          {/* THE HIGHLIGHTED "PORTAL" MENU TAB / BUTTON */}
          <button
            onClick={() => goToPortalSelector()}
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold text-white bg-gradient-to-r from-ipsur-navy-700 via-ipsur-navy-800 to-ipsur-pink-600 hover:from-ipsur-navy-600 hover:to-ipsur-pink-500 shadow-md shadow-ipsur-pink-600/20 hover:shadow-lg hover:shadow-ipsur-pink-600/30 transition-all transform hover:-translate-y-0.5 cursor-pointer ring-1 ring-white/20"
          >
            <LogIn className="w-4 h-4 text-ipsur-pink-300" />
            <span>Portal</span>
            <span className="hidden sm:inline-block text-[10px] font-bold bg-white/20 px-1.5 py-0.5 rounded text-white tracking-wider uppercase">
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
