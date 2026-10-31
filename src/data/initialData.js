// Initial Seed Data for IPSUR EDUCORE
// Instituto Peninsular del Sur - Bachillerato en Línea

export const USERS = [
  {
    id: 'usr-coord-1',
    name: 'Mtro. Carlos Mendoza',
    email: 'carlos.mendoza@ipsur.edu.mx',
    role: 'coordinator', // 'coordinator' | 'teacher' | 'student'
    title: 'Coordinador Académico de Prepa en Línea',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    matricula: 'IPS-COORD-01',
    phone: '+52 (998) 845-2100'
  },
  {
    id: 'usr-prof-1',
    name: 'Mtra. Sofía Valenzuela Castro',
    email: 'sofia.valenzuela@ipsur.edu.mx',
    role: 'teacher',
    title: 'Docente Titular de Ciencias Exactas',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    matricula: 'IPS-DOC-104',
    phone: '+52 (998) 723-9011'
  },
  {
    id: 'usr-prof-2',
    name: 'Lic. Roberto Garza Treviño',
    email: 'roberto.garza@ipsur.edu.mx',
    role: 'teacher',
    title: 'Docente Titular de Humanidades y Redacción',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    matricula: 'IPS-DOC-109',
    phone: '+52 (998) 612-4433'
  },
  {
    id: 'usr-prof-3',
    name: 'Dr. Fernando Aguilar Cano',
    email: 'fernando.aguilar@ipsur.edu.mx',
    role: 'teacher',
    title: 'Docente de Ciencias Naturales y Química',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    matricula: 'IPS-DOC-115',
    phone: '+52 (998) 554-1928'
  },
  {
    id: 'usr-stud-1',
    name: 'Mateo Sánchez Domínguez',
    email: 'mateo.sanchez@alumnos.ipsur.edu.mx',
    role: 'student',
    title: 'Estudiante 1er Bimestre - Prepa Virtual',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    matricula: 'IPS-2026-084',
    grupo: 'PREPA-101-ONLINE',
    tutor: 'Lic. Laura Domínguez'
  },
  {
    id: 'usr-stud-2',
    name: 'Valentina Morales Rivas',
    email: 'valentina.morales@alumnos.ipsur.edu.mx',
    role: 'student',
    title: 'Estudiante 1er Bimestre - Prepa Virtual',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    matricula: 'IPS-2026-085',
    grupo: 'PREPA-101-ONLINE',
    tutor: 'Ing. Jorge Morales'
  },
  {
    id: 'usr-stud-3',
    name: 'Santiago Cruz Méndez',
    email: 'santiago.cruz@alumnos.ipsur.edu.mx',
    role: 'student',
    title: 'Estudiante 1er Bimestre - Prepa Virtual',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    matricula: 'IPS-2026-086',
    grupo: 'PREPA-101-ONLINE',
    tutor: 'Dra. Patricia Méndez'
  },
  {
    id: 'usr-stud-4',
    name: 'Camila Herrera Vega',
    email: 'camila.herrera@alumnos.ipsur.edu.mx',
    role: 'student',
    title: 'Estudiante 1er Bimestre - Prepa Virtual',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    matricula: 'IPS-2026-087',
    grupo: 'PREPA-101-ONLINE',
    tutor: 'Mtro. Esteban Herrera'
  },
  {
    id: 'usr-stud-5',
    name: 'Emiliano Torres Ruiz',
    email: 'emiliano.torres@alumnos.ipsur.edu.mx',
    role: 'student',
    title: 'Estudiante 1er Bimestre - Prepa Virtual',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    matricula: 'IPS-2026-088',
    grupo: 'PREPA-101-ONLINE',
    tutor: 'Lic. Claudia Ruiz'
  }
];

export const PERIODS = [
  { id: 'per-2026-b1', name: '1er Bimestre 2026', type: 'Bimestre', status: 'Activo', startDate: '2026-10-01', endDate: '2026-11-30' },
  { id: 'per-2026-b2', name: '2do Bimestre 2026', type: 'Bimestre', status: 'Próximo', startDate: '2026-12-01', endDate: '2027-01-31' },
  { id: 'per-2026-c1', name: '1er Cuatrimestre 2026', type: 'Cuatrimestre', status: 'Activo', startDate: '2026-09-01', endDate: '2026-12-20' },
];

