// Academic Calculations for IPSUR EDUCORE

/**
 * Validates teacher's evaluation criteria.
 * Strict rule: All 4 components must sum up to exactly 100%.
 */
export function validateCriteria(criteria) {
  if (!criteria) {
    return {
      isValid: false,
      total: 0,
      diff: 100,
      message: 'Los porcentajes no han sido configurados.'
    };
  }

  const activities = Number(criteria.activities) || 0;
  const examProject = Number(criteria.examProject) || 0;
  const attendance = Number(criteria.attendance) || 0;
  const participation = Number(criteria.participation) || 0;

  const total = activities + examProject + attendance + participation;
  const diff = 100 - total;

  if (total === 100) {
    return {
      isValid: true,
      total: 100,
      diff: 0,
      message: 'La ponderación suma exactamente el 100%. Criterios listos para asignar actividades.'
    };
  } else if (total < 100) {
    return {
      isValid: false,
      total,
      diff,
      message: `La ponderación actual suma ${total}%. Falta asignar un ${diff}% para alcanzar el 100% reglamentario.`
    };
  } else {
    return {
      isValid: false,
      total,
      diff: Math.abs(diff),
      message: `La ponderación excede el 100% (suma ${total}%). Debes reducir ${Math.abs(diff)}% para continuar.`
    };
  }
}

/**
 * Calculates complete student performance in a classroom
 */
export function calculateStudentGrades(classroom, studentId) {
  if (!classroom) return null;

  const activities = classroom.activities || [];
  const submissions = classroom.submissions || [];
  const studentAssessments = classroom.studentAssessments?.[studentId] || {
    examScore: 0,
    attendanceScore: 100,
    participationScore: 100
  };

  // Find graded submissions for this student
  const studentSubs = submissions.filter(s => s.studentId === studentId);
  const gradedSubs = studentSubs.filter(s => typeof s.grade === 'number' && !isNaN(s.grade));

  let activitiesAvg = 0;
  if (gradedSubs.length > 0) {
    const sum = gradedSubs.reduce((acc, curr) => acc + curr.grade, 0);
    activitiesAvg = Number((sum / gradedSubs.length).toFixed(1));
  }

  const examScore = Number(studentAssessments.examScore) || 0;
  const attendanceScore = Number(studentAssessments.attendanceScore) || 100;
  const participationScore = Number(studentAssessments.participationScore) || 100;

  const criteria = {
    activities: Number(classroom.criteria?.activities) || 0,
    examProject: Number(classroom.criteria?.examProject) || 0,
    attendance: Number(classroom.criteria?.attendance) || 0,
    participation: Number(classroom.criteria?.participation) || 0
  };

  const isConfigured = Boolean(classroom.criteriaConfigured) && (
    (criteria.activities + criteria.examProject + criteria.attendance + criteria.participation) === 100
  );

  let finalAverage = 0;
  let weightedActivities = 0;
  let weightedExam = 0;
  let weightedAttendance = 0;
  let weightedParticipation = 0;

  if (isConfigured) {
    weightedActivities = (activitiesAvg * (criteria.activities / 100));
    weightedExam = (examScore * (criteria.examProject / 100));
    weightedAttendance = (attendanceScore * (criteria.attendance / 100));
    weightedParticipation = (participationScore * (criteria.participation / 100));

    finalAverage = Number((weightedActivities + weightedExam + weightedAttendance + weightedParticipation).toFixed(1));
  }

  // Academic status based on Mexican high school standards (passing grade >= 70)
  let statusText = 'En Curso';
  let statusColor = 'text-indigo-700 bg-indigo-50 border-indigo-200';
  let badgeType = 'info';

  if (!isConfigured) {
    statusText = 'En Configuración Docente';
    statusColor = 'text-blue-700 bg-blue-50 border-blue-200';
    badgeType = 'info';
  } else if (gradedSubs.length === 0 && examScore === 0) {
    statusText = 'En Curso';
    statusColor = 'text-indigo-700 bg-indigo-50 border-indigo-200';
    badgeType = 'info';
  } else if (finalAverage >= 70) {
    statusText = 'Aprobado';
    statusColor = 'text-emerald-700 bg-emerald-50 border-emerald-200';
    badgeType = 'success';
  } else if (finalAverage >= 60) {
    statusText = 'En Riesgo / Regularización';
    statusColor = 'text-amber-700 bg-amber-50 border-amber-200';
    badgeType = 'warning';
  } else {
    statusText = 'No Acreditado';
    statusColor = 'text-rose-700 bg-rose-50 border-rose-200';
    badgeType = 'danger';
  }

  return {
    isConfigured,
    totalActivities: activities.length,
    submittedActivitiesCount: studentSubs.length,
    gradedActivitiesCount: gradedSubs.length,
    activitiesAvg,
    examScore,
    attendanceScore,
    participationScore,
    criteria,
    breakdown: {
      activitiesContribution: Number(weightedActivities.toFixed(1)),
      examContribution: Number(weightedExam.toFixed(1)),
      attendanceContribution: Number(weightedAttendance.toFixed(1)),
      participationContribution: Number(weightedParticipation.toFixed(1)),
    },
    finalAverage,
    statusText,
    statusColor,
    badgeType
  };
}
