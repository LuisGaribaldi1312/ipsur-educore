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
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Search,
  CheckCircle2,
  Users,
  School,
  GraduationCap,
  ShieldCheck,
  Award,
  Clock
} from 'lucide-react';

export default function CreateClassroomModal({ isOpen, onClose }) {
  const { currentUser, isSuperAdmin, users, periods, createClassroom, showToast } = useApp();

  const canManageClassrooms = isSuperAdmin || 
    currentUser?.role === 'superadmin' || 
    currentUser?.role === 'rector' || 
    currentUser?.role === 'director' || 
    currentUser?.role === 'coordinator';

  if (!isOpen || !canManageClassrooms) return null;

  const teachers = users.filter(u => u.role === 'teacher');
  const students = users.filter(u => u.role === 'student');

  // Wizard active step: 1 (General), 2 (Rubric/Syllabus), 3 (Enrollment & Confirmation)
  const [currentStep, setCurrentStep] = useState(1);

  // Form Fields
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [group, setGroup] = useState('PREPA-101-ONLINE');
  const [periodId, setPeriodId] = useState(periods[0]?.id || 'per-2026-b1');
  const [teacherId, setTeacherId] = useState(teachers[0]?.id || '');
  const [rubricObjective, setRubricObjective] = useState('Desarrollar competencias de acuerdo al programa oficial de bachillerato virtual IPSUR.');

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
      learningGoals: 'Ejercitación y resolución de casos reales vinculados al entorno formativo.',
      keyReadings: 'Antología de Textos y Ejercicios Prácticos SEP/IPSUR.'
    },
    {
      id: 'top-new-3',
      unit: 'Unidad III',
      title: 'Integración, Evaluación y Cierre Bimestral',
      weeks: 'Semanas 6 a 8',
      learningGoals: 'Consolidación de aprendizajes esperados y desarrollo del proyecto integral.',
      keyReadings: 'Rúbrica Oficial de Evaluación Sumativa IPSUR.'
    }
  ]);

  const [selectedStudentIds, setSelectedStudentIds] = useState(students.map(s => s.id));
  const [studentSearch, setStudentSearch] = useState('');

  const selectedTeacher = teachers.find(t => t.id === teacherId) || teachers[0];
  const selectedPeriod = periods.find(p => p.id === periodId) || periods[0];

  const handleAddTopic = () => {
    const nextNum = topics.length + 1;
    setTopics(prev => [
      ...prev,
      {
        id: `top-new-${Date.now()}`,
        unit: `Unidad ${nextNum}`,
        title: `Nueva Unidad / Módulo ${nextNum}`,
        weeks: `Semanas ${nextNum * 2 - 1} y ${nextNum * 2}`,
        learningGoals: 'Objetivos específicos y competencias disciplinares.',
        keyReadings: 'Bibliografía y recursos sugeridos.'
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

  const handleNext = () => {
    if (currentStep === 1) {
      if (!name.trim()) {
        showToast('Campo Requerido', 'Por favor ingresa el nombre de la materia para continuar.', 'error');
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(3);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setCurrentStep(1);
      showToast('Campo Requerido', 'Ingresa el nombre de la materia.', 'error');
      return;
    }

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

  // Filter students based on search term
  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
    s.matricula?.toLowerCase().includes(studentSearch.toLowerCase())
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Crear Nueva Sala de Clases (Aula Virtual)"
      subtitle="Coordinación Escolar · Alta de Asignatura, Asignación de Docente, Rúbrica Oficial y Matrícula"
      maxWidth="max-w-4xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Step Indicator Header */}
        <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-2.5 sm:p-3">
          <div className="grid grid-cols-3 gap-2">
            {[
              { step: 1, title: '1. Materia y Docente', desc: 'Datos Generales', icon: BookOpen },
              { step: 2, title: '2. Temario y Rúbrica', desc: 'Unidades Oficiales', icon: FileText },
              { step: 3, title: '3. Matrícula', desc: 'Alumnos y Cierre', icon: Users }
            ].map(item => {
              const Icon = item.icon;
              const isActive = currentStep === item.step;
              const isDone = currentStep > item.step;

              return (
                <button
                  type="button"
                  key={item.step}
                  onClick={() => {
                    if (item.step === 1 || (item.step === 2 && name.trim()) || (item.step === 3 && name.trim())) {
                      setCurrentStep(item.step);
                    }
                  }}
                  className={`flex items-center gap-2.5 p-2 sm:p-2.5 rounded-xl text-left transition-all ${
                    isActive 
                      ? 'bg-white shadow-sm border border-slate-200 ring-2 ring-ipsur-pink-500/20' 
                      : isDone
                      ? 'bg-emerald-50/60 text-emerald-800 hover:bg-emerald-50'
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-xs ${
                    isActive 
                      ? 'bg-gradient-to-r from-ipsur-navy-700 to-ipsur-pink-600 text-white shadow-sm' 
                      : isDone
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-200 text-slate-500'
                  }`}>
                    {isDone ? <CheckCircle2 className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                  </div>

                  <div className="min-w-0 hidden sm:block">
                    <p className={`text-xs font-bold truncate leading-tight ${isActive ? 'text-slate-900' : isDone ? 'text-emerald-900' : 'text-slate-500'}`}>
                      {item.title}
                    </p>
                    <p className="text-[10px] text-slate-400 truncate leading-tight mt-0.5 font-medium">
                      {item.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* STEP 1: DATOS GENERALES DE LA ASIGNATURA Y DOCENTE */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
              {/* Left Column: Form Fields */}
              <div className="md:col-span-7 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                    Nombre Oficial de la Asignatura *
                  </label>
                  <input
                    type="text"
                    required
                    autoFocus
                    placeholder="Ej. Física I - Mecánica y Fenómenos Naturales"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-ipsur-navy-500 focus:border-ipsur-navy-500 outline-none transition shadow-sm font-medium text-slate-800"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    Título oficial registrado en el plan de estudios SEP / Prepa en Línea IPSUR.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                      Código de Materia
                    </label>
                    <input
                      type="text"
                      placeholder="Ej. FIS-101"
                      value={code}
                      onChange={e => setCode(e.target.value)}
                      className="w-full px-3 py-2 text-xs font-mono font-bold bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-ipsur-navy-500 outline-none text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                      Grupo Asignado
                    </label>
                    <select
                      value={group}
                      onChange={e => setGroup(e.target.value)}
                      className="w-full px-3 py-2 text-xs font-semibold bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-ipsur-navy-500 outline-none text-slate-800"
                    >
                      <option value="PREPA-101-ONLINE">PREPA-101-ONLINE (Turno Virtual A)</option>
                      <option value="PREPA-102-ONLINE">PREPA-102-ONLINE (Turno Virtual B)</option>
                      <option value="PREPA-201-ONLINE">PREPA-201-ONLINE (2do Bimestre)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                    Periodo Escolar (Bimestre / Cuatrimestre)
                  </label>
                  <select
                    value={periodId}
                    onChange={e => setPeriodId(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs font-semibold bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-ipsur-navy-500 outline-none text-slate-800"
                  >
                    {periods.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.name} ({p.type} · Estado: {p.status})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                    Profesor Titular Asignado
                  </label>
                  <select
                    value={teacherId}
                    onChange={e => setTeacherId(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs font-bold bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-ipsur-navy-500 outline-none text-slate-900"
                  >
                    {teachers.length === 0 ? (
                      <option value="">-- Sin docentes registrados aún --</option>
                    ) : (
                      teachers.map(t => (
                        <option key={t.id} value={t.id}>
                          {t.name} — {t.title}
                        </option>
                      ))
                    )}
                  </select>
                  {teachers.length === 0 && (
                    <p className="text-[11px] text-amber-800 bg-amber-50 p-2 rounded-xl border border-amber-200 mt-2 font-medium">
                      ⚠️ Aún no has registrado docentes en el sistema. Puedes dar de alta profesores desde el módulo de <strong>Gestión de Usuarios</strong>.
                    </p>
                  )}
                </div>
              </div>

              {/* Right Column: Live Executive Preview Card */}
              <div className="md:col-span-5 space-y-4">
                <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 space-y-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Ficha del Docente Titular
                  </span>

                  {selectedTeacher ? (
                    <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                      <img 
                        src={selectedTeacher?.avatar} 
                        alt={selectedTeacher?.name} 
                        className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md ring-2 ring-ipsur-navy-100 flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <h5 className="text-xs font-bold text-slate-900 truncate">{selectedTeacher?.name}</h5>
                        <p className="text-[11px] text-ipsur-pink-600 font-semibold truncate">{selectedTeacher?.title}</p>
                        <p className="text-[10px] text-slate-400 font-mono truncate">{selectedTeacher?.email}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white p-3.5 rounded-xl border border-dashed border-slate-300 text-center text-slate-400 text-xs">
                      Pendiente de asignación docente
                    </div>
                  )}

                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Al guardar la sala, este docente recibirá acceso titular para configurar su ponderación al 100%, publicar materiales y calificar a los alumnos matriculados.
                  </p>
                </div>

                {/* Real-time Preview Pill */}
                <div className="border border-indigo-100 bg-gradient-to-br from-indigo-50/60 to-pink-50/40 rounded-2xl p-4 space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-mono text-[10px] font-bold bg-white px-2 py-0.5 rounded shadow-sm text-slate-700">
                      {code.trim() || 'IPS-101'}
                    </span>
                    <span className="font-bold text-pink-700 text-[10px]">
                      {selectedPeriod?.name}
                    </span>
                  </div>
                  <h4 className="font-display text-sm font-bold text-slate-900 line-clamp-1">
                    {name.trim() || 'Nombre de la Asignatura'}
                  </h4>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-600 font-medium">
                    <School className="w-3.5 h-3.5 text-ipsur-navy-600" />
                    <span>Grupo: {group}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: RÚBRICA Y TEMARIO OFICIAL DEL PERIODO */}
        {currentStep === 2 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="bg-indigo-50/70 border border-indigo-200/80 rounded-2xl p-4 flex items-start gap-3">
              <div className="p-2 rounded-xl bg-white text-indigo-700 shadow-sm flex-shrink-0">
                <FileText className="w-5 h-5 text-ipsur-pink-600" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                  Rúbrica Institucional y Temario Oficial (Coordinación Escolar)
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Define el objetivo formativo y las unidades oficiales del bimestre o cuatrimestre. El profesor y los alumnos consultarán este programa durante todo el ciclo.
                </p>
              </div>
            </div>

            {/* Objective Field */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                Objetivo General y Metodología Formativa
              </label>
              <textarea
                rows={2}
                value={rubricObjective}
                onChange={e => setRubricObjective(e.target.value)}
                placeholder="Describe el propósito formativo, competencias a desarrollar y alcance esperado..."
                className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-ipsur-navy-500 outline-none leading-relaxed text-slate-800"
              />
            </div>

            {/* Topics & Units Manager */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Unidades Temáticas del Periodo ({topics.length} Módulos)
                  </h5>
                  <p className="text-[11px] text-slate-500">
                    Estructura semanal del contenido y competencias.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleAddTopic}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-ipsur-pink-600 hover:bg-ipsur-pink-700 rounded-xl shadow-sm transition active:scale-95"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Agregar Unidad</span>
                </button>
              </div>

              {/* Units List */}
              <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                {topics.map((t, idx) => (
                  <div 
                    key={t.id || idx} 
                    className="p-4 bg-white border border-slate-200/90 rounded-2xl shadow-sm hover:border-slate-300 space-y-3 transition"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2 border-b border-slate-100">
                      <div className="flex items-center gap-2 flex-1">
                        <input
                          type="text"
                          value={t.unit}
                          onChange={e => handleTopicChange(idx, 'unit', e.target.value)}
                          placeholder="Unidad I"
                          className="w-24 text-xs font-bold text-ipsur-navy-700 bg-slate-100/80 px-2.5 py-1.5 rounded-lg border border-slate-300 text-center"
                        />
                        <input
                          type="text"
                          value={t.title}
                          onChange={e => handleTopicChange(idx, 'title', e.target.value)}
                          placeholder="Título del Tema o Módulo..."
                          className="flex-1 text-xs font-bold text-slate-800 bg-white px-3 py-1.5 rounded-lg border border-slate-300 focus:ring-1 focus:ring-ipsur-navy-500"
                        />
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-auto">
                        <div className="flex items-center gap-1 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <input
                            type="text"
                            value={t.weeks}
                            onChange={e => handleTopicChange(idx, 'weeks', e.target.value)}
                            placeholder="Semanas 1 y 2"
                            className="w-24 text-[11px] text-slate-600 bg-transparent text-center outline-none font-medium"
                          />
                        </div>

                        {topics.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveTopic(idx)}
                            className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition"
                            title="Eliminar esta unidad"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                          🎯 Metas y Aprendizajes Esperados:
                        </label>
                        <input
                          type="text"
                          value={t.learningGoals}
                          onChange={e => handleTopicChange(idx, 'learningGoals', e.target.value)}
                          placeholder="Objetivos de aprendizaje específicos..."
                          className="w-full text-xs text-slate-700 bg-slate-50/70 px-3 py-2 rounded-xl border border-slate-200 focus:bg-white focus:ring-1 focus:ring-ipsur-navy-500"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                          📚 Lecturas y Bibliografía Oficial:
                        </label>
                        <input
                          type="text"
                          value={t.keyReadings}
                          onChange={e => handleTopicChange(idx, 'keyReadings', e.target.value)}
                          placeholder="Material bibliográfico recomendado..."
                          className="w-full text-xs text-slate-700 bg-slate-50/70 px-3 py-2 rounded-xl border border-slate-200 focus:bg-white focus:ring-1 focus:ring-ipsur-navy-500"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: MATRÍCULA DE ESTUDIANTES Y CONFIRMACIÓN */}
        {currentStep === 3 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            {/* Enrollment Controls Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200/90">
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-ipsur-pink-600" />
                  <span>Matrícula de Alumnos ({selectedStudentIds.length} seleccionados)</span>
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Selecciona a los estudiantes que cursarán esta materia en el grupo {group}.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={selectAllStudents}
                  className="text-xs font-bold text-ipsur-navy-700 hover:text-ipsur-navy-900 bg-white hover:bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-xl transition shadow-sm"
                >
                  {selectedStudentIds.length === students.length ? 'Deseleccionar Todos' : 'Seleccionar Todos'}
                </button>
              </div>
            </div>

            {/* Search Filter */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar estudiante por nombre o matrícula..."
                value={studentSearch}
                onChange={e => setStudentSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-ipsur-navy-500 outline-none"
              />
            </div>

            {/* Students Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[260px] overflow-y-auto pr-1">
              {filteredStudents.length === 0 ? (
                <div className="col-span-1 sm:col-span-2 p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-300 text-slate-500 text-xs space-y-1">
                  <p className="font-bold text-slate-700">Sin estudiantes registrados para matricular</p>
                  <p className="text-[11px] text-slate-400">
                    Puedes dar de alta alumnos desde el módulo de <strong>Gestión de Usuarios</strong> y asignarlos posteriormente a esta sala.
                  </p>
                </div>
              ) : (
                filteredStudents.map(s => {
                const isChecked = selectedStudentIds.includes(s.id);
                return (
                  <div
                    key={s.id}
                    onClick={() => toggleStudent(s.id)}
                    className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition select-none ${
                      isChecked 
                        ? 'bg-gradient-to-r from-pink-50/70 to-indigo-50/70 border-pink-300 text-slate-900 shadow-sm' 
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {isChecked ? (
                      <CheckSquare className="w-4 h-4 text-ipsur-pink-600 flex-shrink-0" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-300 flex-shrink-0" />
                    )}
                    <img 
                      src={s.avatar} 
                      alt={s.name} 
                      className="w-8 h-8 rounded-full object-cover border border-white shadow-sm flex-shrink-0" 
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold truncate leading-tight">{s.name}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] text-slate-500 font-mono">{s.matricula}</span>
                        <span className="text-[9px] bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded font-semibold">
                          {s.grupo || 'ONLINE'}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
              )}
            </div>

            {/* Summary Box before finalizing */}
            <div className="p-4 bg-gradient-to-r from-slate-900 to-ipsur-navy-900 text-white rounded-2xl shadow-md space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-pink-200 font-bold uppercase tracking-wider text-[10px]">
                  Resumen de la Nueva Sala Virtual
                </span>
                <span className="bg-white/20 px-2 py-0.5 rounded text-[10px] font-mono">
                  {code.trim() || 'IPS-101'}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-1.5 text-xs text-slate-200 pt-1">
                <span>📘 <strong>Materia:</strong> {name.trim() || 'Sin Nombre'}</span>
                <span>👨‍🏫 <strong>Docente:</strong> {selectedTeacher?.name}</span>
                <span>📋 <strong>Rúbrica:</strong> {topics.length} Unidades</span>
                <span>🎓 <strong>Matrícula:</strong> {selectedStudentIds.length} Alumnos</span>
              </div>
            </div>
          </div>
        )}

        {/* Modal Wizard Navigation Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200">
          <div>
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handlePrev}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Anterior</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition"
              >
                Cancelar
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {currentStep < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-ipsur-navy-800 hover:bg-ipsur-navy-900 rounded-xl shadow-md transition active:scale-95"
              >
                <span>Continuar al Paso {currentStep + 1}</span>
                <ArrowRight className="w-3.5 h-3.5 text-pink-300" />
              </button>
            ) : (
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-2.5 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-ipsur-navy-800 via-ipsur-pink-600 to-rose-600 hover:brightness-110 rounded-xl shadow-lg transition active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-white" />
                <span>Confirmar y Crear Sala de Clases</span>
              </button>
            )}
          </div>
        </div>
      </form>
    </Modal>
  );
}
