import React from 'react';
import LandingNavbar from './LandingNavbar';
import HeroSection from './HeroSection';
import DualPortalBanner from './DualPortalBanner';
import AboutUsSection from './AboutUsSection';
import AcademicOffersSection from './AcademicOffersSection';
import EducationalModelSection from './EducationalModelSection';
import PreregistrationSection from './PreregistrationSection';
import AdmissionSection from './AdmissionSection';
import FaqSection from './FaqSection';
import LandingFooter from './LandingFooter';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col antialiased selection:bg-ipsur-pink-500 selection:text-white">
      {/* Top Navbar with Navigation and Highlighted Portal Option */}
      <LandingNavbar />

      {/* Main Page Content */}
      <main className="flex-1">
        {/* 1. Hero Section with Dual Prepa & Universidad Highlights */}
        <HeroSection />

        {/* 2. Dual Portal Banner with the 2 Access Icons */}
        <DualPortalBanner />

        {/* 3. Quiénes Somos, Misión, Visión & Valores (Prepa IPSUR & IUPS Universidad) */}
        <AboutUsSection />

        {/* 4. Comprehensive Academic Offer: Prepa IPSUR & Universidad en Línea */}
        <AcademicOffersSection />

        {/* 5. Educational Virtual Model (24/7, SEP, PWA) */}
        <EducationalModelSection />

        {/* 6. Módulo de Preinscripción Digital con Compresión de Documentos y Ficha con QR */}
        <PreregistrationSection />

        {/* 7. 3-Step Admission Process & Contact Form */}
        <AdmissionSection />

        {/* 8. Frequently Asked Questions */}
        <FaqSection />
      </main>

      {/* Institutional Footer */}
      <LandingFooter />
    </div>
  );
}