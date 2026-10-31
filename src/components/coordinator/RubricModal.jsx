import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import Modal from '../common/Modal';
import { 
  FileText, 
  Calendar, 
  CheckCircle, 
  BookOpen, 
  User, 
  Award, 
  Edit3, 
  Save, 
  Plus, 
  Trash2,
  Layers
} from 'lucide-react';

export default function RubricModal({ isOpen, onClose, classroom }) {
  const { currentUser, updateClassroomRubric } = useApp();
  const isCoordinator = currentUser.role === 'coordinator';

  const rubric = classroom?.rubric || {
    uploadedBy: 'Coordinación Escolar IPSUR',
    uploadedAt: new Date().toISOString(),
    generalObjective: 'Sin objetivo especificado.',
    topics: []
  };

  const [isEditing, setIsEditing] = useState(false);
  const [generalObjective, setGeneralObjective] = useState(rubric.generalObjective);
  const [topics, setTopics] = useState(rubric.topics || []);

  const handleSave = () => {
    updateClassroomRubric(classroom.id, {
      ...rubric,
      generalObjective,
      topics
    });
    setIsEditing(false);
  };

  const handleAddTopic = () => {
    const nextIdx = topics.length + 1;
    setTopics(prev => [
      ...prev,
      {
        id: `top-edit-${Date.now()}`,
        unit: `Unidad ${nextIdx}`,
        title: `Unidad ${nextIdx}: Nuevo Tema`,
        weeks: `Semanas ${nextIdx * 2 - 1} y ${nextIdx * 2}`,
        learningGoals: 'Objetivos de la unidad.',
        keyReadings: 'Manual IPSUR.'
      }
    ]);
  };

  const handleTopicChange = (idx, field, val) => {
    setTopics(prev => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], [field]: val };
      return copy;
    });
  };

  const handleRemoveTopic = (idx) => {
    setTopics(prev => prev.filter((_, i) => i !== idx));
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Rúbrica Oficial y Temario del Periodo`}
      subtitle={`${classroom?.name} · ${classroom?.periodName} (${classroom?.group})`}
      maxWidth="max-w-4xl"
    >
      <div className="space-y-6">
        {/* Banner with metadata */}
        <div className="bg-gradient-to-r from-ipsur-navy-50 to-pink-50 p-4 rounded-xl border border-indigo-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-ipsur-navy-600 text-white rounded-lg shadow-sm">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">
                Documento Oficial de Coordinación Escolar
              </p>
              <p className="text-[11px] text-slate-500">
                Aprobado por: <span className="font-semibold text-ipsur-navy-700">{rubric.uploadedBy}</span>
              </p>
            </div>
          </div>

          {isCoordinator && !isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-ipsur-navy-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg shadow-sm transition"
            >
              <Edit3 className="w-3.5 h-3.5 text-ipsur-pink-500" />
              <span>Editar Rúbrica / Temario</span>
            </button>
          )}

          {isCoordinator && isEditing && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsEditing(false)}
                className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-ipsur-pink-600 hover:bg-ipsur-pink-700 rounded-lg shadow-sm"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Guardar Cambios</span>
              </button>
            </div>
          )}
        </div>

        {/* General Objective */}
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <h4 className="text-xs font-bold text-ipsur-navy-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-ipsur-pink-500" />
            Objetivo General de Aprendizaje
          </h4>
          {isEditing ? (
            <textarea
              rows={3}
              value={generalObjective}
              onChange={e => setGeneralObjective(e.target.value)}
              className="w-full text-xs text-slate-700 p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-ipsur-navy-500 outline-none"
            />
          ) : (
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50/70 p-3 rounded-lg border border-slate-100">
              {generalObjective}
            </p>
          )}
        </div>

        {/* Units and Topics List */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold text-ipsur-navy-900 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-ipsur-pink-500" />
              Temas que verán en el Bimestre / Cuatrimestre
            </h4>
            {isEditing && (
              <button
                onClick={handleAddTopic}
                className="flex items-center gap-1 text-xs font-semibold text-ipsur-pink-600 hover:text-ipsur-pink-700 bg-pink-50 px-2 py-1 rounded"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Agregar Unidad</span>
              </button>
            )}
          </div>

          <div className="space-y-3">
            {topics.map((t, idx) => (
              <div 
                key={t.id || idx} 
                className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:border-slate-300 transition"
              >
                {isEditing ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={t.unit}
                        onChange={e => handleTopicChange(idx, 'unit', e.target.value)}
                        className="w-24 text-xs font-bold text-ipsur-navy-800 bg-slate-50 px-2 py-1 rounded border"
                      />
                      <input
                        type="text"
                        value={t.title}
                        onChange={e => handleTopicChange(idx, 'title', e.target.value)}
                        className="flex-1 text-xs font-bold text-slate-800 bg-white px-2 py-1 rounded border"
                      />
                      <input
                        type="text"
                        value={t.weeks}
                        onChange={e => handleTopicChange(idx, 'weeks', e.target.value)}
                        className="w-28 text-xs text-slate-500 bg-slate-50 px-2 py-1 rounded border text-center"
                      />
                      <button
                        onClick={() => handleRemoveTopic(idx)}
                        className="text-slate-400 hover:text-rose-500 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <textarea
                      rows={2}
                      value={t.learningGoals}
                      onChange={e => handleTopicChange(idx, 'learningGoals', e.target.value)}
                      placeholder="Aprendizajes esperados..."
                      className="w-full text-xs text-slate-600 p-2 bg-slate-50 rounded border"
                    />
                  </div>
                ) : (
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold uppercase bg-ipsur-navy-100 text-ipsur-navy-800 px-2 py-0.5 rounded">
                          {t.unit}
                        </span>
                        <h5 className="text-sm font-bold text-slate-800">
                          {t.title}
                        </h5>
                      </div>
                      <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        {t.weeks}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2 text-xs">
                      <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                        <span className="font-semibold text-slate-700 block mb-0.5">
                          🎯 Metas de Aprendizaje:
                        </span>
                        <p className="text-slate-600">{t.learningGoals}</p>
                      </div>

                      <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                        <span className="font-semibold text-slate-700 block mb-0.5">
                          📖 Bibliografía y Recursos Clave:
                        </span>
                        <p className="text-slate-600">{t.keyReadings}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Evaluation Policy Notice */}
        <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 flex items-start gap-2.5">
          <CheckCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Reglamento Institucional de Evaluación:</span>
            <p className="mt-0.5 text-amber-800">
              El docente a cargo asignará las ponderaciones exactas correspondientes a: 
              <strong> Actividades Continuas, Examen o Proyecto, Asistencia y Participación</strong>. 
              Ninguna actividad podrá ser asignada hasta que dicha ponderación totalice exactamente el 100%.
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
}
