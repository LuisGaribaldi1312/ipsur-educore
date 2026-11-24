// Datos Institucionales Oficiales de IPSUR (Prepa) e IUPS (Universidad)
// Obtenidos de las plataformas oficiales de Playa del Carmen, Quintana Roo
// Adaptados a la nueva identidad: IPSUR (Prepa) e IUPS (Instituto Universitario Peninsular del Sur)

export const INSTITUTIONAL_CAMPUS = {
  city: 'Playa del Carmen, Quintana Roo, México',
  state: 'Quintana Roo',
  zone: 'Riviera Maya',
  address: 'Calle 6 Norte entre 20 y 25 (Esq. Ave. 25), Colonia Centro, C.P. 77710 / 77712',
  schedule: 'Lunes a Viernes de 8:00 a 19:00 hrs · Sábados de 8:00 a 15:00 hrs',
  generalEmail: 'admisiones@ipsur.com.mx',
  supportEmail: 'soporte.educore@ipsur.edu.mx'
};

export const PREPA_DATA = {
  name: 'Prepa IPSUR',
  institution: 'Instituto Peninsular del Sur',
  acronym: 'IPSUR',
  badge: 'Nivel Medio Superior · Bachillerato SEP',
  slogan: 'La educación es el camino · Excelencia académica con sentido humano',
  subSlogan: 'Educamos para el futuro, formamos para la vida.',
  rvoe: 'RVOE-SEP-DGB-2024-09882',
  phone: '+52 (984) 121-0233',
  whatsapp: '529843238984',
  whatsappDisplay: '+52 (984) 323-8984',
  email: 'admisiones@ipsur.com.mx',
  location: 'Calle 6 entre 20 y 25, Col. Centro, Playa del Carmen, Q. Roo',
  
  description: 'Creada como una institución enfocada al sector educativo Medio Superior en Playa del Carmen, que busca la integración de jóvenes para adquirir los mejores estándares educativos y ser competitivos en las diferentes áreas académicas y profesionales.',
  
  mision: 'Formar permanentemente a nuestros estudiantes para que desarrollen habilidades tecnológicas, académicas y profesionales a través del conocimiento.',
  vision: 'Consolidar nuestra posición como una institución educativa de excelente calidad, cuyos egresados manifiesten altos valores éticos y una sólida formación académica que les permita incorporarse con éxito al campo laboral y a la educación superior.',
  principle: 'Una Institución centrada en las personas, no en los diplomas, con valores sólidos y una conciencia crítica.',

  values: [
    { title: 'Empatía y Solidaridad', desc: 'Comprender y acompañar las necesidades de cada estudiante.' },
    { title: 'Integridad y Ética', desc: 'Actuar con rectitud y compromiso social en cada momento.' },
    { title: 'Resiliencia', desc: 'Capacidad para superar adversidades y crecer ante los retos.' },
    { title: 'Gratitud y Hermandad', desc: 'Reconocer el esfuerzo colectivo y fomentar un ambiente fraterno.' },
    { title: 'Iniciativa y Liderazgo', desc: 'Impulsar proyectos transformadores para la Riviera Maya.' }
  ],

  modalities: [
    {
      id: 'modular',
      title: 'Modalidad Modular',
      subtitle: 'Presencial Intensivo',
      duration: 'Cuatrimestral Flexible',
      desc: 'Organiza el plan de estudios en unidades independientes (módulos) en lugar de materias tradicionales, permitiendo cursar temas específicos de forma intensiva (1 vez por semana). Fomenta el aprendizaje autónomo y práctico.',
      highlights: [
        'Ideal para quienes trabajan o tienen actividades extracurriculares',
        'Contenidos integrados: teoría aplicada a la resolución de problemas reales',
        'Evaluación continua por módulo cursado',
        'Profesor como asesor y guía personalizado del grupo'
      ]
    },
    {
      id: 'mixta',
      title: 'Modalidad Mixta',
      subtitle: 'Virtual + Presencial',
      duration: 'Flexible a tu ritmo',
      desc: 'Combina la enseñanza presencial en aula física con el campus digital interactivo EDUCORE. Permite el estudio autónomo desde cualquier dispositivo mientras se asiste a talleres prácticos y asesorías presenciales.',
      highlights: [
        'Acceso 24/7 a contenidos, grabaciones y rúbricas oficiales',
        'Innovación pedagógica centrada en el alumno',
        'Resolución de casos prácticos por encima de la memorización pasiva',
        'Acompañamiento docente continuo vía foros y mensajería'
      ]
    },
    {
      id: 'online',
      title: 'Prepa 100% en Línea',
      subtitle: 'Campus Virtual EDUCORE',
      duration: '2 años (6 cuatrimestres)',
      desc: 'Estudia tu bachillerato totalmente en línea desde tu celular, tableta o computadora con validez oficial SEP. Sesiones sincrónicas en vivo por Meet y material didáctico interactivo disponible permanentemente.',
      highlights: [
        'Plataforma optimizada para celulares con bajo consumo de datos',
        'Boletas oficiales, kárdex y seguimiento escolar en tiempo real',
        'Certificado de Bachillerato con validez nacional SEP para cualquier universidad',
        'Sin horarios forzosos: avanza según tus tiempos'
      ]
    }
  ],

  programs: [
    {
      id: 'prepa-comunicacion',
      name: 'Bachillerato en Comunicación',
      duration: '2 Años (6 Cuatrimestres)',
      type: 'Técnico Especializado',
      badge: 'Medios y Producción Digital',
      desc: 'Enfocado en medios digitales, producción audiovisual (radio, TV, cine, streaming), periodismo, redes sociales y relaciones públicas. Desarrolla competencias para crear, editar y difundir contenidos con alto impacto.',
      skills: [
        'Fotografía profesional, guionismo y edición digital',
        'Manejo de laboratorios de cómputo, audio y video',
        'Gestión estratégica de redes sociales y streaming',
        'Comunicación asertiva y relaciones públicas institucionales'
      ],
      careerPath: 'Periodismo, Comunicación, Mercadotecnia, Cine y Medios Digitales'
    },
    {
      id: 'prepa-administracion',
      name: 'Bachillerato en Administración',
      duration: '3 Años o Plan Modular Intensivo',
      type: 'Económico-Administrativo',
      badge: 'Formación Dual & Empresas',
      desc: 'Prepara al estudiante en áreas económico-administrativas y de gestión empresarial. Combina formación general de bachillerato con competencias profesionales técnicas en Recursos Humanos, Contabilidad y Mercadotecnia.',
      skills: [
        'Fundamentos de contabilidad y finanzas empresariales',
        'Gestión de personal y talento humano',
        'Atención al cliente, ventas y marketing digital',
        'Manejo de software administrativo y ofimática avanzada'
      ],
      careerPath: 'Administración, Contaduría, Finanzas, Negocios Internacionales'
    },
    {
      id: 'prepa-dibujo',
      name: 'Bachillerato en Dibujo Arquitectónico y de Construcción',
      duration: '2 Años (6 Cuatrimestres)',
      type: 'Técnico en Infraestructura',
      badge: 'AutoCAD, Revit & Edificación',
      desc: 'Fusiona la formación media superior con una especialización técnica de alta demanda en la Riviera Maya. Desarrolla destrezas en representación gráfica de proyectos arquitectónicos, normatividad de obra y cálculo de materiales.',
      skills: [
        'Dibujo técnico asistido por computadora (CAD / Revit)',
        'Interpretación de planos estructurales e hidrosanitarios',
        'Materiales de construcción y mecánica de suelos',
        'Maquetación física, virtual y supervisión técnica de obra'
      ],
      careerPath: 'Arquitectura, Ingeniería Civil, Diseño de Interiores, Urbanismo'
    },
    {
      id: 'prepa-general',
      name: 'Bachillerato General',
      duration: 'Plan Modular Cuatrimestral',
      type: 'Propedéutico Universitario',
      badge: 'Preparación Universitaria Integral',
      desc: 'Formación equilibrada en ciencias exactas, ciencias naturales, lenguaje, inglés y ciencias sociales. Desarrolla el pensamiento analítico y las bases metodológicas para ingresar con éxito a cualquier carrera universitaria.',
      skills: [
        'Matemáticas, física y química analítica',
        'Comprensión lectora, redacción y pensamiento crítico',
        'Inglés comunicativo técnico y general',
        'Metodología de investigación y ética ciudadana'
      ],
      careerPath: 'Pase directo a cualquier carrera universitaria o politécnica'
    }
  ],

  admissionSteps: [
    {
      step: 1,
      title: 'Envío de Documentación',
      desc: 'Acta de nacimiento, CURP, certificado o constancia de secundaria, comprobante de domicilio e identificación del tutor.'
    },
    {
      step: 2,
      title: 'Entrevista o Visita Guiada',
      desc: 'Conoce nuestras instalaciones en el centro de Playa del Carmen o programa una sesión virtual de orientación vocacional.'
    },
    {
      step: 3,
      title: 'Inscripción y Asignación',
      desc: 'Entrega final, pago de cuota accesible y entrega de credenciales del Campus Virtual EDUCORE.'
    }
  ],

  requirements: [
    'Acta de Nacimiento (original y 2 copias)',
    'CURP formato actualizado',
    'Certificado de Secundaria o constancia oficial de terminación',
    'Comprobante de domicilio reciente (luz, agua o predial)',
    'Identificación oficial de padre, madre o tutor',
    'Certificado médico con tipo de sangre',
    '4 fotografías tamaño infantil (blanco y negro o color)'
  ]
};

