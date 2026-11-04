import React, { useState } from 'react';
import Modal from '../common/Modal';
import { useApp } from '../../context/AppContext';
import { 
  GraduationCap, 
  Search, 
  UserPlus, 
  FileText, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Phone, 
  Mail, 
  Award, 
  ExternalLink,
  Users
} from 'lucide-react';

export default function AlumnosModal({ 
  isOpen, 
  onClose, 
  onOpenRegisterStudent,
  onOpenBoleta
}) {
  const { users, classrooms, showToast } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGroup, setFilterGroup] = useState('all');

  if (!isOpen) return null;

  // Filter students from users
  const students = (users || []).filter(u => u.role === 'student');

  const filteredStudents = students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.matricula && s.matricula.toLowerCase().includes(searchTerm.toLowerCase())) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGroup = filterGroup === 'all' || s.grupo === filterGroup;
    return matchesSearch && matchesGroup;
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Padrón Escolar · Alumnos Matriculados en Línea"
      size="xl"
    >
      <div className="space-y-4">
        {/* Banner with IPSUR Styling */}
        <div className="bg-gradient-to-r from-[#0A0D1B] via-[#141B41] to-[#2E3092] text-white p-4.5 rounded-2xl border border-blue-900/50 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-ipsur-pink-600/30 border border-ipsur-pink-500/40 text-white flex items-center justify-center flex-shrink-0 shadow-inner">
              <GraduationCap className="w-6 h-6 text-pink-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-ipsur-pink-600 text-white tracking-widest uppercase">
                  Comunidad Estudiantil
                </span>
                <span className="text-xs text-blue-200">Bachillerato Virtual SEP</span>
              </div>
              <h3 className="font-display font-black text-base text-white mt-0.5">
                Padrón Oficial y Expedientes de Estudiantes
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                Matrículas únicas, seguimiento académico, historial de calificaciones y expedientes digitales.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              onClose();
              if (onOpenRegisterStudent) onOpenRegisterStudent();
            }}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-ipsur-pink-600 hover:bg-ipsur-pink-700 text-white font-bold text-xs shadow-md transition-transform hover:scale-105 active:scale-95 flex-shrink-0 cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>+ Inscribir Alumno</span>
          </button>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Buscar por nombre, matrícula o correo..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-ipsur-pink-500 outline-none"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs font-bold text-slate-600">Alumnos matriculados:</span>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 font-mono font-bold text-xs">
              {students.length}
            </span>
          </div>
        </div>

        {/* Students Table */}
        <div className="overflow-x-auto border border-slate-200 rounded-2xl max-h-[440px]">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 sticky top-0 z-10">
              <tr>
                <th className="py-2.5 px-3">Matrícula</th>
                <th className="py-2.5 px-3">Estudiante</th>
                <th className="py-2.5 px-3">Grupo / Grado</th>
                <th className="py-2.5 px-3">Contacto</th>
                <th className="py-2.5 px-3">Estatus</th>
                <th className="py-2.5 px-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    <GraduationCap className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                    <p className="font-bold text-slate-600 text-sm">No se encontraron alumnos registrados</p>
                    <p className="text-xs text-slate-400 mt-1">
                      Haz clic en "+ Inscribir Alumno" para dar de alta al primer estudiante.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredStudents.map(student => (
                  <tr key={student.id} className="hover:bg-slate-50 transition">
                    <td className="py-3 px-3 font-mono font-bold text-ipsur-navy-800 text-[11px]">
                      {student.matricula || `IPS-${student.id.substring(0, 4)}`}
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-ipsur-navy-800 to-ipsur-pink-600 text-white font-bold text-xs flex items-center justify-center flex-shrink-0">
                          {student.name?.charAt(0)}
                        </div>
                        <div>
                          <span className="font-bold text-slate-900 block">{student.name}</span>
                          <span className="text-[10px] text-slate-400">{student.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <span className="font-semibold text-slate-800 block">{student.grupo || 'Grupo 2° B'}</span>
                      <span className="text-[10px] text-slate-400">Modalidad 100% Virtual</span>
                    </td>
                    <td className="py-3 px-3 text-slate-600">
                      <span className="block text-[11px]">{student.phone || '+52 (998) 000-0000'}</span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                        Regular
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => {
                          onClose();
                          if (onOpenBoleta) onOpenBoleta(student);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-ipsur-navy-800 hover:text-white text-slate-700 text-xs font-bold transition inline-flex items-center gap-1 cursor-pointer"
                        title="Ver Boleta Oficial de Calificaciones"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Boleta</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Modal>
  );
}
