import React, { useState } from 'react';
import {
  Users,
  DoorOpen,
  Beaker,
  Layers,
  Calendar,
  AlertCircle,
  Cpu,
  UserCheck,
  Send,
  Plus,
  ArrowRight,
  ShieldCheck,
  Clock,
  MapPin,
  User
} from 'lucide-react';
import MetricCard from '../components/common/MetricCard';
import WorkloadChart from '../components/charts/WorkloadChart';
import RoomUtilizationChart from '../components/charts/RoomUtilizationChart';
import PublishModal from '../components/timetable/PublishModal';
import { useApp } from '../context/AppContext';
import { PERIOD_SLOTS, PERIOD_ORDER } from '../data/sampleData';

export default function DashboardPage({ setCurrentTab }) {
  const {
    faculty,
    rooms,
    batches,
    timetable,
    selectedBatchId,
    auditReport,
    isPublished,
    publishedVersion,
    institution
  } = useApp();

  const [publishModalOpen, setPublishModalOpen] = useState(false);

  const activeBatchObj = batches.find(b => b.id === selectedBatchId) || batches[0];

  // Today's preview: Filter Monday entries for active batch and sort chronologically by P1-P8
  const todayEntries = timetable
    .filter((e) => e.day === 'Monday' && e.batchId === activeBatchObj?.id)
    .sort((a, b) => (PERIOD_ORDER[a.periodId] || 99) - (PERIOD_ORDER[b.periodId] || 99));

  return (
    <div className="max-w-[1450px] mx-auto space-y-4 md:space-y-5 animate-fade-in">
      {/* Top Welcome Banner */}
      <div className="clay-card p-4 md:p-5 flex flex-col md:flex-row md:items-center justify-between gap-3.5">
        <div>
          <div className="flex items-center space-x-2.5">
            <h2 className="text-lg md:text-xl font-bold text-slate-900 tracking-tight">
              Academic Scheduling & Timetable Dashboard
            </h2>
            <span className="text-[11px] bg-blue-50 text-blue-700 font-bold px-2.5 py-0.5 rounded-full border border-blue-200">
              AY {institution.academicYear}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Centralized scheduling engine for <strong>{institution.name}</strong> • Problem Statement {institution.problemId}
          </p>
        </div>

        {/* Aligned Action Buttons Row */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setCurrentTab('generate')}
            className="h-9 px-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-sm transition-all flex items-center space-x-1.5 border border-blue-500"
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Generate Timetable</span>
          </button>

          <button
            onClick={() => setCurrentTab('substitution')}
            className="h-9 px-3.5 bg-white hover:bg-slate-50 text-slate-800 rounded-lg text-xs font-bold border border-slate-200 shadow-sm transition-all flex items-center space-x-1.5"
          >
            <UserCheck className="w-3.5 h-3.5 text-purple-600" />
            <span>Find Substitute</span>
          </button>

          <button
            onClick={() => setPublishModalOpen(true)}
            className="h-9 px-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-sm transition-all flex items-center space-x-1.5 border border-emerald-500"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Publish Timetable</span>
          </button>
        </div>
      </div>

      {/* 6 Key Problem Statement Metrics (6-Column Grid) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <MetricCard
          title="Total Faculty"
          value="48"
          subtitle={`${faculty.length} Active Roster`}
          icon={Users}
          color="blue"
          onClick={() => setCurrentTab('faculty')}
        />
        <MetricCard
          title="Classrooms"
          value="22"
          subtitle="All Buildings"
          icon={DoorOpen}
          color="blue"
          onClick={() => setCurrentTab('rooms')}
        />
        <MetricCard
          title="Labs"
          value="8"
          subtitle="Specialized Facilities"
          icon={Beaker}
          color="purple"
          onClick={() => setCurrentTab('rooms')}
        />
        <MetricCard
          title="Student Batches"
          value="18"
          subtitle="2nd & 3rd Year"
          icon={Layers}
          color="blue"
          onClick={() => setCurrentTab('batches')}
        />
        <MetricCard
          title="Scheduled Classes"
          value={timetable.length}
          subtitle="Weekly Teaching Slots"
          icon={Calendar}
          color="emerald"
          onClick={() => setCurrentTab('timetable')}
        />
        <MetricCard
          title="Conflicts"
          value={auditReport.clashCount}
          subtitle="0 Hard Clashes"
          icon={auditReport.clashCount === 0 ? ShieldCheck : AlertCircle}
          color={auditReport.clashCount === 0 ? "emerald" : "rose"}
          onClick={() => setCurrentTab('timetable')}
        />
      </div>

      {/* Main Grid: Charts & Today's Schedule (2-Column Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column (8 cols): Faculty Workload & Classroom Utilization */}
        <div className="lg:col-span-8 space-y-4">
          {/* Faculty Workload Card */}
          <div className="clay-card p-4 md:p-5">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Faculty Workload Overview</h3>
                <p className="text-[11px] text-slate-500">Assigned teaching hours vs maximum policy limit (18 hrs)</p>
              </div>
              <button
                onClick={() => setCurrentTab('faculty')}
                className="text-xs text-blue-700 hover:text-blue-800 font-bold flex items-center gap-1"
              >
                <span>View Roster</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <WorkloadChart faculty={faculty} />
          </div>

          {/* Classroom Utilization Card */}
          <div className="clay-card p-4 md:p-5">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Classroom & Lab Utilization</h3>
                <p className="text-[11px] text-slate-500">Weekly occupancy rate (%) across campus teaching spaces</p>
              </div>
              <button
                onClick={() => setCurrentTab('rooms')}
                className="text-xs text-blue-700 hover:text-blue-800 font-bold flex items-center gap-1"
              >
                <span>View Rooms</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <RoomUtilizationChart rooms={rooms} />
          </div>
        </div>

        {/* Right Column (4 cols): Today's Schedule & Shortcuts */}
        <div className="lg:col-span-4 space-y-4">
          {/* Today's Schedule Widget */}
          <div className="clay-card p-4 md:p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2.5 border-b border-slate-100/90 pb-2">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Today's Schedule</h3>
                  <p className="text-[11px] text-slate-500">Monday • {activeBatchObj?.name}</p>
                </div>
                <span className="text-[10px] font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full border border-blue-200">
                  {todayEntries.length} Periods
                </span>
              </div>

              <div className="space-y-2 max-h-[290px] overflow-y-auto pr-1">
                {todayEntries.length === 0 ? (
                  <p className="text-xs text-slate-400 py-6 text-center">No scheduled periods today</p>
                ) : (
                  todayEntries.map((entry) => {
                    const period = PERIOD_SLOTS.find((p) => p.id === entry.periodId);
                    const isLab = entry.type === "Practical";

                    return (
                      <div
                        key={entry.id}
                        className={`p-2.5 rounded-lg border text-xs transition-all ${
                          isLab
                            ? 'bg-rose-50/70 border-rose-200 shadow-xs'
                            : 'bg-white border-slate-200/90 shadow-xs hover:border-blue-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1.5 truncate max-w-[170px]">
                            <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-700 px-1 py-0.2 rounded">
                              {entry.periodId}
                            </span>
                            <span className="font-bold text-slate-900 truncate">
                              {entry.subjectName}
                            </span>
                          </div>
                          <span className="text-[10px] font-mono font-bold text-slate-600 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-200 shrink-0">
                            {period?.time}
                          </span>
                        </div>

                        <div className="mt-1 flex items-center justify-between text-[11px] text-slate-500">
                          <span className="flex items-center gap-1 font-medium text-slate-700">
                            <User className="w-3 h-3 text-slate-400" />
                            <span className="truncate max-w-[115px]">{entry.facultyName}</span>
                          </span>
                          <span className="flex items-center gap-1 font-mono text-[10px] text-slate-500">
                            <MapPin className="w-3 h-3 text-slate-400" />
                            <span>{entry.roomName}</span>
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            <button
              onClick={() => setCurrentTab('timetable')}
              className="w-full mt-3 py-2 bg-slate-50 hover:bg-slate-100 text-slate-800 rounded-lg text-xs font-bold border border-slate-200 transition-all flex items-center justify-center gap-1.5 shadow-xs"
            >
              <span>Open Interactive Timetable</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick Actions Panel (Dark Frosted Glass) */}
          <div className="glass-panel-dark text-white rounded-xl p-4 shadow-md">
            <h3 className="text-xs font-bold text-white mb-0.5 uppercase tracking-wider">Administrative Shortcuts</h3>
            <p className="text-[11px] text-slate-400 mb-2.5">Instant timetable and resource operations</p>

            <div className="space-y-1.5">
              <button
                onClick={() => setCurrentTab('generate')}
                className="w-full text-left px-3 py-2 bg-slate-800/80 hover:bg-slate-700/80 rounded-lg text-xs font-semibold flex items-center justify-between text-slate-200 transition-all border border-slate-700/80"
              >
                <span className="flex items-center gap-2">
                  <Cpu className="w-3.5 h-3.5 text-blue-400" />
                  Run CP-SAT Timetable Solver
                </span>
                <ArrowRight className="w-3 h-3 text-slate-400" />
              </button>

              <button
                onClick={() => setCurrentTab('substitution')}
                className="w-full text-left px-3 py-2 bg-slate-800/80 hover:bg-slate-700/80 rounded-lg text-xs font-semibold flex items-center justify-between text-slate-200 transition-all border border-slate-700/80"
              >
                <span className="flex items-center gap-2">
                  <UserCheck className="w-3.5 h-3.5 text-purple-400" />
                  Emergency Faculty Absence
                </span>
                <ArrowRight className="w-3 h-3 text-slate-400" />
              </button>

              <button
                onClick={() => setCurrentTab('data-import')}
                className="w-full text-left px-3 py-2 bg-slate-800/80 hover:bg-slate-700/80 rounded-lg text-xs font-semibold flex items-center justify-between text-slate-200 transition-all border border-slate-700/80"
              >
                <span className="flex items-center gap-2">
                  <Plus className="w-3.5 h-3.5 text-emerald-400" />
                  Import Faculty & Room CSV
                </span>
                <ArrowRight className="w-3 h-3 text-slate-400" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Publish Modal */}
      <PublishModal
        isOpen={publishModalOpen}
        onClose={() => setPublishModalOpen(false)}
      />
    </div>
  );
}
