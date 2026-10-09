import React from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  const typeConfig = {
    success: {
      bg: 'bg-emerald-900 text-white border-emerald-700',
      icon: CheckCircle2,
      iconColor: 'text-emerald-400',
    },
    error: {
      bg: 'bg-red-900 text-white border-red-700',
      icon: AlertCircle,
      iconColor: 'text-red-400',
    },
    warning: {
      bg: 'bg-amber-900 text-white border-amber-700',
      icon: AlertTriangle,
      iconColor: 'text-amber-400',
    },
    info: {
      bg: 'bg-slate-900 text-white border-slate-700',
      icon: Info,
      iconColor: 'text-blue-400',
    },
  };

  const config = typeConfig[toast.type] || typeConfig.info;
  const Icon = config.icon;

  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-md animate-fade-in no-print">
      <div className={`flex items-start space-x-3 px-4 py-3 rounded-lg shadow-modal border ${config.bg}`}>
        <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${config.iconColor}`} />
        <div className="text-xs font-medium leading-snug flex-1">
          {toast.message}
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-0.5 rounded transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
