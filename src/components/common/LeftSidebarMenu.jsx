import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import VirtualSessionPortalModal from '../classroom/VirtualSessionPortalModal';
import InstitutionalActaModal from '../reports/InstitutionalActaModal';
import InstitutionalReportsModal from '../reports/InstitutionalReportsModal';
import StudentGeneralBoletaModal from '../student/StudentGeneralBoletaModal';
import RegisterStudentModal from '../services/RegisterStudentModal';
import PaymentsAccountingModal from '../services/PaymentsAccountingModal';
import SchedulesModal from '../services/SchedulesModal';
import AnnouncementsModal from '../services/AnnouncementsModal';
import PendingProceduresModal from '../services/PendingProceduresModal';
import SystemTutorialModal from '../services/SystemTutorialModal';
import RectoriaDirectivaModal from '../services/RectoriaDirectivaModal';
import CoordinacionEscolarModal from '../services/CoordinacionEscolarModal';
import DocentesModal from '../services/DocentesModal';
import AlumnosModal from '../services/AlumnosModal';
import CreateClassroomModal from '../coordinator/CreateClassroomModal';
import EditClassroomModal from '../coordinator/EditClassroomModal';
import RubricModal from '../coordinator/RubricModal';
import Modal from './Modal';
import { 
  Home,
  ShieldCheck, 
  School, 
  FileText, 
  BookOpen, 
  CreditCard, 
  Users, 
  GraduationCap, 
  BarChart3, 
  Settings, 
  ChevronRight, 
  ChevronLeft, 
  LogOut, 
  Sparkles, 
  Calendar,
  Compass,
  Menu,
  X,
  ExternalLink
} from 'lucide-react';

