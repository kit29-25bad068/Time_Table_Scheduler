import React from 'react';
import {
  UserCheck,
  Calendar,
  Clock,
  MapPin,
  UserX,
  Layers,
  BookOpen,
  Download,
  AlertCircle
} from 'lucide-react';
import TimetableGrid from '../components/timetable/TimetableGrid';
import { useApp } from '../context/AppContext';
import { exportTimetableToICS } from '../services/icsExporter';
import { PERIOD_SLOTS, PERIOD_ORDER, DAY_ORDER } from '../data/sampleData';

export default function FacultyViewPage({ setCurrentTab }) {
  const {
    currentUser,
    activeFaculty,
    faculty,
    timetable,
    institution,
    showToast
  } = useApp();

  const currentFaculty = currentUser?.role === 'faculty' ? currentUser : activeFaculty;

  // Filter entries taught by this faculty member across all batches and sort chronologically
  const facultyEntries = timetable
    .filter((e) => e.facultyId === currentFaculty.id || e.originalFacultyId === currentFaculty.id)
    .sort((a, b) => {
      const dayDiff = (DAY_ORDER[a.day] || 99) - (DAY_ORDER[b.day] || 99);
      if (dayDiff !== 0) return dayDiff;
      return (PERIOD_ORDER[a.periodId] || 99) - (PERIOD_ORDER[b.periodId] || 99);
    });

  const todayEntries = facultyEntries
    .filter((e) => e.day === 'Monday')
    .sort((a, b) => (PERIOD_ORDER[a.periodId] || 99) - (PERIOD_ORDER[b.periodId] || 99));

  const handleDownloadFacultyICS = () => {
    exportTimetableToICS(
      facultyEntries,
      `${(currentFaculty.name || 'faculty').replace(/\s+/g, '_').toLowerCase()}_teaching_schedule.ics`,
      `${currentFaculty.name}'s Teaching Timetable - ${institution.name}`
    );
    showToast('Faculty .ics teaching schedule downloaded!', 'success');
  };

  const handleMarkAbsence = () => {
    setCurrentTab('substitution');
  };

  return (
    <div className="max-w-[1450px] mx-auto space-y-4 md:space-y-5 animate-fade-in">
      {/* Faculty Profile Banner */}
      <div className="clay-card p-4 md:p-5 flex flex-col md:flex-row md:items-center justify-between gap-3.5">
        <div className="flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center font-bold text-base shadow-sm shrink-0">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-base font-extrabold text-slate-900">{currentFaculty.name}</h2>
              <span className="text-[10px] bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                {currentFaculty.designation}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Department of <strong>{currentFaculty.department}</strong> • Workload: <strong>{currentFaculty.assignedHours || 14} / {currentFaculty.maxWeeklyHours || 18} hrs</strong> assigned • {institution.name}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleMarkAbsence}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg text-xs font-bold border border-rose-200 transition-all shadow-xs"
          >
            <UserX className="w-3.5 h-3.5" />
            <span>Mark Emergency Absence</span>
          </button>

          <button
            onClick={handleDownloadFacultyICS}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all shadow-xs border border-blue-500"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Calendar (.ics)</span>
          </button>
        </div>
      </div>

      {/* Workload Metric Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="clay-card p-3.5">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Weekly Teaching Load</span>
          <div className="text-xl font-extrabold text-slate-900 font-mono mt-1">
            {facultyEntries.length} Hours
          </div>
          <span className="text-[11px] text-emerald-700 font-semibold mt-0.5 block">
            ✓ Within maximum quota ({currentFaculty.maxWeeklyHours || 18} hrs max)
          </span>
        </div>

        <div className="clay-card p-3.5">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Free Weekly Slots</span>
          <div className="text-xl font-extrabold text-emerald-700 font-mono mt-1">
            {Math.max(0, 40 - facultyEntries.length)} Slots
          </div>
          <span className="text-[11px] text-slate-500 mt-0.5 block">
            Available for research, office hours & substitution
          </span>
        </div>

        <div className="clay-card p-3.5">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Today's Teaching Sessions</span>
          <div className="text-xl font-extrabold text-blue-700 font-mono mt-1">
            {todayEntries.length} Periods
          </div>
          <span className="text-[11px] text-slate-500 mt-0.5 block">
            Monday schedule across cohorts
          </span>
        </div>
      </div>

      {/* Today's Teaching Timeline */}
      <div className="clay-card p-4 md:p-5 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100/90 pb-2">
          <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5 uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5 text-blue-600" />
            Today's Instructional Lectures (Monday)
          </h3>
          <span className="text-[11px] text-slate-500">Room & Batch Mapping</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {todayEntries.length === 0 ? (
            <p className="text-xs text-slate-400 py-4 col-span-2 text-center">No teaching sessions scheduled for today</p>
          ) : (
            todayEntries.map((entry) => {
              const period = PERIOD_SLOTS.find((p) => p.id === entry.periodId);
              const isLab = entry.type === 'Practical';

              return (
                <div
                  key={entry.id}
                  className={`p-2.5 rounded-lg border text-xs flex items-center justify-between transition-all ${
                    isLab ? 'bg-rose-50/70 border-rose-200/90 shadow-xs' : 'bg-white border-slate-200/90 shadow-xs'
                  }`}
                >
                  <div>
                    <div className="flex items-center space-x-1.5">
                      <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-700 px-1 py-0.2 rounded">
                        {entry.periodId}
                      </span>
                      <span className="font-bold text-slate-900">{entry.subjectName}</span>
                    </div>
                    <div className="text-slate-500 text-[11px] mt-0.5 space-x-2">
                      <span>Batch: <strong className="text-slate-800">{entry.batchName}</strong></span>
                      <span>•</span>
                      <span className="text-blue-700 font-semibold">{entry.roomName}</span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="font-mono text-[10px] font-bold text-slate-700 bg-slate-50 px-2 py-0.5 rounded border border-slate-200 block">
                      {period?.time}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 mt-0.5 inline-block">
                      Confirmed
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Weekly Teaching Schedule Grid */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5 uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5 text-emerald-700" />
            Complete Weekly Teaching Timetable: {currentFaculty.name}
          </h3>
          <span className="text-[11px] text-slate-500">Official Teaching Assignments</span>
        </div>

        <TimetableGrid
          entries={facultyEntries}
          activeBatchName={currentFaculty.name}
          isDraggable={false}
        />
      </div>
    </div>
  );
}
