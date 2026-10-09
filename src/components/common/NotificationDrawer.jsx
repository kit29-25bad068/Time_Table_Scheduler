import React from 'react';
import { 
  X, 
  Bell, 
  CheckCircle2, 
  AlertTriangle, 
  Calendar, 
  UserCheck, 
  Info,
  Trash2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function NotificationDrawer({ isOpen, onClose }) {
  const { 
    notifications, 
    markNotificationRead, 
    clearAllNotifications 
  } = useApp();

  if (!isOpen) return null;

  const getIcon = (type) => {
    switch (type) {
      case 'publish':
        return <Calendar className="w-4 h-4 text-emerald-600" />;
      case 'substitution':
        return <UserCheck className="w-4 h-4 text-purple-600" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-amber-600" />;
      case 'success':
        return <CheckCircle2 className="w-4 h-4 text-blue-600" />;
      default:
        return <Info className="w-4 h-4 text-slate-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden no-print">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-sm bg-white shadow-modal border-l border-slate-200 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
            <div className="flex items-center space-x-2">
              <Bell className="w-4 h-4 text-slate-700" />
              <h2 className="text-sm font-bold text-slate-900">Notifications & Alerts</h2>
              {notifications.filter(n => n.unread).length > 0 && (
                <span className="text-[10px] bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-bold border border-red-200">
                  {notifications.filter(n => n.unread).length} New
                </span>
              )}
            </div>
            <div className="flex items-center space-x-1">
              {notifications.length > 0 && (
                <button
                  onClick={clearAllNotifications}
                  title="Clear all notifications"
                  className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                onClick={onClose}
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {notifications.length === 0 ? (
              <div className="text-center py-12 text-slate-400">
                <Bell className="w-8 h-8 mx-auto mb-2 opacity-40" />
                <p className="text-xs">No active notifications</p>
              </div>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  onClick={() => markNotificationRead(n.id)}
                  className={`p-3 rounded-lg border text-xs transition-all cursor-pointer ${
                    n.unread
                      ? 'bg-blue-50/40 border-blue-200 shadow-sm'
                      : 'bg-white border-slate-200 opacity-80'
                  }`}
                >
                  <div className="flex items-start space-x-2.5">
                    <div className="p-1.5 rounded-md bg-white border border-slate-200 shrink-0 mt-0.5">
                      {getIcon(n.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-slate-900">{n.title}</h4>
                        <span className="text-[10px] text-slate-400">{n.timestamp}</span>
                      </div>
                      <p className="text-slate-600 mt-1 leading-relaxed">{n.message}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