export const INITIAL_CLASSROOMS = [
  {
    id: 'cls-mat-101',
    code: 'MAT-101',
    name: 'Matemáticas I - Álgebra y Pensamiento Lógico',
    group: 'PREPA-101-ONLINE',
    periodId: 'per-2026-b1',
    periodName: '1er Bimestre 2026',
    modality: 'Prepa en Línea',
    color: 'from-blue-700 via-indigo-800 to-ipsur-navy-700',
    bannerGradient: 'bg-gradient-to-r from-ipsur-navy-800 to-indigo-900',
    teacherId: 'usr-prof-1',
    teacherName: 'Mtra. Sofía Valenzuela Castro',
    roomLink: 'https://meet.ipsur.edu.mx/clase-mat-101',
    createdAt: '2026-10-01T08:00:00Z',
    coordinatorNote: 'Sala habilitada oficialmente por Coordinación Académica IPSUR. Rúbrica y temario aprobados por SEP/DGB.',
    
    // Evaluation Criteria configured by teacher (MUST sum to 100)
    criteriaConfigured: true,
    criteria: {
      activities: 40,    // % Actividades o Tareas
      examProject: 30,   // % Examen o Proyecto
      attendance: 15,    // % Asistencia
      participation: 15, // % Participación
    },

    // Rubric & Syllabus loaded by School Coordinator
    rubric: {
      uploadedBy: 'Mtro. Carlos Mendoza (Coordinador Escolar)',
      uploadedAt: '2026-10-02T10:30:00Z',
      periodDuration: 'Bimestre (8 semanas lectivas)',
      generalObjective: 'Desarrollar el razonamiento lógico-matemático mediante el planteamiento y solución de problemas algebraicos aplicables a situaciones de la vida cotidiana y profesional.',
      competencies: [
        'Formula y resuelve problemas matemáticos aplicando diferentes enfoques algebraicos.',
        'Explica e interpreta los resultados obtenidos mediante procedimientos matemáticos y los contrasta con modelos reales.',
        'Analiza las relaciones entre dos o más variables de un proceso social o natural para determinar o estimar su comportamiento.'
      ],
      topics: [
        {
          id: 'top-1',
          unit: 'Unidad I',
          title: 'Números Reales y Aritmética Pre-Algebraica',
          weeks: 'Semanas 1 y 2',
          learningGoals: 'Operaciones con números reales, leyes de signos, razones, proporciones y porcentajes financieros.',
          keyReadings: 'Manual Didáctico IPSUR - Cap. 1: Números y Propiedades.'
        },
        {
          id: 'top-2',
          unit: 'Unidad II',
          title: 'Expresiones Algebraicas, Polinomios y Operaciones',
          weeks: 'Semanas 3 y 4',
          learningGoals: 'Lenguaje algebraico, suma, resta, multiplicación y división de polinomios con una y varias variables.',
          keyReadings: 'Manual Didáctico IPSUR - Cap. 2: Fundamentos del Álgebra.'
        },
        {
          id: 'top-3',
          unit: 'Unidad III',
          title: 'Ecuaciones Lineales y Sistemas de Ecuaciones 2x2',
          weeks: 'Semanas 5 y 6',
          learningGoals: 'Despeje de variables, método de sustitución, igualación y reducción. Aplicación a problemas cotidianos.',
          keyReadings: 'Guía de Métodos de Solución Gráfica y Analítica.'
        },
        {
          id: 'top-4',
          unit: 'Unidad IV',
          title: 'Productos Notables, Factorización y Proyecto Integrador',
          weeks: 'Semanas 7 y 8',
          learningGoals: 'Binomio al cuadrado, conjugados, factorización por término común y trinomio de la forma ax² + bx + c.',
          keyReadings: 'Rúbrica Oficial de Proyecto Final IPSUR.'
        }
      ],
      evaluationNote: 'La ponderación institucional del curso se desglosa en Actividades Continuas, Proyecto/Examen Bimestral, Registro de Asistencia Virtual a sesiones sincrónicas y Participación en foros colaborativos.'
    },

    // Enrolled students in this classroom
    enrolledStudentIds: [
      'usr-stud-1',
      'usr-stud-2',
      'usr-stud-3',
      'usr-stud-4',
      'usr-stud-5'
    ],

    // Materials uploaded by teacher
    materials: [
      {
        id: 'mat-01',
        title: 'Guía Metodológica: Leyes de Exponentes y Polinomios',
        unitId: 'top-2',
        unitTitle: 'Unidad II',
        description: 'Documento en PDF con ejercicios explicados paso a paso para resolver simplificaciones algebraicas.',
        type: 'pdf',
        fileUrl: '#descargar-guia-pdf',
        fileName: 'IPSUR_Mat1_Guia_Exponentes.pdf',
        fileSize: '2.4 MB',
        uploadedAt: '2026-10-08T09:15:00Z',
        author: 'Mtra. Sofía Valenzuela'
      },
      {
        id: 'mat-02',
        title: 'Video Clase Grabada: Métodos de Solución de Ecuaciones 2x2',
        unitId: 'top-3',
        unitTitle: 'Unidad III',
        description: 'Grabación de la sesión sincrónica donde se explican los métodos de suma y resta y sustitución.',
        type: 'video',
        fileUrl: 'https://youtube.com/watch?v=ipsur-mat1-sesion3',
        fileName: 'Sesión_Grabada_Ecuaciones2x2.mp4',
        fileSize: '45 min',
        uploadedAt: '2026-10-15T14:30:00Z',
        author: 'Mtra. Sofía Valenzuela'
      },
      {
        id: 'mat-03',
        title: 'Formulario y Tabla de Productos Notables y Factorización',
        unitId: 'top-4',
        unitTitle: 'Unidad IV',
        description: 'Ficha de referencia rápida descargable para usar en la resolución del proyecto final.',
        type: 'document',
        fileUrl: '#descargar-formulario',
        fileName: 'IPSUR_Formulario_Factorizacion.pdf',
        fileSize: '1.1 MB',
        uploadedAt: '2026-10-22T11:00:00Z',
        author: 'Mtra. Sofía Valenzuela'
      }
    ],

    // Activities created by teacher (locked if criteria not 100%)
    activities: [
      {
        id: 'act-01',
        title: 'Actividad 1: Taller de Expresiones y Operaciones con Polinomios',
        unitId: 'top-2',
        unitTitle: 'Unidad II: Expresiones Algebraicas',
        description: 'Descargar el archivo anexo con los 15 ejercicios de simplificación y multiplicación de polinomios. Desarrollar cada ejercicio en hojas limpias o en procesador de textos con procedimiento completo y subir en formato PDF.',
        maxScore: 100,
        // Past deadline (Already closed)
        dueDate: '2026-10-14T23:59:00',
        createdAt: '2026-10-05T10:00:00Z',
        attachment: 'Taller_Polinomios_Ejercicios.pdf'
      },
      {
        id: 'act-02',
        title: 'Actividad 2: Modelación y Resolución de Sistemas 2x2',
        unitId: 'top-3',
        unitTitle: 'Unidad III: Ecuaciones Lineales',
        description: 'Resolver los 5 problemas de aplicación económica y logística planteados en la guía. Identificar claramente las variables x e y, plantear las dos ecuaciones simultáneas y comprobar los resultados por el método de reducción.',
        maxScore: 100,
        // Past deadline (Closed)
        dueDate: '2026-10-25T23:59:00',
        createdAt: '2026-10-16T12:00:00Z',
        attachment: 'Guia_Problemas_Sistemas2x2.pdf'
      },
      {
        id: 'act-03',
        title: 'Actividad 3: Taller de Factorización y Casos Especiales',
        unitId: 'top-4',
        unitTitle: 'Unidad IV: Factorización',
        description: 'Resolver los 20 ejercicios de factorización por factor común, diferencia de cuadrados y trinomios cuadrados perfectos. Recuerda justificar qué caso de factorización aplicaste en cada problema.',
        maxScore: 100,
        // Active deadline (Open in the near future)
        dueDate: '2026-11-06T23:59:00',
        createdAt: '2026-10-28T09:00:00Z',
        attachment: 'Ejercicios_Factorizacion_Avanzada.pdf'
      },
      {
        id: 'act-04',
        title: 'Examen / Proyecto Bimestral: Aplicación de Modelos Algebraicos',
        unitId: 'top-4',
        unitTitle: 'Unidad IV: Proyecto Integrador',
        description: 'Entrega formal del Proyecto Integrador Bimestral. Presentar informe ejecutivo con portada institucional IPSUR, planteamiento del problema, modelo algebraico, resolución analítica y conclusiones reflexivas.',
        maxScore: 100,
        // Open deadline
        dueDate: '2026-11-18T23:59:00',
        createdAt: '2026-10-29T11:00:00Z',
        attachment: 'Rubrica_Proyecto_Integrador_Bimestral.pdf'
      }
    ],

    // Submissions for activities
    submissions: [
      {
        id: 'sub-01-mateo',
        activityId: 'act-01',
        studentId: 'usr-stud-1',
        studentName: 'Mateo Sánchez Domínguez',
        submittedAt: '2026-10-13T19:40:00',
        fileUrl: '#entrega-mateo-act1.pdf',
        fileName: 'MateoSanchez_Mat1_Act1_Polinomios.pdf',
        notes: 'Envío mi tarea con el procedimiento completo en hojas cuadriculadas escaneadas. Saludos profesora.',
        grade: 95,
        feedback: 'Excelente desarrollo matemático, Mateo. Los procedimientos son claros y ordenados. Solo revisa el signo en el ejercicio 12.',
        gradedAt: '2026-10-15T11:20:00Z',
        gradedBy: 'Mtra. Sofía Valenzuela'
      },
      {
        id: 'sub-02-mateo',
        activityId: 'act-02',
        studentId: 'usr-stud-1',
        studentName: 'Mateo Sánchez Domínguez',
        submittedAt: '2026-10-24T21:15:00',
        fileUrl: '#entrega-mateo-act2.pdf',
        fileName: 'MateoSanchez_Mat1_Act2_Sistemas2x2.pdf',
        notes: 'Profesor, comprobé los resultados con sustitución y todos cuadraron correctamente.',
        grade: 92,
        feedback: 'Muy buen planteamiento de las variables. Trabajo sobresaliente.',
        gradedAt: '2026-10-26T16:45:00Z',
        gradedBy: 'Mtra. Sofía Valenzuela'
      },
      {
        id: 'sub-01-valentina',
        activityId: 'act-01',
        studentId: 'usr-stud-2',
        studentName: 'Valentina Morales Rivas',
        submittedAt: '2026-10-14T18:10:00',
        fileUrl: '#entrega-vale-act1.pdf',
        fileName: 'Valentina_Morales_Act1.pdf',
        notes: 'Entrega puntual de la actividad 1.',
        grade: 98,
        feedback: 'Impecable. Procedimientos y resultados 100% correctos.',
        gradedAt: '2026-10-15T12:00:00Z',
        gradedBy: 'Mtra. Sofía Valenzuela'
      },
      {
        id: 'sub-02-valentina',
        activityId: 'act-02',
        studentId: 'usr-stud-2',
        studentName: 'Valentina Morales Rivas',
        submittedAt: '2026-10-25T17:30:00',
        fileUrl: '#entrega-vale-act2.pdf',
        fileName: 'Valentina_Morales_Act2_Sistemas.pdf',
        notes: 'Envío la resolución de problemas con gráficas adjuntas.',
        grade: 96,
        feedback: 'Excelente incorporación del método gráfico como comprobación adicional.',
        gradedAt: '2026-10-26T17:10:00Z',
        gradedBy: 'Mtra. Sofía Valenzuela'
      },
      {
        id: 'sub-01-santiago',
        activityId: 'act-01',
        studentId: 'usr-stud-3',
        studentName: 'Santiago Cruz Méndez',
        submittedAt: '2026-10-14T23:45:00',
        fileUrl: '#entrega-santi-act1.pdf',
        fileName: 'SantiagoCruz_Actividad1.pdf',
        notes: 'Entregado casi al límite por problemas de conexión.',
        grade: 82,
        feedback: 'Buen esfuerzo Santiago, faltó detallar el paso a paso en los últimos 3 reactivos.',
        gradedAt: '2026-10-15T12:30:00Z',
        gradedBy: 'Mtra. Sofía Valenzuela'
      }
    ],

    // Additional Student Scores for other criteria (Exam, Attendance, Participation)
    studentAssessments: {
      'usr-stud-1': { examScore: 90, attendanceScore: 100, participationScore: 95 },
      'usr-stud-2': { examScore: 95, attendanceScore: 100, participationScore: 100 },
      'usr-stud-3': { examScore: 78, attendanceScore: 85, participationScore: 80 },
      'usr-stud-4': { examScore: 88, attendanceScore: 95, participationScore: 90 },
      'usr-stud-5': { examScore: 75, attendanceScore: 80, participationScore: 70 },
    }
  },

  {
    id: 'cls-qui-101',
    code: 'QUI-101',
    name: 'Química I y Medio Ambiente',
    group: 'PREPA-101-ONLINE',
    periodId: 'per-2026-b1',
    periodName: '1er Bimestre 2026',
    modality: 'Prepa en Línea',
    color: 'from-fuchsia-700 via-pink-700 to-rose-700',
    bannerGradient: 'bg-gradient-to-r from-ipsur-pink-700 to-pink-900',
    teacherId: 'usr-prof-3',
    teacherName: 'Dr. Fernando Aguilar Cano',
    roomLink: 'https://meet.ipsur.edu.mx/clase-qui-101',
    createdAt: '2026-10-02T10:00:00Z',
    coordinatorNote: 'Sala habilitada. Pendiente que el docente configure sus criterios de ponderación al 100%.',
    
    // DEMO OF TEACHER RESTRICTION: Not configured yet!
    criteriaConfigured: false,
    criteria: {
      activities: 0,
      examProject: 0,
      attendance: 0,
      participation: 0,
    },

    rubric: {
      uploadedBy: 'Mtro. Carlos Mendoza (Coordinador Escolar)',
      uploadedAt: '2026-10-02T11:00:00Z',
      periodDuration: 'Bimestre (8 semanas lectivas)',
      generalObjective: 'Comprender la estructura atómica, la tabla periódica y las reacciones químicas con énfasis en el cuidado del entorno peninsular.',
      competencies: [
        'Valora de forma crítica el impacto ambiental de las actividades humanas.',
        'Aplica conceptos químicos fundamentales en la interpretación de fenómenos cotidianos.'
      ],
      topics: [
        {
          id: 'top-q1',
          unit: 'Unidad I',
          title: 'La Materia y Modelos Atómicos Históricos',
          weeks: 'Semanas 1 y 2',
          learningGoals: 'Propiedades físicas y químicas de la materia, evolución del modelo atómico.',
          keyReadings: 'Química General IPSUR - Módulo 1.'
        },
        {
          id: 'top-q2',
          unit: 'Unidad II',
          title: 'Tabla Periódica, Enlaces Químicos y Nomenclatura',
          weeks: 'Semanas 3 a 5',
          learningGoals: 'Electronegatividad, configuración electrónica y tipos de enlace químico.',
          keyReadings: 'Tabla periódica interactiva y guía de formulación.'
        }
      ],
      evaluationNote: 'El docente asignará los porcentajes de evaluación antes de publicar actividades.'
    },

    enrolledStudentIds: [
      'usr-stud-1',
      'usr-stud-2',
      'usr-stud-3',
      'usr-stud-4',
      'usr-stud-5'
    ],
    materials: [
      {
        id: 'mat-q1',
        title: 'Presentación: Estructura Atómica y Modelos de Bohr y Cuántico',
        unitId: 'top-q1',
        unitTitle: 'Unidad I',
        description: 'Diapositivas oficiales del curso para repaso previo a la sesión virtual.',
        type: 'presentation',
        fileUrl: '#diapositivas-quimica',
        fileName: 'Quimica_Unidad1_ModelosAtomicos.pptx',
        fileSize: '6.8 MB',
        uploadedAt: '2026-10-06T15:20:00Z',
        author: 'Dr. Fernando Aguilar Cano'
      }
    ],
    activities: [],
    submissions: [],
    studentAssessments: {
      'usr-stud-1': { examScore: 0, attendanceScore: 100, participationScore: 90 },
      'usr-stud-2': { examScore: 0, attendanceScore: 100, participationScore: 95 },
      'usr-stud-3': { examScore: 0, attendanceScore: 90, participationScore: 85 },
      'usr-stud-4': { examScore: 0, attendanceScore: 90, participationScore: 85 },
      'usr-stud-5': { examScore: 0, attendanceScore: 80, participationScore: 80 },
    }
  },

  {
    id: 'cls-tlr-101',
    code: 'TLR-101',
    name: 'Taller de Lectura y Redacción I',
    group: 'PREPA-101-ONLINE',
    periodId: 'per-2026-b1',
    periodName: '1er Bimestre 2026',
    modality: 'Prepa en Línea',
    color: 'from-purple-800 via-indigo-900 to-ipsur-navy-800',
    bannerGradient: 'bg-gradient-to-r from-purple-900 to-indigo-950',
    teacherId: 'usr-prof-2',
    teacherName: 'Lic. Roberto Garza Treviño',
    roomLink: 'https://meet.ipsur.edu.mx/clase-tlr-101',
    createdAt: '2026-10-01T09:00:00Z',
    coordinatorNote: 'Curso clave de desarrollo lingüístico y comunicativo para el bachillerato.',
    
    criteriaConfigured: true,
    criteria: {
      activities: 50,
      examProject: 25,
      attendance: 15,
      participation: 10,
    },

    rubric: {
      uploadedBy: 'Mtro. Carlos Mendoza (Coordinador Escolar)',
      uploadedAt: '2026-10-02T12:00:00Z',
      periodDuration: 'Bimestre (8 semanas lectivas)',
      generalObjective: 'Fortalecer las habilidades de comprensión lectora, redacción de textos argumentativos y ortografía normativa.',
      competencies: [
        'Produce textos basados en el uso normativo de la lengua considerando la intención y situación comunicativa.',
        'Expresa ideas y conceptos en composiciones coherentes y creativas.'
      ],
      topics: [
        {
          id: 'top-t1',
          unit: 'Unidad I',
          title: 'El Proceso Comunicativo y Tipología Textual',
          weeks: 'Semanas 1 a 3',
          learningGoals: 'Elementos de la comunicación, funciones de la lengua, textos personales y expositivos.',
          keyReadings: 'Manual de Redacción Efectiva IPSUR.'
        },
        {
          id: 'top-t2',
          unit: 'Unidad II',
          title: 'Reglas Ortográficas, Puntuación y el Ensayo Breve',
          weeks: 'Semanas 4 a 8',
          learningGoals: 'Acentuación diacrítica, signos de puntuación, estructura del ensayo escolar.',
          keyReadings: 'Compendio de Normas Gramaticales y RAE.'
        }
      ],
      evaluationNote: 'Ponderación: Actividades continuas 50%, Ensayo integrador 25%, Asistencia a videoconferencias 15%, Participación en debates 10%.'
    },

    enrolledStudentIds: [
      'usr-stud-1',
      'usr-stud-2',
      'usr-stud-3',
      'usr-stud-4',
      'usr-stud-5'
    ],
    materials: [
      {
        id: 'mat-t1',
        title: 'Manual de Ortografía y Redacción IPSUR 2026',
        unitId: 'top-t1',
        unitTitle: 'Unidad I',
        description: 'Guía práctica oficial con reglas de puntuación, conectores lógicos y vicios del lenguaje.',
        type: 'pdf',
        fileUrl: '#manual-ortografia',
        fileName: 'IPSUR_Manual_Ortografia_2026.pdf',
        fileSize: '3.1 MB',
        uploadedAt: '2026-10-04T11:00:00Z',
        author: 'Lic. Roberto Garza Treviño'
      }
    ],
    activities: [
      {
        id: 'act-t1',
        title: 'Actividad 1: Redacción de Texto Expositivo con Fichas de Trabajo',
        unitId: 'top-t1',
        unitTitle: 'Unidad I: Tipología Textual',
        description: 'Redactar un texto expositivo de 2 cuartillas sobre el impacto de la educación en línea en jóvenes y adultos. Incluir introducción, desarrollo y conclusión formal con citas en formato APA.',
        maxScore: 100,
        dueDate: '2026-11-10T23:59:00',
        createdAt: '2026-10-25T10:00:00Z',
        attachment: 'Plantilla_Texto_Expositivo.docx'
      }
    ],
    submissions: [
      {
        id: 'sub-t1-mateo',
        activityId: 'act-t1',
        studentId: 'usr-stud-1',
        studentName: 'Mateo Sánchez Domínguez',
        submittedAt: '2026-10-30T16:00:00',
        fileUrl: '#entrega-mateo-tlr1.docx',
        fileName: 'MateoSanchez_TextoExpositivo_IPSUR.docx',
        notes: 'Profesor Garza, anexo mi texto expositivo con citas y referencias en formato APA séptima edición.',
        grade: 94,
        feedback: 'Excelente claridad argumentativa y dominio del léxico formal. Felicitaciones Mateo.',
        gradedAt: '2026-10-31T10:00:00Z',
        gradedBy: 'Lic. Roberto Garza Treviño'
      }
    ],
    studentAssessments: {
      'usr-stud-1': { examScore: 92, attendanceScore: 100, participationScore: 95 },
      'usr-stud-2': { examScore: 96, attendanceScore: 100, participationScore: 100 },
      'usr-stud-3': { examScore: 84, attendanceScore: 90, participationScore: 85 },
      'usr-stud-4': { examScore: 90, attendanceScore: 95, participationScore: 90 },
      'usr-stud-5': { examScore: 78, attendanceScore: 85, participationScore: 75 },
    }
  }
];

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
