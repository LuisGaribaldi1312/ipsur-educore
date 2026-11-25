import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  FileCheck, 
  Search, 
  Camera, 
  QrCode, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  UserCheck, 
  User, 
  Users, 
  MapPin, 
  Phone, 
  Mail, 
  BookOpen, 
  GraduationCap, 
  X, 
  Eye, 
  Check, 
  Copy, 
  Printer, 
  MessageCircle, 
  Upload, 
  RotateCcw, 
  ShieldCheck, 
  Calendar, 
  FileText, 
  ChevronRight, 
  Filter, 
  ArrowRight,
  ExternalLink,
  Sparkles,
  Maximize2
} from 'lucide-react';
import { PREPA_DATA, IUPS_DATA, INSTITUTIONAL_CAMPUS } from '../../data/institutionalLandingData';

export default function PreinscriptionsManagerModal({ isOpen, onClose }) {
  const { 
    currentUser, 
    preregistrations, 
    updatePreregistration, 
    updatePreregistrationDocStatus, 
    enrollApplicantToUser,
    selectedPortalLevel,
    showToast,
    selectedFolioForReview,
    setSelectedFolioForReview
  } = useApp();

  // Local filter states
  const [levelFilter, setLevelFilter] = useState('all'); // 'all' | 'prepa' | 'universidad'
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'Pendiente' | 'En Revisión' | 'Documentación Completa' | 'Inscrito'
  const [searchTerm, setSearchTerm] = useState('');

  // Selected applicant for detailed dossier review
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  // Scanner modal / state
  const [scannerOpen, setScannerOpen] = useState(false);
  const [manualFolioInput, setManualFolioInput] = useState('');
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // Document Lightbox preview modal
  const [inspectingDoc, setInspectingDoc] = useState(null);

  // Notes state for active applicant
  const [adminNotes, setAdminNotes] = useState('');

  // Initialize level filter based on active portal context
  useEffect(() => {
    if (selectedPortalLevel === 'prepa') {
      setLevelFilter('prepa');
    } else if (selectedPortalLevel === 'universidad') {
      setLevelFilter('universidad');
    } else {
      setLevelFilter('all');
    }
  }, [selectedPortalLevel, isOpen]);

  // If a folio was pre-selected (e.g. from QR scan on landing or notification)
  useEffect(() => {
    if (selectedFolioForReview && preregistrations) {
      const found = preregistrations.find(p => p.folio === selectedFolioForReview);
      if (found) {
        setSelectedApplicant(found);
        setAdminNotes(found.notes || '');
      }
    }
  }, [selectedFolioForReview, preregistrations]);

  // Update selected applicant if preregistrations list changes
  useEffect(() => {
    if (selectedApplicant) {
      const updated = preregistrations.find(p => p.folio === selectedApplicant.folio);
      if (updated) {
        setSelectedApplicant(updated);
      }
    }
  }, [preregistrations]);

  // Clean up camera on unmount or when scanner closes
  useEffect(() => {
    if (!scannerOpen && streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
      setIsCameraActive(false);
    }
  }, [scannerOpen]);

  if (!isOpen) return null;

  // Filter applications
  const filteredList = (preregistrations || []).filter((item) => {
    // Level filter
    if (levelFilter !== 'all' && item.level !== levelFilter) return false;
    // Status filter
    if (statusFilter !== 'all' && item.status !== statusFilter) return false;
    // Search query
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const matchName = item.formData?.studentName?.toLowerCase().includes(q);
      const matchFolio = item.folio?.toLowerCase().includes(q);
      const matchCurp = item.formData?.curp?.toLowerCase().includes(q);
      const matchPhone = item.formData?.studentPhone?.toLowerCase().includes(q);
      const matchProgram = item.formData?.program?.toLowerCase().includes(q);
      if (!matchName && !matchFolio && !matchCurp && !matchPhone && !matchProgram) return false;
    }
    return true;
  });

  // KPI counters
  const totalCount = (preregistrations || []).length;
  const pendingCount = (preregistrations || []).filter(p => p.status === 'Pendiente').length;
  const inReviewCount = (preregistrations || []).filter(p => p.status === 'En Revisión').length;
  const completedDocsCount = (preregistrations || []).filter(p => p.status === 'Documentación Completa').length;
  const enrolledCount = (preregistrations || []).filter(p => p.status === 'Inscrito').length;

  // Handle manual folio search
  const handleFolioSearch = (folioToFind) => {
    const clean = (folioToFind || manualFolioInput).trim().toUpperCase();
    if (!clean) {
      showToast('Ingresa un Folio', 'Escribe el número de folio oficial para buscar el expediente.', 'info');
      return;
    }

    const found = (preregistrations || []).find(p => p.folio.toUpperCase() === clean);
    if (found) {
      setSelectedApplicant(found);
      setAdminNotes(found.notes || '');
      setScannerOpen(false);
      setManualFolioInput('');
      showToast('Expediente Encontrado', `Mostrando datos de ${found.formData.studentName}`, 'success');
    } else {
      showToast('Folio no encontrado', `No existe solicitud con el folio ${clean}.`, 'error');
    }
  };

  // Start Camera for live QR scanning
  const startCamera = async () => {
    setCameraError(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Navegador no soporta acceso directo a cámara.');
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setIsCameraActive(true);
    } catch (err) {
      console.warn('Camera error:', err);
      setCameraError('No se pudo acceder a la cámara. Puedes ingresar el folio manualmente o cargar una imagen.');
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  // Mock scan trigger from camera/sample
  const handleSimulateScan = (sampleFolio) => {
    stopCamera();
    handleFolioSearch(sampleFolio);
  };

  // Document status toggle handler
  const handleDocStatusChange = (folio, docId, newStatus) => {
    updatePreregistrationDocStatus(folio, docId, newStatus);
    showToast('Documento Actualizado', `El documento se marcó como: ${newStatus}`, 'info');
  };

  // Update general status
  const handleGeneralStatusChange = (folio, newStatus) => {
    updatePreregistration(folio, { status: newStatus });
    showToast('Estado Actualizado', `La solicitud cambió a: ${newStatus}`, 'success');
  };

  // Save notes
  const handleSaveNotes = (folio) => {
    updatePreregistration(folio, { notes: adminNotes });
    showToast('Notas Guardadas', 'Las observaciones del expediente fueron guardadas.', 'success');
  };

  // Enroll applicant to student
  const handleEnrollStudent = (folio) => {
    const confirmed = window.confirm(
      `¿Deseas inscribir formalmente al aspirante ${selectedApplicant.formData.studentName}?\n\n` +
      `Se generará su matrícula oficial SEP, usuario y credenciales en el sistema EDUCORE.`
    );
    if (!confirmed) return;

    const newStudent = enrollApplicantToUser(folio);
    if (newStudent) {
      showToast('Inscripción Formal Exitosa', `Matrícula: ${newStudent.matricula}`, 'success');
    }
  };

  const sendWhatsAppContact = (applicant) => {
    const text = encodeURIComponent(
      `Estimado(a) ${applicant.formData.studentName}, te contactamos de la Dirección y Coordinación de ${applicant.levelTitle}.\n` +
      `Respecto a tu solicitud de preinscripción (Folio: ${applicant.folio}):\n` +
      `Estado actual: ${applicant.status}.\n` +
      `Favor de confirmar tu fecha de asistencia a nuestro plantel en Calle 6 Norte entre 20 y 25, Centro, Playa del Carmen.`
    );
    const phone = applicant.formData.studentPhone.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  const formatSize = (bytes) => {
    if (!bytes) return '0 KB';
    if (bytes >= 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
    return (bytes / 1024).toFixed(0) + ' KB';
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fadeIn">
      
      {/* Main Container */}
      <div className="relative w-full max-w-7xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* ======================================================== */}
        {/* HEADER BAR                                               */}
        {/* ======================================================== */}
        <div className="bg-gradient-to-r from-[#070D1B] via-ipsur-navy-900 to-[#180922] text-white p-5 sm:p-6 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-ipsur-pink-600 to-rose-500 text-white flex items-center justify-center shadow-lg shadow-pink-600/30 flex-shrink-0">
              <FileCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-pink-300 bg-pink-950/80 border border-pink-700/80 px-2.5 py-0.5 rounded-full">
                  Módulo de Control Escolar
                </span>
                <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/80 border border-emerald-700/80 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span>Rectoría · Dirección · Coordinación</span>
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white font-display tracking-tight mt-1">
                Aspirantes y Solicitudes de Preinscripción
              </h2>
              <p className="text-xs text-slate-300">
                Seguimiento documental, validación de expedientes y escaneo de Código QR / Folio oficial.
              </p>
            </div>
          </div>

          {/* Quick Actions & Close Button */}
          <div className="flex items-center gap-2.5 self-end md:self-auto">
            <button
              type="button"
              onClick={() => {
                setScannerOpen(true);
                startCamera();
              }}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white font-bold text-xs shadow-md transition flex items-center gap-2 cursor-pointer ring-2 ring-white/10"
            >
              <QrCode className="w-4 h-4 text-sky-200" />
              <span>Escanear QR / Folio</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition cursor-pointer"
              title="Cerrar ventana"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* KPI COUNTERS BAR                                         */}
        {/* ======================================================== */}
        <div className="bg-slate-50 border-b border-slate-200 p-3 sm:p-4 grid grid-cols-2 sm:grid-cols-5 gap-2.5 sm:gap-4 text-center">
          <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-[10px] text-slate-500 font-bold uppercase block">Total Aspirantes</span>
            <strong className="text-base sm:text-lg font-black text-slate-900 font-mono">{totalCount}</strong>
          </div>
          <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-[10px] text-amber-700 font-bold uppercase block">Pendientes</span>
            <strong className="text-base sm:text-lg font-black text-amber-600 font-mono">{pendingCount}</strong>
          </div>
          <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-[10px] text-sky-700 font-bold uppercase block">En Revisión</span>
            <strong className="text-base sm:text-lg font-black text-sky-600 font-mono">{inReviewCount}</strong>
          </div>
          <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-[10px] text-purple-700 font-bold uppercase block">Docs Completos</span>
            <strong className="text-base sm:text-lg font-black text-purple-600 font-mono">{completedDocsCount}</strong>
          </div>
          <div className="col-span-2 sm:col-span-1 bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-[10px] text-emerald-700 font-bold uppercase block">Inscritos Formales</span>
            <strong className="text-base sm:text-lg font-black text-emerald-600 font-mono">{enrolledCount}</strong>
          </div>
        </div>

        {/* ======================================================== */}
        {/* SEARCH, SCANNER SHORTCUT & FILTERS BAR                   */}
        {/* ======================================================== */}
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-white flex flex-col md:flex-row items-center justify-between gap-3">
          
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por nombre, folio, CURP o tel..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-ipsur-pink-500"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
            
            {/* Level Filter */}
            <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-bold">
              <button
                type="button"
                onClick={() => setLevelFilter('all')}
                className={`py-1 px-2.5 rounded-lg transition cursor-pointer ${
                  levelFilter === 'all' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Todos
              </button>
              <button
                type="button"
                onClick={() => setLevelFilter('prepa')}
                className={`py-1 px-2.5 rounded-lg transition cursor-pointer ${
                  levelFilter === 'prepa' ? 'bg-ipsur-pink-600 text-white shadow-2xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Prepa IPSUR
              </button>
              <button
                type="button"
                onClick={() => setLevelFilter('universidad')}
                className={`py-1 px-2.5 rounded-lg transition cursor-pointer ${
                  levelFilter === 'universidad' ? 'bg-sky-600 text-white shadow-2xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                IUPS Universidad
              </button>
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-700 font-bold focus:outline-none focus:ring-2 focus:ring-ipsur-pink-500"
            >
              <option value="all">Todos los Estados</option>
              <option value="Pendiente">Pendiente</option>
              <option value="En Revisión">En Revisión</option>
              <option value="Documentación Completa">Documentación Completa</option>
              <option value="Inscrito">Inscrito</option>
            </select>
          </div>
        </div>

        {/* ======================================================== */}
        {/* BODY: SPLIT VIEW (LIST & SELECTED DOSSIER)               */}
        {/* ======================================================== */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 min-h-0 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
          
          {/* LEFT COLUMN: LIST OF APPLICANTS (Spans 5 cols) */}
          <div className="lg:col-span-5 overflow-y-auto p-4 space-y-3 bg-slate-50/60 max-h-[600px] lg:max-h-none">
            <div className="flex items-center justify-between text-xs text-slate-500 px-1 mb-2 font-semibold">
              <span>{filteredList.length} solicitudes encontradas</span>
              <span>Orden cronológico</span>
            </div>

            {filteredList.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 space-y-3">
                <FileCheck className="w-10 h-10 text-slate-300 mx-auto" />
                <h4 className="text-sm font-bold text-slate-700">Sin Solicitudes</h4>
                <p className="text-xs text-slate-400">
                  No se encontraron registros que coincidan con los filtros aplicados.
                </p>
              </div>
            ) : (
              filteredList.map((app) => {
                const isSelected = selectedApplicant?.folio === app.folio;
                const isPrepa = app.level === 'prepa';

                return (
                  <div
                    key={app.folio}
                    onClick={() => {
                      setSelectedApplicant(app);
                      setAdminNotes(app.notes || '');
                    }}
                    className={`rounded-2xl p-4 border transition-all cursor-pointer relative text-left ${
                      isSelected
                        ? 'bg-white border-ipsur-pink-500 shadow-md ring-2 ring-pink-500/20'
                        : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
                    }`}
                  >
                    {/* Top Row: Folio + Status */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-xs font-black text-slate-900 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                          {app.folio}
                        </span>
                        <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${
                          isPrepa ? 'bg-pink-50 text-ipsur-pink-700 border border-pink-200' : 'bg-sky-50 text-sky-800 border border-sky-200'
                        }`}>
                          {isPrepa ? 'Prepa IPSUR' : 'IUPS Universidad'}
                        </span>
                      </div>

                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        app.status === 'Inscrito' 
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : app.status === 'Documentación Completa'
                          ? 'bg-purple-100 text-purple-800 border border-purple-200'
                          : app.status === 'En Revisión'
                          ? 'bg-sky-100 text-sky-800 border border-sky-200'
                          : 'bg-amber-100 text-amber-800 border border-amber-200'
                      }`}>
                        {app.status}
                      </span>
                    </div>

                    {/* Student Name */}
                    <h4 className="text-sm font-bold text-slate-900 leading-snug">
                      {app.formData.studentName}
                    </h4>

                    {/* Program & Modality */}
                    <p className="text-xs text-slate-600 mt-0.5 truncate">
                      {app.formData.program} · <span className="text-slate-400 font-medium">{app.formData.modality}</span>
                    </p>

                    {/* Details footer */}
                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                      <span className="flex items-center gap-1">
                        <Phone className="w-3 h-3 text-slate-400" />
                        <span>{app.formData.studentPhone}</span>
                      </span>

                      <span className="flex items-center gap-1">
                        {app.hasUploadedDocs ? (
                          <span className="text-emerald-700 font-semibold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                            <span>{app.uploadedDocs?.length || 0} docs</span>
                          </span>
                        ) : (
                          <span className="text-amber-600 font-semibold flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
                            <span>Entrega física</span>
                          </span>
                        )}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* RIGHT COLUMN: SELECTED APPLICANT EXPEDIENTE (Spans 7 cols) */}
          <div className="lg:col-span-7 overflow-y-auto p-5 sm:p-7 bg-white">
            {selectedApplicant ? (
              <div className="space-y-6 text-left">
                
                {/* Dossier Top Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-ipsur-pink-600 bg-pink-50 border border-pink-200 px-2.5 py-0.5 rounded-md">
                        {selectedApplicant.folio}
                      </span>
                      <span className="text-xs text-slate-400">
                        {selectedApplicant.date} · {selectedApplicant.time}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1 font-display">
                      {selectedApplicant.formData.studentName}
                    </h3>
                    <span className="text-xs text-slate-500 font-medium">
                      CURP: <strong className="text-slate-800 font-mono">{selectedApplicant.formData.curp || 'No proporcionada'}</strong>
                    </span>
                  </div>

                  {/* Status Dropdown */}
                  <div className="flex flex-col items-start sm:items-end gap-1.5">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Estado de la Solicitud</span>
                    <select
                      value={selectedApplicant.status}
                      onChange={(e) => handleGeneralStatusChange(selectedApplicant.folio, e.target.value)}
                      className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-ipsur-pink-500"
                    >
                      <option value="Pendiente">Pendiente</option>
                      <option value="En Revisión">En Revisión</option>
                      <option value="Documentación Completa">Documentación Completa</option>
                      <option value="Inscrito">Inscrito</option>
                      <option value="Rechazado">Rechazado</option>
                    </select>
                  </div>
                </div>

                {/* Academic & Contact Details Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Información Académica
                    </span>
                    <p className="font-bold text-slate-900">
                      Programa: <span className="text-ipsur-pink-600">{selectedApplicant.formData.program}</span>
                    </p>
                    <p className="text-slate-700">
                      Modalidad: <span className="font-semibold">{selectedApplicant.formData.modality}</span>
                    </p>
                    <p className="text-slate-500">
                      Nivel: <strong className="text-slate-800">{selectedApplicant.levelTitle}</strong>
                    </p>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Contacto del Aspirante
                    </span>
                    <p className="font-bold text-slate-900 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      <span>{selectedApplicant.formData.studentPhone}</span>
                    </p>
                    <p className="text-slate-700 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      <span>{selectedApplicant.formData.studentEmail || 'Sin correo registrado'}</span>
                    </p>
                    <p className="text-slate-600 flex items-center gap-1.5 truncate">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                      <span>{selectedApplicant.formData.street || 'Domicilio registrado'}, {selectedApplicant.formData.city}</span>
                    </p>
                  </div>
                </div>

                {/* Tutor Info if Prepa */}
                {selectedApplicant.level === 'prepa' && selectedApplicant.formData.tutorName && (
                  <div className="bg-pink-50/70 border border-pink-200 p-4 rounded-2xl text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-ipsur-pink-700 block">
                        Padre, Madre o Tutor Legal ({selectedApplicant.formData.tutorRelationship})
                      </span>
                      <strong className="text-sm font-bold text-slate-900 block mt-0.5">
                        {selectedApplicant.formData.tutorName}
                      </strong>
                    </div>
                    <div className="text-slate-600 text-xs sm:text-right font-medium">
                      <span>Tel: {selectedApplicant.formData.tutorPhone || 'Sin teléfono'}</span>
                      {selectedApplicant.formData.tutorEmail && (
                        <span className="block text-slate-500">{selectedApplicant.formData.tutorEmail}</span>
                      )}
                    </div>
                  </div>
                )}

                {/* DOCUMENTATION REVIEW & VERIFICATION SECTION */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">
                        Expediente de Documentación Digital
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        Revisa los archivos cargados por el alumno/tutor y marca su validez oficial.
                      </p>
                    </div>

                    <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                      {selectedApplicant.uploadedDocs?.length || 0} archivos recibidos
                    </span>
                  </div>

                  {/* Document Grid */}
                  {selectedApplicant.hasUploadedDocs && selectedApplicant.uploadedDocs?.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedApplicant.uploadedDocs.map((doc, idx) => (
                        <div 
                          key={idx}
                          className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/80 hover:bg-slate-50 transition flex flex-col justify-between space-y-3"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <strong className="text-xs font-bold text-slate-900 block leading-tight">
                                {doc.label}
                              </strong>
                              <span className="text-[10px] font-mono text-slate-500 block truncate max-w-[200px]">
                                {doc.name}
                              </span>
                              <span className="text-[10px] font-mono text-emerald-600 font-bold block mt-0.5">
                                Tamaño optimizado: {formatSize(doc.compressedSize)}
                              </span>
                            </div>

                            <button
                              type="button"
                              onClick={() => setInspectingDoc(doc)}
                              className="p-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-2xs transition cursor-pointer flex-shrink-0"
                              title="Inspeccionar documento completo"
                            >
                              <Maximize2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Individual Doc Status Selector */}
                          <div className="flex items-center justify-between pt-2 border-t border-slate-200/80 text-[11px]">
                            <span className="text-slate-500 font-medium">Validación:</span>
                            <select
                              value={doc.status || 'Pendiente'}
                              onChange={(e) => handleDocStatusChange(selectedApplicant.folio, doc.docId, e.target.value)}
                              className={`text-[10px] font-bold px-2 py-1 rounded-lg border focus:outline-none ${
                                doc.status === 'Aprobado'
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                  : doc.status === 'Requiere Corrección'
                                  ? 'bg-rose-50 text-rose-800 border-rose-300'
                                  : 'bg-amber-50 text-amber-800 border-amber-300'
                              }`}
                            >
                              <option value="Aprobado">Aprobado</option>
                              <option value="Pendiente de cotejo">Pendiente de cotejo</option>
                              <option value="Requiere Corrección">Requiere Corrección</option>
                            </select>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3 text-xs text-amber-900">
                      <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="block font-bold">Documentación Digital no adjuntada (Paso Opcional)</strong>
                        El alumno/tutor generó su ficha para presentar sus documentos directamente en físico en el plantel. Coteja los originales en ventanilla y cambia el estado a "Documentación Completa".
                      </div>
                    </div>
                  )}
                </div>

                {/* Administrative Notes Field */}
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-700">
                      Bitácora y Observaciones Escolares:
                    </label>
                    <button
                      type="button"
                      onClick={() => handleSaveNotes(selectedApplicant.folio)}
                      className="text-xs font-bold text-ipsur-pink-600 hover:text-ipsur-pink-700 transition cursor-pointer"
                    >
                      Guardar Nota
                    </button>
                  </div>
                  <textarea
                    rows={2}
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    placeholder="Escribe anotaciones para el equipo escolar (ej. Traerá constancia el viernes, solicitó beca del 30%)..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-ipsur-pink-500 resize-none bg-slate-50"
                  />
                </div>

                {/* Primary Action Buttons Bar */}
                <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => sendWhatsAppContact(selectedApplicant)}
                      className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition shadow-sm flex items-center gap-1.5 cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Contactar por WhatsApp</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs border border-slate-300 transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <Printer className="w-4 h-4" />
                      <span>Imprimir Cotejo</span>
                    </button>
                  </div>

                  {/* Enroll Button */}
                  {selectedApplicant.status !== 'Inscrito' ? (
                    <button
                      type="button"
                      onClick={() => handleEnrollStudent(selectedApplicant.folio)}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-ipsur-navy-700 via-ipsur-navy-800 to-ipsur-pink-600 hover:from-ipsur-navy-600 hover:to-ipsur-pink-500 text-white font-black text-xs shadow-md transition flex items-center gap-2 cursor-pointer"
                    >
                      <UserCheck className="w-4 h-4 text-pink-300" />
                      <span>Inscribir Oficialmente como Alumno</span>
                    </button>
                  ) : (
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span>Alumno Ya Inscrito Formalmente</span>
                    </span>
                  )}
                </div>

              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center p-8 text-center text-slate-400 space-y-3">
                <div className="w-16 h-16 rounded-3xl bg-slate-100 flex items-center justify-center text-slate-400">
                  <FileText className="w-8 h-8" />
                </div>
                <h4 className="text-base font-bold text-slate-700">Ningún Expediente Seleccionado</h4>
                <p className="text-xs text-slate-500 max-w-sm">
                  Selecciona una solicitud de la lista a la izquierda o utiliza el botón <strong className="text-slate-700 font-bold">Escanear QR / Folio</strong> para abrir un expediente al instante.
                </p>
              </div>
            )}
          </div>

        </div>

        {/* Bottom Sub-bar */}
        <div className="p-3 bg-slate-100 border-t border-slate-200 text-[11px] text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2 px-6">
          <span>Sistema Escolar EDUCORE · Módulo de Control de Preinscripciones</span>
          <span className="text-slate-400">Plantel Central: Calle 6 Norte con Ave. 25, Playa del Carmen</span>
        </div>

      </div>

      {/* ======================================================== */}
      {/* QR SCANNER & MANUAL FOLIO SEARCH MODAL                   */}
      {/* ======================================================== */}
      {scannerOpen && (
        <div className="fixed inset-0 z-60 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 max-w-lg w-full text-white shadow-2xl relative space-y-6">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <QrCode className="w-5 h-5 text-ipsur-pink-400" />
                <h3 className="text-base font-bold text-white">Escanear Código QR o Buscar Folio</h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  stopCamera();
                  setScannerOpen(false);
                }}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Camera Viewfinder */}
            <div className="relative rounded-2xl overflow-hidden bg-black aspect-video flex items-center justify-center border-2 border-slate-700">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />

              {/* Scanning Target Crosshair / Overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-44 h-44 border-2 border-dashed border-ipsur-pink-500 rounded-2xl relative animate-pulse shadow-[0_0_15px_rgba(230,0,126,0.4)]">
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-pink-400" />
                  <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-pink-400" />
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-pink-400" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-pink-400" />
                </div>
              </div>

              {!isCameraActive && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/90 p-4 text-center space-y-2">
                  <Camera className="w-8 h-8 text-slate-500 mx-auto" />
                  <span className="text-xs text-slate-300">Cámara inactiva o no permitida</span>
                  <button
                    type="button"
                    onClick={startCamera}
                    className="px-3.5 py-1.5 rounded-xl bg-ipsur-pink-600 hover:bg-ipsur-pink-500 text-white text-xs font-bold shadow-md cursor-pointer"
                  >
                    Activar Cámara
                  </button>
                </div>
              )}
            </div>

            {cameraError && (
              <p className="text-xs text-amber-300 bg-amber-950/60 p-2.5 rounded-xl border border-amber-800">
                {cameraError}
              </p>
            )}

            {/* Manual Folio Entry Bar */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 block">
                O ingresa el Folio de la Ficha manualmente:
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={manualFolioInput}
                  onChange={(e) => setManualFolioInput(e.target.value.toUpperCase())}
                  placeholder="Ej. FOL-IPS-2026-4891"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs font-mono text-white placeholder-slate-500 uppercase focus:outline-none focus:ring-2 focus:ring-ipsur-pink-500"
                />
                <button
                  type="button"
                  onClick={() => handleFolioSearch(manualFolioInput)}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-ipsur-pink-600 to-rose-600 hover:from-ipsur-pink-500 hover:to-rose-500 text-white font-bold text-xs shadow-md transition cursor-pointer flex-shrink-0"
                >
                  Buscar
                </button>
              </div>
            </div>

            {/* Quick Demo Test Folios */}
            <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400">
              <span className="block mb-1.5 text-slate-300 font-semibold">Probar con Folios Registrados:</span>
              <div className="flex flex-wrap gap-2">
                {(preregistrations || []).slice(0, 3).map((p) => (
                  <button
                    key={p.folio}
                    type="button"
                    onClick={() => handleSimulateScan(p.folio)}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-pink-300 font-mono text-[10px] border border-slate-700 transition cursor-pointer"
                  >
                    {p.folio} ({p.formData.studentName.split(' ')[0]})
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* HIGH-RES DOCUMENT LIGHTBOX PREVIEW MODAL                 */}
      {/* ======================================================== */}
      {inspectingDoc && (
        <div className="fixed inset-0 z-70 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl text-white">
            
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white">{inspectingDoc.label}</h4>
                <span className="text-[10px] font-mono text-slate-400">{inspectingDoc.name}</span>
              </div>
              <button
                type="button"
                onClick={() => setInspectingDoc(null)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-black/60">
              {inspectingDoc.dataUrl ? (
                <img
                  src={inspectingDoc.dataUrl}
                  alt={inspectingDoc.label}
                  className="max-h-[70vh] max-w-full object-contain rounded-xl shadow-lg border border-slate-800"
                />
              ) : (
                <div className="p-8 text-center text-slate-400 space-y-2">
                  <FileText className="w-12 h-12 mx-auto text-slate-600" />
                  <p className="text-xs">Vista previa del archivo no disponible en memoria.</p>
                </div>
              )}
            </div>

            <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Resolución de lectura digital optimizada para control escolar</span>
              <button
                type="button"
                onClick={() => setInspectingDoc(null)}
                className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold cursor-pointer"
              >
                Cerrar Visor
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
