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
  AlertTriangle
} from 'lucide-react';

export default function ClassroomDetail({ classroomId, onBack }) {
  const { 
    classrooms, 
    currentUser, 
    users 
  } = useApp();

  const classroom = classrooms.find(c => c.id === classroomId);

  // Active tab inside classroom
  const [activeTab, setActiveTab] = useState('actividades'); // 'novedades' | 'rubrica' | 'materiales' | 'actividades' | 'calificaciones'

  // Modal controls
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

  const enrolledStudents = users.filter(u => classroom.enrolledStudentIds?.includes(u.id));

  // Compute student grade if current user is student
  const myStudentGrade = isStudent ? calculateStudentGrades(classroom, currentUser.id) : null;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Breadcrumb & Return */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-ipsur-navy-700 bg-white hover:bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg shadow-sm transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver a Mis Salas</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-mono hidden sm:inline">
            Código: <strong className="text-slate-700">{classroom.code}</strong>
          </span>
          <span className="text-xs bg-ipsur-pink-50 text-ipsur-pink-700 font-bold px-2.5 py-0.5 rounded-full border border-ipsur-pink-200">
            {classroom.periodName}
          </span>
        </div>
      </div>

      {/* Classroom Hero Banner with integrated logo */}
      <div className="rounded-3xl overflow-hidden shadow-md border border-slate-200 bg-gradient-to-r from-ipsur-navy-900 via-indigo-900 to-ipsur-navy-800 text-white p-5 sm:p-7 md:p-8 relative">
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-3 mb-2.5">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white/10 backdrop-blur-md p-1.5 flex items-center justify-center border border-white/20 shadow-inner flex-shrink-0">
              <img src="/ipsur-logo.png" alt="IPSUR Logo" className="w-full h-full object-contain filter drop-shadow" />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest bg-ipsur-pink-500 text-white px-2.5 py-0.5 rounded-full shadow-sm">
                Prepa en Línea IPSUR
              </span>
              <span className="text-[10px] sm:text-[11px] font-semibold bg-white/15 text-indigo-100 px-2.5 py-0.5 rounded-full">
                Grupo: {classroom.group}
              </span>
            </div>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-white">
            {classroom.name}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-indigo-100">
            <span className="flex items-center gap-1.5">
              <span className="text-white/60">Profesor Titular:</span>
              <strong className="text-white font-semibold">{classroom.teacherName}</strong>
            </span>
            <span className="hidden sm:inline text-white/30">•</span>
            <span className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-indigo-300" />
              <span>{enrolledStudents.length} Estudiantes Matriculados</span>
            </span>
          </div>

          {/* Portal de Videoconferencias Sincrónicas (Google Meet, Zoom, Teams, Aula Virtual) */}
          <div className="mt-4 pt-4 border-t border-white/15 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setVirtualPortalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-ipsur-navy-900 bg-white hover:bg-slate-100 rounded-xl shadow-md transition group"
            >
              <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></div>
              <Video className="w-4 h-4 text-ipsur-pink-600 transition-transform group-hover:scale-110" />
              <span>Aula Virtual en Vivo y Clases Simultáneas</span>
            </button>

            {/* Quick button to view official rubric loaded by coordinator */}
            <button
              onClick={() => setRubricModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition"
            >
              <FileText className="w-3.5 h-3.5 text-pink-300" />
              <span>Ver Rúbrica Oficial de Coordinación</span>
            </button>
          </div>
        </div>

        {/* Decorative Watermark Emblem */}
        <div className="absolute right-2 bottom-0 opacity-20 pointer-events-none hidden md:block">
          <img src="/ipsur-logo.png" alt="IPSUR Watermark" className="w-64 h-auto object-contain filter brightness-150 drop-shadow-2xl" />
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
            className="w-full sm:w-auto px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow transition flex-shrink-0"
          >
            Configurar Criterios (100%)
          </button>
        </div>
      )}

      {/* Criteria Breakdown: 2x2 grid on mobile phones, inline flex on tablets and widescreen computers */}
      {classroom.criteriaConfigured && (
        <div className="bg-white rounded-2xl border border-slate-200 p-3.5 sm:p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-emerald-100 text-emerald-700 rounded-lg flex-shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </span>
            <div>
              <span className="font-bold text-slate-800 block text-xs sm:text-sm">Criterios de Evaluación Oficiales:</span>
              <span className="text-[11px] text-slate-500">Ponderación institucional validada al 100%</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2 w-full md:w-auto">
            <span className="bg-blue-50 text-blue-800 border border-blue-200 px-2.5 py-1.5 rounded-lg font-semibold text-center sm:text-left">
              Actividades: <strong>{classroom.criteria.activities}%</strong>
            </span>
            <span className="bg-purple-50 text-purple-800 border border-purple-200 px-2.5 py-1.5 rounded-lg font-semibold text-center sm:text-left">
              Examen: <strong>{classroom.criteria.examProject}%</strong>
            </span>
            <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1.5 rounded-lg font-semibold text-center sm:text-left">
              Asistencia: <strong>{classroom.criteria.attendance}%</strong>
            </span>
            <span className="bg-pink-50 text-pink-800 border border-pink-200 px-2.5 py-1.5 rounded-lg font-semibold text-center sm:text-left">
              Participación: <strong>{classroom.criteria.participation}%</strong>
            </span>

            {isTeacher && (
              <button
                onClick={() => setCriteriaModalOpen(true)}
                className="col-span-2 sm:col-auto text-xs text-center text-ipsur-navy-600 hover:text-ipsur-navy-800 underline font-bold py-1 sm:ml-2"
              >
                Modificar
              </button>
            )}
          </div>
        </div>
      )}

      {/* Classroom Navigation Tabs: Swipeable on mobile, fluid on desktop */}
      <div className="border-b border-slate-200 bg-white rounded-2xl p-1.5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-2.5">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 w-full md:w-auto">
          {[
            { id: 'actividades', label: 'Actividades y Tareas', icon: CheckSquare, count: classroom.activities?.length || 0 },
            { id: 'materiales', label: 'Material de Clase', icon: BookOpen, count: classroom.materials?.length || 0 },
            { id: 'rubrica', label: 'Temario y Rúbrica Oficial', icon: FileText },
            { id: 'calificaciones', label: 'Acta de Calificaciones', icon: Award }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 sm:px-3.5 py-2 rounded-xl text-xs font-bold transition flex-shrink-0 whitespace-nowrap ${
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
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-ipsur-navy-700 hover:bg-ipsur-navy-800 rounded-lg shadow-sm transition"
            >
              <PlusCircle className="w-3.5 h-3.5 text-ipsur-pink-400" />
              <span>Asignar Actividad</span>
            </button>
          )}

          {isTeacher && activeTab === 'materiales' && (
            <button
              onClick={() => setUploadMaterialModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-ipsur-pink-600 hover:bg-ipsur-pink-700 rounded-lg shadow-sm transition"
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
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-ipsur-navy-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg transition"
                >
                  <Award className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Evaluar Asistencia / Examen</span>
                </button>
              )}
              <button
                onClick={() => setActaModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg shadow-sm transition"
              >
                <Printer className="w-3.5 h-3.5 text-slate-500" />
                <span>Imprimir Boleta / Acta Oficial</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* TAB 1: ACTIVIDADES Y TAREAS */}
      {activeTab === 'actividades' && (
        <div className="space-y-4">
          {classroom.activities?.length === 0 ? (
            <div className="bg-white rounded-2xl border-2 border-dashed border-slate-200 p-12 text-center">
              <CheckSquare className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-700">No hay actividades publicadas todavía</h3>
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
                  className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-ipsur-navy-700 hover:bg-ipsur-navy-800 rounded-lg shadow"
                >
                  <PlusCircle className="w-4 h-4 text-ipsur-pink-400" />
                  <span>{classroom.criteriaConfigured ? 'Crear Primera Actividad' : 'Configurar Criterios Primero'}</span>
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              {classroom.activities.map((activity, idx) => {
                const submissions = classroom.submissions?.filter(s => s.activityId === activity.id) || [];
                const studentSub = isStudent ? submissions.find(s => s.studentId === currentUser.id) : null;
                const gradedCount = submissions.filter(s => s.grade !== null).length;

                return (
                  <div 
                    key={activity.id}
                    className="bg-white rounded-2xl border border-slate-200 hover:border-slate-300 p-5 shadow-sm transition space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                            {activity.unitTitle || 'Tema'}
                          </span>
                          <span className="text-[10px] font-semibold text-slate-400">
                            Publicado: {formatDateTime(activity.createdAt)}
                          </span>
                        </div>

                        <h3 className="text-base font-bold text-slate-800 tracking-tight">
                          {activity.title}
                        </h3>

                        <p className="text-xs text-slate-600 mt-2 leading-relaxed whitespace-pre-line">
                          {activity.description}
                        </p>

                        {activity.attachment && (
                          <div className="mt-3 flex items-center gap-2">
                            <span className="text-[11px] font-bold text-slate-500">Recurso anexo:</span>
                            <span className="inline-flex items-center gap-1.5 text-xs text-ipsur-navy-700 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-md font-mono">
                              <FileText className="w-3.5 h-3.5 text-ipsur-pink-500" />
                              {activity.attachment}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Right: Deadline with strict status */}
                      <div className="flex flex-col sm:items-end gap-1.5 flex-shrink-0">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Control de Plazo
                        </span>
                        <CountdownBadge dueDate={activity.dueDate} size="sm" />
                        <span className="text-xs font-black text-slate-700 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded">
                          Valor: 100 Pts
                        </span>
                      </div>
                    </div>

                    {/* Bottom Status & Action Bar */}
                    <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                      {/* Left: Summary for Teacher or Grade for Student */}
                      {isTeacher || isCoordinator ? (
                        <div className="flex items-center gap-3">
                          <span className="text-slate-600">
                            Entregas: <strong className="text-slate-800">{submissions.length}</strong> de {enrolledStudents.length} alumnos
                          </span>
                          <span className="text-slate-400">•</span>
                          <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            {gradedCount} Calificadas
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          {studentSub ? (
                            studentSub.grade !== null && studentSub.grade !== undefined ? (
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-slate-600">Tu Calificación:</span>
                                <span className="text-sm font-black text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-lg">
                                  {studentSub.grade} / 100 Pts
                                </span>
                              </div>
                            ) : (
                              <span className="text-blue-700 font-semibold bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                                ⏳ Entregado - En revisión por docente
                              </span>
                            )
                          ) : (
                            <span className="text-amber-800 font-medium bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                              ⚠️ Actividad sin entregar
                            </span>
                          )}
                        </div>
                      )}

                      {/* Right: Actions */}
                      <div className="flex items-center gap-2 ml-auto">
                        {isTeacher && (
                          <button
                            onClick={() => setGradingActivity(activity)}
                            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-ipsur-navy-700 hover:bg-ipsur-navy-800 rounded-lg shadow-sm transition"
                          >
                            <Award className="w-3.5 h-3.5 text-pink-300" />
                            <span>Calificar Entregas (0 - 100)</span>
                          </button>
                        )}

                        {isStudent && (
                          <button
                            onClick={() => setSubmittingActivity(activity)}
                            className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-lg transition shadow-sm ${
                              studentSub
                                ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300'
                                : 'bg-ipsur-pink-600 hover:bg-ipsur-pink-700 text-white'
                            }`}
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span>{studentSub ? 'Ver Entrega / Retroalimentación' : 'Subir y Entregar Tarea'}</span>
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
      )}

      {/* TAB 2: MATERIAL DE CLASE */}
      {activeTab === 'materiales' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-500">
              Repositorio de recursos, lecturas y grabaciones de clase subidas por el profesor titular.
            </p>
            {isTeacher && (
              <button
                onClick={() => setUploadMaterialModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-ipsur-pink-600 hover:bg-ipsur-pink-700 rounded-lg shadow-sm"
              >
                <UploadCloud className="w-3.5 h-3.5" />
                <span>Subir Nuevo Material</span>
              </button>
            )}
          </div>

          {classroom.materials?.length === 0 ? (
            <div className="bg-white rounded-2xl border-2 border-dashed border-slate-200 p-12 text-center">
              <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-2" />
              <h4 className="text-sm font-bold text-slate-700">Sin materiales didácticos publicados</h4>
              <p className="text-xs text-slate-400 mt-1">El docente irá agregando guías y recursos a lo largo del periodo.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {classroom.materials.map(mat => {
                const isVideo = mat.type === 'video';
                const isPresentation = mat.type === 'presentation';
                const Icon = isVideo ? Video : isPresentation ? Presentation : FileText;

                return (
                  <div key={mat.id} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm hover:border-slate-300 transition space-y-3">
                    <div className="flex items-start gap-3">
                      <div className={`p-3 rounded-xl flex-shrink-0 ${
                        isVideo ? 'bg-red-50 text-red-600' :
                        isPresentation ? 'bg-amber-50 text-amber-600' :
                        'bg-blue-50 text-blue-600'
                      }`}>
                        <Icon className="w-6 h-6" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="text-[10px] font-bold uppercase bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                            {mat.unitTitle}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {formatDateTime(mat.uploadedAt)}
                          </span>
                        </div>

                        <h4 className="text-xs font-bold text-slate-800 leading-snug">
                          {mat.title}
                        </h4>

                        <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                          {mat.description}
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-[11px] text-slate-400 font-mono">
                        {mat.fileName} ({mat.fileSize})
                      </span>

                      <a
                        href={mat.fileUrl}
                        onClick={(e) => { e.preventDefault(); alert(`Descargando o abriendo material didáctico: ${mat.fileName}`); }}
                        className="inline-flex items-center gap-1 font-bold text-ipsur-navy-700 hover:text-ipsur-navy-900 bg-slate-50 hover:bg-slate-100 px-2.5 py-1 rounded transition"
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
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-ipsur-pink-600 bg-pink-50 px-2.5 py-0.5 rounded-full">
                Control y Supervisión Académica
              </span>
              <h2 className="text-lg font-black text-ipsur-navy-800 mt-1">
                Rúbrica Oficial y Temario del Periodo
              </h2>
              <p className="text-xs text-slate-500">
                Cargada por {classroom.rubric?.uploadedBy} el {formatDateTime(classroom.rubric?.uploadedAt)}
              </p>
            </div>

            {isCoordinator && (
              <button
                onClick={() => setRubricModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-ipsur-navy-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg transition"
              >
                <Edit className="w-3.5 h-3.5 text-ipsur-pink-500" />
                <span>Editar Temario / Rúbrica</span>
              </button>
            )}
          </div>

          {/* General Objective */}
          <div>
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Objetivo General y Propósito Formativo
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-200 leading-relaxed">
              {classroom.rubric?.generalObjective}
            </p>
          </div>

          {/* Topics & Units Breakdown */}
          <div>
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
              Desglose de Unidades y Temas que se verán en el Bimestre / Cuatrimestre
            </h4>

            <div className="space-y-3">
              {classroom.rubric?.topics?.map((topic, i) => (
                <div key={topic.id || i} className="border border-slate-200 rounded-xl p-4 bg-slate-50/50">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold bg-ipsur-navy-700 text-white px-2 py-0.5 rounded">
                        {topic.unit}
                      </span>
                      <h5 className="text-sm font-bold text-slate-800">
                        {topic.title}
                      </h5>
                    </div>
                    <span className="text-xs font-semibold text-slate-500 bg-white px-2.5 py-0.5 rounded-full border border-slate-200">
                      {topic.weeks}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="font-semibold text-slate-700 block mb-0.5">Metas de Aprendizaje:</span>
                      <p className="text-slate-600">{topic.learningGoals}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-slate-700 block mb-0.5">Recursos Recomendados:</span>
                      <p className="text-slate-600">{topic.keyReadings}</p>
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
                    {myStudentGrade.finalAverage} <span className="text-sm font-bold text-slate-400">/ 100</span>
                  </span>
                  <div className="mt-1">
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${myStudentGrade.statusColor}`}>
                      {myStudentGrade.statusText}
                    </span>
                  </div>
                </div>
              </div>

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

          {/* Master Gradebook Table (Visible to Teacher and Coordinator) */}
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
