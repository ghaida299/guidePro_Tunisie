
import React, { useState } from 'react';
import { WizardData } from '../types';

interface WizardProps {
  onComplete: (data: WizardData, name: string, description?: string, targetDate?: string) => Promise<void>;
}

export const Wizard: React.FC<WizardProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [data, setData] = useState<WizardData>({
    procedure: '',
    sector: '',
    location: '',
    legalStatus: ''
  });

  const nextStep = async () => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      if (isSubmitting) return;
      setIsSubmitting(true);
      try {
        await onComplete(data, projectName, projectDescription, targetDate);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const prevStep = () => {
    if (step > 1 && !isSubmitting) setStep(step - 1);
  };

  const selectOption = (field: keyof WizardData, value: string) => {
    setData({ ...data, [field]: value });
    setTimeout(nextStep, 250);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-xl mx-auto">
            <h3 className="text-3xl font-black text-slate-900 mb-2 text-center tracking-tight font-display uppercase">Votre Objectif</h3>
            <p className="text-slate-500 text-center mb-12 text-sm font-medium">Que voulez-vous faire aujourd'hui ?</p>
            <div className="grid grid-cols-1 gap-3">
              {['Créer mon entreprise', 'Renouveler mes papiers', 'Payer mes impôts', 'Recruter quelqu\'un', 'Fermer mon entreprise'].map(opt => (
                <button 
                  key={opt}
                  onClick={() => selectOption('procedure', opt)}
                  className={`p-6 rounded-xl border-2 text-left transition-all font-bold font-display uppercase tracking-wider text-xs ${data.procedure === opt ? 'border-slate-900 bg-slate-900 text-white shadow-xl' : 'border-slate-100 bg-white text-slate-700 hover:border-slate-300'}`}
                >
                  <div className="flex justify-between items-center">
                    {opt}
                    {data.procedure === opt && <i className="fas fa-check-circle text-[10px]"></i>}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );
      case 2:
        const sectors = [
          'Informatique', 'Agriculture', 'Hôtel & Restaurant', 'Banque', 
          'Transport', 'Usine', 'Santé', 'École',
          'Énergie', 'Maison & Travaux', 'Vente', 'Habit & Mode',
          'Pub & Média', 'Voiture', 'Nature', 'Services'
        ];
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-3xl font-black text-slate-900 mb-2 text-center tracking-tight font-display uppercase">Votre Domaine</h3>
            <p className="text-slate-500 text-center mb-12 text-sm font-medium">Choisissez votre secteur d'activité.</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-5xl mx-auto">
              {sectors.map(opt => (
                <button 
                  key={opt}
                  onClick={() => selectOption('sector', opt)}
                  className={`p-6 rounded-2xl border-2 flex flex-col items-center justify-center min-h-[100px] text-center transition-all ${data.sector === opt ? 'border-emerald-600 bg-emerald-600 text-white shadow-lg' : 'border-slate-100 bg-white hover:border-emerald-200'}`}
                >
                  <span className={`font-black text-[9px] leading-tight uppercase tracking-[0.15em] ${data.sector === opt ? 'text-white' : 'text-slate-600'}`}>{opt}</span>
                </button>
              ))}
            </div>
          </div>
        );
      case 3:
        const governorates = [
          'Tunis', 'Ariana', 'Ben Arous', 'Manouba', 'Nabeul', 'Zaghouan', 
          'Bizerte', 'Béja', 'Jendouba', 'Le Kef', 'Siliana', 'Kairouan', 
          'Kasserine', 'Sidi Bouzid', 'Sousse', 'Monastir', 'Mahdia', 'Sfax', 
          'Gafsa', 'Tozeur', 'Kebili', 'Gabès', 'Médenine', 'Tataouine'
        ];
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-3xl font-black text-slate-900 mb-2 text-center tracking-tight font-display uppercase">Où ?</h3>
            <p className="text-slate-500 text-center mb-12 text-sm font-medium">Dans quelle ville êtes-vous ?</p>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 max-w-5xl mx-auto">
              {governorates.map(opt => (
                <button 
                  key={opt}
                  onClick={() => selectOption('location', opt)}
                  className={`p-3 rounded-xl border-2 text-center transition-all font-black text-[9px] uppercase tracking-[0.1em] ${data.location === opt ? 'bg-emerald-600 text-white border-emerald-600 shadow-md' : 'border-slate-100 bg-white text-slate-500 hover:border-emerald-200'}`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-xl mx-auto">
            <h3 className="text-3xl font-black text-slate-900 mb-2 text-center tracking-tight font-display uppercase">Forme de société</h3>
            <p className="text-slate-500 text-center mb-12 text-sm font-medium">Quel type de société voulez-vous ?</p>
            <div className="grid grid-cols-1 gap-3">
              {['SARL', 'SUARL', 'SAS', 'Auto-Entrepreneur', 'SA', 'Association'].map(opt => (
                <button 
                  key={opt}
                  onClick={() => selectOption('legalStatus', opt)}
                  className={`p-6 rounded-xl border-2 text-left transition-all font-bold font-display uppercase tracking-wider text-xs ${data.legalStatus === opt ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-100 bg-white text-slate-700 hover:border-slate-300'}`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        );
      case 5:
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl mx-auto space-y-10">
            <div className="text-center">
              <h3 className="text-3xl font-black text-slate-900 mb-2 tracking-tight font-display uppercase">Nom de votre projet</h3>
              <p className="text-slate-500 text-sm font-medium">Donnez un nom à votre dossier pour le retrouver plus tard.</p>
            </div>
            
            <div className="space-y-8 bg-slate-50 p-10 rounded-[2.5rem] border border-slate-200/50">
              <div className="space-y-6">
                <div>
                  <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-3">Nom du Projet *</label>
                  <input required type="text" disabled={isSubmitting} placeholder="EX. MA BOUTIQUE TUNIS" className="w-full p-5 bg-white border border-slate-200 rounded-xl outline-none focus:border-slate-900 transition font-bold text-slate-900 text-sm tracking-tight uppercase" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
                </div>
              </div>

              <button 
                disabled={!projectName || isSubmitting}
                onClick={nextStep}
                className={`w-full py-5 rounded-xl font-bold text-xs uppercase tracking-[0.25em] transition-all flex items-center justify-center gap-4 ${(!projectName || isSubmitting) ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'btn-executive shadow-2xl active:scale-[0.98]'}`}
              >
                {isSubmitting ? (
                  <>
                    <i className="fas fa-circle-notch fa-spin"></i>
                    <span>Préparation de votre dossier...</span>
                  </>
                ) : (
                  <>
                    <i className="fas fa-sparkles text-[10px]"></i>
                    <span>Voir les étapes</span>
                  </>
                )}
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <div className="mb-16 flex justify-center gap-3">
        {[1, 2, 3, 4, 5].map(s => (
          <div key={s} className={`h-1.5 rounded-full transition-all duration-700 ${s === step ? 'w-16 bg-slate-900' : 'w-4 bg-slate-100'}`}></div>
        ))}
      </div>

      <div className="bg-white p-8 md:p-16 rounded-[3.5rem] border border-slate-50 relative min-h-[550px] flex flex-col justify-center">
        {renderStep()}
        
        {step > 1 && !isSubmitting && (
          <div className="mt-12 flex justify-center">
            <button onClick={prevStep} className="text-slate-400 font-bold text-[10px] uppercase tracking-widest hover:text-slate-900 transition-colors flex items-center gap-3">
              <i className="fas fa-chevron-left text-[8px]"></i> Retour
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
