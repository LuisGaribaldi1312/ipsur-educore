import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import Modal from '../common/Modal';
import { formatDateTime } from '../../utils/dateFormatter';
import { 
  CheckCircle, 
  Clock, 
  FileText, 
  Award, 
  MessageSquare, 
  User, 
  ExternalLink, 
  Save, 
  AlertCircle 
} from 'lucide-react';

export default function GradeSubmissionsModal({ isOpen, onClose, classroom, activity }) {
  const { users, gradeSubmission } = useApp();

  const enrolledStudents = users.filter(u => classroom?.enrolledStudentIds?.includes(u.id));
  const submissions = classroom?.submissions?.filter(s => s.activityId === activity?.id) || [];

  const [selectedStudentId, setSelectedStudentId] = useState(enrolledStudents[0]?.id || null);
  const [gradeInput, setGradeInput] = useState('');
  const [feedbackInput, setFeedbackInput] = useState('');

  const currentSubmission = submissions.find(s => s.studentId === selectedStudentId);
  const currentStudent = enrolledStudents.find(s => s.id === selectedStudentId);

  // When switching student, populate current grade/feedback
  const handleSelectStudent = (sId) => {
    setSelectedStudentId(sId);
    const sub = submissions.find(s => s.studentId === sId);
    setGradeInput(sub?.grade !== undefined && sub?.grade !== null ? String(sub.grade) : '');
    setFeedbackInput(sub?.feedback || '');
  };

  const handleSaveGrade = (e) => {
    e.preventDefault();
    if (!currentSubmission) return;

    const num = Number(gradeInput);
    if (isNaN(num) || num < 0 || num > 100) return;

    gradeSubmission(classroom.id, currentSubmission.id, num, feedbackInput);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Calificador de Entregas (Escala 0 a 100)"
      subtitle={`${activity?.title} · ${classroom?.name}`}
      maxWidth="max-w-4xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Left Column: Student List & Delivery Status */}
        <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
          <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Estudiantes ({enrolledStudents.length})
            </h4>
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              {submissions.filter(s => s.grade !== null).length} / {submissions.length} Calificados
            </span>
          </div>

          <div className="divide-y divide-slate-100 max-h-[420px] overflow-y-auto">
            {enrolledStudents.map(student => {
              const sub = submissions.find(s => s.studentId === student.id);
              const isSelected = student.id === selectedStudentId;
              const hasDelivered = Boolean(sub);
              const isGraded = hasDelivered && sub.grade !== null && sub.grade !== undefined;

              return (
                <button
                  key={student.id}
                  onClick={() => handleSelectStudent(student.id)}
                  className={`w-full text-left p-3 flex items-start gap-2.5 transition ${
                    isSelected ? 'bg-indigo-50/80 border-l-4 border-ipsur-navy-600' : 'hover:bg-slate-50'
                  }`}
                >
                  <img
                    src={student.avatar}
                    alt={student.name}
                    className="w-8 h-8 rounded-full object-cover border mt-0.5"
                  />
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-bold truncate ${isSelected ? 'text-ipsur-navy-900' : 'text-slate-800'}`}>
                      {student.name}
                    </p>
                    <p className="text-[10px] text-slate-400 font-mono">{student.matricula}</p>

                    <div className="mt-1 flex items-center gap-1.5">
                      {isGraded ? (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-1.5 py-0.2 rounded">
                          Calificado: {sub.grade}/100
                        </span>
                      ) : hasDelivered ? (
                        <span className="text-[10px] font-semibold text-blue-700 bg-blue-100/70 px-1.5 py-0.2 rounded">
                          Entregado (Por calificar)
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.2 rounded">
                          Sin entrega
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Grading Workspace for Selected Student */}
        <div className="md:col-span-2 space-y-4">
          {currentStudent ? (
            <div>
              {/* Student Header */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={currentStudent.avatar}
                    alt={currentStudent.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">{currentStudent.name}</h4>
                    <p className="text-xs text-slate-500 font-mono">{currentStudent.matricula} · {currentStudent.email}</p>
                  </div>
                </div>

                {currentSubmission?.grade !== null && currentSubmission?.grade !== undefined && (
                  <div className="text-right">
                    <span className="text-xs text-slate-500 block">Calificación Actual</span>
                    <span className="text-lg font-black text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-lg">
                      {currentSubmission.grade} / 100
                    </span>
                  </div>
                )}
              </div>

              {/* Delivery Details or Missing Banner */}
              {currentSubmission ? (
                <div className="mt-4 space-y-4">
                  {/* File card */}
                  <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-700 flex items-center gap-1.5">
                        <FileText className="w-4 h-4 text-ipsur-navy-600" />
                        Archivo Entregado por el Alumno
                      </span>
                      <span className="text-[11px] text-slate-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatDateTime(currentSubmission.submittedAt)}
                      </span>
                    </div>

                    <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-slate-800 truncate font-mono">
                          {currentSubmission.fileName}
                        </p>
                        {currentSubmission.notes && (
                          <p className="text-xs text-slate-600 mt-1 italic">
                            "{currentSubmission.notes}"
                          </p>
                        )}
                      </div>
                      <a
                        href={currentSubmission.fileUrl}
                        onClick={(e) => { e.preventDefault(); alert(`Descargando archivo simulado: ${currentSubmission.fileName}`); }}
                        className="ml-3 flex items-center gap-1 px-3 py-1 text-xs font-semibold text-ipsur-navy-700 bg-white border border-slate-300 rounded hover:bg-slate-100 transition shadow-sm flex-shrink-0"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Ver Archivo</span>
                      </a>
                    </div>
                  </div>

                  {/* Grading Form */}
                  <form onSubmit={handleSaveGrade} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-ipsur-navy-900 uppercase tracking-wider flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-ipsur-pink-500" />
                        Asignar Calificación (0 a 100) *
                      </label>
                      <span className="text-xs text-slate-500">Rango permitido: 0 - 100 pts</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        step="1"
                        required
                        placeholder="Ej. 95"
                        value={gradeInput}
                        onChange={e => setGradeInput(e.target.value)}
                        className="w-32 text-center text-xl font-black text-ipsur-navy-800 bg-white border-2 border-slate-300 rounded-xl py-2 focus:ring-2 focus:ring-ipsur-navy-500 outline-none"
                      />
                      <span className="text-sm font-bold text-slate-600">/ 100 Puntos</span>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                        <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                        Retroalimentación Docente (Comentario de Evaluación)
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Escribe comentarios cualitativos, observaciones sobre aciertos y áreas de mejora..."
                        value={feedbackInput}
                        onChange={e => setFeedbackInput(e.target.value)}
                        className="w-full text-xs text-slate-700 bg-white border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-ipsur-navy-500 outline-none"
                      />
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button
                        type="submit"
                        className="flex items-center gap-2 px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-md transition"
                      >
                        <Save className="w-4 h-4" />
                        <span>Guardar Calificación en Boleta</span>
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="mt-8 text-center p-8 border-2 border-dashed border-slate-200 rounded-2xl bg-white">
                  <AlertCircle className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                  <h5 className="text-sm font-bold text-slate-700">Sin entrega registrada</h5>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
                    El alumno aún no ha enviado su entrega para esta actividad o la fecha límite venció sin registro.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center p-8 text-slate-400">
              Selecciona un estudiante para comenzar a calificar.
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
