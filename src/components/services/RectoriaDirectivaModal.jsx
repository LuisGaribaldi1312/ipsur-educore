import React, { useState } from 'react';
import Modal from '../common/Modal';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Award, FileText, CheckCircle2, School, ScrollText, Users, Building2, Download } from 'lucide-react';

export default function RectoriaDirectivaModal({ isOpen, onClose, initialTab = 'rectoria' }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const { institutionalInfo, showToast } = useApp();

  if (!isOpen) return null;

  const rectoriaAcuerdos = [
    { folio: 'REC-2026-001', title: 'Aprobación del Calendario Escolar y Modalidad Virtual Híbrida', date: '15 Ene 2026', authority: 'Rectoría General', status: 'Vigente' },
    { folio: 'REC-2026-002', title: 'Reglamento General de Titulación y Acreditación de Rúbricas SEP', date: '01 Feb 2026', authority: 'Rectoría General', status: 'Vigente' },
    { folio: 'REC-2026-003', title: 'Instalación de la Comisión Técnica de Seguridad y Usuarios Master', date: '20 Feb 2026', authority: 'Rectoría General & Super Admin', status: 'Vigente' }
  ];

  const direccionResoluciones = [
    { folio: 'DIR-2026-014', title: 'Nombramiento de Catedráticos Titulares de Bachillerato', date: '10 Feb 2026', authority: 'Dirección General', status: 'Aprobado' },
    { folio: 'DIR-2026-015', title: 'Aprobación de Rúbricas al 100% y Ponderaciones Institucionales', date: '18 Feb 2026', authority: 'Dirección Académica', status: 'Aprobado' },
    { folio: 'DIR-2026-016', title: 'Convocatoria a Sesiones de Consejo Técnico Escolar 2026', date: '28 Feb 2026', authority: 'Dirección General', status: 'En Trámite' }
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={activeTab === 'rectoria' ? 'Gobierno y Acuerdos de Rectoría' : 'Dirección General y Cuerpos Colegiados'} size="lg">
      <div className="space-y-4">
        {/* Tab switcher */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
          <button
            onClick={() => setActiveTab('rectoria')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'rectoria'
                ? 'bg-gradient-to-r from-blue-700 to-indigo-800 text-white shadow'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Rectoría Institucional</span>
          </button>

          <button
            onClick={() => setActiveTab('direccion')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'direccion'
                ? 'bg-gradient-to-r from-rose-700 to-pink-800 text-white shadow'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <School className="w-4 h-4" />
            <span>Dirección General</span>
          </button>
        </div>

        {activeTab === 'rectoria' ? (
          <div className="space-y-3">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 p-4 rounded-2xl flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-blue-700 text-white flex items-center justify-center flex-shrink-0 shadow">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-display font-bold text-slate-900 text-sm">Gabinete de Rectoría General</h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  Decretos oficiales, planeación estratégica y supervisión integral de {institutionalInfo?.name || 'IPSUR Manager School'}.
                </p>
              </div>
            </div>

            <div className="space-y-2.5">
              <h5 className="font-bold text-xs uppercase tracking-wider text-slate-500">Acuerdos y Decretos Rectorales</h5>
              {rectoriaAcuerdos.map(ac => (
                <div key={ac.folio} className="p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between gap-3 shadow-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] font-bold bg-blue-100 text-blue-900 px-2 py-0.5 rounded">{ac.folio}</span>
                      <span className="text-[10px] text-slate-400">{ac.date}</span>
                    </div>
                    <p className="font-bold text-slate-900 text-xs mt-1">{ac.title}</p>
                    <span className="text-[11px] text-slate-500">{ac.authority}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">{ac.status}</span>
                    <button
                      onClick={() => showToast('Acuerdo Rectoral', `Descargando acta oficial ${ac.folio}`, 'info')}
                      className="p-1.5 text-slate-400 hover:text-blue-700 rounded-lg hover:bg-slate-100 transition"
                      title="Descargar decreto en PDF"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-200 p-4 rounded-2xl flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-rose-700 text-white flex items-center justify-center flex-shrink-0 shadow">
                <School className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-display font-bold text-slate-900 text-sm">Dirección General y Académica</h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  Supervisión del personal docente, aval de actas oficiales SEP y dictámenes académicos.
                </p>
              </div>
            </div>

            <div className="space-y-2.5">
              <h5 className="font-bold text-xs uppercase tracking-wider text-slate-500">Resoluciones Directivas y Consejo Técnico</h5>
              {direccionResoluciones.map(res => (
                <div key={res.folio} className="p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between gap-3 shadow-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] font-bold bg-rose-100 text-rose-900 px-2 py-0.5 rounded">{res.folio}</span>
                      <span className="text-[10px] text-slate-400">{res.date}</span>
                    </div>
                    <p className="font-bold text-slate-900 text-xs mt-1">{res.title}</p>
                    <span className="text-[11px] text-slate-500">{res.authority}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold text-[10px]">{res.status}</span>
                    <button
                      onClick={() => showToast('Resolución Directiva', `Descargando dictamen ${res.folio}`, 'info')}
                      className="p-1.5 text-slate-400 hover:text-rose-700 rounded-lg hover:bg-slate-100 transition"
                      title="Descargar resolución en PDF"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="pt-3 border-t border-slate-200 flex items-center justify-end">
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
