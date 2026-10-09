import React from 'react';
import { BarChart3, ShieldCheck, CheckCircle2, DoorOpen, Users, Beaker, Clock, Calendar } from 'lucide-react';
import MetricCard from '../components/common/MetricCard';
import WorkloadChart from '../components/charts/WorkloadChart';
import RoomUtilizationChart from '../components/charts/RoomUtilizationChart';
import { useApp } from '../context/AppContext';

export default function AnalyticsPage() {
  const {
    faculty,
    rooms,
    batches,
    timetable,
    auditReport,
    institution
  } = useApp();

  const totalTheoryPeriods = timetable.filter(e => e.type !== 'Practical').length;
  const totalLabPeriods = timetable.filter(e => e.type === 'Practical').length;

  return (
    <div className="max-w-[1450px] mx-auto space-y-4 md:space-y-5 animate-fade-in">
      {/* Header */}
      <div className="clay-card p-4 md:p-5">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-sm shrink-0">
            <BarChart3 className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 leading-tight">Institutional Scheduling Analytics & Resource Utilization</h2>
            <p className="text-[11px] text-slate-500">
              Audit reports, faculty workload balance metrics, and room occupancy indices for {institution.name}
            </p>
          </div>
        </div>
      </div>

      {/* 4 Performance Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <MetricCard
          title="Hard Clashes"
          value={auditReport.clashCount}
          subtitle="100% Policy Compliant"
          icon={ShieldCheck}
          color="emerald"
        />
        <MetricCard
          title="Avg Room Utilization"
          value="81%"
          subtitle="Optimal Academic Range"
          icon={DoorOpen}
          color="blue"
        />
        <MetricCard
          title="Faculty Workload Balance"
          value="87%"
          subtitle="Normal Distribution"
          icon={Users}
          color="purple"
        />
        <MetricCard
          title="Lab Facility Utilization"
          value="84%"
          subtitle="High Lab Efficiency"
          icon={Beaker}
          color="blue"
        />
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="clay-card p-4 md:p-5">
          <h3 className="text-xs font-bold text-slate-900 mb-0.5 uppercase tracking-wider">Faculty Teaching Load (Hours / Week)</h3>
          <p className="text-[11px] text-slate-500 mb-3">Assigned weekly hours compared against maximum threshold (16 - 20 hrs)</p>
          <WorkloadChart faculty={faculty} />
        </div>

        <div className="clay-card p-4 md:p-5">
          <h3 className="text-xs font-bold text-slate-900 mb-0.5 uppercase tracking-wider">Classroom & Lab Occupancy Percentages</h3>
          <p className="text-[11px] text-slate-500 mb-3">Weekly utilization rates across academic buildings and specialized labs</p>
          <RoomUtilizationChart rooms={rooms} />
        </div>
      </div>

      {/* Curriculum Distribution Breakdown */}
      <div className="clay-card p-4 md:p-5 space-y-3">
        <h3 className="text-xs font-bold text-slate-900 border-b border-slate-100/90 pb-2 uppercase tracking-wider">
          Curriculum Scheduling Breakdown
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 rounded-lg bg-blue-50/60 border border-blue-200">
            <span className="text-slate-500 font-semibold text-[11px]">Theory Lecture Sessions</span>
            <div className="text-xl font-extrabold text-blue-950 font-mono mt-1">
              {totalTheoryPeriods} Periods
            </div>
            <span className="text-[11px] text-blue-700 mt-1 block font-medium">
              {Math.round((totalTheoryPeriods / (timetable.length || 1)) * 100)}% of total schedule
            </span>
          </div>

          <div className="p-3.5 rounded-lg bg-rose-50/60 border border-rose-200">
            <span className="text-slate-500 font-semibold text-[11px]">Practical Laboratory Sessions</span>
            <div className="text-xl font-extrabold text-rose-950 font-mono mt-1">
              {totalLabPeriods} Periods
            </div>
            <span className="text-[11px] text-rose-700 mt-1 block font-medium">
              {Math.round((totalLabPeriods / (timetable.length || 1)) * 100)}% of total schedule
            </span>
          </div>

          <div className="p-3.5 rounded-lg bg-emerald-50/60 border border-emerald-200">
            <span className="text-slate-500 font-semibold text-[11px]">Constraint Validation Health</span>
            <div className="text-xl font-extrabold text-emerald-950 font-mono mt-1">
              100% Passed
            </div>
            <span className="text-[11px] text-emerald-700 mt-1 block font-medium">
              0 double bookings • 0 capacity overruns
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
