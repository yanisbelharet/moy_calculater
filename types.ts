export enum EvaluationMode {
  MIXED = 'MIXED', // 40% CC + 60% Exam
  SPLIT = 'SPLIT', // 20% TP + 20% TD + 60% Exam
  SINGLE = 'SINGLE' // 100% Single Grade
}

export interface Module {
  id: string;
  name: string;
  coeff: number;
  credits: number;
  mode: EvaluationMode;
}

export interface Unit {
  id: string;
  name: string;
  code: string; // e.g., UEF1
  modules: Module[];
}

export interface GradeState {
  [moduleId: string]: {
    cc?: string;
    tp?: string;
    td?: string;
    exam?: string;
    single?: string;
  };
}