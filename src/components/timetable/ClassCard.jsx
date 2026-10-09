import React from 'react';
import { GripVertical, UserCheck, Beaker, BookOpen, MapPin, User } from 'lucide-react';

export default function ClassCard({ entry, isDraggable = true, onDragStart, compact = false }) {
  const isLab = entry.type === "Practical" || entry.isLab;
  const isSubstituted = entry.isSubstituted;

  const typeColorClasses = isLab
    ? 'bg-rose-50/90 border-rose-200/90 text-rose-900 shadow-xs'
    : entry.type === "Elective"
    ? 'bg-purple-50/90 border-purple-200/90 text-purple-900 shadow-xs'
    : 'bg-blue-50/90 border-blue-200/90 text-blue-950 shadow-xs';

  const badgeColor = isLab
    ? 'bg-rose-100 text-rose-800 border-rose-300'
    : entry.type === "Elective"
    ? 'bg-purple-100 text-purple-800 border-purple-300'
    : 'bg-blue-100 text-blue-800 border-blue-300';

  return (
    <div
      draggable={isDraggable}
      onDragStart={(e) => onDragStart && onDragStart(e, entry)}
      className={`relative group rounded-lg p-2 border transition-all duration-150 ${typeColorClasses} ${
        isDraggable ? 'cursor-grab active:cursor-grabbing hover:border-blue-400 hover:shadow-sm' : ''
      }`}
    >
      {/* Top row: Type badge & drag grip */}
      <div className="flex items-center justify-between gap-1 mb-1">
        <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full border uppercase tracking-wider ${badgeColor}`}>
          {entry.type || "Theory"}
        </span>
        
        {isSubstituted && (
          <span className="text-[9px] font-extrabold bg-amber-100 text-amber-800 border border-amber-300 px-1.5 py-0.2 rounded-full flex items-center gap-0.5 shadow-xs" title={`Substituted for ${entry.originalFacultyName || 'Faculty'}`}>
            <UserCheck className="w-2.5 h-2.5 text-amber-700" />
            Sub
          </span>
        )}

        {isDraggable && (
          <div className="opacity-30 group-hover:opacity-100 text-slate-400 p-0.2 transition-opacity">
            <GripVertical className="w-3 h-3" />
          </div>
        )}
      </div>

      {/* Subject Title */}
      <h4 className="font-bold text-slate-900 text-xs leading-tight line-clamp-2">
        {entry.subjectName}
      </h4>

      {/* Faculty & Room details */}
      <div className="mt-1.5 space-y-0.5 text-[11px] text-slate-600 font-medium border-t border-black/5 pt-1">
        <div className="flex items-center gap-1 truncate" title={entry.facultyName}>
          <User className="w-2.5 h-2.5 text-slate-400 shrink-0" />
          <span className="truncate font-semibold text-slate-800">{entry.facultyName}</span>
        </div>
        <div className="flex items-center gap-1 text-[10px] text-slate-500 truncate" title={entry.roomName}>
          <MapPin className="w-2.5 h-2.5 text-slate-400 shrink-0" />
          <span className="truncate font-mono">{entry.roomName}</span>
        </div>
      </div>
    </div>
  );
}
