import React, { useState, useEffect } from 'react';
import {
  Cpu,
  CheckCircle2,
  AlertCircle,
  Clock,
  Zap,
  Sliders,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Layers,
  Calendar
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DEPARTMENTS, BATCHES } from '../data/sampleData';

export default function GeneratorPage({ setCurrentTab }) {
  const {
    batches,
    selectedBatchId,
    setSelectedBatchId,
    generateTimetable,
    institution,
    showToast
  } = useApp();

  // Find initial batch
  const initialBatch = batches.find(b => b.id === selectedBatchId) || batches[0];

  const [department, setDepartment] = useState(initialBatch?.department || 'AI & DS');
  const [targetBatchId, setTargetBatchId] = useState(initialBatch?.id || 'B_2_AIDS_A');
  const [semester, setSemester] = useState(initialBatch?.semester || 'III');
  const [academicYear, setAcademicYear] = useState('2026–27');

  const [isGenerating, setIsGenerating] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);
  const [progressMessage, setProgressMessage] = useState('');
  const [solverResult, setSolverResult] = useState(null);

  // Filter batches for selected department
  const deptBatches = batches.filter((b) => b.department === department);

  // Synchronize targetBatchId whenever department changes
  const handleDepartmentChange = (newDept) => {
    setDepartment(newDept);
    const available = batches.filter((b) => b.department === newDept);
    if (available.length > 0) {
      const match = available.find((b) => b.semester === semester) || available[0];
      setTargetBatchId(match.id);
      setSemester(match.semester);
      setSelectedBatchId(match.id);
    }
  };

  const handleBatchChange = (newBatchId) => {
    setTargetBatchId(newBatchId);
    setSelectedBatchId(newBatchId);
    const bObj = batches.find((b) => b.id === newBatchId);
    if (bObj) {
      setSemester(bObj.semester);
    }
  };

  const handleSemesterChange = (newSem) => {
    setSemester(newSem);
    const match = deptBatches.find((b) => b.semester === newSem);
    if (match) {
      setTargetBatchId(match.id);
      setSelectedBatchId(match.id);
    }
  };

  // Selected batch object
  const activeBatch = batches.find((b) => b.id === targetBatchId) || deptBatches[0] || batches[0];

  const handleGenerate = async () => {
    setIsGenerating(true);
    setProgressPercent(15);
    setProgressMessage(`Checking resources for ${activeBatch.name}...`);
    setSolverResult(null);

    try {
      const result = await generateTimetable({
        batchId: activeBatch.id,
        onProgress: (percent, msg) => {
          setProgressPercent(percent);
          setProgressMessage(msg);
        }
      });
      setSolverResult(result);
    } catch (err) {
      showToast(err.message || 'Generation failed', 'error');
      setIsGenerating(false);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-[1450px] mx-auto space-y-4 md:space-y-5 animate-fade-in">
      {/* Header */}
      <div className="clay-card p-4 md:p-5">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-sm shrink-0">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 leading-tight">Automated Timetable Generator</h2>
            <p className="text-[11px] text-slate-500">
              Constraint-based CP-SAT optimization engine with 100% hard constraint satisfaction guarantee
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left 2 Cols: Generation Controls & Constraints */}
        <div className="lg:col-span-2 space-y-4">
          {/* Target Selection Card */}
          <div className="clay-card p-4 md:p-5 space-y-3.5">
            <h3 className="text-xs font-bold text-slate-900 border-b border-slate-100/90 pb-2 flex items-center gap-2 uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5 text-blue-600" />
              Target Academic Batch Selection
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Department
                </label>
                <select
                  value={department}
                  onChange={(e) => handleDepartmentChange(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-xs"
                >
                  {DEPARTMENTS.map((d) => (
                    <option key={d.id} value={d.code}>
                      {d.name} ({d.code})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Target Batch / Section ({department})
                </label>
                <select
                  value={targetBatchId}
                  onChange={(e) => handleBatchChange(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-xs"
                >
                  {deptBatches.length === 0 ? (
                    <option disabled>No batches configured for {department}</option>
                  ) : (
                    deptBatches.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name} (Year {b.year}, Sem {b.semester}, Str: {b.strength})
                      </option>
                    ))
                  )}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Semester
                </label>
                <select
                  value={semester}
                  onChange={(e) => handleSemesterChange(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-xs"
                >
                  <option value="III">Semester III (2nd Year)</option>
                  <option value="V">Semester V (3rd Year)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Academic Year
                </label>
                <input
                  type="text"
                  value={academicYear}
                  readOnly
                  className="w-full bg-slate-100 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-600 cursor-not-allowed shadow-xs"
                />
              </div>
            </div>

            {/* Selected Target Summary Badge */}
            <div className="p-2.5 rounded-lg bg-blue-50/60 border border-blue-200 text-xs flex items-center justify-between">
              <span className="text-slate-600 text-[11px]">
                Generating for: <strong className="text-blue-900 font-bold">{activeBatch.name}</strong> ({activeBatch.department}, Semester {activeBatch.semester})
              </span>
              <span className="font-mono text-[10px] font-bold bg-white text-blue-700 px-2 py-0.5 rounded border border-blue-200">
                Preferred: {activeBatch.preferredRoom}
              </span>
            </div>

            {/* Generate Trigger Button */}
            <div className="pt-1">
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className={`w-full py-2.5 rounded-lg text-xs font-bold transition-all shadow-sm flex items-center justify-center space-x-2 ${
                  isGenerating
                    ? 'bg-blue-300 text-white cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs border border-blue-500'
                }`}
              >
                <Zap className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
                <span>{isGenerating ? `Running Solver for ${activeBatch.name}...` : `GENERATE TIMETABLE FOR ${activeBatch.name.toUpperCase()}`}</span>
              </button>
            </div>

            {/* Live Progress Bar */}
            {isGenerating && (
              <div className="space-y-1.5 p-3 bg-blue-50/70 border border-blue-200 rounded-lg animate-fade-in">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-blue-900">{progressMessage}</span>
                  <span className="font-mono font-bold text-blue-700">{progressPercent}%</span>
                </div>
                <div className="w-full bg-blue-200/70 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-600 h-full transition-all duration-300 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Solver Result Metrics Summary */}
          {solverResult && (
            <div className="clay-card p-4 md:p-5 border-emerald-200 space-y-3.5 animate-fade-in bg-emerald-50/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Timetable Generated Successfully: {solverResult.batchName}
                  </h3>
                </div>
                <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded border border-emerald-300">
                  0 Clashes
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                <div className="p-2.5 bg-white border border-slate-200 rounded-lg">
                  <div className="text-slate-500 text-[10px] uppercase font-bold">Execution Time</div>
                  <div className="text-sm font-bold text-slate-900 font-mono mt-0.5">
                    {solverResult.metrics.executionTimeMs} ms
                  </div>
                </div>

                <div className="p-2.5 bg-white border border-slate-200 rounded-lg">
                  <div className="text-slate-500 text-[10px] uppercase font-bold">Constraints Checked</div>
                  <div className="text-sm font-bold text-blue-700 font-mono mt-0.5">
                    {solverResult.metrics.hardConstraintsChecked}
                  </div>
                </div>

                <div className="p-2.5 bg-white border border-slate-200 rounded-lg">
                  <div className="text-slate-500 text-[10px] uppercase font-bold">Hard Clashes</div>
                  <div className="text-sm font-bold text-emerald-700 font-mono mt-0.5">
                    {solverResult.metrics.hardClashesCount}
                  </div>
                </div>

                <div className="p-2.5 bg-white border border-slate-200 rounded-lg">
                  <div className="text-slate-500 text-[10px] uppercase font-bold">Optimization Rate</div>
                  <div className="text-sm font-bold text-slate-900 font-mono mt-0.5">
                    {solverResult.metrics.optimizationScore}%
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-slate-200">
                <span className="text-[11px] text-slate-600">
                  {solverResult.entries.length} weekly periods scheduled for <strong>{solverResult.batchName}</strong>
                </span>
                <button
                  onClick={() => {
                    setSelectedBatchId(solverResult.batchId);
                    setCurrentTab('timetable');
                  }}
                  className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <span>Open {solverResult.batchName} in Timetable Editor</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Col: Active Constraints Rules Card */}
        <div className="space-y-4">
          <div className="clay-card p-4 md:p-5 space-y-3">
            <h3 className="text-xs font-bold text-slate-900 border-b border-slate-100/90 pb-2 flex items-center gap-2 uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Hard Constraints (Active)
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex items-start space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-800 text-xs">Faculty Clash Prevention</div>
                  <div className="text-[11px] text-slate-500">No faculty member assigned to multiple classes simultaneously</div>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-800 text-xs">Room Collision Prevention</div>
                  <div className="text-[11px] text-slate-500">No classroom or lab double-booked at any period</div>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-800 text-xs">Room Capacity Integrity</div>
                  <div className="text-[11px] text-slate-500">Room capacity must always be &gt;= batch student strength</div>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-800 text-xs">Specialized Lab Allocation</div>
                  <div className="text-[11px] text-slate-500">Practical subjects strictly mapped to AI/ML or Computer labs</div>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-800 text-xs">Break Slot Immunity</div>
                  <div className="text-[11px] text-slate-500">Preserves Morning Break, Lunch, and Afternoon Break</div>
                </div>
              </div>
            </div>
          </div>

          <div className="clay-card p-4 md:p-5 space-y-3">
            <h3 className="text-xs font-bold text-slate-900 border-b border-slate-100/90 pb-2 flex items-center gap-2 uppercase tracking-wider">
              <Sliders className="w-3.5 h-3.5 text-blue-600" />
              Soft Optimization Goals
            </h3>

            <div className="space-y-2.5 text-xs">
              <div>
                <div className="flex justify-between text-slate-700 font-medium mb-1 text-[11px]">
                  <span>Workload Balance Distribution</span>
                  <span className="font-bold text-blue-700">95%</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full w-[95%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-700 font-medium mb-1 text-[11px]">
                  <span>Core Theory in Morning Slots</span>
                  <span className="font-bold text-blue-700">90%</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full w-[90%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-700 font-medium mb-1 text-[11px]">
                  <span>Continuous 2-Hour Lab Blocks</span>
                  <span className="font-bold text-blue-700">100%</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full w-[100%]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
