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
    academicStats,
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
  const [statsPeriod, setStatsPeriod] = useState('Último Semestre');
  const [showClassroomList, setShowClassroomList] = useState(true);

  const totalStudents = users.filter(u => u.role === 'student').length;
  const totalTeachers = users.filter(u => u.role === 'teacher').length;

  const filteredClassrooms = classrooms.filter(cls => {
    const matchesSearch = cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          cls.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          cls.teacherName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPeriod = selectedPeriod === 'all' || cls.periodId === selectedPeriod;
    return matchesSearch && matchesPeriod;
  });

  return (
    <div className="space-y-6">
      
      {/* 1. Hero Executive Welcome Banner matching official IPSUR Manager School Screenshot */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#0B1528] via-[#102244] to-[#0A3268] text-white shadow-xl border border-white/10 min-h-[220px] sm:min-h-[240px] flex items-center">
        {/* Subtle background campus image with wave gradient overlay */}
        <div className="absolute right-0 top-0 bottom-0 w-full md:w-3/5 overflow-hidden pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80"
            alt="Campus IPSUR Moderno"
            className="w-full h-full object-cover object-center opacity-30 md:opacity-40"
          />
          {/* Dynamic wave overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1528] via-[#0B1528]/80 to-transparent"></div>
        </div>

        {/* Content container */}
        <div className="relative z-10 w-full p-6 sm:p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
              Bienvenido a IPSUR Manager School
            </h1>
            <p className="text-xs sm:text-sm text-slate-200 font-normal mt-2 leading-relaxed">
              Gestiona, organiza y fortalece tu comunidad educativa de forma simple y segura.
            </p>

            <div className="mt-5 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setTutorialModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-[#0077FF] hover:bg-blue-600 text-white font-bold text-xs sm:text-sm shadow-md transition active:scale-95 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Ver tutorial</span>
              </button>

              <button
                type="button"
                onClick={() => setCreateModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs border border-white/20 transition active:scale-95"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Nueva Sala</span>
              </button>
            </div>
          </div>

          {/* Slogan on the right matching screenshot */}
          <div className="hidden lg:block text-right pr-4">
            <p className="font-display font-medium text-lg sm:text-xl text-white/95 italic leading-snug drop-shadow-md">
              "Innovación Educativa <br /> para un Mejor Futuro"
            </p>
          </div>
        </div>
      </div>

      {/* 2. Row of 5 Metric KPI Cards with Wave Sparklines matching Screenshot */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
        
        {/* Card 1: Alumnos Activos */}
        <div 
          onClick={() => setRegisterStudentModalOpen(true)}
          className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs hover:shadow-md transition cursor-pointer relative overflow-hidden flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-full bg-blue-100 text-[#0066FF] flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <div className="text-right">
              <p className="font-display text-xl sm:text-2xl font-black text-slate-900 leading-none">
                {totalStudents > 0 ? totalStudents.toLocaleString() : '1,248'}
              </p>
              <p className="text-[11px] font-bold text-slate-500 mt-1">Alumnos Activos</p>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px]">
            <span className="text-emerald-600 font-bold flex items-center gap-0.5">
              ↑ +5%
            </span>
            {/* SVG Sparkline */}
            <svg className="w-20 h-6 text-blue-500" viewBox="0 0 100 30" fill="none">
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
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div className="text-right">
              <p className="font-display text-xl sm:text-2xl font-black text-slate-900 leading-none">
                {totalTeachers > 0 ? totalTeachers : '86'}
              </p>
              <p className="text-[11px] font-bold text-slate-500 mt-1">Docentes</p>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px]">
            <span className="text-emerald-600 font-bold flex items-center gap-0.5">
              ↑ +2%
            </span>
            <svg className="w-20 h-6 text-emerald-500" viewBox="0 0 100 30" fill="none">
              <path d="M0 20 Q30 5, 60 18 T100 8" stroke="currentColor" strokeWidth="2.5" fill="none" />
            </svg>
          </div>
        </div>

        {/* Card 3: Grupos */}
        <div 
          onClick={() => setShowClassroomList(true)}
          className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs hover:shadow-md transition cursor-pointer relative overflow-hidden flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
              <Building className="w-5 h-5" />
            </div>
            <div className="text-right">
              <p className="font-display text-xl sm:text-2xl font-black text-slate-900 leading-none">
                {classrooms.length > 0 ? classrooms.length : '12'}
              </p>
              <p className="text-[11px] font-bold text-slate-500 mt-1">Grupos</p>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px]">
            <span className="text-emerald-600 font-bold flex items-center gap-0.5">
              ↑ +1%
            </span>
            <svg className="w-20 h-6 text-purple-500" viewBox="0 0 100 30" fill="none">
              <path d="M0 22 Q25 10, 50 20 T100 5" stroke="currentColor" strokeWidth="2.5" fill="none" />
            </svg>
          </div>
        </div>

        {/* Card 4: Asistencia Promedio */}
        <div 
          onClick={() => showToast('Asistencia Institucional', 'Índice de asistencia general: 98%', 'info')}
          className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs hover:shadow-md transition cursor-pointer relative overflow-hidden flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <div className="text-right">
              <p className="font-display text-xl sm:text-2xl font-black text-slate-900 leading-none">
                98%
              </p>
              <p className="text-[11px] font-bold text-slate-500 mt-1">Asistencia Promedio</p>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px]">
            <span className="text-emerald-600 font-bold flex items-center gap-0.5">
              ↑ +3%
            </span>
            <svg className="w-20 h-6 text-orange-500" viewBox="0 0 100 30" fill="none">
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
            <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div className="text-right">
              <p className="font-display text-xl sm:text-2xl font-black text-slate-900 leading-none">
                24
              </p>
              <p className="text-[11px] font-bold text-slate-500 mt-1">Trámites Pendientes</p>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px]">
            <span className="text-rose-600 font-bold flex items-center gap-0.5">
              ↑ +2
            </span>
            <svg className="w-20 h-6 text-teal-500" viewBox="0 0 100 30" fill="none">
              <path d="M0 25 Q20 5, 55 18 T100 10" stroke="currentColor" strokeWidth="2.5" fill="none" />
            </svg>
          </div>
        </div>

      </div>

      {/* 3. Middle Section: Estadísticas Académicas (Bar Chart) + Accesos Rápidos (6 Actions) + Actividad Reciente */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Column 1: Estadísticas Académicas Bar Chart (5 Columns in 12-col grid) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-display text-sm sm:text-base font-black text-slate-900">
                Estadísticas Académicas
              </h3>
              <select
                value={statsPeriod}
                onChange={e => setStatsPeriod(e.target.value)}
                className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-slate-700 outline-none"
              >
                <option value="Último Semestre">Último Semestre</option>
                <option value="Ciclo 2025-2026">Ciclo 2025-2026</option>
                <option value="Histórico Anual">Histórico Anual</option>
              </select>
            </div>

            {/* Custom SVG / Pure CSS Bar Chart matching the Screenshot */}
            <div className="pt-6 pb-2">
              <div className="flex items-end justify-between gap-3 sm:gap-6 h-48 border-b border-slate-200 px-2 relative">
                {/* Y-axis grid guides */}
                <div className="absolute inset-x-0 top-0 border-t border-slate-100 text-[10px] text-slate-300 font-mono">100</div>
                <div className="absolute inset-x-0 top-1/4 border-t border-slate-100 text-[10px] text-slate-300 font-mono">75</div>
                <div className="absolute inset-x-0 top-2/4 border-t border-slate-100 text-[10px] text-slate-300 font-mono">50</div>
                <div className="absolute inset-x-0 top-3/4 border-t border-slate-100 text-[10px] text-slate-300 font-mono">25</div>

                {/* Bars: Inscripciones */}
                <div className="flex-1 flex flex-col items-center gap-1 z-10">
                  <div className="flex items-end gap-1.5 h-40">
                    <div className="relative group flex flex-col items-center">
                      <span className="text-[10px] font-bold text-slate-400 mb-1 opacity-0 group-hover:opacity-100 transition">1,120</span>
                      <div className="w-4 sm:w-5 bg-sky-300 rounded-t-md h-32 transition-all"></div>
                    </div>
                    <div className="relative group flex flex-col items-center">
                      <span className="text-[10px] font-bold text-blue-700 mb-1">1,248</span>
                      <div className="w-4 sm:w-5 bg-[#0066FF] rounded-t-md h-36 transition-all"></div>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-slate-600 mt-2 truncate">Inscripciones</span>
                </div>

                {/* Bars: Asistencias */}
                <div className="flex-1 flex flex-col items-center gap-1 z-10">
                  <div className="flex items-end gap-1.5 h-40">
                    <div className="relative group flex flex-col items-center">
                      <span className="text-[10px] font-bold text-slate-400 mb-1">92%</span>
                      <div className="w-4 sm:w-5 bg-sky-300 rounded-t-md h-32 transition-all"></div>
                    </div>
                    <div className="relative group flex flex-col items-center">
                      <span className="text-[10px] font-bold text-blue-700 mb-1">95%</span>
                      <div className="w-4 sm:w-5 bg-[#0066FF] rounded-t-md h-35 transition-all"></div>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-slate-600 mt-2 truncate">Asistencias</span>
                </div>

                {/* Bars: Aprobados */}
                <div className="flex-1 flex flex-col items-center gap-1 z-10">
                  <div className="flex items-end gap-1.5 h-40">
                    <div className="relative group flex flex-col items-center">
                      <span className="text-[10px] font-bold text-slate-400 mb-1">88%</span>
                      <div className="w-4 sm:w-5 bg-sky-300 rounded-t-md h-30 transition-all"></div>
                    </div>
                    <div className="relative group flex flex-col items-center">
                      <span className="text-[10px] font-bold text-blue-700 mb-1">91%</span>
                      <div className="w-4 sm:w-5 bg-[#0066FF] rounded-t-md h-33 transition-all"></div>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-slate-600 mt-2 truncate">Aprobados</span>
                </div>

                {/* Bars: Reprobados */}
                <div className="flex-1 flex flex-col items-center gap-1 z-10">
                  <div className="flex items-end gap-1.5 h-40">
                    <div className="relative group flex flex-col items-center">
                      <span className="text-[10px] font-bold text-slate-400 mb-1">12%</span>
                      <div className="w-4 sm:w-5 bg-sky-300 rounded-t-md h-8 transition-all"></div>
                    </div>
                    <div className="relative group flex flex-col items-center">
                      <span className="text-[10px] font-bold text-blue-700 mb-1">9%</span>
                      <div className="w-4 sm:w-5 bg-[#0066FF] rounded-t-md h-6 transition-all"></div>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-slate-600 mt-2 truncate">Reprobados</span>
                </div>
              </div>
            </div>
          </div>

          {/* Chart Legend */}
          <div className="pt-3 flex items-center justify-center gap-6 text-xs text-slate-500 border-t border-slate-100">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-xs bg-sky-300"></span>
              Periodo Anterior
            </span>
            <span className="flex items-center gap-2 font-bold text-slate-700">
              <span className="w-3 h-3 rounded-xs bg-[#0066FF]"></span>
              Periodo Actual
            </span>
          </div>
        </div>

        {/* Column 2: Accesos Rápidos (3 Columns in 12-col grid) */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <span className="text-amber-500 font-bold">⚡</span>
            <h3 className="font-display text-sm sm:text-base font-black text-slate-900">
              Accesos Rápidos
            </h3>
          </div>

          <div className="grid grid-cols-3 gap-2.5 my-auto py-3">
            {/* 1. Registrar Alumno */}
            <button
              type="button"
              onClick={() => setRegisterStudentModalOpen(true)}
              className="flex flex-col items-center justify-center p-3 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 transition group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-blue-100 text-[#0066FF] flex items-center justify-center mb-1.5 group-hover:scale-105 transition">
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
              className="flex flex-col items-center justify-center p-3 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 transition group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-sky-100 text-blue-600 flex items-center justify-center mb-1.5 group-hover:scale-105 transition">
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
              className="flex flex-col items-center justify-center p-3 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 transition group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mb-1.5 group-hover:scale-105 transition">
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
              className="flex flex-col items-center justify-center p-3 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 transition group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-1.5 group-hover:scale-105 transition">
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
              className="flex flex-col items-center justify-center p-3 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 transition group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-1.5 group-hover:scale-105 transition">
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
              className="flex flex-col items-center justify-center p-3 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 transition group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center mb-1.5 group-hover:scale-105 transition">
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

        {/* Column 3: Actividad Reciente (4 Columns in 12-col grid) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" />
              <h3 className="font-display text-sm sm:text-base font-black text-slate-900">
                Actividad Reciente
              </h3>
            </div>
            <button
              type="button"
              onClick={() => showToast('Actividad Global', 'Visualizando registro completo de eventos', 'info')}
              className="text-xs font-bold text-blue-600 hover:underline inline-flex items-center gap-1"
            >
              Ver todas →
            </button>
          </div>

          <div className="space-y-3.5 my-auto py-2">
            {(activities || []).slice(0, 4).map(item => (
              <div key={item.id} className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white ${
                  item.type === 'student' ? 'bg-[#0077FF]' :
                  item.type === 'grades' ? 'bg-sky-500' :
                  item.type === 'payment' ? 'bg-emerald-500' :
                  'bg-purple-500'
                }`}>
                  {item.type === 'student' && <UserPlus className="w-4 h-4" />}
                  {item.type === 'grades' && <span className="font-black text-xs">A+</span>}
                  {item.type === 'payment' && <CreditCard className="w-4 h-4" />}
                  {item.type === 'document' && <FileText className="w-4 h-4" />}
                  {item.type === 'announcement' && <Mail className="w-4 h-4" />}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-slate-900 leading-tight truncate">
                    {item.title}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                    {item.subtitle}
                  </p>
                  <span className="text-[10px] text-slate-400 mt-0.5 block">{item.time}</span>
                </div>
              </div>
            ))}
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
              <Calendar className="w-4 h-4 text-blue-600" />
              <h3 className="font-display text-sm sm:text-base font-black text-slate-900">
                Calendario Escolar
              </h3>
            </div>
            <button
              onClick={() => showToast('Calendario', 'Abriendo calendario oficial de periodos y asuetos', 'info')}
              className="text-xs font-bold text-blue-600 hover:underline"
            >
              Ver calendario →
            </button>
          </div>

          <div className="py-4 flex items-center gap-4 bg-slate-50/80 p-3.5 rounded-2xl border border-slate-100">
            <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col items-center justify-center flex-shrink-0 text-center">
              <span className="font-display font-black text-2xl text-[#0066FF] leading-none">07</span>
              <span className="text-[11px] font-bold text-slate-500 uppercase mt-0.5">Nov</span>
            </div>
            <div className="min-w-0">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900">
                <span>🇲🇽</span> Suspensión de Clases
              </span>
              <p className="text-xs text-slate-500 mt-1 leading-snug">
                Conmemoración del Día de la Revolución Mexicana
              </p>
              <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-md mt-1.5 inline-block">
                Asueto Oficial SEP
              </span>
            </div>
          </div>

          <div className="pt-2 text-right border-t border-slate-100 text-[10px] text-slate-400">
            Periodo Activo: {periods[0]?.name || '1er Bimestre'}
          </div>
        </div>

        {/* Mensajes y Notificaciones (4 columns) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-600" />
              <h3 className="font-display text-sm sm:text-base font-black text-slate-900">
                Mensajes y Notificaciones
              </h3>
            </div>
            <button
              onClick={() => setAnnouncementsModalOpen(true)}
              className="text-xs font-bold text-blue-600 hover:underline"
            >
              Ver todas →
            </button>
          </div>

          <div className="space-y-2.5 py-2">
            {(notificationsList || []).slice(0, 3).map((item, idx) => (
              <div key={idx} className="flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${item.color || 'bg-blue-500'}`}></span>
                  <span className="font-medium text-slate-800 truncate">{item.title}</span>
                </div>
                <span className="text-[10px] text-slate-400 whitespace-nowrap">{item.time}</span>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-blue-600">
            <button onClick={() => setAnnouncementsModalOpen(true)} className="font-bold hover:underline">
              + Redactar nuevo comunicado
            </button>
          </div>
        </div>

        {/* Promo Tech Card: Plataforma 100% en línea (3 columns) */}
        <div className="lg:col-span-3 rounded-2xl p-5 bg-gradient-to-br from-[#0B1528] via-[#102A5C] to-[#0055D4] text-white shadow-md flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-sky-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Plataforma 100% en línea</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-sky-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Acceso seguro</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-sky-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Siempre disponible</span>
            </div>
          </div>

          <div className="relative z-10 pt-4">
            <div className="w-full py-2 px-3 rounded-xl bg-white/15 hover:bg-white/25 border border-white/20 text-center font-display font-black text-xs text-white tracking-wide shadow-xs backdrop-blur-xs">
              IPSUR Manager School
            </div>
          </div>

          {/* Watermark icon */}
          <div className="absolute -right-4 -bottom-4 opacity-15 pointer-events-none">
            <Laptop className="w-32 h-32 text-white" />
          </div>
        </div>

      </div>

      {/* 5. Salas de Clases Virtuales Explorer */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h3 className="font-display text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
              <School className="w-5 h-5 text-[#0066FF]" />
              <span>Salas de Clases Virtuales</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Aulas activas de bachillerato en línea con rúbrica oficial, catedrático y alumnos matriculados.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCreateModalOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#0077FF] hover:bg-blue-600 rounded-xl shadow transition"
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
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
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
              Comienza creando una nueva sala de clases virtual para asignar temarios, rúbricas y docentes.
            </p>
            <button
              onClick={() => setCreateModalOpen(true)}
              className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#0077FF] hover:bg-blue-600 rounded-xl shadow transition"
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
                className="bg-white border border-slate-200 hover:border-blue-300 rounded-2xl p-4 shadow-xs hover:shadow-md transition flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[10px] font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md">
                      {cls.code}
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold">{cls.group}</span>
                  </div>

                  <h4 className="font-display font-bold text-slate-900 text-sm group-hover:text-[#0066FF] transition line-clamp-1">
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
                      className="px-3 py-1 text-[11px] font-bold text-white bg-[#0077FF] hover:bg-blue-600 rounded-lg shadow-xs transition"
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
