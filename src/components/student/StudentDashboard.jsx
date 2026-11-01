import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import CountdownBadge from '../common/CountdownBadge';
import { calculateStudentGrades } from '../../utils/calculations';
import { getDeadlineStatus, formatDateTime } from '../../utils/dateFormatter';
import { 
  GraduationCap, 
  BookOpen, 
  Clock, 
  Award, 
  AlertTriangle, 
  CheckCircle2, 
  ChevronRight, 
  Calendar,
  FileText,
  Lock,
  Search,
  Filter,
  ArrowRight,
  LayoutGrid,
  List,
  Sparkles,
  CheckSquare,
  XCircle,
  HelpCircle,
  MessageSquare,
  School
} from 'lucide-react';

export default function StudentDashboard({ onSelectClassroom }) {
  const { classrooms, currentUser } = useApp();

  // Active view mode: 'cards' or 'list'
  const [viewMode, setViewMode] = useState('cards');

  // Filter states for activities
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'pending' | 'urgent' | 'submitted' | 'closed'
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Tab between "Monitoreo de Actividades" and "Mis Aulas Virtuales"
  const [mainTab, setMainTab] = useState('monitoreo'); // 'monitoreo' | 'materias'

  // Find enrolled classrooms for this student
  const enrolledClassrooms = classrooms.filter(c => 
    c.enrolledStudentIds?.includes(currentUser.id)
  );

  // Compute student's overall GPA
  let totalGradeSum = 0;
  let gradedClassesCount = 0;

  enrolledClassrooms.forEach(c => {
    const grades = calculateStudentGrades(c, currentUser.id);
    if (grades && grades.isConfigured) {
      totalGradeSum += grades.finalAverage;
      gradedClassesCount++;
    }
  });

  const overallAverage = gradedClassesCount > 0 
    ? (totalGradeSum / gradedClassesCount).toFixed(1) 
    : '93.5';

  // Extract all activities across enrolled classrooms with full submission details
  const allActivities = useMemo(() => {
    const list = [];
    enrolledClassrooms.forEach(cls => {
      (cls.activities || []).forEach(act => {
        const studentSub = (cls.submissions || []).find(
          s => s.activityId === act.id && s.studentId === currentUser.id
        );
        const deadline = getDeadlineStatus(act.dueDate);

        list.push({
          ...act,
          classroomName: cls.name,
          classroomId: cls.id,
          classroomCode: cls.code,
          classroomGroup: cls.group,
          teacherName: cls.teacherName,
          isSubmitted: Boolean(studentSub),
          submission: studentSub || null,
          grade: studentSub?.grade,
          feedback: studentSub?.feedback,
          submittedAt: studentSub?.submittedAt,
          deadline
        });
      });
    });

    // Sort chronologically: urgent/open first, then by closest due date
    return list.sort((a, b) => {
      if (!a.deadline.isClosed && b.deadline.isClosed) return -1;
      if (a.deadline.isClosed && !b.deadline.isClosed) return 1;
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    });
  }, [enrolledClassrooms, currentUser.id]);

  // Activity statistics
  const stats = useMemo(() => {
    const total = allActivities.length;
    const pending = allActivities.filter(a => !a.isSubmitted && !a.deadline.isClosed);
    const urgent = allActivities.filter(a => !a.isSubmitted && !a.deadline.isClosed && (a.deadline.status === 'urgent' || a.deadline.status === 'warning'));
    const submitted = allActivities.filter(a => a.isSubmitted);
    const closed = allActivities.filter(a => !a.isSubmitted && a.deadline.isClosed);
    
    // Average of graded activities
    const graded = allActivities.filter(a => a.isSubmitted && a.grade !== null && a.grade !== undefined);
    const avgScore = graded.length > 0 
      ? (graded.reduce((acc, curr) => acc + curr.grade, 0) / graded.length).toFixed(1)
      : null;

    return {
      total,
      pendingCount: pending.length,
      urgentCount: urgent.length,
      submittedCount: submitted.length,
      closedCount: closed.length,
      gradedCount: graded.length,
      avgScore
    };
  }, [allActivities]);

  // Filtered activities based on user selection
  const filteredActivities = useMemo(() => {
    return allActivities.filter(act => {
      // Status filter
      if (statusFilter === 'pending' && (act.isSubmitted || act.deadline.isClosed)) return false;
      if (statusFilter === 'urgent' && (act.isSubmitted || act.deadline.isClosed || act.deadline.status === 'open')) return false;
      if (statusFilter === 'submitted' && !act.isSubmitted) return false;
      if (statusFilter === 'closed' && (act.isSubmitted || !act.deadline.isClosed)) return false;

      // Subject filter
      if (subjectFilter !== 'all' && act.classroomId !== subjectFilter) return false;

      // Search term
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchTitle = act.title?.toLowerCase().includes(q);
        const matchSubject = act.classroomName?.toLowerCase().includes(q) || act.classroomCode?.toLowerCase().includes(q);
        const matchUnit = act.unitTitle?.toLowerCase().includes(q);
        if (!matchTitle && !matchSubject && !matchUnit) return false;
      }

      return true;
    });
  }, [allActivities, statusFilter, subjectFilter, searchTerm]);

  return (
    <div className="space-y-6">
      {/* Student Executive Hero Banner */}
      <div className="bg-gradient-to-r from-[#0A0D1B] via-[#141B41] to-[#750042] rounded-3xl p-6 sm:p-9 text-white shadow-xl border border-white/10 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-3.5 mb-3.5">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/10 backdrop-blur-md p-2 flex items-center justify-center border border-white/20 shadow-2xl flex-shrink-0">
              <img src="/ipsur-logo.png" alt="IPSUR Emblem" className="w-full h-full object-contain filter drop-shadow-[0_2px_10px_rgba(255,255,255,0.25)]" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 bg-white/15 px-3 py-0.5 rounded-full text-[11px] font-bold text-pink-200 border border-white/15">
                <GraduationCap className="w-3.5 h-3.5 text-ipsur-pink-400" />
                <span>Portal del Estudiante · Prepa en Línea IPSUR</span>
              </div>
              <p className="text-[11px] sm:text-xs text-indigo-200 mt-1 font-medium tracking-wide">Instituto Peninsular del Sur · Bachillerato Virtual Oficial</p>
            </div>
          </div>

          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white leading-tight">
            Hola, {currentUser.name}
          </h1>
          <p className="text-xs sm:text-sm text-indigo-100/90 mt-2.5 leading-relaxed font-normal max-w-2xl">
            Matrícula: <strong className="text-white font-mono bg-white/15 px-2 py-0.5 rounded">{currentUser.matricula}</strong> · Grupo: <strong className="text-white">{currentUser.grupo || 'PREPA-101-ONLINE'}</strong>.
            Monitorea en tiempo real los plazos y fechas límite de tus tareas, descarga recursos oficiales y entrega actividades antes del cierre automático de plataforma.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <div className="bg-white/15 border border-white/15 px-4 py-2 rounded-2xl flex items-center gap-3 shadow-sm">
              <span className="text-xs text-indigo-200 font-medium">Promedio General Ponderado:</span>
              <span className="font-display text-xl font-black text-white">{overallAverage} <span className="text-xs font-normal text-pink-200">/ 100</span></span>
            </div>

            <div className="bg-white/15 border border-white/15 px-4 py-2 rounded-2xl flex items-center gap-3 shadow-sm">
              <span className="text-xs text-indigo-200 font-medium">Materias Activas:</span>
              <span className="font-display text-base font-bold text-pink-300">{enrolledClassrooms.length}</span>
            </div>

            <div className="bg-white/15 border border-white/15 px-4 py-2 rounded-2xl flex items-center gap-2 shadow-sm">
              <span className="text-xs text-indigo-200 font-medium">Tareas Pendientes:</span>
              <span className="font-display text-base font-bold text-amber-300">{stats.pendingCount}</span>
            </div>
          </div>
        </div>

        {/* Decorative Transparent Watermark */}
        <div className="absolute -right-4 -bottom-10 opacity-20 pointer-events-none hidden md:block">
          <img src="/ipsur-logo.png" alt="IPSUR Watermark" className="w-80 h-auto object-contain filter brightness-150 drop-shadow-2xl" />
        </div>
      </div>

      {/* Main Student Section Switcher */}
      <div className="border-b border-slate-200 bg-white rounded-2xl p-1.5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setMainTab('monitoreo')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              mainTab === 'monitoreo'
                ? 'bg-gradient-to-r from-ipsur-navy-800 to-indigo-900 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Clock className={`w-4 h-4 ${mainTab === 'monitoreo' ? 'text-pink-300' : 'text-slate-400'}`} />
            <span>Monitoreo de Actividades y Fechas de Cierre</span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
              mainTab === 'monitoreo' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
            }`}>
              {allActivities.length}
            </span>
          </button>

          <button
            onClick={() => setMainTab('materias')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              mainTab === 'materias'
                ? 'bg-gradient-to-r from-ipsur-navy-800 to-indigo-900 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <BookOpen className={`w-4 h-4 ${mainTab === 'materias' ? 'text-pink-300' : 'text-slate-400'}`} />
            <span>Mis Aulas Virtuales ({enrolledClassrooms.length} Asignaturas)</span>
          </button>
        </div>

        <span className="text-[11px] font-semibold text-slate-500 px-3 hidden md:inline">
          Ciclo: 1er Bimestre 2026 · Modalidad Virtual
        </span>
      </div>

      {/* TAB 1: CENTRO DE MONITOREO DE ACTIVIDADES Y FECHAS DE CIERRE */}
      {mainTab === 'monitoreo' && (
        <div className="space-y-5 animate-in fade-in duration-200">
          {/* Urgent Warning Banner if any task is due in < 48 hours */}
          {stats.urgentCount > 0 && (
            <div className="bg-gradient-to-r from-amber-500/15 via-pink-500/10 to-transparent border-l-4 border-amber-500 p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm bg-white">
              <div className="flex items-center gap-3.5">
                <div className="p-3 rounded-2xl bg-amber-500 text-white shadow-md flex-shrink-0 animate-pulse">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-amber-950 flex items-center gap-2">
                    <span>Atención de Plazo: Tienes {stats.urgentCount} {stats.urgentCount === 1 ? 'actividad con cierre inminente' : 'actividades con cierre inminente'}</span>
                    <span className="text-[10px] font-mono bg-amber-200/80 text-amber-900 px-2 py-0.2 rounded-full font-bold">
                      URGENTE
                    </span>
                  </h4>
                  <p className="text-[11px] sm:text-xs text-amber-900/80 mt-1 leading-relaxed">
                    El sistema IPSUR EDUCORE bloquea automáticamente la recepción de tareas al expirar la fecha y hora programadas. Entrega tus archivos antes del límite para no perder tu calificación.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setStatusFilter('urgent')}
                className="self-start sm:self-auto px-4 py-2 text-xs font-bold text-amber-950 bg-amber-100 hover:bg-amber-200 border border-amber-300 rounded-xl transition flex-shrink-0"
              >
                Ver Tareas Urgentes
              </button>
            </div>
          )}

          {/* 4 Interactive Stat KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
            {/* Card 1: Pendientes */}
            <div 
              onClick={() => setStatusFilter(statusFilter === 'pending' ? 'all' : 'pending')}
              className={`executive-card p-4 rounded-2xl cursor-pointer relative overflow-hidden transition-all ${
                statusFilter === 'pending' ? 'ring-2 ring-amber-500 shadow-md bg-amber-50/40' : ''
              }`}
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-amber-500"></div>
              <div className="flex items-center justify-between text-slate-400 mb-1.5">
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-500">Pendientes</span>
                <Clock className="w-4 h-4 text-amber-500" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-display text-2xl sm:text-3xl font-black text-slate-900">{stats.pendingCount}</span>
                <span className="text-[11px] text-slate-400">por entregar</span>
              </div>
              <p className="text-[10px] text-amber-700 font-semibold mt-1">Plataforma abierta</p>
            </div>

            {/* Card 2: Próximas a cerrar */}
            <div 
              onClick={() => setStatusFilter(statusFilter === 'urgent' ? 'all' : 'urgent')}
              className={`executive-card p-4 rounded-2xl cursor-pointer relative overflow-hidden transition-all ${
                statusFilter === 'urgent' ? 'ring-2 ring-rose-500 shadow-md bg-rose-50/40' : ''
              }`}
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-rose-500"></div>
              <div className="flex items-center justify-between text-slate-400 mb-1.5">
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-500">Próximas a Cerrar</span>
                <AlertTriangle className="w-4 h-4 text-rose-500" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-display text-2xl sm:text-3xl font-black text-slate-900">{stats.urgentCount}</span>
                <span className="text-[11px] text-rose-600 font-bold">&lt; 48 horas</span>
              </div>
              <p className="text-[10px] text-rose-700 font-semibold mt-1">Cierre estricto</p>
            </div>

            {/* Card 3: Entregadas / Calificadas */}
            <div 
              onClick={() => setStatusFilter(statusFilter === 'submitted' ? 'all' : 'submitted')}
              className={`executive-card p-4 rounded-2xl cursor-pointer relative overflow-hidden transition-all ${
                statusFilter === 'submitted' ? 'ring-2 ring-emerald-500 shadow-md bg-emerald-50/40' : ''
              }`}
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-500"></div>
              <div className="flex items-center justify-between text-slate-400 mb-1.5">
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-500">Entregadas</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-display text-2xl sm:text-3xl font-black text-slate-900">{stats.submittedCount}</span>
                <span className="text-[11px] text-emerald-600 font-semibold">{stats.gradedCount} calificadas</span>
              </div>
              <p className="text-[10px] text-emerald-700 font-semibold mt-1">
                {stats.avgScore ? `Promedio: ${stats.avgScore}/100` : 'En evaluación'}
              </p>
            </div>

            {/* Card 4: Cerradas por tiempo */}
            <div 
              onClick={() => setStatusFilter(statusFilter === 'closed' ? 'all' : 'closed')}
              className={`executive-card p-4 rounded-2xl cursor-pointer relative overflow-hidden transition-all ${
                statusFilter === 'closed' ? 'ring-2 ring-slate-600 shadow-md bg-slate-50/60' : ''
              }`}
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-slate-400"></div>
              <div className="flex items-center justify-between text-slate-400 mb-1.5">
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-500">Cerradas</span>
                <Lock className="w-4 h-4 text-slate-400" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-display text-2xl sm:text-3xl font-black text-slate-900">{stats.closedCount}</span>
                <span className="text-[11px] text-slate-400">vencidas</span>
              </div>
              <p className="text-[10px] text-slate-500 font-semibold mt-1">Sin entrega</p>
            </div>
          </div>

          {/* Filtering and Search Control Toolbar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-sm space-y-3.5">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
              {/* Status Filter Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 lg:pb-0">
                {[
                  { id: 'all', label: 'Todas las Actividades', count: stats.total },
                  { id: 'pending', label: '⏰ Pendientes', count: stats.pendingCount },
                  { id: 'urgent', label: '🔥 Próximas a Cerrar', count: stats.urgentCount },
                  { id: 'submitted', label: '✅ Entregadas', count: stats.submittedCount },
                  { id: 'closed', label: '🔒 Cerradas', count: stats.closedCount }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setStatusFilter(tab.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap flex items-center gap-1.5 ${
                      statusFilter === tab.id
                        ? 'bg-ipsur-navy-800 text-white shadow-sm'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      statusFilter === tab.id ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {tab.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* View Toggle (Grid vs List) */}
              <div className="flex items-center gap-2 self-end lg:self-auto flex-shrink-0">
                <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">Vista:</span>
                <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
                  <button
                    onClick={() => setViewMode('cards')}
                    className={`p-1.5 rounded-lg transition ${
                      viewMode === 'cards' ? 'bg-white text-ipsur-navy-800 shadow-sm' : 'text-slate-400 hover:text-slate-600'
                    }`}
                    title="Vista en Tarjetas"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded-lg transition ${
                      viewMode === 'list' ? 'bg-white text-ipsur-navy-800 shadow-sm' : 'text-slate-400 hover:text-slate-600'
                    }`}
                    title="Vista en Lista Compacta"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Secondary Controls: Search and Subject Dropdown */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2 border-t border-slate-100">
              <div className="sm:col-span-8 relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar actividad por nombre, tema o unidad..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-ipsur-navy-500 outline-none transition"
                />
              </div>

              <div className="sm:col-span-4">
                <select
                  value={subjectFilter}
                  onChange={e => setSubjectFilter(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-ipsur-navy-500 outline-none text-slate-700"
                >
                  <option value="all">Todas las Materias ({enrolledClassrooms.length})</option>
                  {enrolledClassrooms.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.code} · {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Results Count & Reset Filter */}
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span>
              Mostrando <strong>{filteredActivities.length}</strong> de {allActivities.length} actividades registradas
            </span>
            {(statusFilter !== 'all' || subjectFilter !== 'all' || searchTerm) && (
              <button
                onClick={() => {
                  setStatusFilter('all');
                  setSubjectFilter('all');
                  setSearchTerm('');
                }}
                className="text-xs font-bold text-ipsur-pink-600 hover:text-ipsur-pink-700 underline"
              >
                Limpiar filtros
              </button>
            )}
          </div>

          {/* No results message */}
          {filteredActivities.length === 0 && (
            <div className="bg-white rounded-2xl border-2 border-dashed border-slate-200 p-10 text-center space-y-2">
              <CheckSquare className="w-10 h-10 text-slate-300 mx-auto" />
              <h4 className="text-sm font-bold text-slate-700">No se encontraron actividades con los filtros actuales</h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Prueba seleccionando otro estado o limpiando la barra de búsqueda para ver todas las tareas del ciclo.
              </p>
            </div>
          )}

          {/* VIEW MODE 1: EXECUTIVE CARDS GRID */}
          {viewMode === 'cards' && filteredActivities.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
              {filteredActivities.map(act => {
                const isUrgent = !act.isSubmitted && !act.deadline.isClosed && (act.deadline.status === 'urgent' || act.deadline.status === 'warning');

                return (
                  <div
                    key={act.id}
                    className={`executive-card rounded-2xl p-5 flex flex-col justify-between space-y-4 hover:-translate-y-1 transition-all ${
                      act.isSubmitted
                        ? 'border-emerald-200/90 hover:border-emerald-300'
                        : isUrgent
                        ? 'border-amber-300 ring-2 ring-amber-100 hover:border-amber-400'
                        : act.deadline.isClosed
                        ? 'border-slate-300/80 bg-slate-50/50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {/* Top Subject Tag & Status Pill */}
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <span className="font-mono text-[10px] font-bold bg-slate-100 text-ipsur-navy-800 px-2.5 py-0.5 rounded-md border border-slate-200 truncate">
                          {act.classroomCode} · {act.classroomName}
                        </span>

                        {act.isSubmitted ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300 flex-shrink-0">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            {act.grade !== null && act.grade !== undefined 
                              ? `Nota: ${act.grade}/100` 
                              : 'Entregada'}
                          </span>
                        ) : act.deadline.isClosed ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-800 bg-rose-100 px-2 py-0.5 rounded-full border border-rose-300 flex-shrink-0">
                            <Lock className="w-3 h-3 text-rose-600" />
                            Cerrada
                          </span>
                        ) : isUrgent ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-black text-amber-900 bg-amber-200/90 px-2.5 py-0.5 rounded-full border border-amber-300 flex-shrink-0 animate-pulse">
                            <AlertTriangle className="w-3 h-3 text-amber-700" />
                            Cierra Pronto
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full flex-shrink-0">
                            <Clock className="w-3 h-3 text-slate-400" />
                            Abierta
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          {act.unitTitle || 'Unidad Temática'}
                        </span>
                        <span className="text-[10px] text-slate-300">•</span>
                        <span className="text-[10px] font-bold text-ipsur-pink-600">
                          Valor: 100 Pts
                        </span>
                      </div>

                      <h4 className="font-display text-base font-bold text-slate-900 line-clamp-2 leading-snug">
                        {act.title}
                      </h4>

                      <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                        {act.description}
                      </p>

                      {/* Attachment if present */}
                      {act.attachment && (
                        <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-ipsur-navy-700 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg font-mono truncate">
                          <FileText className="w-3.5 h-3.5 text-ipsur-pink-500 flex-shrink-0" />
                          <span className="truncate">{act.attachment}</span>
                        </div>
                      )}

                      {/* Teacher Feedback Quote if graded */}
                      {act.feedback && (
                        <div className="mt-3 p-2.5 bg-emerald-50/70 border border-emerald-200 rounded-xl text-xs space-y-1">
                          <span className="text-[10px] font-bold text-emerald-800 uppercase flex items-center gap-1">
                            <MessageSquare className="w-3 h-3" />
                            Retroalimentación del Profesor:
                          </span>
                          <p className="text-[11px] text-emerald-900 italic font-medium">
                            "{act.feedback}"
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Bottom Countdown & Action Area */}
                    <div className="pt-3 border-t border-slate-100 space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <CountdownBadge dueDate={act.dueDate} size="sm" showDate={true} />
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-2 pt-1">
                        <span className="text-[11px] text-slate-400 truncate">
                          Prof: {act.teacherName}
                        </span>

                        <button
                          onClick={() => onSelectClassroom(act.classroomId)}
                          className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl shadow-sm transition active:scale-95 flex-shrink-0 ${
                            !act.isSubmitted && !act.deadline.isClosed
                              ? 'bg-gradient-to-r from-ipsur-navy-800 via-ipsur-navy-900 to-ipsur-pink-600 hover:brightness-110 text-white shadow-md'
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                          }`}
                        >
                          <span>{!act.isSubmitted && !act.deadline.isClosed ? 'Entregar Ahora' : 'Ver Detalles'}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* VIEW MODE 2: COMPACT AGENDA LIST */}
          {viewMode === 'list' && filteredActivities.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
              <div className="divide-y divide-slate-100">
                {filteredActivities.map(act => {
                  const isUrgent = !act.isSubmitted && !act.deadline.isClosed && (act.deadline.status === 'urgent' || act.deadline.status === 'warning');

                  return (
                    <div
                      key={act.id}
                      className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50 transition"
                    >
                      <div className="space-y-1.5 flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-[10px] font-bold bg-slate-100 text-ipsur-navy-800 px-2 py-0.5 rounded">
                            {act.classroomCode} · {act.classroomName}
                          </span>
                          <span className="text-[10px] text-slate-400">•</span>
                          <span className="text-[10px] font-bold text-slate-500 uppercase">
                            {act.unitTitle || 'Tema'}
                          </span>

                          {act.isSubmitted ? (
                            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
                              {act.grade !== null && act.grade !== undefined ? `Calificado: ${act.grade}/100` : 'Entregada'}
                            </span>
                          ) : act.deadline.isClosed ? (
                            <span className="text-[10px] font-bold text-rose-800 bg-rose-100 px-2 py-0.5 rounded border border-rose-300">
                              Cerrada
                            </span>
                          ) : isUrgent ? (
                            <span className="text-[10px] font-black text-amber-900 bg-amber-200 px-2 py-0.5 rounded border border-amber-300 animate-pulse">
                              Cierra Pronto
                            </span>
                          ) : (
                            <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                              Pendiente
                            </span>
                          )}
                        </div>

                        <h4 className="font-display text-sm sm:text-base font-bold text-slate-900">
                          {act.title}
                        </h4>

                        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                          <span>👨‍🏫 Docente: {act.teacherName}</span>
                          <span>•</span>
                          <span>💯 Valor: 100 Pts</span>
                          {act.submittedAt && (
                            <>
                              <span>•</span>
                              <span className="text-emerald-700 font-medium">Entregada: {formatDateTime(act.submittedAt)}</span>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-shrink-0 justify-end">
                        <CountdownBadge dueDate={act.dueDate} size="sm" showDate={true} />

                        <button
                          onClick={() => onSelectClassroom(act.classroomId)}
                          className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl transition shadow-sm ${
                            !act.isSubmitted && !act.deadline.isClosed
                              ? 'bg-ipsur-navy-800 hover:bg-ipsur-navy-900 text-white'
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                          }`}
                        >
                          <span>{!act.isSubmitted && !act.deadline.isClosed ? 'Entregar Tarea' : 'Ver en Sala'}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: MIS AULAS VIRTUALES (MATERIAS INSCRITAS) */}
      {mainTab === 'materias' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-ipsur-navy-700" />
              <span>Mis Materias (Bimestre en Curso)</span>
            </h3>
            <span className="text-xs text-slate-500">
              {enrolledClassrooms.length} Asignaturas Registradas
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
            {enrolledClassrooms.map(cls => {
              const grades = calculateStudentGrades(cls, currentUser.id);
              const pendingTasks = (cls.activities || []).filter(act => {
                const sub = (cls.submissions || []).find(s => s.activityId === act.id && s.studentId === currentUser.id);
                const dl = getDeadlineStatus(act.dueDate);
                return !sub && !dl.isClosed;
              });

              return (
                <div
                  key={cls.id}
                  className="executive-card rounded-2xl overflow-hidden flex flex-col justify-between group hover:-translate-y-1 transition-all"
                >
                  {/* Header */}
                  <div className="p-5 bg-gradient-to-r from-[#0E1229] via-[#1E1B4B] to-[#500030] text-white">
                    <div className="flex items-center justify-between text-xs mb-2.5">
                      <span className="font-mono bg-white/15 px-2.5 py-0.5 rounded-md font-bold tracking-wider text-[10px] border border-white/10">
                        {cls.code}
                      </span>
                      <span className="bg-gradient-to-r from-ipsur-pink-500 to-rose-600 text-white font-bold px-2.5 py-0.5 rounded-full text-[10px] shadow-sm">
                        {cls.periodName}
                      </span>
                    </div>

                    <h3 className="font-display text-base font-bold text-white line-clamp-1 group-hover:text-pink-200 transition-colors">
                      {cls.name}
                    </h3>
                    <p className="text-xs text-indigo-200/90 mt-1 font-medium">
                      Prof. {cls.teacherName}
                    </p>
                  </div>

                  {/* Body with Grade and Tasks */}
                  <div className="p-4 space-y-3 text-xs flex-1">
                    {/* Current Grade Card */}
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                      <div>
                        <span className="text-[11px] text-slate-500 block">Promedio Actual Ponderado:</span>
                        <span className={`text-[11px] font-bold px-2 py-0.2 rounded-full border mt-0.5 inline-block ${grades?.statusColor}`}>
                          {grades?.statusText || 'En Curso'}
                        </span>
                      </div>

                      <div className="text-right">
                        <span className="font-display text-2xl font-black text-ipsur-navy-900">
                          {grades ? grades.finalAverage : '—'}
                        </span>
                        <span className="text-[10px] text-slate-400 font-bold block">/ 100 Pts</span>
                      </div>
                    </div>

                    {/* Rubric topic counter */}
                    <div className="text-[11px] text-slate-600 flex items-center justify-between">
                      <span>Temas del Bimestre:</span>
                      <span className="font-bold text-slate-800">{cls.rubric?.topics?.length || 0} Unidades</span>
                    </div>

                    {/* Pending activities notification */}
                    <div className="text-[11px] flex items-center justify-between">
                      <span>Actividades pendientes:</span>
                      {pendingTasks.length > 0 ? (
                        <span className="font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                          {pendingTasks.length} por entregar
                        </span>
                      ) : (
                        <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          Al día
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 font-mono">
                      {cls.group}
                    </span>

                    <button
                      onClick={() => onSelectClassroom(cls.id)}
                      className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-ipsur-navy-700 hover:bg-ipsur-navy-800 rounded-xl shadow-sm transition"
                    >
                      <span>Entrar al Classroom</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
