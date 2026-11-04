// Initial Seed Data for IPSUR Manager School
// Instituto Peninsular del Sur - Bachillerato en Línea y Campus Digital

export const DEFAULT_ROLE_PERMISSIONS = {
  superadmin: {
    scope: 'global',
    scopeLabel: 'Institucional Total (100%)',
    canManageUsers: true,
    canCreateClassrooms: true,
    canGrade: true,
    canScheduleLive: true,
    canPublishAnnouncements: true,
    canViewBoletas: true,
    canManageCalendar: true,
    canExportReports: true
  },
  rector: {
    scope: 'global',
    scopeLabel: 'Rectoría General (100%)',
    canManageUsers: true,
    canCreateClassrooms: true,
    canGrade: true,
    canScheduleLive: true,
    canPublishAnnouncements: true,
    canViewBoletas: true,
    canManageCalendar: true,
    canExportReports: true
  },
  director: {
    scope: 'global',
    scopeLabel: 'Dirección General (100%)',
    canManageUsers: true,
    canCreateClassrooms: true,
    canGrade: true,
    canScheduleLive: true,
    canPublishAnnouncements: true,
    canViewBoletas: true,
    canManageCalendar: true,
    canExportReports: true
  },
  coordinator: {
    scope: 'academic',
    scopeLabel: 'Supervisión Académica',
    canManageUsers: false,
    canCreateClassrooms: true,
    canGrade: false,
    canScheduleLive: true,
    canPublishAnnouncements: true,
    canViewBoletas: true,
    canManageCalendar: true,
    canExportReports: true
  },
  teacher: {
    scope: 'assigned',
    scopeLabel: 'Materias Asignadas',
    canManageUsers: false,
    canCreateClassrooms: false,
    canGrade: true,
    canScheduleLive: true,
    canPublishAnnouncements: false,
    canViewBoletas: false,
    canManageCalendar: false,
    canExportReports: true
  },
  student: {
    scope: 'personal',
    scopeLabel: 'Expediente Personal',
    canManageUsers: false,
    canCreateClassrooms: false,
    canGrade: false,
    canScheduleLive: false,
    canPublishAnnouncements: false,
    canViewBoletas: true,
    canManageCalendar: false,
    canExportReports: false
  }
};

export const USERS = [
  {
    id: 'usr-superadmin',
    name: 'Luis Alberto Garibaldi Lecïwr',
    email: 'superadmin@ipsur.edu.mx',
    password: 'ipsurSuperAdmin2026*',
    role: 'superadmin',
    isSuperAdmin: true,
    hidden: true, // STRICT SECURITY: Oculto para todos los demás roles
    title: 'Rector & Super Administrador',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    matricula: 'IPS-RECT-001',
    phone: '+52 (998) 845-2100',
    createdAt: '2026-01-01T00:00:00Z',
    status: 'active',
    scope: 'global',
    permissions: {
      canManageUsers: true,
      canCreateClassrooms: true,
      canGrade: true,
      canScheduleLive: true,
      canPublishAnnouncements: true,
      canViewBoletas: true,
      canManageCalendar: true,
      canExportReports: true
    }
  }
];

export const PERIODS = [
  { id: 'per-2026-b1', name: '1er Bimestre 2026', type: 'Bimestre', status: 'Activo', startDate: '2026-10-01', endDate: '2026-11-30' },
  { id: 'per-2026-b2', name: '2do Bimestre 2026', type: 'Bimestre', status: 'Próximo', startDate: '2026-12-01', endDate: '2027-01-31' },
  { id: 'per-2026-c1', name: '1er Cuatrimestre 2026', type: 'Cuatrimestre', status: 'Activo', startDate: '2026-09-01', endDate: '2026-12-20' },
];

// Zero demo data: Starts clean and empty as requested
export const INITIAL_CLASSROOMS = [];

export const INSTITUTIONAL_INFO = {
  name: 'IPSUR Manager School',
  tagline: 'Innovación Educativa para un Mejor Futuro',
  slogan: 'Toda tu institución. Un solo sistema.',
  subSlogan: 'Gestiona, organiza y fortalece tu comunidad educativa de forma simple y segura.',
  schoolName: 'Instituto Peninsular del Sur',
  schoolMotto: 'La educación es el camino',
  campus: 'Campus Virtual Peninsular / Bachillerato en Línea',
  rvoe: 'RVOE-SEP-DGB-2024-09882',
  version: 'v1.0.0',
  supportEmail: 'soporte.educore@ipsur.edu.mx',
  phone: '+52 (998) 845-2100',
  logoUrl: '/ipsur-logo.png'
};

