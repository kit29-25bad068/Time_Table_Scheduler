import React, { useState } from 'react';
import { Layers, Plus, Search, Filter, Users, DoorOpen, BookOpen } from 'lucide-react';
import Modal from '../components/common/Modal';
import { useApp } from '../context/AppContext';
import { DEPARTMENTS } from '../data/sampleData';

export default function BatchesPage({ setCurrentTab }) {
  const { batches, setBatches, timetable, setSelectedBatchId, showToast } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [yearFilter, setYearFilter] = useState('ALL');
  const [deptFilter, setDeptFilter] = useState('ALL');
  const [addModalOpen, setAddModalOpen] = useState(false);

  // New batch state
  const [newName, setNewName] = useState('');
  const [newYear, setNewYear] = useState(2);
  const [newSemester, setNewSemester] = useState('III');
  const [newSection, setNewSection] = useState('A');
  const [newDept, setNewDept] = useState('AI & DS');
  const [newStrength, setNewStrength] = useState(58);
  const [newPreferredRoom, setNewPreferredRoom] = useState('R201');

  const filteredBatches = batches.filter((b) => {
    const matchesSearch = b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          b.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesYear = yearFilter === 'ALL' || String(b.year) === yearFilter;
    const matchesDept = deptFilter === 'ALL' || b.department === deptFilter;
    return matchesSearch && matchesYear && matchesDept;
  });

  const handleAddBatch = (e) => {
    e.preventDefault();
    if (!newName.trim()) {
      showToast('Please enter a batch name.', 'warning');
      return;
    }

    const newBatchObj = {
      id: `B_${Date.now()}`,
      name: newName,
      year: Number(newYear),
      semester: newSemester,
      section: newSection,
      department: newDept,
      strength: Number(newStrength) || 55,
      preferredRoom: newPreferredRoom,
    };

    setBatches((prev) => [...prev, newBatchObj]);
    showToast(`Batch ${newName} created successfully.`, 'success');
    setAddModalOpen(false);
    setNewName('');
  };

  return (
    <div className="max-w-[1450px] mx-auto space-y-4 md:space-y-5 animate-fade-in">
      {/* Header */}
      <div className="clay-card p-4 md:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-sm shrink-0">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 leading-tight">Student Batches & Cohorts</h2>
              <p className="text-[11px] text-slate-500">
                2nd & 3rd Year academic cohorts across AI&DS, AI&ML, CSE, CSBS, VLSI, and BME departments
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setAddModalOpen(true)}
          className="flex items-center space-x-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all shadow-xs self-start sm:self-auto border border-blue-500"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add New Batch</span>
        </button>
      </div>

      {/* Filter toolbar */}
      <div className="clay-card p-3 flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center space-x-2 flex-1 max-w-sm">
          <div className="relative w-full">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search batch name or department..."
              className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xs"
            />
          </div>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <div className="flex items-center space-x-1.5">
            <span className="font-semibold text-slate-600">Year:</span>
            <select
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              className="bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-800 focus:outline-none shadow-xs"
            >
              <option value="ALL">All Years</option>
              <option value="2">2nd Year (Sem III)</option>
              <option value="3">3rd Year (Sem V)</option>
            </select>
          </div>

          <div className="flex items-center space-x-1.5">
            <span className="font-semibold text-slate-600">Department:</span>
            <select
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
              className="bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-800 focus:outline-none shadow-xs"
            >
              <option value="ALL">All Departments</option>
              {DEPARTMENTS.map((d) => (
                <option key={d.id} value={d.code}>{d.code}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Batches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {filteredBatches.map((b) => {
          const scheduledSlots = timetable.filter((e) => e.batchId === b.id).length;

          return (
            <div
              key={b.id}
              className="clay-card p-3.5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full border border-blue-200">
                    {b.year}nd / {b.year}rd Year • Sem {b.semester}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                    Sec {b.section}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-sm mt-1.5">{b.name}</h3>
                <p className="text-[11px] text-slate-500 font-medium">{b.department}</p>

                <div className="mt-2.5 grid grid-cols-2 gap-2 text-xs bg-slate-50/80 p-2 rounded-lg border border-slate-100">
                  <div>
                    <span className="text-[10px] text-slate-400 font-medium block">Student Strength</span>
                    <span className="font-bold text-slate-900 font-mono text-xs">{b.strength} Students</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-medium block">Preferred Room</span>
                    <span className="font-semibold text-slate-700 text-xs font-mono">{b.preferredRoom}</span>
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">
                  <strong className="text-blue-700 font-mono">{scheduledSlots}</strong> periods scheduled
                </span>
                <button
                  onClick={() => {
                    setSelectedBatchId(b.id);
                    setCurrentTab('timetable');
                  }}
                  className="text-xs font-bold text-blue-700 hover:text-blue-800"
                >
                  View Timetable &rarr;
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Batch Modal */}
      <Modal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        title="Add New Student Batch"
      >
        <form onSubmit={handleAddBatch} className="space-y-3.5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Batch Title *
            </label>
            <input
              type="text"
              required
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="e.g. II CSE C"
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Department
              </label>
              <select
                value={newDept}
                onChange={(e) => setNewDept(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none"
              >
                {DEPARTMENTS.map((d) => (
                  <option key={d.id} value={d.code}>{d.name} ({d.code})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Academic Year Level
              </label>
              <select
                value={newYear}
                onChange={(e) => {
                  setNewYear(Number(e.target.value));
                  setNewSemester(e.target.value === '2' ? 'III' : 'V');
                }}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none"
              >
                <option value={2}>2nd Year (Semester III)</option>
                <option value={3}>3rd Year (Semester V)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Student Strength
              </label>
              <input
                type="number"
                min="20"
                max="80"
                value={newStrength}
                onChange={(e) => setNewStrength(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Preferred Lecture Hall
              </label>
              <input
                type="text"
                value={newPreferredRoom}
                onChange={(e) => setNewPreferredRoom(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-3 border-t border-slate-200">
            <button
              type="button"
              onClick={() => setAddModalOpen(false)}
              className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg border border-slate-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all shadow-xs border border-blue-500"
            >
              Save Batch
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
