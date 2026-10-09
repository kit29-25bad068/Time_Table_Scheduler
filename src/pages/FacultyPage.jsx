import React, { useState } from 'react';
import { Users, Plus, Search, Filter, Clock, CheckCircle2, AlertTriangle, ShieldCheck, Mail, Phone } from 'lucide-react';
import WorkloadChart from '../components/charts/WorkloadChart';
import Modal from '../components/common/Modal';
import { useApp } from '../context/AppContext';
import { DEPARTMENTS } from '../data/sampleData';

export default function FacultyPage() {
  const { faculty, setFaculty, showToast } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [deptFilter, setDeptFilter] = useState('ALL');
  const [addModalOpen, setAddModalOpen] = useState(false);

  // New faculty form state
  const [newName, setNewName] = useState('');
  const [newDept, setNewDept] = useState('AI & DS');
  const [newDesignation, setNewDesignation] = useState('Assistant Professor');
  const [newEmail, setNewEmail] = useState('');
  const [newMaxHours, setNewMaxHours] = useState(18);
  const [newCompetencies, setNewCompetencies] = useState('');

  const filteredFaculty = faculty.filter((f) => {
    const matchesSearch = f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          f.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = deptFilter === 'ALL' || f.department === deptFilter;
    return matchesSearch && matchesDept;
  });

  const handleAddFaculty = (e) => {
    e.preventDefault();
    if (!newName.trim()) {
      showToast('Please enter a faculty name.', 'warning');
      return;
    }

    const newFacultyObj = {
      id: `FAC_${Date.now()}`,
      name: newName,
      department: newDept,
      designation: newDesignation,
      email: newEmail || `${newName.toLowerCase().replace(/\s+/g, '.')}@kit.edu`,
      phone: '+91 98400 00000',
      maxWeeklyHours: Number(newMaxHours) || 18,
      assignedHours: 0,
      competencies: newCompetencies.split(',').map(s => s.trim()).filter(Boolean),
      status: 'Active',
    };

    setFaculty((prev) => [...prev, newFacultyObj]);
    showToast(`Faculty ${newName} added successfully.`, 'success');
    setAddModalOpen(false);
    setNewName('');
    setNewCompetencies('');
  };

  return (
    <div className="max-w-[1450px] mx-auto space-y-4 md:space-y-5 animate-fade-in">
      {/* Header */}
      <div className="clay-card p-4 md:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-sm shrink-0">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 leading-tight">Faculty Roster & Workload Management</h2>
              <p className="text-[11px] text-slate-500">
                Track assigned teaching hours, availability slots, and avoid faculty overload policies
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setAddModalOpen(true)}
          className="flex items-center space-x-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all shadow-xs self-start sm:self-auto border border-blue-500"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Faculty Member</span>
        </button>
      </div>

      {/* Workload Distribution Chart Card */}
      <div className="clay-card p-4 md:p-5">
        <h3 className="text-xs font-bold text-slate-900 mb-0.5 uppercase tracking-wider">Faculty Workload Distribution</h3>
        <p className="text-[11px] text-slate-500 mb-3">Comparison of assigned teaching periods vs departmental quota</p>
        <WorkloadChart faculty={faculty} />
      </div>

      {/* Search & Filter Toolbar */}
      <div className="clay-card p-3 flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center space-x-2 flex-1 max-w-sm">
          <div className="relative w-full">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search faculty name or department..."
              className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xs"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <span className="font-semibold text-slate-600">Department:</span>
          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-800 focus:outline-none shadow-xs"
          >
            <option value="ALL">All Departments</option>
            {DEPARTMENTS.map((d) => (
              <option key={d.id} value={d.code}>{d.name} ({d.code})</option>
            ))}
            <option value="Mathematics">Mathematics</option>
          </select>
        </div>
      </div>

      {/* Faculty Table */}
      <div className="clay-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-900 text-white border-b border-slate-800">
                <th className="p-3 font-semibold">Faculty Name & Role</th>
                <th className="p-3 font-semibold">Department</th>
                <th className="p-3 font-semibold">Max Weekly Limit</th>
                <th className="p-3 font-semibold">Assigned Hours</th>
                <th className="p-3 font-semibold">Free Slots</th>
                <th className="p-3 font-semibold">Workload Status</th>
                <th className="p-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredFaculty.map((f) => {
                const assigned = f.assignedHours || 0;
                const max = f.maxWeeklyHours || 18;
                const free = Math.max(0, max - assigned);
                const loadPercent = Math.round((assigned / max) * 100);

                let badgeClass = 'bg-emerald-100 text-emerald-800 border-emerald-300';
                let statusLabel = 'Balanced';

                if (loadPercent >= 100) {
                  badgeClass = 'bg-rose-100 text-rose-800 border-rose-300';
                  statusLabel = 'At Max Limit';
                } else if (loadPercent >= 85) {
                  badgeClass = 'bg-amber-100 text-amber-800 border-amber-300';
                  statusLabel = 'High';
                }

                return (
                  <tr key={f.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3">
                      <div className="font-bold text-slate-900">{f.name}</div>
                      <div className="text-[11px] text-slate-500">{f.designation} • {f.email}</div>
                    </td>
                    <td className="p-3 font-medium text-slate-700">
                      {f.department}
                    </td>
                    <td className="p-3 font-mono font-semibold text-slate-700">
                      {max} hrs / wk
                    </td>
                    <td className="p-3 font-mono font-bold text-blue-700">
                      {assigned} hrs
                    </td>
                    <td className="p-3 font-mono font-semibold text-emerald-700">
                      {free} hrs
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${badgeClass}`}>
                        {statusLabel} ({loadPercent}%)
                      </span>
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {f.status || 'Active'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Faculty Modal */}
      <Modal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        title="Add New Faculty Member"
      >
        <form onSubmit={handleAddFaculty} className="space-y-3.5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Full Name (with Title) *
            </label>
            <input
              type="text"
              required
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="e.g. Dr. Rajesh Khanna"
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
                  <option key={d.id} value={d.code}>{d.code}</option>
                ))}
                <option value="Mathematics">Mathematics</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Designation
              </label>
              <select
                value={newDesignation}
                onChange={(e) => setNewDesignation(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none"
              >
                <option value="Professor">Professor</option>
                <option value="Associate Professor">Associate Professor</option>
                <option value="Assistant Professor">Assistant Professor</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="faculty@kit.edu"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Max Weekly Hours
              </label>
              <input
                type="number"
                min="10"
                max="24"
                value={newMaxHours}
                onChange={(e) => setNewMaxHours(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Subject Competencies (comma separated)
            </label>
            <input
              type="text"
              value={newCompetencies}
              onChange={(e) => setNewCompetencies(e.target.value)}
              placeholder="e.g. Machine Learning, Deep Learning, Python"
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none"
            />
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
              Save Faculty Member
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
