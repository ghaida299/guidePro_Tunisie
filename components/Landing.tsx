
import React from 'react';

interface LandingProps {
  onStart: () => void;
  onDemo: () => void;
}

export const Landing: React.FC<LandingProps> = ({ onStart, onDemo }) => {
  return (
    <div className="bg-white selection:bg-red-100">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7 animate-in fade-in slide-in-from-left duration-1000">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-500 text-[9px] font-bold uppercase tracking-[0.2em] mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
              Aide Administrative pour tous
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.05] mb-8 tracking-tighter text-balance font-display">
              Lancez votre <br />
              <span className="text-red-700">Projet en Tunisie</span> <br />
              très simplement.
            </h1>
            <p className="text-lg text-slate-500 mb-12 max-w-xl leading-relaxed font-medium">
              Nous vous aidons à comprendre toutes les étapes pour créer votre entreprise sans stress. Suivez le guide et réussissez.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={onStart}
                className="btn-executive px-12 py-5 rounded-lg text-base flex items-center justify-center gap-3 shadow-xl !bg-red-700 hover:!bg-red-800"
              >
                Commencer mon projet <i className="fas fa-arrow-right text-xs"></i>
              </button>
              <button 
                onClick={onDemo}
                className="bg-white text-slate-900 border border-slate-200 px-12 py-5 rounded-lg font-bold text-base hover:bg-slate-50 transition-all font-display"
              >
                Essayer gratuitement
              </button>
            </div>
          </div>
          
          <div className="lg:col-span-5 relative animate-in fade-in slide-in-from-right duration-1000">
            <div className="card-pro rounded-[2.5rem] overflow-hidden p-3 bg-white shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop" 
                alt="Bureau Moderne"
                className="w-full aspect-[4/5] object-cover rounded-[1.8rem]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-32 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              { title: 'Étapes claires', desc: 'Une liste simple de tout ce que vous devez faire, ville par ville.', icon: 'fa-layer-group' },
              { title: 'Dossier sécurisé', desc: 'Gardez tous vos papiers importants au même endroit, en sécurité.', icon: 'fa-fingerprint' },
              { title: 'Toujours à jour', desc: 'Nous vous prévenons dès qu\'une loi change pour vous simplifier la vie.', icon: 'fa-rotate' }
            ].map((f, i) => (
              <div key={i} className="group cursor-default">
                <div className="w-12 h-12 bg-white rounded-xl border border-slate-200 flex items-center justify-center text-slate-900 text-xl mb-6 shadow-sm group-hover:border-red-400 transition-colors">
                  <i className={`fas ${f.icon}`}></i>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 font-display uppercase tracking-tight group-hover:text-red-700 transition-colors">{f.title}</h3>
                <p className="text-slate-500 text-sm font-medium leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
