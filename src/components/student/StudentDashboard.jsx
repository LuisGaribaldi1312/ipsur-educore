import React from 'react';
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
  FileText
} from 'lucide-react';

export default function StudentDashboard({ onSelectClassroom }) {
  const { classrooms, currentUser } = useApp();

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

  // Gather all activities across classrooms to highlight pending ones
  const upcomingActivities = [];
  enrolledClassrooms.forEach(cls => {
    (cls.activities || []).forEach(act => {
      const studentSub = (cls.submissions || []).find(
        s => s.activityId === act.id && s.studentId === currentUser.id
      );
      const deadline = getDeadlineStatus(act.dueDate);

      upcomingActivities.push({
        ...act,
        classroomName: cls.name,
        classroomId: cls.id,
        isSubmitted: Boolean(studentSub),
        grade: studentSub?.grade,
        deadline
      });
    });
  });

  return (
    <div className="space-y-6">
      {/* Student Hero Banner */}
      <div className="bg-gradient-to-r from-ipsur-navy-900 via-indigo-900 to-ipsur-pink-800 rounded-3xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md p-1.5 flex items-center justify-center border border-white/20 shadow-inner flex-shrink-0">
              <img src="/ipsur-logo.png" alt="IPSUR Emblem" className="w-full h-full object-contain filter drop-shadow" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 px-2.5 py-0.5 rounded-full text-[11px] font-semibold text-pink-200">
                <GraduationCap className="w-3.5 h-3.5 text-ipsur-pink-400" />
                <span>Portal del Estudiante · Prepa en Línea IPSUR</span>
              </div>
              <p className="text-[11px] text-indigo-200 mt-0.5 font-medium">Instituto Peninsular del Sur · Bachillerato Virtual</p>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Hola, {currentUser.name}
          </h1>
          <p className="text-xs sm:text-sm text-indigo-100 mt-2 leading-relaxed">
            Matrícula: <strong className="text-white font-mono">{currentUser.matricula}</strong> · Grupo: <strong className="text-white">{currentUser.grupo || 'PREPA-101-ONLINE'}</strong>.
            Aquí puedes consultar el temario y rúbrica oficial de tus materias, descargar materiales de estudio y entregar tus actividades antes del cierre automático.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <div className="bg-white/15 px-3 py-1 rounded-xl flex items-center gap-2">
              <span className="text-xs text-indigo-200">Promedio General Ponderado:</span>
              <span className="text-base font-black text-white">{overallAverage} / 100</span>
            </div>

            <div className="bg-white/15 px-3 py-1 rounded-xl flex items-center gap-2">
              <span className="text-xs text-indigo-200">Materias Activas:</span>
              <span className="text-sm font-bold text-pink-300">{enrolledClassrooms.length}</span>
            </div>
          </div>
        </div>

        {/* Decorative Transparent Watermark */}
        <div className="absolute -right-4 -bottom-10 opacity-20 pointer-events-none hidden md:block">
          <img src="/ipsur-logo.png" alt="IPSUR Watermark" className="w-72 h-auto object-contain filter brightness-150 drop-shadow-2xl" />
        </div>
      </div>

      {/* Enrolled Subjects Grid */}
      <div className="space-y-4">
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
                className="bg-white rounded-2xl border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md transition overflow-hidden flex flex-col justify-between"
              >
                {/* Header */}
                <div className="p-5 bg-gradient-to-r from-ipsur-navy-800 to-indigo-900 text-white">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-mono bg-white/20 px-2 py-0.5 rounded font-bold">
                      {cls.code}
                    </span>
                    <span className="bg-ipsur-pink-500 text-white font-bold px-2 py-0.5 rounded-full text-[10px]">
                      {cls.periodName}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white line-clamp-1">
                    {cls.name}
                  </h3>
                  <p className="text-xs text-indigo-200 mt-1">
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
                      <span className="text-xl font-black text-ipsur-navy-800">
                        {grades ? grades.finalAverage : '—'}
                      </span>
                      <span className="text-[11px] text-slate-400 font-bold block">/ 100</span>
                    </div>
                  </div>

                  {/* Rubric topic counter */}
                  <div className="text-[11px] text-slate-600 flex items-center justify-between">
                    <span>Temas del Bimestre:</span>
                    <span className="font-bold text-slate-800">{cls.rubric?.topics?.length || 0} Unidades</span>
                  </div>

                  {/* Pending activities notification */}
                  <div className="text-[11px] flex items-center justify-between">
                    <span>Actividades por entregar:</span>
                    {pendingTasks.length > 0 ? (
                      <span className="font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                        {pendingTasks.length} pendientes
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

      {/* Upcoming / Active Activities Tracker */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <Clock className="w-4 h-4 text-ipsur-pink-500" />
            <span>Monitoreo de Actividades y Fechas de Cierre</span>
          </h3>
          <span className="text-xs text-slate-500">
            Control Estricto de Tiempos de Entrega
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {upcomingActivities.slice(0, 5).map(act => (
            <div key={act.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                    {act.classroomName}
                  </span>
                  {act.isSubmitted ? (
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {act.grade !== null && act.grade !== undefined ? `Calificado: ${act.grade}/100` : 'Entregado'}
                    </span>
                  ) : act.deadline.isClosed ? (
                    <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                      Cerrado
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      Pendiente
                    </span>
                  )}
                </div>

                <h4 className="text-xs font-bold text-slate-800">
                  {act.title}
                </h4>
              </div>

              <div className="flex items-center gap-3">
                <CountdownBadge dueDate={act.dueDate} size="sm" />

                <button
                  onClick={() => onSelectClassroom(act.classroomId)}
                  className="px-3 py-1.5 text-xs font-semibold text-ipsur-navy-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
                >
                  Ir a la Sala
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
