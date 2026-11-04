import React, { useState } from 'react';
import Modal from '../common/Modal';
import { useApp } from '../../context/AppContext';
import { Calendar, Clock, Video, BookOpen, Users, MapPin, ExternalLink } from 'lucide-react';

export default function SchedulesModal({ isOpen, onClose }) {
  const { classrooms, showToast } = useApp();
  const [selectedGroup, setSelectedGroup] = useState('Grupo 2° B');

  if (!isOpen) return null;

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
    <Modal isOpen={isOpen} onClose={onClose} title="Horarios de Clases y Sesiones Virtuales" size="lg">
      <div className="space-y-4">
        {/* Header control */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-2xl border border-blue-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-display font-bold text-slate-900 text-sm">Parrilla Oficial de Horarios</h4>
              <p className="text-xs text-slate-600">Ciclo Escolar Activo · Prepa en Línea IPSUR</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-600">Grupo:</span>
            <select
              value={selectedGroup}
              onChange={e => setSelectedGroup(e.target.value)}
              className="px-3 py-1.5 text-xs font-bold bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="Grupo 1° A">Grupo 1° A · Matutino</option>
              <option value="Grupo 2° B">Grupo 2° B · Matutino</option>
              <option value="Grupo 3° C">Grupo 3° C · Vespertino</option>
              <option value="Grupo 4° A">Grupo 4° A · Virtual 100%</option>
            </select>
          </div>
        </div>

        {/* Schedule List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[420px] overflow-y-auto pr-1">
          {weeklySchedule.map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200 hover:border-blue-300 p-3.5 rounded-2xl shadow-xs transition hover:shadow-md flex flex-col justify-between gap-2.5"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-100 text-blue-900 font-bold text-[11px]">
                  <Clock className="w-3 h-3 text-blue-600" />
                  {item.day} · {item.time}
                </span>
                <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                  {item.room}
                </span>
              </div>

              <div>
                <h5 className="font-bold text-slate-900 text-xs sm:text-sm">{item.subject}</h5>
                <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-slate-400" />
                  {item.teacher}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                  <Video className="w-3.5 h-3.5 text-emerald-600" />
                  {item.mode}
                </span>
                <button
                  onClick={() => showToast('Sala Virtual', `Conectando con ${item.subject}`, 'info')}
                  className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-bold text-[11px]"
                >
                  <span>Entrar</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-3 border-t border-slate-200 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
          >
            Cerrar
          </button>
        </div>
      </div>
    </Modal>
  );
}
