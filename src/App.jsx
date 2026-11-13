import React, { useState, useEffect, useRef } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/common/Navbar';
import LeftSidebarMenu from './components/common/LeftSidebarMenu';
import CoordinatorDashboard from './components/coordinator/CoordinatorDashboard';
import TeacherDashboard from './components/teacher/TeacherDashboard';
import StudentDashboard from './components/student/StudentDashboard';
import ClassroomDetail from './components/classroom/ClassroomDetail';
import LoginScreen from './components/auth/LoginScreen';
import MsnLoginToast from './components/common/MsnLoginToast';
import PwaInstallModal from './components/common/PwaInstallModal';
import AppSplashScreen from './components/common/AppSplashScreen';
import DoubleBackExitToast from './components/common/DoubleBackExitToast';
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

      {/* MSN Messenger Style Real-Time Login Notification Toast */}
      <MsnLoginToast />

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
  const { 
    currentUserId, 
    currentUser, 
    activeClassroomId,
    setActiveClassroomId,
    pwaModalOpen, 
    setPwaModalOpen, 
    deferredPrompt, 
    isPwaInstalled,
    logout
  } = useApp();

  // 1. Initial Application Boot Splash Screen (shows on first app click)
  const [showSplash, setShowSplash] = useState(() => {
    try {
      return !sessionStorage.getItem('ipsur_splash_seen');
    } catch {
      return false;
    }
  });

  const handleFinishSplash = () => {
    try {
      sessionStorage.setItem('ipsur_splash_seen', 'true');
    } catch {
      // Ignore
    }
    setShowSplash(false);
  };

  // 2. Mobile Double-Back to Exit / Minimize Logic
  const [doubleBackToast, setDoubleBackToast] = useState(false);
  const lastBackPressRef = useRef(0);
  const backToastTimerRef = useRef(null);

  useEffect(() => {
    // Only intercept when authenticated on mobile/standalone or browser
    if (!currentUserId || !currentUser) return;

    // Seed history state so system Back triggers popstate instead of immediately closing
    window.history.pushState({ app: 'ipsur-home' }, '');

    const handlePopState = () => {
      // Step A: If inside a classroom detail view, close classroom first
      if (activeClassroomId) {
        setActiveClassroomId(null);
        window.history.pushState({ app: 'ipsur-home' }, '');
        return;
      }

      // Step B: If PWA install modal is open, close modal first
      if (pwaModalOpen) {
        setPwaModalOpen(false);
        window.history.pushState({ app: 'ipsur-home' }, '');
        return;
      }

      // Step C: Root View - Double press detection within 2.5 seconds
      const now = Date.now();
      if (now - lastBackPressRef.current < 2500) {
        // Second press: Exit session / logout
        if (backToastTimerRef.current) clearTimeout(backToastTimerRef.current);
        setDoubleBackToast(false);
        logout();
      } else {
        // First press: warn user and retain session
        lastBackPressRef.current = now;
        window.history.pushState({ app: 'ipsur-home' }, '');
        setDoubleBackToast(true);

        if (backToastTimerRef.current) clearTimeout(backToastTimerRef.current);
        backToastTimerRef.current = setTimeout(() => {
          setDoubleBackToast(false);
        }, 2500);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      if (backToastTimerRef.current) clearTimeout(backToastTimerRef.current);
    };
  }, [currentUserId, currentUser, activeClassroomId, pwaModalOpen, setActiveClassroomId, setPwaModalOpen, logout]);

  return (
    <>
      {/* Cinematic App Launch Splash Screen */}
      {showSplash && <AppSplashScreen onFinish={handleFinishSplash} />}

      {/* Main App Screens */}
      {!currentUserId || !currentUser ? <LoginScreen /> : <MainLayout />}

      {/* Mobile Double-Back Exit Warning Toast */}
      <DoubleBackExitToast visible={doubleBackToast} />

      {/* Global PWA Mobile App Installation Guide Modal */}
      <PwaInstallModal
        isOpen={pwaModalOpen}
        onClose={() => setPwaModalOpen(false)}
        deferredPrompt={deferredPrompt}
        isInstalled={isPwaInstalled}
      />
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
