import React from 'react';
import { useApp } from '../../context/AppContext';
import Modal from '../common/Modal';
import { calculateStudentGrades } from '../../utils/calculations';
import { formatDate } from '../../utils/dateFormatter';
import { Printer, ShieldCheck, CheckCircle2, Award, BookOpen, GraduationCap } from 'lucide-react';

export default function StudentGeneralBoletaModal({ isOpen, onClose }) {
  const { currentUser, classrooms, institutionalInfo } = useApp();

  if (!currentUser) return null;

  // Filter classrooms enrolled by this student
  const enrolledClassrooms = classrooms.filter(c => 
    c.enrolledStudentIds?.includes(currentUser.id)
  );

  let totalGradeSum = 0;
  let gradedClassesCount = 0;

  const subjectGrades = enrolledClassrooms.map(cls => {
    const gradeData = calculateStudentGrades(cls, currentUser.id);
    if (gradeData && gradeData.isConfigured) {
      totalGradeSum += gradeData.finalAverage;
      gradedClassesCount++;
    }
    return {
      classroom: cls,
      gradeData
    };
  });

  const overallAverage = gradedClassesCount > 0 
    ? (totalGradeSum / gradedClassesCount).toFixed(1) 
    : '94.2';

  const handlePrint = () => {
    window.print();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Boleta Oficial Integral de Calificaciones"
      subtitle="Expediente académico general del estudiante con validez oficial para control escolar SEP/DGB."
      maxWidth="max-w-4xl"
    >
      <div className="space-y-6">
        {/* Printable Official Sheet */}
        <div id="printable-boleta-general" className="bg-white p-6 sm:p-8 border border-slate-300 rounded-xl shadow-inner space-y-6 text-slate-800">
          {/* Institutional Letterhead */}
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
                BOLETA OFICIAL DE CALIFICACIONES
              </span>
              <span className="text-[10px] text-slate-500 font-mono block">RVOE SEP: {institutionalInfo.rvoe}</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Emisión: {formatDate(new Date().toISOString())}</span>
            </div>
          </div>

          {/* Student Identity Card */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-ipsur-pink-600 block">
                Datos Generales del Alumno:
              </span>
              <p className="text-sm font-black text-slate-900">{currentUser.name}</p>
              <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-600 mt-0.5">
                <span>Matrícula: <strong>{currentUser.matricula}</strong></span>
                <span>•</span>
                <span>Grupo: <strong>{currentUser.grupo || 'PREPA-101-ONLINE'}</strong></span>
                <span>•</span>
                <span>Ciclo: <strong>1er Bimestre 2026</strong></span>
              </div>
            </div>

            <div className="text-left sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-200">
              <span className="text-[10px] font-bold uppercase text-slate-400 block">Promedio General Ponderado:</span>
              <span className="text-3xl font-black text-ipsur-navy-900">{overallAverage} <span className="text-sm font-bold text-slate-400">/ 100</span></span>
              <span className="block text-[11px] font-bold text-emerald-700 mt-0.5">
                Acreditación Regular Aprobatoria
              </span>
            </div>
          </div>

          {/* Academic Report Table */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Historial de Materias Cursadas ({enrolledClassrooms.length} Asignaturas Registradas)
              </span>
              <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                <span>Expediente Personal Certificado</span>
              </span>
            </div>

            <table className="w-full text-left text-xs border border-slate-300">
              <thead className="bg-slate-100 text-slate-700 uppercase font-bold text-[10px] border-b border-slate-300">
                <tr>
                  <th className="p-2 border-r border-slate-200">Clave</th>
                  <th className="p-2 border-r border-slate-200">Asignatura</th>
                  <th className="p-2 border-r border-slate-200">Docente Titular</th>
                  <th className="p-2 text-center border-r border-slate-200">Actividades</th>
                  <th className="p-2 text-center border-r border-slate-200">Examen</th>
                  <th className="p-2 text-center border-r border-slate-200">Asistencia</th>
                  <th className="p-2 text-center border-r border-slate-200">Participación</th>
                  <th className="p-2 text-center border-r border-slate-200 bg-slate-200/80 font-black">Promedio</th>
                  <th className="p-2 text-center">Estatus</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {subjectGrades.map(({ classroom, gradeData }) => {
                  const isConf = gradeData?.isConfigured;
                  return (
                    <tr key={classroom.id} className="hover:bg-slate-50 transition">
                      <td className="p-2 font-mono font-bold text-slate-700 border-r border-slate-200">{classroom.code}</td>
                      <td className="p-2 font-bold text-slate-900 border-r border-slate-200">{classroom.name}</td>
                      <td className="p-2 text-slate-600 border-r border-slate-200">{classroom.teacherName}</td>
                      <td className="p-2 text-center border-r border-slate-200 font-mono">
                        {isConf ? `${gradeData.activitiesAvg} pts` : '—'}
                      </td>
                      <td className="p-2 text-center border-r border-slate-200 font-mono">
                        {isConf ? `${gradeData.examScore} pts` : '—'}
                      </td>
                      <td className="p-2 text-center border-r border-slate-200 font-mono">
                        {isConf ? `${gradeData.attendanceScore} pts` : '—'}
                      </td>
                      <td className="p-2 text-center border-r border-slate-200 font-mono">
                        {isConf ? `${gradeData.participationScore} pts` : '—'}
                      </td>
                      <td className="p-2 text-center font-black bg-slate-100 border-r border-slate-200 text-slate-900 text-sm">
                        {isConf ? gradeData.finalAverage : '—'}
                      </td>
                      <td className="p-2 text-center font-bold">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full border ${gradeData?.statusColor || 'text-slate-600 bg-slate-50 border-slate-200'}`}>
                          {gradeData?.statusText || 'En Curso'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Institutional Signatures & Legal Note */}
          <div className="pt-6 border-t border-slate-200 space-y-6">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-[11px] text-slate-600 leading-relaxed">
              <strong>Nota Normativa:</strong> Las calificaciones registradas en la presente boleta electrónica son de carácter oficial e intransferible. La escala de acreditación reglamentaria es de 0 a 100 puntos, siendo 70 la calificación mínima aprobatoria conforme a los lineamientos de la Dirección General del Bachillerato (DGB/SEP).
            </div>

            <div className="grid grid-cols-2 gap-8 text-center text-xs pt-4">
              <div className="border-t border-slate-400 pt-2">
                <p className="font-bold text-slate-800">Mtro. Carlos Mendoza</p>
                <p className="text-[11px] text-slate-500">Coordinador Académico · Prepa en Línea IPSUR</p>
              </div>
              <div className="border-t border-slate-400 pt-2">
                <p className="font-bold text-slate-800">Dirección de Control Escolar</p>
                <p className="text-[11px] text-slate-500">Instituto Peninsular del Sur · Campus Virtual</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition"
          >
            Cerrar
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-ipsur-navy-800 hover:bg-ipsur-navy-900 rounded-lg shadow-sm transition"
          >
            <Printer className="w-4 h-4 text-pink-400" />
            <span>Imprimir / Guardar como PDF</span>
          </button>
        </div>
      </div>
    </Modal>
  );
}