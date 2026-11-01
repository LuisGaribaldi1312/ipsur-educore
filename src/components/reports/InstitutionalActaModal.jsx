import React from 'react';
import { useApp } from '../../context/AppContext';
import Modal from '../common/Modal';
import { calculateStudentGrades } from '../../utils/calculations';
import { formatDate, formatDateTime } from '../../utils/dateFormatter';
import { Printer, ShieldCheck, CheckCircle2, Award, Lock, FileText, User } from 'lucide-react';

export default function InstitutionalActaModal({ isOpen, onClose, classroom }) {
  const { users, currentUser, institutionalInfo } = useApp();

  if (!classroom) return null;

  const isStudent = currentUser.role === 'student';
  const allEnrolledStudents = users.filter(u => classroom.enrolledStudentIds?.includes(u.id));

  // CRITICAL PRIVACY: If logged in as student, ONLY render this student's record!
  const targetStudents = isStudent
    ? allEnrolledStudents.filter(u => u.id === currentUser.id)
    : allEnrolledStudents;

  const handlePrint = () => {
    window.print();
  };

  const myGrade = isStudent ? calculateStudentGrades(classroom, currentUser.id) : null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isStudent ? 'Boleta Oficial Individual de Calificaciones' : 'Acta Oficial de Evaluación y Acreditación Académica'}
      subtitle={isStudent ? 'Expediente personal y confidencial del estudiante con validez oficial para control escolar.' : 'Documento normativo institucional con validez para control escolar.'}
      maxWidth="max-w-4xl"
    >
      <div className="space-y-6">
        {/* Printable Sheet */}
        <div id="printable-acta" className="bg-white p-6 sm:p-8 border border-slate-300 rounded-xl shadow-inner space-y-6 text-slate-800">
          {/* Official Letterhead */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b-2 border-ipsur-navy-800 pb-4">
            <div className="flex items-center gap-4">
              <img 
                src="/ipsur-logo.png" 
                alt="IPSUR Logo Oficial" 
                className="h-16 w-auto object-contain filter drop-shadow-sm"
              />
              <div>
                <h2 className="text-base font-black tracking-tight text-ipsur-navy-900 uppercase">
                  {institutionalInfo.schoolName}
                </h2>
                <p className="text-xs italic text-ipsur-pink-600 font-serif">
                  "{institutionalInfo.schoolMotto}"
                </p>
                <p className="text-[10px] text-slate-500 font-semibold tracking-wide mt-0.5">
                  PREPARATORIA EN LÍNEA · SISTEMA ESCOLAR INTEGRAL EDUCORE
                </p>
              </div>
            </div>

            <div className="text-center sm:text-right text-xs">
              <span className="font-bold text-slate-800 block text-sm">
                {isStudent ? 'BOLETA PERSONAL DE CALIFICACIONES' : 'ACTA GENERAL DE EVALUACIÓN'}
              </span>
              <span className="text-[10px] text-slate-500 font-mono block">RVOE SEP: {institutionalInfo.rvoe}</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Emisión Oficial: {formatDate(new Date().toISOString())}</span>
            </div>
          </div>

          {/* Student Identity Card (Rendered when viewing as student) */}
          {isStudent && (
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-ipsur-pink-600 block">
                  Datos del Estudiante Acreditado:
                </span>
                <p className="text-sm font-black text-slate-900">{currentUser.name}</p>
                <p className="text-xs font-mono text-slate-600">Matrícula: <strong>{currentUser.matricula}</strong> · Grupo: <strong>{currentUser.grupo || classroom.group}</strong></p>
              </div>

              <div className="text-left sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-200">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Promedio Final Ponderado:</span>
                <span className="text-2xl font-black text-ipsur-navy-900">{myGrade?.finalAverage} / 100</span>
                <span className={`block text-[11px] font-bold ${myGrade?.finalAverage >= 70 ? 'text-emerald-700' : 'text-rose-700'}`}>
                  {myGrade?.statusText}
                </span>
              </div>
            </div>
          )}

          {/* Subject & Group Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-3.5 rounded-lg border border-slate-200 text-xs">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Asignatura:</span>
              <span className="font-bold text-slate-800">{classroom.name}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Código / Clave:</span>
              <span className="font-mono font-bold text-slate-800">{classroom.code}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Ciclo Escolar:</span>
              <span className="font-bold text-slate-800">{classroom.periodName}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Docente Titular:</span>
              <span className="font-bold text-slate-800">{classroom.teacherName}</span>
            </div>
          </div>

          {/* Criteria Breakdown */}
          <div className="text-xs text-slate-600 flex flex-wrap items-center justify-between gap-2 border-l-4 border-ipsur-pink-500 pl-3 py-1 bg-pink-50/40">
            <span className="font-bold text-slate-700">Ponderaciones Oficiales Aprobadas:</span>
            <div className="flex gap-3 text-[11px] font-semibold">
              <span>Actividades: {classroom.criteria?.activities || 0}%</span>
              <span>Examen/Proyecto: {classroom.criteria?.examProject || 0}%</span>
              <span>Asistencia: {classroom.criteria?.attendance || 0}%</span>
              <span>Participación: {classroom.criteria?.participation || 0}%</span>
              <span className="text-ipsur-pink-700 font-bold">Total: 100%</span>
            </div>
          </div>

          {/* Official Evaluation Table */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                {isStudent ? 'Resumen Curricular y Calificaciones del Estudiante' : `Relación de Estudiantes (${targetStudents.length} Alumnos Registrados)`}
              </span>
              {isStudent && (
                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  🔒 Registro Personal Confidencial
                </span>
              )}
            </div>

            <table className="w-full text-left text-xs border border-slate-300">
              <thead className="bg-slate-100 text-slate-700 uppercase font-bold text-[10px] border-b border-slate-300">
                <tr>
                  <th className="p-2 border-r border-slate-200">#</th>
                  <th className="p-2 border-r border-slate-200">Matrícula</th>
                  <th className="p-2 border-r border-slate-200">Nombre del Alumno</th>
                  <th className="p-2 text-center border-r border-slate-200">Actividades ({classroom.criteria?.activities || 0}%)</th>
                  <th className="p-2 text-center border-r border-slate-200">Examen ({classroom.criteria?.examProject || 0}%)</th>
                  <th className="p-2 text-center border-r border-slate-200">Asistencia ({classroom.criteria?.attendance || 0}%)</th>
                  <th className="p-2 text-center border-r border-slate-200">Participación ({classroom.criteria?.participation || 0}%)</th>
                  <th className="p-2 text-center border-r border-slate-200 bg-slate-200/80 font-black">Promedio Final</th>
                  <th className="p-2 text-center">Acreditación</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {targetStudents.map((st, i) => {
                  const g = calculateStudentGrades(classroom, st.id);
                  return (
                    <tr key={st.id}>
                      <td className="p-2 text-center font-mono border-r border-slate-200">{i + 1}</td>
                      <td className="p-2 font-mono text-slate-600 border-r border-slate-200">{st.matricula}</td>
                      <td className="p-2 font-bold text-slate-800 border-r border-slate-200">{st.name}</td>
                      <td className="p-2 text-center border-r border-slate-200">{g.activitiesAvg} pts</td>
                      <td className="p-2 text-center border-r border-slate-200">{g.examScore} pts</td>
                      <td className="p-2 text-center border-r border-slate-200">{g.attendanceScore} pts</td>
                      <td className="p-2 text-center border-r border-slate-200">{g.participationScore} pts</td>
                      <td className="p-2 text-center font-black bg-slate-100 border-r border-slate-200 text-slate-900 text-sm">
                        {g.finalAverage}
                      </td>
                      <td className="p-2 text-center font-bold">
                        <span className={g.finalAverage >= 70 ? 'text-emerald-700' : 'text-rose-700'}>
                          {g.statusText}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Student Personal Activities Breakdown (ONLY rendered when viewing personal boleta) */}
          {isStudent && (
            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                Desglose Individual de Tareas y Actividades Entregadas por el Alumno:
              </span>

              <table className="w-full text-left text-xs border border-slate-300">
                <thead className="bg-slate-100 text-slate-700 uppercase font-bold text-[10px] border-b border-slate-300">
                  <tr>
                    <th className="p-2 border-r border-slate-200">Actividad / Tarea</th>
                    <th className="p-2 border-r border-slate-200">Unidad</th>
                    <th className="p-2 text-center border-r border-slate-200">Fecha de Entrega</th>
                    <th className="p-2 text-center border-r border-slate-200">Calificación (0 - 100)</th>
                    <th className="p-2">Retroalimentación del Docente</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {(classroom.activities || []).map(act => {
                    const sub = (classroom.submissions || []).find(
                      s => s.activityId === act.id && s.studentId === currentUser.id
                    );
                    return (
                      <tr key={act.id}>
                        <td className="p-2 font-bold text-slate-800 border-r border-slate-200">{act.title}</td>
                        <td className="p-2 text-[11px] text-slate-500 border-r border-slate-200">{act.unitTitle || 'Tema'}</td>
                        <td className="p-2 text-center text-[11px] text-slate-600 border-r border-slate-200">
                          {sub?.submittedAt ? formatDateTime(sub.submittedAt) : 'Sin entrega'}
                        </td>
                        <td className="p-2 text-center font-black border-r border-slate-200 text-slate-900">
                          {sub && sub.grade !== null && sub.grade !== undefined ? (
                            <span className="text-emerald-700">{sub.grade} / 100</span>
                          ) : sub ? (
                            <span className="text-blue-600 font-semibold">En revisión</span>
                          ) : (
                            <span className="text-rose-600">0 / 100</span>
                          )}
                        </td>
                        <td className="p-2 text-[11px] text-slate-600 italic">
                          {sub?.feedback ? `"${sub.feedback}"` : 'Sin comentarios registrados'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Institutional Signatures */}
          <div className="pt-8 grid grid-cols-2 gap-8 text-center text-xs">
            <div className="border-t border-slate-400 pt-2">
              <p className="font-bold text-slate-800">{classroom.teacherName}</p>
              <p className="text-[11px] text-slate-500">Docente Titular de la Asignatura</p>
            </div>
            <div className="border-t border-slate-400 pt-2">
              <p className="font-bold text-slate-800">Mtro. Carlos Mendoza</p>
              <p className="text-[11px] text-slate-500">Coordinación de Control Escolar IPSUR</p>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
          >
            Cerrar
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-2 text-xs font-bold text-white bg-ipsur-navy-700 hover:bg-ipsur-navy-800 rounded-lg shadow transition"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir / Guardar en PDF</span>
          </button>
        </div>
      </div>
    </Modal>
  );
}
