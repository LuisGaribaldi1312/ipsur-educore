import React, { createContext, useContext, useState, useEffect } from 'react';
import { USERS, INITIAL_CLASSROOMS, PERIODS, INSTITUTIONAL_INFO } from '../data/initialData';
import { validateCriteria } from '../utils/calculations';
import { getDeadlineStatus } from '../utils/dateFormatter';

const AppContext = createContext();

const STORAGE_KEY_CLASSROOMS = 'ipsur_educore_classrooms_v1';
const STORAGE_KEY_USER = 'ipsur_educore_current_user_v1';

export function AppProvider({ children }) {
  // Load current user
  const [currentUserId, setCurrentUserId] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY_USER);
    return saved || 'usr-coord-1'; // Default as Coordinador Escolar
  });

  // Load classrooms with localStorage fallback
  const [classrooms, setClassrooms] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CLASSROOMS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading classrooms from localStorage', e);
    }
    return INITIAL_CLASSROOMS;
  });

  const [activeClassroomId, setActiveClassroomId] = useState(null);
  const [notification, setNotification] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CLASSROOMS, JSON.stringify(classrooms));
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  }, [classrooms]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_USER, currentUserId);
  }, [currentUserId]);

  const showToast = (title, message, type = 'success') => {
    setNotification({ title, message, type, id: Date.now() });
    setTimeout(() => {
      setNotification(prev => (prev?.id === notification?.id ? null : prev));
    }, 4500);
  };

  const currentUser = USERS.find(u => u.id === currentUserId) || USERS[0];

  // Helper: Switch user role
  const switchUser = (userId) => {
    setCurrentUserId(userId);
    const user = USERS.find(u => u.id === userId);
    showToast(
      `Rol cambiado a ${user?.role === 'coordinator' ? 'Coordinador' : user?.role === 'teacher' ? 'Profesor' : 'Estudiante'}`,
      `Iniciaste sesión como ${user?.name}`,
      'info'
    );
  };

  // Coordinator: Create Classroom
  const createClassroom = ({
    name,
    code,
    group,
    periodId,
    teacherId,
    rubricObjective,
    rubricTopics,
    enrolledStudentIds
  }) => {
    const teacher = USERS.find(u => u.id === teacherId);
    const period = PERIODS.find(p => p.id === periodId) || PERIODS[0];

    const newClassroom = {
      id: `cls-${Date.now()}`,
      code: code || `IPS-${Math.floor(100 + Math.random() * 900)}`,
      name,
      group: group || 'PREPA-101-ONLINE',
      periodId: period.id,
      periodName: period.name,
      modality: 'Prepa en Línea',
      color: 'from-blue-700 via-indigo-800 to-ipsur-navy-700',
      bannerGradient: 'bg-gradient-to-r from-ipsur-navy-800 to-indigo-900',
      teacherId: teacher?.id || 'usr-prof-1',
      teacherName: teacher?.name || 'Docente Asignado',
      roomLink: `https://meet.jit.si/IPSUR_${code.replace(/[^a-zA-Z0-9]/g, '')}_Virtual`,
      virtualSession: {
        platform: 'Aula Virtual IPSUR',
        link: `https://meet.jit.si/IPSUR_${code.replace(/[^a-zA-Z0-9]/g, '')}_Virtual`,
        meetingId: code,
        passcode: 'IPSUR2026',
        schedule: 'Lunes y Miércoles 18:00 - 19:30 hrs',
        status: 'live',
        channelName: `IPSUR_${code.replace(/[^a-zA-Z0-9]/g, '')}_Virtual`,
        topic: `Clase Virtual en Vivo · ${name}`
      },
      createdAt: new Date().toISOString(),
      coordinatorNote: 'Sala habilitada oficialmente por Coordinación Académica IPSUR.',
      criteriaConfigured: false,
      criteria: {
        activities: 0,
        examProject: 0,
        attendance: 0,
        participation: 0
      },
      rubric: {
        uploadedBy: `${currentUser.name} (Coordinación Escolar)`,
        uploadedAt: new Date().toISOString(),
        periodDuration: period.type,
        generalObjective: rubricObjective || 'Desarrollar competencias disciplinares y de aprendizaje autónomo en la materia.',
        competencies: [
          'Aplica el pensamiento crítico y analítico en los problemas del área.',
          'Demuestra dominio de los conceptos esenciales del plan de estudios IPSUR.',
          'Participa responsablemente en su entorno virtual de aprendizaje.'
        ],
        topics: rubricTopics && rubricTopics.length > 0 ? rubricTopics : [
          {
            id: `top-${Date.now()}-1`,
            unit: 'Unidad I',
            title: 'Introducción y Fundamentos Conceptuales',
            weeks: 'Semanas 1 y 2',
            learningGoals: 'Conceptos clave, definiciones iniciales y metodología de trabajo en línea.',
            keyReadings: 'Guía Didáctica de la Asignatura IPSUR.'
          },
          {
            id: `top-${Date.now()}-2`,
            unit: 'Unidad II',
            title: 'Desarrollo Práctico y Aplicaciones',
            weeks: 'Semanas 3 a 5',
            learningGoals: 'Resolución de casos y análisis de situaciones reales.',
            keyReadings: 'Lecturas seleccionadas del módulo.'
          },
          {
            id: `top-${Date.now()}-3`,
            unit: 'Unidad III',
            title: 'Evaluación y Proyecto de Cierre',
            weeks: 'Semanas 6 a 8',
            learningGoals: 'Integración de los saberes adquiridos y elaboración de producto final.',
            keyReadings: 'Rúbrica de Evaluación Sumativa.'
          }
        ],
        evaluationNote: 'El profesor titular asignará los porcentajes de evaluación (Actividades, Examen/Proyecto, Asistencia, Participación) sumando exactamente 100%.'
      },
      enrolledStudentIds: enrolledStudentIds && enrolledStudentIds.length > 0 ? enrolledStudentIds : USERS.filter(u => u.role === 'student').map(s => s.id),
      materials: [],
      activities: [],
      submissions: [],
      studentAssessments: {}
    };

    setClassrooms(prev => [newClassroom, ...prev]);
    showToast('Sala creada con éxito', `La sala "${name}" ha sido creada y asignada a ${teacher?.name || 'el docente'}.`);
    return newClassroom;
  };

  // Coordinator: Update Rubric & Topics
  const updateClassroomRubric = (classroomId, updatedRubric) => {
    setClassrooms(prev => prev.map(cls => {
      if (cls.id !== classroomId) return cls;
      return {
        ...cls,
        rubric: {
          ...cls.rubric,
          ...updatedRubric,
          uploadedBy: `${currentUser.name} (Coordinación Escolar)`,
          uploadedAt: new Date().toISOString()
        }
      };
    }));
    showToast('Rúbrica y Temario actualizados', 'El temario oficial de la sala ha sido actualizado correctamente.');
  };

  // Coordinator: Update Enrolled Students
  const updateClassroomEnrollment = (classroomId, studentIds) => {
    setClassrooms(prev => prev.map(cls => {
      if (cls.id !== classroomId) return cls;
      return {
        ...cls,
        enrolledStudentIds: studentIds
      };
    }));
    showToast('Matrícula actualizada', `Se han asignado ${studentIds.length} estudiantes a la sala.`);
  };

  // Teacher: Configure Criteria (STRICT 100%)
  const setEvaluationCriteria = (classroomId, criteriaValues) => {
    const validation = validateCriteria(criteriaValues);
    if (!validation.isValid) {
      showToast('Error en Criterios', validation.message, 'error');
      return false;
    }

    setClassrooms(prev => prev.map(cls => {
      if (cls.id !== classroomId) return cls;
      return {
        ...cls,
        criteriaConfigured: true,
        criteria: {
          activities: Number(criteriaValues.activities),
          examProject: Number(criteriaValues.examProject),
          attendance: Number(criteriaValues.attendance),
          participation: Number(criteriaValues.participation)
        }
      };
    }));

    showToast('Ponderación Guardada', 'Los porcentajes de evaluación suman 100%. Ahora puedes crear y asignar actividades.', 'success');
    return true;
  };

  // Teacher: Create Activity (STRICT GATE: Criteria must be 100%)
  const createActivity = (classroomId, activityData) => {
    const targetClass = classrooms.find(c => c.id === classroomId);
    if (!targetClass) return false;

    if (!targetClass.criteriaConfigured) {
      showToast(
        'Acceso Bloqueado',
        'Debes configurar los porcentajes de evaluación (Actividades, Examen, Asistencia, Participación = 100%) antes de crear actividades.',
        'error'
      );
      return false;
    }

    const newActivity = {
      id: `act-${Date.now()}`,
      title: activityData.title,
      unitId: activityData.unitId || targetClass.rubric?.topics?.[0]?.id || 'top-1',
      unitTitle: activityData.unitTitle || targetClass.rubric?.topics?.[0]?.title || 'Tema del Bimestre',
      description: activityData.description,
      maxScore: 100, // Strict 0 to 100 as specified
      dueDate: activityData.dueDate,
      createdAt: new Date().toISOString(),
      attachment: activityData.attachment || null
    };

    setClassrooms(prev => prev.map(cls => {
      if (cls.id !== classroomId) return cls;
      return {
        ...cls,
        activities: [newActivity, ...cls.activities]
      };
    }));

    showToast('Actividad Asignada', `La actividad "${activityData.title}" fue publicada para los estudiantes.`);
    return true;
  };

  // Teacher: Upload Material
  const addMaterial = (classroomId, materialData) => {
    const newMaterial = {
      id: `mat-${Date.now()}`,
      title: materialData.title,
      unitId: materialData.unitId,
      unitTitle: materialData.unitTitle,
      description: materialData.description,
      type: materialData.type || 'pdf',
      fileUrl: materialData.fileUrl || '#archivo-descarga',
      fileName: materialData.fileName || 'Material_IPSUR.pdf',
      fileSize: materialData.fileSize || '2.5 MB',
      uploadedAt: new Date().toISOString(),
      author: currentUser.name
    };

    setClassrooms(prev => prev.map(cls => {
      if (cls.id !== classroomId) return cls;
      return {
        ...cls,
        materials: [newMaterial, ...cls.materials]
      };
    }));

    showToast('Material Publicado', `El recurso "${materialData.title}" está disponible para la clase.`);
    return true;
  };

  // Student: Submit Activity (STRICT DEADLINE GATE: Closed if expired)
  const submitActivity = (classroomId, activityId, { notes, fileName, fileUrl }) => {
    const targetClass = classrooms.find(c => c.id === classroomId);
    if (!targetClass) return false;

    const activity = targetClass.activities.find(a => a.id === activityId);
    if (!activity) return false;

    // Check strict closing
    const deadlineStatus = getDeadlineStatus(activity.dueDate);
    if (deadlineStatus.isClosed) {
      showToast(
        'Apartado Cerrado',
        'La fecha y hora límite de entrega ha expirado. No se aceptan entregas extemporáneas.',
        'error'
      );
      return false;
    }

    const existingIndex = targetClass.submissions.findIndex(
      s => s.activityId === activityId && s.studentId === currentUser.id
    );

    const newSubmission = {
      id: existingIndex >= 0 ? targetClass.submissions[existingIndex].id : `sub-${Date.now()}`,
      activityId,
      studentId: currentUser.id,
      studentName: currentUser.name,
      submittedAt: new Date().toISOString(),
      fileName: fileName || `${currentUser.name.replace(/\s+/g, '_')}_Entrega.pdf`,
      fileUrl: fileUrl || '#archivo-entregado',
      notes: notes || '',
      grade: null,
      feedback: null,
      gradedAt: null,
      gradedBy: null
    };

    setClassrooms(prev => prev.map(cls => {
      if (cls.id !== classroomId) return cls;
      let newSubmissions = [...cls.submissions];
      if (existingIndex >= 0) {
        newSubmissions[existingIndex] = newSubmission;
      } else {
        newSubmissions.push(newSubmission);
      }
      return {
        ...cls,
        submissions: newSubmissions
      };
    }));

    showToast('Actividad Entregada', 'Tu tarea ha sido enviada exitosamente para revisión docente.');
    return true;
  };

  // Teacher: Grade Activity (0 to 100)
  const gradeSubmission = (classroomId, submissionId, gradeValue, feedbackText) => {
    const numGrade = Number(gradeValue);
    if (isNaN(numGrade) || numGrade < 0 || numGrade > 100) {
      showToast('Calificación Inválida', 'La calificación debe ser un valor numérico entre 0 y 100.', 'error');
      return false;
    }

    setClassrooms(prev => prev.map(cls => {
      if (cls.id !== classroomId) return cls;
      const updatedSubmissions = cls.submissions.map(sub => {
        if (sub.id !== submissionId) return sub;
        return {
          ...sub,
          grade: numGrade,
          feedback: feedbackText || 'Revisado y calificado conforme a la rúbrica.',
          gradedAt: new Date().toISOString(),
          gradedBy: currentUser.name
        };
      });

      return {
        ...cls,
        submissions: updatedSubmissions
      };
    }));

    showToast('Calificación Registrada', `Se asignó ${numGrade}/100 y retroalimentación al estudiante.`);
    return true;
  };

  // Teacher: Update Student Assessment for Exam, Attendance & Participation
  const updateStudentAssessment = (classroomId, studentId, scores) => {
    setClassrooms(prev => prev.map(cls => {
      if (cls.id !== classroomId) return cls;
      const currentAssessments = cls.studentAssessments || {};
      const currentStudent = currentAssessments[studentId] || { examScore: 0, attendanceScore: 100, participationScore: 100 };

      return {
        ...cls,
        studentAssessments: {
          ...currentAssessments,
          [studentId]: {
            examScore: scores.examScore !== undefined ? Number(scores.examScore) : currentStudent.examScore,
            attendanceScore: scores.attendanceScore !== undefined ? Number(scores.attendanceScore) : currentStudent.attendanceScore,
            participationScore: scores.participationScore !== undefined ? Number(scores.participationScore) : currentStudent.participationScore,
          }
        }
      };
    }));

    showToast('Registro Actualizado', 'Evaluación de asistencia, participación y examen guardada con éxito.');
  };

  // Update Virtual Session configuration (Meet, Zoom, Teams, Aula Virtual)
  const updateVirtualSession = (classroomId, sessionData) => {
    setClassrooms(prev => prev.map(cls => {
      if (cls.id !== classroomId) return cls;
      return {
        ...cls,
        virtualSession: {
          ...(cls.virtualSession || {}),
          ...sessionData
        },
        roomLink: sessionData.link || cls.roomLink
      };
    }));

    showToast('Sesión Virtual Actualizada', 'La configuración de la videoconferencia ha sido guardada.');
    return true;
  };

  // Reset demo data
  const resetDemoData = () => {
    localStorage.removeItem(STORAGE_KEY_CLASSROOMS);
    localStorage.removeItem(STORAGE_KEY_USER);
    setClassrooms(INITIAL_CLASSROOMS);
    setCurrentUserId('usr-coord-1');
    showToast('Datos reiniciados', 'Se han restaurado los datos originales de IPSUR EDUCORE.');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        currentUserId,
        users: USERS,
        periods: PERIODS,
        institutionalInfo: INSTITUTIONAL_INFO,
        classrooms,
        activeClassroomId,
        setActiveClassroomId,
        notification,
        switchUser,
        createClassroom,
        updateClassroomRubric,
        updateClassroomEnrollment,
        setEvaluationCriteria,
        createActivity,
        addMaterial,
        submitActivity,
        gradeSubmission,
        updateStudentAssessment,
        updateVirtualSession,
        resetDemoData,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
