import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import CountdownBadge from '../common/CountdownBadge';
import CriteriaConfigModal from '../teacher/CriteriaConfigModal';
import CreateActivityModal from '../teacher/CreateActivityModal';
import UploadMaterialModal from '../teacher/UploadMaterialModal';
import GradeSubmissionsModal from '../teacher/GradeSubmissionsModal';
import AttendanceAssessmentModal from '../teacher/AttendanceAssessmentModal';
import SubmitActivityModal from '../student/SubmitActivityModal';
import RubricModal from '../coordinator/RubricModal';
import EditClassroomModal from '../coordinator/EditClassroomModal';
import InstitutionalActaModal from '../reports/InstitutionalActaModal';
import VirtualSessionPortalModal from './VirtualSessionPortalModal';
import { calculateStudentGrades } from '../../utils/calculations';
import { formatDateTime } from '../../utils/dateFormatter';
import {
  BookOpen,
  Layers,
  FileText,
  CheckSquare,
  Users,
  Award,
  Calendar,
  Clock,
  Video,
  Presentation,
  PlusCircle,
  UploadCloud,
  Edit,
  ShieldAlert,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  ArrowLeft,
  Printer,
  Sparkles,
  Lock,
  Percent,
  AlertTriangle,
  ShieldCheck,
  Info,
  Filter,
  Search,
  Download,
  GraduationCap
} from 'lucide-react';

