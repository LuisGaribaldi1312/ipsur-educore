import React, { useState } from 'react';
import Modal from '../common/Modal';
import { useApp } from '../../context/AppContext';
import { UserPlus, User, Mail, Phone, BookOpen, School, CheckCircle2, ShieldCheck, Hash } from 'lucide-react';

export default function RegisterStudentModal({ isOpen, onClose }) {
  const { currentUser, isSuperAdmin, createUser, showToast, addActivity } = useApp();

  const isStudent = currentUser?.role === 'student';
  const canEnroll = !isStudent && (
    isSuperAdmin || 
    currentUser?.role === 'director' || 
    currentUser?.role === 'rector' || 
    currentUser?.role === 'coordinator'
  );

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [matricula, setMatricula] = useState(`IPS-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`);
  const [group, setGroup] = useState('Grupo 2° B');
  const [phone, setPhone] = useState('');
  const [gradeLevel, setGradeLevel] = useState('Bachillerato General - 2do Semestre');
  const [password, setPassword] = useState('Ipsur2026*');

  if (!isOpen) return null;

  // Strict Security Check: Students cannot access enrollment
  if (isStudent || !canEnroll) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} title="Acceso Restringido · Permisos" size="sm">
        <div className="p-4 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h4 className="font-display font-bold text-slate-900 text-sm">
            Acceso no autorizado
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Los alumnos no cuentan con permisos para inscribir o gestionar a otros estudiantes. La matrícula es una función exclusiva de Servicios Escolares y Dirección.
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isStudent || !canEnroll) {
      showToast('Acceso Denegado', 'Los alumnos no tienen permisos para inscribir estudiantes.', 'error');
      return;
    }
    if (!name.trim() || !email.trim()) {
      showToast('Campos Incompletos', 'Por favor ingresa nombre y correo del estudiante.', 'warning');
      return;
    }

    const newStudent = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: password || 'Ipsur2026*',
      role: 'student',
      matricula: matricula.trim(),
      grupo: group,
      gradeLevel: gradeLevel,
      phone: phone.trim() || '+52 (998) 000-0000',
      title: 'Estudiante de Bachillerato en Línea',
      avatar: `https://images.unsplash.com/photo-${1534528741775 + Math.floor(Math.random() * 1000)}?w=150&auto=format&fit=crop&q=80`
    };

    createUser(newStudent);

    if (addActivity) {
      addActivity({
        type: 'student',
        title: 'Nuevo alumno registrado',
        subtitle: `${name.trim()} (${group})`,
        badge: 'Inscripción',
        color: 'blue'
      });
    }

    showToast('Alumno Registrado', `Se matriculó exitosamente a ${name.trim()} con clave ${matricula}`, 'success');
    setName('');
    setEmail('');
    setPhone('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Registrar Nuevo Alumno · Servicios Escolares" size="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 rounded-2xl p-4 flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
            <UserPlus className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-display font-bold text-slate-900 text-sm">Alta Oficial en Padrón Escolar</h4>
            <p className="text-xs text-slate-600 mt-0.5">
              Genera la matrícula única, credencial institucional y acceso a la plataforma virtual.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Nombre Completo del Alumno *</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                required
                placeholder="Ej. María Fernanda López García"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Matrícula Institucional *</label>
            <div className="relative">
              <Hash className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                required
                value={matricula}
                onChange={e => setMatricula(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl font-mono focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Correo Electrónico Institucional *</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="email"
                required
                placeholder="alumno@ipsur.edu.mx"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Teléfono / WhatsApp de Contacto</label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="tel"
                placeholder="+52 (998) 000-0000"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Grupo Asignado</label>
            <select
              value={group}
              onChange={e => setGroup(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="Grupo 1° A">Grupo 1° A · Matutino</option>
              <option value="Grupo 2° B">Grupo 2° B · Matutino</option>
              <option value="Grupo 3° C">Grupo 3° C · Vespertino</option>
              <option value="Grupo 4° A">Grupo 4° A · Virtual 100%</option>
              <option value="Grupo 5° B">Grupo 5° B · Virtual 100%</option>
              <option value="Grupo 6° A">Grupo 6° A · Terminal</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Nivel y Semestre</label>
            <input
              type="text"
              value={gradeLevel}
              onChange={e => setGradeLevel(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Contraseña Temporal de Acceso</label>
          <input
            type="text"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl font-mono focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <p className="text-[11px] text-slate-400 mt-1">El alumno podrá cambiar su contraseña desde su perfil en el primer ingreso.</p>
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
            className="flex items-center gap-2 px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md transition active:scale-95"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Matricular y Crear Expediente</span>
          </button>
        </div>
      </form>
    </Modal>
  );
}
