import React, { useState } from 'react';
import { Settings, Sliders, ShieldCheck, Clock, RefreshCw, Save, School, Cpu } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PERIOD_SLOTS } from '../data/sampleData';

export default function SettingsPage() {
  const { institution, resetToDemoData, showToast } = useApp();

  const [collegeName, setCollegeName] = useState(institution.name);
  const [academicYear, setAcademicYear] = useState(institution.academicYear);
  const [maxFacultyHours, setMaxFacultyHours] = useState(18);
  const [solverTimeout, setSolverTimeout] = useState(10);
  const [lunchDuration, setLunchDuration] = useState(40);

  const handleSaveSettings = (e) => {
    e.preventDefault();
    showToast('Academic configuration settings saved successfully.', 'success');
  };

  return (
    <div className="max-w-[1450px] mx-auto space-y-4 md:space-y-5 animate-fade-in">
      {/* Header */}
      <div className="clay-card p-4 md:p-5">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-sm shrink-0">
            <Settings className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 leading-tight">System Configuration & Solver Settings</h2>
            <p className="text-[11px] text-slate-500">
              Institutional academic parameters, daily bell schedule, and CP-SAT solver constraint tolerances
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSaveSettings} className="space-y-4">
        {/* Institution Info Card */}
        <div className="clay-card p-4 md:p-5 space-y-3">
          <h3 className="text-xs font-bold text-slate-900 border-b border-slate-100/90 pb-2 flex items-center gap-2 uppercase tracking-wider">
            <School className="w-3.5 h-3.5 text-blue-600" />
            Institutional Identity & Academic Year
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                College / University Name
              </label>
              <input
                type="text"
                value={collegeName}
                onChange={(e) => setCollegeName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xs"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Current Academic Session
              </label>
              <input
                type="text"
                value={academicYear}
                onChange={(e) => setAcademicYear(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xs"
              />
            </div>
          </div>
        </div>

        {/* Daily Schedule Structure */}
        <div className="clay-card p-4 md:p-5 space-y-3">
          <h3 className="text-xs font-bold text-slate-900 border-b border-slate-100/90 pb-2 flex items-center gap-2 uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5 text-blue-600" />
            Daily Bell Schedule (8 Instructional Periods + 3 Breaks)
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            {PERIOD_SLOTS.map((p) => (
              <div
                key={p.id}
                className={`p-2 rounded-lg border ${
                  p.isBreak
                    ? 'bg-slate-100/80 border-slate-200 text-slate-600'
                    : 'bg-blue-50/50 border-blue-200/90 text-slate-900'
                }`}
              >
                <div className="font-bold text-[11px]">{p.name}</div>
                <div className="font-mono text-[10px] text-slate-500 mt-0.5">{p.time}</div>
                {p.isBreak && (
                  <span className="text-[9px] font-bold text-amber-700 uppercase tracking-wider block mt-0.5">
                    Non-Teaching Break
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Solver Constraints Parameters */}
        <div className="clay-card p-4 md:p-5 space-y-3">
          <h3 className="text-xs font-bold text-slate-900 border-b border-slate-100/90 pb-2 flex items-center gap-2 uppercase tracking-wider">
            <Cpu className="w-3.5 h-3.5 text-purple-600" />
            CP-SAT Optimization Weights & Policies
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Default Max Weekly Faculty Hours
              </label>
              <input
                type="number"
                value={maxFacultyHours}
                onChange={(e) => setMaxFacultyHours(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-900 focus:outline-none shadow-xs"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Solver Execution Timeout (Seconds)
              </label>
              <input
                type="number"
                value={solverTimeout}
                onChange={(e) => setSolverTimeout(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-900 focus:outline-none shadow-xs"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-1">
          <button
            type="button"
            onClick={resetToDemoData}
            className="flex items-center space-x-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold border border-slate-300 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset All to Default SIH Data</span>
          </button>

          <button
            type="submit"
            className="flex items-center space-x-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all shadow-xs border border-blue-500"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Configuration</span>
          </button>
        </div>
      </form>
    </div>
  );
}
