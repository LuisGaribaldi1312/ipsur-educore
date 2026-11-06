import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { 
  USERS, 
  INITIAL_CLASSROOMS, 
  PERIODS, 
  INSTITUTIONAL_INFO, 
  DEFAULT_ROLE_PERMISSIONS,
  SAMPLE_ACTIVITIES,
  SAMPLE_NOTIFICATIONS,
  SAMPLE_PROCEDURES,
  SAMPLE_PAYMENTS,
  ACADEMIC_STATS
} from '../data/initialData';
import { validateCriteria } from '../utils/calculations';
import { getDeadlineStatus } from '../utils/dateFormatter';
import { 
  isFirebaseConfigured, 
  saveFirebaseConfig, 
  firebaseConfig 
} from '../firebase/config';
import { 
  uploadAllLocalDataToCloud,
  subscribeToUsers, 
  subscribeToClassrooms, 
  syncUserToCloud, 
  syncClassroomToCloud, 
  deleteClassroomFromCloud,
  syncItemToCloud,
  PATHS 
} from '../services/firebaseSync';

const AppContext = createContext();

const STORAGE_KEY_CLASSROOMS = 'ipsur_educore_classrooms_v3';
const STORAGE_KEY_USERS = 'ipsur_educore_users_v3';
const STORAGE_KEY_USER = 'ipsur_educore_current_user_v3';

