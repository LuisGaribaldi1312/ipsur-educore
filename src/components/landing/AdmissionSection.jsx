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
  BookOpen,
  MapPin,
  Clock,
  Check
} from 'lucide-react';
import { PREPA_DATA, IUPS_DATA, INSTITUTIONAL_CAMPUS } from '../../data/institutionalLandingData';

export default function AdmissionSection() {
  const { showToast } = useApp();

  const [selectedLevel, setSelectedLevel] = useState('prepa'); // 'prepa' | 'universidad'
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    program: '',
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
      `Gracias ${formData.name}. Un asesor académico de ${selectedLevel === 'prepa' ? 'Prepa IPSUR' : 'IUPS Universidad'} se comunicará contigo vía WhatsApp a la brevedad.`,
      'success'
    );
  };

  const openWhatsApp = () => {
    const targetData = selectedLevel === 'prepa' ? PREPA_DATA : IUPS_DATA;
    const text = encodeURIComponent(
      `Hola, me gustaría solicitar informes para ingresar a ${targetData.name} (${targetData.institution}). Mi nombre es ${formData.name || 'un aspirante interesado'}. Programa de interés: ${formData.program || 'general'}.`
    );
    window.open(`https://wa.me/${targetData.whatsapp}?text=${text}`, '_blank');
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
            Sin examen de admisión y con inicio de clases continuo. Comienza tu preparación en Prepa IPSUR o IUPS Universidad hoy mismo:
          </p>
        </div>

        {/* 3 Step Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-16 max-w-6xl mx-auto">
          
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs relative flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-3xl font-black font-mono text-ipsur-pink-600">01</span>
              <h3 className="text-base font-bold text-slate-900">Registro y Asesoría Vocacional</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Completa tus datos en el formulario o comunícate vía WhatsApp oficial. Un asesor académico te explicará el plan de estudios, las modalidades y tu beca disponible.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Respuesta inmediata en minutos</span>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs relative flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-3xl font-black font-mono text-ipsur-navy-700">02</span>
              <h3 className="text-base font-bold text-slate-900">Envío Digital de Documentos</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Envía fotografía o escaneo legible de tu certificado previo (secundaria para prepa, o bachillerato/título para universidad), acta de nacimiento y CURP.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Trámite 100% digital o presencial</span>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs relative flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-3xl font-black font-mono text-emerald-600">03</span>
              <h3 className="text-base font-bold text-slate-900">Inscripción y Acceso al Portal</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Realiza tu aportación inicial con opciones de pago en línea o en banco y recibe de inmediato tu matrícula y clave para entrar a las salas virtuales EDUCORE.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Inicio de clases continuo</span>
            </div>
          </div>

        </div>

        {/* Dual Layout: Requirements Checklist & Official Application Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 max-w-6xl mx-auto items-start">
          
          {/* Left Column: Requirements & Campus Info */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Level Selector Pills */}
            <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSelectedLevel('prepa')}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition cursor-pointer flex items-center justify-center gap-2 ${
                  selectedLevel === 'prepa'
                    ? 'bg-ipsur-pink-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Prepa IPSUR</span>
              </button>
              
              <button
                type="button"
                onClick={() => setSelectedLevel('universidad')}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition cursor-pointer flex items-center justify-center gap-2 ${
                  selectedLevel === 'universidad'
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>IUPS Universidad</span>
              </button>
            </div>

            {/* Requirements Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white ${
                  selectedLevel === 'prepa' ? 'bg-ipsur-pink-600' : 'bg-sky-600'
                }`}>
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Requisitos Oficiales de Admisión
                  </h4>
                  <span className="text-[11px] text-slate-500">
                    {selectedLevel === 'prepa' ? 'Para ingresar a Prepa IPSUR' : 'Para ingresar a IUPS Universidad'}
                  </span>
                </div>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-600">
                {(selectedLevel === 'prepa' ? PREPA_DATA.requirements : IUPS_DATA.requirements).map((req, rIdx) => (
                  <li key={rIdx} className="flex items-start gap-2.5">
                    <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                      selectedLevel === 'prepa' ? 'text-ipsur-pink-500' : 'text-sky-500'
                    }`} />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Campus Physical Address Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center gap-2.5 text-xs font-bold text-slate-900">
                <MapPin className="w-4 h-4 text-ipsur-pink-600" />
                <span>Plantel Oficial Playa del Carmen</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {INSTITUTIONAL_CAMPUS.address}
              </p>
              <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{INSTITUTIONAL_CAMPUS.schedule}</span>
              </div>
            </div>

          </div>

          {/* Right Column: Admission Application Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-lg">
            <div className="mb-6">
              <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                selectedLevel === 'prepa' 
                  ? 'bg-pink-50 text-ipsur-pink-700 border border-pink-200' 
                  : 'bg-sky-50 text-sky-700 border border-sky-200'
              }`}>
                Solicitud de Inscripción o Beca
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-2 font-display">
                Comunícate con Admisiones
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Llena el formulario para que un orientador educativo te brinde atención personalizada:
              </p>
            </div>

            {isSubmitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-md">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-emerald-900">¡Información Enviada con Éxito!</h4>
                <p className="text-xs text-emerald-800 leading-relaxed max-w-md mx-auto">
                  Hemos registrado tus datos. Si deseas acelerar tu trámite, también puedes iniciar una conversación directa en WhatsApp con nuestro departamento de admisiones.
                </p>
                <button
                  type="button"
                  onClick={openWhatsApp}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Abrir WhatsApp Ahora</span>
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Nombre Completo del Aspirante *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ej. Juan Carlos Pérez Morales"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-ipsur-pink-500 transition"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Teléfono / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="Ej. (984) 123-4567"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-ipsur-pink-500 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Correo Electrónico
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="correo@ejemplo.com"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-ipsur-pink-500 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Programa de Interés
                  </label>
                  <select
                    value={formData.program}
                    onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-ipsur-pink-500 transition bg-white"
                  >
                    <option value="">Selecciona una opción...</option>
                    {selectedLevel === 'prepa' ? (
                      <>
                        <option value="Bachillerato en Comunicación">Bachillerato en Comunicación</option>
                        <option value="Bachillerato en Administración">Bachillerato en Administración</option>
                        <option value="Bachillerato en Dibujo Arquitectónico">Bachillerato en Dibujo Arquitectónico y Construcción</option>
                        <option value="Bachillerato General">Bachillerato General</option>
                      </>
                    ) : (
                      <>
                        <optgroup label="Licenciaturas (3 Años)">
                          <option value="Licenciatura en Administración">Licenciatura en Administración</option>
                          <option value="Licenciatura en Derecho">Licenciatura en Derecho</option>
                          <option value="Licenciatura en Contaduría">Licenciatura en Contaduría</option>
                          <option value="Licenciatura en Pedagogía">Licenciatura en Pedagogía</option>
                          <option value="Licenciatura en Seguridad Pública">Licenciatura en Seguridad Pública</option>
                          <option value="Licenciatura en Diseño y Comunicación Digital">Diseño y Comunicación Digital</option>
                          <option value="Licenciatura en Ciencias del Deporte">Ciencias del Deporte</option>
                          <option value="Licenciatura en Psicología">Psicología</option>
                        </optgroup>
                        <optgroup label="Ingenierías (3 Años)">
                          <option value="Ingeniería Civil">Ingeniería Civil</option>
                          <option value="Ingeniería Eléctrica">Ingeniería Eléctrica</option>
                          <option value="Ingeniería Mecánica Automotriz">Ingeniería Mecánica Automotriz</option>
                        </optgroup>
                        <optgroup label="Maestrías (Posgrados)">
                          <option value="Maestría en Administración y Alta Dirección MBA">MBA Administración y Alta Dirección</option>
                          <option value="Maestría en Juicios Orales">Maestría en Juicios Orales</option>
                          <option value="Maestría en Amparo">Maestría en Amparo</option>
                          <option value="Maestría en Educación">Maestría en Educación</option>
                          <option value="Maestría en Calidad Educativa">Maestría en Calidad Educativa</option>
                          <option value="Maestría en Comercialización Inmobiliaria">Comercialización Inmobiliaria</option>
                          <option value="Maestría en Interiorismo y Decoración">Interiorismo y Decoración</option>
                          <option value="Maestría en Gobierno y Administración Pública">Gobierno y Administración Pública</option>
                        </optgroup>
                      </>
                    )}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Comentarios o Dudas Adicionales
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Escribe aquí si necesitas información de costos, becas o revalidación de materias..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-ipsur-pink-500 transition resize-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                  <button
                    type="submit"
                    className="w-full sm:flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-ipsur-pink-600 to-rose-600 hover:from-ipsur-pink-500 hover:to-rose-500 text-white font-extrabold text-xs shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Enviar Solicitud</span>
                  </button>

                  <button
                    type="button"
                    onClick={openWhatsApp}
                    className="w-full sm:w-auto py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Directo</span>
                  </button>
                </div>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}