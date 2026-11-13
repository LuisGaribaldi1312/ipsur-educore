import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import Modal from '../common/Modal';
import { UploadCloud, FileText, Video, Presentation, Link, BookOpen, Layers } from 'lucide-react';

export default function UploadMaterialModal({ isOpen, onClose, classroom }) {
  const { addMaterial } = useApp();

  const rubricTopics = classroom?.rubric?.topics || [];

  const [title, setTitle] = useState('');
  const [unitId, setUnitId] = useState(rubricTopics[0]?.id || 'top-1');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('pdf');
  const [fileName, setFileName] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [fileSize, setFileSize] = useState('3.2 MB');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !classroom?.id) return;

    const selectedTopic = rubricTopics.find(t => t.id === unitId);

    addMaterial(classroom.id, {
      title: title.trim(),
      unitId: unitId || 'top-general',
      unitTitle: selectedTopic ? `${selectedTopic.unit}` : 'Material General',
      description: description.trim(),
      type,
      fileName: fileName.trim() || `${title.replace(/\s+/g, '_')}.${type === 'video' ? 'mp4' : type === 'presentation' ? 'pptx' : 'pdf'}`,
      fileUrl: fileUrl.trim() || '#archivo-institucional-ipsur',
      fileSize
    });

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Subir Material de Clase y Recursos Didácticos"
      subtitle={`Sala: ${classroom?.name} · Publica lecturas, diapositivas y clases grabadas.`}
      maxWidth="max-w-xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Unit / Topic */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-ipsur-pink-500" />
            Asociar a Unidad / Tema del Temario Oficial *
          </label>
          <select
            required
            value={unitId}
            onChange={e => setUnitId(e.target.value)}
            className="w-full text-xs font-medium text-slate-800 bg-slate-50 border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-ipsur-navy-500 outline-none"
          >
            {rubricTopics.length === 0 ? (
              <option value="top-general">Material General de la Asignatura</option>
            ) : (
              rubricTopics.map(topic => (
                <option key={topic.id} value={topic.id}>
                  {topic.unit}: {topic.title}
                </option>
              ))
            )}
          </select>
        </div>

        {/* Material Type */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Tipo de Material Didáctico *
          </label>
          <div className="grid grid-cols-4 gap-2">
            {[
              { id: 'pdf', label: 'PDF / Lectura', icon: FileText },
              { id: 'video', label: 'Video Clase', icon: Video },
              { id: 'presentation', label: 'Diapositivas', icon: Presentation || FileText },
              { id: 'document', label: 'Enlace Web', icon: Link }
            ].map(item => {
              const Icon = item.icon;
              const isSelected = type === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setType(item.id)}
                  className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-center transition ${
                    isSelected 
                      ? 'bg-ipsur-navy-50 border-ipsur-navy-500 text-ipsur-navy-800 font-bold ring-1 ring-ipsur-navy-400' 
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-5 h-5 mb-1 ${isSelected ? 'text-ipsur-navy-600' : 'text-slate-400'}`} />
                  <span className="text-[11px]">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Title */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Título del Material *
          </label>
          <input
            type="text"
            required
            placeholder="Ej. Guía Teórica y Ejercicios Resueltos de Polinomios"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full text-xs font-medium text-slate-800 bg-white border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-ipsur-navy-500 outline-none"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Descripción y Orientaciones para el Estudiante
          </label>
          <textarea
            rows={3}
            placeholder="Explica qué encontrará el estudiante en este material y cómo apoya sus actividades..."
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="w-full text-xs text-slate-700 bg-white border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-ipsur-navy-500 outline-none"
          />
        </div>

        {/* File Name & Link */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Nombre de Archivo / Recurso
            </label>
            <input
              type="text"
              placeholder="Ej. Guia_Polinomios_IPSUR.pdf"
              value={fileName}
              onChange={e => setFileName(e.target.value)}
              className="w-full text-xs bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Tamaño / Duración Estimada
            </label>
            <input
              type="text"
              placeholder="Ej. 2.4 MB o 35 min"
              value={fileSize}
              onChange={e => setFileSize(e.target.value)}
              className="w-full text-xs bg-white border border-slate-300 rounded-lg px-2.5 py-1.5"
            />
          </div>
        </div>

        {/* Actions */}
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
            className="flex items-center gap-2 px-5 py-2 text-xs font-bold text-white bg-ipsur-pink-600 hover:bg-ipsur-pink-700 rounded-lg shadow-md transition"
          >
            <UploadCloud className="w-4 h-4" />
            <span>Publicar Material</span>
          </button>
        </div>
      </form>
    </Modal>
  );
}
