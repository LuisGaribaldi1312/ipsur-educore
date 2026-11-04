import React, { useState } from 'react';
import Modal from '../common/Modal';
import { useApp } from '../../context/AppContext';
import { CreditCard, DollarSign, Plus, CheckCircle, FileText, Search, ArrowUpRight, ShieldCheck, Download } from 'lucide-react';

export default function PaymentsAccountingModal({ isOpen, onClose }) {
  const { payments, addPayment, showToast, currentUser, isSuperAdmin } = useApp();

  const isStudent = currentUser?.role === 'student';
  const isTeacher = currentUser?.role === 'teacher';
  const canManageAccounting = !isStudent && !isTeacher && (
    isSuperAdmin || 
    currentUser?.role === 'director' || 
    currentUser?.role === 'rector' || 
    currentUser?.role === 'coordinator'
  );

  const [isAdding, setIsAdding] = useState(false);
  const [student, setStudent] = useState('');
  const [concept, setConcept] = useState('Colegiatura Mensual Noviembre');
  const [amount, setAmount] = useState('2450.00');
  const [method, setMethod] = useState('Transferencia SPEI');
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  // STRICT SECURITY CHECK: Teachers have NO access to accounting and payments
  if (isTeacher) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} title="Acceso Restringido · Permisos" size="sm">
        <div className="p-4 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h4 className="font-display font-bold text-slate-900 text-sm">
            Módulo Exclusivo Administrativo
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            El perfil docente no tiene facultades para consultar o administrar la contabilidad, ingresos y cobro de colegiaturas institucionales.
          </p>
          <button
            onClick={onClose}
            className="w-full py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl transition"
          >
            Entendido
          </button>
        </div>
      </Modal>
    );
  }

  const handleRegisterPayment = (e) => {
    e.preventDefault();
    if (!canManageAccounting) {
      showToast('Acceso Denegado', 'Solo personal administrativo puede capturar cobros.', 'error');
      return;
    }
    if (!student.trim() || !amount) {
      showToast('Datos Incompletos', 'Ingresa el nombre del alumno y el monto.', 'warning');
      return;
    }

    addPayment({
      concept,
      student: student.trim(),
      amount: `$${Number(amount).toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN`,
      method
    });

    setStudent('');
    setIsAdding(false);
  };

  // If student, strictly only show their own payments
  const basePayments = isStudent 
    ? (payments || []).filter(p => p.student?.toLowerCase() === currentUser?.name?.toLowerCase())
    : (payments || []);

  const filteredPayments = basePayments.filter(p => 
    p.student?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.concept?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.id?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalAmount = basePayments.reduce((acc, p) => {
    const raw = String(p.amount || '').replace(/[^0-9.]/g, '');
    return acc + (Number(raw) || 0);
  }, 0);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Administrativo y Contabilidad · Módulo de Pagos" size="lg">
      <div className="space-y-4">
        {/* Top Summary Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-gradient-to-br from-emerald-600 to-teal-800 text-white p-4 rounded-2xl shadow-sm">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-100">Ingresos Registrados</span>
            <p className="font-display text-2xl font-black mt-1">
              ${totalAmount.toLocaleString('es-MX', { minimumFractionDigits: 2 })} <span className="text-xs font-normal text-emerald-200">MXN</span>
            </p>
            <span className="text-[10px] text-emerald-100 mt-1 block">
              {payments?.length > 0 ? `${payments.length} transacciones capturadas` : 'Caja abierta'}
            </span>
          </div>

          <div className="bg-[#0A0D1B] text-white p-4 rounded-2xl shadow-sm border border-slate-800">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Recibos Emitidos</span>
            <p className="font-display text-2xl font-black mt-1">{payments?.length || 0} <span className="text-xs font-normal text-slate-400">Comprobantes</span></p>
            <span className="text-[10px] text-slate-300 mt-1 block">Folios oficiales IPSUR</span>
          </div>

          <div className="bg-gradient-to-br from-ipsur-navy-800 to-ipsur-pink-700 text-white p-4 rounded-2xl shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-pink-100">Caja y Tesorería</span>
              <p className="text-xs text-pink-100 mt-0.5">Control financiero institucional</p>
            </div>
            {canManageAccounting && (
              <button
                onClick={() => setIsAdding(!isAdding)}
                className="mt-2 w-full py-2 px-3 text-xs font-bold bg-white text-ipsur-navy-900 hover:bg-slate-100 rounded-xl transition flex items-center justify-center gap-1.5 shadow"
              >
                <Plus className="w-4 h-4 text-ipsur-pink-600" />
                <span>{isAdding ? 'Ver Lista de Pagos' : 'Registrar Nuevo Pago'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Add Payment Form */}
        {isAdding ? (
          <form onSubmit={handleRegisterPayment} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3.5 animate-in fade-in">
            <h4 className="font-display font-bold text-slate-900 text-sm flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-emerald-600" />
              <span>Captura de Cobro en Caja</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nombre del Estudiante *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Ana Torres Pérez"
                  value={student}
                  onChange={e => setStudent(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Concepto *</label>
                <select
                  value={concept}
                  onChange={e => setConcept(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                >
                  <option value="Colegiatura Mensual Noviembre">Colegiatura Mensual Noviembre</option>
                  <option value="Inscripción / Reinscripción Semestral">Inscripción / Reinscripción Semestral</option>
                  <option value="Constancia de Estudios Oficial">Constancia de Estudios Oficial</option>
                  <option value="Credencial Escolar Digital / Física">Credencial Escolar Digital / Física</option>
                  <option value="Derecho a Examen Extraordinario">Derecho a Examen Extraordinario</option>
                  <option value="Certificado Parcial / Total SEP">Certificado Parcial / Total SEP</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Monto ($ MXN) *</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl font-mono focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Método de Pago</label>
                <select
                  value={method}
                  onChange={e => setMethod(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                >
                  <option value="Transferencia SPEI">Transferencia SPEI</option>
                  <option value="Tarjeta de Crédito / Débito">Tarjeta de Crédito / Débito</option>
                  <option value="Ventanilla Bancaria">Ventanilla Bancaria</option>
                  <option value="Efectivo en Caja Escolar">Efectivo en Caja Escolar</option>
                  <option value="OXXO Pay">OXXO Pay</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-3.5 py-1.5 text-xs text-slate-600 hover:bg-slate-200 rounded-xl"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow transition"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Registrar Pago y Emitir Comprobante</span>
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-3">
            {/* Search filter */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Buscar por estudiante, concepto o folio..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>

            {/* Payments Table */}
            <div className="overflow-x-auto border border-slate-200 rounded-2xl shadow-xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-600 font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-3">Folio</th>
                    <th className="py-2.5 px-3">Estudiante</th>
                    <th className="py-2.5 px-3">Concepto</th>
                    <th className="py-2.5 px-3">Monto</th>
                    <th className="py-2.5 px-3">Método</th>
                    <th className="py-2.5 px-3">Estado</th>
                    <th className="py-2.5 px-3 text-right">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {filteredPayments.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-slate-400">
                        <CreditCard className="w-8 h-8 text-slate-300 mx-auto mb-1.5" />
                        Sin pagos registrados en el periodo. Utiliza "Registrar Nuevo Pago" para capturar cobros.
                      </td>
                    </tr>
                  ) : (
                    filteredPayments.map(p => (
                      <tr key={p.id} className="hover:bg-slate-50 transition">
                        <td className="py-2.5 px-3 font-mono font-bold text-slate-500 text-[11px]">{p.id}</td>
                        <td className="py-2.5 px-3 font-semibold text-slate-900">{p.student}</td>
                        <td className="py-2.5 px-3 text-slate-600">{p.concept}</td>
                        <td className="py-2.5 px-3 font-bold text-emerald-700">{p.amount}</td>
                        <td className="py-2.5 px-3 text-slate-500 text-[11px]">{p.method}</td>
                        <td className="py-2.5 px-3">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                            <CheckCircle className="w-3 h-3 text-emerald-600" />
                            {p.status}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-right">
                          <button
                            onClick={() => showToast('Recibo Digital', `Descargando comprobante fiscal de ${p.student}`, 'info')}
                            className="p-1.5 text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition"
                            title="Descargar recibo digital PDF"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
          <span>IPSUR Manager School · Módulo Financiero</span>
          <button
            onClick={onClose}
            className="px-4 py-2 font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
          >
            Cerrar
          </button>
        </div>
      </div>
    </Modal>
  );
}
