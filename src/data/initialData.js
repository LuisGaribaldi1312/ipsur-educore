// Initial Seed Data for IPSUR Manager School
// Instituto Peninsular del Sur - Bachillerato en Línea y Campus Digital

export const DEFAULT_ROLE_PERMISSIONS = {
  superadmin: {
    scope: 'global',
    scopeLabel: 'Institucional Total (100%)',
    canManageUsers: true,
    canManageStudents: true,
    canManageTeachers: true,
    canEnrollStudents: true,
    canCreateClassrooms: true,
    canDeleteClassrooms: true,
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
    canManageStudents: true,
    canManageTeachers: true,
    canEnrollStudents: true,
    canCreateClassrooms: true,
    canDeleteClassrooms: true,
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
    canManageStudents: true,
    canManageTeachers: true,
    canEnrollStudents: true,
    canCreateClassrooms: true,
    canDeleteClassrooms: true,
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
    canManageStudents: true,
    canManageTeachers: false,
    canEnrollStudents: true,
    canCreateClassrooms: true,
    canDeleteClassrooms: true,
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
    canManageStudents: false,
    canManageTeachers: false,
    canEnrollStudents: false,
    canCreateClassrooms: false,
    canDeleteClassrooms: false,
    canManageAccounting: false, // Bloqueado: Sin acceso a contabilidad ni caja
    canViewFinances: false,      // Bloqueado: Sin acceso a ingresos ni colegiaturas
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
    canManageStudents: false,
    canManageTeachers: false,
    canEnrollStudents: false,
    canCreateClassrooms: false,
    canDeleteClassrooms: false,
    canManageAccounting: false, // Bloqueado: Sin acceso a contabilidad institucional
    canViewFinances: false,      // Bloqueado: Solo visualiza sus propios pagos
    canGrade: false,
    canScheduleLive: false,
    canPublishAnnouncements: false,
    canViewBoletas: true,
    canManageCalendar: false,
    canExportReports: false
  }
};

