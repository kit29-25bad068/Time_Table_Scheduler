import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

export default function WorkloadChart({ faculty = [] }) {
  const chartData = faculty.slice(0, 8).map(f => ({
    name: f.name.replace('Dr. ', '').replace('Prof. ', ''),
    fullName: f.name,
    department: f.department,
    assigned: f.assignedHours || 0,
    max: f.maxWeeklyHours || 18,
    free: Math.max(0, (f.maxWeeklyHours || 18) - (f.assignedHours || 0)),
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900 text-white p-2.5 rounded-lg shadow-lg text-xs border border-slate-700">
          <div className="font-bold text-slate-100">{data.fullName}</div>
          <div className="text-slate-400 text-[10px]">{data.department}</div>
          <div className="mt-1.5 space-y-0.5 pt-1 border-t border-slate-800 text-[11px]">
            <div className="text-blue-300 font-medium">Assigned: {data.assigned} hrs / week</div>
            <div className="text-slate-300 font-medium">Max Limit: {data.max} hrs / week</div>
            <div className="text-emerald-300 font-medium">Free Slots: {data.free} hrs</div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-56">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 5, right: 5, left: -25, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 10, fill: '#64748B' }}
            interval={0}
            angle={-15}
            textAnchor="end"
          />
          <YAxis tick={{ fontSize: 10, fill: '#64748B' }} domain={[0, 24]} />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="top"
            wrapperStyle={{ fontSize: '10px', paddingBottom: '8px' }}
          />
          <Bar dataKey="assigned" name="Assigned Hours" fill="#1D4ED8" radius={[3, 3, 0, 0]} />
          <Bar dataKey="max" name="Max Weekly Limit" fill="#CBD5E1" radius={[3, 3, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
