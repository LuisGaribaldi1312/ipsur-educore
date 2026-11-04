import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import { useApp } from '../../context/AppContext';
import { 
  BookOpen, 
  Save, 
  Users, 
  GraduationCap, 
  Video, 
  Clock, 
  ShieldCheck, 
  Search, 
  CheckCircle2, 
  X,
  Laptop,
  Layers
} from 'lucide-react';

export default function EditClassroomModal({ isOpen, onClose, classroom }) {
  const { 
    currentUser, 
    isSuperAdmin, 
    users, 
    periods, 
    updateClassroom, 
    showToast 
  } = useApp();

  const canEdit = isSuperAdmin || currentUser?.role === 'director' || currentUser?.role === 'coordinator';

  const teachers = (users || []).filter(u => u.role === 'teacher' || u.role === 'coordinator');
  const allStudents = (users || []).filter(u => u.role === 'student');

  // Form Fields
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [group, setGroup] = useState('');
  const [periodId, setPeriodId] = useState('');
  const [teacherId, setTeacherId] = useState('');
  const [virtualLink, setVirtualLink] = useState('');
  const [schedule, setSchedule] = useState('');
  const [objective, setObjective] = useState('');
  const [enrolledStudentIds, setEnrolledStudentIds] = useState([]);
  const [activeTab, setActiveTab] = useState('general'); // 'general' | 'alumnos'
  const [studentSearch, setStudentSearch] = useState('');

  // Sync state whenever classroom changes or modal opens
  useEffect(() => {
    if (classroom) {
      setName(classroom.name || '');
      setCode(classroom.code || '');
      setGroup(classroom.group || 'Grupo 2° B');
      setPeriodId(classroom.periodId || periods[0]?.id || '');
      setTeacherId(classroom.teacherId || teachers[0]?.id || '');
      setVirtualLink(classroom.virtualLink || '');
      setSchedule(classroom.schedule || 'Lunes y Miércoles 08:00 - 09:30 h');
      setObjective(classroom.rubric?.generalObjective || '');
      setEnrolledStudentIds(classroom.enrolledStudentIds || []);
    }
  }, [classroom, periods]);

  if (!isOpen || !classroom) return null;

  // Strict Permission Check: Only superadmin, director, and coordinator can edit
  if (!canEdit) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} title="Acceso Restringido · Permisos" size="sm">
        <div className="p-4 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h4 className="font-display font-bold text-slate-900 text-sm">
            Permiso Denegado
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Solo el <strong>Super Administrador</strong>, <strong>Director General</strong> y <strong>Coordinador Escolar</strong> cuentan con autorización para modificar salas de clases virtuales.
          </p>
          <button
            onClick={onClose}
            className="w-full py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl transition"
          >
            Entendido
          </button>
        </div>
      </Modal>
    );
  }

  const handleToggleStudent = (studentId) => {
    setEnrolledStudentIds(prev => 
      prev.includes(studentId)
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleSelectAllStudents = () => {
    setEnrolledStudentIds(allStudents.map(s => s.id));
  };

  const handleDeselectAllStudents = () => {
    setEnrolledStudentIds([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !code.trim()) {
      showToast('Campos Obligatorios', 'Por favor completa el nombre y la clave de la materia.', 'warning');
      return;
    }

    const selectedTeacher = teachers.find(t => t.id === teacherId);

    const updated = updateClassroom(classroom.id, {
      name: name.trim(),
      code: code.trim().toUpperCase(),
      group: group.trim(),
      periodId,
      teacherId,
      teacherName: selectedTeacher ? selectedTeacher.name : classroom.teacherName,
      virtualLink: virtualLink.trim(),
      schedule: schedule.trim(),
      enrolledStudentIds,
      rubric: {
        ...(classroom.rubric || {}),
        generalObjective: objective.trim()
      }
    });

    if (updated) {
      onClose();
    }
  };

  const filteredStudents = allStudents.filter(s => 
    s.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
    (s.matricula && s.matricula.toLowerCase().includes(studentSearch.toLowerCase()))
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Editar Sala Virtual · ${classroom.name}`}
      size="xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-[#0A0D1B] via-[#141B41] to-[#2E3092] text-white p-4.5 rounded-2xl border border-blue-900/50 shadow-md flex items-center justify-between gap-3">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-ipsur-pink-600/30 border border-ipsur-pink-500/40 text-white flex items-center justify-center flex-shrink-0 shadow-inner">
              <BookOpen className="w-5 h-5 text-pink-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-ipsur-pink-600 text-white tracking-widest uppercase">
                  Modificación Oficial
                </span>
                <span className="text-xs text-blue-200">Clave: {classroom.code}</span>
              </div>
              <h3 className="font-display font-black text-sm sm:text-base text-white mt-0.5">
                Editar Datos, Catedrático y Alumnos Matriculados
              </h3>
              <p className="text-xs text-slate-300">
                Cambia la asignatura, profesor asignado, enlace de transmisión Meet y lista de estudiantes.
              </p>
            </div>
          </div>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
          <button
            type="button"
            onClick={() => setActiveTab('general')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === 'general'
                ? 'bg-ipsur-navy-800 text-white shadow'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Laptop className="w-4 h-4" />
            <span>Datos Generales de la Sala</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('alumnos')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === 'alumnos'
                ? 'bg-ipsur-navy-800 text-white shadow'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Alumnos Matriculados ({enrolledStudentIds.length})</span>
          </button>
        </div>

        {/* Tab 1: Datos Generales */}
        {activeTab === 'general' && (
          <div className="space-y-3.5 max-h-[440px] overflow-y-auto pr-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nombre de la Asignatura / Sala *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Ej. Matemáticas II: Geometría y Álgebra"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-ipsur-pink-500 outline-none font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Clave Oficial de la Materia *
                </label>
                <input
                  type="text"
                  required
                  value={code}
                  onChange={e => setCode(e.target.value.toUpperCase())}
                  placeholder="Ej. MAT-201"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-ipsur-pink-500 outline-none font-mono font-bold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Grupo Escolar
                </label>
                <input
                  type="text"
                  value={group}
                  onChange={e => setGroup(e.target.value)}
                  placeholder="Ej. Grupo 2° B"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-ipsur-pink-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Periodo Escolar
                </label>
                <select
                  value={periodId}
                  onChange={e => setPeriodId(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-ipsur-pink-500 outline-none font-medium"
                >
                  {periods.map(p => (
                    <option key={p.id} value={p.id}>{p.name} ({p.type})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Catedrático Titular Asignado
                </label>
                <select
                  value={teacherId}
                  onChange={e => setTeacherId(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-ipsur-pink-500 outline-none font-medium"
                >
                  {teachers.map(t => (
                    <option key={t.id} value={t.id}>{t.name} ({t.title || 'Catedrático'})</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                  <Video className="w-3.5 h-3.5 text-ipsur-pink-600" />
                  <span>Enlace de Videoconferencia en Vivo (Meet / Zoom)</span>
                </label>
                <input
                  type="url"
                  value={virtualLink}
                  onChange={e => setVirtualLink(e.target.value)}
                  placeholder="https://meet.google.com/xxx-yyyy-zzz"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-ipsur-pink-500 outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-blue-600" />
                  <span>Horario de Sesiones en Vivo</span>
                </label>
                <input
                  type="text"
                  value={schedule}
                  onChange={e => setSchedule(e.target.value)}
                  placeholder="Ej. Lunes y Miércoles 08:00 - 09:30 h"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-ipsur-pink-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Objetivo General de la Asignatura
              </label>
              <textarea
                rows={3}
                value={objective}
                onChange={e => setObjective(e.target.value)}
                placeholder="Describir los propósitos formativos y competencias a desarrollar en la modalidad virtual..."
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-ipsur-pink-500 outline-none"
              />
            </div>
          </div>
        )}

        {/* Tab 2: Alumnos Matriculados */}
        {activeTab === 'alumnos' && (
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5">
              <div className="relative w-full sm:w-72">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  placeholder="Buscar estudiante..."
                  value={studentSearch}
                  onChange={e => setStudentSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-1 focus:ring-ipsur-pink-500"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSelectAllStudents}
                  className="px-2.5 py-1 text-[11px] font-bold text-ipsur-navy-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
                >
                  Seleccionar Todos
                </button>
                <button
                  type="button"
                  onClick={handleDeselectAllStudents}
                  className="px-2.5 py-1 text-[11px] font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition"
                >
                  Deseleccionar Todos
                </button>
              </div>
            </div>

            <div className="border border-slate-200 rounded-2xl max-h-[320px] overflow-y-auto divide-y divide-slate-100 bg-white">
              {filteredStudents.length === 0 ? (
                <div className="p-8 text-center text-slate-400 text-xs">
                  No se encontraron estudiantes para matricular.
                </div>
              ) : (
                filteredStudents.map(student => {
                  const isEnrolled = enrolledStudentIds.includes(student.id);
                  return (
                    <label
                      key={student.id}
                      className="flex items-center justify-between p-2.5 hover:bg-slate-50 cursor-pointer transition select-none"
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={isEnrolled}
                          onChange={() => handleToggleStudent(student.id)}
                          className="w-4 h-4 rounded text-ipsur-pink-600 focus:ring-ipsur-pink-500 border-slate-300"
                        />
                        <div>
                          <span className="font-bold text-slate-900 text-xs block">
                            {student.name}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {student.matricula || student.email}
                          </span>
                        </div>
                      </div>

                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isEnrolled 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : 'bg-slate-100 text-slate-500'
                      }`}>
                        {isEnrolled ? 'Matriculado' : 'No inscrito'}
                      </span>
                    </label>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* Modal Footer Actions */}
        <div className="pt-3 border-t border-slate-200 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition cursor-pointer"
          >
            Cancelar
          </button>

          <button
            type="submit"
            className="flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-ipsur-navy-700 to-ipsur-pink-600 hover:from-ipsur-navy-800 hover:to-ipsur-pink-700 rounded-xl shadow-md transition-transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Guardar Cambios de la Sala</span>
          </button>
        </div>
      </form>
    </Modal>
  );
}
