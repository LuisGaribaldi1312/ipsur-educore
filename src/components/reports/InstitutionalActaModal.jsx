import React from 'react';
import { useApp } from '../../context/AppContext';
import Modal from '../common/Modal';
import { calculateStudentGrades } from '../../utils/calculations';
import { formatDate } from '../../utils/dateFormatter';
import { Printer, Download, Award, ShieldCheck } from 'lucide-react';

export default function InstitutionalActaModal({ isOpen, onClose, classroom }) {
  const { users, institutionalInfo } = useApp();

  if (!classroom) return null;

  const enrolledStudents = users.filter(u => classroom.enrolledStudentIds?.includes(u.id));

  const handlePrint = () => {
    window.print();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Acta Oficial de Evaluación y Acreditación Académica"
      subtitle="Documento normativo institucional con validez para control escolar."
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
                className="h-16 w-auto object-contain"
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
              <span className="font-bold text-slate-700 block">ACTA DE EVALUACIÓN</span>
              <span className="text-[10px] text-slate-500 font-mono block">RVOE: {institutionalInfo.rvoe}</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Emisión: {formatDate(new Date().toISOString())}</span>
            </div>
          </div>

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

          {/* Students Grades Table */}
          <table className="w-full text-left text-xs border border-slate-300">
            <thead className="bg-slate-100 text-slate-700 uppercase font-bold text-[10px] border-b border-slate-300">
              <tr>
                <th className="p-2 border-r border-slate-200">#</th>
                <th className="p-2 border-r border-slate-200">Matrícula</th>
                <th className="p-2 border-r border-slate-200">Nombre del Alumno</th>
                <th className="p-2 text-center border-r border-slate-200">Actividades</th>
                <th className="p-2 text-center border-r border-slate-200">Examen</th>
                <th className="p-2 text-center border-r border-slate-200">Asistencia</th>
                <th className="p-2 text-center border-r border-slate-200">Participación</th>
                <th className="p-2 text-center border-r border-slate-200 bg-slate-200/80 font-black">Promedio</th>
                <th className="p-2 text-center">Acreditación</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {enrolledStudents.map((st, i) => {
                const g = calculateStudentGrades(classroom, st.id);
                return (
                  <tr key={st.id}>
                    <td className="p-2 text-center font-mono border-r border-slate-200">{i + 1}</td>
                    <td className="p-2 font-mono text-slate-600 border-r border-slate-200">{st.matricula}</td>
                    <td className="p-2 font-bold text-slate-800 border-r border-slate-200">{st.name}</td>
                    <td className="p-2 text-center border-r border-slate-200">{g.activitiesAvg}</td>
                    <td className="p-2 text-center border-r border-slate-200">{g.examScore}</td>
                    <td className="p-2 text-center border-r border-slate-200">{g.attendanceScore}</td>
                    <td className="p-2 text-center border-r border-slate-200">{g.participationScore}</td>
                    <td className="p-2 text-center font-black bg-slate-100 border-r border-slate-200 text-slate-900">
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
