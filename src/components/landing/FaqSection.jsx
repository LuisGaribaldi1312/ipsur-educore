import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: '¿Los estudios de Prepa IPSUR y Universidad tienen validez oficial ante la SEP?',
      a: 'Sí, absolutamente. Todos nuestros planes de estudio cuentan con Reconocimiento de Validez Oficial de Estudios (RVOE) expedido por las autoridades educativas, lo que garantiza que tu certificado de preparatoria o tu título universitario tienen plena validez en todo México y para trámites internacionales.'
    },
    {
      q: '¿Cómo ingreso a mis clases una vez que me inscribo?',
      a: 'Al inscribirte recibes tu matrícula y clave de acceso institucional. Para entrar, solo debes dar clic en la pestaña "Portal" en la parte superior de esta página, seleccionar si perteneces a "Prepa en Línea IPSUR" o a "Universidad en Línea", e ingresar tus credenciales en el sistema EDUCORE.'
    },
    {
      q: '¿Tengo que conectarme a horas fijas o puedo estudiar a mi propio ritmo?',
      a: 'El modelo es 100% flexible y asíncrono. La plataforma está abierta las 24 horas del día, los 365 días del año. Las sesiones con docentes quedan grabadas y las lecturas, tareas y recursos didácticos se pueden consultar y descargar en cualquier momento.'
    },
    {
      q: '¿Puedo revalidar materias si dejé trunca mi prepa o carrera en otra institución?',
      a: 'Sí. Contamos con un departamento de control escolar que realiza el análisis de tus boletas o certificado parcial previo para revalidar el mayor número de materias posibles y que termines tu grado en menos tiempo.'
    },
    {
      q: '¿Puedo instalar la plataforma como aplicación en mi teléfono celular?',
      a: 'Sí. IPSUR EDUCORE está desarrollada como Progressive Web App (PWA). Al ingresar desde tu teléfono Android o iPhone, verás la opción de "Instalar App" para tener el icono en tu pantalla de inicio y entrar con un solo toque.'
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-white select-none">
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <div className="max-w-4xl mx-auto">
        
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold mb-3 border border-slate-200 shadow-2xs">
              <HelpCircle className="w-3.5 h-3.5 text-ipsur-pink-600" />
              <span>Respuestas Rápidas</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight font-display">
              Preguntas Frecuentes
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Todo lo que necesitas saber sobre el funcionamiento de Prepa IPSUR y la Universidad en Línea:
            </p>
          </div>

          <div className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div 
                key={idx}
                className="border border-slate-200 rounded-2xl overflow-hidden transition-colors"
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

        </div>
      </div>
    </section>
  );
}
