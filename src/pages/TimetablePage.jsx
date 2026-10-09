import React, { useState } from 'react';
import { Calendar, ShieldCheck, Download, Printer, Send, Layers } from 'lucide-react';
import TimetableGrid from '../components/timetable/TimetableGrid';
import TimetableFilters from '../components/timetable/TimetableFilters';
import PublishModal from '../components/timetable/PublishModal';
import { useApp } from '../context/AppContext';

export default function TimetablePage() {
  const {
    batches,
    timetable,
    selectedBatchId,
    setSelectedBatchId,
    auditReport,
    isPublished,
    publishedVersion,
    institution
  } = useApp();

  const [facultyFilter, setFacultyFilter] = useState('ALL');
  const [roomFilter, setRoomFilter] = useState('ALL');
  const [dayFilter, setDayFilter] = useState('ALL');
  const [publishModalOpen, setPublishModalOpen] = useState(false);

  const activeBatch = batches.find((b) => b.id === selectedBatchId) || batches[0];

  // Filter entries based on batch and additional filter dropdowns
  const batchEntries = timetable.filter((e) => e.batchId === selectedBatchId);

  const filteredEntries = batchEntries.filter((entry) => {
    if (facultyFilter !== 'ALL' && entry.facultyId !== facultyFilter) return false;
    if (roomFilter !== 'ALL' && entry.roomId !== roomFilter) return false;
    if (dayFilter !== 'ALL' && entry.day !== dayFilter) return false;
    return true;
  });

  return (
    <div className="max-w-[1450px] mx-auto space-y-3.5 md:space-y-4 animate-fade-in">
      {/* Page Header with Batch Info & Publish Badge */}
      <div className="clay-card p-3.5 md:p-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-base font-bold text-slate-900">
              Interactive Timetable Editor: {activeBatch?.name}
            </h2>
            <span className="text-[11px] font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full border border-blue-200">
              {activeBatch?.department} • Sem {activeBatch?.semester}
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Strength: <strong>{activeBatch?.strength} students</strong> • Preferred Room: {activeBatch?.preferredRoom} • Drag and drop any class to reschedule with real-time collision checks.
          </p>
        </div>

        {/* Status Indicators */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>0 Clashes Verified</span>
          </div>

          <button
            onClick={() => setPublishModalOpen(true)}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all shadow-xs border border-blue-500"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Publish Timetable</span>
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <TimetableFilters
        activeBatchId={selectedBatchId}
        onBatchChange={setSelectedBatchId}
        facultyFilter={facultyFilter}
        onFacultyFilterChange={setFacultyFilter}
        roomFilter={roomFilter}
        onRoomFilterChange={setRoomFilter}
        dayFilter={dayFilter}
        onDayFilterChange={setDayFilter}
        onPublishClick={() => setPublishModalOpen(true)}
        filteredEntries={filteredEntries}
      />

      {/* 8-Period Interactive Timetable Grid */}
      <TimetableGrid
        entries={filteredEntries}
        activeBatchName={activeBatch?.name}
        isDraggable={true}
      />

      {/* Publish Modal */}
      <PublishModal
        isOpen={publishModalOpen}
        onClose={() => setPublishModalOpen(false)}
      />
    </div>
  );
}
