import React from 'react';
import { AlertOctagon, XCircle, HelpCircle, ArrowRight } from 'lucide-react';

export default function InfeasibilityAlert({ report }) {
  if (!report) return null;

  return (
    <div className="p-4 rounded-lg bg-red-50 border border-red-200 shadow-sm space-y-3">
      {/* Header */}
      <div className="flex items-start space-x-3">
        <div className="p-2 bg-red-100 text-red-700 rounded-md shrink-0 mt-0.5">
          <AlertOctagon className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-bold text-red-950 text-sm">{report.title}</h4>
          <p className="text-xs text-red-800 mt-1 leading-relaxed">{report.summary}</p>
        </div>
      </div>

      {/* Disqualification Reasons Table */}
      {report.disqualifiedList && report.disqualifiedList.length > 0 && (
        <div className="bg-white rounded-md border border-red-200 p-3 text-xs">
          <h5 className="font-bold text-slate-900 mb-2 flex items-center gap-1.5">
            <XCircle className="w-3.5 h-3.5 text-red-600" />
            Candidate Disqualification Breakdown:
          </h5>
          <div className="max-h-48 overflow-y-auto divide-y divide-slate-100">
            {report.disqualifiedList.map((item, idx) => (
              <div key={idx} className="py-1.5 flex items-center justify-between text-[11px]">
                <span className="font-semibold text-slate-800">{item.name} ({item.department})</span>
                <span className="text-red-600 font-medium text-right max-w-[60%]">{item.reason}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Suggested Action */}
      <div className="p-2.5 bg-red-100/60 rounded border border-red-200 text-xs text-red-900 flex items-center gap-2">
        <HelpCircle className="w-4 h-4 text-red-700 shrink-0" />
        <span><strong>Administrator Recommendation:</strong> {report.suggestedAction}</span>
      </div>
    </div>
  );
}
