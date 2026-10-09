import React, { useState } from 'react';
import { DoorOpen, Beaker, Plus, Search, Filter, Layers, MapPin, CheckCircle2 } from 'lucide-react';
import RoomUtilizationChart from '../components/charts/RoomUtilizationChart';
import Modal from '../components/common/Modal';
import { useApp } from '../context/AppContext';

export default function RoomsPage() {
  const { rooms, setRooms, showToast } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [addModalOpen, setAddModalOpen] = useState(false);

  // New room state
  const [newName, setNewName] = useState('');
  const [newType, setNewType] = useState('Classroom');
  const [newCapacity, setNewCapacity] = useState(60);
  const [newBuilding, setNewBuilding] = useState('Academic Block A');
  const [newFloor, setNewFloor] = useState('1st Floor');

  const filteredRooms = rooms.filter((r) => {
    const matchesSearch = r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          r.building.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'ALL' ||
                        (typeFilter === 'LABS' && r.isLab) ||
                        (typeFilter === 'CLASSROOMS' && !r.isLab);
    return matchesSearch && matchesType;
  });

  const handleAddRoom = (e) => {
    e.preventDefault();
    if (!newName.trim()) {
      showToast('Please enter room name.', 'warning');
      return;
    }

    const isLab = newType.includes('Lab');
    const newRoomObj = {
      id: `R_${Date.now()}`,
      name: newName,
      type: newType,
      capacity: Number(newCapacity) || 60,
      building: newBuilding,
      floor: newFloor,
      isLab,
      utilization: 65,
    };

    setRooms((prev) => [...prev, newRoomObj]);
    showToast(`Room ${newName} created successfully.`, 'success');
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
              <DoorOpen className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 leading-tight">Classrooms & Laboratories Inventory</h2>
              <p className="text-[11px] text-slate-500">
                Manage room capacities, specialized lab equipment, and monitor occupancy utilization rates
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setAddModalOpen(true)}
          className="flex items-center space-x-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all shadow-xs self-start sm:self-auto border border-blue-500"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Room / Lab</span>
        </button>
      </div>

      {/* Utilization Chart */}
      <div className="clay-card p-4 md:p-5">
        <h3 className="text-xs font-bold text-slate-900 mb-0.5 uppercase tracking-wider">Campus Facility Utilization Rates</h3>
        <p className="text-[11px] text-slate-500 mb-3">Occupancy distribution across general lecture halls and computer labs</p>
        <RoomUtilizationChart rooms={rooms} />
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
              placeholder="Search room name or building..."
              className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xs"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <span className="font-semibold text-slate-600">Category:</span>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-800 focus:outline-none shadow-xs"
          >
            <option value="ALL">All Facilities ({rooms.length})</option>
            <option value="CLASSROOMS">Classrooms ({rooms.filter(r => !r.isLab).length})</option>
            <option value="LABS">Specialized Labs ({rooms.filter(r => r.isLab).length})</option>
          </select>
        </div>
      </div>

      {/* Room Table */}
      <div className="clay-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-900 text-white border-b border-slate-800">
                <th className="p-3 font-semibold">Room / Lab Name</th>
                <th className="p-3 font-semibold">Facility Type</th>
                <th className="p-3 font-semibold">Seating Capacity</th>
                <th className="p-3 font-semibold">Location</th>
                <th className="p-3 font-semibold">Utilization Rate</th>
                <th className="p-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRooms.map((r) => {
                const isLab = r.isLab;
                const util = r.utilization || 70;

                let badgeColor = 'bg-blue-100 text-blue-800 border-blue-200';
                if (util >= 85) badgeColor = 'bg-emerald-100 text-emerald-800 border-emerald-300';
                else if (util < 60) badgeColor = 'bg-amber-100 text-amber-800 border-amber-300';

                return (
                  <tr key={r.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3">
                      <div className="font-bold text-slate-900 flex items-center gap-1.5">
                        {isLab ? <Beaker className="w-3.5 h-3.5 text-purple-600" /> : <DoorOpen className="w-3.5 h-3.5 text-blue-600" />}
                        <span>{r.name}</span>
                      </div>
                    </td>
                    <td className="p-3 font-medium text-slate-700">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${isLab ? 'bg-purple-50 text-purple-700 border-purple-200' : 'bg-slate-100 text-slate-700 border-slate-200'}`}>
                        {r.type}
                      </span>
                    </td>
                    <td className="p-3 font-mono font-bold text-slate-900">
                      {r.capacity} Seats
                    </td>
                    <td className="p-3 text-slate-500">
                      {r.building} • {r.floor}
                    </td>
                    <td className="p-3">
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${badgeColor}`}>
                          {util}%
                        </span>
                        <div className="w-16 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${util >= 85 ? 'bg-emerald-600' : util >= 60 ? 'bg-blue-600' : 'bg-amber-500'}`}
                            style={{ width: `${util}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Operational
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Room Modal */}
      <Modal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        title="Add New Classroom / Laboratory"
      >
        <form onSubmit={handleAddRoom} className="space-y-3.5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Room / Lab Name *
            </label>
            <input
              type="text"
              required
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="e.g. Room 205 or Lab 5 (IoT Systems)"
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Facility Type
              </label>
              <select
                value={newType}
                onChange={(e) => setNewType(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none"
              >
                <option value="Classroom">Classroom</option>
                <option value="Computer Lab">Computer Lab</option>
                <option value="AI/ML Lab">AI/ML Lab</option>
                <option value="VLSI Lab">VLSI Design Lab</option>
                <option value="Biomedical Lab">Biomedical Systems Lab</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Capacity (Seats)
              </label>
              <input
                type="number"
                min="20"
                max="120"
                value={newCapacity}
                onChange={(e) => setNewCapacity(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Building
              </label>
              <input
                type="text"
                value={newBuilding}
                onChange={(e) => setNewBuilding(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Floor
              </label>
              <input
                type="text"
                value={newFloor}
                onChange={(e) => setNewFloor(e.target.value)}
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
              Save Room
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
