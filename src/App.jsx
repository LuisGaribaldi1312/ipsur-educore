import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/common/Navbar';
import RightVerticalMenu from './components/common/RightVerticalMenu';
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
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 relative">
      {/* Top Navbar */}
      <Navbar />

      {/* Right-Hand Vertical Menu Dock */}
      <RightVerticalMenu />

      {/* Main Container: Full width on computer screens, dynamically responsive on tablets & phones */}
      <main className="flex-1 w-full px-3.5 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-14 py-4 sm:py-6 max-w-[1920px] mx-auto lg:pr-24">
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

      {/* Institutional Executive Footer */}
      <footer className="bg-white border-t border-slate-200 mt-16 py-10 text-xs text-slate-500 shadow-inner">
        <div className="w-full px-3.5 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-14 max-w-[1920px] mx-auto space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-1.5 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm flex items-center justify-center">
                <img
                  src="/ipsur-logo.png"
                  alt="IPSUR Logo Oficial"
                  className="h-14 sm:h-16 w-auto object-contain filter drop-shadow"
                />
              </div>
              <div>
                <p className="font-display font-black text-slate-900 text-base sm:text-lg">
                  {institutionalInfo.name} <span className="text-slate-400 font-normal text-xs">| {institutionalInfo.tagline}</span>
                </p>
                <p className="text-xs text-slate-600 font-semibold mt-0.5">
                  {institutionalInfo.schoolName} — <span className="italic text-ipsur-pink-600 font-medium">"{institutionalInfo.schoolMotto}"</span>
                </p>
              </div>
            </div>

            <div className="text-center md:text-right">
              <p className="font-display font-bold text-ipsur-navy-900 text-sm">
                {institutionalInfo.slogan}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                {institutionalInfo.subSlogan}
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
            <p>
              © {new Date().getFullYear()} {institutionalInfo.schoolName}. Todos los derechos reservados. Clave Oficial RVOE: {institutionalInfo.rvoe}.
            </p>
            <div className="flex items-center gap-3 font-medium">
              <span>Soporte: {institutionalInfo.supportEmail}</span>
              <span>•</span>
              <span>Tel: {institutionalInfo.phone}</span>
            </div>
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