export const IUPS_DATA = {
  name: 'IUPS Universidad',
  institution: 'Instituto Universitario Peninsular del Sur',
  acronym: 'IUPS',
  badge: 'Educación Superior · Licenciaturas, Ingenierías y Posgrados',
  slogan: 'Ciencia con Valores · Formamos Líderes para el Futuro',
  subSlogan: '¡Estudia tu licenciatura o posgrado sin tener que dejar de trabajar!',
  rvoe: 'RVOE-SEP-DGESU Incorporado Oficial SEP',
  phone: '+52 (984) 362-3473',
  whatsapp: '529843623473',
  whatsappDisplay: '+52 (984) 362-3473',
  email: 'admisiones@ipsur.com.mx',
  location: 'Calle 6 Norte con Ave. 25, Col. Centro, Playa del Carmen, Q. Roo, C.P. 77712',

  description: 'El Instituto Universitario Peninsular del Sur (IUPS) representa la evolución de la educación superior en Playa del Carmen y la Riviera Maya. Brindamos carreras universitarias y maestrías con validez oficial SEP, respaldadas por un modelo educativo flexible diseñado para estudiantes y profesionistas en activo.',

  mision: 'Formar profesionistas e investigadores íntegros, competitivos y éticos, con sentido de responsabilidad social y excelencia científica, dotados de herramientas prácticas para liderar organizaciones y transformar positivamente el entorno productivo de la Riviera Maya y México.',
  
  vision: 'Consolidarnos como la institución universitaria y de posgrados de mayor prestigio en Quintana Roo y el sureste mexicano, reconocida por la pertinencia laboral de sus egresados, la flexibilidad ejecutiva para quienes trabajan y el respaldo oficial SEP.',

  philosophy: 'Ciencia con Valores: La formación profesional de vanguardia adquiere verdadero sentido cuando se orienta al beneficio de la sociedad, la justicia, la verdad y el bienestar colectivo.',

  history: 'Fundada para responder al dinamismo de Playa del Carmen y la Península de Yucatán, IUPS nace para garantizar que cualquier persona con aspiraciones de superación pueda cursar una licenciatura, ingeniería o maestría oficial SEP sin sacrificar su empleo o familia.',

  values: [
    { title: 'Ética y Honestidad', desc: 'Rigor moral y transparencia en cada decisión académica y profesional.' },
    { title: 'Excelencia y Rigor', desc: 'Cátedra universitaria de alto nivel con profesores de posgrado.' },
    { title: 'Responsabilidad Social', desc: 'Compromiso con el desarrollo comunitario y sustentable de la Riviera Maya.' },
    { title: 'Flexibilidad e Innovación', desc: 'Adaptación a las necesidades reales del estudiante que trabaja.' },
    { title: 'Liderazgo con Humanismo', desc: 'Formamos líderes conscientes del impacto de sus decisiones.' }
  ],

  welcomeDirector: {
    title: 'Mensaje de Dirección Universitaria',
    quote: 'Elegir dónde formarte es decidir quién quieres ser. En el Instituto Universitario Peninsular del Sur (IUPS) no solo abrimos aulas; abrimos puertas al éxito profesional en perfecto equilibrio con tu vida laboral y familiar.',
    body: 'Nuestra comunidad universitaria se cimenta en la filosofía Ciencia con Valores, donde el respaldo de la SEP y los RVOE federales garantizan que cada paso que des con nosotros tenga validez y propósito. Tu experiencia previa es valorada y tu ambición es nuestro motor.'
  },

  advantages: [
    {
      title: 'Modalidad Ejecutiva & Mixta',
      desc: 'Elige el modelo que mejor se acomode a tus tiempos: semipresencial sabatino, nocturno o 100% digital a través de EDUCORE.',
      icon: 'Laptop'
    },
    {
      title: 'Grupos Reducidos',
      desc: 'Atención personalizada para maximizar el rendimiento académico y facilitar el networking entre colegas y docentes.',
      icon: 'Users'
    },
    {
      title: 'RVOE e Incorporación Oficial SEP',
      desc: 'Toda nuestra oferta académica cuenta con el aval pleno de la Secretaría de Educación Pública para titulación nacional.',
      icon: 'ShieldCheck'
    },
    {
      title: 'Cuerpo Docente con Experiencia Real',
      desc: 'Aprende de catedráticos con maestría, doctorado y trayectoria activa en el sector empresarial e institucional.',
      icon: 'GraduationCap'
    }
  ],

  academicOffer: {
    licenciaturas: [
      {
        id: 'lic-administracion',
        name: 'Licenciatura en Administración de Empresas',
        area: 'Económico-Administrativa',
        duration: '3 años (9 cuatrimestres)',
        modality: 'Mixta / Ejecutiva / En Línea',
        desc: 'Forma directores y consultores capaces de planear, organizar y dirigir organizaciones en entornos globales y de turismo internacional.',
        field: 'Dirección empresarial, finanzas corporativas, emprendimiento y comercio'
      },
      {
        id: 'lic-derecho',
        name: 'Licenciatura en Derecho',
        area: 'Ciencias Jurídicas',
        duration: '3 años (9 cuatrimestres)',
        modality: 'Mixta / Ejecutiva / En Línea',
        desc: 'Formación en el sistema acusatorio adversarial oral, derecho corporativo, civil, penal, laboral y amparo con ética y sentido social.',
        field: 'Litigio oral, corporativo, notarial, juzgados y administración pública'
      },
      {
        id: 'lic-contaduria',
        name: 'Licenciatura en Contaduría',
        area: 'Finanzas y Fiscal',
        duration: '3 años (9 cuatrimestres)',
        modality: 'Mixta / Ejecutiva / En Línea',
        desc: 'Especialistas en auditoría, planeación fiscal estratégica, contabilidad financiera y cumplimiento normativo del SAT.',
        field: 'Auditoría, despachos contables, peritajes fiscales y dirección financiera'
      },
      {
        id: 'lic-pedagogia',
        name: 'Licenciatura en Pedagogía',
        area: 'Educación y Humanidades',
        duration: '3 años (9 cuatrimestres)',
        modality: 'Mixta / Ejecutiva / En Línea',
        desc: 'Diseño curricular, psicología del aprendizaje, gestión escolar y tecnologías pedagógicas digitales para todos los niveles formativos.',
        field: 'Dirección escolar, diseño instruccional, docencia y capacitación'
      },
      {
        id: 'lic-seguridad-publica',
        name: 'Licenciatura en Seguridad Pública',
        area: 'Ciencias Sociales y Forenses',
        duration: '3 años (9 cuatrimestres)',
        modality: 'Mixta / Ejecutiva / En Línea',
        desc: 'Profesionales en criminología preventiva, políticas públicas de seguridad, prevención del delito y coordinación policial.',
        field: 'Corporaciones de seguridad, peritaje judicial, consultoría de prevención'
      },
      {
        id: 'lic-diseno-digital',
        name: 'Licenciatura en Diseño y Comunicación Digital',
        area: 'Nuevas Carreras 2026',
        duration: '3 años (9 cuatrimestres)',
        modality: 'Mixta / Ejecutiva / En Línea',
        desc: 'Branding digital, UI/UX, animación, narrativa visual, marketing interactivo y producción multimedia para plataformas web.',
        field: 'Agencias creativas, estudios de animación, diseño UI/UX y medios'
      },
      {
        id: 'lic-ciencias-deporte',
        name: 'Licenciatura en Ciencias del Deporte',
        area: 'Salud y Alto Rendimiento',
        duration: '3 años (9 cuatrimestres)',
        modality: 'Mixta / Ejecutiva',
        desc: 'Metodología del entrenamiento deportivo, kinesiología, nutrición atlética y gestión de complejos deportivos y recreativos.',
        field: 'Preparación física, federaciones, centros deportivos y clínicas de alto rendimiento'
      },
      {
        id: 'lic-psicologia',
        name: 'Licenciatura en Psicología',
        area: 'Ciencias de la Salud',
        duration: '3 años (9 cuatrimestres)',
        modality: 'Mixta / Ejecutiva / En Línea',
        desc: 'Intervención clínica, evaluación psicométrica, desarrollo humano, psicología educativa y gestión del comportamiento en organizaciones.',
        field: 'Clínica privada, recursos humanos, orientación educativa e instituciones de salud'
      }
    ],

    ingenierias: [
      {
        id: 'ing-civil',
        name: 'Ingeniería Civil',
        area: 'Construcción e Infraestructura',
        duration: '3 años y 4 meses (10 cuatrimestres)',
        modality: 'Mixta / Ejecutiva',
        desc: 'Cálculo estructural, mecánica de suelos, hidráulica, vías terrestres, topografía y dirección de proyectos de edificación y urbanismo.',
        field: 'Constructoras, obra pública, cálculo estructural, gerencia de proyectos'
      },
      {
        id: 'ing-electrica',
        name: 'Ingeniería Eléctrica',
        area: 'Energía y Sistemas',
        duration: '3 años y 4 meses (10 cuatrimestres)',
        modality: 'Mixta / Ejecutiva',
        desc: 'Sistemas de potencia eléctrica, subestaciones, energías renovables, automatización industrial e instalaciones de alta/baja tensión.',
        field: 'Plantas industriales, CFE, consultoría energética, proyectos solares y eólicos'
      },
      {
        id: 'ing-mecanica-automotriz',
        name: 'Ingeniería en Mecánica Automotriz',
        area: 'Nuevas Carreras 2026',
        duration: '3 años y 4 meses (10 cuatrimestres)',
        modality: 'Mixta / Ejecutiva',
        desc: 'Diagnóstico electrónico computarizado, trenes motrices híbridos y eléctricos, termodinámica y gestión de centros de servicio automotriz.',
        field: 'Industria automotriz, agencias oficiales, centros de diagnóstico y flotas'
      }
    ],

    maestrias: [
      {
        id: 'mae-amparo',
        name: 'Maestría en Amparo',
        area: 'Derecho Constitucional',
        duration: '1 año y 8 meses (5 cuatrimestres)',
        modality: 'Ejecutiva Sabatina / En Línea',
        desc: 'Especialización de alto nivel en protección de derechos humanos, suspensión del acto reclamado y litigio constitucional federal.'
      },
      {
        id: 'mae-calidad-educativa',
        name: 'Maestría en Calidad Educativa',
        area: 'Gestión Institucional',
        duration: '1 año y 8 meses (5 cuatrimestres)',
        modality: 'Ejecutiva Sabatina / En Línea',
        desc: 'Modelos de acreditación, mejora continua, evaluación docente e innovación de planes y programas en instituciones públicas y privadas.'
      },
      {
        id: 'mae-inmobiliaria',
        name: 'Maestría en Comercialización Inmobiliaria',
        area: 'Negocios & Real Estate',
        duration: '1 año y 8 meses (5 cuatrimestres)',
        modality: 'Ejecutiva Sabatina / En Línea',
        desc: 'Estrategia inmobiliaria, derecho registral, valuación, fideicomisos y financiamiento para el mercado de la Riviera Maya y el Caribe.'
      },
      {
        id: 'mae-educacion',
        name: 'Maestría en Educación',
        area: 'Pedagogía y Didáctica',
        duration: '1 año y 8 meses (5 cuatrimestres)',
        modality: 'Ejecutiva Sabatina / En Línea',
        desc: 'Neuroeducación, entornos virtuales de aprendizaje, docencia universitaria y desarrollo de proyectos de investigación socioeducativa.'
      },
      {
        id: 'mae-interiorismo',
        name: 'Maestría en Interiorismo y Decoración',
        area: 'Arquitectura y Diseño',
        duration: '1 año y 8 meses (5 cuatrimestres)',
        modality: 'Ejecutiva Sabatina / En Línea',
        desc: 'Diseño de espacios hoteleros, residenciales y comerciales de alta gama, iluminación arquitectónica, sustentabilidad y domótica.'
      },
      {
        id: 'mae-administracion',
        name: 'Maestría en Administración y Alta Dirección (MBA)',
        area: 'Liderazgo Corporativo',
        duration: '1 año y 8 meses (5 cuatrimestres)',
        modality: 'Ejecutiva Sabatina / En Línea',
        desc: 'Toma de decisiones estratégicas, dirección financiera internacional, negociación corporativa y liderazgo de equipos de alto rendimiento.'
      },
      {
        id: 'mae-juicios-orales',
        name: 'Maestría en Juicios Orales',
        area: 'Derecho Procesal Penal y Civil',
        duration: '1 año y 8 meses (5 cuatrimestres)',
        modality: 'Ejecutiva Sabatina / En Línea',
        desc: 'Técnicas avanzadas de litigación oral, teoría del caso, interrogatorio, objeciones y desahogo de pruebas periciales en audiencias orales.'
      },
      {
        id: 'mae-gobierno',
        name: 'Maestría en Gobierno y Administración Pública',
        area: 'Políticas Públicas',
        duration: '1 año y 8 meses (5 cuatrimestres)',
        modality: 'Ejecutiva Sabatina / En Línea',
        desc: 'Gobernanza democrática, presupuesto basado en resultados, transparencia, auditoría pública y diseño de políticas gubernamentales.'
      }
    ]
  },

  admissionRequirements: [
    'Certificado de Bachillerato legalizado (para Licenciatura/Ingeniería)',
    'Título y Cédula Profesional (para Maestrías y Posgrados)',
    'Acta de Nacimiento original',
    'CURP formato oficial actualizado',
    'Comprobante de domicilio reciente',
    'Identificación oficial vigente (INE o Pasaporte)',
    '4 fotografías tamaño título o infantil según el grado a cursar'
  ]
};

