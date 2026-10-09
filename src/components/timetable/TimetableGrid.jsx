import React, { useState } from 'react';
import { DAYS, PERIOD_SLOTS } from '../../data/sampleData';
import DragDropSlot from './DragDropSlot';
import InfeasibilityModal from './InfeasibilityModal';
import { useApp } from '../../context/AppContext';

export default function TimetableGrid({
  entries = [],
  activeBatchName = "III AI & DS A",
  isDraggable = true
}) {
  const { moveTimetableSlot, showToast } = useApp();

  const [draggedEntry, setDraggedEntry] = useState(null);
  const [conflictModalOpen, setConflictModalOpen] = useState(false);
  const [activeConflictDetails, setActiveConflictDetails] = useState(null);

  const handleDragStartEntry = (e, entry) => {
    e.dataTransfer.setData('text/plain', entry.id);
    e.dataTransfer.effectAllowed = 'move';
    setDraggedEntry(entry);
  };

  const handleDropSlot = (entryId, targetDay, targetPeriodId) => {
    const result = moveTimetableSlot({
      entryId,
      targetDay,
      targetPeriodId
    });

    if (!result.isValid) {
      // Trigger infeasibility diagnostic modal
      setActiveConflictDetails({
        title: "Infeasible Timetable Move Rejected",
        reasons: result.conflicts || [result.primaryReason || "Constraint violation"],
        conflictType: result.conflictType,
        targetSlot: { targetDay, targetPeriodId }
      });
      setConflictModalOpen(true);
    }
  };

  return (
    <div className="clay-card overflow-hidden border border-white/80 p-1.5 shadow-glass">
      {/* Timetable Table Wrapper */}
      <div className="overflow-x-auto rounded-lg">
        <table className="w-full border-collapse min-w-[1000px]">
          {/* Table Header: Period Timings & Break Columns */}
          <thead>
            <tr className="bg-gradient-to-r from-slate-900 via-navy-900 to-slate-900 text-white border-b border-slate-800/80">
              <th className="p-3.5 text-left text-xs font-extrabold w-28 uppercase tracking-wider sticky left-0 bg-slate-900 z-10 shadow-[2px_0_5px_rgba(0,0,0,0.2)]">
                Day / Slot
              </th>
              {PERIOD_SLOTS.map((period) => (
                <th
                  key={period.id}
                  className={`p-2.5 text-center border-l border-slate-800/60 ${
                    period.isBreak
                      ? 'w-20 bg-slate-800/75 backdrop-blur-xs text-slate-300'
                      : 'w-36 text-slate-100'
                  }`}
                >
                  <div className="text-[11px] font-extrabold tracking-tight">
                    {period.name}
                  </div>
                  <div className="text-[10px] font-medium text-slate-400 font-mono mt-0.5">
                    {period.time}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          {/* Table Body: Monday through Friday */}
          <tbody className="divide-y divide-slate-200/60">
            {DAYS.map((day, dayIdx) => (
              <tr key={day} className={dayIdx % 2 === 0 ? 'bg-white/70' : 'bg-slate-50/50'}>
                {/* Day Header Column */}
                <td className="p-3.5 text-xs font-extrabold text-slate-900 border-r border-slate-200/80 sticky left-0 bg-white/95 backdrop-blur-sm z-10 shadow-[2px_0_4px_rgba(0,0,0,0.03)]">
                  <div className="flex flex-col">
                    <span className="text-slate-900 font-extrabold text-xs">{day}</span>
                    <span className="text-[10px] text-slate-400 font-medium mt-0.5">Working Day</span>
                  </div>
                </td>

                {/* Period Slot Columns */}
                {PERIOD_SLOTS.map((period) => {
                  const slotEntries = entries.filter(
                    (e) => e.day === day && e.periodId === period.id
                  );

                  return (
                    <td
                      key={period.id}
                      className={`p-1.5 border-r border-slate-200/60 align-top ${
                        period.isBreak ? 'bg-slate-100/50' : ''
                      }`}
                    >
                      <DragDropSlot
                        day={day}
                        period={period}
                        entries={slotEntries}
                        onDropSlot={handleDropSlot}
                        onDragStartEntry={handleDragStartEntry}
                        isDraggable={isDraggable}
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Infeasibility Diagnosis Modal */}
      <InfeasibilityModal
        isOpen={conflictModalOpen}
        onClose={() => setConflictModalOpen(false)}
        conflictDetails={activeConflictDetails}
      />
    </div>
  );
}
