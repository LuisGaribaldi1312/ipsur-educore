// Initial Seed Data for IPSUR EDUCORE
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
  director: {
    scope: 'global',
    scopeLabel: 'Institucional General (100%)',
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
    name: 'Super Administrador IPSUR',
    email: 'superadmin@ipsur.edu.mx',
    password: 'ipsurSuperAdmin2026*',
    role: 'superadmin',
    isSuperAdmin: true,
    hidden: true, // STRICT SECURITY: Oculto para todos los demás roles
    title: 'Control Central y Seguridad de Plataforma',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    matricula: 'IPS-ROOT-001',
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
  name: 'IPSUR EDUCORE',
  tagline: 'ACADEMIC MANAGEMENT SYSTEM',
  slogan: 'Toda tu institución. Un solo sistema.',
  subSlogan: 'Gestión académica · Administración · Control escolar · Tecnología.',
  schoolName: 'Instituto Peninsular del Sur',
  schoolMotto: 'La educación es el camino',
  campus: 'Campus Virtual Peninsular / Bachillerato en Línea',
  rvoe: 'RVOE-SEP-DGB-2024-09882',
  supportEmail: 'soporte.educore@ipsur.edu.mx',
  phone: '+52 (998) 845-2100',
  logoUrl: '/ipsur-logo.png'
};