export default function ClassroomDetail({ classroomId, onBack }) {
  const { 
    classrooms, 
    currentUser, 
    users,
    isSuperAdmin
  } = useApp();

  const classroom = classrooms.find(c => c.id === classroomId);

  // Active tab inside classroom
  const [activeTab, setActiveTab] = useState('actividades'); // 'novedades' | 'rubrica' | 'materiales' | 'actividades' | 'calificaciones'
  const [activityFilter, setActivityFilter] = useState('all'); // 'all' | 'pending' | 'submitted' | 'graded'

  // Modal controls
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [criteriaModalOpen, setCriteriaModalOpen] = useState(false);
  const [createActivityModalOpen, setCreateActivityModalOpen] = useState(false);
  const [uploadMaterialModalOpen, setUploadMaterialModalOpen] = useState(false);
  const [rubricModalOpen, setRubricModalOpen] = useState(false);
  const [attendanceModalOpen, setAttendanceModalOpen] = useState(false);
  const [actaModalOpen, setActaModalOpen] = useState(false);
  const [virtualPortalOpen, setVirtualPortalOpen] = useState(false);

  // Activity-specific modals
  const [gradingActivity, setGradingActivity] = useState(null);
  const [submittingActivity, setSubmittingActivity] = useState(null);

  if (!classroom) {
    return (
      <div className="p-8 text-center">
        <p className="text-slate-500">Sala no encontrada.</p>
        <button onClick={onBack} className="mt-4 px-4 py-2 text-xs bg-slate-200 rounded-lg">
          Volver al panel
        </button>
      </div>
    );
  }

  const isTeacher = currentUser.role === 'teacher';
  const isCoordinator = currentUser.role === 'coordinator';
  const isStudent = currentUser.role === 'student';
  const canEditClassroom = isSuperAdmin || currentUser.role === 'director' || currentUser.role === 'coordinator';

  const enrolledStudents = users.filter(u => classroom.enrolledStudentIds?.includes(u.id));

  // Compute student grade if current user is student
  const myStudentGrade = isStudent ? calculateStudentGrades(classroom, currentUser.id) : null;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Breadcrumb & Return Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 sm:px-4 rounded-2xl border border-slate-200 shadow-xs">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-ipsur-navy-800 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-3.5 py-2 rounded-xl shadow-xs transition group"
          title="Regresar al panel principal de salas"
        >
          <ArrowLeft className="w-4 h-4 text-slate-500 group-hover:-translate-x-0.5 transition-transform" />
          <span>Volver a Mis Salas</span>
        </button>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="font-mono font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-lg border border-slate-200">
            Código: <strong className="text-slate-900">{classroom.code}</strong>
          </span>
          <span className="bg-gradient-to-r from-ipsur-pink-500 to-rose-600 text-white font-bold px-3 py-1 rounded-lg shadow-xs">
            {classroom.periodName}
          </span>
          <span className="hidden sm:inline-flex items-center gap-1.5 bg-ipsur-navy-50 text-ipsur-navy-800 font-bold px-3 py-1 rounded-lg border border-ipsur-navy-200">
            <Sparkles className="w-3.5 h-3.5 text-ipsur-pink-500" />
            <span>{classroom.modality || 'Prepa en Línea'}</span>
          </span>

          {canEditClassroom && (
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="inline-flex items-center gap-1.5 bg-gradient-to-r from-ipsur-navy-700 to-ipsur-pink-600 hover:from-ipsur-navy-800 hover:to-ipsur-pink-700 text-white font-bold px-3 py-1.5 rounded-lg shadow-xs transition cursor-pointer"
              title="Modificar configuración de esta sala virtual"
            >
              <Edit className="w-3.5 h-3.5" />
              <span>Editar Sala</span>
            </button>
          )}
        </div>
      </div>

      {/* Classroom Hero Banner with enlarged executive emblem */}
      <div className="rounded-3xl overflow-hidden shadow-xl border border-white/10 bg-gradient-to-r from-[#090C1B] via-[#131742] to-[#69003B] text-white p-6 sm:p-8 md:p-9 relative">
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-3.5 mb-3.5">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/10 backdrop-blur-md p-2 flex items-center justify-center border border-white/20 shadow-2xl flex-shrink-0">
              <img src="/ipsur-logo.png" alt="IPSUR Logo" className="w-full h-full object-contain filter drop-shadow-[0_2px_10px_rgba(255,255,255,0.25)]" />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest bg-gradient-to-r from-ipsur-pink-500 to-rose-600 text-white px-3 py-0.5 rounded-full shadow-sm">
                Bachillerato Virtual Oficial
              </span>
              <span className="text-[10px] sm:text-[11px] font-bold bg-white/15 text-indigo-100 px-3 py-0.5 rounded-full border border-white/10">
                Grupo: {classroom.group}
              </span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white leading-tight">
            {classroom.name}
          </h1>

          <div className="mt-3.5 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-indigo-100/90 font-medium">
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-xl border border-white/10">
              <span className="text-white/70">Profesor Titular:</span>
              <strong className="text-white font-bold">{classroom.teacherName}</strong>
            </span>
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-xl border border-white/10">
              <Users className="w-4 h-4 text-pink-300" />
              <span>{enrolledStudents.length} Alumnos Inscritos</span>
            </span>
          </div>

          {/* Portal de Videoconferencias Sincrónicas & Acciones */}
          <div className="mt-5 pt-4 border-t border-white/15 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setVirtualPortalOpen(true)}
              title="Abrir la sala de videoconferencias en vivo con Google Meet para clases sincrónicas y tutorías"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-bold text-ipsur-navy-900 bg-white hover:bg-slate-100 rounded-xl shadow-lg transition active:scale-95 group"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></div>
              <Video className="w-4 h-4 text-ipsur-pink-600 transition-transform group-hover:scale-110" />
              <span>Aula Virtual en Vivo y Clases Simultáneas</span>
            </button>

            {/* Quick button to view official rubric loaded by coordinator */}
            <button
              onClick={() => setRubricModalOpen(true)}
              title="Consultar los criterios de evaluación, competencias y rúbrica oficial registrada por la Coordinación Escolar"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition shadow-sm"
            >
              <FileText className="w-4 h-4 text-pink-300" />
              <span>Ver Rúbrica Oficial de Coordinación</span>
            </button>
          </div>
        </div>

        {/* Decorative Watermark Emblem */}
        <div className="absolute right-2 bottom-0 opacity-20 pointer-events-none hidden md:block">
          <img src="/ipsur-logo.png" alt="IPSUR Watermark" className="w-72 h-auto object-contain filter brightness-150 drop-shadow-2xl" />
        </div>
      </div>

      {/* Mandatory Criteria Alert Bar for Teachers */}
      {isTeacher && !classroom.criteriaConfigured && (
        <div className="bg-rose-50 border-2 border-rose-300 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm animate-pulse">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-rose-100 text-rose-600 rounded-xl">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-rose-900">
                Acción Obligatoria: Configuración de Ponderación al 100%
              </h4>
              <p className="text-xs text-rose-700 mt-0.5">
                Debes designar el porcentaje de <strong>Actividades, Examen/Proyecto, Asistencia y Participación</strong>. Hasta que no sume 100%, la asignación de actividades permanecerá bloqueada.
              </p>
            </div>
          </div>
          <button
            onClick={() => setCriteriaModalOpen(true)}
            title="Configurar los porcentajes de evaluación obligatorios que deben sumar 100%"
            className="w-full sm:w-auto px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow transition flex-shrink-0"
          >
            Configurar Criterios (100%)
          </button>
        </div>
      )}

      {/* Criteria Breakdown & 100% Visual Gauge */}
      {classroom.criteriaConfigured && (
        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 bg-emerald-100 text-emerald-700 rounded-xl flex-shrink-0 shadow-xs">
                <CheckCircle2 className="w-4 h-4" />
              </span>
              <div>
                <span className="font-bold text-slate-900 text-xs sm:text-sm block">Criterios Oficiales de Evaluación (100% Reglamentario)</span>
                <span className="text-[11px] text-slate-500">Ponderación institucional validada para el promedio bimestral</span>
              </div>
            </div>

            {isTeacher && (
              <button
                onClick={() => setCriteriaModalOpen(true)}
                title="Ajustar y modificar la distribución porcentual de los criterios de evaluación"
                className="text-xs text-ipsur-navy-700 hover:text-ipsur-navy-900 font-bold bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition self-start sm:self-auto"
              >
                Modificar Criterios
              </button>
            )}
          </div>

          {/* Visual Percentage Distribution Gauge */}
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden flex shadow-inner">
            <div style={{ width: `${classroom.criteria.activities}%` }} className="bg-blue-500 h-full transition-all" title={`Actividades: ${classroom.criteria.activities}%`}></div>
            <div style={{ width: `${classroom.criteria.examProject}%` }} className="bg-purple-500 h-full transition-all" title={`Examen: ${classroom.criteria.examProject}%`}></div>
            <div style={{ width: `${classroom.criteria.attendance}%` }} className="bg-emerald-500 h-full transition-all" title={`Asistencia: ${classroom.criteria.attendance}%`}></div>
            <div style={{ width: `${classroom.criteria.participation}%` }} className="bg-pink-500 h-full transition-all" title={`Participación: ${classroom.criteria.participation}%`}></div>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1 text-xs">
            <div className="bg-blue-50/70 border border-blue-200/80 p-2.5 rounded-xl text-left">
              <span className="text-[10px] font-bold uppercase text-blue-700 block">1. Actividades</span>
              <span className="text-base font-black text-blue-950 mt-0.5 block">{classroom.criteria.activities}%</span>
              <span className="text-[10px] text-blue-800/80 font-medium">Tareas y talleres</span>
            </div>

            <div className="bg-purple-50/70 border border-purple-200/80 p-2.5 rounded-xl text-left">
              <span className="text-[10px] font-bold uppercase text-purple-700 block">2. Examen / Proy.</span>
              <span className="text-base font-black text-purple-950 mt-0.5 block">{classroom.criteria.examProject}%</span>
              <span className="text-[10px] text-purple-800/80 font-medium">Evaluación bimestral</span>
            </div>

            <div className="bg-emerald-50/70 border border-emerald-200/80 p-2.5 rounded-xl text-left">
              <span className="text-[10px] font-bold uppercase text-emerald-700 block">3. Asistencia</span>
              <span className="text-base font-black text-emerald-950 mt-0.5 block">{classroom.criteria.attendance}%</span>
              <span className="text-[10px] text-emerald-800/80 font-medium">Sesiones en vivo</span>
            </div>

            <div className="bg-pink-50/70 border border-pink-200/80 p-2.5 rounded-xl text-left">
              <span className="text-[10px] font-bold uppercase text-pink-700 block">4. Participación</span>
              <span className="text-base font-black text-pink-950 mt-0.5 block">{classroom.criteria.participation}%</span>
              <span className="text-[10px] text-pink-800/80 font-medium">Foros y dinámicas</span>
            </div>
          </div>
        </div>
      )}

      {/* Classroom Navigation Tabs: Swipeable on mobile, fluid on desktop */}
      <div className="border-b border-slate-200 bg-white rounded-2xl p-1.5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-2.5">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 w-full md:w-auto">
          {[
            { 
              id: 'actividades', 
              label: 'Actividades y Tareas', 
              icon: CheckSquare, 
              count: classroom.activities?.length || 0,
              tooltip: 'Tareas, prácticas, proyectos y exámenes en línea con fecha límite y ponderación'
            },
            { 
              id: 'materiales', 
              label: 'Material de Clase', 
              icon: BookOpen, 
              count: classroom.materials?.length || 0,
              tooltip: 'Lecturas, presentaciones, recursos digitales y archivos didácticos compartidos'
            },
            { 
              id: 'rubrica', 
              label: 'Temario y Rúbrica Oficial', 
              icon: FileText,
              tooltip: 'Temario curricular oficial y criterios de ponderación al 100% autorizados'
            },
            { 
              id: 'calificaciones', 
              label: isStudent ? 'Mi Boleta de Calificaciones' : 'Acta de Calificaciones', 
              icon: Award,
              tooltip: isStudent 
                ? 'Consulta tus calificaciones acumuladas y promedio final en esta materia'
                : 'Registro de calificaciones y generación de acta oficial para control escolar'
            }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                title={`${tab.label} — ${tab.tooltip}`}
                className={`flex items-center gap-2 px-3 sm:px-3.5 py-2 rounded-xl text-xs font-bold transition flex-shrink-0 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-ipsur-navy-700 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-pink-300' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Quick action buttons depending on active tab & role */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end pr-1">
          {isTeacher && activeTab === 'actividades' && (
            <button
              onClick={() => {
                if (!classroom.criteriaConfigured) {
                  setCriteriaModalOpen(true);
                } else {
                  setCreateActivityModalOpen(true);
                }
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-ipsur-navy-700 hover:bg-ipsur-navy-800 rounded-lg shadow-sm transition cursor-pointer"
              title="Asignar Actividad: Crear una nueva tarea, proyecto o examen con fecha límite y puntaje"
            >
              <PlusCircle className="w-3.5 h-3.5 text-ipsur-pink-400" />
              <span>Asignar Actividad</span>
            </button>
          )}

          {isTeacher && activeTab === 'materiales' && (
            <button
              onClick={() => setUploadMaterialModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-ipsur-pink-600 hover:bg-ipsur-pink-700 rounded-lg shadow-sm transition cursor-pointer"
              title="Subir Material: Compartir lecturas, presentaciones o enlaces didácticos para los alumnos"
            >
              <UploadCloud className="w-3.5 h-3.5" />
              <span>Subir Material</span>
            </button>
          )}

          {activeTab === 'calificaciones' && (
            <div className="flex items-center gap-2">
              {isTeacher && (
                <button
                  onClick={() => setAttendanceModalOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-ipsur-navy-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg transition cursor-pointer"
                  title="Pasar Lista: Registrar la asistencia y puntualidad de los alumnos a la sesión virtual"
                >
                  <Users className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Pasar Lista</span>
                </button>
              )}

              <button
                onClick={() => setActaModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition cursor-pointer"
                title="Acta Oficial: Generar e imprimir el acta oficial de calificaciones para control escolar SEP"
              >
                <Printer className="w-3.5 h-3.5 text-slate-600" />
                <span>{isStudent ? 'Descargar Boleta' : 'Generar Acta Oficial'}</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* TAB 1: ACTIVIDADES Y TAREAS */}
      {activeTab === 'actividades' && (() => {
        const activities = classroom.activities || [];
        
        // Calculate counts
        const counts = {
          all: activities.length,
          pending: 0,
          submitted: 0,
          graded: 0
        };

        activities.forEach(act => {
          const subs = classroom.submissions?.filter(s => s.activityId === act.id) || [];
          if (isStudent) {
            const mySub = subs.find(s => s.studentId === currentUser.id);
            if (!mySub) counts.pending++;
            else if (mySub.grade !== null && mySub.grade !== undefined) counts.graded++;
            else counts.submitted++;
          } else {
            const gradedCount = subs.filter(s => s.grade !== null && s.grade !== undefined).length;
            if (subs.length < enrolledStudents.length) counts.pending++;
            if (subs.some(s => s.grade === null || s.grade === undefined)) counts.submitted++;
            if (subs.length > 0 && gradedCount === subs.length) counts.graded++;
          }
        });

        // Filtered activities list
        const filteredActivities = activities.filter(act => {
          if (activityFilter === 'all') return true;
          const subs = classroom.submissions?.filter(s => s.activityId === act.id) || [];
          if (isStudent) {
            const mySub = subs.find(s => s.studentId === currentUser.id);
            if (activityFilter === 'pending') return !mySub;
            if (activityFilter === 'submitted') return mySub && (mySub.grade === null || mySub.grade === undefined);
            if (activityFilter === 'graded') return mySub && mySub.grade !== null && mySub.grade !== undefined;
          } else {
            const gradedCount = subs.filter(s => s.grade !== null && s.grade !== undefined).length;
            if (activityFilter === 'pending') return subs.length < enrolledStudents.length;
            if (activityFilter === 'submitted') return subs.some(s => s.grade === null || s.grade === undefined);
            if (activityFilter === 'graded') return subs.length > 0 && gradedCount === subs.length;
          }
          return true;
        });

        return (
          <div className="space-y-4">
            {/* Filter pills & search/info bar */}
            {activities.length > 0 && (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-xs">
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 mr-1">
                    <Filter className="w-3.5 h-3.5 text-slate-400" />
                    Filtrar:
                  </span>
                  {[
                    { id: 'all', label: 'Todas', count: counts.all, color: 'text-slate-700' },
                    { id: 'pending', label: isStudent ? 'Pendientes' : 'Con Entregas Pendientes', count: counts.pending, color: 'text-amber-700' },
                    { id: 'submitted', label: isStudent ? 'En Revisión' : 'Por Calificar', count: counts.submitted, color: 'text-blue-700' },
                    { id: 'graded', label: isStudent ? 'Calificadas' : 'Completamente Calificadas', count: counts.graded, color: 'text-emerald-700' },
                  ].map(filter => {
                    const active = activityFilter === filter.id;
                    return (
                      <button
                        key={filter.id}
                        onClick={() => setActivityFilter(filter.id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition flex-shrink-0 ${
                          active
                            ? 'bg-ipsur-navy-700 text-white shadow-xs'
                            : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200'
                        }`}
                      >
                        <span>{filter.label}</span>
                        <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                          active ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                        }`}>
                          {filter.count}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="text-[11px] text-slate-500 font-medium sm:text-right">
                  Mostrando <strong className="text-slate-800">{filteredActivities.length}</strong> de {activities.length} actividades
                </div>
              </div>
            )}

            {activities.length === 0 ? (
              <div className="bg-white rounded-2xl border-2 border-dashed border-slate-200 p-12 text-center">
                <CheckSquare className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-800">No hay actividades publicadas todavía</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
                  {isTeacher 
                    ? 'Como docente titular, primero asegúrate de tener tus criterios de evaluación al 100% y luego asigna tareas para el bimestre.'
                    : 'Tu profesor aún no ha publicado actividades en esta sala virtual. Consulta el temario y materiales de estudio.'
                  }
                </p>
                {isTeacher && (
                  <button
                    onClick={() => {
                      if (!classroom.criteriaConfigured) setCriteriaModalOpen(true);
                      else setCreateActivityModalOpen(true);
                    }}
                    className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-ipsur-navy-700 hover:bg-ipsur-navy-800 rounded-xl shadow-sm transition"
                  >
                    <PlusCircle className="w-4 h-4 text-ipsur-pink-400" />
                    <span>{classroom.criteriaConfigured ? 'Crear Primera Actividad' : 'Configurar Criterios Primero'}</span>
                  </button>
                )}
              </div>
            ) : filteredActivities.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-500">
                <Filter className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="text-xs font-semibold">No se encontraron actividades con el filtro "{activityFilter}".</p>
                <button
                  onClick={() => setActivityFilter('all')}
                  className="mt-2 text-xs font-bold text-ipsur-pink-600 hover:underline"
                >
                  Ver todas las actividades
                </button>
              </div>
            ) : (
              <div className="space-y-3.5">
                {filteredActivities.map((activity) => {
                  const submissions = classroom.submissions?.filter(s => s.activityId === activity.id) || [];
                  const studentSub = isStudent ? submissions.find(s => s.studentId === currentUser.id) : null;
                  const gradedCount = submissions.filter(s => s.grade !== null && s.grade !== undefined).length;
                  const isPastDue = new Date(activity.dueDate) < new Date();

                  return (
                    <div 
                      key={activity.id}
                      className="bg-white rounded-2xl border border-slate-200 hover:border-slate-300 p-4 sm:p-5 shadow-xs transition hover:shadow-sm space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-lg border border-slate-200">
                              {activity.unitTitle || 'Tema Formativo'}
                            </span>
                            <span className="text-[10px] font-semibold text-slate-400 flex items-center gap-1">
                              <Clock className="w-3 h-3 text-slate-400" />
                              Publicado: {formatDateTime(activity.createdAt)}
                            </span>
                          </div>

                          <h3 className="text-base font-bold text-slate-900 tracking-tight">
                            {activity.title}
                          </h3>

                          <p className="text-xs text-slate-600 mt-2 leading-relaxed whitespace-pre-line">
                            {activity.description}
                          </p>

                          {activity.attachment && (
                            <div className="mt-3.5 flex flex-wrap items-center gap-2">
                              <span className="text-[11px] font-bold text-slate-500">Recurso complementario anexo:</span>
                              <span className="inline-flex items-center gap-1.5 text-xs text-ipsur-navy-800 bg-slate-50 border border-slate-200 px-3 py-1 rounded-xl font-mono shadow-2xs">
                                <FileText className="w-3.5 h-3.5 text-ipsur-pink-500" />
                                {activity.attachment}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Right: Deadline & Score */}
                        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 flex-shrink-0 bg-slate-50 sm:bg-transparent p-2.5 sm:p-0 rounded-xl border sm:border-0 border-slate-200">
                          <div className="text-left sm:text-right">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                              Fecha Límite
                            </span>
                            <CountdownBadge dueDate={activity.dueDate} size="sm" />
                          </div>
                          <span className="text-xs font-black text-slate-800 bg-white sm:bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-lg">
                            Ponderación: 100 Pts
                          </span>
                        </div>
                      </div>

                      {/* Bottom Status & Action Bar */}
                      <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                        {/* Status for Teacher/Coordinator or Student */}
                        {isTeacher || isCoordinator ? (
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-slate-600 font-medium">
                              Entregas de alumnos: <strong className="text-slate-900 font-bold">{submissions.length}</strong> de {enrolledStudents.length}
                            </span>
                            <span className="text-slate-300">•</span>
                            <span className={`font-semibold px-2.5 py-0.5 rounded-lg border text-[11px] ${
                              gradedCount === submissions.length && submissions.length > 0
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : submissions.length > gradedCount
                                ? 'bg-blue-50 text-blue-700 border-blue-200'
                                : 'bg-slate-100 text-slate-600 border-slate-200'
                            }`}>
                              {gradedCount} Calificadas
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            {studentSub ? (
                              studentSub.grade !== null && studentSub.grade !== undefined ? (
                                <div className="flex items-center gap-2">
                                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold text-xs">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                    Calificada: {studentSub.grade} / 100 Pts
                                  </span>
                                  {studentSub.feedback && (
                                    <span className="text-[11px] text-slate-500 italic hidden md:inline">
                                      "{studentSub.feedback.length > 50 ? studentSub.feedback.substring(0, 50) + '...' : studentSub.feedback}"
                                    </span>
                                  )}
                                </div>
                              ) : (
                                <span className="inline-flex items-center gap-1.5 text-blue-700 font-bold bg-blue-50 px-2.5 py-1 rounded-xl border border-blue-200 text-xs">
                                  <Clock className="w-3.5 h-3.5 text-blue-600" />
                                  Entregado · En revisión por el docente titular
                                </span>
                              )
                            ) : (
                              <span className={`inline-flex items-center gap-1.5 font-bold px-2.5 py-1 rounded-xl border text-xs ${
                                isPastDue 
                                  ? 'text-rose-700 bg-rose-50 border-rose-200' 
                                  : 'text-amber-800 bg-amber-50 border-amber-200'
                              }`}>
                                <AlertTriangle className="w-3.5 h-3.5" />
                                {isPastDue ? 'Plazo de entrega concluido' : 'Pendiente de entrega'}
                              </span>
                            )}
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2 sm:ml-auto">
                          {isTeacher && (
                            <button
                              onClick={() => setGradingActivity(activity)}
                              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-ipsur-navy-700 hover:bg-ipsur-navy-800 rounded-xl shadow-xs transition"
                            >
                              <Award className="w-3.5 h-3.5 text-pink-300" />
                              <span>Calificar Entregas ({submissions.length})</span>
                            </button>
                          )}

                          {isStudent && (
                            <button
                              onClick={() => setSubmittingActivity(activity)}
                              className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-xl transition shadow-xs ${
                                studentSub
                                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300'
                                  : 'bg-ipsur-pink-600 hover:bg-ipsur-pink-700 text-white'
                              }`}
                            >
                              <FileText className="w-3.5 h-3.5" />
                              <span>{studentSub ? 'Ver Mi Entrega / Retroalimentación' : 'Subir y Entregar Tarea'}</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })()}

      {/* TAB 2: MATERIAL DE CLASE */}
      {activeTab === 'materiales' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 sm:px-4 rounded-2xl border border-slate-200 shadow-xs">
            <div>
              <h3 className="text-sm font-bold text-slate-800">Repositorio Didáctico y Recursos de Estudio</h3>
              <p className="text-xs text-slate-500">
                Materiales oficiales, lecturas complementarias y grabaciones compartidas por la cátedra.
              </p>
            </div>
            {isTeacher && (
              <button
                onClick={() => setUploadMaterialModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-ipsur-pink-600 hover:bg-ipsur-pink-700 rounded-xl shadow-xs transition self-start sm:self-auto"
              >
                <UploadCloud className="w-4 h-4" />
                <span>Subir Nuevo Material</span>
              </button>
            )}
          </div>

          {classroom.materials?.length === 0 ? (
            <div className="bg-white rounded-2xl border-2 border-dashed border-slate-200 p-12 text-center">
              <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-2" />
              <h4 className="text-sm font-bold text-slate-800">Sin materiales didácticos publicados</h4>
              <p className="text-xs text-slate-400 mt-1">El docente irá agregando guías y recursos a lo largo del periodo lectivo.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {classroom.materials.map(mat => {
                const isVideo = mat.type === 'video';
                const isPresentation = mat.type === 'presentation';
                const Icon = isVideo ? Video : isPresentation ? Presentation : FileText;

                return (
                  <div key={mat.id} className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs hover:border-slate-300 hover:shadow-sm transition space-y-3.5 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className={`p-3 rounded-2xl flex-shrink-0 shadow-xs ${
                          isVideo ? 'bg-red-50 text-red-600 border border-red-100' :
                          isPresentation ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                          'bg-blue-50 text-blue-600 border border-blue-100'
                        }`}>
                          <Icon className="w-6 h-6" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 px-2 py-0.5 rounded-lg border border-slate-200">
                              {mat.unitTitle || 'Material General'}
                            </span>
                            <span className="text-[10px] text-slate-400 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {formatDateTime(mat.uploadedAt)}
                            </span>
                          </div>

                          <h4 className="text-sm font-bold text-slate-900 leading-snug">
                            {mat.title}
                          </h4>

                          <p className="text-xs text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">
                            {mat.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-[11px] text-slate-500 font-mono bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                        {mat.fileName} ({mat.fileSize})
                      </span>

                      <a
                        href={mat.fileUrl}
                        onClick={(e) => { e.preventDefault(); alert(`Descargando o visualizando recurso: ${mat.fileName}`); }}
                        className="inline-flex items-center gap-1.5 font-bold text-ipsur-navy-700 hover:text-ipsur-navy-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl transition shadow-2xs"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-ipsur-pink-500" />
                        <span>Abrir Recurso</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: TEMARIO Y RÚBRICA OFICIAL (COORDINADOR) */}
      {activeTab === 'rubrica' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 shadow-xs space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-ipsur-pink-600 bg-pink-50 px-2.5 py-0.5 rounded-full border border-pink-100">
                Control y Supervisión Académica
              </span>
              <h2 className="text-lg font-black text-slate-900 mt-1">
                Rúbrica Oficial y Temario del Periodo
              </h2>
              <p className="text-xs text-slate-500">
                Aprobada por {classroom.rubric?.uploadedBy} el {formatDateTime(classroom.rubric?.uploadedAt)}
              </p>
            </div>

            {isCoordinator && (
              <button
                onClick={() => setRubricModalOpen(true)}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-ipsur-navy-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-xl transition shadow-xs"
              >
                <Edit className="w-3.5 h-3.5 text-ipsur-pink-500" />
                <span>Editar Temario / Rúbrica</span>
              </button>
            )}
          </div>

          {/* General Objective */}
          <div>
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-ipsur-pink-500" />
              Objetivo General y Propósito Formativo
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-200 leading-relaxed font-normal">
              {classroom.rubric?.generalObjective}
            </p>
          </div>

          {/* Topics & Units Breakdown */}
          <div>
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
              Desglose de Unidades y Temas del Periodo Lectivo
            </h4>

            <div className="space-y-3.5">
              {classroom.rubric?.topics?.map((topic, i) => (
                <div key={topic.id || i} className="border border-slate-200 rounded-2xl p-4 sm:p-5 bg-slate-50/60 hover:bg-slate-50 hover:border-slate-300 transition shadow-2xs">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/80 pb-2.5 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold bg-ipsur-navy-700 text-white px-2.5 py-0.5 rounded-lg shadow-2xs">
                        {topic.unit}
                      </span>
                      <h5 className="text-sm font-bold text-slate-900">
                        {topic.title}
                      </h5>
                    </div>
                    <span className="text-xs font-semibold text-slate-600 bg-white px-3 py-0.5 rounded-full border border-slate-200 shadow-2xs">
                      {topic.weeks}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs">
                    <div className="bg-white p-3 rounded-xl border border-slate-200/80">
                      <span className="font-bold text-slate-800 block mb-1">🎯 Metas de Aprendizaje:</span>
                      <p className="text-slate-600 leading-relaxed">{topic.learningGoals}</p>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-slate-200/80">
                      <span className="font-bold text-slate-800 block mb-1">📚 Recursos Clave:</span>
                      <p className="text-slate-600 leading-relaxed">{topic.keyReadings}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: ACTA DE CALIFICACIONES Y PROMEDIOS */}
      {activeTab === 'calificaciones' && (
        <div className="space-y-5">
          {/* Individual Student View if student is logged in */}
          {isStudent && myStudentGrade && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-ipsur-pink-600 bg-pink-50 px-2 py-0.5 rounded">
                    Boleta Individual en Tiempo Real
                  </span>
                  <h3 className="text-lg font-black text-slate-800 mt-1">
                    Mi Rendimiento y Avance Ponderado
                  </h3>
                  <p className="text-xs text-slate-500 font-mono">
                    Matrícula: {currentUser.matricula} · {currentUser.name}
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-xs text-slate-500 block">Promedio Bimestral Ponderado</span>
                  <span className="text-2xl font-black text-ipsur-navy-800">
                    {myStudentGrade.isConfigured ? myStudentGrade.finalAverage : '—'} <span className="text-sm font-bold text-slate-400">/ 100</span>
                  </span>
                  <div className="mt-1">
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${myStudentGrade.statusColor}`}>
                      {myStudentGrade.statusText}
                    </span>
                  </div>
                </div>
              </div>

              {/* Informative banner if criteria not yet configured by teacher */}
              {!myStudentGrade.isConfigured && (
                <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-xs text-blue-900 space-y-1">
                    <h4 className="font-bold">Ponderación en Proceso de Configuración Docente</h4>
                    <p className="text-blue-800 leading-relaxed">
                      El docente titular ({classroom.teacherName}) se encuentra definiendo los criterios oficiales de evaluación al 100%. Tu promedio bimestral y aportaciones se calcularán automáticamente en cuanto los porcentajes queden formalmente aprobados.
                    </p>
                  </div>
                </div>
              )}

              {/* 4 Cards Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-xl border border-blue-200 bg-blue-50/50">
                  <span className="text-[10px] font-bold uppercase text-blue-700 block">
                    1. Actividades ({classroom.criteria?.activities || 0}%)
                  </span>
                  <p className="text-lg font-black text-blue-900 mt-1">
                    {myStudentGrade.activitiesAvg} <span className="text-xs font-semibold text-slate-400">pts</span>
                  </p>
                  <span className="text-[11px] text-slate-500 block mt-1">
                    Aporta: <strong>{myStudentGrade.breakdown.activitiesContribution} pts</strong> al promedio
                  </span>
                </div>

                <div className="p-3.5 rounded-xl border border-purple-200 bg-purple-50/50">
                  <span className="text-[10px] font-bold uppercase text-purple-700 block">
                    2. Examen / Proyecto ({classroom.criteria?.examProject || 0}%)
                  </span>
                  <p className="text-lg font-black text-purple-900 mt-1">
                    {myStudentGrade.examScore} <span className="text-xs font-semibold text-slate-400">pts</span>
                  </p>
                  <span className="text-[11px] text-slate-500 block mt-1">
                    Aporta: <strong>{myStudentGrade.breakdown.examContribution} pts</strong> al promedio
                  </span>
                </div>

                <div className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/50">
                  <span className="text-[10px] font-bold uppercase text-emerald-700 block">
                    3. Asistencia ({classroom.criteria?.attendance || 0}%)
                  </span>
                  <p className="text-lg font-black text-emerald-900 mt-1">
                    {myStudentGrade.attendanceScore} <span className="text-xs font-semibold text-slate-400">pts</span>
                  </p>
                  <span className="text-[11px] text-slate-500 block mt-1">
                    Aporta: <strong>{myStudentGrade.breakdown.attendanceContribution} pts</strong> al promedio
                  </span>
                </div>

                <div className="p-3.5 rounded-xl border border-pink-200 bg-pink-50/50">
                  <span className="text-[10px] font-bold uppercase text-pink-700 block">
                    4. Participación ({classroom.criteria?.participation || 0}%)
                  </span>
                  <p className="text-lg font-black text-pink-900 mt-1">
                    {myStudentGrade.participationScore} <span className="text-xs font-semibold text-slate-400">pts</span>
                  </p>
                  <span className="text-[11px] text-slate-500 block mt-1">
                    Aporta: <strong>{myStudentGrade.breakdown.participationContribution} pts</strong> al promedio
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Student enrollment fallback if not found */}
          {isStudent && !myStudentGrade && (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-3">
              <AlertTriangle className="w-10 h-10 text-amber-500 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">Expediente de Calificaciones en Verificación</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                No se encontró un registro académico para tu matrícula en esta sala. Si estás formalmente inscrito, contacta a Coordinación Escolar para verificar tu asignación.
              </p>
            </div>
          )}

          {/* Private Student Activities & Submissions Breakdown (ONLY visible to this student) */}
          {isStudent && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                    <CheckSquare className="w-4 h-4 text-ipsur-pink-600" />
                    <span>Registro Privado de Mis Actividades Realizadas en esta Materia</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Historial personal de entregas, calificaciones y retroalimentación docente en {classroom.name}.
                  </p>
                </div>
                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1.5 self-start sm:self-auto">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Expediente Personal Protegido</span>
                </span>
              </div>

              {/* Notice of Privacy */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-center gap-2">
                <span className="text-base">🔒</span>
                <span>
                  <strong>Privacidad Estricta IPSUR:</strong> Por normativa institucional, ningún alumno puede visualizar las tareas, entregas ni notas de sus compañeros. Este apartado muestra únicamente tus actividades personales.
                </span>
              </div>

              {/* List of activities and this student's submissions OR empty state */}
              {(classroom.activities || []).length === 0 ? (
                <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
                  <FileText className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                  <h4 className="text-sm font-bold text-slate-700">Aún no hay actividades publicadas en esta materia</h4>
                  <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
                    En cuanto el profesor titular ({classroom.teacherName}) asigne tareas o proyectos y realices tus entregas, aquí podrás consultar tus calificaciones y retroalimentación oficial.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
                  {(classroom.activities || []).map((act, index) => {
                    const mySub = (classroom.submissions || []).find(
                      s => s.activityId === act.id && s.studentId === currentUser.id
                    );
                    const deadline = getDeadlineStatus(act.dueDate);

                    return (
                      <div key={act.id} className="p-4 hover:bg-slate-50 transition space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                                {act.unitTitle || `Actividad ${index + 1}`}
                              </span>
                              <span className="text-[10px] font-bold text-ipsur-pink-600">
                                Valor: 100 Pts
                              </span>
                            </div>
                            <h4 className="text-sm font-bold text-slate-900">{act.title}</h4>
                          </div>

                          {/* Submission status badge */}
                          <div className="flex items-center gap-2 self-start sm:self-auto">
                            {mySub ? (
                              mySub.grade !== null && mySub.grade !== undefined ? (
                                <span className="inline-flex items-center gap-1 text-xs font-black text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-lg border border-emerald-300">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                  <span>Calificación: {mySub.grade} / 100 Pts</span>
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-xs font-bold text-blue-800 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                                  <Clock className="w-3.5 h-3.5 text-blue-600" />
                                  <span>Entregada (En revisión)</span>
                                </span>
                              )
                            ) : deadline.isClosed ? (
                              <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-800 bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-200">
                                <Lock className="w-3.5 h-3.5 text-rose-600" />
                                <span>No entregada (Plazo vencido)</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                                <span>Pendiente de entrega</span>
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Delivery Details & Feedback */}
                        {mySub ? (
                          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs space-y-2">
                            <div className="flex flex-wrap items-center justify-between gap-2 text-slate-500 text-[11px]">
                              <span>📎 Archivo entregado: <strong className="text-slate-800 font-mono">{mySub.fileName || 'Documento_IPSUR.pdf'}</strong></span>
                              {mySub.submittedAt && (
                                <span>Fecha de envío: <strong>{formatDateTime(mySub.submittedAt)}</strong></span>
                              )}
                            </div>

                            {mySub.notes && (
                              <p className="text-slate-600 text-[11px]">
                                <strong>Tus comentarios:</strong> "{mySub.notes}"
                              </p>
                            )}

                            {mySub.feedback && (
                              <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-900">
                                <span className="text-[10px] font-bold uppercase tracking-wider block text-emerald-800">
                                  💬 Retroalimentación oficial del docente ({classroom.teacherName}):
                                </span>
                                <p className="text-xs italic mt-0.5 font-medium">"{mySub.feedback}"</p>
                              </div>
                            )}
                          </div>
                        ) : !deadline.isClosed ? (
                          <div className="flex items-center justify-between text-xs pt-1">
                            <span className="text-slate-500">
                              Límite de entrega: <strong>{formatDateTime(act.dueDate)}</strong>
                            </span>
                            <button
                              onClick={() => setSubmittingActivity(act)}
                              className="px-3 py-1.5 text-xs font-bold text-white bg-ipsur-pink-600 hover:bg-ipsur-pink-700 rounded-lg shadow-sm transition"
                            >
                              Entregar Ahora
                            </button>
                          </div>
                        ) : (
                          <p className="text-[11px] text-slate-400 italic">
                            El apartado cerró automáticamente el {formatDateTime(act.dueDate)}.
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Master Gradebook Table: ONLY Visible to Teacher and Coordinator */}
          {!isStudent && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-bold text-slate-800">
                    Acta General de Evaluación Bimestral / Cuatrimestral
                  </h3>
                  <p className="text-xs text-slate-500">
                    Cálculo automático de promedio según los 4 criterios de evaluación establecidos.
                  </p>
                </div>

                <span className="text-xs bg-white border border-slate-300 text-slate-700 px-3 py-1 rounded-lg font-mono">
                  {enrolledStudents.length} Alumnos Registrados
                </span>
              </div>

              {/* Mobile Card View (phones): Clean spacious cards so nothing is crowded */}
              <div className="block md:hidden divide-y divide-slate-100">
                {enrolledStudents.map(student => {
                  const gradeData = calculateStudentGrades(classroom, student.id);
                  return (
                    <div key={student.id} className="p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <img src={student.avatar} alt={student.name} className="w-9 h-9 rounded-full object-cover" />
                          <div>
                            <p className="font-bold text-slate-800 text-xs">{student.name}</p>
                            <p className="text-[10px] text-slate-400 font-mono">{student.matricula}</p>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-base font-black text-ipsur-navy-800">{gradeData.finalAverage}</span>
                          <span className="text-[10px] text-slate-400 font-bold block">/ 100</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        <div>
                          <span className="text-slate-400 block text-[10px]">Actividades:</span>
                          <strong className="text-slate-700">{gradeData.activitiesAvg} pts</strong>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px]">Examen:</span>
                          <strong className="text-slate-700">{gradeData.examScore} pts</strong>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px]">Asistencia:</span>
                          <strong className="text-slate-700">{gradeData.attendanceScore} pts</strong>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px]">Participación:</span>
                          <strong className="text-slate-700">{gradeData.participationScore} pts</strong>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[11px] text-slate-500 font-medium">Estatus del alumno:</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${gradeData.statusColor}`}>
                          {gradeData.statusText}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Desktop and Tablet Table View: Expands fully across wide screens */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-700 uppercase font-bold text-[11px] border-b border-slate-200">
                    <tr>
                      <th className="p-3">Estudiante</th>
                      <th className="p-3 text-center">
                        Actividades ({classroom.criteria?.activities || 0}%)
                      </th>
                      <th className="p-3 text-center">
                        Examen/Proyecto ({classroom.criteria?.examProject || 0}%)
                      </th>
                      <th className="p-3 text-center">
                        Asistencia ({classroom.criteria?.attendance || 0}%)
                      </th>
                      <th className="p-3 text-center">
                        Participación ({classroom.criteria?.participation || 0}%)
                      </th>
                      <th className="p-3 text-center bg-indigo-50/60 font-black text-ipsur-navy-900">
                        Promedio Final
                      </th>
                      <th className="p-3 text-center">Estatus</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {enrolledStudents.map(student => {
                      const gradeData = calculateStudentGrades(classroom, student.id);
                      return (
                        <tr key={student.id} className="hover:bg-slate-50/80 transition">
                          <td className="p-3 flex items-center gap-2.5">
                            <img src={student.avatar} alt={student.name} className="w-7 h-7 rounded-full object-cover" />
                            <div>
                              <p className="font-bold text-slate-800">{student.name}</p>
                              <p className="text-[10px] text-slate-400 font-mono">{student.matricula}</p>
                            </div>
                          </td>

                          <td className="p-3 text-center">
                            <span className="font-bold text-slate-800">{gradeData.activitiesAvg}</span>
                            <span className="text-[10px] text-slate-400 block font-mono">
                              ({gradeData.gradedActivitiesCount}/{gradeData.totalActivities} calif)
                            </span>
                          </td>

                          <td className="p-3 text-center font-bold text-slate-800">
                            {gradeData.examScore}
                          </td>

                          <td className="p-3 text-center font-bold text-slate-800">
                            {gradeData.attendanceScore}
                          </td>

                          <td className="p-3 text-center font-bold text-slate-800">
                            {gradeData.participationScore}
                          </td>

                          <td className="p-3 text-center bg-indigo-50/60 font-black text-sm text-ipsur-navy-800">
                            {gradeData.finalAverage}
                          </td>

                          <td className="p-3 text-center">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${gradeData.statusColor}`}>
                              {gradeData.statusText}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* MODALS */}
      <CriteriaConfigModal
        isOpen={criteriaModalOpen}
        onClose={() => setCriteriaModalOpen(false)}
        classroom={classroom}
      />

      <CreateActivityModal
        isOpen={createActivityModalOpen}
        onClose={() => setCreateActivityModalOpen(false)}
        classroom={classroom}
        onOpenCriteriaModal={() => setCriteriaModalOpen(true)}
      />

      <UploadMaterialModal
        isOpen={uploadMaterialModalOpen}
        onClose={() => setUploadMaterialModalOpen(false)}
        classroom={classroom}
      />

      <RubricModal
        isOpen={rubricModalOpen}
        onClose={() => setRubricModalOpen(false)}
        classroom={classroom}
      />

      <AttendanceAssessmentModal
        isOpen={attendanceModalOpen}
        onClose={() => setAttendanceModalOpen(false)}
        classroom={classroom}
      />

      <InstitutionalActaModal
        isOpen={actaModalOpen}
        onClose={() => setActaModalOpen(false)}
        classroom={classroom}
      />

      <VirtualSessionPortalModal
        isOpen={virtualPortalOpen}
        onClose={() => setVirtualPortalOpen(false)}
        classroom={classroom}
      />

      {isEditModalOpen && (
        <EditClassroomModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          classroom={classroom}
        />
      )}

      {gradingActivity && (
        <GradeSubmissionsModal
          isOpen={Boolean(gradingActivity)}
          onClose={() => setGradingActivity(null)}
          classroom={classroom}
          activity={gradingActivity}
        />
      )}

      {submittingActivity && (
        <SubmitActivityModal
          isOpen={Boolean(submittingActivity)}
          onClose={() => setSubmittingActivity(null)}
          classroom={classroom}
          activity={submittingActivity}
        />
      )}
    </div>
  );
}
