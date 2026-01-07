import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Label } from 'recharts';

interface SummaryProps {
  average: number;
  totalCoeffs: number;
  gainedCredits: number;
  totalCredits: number;
}

const Summary: React.FC<SummaryProps> = ({ average, totalCoeffs, gainedCredits, totalCredits }) => {
  const isPassing = average >= 10;
  
  const data = [
    { name: 'Score', value: average },
    { name: 'Remaining', value: 20 - average },
  ];

  const COLORS = isPassing ? ['#10b981', '#e2e8f0'] : ['#f43f5e', '#e2e8f0'];

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 sticky top-6">
      <h2 className="text-xl font-bold text-slate-800 mb-6 border-b border-slate-100 pb-2">Résultat Semestriel</h2>
      
      <div className="flex flex-col items-center justify-center mb-6">
        <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                startAngle={180}
                endAngle={0}
                paddingAngle={0}
                dataKey="value"
                stroke="none"
                >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
                <Label 
                    value={average.toFixed(2)} 
                    position="center" 
                    className="text-3xl font-bold fill-slate-800"
                    dy={-10}
                />
                 <Label 
                    value="/ 20" 
                    position="center" 
                    className="text-xs font-medium fill-slate-400"
                    dy={15}
                />
                </Pie>
            </PieChart>
            </ResponsiveContainer>
        </div>
        
        <div className={`text-center -mt-10 mb-4`}>
            <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wide ${
                isPassing ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
            }`}>
                {isPassing ? 'Admis' : 'Ajourné'}
            </span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
            <span className="text-sm text-slate-600">Total Coefficients</span>
            <span className="font-semibold text-slate-900">{totalCoeffs}</span>
        </div>
        <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
            <span className="text-sm text-slate-600">Crédits acquis</span>
            <span className="font-semibold text-slate-900">
                <span className={gainedCredits === totalCredits ? "text-emerald-600" : ""}>{gainedCredits}</span> / {totalCredits}
            </span>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-indigo-50 rounded-lg border border-indigo-100">
        <p className="text-xs text-indigo-700 leading-relaxed text-center">
            Cette simulation est à titre indicatif. La délibération officielle prend en compte la compensation entre les unités.
        </p>
      </div>
    </div>
  );
};

export default Summary;