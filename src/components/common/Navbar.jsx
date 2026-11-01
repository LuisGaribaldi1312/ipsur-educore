import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import LiveClock from './LiveClock';
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
  X
} from 'lucide-react';

export default function Navbar() {
  const { 
    currentUser, 
    users, 
    switchUser, 
    resetDemoData, 
    activeClassroomId, 
    setActiveClassroomId,
    notification,
    clearNotification,
    periods
  } = useApp();

  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

  const activePeriod = periods.find(p => p.status === 'Activo') || periods[0];

  const getRoleBadge = (role) => {
    switch (role) {
      case 'coordinator':
        return { label: 'Coordinador Escolar', bg: 'bg-purple-100 text-purple-800 border-purple-200', icon: ShieldCheck };
      case 'teacher':
        return { label: 'Profesor / Docente', bg: 'bg-indigo-100 text-indigo-800 border-indigo-200', icon: BookOpen };
      case 'student':
        return { label: 'Estudiante Prepa Virtual', bg: 'bg-emerald-100 text-emerald-800 border-emerald-200', icon: GraduationCap };
      default:
        return { label: 'Usuario', bg: 'bg-slate-100 text-slate-800 border-slate-200', icon: Users };
    }
  };

  const currentBadge = getRoleBadge(currentUser.role);
  const BadgeIcon = currentBadge.icon;

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

            {/* Right Controls: Navigation, Role Switcher, User Avatar */}
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

              {/* Role Switcher Pill & Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                  className="flex items-center gap-2.5 p-1.5 sm:px-3.5 sm:py-2.5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200/90 hover:border-slate-300 shadow-sm transition text-left"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md ring-2 ring-ipsur-navy-200/70"
                  />
                  <div className="hidden sm:block">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-slate-900 line-clamp-1 max-w-[150px]">
                        {currentUser.name}
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

                {/* Dropdown Menu to change user/role */}
                {roleMenuOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-80 rounded-2xl bg-white shadow-2xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                  >
                    <div className="px-4 py-2.5 border-b border-slate-100 bg-slate-50/50">
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Simulador de Roles (3 Vistas)
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Selecciona un usuario para explorar la plataforma desde su perspectiva:
                      </p>
                    </div>

                    <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto">
                      {users.map(u => {
                        const isSelected = u.id === currentUser.id;
                        const roleInfo = getRoleBadge(u.role);
                        const RoleIcon = roleInfo.icon;
                        return (
                          <button
                            key={u.id}
                            onClick={() => {
                              switchUser(u.id);
                              setRoleMenuOpen(false);
                            }}
                            className={`w-full text-left px-4 py-2.5 flex items-center gap-3 hover:bg-slate-50 transition ${
                              isSelected ? 'bg-ipsur-navy-50/60' : ''
                            }`}
                          >
                            <img 
                              src={u.avatar} 
                              alt={u.name} 
                              className="w-9 h-9 rounded-full object-cover border" 
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <span className={`text-xs font-bold truncate ${isSelected ? 'text-ipsur-navy-800' : 'text-slate-800'}`}>
                                  {u.name}
                                </span>
                                {isSelected && (
                                  <span className="w-2 h-2 rounded-full bg-ipsur-pink-500"></span>
                                )}
                              </div>
                              <p className="text-[11px] text-slate-500 truncate">{u.title}</p>
                              <span className={`inline-block text-[10px] font-medium px-1.5 py-0.2 rounded border mt-0.5 ${roleInfo.bg}`}>
                                {roleInfo.label}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    <div className="p-2 border-t border-slate-100 bg-slate-50/80 flex items-center justify-between text-xs">
                      <button
                        onClick={() => {
                          resetDemoData();
                          setRoleMenuOpen(false);
                        }}
                        className="flex items-center gap-1.5 text-slate-500 hover:text-rose-600 px-2 py-1 rounded transition text-[11px]"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Restaurar datos demo</span>
                      </button>
                      <span className="text-[10px] text-slate-400">IPSUR v1.0</span>
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
    </>
  );
}
