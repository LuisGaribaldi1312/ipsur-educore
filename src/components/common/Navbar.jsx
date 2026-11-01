import React, { useState } from 'react';
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
    periods,
    loginModalOpen,
    setLoginModalOpen,
    userManagerModalOpen,
    setUserManagerModalOpen,
    logout,
    isSuperAdmin
  } = useApp();

  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const activePeriod = periods.find(p => p.status === 'Activo') || periods[0];

  const getRoleBadge = (role, isSecret) => {
    if (isSecret || role === 'superadmin') {
      return { 
        label: 'Super Admin (Oculto)', 
        bg: 'bg-gradient-to-r from-amber-100 to-amber-200 text-amber-950 border-amber-300 shadow-2xs font-black', 
        icon: Lock 
      };
    }
    switch (role) {
      case 'director':
        return { label: 'Director General', bg: 'bg-rose-100 text-rose-900 border-rose-200 font-bold', icon: School };
      case 'coordinator':
        return { label: 'Coordinador Escolar', bg: 'bg-purple-100 text-purple-800 border-purple-200 font-bold', icon: ShieldCheck };
      case 'teacher':
        return { label: 'Profesor / Docente', bg: 'bg-indigo-100 text-indigo-800 border-indigo-200 font-bold', icon: BookOpen };
      case 'student':
        return { label: 'Estudiante Prepa Virtual', bg: 'bg-emerald-100 text-emerald-800 border-emerald-200 font-bold', icon: GraduationCap };
      default:
        return { label: 'Usuario', bg: 'bg-slate-100 text-slate-800 border-slate-200 font-bold', icon: Users };
    }
  };

  const currentBadge = getRoleBadge(currentUser?.role, currentUser?.isSuperAdmin);
  const BadgeIcon = currentBadge.icon;

  const canManageUsers = isSuperAdmin || currentUser?.role === 'director' || currentUser?.role === 'coordinator';

  return (
    <>
      {/* Institutional Top Header Strip */}
      <div className="bg-gradient-to-r from-[#0E1026] via-[#1E1F5C] to-[#990054] text-white text-xs py-2 px-3.5 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-14 shadow-sm border-b border-white/10">
        <div className="w-full max-w-[1920px] mx-auto flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex items-center gap-2.5">
            <span className="font-bold tracking-wider text-[11px] sm:text-xs text-white">INSTITUTO PENINSULAR DEL SUR</span>
            <span className="hidden sm:inline text-white/40">•</span>
            <span className="hidden md:inline italic text-pink-200 text-xs font-light">"La educación es el camino"</span>
            <span className="hidden lg:inline-flex items-center gap-1 bg-white/15 text-[10px] font-bold px-2.5 py-0.5 rounded-full text-white border border-white/20">
              <Sparkles className="w-3 h-3 text-pink-300" />
              <span>Campus Virtual Oficial</span>
            </span>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3.5 ml-auto text-[11px]">
            {/* Real-time Clock on Institutional Top Strip */}
            <LiveClock variant="topbar" />

            <span className="text-white/80 hidden 2xl:inline font-medium tracking-wide">
              Toda tu institución. Un solo sistema.
            </span>
            <div className="flex items-center gap-2 bg-black/30 px-3 py-1 rounded-full border border-white/15 shadow-inner">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-bold text-white text-[10px] sm:text-xs tracking-wide">{activePeriod.name}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Executive Navbar */}
      <header className="bg-white/95 backdrop-blur-md border-b border-slate-200/90 sticky top-0 z-40 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
        <div className="w-full max-w-[1920px] mx-auto px-3.5 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-14">
          <div className="flex items-center justify-between h-20 sm:h-24 md:h-28">
            {/* Logo and Brand Title with enlarged executive presentation */}
            <div 
              className="flex items-center gap-3.5 sm:gap-5 md:gap-6 cursor-pointer select-none min-w-0 py-2 group"
              onClick={() => setActiveClassroomId(null)}
              title="Ir al inicio de IPSUR EDUCORE"
            >
              {/* Enlarged Official Logo */}
              <div className="relative flex-shrink-0 flex items-center justify-center p-1 sm:p-1.5 rounded-2xl bg-gradient-to-b from-slate-50 to-white border border-slate-200/80 shadow-[0_4px_12px_rgba(46,48,146,0.08)] group-hover:shadow-[0_6px_20px_rgba(230,0,126,0.18)] group-hover:border-pink-300 transition-all duration-300">
                <img 
                  src="/ipsur-logo.png" 
                  alt="IPSUR Logo Oficial" 
                  className="h-14 sm:h-18 md:h-22 w-auto object-contain filter drop-shadow-[0_2px_8px_rgba(46,48,146,0.2)] transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="min-w-0 flex flex-col justify-center">
                <div className="flex items-center gap-2 sm:gap-2.5">
                  <h1 className="font-display text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-ipsur-navy-900 truncate">
                    IPSUR <span className="bg-gradient-to-r from-ipsur-pink-500 via-rose-500 to-ipsur-pink-600 bg-clip-text text-transparent">EDUCORE</span>
                  </h1>
                  <span className="hidden sm:inline-flex items-center text-[10px] md:text-[11px] font-black uppercase tracking-widest bg-gradient-to-r from-ipsur-navy-50 to-indigo-50 text-ipsur-navy-800 border border-ipsur-navy-200/80 px-2.5 py-0.5 rounded-full shadow-sm flex-shrink-0">
                    Academic MS
                  </span>
                </div>
                <p className="text-[10px] sm:text-xs md:text-[13px] font-bold text-slate-600 tracking-[0.22em] uppercase leading-snug truncate mt-0.5">
                  ACADEMIC MANAGEMENT SYSTEM
                </p>
                <p className="text-[11px] text-slate-400 font-medium hidden xl:block leading-tight mt-0.5">
                  Gestión académica · Administración · Control escolar · Tecnología
                </p>
              </div>
            </div>

            {/* Right Controls: Navigation, Role Badges, User Profile */}
            <div className="flex items-center gap-2 sm:gap-3.5">
              {/* Back to dashboard button when inside a classroom */}
              {activeClassroomId && (
                <button
                  onClick={() => setActiveClassroomId(null)}
                  className="hidden sm:flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300/80 rounded-xl transition shadow-sm"
                >
                  <School className="w-4 h-4 text-ipsur-navy-600" />
                  <span>Mis Salas</span>
                </button>
              )}

              {/* Direct shortcut to User Management for authorized personnel */}
              {canManageUsers && (
                <button
                  onClick={() => setUserManagerModalOpen(true)}
                  className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-700 hover:text-ipsur-navy-900 bg-slate-100 hover:bg-slate-200 border border-slate-300/80 rounded-xl shadow-xs transition active:scale-95"
                  title="Administrar usuarios, roles y permisos de acceso"
                >
                  <Users className="w-4 h-4 text-ipsur-pink-600" />
                  <span>Gestión de Usuarios</span>
                </button>
              )}

              {/* User Avatar & Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  className="flex items-center gap-2.5 p-1.5 sm:px-3.5 sm:py-2.5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200/90 hover:border-slate-300 shadow-sm transition text-left"
                >
                  <img
                    src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                    alt={currentUser?.name || 'Usuario'}
                    className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md ring-2 ring-ipsur-navy-200/70"
                  />
                  <div className="hidden sm:block">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-slate-900 line-clamp-1 max-w-[150px]">
                        {currentUser?.name}
                      </span>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                    <div className="flex items-center gap-1 mt-0.5">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${currentBadge.bg}`}>
                        {currentBadge.label}
                      </span>
                    </div>
                  </div>
                </button>

                {/* Profile & Session Dropdown Menu */}
                {profileMenuOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-80 rounded-2xl bg-white shadow-2xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                  >
                    {/* User Identity Box */}
                    <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/70">
                      <div className="flex items-center gap-2.5">
                        <img 
                          src={currentUser?.avatar} 
                          alt={currentUser?.name} 
                          className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-sm ring-1 ring-slate-200"
                        />
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-slate-900 truncate">{currentUser?.name}</p>
                          <p className="text-[11px] text-slate-500 font-mono truncate">{currentUser?.email}</p>
                          <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-md border mt-1 ${currentBadge.bg}`}>
                            {currentBadge.label}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-2 space-y-1">
                      {canManageUsers && (
                        <button
                          onClick={() => {
                            setUserManagerModalOpen(true);
                            setProfileMenuOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-xs font-bold text-slate-700 hover:text-ipsur-navy-900 hover:bg-slate-100 rounded-xl transition flex items-center gap-2.5"
                        >
                          <Users className="w-4 h-4 text-ipsur-pink-500" />
                          <span>Gestión de Usuarios y Permisos</span>
                        </button>
                      )}

                      {/* Fast Switcher for Super Admin Testing */}
                      {isSuperAdmin && (
                        <div className="pt-2 border-t border-slate-100">
                          <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                            Simular Vista Institucional:
                          </p>
                          <div className="space-y-1 max-h-48 overflow-y-auto no-scrollbar">
                            {users.map(u => (
                              <button
                                key={u.id}
                                onClick={() => {
                                  switchUser(u.id);
                                  setProfileMenuOpen(false);
                                }}
                                className={`w-full text-left px-3 py-1.5 rounded-lg text-[11px] flex items-center justify-between transition ${
                                  u.id === currentUser?.id ? 'bg-indigo-50 text-indigo-900 font-bold' : 'hover:bg-slate-100 text-slate-700'
                                }`}
                              >
                                <span className="truncate">{u.name}</span>
                                <span className="text-[10px] text-slate-400 font-mono uppercase ml-2 flex-shrink-0">
                                  {u.role}
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Logout Option */}
                    <div className="p-2 border-t border-slate-100 bg-slate-50/50">
                      <button
                        onClick={() => {
                          logout();
                          setProfileMenuOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs font-bold text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-xl transition flex items-center justify-between"
                      >
                        <span className="flex items-center gap-2">
                          <LogOut className="w-4 h-4" />
                          <span>Cerrar Sesión</span>
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">Seguro</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Floating Notification Toast (Strictly disappears after 3 seconds) */}
      {notification && (
        <div className="fixed bottom-5 right-5 z-50 max-w-sm w-full mx-4 sm:mx-0 animate-in slide-in-from-bottom-5 duration-300">
          <div className={`rounded-2xl p-4 shadow-2xl border flex items-start gap-3 bg-white relative overflow-hidden ${
            notification.type === 'error' ? 'border-rose-300 ring-2 ring-rose-100' :
            notification.type === 'info' ? 'border-blue-300 ring-2 ring-blue-100' :
            'border-emerald-300 ring-2 ring-emerald-100'
          }`}>
            <div className={`p-2 rounded-xl flex-shrink-0 ${
              notification.type === 'error' ? 'bg-rose-100 text-rose-600' :
              notification.type === 'info' ? 'bg-blue-100 text-blue-600' :
              'bg-emerald-100 text-emerald-600'
            }`}>
              {notification.type === 'error' ? (
                <AlertCircle className="w-5 h-5" />
              ) : notification.type === 'info' ? (
                <Info className="w-5 h-5" />
              ) : (
                <CheckCircle2 className="w-5 h-5" />
              )}
            </div>
            <div className="flex-1 min-w-0 pr-1">
              <h4 className="text-xs sm:text-sm font-bold text-slate-800 leading-tight">{notification.title}</h4>
              <p className="text-[11px] sm:text-xs text-slate-600 mt-0.5 leading-snug">{notification.message}</p>
            </div>
            <button
              onClick={clearNotification}
              className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition flex-shrink-0"
              title="Cerrar notificación"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Visual 3-second countdown progress bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-100 overflow-hidden">
              <div 
                className={`h-full animate-toast-bar ${
                  notification.type === 'error' ? 'bg-rose-500' :
                  notification.type === 'info' ? 'bg-blue-500' :
                  'bg-emerald-500'
                }`}
              />
            </div>
          </div>
        </div>
      )}

      {/* Modals for User Management and Authentication */}
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
