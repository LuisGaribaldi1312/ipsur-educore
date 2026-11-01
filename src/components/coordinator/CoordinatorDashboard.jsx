import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import CreateClassroomModal from './CreateClassroomModal';
import RubricModal from './RubricModal';
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
  Sparkles
} from 'lucide-react';

export default function CoordinatorDashboard({ onSelectClassroom }) {
  const { classrooms, currentUser, users, periods } = useApp();

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectedRubricClassroom, setSelectedRubricClassroom] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('all');

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
      {/* Executive Welcome Banner */}
      <div className="bg-gradient-to-r from-[#0A0D1B] via-[#151945] to-[#750042] rounded-3xl p-6 sm:p-9 text-white shadow-xl border border-white/10 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-3.5 mb-3.5">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/10 backdrop-blur-md p-2 flex items-center justify-center border border-white/20 shadow-2xl flex-shrink-0">
              <img src="/ipsur-logo.png" alt="IPSUR Emblem" className="w-full h-full object-contain filter drop-shadow-[0_2px_10px_rgba(255,255,255,0.25)]" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 bg-white/15 px-3 py-0.5 rounded-full text-[11px] font-bold text-pink-200 border border-white/15">
                <ShieldCheck className="w-3.5 h-3.5 text-ipsur-pink-400" />
                <span>Módulo de Control y Coordinación Escolar</span>
              </div>
              <p className="text-[11px] sm:text-xs text-indigo-200 mt-1 font-medium tracking-wide">Instituto Peninsular del Sur · "La educación es el camino"</p>
            </div>
          </div>

          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white leading-tight">
            Panel de Coordinación Académica
          </h1>
          <p className="text-xs sm:text-sm text-indigo-100/90 mt-2.5 leading-relaxed font-normal max-w-2xl">
            Administra y crea salas virtuales para el bachillerato en línea, asigna docentes titulares, matricula alumnos y carga la rúbrica oficial con el temario del bimestre o cuatrimestre.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setCreateModalOpen(true)}
              className="flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-bold text-ipsur-navy-900 bg-white hover:bg-slate-100 rounded-xl shadow-lg transition active:scale-95"
            >
              <Plus className="w-4 h-4 text-ipsur-pink-600" />
              <span>Crear Nueva Sala de Clases</span>
            </button>
          </div>
        </div>

        {/* Background decorative watermark with pure transparent emblem */}
        <div className="absolute -right-4 -bottom-10 opacity-20 pointer-events-none hidden md:block">
          <img src="/ipsur-logo.png" alt="IPSUR Watermark" className="w-80 h-auto object-contain filter brightness-150 drop-shadow-2xl" />
        </div>
      </div>

      {/* KPI Cards: Executive Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
        <div className="executive-card p-4 sm:p-5 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-ipsur-navy-600 to-indigo-600"></div>
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500">Salas Activas</span>
            <div className="p-2 rounded-xl bg-indigo-50 text-ipsur-navy-600 group-hover:bg-ipsur-navy-600 group-hover:text-white transition-colors duration-300">
              <School className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </div>
          <p className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-slate-900">{classrooms.length}</p>
          <span className="text-[11px] text-emerald-600 font-semibold mt-1.5 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            100% Disponibles en línea
          </span>
        </div>

        <div className="executive-card p-4 sm:p-5 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-ipsur-pink-500 to-rose-500"></div>
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500">Estudiantes</span>
            <div className="p-2 rounded-xl bg-pink-50 text-ipsur-pink-600 group-hover:bg-ipsur-pink-600 group-hover:text-white transition-colors duration-300">
              <Users className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </div>
          <p className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-slate-900">{totalStudents}</p>
          <span className="text-[11px] text-slate-500 mt-1.5 block font-mono truncate">
            PREPA-101-ONLINE
          </span>
        </div>

        <div className="executive-card p-4 sm:p-5 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500">Docentes</span>
            <div className="p-2 rounded-xl bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </div>
          <p className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-slate-900">{totalTeachers}</p>
          <span className="text-[11px] text-indigo-600 font-semibold mt-1.5 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
            Asignados a salas
          </span>
        </div>

        <div className="executive-card p-4 sm:p-5 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500"></div>
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500">Ciclo Activo</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </div>
          <p className="font-display text-lg sm:text-xl md:text-2xl font-black text-slate-900 truncate">1er Bimestre 2026</p>
          <span className="text-[11px] text-emerald-600 font-semibold mt-1.5 block">
            Modalidad Virtual SEP
          </span>
        </div>
      </div>

      {/* Classrooms Management Header & Filters */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-800">
              Salas de Clases Virtuales Registradas
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Cada sala contiene la rúbrica y temario cargados por Coordinación, el docente titular y los alumnos matriculados.
            </p>
          </div>

          <button
            onClick={() => setCreateModalOpen(true)}
            className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-ipsur-navy-700 to-ipsur-pink-600 hover:from-ipsur-navy-800 hover:to-ipsur-pink-700 rounded-xl shadow transition"
          >
            <Plus className="w-4 h-4" />
            <span>Crear Nueva Sala</span>
          </button>
        </div>

        {/* Filter controls */}
        <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 pt-2 border-t border-slate-100">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Buscar por materia, clave o profesor titular..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-ipsur-navy-500 outline-none"
            />
          </div>

          <select
            value={selectedPeriod}
            onChange={e => setSelectedPeriod(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-ipsur-navy-500 outline-none"
          >
            <option value="all">Todos los Periodos</option>
            {periods.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Classrooms Grid: Full Width on Desktops, 2 columns on tablets, 1 column on phones */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
        {filteredClassrooms.map(cls => {
          const rubricCount = cls.rubric?.topics?.length || 0;
          const studentsCount = cls.enrolledStudentIds?.length || 0;
          const activitiesCount = cls.activities?.length || 0;
          const materialsCount = cls.materials?.length || 0;

          return (
            <div
              key={cls.id}
              className="executive-card rounded-2xl overflow-hidden flex flex-col justify-between group hover:-translate-y-1"
            >
              {/* Card Header with gradient */}
              <div className="p-4 sm:p-5 bg-gradient-to-r from-[#0E1229] via-[#1E1B4B] to-[#500030] text-white relative">
                <div className="flex items-center justify-between text-[11px] mb-2.5">
                  <span className="font-mono bg-white/15 px-2.5 py-0.5 rounded-md font-bold tracking-wider text-[10px] border border-white/10">
                    {cls.code}
                  </span>
                  <span className="bg-gradient-to-r from-ipsur-pink-500 to-rose-600 text-white font-bold px-2.5 py-0.5 rounded-full text-[10px] shadow-sm">
                    {cls.periodName}
                  </span>
                </div>

                <h3 className="font-display text-base font-bold text-white line-clamp-1 group-hover:text-pink-200 transition-colors">
                  {cls.name}
                </h3>
                <p className="text-xs text-indigo-200/90 mt-1 font-medium flex items-center gap-1.5">
                  <span>Prof:</span>
                  <strong className="text-white font-semibold">{cls.teacherName}</strong>
                </p>
              </div>

              {/* Card Body */}
              <div className="p-4 space-y-3 text-xs flex-1">
                {/* Rubric Status */}
                <div className="flex items-start justify-between gap-2 p-2 rounded-lg bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-ipsur-pink-500 flex-shrink-0" />
                    <div>
                      <span className="font-bold text-slate-800 block">Rúbrica & Temario Oficial:</span>
                      <span className="text-[11px] text-slate-500">{rubricCount} Unidades / Temas cargados</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedRubricClassroom(cls)}
                    className="text-[11px] font-bold text-ipsur-navy-600 hover:text-ipsur-navy-800 underline"
                  >
                    Ver / Editar
                  </button>
                </div>

                {/* Criteria Configuration Status */}
                <div className="p-2 rounded-lg border flex items-center justify-between gap-2 text-[11px] bg-slate-50">
                  <span className="font-semibold text-slate-700">Ponderación Docente:</span>
                  {cls.criteriaConfigured ? (
                    <span className="font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      100% Configurado
                    </span>
                  ) : (
                    <span className="font-bold text-amber-800 bg-amber-100/70 px-2 py-0.5 rounded flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      Pendiente por Profesor
                    </span>
                  )}
                </div>

                {/* Stats summary */}
                <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                  <div className="p-1.5 bg-slate-50 rounded-lg">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Alumnos</span>
                    <span className="font-bold text-slate-800">{studentsCount}</span>
                  </div>
                  <div className="p-1.5 bg-slate-50 rounded-lg">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Tareas</span>
                    <span className="font-bold text-slate-800">{activitiesCount}</span>
                  </div>
                  <div className="p-1.5 bg-slate-50 rounded-lg">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Materiales</span>
                    <span className="font-bold text-slate-800">{materialsCount}</span>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-mono">
                  {cls.group}
                </span>

                <button
                  onClick={() => onSelectClassroom(cls.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-ipsur-navy-700 hover:bg-ipsur-navy-800 rounded-lg shadow-sm transition"
                >
                  <span>Ingresar al Classroom</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modals */}
      <CreateClassroomModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
      />

      {selectedRubricClassroom && (
        <RubricModal
          isOpen={Boolean(selectedRubricClassroom)}
          onClose={() => setSelectedRubricClassroom(null)}
          classroom={selectedRubricClassroom}
        />
      )}
    </div>
  );
}
