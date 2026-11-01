import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
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
  Info
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
      {/* Institutional Top Header */}
      <div className="bg-gradient-to-r from-ipsur-navy-900 via-ipsur-navy-700 to-ipsur-pink-700 text-white text-xs py-1.5 px-3.5 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-14 shadow-sm">
        <div className="w-full max-w-[1920px] mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold tracking-wide text-[11px] sm:text-xs">INSTITUTO PENINSULAR DEL SUR</span>
            <span className="hidden sm:inline text-white/50">|</span>
            <span className="hidden md:inline italic text-pink-100">"La educación es el camino"</span>
            <span className="hidden lg:inline bg-white/20 text-[10px] px-2 py-0.5 rounded-full font-mono">Prepa en Línea</span>
          </div>

          <div className="flex items-center gap-3 ml-auto text-[11px]">
            <span className="text-white/80 hidden xl:inline">
              Toda tu institución. Un solo sistema.
            </span>
            <div className="flex items-center gap-1.5 bg-black/25 px-2.5 py-0.5 rounded-md border border-white/10">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-medium text-white text-[10px] sm:text-xs">{activePeriod.name}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="w-full max-w-[1920px] mx-auto px-3.5 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-14">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo and Brand Title with transparent logo integration */}
            <div 
              className="flex items-center gap-3 sm:gap-4 cursor-pointer select-none min-w-0 py-1"
              onClick={() => setActiveClassroomId(null)}
              title="Ir al inicio de IPSUR EDUCORE"
            >
              <div className="relative group flex-shrink-0 flex items-center justify-center">
                <img 
                  src="/ipsur-logo.png" 
                  alt="IPSUR Logo Oficial" 
                  className="h-12 sm:h-16 w-auto object-contain filter drop-shadow-[0_2px_6px_rgba(46,48,146,0.15)] transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <h1 className="text-lg sm:text-2xl font-black tracking-tight text-ipsur-navy-800 truncate">
                    IPSUR <span className="text-ipsur-pink-500">EDUCORE</span>
                  </h1>
                  <span className="hidden md:inline-block text-[10px] font-bold uppercase tracking-wider bg-ipsur-navy-50 text-ipsur-navy-700 border border-ipsur-navy-200 px-2 py-0.5 rounded-full flex-shrink-0">
                    Academic MS
                  </span>
                </div>
                <p className="text-[10px] sm:text-xs font-semibold text-slate-500 tracking-tight leading-tight truncate">
                  ACADEMIC MANAGEMENT SYSTEM
                </p>
                <p className="text-[10px] text-slate-400 hidden xl:block">
                  Gestión académica · Administración · Control escolar · Tecnología
                </p>
              </div>
            </div>

            {/* Right Controls: Navigation, Role Switcher, User Avatar */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Back to dashboard button when inside a classroom */}
              {activeClassroomId && (
                <button
                  onClick={() => setActiveClassroomId(null)}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
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
                  className="flex items-center gap-2.5 p-1.5 sm:px-3 sm:py-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 transition text-left"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-sm ring-2 ring-ipsur-navy-100"
                  />
                  <div className="hidden sm:block">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-slate-800 line-clamp-1 max-w-[140px]">
                        {currentUser.name}
                      </span>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                    <div className="flex items-center gap-1">
                      <span className={`text-[10px] font-semibold px-1.5 py-0.2 rounded border ${currentBadge.bg}`}>
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

      {/* Floating Notification Toast */}
      {notification && (
        <div className="fixed bottom-5 right-5 z-50 max-w-md w-full animate-in slide-in-from-bottom-5 duration-300">
          <div className={`rounded-xl p-4 shadow-xl border flex items-start gap-3 bg-white ${
            notification.type === 'error' ? 'border-rose-300 ring-2 ring-rose-100' :
            notification.type === 'info' ? 'border-blue-300 ring-2 ring-blue-100' :
            'border-emerald-300 ring-2 ring-emerald-100'
          }`}>
            <div className={`p-2 rounded-lg flex-shrink-0 ${
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
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-slate-800">{notification.title}</h4>
              <p className="text-xs text-slate-600 mt-0.5">{notification.message}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
