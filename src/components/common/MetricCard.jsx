import React from 'react';

export default function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  color = 'blue',
  onClick,
}) {
  const colorStyles = {
    blue: {
      gradient: 'from-blue-600 to-blue-700',
      text: 'text-blue-700',
      badge: 'bg-blue-50 text-blue-800 border-blue-200',
    },
    emerald: {
      gradient: 'from-emerald-600 to-teal-700',
      text: 'text-emerald-700',
      badge: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    },
    amber: {
      gradient: 'from-amber-500 to-amber-600',
      text: 'text-amber-700',
      badge: 'bg-amber-50 text-amber-800 border-amber-200',
    },
    purple: {
      gradient: 'from-purple-600 to-indigo-700',
      text: 'text-purple-700',
      badge: 'bg-purple-50 text-purple-800 border-purple-200',
    },
    rose: {
      gradient: 'from-rose-600 to-red-700',
      text: 'text-rose-700',
      badge: 'bg-rose-50 text-rose-800 border-rose-200',
    },
  };

  const style = colorStyles[color] || colorStyles.blue;

  return (
    <div
      onClick={onClick}
      className={`clay-card p-3.5 flex flex-col justify-between h-[112px] transition-all select-none ${
        onClick ? 'cursor-pointer' : ''
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider leading-none">{title}</p>
          <h3 className="text-2xl font-extrabold text-slate-900 mt-1.5 tracking-tight leading-none">{value}</h3>
        </div>
        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${style.gradient} flex items-center justify-center text-white shadow-sm shrink-0`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>
      
      <div className="flex items-center justify-between text-[11px] border-t border-slate-100/90 pt-1.5 font-medium leading-none">
        {subtitle && <span className="text-slate-500 truncate max-w-[130px]">{subtitle}</span>}
        {trend && (
          <span className={`font-bold ${trend.positive ? 'text-emerald-600' : 'text-slate-500'}`}>
            {trend.text}
          </span>
        )}
      </div>
    </div>
  );
}
