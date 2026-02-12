
import React, { useState } from 'react';
import { auth, db } from '../firebase';

interface SignupProps {
  onComplete: () => void;
  onBack: () => void;
  onLogin: () => void;
}

export const Signup: React.FC<SignupProps> = ({ onComplete, onBack, onLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    businessType: 'Startup / Tech Innovante'
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(formData.email, formData.password);
      const user = userCredential.user;
      if (user) {
        await user.updateProfile({ displayName: formData.name });
        await db.collection("users").doc(user.uid).set({
          profile: {
            fullName: formData.name,
            email: formData.email,
            businessType: formData.businessType,
            createdAt: new Date().toISOString()
          },
          uid: user.uid
        });
      }
      onComplete();
    } catch (err: any) {
      setError(err.message || "Échec de l'inscription.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center py-16 px-4 bg-white selection:bg-red-100">
      <div className="w-full max-w-xl text-center">
        <button onClick={onBack} className="text-slate-400 font-black text-[10px] uppercase tracking-[0.3em] mb-12 hover:text-red-700 transition flex items-center justify-center gap-2 mx-auto">
          <i className="fas fa-arrow-left text-[8px]"></i> Annuler l'Enrôlement
        </button>
        <h2 className="text-5xl font-black text-slate-900 mb-4 tracking-tighter font-display uppercase">Enregistrer Portfolio</h2>
        <p className="text-slate-500 font-medium mb-12">Institutionnalisez votre entreprise tunisienne avec GuidePro</p>
        <div className="bg-white p-10 sm:p-16 rounded-[3.5rem] shadow-3xl border border-slate-100 text-left">
          <form className="space-y-8" onSubmit={handleSubmit}>
            {error && <div className="p-4 bg-red-50 text-red-700 text-[10px] font-bold rounded-xl border border-red-100 uppercase tracking-widest">{error}</div>}
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 px-1">Nom Légal Complet</label>
              <input required type="text" className="w-full p-5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-red-700 transition font-bold text-slate-900" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Mohamed Ben Ali" />
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 px-1">Email Institutionnel</label>
              <input required type="email" className="w-full p-5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-red-700 transition font-bold text-slate-900" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="mohamed@entreprise.tn" />
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 px-1">Jeton d'Accès (Mot de passe)</label>
              <input required type="password" minLength={6} className="w-full p-5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-red-700 transition font-bold text-slate-900" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} placeholder="••••••••" />
            </div>
            <button type="submit" disabled={isLoading} className="w-full bg-red-700 text-white py-5 rounded-xl font-bold text-sm uppercase tracking-[0.25em] hover:bg-red-800 transition shadow-2xl shadow-red-900/10 active:scale-[0.98]">
              {isLoading ? <i className="fas fa-circle-notch fa-spin"></i> : 'Compléter l\'Enrôlement'}
            </button>
          </form>
          <div className="mt-12 pt-10 border-t border-slate-50 text-center">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Déjà enregistré ? <button onClick={onLogin} className="text-red-700 font-black hover:underline ml-2">Authentifier</button></p>
          </div>
        </div>
      </div>
    </div>
  );
};
