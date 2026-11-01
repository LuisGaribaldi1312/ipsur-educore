import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import CriteriaConfigModal from './CriteriaConfigModal';
import { 
  BookOpen, 
  Users, 
  CheckSquare, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  ChevronRight, 
  Sparkles,
  ShieldAlert,
  Percent,
  PlusCircle
} from 'lucide-react';

export default function TeacherDashboard({ onSelectClassroom }) {
  const { classrooms, currentUser } = useApp();

  // Find classrooms assigned to this teacher
  const myClassrooms = classrooms.filter(c => c.teacherId === currentUser.id);
  const displayClassrooms = myClassrooms;

  const [configuringClassroom, setConfiguringClassroom] = useState(null);

  // Count pending unassigned criteria
  const unconfiguredCount = displayClassrooms.filter(c => !c.criteriaConfigured).length;

  // Calculate total pending submissions to grade
  let totalPendingGrading = 0;
  displayClassrooms.forEach(c => {
    const subs = c.submissions || [];
    totalPendingGrading += subs.filter(s => s.grade === null || s.grade === undefined).length;
  });

  return (
    <div className="space-y-6">
      {/* Teacher Hero Banner */}
      <div className="bg-gradient-to-r from-[#0A0D1B] via-[#141B41] to-[#750042] rounded-3xl p-6 sm:p-9 text-white shadow-xl border border-white/10 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-3.5 mb-3.5">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/10 backdrop-blur-md p-2 flex items-center justify-center border border-white/20 shadow-2xl flex-shrink-0">
              <img src="/ipsur-logo.png" alt="IPSUR Emblem" className="w-full h-full object-contain filter drop-shadow-[0_2px_10px_rgba(255,255,255,0.25)]" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 bg-white/15 px-3 py-0.5 rounded-full text-[11px] font-bold text-pink-200 border border-white/15">
                <BookOpen className="w-3.5 h-3.5 text-ipsur-pink-400" />
                <span>Portal del Docente Titular · Prepa en Línea IPSUR</span>
              </div>
              <p className="text-[11px] sm:text-xs text-indigo-200 mt-1 font-medium tracking-wide">Instituto Peninsular del Sur · "La educación es el camino"</p>
            </div>
          </div>

          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white leading-tight">
            Bienvenida, {currentUser.name}
          </h1>
          <p className="text-xs sm:text-sm text-indigo-100/90 mt-2.5 leading-relaxed font-normal max-w-2xl">
            {currentUser.title}. Administra tus aulas virtuales, establece los porcentajes de evaluación obligatorios al 100%, sube materiales didácticos y califica las tareas en el rango de 0 a 100.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3 text-xs">
            <span className="bg-white/15 px-3.5 py-1.5 rounded-xl border border-white/10 shadow-sm">
              Salas a tu cargo: <strong className="text-white font-bold">{displayClassrooms.length}</strong>
            </span>
            <span className="bg-white/15 px-3.5 py-1.5 rounded-xl border border-white/10 shadow-sm">
              Tareas por calificar: <strong className="text-pink-300 font-bold">{totalPendingGrading}</strong>
            </span>
          </div>
        </div>

        {/* Decorative Transparent Watermark */}
        <div className="absolute -right-4 -bottom-10 opacity-20 pointer-events-none hidden md:block">
          <img src="/ipsur-logo.png" alt="IPSUR Watermark" className="w-80 h-auto object-contain filter brightness-150 drop-shadow-2xl" />
        </div>
      </div>

      {/* Warning Banner if any classroom has unconfigured criteria */}
      {unconfiguredCount > 0 && (
        <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-amber-100 text-amber-700 rounded-xl">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-amber-900">
                Ponderaciones Pendientes de Asignar ({unconfiguredCount} {unconfiguredCount === 1 ? 'sala' : 'salas'})
              </h4>
              <p className="text-xs text-amber-800 mt-0.5">
                Por política del sistema IPSUR, debes fijar la ponderación (Actividades, Examen/Proyecto, Asistencia y Participación = 100%) antes de que la plataforma te permita crear actividades.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Classrooms Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-ipsur-navy-700" />
            <span>Mis Salas de Clases Virtuales</span>
          </h3>
          <span className="text-xs text-slate-500">
            Ciclo: 1er Bimestre 2026
          </span>
        </div>

        {displayClassrooms.length === 0 ? (
          <div className="bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 p-12 text-center space-y-2">
            <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <h4 className="text-sm font-bold text-slate-700">Sin materias asignadas actualmente</h4>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Tu Coordinación Escolar o Dirección te asignarán las salas virtuales del periodo en cuanto la programación académica esté formalizada.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
            {displayClassrooms.map(cls => {
              const isConfigured = cls.criteriaConfigured;
              const activitiesCount = cls.activities?.length || 0;
              const studentsCount = cls.enrolledStudentIds?.length || 0;

              return (
                <div
                  key={cls.id}
                  className="executive-card rounded-2xl overflow-hidden flex flex-col justify-between group hover:-translate-y-1"
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
                      Grupo: {cls.group} · {studentsCount} Alumnos
                    </p>
                  </div>

                  {/* Criteria Pill & Status */}
                  <div className="p-4 space-y-3 text-xs flex-1">
                    {isConfigured ? (
                      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 space-y-1.5">
                        <div className="flex items-center justify-between text-emerald-800 font-bold">
                          <span className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            Ponderación 100% Configurada
                          </span>
                          <button
                            onClick={() => setConfiguringClassroom(cls)}
                            className="text-[11px] underline text-emerald-700 hover:text-emerald-900"
                          >
                            Editar
                          </button>
                        </div>

                        <div className="grid grid-cols-2 gap-1 text-[11px] text-emerald-900 font-medium">
                          <span>• Actividades: {cls.criteria.activities}%</span>
                          <span>• Examen: {cls.criteria.examProject}%</span>
                          <span>• Asistencia: {cls.criteria.attendance}%</span>
                          <span>• Participación: {cls.criteria.participation}%</span>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 space-y-2">
                        <div className="flex items-center gap-1.5 text-rose-800 font-bold">
                          <AlertTriangle className="w-4 h-4 text-rose-600" />
                          <span>Ponderación Pendiente (Bloqueada)</span>
                        </div>
                        <p className="text-[11px] text-rose-700">
                          Configura el 100% reglamentario para poder asignar actividades y tareas.
                        </p>
                        <button
                          onClick={() => setConfiguringClassroom(cls)}
                          className="w-full text-center py-1.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow-sm transition"
                        >
                          Configurar Criterios Ahora
                        </button>
                      </div>
                    )}

                    {/* Summary of items */}
                    <div className="flex items-center justify-between pt-1 text-slate-600">
                      <span>Actividades asignadas:</span>
                      <strong className="text-slate-800 font-bold">{activitiesCount}</strong>
                    </div>

                    <div className="flex items-center justify-between text-slate-600">
                      <span>Recursos didácticos:</span>
                      <strong className="text-slate-800 font-bold">{cls.materials?.length || 0}</strong>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 font-mono">
                      IPSUR Prepa
                    </span>

                    <button
                      onClick={() => onSelectClassroom(cls.id)}
                      className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-ipsur-navy-700 hover:bg-ipsur-navy-800 rounded-xl shadow-sm transition"
                    >
                      <span>Abrir Classroom</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Criteria Modal */}
      {configuringClassroom && (
        <CriteriaConfigModal
          isOpen={Boolean(configuringClassroom)}
          onClose={() => setConfiguringClassroom(null)}
          classroom={configuringClassroom}
        />
      )}
    </div>
  );
}
