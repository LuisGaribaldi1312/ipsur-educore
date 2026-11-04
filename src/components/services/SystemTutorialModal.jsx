import React, { useState } from 'react';
import Modal from '../common/Modal';
import { Play, CheckCircle2, ChevronRight, School, Users, CreditCard, ShieldCheck, Sparkles, BookOpen } from 'lucide-react';

export default function SystemTutorialModal({ isOpen, onClose }) {
  const [activeStep, setActiveStep] = useState(0);

  if (!isOpen) return null;

  const steps = [
    {
      title: '1. Navegación Principal y Roles',
      description: 'IPSUR Manager School unifica toda la gestión directiva, académica y administrativa. El menú lateral izquierdo te da acceso a Rectoría, Dirección, Servicios Escolares, Aulas Virtuales y Contabilidad según tu perfil de usuario.',
      icon: School,
      color: 'from-blue-600 to-indigo-600'
    },
    {
      title: '2. Creación de Salas y Temarios',
      description: 'En Coordinación Escolar puedes aperturar aulas de bachillerato, matricular alumnos, asignar catedráticos titulares y cargar la rúbrica oficial con criterios evaluativos que suman el 100%.',
      icon: BookOpen,
      color: 'from-purple-600 to-pink-600'
    },
    {
      title: '3. Servicios Escolares y Ventanilla Digital',
      description: 'Atiende trámites en tiempo real: matrículas inmediatas, expedientes digitales de estudiantes, emisión de constancias con sello institucional y actas oficiales avaladas.',
      icon: Users,
      color: 'from-teal-600 to-emerald-600'
    },
    {
      title: '4. Pagos, Caja y Finanzas',
      description: 'Lleva el registro puntual de cobros de colegiaturas, inscripciones, recargos y certificados con emisión de comprobantes digitales y conciliación en tesorería.',
      icon: CreditCard,
      color: 'from-amber-600 to-orange-600'
    }
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Tutorial de Inducción · IPSUR Manager School" size="lg">
      <div className="space-y-4">
        {/* Video simulation preview box */}
        <div className="relative rounded-2xl overflow-hidden bg-slate-950 aspect-video flex items-center justify-center border border-slate-800 shadow-xl group">
          <img
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80"
            alt="IPSUR Campus Tutorial"
            className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-50 transition duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

          <div className="relative z-10 text-center px-4">
            <div className="w-16 h-16 rounded-full bg-blue-600/90 text-white flex items-center justify-center mx-auto shadow-2xl backdrop-blur-md group-hover:scale-110 transition duration-300">
              <Play className="w-7 h-7 ml-1 fill-white" />
            </div>
            <p className="font-display font-black text-white text-base sm:text-lg mt-3">
              Guía del Sistema Institucional
            </p>
            <p className="text-xs text-blue-200 mt-1 max-w-md mx-auto">
              Aprende a gestionar aulas virtuales, alumnos, docentes y trámites en 3 minutos.
            </p>
          </div>
        </div>

        {/* Interactive Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {steps.map((st, i) => {
            const Icon = st.icon;
            const isSelected = activeStep === i;
            return (
              <div
                key={i}
                onClick={() => setActiveStep(i)}
                className={`p-3.5 rounded-2xl border transition cursor-pointer flex items-start gap-3 ${
                  isSelected 
                    ? 'bg-blue-50/80 border-blue-400 shadow-sm' 
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${st.color} text-white flex items-center justify-center flex-shrink-0 shadow-sm`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="font-display font-bold text-slate-900 text-xs sm:text-sm">{st.title}</h5>
                  <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">{st.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500">Instituto Peninsular del Sur · "La educación es el camino"</span>
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow transition"
          >
            Entendido, Comenzar
          </button>
        </div>
      </div>
    </Modal>
  );
}
