import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import Modal from '../common/Modal';
import { 
  BookOpen, 
  UserCheck, 
  Calendar, 
  Layers, 
  FileText, 
  Plus, 
  Trash2, 
  CheckSquare, 
  Square,
  Sparkles
} from 'lucide-react';

export default function CreateClassroomModal({ isOpen, onClose }) {
  const { users, periods, createClassroom } = useApp();

  const teachers = users.filter(u => u.role === 'teacher');
  const students = users.filter(u => u.role === 'student');

  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [group, setGroup] = useState('PREPA-101-ONLINE');
  const [periodId, setPeriodId] = useState(periods[0]?.id || 'per-2026-b1');
  const [teacherId, setTeacherId] = useState(teachers[0]?.id || '');
  const [rubricObjective, setRubricObjective] = useState('');
  
  // Default topics that coordinator prepares for the period
  const [topics, setTopics] = useState([
    {
      id: 'top-new-1',
      unit: 'Unidad I',
      title: 'Fundamentos e Introducción a la Disciplina',
      weeks: 'Semanas 1 y 2',
      learningGoals: 'Comprensión de conceptos básicos, terminología y marco teórico inicial.',
      keyReadings: 'Manual Didáctico IPSUR Módulo 1.'
    },
    {
      id: 'top-new-2',
      unit: 'Unidad II',
      title: 'Desarrollo de Competencias y Aplicación Práctica',
      weeks: 'Semanas 3 a 5',
      learningGoals: 'Ejercitación y resolución de casos reales vinculados al entorno.',
      keyReadings: 'Antología de Textos y Ejercicios Prácticos.'
    },
    {
      id: 'top-new-3',
      unit: 'Unidad III',
      title: 'Integración, Evaluación y Cierre Bimestral',
      weeks: 'Semanas 6 a 8',
      learningGoals: 'Consolidación de aprendizajes esperados y desarrollo del proyecto final.',
      keyReadings: 'Rúbrica Oficial de Evaluación Sumativa IPSUR.'
    }
  ]);

  const [selectedStudentIds, setSelectedStudentIds] = useState(students.map(s => s.id));

  const handleAddTopic = () => {
    const nextNum = topics.length + 1;
    setTopics(prev => [
      ...prev,
      {
        id: `top-new-${Date.now()}`,
        unit: `Unidad ${nextNum}`,
        title: `Nuevo Tema / Módulo ${nextNum}`,
        weeks: `Semanas ${nextNum * 2 - 1} y ${nextNum * 2}`,
        learningGoals: 'Objetivos de aprendizaje específicos.',
        keyReadings: 'Material bibliográfico recomendado.'
      }
    ]);
  };

  const handleRemoveTopic = (index) => {
    if (topics.length <= 1) return;
    setTopics(prev => prev.filter((_, i) => i !== index));
  };

  const handleTopicChange = (index, field, value) => {
    setTopics(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const toggleStudent = (id) => {
    setSelectedStudentIds(prev => 
      prev.includes(id) ? prev.filter(sId => sId !== id) : [...prev, id]
    );
  };

  const selectAllStudents = () => {
    if (selectedStudentIds.length === students.length) {
      setSelectedStudentIds([]);
    } else {
      setSelectedStudentIds(students.map(s => s.id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    createClassroom({
      name: name.trim(),
      code: code.trim() || `IPS-${Math.floor(100 + Math.random() * 900)}`,
      group,
      periodId,
      teacherId,
      rubricObjective: rubricObjective.trim() || 'Desarrollar competencias de acuerdo al programa institucional de Prepa en Línea IPSUR.',
      rubricTopics: topics,
      enrolledStudentIds: selectedStudentIds
    });

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Crear Nueva Sala de Clases (Aula Virtual)"
      subtitle="Panel de Coordinación Escolar: Asigna docente, matricula estudiantes y carga la rúbrica oficial del periodo."
      maxWidth="max-w-4xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Basic Information */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
          <h4 className="text-xs font-bold text-ipsur-navy-800 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-ipsur-pink-500" />
            1. Datos Generales de la Asignatura
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Nombre de la Materia / Asignatura *
              </label>
              <input
                type="text"
                required
                placeholder="Ej. Física I - Mecánica y Energía"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-ipsur-navy-500 focus:border-ipsur-navy-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Código de Asignatura
              </label>
              <input
                type="text"
                placeholder="Ej. FIS-101"
                value={code}
                onChange={e => setCode(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-ipsur-navy-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Grupo de Prepa en Línea
              </label>
              <select
                value={group}
                onChange={e => setGroup(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-ipsur-navy-500 outline-none"
              >
                <option value="PREPA-101-ONLINE">PREPA-101-ONLINE (Turno Virtual A)</option>
                <option value="PREPA-102-ONLINE">PREPA-102-ONLINE (Turno Virtual B)</option>
                <option value="PREPA-201-ONLINE">PREPA-201-ONLINE (2do Bimestre)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Periodo Escolar (Bimestre / Cuatrimestre)
              </label>
              <select
                value={periodId}
                onChange={e => setPeriodId(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-ipsur-navy-500 outline-none"
              >
                {periods.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.type} - {p.status})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Asignar Profesor Titular *
              </label>
              <select
                required
                value={teacherId}
                onChange={e => setTeacherId(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-ipsur-navy-500 outline-none font-medium"
              >
                {teachers.map(t => (
                  <option key={t.id} value={t.id}>
                    {t.name} ({t.title})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Section 2: Rubric & Syllabus */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold text-ipsur-navy-800 uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-ipsur-pink-500" />
              2. Cargar Rúbrica Oficial y Temario del Bimestre/Cuatrimestre
            </h4>
            <span className="text-[11px] text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
              Cargada por Coordinador Escolar
            </span>
          </div>

          <div className="mb-4">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Objetivo General y Metodología de la Materia
            </label>
            <textarea
              rows={2}
              placeholder="Describe las metas de aprendizaje y el alcance esperado para este ciclo..."
              value={rubricObjective}
              onChange={e => setRubricObjective(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-ipsur-navy-500 outline-none"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700">
                Temas y Unidades del Bimestre (Rubric Topics)
              </label>
              <button
                type="button"
                onClick={handleAddTopic}
                className="flex items-center gap-1 text-xs font-semibold text-ipsur-pink-600 hover:text-ipsur-pink-700 bg-pink-50 hover:bg-pink-100 px-2.5 py-1 rounded-md transition"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Agregar Unidad / Tema</span>
              </button>
            </div>

            {topics.map((t, idx) => (
              <div key={t.id || idx} className="bg-white p-3 rounded-lg border border-slate-200 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 flex-1">
                    <input
                      type="text"
                      value={t.unit}
                      onChange={e => handleTopicChange(idx, 'unit', e.target.value)}
                      placeholder="Unidad I"
                      className="w-24 text-xs font-bold text-ipsur-navy-700 bg-slate-50 px-2 py-1 rounded border border-slate-300"
                    />
                    <input
                      type="text"
                      value={t.title}
                      onChange={e => handleTopicChange(idx, 'title', e.target.value)}
                      placeholder="Título del Tema..."
                      className="flex-1 text-xs font-semibold text-slate-800 bg-white px-2 py-1 rounded border border-slate-300"
                    />
                  </div>

                  <input
                    type="text"
                    value={t.weeks}
                    onChange={e => handleTopicChange(idx, 'weeks', e.target.value)}
                    placeholder="Semanas 1 y 2"
                    className="w-28 text-xs text-slate-500 bg-slate-50 px-2 py-1 rounded border border-slate-300 text-center"
                  />

                  {topics.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveTopic(idx)}
                      className="text-slate-400 hover:text-rose-500 p-1 rounded transition"
                      title="Eliminar unidad"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={t.learningGoals}
                    onChange={e => handleTopicChange(idx, 'learningGoals', e.target.value)}
                    placeholder="Aprendizajes esperados / Metas..."
                    className="text-[11px] text-slate-600 px-2 py-1 bg-slate-50 rounded border border-slate-200"
                  />
                  <input
                    type="text"
                    value={t.keyReadings}
                    onChange={e => handleTopicChange(idx, 'keyReadings', e.target.value)}
                    placeholder="Bibliografía y lecturas clave..."
                    className="text-[11px] text-slate-600 px-2 py-1 bg-slate-50 rounded border border-slate-200"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Student Enrollment */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-bold text-ipsur-navy-800 uppercase tracking-wider flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-ipsur-pink-500" />
              3. Matricular Estudiantes en la Sala
            </h4>
            <button
              type="button"
              onClick={selectAllStudents}
              className="text-xs text-ipsur-navy-600 hover:text-ipsur-navy-800 font-semibold"
            >
              {selectedStudentIds.length === students.length ? 'Deseleccionar todos' : 'Seleccionar todos'}
            </button>
          </div>
          <p className="text-xs text-slate-500 mb-3">
            Los alumnos seleccionados tendrán acceso inmediato a los materiales, temarios y actividades de esta sala virtual.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto p-1">
            {students.map(s => {
              const isChecked = selectedStudentIds.includes(s.id);
              return (
                <div
                  key={s.id}
                  onClick={() => toggleStudent(s.id)}
                  className={`flex items-center gap-2.5 p-2 rounded-lg border cursor-pointer transition select-none ${
                    isChecked ? 'bg-indigo-50/70 border-indigo-200 text-indigo-900' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {isChecked ? (
                    <CheckSquare className="w-4 h-4 text-ipsur-navy-600 flex-shrink-0" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  )}
                  <img src={s.avatar} alt={s.name} className="w-6 h-6 rounded-full object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold truncate">{s.name}</p>
                    <p className="text-[10px] text-slate-400 font-mono">{s.matricula}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 px-5 py-2 text-xs font-bold text-white bg-gradient-to-r from-ipsur-navy-700 to-ipsur-pink-600 hover:from-ipsur-navy-800 hover:to-ipsur-pink-700 rounded-lg shadow-md hover:shadow-lg transition"
          >
            <Sparkles className="w-4 h-4" />
            <span>Crear Sala de Clases y Publicar Rúbrica</span>
          </button>
        </div>
      </form>
    </Modal>
  );
}
