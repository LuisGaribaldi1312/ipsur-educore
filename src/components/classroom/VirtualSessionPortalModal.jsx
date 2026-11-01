import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import Modal from '../common/Modal';
import { 
  Video, 
  ExternalLink, 
  Copy, 
  Check, 
  Clock, 
  Users, 
  Settings, 
  Radio, 
  Maximize2,
  Save,
  PlayCircle,
  Sparkles,
  Info
} from 'lucide-react';

export default function VirtualSessionPortalModal({ isOpen, onClose, classroom }) {
  const { classrooms, currentUser, updateVirtualSession, setActiveClassroomId, showToast } = useApp();

  const isTeacherOrCoordinator = currentUser.role === 'teacher' || currentUser.role === 'coordinator';

  const defaultRoomName = `IPSUR_${classroom?.code?.replace(/[^a-zA-Z0-9]/g, '') || 'SALA'}_Virtual`;

  // Default virtual session data for this classroom
  const session = classroom?.virtualSession || {
    platform: 'Aula Virtual IPSUR',
    link: `https://meet.jit.si/${defaultRoomName}`,
    meetingId: classroom?.code || 'IPSUR-101',
    passcode: 'IPSUR2026',
    schedule: 'Lunes y Miércoles 18:00 - 19:30 hrs (En Simultáneo)',
    status: 'live',
    channelName: defaultRoomName,
    topic: `Clase Virtual en Vivo · ${classroom?.name}`
  };

  const [activeTab, setActiveTab] = useState('integrada'); // Default directly into live room
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedId, setCopiedId] = useState(false);
  const [copiedPass, setCopiedPass] = useState(false);

  // Form states for settings
  const [editPlatform, setEditPlatform] = useState(session.platform || 'Aula Virtual IPSUR');
  const [editLink, setEditLink] = useState(session.link || `https://meet.jit.si/${defaultRoomName}`);
  const [editMeetingId, setEditMeetingId] = useState(session.meetingId || classroom?.code || 'IPSUR-101');
  const [editPasscode, setEditPasscode] = useState(session.passcode || 'IPSUR2026');
  const [editSchedule, setEditSchedule] = useState(session.schedule || 'Lunes y Miércoles 18:00 - 19:30 hrs');
  const [editStatus, setEditStatus] = useState(session.status || 'live');
  const [editTopic, setEditTopic] = useState(session.topic || `Clase Virtual en Vivo · ${classroom?.name}`);

  const jitsiRoomName = session.channelName || defaultRoomName;
  const liveRoomUrl = `https://meet.jit.si/${jitsiRoomName}`;

  // Find all active live simultaneous classes across the institution
  const simultaneousClasses = classrooms.map(c => {
    const cRoomName = c.virtualSession?.channelName || `IPSUR_${c.code?.replace(/[^a-zA-Z0-9]/g, '')}_Virtual`;
    return {
      id: c.id,
      name: c.name,
      code: c.code,
      group: c.group,
      teacherName: c.teacherName,
      platform: c.virtualSession?.platform || 'Aula Virtual IPSUR',
      link: c.virtualSession?.link || `https://meet.jit.si/${cRoomName}`,
      schedule: c.virtualSession?.schedule || '18:00 - 19:30 hrs',
      status: c.virtualSession?.status || 'live',
      isCurrent: c.id === classroom?.id,
      channelName: cRoomName
    };
  });

  // Simulated recordings for review
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
      title: 'Sesión 3: Asesoría de Actividades y Proyecto Bimestral',
      date: '26 de Octubre 2026',
      duration: '48 min',
      instructor: classroom?.teacherName,
      videoUrl: 'https://youtube.com/watch?v=ipsur-sesion-3'
    }
  ];

  const handleCopy = (text, type) => {
    try {
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
    } catch {
      showToast('Copiado', text, 'info');
    }
  };

  const handleOpenRoomDirect = (url) => {
    const targetUrl = url || liveRoomUrl;
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    updateVirtualSession(classroom.id, {
      platform: editPlatform,
      link: editLink.trim() || liveRoomUrl,
      meetingId: editMeetingId.trim(),
      passcode: editPasscode.trim(),
      schedule: editSchedule.trim(),
      status: editStatus,
      topic: editTopic.trim(),
      channelName: session.channelName || defaultRoomName
    });
    setActiveTab('integrada');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Centro de Sesiones Virtuales y Clases en Vivo"
      subtitle={`${classroom?.name} · Grupo: ${classroom?.group} · Docente: ${classroom?.teacherName}`}
      maxWidth="max-w-5xl"
    >
      <div className="space-y-4">
        {/* Top Live Banner */}
        <div className="p-4 sm:p-5 rounded-2xl text-white bg-gradient-to-r from-ipsur-navy-800 via-ipsur-navy-900 to-ipsur-pink-700 shadow-md relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative z-10 space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-500/30 text-rose-200 border border-rose-400/30">
                <Radio className="w-3 h-3 text-rose-400 animate-pulse" />
                <span>{session.status === 'live' ? 'En Vivo Ahora' : 'Sesión Programada'}</span>
              </span>

              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/15 text-pink-100 border border-white/10">
                {session.platform || 'Aula Virtual IPSUR'}
              </span>

              <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full text-indigo-100 font-mono">
                Sala ID: {classroom?.code}
              </span>
            </div>

            <h3 className="text-base sm:text-xl font-black tracking-tight text-white mt-1">
              {session.topic || `Clase Virtual: ${classroom?.name}`}
            </h3>

            <p className="text-xs text-white/90 flex items-center gap-1.5 font-medium">
              <Clock className="w-3.5 h-3.5 text-pink-200" />
              <span>{session.schedule}</span>
            </p>
          </div>

          <div className="relative z-10 flex flex-wrap items-center gap-2">
            <button
              onClick={() => handleOpenRoomDirect(liveRoomUrl)}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold text-ipsur-navy-900 bg-white hover:bg-slate-100 rounded-xl shadow-lg transition active:scale-95"
              title="Abrir esta videollamada en una ventana completa"
            >
              <Maximize2 className="w-3.5 h-3.5 text-ipsur-pink-600" />
              <span>Pantalla Completa</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </button>
          </div>

          {/* Watermark Emblem */}
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
            <Video className="w-48 h-48 -mr-10 -mb-10 text-white" />
          </div>
        </div>

        {/* Portal Navigation Tabs */}
        <div className="border-b border-slate-200 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar pb-1">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setActiveTab('integrada')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                activeTab === 'integrada' 
                  ? 'bg-ipsur-pink-600 text-white shadow-sm' 
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Video className="w-4 h-4" />
              <span>Aula Virtual en Vivo</span>
            </button>

            <button
              onClick={() => setActiveTab('simultaneo')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                activeTab === 'simultaneo' 
                  ? 'bg-rose-700 text-white shadow-sm' 
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Radio className="w-4 h-4 text-rose-300 animate-pulse" />
              <span>Salas Simultáneas ({simultaneousClasses.filter(c => c.status === 'live').length} en Paralelo)</span>
            </button>

            <button
              onClick={() => setActiveTab('info')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                activeTab === 'info' 
                  ? 'bg-ipsur-navy-800 text-white shadow-sm' 
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Info className="w-4 h-4" />
              <span>Datos y Enlace de Acceso</span>
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
              <span>Grabaciones ({recordings.length})</span>
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
              <span>Configuración</span>
            </button>
          )}
        </div>

        {/* TAB 1: AULA VIRTUAL EN VIVO DIRECTA (DEFAULT) */}
        {activeTab === 'integrada' && (
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs bg-slate-50 border border-slate-200 p-3 rounded-xl">
              <span className="text-slate-700 font-semibold flex items-center gap-2">
                <Radio className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
                <span>Sala aislada e independiente: <strong className="font-mono text-ipsur-navy-800">{jitsiRoomName}</strong></span>
              </span>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <button
                  onClick={() => handleCopy(liveRoomUrl, 'link')}
                  className="font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm text-xs"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? 'Copiado' : 'Copiar Link'}</span>
                </button>

                <button
                  onClick={() => handleOpenRoomDirect(liveRoomUrl)}
                  className="font-bold text-white bg-ipsur-navy-800 hover:bg-ipsur-navy-900 px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm text-xs"
                >
                  <Maximize2 className="w-3 h-3 text-pink-400" />
                  <span>Pantalla Completa</span>
                </button>
              </div>
            </div>

            {/* Live Video Room Container */}
            <div className="w-full h-[520px] bg-slate-900 rounded-2xl overflow-hidden border border-slate-300 relative shadow-inner">
              <iframe
                src={`https://meet.jit.si/${jitsiRoomName}#config.prejoinPageEnabled=false&userInfo.displayName=${encodeURIComponent(currentUser.name)}`}
                allow="camera; microphone; fullscreen; display-capture; autoplay"
                className="w-full h-full border-0"
                title={`Aula Virtual ${classroom?.name}`}
              />
            </div>
            
            <div className="p-3 bg-indigo-50/70 border border-indigo-200 rounded-xl flex items-center justify-between text-xs text-indigo-900">
              <span>
                💡 <strong>Clase Interactiva Directa:</strong> Micrófono, cámara y pantalla compartida habilitados sin necesidad de cuenta externa ni contraseñas.
              </span>
              <span className="text-[11px] font-mono text-indigo-700">
                Docente: {classroom?.teacherName}
              </span>
            </div>
          </div>
        )}

        {/* TAB 2: MONITOR DE CLASES SIMULTÁNEAS (2 a 4 SESIONES EN PARALELO) */}
        {activeTab === 'simultaneo' && (
          <div className="space-y-4">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                    <Radio className="w-4 h-4 text-rose-600 animate-pulse" />
                    <span>Monitor Institucional de Sesiones en Simultáneo</span>
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Profesores impartiendo de 2 a 4 clases virtuales concurrentes al mismo tiempo con salas totalmente aisladas.
                  </p>
                </div>
                <span className="text-xs font-bold px-3 py-1 bg-white border border-slate-300 rounded-full text-slate-700 self-start sm:self-auto font-mono">
                  {simultaneousClasses.length} Salas en el Plantel
                </span>
              </div>
            </div>

            {/* List of simultaneous classrooms */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {simultaneousClasses.map(cls => (
                <div
                  key={cls.id}
                  className={`p-4 rounded-2xl border transition space-y-3 ${
                    cls.isCurrent
                      ? 'bg-gradient-to-r from-blue-50/90 to-indigo-50/90 border-indigo-300 ring-2 ring-indigo-200'
                      : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                          {cls.code}
                        </span>
                        <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200 flex items-center gap-1">
                          <Radio className="w-2.5 h-2.5 animate-pulse" />
                          En Vivo
                        </span>
                        {cls.isCurrent && (
                          <span className="text-[10px] font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded">
                            Esta Sala
                          </span>
                        )}
                      </div>

                      <h5 className="text-xs font-bold text-slate-800 line-clamp-1">
                        {cls.name}
                      </h5>
                      <p className="text-[11px] text-slate-500">
                        Prof: <strong className="text-slate-700">{cls.teacherName}</strong> · {cls.group}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                    <span className="text-[11px] text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {cls.schedule}
                    </span>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleOpenRoomDirect(cls.link)}
                        className="px-3 py-1.5 text-[11px] font-bold text-white bg-ipsur-pink-600 hover:bg-ipsur-pink-700 rounded-lg shadow-sm flex items-center gap-1"
                        title="Entrar a la videollamada de esta clase"
                      >
                        <Video className="w-3 h-3" />
                        <span>Entrar a Sala</span>
                      </button>

                      {!cls.isCurrent && (
                        <button
                          onClick={() => {
                            setActiveClassroomId(cls.id);
                            onClose();
                          }}
                          className="px-2.5 py-1.5 text-[11px] font-bold text-ipsur-navy-700 bg-slate-100 hover:bg-slate-200 rounded-lg"
                        >
                          Ir a Materia
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: DATOS Y ENLACE DE ACCESO */}
        {activeTab === 'info' && (
          <div className="space-y-4">
            <div className="p-4 sm:p-5 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="p-2 rounded-xl bg-pink-50 text-ipsur-pink-600">
                      <Video className="w-5 h-5" />
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">
                        Sala Virtual Oficial · {classroom?.code}
                      </h4>
                      <p className="text-xs text-slate-500 font-mono mt-0.5 break-all">
                        {liveRoomUrl}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => handleCopy(liveRoomUrl, 'link')}
                    className="flex items-center gap-1 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-300 hover:bg-slate-100 rounded-xl transition"
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedLink ? 'Copiado' : 'Copiar Enlace'}</span>
                  </button>

                  <button
                    onClick={() => handleOpenRoomDirect(liveRoomUrl)}
                    className="flex items-center gap-2 px-5 py-2 text-xs font-bold text-white bg-ipsur-navy-800 hover:bg-ipsur-navy-900 rounded-xl shadow-md transition active:scale-95"
                  >
                    <span>Abrir en Pestaña Nueva</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* ID & Password Pills */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">ID de Sala / Canal:</span>
                    <span className="text-xs font-bold font-mono text-slate-800">{jitsiRoomName}</span>
                  </div>
                  <button
                    onClick={() => handleCopy(jitsiRoomName, 'id')}
                    className="p-1.5 text-slate-400 hover:text-slate-600 rounded bg-white border border-slate-200"
                    title="Copiar ID"
                  >
                    {copiedId ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Código de Acceso / Passcode:</span>
                    <span className="text-xs font-bold font-mono text-slate-800">{session.passcode}</span>
                  </div>
                  <button
                    onClick={() => handleCopy(session.passcode, 'pass')}
                    className="p-1.5 text-slate-400 hover:text-slate-600 rounded bg-white border border-slate-200"
                    title="Copiar Contraseña"
                  >
                    {copiedPass ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Quick guide card */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-700 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-800">
                <Sparkles className="w-4 h-4 text-ipsur-pink-600 flex-shrink-0" />
                <span>Instrucciones de Conexión</span>
              </div>
              <p className="leading-relaxed text-slate-600">
                El aula virtual está integrada directamente dentro de IPSUR EDUCORE. Al ingresar, el navegador te solicitará permiso para activar tu micrófono y cámara web.
              </p>
              <div className="flex items-center gap-2 pt-1 font-semibold text-ipsur-navy-700">
                <span>👉 Para entrar a la transmisión activa con video y audio:</span>
                <button
                  onClick={() => setActiveTab('integrada')}
                  className="underline text-ipsur-pink-600 hover:text-ipsur-pink-700 font-bold cursor-pointer"
                >
                  Ir al Aula Virtual en Vivo
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: CLASES GRABADAS ANTERIORES */}
        {activeTab === 'grabaciones' && (
          <div className="space-y-3">
            <p className="text-xs text-slate-500">
              Repositorio de grabaciones sincrónicas de esta asignatura para repaso de temas y justificación de asistencias:
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

        {/* TAB 5: CONFIGURACIÓN DEL DOCENTE (FORM) */}
        {activeTab === 'config' && isTeacherOrCoordinator && (
          <form onSubmit={handleSaveSettings} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
              <Settings className="w-4 h-4 text-ipsur-navy-600" />
              <span>Configuración de la Sesión para {classroom?.name}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Plataforma de Videoconferencia *
                </label>
                <select
                  value={editPlatform}
                  onChange={e => setEditPlatform(e.target.value)}
                  className="w-full text-xs font-bold text-slate-800 bg-white border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-ipsur-navy-500 outline-none"
                >
                  <option value="Aula Virtual IPSUR">Aula Virtual IPSUR (Integrada / Directa)</option>
                  <option value="Zoom">Zoom Video</option>
                  <option value="Microsoft Teams">Microsoft Teams</option>
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
                  <option value="live">🔴 En Vivo Ahora (Clase Activa)</option>
                  <option value="scheduled">📅 Sesión Programada</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Enlace Directo de la Sala *
                </label>
                <input
                  type="url"
                  required
                  placeholder={`https://meet.jit.si/${defaultRoomName}`}
                  value={editLink}
                  onChange={e => setEditLink(e.target.value)}
                  className="w-full text-xs font-mono text-slate-800 bg-white border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-ipsur-navy-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  ID de Sala (Identificador)
                </label>
                <input
                  type="text"
                  placeholder="Ej. IPSUR-MAT101"
                  value={editMeetingId}
                  onChange={e => setEditMeetingId(e.target.value)}
                  className="w-full text-xs font-mono bg-white border border-slate-300 rounded-lg px-3 py-2 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Contraseña / Código de Acceso
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
                  Horario Programado (Visible para Alumnos)
                </label>
                <input
                  type="text"
                  placeholder="Ej. Lunes y Miércoles de 18:00 a 19:30 hrs"
                  value={editSchedule}
                  onChange={e => setEditSchedule(e.target.value)}
                  className="w-full text-xs bg-white border border-slate-300 rounded-lg px-3 py-2 outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setActiveTab('integrada')}
                className="px-3.5 py-1.5 text-xs text-slate-600 hover:bg-slate-200 rounded-lg"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-ipsur-navy-700 hover:bg-ipsur-navy-800 rounded-lg shadow-sm"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Guardar Configuración de Sala</span>
              </button>
            </div>
          </form>
        )}

        {/* Modal Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-200 text-xs text-slate-500">
          <span>IPSUR EDUCORE · Sistema Multi-Salas Sincrónicas en Paralelo</span>
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
