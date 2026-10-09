import React from 'react';
import { 
  Bell, 
  UserCheck, 
  GraduationCap, 
  ShieldCheck, 
  Calendar, 
  RefreshCw,
  LogOut,
  School,
  User
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Topbar({ onOpenNotifications, unreadCount }) {
  const { 
    institution, 
    role, 
    currentUser,
    logout,
    isPublished,
    publishedVersion,
    resetToDemoData 
  } = useApp();

  return (
    <header className="h-14 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 md:px-6 flex items-center justify-between sticky top-0 z-30 shadow-sm no-print">
      {/* Left: Institution Branding & Department / Role Context */}
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-slate-900 to-blue-950 flex items-center justify-center text-white font-bold text-base border border-slate-700/50 shrink-0">
          <School className="w-4 h-4 text-blue-300" />
        </div>
        <div className="flex flex-col justify-center">
          <div className="flex items-center space-x-2">
            <h1 className="font-bold text-slate-900 text-sm md:text-base tracking-tight leading-tight">
              {institution.name}
            </h1>
            <span className="hidden lg:inline-flex text-[11px] font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full border border-blue-200">
              AY {institution.academicYear}
            </span>
          </div>
          <p className="text-[11px] text-slate-500 flex items-center space-x-1.5 font-medium leading-none mt-0.5">
            <span>Dept: {currentUser?.department || institution.defaultDepartment}</span>
            <span>•</span>
            <span>
              {role === 'student'
                ? `Student Portal (${currentUser?.batchName || 'Cohort'} • Reg: ${currentUser?.registerNo || '23AD101'})`
                : role === 'faculty'
                ? `Faculty Portal (${currentUser?.name} • ${currentUser?.designation || 'Faculty'})`
                : `Administrator Portal (Dean of Academic Affairs)`}
            </span>
            {isPublished && (
              <>
                <span>•</span>
                <span className="text-emerald-700 font-bold inline-flex items-center bg-emerald-50 px-1.5 py-0.2 rounded-full border border-emerald-200 text-[10px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block mr-1"></span>
                  Published {publishedVersion}
                </span>
              </>
            )}
          </p>
        </div>
      </div>

      {/* Right: Actions, Notifications, Role Profile Badge & Logout */}
      <div className="flex items-center space-x-2 md:space-x-3">
        {/* Reset Demo Data Button (Only for Admin) */}
        {role === 'admin' && (
          <button
            onClick={resetToDemoData}
            title="Reset to default SIH Demo Data"
            className="hidden sm:flex items-center space-x-1.5 text-xs text-slate-700 bg-white hover:bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-200/90 shadow-sm transition-all font-semibold"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
            <span>Reset Data</span>
          </button>
        )}

        {/* Notifications Bell */}
        <button
          onClick={onOpenNotifications}
          className="relative p-1.5 text-slate-700 bg-white hover:bg-slate-50 rounded-lg border border-slate-200/90 shadow-sm transition-all"
          title="Notifications & System Alerts"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm animate-pulse">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Dedicated Authenticated Role Badge */}
        <div className="flex items-center space-x-1.5 bg-slate-900 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm border border-slate-700/60">
          {role === 'admin' && (
            <>
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span>Admin: {currentUser?.name || 'Dean of Academics'}</span>
            </>
          )}
          {role === 'faculty' && (
            <>
              <UserCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="truncate max-w-[140px]">Faculty: {currentUser?.name}</span>
            </>
          )}
          {role === 'student' && (
            <>
              <GraduationCap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="truncate max-w-[140px]">Student: {currentUser?.name} ({currentUser?.batchName})</span>
            </>
          )}
        </div>

        {/* Log Out Button */}
        <button
          onClick={logout}
          title="Log out back to login screen"
          className="flex items-center space-x-1.5 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg text-xs font-bold border border-rose-200 transition-all shadow-xs"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}