export default function LeftSidebarMenu() {
  const { 
    currentUser, 
    activeClassroomId, 
    setActiveClassroomId, 
    classrooms, 
    periods, 
    users,
    procedures,
    institutionalInfo, 
    setUserManagerModalOpen, 
    logout,
    isSuperAdmin,
    showToast
  } = useApp();

  // Expanded menu state (defaults to expanded on desktop)
  const [isExpanded, setIsExpanded] = useState(() => {
    try {
      const saved = localStorage.getItem('ipsur_sidebar_expanded');
      return saved !== null ? saved === 'true' : true;
    } catch {
      return true;
    }
  });

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('inicio');

  // Modals controlled by menu services
  const [rectoriaModalOpen, setRectoriaModalOpen] = useState(false);
  const [direccionModalOpen, setDireccionModalOpen] = useState(false);
  const [proceduresModalOpen, setProceduresModalOpen] = useState(false);
  const [coordinacionModalOpen, setCoordinacionModalOpen] = useState(false);
  const [paymentsModalOpen, setPaymentsModalOpen] = useState(false);
  const [docentesModalOpen, setDocentesModalOpen] = useState(false);
  const [alumnosModalOpen, setAlumnosModalOpen] = useState(false);
  const [reportsModalOpen, setReportsModalOpen] = useState(false);

  // Sub-modals triggered from directories
  const [registerStudentModalOpen, setRegisterStudentModalOpen] = useState(false);
  const [createClassroomModalOpen, setCreateClassroomModalOpen] = useState(false);
  const [editingClassroom, setEditingClassroom] = useState(null);
  const [rubricClassroom, setRubricClassroom] = useState(null);
  const [boletaModalOpen, setBoletaModalOpen] = useState(false);
  const [virtualPortalOpen, setVirtualPortalOpen] = useState(false);

  if (!currentUser) return null;

  const toggleSidebar = () => {
    setIsExpanded(prev => {
      const next = !prev;
      try {
        localStorage.setItem('ipsur_sidebar_expanded', String(next));
      } catch (e) {
        // Ignore
      }
      return next;
    });
  };

  // Listen to hamburger toggle button from top navbar
  React.useEffect(() => {
    const handleToggle = () => {
      if (window.innerWidth < 1024) {
        setIsMobileOpen(prev => !prev);
      } else {
        toggleSidebar();
      }
    };
    window.addEventListener('toggle-ipsur-sidebar', handleToggle);
    return () => window.removeEventListener('toggle-ipsur-sidebar', handleToggle);
  }, []);

  const isStudent = currentUser.role === 'student';
  const isTeacher = currentUser.role === 'teacher';
  const canManageUsers = isSuperAdmin || currentUser.role === 'director' || currentUser.role === 'rector';
  const teacherClassrooms = (classrooms || []).filter(c => c.teacherId === currentUser.id);

  const totalStudents = (users || []).filter(u => u.role === 'student').length;
  const totalTeachers = (users || []).filter(u => u.role === 'teacher').length;
  const pendingProceduresCount = (procedures || []).filter(p => p.status === 'Pendiente').length;

  // Menu items list matching the official IPSUR EDUCORE architecture with strict role permissions
  const menuItems = [
    {
      id: 'inicio',
      label: 'Inicio',
      icon: Home,
      isActive: activeTab === 'inicio' && !activeClassroomId,
      action: () => {
        setActiveTab('inicio');
        setActiveClassroomId(null);
        showToast('Inicio', 'Panel Principal · Campus Virtual IPSUR', 'info');
      },
      visible: true
    },
    {
      id: 'rectoria',
      label: 'Rectoría',
      icon: ShieldCheck,
      hasChevron: true,
      action: () => {
        setActiveTab('rectoria');
        setRectoriaModalOpen(true);
      },
      visible: true
    },
    {
      id: 'direccion',
      label: 'Dirección',
      icon: School,
      hasChevron: true,
      action: () => {
        setActiveTab('direccion');
        setDireccionModalOpen(true);
      },
      visible: true
    },
    {
      id: 'servicios_escolares',
      label: 'Servicios Escolares',
      icon: FileText,
      hasChevron: true,
      badge: pendingProceduresCount > 0 ? String(pendingProceduresCount) : null,
      action: () => {
        setActiveTab('servicios_escolares');
        setProceduresModalOpen(true);
      },
      visible: true
    },
    {
      id: 'coordinacion',
      label: isStudent ? 'Mis Clases Virtuales' : (isTeacher ? 'Mis Clases Asignadas' : 'Coordinación Escolar'),
      icon: BookOpen,
      badge: isTeacher 
        ? (teacherClassrooms.length > 0 ? String(teacherClassrooms.length) : null)
        : (!isStudent && classrooms.length > 0 ? String(classrooms.length) : null),
      action: () => {
        if (isStudent || isTeacher) {
          setActiveTab('coordinacion');
          setActiveClassroomId(null);
          showToast(isTeacher ? 'Mis Clases Asignadas' : 'Mis Clases Virtuales', 'Aulas virtuales y sesiones en vivo.', 'info');
        } else {
          setActiveTab('coordinacion');
          setCoordinacionModalOpen(true);
        }
      },
      visible: true
    },
    {
      id: 'administrativo',
      label: isStudent ? 'Mis Pagos y Colegiaturas' : 'Administrativo y Contabilidad',
      icon: CreditCard,
      action: () => {
        if (isTeacher) {
          showToast('Acceso Restringido', 'El perfil docente no tiene acceso a la administración y contabilidad.', 'warning');
          return;
        }
        setActiveTab('administrativo');
        setPaymentsModalOpen(true);
      },
      visible: !isTeacher && !isStudent // STRICT: Teachers and students do NOT see Administrativo y Contabilidad
    },
    {
      id: 'docentes',
      label: isTeacher ? 'Claustro y Horarios' : (isStudent ? 'Mis Docentes y Horarios' : 'Docentes'),
      icon: Users,
      badge: !isStudent && !isTeacher && totalTeachers > 0 ? String(totalTeachers) : null,
      action: () => {
        setActiveTab('docentes');
        setDocentesModalOpen(true);
      },
      visible: true
    },
    {
      id: 'alumnos',
      label: isStudent ? 'Mi Expediente y Boleta' : (isTeacher ? 'Alumnos de Mis Clases' : 'Alumnos'),
      icon: GraduationCap,
      badge: !isStudent && !isTeacher && totalStudents > 0 ? String(totalStudents) : null,
      action: () => {
        if (isStudent) {
          setActiveTab('alumnos');
          setBoletaModalOpen(true);
        } else {
          setActiveTab('alumnos');
          setAlumnosModalOpen(true);
        }
      },
      visible: true
    },
    {
      id: 'reportes',
      label: isStudent ? 'Mi Boleta Oficial' : (isTeacher ? 'Actas de Evaluación' : 'Reportes y Estadísticas'),
      icon: BarChart3,
      action: () => {
        if (isStudent) {
          setActiveTab('reportes');
          setBoletaModalOpen(true);
        } else {
          setActiveTab('reportes');
          setReportsModalOpen(true);
        }
      },
      visible: true
    },
    {
      id: 'configuracion',
      label: 'Configuración',
      icon: Settings,
      action: () => {
        if (isStudent || isTeacher) {
          showToast('Acceso Denegado', 'No cuentas con autorización para el panel de configuración institucional.', 'error');
          return;
        }
        setActiveTab('configuracion');
        if (canManageUsers) {
          setUserManagerModalOpen(true);
        } else {
          showToast('Configuración', 'Acceso exclusivo para Rectoría, Dirección y Super Admin.', 'warning');
        }
      },
      visible: !isStudent && !isTeacher && canManageUsers // Teachers and students NEVER see Configuración
    }
  ].filter(i => i.visible);

  return (
    <>
      {/* Desktop Left Sidebar: Adhered directly to layout structure with IPSUR Navy Palette */}
      <aside
        aria-label="Menú Lateral IPSUR EDUCORE"
        className={`hidden lg:flex flex-col shrink-0 bg-[#0A0D1B] text-white border-r border-[#1E1F5C]/40 shadow-xl transition-all duration-300 select-none relative min-h-[calc(100vh-80px)] ${
          isExpanded ? 'w-64' : 'w-16'
        }`}
      >
        {/* Toggle Collapse/Expand Button with IPSUR Pink Accent */}
        <button
          onClick={toggleSidebar}
          aria-label={isExpanded ? 'Ocultar menú lateral' : 'Mostrar menú lateral'}
          title={isExpanded ? 'Contraer menú lateral' : 'Expandir menú lateral'}
          className="absolute -right-3.5 top-6 z-30 w-7 h-7 rounded-full bg-ipsur-pink-600 hover:bg-ipsur-pink-700 text-white border border-pink-300 flex items-center justify-center shadow-lg transition-transform duration-200 hover:scale-110 active:scale-95 cursor-pointer"
        >
          {isExpanded ? (
            <ChevronLeft className="w-4 h-4 text-white" />
          ) : (
            <ChevronRight className="w-4 h-4 text-white" />
          )}
        </button>

        <div className="w-full flex-1 flex flex-col justify-between p-3 relative">
          <div>
            {/* Sidebar Top Header with Official IPSUR Logo */}
            <div className={`pb-4 mb-3 border-b border-white/10 ${
              isExpanded ? 'flex flex-col items-center text-center' : 'flex justify-center'
            }`}>
              {isExpanded ? (
                <div className="flex flex-col items-center">
                  {/* Clean White Container for Official IPSUR Logo */}
                  <div className="w-16 h-16 rounded-[22px] bg-white p-2 flex items-center justify-center shadow-xl mb-2.5 border-2 border-white/90">
                    <img 
                      src="/ipsur-logo.png" 
                      alt="IPSUR Logo Oficial" 
                      className="w-full h-full object-contain filter drop-shadow" 
                    />
                  </div>
                  <h2 className="font-display text-xl font-black tracking-tight text-white leading-none">
                    IPSUR <span className="text-ipsur-pink-500">EDUCORE</span>
                  </h2>
                  <span className="font-display text-[10px] font-bold text-indigo-200 tracking-widest uppercase mt-1">
                    Academic Management System
                  </span>
                  <p className="italic text-[10px] text-pink-300/90 font-light mt-1 max-w-[200px]">
                    "La educación es el camino"
                  </p>
                </div>
              ) : (
                <div
                  onClick={toggleSidebar}
                  className="w-10 h-10 rounded-xl bg-white p-1 text-white flex items-center justify-center cursor-pointer shadow-md hover:scale-105 transition"
                  title="IPSUR EDUCORE (Clic para expandir)"
                >
                  <img src="/ipsur-logo.png" alt="IPSUR Logo" className="w-full h-full object-contain" />
                </div>
              )}
            </div>

            {/* Menu Items with IPSUR Navy to Pink Gradient for Active Item */}
            <nav className="flex flex-col gap-1">
              {menuItems.map(item => {
                const Icon = item.icon;
                const isActive = item.isActive;
                return (
                  <button
                    key={item.id}
                    onClick={item.action}
                    className={`group relative flex items-center rounded-xl transition-all duration-150 cursor-pointer ${
                      isExpanded
                        ? `px-3.5 py-2.5 gap-3 w-full text-left ${
                            isActive
                              ? 'bg-gradient-to-r from-ipsur-navy-700 via-ipsur-navy-600 to-ipsur-pink-600 text-white shadow-[0_4px_16px_rgba(230,0,126,0.35)] font-bold'
                              : 'text-slate-300 hover:text-white hover:bg-white/10 font-medium'
                          }`
                        : `w-10 h-10 justify-center mx-auto ${
                            isActive
                              ? 'bg-gradient-to-r from-ipsur-navy-700 to-ipsur-pink-600 text-white shadow-md'
                              : 'text-slate-300 hover:text-white hover:bg-white/10'
                          }`
                    }`}
                  >
                    <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-white' : 'text-slate-300 group-hover:text-pink-300'}`} />

                    {isExpanded && (
                      <div className="flex-1 flex items-center justify-between min-w-0">
                        <span className="text-xs truncate tracking-wide">
                          {item.label}
                        </span>
                        <div className="flex items-center gap-1.5 ml-2">
                          {item.badge && (
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-white/20 text-white font-mono">
                              {item.badge}
                            </span>
                          )}
                          {item.hasChevron && (
                            <ChevronRight className="w-3.5 h-3.5 text-pink-300/70 group-hover:text-pink-300 group-hover:translate-x-0.5 transition-transform" />
                          )}
                        </div>
                      </div>
                    )}

                    {/* Tooltip when collapsed */}
                    {!isExpanded && (
                      <div className="absolute left-full ml-3.5 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[#0A0D1B] text-white text-xs font-bold rounded-xl shadow-2xl border border-white/20 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 flex items-center gap-2">
                        <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-[#0A0D1B] border-l border-b border-white/20 rotate-45"></div>
                        <span>{item.label}</span>
                        {item.badge && (
                          <span className="text-[9px] font-mono bg-ipsur-pink-500 text-white px-1.5 rounded-full">
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

          {/* Bottom Sidebar Card: IPSUR Official Palette Card */}
          {isExpanded ? (
            <div className="mt-6 pt-3 border-t border-white/10">
              <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-gradient-to-br from-[#0A0D1B] via-[#141B41] to-[#750042] shadow-lg p-3.5 text-center group">
                <div className="relative z-10">
                  <p className="font-display font-black text-white text-xs leading-snug">
                    IPSUR EDUCORE
                  </p>
                  <p className="text-[10px] text-pink-200 font-medium leading-tight mt-0.5 italic">
                    "La educación es el camino"
                  </p>
                  <p className="text-[9px] text-slate-300 font-light mt-1">
                    Bachillerato en Línea SEP
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="pt-3 border-t border-white/10 flex justify-center">
              <span className="w-2 h-2 rounded-full bg-ipsur-pink-500 animate-pulse" title="Sistema en Línea"></span>
            </div>
          )}
        </div>
      </aside>

      {/* Floating Trigger Button for Mobile & Tablets */}
      <div className="fixed bottom-5 left-4 z-40 lg:hidden">
        <button
          onClick={() => setIsMobileOpen(true)}
          className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-ipsur-navy-800 to-ipsur-pink-600 text-white font-bold rounded-2xl shadow-2xl border border-white/20 active:scale-95 transition"
        >
          <Menu className="w-5 h-5" />
          <span className="text-xs font-bold tracking-wide">Menú</span>
        </button>
      </div>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-start bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-72 max-w-[85%] h-full bg-[#0A0D1B] text-white p-5 flex flex-col justify-between shadow-2xl border-r border-white/10 animate-in slide-in-from-left duration-250">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-white p-1 flex items-center justify-center">
                    <img src="/ipsur-logo.png" alt="IPSUR" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-white text-sm">IPSUR EDUCORE</h3>
                    <p className="text-[10px] text-pink-300">Menú Móvil</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="p-1.5 rounded-lg text-white/70 hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex flex-col gap-1.5">
                {menuItems.map(item => {
                  const Icon = item.icon;
                  const isActive = item.isActive;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        item.action();
                        setIsMobileOpen(false);
                      }}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition ${
                        isActive
                          ? 'bg-gradient-to-r from-ipsur-navy-700 to-ipsur-pink-600 text-white'
                          : 'text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </div>
                      {item.hasChevron && <ChevronRight className="w-4 h-4 text-pink-300" />}
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="pt-4 border-t border-white/10">
              <button
                onClick={logout}
                className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-bold text-rose-300 hover:bg-rose-500/20 rounded-xl border border-rose-400/30 transition"
              >
                <LogOut className="w-4 h-4" />
                <span>Cerrar Sesión</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 1. Coordinación Escolar Modal */}
      <CoordinacionEscolarModal
        isOpen={coordinacionModalOpen}
        onClose={() => setCoordinacionModalOpen(false)}
        onOpenCreateClassroom={() => setCreateClassroomModalOpen(true)}
        onOpenEditClassroom={(classroom) => setEditingClassroom(classroom)}
        onOpenRubric={(classroom) => setRubricClassroom(classroom)}
        onSelectClassroom={(id) => {
          setActiveClassroomId(id);
          setActiveTab('coordinacion');
        }}
      />

      {/* 2. Docentes Modal */}
      <DocentesModal
        isOpen={docentesModalOpen}
        onClose={() => setDocentesModalOpen(false)}
      />

      {/* 3. Alumnos Modal */}
      <AlumnosModal
        isOpen={alumnosModalOpen}
        onClose={() => setAlumnosModalOpen(false)}
        onOpenRegisterStudent={() => setRegisterStudentModalOpen(true)}
        onOpenBoleta={(student) => setBoletaModalOpen(true)}
      />

      {/* 4. Reportes y Estadísticas Modal */}
      <InstitutionalReportsModal
        isOpen={reportsModalOpen}
        onClose={() => setReportsModalOpen(false)}
      />

      {/* 5. Servicios Escolares / Trámites */}
      <PendingProceduresModal
        isOpen={proceduresModalOpen}
        onClose={() => setProceduresModalOpen(false)}
      />

      {/* 6. Administrativo y Contabilidad */}
      <PaymentsAccountingModal
        isOpen={paymentsModalOpen}
        onClose={() => setPaymentsModalOpen(false)}
      />

      {/* 7. Rectoría */}
      <RectoriaDirectivaModal
        isOpen={rectoriaModalOpen}
        onClose={() => setRectoriaModalOpen(false)}
        initialTab="rectoria"
      />

      {/* 8. Dirección */}
      <RectoriaDirectivaModal
        isOpen={direccionModalOpen}
        onClose={() => setDireccionModalOpen(false)}
        initialTab="direccion"
      />

      {/* Linked Supporting Modals */}
      <RegisterStudentModal
        isOpen={registerStudentModalOpen}
        onClose={() => setRegisterStudentModalOpen(false)}
      />

      <CreateClassroomModal
        isOpen={createClassroomModalOpen}
        onClose={() => setCreateClassroomModalOpen(false)}
      />

      {editingClassroom && (
        <EditClassroomModal
          isOpen={Boolean(editingClassroom)}
          onClose={() => setEditingClassroom(null)}
          classroom={editingClassroom}
        />
      )}

      {rubricClassroom && (
        <RubricModal
          isOpen={Boolean(rubricClassroom)}
          onClose={() => setRubricClassroom(null)}
          classroom={rubricClassroom}
        />
      )}

      <StudentGeneralBoletaModal
        isOpen={boletaModalOpen}
        onClose={() => setBoletaModalOpen(false)}
      />
    </>
  );
}
