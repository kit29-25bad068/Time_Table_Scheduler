import React from 'react';
import {
  GraduationCap,
  Calendar,
  Clock,
  MapPin,
  User,
  Download,
  CheckCircle2,
  AlertCircle,
  BookOpen
} from 'lucide-react';
import TimetableGrid from '../components/timetable/TimetableGrid';
import { useApp } from '../context/AppContext';
import { exportTimetableToICS } from '../services/icsExporter';
import { PERIOD_SLOTS, PERIOD_ORDER, DAY_ORDER } from '../data/sampleData';

export default function StudentViewPage() {
  const {
    currentUser,
    activeStudent,
    timetable,
    institution,
    showToast
  } = useApp();

  const currentStudent = currentUser?.role === 'student' ? currentUser : activeStudent;

  // Filter entries for the logged-in student's batch and sort chronologically
  const studentEntries = timetable
    .filter((e) => e.batchId === currentStudent.batchId)
    .sort((a, b) => {
      const dayDiff = (DAY_ORDER[a.day] || 99) - (DAY_ORDER[b.day] || 99);
      if (dayDiff !== 0) return dayDiff;
      return (PERIOD_ORDER[a.periodId] || 99) - (PERIOD_ORDER[b.periodId] || 99);
    });

  const todayEntries = studentEntries
    .filter((e) => e.day === 'Monday')
    .sort((a, b) => (PERIOD_ORDER[a.periodId] || 99) - (PERIOD_ORDER[b.periodId] || 99));

  const tomorrowEntries = studentEntries
    .filter((e) => e.day === 'Tuesday')
    .sort((a, b) => (PERIOD_ORDER[a.periodId] || 99) - (PERIOD_ORDER[b.periodId] || 99));

  const handleDownloadPersonalICS = () => {
    exportTimetableToICS(
      studentEntries,
      `${(currentStudent.name || 'student').replace(/\s+/g, '_').toLowerCase()}_${currentStudent.registerNo}_timetable.ics`,
      `${currentStudent.name}'s Class Schedule - ${institution.name}`
    );
    showToast('Personalized .ics calendar downloaded!', 'success');
  };

  return (
    <div className="max-w-[1450px] mx-auto space-y-4 md:space-y-5 animate-fade-in">
      {/* Student Profile Banner */}
      <div className="clay-card p-4 md:p-5 flex flex-col md:flex-row md:items-center justify-between gap-3.5">
        <div className="flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 text-white flex items-center justify-center font-bold text-base shadow-sm shrink-0">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-base font-extrabold text-slate-900">{currentStudent.name}</h2>
              <span className="text-[10px] bg-amber-50 text-amber-800 font-mono font-bold px-2 py-0.5 rounded-full border border-amber-200">
                Reg: {currentStudent.registerNo}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Department of <strong>{currentStudent.department}</strong> • Batch: <strong>{currentStudent.batchName}</strong> (Sem {currentStudent.semester}) • {institution.name}
            </p>
          </div>
        </div>

        <button
          onClick={handleDownloadPersonalICS}
          className="flex items-center space-x-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all shadow-xs self-start md:self-auto border border-blue-500"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Sync to Calendar (.ics)</span>
        </button>
      </div>

      {/* Today & Tomorrow Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Today's Schedule Card */}
        <div className="clay-card p-4 md:p-5 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100/90 pb-2">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-blue-600" />
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Today's Schedule (Monday)</h3>
            </div>
            <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
              {todayEntries.length} Classes
            </span>
          </div>

          <div className="space-y-2 max-h-[310px] overflow-y-auto pr-1">
            {todayEntries.length === 0 ? (
              <p className="text-xs text-slate-400 py-6 text-center">No scheduled periods today for {currentStudent.batchName}</p>
            ) : (
              todayEntries.map((entry, idx) => {
                const period = PERIOD_SLOTS.find((p) => p.id === entry.periodId);
                const isLab = entry.type === 'Practical';

                return (
                  <div
                    key={entry.id}
                    className={`p-2.5 rounded-lg border text-xs flex items-center justify-between transition-all ${
                      isLab
                        ? 'bg-rose-50/70 border-rose-200/90 shadow-xs'
                        : 'bg-white border-slate-200/90 shadow-xs hover:border-blue-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center space-x-1.5">
                        <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded">
                          {entry.periodId}
                        </span>
                        <span className="font-bold text-slate-900">{entry.subjectName}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 flex items-center space-x-2 mt-0.5">
                        <span>{entry.facultyName}</span>
                        <span>•</span>
                        <span className="font-semibold text-slate-700">{entry.roomName}</span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="font-mono text-[10px] font-bold text-slate-700 bg-slate-50 px-2 py-0.5 rounded border border-slate-200 block">
                        {period?.time}
                      </span>
                      <span className={`text-[10px] font-semibold mt-0.5 inline-block ${
                        idx === 0 ? 'text-blue-700 font-bold' : 'text-slate-400'
                      }`}>
                        {idx === 0 ? 'Upcoming' : 'Scheduled'}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Tomorrow's Schedule Card */}
        <div className="clay-card p-4 md:p-5 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100/90 pb-2">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-purple-600" />
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Tomorrow's Classes (Tuesday)</h3>
            </div>
            <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">
              {tomorrowEntries.length} Classes
            </span>
          </div>

          <div className="space-y-2 max-h-[310px] overflow-y-auto pr-1">
            {tomorrowEntries.length === 0 ? (
              <p className="text-xs text-slate-400 py-6 text-center">No scheduled periods tomorrow</p>
            ) : (
              tomorrowEntries.map((entry) => {
                const period = PERIOD_SLOTS.find((p) => p.id === entry.periodId);
                const isLab = entry.type === 'Practical';

                return (
                  <div
                    key={entry.id}
                    className={`p-2.5 rounded-lg border text-xs flex items-center justify-between transition-all ${
                      isLab
                        ? 'bg-rose-50/70 border-rose-200/90 shadow-xs'
                        : 'bg-white border-slate-200/90 shadow-xs hover:border-purple-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center space-x-1.5">
                        <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded">
                          {entry.periodId}
                        </span>
                        <span className="font-bold text-slate-900">{entry.subjectName}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 flex items-center space-x-2 mt-0.5">
                        <span>{entry.facultyName}</span>
                        <span>•</span>
                        <span className="font-semibold text-slate-700">{entry.roomName}</span>
                      </div>
                    </div>

                    <span className="font-mono text-[10px] font-bold text-slate-700 bg-slate-50 px-2 py-0.5 rounded border border-slate-200 shrink-0">
                      {period?.time}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Weekly Student Timetable Matrix */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-900 flex items-center gap-2 uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5 text-blue-700" />
            Complete Weekly Academic Timetable: {currentStudent.batchName}
          </h3>
          <span className="text-[11px] text-slate-500">Official AY 2026–27 Published Schedule</span>
        </div>

        <TimetableGrid
          entries={studentEntries}
          activeBatchName={currentStudent.batchName}
          isDraggable={false}
        />
      </div>
    </div>
  );
}
