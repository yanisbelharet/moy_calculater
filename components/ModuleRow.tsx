import React from 'react';
import { Module, EvaluationMode, GradeState } from '../types';
import { calculateModuleAverage } from '../utils';

interface ModuleRowProps {
  module: Module;
  grades: GradeState;
  onChange: (moduleId: string, type: 'cc' | 'tp' | 'td' | 'exam' | 'single', value: string) => void;
}

const ModuleRow: React.FC<ModuleRowProps> = ({ module, grades, onChange }) => {
  const moduleGrades = grades[module.id] || {};
  const average = calculateModuleAverage(module, grades);
  
  const inputClass = "w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 disabled:bg-slate-50 disabled:text-slate-500 transition-colors";

  return (
    <div className="flex flex-col sm:flex-row sm:items-center py-4 border-b border-slate-100 last:border-0 gap-4">
      {/* Module Info */}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium text-slate-900">{module.name}</h4>
        <div className="flex gap-3 mt-1 text-xs text-slate-500">
          <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600 font-medium">Coeff: {module.coeff}</span>
          <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600 font-medium">Crédits: {module.credits}</span>
        </div>
      </div>

      {/* Inputs */}
      <div className="flex gap-4 items-center">
        {module.mode === EvaluationMode.SPLIT ? (
          <>
            <div className="w-16">
              <label className="block text-xs font-semibold text-slate-500 mb-1">TP (20%)</label>
              <input
                type="number"
                min="0"
                max="20"
                step="0.01"
                value={moduleGrades.tp || ''}
                onChange={(e) => onChange(module.id, 'tp', e.target.value)}
                placeholder="0"
                className={inputClass}
              />
            </div>
            <div className="w-16">
              <label className="block text-xs font-semibold text-slate-500 mb-1">TD (20%)</label>
              <input
                type="number"
                min="0"
                max="20"
                step="0.01"
                value={moduleGrades.td || ''}
                onChange={(e) => onChange(module.id, 'td', e.target.value)}
                placeholder="0"
                className={inputClass}
              />
            </div>
            <div className="w-16">
              <label className="block text-xs font-semibold text-slate-500 mb-1">Examen (60%)</label>
              <input
                type="number"
                min="0"
                max="20"
                step="0.01"
                value={moduleGrades.exam || ''}
                onChange={(e) => onChange(module.id, 'exam', e.target.value)}
                placeholder="0"
                className={inputClass}
              />
            </div>
          </>
        ) : module.mode === EvaluationMode.MIXED ? (
          <>
            <div className="w-20">
              <label className="block text-xs font-semibold text-slate-500 mb-1">TD/TP (40%)</label>
              <input
                type="number"
                min="0"
                max="20"
                step="0.01"
                value={moduleGrades.cc || ''}
                onChange={(e) => onChange(module.id, 'cc', e.target.value)}
                placeholder="0"
                className={inputClass}
              />
            </div>
            <div className="w-20">
              <label className="block text-xs font-semibold text-slate-500 mb-1">Examen (60%)</label>
              <input
                type="number"
                min="0"
                max="20"
                step="0.01"
                value={moduleGrades.exam || ''}
                onChange={(e) => onChange(module.id, 'exam', e.target.value)}
                placeholder="0"
                className={inputClass}
              />
            </div>
          </>
        ) : (
          <div className="w-24">
            <label className="block text-xs font-semibold text-slate-500 mb-1">Note (100%)</label>
            <input
              type="number"
              min="0"
              max="20"
              step="0.01"
              value={moduleGrades.single || ''}
              onChange={(e) => onChange(module.id, 'single', e.target.value)}
              placeholder="0"
              className={inputClass}
            />
          </div>
        )}

        {/* Average Display */}
        <div className="w-16 flex flex-col items-end justify-center">
           <label className="block text-xs font-semibold text-slate-400 mb-1 uppercase tracking-wider">Moy.</label>
           <span className={`text-lg font-bold ${average >= 10 ? 'text-emerald-600' : 'text-rose-500'}`}>
             {average.toFixed(2)}
           </span>
        </div>
      </div>
    </div>
  );
};

export default ModuleRow;