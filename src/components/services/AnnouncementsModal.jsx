import React, { useState } from 'react';
import Modal from '../common/Modal';
import { useApp } from '../../context/AppContext';
import { Mail, Send, Bell, CheckCircle2, ShieldCheck, Users, Megaphone } from 'lucide-react';

export default function AnnouncementsModal({ isOpen, onClose }) {
  const { notificationsList, showToast, addActivity } = useApp();

  const [title, setTitle] = useState('');
  const [recipient, setRecipient] = useState('Toda la Comunidad (Alumnos, Docentes y Directivos)');
  const [message, setMessage] = useState('');
  const [priority, setPriority] = useState('Alta');

  if (!isOpen) return null;

  const handleSend = (e) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) {
      showToast('Campos Incompletos', 'Ingresa título y mensaje del comunicado.', 'warning');
      return;
    }

    if (addActivity) {
      addActivity({
        type: 'announcement',
        title: 'Nuevo comunicado institucional',
        subtitle: title.trim(),
        badge: 'Difusión',
        color: 'sky'
      });
    }

    showToast('Comunicado Publicado', `Se envió la circular "${title.trim()}" a ${recipient}.`, 'success');
    setTitle('');
    setMessage('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Centro de Comunicados y Mensajería Institucional" size="md">
      <form onSubmit={handleSend} className="space-y-4">
        <div className="bg-gradient-to-r from-pink-50 to-rose-50 border border-pink-200 p-4 rounded-2xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-pink-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
            <Megaphone className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-display font-bold text-slate-900 text-sm">Circular Oficial Institucional</h4>
            <p className="text-xs text-slate-600">Difusión inmediata vía panel, correo y notificaciones push.</p>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Título del Comunicado *</label>
          <input
            type="text"
            required
            placeholder="Ej. Convocatoria a Entrega de Calificaciones Bimestrales"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Destinatarios</label>
            <select
              value={recipient}
              onChange={e => setRecipient(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none"
            >
              <option value="Toda la Comunidad">Toda la Comunidad (General)</option>
              <option value="Alumnos de Bachillerato">Solo Alumnos</option>
              <option value="Catedráticos y Docentes">Solo Docentes Titulares</option>
              <option value="Dirección y Coordinación">Personal Administrativo</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Nivel de Prioridad</label>
            <select
              value={priority}
              onChange={e => setPriority(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none"
            >
              <option value="Alta">Urgente / Prioritaria</option>
              <option value="Media">Informativa Regular</option>
              <option value="Baja">Aviso General</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Cuerpo del Comunicado *</label>
          <textarea
            required
            rows={4}
            placeholder="Redacta las indicaciones oficiales, fechas límite, acuerdos o avisos que serán enviados a la comunidad escolar..."
            value={message}
            onChange={e => setMessage(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none resize-none"
          />
        </div>

        <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="flex items-center gap-1.5 px-5 py-2 text-xs font-bold text-white bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 rounded-xl shadow-md transition active:scale-95"
          >
            <Send className="w-4 h-4" />
            <span>Emitir y Notificar Circular</span>
          </button>
        </div>
      </form>
    </Modal>
  );
}
