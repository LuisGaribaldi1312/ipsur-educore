import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import Modal from '../common/Modal';
import { UserCheck, CheckCircle2, Award, Percent, Save } from 'lucide-react';

export default function AttendanceAssessmentModal({ isOpen, onClose, classroom }) {
  const { users, updateStudentAssessment } = useApp();

  const enrolledStudents = users.filter(u => classroom?.enrolledStudentIds?.includes(u.id));
  
  // Local state for all student evaluations
  const [assessments, setAssessments] = useState(() => {
    const initial = {};
    enrolledStudents.forEach(st => {
      const existing = classroom?.studentAssessments?.[st.id] || {
        examScore: 0,
        attendanceScore: 100,
        participationScore: 100
      };
      initial[st.id] = { ...existing };
    });
    return initial;
  });

  const handleChange = (studentId, field, val) => {
    const num = Math.min(100, Math.max(0, Number(val) || 0));
    setAssessments(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [field]: num
      }
    }));
  };

  const handleSaveAll = () => {
    Object.keys(assessments).forEach(sId => {
      updateStudentAssessment(classroom.id, sId, assessments[sId]);
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Registro de Examen, Asistencia y Participación"
      subtitle={`Sala: ${classroom?.name} · Calificaciones complementarias para el cálculo del promedio.`}
      maxWidth="max-w-4xl"
    >
      <div className="space-y-4">
        {/* Banner with Criteria weights */}
        <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div>
            <span className="font-bold text-slate-800 block">Ponderación Oficial de la Materia:</span>
            <span className="text-slate-500">Configurada al 100% por el docente titular</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-semibold">
              Actividades: {classroom?.criteria?.activities || 0}%
            </span>
            <span className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded font-semibold">
              Examen/Proyecto: {classroom?.criteria?.examProject || 0}%
            </span>
            <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-semibold">
              Asistencia: {classroom?.criteria?.attendance || 0}%
            </span>
            <span className="bg-pink-100 text-pink-800 px-2 py-0.5 rounded font-semibold">
              Participación: {classroom?.criteria?.participation || 0}%
            </span>
          </div>
        </div>

        {/* Student Table */}
        <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-700 uppercase font-bold text-[11px] border-b border-slate-200">
                <tr>
                  <th className="p-3">Estudiante</th>
                  <th className="p-3 text-center">Examen / Proyecto (0-100)</th>
                  <th className="p-3 text-center">Asistencia Virtual (0-100)</th>
                  <th className="p-3 text-center">Participación / Foros (0-100)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {enrolledStudents.map(student => {
                  const data = assessments[student.id] || { examScore: 0, attendanceScore: 100, participationScore: 100 };
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
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={data.examScore}
                          onChange={e => handleChange(student.id, 'examScore', e.target.value)}
                          className="w-20 text-center font-bold text-slate-800 bg-slate-50 border border-slate-300 rounded-lg py-1 px-2 focus:ring-2 focus:ring-ipsur-navy-500 outline-none mx-auto block"
                        />
                      </td>

                      <td className="p-3 text-center">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={data.attendanceScore}
                          onChange={e => handleChange(student.id, 'attendanceScore', e.target.value)}
                          className="w-20 text-center font-bold text-slate-800 bg-slate-50 border border-slate-300 rounded-lg py-1 px-2 focus:ring-2 focus:ring-ipsur-navy-500 outline-none mx-auto block"
                        />
                      </td>

                      <td className="p-3 text-center">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={data.participationScore}
                          onChange={e => handleChange(student.id, 'participationScore', e.target.value)}
                          className="w-20 text-center font-bold text-slate-800 bg-slate-50 border border-slate-300 rounded-lg py-1 px-2 focus:ring-2 focus:ring-ipsur-navy-500 outline-none mx-auto block"
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSaveAll}
            className="flex items-center gap-2 px-5 py-2 text-xs font-bold text-white bg-ipsur-navy-700 hover:bg-ipsur-navy-800 rounded-lg shadow-md transition"
          >
            <Save className="w-4 h-4" />
            <span>Guardar Evaluaciones Complementarias</span>
          </button>
        </div>
      </div>
    </Modal>
  );
}
