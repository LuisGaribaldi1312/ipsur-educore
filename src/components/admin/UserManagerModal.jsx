import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DEFAULT_ROLE_PERMISSIONS } from '../../data/initialData';
import Modal from '../common/Modal';
import { 
  Users, 
  UserPlus, 
  ShieldCheck, 
  BookOpen, 
  GraduationCap, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  CheckCircle2, 
  XCircle, 
  Lock, 
  Eye, 
  EyeOff, 
  Mail, 
  Phone, 
  KeyRound, 
  Sparkles,
  School,
  AlertTriangle,
  Award,
  Video,
  FileCheck,
  Calendar,
  Layers,
  Settings
} from 'lucide-react';

export default function UserManagerModal({ isOpen, onClose }) {
  const { 
    currentUser, 
    users, 
    createUser, 
    updateUser, 
    deleteUser, 
    toggleUserStatus, 
    isSuperAdmin,
    showToast 
  } = useApp();

  const [activeAreaTab, setActiveAreaTab] = useState('all'); // 'all' | 'director' | 'coordinator' | 'teacher' | 'student'
  const [searchTerm, setSearchTerm] = useState('');
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // STRICT ACCESS CHECK: Only Super Admin and Director General can access user management
  const canManage = isSuperAdmin || currentUser?.role === 'director';

  // Form Fields for new/editing user
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'teacher',
    matricula: '',
    title: '',
    specialty: 'Bachillerato General',
    shift: 'En Línea',
    phone: '+52 (998) 845-2100',
    scope: 'assigned',
    permissions: {
      canManageUsers: false,
      canCreateClassrooms: false,
      canGrade: true,
      canScheduleLive: true,
      canPublishAnnouncements: false,
      canViewBoletas: false,
      canManageCalendar: false,
      canExportReports: true
    }
  });

  const [showPassword, setShowPassword] = useState(false);

  // If user is not authorized, don't show modal
  if (!isOpen || !canManage) return null;

  // Allowed roles depending on who is logged in
  const canManageDirectors = isSuperAdmin;
  const canManageCoordinators = isSuperAdmin || currentUser.role === 'director';
  const canManageTeachersAndStudents = isSuperAdmin || currentUser.role === 'director';

  // Role options for select box
  const availableRoleOptions = [];
  if (canManageDirectors) {
    availableRoleOptions.push({ value: 'director', label: 'Director General Institucional' });
  }
  if (canManageCoordinators) {
    availableRoleOptions.push({ value: 'coordinator', label: 'Coordinador(a) Escolar' });
  }
  if (canManageTeachersAndStudents) {
    availableRoleOptions.push({ value: 'teacher', label: 'Maestro / Maestra (Docente Titular)' });
    availableRoleOptions.push({ value: 'student', label: 'Alumno / Alumna (Estudiante)' });
  }

  // Filter users strictly from `users` (which already excludes hidden Super Admin for non-superadmins)
  const filteredUsers = users.filter(u => {
    // Area filter
    if (activeAreaTab !== 'all' && u.role !== activeAreaTab) return false;
    
    // Non-superadmin cannot see director tab or director users if not authorized
    if (u.role === 'director' && !canManageDirectors && currentUser.role !== 'director') return false;

    // Search filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      const matchName = u.name?.toLowerCase().includes(term);
      const matchEmail = u.email?.toLowerCase().includes(term);
      const matchMatricula = u.matricula?.toLowerCase().includes(term);
      return matchName || matchEmail || matchMatricula;
    }
    return true;
  });

  // Handle Role Change in Form to auto-sync default permissions and scope
  const handleRoleChange = (newRole) => {
    const roleDefaults = DEFAULT_ROLE_PERMISSIONS[newRole] || DEFAULT_ROLE_PERMISSIONS.student;
    setFormData(prev => ({
      ...prev,
      role: newRole,
      scope: roleDefaults.scope,
      permissions: {
        canManageUsers: newRole === 'director' || newRole === 'superadmin',
        canCreateClassrooms: Boolean(roleDefaults.canCreateClassrooms),
        canGrade: Boolean(roleDefaults.canGrade),
        canScheduleLive: Boolean(roleDefaults.canScheduleLive),
        canPublishAnnouncements: Boolean(roleDefaults.canPublishAnnouncements),
        canViewBoletas: Boolean(roleDefaults.canViewBoletas),
        canManageCalendar: Boolean(roleDefaults.canManageCalendar),
        canExportReports: Boolean(roleDefaults.canExportReports)
      }
    }));
  };

  // Toggle individual permission checkbox
  const handleTogglePermission = (permKey) => {
    setFormData(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [permKey]: !prev.permissions?.[permKey]
      }
    }));
  };

  // Open creation form
  const handleOpenRegister = () => {
    setEditingUser(null);
    const initialRole = availableRoleOptions[0]?.value || 'teacher';
    const roleDefaults = DEFAULT_ROLE_PERMISSIONS[initialRole] || DEFAULT_ROLE_PERMISSIONS.student;

    setFormData({
      name: '',
      email: '',
      password: '',
      role: initialRole,
      matricula: `IPS-${Math.floor(100 + Math.random() * 900)}`,
      title: '',
      specialty: 'Bachillerato General',
      shift: 'En Línea',
      phone: '+52 (998) 845-2100',
      scope: roleDefaults.scope,
      permissions: {
        canManageUsers: initialRole === 'director',
        canCreateClassrooms: Boolean(roleDefaults.canCreateClassrooms),
        canGrade: Boolean(roleDefaults.canGrade),
        canScheduleLive: Boolean(roleDefaults.canScheduleLive),
        canPublishAnnouncements: Boolean(roleDefaults.canPublishAnnouncements),
        canViewBoletas: Boolean(roleDefaults.canViewBoletas),
        canManageCalendar: Boolean(roleDefaults.canManageCalendar),
        canExportReports: Boolean(roleDefaults.canExportReports)
      }
    });
    setIsRegisterOpen(true);
  };

  // Open edit form
  const handleOpenEdit = (user) => {
    setEditingUser(user);
    const roleDefaults = DEFAULT_ROLE_PERMISSIONS[user.role] || DEFAULT_ROLE_PERMISSIONS.student;

    setFormData({
      name: user.name || '',
      email: user.email || '',
      password: user.password || '',
      role: user.role || 'student',
      matricula: user.matricula || '',
      title: user.title || '',
      specialty: user.specialty || 'General',
      shift: user.shift || 'En Línea',
      phone: user.phone || '',
      scope: user.scope || roleDefaults.scope,
      permissions: {
        canManageUsers: user.role === 'director' || user.role === 'superadmin',
        canCreateClassrooms: user.permissions?.canCreateClassrooms ?? roleDefaults.canCreateClassrooms,
        canGrade: user.permissions?.canGrade ?? roleDefaults.canGrade,
        canScheduleLive: user.permissions?.canScheduleLive ?? roleDefaults.canScheduleLive,
        canPublishAnnouncements: user.permissions?.canPublishAnnouncements ?? roleDefaults.canPublishAnnouncements,
        canViewBoletas: user.permissions?.canViewBoletas ?? roleDefaults.canViewBoletas,
        canManageCalendar: user.permissions?.canManageCalendar ?? roleDefaults.canManageCalendar,
        canExportReports: user.permissions?.canExportReports ?? roleDefaults.canExportReports
      }
    });
    setIsRegisterOpen(true);
  };

  // Submit create or edit
  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      showToast('Campos Incompletos', 'Nombre y correo son requeridos.', 'error');
      return;
    }

    if (editingUser) {
      updateUser(editingUser.id, {
        name: formData.name.trim(),
        email: formData.email.trim(),
        role: formData.role,
        matricula: formData.matricula.trim(),
        title: formData.title.trim(),
        specialty: formData.specialty,
        shift: formData.shift,
        phone: formData.phone,
        scope: formData.scope,
        permissions: formData.permissions,
        ...(formData.password ? { password: formData.password.trim() } : {})
      });
      setIsRegisterOpen(false);
      setEditingUser(null);
    } else {
      const created = createUser({
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password.trim() || 'Ipsur2026*',
        role: formData.role,
        matricula: formData.matricula.trim(),
        title: formData.title.trim(),
        specialty: formData.specialty,
        shift: formData.shift,
        phone: formData.phone,
        scope: formData.scope,
        permissions: formData.permissions
      });
      if (created) {
        setIsRegisterOpen(false);
      }
    }
  };

  const getRoleBadge = (role, isSecret) => {
    if (isSecret) {
      return { label: 'Super Admin (Oculto)', bg: 'bg-amber-100 text-amber-900 border-amber-300' };
    }
    switch (role) {
      case 'director':
        return { label: 'Director General', bg: 'bg-rose-100 text-rose-900 border-rose-200' };
      case 'coordinator':
        return { label: 'Coordinador Escolar', bg: 'bg-purple-100 text-purple-900 border-purple-200' };
      case 'teacher':
        return { label: 'Maestro(a) Titular', bg: 'bg-indigo-100 text-indigo-900 border-indigo-200' };
      case 'student':
        return { label: 'Alumno(a) Virtual', bg: 'bg-emerald-100 text-emerald-900 border-emerald-200' };
      default:
        return { label: 'Usuario', bg: 'bg-slate-100 text-slate-800 border-slate-200' };
    }
  };

  const getScopeBadge = (scope, role) => {
    if (role === 'superadmin' || scope === 'global' || role === 'director') {
      return { label: 'Institucional Total', bg: 'bg-rose-50 text-rose-700 border-rose-200' };
    }
    if (scope === 'academic' || role === 'coordinator') {
      return { label: 'Supervisión Académica', bg: 'bg-purple-50 text-purple-700 border-purple-200' };
    }
    if (scope === 'assigned' || role === 'teacher') {
      return { label: 'Materias Asignadas', bg: 'bg-blue-50 text-blue-700 border-blue-200' };
    }
    return { label: 'Expediente Personal', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title=""
      maxWidth="max-w-6xl"
    >
      <div className="space-y-6">
        {/* Executive Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-ipsur-navy-700 to-ipsur-pink-600 p-2.5 text-white flex items-center justify-center shadow-md">
              <Users className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  Gestión de Usuarios, Permisos y Alcance
                </h2>
                {isSuperAdmin && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300 px-2 py-0.5 rounded-full">
                    <Sparkles className="w-3 h-3 text-amber-600" />
                    Super Admin
                  </span>
                )}
                {currentUser.role === 'director' && !isSuperAdmin && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-300 px-2 py-0.5 rounded-full">
                    <ShieldCheck className="w-3 h-3 text-rose-600" />
                    Dirección General
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Exclusivo para la Dirección y Administración. Asigna roles, delimita el alcance institucional y configura los permisos de visualización.
              </p>
            </div>
          </div>

          <button
            onClick={handleOpenRegister}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-ipsur-navy-800 hover:bg-ipsur-navy-900 rounded-xl shadow-md transition active:scale-95 self-start sm:self-auto"
          >
            <UserPlus className="w-4 h-4 text-pink-300" />
            <span>Registrar Nuevo Usuario</span>
          </button>
        </div>

        {/* User Creation / Editing Form Sub-Panel with Granular Permissions */}
        {isRegisterOpen && (
          <form 
            onSubmit={handleSubmitForm}
            className="bg-slate-50 border-2 border-indigo-200/80 rounded-2xl p-5 sm:p-6 space-y-5 animate-in fade-in duration-200 shadow-sm"
          >
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-indigo-100 text-indigo-700 rounded-lg">
                  <UserPlus className="w-4 h-4" />
                </span>
                <h3 className="text-sm font-bold text-slate-900">
                  {editingUser ? `Editar Usuario y Permisos: ${editingUser.name}` : 'Crear Nuevo Usuario Institucional'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsRegisterOpen(false)}
                className="text-xs text-slate-400 hover:text-slate-600 font-bold"
              >
                Cancelar
              </button>
            </div>

            {/* Basic Info Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1 uppercase tracking-wider text-[11px]">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Mtra. Elena Gómez Rivera"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-ipsur-navy-500 outline-none text-slate-800 font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1 uppercase tracking-wider text-[11px]">
                  Correo Electrónico Institucional *
                </label>
                <input
                  type="email"
                  required
                  placeholder="ejemplo@ipsur.edu.mx"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-ipsur-navy-500 outline-none text-slate-800 font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1 uppercase tracking-wider text-[11px]">
                  Rol / Perfil Institucional *
                </label>
                <select
                  value={formData.role}
                  onChange={e => handleRoleChange(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-ipsur-navy-500 outline-none text-slate-900 font-bold"
                >
                  {availableRoleOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1 uppercase tracking-wider text-[11px]">
                  Contraseña de Acceso {editingUser ? '(Opcional para cambiar)' : '*'}
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder={editingUser ? 'Dejar en blanco para mantener' : 'Mínimo 6 caracteres'}
                    value={formData.password}
                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-3 py-2 pr-9 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-ipsur-navy-500 outline-none text-slate-800 font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1 uppercase tracking-wider text-[11px]">
                  Matrícula o Clave de Empleado
                </label>
                <input
                  type="text"
                  placeholder="Ej. IPS-DOC-120"
                  value={formData.matricula}
                  onChange={e => setFormData({ ...formData, matricula: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-ipsur-navy-500 outline-none text-slate-800 font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1 uppercase tracking-wider text-[11px]">
                  Título o Cargo Formal
                </label>
                <input
                  type="text"
                  placeholder="Ej. Docente Titular de Matemáticas"
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-ipsur-navy-500 outline-none text-slate-800"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1 uppercase tracking-wider text-[11px]">
                  Turno / Modalidad
                </label>
                <select
                  value={formData.shift}
                  onChange={e => setFormData({ ...formData, shift: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-ipsur-navy-500 outline-none text-slate-800"
                >
                  <option value="En Línea">En Línea (Virtual)</option>
                  <option value="Matutino">Matutino</option>
                  <option value="Vespertino">Vespertino</option>
                  <option value="Sabatino">Sabatino</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1 uppercase tracking-wider text-[11px]">
                  Teléfono de Contacto
                </label>
                <input
                  type="text"
                  placeholder="+52 (998) 000-0000"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-ipsur-navy-500 outline-none text-slate-800"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1 uppercase tracking-wider text-[11px]">
                  Alcance de Visualización y Acción *
                </label>
                <select
                  value={formData.scope}
                  onChange={e => setFormData({ ...formData, scope: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-ipsur-navy-500 outline-none text-slate-900 font-semibold"
                >
                  <option value="global">Institucional Total (100% - Dirección General)</option>
                  <option value="academic">Supervisión Académica (Coordinación Escolar)</option>
                  <option value="assigned">Por Asignación (Solo materias y alumnos a su cargo)</option>
                  <option value="personal">Expediente Personal (Solo sus materias y notas)</option>
                </select>
              </div>
            </div>

            {/* Granular Permissions Section */}
            <div className="pt-3 border-t border-slate-200">
              <div className="flex items-center gap-2 mb-3">
                <Settings className="w-4 h-4 text-ipsur-navy-700" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Permisos Granulares Concedidos en la Plataforma
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                {[
                  { key: 'canCreateClassrooms', label: 'Crear / Editar Salas', desc: 'Apertura de materias y temarios' },
                  { key: 'canGrade', label: 'Calificar y Asentar Actas', desc: 'Evaluar tareas y emitir calificaciones' },
                  { key: 'canScheduleLive', label: 'Clases en Vivo (Meet)', desc: 'Transmitir sesiones virtuales' },
                  { key: 'canPublishAnnouncements', label: 'Avisos Institucionales', desc: 'Publicar comunicados en el muro' },
                  { key: 'canViewBoletas', label: 'Ver Boletas / Expedientes', desc: 'Historial oficial de notas' },
                  { key: 'canManageCalendar', label: 'Calendario Escolar', desc: 'Configurar periodos y cierres' },
                  { key: 'canExportReports', label: 'Exportar Actas SEP', desc: 'Descarga e impresión de actas' }
                ].map(p => {
                  const isChecked = Boolean(formData.permissions?.[p.key]);
                  return (
                    <label 
                      key={p.key}
                      className={`p-2.5 rounded-xl border flex items-start gap-2.5 cursor-pointer transition select-none ${
                        isChecked 
                          ? 'bg-indigo-50/80 border-indigo-300 text-indigo-950' 
                          : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-100/60'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleTogglePermission(p.key)}
                        className="mt-0.5 rounded border-slate-300 text-ipsur-pink-600 focus:ring-ipsur-pink-500 w-4 h-4"
                      />
                      <div className="min-w-0">
                        <span className="block text-xs font-bold leading-tight">
                          {p.label}
                        </span>
                        <span className="block text-[10px] text-slate-500 mt-0.5 leading-tight">
                          {p.desc}
                        </span>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="py-2.5 px-6 bg-ipsur-pink-600 hover:bg-ipsur-pink-700 text-white font-bold rounded-xl shadow-md transition active:scale-95 text-xs flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{editingUser ? 'Guardar Cambios y Actualizar Permisos' : 'Registrar y Habilitar Usuario'}</span>
              </button>
            </div>
          </form>
        )}

        {/* Filters and Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            {[
              { id: 'all', label: 'Todos los Usuarios', count: users.length },
              ...(canManageDirectors ? [{ id: 'director', label: 'Dirección', count: users.filter(u => u.role === 'director').length }] : []),
              { id: 'coordinator', label: 'Coordinación', count: users.filter(u => u.role === 'coordinator').length },
              { id: 'teacher', label: 'Maestros(as)', count: users.filter(u => u.role === 'teacher').length },
              { id: 'student', label: 'Alumnos(as)', count: users.filter(u => u.role === 'student').length },
            ].map(tab => {
              const active = activeAreaTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveAreaTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition flex-shrink-0 ${
                    active
                      ? 'bg-ipsur-navy-700 text-white shadow-xs'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    active ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="relative min-w-[220px]">
            <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por nombre, email o matrícula..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-ipsur-navy-500 outline-none"
            />
          </div>
        </div>

        {/* Users Table */}
        <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  <th className="py-3 px-4">Usuario / Identidad</th>
                  <th className="py-3 px-4">Correo Institucional</th>
                  <th className="py-3 px-4">Matrícula / Clave</th>
                  <th className="py-3 px-4">Área / Rol</th>
                  <th className="py-3 px-4">Alcance y Permisos</th>
                  <th className="py-3 px-4 text-center">Estado</th>
                  <th className="py-3 px-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="py-12 text-center text-slate-400">
                      <Users className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                      <p className="font-semibold">No se encontraron usuarios en esta área.</p>
                      <button
                        onClick={handleOpenRegister}
                        className="mt-2 text-xs font-bold text-ipsur-pink-600 hover:underline"
                      >
                        Registrar el primer usuario
                      </button>
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map(u => {
                    const isSecret = u.isSuperAdmin || u.role === 'superadmin';
                    const badge = getRoleBadge(u.role, isSecret);
                    const scopeBadge = getScopeBadge(u.scope, u.role);

                    // Count enabled permissions
                    const enabledPermCount = Object.values(u.permissions || {}).filter(Boolean).length;

                    return (
                      <tr key={u.id} className="hover:bg-slate-50/70 transition">
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={u.avatar}
                              alt={u.name}
                              className="w-9 h-9 rounded-full object-cover border border-slate-200 shadow-2xs flex-shrink-0"
                            />
                            <div className="min-w-0">
                              <span className="font-bold text-slate-900 block truncate leading-tight">
                                {u.name}
                              </span>
                              <span className="text-[11px] text-slate-400 truncate block">
                                {u.title}
                              </span>
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5 px-4 font-mono text-[11px] text-slate-700">
                          {u.email}
                        </td>

                        <td className="py-3.5 px-4 font-mono text-[11px] font-semibold text-slate-800">
                          {u.matricula || '—'}
                        </td>

                        <td className="py-3.5 px-4">
                          <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${badge.bg}`}>
                            {badge.label}
                          </span>
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="space-y-1">
                            <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-md border ${scopeBadge.bg}`}>
                              {scopeBadge.label}
                            </span>
                            <div className="flex items-center gap-1 text-[10px] text-slate-400">
                              <ShieldCheck className="w-3 h-3 text-emerald-600" />
                              <span>{enabledPermCount} permisos activos</span>
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5 px-4 text-center">
                          <button
                            disabled={isSecret}
                            onClick={() => toggleUserStatus(u.id)}
                            className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border transition ${
                              u.status === 'inactive'
                                ? 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
                                : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                            } ${isSecret ? 'cursor-not-allowed opacity-90' : 'cursor-pointer'}`}
                            title={isSecret ? 'Cuenta protegida' : 'Clic para cambiar estado'}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${u.status === 'inactive' ? 'bg-rose-500' : 'bg-emerald-500'}`}></span>
                            <span>{u.status === 'inactive' ? 'Inactivo' : 'Activo'}</span>
                          </button>
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleOpenEdit(u)}
                              className="p-1.5 rounded-lg text-slate-500 hover:text-ipsur-navy-700 hover:bg-slate-100 transition"
                              title="Editar datos y permisos de usuario"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>

                            {!isSecret && u.id !== currentUser.id && (
                              <button
                                onClick={() => {
                                  if (confirm(`¿Estás seguro de que deseas eliminar permanentemente a ${u.name}?`)) {
                                    deleteUser(u.id);
                                  }
                                }}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                                title="Eliminar usuario"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Modal>
  );
}