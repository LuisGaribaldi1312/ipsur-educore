import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles, MessageCircle } from 'lucide-react';
import { FAQ_DATA, PREPA_DATA, IUPS_DATA } from '../../data/institutionalLandingData';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-16 sm:py-24 bg-white select-none">
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <div className="max-w-4xl mx-auto">
        
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold mb-3 border border-slate-200 shadow-2xs">
              <HelpCircle className="w-3.5 h-3.5 text-ipsur-pink-600" />
              <span>Respuestas Rápidas Institucionales</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight font-display">
              Preguntas Frecuentes
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Todo lo que necesitas saber sobre el funcionamiento de Prepa IPSUR y la Universidad IUPS:
            </p>
          </div>

          <div className="space-y-3.5">
            {FAQ_DATA.map((faq, idx) => {
              const isOpen = openIndex === idx;

              return (
                <div 
                  key={idx}
                  className="border border-slate-200 rounded-2xl overflow-hidden transition-colors shadow-2xs"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 bg-slate-50/50 hover:bg-slate-50 transition cursor-pointer"
                  >
                    <span className="text-xs sm:text-sm font-bold text-slate-900">
                      {faq.q}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform flex-shrink-0 ${isOpen ? 'rotate-180 text-ipsur-pink-600' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="p-4 sm:p-5 pt-0 text-xs text-slate-600 leading-relaxed bg-slate-50/50 border-t border-slate-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quick Contact Help Pill */}
          <div className="mt-10 p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">¿Tienes una pregunta específica que no aparece aquí?</h4>
              <p className="text-xs text-slate-500 mt-0.5">Nuestro equipo de atención académica está disponible vía WhatsApp para orientarte.</p>
            </div>
            <a
              href={`https://wa.me/${PREPA_DATA.whatsapp}?text=${encodeURIComponent('Hola, tengo una pregunta sobre el ingreso a IPSUR / IUPS.')}`}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xs transition flex items-center gap-2 flex-shrink-0"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chatear con un Asesor</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}