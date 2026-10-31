import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import Modal from '../common/Modal';
import { 
  PlusCircle, 
  Clock, 
  Calendar, 
  FileText, 
  Lock, 
  AlertTriangle, 
  Paperclip, 
  CheckCircle, 
  Sparkles,
  Layers
} from 'lucide-react';

export default function CreateActivityModal({ isOpen, onClose, classroom, onOpenCriteriaModal }) {
  const { createActivity } = useApp();

  const rubricTopics = classroom?.rubric?.topics || [];

  const [title, setTitle] = useState('');
  const [unitId, setUnitId] = useState(rubricTopics[0]?.id || 'top-1');
  const [description, setDescription] = useState('');
  
  // Set default due date to 5 days in the future at 23:59
  const defaultDueDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 5);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}T23:59`;
  };

  const [dueDate, setDueDate] = useState(defaultDueDate());
  const [attachment, setAttachment] = useState('Guia_Instrucciones_Actividad.pdf');

  // Verify if criteria are configured to 100%
  const isCriteriaLocked = !classroom?.criteriaConfigured;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isCriteriaLocked) {
      if (onOpenCriteriaModal) onOpenCriteriaModal();
      return;
    }

    if (!title.trim() || !dueDate) return;

    const selectedTopic = rubricTopics.find(t => t.id === unitId);

    const success = createActivity(classroom.id, {
      title: title.trim(),
      unitId,
      unitTitle: selectedTopic ? `${selectedTopic.unit}: ${selectedTopic.title}` : 'Tema Bimestral',
      description: description.trim(),
      dueDate,
      attachment: attachment.trim() || null
    });

    if (success) {
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Asignar Nueva Actividad o Tarea"
      subtitle={`Sala: ${classroom?.name} · Asignación con temporizador y cierre automático.`}
      maxWidth="max-w-2xl"
    >
      {/* If teacher hasn't configured criteria to 100%, show lock warning and prevent creating activities */}
      {isCriteriaLocked ? (
        <div className="py-6 px-4 text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center ring-8 ring-rose-50 shadow-inner">
            <Lock className="w-8 h-8" />
          </div>

          <div className="max-w-md mx-auto">
            <h4 className="text-base font-black text-slate-800">
              Creación de Actividades Bloqueada
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
              El reglamento institucional de <strong>IPSUR Prepa en Línea</strong> establece que antes de abrir actividades a los alumnos, debes designar la ponderación oficial (Actividades, Examen/Proyecto, Asistencia y Participación = 100%).
            </p>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-800 text-left flex items-start gap-2 max-w-md mx-auto">
            <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <span>
              Configura los 4 porcentajes requeridos en el módulo de criterios para que el sistema te permita continuar y asignar tareas.
            </span>
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                if (onOpenCriteriaModal) onOpenCriteriaModal();
              }}
              className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-ipsur-pink-600 hover:bg-ipsur-pink-700 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <Sparkles className="w-4 h-4" />
              <span>Configurar Ponderación 100% Ahora</span>
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Topic / Rubric association */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-ipsur-pink-500" />
              Vincular al Tema de la Rúbrica Oficial (Cargada por Coordinador) *
            </label>
            <select
              required
              value={unitId}
              onChange={e => setUnitId(e.target.value)}
              className="w-full text-xs font-medium text-slate-800 bg-slate-50 border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-ipsur-navy-500 outline-none"
            >
              {rubricTopics.map(topic => (
                <option key={topic.id} value={topic.id}>
                  {topic.unit}: {topic.title} ({topic.weeks})
                </option>
              ))}
            </select>
          </div>

          {/* Activity Title */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Título de la Actividad o Tarea *
            </label>
            <input
              type="text"
              required
              placeholder="Ej. Actividad 3: Taller de Factorización y Casos Especiales"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full text-xs font-medium text-slate-800 bg-white border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-ipsur-navy-500 outline-none"
            />
          </div>

          {/* Detailed Instructions */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Instrucciones y Especificaciones de Entrega *
            </label>
            <textarea
              rows={4}
              required
              placeholder="Escribe el paso a paso, formato de entrega (PDF, Word, etc.), criterios y metodología..."
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full text-xs text-slate-700 bg-white border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-ipsur-navy-500 outline-none"
            />
          </div>

          {/* Due Date & Strict Closing Mechanism */}
          <div className="bg-gradient-to-r from-rose-50 to-pink-50 p-3.5 rounded-xl border border-rose-200">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-rose-900 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-rose-600" />
                Fecha y Hora Límite de Entrega (Cierre Estricto) *
              </label>
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 bg-rose-100/80 px-2 py-0.5 rounded">
                Bloqueo Automático
              </span>
            </div>

            <input
              type="datetime-local"
              required
              value={dueDate}
              onChange={e => setDueDate(e.target.value)}
              className="w-full text-xs font-bold text-slate-800 bg-white border border-rose-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-rose-500 outline-none"
            />

            <p className="text-[11px] text-rose-800 mt-2 leading-relaxed">
              ⚠️ <strong>Regla del sistema:</strong> Pasando la fecha y hora asignada el apartado se cerrará automáticamente y los estudiantes no podrán enviar entregas extemporáneas.
            </p>
          </div>

          {/* Grading Scale Note */}
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-700">
              Escala de Calificación Institucional:
            </span>
            <span className="font-bold text-ipsur-navy-800 bg-white px-2.5 py-1 rounded border border-slate-200">
              0 a 100 Puntos
            </span>
          </div>

          {/* Optional Attachment */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
              <Paperclip className="w-3.5 h-3.5 text-slate-400" />
              Archivo o Guía Anexa para los Alumnos (Opcional)
            </label>
            <input
              type="text"
              placeholder="Ej. Taller_Ejercicios_Factorizacion.pdf"
              value={attachment}
              onChange={e => setAttachment(e.target.value)}
              className="w-full text-xs text-slate-700 bg-white border border-slate-300 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-ipsur-navy-500 outline-none font-mono"
            />
          </div>

          {/* Modal Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2 text-xs font-bold text-white bg-ipsur-navy-700 hover:bg-ipsur-navy-800 rounded-lg shadow-md transition"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Publicar Actividad en la Sala</span>
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}
