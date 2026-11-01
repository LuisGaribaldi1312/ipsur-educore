import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { USERS, INITIAL_CLASSROOMS, PERIODS, INSTITUTIONAL_INFO } from '../data/initialData';
import { validateCriteria } from '../utils/calculations';
import { getDeadlineStatus } from '../utils/dateFormatter';

const AppContext = createContext();

const STORAGE_KEY_CLASSROOMS = 'ipsur_educore_classrooms_v2';
const STORAGE_KEY_USERS = 'ipsur_educore_users_v2';
const STORAGE_KEY_USER = 'ipsur_educore_current_user_v2';

export function AppProvider({ children }) {
  // Purge legacy demo keys if present
  useEffect(() => {
    try {
      localStorage.removeItem('ipsur_educore_classrooms_v1');
      localStorage.removeItem('ipsur_educore_current_user_v1');
    } catch (e) {
      // Ignore
    }
  }, []);

  // Load and manage users in state with localStorage persistence
  const [users, setUsers] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_USERS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Guarantee that the superadmin account is always present with its secret flag
          const hasSuperAdmin = parsed.some(u => u.isSuperAdmin || u.role === 'superadmin');
          if (!hasSuperAdmin) {
            return [USERS[0], ...parsed];
          }
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error loading users from localStorage', e);
    }
    return USERS;
  });

  // Current authenticated user ID (Session ONLY: Clears automatically when tab or browser is closed)
  const [currentUserId, setCurrentUserId] = useState(() => {
    try {
      return sessionStorage.getItem('ipsur_educore_session_user') || null;
    } catch (e) {
      return null;
    }
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
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [userManagerModalOpen, setUserManagerModalOpen] = useState(false);

  const toastTimerRef = useRef(null);

  const clearNotification = () => {
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
      toastTimerRef.current = null;
    }
    setNotification(null);
  };

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
    } catch (e) {
      console.error('Error saving users to localStorage', e);
    }
  }, [users]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CLASSROOMS, JSON.stringify(classrooms));
    } catch (e) {
      console.error('Error saving classrooms to localStorage', e);
    }
  }, [classrooms]);

  useEffect(() => {
    try {
      localStorage.removeItem(STORAGE_KEY_USER);
      localStorage.removeItem('ipsur_educore_current_user_v1');
      if (currentUserId) {
        sessionStorage.setItem('ipsur_educore_session_user', currentUserId);
      } else {
        sessionStorage.removeItem('ipsur_educore_session_user');
      }
    } catch (e) {
      // Ignore
    }
  }, [currentUserId]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  const showToast = (title, message, type = 'success') => {
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }
    const toastId = Date.now();
    setNotification({ title, message, type, id: toastId });

    // Toast will disappear strictly after 3 seconds (3000ms)
    toastTimerRef.current = setTimeout(() => {
      setNotification(prev => (prev?.id === toastId ? null : prev));
      toastTimerRef.current = null;
    }, 3000);
  };

  // Current User Object (null if no active session)
  const currentUser = currentUserId ? (users.find(u => u.id === currentUserId) || null) : null;
  const isSuperAdmin = Boolean(currentUser?.role === 'superadmin' || currentUser?.isSuperAdmin);

  // STRICT HIDDEN USER FILTER:
  // Non-superadmin users CANNOT see the Super Usuario in any list, table, or directory
  const visibleUsers = users.filter(u => {
    if (u.hidden || u.isSuperAdmin || u.role === 'superadmin') {
      return isSuperAdmin && currentUser?.id === u.id;
    }
    return true;
  });

  // Authentication: Login with Email or Matrícula + Password
  const login = (identifier, password) => {
    if (!identifier || !password) {
      showToast('Credenciales Requeridas', 'Por favor ingresa usuario y contraseña.', 'error');
      return { success: false, message: 'Campos requeridos' };
    }

    const cleanIdentifier = identifier.trim().toLowerCase();
    const cleanPassword = password.trim();

    const foundUser = users.find(u => 
      (u.email?.toLowerCase() === cleanIdentifier || u.matricula?.toLowerCase() === cleanIdentifier) &&
      u.password === cleanPassword
    );

    if (!foundUser) {
      showToast('Acceso Denegado', 'Correo, matrícula o contraseña incorrectos.', 'error');
      return { success: false, message: 'Credenciales inválidas' };
    }

    if (foundUser.status === 'inactive') {
      showToast('Usuario Desactivado', 'Tu cuenta se encuentra inactiva. Contacta a la Dirección.', 'error');
      return { success: false, message: 'Cuenta desactivada' };
    }

    setCurrentUserId(foundUser.id);
    setLoginModalOpen(false);

    showToast(
      'Acceso Autorizado',
      `Bienvenido(a) a IPSUR EDUCORE, ${foundUser.name}`,
      'success'
    );
    return { success: true, user: foundUser };
  };

  // Logout
  const logout = () => {
    setCurrentUserId(null);
    setActiveClassroomId(null);
    setLoginModalOpen(true);
    showToast('Sesión Concluida', 'Has salido del sistema de forma segura.', 'info');
  };

  // Switch User (Role Simulator / Fast Testing)
  const switchUser = (userId) => {
    const targetUser = users.find(u => u.id === userId);
    if (!targetUser) return;
    
    // Non-superadmins cannot switch into superadmin
    if ((targetUser.isSuperAdmin || targetUser.role === 'superadmin') && !isSuperAdmin) {
      showToast('Acceso Prohibido', 'No tienes autorización para acceder a esta cuenta de seguridad.', 'error');
      return;
    }

    setCurrentUserId(userId);
    setActiveClassroomId(null);
    showToast(
      `Perfil Activo: ${targetUser.name}`,
      `Rol: ${targetUser.title || targetUser.role}`,
      'info'
    );
  };

  // User Management: Create User
  const createUser = ({
    name,
    email,
    password,
    role,
    matricula,
    title,
    specialty,
    shift,
    phone
  }) => {
    // Permission checks
    if (currentUser.role === 'coordinator' && (role === 'director' || role === 'superadmin')) {
      showToast('Permiso Denegado', 'Un Coordinador no tiene permisos para crear Directores o Administradores.', 'error');
      return false;
    }
    if (currentUser.role === 'director' && role === 'superadmin') {
      showToast('Permiso Denegado', 'El Super Administrador es un rol reservado del sistema.', 'error');
      return false;
    }

    // Email validation
    const emailExists = users.some(u => u.email?.toLowerCase() === email.trim().toLowerCase());
    if (emailExists) {
      showToast('Correo Duplicado', 'Ya existe un usuario registrado con este correo electrónico.', 'error');
      return false;
    }

    const newId = `usr-${role}-${Date.now()}`;
    const newUser = {
      id: newId,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: password ? password.trim() : 'Ipsur2026*',
      role, // 'director' | 'coordinator' | 'teacher' | 'student'
      isSuperAdmin: false,
      hidden: false,
      title: title?.trim() || (
        role === 'director' ? 'Director General Institucional' :
        role === 'coordinator' ? 'Coordinador Académico' :
        role === 'teacher' ? 'Docente Titular' :
        'Estudiante de Bachillerato Virtual'
      ),
      avatar: `https://images.unsplash.com/photo-${role === 'student' ? '1539571696357-5a69c17a67c6' : '1573496359142-b8d87734a5a2'}?w=150&auto=format&fit=crop&q=80`,
      matricula: matricula?.trim() || `IPS-${role.substring(0, 3).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`,
      specialty: specialty || 'General',
      shift: shift || 'En Línea',
      phone: phone || '+52 (998) 845-2100',
      createdAt: new Date().toISOString(),
      status: 'active'
    };

    setUsers(prev => [newUser, ...prev]);
    showToast('Usuario Creado', `El usuario ${newUser.name} ha sido dado de alta exitosamente con rol de ${newUser.title}.`);
    return newUser;
  };

  // User Management: Update User
  const updateUser = (userId, updatedFields) => {
    const target = users.find(u => u.id === userId);
    if (!target) return false;

    // Security: non-superadmin cannot update superadmin
    if ((target.isSuperAdmin || target.role === 'superadmin') && !isSuperAdmin) {
      showToast('Acceso Denegado', 'No puedes modificar la cuenta del Super Administrador.', 'error');
      return false;
    }

    setUsers(prev => prev.map(u => {
      if (u.id !== userId) return u;
      return {
        ...u,
        ...updatedFields
      };
    }));

    showToast('Usuario Actualizado', 'Los datos del usuario han sido guardados.');
    return true;
  };

  // User Management: Delete User
  const deleteUser = (userId) => {
    const target = users.find(u => u.id === userId);
    if (!target) return false;

    if (target.isSuperAdmin || target.role === 'superadmin') {
      showToast('Operación Bloqueada', 'El Super Administrador no puede ser eliminado.', 'error');
      return false;
    }

    if (target.id === currentUser.id) {
      showToast('Operación Bloqueada', 'No puedes eliminar tu propio usuario en sesión activa.', 'error');
      return false;
    }

    setUsers(prev => prev.filter(u => u.id !== userId));
    showToast('Usuario Eliminado', `El usuario ${target.name} ha sido eliminado permanentemente.`);
    return true;
  };

  // User Management: Toggle Status (Active / Inactive)
  const toggleUserStatus = (userId) => {
    const target = users.find(u => u.id === userId);
    if (!target) return false;

    if (target.isSuperAdmin || target.role === 'superadmin') {
      showToast('Operación Bloqueada', 'El Super Administrador no puede ser desactivado.', 'error');
      return false;
    }

    const newStatus = target.status === 'inactive' ? 'active' : 'inactive';
    setUsers(prev => prev.map(u => {
      if (u.id !== userId) return u;
      return { ...u, status: newStatus };
    }));

    showToast(
      'Estado Actualizado',
      `El usuario ${target.name} ahora se encuentra ${newStatus === 'active' ? 'ACTIVO' : 'INACTIVO'}.`
    );
    return true;
  };

  // Coordinator/Director: Create Classroom
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
    const teacher = users.find(u => u.id === teacherId);
    const period = PERIODS.find(p => p.id === periodId) || PERIODS[0];

    const cleanCode = code ? code.trim() : `IPS-${Math.floor(100 + Math.random() * 900)}`;

    const newClassroom = {
      id: `cls-${Date.now()}`,
      code: cleanCode,
      name: name.trim(),
      group: group || 'PREPA-101-ONLINE',
      periodId: period.id,
      periodName: period.name,
      modality: 'Prepa en Línea',
      color: 'from-blue-700 via-indigo-800 to-ipsur-navy-700',
      bannerGradient: 'bg-gradient-to-r from-ipsur-navy-800 to-indigo-900',
      teacherId: teacher?.id || '',
      teacherName: teacher?.name || 'Docente Pendiente de Asignación',
      roomLink: `https://meet.jit.si/IPSUR_${cleanCode.replace(/[^a-zA-Z0-9]/g, '')}_Virtual`,
      virtualSession: {
        platform: 'Aula Virtual IPSUR',
        link: `https://meet.jit.si/IPSUR_${cleanCode.replace(/[^a-zA-Z0-9]/g, '')}_Virtual`,
        meetingId: cleanCode,
        passcode: 'IPSUR2026',
        schedule: 'Lunes y Miércoles 18:00 - 19:30 hrs',
        status: 'live',
        channelName: `IPSUR_${cleanCode.replace(/[^a-zA-Z0-9]/g, '')}_Virtual`,
        topic: `Clase Virtual en Vivo · ${name}`
      },
      createdAt: new Date().toISOString(),
      coordinatorNote: `Sala habilitada oficialmente por ${currentUser.name} (${currentUser.title}).`,
      criteriaConfigured: false,
      criteria: {
        activities: 0,
        examProject: 0,
        attendance: 0,
        participation: 0
      },
      rubric: {
        uploadedBy: `${currentUser.name} (${currentUser.title})`,
        uploadedAt: new Date().toISOString(),
        periodDuration: period.type,
        generalObjective: rubricObjective || 'Desarrollar competencias disciplinares y de aprendizaje autónomo en la materia conforme al plan SEP/IPSUR.',
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
      enrolledStudentIds: enrolledStudentIds && enrolledStudentIds.length > 0 ? enrolledStudentIds : users.filter(u => u.role === 'student').map(s => s.id),
      materials: [],
      activities: [],
      submissions: [],
      studentAssessments: {}
    };

    setClassrooms(prev => [newClassroom, ...prev]);
    showToast('Sala creada con éxito', `La sala "${name}" ha sido creada con código ${cleanCode}.`);
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
          uploadedBy: `${currentUser.name} (${currentUser.title})`,
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

  return (
    <AppContext.Provider
      value={{
        currentUser,
        currentUserId,
        users: visibleUsers,      // Strictly filtered: non-superadmin NEVER sees Super Admin
        allUsers: users,          // Raw list for Super Admin only
        isSuperAdmin,
        periods: PERIODS,
        institutionalInfo: INSTITUTIONAL_INFO,
        classrooms,
        activeClassroomId,
        setActiveClassroomId,
        notification,
        clearNotification,
        loginModalOpen,
        setLoginModalOpen,
        userManagerModalOpen,
        setUserManagerModalOpen,
        login,
        logout,
        switchUser,
        createUser,
        updateUser,
        deleteUser,
        toggleUserStatus,
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
