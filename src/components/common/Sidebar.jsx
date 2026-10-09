import React from 'react';
import {
  LayoutDashboard,
  Calendar,
  Cpu,
  UserCheck,
  Users,
  DoorOpen,
  Layers,
  BookOpen,
  BarChart3,
  Upload,
  Settings,
  Sparkles,
  GraduationCap,
  Briefcase
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Sidebar({ currentTab, setCurrentTab }) {
  const { role, institution, auditReport } = useApp();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'timetable', label: 'Timetable', icon: Calendar, badge: null },
    { id: 'generate', label: 'Generate', icon: Cpu, badge: 'Solver' },
    { id: 'substitution', label: 'Substitution', icon: UserCheck, badge: 'Emergency' },
    { id: 'faculty', label: 'Faculty', icon: Users },
    { id: 'rooms', label: 'Rooms & Labs', icon: DoorOpen },
    { id: 'batches', label: 'Batches', icon: Layers },
    { id: 'subjects', label: 'Subjects', icon: BookOpen },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'data-import', label: 'Data Import', icon: Upload },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-[260px] bg-slate-900 text-slate-300 flex flex-col justify-between border-r border-slate-800/90 shrink-0 select-none no-print">
      {/* Top Branding Section */}
      <div>
        <div className="h-14 px-4 border-b border-slate-800/80 flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold shadow-sm shrink-0">
            <Calendar className="w-4 h-4" />
          </div>
          <div className="truncate">
            <div className="text-sm font-bold text-white tracking-tight leading-tight">Smart Timetable</div>
            <div className="text-[11px] text-slate-400 font-medium">SIH 2026 Academic ERP</div>
          </div>
        </div>

        {/* Role Quick Status Banner */}
        <div className="mx-3 mt-3 px-3 py-2 rounded-lg bg-slate-800/70 border border-slate-700/60 text-xs">
          <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Active Workspace</div>
          <div className="font-semibold text-white flex items-center justify-between mt-0.5">
            <span className="capitalize">{role === 'admin' ? 'Administrator' : role} Portal</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm"></span>
          </div>
        </div>

        {/* Navigation List */}
        <nav className="mt-2.5 px-2.5 space-y-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`w-full h-10 flex items-center justify-between px-3 rounded-lg text-[13px] font-medium transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white font-semibold shadow-sm'
                    : 'text-slate-300 hover:bg-slate-800/90 hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                    isActive ? 'bg-blue-700 text-blue-100' : 'bg-slate-800 text-slate-400 border border-slate-700/60'
                  }`}>
                    {item.badge}
                  </span>
                )}
                {item.id === 'timetable' && auditReport.clashCount > 0 && (
                  <span className="text-[10px] bg-rose-600 text-white px-1.5 py-0.2 rounded-full font-bold">
                    {auditReport.clashCount}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom SIH Team Card */}
      <div className="p-3 m-3 rounded-lg bg-slate-950/70 border border-slate-800 text-xs">
        <div className="flex items-center justify-between text-[11px] font-semibold text-slate-200">
          <span>{institution.teamName}</span>
          <span className="font-mono text-[10px] text-blue-400">{institution.teamId}</span>
        </div>
        <div className="mt-1 text-[10px] text-slate-400 flex items-center justify-between">
          <span>Problem: {institution.problemId}</span>
          <span className="text-slate-500">SIH 2026</span>
        </div>
      </div>
    </aside>
  );
}
