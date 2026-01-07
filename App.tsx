import React, { useState, useMemo } from 'react';
import { CURRICULUM } from './constants';
import UnitSection from './components/UnitSection';
import Summary from './components/Summary';
import { GradeState } from './types';
import { calculateSemesterAverage } from './utils';
import { Calculator, BookOpen, AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  const [grades, setGrades] = useState<GradeState>({});

  const handleGradeChange = (moduleId: string, type: 'cc' | 'tp' | 'td' | 'exam' | 'single', value: string) => {
    // Basic input validation
    if (value !== '' && (isNaN(parseFloat(value)) || parseFloat(value) < 0 || parseFloat(value) > 20)) {
        return; 
    }

    setGrades(prev => ({
      ...prev,
      [moduleId]: {
        ...prev[moduleId],
        [type]: value
      }
    }));
  };

  const results = useMemo(() => calculateSemesterAverage(CURRICULUM, grades), [grades]);

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <header className="bg-indigo-600 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calculator className="h-6 w-6 text-indigo-200" />
            <h1 className="text-xl font-bold tracking-tight">Master IA Calculator</h1>
          </div>
          <div className="text-xs sm:text-sm font-medium text-indigo-200 bg-indigo-700 px-3 py-1 rounded-full">
            Semestre 1
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Verification Info Panel */}
        <div className="mb-8 bg-white border-l-4 border-indigo-500 p-4 rounded-r-lg shadow-sm flex items-start gap-3">
             <AlertCircle className="w-5 h-5 text-indigo-500 mt-0.5 shrink-0" />
             <div>
                <h3 className="text-sm font-bold text-indigo-900 mb-1">Configuration des Modules</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                    Les modules "Bases de données avancées" et "Réseaux avancés" sont configurés en mode 
                    <span className="font-semibold text-slate-800 mx-1">20% TP, 20% TD, 60% Examen</span>. 
                    Les autres modules suivent le régime standard (40% CC / 60% Examen).
                </p>
             </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Content - Modules List */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center gap-2 mb-4 text-slate-700">
                <BookOpen className="w-5 h-5" />
                <h2 className="text-lg font-semibold">Unités d'Enseignement</h2>
            </div>
            
            {CURRICULUM.map(unit => (
              <UnitSection 
                key={unit.id} 
                unit={unit} 
                grades={grades} 
                onChange={handleGradeChange} 
              />
            ))}
          </div>

          {/* Sidebar - Summary */}
          <div className="lg:col-span-4">
             <Summary 
                average={results.average}
                totalCoeffs={results.totalCoeffs}
                gainedCredits={results.gainedCredits}
                totalCredits={results.totalCredits}
             />
          </div>

        </div>
      </main>
    </div>
  );
};

export default App;