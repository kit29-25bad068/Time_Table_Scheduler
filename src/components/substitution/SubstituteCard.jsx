import React from 'react';
import { CheckCircle2, UserCheck, ShieldCheck, Clock, Award, BookOpen } from 'lucide-react';

export default function SubstituteCard({
  candidate,
  isTopRecommendation = false,
  onAssign,
  isAssigned = false,
}) {
  const { faculty, checks = [], totalScore, matchedCompetency, workloadStatus, remainingHours } = candidate;

  return (
    <div
      className={`rounded-lg p-4 border transition-all ${
        isTopRecommendation
          ? 'bg-emerald-50/40 border-emerald-300 shadow-sm'
          : 'bg-white border-slate-200 shadow-card'
      }`}
    >
      {/* Top Header: Faculty Name, Dept & Recommendation Badge */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-slate-900 text-white font-bold flex items-center justify-center text-sm shadow-sm">
            {faculty.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h4 className="font-bold text-slate-900 text-sm">{faculty.name}</h4>
              {isTopRecommendation && (
                <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Award className="w-3 h-3 text-emerald-700" />
                  Recommended
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 font-medium">
              {faculty.designation} • {faculty.department}
            </p>
          </div>
        </div>

        {/* Match Score */}
        <div className="text-right">
          <div className="text-xs font-bold text-slate-900 font-mono">
            {Math.round(totalScore)}% Match
          </div>
          <span className="text-[10px] text-slate-500">Heuristic Score</span>
        </div>
      </div>

      {/* Verified Constraints Checklist */}
      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 bg-white/80 p-2.5 rounded-md border border-slate-200 text-xs">
        {checks.map((check, idx) => (
          <div key={idx} className="flex items-center space-x-1.5 text-[11px]">
            {check.passed ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            ) : (
              <span className="w-3.5 h-3.5 rounded-full bg-red-100 text-red-600 font-bold text-[10px] flex items-center justify-center shrink-0">✕</span>
            )}
            <span className="font-medium text-slate-700">{check.label}:</span>
            <span className={`text-[10px] ${check.passed ? 'text-slate-500' : 'text-red-600 font-semibold'}`}>
              {check.detail}
            </span>
          </div>
        ))}
      </div>

      {/* Competencies Tags */}
      {faculty.competencies && (
        <div className="mt-2.5 flex flex-wrap gap-1 items-center">
          <span className="text-[10px] font-medium text-slate-400">Competencies:</span>
          {faculty.competencies.map((comp, idx) => (
            <span
              key={idx}
              className={`text-[10px] px-1.5 py-0.5 rounded border ${
                comp === matchedCompetency
                  ? 'bg-blue-50 text-blue-700 border-blue-300 font-bold'
                  : 'bg-slate-50 text-slate-600 border-slate-200'
              }`}
            >
              {comp}
            </span>
          ))}
        </div>
      )}

      {/* Action footer */}
      <div className="mt-3.5 flex items-center justify-between pt-2.5 border-t border-slate-100">
        <div className="flex items-center space-x-1 text-xs text-slate-600">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span>Workload: <strong className="text-slate-800">{faculty.assignedHours}/{faculty.maxWeeklyHours} hrs</strong> ({remainingHours} hrs free)</span>
        </div>

        <button
          onClick={() => onAssign && onAssign(faculty)}
          disabled={isAssigned}
          className={`px-3.5 py-1.5 rounded-md text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 ${
            isAssigned
              ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
              : 'bg-blue-700 hover:bg-blue-800 text-white'
          }`}
        >
          <UserCheck className="w-3.5 h-3.5" />
          <span>{isAssigned ? 'Assigned' : 'Assign Substitute'}</span>
        </button>
      </div>
    </div>
  );
}