export function AppProvider({ children }) {
  // Purge legacy demo keys and previous sample data
  useEffect(() => {
    try {
      localStorage.removeItem('ipsur_educore_classrooms_v1');
      localStorage.removeItem('ipsur_educore_current_user_v1');
      localStorage.removeItem('ipsur_educore_classrooms_v2');
      localStorage.removeItem('ipsur_educore_users_v2');
      localStorage.removeItem('ipsur_educore_current_user_v2');
      localStorage.removeItem('ipsur_activities_v1');
      localStorage.removeItem('ipsur_notifications_v1');
      localStorage.removeItem('ipsur_procedures_v1');
      localStorage.removeItem('ipsur_payments_v1');
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
          // Normalize existing users with proper scopes and permissions
          const normalized = parsed.map(u => {
            if (u.id === 'usr-superadmin' || u.isSuperAdmin) {
              return {
                ...u,
                name: USERS[0].name,
                title: USERS[0].title,
                avatar: USERS[0].avatar,
                scope: 'global',
                permissions: {
                  ...DEFAULT_ROLE_PERMISSIONS.superadmin,
                  ...(u.permissions || {})
                }
              };
            }
            return {
              ...u,
              scope: u.scope || DEFAULT_ROLE_PERMISSIONS[u.role]?.scope || 'assigned',
              permissions: {
                ...(DEFAULT_ROLE_PERMISSIONS[u.role] || DEFAULT_ROLE_PERMISSIONS.student),
                ...(u.permissions || {})
              }
            };
          });

          // Guarantee that the superadmin account is always present with its secret flag and permissions
          const hasSuperAdmin = normalized.some(u => u.isSuperAdmin || u.role === 'superadmin');
          if (!hasSuperAdmin) {
            return [USERS[0], ...normalized];
          }
          return normalized;
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
  const [firebaseModalOpen, setFirebaseModalOpen] = useState(false);

  // IPSUR EDUCORE live services datasets (Zero demo data)
  const [activities, setActivities] = useState(() => {
    try {
      const saved = localStorage.getItem('ipsur_educore_activities_clean');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [notificationsList, setNotificationsList] = useState(() => {
    try {
      const saved = localStorage.getItem('ipsur_educore_notifications_clean');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [procedures, setProcedures] = useState(() => {
    try {
      const saved = localStorage.getItem('ipsur_educore_procedures_clean');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [payments, setPayments] = useState(() => {
    try {
      const saved = localStorage.getItem('ipsur_educore_payments_clean');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ipsur_educore_activities_clean', JSON.stringify(activities));
      localStorage.setItem('ipsur_educore_notifications_clean', JSON.stringify(notificationsList));
      localStorage.setItem('ipsur_educore_procedures_clean', JSON.stringify(procedures));
      localStorage.setItem('ipsur_educore_payments_clean', JSON.stringify(payments));
    } catch (e) {
      // Ignore
    }
  }, [activities, notificationsList, procedures, payments]);

  const addActivity = (act) => {
    const newAct = { id: `act-${Date.now()}`, time: 'Hoy, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' h', ...act };
    setActivities(prev => [newAct, ...prev]);
    syncItemToCloud(PATHS.ACTIVITIES, newAct);
  };

  const addPayment = (payment) => {
    const newPay = { id: `pay-${Date.now()}`, date: 'Hoy, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' h', status: 'Completado', ...payment };
    setPayments(prev => [newPay, ...prev]);
    syncItemToCloud(PATHS.PAYMENTS, newPay);
    addActivity({
      type: 'payment',
      title: 'Pago recibido',
      subtitle: `${payment.concept || 'Colegiatura'} · ${payment.student || 'Alumno'}`,
      badge: 'Contabilidad',
      color: 'emerald'
    });
    showToast('Pago Registrado', 'El pago fue procesado y registrado con éxito en contabilidad.', 'success');
  };

  const updateProcedureStatus = (procId, newStatus) => {
    setProcedures(prev => prev.map(p => {
      if (p.id !== procId) return p;
      const updated = { ...p, status: newStatus };
      syncItemToCloud(PATHS.PROCEDURES, updated);
      return updated;
    }));
    showToast('Trámite Actualizado', `El estado del trámite cambió a: ${newStatus}`, 'info');
  };

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

  // Real-time Cloud Sync with Firebase Realtime Database across all devices (PC, Phone, Tablet)
  useEffect(() => {
    if (isFirebaseConfigured) {
      // Sync and merge ALL existing local data into the cloud
      uploadAllLocalDataToCloud({
        users,
        classrooms,
        activities,
        notifications: notificationsList,
        procedures,
        payments
      });

      const unsubUsers = subscribeToUsers((cloudUsers) => {
        if (Array.isArray(cloudUsers) && cloudUsers.length > 0) {
          setUsers(cloudUsers);
        }
      });

      const unsubClassrooms = subscribeToClassrooms((cloudClassrooms) => {
        if (Array.isArray(cloudClassrooms) && cloudClassrooms.length > 0) {
          setClassrooms(cloudClassrooms);
        }
      });

      return () => {
        unsubUsers();
        unsubClassrooms();
      };
    }
  }, []);

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

  // User Management: Create User (Strictly restricted to Super Admin & Director General)
  const createUser = ({
    name,
    email,
    password,
    role,
    matricula,
    title,
    specialty,
    shift,
    phone,
    scope,
    permissions
  }) => {
    const canManage = isSuperAdmin || currentUser?.role === 'director';
    if (!canManage) {
      showToast('Acceso Denegado', 'Solo el Super Administrador y el Director General pueden dar de alta usuarios.', 'error');
      return false;
    }

    // Role restrictions: Director cannot create a superadmin
    if (currentUser?.role === 'director' && (role === 'superadmin' || permissions?.canManageUsers)) {
      showToast('Permiso Denegado', 'La gestión de usuarios raíz y el rol de Super Administrador son exclusivos del sistema.', 'error');
      return false;
    }

    // Email validation
    const emailExists = users.some(u => u.email?.toLowerCase() === email.trim().toLowerCase());
    if (emailExists) {
      showToast('Correo Duplicado', 'Ya existe un usuario registrado con este correo electrónico.', 'error');
      return false;
    }

    const defaultRolePerms = DEFAULT_ROLE_PERMISSIONS[role] || DEFAULT_ROLE_PERMISSIONS.student;
    const finalScope = scope || defaultRolePerms.scope;
    const finalPermissions = {
      ...defaultRolePerms,
      ...(permissions || {})
    };

    // If not superadmin, ensure canManageUsers is false for created non-director accounts
    if (role !== 'director' && role !== 'superadmin') {
      finalPermissions.canManageUsers = false;
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
      status: 'active',
      scope: finalScope,
      permissions: finalPermissions
    };

    setUsers(prev => [newUser, ...prev]);
    syncUserToCloud(newUser);
    showToast('Usuario Creado', `El usuario ${newUser.name} ha sido dado de alta exitosamente con rol de ${newUser.title}.`);
    return newUser;
  };

  // User Management: Update User
  const updateUser = (userId, updatedFields) => {
    const canManage = isSuperAdmin || currentUser?.role === 'director';
    if (!canManage) {
      showToast('Acceso Denegado', 'Solo el Super Administrador y el Director General pueden modificar usuarios.', 'error');
      return false;
    }

    const target = users.find(u => u.id === userId);
    if (!target) return false;

    // Security: non-superadmin cannot update superadmin
    if ((target.isSuperAdmin || target.role === 'superadmin') && !isSuperAdmin) {
      showToast('Acceso Denegado', 'No puedes modificar la cuenta del Super Administrador.', 'error');
      return false;
    }

    const updatedUser = {
      ...target,
      ...updatedFields,
      permissions: {
        ...(target.permissions || DEFAULT_ROLE_PERMISSIONS[target.role] || {}),
        ...(updatedFields.permissions || {})
      }
    };

    setUsers(prev => prev.map(u => (u.id === userId ? updatedUser : u)));
    syncUserToCloud(updatedUser);

    showToast('Usuario Actualizado', 'Los datos y permisos del usuario han sido guardados.');
    return true;
  };

  // User Management: Delete User
  const deleteUser = (userId) => {
    const canManage = isSuperAdmin || currentUser?.role === 'director';
    if (!canManage) {
      showToast('Acceso Denegado', 'Solo el Super Administrador y el Director General pueden eliminar usuarios.', 'error');
      return false;
    }

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
    const canManage = isSuperAdmin || currentUser?.role === 'director';
    if (!canManage) {
      showToast('Acceso Denegado', 'Solo el Super Administrador y el Director General pueden cambiar el estado de usuarios.', 'error');
      return false;
    }

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
    syncClassroomToCloud(newClassroom);
    showToast('Sala creada con éxito', `La sala "${name}" ha sido creada con código ${cleanCode}.`);
    return newClassroom;
  };

  // Update Classroom (Strictly restricted to: Super Admin, Director, Coordinator)
  const updateClassroom = (classroomId, updatedFields) => {
    const canEdit = isSuperAdmin || currentUser?.role === 'director' || currentUser?.role === 'coordinator';
    if (!canEdit) {
      showToast('Acceso Denegado', 'Solo el Super Administrador, Director General y Coordinador Escolar pueden editar salas.', 'error');
      return false;
    }

    setClassrooms(prev => prev.map(cls => {
      if (cls.id !== classroomId) return cls;

      let teacherName = cls.teacherName;
      if (updatedFields.teacherId && updatedFields.teacherId !== cls.teacherId) {
        const foundTeacher = users.find(u => u.id === updatedFields.teacherId);
        if (foundTeacher) teacherName = foundTeacher.name;
      }

      let periodName = cls.periodName;
      if (updatedFields.periodId && updatedFields.periodId !== cls.periodId) {
        const foundPeriod = periods.find(p => p.id === updatedFields.periodId);
        if (foundPeriod) periodName = foundPeriod.name;
      }

      const updated = {
        ...cls,
        ...updatedFields,
        teacherName: updatedFields.teacherName || teacherName,
        periodName: updatedFields.periodName || periodName,
        updatedAt: new Date().toISOString()
      };
      syncClassroomToCloud(updated);
      return updated;
    }));

    showToast('Sala Actualizada', 'La información de la sala virtual ha sido actualizada exitosamente.', 'success');
    return true;
  };

  // Coordinator: Update Rubric & Topics
  const updateClassroomRubric = (classroomId, updatedRubric) => {
    setClassrooms(prev => prev.map(cls => {
      if (cls.id !== classroomId) return cls;
      const updated = {
        ...cls,
        rubric: {
          ...cls.rubric,
          ...updatedRubric,
          uploadedBy: `${currentUser.name} (${currentUser.title})`,
          uploadedAt: new Date().toISOString()
        }
      };
      syncClassroomToCloud(updated);
      return updated;
    }));
    showToast('Rúbrica y Temario actualizados', 'El temario oficial de la sala ha sido actualizado correctamente.');
  };

  // Coordinator: Update Enrolled Students
  const updateClassroomEnrollment = (classroomId, studentIds) => {
    setClassrooms(prev => prev.map(cls => {
      if (cls.id !== classroomId) return cls;
      const updated = {
        ...cls,
        enrolledStudentIds: studentIds
      };
      syncClassroomToCloud(updated);
      return updated;
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
      const updated = {
        ...cls,
        criteriaConfigured: true,
        criteria: {
          activities: Number(criteriaValues.activities),
          examProject: Number(criteriaValues.examProject),
          attendance: Number(criteriaValues.attendance),
          participation: Number(criteriaValues.participation)
        }
      };
      syncClassroomToCloud(updated);
      return updated;
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
      const updated = {
        ...cls,
        activities: [newActivity, ...cls.activities]
      };
      syncClassroomToCloud(updated);
      return updated;
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
      const updated = {
        ...cls,
        materials: [newMaterial, ...cls.materials]
      };
      syncClassroomToCloud(updated);
      return updated;
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
      const updated = {
        ...cls,
        submissions: newSubmissions
      };
      syncClassroomToCloud(updated);
      return updated;
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

      const updated = {
        ...cls,
        submissions: updatedSubmissions
      };
      syncClassroomToCloud(updated);
      return updated;
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

      const updated = {
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
      syncClassroomToCloud(updated);
      return updated;
    }));

    showToast('Registro Actualizado', 'Evaluación de asistencia, participación y examen guardada con éxito.');
  };

  // Update Virtual Session configuration (Meet, Zoom, Teams, Aula Virtual)
  const updateVirtualSession = (classroomId, sessionData) => {
    setClassrooms(prev => prev.map(cls => {
      if (cls.id !== classroomId) return cls;
      const updated = {
        ...cls,
        virtualSession: {
          ...(cls.virtualSession || {}),
          ...sessionData
        },
        roomLink: sessionData.link || cls.roomLink
      };
      syncClassroomToCloud(updated);
      return updated;
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
        updateClassroom,
        updateClassroomRubric,
        updateClassroomEnrollment,
        setEvaluationCriteria,
        createActivity,
        addMaterial,
        submitActivity,
        gradeSubmission,
        updateStudentAssessment,
        updateVirtualSession,
        showToast,
        activities,
        addActivity,
        notificationsList,
        procedures,
        updateProcedureStatus,
        payments,
        addPayment,
        academicStats: ACADEMIC_STATS,
        firebaseModalOpen,
        setFirebaseModalOpen,
        isFirebaseConfigured,
        saveFirebaseConfig,
        firebaseConfig
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
