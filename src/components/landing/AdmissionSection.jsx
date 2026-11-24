import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  FileText, 
  CheckCircle2, 
  Send, 
  MessageCircle, 
  Phone, 
  Mail, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  GraduationCap,
  BookOpen
} from 'lucide-react';

export default function AdmissionSection() {
  const { showToast } = useApp();

  const [selectedLevel, setSelectedLevel] = useState('prepa'); // 'prepa' | 'universidad'
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      showToast('Formulario Incompleto', 'Por favor ingresa tu nombre y número de teléfono.', 'error');
      return;
    }

    setIsSubmitted(true);
    showToast(
      '¡Solicitud Recibida!', 
      `Gracias ${formData.name}. Un asesor académico de ${selectedLevel === 'prepa' ? 'Prepa IPSUR' : 'Universidad en Línea'} se comunicará contigo vía WhatsApp.`,
      'success'
    );
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent(
      `Hola, me gustaría solicitar informes para ingresar a ${selectedLevel === 'prepa' ? 'Prepa en Línea IPSUR' : 'la Universidad en Línea'}. Mi nombre es ${formData.name || 'un aspirante interesado'}.`
    );
    window.open(`https://wa.me/529988452100?text=${text}`, '_blank');
  };

  return (
    <section id="admisiones" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200 select-none">
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-50 border border-pink-200 text-ipsur-pink-700 text-xs font-bold mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-ipsur-pink-600" />
            <span>Admisiones Ciclo 2026-2027</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight font-display">
            Inscríbete en 3 Sencillos Pasos 100% en Línea
          </h2>

          <p className="mt-3 text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Sin examen de admisión y con inicio de clases continuo. Comienza tu preparación académica hoy mismo:
          </p>
        </div>

        {/* 3 Step Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-16 max-w-6xl mx-auto">
          
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs relative flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-3xl font-black font-mono text-ipsur-pink-600">01</span>
              <h3 className="text-base font-bold text-slate-900">Registro y Solicitud</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Completa tus datos en el formulario o contáctanos por WhatsApp. Un asesor te guiará con las materias y tu beca aplicable.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Respuesta inmediata</span>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs relative flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-3xl font-black font-mono text-ipsur-navy-700">02</span>
              <h3 className="text-base font-bold text-slate-900">Envío de Documentos Digitales</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Envía fotografía o escaneo de tu certificado previo (secundaria para prepa, o bachillerato para universidad), acta y CURP.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Trámite 100% digital</span>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs relative flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-3xl font-black font-mono text-sky-600">03</span>
              <h3 className="text-base font-bold text-slate-900">Acceso Inmediato al Portal</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Recibe tu matrícula de estudiante y contraseña para ingresar a tus salas virtuales de Prepa IPSUR o Universidad en Línea.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Alta de materias en EDUCORE</span>
            </div>
          </div>

        </div>

        {/* Contact and Request Info Form */}
        <div id="contacto" className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-12">
          
          {/* Left Info Panel */}
          <div className="md:col-span-5 bg-gradient-to-br from-ipsur-navy-900 via-ipsur-navy-800 to-slate-900 text-white p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-[10px] font-black uppercase tracking-wider text-ipsur-pink-400 bg-pink-950/80 px-2.5 py-1 rounded-full border border-pink-800/80 inline-block">
                Atención a Aspirantes
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white leading-snug">
                ¿Tienes dudas sobre los costos, planes o revalidaciones?
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Nuestro equipo de admisiones te atenderá con gusto para resolver todas tus preguntas y asignar tu descuento institucional.
              </p>
            </div>

            <div className="space-y-3 text-xs text-slate-200">
              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>WhatsApp: +52 (998) 845-2100</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <span>Teléfono directo: (998) 845-2100</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-ipsur-pink-400 flex-shrink-0" />
                <span>admisiones@ipsur.edu.mx</span>
              </div>
            </div>

            <button
              type="button"
              onClick={openWhatsApp}
              className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chatear por WhatsApp Directo</span>
            </button>
          </div>

          {/* Right Form Panel */}
          <div className="md:col-span-7 p-6 sm:p-8">
            {isSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-slate-900">¡Información enviada exitosamente!</h4>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Hemos registrado tus datos. En breve un coordinador de admisiones se pondrá en contacto contigo.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-4 py-2 text-xs font-bold text-ipsur-navy-700 bg-slate-100 rounded-xl hover:bg-slate-200 transition"
                >
                  Enviar otra consulta
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h4 className="text-base font-bold text-slate-900">
                  Solicita Informes y Aplica para Beca
                </h4>

                {/* Level Selection */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Nivel Educativo de Interés *
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedLevel('prepa')}
                      className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border transition cursor-pointer ${
                        selectedLevel === 'prepa'
                          ? 'bg-pink-50 border-ipsur-pink-500 text-ipsur-pink-700 shadow-2xs'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Prepa en Línea IPSUR</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedLevel('universidad')}
                      className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border transition cursor-pointer ${
                        selectedLevel === 'universidad'
                          ? 'bg-sky-50 border-sky-500 text-sky-800 shadow-2xs'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <GraduationCap className="w-3.5 h-3.5" />
                      <span>Universidad en Línea</span>
                    </button>
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Carlos Mendoza López"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-slate-800 focus:ring-2 focus:ring-ipsur-pink-500 outline-none"
                  />
                </div>

                {/* Phone & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Teléfono / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="10 dígitos (ej. 998 123 4567)"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-slate-800 focus:ring-2 focus:ring-ipsur-pink-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Correo Electrónico
                    </label>
                    <input
                      type="email"
                      placeholder="tu@correo.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-slate-800 focus:ring-2 focus:ring-ipsur-pink-500 outline-none"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    ¿Tienes alguna duda específica? (Opcional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Escribe tu consulta sobre fechas, materias o revalidaciones..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:ring-2 focus:ring-ipsur-pink-500 outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-ipsur-navy-700 hover:bg-ipsur-navy-800 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4 text-ipsur-pink-400" />
                  <span>Enviar Solicitud de Informes</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
