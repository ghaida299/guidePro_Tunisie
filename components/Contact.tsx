
import React, { useState } from 'react';

interface ContactProps {
  onBack: () => void;
}

export const Contact: React.FC<ContactProps> = ({ onBack }) => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-[90vh] flex flex-col items-center justify-center px-4 bg-white">
        <div className="bg-white p-16 rounded-[3rem] shadow-3xl border border-slate-50 text-center max-w-xl animate-in zoom-in duration-300">
          <div className="w-24 h-24 bg-red-50 text-red-700 rounded-full flex items-center justify-center text-4xl mx-auto mb-10 border border-red-100">
            <i className="fas fa-check"></i>
          </div>
          <h2 className="text-4xl font-black text-slate-900 mb-6 tracking-tight font-display uppercase">Message Enregistré</h2>
          <p className="text-slate-500 font-medium mb-12 leading-relaxed opacity-80">L'un de nos conseillers institutionnels vous contactera sous 24 heures pour répondre à votre demande.</p>
          <button onClick={onBack} className="bg-red-700 text-white px-12 py-5 rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-red-800 transition shadow-2xl w-full">
            Retour à l'Accueil
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-24 px-6 bg-white selection:bg-red-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <div>
          <div className="text-red-700 font-bold uppercase tracking-[0.3em] text-[10px] mb-4">Communication Directe</div>
          <h1 className="text-6xl font-black text-slate-900 mb-8 tracking-tighter leading-[1.1] font-display uppercase">Parlons <br />Stratégie.</h1>
          <p className="text-lg text-slate-500 font-medium mb-16 leading-relaxed opacity-80 max-w-md">
            Vous avez des questions sur la réglementation des affaires en Tunisie ? Notre équipe est là pour vous aider à naviguer dans la complexité institutionnelle.
          </p>
          
          <div className="space-y-10">
            <div className="flex gap-8 group">
              <div className="w-12 h-12 text-red-700 text-2xl group-hover:scale-110 transition duration-300">
                <i className="fas fa-envelope"></i>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-1 font-display uppercase tracking-tight">Email Institutionnel</h4>
                <p className="text-slate-500 font-medium text-sm">contact@guidepro.tn</p>
              </div>
            </div>
            <div className="flex gap-8 group">
              <div className="w-12 h-12 text-red-700 text-2xl group-hover:scale-110 transition duration-300">
                <i className="fas fa-phone"></i>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-1 font-display uppercase tracking-tight">Ligne de Support</h4>
                <p className="text-slate-500 font-medium text-sm">+216 71 000 000</p>
              </div>
            </div>
            <div className="flex gap-8 group">
              <div className="w-12 h-12 text-red-700 text-2xl group-hover:scale-110 transition duration-300">
                <i className="fas fa-location-dot"></i>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-1 font-display uppercase tracking-tight">Siège Régional</h4>
                <p className="text-slate-500 font-medium text-sm">Avenue Habib Bourguiba, Tunis, Tunisie</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-10 sm:p-16 rounded-[4rem] shadow-3xl border border-slate-50">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 px-1">Nom Légal Complet</label>
                <input required type="text" className="w-full p-5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-red-700 transition font-bold text-slate-900 text-sm" placeholder="Ali Ben Salem" />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 px-1">Email</label>
                <input required type="email" className="w-full p-5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-red-700 transition font-bold text-slate-900 text-sm" placeholder="ali@gmail.com" />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 px-1">Objet Stratégique</label>
              <select className="w-full p-5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-red-700 transition font-bold text-slate-900 text-sm">
                <option>Demande Générale</option>
                <option>Assistance Juridique</option>
                <option>Partenariats Institutionnels</option>
                <option>Support Technique Plateforme</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 px-1">Message Stratégique</label>
              <textarea required rows={5} className="w-full p-5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-red-700 transition h-40 resize-none font-medium text-slate-700 text-sm" placeholder="Décrivez brièvement vos besoins..."></textarea>
            </div>
            <button type="submit" className="w-full bg-red-700 text-white py-5 rounded-xl font-bold text-sm uppercase tracking-[0.25em] hover:bg-red-800 transition shadow-2xl shadow-red-900/10 active:scale-[0.98]">
              Transmettre le Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
