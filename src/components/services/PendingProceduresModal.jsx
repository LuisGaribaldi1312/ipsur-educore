import React, { useState } from 'react';
import Modal from '../common/Modal';
import { useApp } from '../../context/AppContext';
import { FileText, CheckCircle2, Clock, AlertCircle, Search, Download, Check, X, ShieldCheck } from 'lucide-react';

export default function PendingProceduresModal({ isOpen, onClose }) {
  const { procedures, updateProcedureStatus, showToast } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filtered = (procedures || []).filter(p =>
    p.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.matricula.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Servicios Escolares · Trámites y Solicitudes de Alumnos" size="lg">
      <div className="space-y-4">
        {/* Banner summary */}
        <div className="bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-200 p-4 rounded-2xl flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-display font-bold text-slate-900 text-sm">Ventanilla Única Digital SEP</h4>
              <p className="text-xs text-slate-600">24 trámites en curso · Emisión de constancias, credenciales y actas</p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold">
            92% Eficiencia
          </span>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Buscar por alumno, matrícula o tipo de trámite..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none"
          />
        </div>

        {/* Procedures Table */}
        <div className="overflow-x-auto border border-slate-200 rounded-2xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-600 font-bold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Folio</th>
                <th className="py-2.5 px-3">Estudiante</th>
                <th className="py-2.5 px-3">Trámite Solicitado</th>
                <th className="py-2.5 px-3">Fecha</th>
                <th className="py-2.5 px-3">Estado</th>
                <th className="py-2.5 px-3 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {filtered.map(item => (
                <tr key={item.id} className="hover:bg-slate-50 transition">
                  <td className="py-2.5 px-3 font-mono text-[11px] font-bold text-slate-500">{item.id}</td>
                  <td className="py-2.5 px-3">
                    <span className="font-bold text-slate-900 block">{item.student}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{item.matricula}</span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-700">{item.type}</td>
                  <td className="py-2.5 px-3 text-slate-500 text-[11px]">{item.date}</td>
                  <td className="py-2.5 px-3">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      item.status === 'Aprobado' 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : item.status === 'En Proceso'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <div className="inline-flex items-center gap-1">
                      {item.status !== 'Aprobado' && (
                        <button
                          onClick={() => updateProcedureStatus(item.id, 'Aprobado')}
                          className="px-2.5 py-1 text-[11px] font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs transition"
                          title="Aprobar y emitir documento oficial"
                        >
                          Aprobar
                        </button>
                      )}
                      <button
                        onClick={() => showToast('Descarga Documento', `Generando PDF oficial para ${item.student}`, 'info')}
                        className="p-1.5 text-slate-500 hover:text-teal-700 hover:bg-teal-50 rounded-lg transition"
                        title="Ver / Descargar constancia"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pt-2 border-t border-slate-200 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
          >
            Cerrar
          </button>
        </div>
      </div>
    </Modal>
  );
}
