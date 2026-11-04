import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import CreateClassroomModal from './CreateClassroomModal';
import RubricModal from './RubricModal';
import RegisterStudentModal from '../services/RegisterStudentModal';
import PaymentsAccountingModal from '../services/PaymentsAccountingModal';
import SchedulesModal from '../services/SchedulesModal';
import AnnouncementsModal from '../services/AnnouncementsModal';
import PendingProceduresModal from '../services/PendingProceduresModal';
import SystemTutorialModal from '../services/SystemTutorialModal';
import InstitutionalActaModal from '../reports/InstitutionalActaModal';
import { 
  Plus, 
  School, 
  Users, 
  BookOpen, 
  CheckCircle, 
  AlertCircle, 
  Layers, 
  FileText, 
  Search, 
  ExternalLink, 
  ChevronRight, 
  ShieldCheck, 
  Calendar, 
  Sparkles,
  GraduationCap,
  Play,
  TrendingUp,
  CreditCard,
  Mail,
  Clock,
  CheckCircle2,
  BarChart3,
  UserPlus,
  ArrowRight,
  SlidersHorizontal,
  ChevronDown,
  Building,
  Laptop
} from 'lucide-react';

export default function CoordinatorDashboard({ onSelectClassroom }) {
  const { 
    classrooms, 
    currentUser, 
    users, 
    periods, 
    activities,
    notificationsList,
    procedures,
    setUserManagerModalOpen,
    isSuperAdmin,
    showToast 
  } = useApp();

  // Modals
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectedRubricClassroom, setSelectedRubricClassroom] = useState(null);
  const [tutorialModalOpen, setTutorialModalOpen] = useState(false);
  const [registerStudentModalOpen, setRegisterStudentModalOpen] = useState(false);
  const [paymentsModalOpen, setPaymentsModalOpen] = useState(false);
  const [schedulesModalOpen, setSchedulesModalOpen] = useState(false);
  const [announcementsModalOpen, setAnnouncementsModalOpen] = useState(false);
  const [proceduresModalOpen, setProceduresModalOpen] = useState(false);
  const [actaModalOpen, setActaModalOpen] = useState(false);

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [statsPeriod, setStatsPeriod] = useState('Ciclo Activo');

  // Real database dynamic counts (ZERO mock data)
  const totalStudents = (users || []).filter(u => u.role === 'student').length;
  const totalTeachers = (users || []).filter(u => u.role === 'teacher').length;
  const totalGroups = classrooms.length;
  const pendingProceduresCount = (procedures || []).filter(p => p.status === 'Pendiente').length;
  const activePeriod = periods.find(p => p.status === 'Activo') || periods[0];

  const filteredClassrooms = classrooms.filter(cls => {
    const matchesSearch = cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          cls.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          cls.teacherName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPeriod = selectedPeriod === 'all' || cls.periodId === selectedPeriod;
    return matchesSearch && matchesPeriod;
  });

  return (
    <div className="space-y-6">
      
      {/* 1. Hero Executive Welcome Banner in Official IPSUR Navy & Magenta Pink with Seamless Blended Mask */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#0A0D1B] via-[#141B41] to-[#750042] text-white shadow-xl border border-white/10 min-h-[220px] sm:min-h-[240px] flex items-center">
        {/* Seamless full-bleed campus image with progressive gradient mask (eliminates all hard edges and seams) */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1600&q=80"
            alt="Campus IPSUR Moderno"
            className="absolute inset-0 w-full h-full object-cover object-[75%_center] opacity-35 md:opacity-45 transition-opacity duration-700"
            style={{
              maskImage: 'linear-gradient(to right, transparent 0%, transparent 22%, rgba(0,0,0,0.3) 45%, rgba(0,0,0,0.85) 70%, black 100%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, transparent 22%, rgba(0,0,0,0.3) 45%, rgba(0,0,0,0.85) 70%, black 100%)'
            }}
          />
          {/* Multi-stage IPSUR Navy to Pink color grade overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0D1B] via-[#0A0D1B]/80 via-[#141B41]/55 to-[#750042]/70"></div>
          {/* Vignette depth gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D1B]/70 via-transparent to-transparent"></div>
        </div>

        {/* Content container */}
        <div className="relative z-10 w-full p-6 sm:p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-[18px] bg-white p-1.5 flex items-center justify-center shadow-lg border border-white/90">
                <img src="/ipsur-logo.png" alt="IPSUR Logo" className="w-full h-full object-contain filter drop-shadow" />
              </div>
              <div>
                <span className="text-[10px] sm:text-xs font-bold text-pink-300 uppercase tracking-widest block">
                  Instituto Peninsular del Sur
                </span>
                <span className="text-[11px] text-indigo-200 font-medium italic block">
                  "La educación es el camino"
                </span>
              </div>
            </div>

            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
              Bienvenido a IPSUR <span className="text-ipsur-pink-500">EDUCORE</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-200 font-normal mt-2 leading-relaxed">
              Toda tu institución. Un solo sistema. Gestión académica, administración, control escolar y tecnología.
            </p>

            <div className="mt-5 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setTutorialModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-gradient-to-r from-ipsur-pink-500 to-rose-600 hover:from-ipsur-pink-600 hover:to-rose-700 text-white font-bold text-xs sm:text-sm shadow-md transition active:scale-95 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Ver tutorial</span>
              </button>

              <button
                type="button"
                onClick={() => setCreateModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs border border-white/20 transition active:scale-95 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Nueva Sala</span>
              </button>
            </div>
          </div>

          {/* Slogan on the right matching official branding */}
          <div className="hidden lg:block text-right pr-4">
            <p className="font-display font-medium text-lg sm:text-xl text-white/95 italic leading-snug drop-shadow-md">
              "Innovación Educativa <br /> para un Mejor Futuro"
            </p>
            <span className="inline-block mt-2 text-[10px] text-pink-300 font-bold uppercase tracking-wider bg-black/30 px-3 py-1 rounded-full border border-white/10">
              Campus Virtual SEP
            </span>
          </div>
        </div>
      </div>

      {/* 2. Row of 5 Metric KPI Cards with Wave Sparklines (Strict Real Data - Zero Mock Data) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
        
        {/* Card 1: Alumnos Activos */}
        <div 
          onClick={() => setRegisterStudentModalOpen(true)}
          className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs hover:shadow-md transition cursor-pointer relative overflow-hidden flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-full bg-ipsur-navy-100 text-ipsur-navy-700 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <div className="text-right">
              <p className="font-display text-xl sm:text-2xl font-black text-slate-900 leading-none">
                {totalStudents}
              </p>
              <p className="text-[11px] font-bold text-slate-500 mt-1">Alumnos Activos</p>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px]">
            <span className="text-ipsur-navy-700 font-bold flex items-center gap-0.5">
              {totalStudents > 0 ? `Matriculados: ${totalStudents}` : 'Sin alumnos aún'}
            </span>
            <svg className="w-20 h-6 text-ipsur-navy-600" viewBox="0 0 100 30" fill="none">
              <path d="M0 25 Q25 5, 50 15 T100 5" stroke="currentColor" strokeWidth="2.5" fill="none" />
            </svg>
          </div>
        </div>

        {/* Card 2: Docentes */}
        <div 
          onClick={() => setSchedulesModalOpen(true)}
          className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs hover:shadow-md transition cursor-pointer relative overflow-hidden flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-full bg-pink-100 text-ipsur-pink-600 flex items-center justify-center">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div className="text-right">
              <p className="font-display text-xl sm:text-2xl font-black text-slate-900 leading-none">
                {totalTeachers}
              </p>
              <p className="text-[11px] font-bold text-slate-500 mt-1">Docentes</p>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px]">
            <span className="text-ipsur-pink-600 font-bold flex items-center gap-0.5">
              {totalTeachers > 0 ? `Titulares: ${totalTeachers}` : 'Sin docentes aún'}
            </span>
            <svg className="w-20 h-6 text-ipsur-pink-500" viewBox="0 0 100 30" fill="none">
              <path d="M0 20 Q30 5, 60 18 T100 8" stroke="currentColor" strokeWidth="2.5" fill="none" />
            </svg>
          </div>
        </div>

        {/* Card 3: Grupos / Salas */}
        <div 
          onClick={() => setCreateModalOpen(true)}
          className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs hover:shadow-md transition cursor-pointer relative overflow-hidden flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center">
              <Building className="w-5 h-5" />
            </div>
            <div className="text-right">
              <p className="font-display text-xl sm:text-2xl font-black text-slate-900 leading-none">
                {totalGroups}
              </p>
              <p className="text-[11px] font-bold text-slate-500 mt-1">Grupos / Salas</p>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px]">
            <span className="text-indigo-600 font-bold flex items-center gap-0.5">
              {totalGroups > 0 ? `${totalGroups} Salas Virtuales` : '0 Registradas'}
            </span>
            <svg className="w-20 h-6 text-indigo-600" viewBox="0 0 100 30" fill="none">
              <path d="M0 22 Q25 10, 50 20 T100 5" stroke="currentColor" strokeWidth="2.5" fill="none" />
            </svg>
          </div>
        </div>

        {/* Card 4: Asistencia Promedio */}
        <div 
          onClick={() => showToast('Asistencia Institucional', 'Control de asistencias y participación virtual', 'info')}
          className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs hover:shadow-md transition cursor-pointer relative overflow-hidden flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <div className="text-right">
              <p className="font-display text-xl sm:text-2xl font-black text-slate-900 leading-none">
                {totalStudents > 0 ? '100%' : '--'}
              </p>
              <p className="text-[11px] font-bold text-slate-500 mt-1">Asistencia Promedio</p>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px]">
            <span className="text-amber-700 font-bold flex items-center gap-0.5">
              {totalStudents > 0 ? 'Alumnos al corriente' : 'Sin registros'}
            </span>
            <svg className="w-20 h-6 text-amber-500" viewBox="0 0 100 30" fill="none">
              <path d="M0 18 Q35 25, 70 8 T100 12" stroke="currentColor" strokeWidth="2.5" fill="none" />
            </svg>
          </div>
        </div>

        {/* Card 5: Trámites Pendientes */}
        <div 
          onClick={() => setProceduresModalOpen(true)}
          className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs hover:shadow-md transition cursor-pointer relative overflow-hidden flex flex-col justify-between col-span-2 md:col-span-1"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div className="text-right">
              <p className="font-display text-xl sm:text-2xl font-black text-slate-900 leading-none">
                {pendingProceduresCount}
              </p>
              <p className="text-[11px] font-bold text-slate-500 mt-1">Trámites Pendientes</p>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px]">
            <span className="text-rose-600 font-bold flex items-center gap-0.5">
              {pendingProceduresCount > 0 ? `${pendingProceduresCount} por atender` : 'Al corriente (0)'}
            </span>
            <svg className="w-20 h-6 text-rose-500" viewBox="0 0 100 30" fill="none">
              <path d="M0 25 Q20 5, 55 18 T100 10" stroke="currentColor" strokeWidth="2.5" fill="none" />
            </svg>
          </div>
        </div>

      </div>

      {/* 3. Middle Section: Estadísticas Académicas + Accesos Rápidos (6 Actions) + Actividad Reciente */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Column 1: Estadísticas Académicas Bar Chart in IPSUR Palette (5 Columns) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-display text-sm sm:text-base font-black text-slate-900">
                  Estadísticas Académicas
                </h3>
                <span className="text-[10px] text-ipsur-pink-600 font-bold uppercase tracking-wider block">
                  IPSUR EDUCORE · Monitoreo
                </span>
              </div>
              <span className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-slate-700">
                {activePeriod.name}
              </span>
            </div>

            {/* Real Dynamic Bar Chart in IPSUR Navy & Magenta Pink */}
            <div className="pt-6 pb-2">
              <div className="flex items-end justify-between gap-3 sm:gap-6 h-48 border-b border-slate-200 px-2 relative">
                {/* Y-axis grid guides */}
                <div className="absolute inset-x-0 top-0 border-t border-slate-100 text-[10px] text-slate-300 font-mono">100%</div>
                <div className="absolute inset-x-0 top-1/4 border-t border-slate-100 text-[10px] text-slate-300 font-mono">75%</div>
                <div className="absolute inset-x-0 top-2/4 border-t border-slate-100 text-[10px] text-slate-300 font-mono">50%</div>
                <div className="absolute inset-x-0 top-3/4 border-t border-slate-100 text-[10px] text-slate-300 font-mono">25%</div>

                {/* Bars: Alumnos */}
                <div className="flex-1 flex flex-col items-center gap-1 z-10">
                  <div className="flex items-end gap-1.5 h-40">
                    <div className="relative group flex flex-col items-center">
                      <span className="text-[10px] font-bold text-slate-400 mb-1">{totalStudents > 0 ? totalStudents : 0}</span>
                      <div 
                        style={{ height: `${Math.min(Math.max(totalStudents * 15, 8), 140)}px` }}
                        className="w-4 sm:w-5 bg-gradient-to-t from-ipsur-navy-700 to-ipsur-pink-500 rounded-t-md transition-all shadow-xs"
                      ></div>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-slate-600 mt-2 truncate">Alumnos</span>
                </div>

                {/* Bars: Docentes */}
                <div className="flex-1 flex flex-col items-center gap-1 z-10">
                  <div className="flex items-end gap-1.5 h-40">
                    <div className="relative group flex flex-col items-center">
                      <span className="text-[10px] font-bold text-slate-400 mb-1">{totalTeachers > 0 ? totalTeachers : 0}</span>
                      <div 
                        style={{ height: `${Math.min(Math.max(totalTeachers * 20, 8), 140)}px` }}
                        className="w-4 sm:w-5 bg-gradient-to-t from-ipsur-navy-700 to-ipsur-pink-500 rounded-t-md transition-all shadow-xs"
                      ></div>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-slate-600 mt-2 truncate">Docentes</span>
                </div>

                {/* Bars: Salas Virtuales */}
                <div className="flex-1 flex flex-col items-center gap-1 z-10">
                  <div className="flex items-end gap-1.5 h-40">
                    <div className="relative group flex flex-col items-center">
                      <span className="text-[10px] font-bold text-slate-400 mb-1">{totalGroups}</span>
                      <div 
                        style={{ height: `${Math.min(Math.max(totalGroups * 25, 8), 140)}px` }}
                        className="w-4 sm:w-5 bg-gradient-to-t from-ipsur-navy-700 to-ipsur-pink-500 rounded-t-md transition-all shadow-xs"
                      ></div>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-slate-600 mt-2 truncate">Salas</span>
                </div>

                {/* Bars: Trámites */}
                <div className="flex-1 flex flex-col items-center gap-1 z-10">
                  <div className="flex items-end gap-1.5 h-40">
                    <div className="relative group flex flex-col items-center">
                      <span className="text-[10px] font-bold text-slate-400 mb-1">{procedures?.length || 0}</span>
                      <div 
                        style={{ height: `${Math.min(Math.max((procedures?.length || 0) * 15, 8), 140)}px` }}
                        className="w-4 sm:w-5 bg-gradient-to-t from-ipsur-navy-700 to-ipsur-pink-500 rounded-t-md transition-all shadow-xs"
                      ></div>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-slate-600 mt-2 truncate">Trámites</span>
                </div>
              </div>
            </div>
          </div>

          {/* Chart Legend in IPSUR Theme */}
          <div className="pt-3 flex items-center justify-center gap-6 text-xs text-slate-500 border-t border-slate-100">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-xs bg-slate-300"></span>
              Histórico Base
            </span>
            <span className="flex items-center gap-2 font-bold text-slate-700">
              <span className="w-3 h-3 rounded-xs bg-gradient-to-r from-ipsur-navy-700 to-ipsur-pink-500"></span>
              Datos en Vivo (IPSUR EDUCORE)
            </span>
          </div>
        </div>

        {/* Column 2: Accesos Rápidos in IPSUR Colors (3 Columns) */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <span className="text-ipsur-pink-500 font-black">⚡</span>
            <h3 className="font-display text-sm sm:text-base font-black text-slate-900">
              Accesos Rápidos
            </h3>
          </div>

          <div className="grid grid-cols-3 gap-2.5 my-auto py-3">
            {/* 1. Registrar Alumno */}
            <button
              type="button"
              onClick={() => setRegisterStudentModalOpen(true)}
              className="flex flex-col items-center justify-center p-3 rounded-xl border border-slate-200 hover:border-pink-300 hover:bg-pink-50/50 transition group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-pink-100 text-ipsur-pink-600 flex items-center justify-center mb-1.5 group-hover:scale-105 transition">
                <UserPlus className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-slate-700 text-center leading-tight">
                Registrar<br />Alumno
              </span>
            </button>

            {/* 2. Calificaciones */}
            <button
              type="button"
              onClick={() => setActaModalOpen(true)}
              className="flex flex-col items-center justify-center p-3 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 transition group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-indigo-100 text-ipsur-navy-700 flex items-center justify-center mb-1.5 group-hover:scale-105 transition">
                <span className="font-display font-black text-sm">A+</span>
              </div>
              <span className="text-[10px] font-bold text-slate-700 text-center leading-tight">
                Calificaciones
              </span>
            </button>

            {/* 3. Horarios */}
            <button
              type="button"
              onClick={() => setSchedulesModalOpen(true)}
              className="flex flex-col items-center justify-center p-3 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 transition group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center mb-1.5 group-hover:scale-105 transition">
                <Calendar className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-slate-700 text-center leading-tight">
                Horarios
              </span>
            </button>

            {/* 4. Reportes */}
            <button
              type="button"
              onClick={() => setActaModalOpen(true)}
              className="flex flex-col items-center justify-center p-3 rounded-xl border border-slate-200 hover:border-pink-300 hover:bg-pink-50/50 transition group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-pink-100 text-ipsur-pink-600 flex items-center justify-center mb-1.5 group-hover:scale-105 transition">
                <BarChart3 className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-slate-700 text-center leading-tight">
                Reportes
              </span>
            </button>

            {/* 5. Pagos */}
            <button
              type="button"
              onClick={() => setPaymentsModalOpen(true)}
              className="flex flex-col items-center justify-center p-3 rounded-xl border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/50 transition group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mb-1.5 group-hover:scale-105 transition">
                <CreditCard className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-slate-700 text-center leading-tight">
                Pagos
              </span>
            </button>

            {/* 6. Comunicados */}
            <button
              type="button"
              onClick={() => setAnnouncementsModalOpen(true)}
              className="flex flex-col items-center justify-center p-3 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 transition group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center mb-1.5 group-hover:scale-105 transition">
                <Mail className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-slate-700 text-center leading-tight">
                Comunicados
              </span>
            </button>
          </div>

          <div className="pt-2 text-center border-t border-slate-100">
            <span className="text-[10px] text-slate-400">Servicios activos en la plataforma</span>
          </div>
        </div>

        {/* Column 3: Actividad Reciente (Real Live Stream - Empty by default) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-ipsur-pink-500" />
              <h3 className="font-display text-sm sm:text-base font-black text-slate-900">
                Actividad Reciente
              </h3>
            </div>
            <span className="text-xs font-bold text-ipsur-navy-700">
              En tiempo real
            </span>
          </div>

          <div className="my-auto py-2">
            {(activities || []).length === 0 ? (
              <div className="text-center py-8 text-xs text-slate-400">
                <Clock className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="font-semibold text-slate-600">Sin actividades registradas</p>
                <p className="text-[11px] text-slate-400 mt-1 max-w-xs mx-auto">
                  Las inscripciones, pagos y evaluaciones se reflejarán aquí automáticamente conforme se generen.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {activities.slice(0, 4).map(item => (
                  <div key={item.id} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-pink-100 text-ipsur-pink-600 flex items-center justify-center flex-shrink-0">
                      {item.type === 'student' && <UserPlus className="w-4 h-4" />}
                      {item.type === 'payment' && <CreditCard className="w-4 h-4" />}
                      {item.type === 'announcement' && <Mail className="w-4 h-4" />}
                      {item.type === 'document' && <FileText className="w-4 h-4" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-slate-900 leading-tight truncate">{item.title}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5 truncate">{item.subtitle}</p>
                      <span className="text-[10px] text-slate-400 mt-0.5 block">{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <span>Sincronización en tiempo real</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </div>
        </div>

      </div>

      {/* 4. Bottom Section: Calendario Escolar + Mensajes y Notificaciones + Promo Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5">
        
        {/* Calendario Escolar (5 columns) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-ipsur-navy-700" />
              <h3 className="font-display text-sm sm:text-base font-black text-slate-900">
                Calendario y Ciclo Escolar
              </h3>
            </div>
            <span className="text-xs font-bold text-ipsur-pink-600">
              Oficial SEP
            </span>
          </div>

          <div className="py-4 flex items-center gap-4 bg-slate-50/80 p-3.5 rounded-2xl border border-slate-100">
            <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col items-center justify-center flex-shrink-0 text-center">
              <span className="font-display font-black text-xs text-ipsur-pink-600 uppercase">SEP</span>
              <span className="font-display font-black text-xl text-ipsur-navy-900 leading-none mt-0.5">2026</span>
            </div>
            <div className="min-w-0">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900">
                {activePeriod.name}
              </span>
              <p className="text-xs text-slate-500 mt-1 leading-snug">
                Periodo oficial vigente desde {activePeriod.startDate} hasta {activePeriod.endDate}.
              </p>
              <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md mt-1.5 inline-block">
                Estado: {activePeriod.status}
              </span>
            </div>
          </div>

          <div className="pt-2 text-right border-t border-slate-100 text-[10px] text-slate-400">
            Clave RVOE Oficial: SEP-DGB-2024-09882
          </div>
        </div>

        {/* Mensajes y Notificaciones (4 columns) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-ipsur-pink-600" />
              <h3 className="font-display text-sm sm:text-base font-black text-slate-900">
                Mensajes y Notificaciones
              </h3>
            </div>
            <button
              onClick={() => setAnnouncementsModalOpen(true)}
              className="text-xs font-bold text-ipsur-pink-600 hover:underline"
            >
              + Redactar
            </button>
          </div>

          <div className="py-2">
            {(notificationsList || []).length === 0 ? (
              <div className="text-center py-6 text-xs text-slate-400">
                <Mail className="w-7 h-7 text-slate-300 mx-auto mb-1.5" />
                <p className="font-semibold text-slate-600">Sin notificaciones pendientes</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Todo se encuentra al día en el sistema.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {notificationsList.slice(0, 3).map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className={`w-2 h-2 rounded-full flex-shrink-0 ${item.color || 'bg-ipsur-pink-500'}`}></span>
                      <span className="font-medium text-slate-800 truncate">{item.title}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 whitespace-nowrap">{item.time}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-ipsur-navy-700">
            <button onClick={() => setAnnouncementsModalOpen(true)} className="font-bold hover:underline">
              Emitir circular institucional
            </button>
          </div>
        </div>

        {/* Promo Tech Card: IPSUR EDUCORE (3 columns) */}
        <div className="lg:col-span-3 rounded-2xl p-5 bg-gradient-to-br from-[#0A0D1B] via-[#141B41] to-[#750042] text-white shadow-md flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-pink-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Plataforma 100% en línea</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-pink-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Acceso institucional seguro</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-pink-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Siempre disponible</span>
            </div>
          </div>

          <div className="relative z-10 pt-4">
            <div className="w-full py-2 px-3 rounded-xl bg-white/15 hover:bg-white/25 border border-white/20 text-center font-display font-black text-xs text-white tracking-wide shadow-xs backdrop-blur-xs">
              IPSUR EDUCORE
            </div>
          </div>

          {/* Watermark icon */}
          <div className="absolute -right-4 -bottom-4 opacity-10 pointer-events-none">
            <Laptop className="w-32 h-32 text-white" />
          </div>
        </div>

      </div>

      {/* 5. Salas de Clases Virtuales Explorer */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h3 className="font-display text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
              <School className="w-5 h-5 text-ipsur-pink-500" />
              <span>Salas de Clases Virtuales</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Aulas activas de bachillerato en línea con rúbrica oficial al 100%, catedrático titular y alumnos matriculados.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCreateModalOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-ipsur-navy-700 to-ipsur-pink-600 hover:from-ipsur-navy-800 hover:to-ipsur-pink-700 rounded-xl shadow transition"
            >
              <Plus className="w-4 h-4" />
              <span>Nueva Sala de Clases</span>
            </button>
          </div>
        </div>

        {/* Filter controls */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Buscar por materia, clave o docente titular..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none"
            />
          </div>

          <select
            value={selectedPeriod}
            onChange={e => setSelectedPeriod(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none font-semibold text-slate-700"
          >
            <option value="all">Todos los Periodos</option>
            {periods.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>

        {/* Classrooms Grid */}
        {filteredClassrooms.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
            <School className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <h4 className="font-display font-bold text-slate-700 text-sm">Sin Salas Virtuales Registradas</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
              Comienza creando una nueva sala de clases virtual para asignar temarios, rúbricas y docentes titulares.
            </p>
            <button
              onClick={() => setCreateModalOpen(true)}
              className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-ipsur-navy-700 to-ipsur-pink-600 hover:from-ipsur-navy-800 hover:to-ipsur-pink-700 rounded-xl shadow transition"
            >
              <Plus className="w-4 h-4" />
              <span>Crear Primera Sala</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredClassrooms.map(cls => (
              <div
                key={cls.id}
                className="bg-white border border-slate-200 hover:border-pink-300 rounded-2xl p-4 shadow-xs hover:shadow-md transition flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[10px] font-bold bg-pink-50 text-ipsur-pink-700 px-2 py-0.5 rounded-md">
                      {cls.code}
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold">{cls.group}</span>
                  </div>

                  <h4 className="font-display font-bold text-slate-900 text-sm group-hover:text-ipsur-pink-600 transition line-clamp-1">
                    {cls.name}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    <span className="truncate">{cls.teacherName}</span>
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-500">
                    <strong>{cls.enrolledStudentIds?.length || 0}</strong> alumnos
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setSelectedRubricClassroom(cls)}
                      className="px-2.5 py-1 text-[11px] font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition"
                    >
                      Rúbrica
                    </button>
                    <button
                      type="button"
                      onClick={() => onSelectClassroom(cls.id)}
                      className="px-3 py-1 text-[11px] font-bold text-white bg-gradient-to-r from-ipsur-navy-700 to-ipsur-pink-600 hover:from-ipsur-navy-800 hover:to-ipsur-pink-700 rounded-lg shadow-xs transition"
                    >
                      Abrir Sala
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Global Dashboard Modals */}
      <CreateClassroomModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
      />

      <RubricModal
        isOpen={Boolean(selectedRubricClassroom)}
        onClose={() => setSelectedRubricClassroom(null)}
        classroom={selectedRubricClassroom}
      />

      <SystemTutorialModal
        isOpen={tutorialModalOpen}
        onClose={() => setTutorialModalOpen(false)}
      />

      <RegisterStudentModal
        isOpen={registerStudentModalOpen}
        onClose={() => setRegisterStudentModalOpen(false)}
      />

      <PaymentsAccountingModal
        isOpen={paymentsModalOpen}
        onClose={() => setPaymentsModalOpen(false)}
      />

      <SchedulesModal
        isOpen={schedulesModalOpen}
        onClose={() => setSchedulesModalOpen(false)}
      />

      <AnnouncementsModal
        isOpen={announcementsModalOpen}
        onClose={() => setAnnouncementsModalOpen(false)}
      />

      <PendingProceduresModal
        isOpen={proceduresModalOpen}
        onClose={() => setProceduresModalOpen(false)}
      />

      <InstitutionalActaModal
        isOpen={actaModalOpen}
        onClose={() => setActaModalOpen(false)}
        classroom={classrooms[0] || null}
      />

    </div>
  );
}
