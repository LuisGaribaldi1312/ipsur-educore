import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import Modal from '../common/Modal';
import CountdownBadge from '../common/CountdownBadge';
import { getDeadlineStatus, formatDateTime } from '../../utils/dateFormatter';
import { 
  UploadCloud, 
  Lock, 
  AlertTriangle, 
  CheckCircle2, 
  FileText, 
  Paperclip, 
  Clock, 
  Send 
} from 'lucide-react';

export default function SubmitActivityModal({ isOpen, onClose, classroom, activity }) {
  const { currentUser, submitActivity } = useApp();

  const deadlineStatus = getDeadlineStatus(activity?.dueDate);
  const isClosed = deadlineStatus.isClosed;

  // Check if student has already submitted
  const existingSub = classroom?.submissions?.find(
    s => s.activityId === activity?.id && s.studentId === currentUser.id
  );

  const [notes, setNotes] = useState(existingSub?.notes || '');
  const [fileName, setFileName] = useState(existingSub?.fileName || `${currentUser.name.replace(/\s+/g, '_')}_Actividad.pdf`);
  const [selectedFileSimulated, setSelectedFileSimulated] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isClosed) return;

    submitActivity(classroom.id, activity.id, {
      notes,
      fileName,
      fileUrl: '#archivo-entregado-ipsur'
    });

    onClose();
  };

  const handleFakeFileUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const f = e.target.files[0];
      setSelectedFileSimulated(f.name);
      setFileName(f.name);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={existingSub ? 'Detalles de tu Entrega' : 'Entregar Actividad o Tarea'}
      subtitle={`${activity?.title} · ${classroom?.name}`}
      maxWidth="max-w-xl"
    >
      <div className="space-y-4">
        {/* Deadline Status Banner */}
        <div className={`p-4 rounded-xl border flex items-start gap-3 ${
          isClosed ? 'bg-rose-50 border-rose-300 text-rose-900' : 'bg-slate-50 border-slate-200'
        }`}>
          {isClosed ? (
            <div className="p-2 bg-rose-100 rounded-lg text-rose-600 flex-shrink-0">
              <Lock className="w-5 h-5 animate-pulse" />
            </div>
          ) : (
            <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600 flex-shrink-0">
              <Clock className="w-5 h-5" />
            </div>
          )}

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <span className={`text-xs font-bold uppercase tracking-wider ${isClosed ? 'text-rose-700' : 'text-slate-700'}`}>
                {isClosed ? 'Apartado Cerrado por Límite de Tiempo' : 'Entrega Habilitada'}
              </span>
              <CountdownBadge dueDate={activity?.dueDate} showDate={false} size="sm" />
            </div>

            <p className="text-xs mt-1 text-slate-600">
              Fecha límite oficial: <strong className="text-slate-800">{formatDateTime(activity?.dueDate)}</strong>
            </p>

            {isClosed && (
              <p className="text-xs text-rose-700 mt-2 font-medium bg-white/60 p-2 rounded border border-rose-200">
                ⛔ <strong>El tiempo reglamentario ha expirado.</strong> Pasando la fecha y hora fijada por el docente titular, el apartado se cierra de forma estricta para garantizar la equidad académica.
              </p>
            )}
          </div>
        </div>

        {/* Previous Grade & Teacher Feedback (if already graded) */}
        {existingSub && existingSub.grade !== null && existingSub.grade !== undefined && (
          <div className="p-4 bg-emerald-50/80 border border-emerald-300 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-900 uppercase tracking-wide flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Calificación Obtenida
              </span>
              <span className="text-xl font-black text-emerald-700 bg-white px-3 py-0.5 rounded-lg border border-emerald-200 shadow-sm">
                {existingSub.grade} / 100
              </span>
            </div>

            {existingSub.feedback && (
              <div className="bg-white p-3 rounded-lg border border-emerald-100 text-xs">
                <span className="font-bold text-slate-700 block mb-0.5">Retroalimentación del Profesor:</span>
                <p className="text-slate-600 italic">"{existingSub.feedback}"</p>
                <span className="text-[10px] text-slate-400 block mt-1">
                  Calificado por: {existingSub.gradedBy || classroom.teacherName} · {formatDateTime(existingSub.gradedAt)}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Form to submit (Disabled if closed) */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* File Picker Simulator */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
              <UploadCloud className="w-4 h-4 text-ipsur-pink-500" />
              Adjuntar Archivo de la Tarea (PDF, Word, Imágenes) *
            </label>

            {!isClosed ? (
              <div className="border-2 border-dashed border-slate-300 hover:border-ipsur-navy-500 rounded-xl p-4 text-center bg-slate-50 transition cursor-pointer relative group">
                <input
                  type="file"
                  onChange={handleFakeFileUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  disabled={isClosed}
                />
                <Paperclip className="w-8 h-8 text-slate-400 group-hover:text-ipsur-navy-600 mx-auto mb-1 transition" />
                <p className="text-xs font-bold text-slate-700">
                  {selectedFileSimulated || fileName || 'Arrastra tu archivo aquí o haz clic para explorar'}
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Formatos aceptados: .pdf, .docx, .xlsx, .zip (Máximo 25 MB)
                </p>
              </div>
            ) : (
              <div className="p-3 bg-slate-100 rounded-xl border border-slate-200 text-xs text-slate-500 flex items-center gap-2">
                <FileText className="w-4 h-4 text-slate-400" />
                <span>{existingSub ? `Archivo enviado: ${existingSub.fileName}` : 'No se envió ningún archivo a tiempo.'}</span>
              </div>
            )}
          </div>

          {/* Student comments */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Notas / Comentarios para el Profesor
            </label>
            <textarea
              rows={3}
              disabled={isClosed}
              placeholder="Escribe dudas, aclaraciones o resumen de tu entrega..."
              value={notes}
              onChange={e => setNotes(e.target.value)}
              className="w-full text-xs text-slate-700 bg-white border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-ipsur-navy-500 outline-none disabled:bg-slate-100 disabled:text-slate-400"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              Cerrar
            </button>

            {!isClosed && (
              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-ipsur-pink-600 hover:bg-ipsur-pink-700 rounded-lg shadow-md hover:shadow-lg transition"
              >
                <Send className="w-4 h-4" />
                <span>{existingSub ? 'Actualizar Entrega' : 'Entregar Tarea'}</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </Modal>
  );
}
