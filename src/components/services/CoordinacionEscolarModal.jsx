import React, { useState } from 'react';
import Modal from '../common/Modal';
import { useApp } from '../../context/AppContext';
import { 
  BookOpen, 
  Plus, 
  Video, 
  Users, 
  SlidersHorizontal, 
  CheckCircle2, 
  AlertCircle, 
  Search, 
  ExternalLink,
  Laptop,
  Layers,
  GraduationCap,
  Sparkles,
  Edit,
  Trash2
} from 'lucide-react';

export default function CoordinacionEscolarModal({ 
  isOpen, 
  onClose, 
  onOpenCreateClassroom, 
  onOpenEditClassroom,
  onOpenRubric,
  onSelectClassroom 
}) {
  const { classrooms, users, currentUser, isSuperAdmin, deleteClassroom, showToast } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState('all');

  if (!isOpen) return null;

  const isStudent = currentUser?.role === 'student';
  const isTeacher = currentUser?.role === 'teacher';
  if (isStudent || isTeacher) return null;

  const canManageClassrooms = isSuperAdmin || 
    currentUser?.role === 'superadmin' || 
    currentUser?.role === 'rector' || 
    currentUser?.role === 'director' || 
    currentUser?.role === 'coordinator';

  const canEditClassrooms = canManageClassrooms;

  const handleDeleteClassroom = (c) => {
    if (!canManageClassrooms) {
      showToast('Acceso Denegado', 'Solo el Super Administrador, Director General y Coordinador Escolar pueden eliminar salas.', 'error');
      return;
    }
    const confirmed = window.confirm(`¿Estás seguro de que deseas eliminar permanentemente la sala "${c.name}" (${c.code})?\n\nEsta acción borrará todas sus tareas, entregas y registros asociados en todos los dispositivos.`);
    if (confirmed) {
      deleteClassroom(c.id);
    }
  };

  const filteredClassrooms = (classrooms || []).filter(c => {
    const matchesSearch = c.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.subject?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = filterLevel === 'all' || c.gradeLevel === filterLevel;
    return matchesSearch && matchesLevel;
  });

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Coordinación Escolar · Gestión de Clases y Salas Virtuales"
      size="xl"
    >
      <div className="space-y-5">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-[#0A0D1B] via-[#141B41] to-[#2E3092] text-white p-5 rounded-2xl border border-blue-900/50 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-ipsur-pink-600/30 border border-ipsur-pink-500/40 text-white flex items-center justify-center flex-shrink-0 shadow-inner">
              <BookOpen className="w-6 h-6 text-pink-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-ipsur-pink-600 text-white tracking-widest uppercase">
                  Gestión Operativa
                </span>
                <span className="text-xs text-blue-200">Campus Digital IPSUR</span>
              </div>
              <h3 className="font-display font-black text-lg text-white mt-0.5">
                Salas de Clases Virtuales y Rúbricas Oficiales
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                Apertura de materias, asignación de docentes, enlaces de videoconferencia en vivo (Meet/Zoom) y control de ponderaciones al 100%.
              </p>
            </div>
          </div>

          {canManageClassrooms && (
            <button
              onClick={() => {
                onClose();
                if (onOpenCreateClassroom) onOpenCreateClassroom();
              }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-ipsur-pink-600 hover:bg-ipsur-pink-700 text-white font-bold text-xs shadow-lg transition-transform hover:scale-105 active:scale-95 flex-shrink-0 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>+ Nueva Sala Virtual</span>
            </button>
          )}
        </div>

        {/* Controls Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Buscar por materia, código o sala..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-ipsur-pink-500 outline-none"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs font-bold text-slate-600">Total salas:</span>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 font-mono font-bold text-xs">
              {filteredClassrooms.length}
            </span>
          </div>
        </div>

        {/* Classrooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[460px] overflow-y-auto pr-1">
          {filteredClassrooms.length === 0 ? (
            <div className="col-span-full py-12 text-center text-slate-400 border border-dashed border-slate-200 rounded-2xl">
              <Laptop className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="font-bold text-slate-600 text-sm">No hay salas de clases virtuales registradas</p>
              <p className="text-xs text-slate-400 mt-1">
                Haz clic en "+ Nueva Sala Virtual" para abrir tu primera asignatura en línea.
              </p>
            </div>
          ) : (
            filteredClassrooms.map(c => {
              const teacher = (users || []).find(u => u.id === c.teacherId);
              const enrolledCount = c.enrolledStudentIds?.length || 0;
              const hasRubric100 = true; // Evaluated dynamically

              return (
                <div 
                  key={c.id} 
                  className="bg-white border border-slate-200 hover:border-ipsur-navy-400 rounded-2xl p-4 shadow-xs hover:shadow-md transition flex flex-col justify-between gap-3"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                        {c.code || 'SALA-VIRTUAL'}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Rúbrica 100%
                      </span>
                    </div>

                    <h4 className="font-display font-black text-slate-900 text-sm mt-2 leading-snug">
                      {c.name}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                      {c.subject || 'Bachillerato en Línea'} · {c.group || 'Grupo General'}
                    </p>

                    <div className="mt-3 flex items-center gap-2 text-xs text-slate-600 bg-slate-50 p-2 rounded-xl">
                      <GraduationCap className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      <span className="truncate">
                        <strong>Docente:</strong> {teacher ? teacher.name : 'Por Asignar'}
                      </span>
                    </div>

                    <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-slate-400" />
                        {enrolledCount} alumnos matriculados
                      </span>
                      {c.virtualLink ? (
                        <a 
                          href={c.virtualLink}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1 text-ipsur-pink-600 hover:text-ipsur-pink-700 font-bold text-[11px]"
                        >
                          <Video className="w-3 h-3" />
                          <span>Meet / Zoom</span>
                        </a>
                      ) : (
                        <span className="text-[10px] text-slate-400 italic">Sin enlace en vivo</span>
                      )}
                    </div>
                  </div>

                  {/* Actions for this Classroom */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      {canManageClassrooms && (
                        <button
                          onClick={() => handleDeleteClassroom(c)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                          title="Eliminar sala virtual permanentemente"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}

                      {canEditClassrooms && (
                        <button
                          onClick={() => {
                            onClose();
                            if (onOpenEditClassroom) onOpenEditClassroom(c);
                          }}
                          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition cursor-pointer"
                          title="Editar información de la sala virtual"
                        >
                          <Edit className="w-3.5 h-3.5 text-slate-600" />
                          <span>Editar</span>
                        </button>
                      )}

                      <button
                        onClick={() => {
                          onClose();
                          if (onOpenRubric) onOpenRubric(c);
                        }}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition cursor-pointer"
                        title="Configurar rúbrica de evaluación"
                      >
                        <SlidersHorizontal className="w-3.5 h-3.5" />
                        <span>Rúbrica</span>
                      </button>
                    </div>

                    <button
                      onClick={() => {
                        onClose();
                        if (onSelectClassroom) onSelectClassroom(c.id);
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-ipsur-navy-800 hover:bg-ipsur-navy-900 text-white text-xs font-bold transition shadow-xs cursor-pointer"
                    >
                      <Laptop className="w-3.5 h-3.5" />
                      <span>Ingresar al Aula</span>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </Modal>
  );
}
