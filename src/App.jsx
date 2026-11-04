import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/common/Navbar';
import LeftSidebarMenu from './components/common/LeftSidebarMenu';
import CoordinatorDashboard from './components/coordinator/CoordinatorDashboard';
import TeacherDashboard from './components/teacher/TeacherDashboard';
import StudentDashboard from './components/student/StudentDashboard';
import ClassroomDetail from './components/classroom/ClassroomDetail';
import LoginScreen from './components/auth/LoginScreen';
import { INSTITUTIONAL_INFO } from './data/initialData';

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

      {/* Main Structural Body: Adhered Left Sidebar + Central Work Container */}
      <div className="flex-1 flex flex-row w-full max-w-[1920px] mx-auto min-h-0 relative">
        {/* Adhered Left Sidebar Menu */}
        <LeftSidebarMenu />

        {/* Main Central Container: Full responsive workspace */}
        <main className="flex-1 min-w-0 px-3.5 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-14 py-4 sm:py-6">
          {activeClassroomId ? (
            <ClassroomDetail
              classroomId={activeClassroomId}
              onBack={() => setActiveClassroomId(null)}
            />
          ) : (currentUser.role === 'coordinator' || currentUser.role === 'director' || currentUser.role === 'superadmin') ? (
            <CoordinatorDashboard onSelectClassroom={id => setActiveClassroomId(id)} />
          ) : currentUser.role === 'teacher' ? (
            <TeacherDashboard onSelectClassroom={id => setActiveClassroomId(id)} />
          ) : (
            <StudentDashboard onSelectClassroom={id => setActiveClassroomId(id)} />
          )}
        </main>
      </div>

      {/* Institutional Executive Footer Bar matching Screenshot */}
      <footer className="bg-[#070D1B] text-slate-400 text-[11px] py-3.5 px-4 sm:px-8 border-t border-slate-800 shadow-md">
        <div className="w-full max-w-[1920px] mx-auto flex flex-col md:flex-row items-center justify-between gap-2.5">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white tracking-wide">
              {institutionalInfo.name} {institutionalInfo.version || 'v1.0.0'}
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">{institutionalInfo.schoolName}</span>
          </div>

          <div className="text-slate-400 hidden sm:block">
            Desarrollado con tecnología de vanguardia
          </div>

          <div className="flex items-center gap-1.5 text-slate-400 font-semibold">
            <span>🔒</span>
            <span>Conexión segura</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function AppContent() {
  const { currentUserId, currentUser } = useApp();

  // If no user is authenticated or page was reopened, strictly show the Login Screen
  if (!currentUserId || !currentUser) {
    return <LoginScreen />;
  }

  return <MainLayout />;
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
