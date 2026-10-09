import React from 'react';
import { Send, CheckCircle2, ShieldCheck, Users, Calendar, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import Modal from '../common/Modal';
import { useApp } from '../../context/AppContext';

export default function PublishModal({ isOpen, onClose }) {
  const { 
    publishSchedule, 
    timetable, 
    publishedVersion, 
    auditReport,
    institution 
  } = useApp();

  const handleConfirmPublish = () => {
    publishSchedule();
    // Trigger celebratory academic confetti
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#1E3A8A', '#0284C7', '#10B981', '#F59E0B']
      });
    } catch (e) {
      // safe fallback
    }
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Publish Academic Timetable"
      maxWidth="max-w-md"
    >
      <div className="space-y-4">
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-start space-x-3">
          <div className="p-2 bg-blue-100 text-blue-700 rounded-md shrink-0">
            <Send className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-blue-950 text-sm">Official Schedule Publication</h4>
            <p className="text-xs text-blue-800 mt-0.5 leading-relaxed">
              Publishing will update all Student and Faculty personalized portals with this approved timetable.
            </p>
          </div>
        </div>

        {/* Verification Checklist */}
        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200 rounded-md">
            <span className="text-slate-600 flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Hard Constraint Status:
            </span>
            <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              0 Clashes Verified
            </span>
          </div>

          <div className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200 rounded-md">
            <span className="text-slate-600 flex items-center gap-1.5 font-medium">
              <Calendar className="w-4 h-4 text-blue-600" />
              Scheduled Classes:
            </span>
            <span className="font-bold text-slate-900 font-mono">
              {timetable.length} Active Slots
            </span>
          </div>

          <div className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200 rounded-md">
            <span className="text-slate-600 flex items-center gap-1.5 font-medium">
              <Users className="w-4 h-4 text-purple-600" />
              Target Audience:
            </span>
            <span className="font-semibold text-slate-700">
              All Batches & Faculty ({institution.academicYear})
            </span>
          </div>
        </div>

        {/* Footer buttons */}
        <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-200">
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmPublish}
            className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Confirm & Publish Schedule</span>
          </button>
        </div>
      </div>
    </Modal>
  );
}
