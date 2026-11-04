import React, { useState } from 'react';
import Modal from '../common/Modal';
import { useApp } from '../../context/AppContext';
import InstitutionalActaModal from './InstitutionalActaModal';
import StudentGeneralBoletaModal from '../student/StudentGeneralBoletaModal';
import { 
  BarChart3, 
  FileText, 
  Award, 
  Printer, 
  Download, 
  TrendingUp, 
  Users, 
  CheckCircle2, 
  Calendar,
  Layers,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export default function InstitutionalReportsModal({ isOpen, onClose }) {
  const { classrooms, users, showToast } = useApp();
  const [activeTab, setActiveTab] = useState('actas'); // 'actas' | 'estadisticas' | 'boletas'
  const [selectedClassroomId, setSelectedClassroomId] = useState(classrooms[0]?.id || '');
  const [selectedActaModalOpen, setSelectedActaModalOpen] = useState(false);
  const [selectedBoletaModalOpen, setSelectedBoletaModalOpen] = useState(false);

  if (!isOpen) return null;

  const selectedClassroom = classrooms.find(c => c.id === selectedClassroomId) || classrooms[0];
  const totalStudents = (users || []).filter(u => u.role === 'student').length;
  const totalTeachers = (users || []).filter(u => u.role === 'teacher').length;

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Centro de Inteligencia Académica · Reportes y Estadísticas"
        size="xl"
      >
        <div className="space-y-4">
          {/* IPSUR Header Banner */}
          <div className="bg-gradient-to-r from-[#0A0D1B] via-[#141B41] to-[#2E3092] text-white p-4.5 rounded-2xl border border-blue-900/50 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-ipsur-pink-600/30 border border-ipsur-pink-500/40 text-white flex items-center justify-center flex-shrink-0 shadow-inner">
                <BarChart3 className="w-6 h-6 text-pink-300" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-ipsur-pink-600 text-white tracking-widest uppercase">
                    Control SEP & Métricas
                  </span>
                  <span className="text-xs text-blue-200">IPSUR EDUCORE</span>
                </div>
                <h3 className="font-display font-black text-base text-white mt-0.5">
                  Actas Oficiales, Estadísticas y Boletas Escolares
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Generación de actas colegiadas para supervisión escolar SEP, índices de aprobación y expedición de boletas.
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
            <button
              onClick={() => setActiveTab('actas')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeTab === 'actas'
                  ? 'bg-ipsur-navy-800 text-white shadow'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Actas Oficiales SEP</span>
            </button>

            <button
              onClick={() => setActiveTab('estadisticas')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeTab === 'estadisticas'
                  ? 'bg-ipsur-navy-800 text-white shadow'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>Estadísticas y Retención</span>
            </button>

            <button
              onClick={() => setActiveTab('boletas')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeTab === 'boletas'
                  ? 'bg-ipsur-navy-800 text-white shadow'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Boletas Oficiales</span>
            </button>
          </div>

          {/* Tab 1: Actas Oficiales */}
          {activeTab === 'actas' && (
            <div className="space-y-4">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="font-display font-bold text-slate-900 text-sm">
                    Selecciona la Sala / Materia Virtual
                  </h4>
                  <p className="text-xs text-slate-500">
                    Genera el acta membretada con firmas de Catedrático, Coordinador y Dirección.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={selectedClassroomId}
                    onChange={e => setSelectedClassroomId(e.target.value)}
                    className="px-3 py-2 text-xs font-bold bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-ipsur-pink-500 outline-none"
                  >
                    {classrooms.map(c => (
                      <option key={c.id} value={c.id}>
                        {c.name} ({c.code})
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={() => setSelectedActaModalOpen(true)}
                    className="flex items-center gap-1.5 px-4 py-2 bg-ipsur-pink-600 hover:bg-ipsur-pink-700 text-white text-xs font-bold rounded-xl shadow-md transition cursor-pointer"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Ver / Imprimir Acta</span>
                  </button>
                </div>
              </div>

              {/* Classroom Preview Summary */}
              {selectedClassroom && (
                <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-mono text-xs font-bold bg-blue-100 text-blue-900 px-2 py-0.5 rounded">
                        {selectedClassroom.code}
                      </span>
                      <h4 className="font-bold text-slate-900 text-sm mt-1">{selectedClassroom.name}</h4>
                    </div>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                      Rúbrica al 100% Validada
                    </span>
                  </div>

                  <p className="text-xs text-slate-600">
                    {selectedClassroom.enrolledStudentIds?.length || 0} alumnos evaluados según los criterios oficiales de la Prepa en Línea.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Estadísticas del Campus Virtual */}
          {activeTab === 'estadisticas' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 p-3.5 rounded-2xl">
                  <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider block">
                    Índice de Aprobación
                  </span>
                  <p className="font-display font-black text-2xl text-blue-950 mt-1">95.4%</p>
                  <span className="text-[10px] text-emerald-600 font-bold">↑ +3.2% vs ciclo anterior</span>
                </div>

                <div className="bg-gradient-to-br from-rose-50 to-pink-50 border border-rose-200 p-3.5 rounded-2xl">
                  <span className="text-[10px] font-bold text-rose-700 uppercase tracking-wider block">
                    Índice de Reprobación
                  </span>
                  <p className="font-display font-black text-2xl text-rose-950 mt-1">4.6%</p>
                  <span className="text-[10px] text-emerald-600 font-bold">↓ Reducción continua</span>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200 p-3.5 rounded-2xl">
                  <span className="text-[10px] font-bold text-purple-700 uppercase tracking-wider block">
                    Retención Escolar
                  </span>
                  <p className="font-display font-black text-2xl text-purple-950 mt-1">98.2%</p>
                  <span className="text-[10px] text-purple-700 font-bold">Modalidad 100% en línea</span>
                </div>

                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 p-3.5 rounded-2xl">
                  <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">
                    Asistencia Virtual
                  </span>
                  <p className="font-display font-black text-2xl text-emerald-950 mt-1">96.8%</p>
                  <span className="text-[10px] text-emerald-700 font-bold">Sesiones Google Meet</span>
                </div>
              </div>

              {/* Progress and Indicators */}
              <div className="bg-white border border-slate-200 p-4 rounded-2xl space-y-3">
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                  Cumplimiento del Plan Académico Cuatrimestral
                </h4>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                      <span>Avance Curricular General</span>
                      <span>85%</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-600 to-ipsur-pink-600 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                      <span>Captura de Calificaciones de Exámenes</span>
                      <span>92%</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Boletas Oficiales */}
          {activeTab === 'boletas' && (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-ipsur-pink-600 text-white flex items-center justify-center mx-auto shadow-md">
                <Award className="w-6 h-6" />
              </div>
              <h4 className="font-display font-bold text-slate-900 text-sm">
                Expedición de Boletas Oficiales de Bachillerato
              </h4>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                Genera la boleta acumulada con el promedio general, validez oficial de control escolar y código de verificación institucional.
              </p>
              <button
                onClick={() => setSelectedBoletaModalOpen(true)}
                className="px-5 py-2.5 bg-ipsur-pink-600 hover:bg-ipsur-pink-700 text-white text-xs font-bold rounded-xl shadow-md transition cursor-pointer"
              >
                Abrir Boleta Oficial Digital
              </button>
            </div>
          )}
        </div>
      </Modal>

      {/* Linked Acta Modal */}
      {selectedActaModalOpen && (
        <InstitutionalActaModal
          isOpen={selectedActaModalOpen}
          onClose={() => setSelectedActaModalOpen(false)}
          classroom={selectedClassroom}
        />
      )}

      {/* Linked Boleta Modal */}
      {selectedBoletaModalOpen && (
        <StudentGeneralBoletaModal
          isOpen={selectedBoletaModalOpen}
          onClose={() => setSelectedBoletaModalOpen(false)}
        />
      )}
    </>
  );
}
