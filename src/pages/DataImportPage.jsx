import React, { useState } from 'react';
import {
  Upload,
  Download,
  FileText,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Layers,
  Users,
  DoorOpen,
  BookOpen
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import {
  SAMPLE_FACULTY_CSV,
  SAMPLE_ROOMS_CSV,
  SAMPLE_SUBJECTS_CSV,
  SAMPLE_BATCHES_CSV
} from '../data/sampleCsvData';
import { parseCSV, downloadSampleTemplate } from '../services/csvService';

export default function DataImportPage() {
  const {
    importFacultyData,
    importRoomsData,
    importSubjectsData,
    importBatchesData,
    resetToDemoData,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState('faculty'); // 'faculty' | 'rooms' | 'subjects' | 'batches'
  const [csvContent, setCsvContent] = useState('');
  const [parsedPreview, setParsedPreview] = useState([]);
  const [fileName, setFileName] = useState('');

  const tabs = [
    { id: 'faculty', label: 'Faculty Roster', icon: Users, sample: SAMPLE_FACULTY_CSV, filename: 'faculty_template.csv' },
    { id: 'rooms', label: 'Classrooms & Labs', icon: DoorOpen, sample: SAMPLE_ROOMS_CSV, filename: 'rooms_template.csv' },
    { id: 'subjects', label: 'Curriculum Subjects', icon: BookOpen, sample: SAMPLE_SUBJECTS_CSV, filename: 'subjects_template.csv' },
    { id: 'batches', label: 'Student Batches', icon: Layers, sample: SAMPLE_BATCHES_CSV, filename: 'batches_template.csv' },
  ];

  const currentTabObj = tabs.find(t => t.id === activeTab) || tabs[0];

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      setCsvContent(text);
      const parsed = parseCSV(text);
      setParsedPreview(parsed);
      showToast(`Parsed ${parsed.length} rows from ${file.name}`, 'info');
    };
    reader.readAsText(file);
  };

  const handleDownloadSample = () => {
    downloadSampleTemplate(currentTabObj.sample, currentTabObj.filename);
    showToast(`Downloaded ${currentTabObj.filename}`, 'success');
  };

  const handleApplyImport = () => {
    if (parsedPreview.length === 0) {
      showToast('No valid CSV rows to import. Please upload a CSV file or load sample data.', 'warning');
      return;
    }

    if (activeTab === 'faculty') {
      const formatted = parsedPreview.map((item, idx) => ({
        id: `FAC_IMP_${Date.now()}_${idx}`,
        name: item.name || 'Faculty Member',
        department: item.department || 'AI & DS',
        designation: item.designation || 'Assistant Professor',
        email: item.email || 'faculty@kit.edu',
        phone: item.phone || '+91 98400 00000',
        maxWeeklyHours: Number(item.maxWeeklyHours) || 18,
        assignedHours: 0,
        competencies: typeof item.competencies === 'string' ? item.competencies.split(',').map(s => s.trim()) : ['General'],
        status: 'Active',
      }));
      importFacultyData(formatted);
    } else if (activeTab === 'rooms') {
      const formatted = parsedPreview.map((item, idx) => ({
        id: `R_IMP_${Date.now()}_${idx}`,
        name: item.name || 'Room',
        type: item.type || 'Classroom',
        capacity: Number(item.capacity) || 60,
        building: item.building || 'Academic Block',
        floor: item.floor || '1st Floor',
        isLab: item.isLab === true || item.type?.toLowerCase().includes('lab'),
        utilization: 60,
      }));
      importRoomsData(formatted);
    } else if (activeTab === 'subjects') {
      const formatted = parsedPreview.map((item, idx) => ({
        id: `SUB_IMP_${Date.now()}_${idx}`,
        code: item.code || `SUB${idx}`,
        name: item.name || 'Subject',
        department: item.department || 'AI & DS',
        type: item.type || 'Theory',
        weeklyHours: Number(item.weeklyHours) || 3,
        facultyName: item.facultyName || 'Faculty',
        requiresLab: item.requiresLab === true || item.type === 'Practical',
        labType: item.labType || null,
        semester: item.semester || 'III',
      }));
      importSubjectsData(formatted);
    } else if (activeTab === 'batches') {
      const formatted = parsedPreview.map((item, idx) => ({
        id: `B_IMP_${Date.now()}_${idx}`,
        name: item.name || 'Batch',
        year: Number(item.year) || 2,
        semester: item.semester || 'III',
        section: item.section || 'A',
        department: item.department || 'AI & DS',
        strength: Number(item.strength) || 55,
        preferredRoom: item.preferredRoom || 'Room 101',
      }));
      importBatchesData(formatted);
    }

    setParsedPreview([]);
    setCsvContent('');
    setFileName('');
  };

  const loadSampleIntoPreview = () => {
    setCsvContent(currentTabObj.sample);
    const parsed = parseCSV(currentTabObj.sample);
    setParsedPreview(parsed);
    setFileName(currentTabObj.filename);
    showToast(`Loaded sample template for ${currentTabObj.label}`, 'info');
  };

  return (
    <div className="max-w-[1450px] mx-auto space-y-4 md:space-y-5 animate-fade-in">
      {/* Header */}
      <div className="clay-card p-4 md:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-sm shrink-0">
              <Upload className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 leading-tight">Academic Data Import & Export</h2>
              <p className="text-[11px] text-slate-500">
                Bulk import faculty rosters, classroom capacities, courses, and student batches via CSV
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={resetToDemoData}
          className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold border border-slate-300 transition-colors self-start sm:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset All to Default SIH Data</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200/90 bg-white/90 rounded-t-xl px-3 pt-1.5 space-x-1.5 shadow-xs">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setParsedPreview([]);
                setCsvContent('');
                setFileName('');
              }}
              className={`flex items-center space-x-2 px-3.5 py-2 text-xs font-bold border-b-2 transition-all ${
                isActive
                  ? 'border-blue-600 text-blue-700 bg-blue-50/50 rounded-t-lg'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Upload Box */}
      <div className="clay-card p-5 rounded-b-xl border-t-0 space-y-4 -mt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-lg bg-slate-50 border border-slate-200">
          <div>
            <h4 className="font-bold text-slate-900 text-xs">Download Standard CSV Template</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Use this formatted CSV template with required column headers for {currentTabObj.label}.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleDownloadSample}
              className="flex items-center space-x-1 px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-bold border border-slate-200 shadow-xs transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-blue-600" />
              <span>Download Sample CSV</span>
            </button>
            <button
              onClick={loadSampleIntoPreview}
              className="flex items-center space-x-1 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-bold border border-blue-200 transition-colors"
            >
              <span>Load Demo Data</span>
            </button>
          </div>
        </div>

        {/* Drag & Drop File Upload Area */}
        <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-blue-500 hover:bg-blue-50/10 transition-all">
          <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Upload {currentTabObj.label} CSV File</h4>
          <p className="text-[11px] text-slate-500 mt-0.5 max-w-sm mx-auto">
            Select a `.csv` file exported from your college ERP or spreadsheet software.
          </p>

          <label className="mt-3 inline-flex items-center space-x-1.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold cursor-pointer transition-all shadow-xs border border-blue-500">
            <FileText className="w-3.5 h-3.5" />
            <span>{fileName ? `Selected: ${fileName}` : 'Choose CSV File'}</span>
            <input
              type="file"
              accept=".csv,text/csv"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>

        {/* Parsed Preview Table */}
        {parsedPreview.length > 0 && (
          <div className="space-y-2.5 animate-fade-in">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Parsed Records Preview ({parsedPreview.length} items)
              </h4>
              <button
                onClick={handleApplyImport}
                className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-all shadow-xs border border-emerald-500"
              >
                Import {parsedPreview.length} Records into System
              </button>
            </div>

            <div className="border border-slate-200 rounded-lg overflow-x-auto max-h-56">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-900 text-white border-b border-slate-800">
                    {Object.keys(parsedPreview[0] || {}).map((header) => (
                      <th key={header} className="p-2 font-semibold capitalize">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {parsedPreview.slice(0, 8).map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 font-mono text-[11px]">
                      {Object.values(row).map((val, cellIdx) => (
                        <td key={cellIdx} className="p-2 text-slate-700 truncate max-w-[160px]">
                          {String(val)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {parsedPreview.length > 8 && (
              <p className="text-[10px] text-slate-400 italic">Showing first 8 of {parsedPreview.length} records</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
