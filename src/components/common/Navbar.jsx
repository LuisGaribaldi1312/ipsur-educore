import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import LiveClock from './LiveClock';
import UserManagerModal from '../admin/UserManagerModal';
import LoginModal from '../auth/LoginModal';
import { 
  GraduationCap, 
  Users, 
  UserCheck, 
  BookOpen, 
  ShieldCheck, 
  ChevronDown, 
  RotateCcw, 
  Sparkles, 
  School, 
  ExternalLink, 
  Layers, 
  LayoutGrid, 
  Menu, 
  Bell, 
  Calendar,
  Clock,
  CheckCircle2, 
  AlertCircle, 
  Info, 
  X, 
  LogOut, 
  UserPlus, 
  KeyRound, 
  Lock 
} from 'lucide-react';

export default function Navbar() {
  const { 
    currentUser, 
    users, 
    switchUser, 
    activeClassroomId, 
    setActiveClassroomId,
    notification,
    clearNotification,
    notificationsList,
    periods,
    loginModalOpen,
    setLoginModalOpen,
    userManagerModalOpen,
    setUserManagerModalOpen,
    logout,
    isSuperAdmin
  } = useApp();

  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  // Real-time ticking clock (ticks every second)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDay = currentDateTime.toLocaleDateString('es-MX', { weekday: 'long' });
  const formattedDayCapitalized = formattedDay.charAt(0).toUpperCase() + formattedDay.slice(1);
  const formattedDate = currentDateTime.toLocaleDateString('es-MX', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
  const formattedTime12 = currentDateTime.toLocaleTimeString('es-MX', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });

  const activePeriod = periods.find(p => p.status === 'Activo') || periods[0];

  const getRoleLabel = (role, title) => {
    if (role === 'rector' || title?.toLowerCase().includes('rector')) return 'Rector';
    if (role === 'superadmin') return 'Rector & Super Admin';
    if (role === 'director') return 'Director General';
    if (role === 'coordinator') return 'Coordinador Escolar';
    if (role === 'teacher') return 'Docente Titular';
    if (role === 'student') return 'Estudiante';
    return 'Directivo';
  };

  const userRoleLabel = getRoleLabel(currentUser?.role, currentUser?.title);
  const canManageUsers = isSuperAdmin || currentUser?.role === 'director' || currentUser?.role === 'rector';

  return (
    <>
      {/* Toast Notification Alert */}
      {notification && (
        <div className="fixed top-4 right-4 z-50 max-w-md animate-in slide-in-from-top-2 duration-300">
          <div className={`p-4 rounded-2xl shadow-2xl border flex items-start gap-3 backdrop-blur-md ${
            notification.type === 'error' 
              ? 'bg-rose-950/90 text-rose-100 border-rose-800' 
              : notification.type === 'warning'
              ? 'bg-amber-950/90 text-amber-100 border-amber-800'
              : 'bg-emerald-950/90 text-emerald-100 border-emerald-800'
          }`}>
            <div className="p-1 rounded-xl bg-white/10 flex-shrink-0">
              {notification.type === 'error' ? (
                <AlertCircle className="w-5 h-5 text-rose-400" />
              ) : notification.type === 'warning' ? (
                <AlertCircle className="w-5 h-5 text-amber-400" />
              ) : (
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              )}
            </div>
            <div className="flex-1 min-w-0 pr-2">
              <h5 className="font-bold text-xs">{notification.title}</h5>
              <p className="text-[11px] text-white/80 mt-0.5 leading-snug">{notification.message}</p>
            </div>
            <button 
              onClick={clearNotification}
              className="text-white/60 hover:text-white p-1 rounded-lg hover:bg-white/10"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Main Executive Clean White Navbar matching Screenshot */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18">
            
            {/* Left Header Section: Hamburger + Grid Icon + Panel de Control */}
            <div className="flex items-center gap-3 sm:gap-4">
              <button
                type="button"
                onClick={() => {
                  const event = new CustomEvent('toggle-ipsur-sidebar');
                  window.dispatchEvent(event);
                }}
                className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition cursor-pointer"
                title="Menú lateral: Haz clic para mostrar u ocultar la barra de opciones de navegación"
              >
                <Menu className="w-5 h-5" />
              </button>

              {/* Real-Time Date & Time in IPSUR Gradient Capsule (Replaces Panel de Control) */}
              <div 
                className="flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-[#0A0D1B] via-[#1E1F5C] to-[#8A004B] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl shadow-md border border-white/15 select-none"
                title="Fecha y hora oficial de México sincronizadas en tiempo real en la plataforma escolar"
              >
                {/* Live pulsing dot in IPSUR Pink */}
                <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5 flex-shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ipsur-pink-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-ipsur-pink-500"></span>
                </span>

                {/* Real-Time Date */}
                <div className="flex items-center gap-1.5 text-xs sm:text-[13px] font-medium text-white/95">
                  <Calendar className="w-3.5 h-3.5 text-pink-300 flex-shrink-0" />
                  <span className="font-sans font-semibold tracking-wide capitalize">
                    {formattedDayCapitalized}, {formattedDate}
                  </span>
                </div>

                <span className="text-white/30 text-xs hidden sm:inline">•</span>

                {/* Real-Time Clock */}
                <div className="flex items-center gap-1.5 text-xs sm:text-[13px] font-mono font-black text-pink-200 tracking-wider">
                  <Clock className="w-3.5 h-3.5 text-pink-300 flex-shrink-0" />
                  <span>{formattedTime12}</span>
                </div>
              </div>

              {activeClassroomId && (
                <button
                  type="button"
                  onClick={() => setActiveClassroomId(null)}
                  className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-ipsur-navy-700 to-ipsur-pink-600 hover:from-ipsur-navy-800 hover:to-ipsur-pink-700 rounded-xl shadow-xs transition cursor-pointer"
                  title="Volver a la vista general de todas las salas de clases virtuales"
                >
                  <span>← Mis Salas</span>
                </button>
              )}
            </div>

            {/* Right Header Section: Notifications + Divider + Profile Info */}
            <div className="flex items-center gap-3 sm:gap-4">
              
              {/* Notifications Bell */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition cursor-pointer"
                  title="Notificaciones: Consulta avisos institucionales, convocatorias de exámenes y alertas urgentes"
                >
                  <Bell className="w-5 h-5" />
                  {(notificationsList || []).length > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-ipsur-pink-500 text-white text-[10px] font-black flex items-center justify-center shadow-xs">
                      {notificationsList.length}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {notificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white shadow-2xl border border-slate-200 py-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                      <span className="font-display font-black text-xs text-slate-900 uppercase tracking-wider">
                        Notificaciones Institucionales
                      </span>
                      <span className="text-[10px] text-ipsur-pink-600 font-bold">
                        {(notificationsList || []).length} nuevas
                      </span>
                    </div>

                    <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                      {(notificationsList || []).length === 0 ? (
                        <div className="p-6 text-center text-xs text-slate-400">
                          <Bell className="w-6 h-6 text-slate-300 mx-auto mb-1.5" />
                          No tienes notificaciones pendientes. Todo al día.
                        </div>
                      ) : (
                        notificationsList.map((n, i) => (
                          <div key={n.id || i} className="p-3 hover:bg-slate-50 transition flex items-start gap-3">
                            <span className={`w-2.5 h-2.5 rounded-full mt-1 flex-shrink-0 ${n.color || 'bg-ipsur-pink-500'}`}></span>
                            <div className="min-w-0 flex-1">
                              <p className="text-xs font-bold text-slate-800 leading-snug">{n.title}</p>
                              <p className="text-[11px] text-slate-500 mt-0.5">{n.description}</p>
                              <span className="text-[10px] text-slate-400 mt-1 block">{n.time}</span>
                            </div>
                          </div>
                        ))
                      )}
                    </div>

                    <div className="pt-2 px-4 border-t border-slate-100 text-center">
                      <button
                        onClick={() => setNotificationsOpen(false)}
                        className="text-xs font-bold text-blue-600 hover:underline"
                      >
                        Cerrar avisos
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Vertical Divider matching screenshot */}
              <div className="h-6 w-px bg-slate-300"></div>

              {/* User Profile matching Screenshot */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-slate-50 transition text-left cursor-pointer"
                  title="Tu perfil escolar: Datos personales, cambio de rol para pruebas y cierre seguro de sesión"
                >
                  <img
                    src={currentUser?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80'}
                    alt={currentUser?.name || 'Usuario'}
                    className="w-9 h-9 rounded-full object-cover border border-slate-300 shadow-xs"
                  />
                  <div className="hidden sm:block text-left">
                    <p className="text-xs font-bold text-slate-900 leading-tight">
                      {currentUser?.name || 'Luis Alberto Garibaldi'}
                    </p>
                    <p className="text-[11px] text-slate-500 font-medium leading-tight">
                      {userRoleLabel}
                    </p>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
                </button>

                {/* Profile & Session Dropdown Menu */}
                {profileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-white shadow-2xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-4 py-3 border-b border-slate-100 bg-slate-50">
                      <p className="text-xs font-bold text-slate-900">{currentUser?.name}</p>
                      <p className="text-[11px] text-slate-500 font-mono truncate">{currentUser?.email}</p>
                      <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-900 border border-blue-200 mt-1.5">
                        {userRoleLabel}
                      </span>
                    </div>

                    <div className="p-2 space-y-1">
                      {canManageUsers && (
                        <button
                          onClick={() => {
                            setProfileMenuOpen(false);
                            setUserManagerModalOpen(true);
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 rounded-xl transition"
                        >
                          <Users className="w-4 h-4 text-blue-600" />
                          <span>Gestión de Usuarios y Roles</span>
                        </button>
                      )}

                      {/* Fast Role Switch for testing */}
                      <div className="pt-2 border-t border-slate-100">
                        <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                          Cambiar de Perfil
                        </p>
                        {users.map(u => (
                          <button
                            key={u.id}
                            onClick={() => {
                              switchUser(u.id);
                              setProfileMenuOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-3 py-1.5 text-xs rounded-lg transition ${
                              u.id === currentUser?.id ? 'bg-blue-50 text-blue-900 font-bold' : 'text-slate-600 hover:bg-slate-50'
                            }`}
                          >
                            <span className="truncate">{u.name}</span>
                            <span className="text-[10px] text-slate-400 uppercase font-mono">{u.role}</span>
                          </button>
                        ))}
                      </div>

                      <div className="pt-2 border-t border-slate-100">
                        <button
                          onClick={() => {
                            setProfileMenuOpen(false);
                            logout();
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Cerrar Sesión</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

            </div>

          </div>
        </div>
      </header>

      {/* Global Modals */}
      <UserManagerModal
        isOpen={userManagerModalOpen}
        onClose={() => setUserManagerModalOpen(false)}
      />

      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
      />
    </>
  );
}
