import React, { useState } from 'react';
import Modal from '../common/Modal';
import { useApp } from '../../context/AppContext';
import { 
  Users, 
  Video, 
  Mail, 
  Phone, 
  BookOpen, 
  Calendar, 
  Clock, 
  Search, 
  Plus, 
  CheckCircle2, 
  ExternalLink,
  Laptop,
  Award
} from 'lucide-react';

export default function DocentesModal({ isOpen, onClose }) {
  const { users, classrooms, showToast, setUserManagerModalOpen, currentUser, isSuperAdmin } = useApp();
  const [activeTab, setActiveTab] = useState('directorio'); // 'directorio' | 'horarios'
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const canManage = isSuperAdmin || currentUser?.role === 'director' || currentUser?.role === 'coordinator';

  // Filter teachers from users
  const teachers = (users || []).filter(u => u.role === 'teacher' || u.role === 'coordinator');

  const filteredTeachers = teachers.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (t.title && t.title.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const weeklySchedule = [
    { day: 'Lunes', time: '08:00 - 09:30 h', subject: 'Matemáticas II: Geometría y Álgebra', teacher: 'Mtro. Roberto Hernández', mode: 'En Vivo (Meet)', room: 'Sala A-101' },
    { day: 'Lunes', time: '10:00 - 11:30 h', subject: 'Química General y Orgánica', teacher: 'Dra. María Elena Cruz', mode: 'Laboratorio Virtual', room: 'Lab Virtual 2' },
    { day: 'Martes', time: '08:00 - 09:30 h', subject: 'Historia de México Contemporánea', teacher: 'Lic. Fernando Soto', mode: 'En Vivo (Meet)', room: 'Sala B-204' },
    { day: 'Martes', time: '10:00 - 11:30 h', subject: 'Taller de Lectura y Redacción II', teacher: 'Mtra. Sofía Morales', mode: 'Asincrónica / Rúbrica', room: 'Campus Virtual' },
    { day: 'Miércoles', time: '08:00 - 09:30 h', subject: 'Lengua Extranjera: Inglés B1', teacher: 'Prof. John Davies', mode: 'En Vivo (Meet)', room: 'Sala A-102' },
    { day: 'Miércoles', time: '10:00 - 11:30 h', subject: 'Informática y Tecnologías Web', teacher: 'Ing. Carlos Mendoza', mode: 'Práctica en Vivo', room: 'Sala Tech 1' },
    { day: 'Jueves', time: '08:00 - 09:30 h', subject: 'Matemáticas II: Geometría y Álgebra', teacher: 'Mtro. Roberto Hernández', mode: 'Tutoría y Dudas', room: 'Sala A-101' },
    { day: 'Jueves', time: '10:00 - 11:30 h', subject: 'Ética y Valores Ciudadanos', teacher: 'Lic. Lucía Ramírez', mode: 'En Vivo (Meet)', room: 'Sala C-301' },
    { day: 'Viernes', time: '09:00 - 11:00 h', subject: 'Asesoría Académica y Cierre Semanal', teacher: 'Coordinación Escolar', mode: 'Sesión Plenaria', room: 'Auditorio Digital' }
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Claustro Docente · Catedráticos de la Escuela Virtual"
      size="xl"
    >
      <div className="space-y-4">
        {/* Banner with IPSUR Styling */}
        <div className="bg-gradient-to-r from-[#0A0D1B] via-[#141B41] to-[#2E3092] text-white p-4.5 rounded-2xl border border-blue-900/50 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-ipsur-pink-600/30 border border-ipsur-pink-500/40 text-white flex items-center justify-center flex-shrink-0 shadow-inner">
              <Users className="w-6 h-6 text-pink-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-ipsur-pink-600 text-white tracking-widest uppercase">
                  Cuerpo Académico
                </span>
                <span className="text-xs text-blue-200">Prepa en Línea IPSUR</span>
              </div>
              <h3 className="font-display font-black text-base text-white mt-0.5">
                Profesores y Catedráticos Titulares
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                Asignación de asignaturas, enlaces de transmisión en vivo, horarios y seguimiento pedagógico.
              </p>
            </div>
          </div>

          {canManage && (
            <button
              onClick={() => {
                onClose();
                setUserManagerModalOpen(true);
              }}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-ipsur-pink-600 hover:bg-ipsur-pink-700 text-white font-bold text-xs shadow-md transition-transform hover:scale-105 active:scale-95 flex-shrink-0 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Gestionar Docentes</span>
            </button>
          )}
        </div>

        {/* Tab switchers */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('directorio')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeTab === 'directorio'
                  ? 'bg-ipsur-navy-800 text-white shadow'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Directorio Docente ({teachers.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('horarios')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeTab === 'horarios'
                  ? 'bg-ipsur-navy-800 text-white shadow'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Horarios de Clases en Vivo</span>
            </button>
          </div>

          {activeTab === 'directorio' && (
            <div className="relative w-48 sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
              <input
                type="text"
                placeholder="Buscar catedrático..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-2.5 py-1 text-xs bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-1 focus:ring-ipsur-pink-500"
              />
            </div>
          )}
        </div>

        {/* Directory Tab */}
        {activeTab === 'directorio' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 max-h-[440px] overflow-y-auto pr-1">
            {filteredTeachers.length === 0 ? (
              <div className="col-span-full py-10 text-center text-slate-400 border border-dashed border-slate-200 rounded-2xl">
                <Users className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="font-bold text-slate-600 text-sm">No se encontraron docentes registrados</p>
                <p className="text-xs text-slate-400 mt-0.5">
                  Registra a los catedráticos en la sección de Configuración / Usuarios.
                </p>
              </div>
            ) : (
              filteredTeachers.map(teacher => {
                const assignedRooms = (classrooms || []).filter(c => c.teacherId === teacher.id);

                return (
                  <div
                    key={teacher.id}
                    className="bg-white border border-slate-200 hover:border-ipsur-navy-400 rounded-2xl p-3.5 shadow-xs transition flex flex-col justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-ipsur-navy-800 to-ipsur-pink-600 text-white font-black text-sm flex items-center justify-center flex-shrink-0 shadow-sm overflow-hidden">
                            {teacher.avatar ? (
                              <img src={teacher.avatar} alt={teacher.name} className="w-full h-full object-cover" />
                            ) : (
                              teacher.name?.charAt(0)
                            )}
                          </div>
                          <div>
                            <h4 className="font-display font-bold text-slate-900 text-xs">
                              {teacher.name}
                            </h4>
                            <p className="text-[11px] text-ipsur-pink-600 font-semibold">
                              {teacher.title || 'Catedrático de Bachillerato en Línea'}
                            </p>
                            <span className="text-[10px] text-slate-400 font-mono block">
                              {teacher.email}
                            </span>
                          </div>
                        </div>

                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                          Activo
                        </span>
                      </div>

                      {/* Assigned virtual classrooms */}
                      <div className="mt-3 bg-slate-50 border border-slate-100 rounded-xl p-2.5">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                          Materias y Salas a su cargo ({assignedRooms.length}):
                        </span>
                        {assignedRooms.length === 0 ? (
                          <span className="text-[11px] text-slate-400 italic">
                            Sin salas virtuales asignadas actualmente.
                          </span>
                        ) : (
                          <div className="space-y-1">
                            {assignedRooms.map(room => (
                              <div key={room.id} className="flex items-center justify-between text-xs">
                                <span className="font-medium text-slate-700 truncate">
                                  {room.name}
                                </span>
                                {room.virtualLink && (
                                  <a
                                    href={room.virtualLink}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-[10px] text-ipsur-pink-600 font-bold flex items-center gap-0.5 hover:underline"
                                  >
                                    <Video className="w-3 h-3" />
                                    <span>Meet</span>
                                  </a>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                      <span>Tel: {teacher.phone || '+52 (998) 000-0000'}</span>
                      <button
                        onClick={() => showToast('Contacto Docente', `Correo enviado a ${teacher.email}`, 'info')}
                        className="text-ipsur-navy-700 hover:text-ipsur-pink-600 font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Contactar</span>
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* Schedule Tab */}
        {activeTab === 'horarios' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[440px] overflow-y-auto pr-1">
            {weeklySchedule.map((item, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 p-3.5 rounded-2xl shadow-xs flex flex-col justify-between gap-2"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-ipsur-navy-900 bg-blue-50 text-blue-900 px-2 py-0.5 rounded">
                      {item.day} · {item.time}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {item.mode}
                    </span>
                  </div>
                  <h5 className="font-bold text-slate-900 text-xs mt-2">{item.subject}</h5>
                  <p className="text-[11px] text-slate-500 mt-0.5">{item.teacher}</p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span>{item.room}</span>
                  <button
                    onClick={() => showToast('Sesión Virtual', `Iniciando sesión Meet para ${item.subject}`, 'info')}
                    className="flex items-center gap-1 font-bold text-ipsur-pink-600 hover:text-ipsur-pink-700 cursor-pointer"
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Conectar</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
}
