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
  },
  {
    id: 'usr-director-1',
    name: 'Director General IPSUR',
    email: 'director@ipsur.edu.mx',
    password: 'directorIpsur2026*',
    role: 'director',
    isSuperAdmin: false,
    hidden: false,
    title: 'Dirección General Institucional',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
    matricula: 'IPS-DIR-001',
    phone: '+52 (998) 845-2101',
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
  },
  {
    id: 'usr-coord-1',
    name: 'Mtro. Carlos Mendoza Silva',
    email: 'coordinacion@ipsur.edu.mx',
    password: 'coordinadorIpsur2026*',
    role: 'coordinator',
    isSuperAdmin: false,
    hidden: false,
    title: 'Coordinador de Servicios Escolares y Académicos',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    matricula: 'IPS-COORD-001',
    phone: '+52 (998) 845-2102',
    shift: 'En Línea',
    specialty: 'Gestión y Control Escolar',
    createdAt: '2026-01-01T00:00:00Z',
    status: 'active',
    scope: 'academic',
    permissions: {
      canManageUsers: false,
      canCreateClassrooms: true,
      canGrade: false,
      canScheduleLive: true,
      canPublishAnnouncements: true,
      canViewBoletas: true,
      canManageCalendar: true,
      canExportReports: true
    }
  },
  {
    id: 'usr-teacher-1',
    name: 'Mtra. Sofia Villarreal Montes',
    email: 'maestro@ipsur.edu.mx',
    password: 'docenteIpsur2026*',
    role: 'teacher',
    isSuperAdmin: false,
    hidden: false,
    title: 'Docente Titular de Bachillerato Virtual',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    matricula: 'IPS-DOC-001',
    phone: '+52 (998) 845-2103',
    shift: 'En Línea',
    specialty: 'Ciencias Experimentales y Matemáticas',
    createdAt: '2026-01-01T00:00:00Z',
    status: 'active',
    scope: 'assigned',
    permissions: {
      canManageUsers: false,
      canCreateClassrooms: false,
      canGrade: true,
      canScheduleLive: true,
      canPublishAnnouncements: false,
      canViewBoletas: false,
      canManageCalendar: false,
      canExportReports: true
    }
  },
  {
    id: 'usr-student-1',
    name: 'Luis Fernando Morales Aguilar',
    email: 'alumno@ipsur.edu.mx',
    password: 'alumnoIpsur2026*',
    role: 'student',
    isSuperAdmin: false,
    hidden: false,
    title: 'Estudiante de Bachillerato en Línea',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    matricula: 'IPS-ALU-2026-001',
    phone: '+52 (998) 845-2104',
    shift: 'En Línea',
    specialty: 'Bachillerato General',
    createdAt: '2026-01-01T00:00:00Z',
    status: 'active',
    scope: 'personal',
    permissions: {
      canManageUsers: false,
      canCreateClassrooms: false,
      canGrade: false,
      canScheduleLive: false,
      canPublishAnnouncements: false,
      canViewBoletas: true,
      canManageCalendar: false,
      canExportReports: false
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
