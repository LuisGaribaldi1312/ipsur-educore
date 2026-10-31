// Date & Deadline Helpers for IPSUR EDUCORE

export function formatDateTime(isoString) {
  if (!isoString) return 'Sin fecha';
  try {
    const d = new Date(isoString);
    if (isNaN(d.getTime())) return isoString;
    return d.toLocaleString('es-MX', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  } catch {
    return isoString;
  }
}

export function formatDate(isoString) {
  if (!isoString) return 'Sin fecha';
  try {
    const d = new Date(isoString);
    if (isNaN(d.getTime())) return isoString;
    return d.toLocaleDateString('es-MX', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  } catch {
    return isoString;
  }
}

/**
 * Checks if deadline has expired and returns detailed status
 * @param {string} dueDate - ISO date string
 * @returns {object} status details
 */
export function getDeadlineStatus(dueDate) {
  if (!dueDate) return { isClosed: false, label: 'Sin límite', status: 'none', color: 'gray' };
  
  const now = new Date();
  const due = new Date(dueDate);
  const diffMs = due.getTime() - now.getTime();

  if (diffMs <= 0) {
    return {
      isClosed: true,
      label: 'Apartado Cerrado (Tiempo Vencido)',
      badge: 'Cerrado',
      status: 'closed',
      color: 'red',
      bgClass: 'bg-red-50 text-red-700 border-red-200',
      pillClass: 'bg-rose-600 text-white'
    };
  }

  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);
  const remainingHours = diffHours % 24;

  if (diffHours < 24) {
    return {
      isClosed: false,
      label: `Cierra en ${diffHours}h ${Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))}m`,
      badge: 'Urgente / Cierra hoy',
      status: 'urgent',
      color: 'amber',
      bgClass: 'bg-amber-50 text-amber-800 border-amber-200',
      pillClass: 'bg-amber-500 text-white'
    };
  } else if (diffDays <= 3) {
    return {
      isClosed: false,
      label: `Cierra en ${diffDays}d ${remainingHours}h`,
      badge: `${diffDays} días restantes`,
      status: 'warning',
      color: 'orange',
      bgClass: 'bg-orange-50 text-orange-800 border-orange-200',
      pillClass: 'bg-orange-500 text-white'
    };
  } else {
    return {
      isClosed: false,
      label: `Entrega abierta (${diffDays} días restantes)`,
      badge: 'Abierto',
      status: 'open',
      color: 'emerald',
      bgClass: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      pillClass: 'bg-emerald-600 text-white'
    };
  }
}
