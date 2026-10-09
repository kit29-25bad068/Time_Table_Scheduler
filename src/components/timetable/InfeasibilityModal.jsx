import React from 'react';
import { AlertOctagon, ShieldAlert, XCircle, ArrowRight, CheckCircle2 } from 'lucide-react';
import Modal from '../common/Modal';

export default function InfeasibilityModal({ isOpen, onClose, conflictDetails, onAcknowledge }) {
  if (!conflictDetails) return null;

  const {
    title = "Infeasible Schedule Modification Detected",
    reasons = [],
    conflictType = "HARD_CONSTRAINT_VIOLATION",
    targetSlot = null,
    suggestions = []
  } = conflictDetails;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Scheduling Constraint Infeasibility Diagnosis"
      maxWidth="max-w-xl"
    >
      <div className="space-y-4">
        {/* Banner */}
        <div className="p-3.5 rounded-lg bg-red-50 border border-red-200 flex items-start space-x-3">
          <div className="p-2 rounded-md bg-red-100 text-red-700 shrink-0 mt-0.5">
            <AlertOctagon className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-red-950 text-sm">{title}</h4>
            <p className="text-xs text-red-800 mt-0.5 leading-relaxed">
              The requested timetable operation was rejected to prevent schedule corruption and maintain 100% hard constraint integrity.
            </p>
          </div>
        </div>

        {/* Breakdown of Violations */}
        <div>
          <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-red-600" />
            Violated Hard Constraints & Conflicts:
          </h5>
          <div className="space-y-2">
            {reasons.map((reason, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-md bg-slate-50 border border-red-200 text-xs text-slate-900 flex items-start space-x-2 font-medium"
              >
                <XCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span className="leading-snug">{reason}</span>
              </div>
            ))}
          </div>
        </div>

        {/* System Guidance & Recommendations */}
        <div className="p-3 rounded-md bg-slate-50 border border-slate-200 text-xs">
          <h5 className="font-bold text-slate-900 mb-1">Recommended Administrator Action:</h5>
          <ul className="text-slate-600 space-y-1 pl-4 list-disc text-[11px]">
            <li>Select an alternative period slot where both the faculty and room are free.</li>
            <li>Assign a larger classroom (capacity &gt;= batch strength) if capacity is exceeded.</li>
            <li>Use the <strong>Emergency Substitution</strong> module if faculty absence is the cause.</li>
          </ul>
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-200">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-all shadow-sm"
          >
            Acknowledge & Cancel Move
          </button>
        </div>
      </div>
    </Modal>
  );
}
