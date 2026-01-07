import React from 'react';
import { Unit, GradeState } from '../types';
import ModuleRow from './ModuleRow';
import { calculateUnitAverage } from '../utils';

interface UnitSectionProps {
  unit: Unit;
  grades: GradeState;
  onChange: (moduleId: string, type: 'cc' | 'tp' | 'td' | 'exam' | 'single', value: string) => void;
}

const UnitSection: React.FC<UnitSectionProps> = ({ unit, grades, onChange }) => {
  const unitAverage = calculateUnitAverage(unit, grades);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-6">
      <div className="bg-slate-50 px-6 py-3 border-b border-slate-200 flex justify-between items-center">
        <div>
          <h3 className="font-semibold text-slate-800">{unit.code} - {unit.name}</h3>
        </div>
        <div className="flex items-center gap-2">
           <span className="text-xs text-slate-500 font-medium uppercase tracking-wide">Moyenne UE</span>
           <span className={`text-base font-bold px-2 py-0.5 rounded ${unitAverage >= 10 ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
             {unitAverage.toFixed(2)}
           </span>
        </div>
      </div>
      <div className="px-6">
        {unit.modules.map(module => (
          <ModuleRow 
            key={module.id} 
            module={module} 
            grades={grades} 
            onChange={onChange} 
          />
        ))}
      </div>
    </div>
  );
};

export default UnitSection;