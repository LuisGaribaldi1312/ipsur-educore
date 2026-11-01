import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/common/Navbar';
import CoordinatorDashboard from './components/coordinator/CoordinatorDashboard';
import TeacherDashboard from './components/teacher/TeacherDashboard';
import StudentDashboard from './components/student/StudentDashboard';
import ClassroomDetail from './components/classroom/ClassroomDetail';
import { INSTITUTIONAL_INFO } from './data/initialData';
import { ShieldCheck, School, Heart, CheckCircle2 } from 'lucide-react';

function MainLayout() {
  const { 
    currentUser, 
    activeClassroomId, 
    setActiveClassroomId,
    institutionalInfo 
  } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Container: Full width on computer screens, dynamically responsive on tablets & phones */}
      <main className="flex-1 w-full px-3.5 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-14 py-4 sm:py-6 max-w-[1920px] mx-auto">
        {activeClassroomId ? (
          <ClassroomDetail
            classroomId={activeClassroomId}
            onBack={() => setActiveClassroomId(null)}
          />
        ) : currentUser.role === 'coordinator' ? (
          <CoordinatorDashboard onSelectClassroom={id => setActiveClassroomId(id)} />
        ) : currentUser.role === 'teacher' ? (
          <TeacherDashboard onSelectClassroom={id => setActiveClassroomId(id)} />
        ) : (
          <StudentDashboard onSelectClassroom={id => setActiveClassroomId(id)} />
        )}
      </main>

      {/* Institutional Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-8 text-xs text-slate-500">
        <div className="w-full px-3.5 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-14 max-w-[1920px] mx-auto space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src="/ipsur-logo.png"
                alt="IPSUR Logo"
                className="h-10 w-auto object-contain"
              />
              <div>
                <p className="font-bold text-slate-800 text-sm">
                  {institutionalInfo.name} <span className="text-slate-400 font-normal">| {institutionalInfo.tagline}</span>
                </p>
                <p className="text-[11px] text-slate-500 font-semibold">
                  {institutionalInfo.schoolName} — <span className="italic text-ipsur-pink-600">"{institutionalInfo.schoolMotto}"</span>
                </p>
              </div>
            </div>

            <div className="text-center md:text-right">
              <p className="font-bold text-ipsur-navy-800 text-xs">
                {institutionalInfo.slogan}
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                {institutionalInfo.subSlogan}
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400">
            <p>
              © {new Date().getFullYear()} {institutionalInfo.schoolName}. Todos los derechos reservados. Clave de Registro RVOE: {institutionalInfo.rvoe}.
            </p>
            <div className="flex items-center gap-3">
              <span>Soporte Técnico: {institutionalInfo.supportEmail}</span>
              <span>•</span>
              <span>Tel: {institutionalInfo.phone}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
