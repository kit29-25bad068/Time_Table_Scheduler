import React, { useState } from 'react';
import {
  School,
  Lock,
  Mail,
  ShieldCheck,
  UserCheck,
  GraduationCap,
  ArrowRight,
  Sparkles,
  Key,
  Layers,
  CheckCircle2,
  ChevronDown
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function LoginPage() {
  const { login, demoStudents, faculty, demoAdmin, institution, showToast } = useApp();

  const [email, setEmail] = useState('admin@abc.edu');
  const [password, setPassword] = useState('admin123');
  const [selectedDeptTab, setSelectedDeptTab] = useState('ALL');
  const [selectedYearTab, setSelectedYearTab] = useState('ALL');
  const [quickLoginTab, setQuickLoginTab] = useState('admin'); // 'admin' | 'faculty' | 'students'

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = login(email, password);
    if (!res.success) {
      showToast(res.message, 'error');
    }
  };

  const handleQuickLogin = (userEmail, userPassword) => {
    setEmail(userEmail);
    setPassword(userPassword);
    login(userEmail, userPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8 relative overflow-hidden">
      {/* Background Ambient Mesh */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/70 via-slate-100/90 to-purple-50/60 -z-10" />

      {/* Main Glassmorphic Container */}
      <div className="w-full max-w-5xl glass-panel rounded-3xl p-6 md:p-10 border border-white shadow-glass grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10 animate-fade-in">
        {/* Left Col: Institution Header & Sign In Form */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div>
            {/* Branding Header */}
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-900 to-blue-950 flex items-center justify-center text-white shadow-clay-btn font-bold text-xl border border-slate-700/50">
                <School className="w-6 h-6 text-blue-300" />
              </div>
              <div>
                <h1 className="text-base font-extrabold text-slate-900 leading-tight">
                  {institution.name}
                </h1>
                <p className="text-xs text-blue-700 font-bold">
                  Academic Scheduling & Timetable Portal
                </p>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                Sign In to Academic Portal
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Enter your university credentials or choose a 1-click demo role below.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Institutional Email / Register No
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. admin@abc.edu"
                    className="w-full pl-9 pr-3 py-2.5 bg-white/90 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2.5 bg-white/90 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-b from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-xl text-xs font-extrabold shadow-clay-btn active:shadow-clay-btn-active transition-all flex items-center justify-center space-x-2 border border-blue-400/40"
              >
                <span>Sign In to System</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Bottom Team Footer */}
          <div className="pt-4 border-t border-slate-200/80 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Problem: <strong>{institution.problemId}</strong></span>
            <span className="font-bold text-slate-700">{institution.teamName} ({institution.teamId})</span>
          </div>
        </div>

        {/* Right Col: 1-Click Interactive Demo User Pickers */}
        <div className="lg:col-span-7 bg-white/70 backdrop-blur-md rounded-2xl p-5 border border-white shadow-clay flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <Key className="w-4 h-4 text-purple-600" />
                <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                  1-Click Demo Profiles Selector
                </h3>
              </div>
              <span className="text-[10px] font-bold bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full border border-purple-200">
                All Batches & Roster
              </span>
            </div>

            {/* Profile Category Tabs */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              <button
                type="button"
                onClick={() => setQuickLoginTab('admin')}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 ${
                  quickLoginTab === 'admin'
                    ? 'bg-blue-700 text-white shadow-clay-btn'
                    : 'bg-white/80 text-slate-700 hover:bg-white border border-slate-200'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin</span>
              </button>

              <button
                type="button"
                onClick={() => setQuickLoginTab('faculty')}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 ${
                  quickLoginTab === 'faculty'
                    ? 'bg-emerald-700 text-white shadow-clay-btn'
                    : 'bg-white/80 text-slate-700 hover:bg-white border border-slate-200'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Faculty ({faculty.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setQuickLoginTab('students')}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 ${
                  quickLoginTab === 'students'
                    ? 'bg-amber-600 text-white shadow-clay-btn'
                    : 'bg-white/80 text-slate-700 hover:bg-white border border-slate-200'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Students ({demoStudents.length} Batches)</span>
              </button>
            </div>

            {/* TAB 1: Administrator Quick Profile */}
            {quickLoginTab === 'admin' && (
              <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200/80 space-y-3 animate-fade-in">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-extrabold text-slate-900 text-sm">{demoAdmin.name}</div>
                    <div className="text-xs text-blue-800 font-semibold">{demoAdmin.designation}</div>
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-blue-100 text-blue-900 px-2 py-0.5 rounded">
                    Admin Portal
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  Full ERP privileges: CP-SAT solver timetable generation, live conflict validation, faculty absence & emergency substitution, and timetable publication.
                </p>

                <div className="p-2.5 bg-white rounded-lg border border-blue-200/60 flex items-center justify-between text-xs">
                  <span className="font-mono text-slate-700"><strong>admin@abc.edu</strong> (pass: <code>admin123</code>)</span>
                  <button
                    type="button"
                    onClick={() => handleQuickLogin('admin@abc.edu', 'admin123')}
                    className="px-3 py-1.5 bg-blue-700 hover:bg-blue-800 text-white rounded-lg font-bold text-xs shadow-sm transition-all"
                  >
                    1-Click Sign In
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: Faculty Roster Profiles */}
            {quickLoginTab === 'faculty' && (
              <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1 animate-fade-in">
                {faculty.map((f) => (
                  <div
                    key={f.id}
                    className="p-3 rounded-xl bg-white/90 border border-slate-200 hover:border-emerald-400 transition-all flex items-center justify-between shadow-sm"
                  >
                    <div>
                      <div className="font-bold text-slate-900 text-xs">{f.name}</div>
                      <div className="text-[11px] text-slate-500">
                        {f.designation} • <strong>{f.department}</strong>
                      </div>
                      <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                        {f.email} (pass: <code>faculty123</code>)
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleQuickLogin(f.email, 'faculty123')}
                      className="px-3 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold shadow-sm transition-all shrink-0"
                    >
                      Login
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* TAB 3: Student Cohort Profiles (All 18 Batches) */}
            {quickLoginTab === 'students' && (
              <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1 animate-fade-in">
                {demoStudents.map((s) => (
                  <div
                    key={s.id}
                    className="p-3 rounded-xl bg-white/90 border border-slate-200 hover:border-amber-400 transition-all flex items-center justify-between shadow-sm"
                  >
                    <div>
                      <div className="flex items-center space-x-1.5">
                        <span className="font-bold text-slate-900 text-xs">{s.name}</span>
                        <span className="text-[10px] font-bold bg-amber-50 text-amber-800 px-1.5 py-0.2 rounded border border-amber-200">
                          {s.batchName}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Reg: <strong className="font-mono">{s.registerNo}</strong> • {s.department} (Sem {s.semester})
                      </div>
                      <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                        {s.email} (pass: <code>student123</code>)
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleQuickLogin(s.email, 'student123')}
                      className="px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold shadow-sm transition-all shrink-0"
                    >
                      Login
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-center">
            <span className="text-[11px] text-slate-400">
              Smart India Hackathon 2026 Presentation Mode • Instant Multi-Role Session Sync
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
