import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import Modal from '../common/Modal';
import { validateCriteria } from '../../utils/calculations';
import { Percent, CheckCircle2, AlertCircle, ShieldAlert, Award, Calendar, CheckCheck } from 'lucide-react';

export default function CriteriaConfigModal({ isOpen, onClose, classroom }) {
  const { setEvaluationCriteria } = useApp();

  const currentCriteria = classroom?.criteria || {
    activities: 40,
    examProject: 30,
    attendance: 15,
    participation: 15
  };

  const [activities, setActivities] = useState(currentCriteria.activities || 40);
  const [examProject, setExamProject] = useState(currentCriteria.examProject || 30);
  const [attendance, setAttendance] = useState(currentCriteria.attendance || 15);
  const [participation, setParticipation] = useState(currentCriteria.participation || 15);

  const validation = validateCriteria({
    activities,
    examProject,
    attendance,
    participation
  });

  const handleSave = (e) => {
    e.preventDefault();
    if (!validation.isValid) return;

    const ok = setEvaluationCriteria(classroom.id, {
      activities,
      examProject,
      attendance,
      participation
    });

    if (ok) {
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Configuración Obligatoria de Criterios de Evaluación"
      subtitle={`Sala: ${classroom?.name} · Establece los porcentajes antes de crear actividades.`}
      maxWidth="max-w-xl"
    >
      <form onSubmit={handleSave} className="space-y-5">
        {/* Institutional Directive Box */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-700 space-y-1">
          <div className="flex items-center gap-2 font-bold text-ipsur-navy-800">
            <ShieldAlert className="w-4 h-4 text-ipsur-pink-500" />
            <span>Regla Estricta del Sistema Educativo IPSUR:</span>
          </div>
          <p className="text-slate-600 leading-relaxed">
            Como profesor debes designar los valores porcentuales para cada uno de los 4 rubros:
            <strong> Actividades, Examen o Proyecto, Asistencia y Participación</strong>.
            La suma debe totalizar <strong>exactamente el 100%</strong> sin exceder ni faltar valor para desbloquear la asignación de actividades.
          </p>
        </div>

        {/* 4 Inputs Grid */}
        <div className="space-y-3">
          {/* 1. Actividades o Tareas */}
          <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white hover:border-indigo-300 transition">
            <div className="flex-1 pr-3">
              <label className="text-xs font-bold text-slate-800 block">
                1. Actividades y Tareas en Línea
              </label>
              <span className="text-[11px] text-slate-500 block">
                Promedio de todas las actividades entregadas y calificadas de 0 a 100.
              </span>
            </div>
            <div className="flex items-center gap-1.5 w-28">
              <input
                type="number"
                min="0"
                max="100"
                required
                value={activities}
                onChange={e => setActivities(Number(e.target.value))}
                className="w-full text-center text-sm font-bold text-ipsur-navy-800 bg-slate-50 border border-slate-300 rounded-lg py-1.5 focus:ring-2 focus:ring-ipsur-navy-500 outline-none"
              />
              <span className="text-xs font-bold text-slate-500">%</span>
            </div>
          </div>

          {/* 2. Examen o Proyecto */}
          <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white hover:border-indigo-300 transition">
            <div className="flex-1 pr-3">
              <label className="text-xs font-bold text-slate-800 block">
                2. Examen Bimestral o Proyecto Integrador
              </label>
              <span className="text-[11px] text-slate-500 block">
                Evaluación sumativa o proyecto final de aplicación del curso.
              </span>
            </div>
            <div className="flex items-center gap-1.5 w-28">
              <input
                type="number"
                min="0"
                max="100"
                required
                value={examProject}
                onChange={e => setExamProject(Number(e.target.value))}
                className="w-full text-center text-sm font-bold text-ipsur-navy-800 bg-slate-50 border border-slate-300 rounded-lg py-1.5 focus:ring-2 focus:ring-ipsur-navy-500 outline-none"
              />
              <span className="text-xs font-bold text-slate-500">%</span>
            </div>
          </div>

          {/* 3. Asistencia */}
          <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white hover:border-indigo-300 transition">
            <div className="flex-1 pr-3">
              <label className="text-xs font-bold text-slate-800 block">
                3. Asistencia Virtual a Sesiones
              </label>
              <span className="text-[11px] text-slate-500 block">
                Asistencia y permanencia en las clases en línea por videoconferencia.
              </span>
            </div>
            <div className="flex items-center gap-1.5 w-28">
              <input
                type="number"
                min="0"
                max="100"
                required
                value={attendance}
                onChange={e => setAttendance(Number(e.target.value))}
                className="w-full text-center text-sm font-bold text-ipsur-navy-800 bg-slate-50 border border-slate-300 rounded-lg py-1.5 focus:ring-2 focus:ring-ipsur-navy-500 outline-none"
              />
              <span className="text-xs font-bold text-slate-500">%</span>
            </div>
          </div>

          {/* 4. Participación */}
          <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white hover:border-indigo-300 transition">
            <div className="flex-1 pr-3">
              <label className="text-xs font-bold text-slate-800 block">
                4. Participación Activa y Foros
              </label>
              <span className="text-[11px] text-slate-500 block">
                Intervención en foros de discusión y resolución colaborativa.
              </span>
            </div>
            <div className="flex items-center gap-1.5 w-28">
              <input
                type="number"
                min="0"
                max="100"
                required
                value={participation}
                onChange={e => setParticipation(Number(e.target.value))}
                className="w-full text-center text-sm font-bold text-ipsur-navy-800 bg-slate-50 border border-slate-300 rounded-lg py-1.5 focus:ring-2 focus:ring-ipsur-navy-500 outline-none"
              />
              <span className="text-xs font-bold text-slate-500">%</span>
            </div>
          </div>
        </div>

        {/* Live Total Calculator Bar */}
        <div className={`p-4 rounded-xl border transition-all ${
          validation.isValid 
            ? 'bg-emerald-50/80 border-emerald-300 text-emerald-900' 
            : 'bg-rose-50/80 border-rose-300 text-rose-900'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {validation.isValid ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              ) : (
                <AlertCircle className="w-5 h-5 text-rose-600" />
              )}
              <span className="text-xs font-bold">
                {validation.isValid ? 'Total Criterios Válido' : 'Ponderación Incompleta / Inválida'}
              </span>
            </div>
            <div className="text-right">
              <span className={`text-xl font-black ${validation.isValid ? 'text-emerald-700' : 'text-rose-700'}`}>
                {validation.total}%
              </span>
              <span className="text-xs text-slate-500 block">/ 100% Requerido</span>
            </div>
          </div>

          <p className="text-xs mt-2 font-medium">
            {validation.message}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition"
          >
            Cancelar
          </button>

          <button
            type="submit"
            disabled={!validation.isValid}
            className={`flex items-center gap-2 px-5 py-2.5 text-xs font-bold rounded-lg shadow-md transition ${
              validation.isValid
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer hover:shadow-lg'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <CheckCheck className="w-4 h-4" />
            <span>Guardar Ponderación y Habilitar Actividades</span>
          </button>
        </div>
      </form>
    </Modal>
  );
}
