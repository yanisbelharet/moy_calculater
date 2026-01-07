import { GradeState, Module, EvaluationMode, Unit } from './types';

export const parseGrade = (value: string | undefined): number => {
  if (!value) return 0;
  const parsed = parseFloat(value);
  return isNaN(parsed) ? 0 : Math.max(0, Math.min(20, parsed));
};

export const calculateModuleAverage = (module: Module, grades: GradeState): number => {
  const moduleGrades = grades[module.id];
  if (!moduleGrades) return 0;

  if (module.mode === EvaluationMode.SINGLE) {
    return parseGrade(moduleGrades.single);
  } else if (module.mode === EvaluationMode.SPLIT) {
    const tp = parseGrade(moduleGrades.tp);
    const td = parseGrade(moduleGrades.td);
    const exam = parseGrade(moduleGrades.exam);
    // 20% TP + 20% TD + 60% Exam
    return (tp * 0.2) + (td * 0.2) + (exam * 0.6);
  } else {
    const cc = parseGrade(moduleGrades.cc);
    const exam = parseGrade(moduleGrades.exam);
    // 40% TD/TP (CC) + 60% Examen
    return (cc * 0.4) + (exam * 0.6);
  }
};

export const calculateUnitAverage = (unit: Unit, grades: GradeState): number => {
  let totalPoints = 0;
  let totalCoeffs = 0;

  unit.modules.forEach(module => {
    const avg = calculateModuleAverage(module, grades);
    totalPoints += avg * module.coeff;
    totalCoeffs += module.coeff;
  });

  return totalCoeffs === 0 ? 0 : totalPoints / totalCoeffs;
};

export const calculateSemesterAverage = (units: Unit[], grades: GradeState) => {
  let totalPoints = 0;
  let totalCoeffs = 0;
  let totalCredits = 0;
  let gainedCredits = 0;

  units.forEach(unit => {
    unit.modules.forEach(module => {
      const avg = calculateModuleAverage(module, grades);
      totalPoints += avg * module.coeff;
      totalCoeffs += module.coeff;
      totalCredits += module.credits;
      
      // Simple credit acquisition logic
      if (avg >= 10) {
        gainedCredits += module.credits;
      }
    });
  });

  const average = totalCoeffs === 0 ? 0 : totalPoints / totalCoeffs;

  return {
    average,
    totalCoeffs,
    totalCredits,
    gainedCredits
  };
};