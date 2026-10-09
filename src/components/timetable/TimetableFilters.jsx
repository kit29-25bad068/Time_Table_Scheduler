import React from 'react';
import { Filter, Download, Printer, RefreshCw, Layers } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { exportTimetableToICS } from '../../services/icsExporter';

export default function TimetableFilters({
  activeBatchId,
  onBatchChange,
  facultyFilter,
  onFacultyFilterChange,
  roomFilter,
  onRoomFilterChange,
  dayFilter,
  onDayFilterChange,
  onPublishClick,
  filteredEntries = []
}) {
  const { batches, faculty, rooms, timetable, showToast } = useApp();

  const handleExportICS = () => {
    const currentBatch = batches.find(b => b.id === activeBatchId);
    const filename = `${(currentBatch?.name || 'timetable').replace(/\s+/g, '_').toLowerCase()}.ics`;
    exportTimetableToICS(filteredEntries, filename, `${currentBatch?.name || 'Academic'} Timetable - ABC College`);
    showToast(`Calendar exported as ${filename}!`, 'success');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="clay-card p-3 space-y-2.5 no-print">
      <div className="flex flex-wrap items-center justify-between gap-2.5">
        {/* Left Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Batch Selector */}
          <div className="flex items-center space-x-1.5 text-xs">
            <span className="font-bold text-slate-700">Batch:</span>
            <select
              value={activeBatchId}
              onChange={(e) => onBatchChange(e.target.value)}
              className="bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xs"
            >
              {batches.map(b => (
                <option key={b.id} value={b.id}>
                  {b.name} ({b.department} • Year {b.year}, Sem {b.semester})
                </option>
              ))}
            </select>
          </div>

          {/* Faculty Filter */}
          <div className="flex items-center space-x-1 text-xs">
            <span className="font-medium text-slate-500">Faculty:</span>
            <select
              value={facultyFilter}
              onChange={(e) => onFacultyFilterChange(e.target.value)}
              className="bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xs"
            >
              <option value="ALL">All Faculty</option>
              {faculty.map(f => (
                <option key={f.id} value={f.id}>{f.name} ({f.department})</option>
              ))}
            </select>
          </div>

          {/* Room Filter */}
          <div className="flex items-center space-x-1 text-xs">
            <span className="font-medium text-slate-500">Room:</span>
            <select
              value={roomFilter}
              onChange={(e) => onRoomFilterChange(e.target.value)}
              className="bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xs"
            >
              <option value="ALL">All Rooms</option>
              {rooms.map(r => (
                <option key={r.id} value={r.id}>{r.name} ({r.type})</option>
              ))}
            </select>
          </div>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center space-x-1.5">
          <button
            onClick={handleExportICS}
            title="Download RFC 5545 .ics Calendar file for Google/Apple Calendar"
            className="flex items-center space-x-1 px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold border border-slate-200 shadow-xs transition-all"
          >
            <Download className="w-3.5 h-3.5 text-blue-600" />
            <span>Export .ics</span>
          </button>

          <button
            onClick={handlePrint}
            title="Print or save as PDF"
            className="flex items-center space-x-1 px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold border border-slate-200 shadow-xs transition-all"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">Print</span>
          </button>

          {onPublishClick && (
            <button
              onClick={onPublishClick}
              className="flex items-center space-x-1 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-xs transition-all border border-blue-500"
            >
              <span>Publish</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