export const FAQ_DATA = [
  {
    q: '¿Los estudios de Prepa IPSUR y Universidad IUPS tienen validez oficial ante la SEP?',
    a: 'Sí, el 100% de nuestros planes de estudio cuentan con Reconocimiento de Validez Oficial de Estudios (RVOE) de la Secretaría de Educación Pública (SEP). Al egresar de Prepa IPSUR recibes tu Certificado Oficial de Bachillerato nacional, y al graduarte de IUPS obtienes tu Título Profesional y Cédula Federal registrados ante la Dirección General de Profesiones.'
  },
  {
    q: '¿Cómo funciona la separación entre el portal de Prepa IPSUR y el de Universidad IUPS?',
    a: 'Cada nivel educativo cuenta con su propio entorno digital independiente. Los alumnos de Prepa IPSUR ingresan al portal de bachillerato y no ven contenidos universitarios; mientras que los alumnos de IUPS ingresan a su portal universitario sin mezclarse con la prepa. Únicamente los directivos (Rector, Directores y Coordinación) cuentan con acceso dual para supervisar ambos campus.'
  },
  {
    q: '¿Puedo estudiar trabajando?',
    a: 'Por supuesto. Tanto en Prepa IPSUR (con modalidades modulares de 1 día a la semana y 100% en línea) como en Universidad IUPS (con modalidades ejecutivas sabatinas, nocturnas y virtuales), los planes están diseñados para que avances en tus metas profesionales sin tener que abandonar tu empleo ni tu vida personal.'
  },
  {
    q: '¿Dónde están ubicadas las instalaciones físicas?',
    a: 'Nuestro campus central se encuentra en pleno corazón de Playa del Carmen, Quintana Roo: Calle 6 Norte entre Avenida 20 y 25 (esquina Avenida 25), Colonia Centro. Contamos con aulas climatizadas, laboratorios de cómputo, cabina de medios y áreas de atención escolar.'
  },
  {
    q: '¿Cómo se realizan los pagos de inscripción y colegiaturas?',
    a: 'Contamos con múltiples opciones seguras: transferencia electrónica SPEI, pago con tarjeta de débito/crédito, ventanilla bancaria y atención directa en la caja escolar del plantel, con registro y comprobante digital inmediato en el portal.'
  }
];
