import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import Modal from '../common/Modal';
import { 
  Video, 
  ExternalLink, 
  Copy, 
  Check, 
  Calendar, 
  Clock, 
  Users, 
  Settings, 
  ShieldCheck, 
  PlayCircle, 
  Mic, 
  MicOff, 
  Camera, 
  CameraOff, 
  Radio, 
  Maximize2,
  Sparkles,
  Save,
  MessageSquare,
  AlertCircle
} from 'lucide-react';

export default function VirtualSessionPortalModal({ isOpen, onClose, classroom }) {
  const { currentUser, updateVirtualSession, showToast } = useApp();

  const isTeacherOrCoordinator = currentUser.role === 'teacher' || currentUser.role === 'coordinator';

  // Default virtual session data if not yet customized
  const session = classroom?.virtualSession || {
    platform: 'Google Meet', // 'Google Meet' | 'Zoom' | 'Microsoft Teams' | 'Aula Virtual IPSUR'
    link: classroom?.roomLink || `https://meet.google.com/ipsur-${classroom?.code?.toLowerCase() || 'clase'}-live`,
    meetingId: '845 2100 1014',
    passcode: 'IPSUR2026',
    schedule: 'Lunes y Miércoles 18:30 - 20:00 hrs (Hora Centro México)',
    status: 'live', // 'live' | 'scheduled'
    topic: `Sesión Sincrónica Semanal · ${classroom?.name}`
  };

  const [activeTab, setActiveTab] = useState('unirse'); // 'unirse' | 'integrada' | 'grabaciones' | 'config'
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedId, setCopiedId] = useState(false);
  const [copiedPass, setCopiedPass] = useState(false);

  // Settings form states
  const [editPlatform, setEditPlatform] = useState(session.platform || 'Google Meet');
  const [editLink, setEditLink] = useState(session.link || '');
  const [editMeetingId, setEditMeetingId] = useState(session.meetingId || '');
  const [editPasscode, setEditPasscode] = useState(session.passcode || '');
  const [editSchedule, setEditSchedule] = useState(session.schedule || '');
  const [editStatus, setEditStatus] = useState(session.status || 'live');

  // Simulated recordings
  const recordings = [
    {
      id: 'rec-1',
      title: 'Sesión 1: Apertura de Bimestre y Metodología de Trabajo',
      date: '12 de Octubre 2026',
      duration: '52 min',
      instructor: classroom?.teacherName,
      videoUrl: 'https://youtube.com/watch?v=ipsur-sesion-1'
    },
    {
      id: 'rec-2',
      title: 'Sesión 2: Resolución de Problemas Prácticos en Vivo',
      date: '19 de Octubre 2026',
      duration: '1 hr 08 min',
      instructor: classroom?.teacherName,
      videoUrl: 'https://youtube.com/watch?v=ipsur-sesion-2'
    },
    {
      id: 'rec-3',
      title: 'Sesión 3: Asesoría y Dudas de Actividades y Proyecto',
      date: '26 de Octubre 2026',
      duration: '48 min',
      instructor: classroom?.teacherName,
      videoUrl: 'https://youtube.com/watch?v=ipsur-sesion-3'
    }
  ];

  const handleCopy = (text, type) => {
    navigator.clipboard?.writeText(text);
    if (type === 'link') {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } else if (type === 'id') {
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    } else if (type === 'pass') {
      setCopiedPass(true);
      setTimeout(() => setCopiedPass(false), 2000);
    }
    showToast('Copiado al portapapeles', text, 'info');
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    updateVirtualSession(classroom.id, {
      platform: editPlatform,
      link: editLink.trim(),
      meetingId: editMeetingId.trim(),
      passcode: editPasscode.trim(),
      schedule: editSchedule.trim(),
      status: editStatus
    });
    setActiveTab('unirse');
  };

  const getPlatformBrand = (plat) => {
    switch (plat) {
      case 'Zoom':
        return {
          name: 'Zoom Video',
          color: 'from-blue-600 to-sky-500',
          badge: 'bg-blue-100 text-blue-800 border-blue-200',
          btn: 'bg-blue-600 hover:bg-blue-700'
        };
      case 'Microsoft Teams':
        return {
          name: 'Microsoft Teams',
          color: 'from-purple-700 to-indigo-600',
          badge: 'bg-purple-100 text-purple-800 border-purple-200',
          btn: 'bg-purple-700 hover:bg-purple-800'
        };
      case 'Aula Virtual IPSUR':
        return {
          name: 'Aula Virtual IPSUR (Jitsi)',
          color: 'from-rose-600 to-ipsur-pink-600',
          badge: 'bg-pink-100 text-pink-800 border-pink-200',
          btn: 'bg-ipsur-pink-600 hover:bg-ipsur-pink-700'
        };
      default: // Google Meet
        return {
          name: 'Google Meet',
          color: 'from-emerald-600 via-teal-600 to-ipsur-navy-700',
          badge: 'bg-emerald-100 text-emerald-800 border-emerald-200',
          btn: 'bg-emerald-600 hover:bg-emerald-700'
        };
    }
  };

  const brand = getPlatformBrand(session.platform);
  const jitsiRoomName = `IPSUR-${(classroom?.code || 'CLASE').replace(/[^a-zA-Z0-9]/g, '')}-${classroom?.id?.slice(-6) || 'ROOM'}`;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Portal de Sesiones Virtuales en Vivo"
      subtitle={`${classroom?.name} · ${classroom?.group}`}
      maxWidth="max-w-4xl"
    >
      <div className="space-y-5">
        {/* Top Status Header */}
        <div className={`p-4 sm:p-5 rounded-2xl text-white bg-gradient-to-r ${brand.color} shadow-md relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4`}>
          <div className="relative z-10 space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-black/25 text-white border border-white/20">
                <Radio className="w-3 h-3 text-rose-400 animate-pulse" />
                <span>{session.status === 'live' ? 'Sesión en Vivo Ahora' : 'Sesión Programada'}</span>
              </span>

              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/20 text-white">
                {brand.name}
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-black tracking-tight text-white mt-1">
              {session.topic}
            </h3>

            <p className="text-xs text-white/80 flex items-center gap-2">
              <Clock className="w-3.5 h-3.5" />
              <span>{session.schedule}</span>
            </p>
          </div>

          <div className="relative z-10 flex items-center gap-2">
            <a
              href={session.link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold text-slate-900 bg-white hover:bg-slate-100 rounded-xl shadow-lg transition"
            >
              <Video className="w-4 h-4 text-ipsur-pink-600" />
              <span>Abrir en {session.platform}</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </div>

          {/* Watermark */}
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
            <Video className="w-48 h-48 -mr-10 -mb-10 text-white" />
          </div>
        </div>

        {/* Portal Navigation Tabs */}
        <div className="border-b border-slate-200 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar pb-1">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('unirse')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                activeTab === 'unirse' 
                  ? 'bg-ipsur-navy-800 text-white shadow-sm' 
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Video className="w-4 h-4" />
              <span>Acceso y Credenciales</span>
            </button>

            <button
              onClick={() => setActiveTab('integrada')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                activeTab === 'integrada' 
                  ? 'bg-ipsur-navy-800 text-white shadow-sm' 
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Maximize2 className="w-4 h-4" />
              <span>Aula Virtual Integrada en Pantalla</span>
            </button>

            <button
              onClick={() => setActiveTab('grabaciones')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                activeTab === 'grabaciones' 
                  ? 'bg-ipsur-navy-800 text-white shadow-sm' 
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <PlayCircle className="w-4 h-4" />
              <span>Clases Grabadas ({recordings.length})</span>
            </button>
          </div>

          {isTeacherOrCoordinator && (
            <button
              onClick={() => setActiveTab('config')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                activeTab === 'config'
                  ? 'bg-indigo-600 text-white'
                  : 'text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200'
              }`}
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Configurar Enlace</span>
            </button>
          )}
        </div>

        {/* TAB 1: ACCESO DIRECTO Y CREDENCIALES */}
        {activeTab === 'unirse' && (
          <div className="space-y-4">
            {/* Direct Join Action Card */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Enlace Oficial de la Sesión
                  </h4>
                  <p className="text-xs text-slate-500 font-mono mt-0.5 truncate max-w-md">
                    {session.link}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopy(session.link, 'link')}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg shadow-sm transition"
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedLink ? 'Enlace Copiado' : 'Copiar Enlace'}</span>
                  </button>

                  <a
                    href={session.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold text-white ${brand.btn} rounded-lg shadow-sm transition`}
                  >
                    <span>Entrar Ahora</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* ID & Password Pills */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-200">
                <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-slate-200">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">ID de Reunión:</span>
                    <span className="text-xs font-bold font-mono text-slate-800">{session.meetingId}</span>
                  </div>
                  <button
                    onClick={() => handleCopy(session.meetingId, 'id')}
                    className="p-1.5 text-slate-400 hover:text-slate-600 rounded"
                    title="Copiar ID"
                  >
                    {copiedId ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-slate-200">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Código de Acceso / Passcode:</span>
                    <span className="text-xs font-bold font-mono text-slate-800">{session.passcode}</span>
                  </div>
                  <button
                    onClick={() => handleCopy(session.passcode, 'pass')}
                    className="p-1.5 text-slate-400 hover:text-slate-600 rounded"
                    title="Copiar Código"
                  >
                    {copiedPass ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Attendance & Etiquette Guidelines */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-4 space-y-2">
              <div className="flex items-center gap-2 font-bold text-xs text-ipsur-navy-900">
                <ShieldCheck className="w-4 h-4 text-ipsur-navy-600" />
                <span>Normas Institucionales de la Sesión Sincrónica (15% de Asistencia):</span>
              </div>
              <ul className="text-xs text-slate-700 space-y-1.5 pl-5 list-disc">
                <li>
                  <strong>Puntualidad:</strong> La sala se abre 5 minutos antes de la hora fijada. Conéctate con tu nombre completo y matrícula de alumno.
                </li>
                <li>
                  <strong>Micrófono y Cámara:</strong> Ingresa con el micrófono silenciado para evitar ruidos de fondo. Mantén tu cámara encendida para el pase de lista de asistencia.
                </li>
                <li>
                  <strong>Participación:</strong> Utiliza la función de "Levantar la mano" para tomar la palabra o escribe tus preguntas en el chat de la sesión.
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* TAB 2: AULA VIRTUAL INTEGRADA EN PANTALLA */}
        {activeTab === 'integrada' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs bg-slate-100 p-2.5 rounded-xl">
              <span className="text-slate-600 flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
                <span>Videollamada en vivo en tu navegador (sin salir de IPSUR EDUCORE):</span>
              </span>
              <a
                href={`https://meet.jit.si/${jitsiRoomName}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-ipsur-navy-700 hover:underline flex items-center gap-1"
              >
                <span>Abrir en ventana grande</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Live Video Room Container */}
            <div className="w-full h-[450px] bg-slate-900 rounded-2xl overflow-hidden border border-slate-300 relative shadow-inner">
              <iframe
                src={`https://meet.jit.si/${jitsiRoomName}#config.prejoinPageEnabled=false&userInfo.displayName=${encodeURIComponent(currentUser.name)}`}
                allow="camera; microphone; fullscreen; display-capture; autoplay"
                className="w-full h-full border-0"
                title="Aula Virtual Integrada IPSUR"
              />
            </div>
            <p className="text-[11px] text-slate-500 text-center">
              💡 Permite el acceso al micrófono y cámara en tu navegador cuando te lo solicite para hablar con el profesor y tus compañeros.
            </p>
          </div>
        )}

        {/* TAB 3: CLASES GRABADAS ANTERIORES */}
        {activeTab === 'grabaciones' && (
          <div className="space-y-3">
            <p className="text-xs text-slate-500">
              Si no pudiste asistir a la clase sincrónica o quieres repasar los ejercicios antes de entregar tu tarea, consulta las grabaciones oficiales:
            </p>

            <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl bg-white overflow-hidden">
              {recordings.map(rec => (
                <div key={rec.id} className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 transition">
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 bg-rose-50 text-rose-600 rounded-xl flex-shrink-0 mt-0.5">
                      <PlayCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">{rec.title}</h4>
                      <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-1">
                        <span>📅 {rec.date}</span>
                        <span>⏱️ {rec.duration}</span>
                        <span>👨‍🏫 {rec.instructor}</span>
                      </div>
                    </div>
                  </div>

                  <a
                    href={rec.videoUrl}
                    onClick={(e) => { e.preventDefault(); alert(`Reproduciendo grabación de clase: ${rec.title}`); }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-ipsur-navy-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition self-end sm:self-auto"
                  >
                    <PlayCircle className="w-3.5 h-3.5 text-ipsur-pink-500" />
                    <span>Ver Grabación</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: CONFIGURACIÓN DEL DOCENTE (FORM) */}
        {activeTab === 'config' && isTeacherOrCoordinator && (
          <form onSubmit={handleSaveSettings} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
              <Settings className="w-4 h-4 text-ipsur-navy-600" />
              <span>Configuración de la Plataforma de Videoconferencia</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Plataforma de la Sesión *
                </label>
                <select
                  value={editPlatform}
                  onChange={e => setEditPlatform(e.target.value)}
                  className="w-full text-xs font-bold text-slate-800 bg-white border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-ipsur-navy-500 outline-none"
                >
                  <option value="Google Meet">Google Meet</option>
                  <option value="Zoom">Zoom Video</option>
                  <option value="Microsoft Teams">Microsoft Teams</option>
                  <option value="Aula Virtual IPSUR">Aula Virtual Integrada IPSUR (Jitsi)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Estado de la Sesión
                </label>
                <select
                  value={editStatus}
                  onChange={e => setEditStatus(e.target.value)}
                  className="w-full text-xs font-bold text-slate-800 bg-white border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-ipsur-navy-500 outline-none"
                >
                  <option value="live">🔴 En Vivo Ahora</option>
                  <option value="scheduled">📅 Programada</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Enlace / URL de la Reunión (Google Meet, Zoom, etc.) *
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://meet.google.com/abc-defg-hij"
                  value={editLink}
                  onChange={e => setEditLink(e.target.value)}
                  className="w-full text-xs font-mono text-slate-800 bg-white border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-ipsur-navy-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  ID de la Reunión (Opcional)
                </label>
                <input
                  type="text"
                  placeholder="Ej. 845 2100 1014"
                  value={editMeetingId}
                  onChange={e => setEditMeetingId(e.target.value)}
                  className="w-full text-xs font-mono bg-white border border-slate-300 rounded-lg px-3 py-2 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Código de Acceso / Contraseña (Opcional)
                </label>
                <input
                  type="text"
                  placeholder="Ej. IPSUR2026"
                  value={editPasscode}
                  onChange={e => setEditPasscode(e.target.value)}
                  className="w-full text-xs font-mono bg-white border border-slate-300 rounded-lg px-3 py-2 outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Días y Horarios Programados
                </label>
                <input
                  type="text"
                  placeholder="Ej. Lunes y Miércoles de 18:30 a 20:00 hrs"
                  value={editSchedule}
                  onChange={e => setEditSchedule(e.target.value)}
                  className="w-full text-xs bg-white border border-slate-300 rounded-lg px-3 py-2 outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setActiveTab('unirse')}
                className="px-3.5 py-1.5 text-xs text-slate-600 hover:bg-slate-200 rounded-lg"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-ipsur-navy-700 hover:bg-ipsur-navy-800 rounded-lg shadow-sm"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Guardar Configuración</span>
              </button>
            </div>
          </form>
        )}

        {/* Modal Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-200 text-xs text-slate-500">
          <span>IPSUR EDUCORE · Aula Virtual Sincrónica</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 font-bold text-slate-700 hover:bg-slate-100 rounded-lg"
          >
            Cerrar
          </button>
        </div>
      </div>
    </Modal>
  );
}
