import React, { useState, useRef } from 'react';
import { 
  FileText, 
  Upload, 
  CheckCircle2, 
  AlertCircle, 
  Printer, 
  Download, 
  Share2, 
  Smartphone, 
  MapPin, 
  Phone, 
  Mail, 
  User, 
  Users, 
  ShieldCheck, 
  BookOpen, 
  GraduationCap, 
  Calendar, 
  Clock, 
  Sparkles, 
  Check, 
  Copy, 
  Camera, 
  ArrowRight, 
  RotateCcw,
  MessageCircle,
  FileCheck
} from 'lucide-react';
import { PREPA_DATA, IUPS_DATA, INSTITUTIONAL_CAMPUS } from '../../data/institutionalLandingData';
import { useApp } from '../../context/AppContext';

export default function PreregistrationSection() {
  const { showToast } = useApp();

  // Selected level: 'prepa' | 'universidad'
  const [level, setLevel] = useState('prepa');

  // Form Fields
  const [formData, setFormData] = useState({
    // Student fields
    studentName: '',
    curp: '',
    studentPhone: '',
    studentEmail: '',
    birthDate: '',
    program: 'Bachillerato en Comunicación',
    modality: 'Modalidad Modular (1 día/semana)',
    
    // Address
    street: '',
    colonia: '',
    postalCode: '',
    city: 'Playa del Carmen',

    // Prepa Tutor fields (only for prepa)
    tutorName: '',
    tutorPhone: '',
    tutorEmail: '',
    tutorRelationship: 'Madre / Padre'
  });

  // Uploaded and compressed documents state
  // key: docId -> { name, originalSize, compressedSize, dataUrl, isCompressing }
  const [documents, setDocuments] = useState({});
  const [isCompressingAny, setIsCompressingAny] = useState(false);

  // Completed registration voucher state
  const [completedVoucher, setCompletedVoucher] = useState(null);
  const [copiedFolio, setCopiedFolio] = useState(false);
  const printRef = useRef(null);

  // Document list configuration per level
  const docConfig = level === 'prepa' ? [
    { id: 'comprobante_domicilio', label: 'Comprobante de Domicilio', desc: 'Recibo de luz, agua o predial reciente (máximo 3 meses)' },
    { id: 'acta_nacimiento', label: 'Acta de Nacimiento del Alumno', desc: 'Legible y en buen estado (copia digital o foto clara)' },
    { id: 'curp_alumno', label: 'CURP del Alumno', desc: 'Formato oficial actualizado de RENAPO' },
    { id: 'ine_tutor', label: 'Credencial de Elector (INE) del Tutor', desc: 'Identificación oficial vigente del padre, madre o tutor' }
  ] : [
    { id: 'comprobante_domicilio', label: 'Comprobante de Domicilio', desc: 'Recibo de luz, agua o predial vigente' },
    { id: 'acta_nacimiento', label: 'Acta de Nacimiento', desc: 'Copia digital legible o fotografía clara' },
    { id: 'curp_alumno', label: 'CURP Actualizada', desc: 'Formato oficial descargado de RENAPO' },
    { id: 'ine_alumno', label: 'Credencial de Elector (INE)', desc: 'Identificación oficial vigente del aspirante' },
    { id: 'certificado_previo', label: 'Certificado de Bachillerato o Título', desc: 'Certificado de bachillerato o título previo para posgrado' }
  ];

  // Client-Side Image/Document Compression Engine
  const compressFile = (file) => {
    return new Promise((resolve) => {
      const originalSize = file.size;

      // If it's a PDF, we can't resize through canvas, so we preserve it and store a compact base64
      if (file.type === 'application/pdf') {
        const reader = new FileReader();
        reader.onload = (e) => {
          resolve({
            name: file.name,
            originalSize,
            compressedSize: originalSize,
            dataUrl: e.target.result,
            isPdf: true
          });
        };
        reader.readAsDataURL(file);
        return;
      }

      // For images (JPEG, PNG, WEBP, etc.)
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          const maxDimension = 1200; // Optimal for documents: clear text while under ~200KB

          if (width > height && width > maxDimension) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else if (height > maxDimension) {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          // Compress to JPEG with 0.7 quality
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);
          
          // Calculate approx compressed size from base64 length
          const head = 'data:image/jpeg;base64,';
          const compressedBytes = Math.round(((compressedDataUrl.length - head.length) * 3) / 4);

          resolve({
            name: file.name,
            originalSize,
            compressedSize: compressedBytes,
            dataUrl: compressedDataUrl,
            isPdf: false
          });
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileUpload = async (docId, file) => {
    if (!file) return;

    setIsCompressingAny(true);
    setDocuments((prev) => ({
      ...prev,
      [docId]: { ...(prev[docId] || {}), isCompressing: true }
    }));

    try {
      const compressedResult = await compressFile(file);
      setDocuments((prev) => ({
        ...prev,
        [docId]: {
          ...compressedResult,
          isCompressing: false,
          uploadedAt: new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })
        }
      }));
      showToast('Documento Optimizado', `${file.name} fue comprimido y cargado con éxito.`, 'success');
    } catch (err) {
      console.error('Error compressing file', err);
      showToast('Error', 'No se pudo procesar el archivo. Intenta con una imagen o PDF.', 'error');
    } finally {
      setIsCompressingAny(false);
    }
  };

  const formatSize = (bytes) => {
    if (!bytes && bytes !== 0) return '0 KB';
    if (bytes >= 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
    return (bytes / 1024).toFixed(0) + ' KB';
  };

  // Submission handler
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.studentName.trim() || !formData.curp.trim() || !formData.studentPhone.trim()) {
      showToast('Campos Incompletos', 'Por favor ingresa nombre, CURP y teléfono del aspirante.', 'error');
      return;
    }

    if (level === 'prepa' && !formData.tutorName.trim()) {
      showToast('Falta Tutor', 'Para nivel preparatoria es necesario el nombre del padre, madre o tutor.', 'error');
      return;
    }

    // Check if at least one essential document is uploaded
    const uploadedCount = Object.keys(documents).filter((k) => documents[k]?.dataUrl).length;
    if (uploadedCount === 0) {
      showToast('Carga de Documentos Requerida', 'Por favor carga al menos tu comprobante de domicilio o acta de nacimiento.', 'error');
      return;
    }

    // Generate Unique Folio
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const prefix = level === 'prepa' ? 'FOL-IPS' : 'FOL-IUPS';
    const year = new Date().getFullYear();
    const folio = `${prefix}-${year}-${randomDigits}`;

    const newVoucher = {
      folio,
      level,
      levelTitle: level === 'prepa' ? 'Prepa en Línea IPSUR' : 'IUPS Universidad en Línea',
      institution: level === 'prepa' ? PREPA_DATA.institution : IUPS_DATA.institution,
      date: new Date().toLocaleDateString('es-MX', { day: '2-digit', month: 'long', year: 'numeric' }),
      time: new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' }),
      formData: { ...formData },
      uploadedDocs: Object.keys(documents)
        .filter((k) => documents[k]?.dataUrl)
        .map((k) => ({
          docId: k,
          label: docConfig.find((d) => d.id === k)?.label || k,
          name: documents[k].name,
          originalSize: documents[k].originalSize,
          compressedSize: documents[k].compressedSize,
          uploadedAt: documents[k].uploadedAt
        }))
    };

    // Save to localStorage for administrative auditing
    try {
      const existing = JSON.parse(localStorage.getItem('ipsur_preregistrations') || '[]');
      existing.unshift(newVoucher);
      localStorage.setItem('ipsur_preregistrations', JSON.stringify(existing));
    } catch (e) {
      console.warn('Could not save to localStorage', e);
    }

    setCompletedVoucher(newVoucher);
    showToast('¡Prerregistro Exitoso!', `Tu folio asignado es ${folio}. Guarda tu comprobante.`, 'success');
  };

  const copyFolioToClipboard = () => {
    if (!completedVoucher) return;
    navigator.clipboard.writeText(completedVoucher.folio);
    setCopiedFolio(true);
    showToast('Folio Copiado', 'El folio de preinscripción se copió a tu portapapeles.', 'info');
    setTimeout(() => setCopiedFolio(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const shareWhatsApp = () => {
    if (!completedVoucher) return;
    const msg = encodeURIComponent(
      `¡Hola! Realicé mi prerregistro en ${completedVoucher.levelTitle} con Folio: ${completedVoucher.folio}. Nombre: ${completedVoucher.formData.studentName}. Programa: ${completedVoucher.formData.program}. Presentaré esta ficha en las instalaciones de Playa del Carmen.`
    );
    const phone = completedVoucher.level === 'prepa' ? PREPA_DATA.whatsapp : IUPS_DATA.whatsapp;
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
  };

  const resetForm = () => {
    setCompletedVoucher(null);
    setDocuments({});
    setFormData({
      studentName: '',
      curp: '',
      studentPhone: '',
      studentEmail: '',
      birthDate: '',
      program: level === 'prepa' ? 'Bachillerato en Comunicación' : 'Licenciatura en Administración de Empresas',
      modality: level === 'prepa' ? 'Modalidad Modular (1 día/semana)' : 'Modalidad Ejecutiva Sabatina',
      street: '',
      colonia: '',
      postalCode: '',
      city: 'Playa del Carmen',
      tutorName: '',
      tutorPhone: '',
      tutorEmail: '',
      tutorRelationship: 'Madre / Padre'
    });
  };

  return (
    <section id="preinscripcion" className="py-16 sm:py-24 bg-slate-900 text-white relative overflow-hidden select-none">
      
      {/* Background Decorative Glows */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-ipsur-pink-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-40 w-96 h-96 bg-sky-500/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        
        {/* If no voucher generated yet, show the pre-registration form */}
        {!completedVoucher ? (
          <div>
            {/* Section Header */}
            <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-slate-200 text-xs font-bold mb-3 shadow-md">
                <Sparkles className="w-3.5 h-3.5 text-ipsur-pink-400" />
                <span>Trámite Anticipado 100% en Línea</span>
              </div>

              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-display">
                Módulo de Preinscripción Digital
              </h2>

              <p className="mt-3 text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
                Realiza tu prerregistro, sube tus documentos oficiales (el sistema reducirá y optimizará su tamaño automáticamente) y obtén tu <strong className="text-white font-bold">Ficha Oficial con Código QR y Folio</strong> para asegurar tu lugar:
              </p>

              {/* Segmented Level Selector */}
              <div className="mt-8 inline-flex p-1.5 bg-slate-950/80 rounded-2xl border border-slate-800 shadow-inner max-w-md w-full">
                <button
                  type="button"
                  onClick={() => {
                    setLevel('prepa');
                    setFormData((prev) => ({
                      ...prev,
                      program: 'Bachillerato en Comunicación',
                      modality: 'Modalidad Modular (1 día/semana)'
                    }));
                  }}
                  className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                    level === 'prepa'
                      ? 'bg-gradient-to-r from-ipsur-pink-600 to-rose-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Prepa IPSUR</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setLevel('universidad');
                    setFormData((prev) => ({
                      ...prev,
                      program: 'Licenciatura en Administración de Empresas',
                      modality: 'Modalidad Ejecutiva Sabatina'
                    }));
                  }}
                  className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                    level === 'universidad'
                      ? 'bg-gradient-to-r from-ipsur-navy-700 via-blue-600 to-sky-500 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>IUPS Universidad</span>
                </button>
              </div>
            </div>

            {/* Main Pre-registration Form Layout */}
            <form onSubmit={handleSubmit} className="max-w-6xl mx-auto space-y-8">
              
              {/* STEP 1: INFORMACIÓN DEL ALUMNO Y PROGRAMA */}
              <div className="bg-slate-800/80 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-slate-700/80">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-white ${
                    level === 'prepa' ? 'bg-ipsur-pink-600' : 'bg-sky-600'
                  }`}>
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">Paso 01</span>
                    <h3 className="text-base sm:text-lg font-bold text-white">
                      Datos del Alumno & Selección de Carrera / Bachillerato
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  <div className="lg:col-span-2">
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      Nombre Completo del Alumno *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.studentName}
                      onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                      placeholder="Ej. Sofía Hernández Castro"
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-ipsur-pink-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      CURP del Alumno *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={18}
                      value={formData.curp}
                      onChange={(e) => setFormData({ ...formData, curp: e.target.value.toUpperCase() })}
                      placeholder="18 dígitos alfanuméricos"
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-ipsur-pink-500 uppercase"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      Teléfono / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.studentPhone}
                      onChange={(e) => setFormData({ ...formData, studentPhone: e.target.value })}
                      placeholder="(984) 000-0000"
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-ipsur-pink-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      Correo Electrónico
                    </label>
                    <input
                      type="email"
                      value={formData.studentEmail}
                      onChange={(e) => setFormData({ ...formData, studentEmail: e.target.value })}
                      placeholder="alumno@ejemplo.com"
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-ipsur-pink-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      Fecha de Nacimiento
                    </label>
                    <input
                      type="date"
                      value={formData.birthDate}
                      onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-ipsur-pink-500"
                    />
                  </div>
                </div>

                {/* Program & Modality Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      {level === 'prepa' ? 'Bachillerato Seleccionado *' : 'Carrera Universitaria o Maestría *'}
                    </label>
                    <select
                      value={formData.program}
                      onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-ipsur-pink-500"
                    >
                      {level === 'prepa' ? (
                        <>
                          <option value="Bachillerato en Comunicación">Bachillerato en Comunicación (Producción Digital)</option>
                          <option value="Bachillerato en Administración">Bachillerato en Administración (Empresas & Finanzas)</option>
                          <option value="Bachillerato en Dibujo Arquitectónico">Bachillerato en Dibujo Arquitectónico y Construcción</option>
                          <option value="Bachillerato General">Bachillerato General (2 Años Propedéutico)</option>
                        </>
                      ) : (
                        <>
                          <optgroup label="Licenciaturas (3 Años · Cuatrimestral)">
                            <option value="Licenciatura en Administración de Empresas">Lic. en Administración de Empresas</option>
                            <option value="Licenciatura en Derecho">Lic. en Derecho</option>
                            <option value="Licenciatura en Contaduría">Lic. en Contaduría</option>
                            <option value="Licenciatura en Pedagogía">Lic. en Pedagogía</option>
                            <option value="Licenciatura en Seguridad Pública">Lic. en Seguridad Pública</option>
                            <option value="Licenciatura en Diseño y Comunicación Digital">Lic. en Diseño y Comunicación Digital</option>
                            <option value="Licenciatura en Ciencias del Deporte">Lic. en Ciencias del Deporte</option>
                            <option value="Licenciatura en Psicología">Lic. en Psicología</option>
                          </optgroup>
                          <optgroup label="Ingenierías (3 Años · Cuatrimestral)">
                            <option value="Ingeniería Civil">Ingeniería Civil</option>
                            <option value="Ingeniería Eléctrica">Ingeniería Eléctrica</option>
                            <option value="Ingeniería Mecánica Automotriz">Ingeniería Mecánica Automotriz</option>
                          </optgroup>
                          <optgroup label="Maestrías de Posgrado">
                            <option value="Maestría en Administración y Alta Dirección (MBA)">MBA Administración y Alta Dirección</option>
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
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      Modalidad de Estudio Preferida *
                    </label>
                    <select
                      value={formData.modality}
                      onChange={(e) => setFormData({ ...formData, modality: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-ipsur-pink-500"
                    >
                      {level === 'prepa' ? (
                        <>
                          <option value="Modalidad Modular (1 día/semana)">Modalidad Modular (Presencial Intensivo 1 día a la semana)</option>
                          <option value="Modalidad Mixta (Virtual + Presencial)">Modalidad Mixta (Campus Virtual + Asesorías Presenciales)</option>
                          <option value="Prepa 100% en Línea">Prepa 100% en Línea (Campus EDUCORE 24/7)</option>
                        </>
                      ) : (
                        <>
                          <option value="Modalidad Ejecutiva Sabatina">Modalidad Ejecutiva (Sábados intensivo para trabajadores)</option>
                          <option value="Modalidad Mixta Nocturna/Virtual">Modalidad Mixta (Virtual con sesiones periódicas)</option>
                          <option value="Universidad 100% en Línea">Universidad 100% en Línea (Campus EDUCORE)</option>
                        </>
                      )}
                    </select>
                  </div>
                </div>
              </div>

              {/* STEP 2: TUTOR (SÓLO SI ES PREPARATORIA) */}
              {level === 'prepa' && (
                <div className="bg-slate-800/80 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
                  <div className="flex items-center gap-3 pb-4 border-b border-slate-700/80">
                    <div className="w-10 h-10 rounded-2xl bg-ipsur-pink-600 flex items-center justify-center text-white">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">Paso 02</span>
                      <h3 className="text-base sm:text-lg font-bold text-white">
                        Datos del Padre, Madre o Tutor Legal
                      </h3>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    <div className="lg:col-span-2">
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">
                        Nombre Completo del Tutor *
                      </label>
                      <input
                        type="text"
                        required={level === 'prepa'}
                        value={formData.tutorName}
                        onChange={(e) => setFormData({ ...formData, tutorName: e.target.value })}
                        placeholder="Ej. Roberto Hernández Domínguez"
                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-ipsur-pink-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">
                        Teléfono del Tutor *
                      </label>
                      <input
                        type="tel"
                        required={level === 'prepa'}
                        value={formData.tutorPhone}
                        onChange={(e) => setFormData({ ...formData, tutorPhone: e.target.value })}
                        placeholder="(984) 000-0000"
                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-ipsur-pink-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">
                        Parentesco
                      </label>
                      <select
                        value={formData.tutorRelationship}
                        onChange={(e) => setFormData({ ...formData, tutorRelationship: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-ipsur-pink-500"
                      >
                        <option value="Madre / Padre">Madre / Padre</option>
                        <option value="Tutor Legal">Tutor Legal</option>
                        <option value="Abuelo(a)">Abuelo(a)</option>
                        <option value="Hermano(a) Mayor">Hermano(a) Mayor</option>
                        <option value="Otro">Otro</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: DIRECCIÓN Y DOMICILIO */}
              <div className="bg-slate-800/80 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-slate-700/80">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-white ${
                    level === 'prepa' ? 'bg-ipsur-pink-600' : 'bg-sky-600'
                  }`}>
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                      {level === 'prepa' ? 'Paso 03' : 'Paso 02'}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-white">
                      Dirección y Domicilio de Residencia
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                  <div className="lg:col-span-2">
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      Calle, Número Exterior e Interior
                    </label>
                    <input
                      type="text"
                      value={formData.street}
                      onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                      placeholder="Ej. Calle 12 Norte Mza 45 Lote 3"
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-ipsur-pink-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      Colonia / Fraccionamiento
                    </label>
                    <input
                      type="text"
                      value={formData.colonia}
                      onChange={(e) => setFormData({ ...formData, colonia: e.target.value })}
                      placeholder="Ej. Centro / Villas del Sol"
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-ipsur-pink-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      Ciudad / Municipio
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="Playa del Carmen"
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-ipsur-pink-500"
                    />
                  </div>
                </div>
              </div>

              {/* STEP 4: CARGA Y COMPRESIÓN DE DOCUMENTOS */}
              <div className="bg-slate-800/80 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-700/80">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-600 flex items-center justify-center text-white">
                      <Upload className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                        {level === 'prepa' ? 'Paso 04' : 'Paso 03'}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-white">
                        Carga y Compresión Automática de Documentos Oficiales
                      </h3>
                    </div>
                  </div>

                  <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800/80 px-3 py-1 rounded-full flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Compresión Inteligente en el Navegador</span>
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  Sube tus documentos vigentes (fotografía clara tomada con tu celular o escaneo en JPG, PNG o PDF). <strong className="text-emerald-300">El portal reducirá y optimizará su tamaño automáticamente</strong> sin perder legibilidad, facilitando su almacenamiento y validación.
                </p>

                {/* Document Upload Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {docConfig.map((doc) => {
                    const uploaded = documents[doc.id];
                    const isCompressing = uploaded?.isCompressing;

                    return (
                      <div 
                        key={doc.id}
                        className={`rounded-2xl p-5 border transition-all ${
                          uploaded?.dataUrl 
                            ? 'bg-slate-900/90 border-emerald-600/70 shadow-md shadow-emerald-950/20' 
                            : 'bg-slate-900/60 border-slate-700/90 hover:border-slate-600'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div>
                            <h4 className="text-sm font-bold text-white flex items-center gap-2">
                              <span>{doc.label}</span>
                              {uploaded?.dataUrl && (
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                              )}
                            </h4>
                            <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                              {doc.desc}
                            </p>
                          </div>
                        </div>

                        {/* Compression status / stats */}
                        {uploaded?.dataUrl && (
                          <div className="my-3 p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] space-y-1">
                            <div className="flex items-center justify-between text-slate-300">
                              <span className="truncate max-w-[180px] font-mono text-[10px] text-slate-400">
                                {uploaded.name}
                              </span>
                              <span className="text-emerald-400 font-bold">
                                Optimizado {uploaded.uploadedAt}
                              </span>
                            </div>
                            <div className="flex items-center justify-between font-mono text-[10px]">
                              <span className="text-slate-500">
                                Original: {formatSize(uploaded.originalSize)}
                              </span>
                              <span className="text-emerald-400 font-bold">
                                Comprimido: {formatSize(uploaded.compressedSize)}
                              </span>
                              {uploaded.originalSize > uploaded.compressedSize && (
                                <span className="text-pink-300 font-bold">
                                  (-{Math.round((1 - uploaded.compressedSize / uploaded.originalSize) * 100)}%)
                                </span>
                              )}
                            </div>
                          </div>
                        )}

                        {/* File input button */}
                        <div className="mt-3">
                          <label className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                            uploaded?.dataUrl 
                              ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600'
                              : 'bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 text-white border border-slate-600 shadow-sm'
                          }`}>
                            <Camera className="w-3.5 h-3.5 text-ipsur-pink-400" />
                            <span>
                              {isCompressing 
                                ? 'Comprimiendo archivo...' 
                                : uploaded?.dataUrl 
                                ? 'Cambiar archivo' 
                                : 'Seleccionar o Tomar Foto'}
                            </span>
                            <input
                              type="file"
                              accept="image/*,application/pdf"
                              disabled={isCompressing}
                              onChange={(e) => handleFileUpload(doc.id, e.target.files?.[0])}
                              className="hidden"
                            />
                          </label>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* SUBMISSION BUTTON */}
              <div className="bg-slate-950/90 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
                <div className="space-y-1 text-center sm:text-left">
                  <h4 className="text-base sm:text-lg font-bold text-white">¿Listo para generar tu Ficha Oficial?</h4>
                  <p className="text-xs text-slate-400">
                    Al dar clic en Enviar, se generará tu comprobante oficial con Folio y Código QR listo para captura o impresión.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isCompressingAny}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-ipsur-pink-600 via-pink-600 to-rose-600 hover:from-ipsur-pink-500 hover:to-rose-500 text-white font-black text-xs sm:text-sm tracking-wide shadow-xl shadow-ipsur-pink-600/30 flex items-center justify-center gap-2.5 transition transform hover:-translate-y-0.5 cursor-pointer disabled:opacity-50"
                >
                  <FileCheck className="w-4 h-4 text-pink-200" />
                  <span>Generar Ficha de Preinscripción</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </form>
          </div>
        ) : (
          /* ======================================================== */
          /* THE OFFICIAL FICHA DE PREINSCRIPCIÓN (VOUCHER) VIEW       */
          /* ======================================================== */
          <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
            
            {/* Top Success Banner */}
            <div className="bg-emerald-950/80 border border-emerald-700/80 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-emerald-300">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                <div className="text-left">
                  <h4 className="text-sm font-bold text-white">¡Prerregistro Exitoso en el Sistema!</h4>
                  <p className="text-xs text-emerald-300">
                    Tu documentación ha sido precargada y optimizada. Toma una captura de pantalla a la ficha inferior.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="px-4 py-2 rounded-xl bg-white text-slate-900 font-bold text-xs hover:bg-slate-100 transition shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Imprimir / PDF</span>
                </button>

                <button
                  type="button"
                  onClick={shareWhatsApp}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Enviar a WhatsApp</span>
                </button>
              </div>
            </div>

            {/* THE PRINTABLE / SCREENSHOTABLE FICHA CARD */}
            <div 
              ref={printRef}
              className="bg-white text-slate-900 rounded-3xl p-6 sm:p-10 border-4 border-slate-300 shadow-2xl relative overflow-hidden font-sans"
            >
              {/* Institutional Watermark background */}
              <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
                <img src="/ipsur-logo.png" alt="Watermark" className="w-96 h-96 object-contain" />
              </div>

              {/* Ficha Header */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b-2 border-slate-200">
                <div className="flex items-center gap-4 text-left">
                  <div className="w-16 h-16 rounded-2xl bg-white p-1 border border-slate-200 shadow-sm flex items-center justify-center flex-shrink-0">
                    <img src="/ipsur-logo.png" alt="IPSUR Logo" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-ipsur-pink-600 block">
                      {completedVoucher.institution}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-display">
                      {completedVoucher.levelTitle}
                    </h3>
                    <span className="text-xs text-slate-500 block">
                      Campus Playa del Carmen · Ciclo Escolar 2026-2027
                    </span>
                  </div>
                </div>

                {/* Unique Folio Stamp */}
                <div className="bg-slate-900 text-white p-3.5 sm:p-4 rounded-2xl text-center shadow-lg border border-slate-800">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block mb-1">
                    Folio de Preinscripción
                  </span>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-lg sm:text-xl font-mono font-black text-ipsur-pink-400">
                      {completedVoucher.folio}
                    </span>
                    <button
                      type="button"
                      onClick={copyFolioToClipboard}
                      className="text-slate-400 hover:text-white transition cursor-pointer"
                      title="Copiar Folio"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-[10px] text-slate-400 block mt-1">
                    {completedVoucher.date} · {completedVoucher.time}
                  </span>
                </div>
              </div>

              {/* Grid: QR Code & Detailed Student Data */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 my-6 items-center">
                
                {/* QR Code Presentation (Col 4) */}
                <div className="md:col-span-4 bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl p-5 flex flex-col items-center justify-center text-center">
                  <div className="w-36 h-36 bg-white p-2 rounded-xl border border-slate-200 shadow-inner flex items-center justify-center">
                    {/* Render high-res QR code image with encoded Folio verification URL */}
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(`https://ipsur-educore.vercel.app?folio=${completedVoucher.folio}&alumno=${completedVoucher.formData.studentName}&nivel=${completedVoucher.level}`)}`}
                      alt="Código QR de Validación Institucional"
                      className="w-full h-full object-contain"
                      loading="eager"
                    />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider mt-2.5">
                    Validación Digital
                  </span>
                  <span className="text-[11px] font-bold text-slate-700">
                    Escanear en Ventanilla
                  </span>
                </div>

                {/* Student and Program Registration Information (Col 8) */}
                <div className="md:col-span-8 space-y-3 text-left">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                      <span className="text-[10px] text-slate-500 font-bold uppercase block">Nombre del Aspirante</span>
                      <strong className="text-sm font-black text-slate-900 block mt-0.5">
                        {completedVoucher.formData.studentName}
                      </strong>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                      <span className="text-[10px] text-slate-500 font-bold uppercase block">CURP Registrada</span>
                      <strong className="text-xs font-mono font-bold text-slate-900 block mt-0.5">
                        {completedVoucher.formData.curp}
                      </strong>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                      <span className="text-[10px] text-slate-500 font-bold uppercase block">Programa Solicitado</span>
                      <strong className="text-xs font-bold text-ipsur-pink-600 block mt-0.5">
                        {completedVoucher.formData.program}
                      </strong>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                      <span className="text-[10px] text-slate-500 font-bold uppercase block">Modalidad de Estudio</span>
                      <strong className="text-xs font-bold text-sky-700 block mt-0.5">
                        {completedVoucher.formData.modality}
                      </strong>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                      <span className="text-[10px] text-slate-500 font-bold uppercase block">Teléfono / WhatsApp</span>
                      <strong className="text-xs font-semibold text-slate-800 block mt-0.5">
                        {completedVoucher.formData.studentPhone}
                      </strong>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                      <span className="text-[10px] text-slate-500 font-bold uppercase block">Domicilio Declarado</span>
                      <strong className="text-xs font-semibold text-slate-800 block mt-0.5 truncate">
                        {completedVoucher.formData.street || 'Domicilio Registrado'}, {completedVoucher.formData.city}
                      </strong>
                    </div>
                  </div>

                  {/* Tutor information if Prepa */}
                  {completedVoucher.level === 'prepa' && completedVoucher.formData.tutorName && (
                    <div className="bg-pink-50/70 border border-pink-200 p-3 rounded-xl text-xs flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-ipsur-pink-700 block">
                          Tutor Responsable ({completedVoucher.formData.tutorRelationship})
                        </span>
                        <span className="font-bold text-slate-900">{completedVoucher.formData.tutorName}</span>
                      </div>
                      <span className="text-[11px] font-mono text-slate-600">{completedVoucher.formData.tutorPhone}</span>
                    </div>
                  )}
                </div>

              </div>

              {/* Uploaded Documents List */}
              <div className="border-t-2 border-slate-200 pt-4 text-left">
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 block mb-2">
                  Documentación Digital Pre-validada en el Sistema:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
                  {completedVoucher.uploadedDocs.map((doc, dIdx) => (
                    <div key={dIdx} className="bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <div className="overflow-hidden">
                        <span className="text-[11px] font-bold text-emerald-950 block truncate">{doc.label}</span>
                        <span className="text-[9px] font-mono text-emerald-700">Comprimido: {formatSize(doc.compressedSize)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Instructions Box for Student */}
              <div className="mt-6 bg-slate-900 text-white rounded-2xl p-4 sm:p-5 text-left text-xs space-y-2 border border-slate-800">
                <div className="flex items-center gap-2 font-bold text-pink-300">
                  <Camera className="w-4 h-4" />
                  <span>Pasos para Concluir tu Inscripción Oficial:</span>
                </div>
                <ol className="list-decimal list-inside space-y-1 text-slate-300 text-[11px] leading-relaxed">
                  <li>Toma una foto o captura de pantalla a esta ficha con tu celular o imprímela.</li>
                  <li>Preséntate en nuestras instalaciones: <strong className="text-white">{INSTITUTIONAL_CAMPUS.address}</strong> (Lunes a Viernes 8:00 a 19:00 hrs, Sábados 8:00 a 15:00 hrs).</li>
                  <li>Muestra este Código QR y Folio en ventanilla junto con tus originales para cotejo rápido. Tus documentos ya están precargados en el sistema EDUCORE.</li>
                </ol>
              </div>

              {/* Bottom Stamp Bar */}
              <div className="mt-6 pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-slate-500">
                <span>RVOE SEP Acreditado · {completedVoucher.institution}</span>
                <span>Ficha generada por el Sistema Integral EDUCORE</span>
              </div>
            </div>

            {/* Bottom Actions under Voucher */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <button
                type="button"
                onClick={resetForm}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-bold text-xs transition flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Hacer Otro Prerregistro</span>
              </button>

              <button
                type="button"
                onClick={shareWhatsApp}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition flex items-center gap-2 cursor-pointer shadow-md"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Confirmar por WhatsApp con Admisiones</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}