// Recent Activities Stream matching official Manager School dashboard
export const SAMPLE_ACTIVITIES = [
  {
    id: 'act-1',
    type: 'student',
    title: 'Nuevo alumno registrado',
    subtitle: 'María Fernanda López García',
    time: 'Hoy, 16:45 h',
    badge: 'Inscripción',
    color: 'blue'
  },
  {
    id: 'act-2',
    type: 'grades',
    title: 'Calificaciones actualizadas',
    subtitle: 'Grupo 2° B',
    time: 'Hoy, 15:30 h',
    badge: 'Evaluación',
    color: 'sky'
  },
  {
    id: 'act-3',
    type: 'payment',
    title: 'Pago recibido',
    subtitle: 'Colegiatura · Ana Torres Pérez',
    time: 'Hoy, 14:20 h',
    badge: 'Contabilidad',
    color: 'emerald'
  },
  {
    id: 'act-4',
    type: 'document',
    title: 'Documento generado',
    subtitle: 'Constancia de Estudios',
    time: 'Hoy, 13:50 h',
    badge: 'Trámite SEP',
    color: 'purple'
  }
];

// System Notifications matching official Manager School dashboard
export const SAMPLE_NOTIFICATIONS = [
  {
    id: 'notif-1',
    title: 'Recordatorio: Entrega de calificaciones',
    time: 'Hace 1 h',
    status: 'urgent',
    color: 'bg-rose-500',
    description: 'Cierre del primer corte de evaluación bimestral el próximo viernes.'
  },
  {
    id: 'notif-2',
    title: 'Nuevo comunicado institucional',
    time: 'Hace 3 h',
    status: 'info',
    color: 'bg-blue-500',
    description: 'Convocatoria a reunión de academias y consejo técnico escolar.'
  },
  {
    id: 'notif-3',
    title: 'Actualización de horarios',
    time: 'Hace 1 día',
    status: 'success',
    color: 'bg-emerald-500',
    description: 'Ajuste en la programación de sesiones virtuales para grupos vespertinos.'
  }
];

// Academic Statistics comparison dataset matching official bar chart
export const ACADEMIC_STATS = {
  period: 'Último Semestre',
  metrics: [
    { label: 'Inscripciones', previous: 1120, current: 1248, unit: '', max: 1300 },
    { label: 'Asistencias', previous: 92, current: 95, unit: '%', max: 100 },
    { label: 'Aprobados', previous: 88, current: 91, unit: '%', max: 100 },
    { label: 'Reprobados', previous: 12, current: 9, unit: '%', max: 100 }
  ]
};

// Pending Student Procedures
export const SAMPLE_PROCEDURES = [
  { id: 'tram-01', student: 'Carlos Mendoza Ruiz', type: 'Constancia de Estudios con Calificaciones', matricula: 'IPS-2026-081', status: 'Pendiente', date: '03 Nov 2026' },
  { id: 'tram-02', student: 'Valeria Gómez Cruz', type: 'Credencial Institucional Digital', matricula: 'IPS-2026-094', status: 'En Proceso', date: '03 Nov 2026' },
  { id: 'tram-03', student: 'Emiliano Rocha Sánchez', type: 'Revalidación de Asignaturas', matricula: 'IPS-2026-112', status: 'Pendiente', date: '02 Nov 2026' },
  { id: 'tram-04', student: 'Sofía Reyes Villarreal', type: 'Certificado Parcial de Bachillerato', matricula: 'IPS-2026-056', status: 'Aprobado', date: '01 Nov 2026' }
];

// Accounting / Payments List
export const SAMPLE_PAYMENTS = [
  { id: 'pay-101', concept: 'Colegiatura Noviembre 2026', student: 'Ana Torres Pérez', amount: '$2,450.00 MXN', method: 'Transferencia SPEI', status: 'Completado', date: 'Hoy, 14:20 h' },
  { id: 'pay-102', concept: 'Inscripción Ciclo 2026-2027', student: 'Rodrigo Nava Morales', amount: '$3,800.00 MXN', method: 'Tarjeta de Débito', status: 'Completado', date: 'Hoy, 11:15 h' },
  { id: 'pay-103', concept: 'Derecho a Examen Extraordinario', student: 'Jimena Castro Luna', amount: '$650.00 MXN', method: 'Ventanilla Bancaria', status: 'Completado', date: 'Ayer, 16:30 h' }
];
