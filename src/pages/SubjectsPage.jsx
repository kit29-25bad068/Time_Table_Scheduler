import React, { useState } from 'react';
import { BookOpen, Plus, Search, Filter, Beaker, User, Layers } from 'lucide-react';
import Modal from '../components/common/Modal';
import { useApp } from '../context/AppContext';
import { DEPARTMENTS } from '../data/sampleData';

export default function SubjectsPage() {
  const { subjects, setSubjects, faculty, showToast } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [deptFilter, setDeptFilter] = useState('ALL');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [addModalOpen, setAddModalOpen] = useState(false);

  // New subject state
  const [newCode, setNewCode] = useState('');
  const [newName, setNewName] = useState('');
  const [newDept, setNewDept] = useState('AI & DS');
  const [newType, setNewType] = useState('Theory');
  const [newHours, setNewHours] = useState(4);
  const [newFacultyId, setNewFacultyId] = useState(faculty[0]?.id || '');
  const [newRequiresLab, setNewRequiresLab] = useState(false);
  const [newLabType, setNewLabType] = useState('Computer Lab');

  const filteredSubjects = subjects.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = deptFilter === 'ALL' || s.department === deptFilter;
    const matchesType = typeFilter === 'ALL' || s.type === typeFilter;
    return matchesSearch && matchesDept && matchesType;
  });

  const handleAddSubject = (e) => {
    e.preventDefault();
    if (!newName.trim() || !newCode.trim()) {
      showToast('Please fill in required subject code and name.', 'warning');
      return;
    }

    const assignedFac = faculty.find(f => f.id === newFacultyId);

    const newSubObj = {
      id: `SUB_${Date.now()}`,
      code: newCode,
      name: newName,
      department: newDept,
      type: newType,
      weeklyHours: Number(newHours) || 3,
      facultyId: newFacultyId,
      facultyName: assignedFac ? assignedFac.name : 'Faculty Member',
      requiresLab: newType === 'Practical' || newRequiresLab,
      labType: newType === 'Practical' ? newLabType : null,
      semester: 'III',
    };

    setSubjects((prev) => [...prev, newSubObj]);
    showToast(`Subject ${newName} created successfully.`, 'success');
    setAddModalOpen(false);
    setNewName('');
    setNewCode('');
  };

  return (
    <div className="max-w-[1450px] mx-auto space-y-4 md:space-y-5 animate-fade-in">
      {/* Header */}
      <div className="clay-card p-4 md:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-sm shrink-0">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 leading-tight">Curriculum Subjects & Course Allocations</h2>
              <p className="text-[11px] text-slate-500">
                Course catalog with weekly instructional hours, designated faculty, and specialized lab requirements
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setAddModalOpen(true)}
          className="flex items-center space-x-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all shadow-xs self-start sm:self-auto border border-blue-500"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add New Subject</span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="clay-card p-3 flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center space-x-2 flex-1 max-w-sm">
          <div className="relative w-full">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search subject code or name..."
              className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xs"
            />
          </div>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <div className="flex items-center space-x-1.5">
            <span className="font-semibold text-slate-600">Type:</span>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-800 focus:outline-none shadow-xs"
            >
              <option value="ALL">All Types</option>
              <option value="Theory">Theory</option>
              <option value="Practical">Practical / Lab</option>
              <option value="Elective">Elective</option>
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
              <option value="Mathematics">Mathematics</option>
            </select>
          </div>
        </div>
      </div>

      {/* Subjects Table */}
      <div className="clay-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-900 text-white border-b border-slate-800">
                <th className="p-3 font-semibold">Course Code & Name</th>
                <th className="p-3 font-semibold">Department</th>
                <th className="p-3 font-semibold">Type</th>
                <th className="p-3 font-semibold">Weekly Load</th>
                <th className="p-3 font-semibold">Primary Faculty</th>
                <th className="p-3 font-semibold">Lab Requirement</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredSubjects.map((s) => {
                const isLab = s.type === 'Practical' || s.requiresLab;

                return (
                  <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3">
                      <div className="font-bold text-slate-900">{s.name}</div>
                      <div className="text-[11px] text-slate-500 font-mono">{s.code}</div>
                    </td>
                    <td className="p-3 font-medium text-slate-700">
                      {s.department}
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                        isLab
                          ? 'bg-rose-50 text-rose-700 border-rose-200'
                          : s.type === 'Elective'
                          ? 'bg-purple-50 text-purple-700 border-purple-200'
                          : 'bg-blue-50 text-blue-700 border-blue-200'
                      }`}>
                        {s.type}
                      </span>
                    </td>
                    <td className="p-3 font-mono font-bold text-slate-900">
                      {s.weeklyHours} Hours / wk
                    </td>
                    <td className="p-3">
                      <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        <span>{s.facultyName}</span>
                      </div>
                    </td>
                    <td className="p-3">
                      {isLab ? (
                        <span className="text-[11px] text-rose-700 font-semibold flex items-center gap-1">
                          <Beaker className="w-3.5 h-3.5 text-rose-600" />
                          <span>{s.labType || 'Specialized Lab'}</span>
                        </span>
                      ) : (
                        <span className="text-slate-400 text-[11px]">Standard Classroom</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Subject Modal */}
      <Modal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        title="Add New Curriculum Subject"
      >
        <form onSubmit={handleAddSubject} className="space-y-3.5">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Subject Code *
              </label>
              <input
                type="text"
                required
                value={newCode}
                onChange={(e) => setNewCode(e.target.value)}
                placeholder="e.g. 23CS302"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
              />
            </div>

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
                  <option key={d.id} value={d.code}>{d.code}</option>
                ))}
                <option value="Mathematics">Mathematics</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Subject Name *
            </label>
            <input
              type="text"
              required
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="e.g. Operating Systems"
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Course Type
              </label>
              <select
                value={newType}
                onChange={(e) => setNewType(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none"
              >
                <option value="Theory">Theory</option>
                <option value="Practical">Practical / Lab</option>
                <option value="Elective">Elective</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Weekly Hours
              </label>
              <input
                type="number"
                min="1"
                max="6"
                value={newHours}
                onChange={(e) => setNewHours(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Assigned Faculty Member
            </label>
            <select
              value={newFacultyId}
              onChange={(e) => setNewFacultyId(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none"
            >
              {faculty.map((f) => (
                <option key={f.id} value={f.id}>{f.name} ({f.department})</option>
              ))}
            </select>
          </div>

          {newType === 'Practical' && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Lab Environment Type
              </label>
              <select
                value={newLabType}
                onChange={(e) => setNewLabType(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none"
              >
                <option value="Computer Lab">Computer Lab</option>
                <option value="AI/ML Lab">AI/ML Lab</option>
                <option value="VLSI Lab">VLSI Design Lab</option>
                <option value="Biomedical Lab">Biomedical Systems Lab</option>
              </select>
            </div>
          )}

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
              Save Subject
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
