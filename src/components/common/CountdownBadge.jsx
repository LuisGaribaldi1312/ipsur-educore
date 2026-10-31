import React from 'react';
import { getDeadlineStatus, formatDateTime } from '../../utils/dateFormatter';
import { Clock, AlertTriangle, CheckCircle, Lock } from 'lucide-react';

export default function CountdownBadge({ dueDate, showDate = true, size = 'md' }) {
  const status = getDeadlineStatus(dueDate);

  const sizeClasses = size === 'sm' 
    ? 'text-xs px-2 py-0.5' 
    : 'text-xs md:text-sm px-2.5 py-1';

  return (
    <div className="flex flex-col gap-1">
      <div className={`inline-flex items-center gap-1.5 rounded-full font-medium border ${status.bgClass} ${sizeClasses} shadow-sm w-fit`}>
        {status.isClosed ? (
          <Lock className="w-3.5 h-3.5 text-rose-600 flex-shrink-0 animate-pulse" />
        ) : status.status === 'urgent' ? (
          <AlertTriangle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 animate-bounce" />
        ) : (
          <Clock className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
        )}
        <span className="font-semibold">{status.label}</span>
      </div>
      {showDate && dueDate && (
        <span className="text-[11px] text-slate-500 flex items-center gap-1 pl-1">
          Límite: <strong className="text-slate-700">{formatDateTime(dueDate)}</strong>
        </span>
      )}
    </div>
  );
}
