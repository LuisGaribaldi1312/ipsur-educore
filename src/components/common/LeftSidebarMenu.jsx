import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import VirtualSessionPortalModal from '../classroom/VirtualSessionPortalModal';
import InstitutionalActaModal from '../reports/InstitutionalActaModal';
import StudentGeneralBoletaModal from '../student/StudentGeneralBoletaModal';
import Modal from './Modal';
import { 
  School, 
  Users, 
  Video, 
  Award, 
  Calendar, 
  ShieldCheck, 
  LogOut, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Clock, 
  BookOpen, 
  GraduationCap, 
  Phone, 
  Mail, 
  ExternalLink,
  CheckCircle2,
  Lock,
  Layers,
  Menu,
  X,
  Compass
} from 'lucide-react';

export default function LeftSidebarMenu() {
  const { 
    currentUser, 
    activeClassroomId, 
    setActiveClassroomId, 
    classrooms, 
    periods, 
    institutionalInfo, 
    setUserManagerModalOpen, 
    logout,
    isSuperAdmin,
    showToast
  } = useApp();

  // Expanded menu state (defaults to expanded on desktop, can be collapsed/hidden with arrow click)
  const [isExpanded, setIsExpanded] = useState(() => {
    try {
      const saved = localStorage.getItem('ipsur_sidebar_expanded');
      return saved !== null ? saved === 'true' : true;
    } catch {
      return true;
    }
  });

  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Modals controlled by menu
  const [virtualPortalOpen, setVirtualPortalOpen] = useState(false);
  const [actaModalOpen, setActaModalOpen] = useState(false);
  const [boletaModalOpen, setBoletaModalOpen] = useState(false);
  const [calendarModalOpen, setCalendarModalOpen] = useState(false);
  const [infoModalOpen, setInfoModalOpen] = useState(false);

  if (!currentUser) return null;

  const toggleSidebar = () => {
    setIsExpanded(prev => {
      const next = !prev;
      try {
        localStorage.setItem('ipsur_sidebar_expanded', String(next));
      } catch (e) {
        // Ignore localStorage error in private mode
      }
      return next;
    });
  };

  const isStudent = currentUser.role === 'student';
  const canManageUsers = isSuperAdmin || currentUser.role === 'director' || currentUser.role === 'coordinator';

  // Active target classroom for acts/sessions
  const targetClassroom = classrooms.find(c => c.id === activeClassroomId) || classrooms[0] || null;

  const handleOpenGrades = () => {
    if (isStudent) {
      setBoletaModalOpen(true);
    } else {
      if (classrooms.length === 0) {
        showToast('Sin Salas Registradas', 'Crea una sala virtual primero para emitir actas oficiales.', 'info');
        return;
      }
      setActaModalOpen(true);
    }
  };

  const handleOpenVirtualSessions = () => {
    if (classrooms.length === 0) {
      showToast('Sin Salas de Clases', 'Debes registrar al menos una sala para acceder a las sesiones virtuales.', 'info');
      return;
    }
    setVirtualPortalOpen(true);
  };

  // Menu items list
  const menuItems = [
    {
      id: 'dashboard',
      label: isStudent ? 'Mis Materias' : 'Salas Virtuales',
      sublabel: 'Panel Principal',
      icon: School,
      color: 'from-blue-500 to-indigo-600',
      action: () => {
        setActiveClassroomId(null);
        showToast('Navegación', 'Regresaste al panel principal de salas.', 'info');
      },
      badge: classrooms.length > 0 ? classrooms.length : null,
      visible: true
    },
    {
      id: 'users',
      label: 'Gestión de Usuarios',
      sublabel: 'Roles y Directorio',
      icon: Users,
      color: 'from-purple-500 to-indigo-600',
      action: () => setUserManagerModalOpen(true),
      badge: isSuperAdmin ? 'Master' : null,
      visible: canManageUsers
    },
    {
      id: 'virtual_sessions',
      label: 'Clases en Vivo',
      sublabel: 'Aula Virtual y Meet',
      icon: Video,
      color: 'from-rose-500 to-pink-600',
      action: handleOpenVirtualSessions,
      live: true,
      visible: true
    },
    {
      id: 'grades',
      label: isStudent ? 'Mi Boleta Oficial' : 'Actas de Calificaciones',
      sublabel: isStudent ? 'Expediente SEP' : 'Control y Validación',
      icon: Award,
      color: 'from-amber-500 to-orange-600',
      action: handleOpenGrades,
      visible: true
    },
    {
      id: 'calendar',
      label: 'Calendario Escolar',
      sublabel: 'Periodos y Cierres',
      icon: Calendar,
      color: 'from-emerald-500 to-teal-600',
      action: () => setCalendarModalOpen(true),
      visible: true
    },
    {
      id: 'institution',
      label: 'Normativa y RVOE',
      sublabel: 'Ficha Institucional',
      icon: ShieldCheck,
      color: 'from-ipsur-navy-600 to-ipsur-pink-600',
      action: () => setInfoModalOpen(true),
      visible: true
    },
    {
      id: 'logout',
      label: 'Cerrar Sesión',
      sublabel: 'Salida Segura',
      icon: LogOut,
      color: 'from-slate-600 to-slate-800',
      action: logout,
      danger: true,
      visible: true
    }
  ].filter(item => item.visible);

  return (
    <>
      {/* Desktop Left Sidebar: Adhered directly to the portal layout structure (not floating) */}
      <aside 
        aria-label="Menú Lateral Izquierdo Adherido"
        className={`hidden lg:flex flex-col shrink-0 bg-[#0E1026] text-white border-r border-slate-200/20 shadow-md transition-all duration-300 select-none relative min-h-[calc(100vh-140px)] ${
          isExpanded ? 'w-64' : 'w-16'
        }`}
      >
        {/* Border Toggle Button (anchored right on the vertical seam between sidebar and main content) */}
        <button
          onClick={toggleSidebar}
          aria-label={isExpanded ? 'Ocultar menú lateral' : 'Mostrar menú lateral'}
          title={isExpanded ? 'Ocultar menú lateral (Contraer)' : 'Mostrar menú lateral (Expandir)'}
          className="absolute -right-3.5 top-6 z-30 w-7 h-7 rounded-full bg-[#1E1F5C] hover:bg-ipsur-pink-600 text-white border border-white/30 flex items-center justify-center shadow-lg transition-transform duration-200 hover:scale-110 active:scale-95 cursor-pointer"
        >
          {isExpanded ? (
            <ChevronLeft className="w-4 h-4 text-white" />
          ) : (
            <ChevronRight className="w-4 h-4 text-pink-300" />
          )}
        </button>

        <div className="w-full flex-1 flex flex-col justify-between p-2.5 relative">
          
          <div>
            {/* Sidebar Top Header */}
            <div className={`flex items-center pb-3 mb-2 border-b border-white/10 ${
              isExpanded ? 'justify-between px-2' : 'justify-center'
            }`}>
              {isExpanded ? (
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-ipsur-pink-500 to-indigo-600 flex items-center justify-center text-white shadow-sm flex-shrink-0">
                    <Compass className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] font-black tracking-wider uppercase text-white/90 truncate block">
                      Menú Principal
                    </span>
                    <span className="text-[9px] text-pink-300 font-medium block truncate">
                      Navegación IPSUR
                    </span>
                  </div>
                </div>
              ) : (
                <div 
                  onClick={toggleSidebar}
                  className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition"
                  title="Expandir menú lateral"
                >
                  <ChevronRight className="w-4 h-4 text-pink-300" />
                </div>
              )}

              {isExpanded && (
                <button
                  onClick={toggleSidebar}
                  className="p-1 text-white/60 hover:text-white bg-white/5 hover:bg-white/15 rounded-lg transition cursor-pointer"
                  title="Ocultar menú lateral"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Menu Navigation Items */}
            <nav className="flex flex-col gap-1.5 mt-1">
              {menuItems.map(item => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={item.action}
                    className={`group relative flex items-center rounded-2xl transition-all duration-200 cursor-pointer ${
                      isExpanded 
                        ? 'px-3 py-2.5 gap-3 hover:bg-white/10 text-left w-full' 
                        : 'w-11 h-11 justify-center hover:bg-white/15 mx-auto'
                    } ${item.danger ? 'hover:bg-rose-500/20 text-rose-300' : 'text-white'}`}
                  >
                    {/* Icon Container */}
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-tr ${item.color} text-white shadow-md group-hover:scale-105 transition-transform`}>
                      <Icon className="w-4 h-4" />
                    </div>

                    {/* Expanded Content with Titles and Badges */}
                    {isExpanded && (
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold truncate leading-tight block text-white group-hover:text-pink-200">
                            {item.label}
                          </span>
                          {item.live && (
                            <span className="text-[9px] font-bold text-rose-300 bg-rose-500/30 px-1.5 py-0.2 rounded-full border border-rose-400/40 animate-pulse">
                              VIVO
                            </span>
                          )}
                          {item.badge && (
                            <span className="text-[9px] font-mono font-bold bg-white/20 text-white px-1.5 py-0.2 rounded-full">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-white/50 block truncate leading-tight mt-0.5">
                          {item.sublabel}
                        </span>
                      </div>
                    )}

                    {/* Hover Tooltip (When collapsed, opens to the RIGHT) */}
                    {!isExpanded && (
                      <div className="absolute left-full ml-3.5 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[#0A0D1B] text-white text-xs font-bold rounded-xl shadow-2xl border border-white/20 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 flex items-center gap-2">
                        <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-[#0A0D1B] border-l border-b border-white/20 rotate-45"></div>
                        <span>{item.label}</span>
                        {item.live && (
                          <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
                        )}
                        {item.badge && (
                          <span className="text-[9px] font-mono bg-white/20 px-1.5 rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </div>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Bottom Sidebar Info */}
          {isExpanded ? (
            <div className="pt-3 border-t border-white/10 px-2 text-[10px] text-white/40 space-y-1">
              <div className="flex items-center gap-1.5 text-white/70 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="truncate">{institutionalInfo?.schoolName || 'IPSUR EDUCORE'}</span>
              </div>
              <p className="text-[9px] text-white/30 truncate">
                RVOE: {institutionalInfo?.rvoe || 'SEP-DGB Oficial'}
              </p>
            </div>
          ) : (
            <div className="pt-3 border-t border-white/10 flex justify-center">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="Sistema en Línea"></span>
            </div>
          )}

        </div>
      </aside>

      {/* Floating Trigger Button for Mobile & Tablets (Bottom-Left) */}
      <div className="fixed bottom-5 left-4 z-40 lg:hidden">
        <button
          onClick={() => setIsMobileOpen(true)}
          className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-ipsur-navy-800 to-ipsur-pink-600 text-white font-bold rounded-2xl shadow-2xl border border-white/20 active:scale-95 transition"
        >
          <Menu className="w-5 h-5" />
          <span className="text-xs font-bold tracking-wide">Menú</span>
          <span className="w-2 h-2 rounded-full bg-pink-300 animate-pulse"></span>
        </button>
      </div>

      {/* Mobile Slide-out Drawer (From Left) */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-start bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-72 max-w-[85%] h-full bg-[#0E1026] text-white p-5 flex flex-col justify-between shadow-2xl border-r border-white/10 animate-in slide-in-from-left duration-250">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-white p-1 flex items-center justify-center">
                    <img src="/ipsur-logo.png" alt="IPSUR" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <span className="text-xs font-black tracking-tight block">IPSUR EDUCORE</span>
                    <span className="text-[10px] text-pink-300 font-medium">Menú de Navegación</span>
                  </div>
                </div>

                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-1.5">
                {menuItems.map(item => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        item.action();
                        setIsMobileOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 p-2.5 rounded-xl text-left transition ${
                        item.danger ? 'hover:bg-rose-500/20 text-rose-300' : 'hover:bg-white/10 text-white'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-tr ${item.color} text-white shadow`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold truncate">{item.label}</span>
                          {item.live && (
                            <span className="text-[9px] bg-rose-500/30 text-rose-300 px-1.5 rounded border border-rose-400/30 font-bold">
                              VIVO
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-white/50 block truncate">{item.sublabel}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 text-[10px] text-white/40 text-center">
              IPSUR EDUCORE · Campus Virtual Oficial
            </div>
          </div>
        </div>
      )}

      {/* MODAL 1: CALENDARIO ESCOLAR Y PERIODOS */}
      <Modal
        isOpen={calendarModalOpen}
        onClose={() => setCalendarModalOpen(false)}
        title="Calendario Oficial y Periodos Escolares"
        subtitle="Programación oficial del ciclo académico, bimestres y fechas límite institucionales."
        maxWidth="max-w-2xl"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {periods.map(p => (
              <div 
                key={p.id}
                className={`p-4 rounded-2xl border transition ${
                  p.status === 'Activo'
                    ? 'bg-gradient-to-br from-indigo-50/70 to-pink-50/70 border-indigo-300 ring-2 ring-indigo-200'
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                    p.status === 'Activo' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {p.status}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-500">{p.type}</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900">{p.name}</h4>
                <div className="mt-3 space-y-1 text-xs text-slate-600">
                  <p className="flex items-center justify-between">
                    <span>Inicio:</span>
                    <strong className="text-slate-800 font-mono">{p.startDate}</strong>
                  </p>
                  <p className="flex items-center justify-between">
                    <span>Cierre:</span>
                    <strong className="text-slate-800 font-mono">{p.endDate}</strong>
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-1.5">
            <h5 className="font-bold text-slate-800 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-ipsur-pink-500" />
              <span>Normativa de Plazos y Evaluación Sincrónica</span>
            </h5>
            <p className="leading-relaxed">
              Las fechas de entrega de tareas y evaluaciones cuentan con control de tiempo regresivo estricto. Al concluir la hora límite establecida por el docente o la institución, la plataforma cierra automáticamente el formulario de entrega para garantizar la equidad académica.
            </p>
          </div>
        </div>
      </Modal>

      {/* MODAL 2: FICHA INSTITUCIONAL Y RVOE SEP */}
      <Modal
        isOpen={infoModalOpen}
        onClose={() => setInfoModalOpen(false)}
        title="Ficha Oficial Institucional"
        subtitle="Registro de validez oficial, datos de contacto y acreditación ante la autoridad educativa."
        maxWidth="max-w-2xl"
      >
        <div className="space-y-4">
          <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div className="w-16 h-16 rounded-2xl bg-white p-2 flex items-center justify-center border border-slate-200 shadow-sm flex-shrink-0">
              <img src="/ipsur-logo.png" alt="IPSUR Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <h4 className="text-base font-black text-slate-900">
                {institutionalInfo?.schoolName || 'Instituto Peninsular del Sur'}
              </h4>
              <p className="text-xs text-slate-600 font-medium italic">
                "{institutionalInfo?.schoolMotto || 'La educación es el camino'}"
              </p>
              <div className="mt-1.5 flex flex-wrap gap-2 text-[11px]">
                <span className="bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
                  {institutionalInfo?.rvoe || 'RVOE-SEP-DGB-2024-09882'}
                </span>
                <span className="bg-slate-200 text-slate-700 font-semibold px-2 py-0.5 rounded-full">
                  Validez SEP / DGB
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
              <span className="font-bold text-slate-800 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-ipsur-pink-500" />
                <span>Correo de Soporte Técnico:</span>
              </span>
              <p className="text-slate-600 font-mono text-[11px]">{institutionalInfo?.supportEmail || 'soporte.educore@ipsur.edu.mx'}</p>
            </div>

            <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
              <span className="font-bold text-slate-800 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-ipsur-pink-500" />
                <span>Atención Telefónica:</span>
              </span>
              <p className="text-slate-600 font-mono text-[11px]">{institutionalInfo?.phone || '+52 (998) 845-2100'}</p>
            </div>
          </div>

          <div className="p-3.5 bg-blue-50/70 rounded-xl border border-blue-200 text-xs text-blue-900 leading-relaxed">
            <strong>Campus Virtual Peninsular:</strong> El sistema IPSUR EDUCORE opera bajo los estándares de educación media superior y superior en línea, con firma electrónica de actas y trazabilidad académica en tiempo real.
          </div>
        </div>
      </Modal>

      {/* MODAL 3: CENTRO DE SESIONES VIRTUALES (AULA VIRTUAL Y MEET) */}
      {targetClassroom && (
        <VirtualSessionPortalModal
          isOpen={virtualPortalOpen}
          onClose={() => setVirtualPortalOpen(false)}
          classroom={targetClassroom}
        />
      )}

      {/* MODAL 4: ACTA OFICIAL INSTITUCIONAL (DOCENTES / DIRECTIVOS) */}
      {targetClassroom && !isStudent && (
        <InstitutionalActaModal
          isOpen={actaModalOpen}
          onClose={() => setActaModalOpen(false)}
          classroom={targetClassroom}
        />
      )}

      {/* MODAL 5: BOLETA OFICIAL PERSONAL (ALUMNO) */}
      {isStudent && (
        <StudentGeneralBoletaModal
          isOpen={boletaModalOpen}
          onClose={() => setBoletaModalOpen(false)}
        />
      )}
    </>
  );
}