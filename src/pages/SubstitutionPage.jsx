import React, { useState, useEffect } from 'react';
import {
  UserCheck,
  Search,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  BookOpen,
  UserX,
  History,
  ShieldCheck,
  Sparkles,
  Zap,
  Layers
} from 'lucide-react';
import SubstituteCard from '../components/substitution/SubstituteCard';
import InfeasibilityAlert from '../components/substitution/InfeasibilityAlert';
import { useApp } from '../context/AppContext';
import { findSubstitutes } from '../services/substitutionEngine';
import { DAYS, TEACHING_PERIODS, PERIOD_SLOTS } from '../data/sampleData';

export default function SubstitutionPage() {
  const {
    faculty,
    timetable,
    subjects,
    substitutions,
    assignFacultySubstitute,
    showToast
  } = useApp();

  // Selected absence parameters
  const [absentFacultyId, setAbsentFacultyId] = useState('FAC_01'); // Dr. Arun Kumar
  const [selectedDay, setSelectedDay] = useState('Tuesday');
  const [selectedPeriodId, setSelectedPeriodId] = useState('P2'); // 09:30 - 10:20
  const [absenceReason, setAbsenceReason] = useState('Medical Leave / International Academic Conference');

  const [searchResult, setSearchResult] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Find class currently taught by absent faculty in that slot
  const targetClassEntry = timetable.find(
    (e) => e.facultyId === absentFacultyId && e.day === selectedDay && e.periodId === selectedPeriodId
  );

  const selectedFacultyObj = faculty.find((f) => f.id === absentFacultyId);
  const selectedPeriodObj = PERIOD_SLOTS.find((p) => p.id === selectedPeriodId);

  const handleFindSubstitute = (facId = absentFacultyId, day = selectedDay, pId = selectedPeriodId) => {
    setHasSearched(true);

    const classEntry = timetable.find(
      (e) => e.facultyId === facId && e.day === day && e.periodId === pId
    );

    const subjectName = classEntry ? classEntry.subjectName : 'Machine Learning';
    const subjectId = classEntry ? classEntry.subjectId : 'SUB_03';

    const result = findSubstitutes({
      absentFacultyId: facId,
      day,
      periodId: pId,
      subjectId,
      subjectName,
      facultyList: faculty,
      timetableEntries: timetable,
      subjects,
    });

    setSearchResult(result);
  };

  // Run automatically on first render so judges immediately see the recommendation
  useEffect(() => {
    handleFindSubstitute('FAC_01', 'Tuesday', 'P2');
  }, []);

  const handleApplyPreset = (facId, day, pId, reason) => {
    setAbsentFacultyId(facId);
    setSelectedDay(day);
    setSelectedPeriodId(pId);
    setAbsenceReason(reason);
    handleFindSubstitute(facId, day, pId);
    showToast(`Loaded demo scenario for ${day} ${pId}`, 'info');
  };

  const handleAssign = (substituteFaculty) => {
    if (!targetClassEntry) {
      showToast('No active class found in this slot to substitute for.', 'warning');
      return;
    }

    assignFacultySubstitute({
      entryId: targetClassEntry.id,
      substituteFaculty,
      reason: absenceReason,
    });

    // Re-run search to update status
    handleFindSubstitute();
  };

  return (
    <div className="max-w-[1450px] mx-auto space-y-4 md:space-y-5 animate-fade-in">
      {/* Header with Judge Demonstration Presets */}
      <div className="clay-card p-4 md:p-5 space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-purple-600 text-white flex items-center justify-center shadow-sm shrink-0">
              <UserCheck className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 leading-tight">Emergency Faculty Substitution Engine</h2>
              <p className="text-[11px] text-slate-500">
                Automated matching of domain competency, time availability, and workload quota balance
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-1.5 text-xs text-purple-700 bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-200">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="font-bold">SIH 2026 Judge Demo Mode</span>
          </div>
        </div>

        {/* 1-Click Demo Scenarios for Judges */}
        <div className="pt-2 border-t border-slate-100/90 flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-bold text-slate-600">Quick Test Scenarios:</span>
          
          <button
            type="button"
            onClick={() => handleApplyPreset('FAC_01', 'Tuesday', 'P2', 'Medical Emergency')}
            className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-lg text-xs font-semibold border border-emerald-200 transition-all shadow-xs"
          >
            🎯 Scenario 1: AI/ML Substitution (Dr. Arun Kumar, Tue P2)
          </button>

          <button
            type="button"
            onClick={() => handleApplyPreset('FAC_04', 'Wednesday', 'P3', 'Faculty Academic Leave')}
            className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-800 rounded-lg text-xs font-semibold border border-blue-200 transition-all shadow-xs"
          >
            🎯 Scenario 2: Mathematics Substitution (Dr. Meena, Wed P3)
          </button>

          <button
            type="button"
            onClick={() => handleApplyPreset('FAC_05', 'Thursday', 'P1', 'Conference Duty')}
            className="px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-800 rounded-lg text-xs font-semibold border border-indigo-200 transition-all shadow-xs"
          >
            🎯 Scenario 3: CSE Systems (Prof. Suresh, Thu P1)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Col: Absence Configuration Card */}
        <div className="space-y-4">
          <div className="clay-card p-4 md:p-5 space-y-3.5">
            <h3 className="text-xs font-bold text-slate-900 border-b border-slate-100/90 pb-2 flex items-center gap-2 uppercase tracking-wider">
              <UserX className="w-3.5 h-3.5 text-rose-600" />
              Mark Faculty Absence
            </h3>

            {/* Absent Faculty Select */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Absent Faculty Member
              </label>
              <select
                value={absentFacultyId}
                onChange={(e) => {
                  setAbsentFacultyId(e.target.value);
                  setHasSearched(false);
                  setSearchResult(null);
                }}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-xs"
              >
                {faculty.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.name} ({f.department} - {f.designation})
                  </option>
                ))}
              </select>
            </div>

            {/* Day & Period Select */}
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Day of Week
                </label>
                <select
                  value={selectedDay}
                  onChange={(e) => {
                    setSelectedDay(e.target.value);
                    setHasSearched(false);
                    setSearchResult(null);
                  }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-xs"
                >
                  {DAYS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Period / Slot
                </label>
                <select
                  value={selectedPeriodId}
                  onChange={(e) => {
                    setSelectedPeriodId(e.target.value);
                    setHasSearched(false);
                    setSearchResult(null);
                  }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-xs"
                >
                  {TEACHING_PERIODS.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.startTime})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Affected Class Preview */}
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs">
              <div className="font-bold text-slate-700 text-[10px] uppercase tracking-wider mb-1">
                Target Scheduled Session:
              </div>
              {targetClassEntry ? (
                <div className="space-y-0.5">
                  <div className="font-bold text-slate-900">{targetClassEntry.subjectName}</div>
                  <div className="text-slate-500 text-[11px] flex items-center justify-between">
                    <span>Batch: <strong>{targetClassEntry.batchName}</strong></span>
                    <span>Room: <strong className="font-mono">{targetClassEntry.roomName}</strong></span>
                  </div>
                  <div className="text-blue-700 font-mono text-[10px] pt-0.5">
                    Slot: {selectedDay} • {selectedPeriodObj?.time}
                  </div>
                </div>
              ) : (
                <div className="text-slate-500 text-[11px]">
                  No direct class assigned to {selectedFacultyObj?.name} on {selectedDay} {selectedPeriodObj?.time}.
                </div>
              )}
            </div>

            {/* Reason input */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Absence Justification
              </label>
              <input
                type="text"
                value={absenceReason}
                onChange={(e) => setAbsenceReason(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-xs"
                placeholder="Reason for absence..."
              />
            </div>

            {/* Search Trigger Button */}
            <button
              onClick={() => handleFindSubstitute()}
              className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-bold transition-all shadow-xs flex items-center justify-center space-x-1.5 border border-purple-500"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Find Qualified Substitute</span>
            </button>
          </div>
        </div>

        {/* Right 2 Cols: Recommendations / Infeasibility Diagnostic */}
        <div className="lg:col-span-2 space-y-4">
          {!hasSearched ? (
            <div className="clay-card p-8 text-center">
              <UserCheck className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Substitute Recommender Ready</h3>
              <p className="text-[11px] text-slate-500 max-w-md mx-auto mt-1">
                Select an absent faculty member and time slot on the left, then click <strong>"Find Qualified Substitute"</strong> to evaluate available professors across departments.
              </p>
            </div>
          ) : searchResult && !searchResult.isFeasible ? (
            /* Infeasibility Alert */
            <InfeasibilityAlert report={searchResult.infeasibilityReport} />
          ) : searchResult && searchResult.isFeasible ? (
            /* Feasible Recommendations List */
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5 uppercase tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Qualified Clash-Free Faculty Candidates ({searchResult.feasibleCandidates.length})
                </h3>
                <span className="text-[11px] text-slate-500">
                  Target: <strong>{searchResult.targetSlot.subjectName}</strong> ({searchResult.targetSlot.day} {searchResult.targetSlot.time})
                </span>
              </div>

              {/* Recommended Top Candidate */}
              {searchResult.recommendedSubstitute && (
                <SubstituteCard
                  candidate={searchResult.recommendedSubstitute}
                  isTopRecommendation={true}
                  onAssign={handleAssign}
                />
              )}

              {/* Other Feasible Candidates */}
              {searchResult.feasibleCandidates.slice(1).map((cand) => (
                <SubstituteCard
                  key={cand.faculty.id}
                  candidate={cand}
                  isTopRecommendation={false}
                  onAssign={handleAssign}
                />
              ))}
            </div>
          ) : null}

          {/* Active Session Substitutions Audit Table */}
          {substitutions.length > 0 && (
            <div className="clay-card p-4 md:p-5 space-y-2.5">
              <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5 border-b border-slate-100/90 pb-2 uppercase tracking-wider">
                <History className="w-3.5 h-3.5 text-blue-600" />
                Active Session Emergency Substitutions ({substitutions.length})
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 border-b border-slate-200">
                      <th className="p-2 font-semibold">Subject & Slot</th>
                      <th className="p-2 font-semibold">Original Faculty</th>
                      <th className="p-2 font-semibold">Assigned Substitute</th>
                      <th className="p-2 font-semibold">Batch / Room</th>
                      <th className="p-2 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {substitutions.map((sub) => (
                      <tr key={sub.id} className="hover:bg-slate-50/70">
                        <td className="p-2 font-bold text-slate-900">
                          {sub.subjectName}
                          <div className="text-[10px] text-slate-500 font-normal">
                            {sub.day} ({sub.periodId})
                          </div>
                        </td>
                        <td className="p-2 text-slate-500 line-through">
                          {sub.originalFacultyName}
                        </td>
                        <td className="p-2 font-semibold text-emerald-700">
                          {sub.substituteFacultyName}
                        </td>
                        <td className="p-2 text-slate-600">
                          {sub.batchName} • {sub.roomName}
                        </td>
                        <td className="p-2">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                            Active
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