export const USERS = [
  // 1. GOBIERNO INSTITUCIONAL (Acceso a Ambos Portales: Prepa + Universidad)
  {
    id: 'usr-superadmin',
    name: 'Luis Alberto Garibaldi Lecïwr',
    email: 'superadmin@ipsur.edu.mx',
    password: 'ipsurSuperAdmin2026*',
    role: 'superadmin',
    isSuperAdmin: true,
    level: 'both', // Rector / Superadmin tiene acceso pleno a Prepa y Universidad
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
  },
  {
    id: 'usr-director',
    name: 'Dra. Carmen Salinas Méndez',
    email: 'director@ipsur.edu.mx',
    password: 'ipsurDirector2026*',
    role: 'director',
    isSuperAdmin: false,
    level: 'both', // Directora tiene acceso a Prepa y Universidad
    hidden: false,
    title: 'Directora General Institucional',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    matricula: 'IPS-DIR-002',
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
    id: 'usr-coordinator',
    name: 'Mtro. Roberto Morales Vega',
    email: 'coordinacion@ipsur.edu.mx',
    password: 'ipsurCoordinador2026*',
    role: 'coordinator',
    isSuperAdmin: false,
    level: 'both', // Coordinador tiene acceso a Prepa y Universidad
    hidden: false,
    title: 'Coordinador Académico General',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
    matricula: 'IPS-COORD-003',
    phone: '+52 (998) 845-2102',
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

  // 2. COMUNIDAD PREPA EN LÍNEA IPSUR (Exclusivo Portal Prepa)
  {
    id: 'usr-teacher-prepa',
    name: 'Profra. Patricia Herrera Domínguez',
    email: 'docente.prepa@ipsur.edu.mx',
    password: 'ipsurDocente2026*',
    role: 'teacher',
    isSuperAdmin: false,
    level: 'prepa', // Solo puede ingresar a Prepa en Línea IPSUR
    hidden: false,
    title: 'Docente Titular de Bachillerato',
    specialty: 'Ciencias Exactas y Experimentales',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    matricula: 'IPS-DOC-101',
    phone: '+52 (998) 845-2110',
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
    id: 'usr-student-prepa',
    name: 'Carlos Mendoza Ruiz',
    email: 'alumno.prepa@ipsur.edu.mx',
    password: 'ipsurAlumno2026*',
    role: 'student',
    isSuperAdmin: false,
    level: 'prepa', // Solo puede ingresar a Prepa en Línea IPSUR
    hidden: false,
    title: 'Estudiante de Bachillerato General en Línea',
    specialty: 'Bachillerato General SEP',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    matricula: 'IPS-PREPA-2026',
    phone: '+52 (998) 845-2120',
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
  },

  // 3. COMUNIDAD UNIVERSIDAD EN LÍNEA (Exclusivo Portal Universidad)
  {
    id: 'usr-teacher-univ',
    name: 'Dr. Alejandro Navarrete Valdés',
    email: 'docente.universidad@ipsur.edu.mx',
    password: 'univDocente2026*',
    role: 'teacher',
    isSuperAdmin: false,
    level: 'universidad', // Solo puede ingresar a Universidad en Línea
    hidden: false,
    title: 'Catedrático Titular Universitario',
    specialty: 'Administración, Negocios y Tecnologías Digitales',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    matricula: 'UNI-DOC-201',
    phone: '+52 (998) 845-2130',
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
    id: 'usr-student-univ',
    name: 'Valeria Gómez Cruz',
    email: 'alumno.universidad@ipsur.edu.mx',
    password: 'univAlumno2026*',
    role: 'student',
    isSuperAdmin: false,
    level: 'universidad', // Solo puede ingresar a Universidad en Línea
    hidden: false,
    title: 'Estudiante Universitario · Licenciatura en Línea',
    specialty: 'Licenciatura en Innovación Educativa y Gestión Digital',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    matricula: 'UNI-2026-101',
    phone: '+52 (998) 845-2140',
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

export const PORTAL_CONFIG = {
  prepa: {
    id: 'prepa',
    portalName: 'Portal Prepa en Línea IPSUR',
    portalTitle: 'Portal Prepa IPSUR',
    shortName: 'Prepa en Línea IPSUR',
    acronym: 'IPSUR',
    institutionName: 'Instituto Peninsular del Sur',
    systemName: 'IPSUR EDUCORE',
    levelLabel: 'Bachillerato General & Especialidades Técnicas',
    subTitle: 'Nivel Medio Superior · Bachillerato Cuatrimestral Oficial SEP',
    slogan: 'La educación es el camino · Excelencia académica con sentido humano',
    primaryColor: '#E6007E',
    badgeText: 'Prepa en Línea IPSUR',
    rvoe: 'RVOE-SEP-DGB-2024-09882',
    accentColor: 'ipsur-pink',
    location: 'Calle 6 entre 20 y 25, Col. Centro, Playa del Carmen, Q. Roo, C.P. 77710',
    phone: '+52 (984) 121-0233',
    whatsapp: '529843238984',
    email: 'admisiones@ipsur.com.mx'
  },
  universidad: {
    id: 'universidad',
    portalName: 'Portal IUPS Universidad en Línea',
    portalTitle: 'Portal IUPS · Universidad',
    shortName: 'IUPS Universidad en Línea',
    acronym: 'IUPS',
    institutionName: 'Instituto Universitario Peninsular del Sur',
    systemName: 'IUPS EDUCORE · CAMPUS UNIVERSITARIO',
    levelLabel: 'Educación Superior · Licenciaturas, Ingenierías y Maestrías',
    subTitle: 'Nivel Superior · Campus Digital Universitario Oficial SEP',
    slogan: 'Ciencia con Valores · Formamos Líderes para el Futuro',
    primaryColor: '#0284C7',
    badgeText: 'IUPS Universidad',
    rvoe: 'RVOE-SEP-DGESU-FEDERAL',
    accentColor: 'sky',
    location: 'Calle 6 Norte con Ave. 25, Col. Centro, Playa del Carmen, Q. Roo, C.P. 77712',
    phone: '+52 (984) 362-3473',
    whatsapp: '529843623473',
    email: 'admisiones@ipsur.com.mx'
  }
};

export const INSTITUTIONAL_INFO = {
  name: 'IPSUR EDUCORE',
  tagline: 'ACADEMIC MANAGEMENT SYSTEM',
  slogan: 'Toda tu institución. Un solo sistema.',
  subSlogan: 'Gestión académica · Administración · Control escolar · Tecnología.',
  schoolName: 'Instituto Peninsular del Sur',
  schoolMotto: 'La educación es el camino',
  campus: 'Campus Virtual Peninsular / Bachillerato en Línea',
  rvoe: 'RVOE-SEP-DGB-2024-09882',
  version: 'v1.0.0',
  supportEmail: 'soporte.educore@ipsur.edu.mx',
  phone: '+52 (998) 845-2100',
  logoUrl: '/ipsur-logo.png'
};

// Zero demo data: Everything clean, ready for live data capture
export const SAMPLE_ACTIVITIES = [];
export const SAMPLE_NOTIFICATIONS = [];
export const SAMPLE_PROCEDURES = [];
export const SAMPLE_PAYMENTS = [];
export const ACADEMIC_STATS = {
  period: 'Ciclo Activo',
  metrics: []
};
