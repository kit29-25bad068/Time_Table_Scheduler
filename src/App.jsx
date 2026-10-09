import React, { useState } from 'react';
import { useApp } from './context/AppContext';
import Topbar from './components/common/Topbar';
import Sidebar from './components/common/Sidebar';
import NotificationDrawer from './components/common/NotificationDrawer';
import Toast from './components/common/Toast';

import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import GeneratorPage from './pages/GeneratorPage';
import TimetablePage from './pages/TimetablePage';
import SubstitutionPage from './pages/SubstitutionPage';
import FacultyPage from './pages/FacultyPage';
import RoomsPage from './pages/RoomsPage';
import BatchesPage from './pages/BatchesPage';
import SubjectsPage from './pages/SubjectsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import DataImportPage from './pages/DataImportPage';
import StudentViewPage from './pages/StudentViewPage';
import FacultyViewPage from './pages/FacultyViewPage';
import SettingsPage from './pages/SettingsPage';

export default function App() {
  const { 
    isAuthenticated,
    role, 
    currentUser,
    activeStudent,
    activeFaculty,
    toast, 
    showToast, 
    notifications 
  } = useApp();

  const [currentTab, setCurrentTab] = useState('dashboard');
  const [notificationDrawerOpen, setNotificationDrawerOpen] = useState(false);

  const unreadCount = notifications.filter((n) => n.unread).length;

  // If not authenticated, render Login Portal
  if (!isAuthenticated) {
    return (
      <>
        <LoginPage />
        <Toast toast={toast} onClose={() => {}} />
      </>
    );
  }

  const renderContent = () => {
    // If role is Student, show Student Personalized Portal
    if (role === 'student') {
      return <StudentViewPage />;
    }

    // If role is Faculty, show Faculty Personalized Portal
    if (role === 'faculty') {
      return <FacultyViewPage setCurrentTab={setCurrentTab} />;
    }

    // Admin view: route by current tab
    switch (currentTab) {
      case 'dashboard':
        return <DashboardPage setCurrentTab={setCurrentTab} />;
      case 'timetable':
        return <TimetablePage />;
      case 'generate':
        return <GeneratorPage setCurrentTab={setCurrentTab} />;
      case 'substitution':
        return <SubstitutionPage />;
      case 'faculty':
        return <FacultyPage />;
      case 'rooms':
        return <RoomsPage />;
      case 'batches':
        return <BatchesPage setCurrentTab={setCurrentTab} />;
      case 'subjects':
        return <SubjectsPage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'data-import':
        return <DataImportPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DashboardPage setCurrentTab={setCurrentTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col antialiased font-sans">
      {/* Top Navbar */}
      <Topbar
        onOpenNotifications={() => setNotificationDrawerOpen(true)}
        unreadCount={unreadCount}
      />

      {/* Main Workspace Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar (Only in Admin view or when navigating administrative features) */}
        {role === 'admin' ? (
          <Sidebar
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
          />
        ) : (
          <aside className="w-64 bg-slate-900 text-slate-300 p-4 border-r border-slate-800 flex flex-col justify-between shrink-0 no-print">
            <div className="space-y-4">
              <div className="p-3.5 bg-slate-800/80 rounded-xl border border-slate-700 shadow-sm">
                <span className="text-[10px] uppercase font-extrabold text-blue-400 block tracking-wider">
                  Personalized Portal
                </span>
                <span className="font-extrabold text-white text-sm block mt-1">
                  {currentUser?.name || (role === 'student' ? 'Student' : 'Faculty')}
                </span>
                <span className="text-[11px] text-slate-400 block mt-0.5 font-medium">
                  {role === 'student'
                    ? `${currentUser?.batchName || 'Cohort'} • Reg: ${currentUser?.registerNo || '23AD101'}`
                    : `${currentUser?.designation || 'Faculty'} • ${currentUser?.department || 'Department'}`}
                </span>
              </div>

              <div className="p-3 bg-blue-900/30 rounded-xl border border-blue-800/50 text-xs text-blue-200">
                <p className="leading-relaxed">
                  Viewing personalized published timetable for AY 2026–27.
                </p>
              </div>
            </div>

            {/* Bottom SIH info */}
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs">
              <div className="text-[11px] font-bold text-slate-200">Quantum Quirks</div>
              <div className="text-[10px] text-blue-400 font-mono">KITSIH26-S066 • SIH25028</div>
            </div>
          </aside>
        )}

        {/* Main Content Viewport */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-slate-50/50">
          {renderContent()}
        </main>
      </div>

      {/* Slide-out Notification Center */}
      <NotificationDrawer
        isOpen={notificationDrawerOpen}
        onClose={() => setNotificationDrawerOpen(false)}
      />

      {/* Global Toast Alerts */}
      <Toast toast={toast} onClose={() => {}} />
    </div>
  );
}
