import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import ClassCard from './ClassCard';

export default function DragDropSlot({
  day,
  period,
  entries = [],
  onDropSlot,
  onDragStartEntry,
  isDraggable = true,
}) {
  const [isOver, setIsOver] = useState(false);

  // If this slot is a break period
  if (period.isBreak) {
    return (
      <div className="h-full min-h-[90px] bg-slate-100/90 border border-dashed border-slate-300 rounded flex flex-col items-center justify-center p-1 text-center select-none">
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
          {period.name}
        </span>
        <span className="text-[9px] font-medium text-slate-400 mt-0.5">
          {period.duration}
        </span>
      </div>
    );
  }

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (!isOver) setIsOver(true);
  };

  const handleDragLeave = () => {
    setIsOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsOver(false);
    const entryId = e.dataTransfer.getData('text/plain');
    if (entryId && onDropSlot) {
      onDropSlot(entryId, day, period.id);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`min-h-[105px] rounded-md p-1.5 transition-all border ${
        isOver
          ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-300/60 shadow-inner'
          : entries.length > 0
          ? 'bg-white border-slate-200 shadow-sm'
          : 'bg-slate-50/70 border-dashed border-slate-200 hover:border-slate-300'
      }`}
    >
      {entries.length === 0 ? (
        <div className="h-full min-h-[90px] flex items-center justify-center text-slate-300 text-xs font-mono">
          <span className="text-[10px] text-slate-400 select-none">Free Slot</span>
        </div>
      ) : (
        <div className="space-y-1.5">
          {entries.map((entry) => (
            <ClassCard
              key={entry.id}
              entry={entry}
              isDraggable={isDraggable}
              onDragStart={onDragStartEntry}
            />
          ))}
        </div>
      )}
    </div>
  );
}
