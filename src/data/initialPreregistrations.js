// Initial Seed Pre-registrations for Prepa IPSUR and IUPS Universidad
// Solicitudes oficiales para seguimiento de Coordinación, Dirección y Rectoría

export const INITIAL_PREREGISTRATIONS = [
  {
    id: 'prereg-001',
    folio: 'FOL-IPS-2026-4891',
    level: 'prepa',
    levelTitle: 'Prepa en Línea IPSUR',
    institution: 'Instituto Peninsular del Sur',
    status: 'En Revisión', // 'Pendiente' | 'En Revisión' | 'Documentación Completa' | 'Inscrito' | 'Rechazado'
    date: '24 de noviembre de 2026',
    time: '14:25',
    createdAt: '2026-11-24T14:25:00.000Z',
    formData: {
      studentName: 'Mateo Alejandro Canché Pech',
      curp: 'CAPM080415HQRNTE03',
      studentPhone: '+52 (984) 125-4321',
      studentEmail: 'mateo.canche@gmail.com',
      birthDate: '2008-04-15',
      program: 'Bachillerato en Comunicación',
      modality: 'Modalidad Modular (1 día/semana)',
      street: 'Calle 34 Nte entre 15 y 20, Col. Gonzalo Guerrero',
      colonia: 'Gonzalo Guerrero',
      postalCode: '77710',
      city: 'Playa del Carmen',
      tutorName: 'Rosa María Pech Gómez',
      tutorPhone: '+52 (984) 876-5432',
      tutorEmail: 'rosapech@hotmail.com',
      tutorRelationship: 'Madre / Padre'
    },
    uploadedDocs: [
      {
        docId: 'comprobante_domicilio',
        label: 'Comprobante de Domicilio',
        name: 'comprobante_cfe_nov.jpg',
        originalSize: 3145728,
        compressedSize: 184320,
        uploadedAt: '14:24',
        status: 'Aprobado',
        dataUrl: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=800&auto=format&fit=crop&q=80'
      },
      {
        docId: 'acta_nacimiento',
        label: 'Acta de Nacimiento',
        name: 'acta_nacimiento_mateo.jpg',
        originalSize: 4194304,
        compressedSize: 225280,
        uploadedAt: '14:25',
        status: 'Aprobado',
        dataUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&auto=format&fit=crop&q=80'
      },
      {
        docId: 'curp_alumno',
        label: 'CURP del Alumno',
        name: 'curp_oficial_renapo.jpg',
        originalSize: 1536000,
        compressedSize: 153600,
        uploadedAt: '14:25',
        status: 'Aprobado',
        dataUrl: 'https://images.unsplash.com/photo-1618042164219-62c820f10723?w=800&auto=format&fit=crop&q=80'
      },
      {
        docId: 'ine_tutor',
        label: 'INE del Tutor',
        name: 'ine_frente_vuelta.jpg',
        originalSize: 2621440,
        compressedSize: 163840,
        uploadedAt: '14:25',
        status: 'Pendiente de cotejo',
        dataUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&auto=format&fit=crop&q=80'
      }
    ],
    hasUploadedDocs: true,
    notes: 'Aspirante interesado en producción audiovisual. Asistirá al plantel el viernes a las 11:00 hrs para cotejo físico de originales.',
    reviewedBy: 'Mtro. Roberto Morales Vega (Coordinación)',
    enrolledStudentId: null
  },
  {
    id: 'prereg-002',
    folio: 'FOL-IUPS-2026-7312',
    level: 'universidad',
    levelTitle: 'IUPS Universidad en Línea',
    institution: 'Instituto Universitario Peninsular del Sur',
    status: 'Documentación Completa',
    date: '24 de noviembre de 2026',
    time: '16:10',
    createdAt: '2026-11-24T16:10:00.000Z',
    formData: {
      studentName: 'Mariana Valdez Alcocer',
      curp: 'VAAM970821MQRLL05',
      studentPhone: '+52 (984) 198-7766',
      studentEmail: 'mariana.valdez@hotelriviera.com',
      birthDate: '1997-08-21',
      program: 'Licenciatura en Administración de Empresas',
      modality: 'Modalidad Ejecutiva Sabatina',
      street: 'Av. CTM Mza 12 Lote 4',
      colonia: 'Zazil-Ha',
      postalCode: '77720',
      city: 'Playa del Carmen'
    },
    uploadedDocs: [
      {
        docId: 'comprobante_domicilio',
        label: 'Comprobante de Domicilio',
        name: 'recibo_aguakan_oct.jpg',
        originalSize: 2097152,
        compressedSize: 143360,
        uploadedAt: '16:08',
        status: 'Aprobado',
        dataUrl: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=800&auto=format&fit=crop&q=80'
      },
      {
        docId: 'curp_alumno',
        label: 'CURP Actualizada',
        name: 'curp_mariana.jpg',
        originalSize: 1200000,
        compressedSize: 120000,
        uploadedAt: '16:09',
        status: 'Aprobado',
        dataUrl: 'https://images.unsplash.com/photo-1618042164219-62c820f10723?w=800&auto=format&fit=crop&q=80'
      },
      {
        docId: 'ine_alumno',
        label: 'INE de la Aspirante',
        name: 'ine_mariana_2026.jpg',
        originalSize: 3450000,
        compressedSize: 198000,
        uploadedAt: '16:10',
        status: 'Aprobado',
        dataUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&auto=format&fit=crop&q=80'
      },
      {
        docId: 'certificado_previo',
        label: 'Certificado de Bachillerato',
        name: 'certificado_prepa_cbta.jpg',
        originalSize: 3900000,
        compressedSize: 240000,
        uploadedAt: '16:10',
        status: 'Aprobado',
        dataUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&auto=format&fit=crop&q=80'
      }
    ],
    hasUploadedDocs: true,
    notes: 'Documentación digital 100% cotejada y válida ante DGESU SEP. Lista para emisión de matrícula de licenciatura.',
    reviewedBy: 'Dra. Carmen Salinas Méndez (Dirección)',
    enrolledStudentId: null
  },
  {
    id: 'prereg-003',
    folio: 'FOL-IPS-2026-1054',
    level: 'prepa',
    levelTitle: 'Prepa en Línea IPSUR',
    institution: 'Instituto Peninsular del Sur',
    status: 'Pendiente',
    date: '25 de noviembre de 2026',
    time: '09:15',
    createdAt: '2026-11-25T09:15:00.000Z',
    formData: {
      studentName: 'Emiliano Ruiz Poot',
      curp: 'RUPE090110HQRNS02',
      studentPhone: '+52 (984) 233-4455',
      studentEmail: 'emiliano.poot@gmail.com',
      birthDate: '2009-01-10',
      program: 'Bachillerato en Dibujo Arquitectónico',
      modality: 'Prepa 100% en Línea',
      street: 'Av. Juárez Esq. Calle 45 Norte',
      colonia: 'Col. Ejidal',
      postalCode: '77712',
      city: 'Playa del Carmen',
      tutorName: 'Javier Ruiz Dzib',
      tutorPhone: '+52 (984) 555-1234',
      tutorEmail: 'javier.ruiz@hotmail.com',
      tutorRelationship: 'Madre / Padre'
    },
    uploadedDocs: [],
    hasUploadedDocs: false,
    notes: 'El tutor solicitó presentar la documentación físicamente en las oficinas del centro de Playa del Carmen.',
    reviewedBy: null,
    enrolledStudentId: null
  },
  {
    id: 'prereg-004',
    folio: 'FOL-IUPS-2026-9240',
    level: 'universidad',
    levelTitle: 'IUPS Universidad en Línea',
    institution: 'Instituto Universitario Peninsular del Sur',
    status: 'En Revisión',
    date: '25 de noviembre de 2026',
    time: '10:05',
    createdAt: '2026-11-25T10:05:00.000Z',
    formData: {
      studentName: 'Ing. Carlos Eduardo Méndez Tun',
      curp: 'METC940512HQRNR01',
      studentPhone: '+52 (984) 345-6789',
      studentEmail: 'carlos.tun@constructora.com',
      birthDate: '1994-05-12',
      program: 'Ingeniería Civil',
      modality: 'Modalidad Ejecutiva Sabatina',
      street: 'Calle 10 Norte con Av. 35',
      colonia: 'Centro',
      postalCode: '77710',
      city: 'Playa del Carmen'
    },
    uploadedDocs: [
      {
        docId: 'comprobante_domicilio',
        label: 'Comprobante de Domicilio',
        name: 'cfe_noviembre.jpg',
        originalSize: 2200000,
        compressedSize: 160000,
        uploadedAt: '10:03',
        status: 'Aprobado',
        dataUrl: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=800&auto=format&fit=crop&q=80'
      },
      {
        docId: 'ine_alumno',
        label: 'INE del Aspirante',
        name: 'ine_carlos_tun.jpg',
        originalSize: 2800000,
        compressedSize: 180000,
        uploadedAt: '10:04',
        status: 'Aprobado',
        dataUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&auto=format&fit=crop&q=80'
      }
    ],
    hasUploadedDocs: true,
    notes: 'Aspirante a revalidación de materias previas para Ingeniería Civil. Se agendó asesoría con Rectoría.',
    reviewedBy: 'Mtro. Roberto Morales Vega (Coordinación)',
    enrolledStudentId: null
  }
];
