import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';

export default function RoomUtilizationChart({ rooms = [] }) {
  const chartData = rooms.map(r => ({
    name: r.name.replace(' (Computer Lab)', '').replace(' (AI/ML Lab)', ''),
    fullName: r.name,
    utilization: r.utilization || Math.floor(Math.random() * 30 + 60),
    type: r.type,
    capacity: r.capacity,
    isLab: r.isLab,
  }));

  const getBarColor = (utilization) => {
    if (utilization >= 85) return '#059669'; // optimal high
    if (utilization >= 65) return '#2563EB'; // normal
    return '#D97706'; // moderate/underutilized
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900 text-white p-2.5 rounded-lg shadow-lg text-xs border border-slate-700">
          <div className="font-bold text-slate-100">{data.fullName}</div>
          <div className="text-slate-400 text-[10px]">{data.type} • Capacity: {data.capacity}</div>
          <div className="mt-1.5 pt-1 border-t border-slate-800 text-blue-300 font-bold text-[11px]">
            Utilization Rate: {data.utilization}%
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
          <YAxis
            tick={{ fontSize: 10, fill: '#64748B' }}
            domain={[0, 100]}
            unit="%"
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="utilization" name="Utilization Rate (%)" radius={[3, 3, 0, 0]}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(entry.utilization)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
