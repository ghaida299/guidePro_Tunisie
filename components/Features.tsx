
import React from 'react';

interface FeaturesProps {
  onStart: () => void;
}

export const Features: React.FC<FeaturesProps> = ({ onStart }) => {
  const capabilities = [
    {
      title: "Cartographie Procédurale Intelligente",
      desc: "Notre moteur interprète les spécificités régionales des 24 gouvernorats pour générer une feuille de route sur mesure.",
      icon: "fa-diagram-successor",
      tag: "Moteur"
    },
    {
      title: "Cadre Juridique Multilingue",
      desc: "Traductions adaptées au contexte du jargon législatif tunisien en arabe, français et anglais exécutif.",
      icon: "fa-globe",
      tag: "Traduction"
    },
    {
      title: "Technologie de Coffre-fort de Conformité",
      desc: "Stockage crypté AES-256 optimisé spécifiquement pour les statuts RNE, les décrets du JORT et la gestion de l'identifiant fiscal.",
      icon: "fa-shield-halved",
      tag: "Sécurité"
    },
    {
      title: "Synchronisation Réglementaire en Temps Réel",
      desc: "Notifications instantanées sur les amendements du Code de commerce tunisien et les mises à jour d'éligibilité au Startup Act.",
      icon: "fa-bolt-lightning",
      tag: "Données Live"
    },
    {
      title: "Pont Institutionnel",
      desc: "Pistes d'intégration directe pour l'immatriculation à la CNSS, les dépôts au Ministère des Finances et les liens vers les portails API.",
      icon: "fa-landmark-dome",
      tag: "Gouvernance"
    },
    {
      title: "Automatisation du Cycle de Vie des Documents",
      desc: "Génération dynamique de 'Statuts' et de 'Contrats de travail' validés selon les normes 2024.",
      icon: "fa-file-signature",
      tag: "Automatisation"
    }
  ];

  return (
    <div className="bg-white selection:bg-red-50">
      {/* Platform Header */}
      <section className="bg-slate-900 text-white pt-24 pb-32 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-900/30 border border-red-800 text-red-400 text-[9px] font-bold uppercase tracking-[0.2em] mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
            Infrastructure Opérationnelle
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-8 font-display tracking-tight text-balance">
            La Colonne Vertébrale Numérique de <br />
            <span className="text-red-600">la Conformité Tunisienne.</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-12 font-medium">
            GuidePro orchestre tout le cycle de vie de l'administration des affaires, transformant la complexité institutionnelle en un parcours d'exécution simplifié.
          </p>
          <div className="flex justify-center gap-4">
             <button onClick={onStart} className="bg-red-700 hover:bg-red-600 text-white px-10 py-4 rounded-lg font-bold text-sm uppercase tracking-widest transition shadow-2xl shadow-red-900/20">
               Initialiser la Plateforme
             </button>
          </div>
        </div>
        {/* Abstract Background */}
        <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
           <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-600 via-transparent to-transparent"></div>
        </div>
      </section>

      {/* Capabilities Grid */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-24">
           <h2 className="text-3xl font-black text-slate-900 font-display uppercase tracking-tight mb-4">Capacités Fondamentales</h2>
           <p className="text-slate-500 font-medium">Les fondations technologiques au service de votre autonomie administrative.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {capabilities.map((f, i) => (
            <div key={i} className="group card-pro p-10 rounded-[2rem] border-l-4 border-l-transparent hover:border-l-red-700">
              <div className="flex justify-between items-start mb-10">
                 <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-slate-900 text-xl group-hover:bg-red-700 group-hover:text-white transition-all duration-500">
                    <i className={`fas ${f.icon}`}></i>
                 </div>
                 <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{f.tag}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4 font-display uppercase tracking-tight group-hover:text-red-700 transition-colors">{f.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Compliance Module Breakdown */}
      <section className="py-32 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-1/2">
              <div className="text-red-700 font-bold uppercase tracking-[0.3em] text-[10px] mb-4">Intégration de Module</div>
              <h2 className="text-4xl font-black text-slate-900 font-display mb-8 tracking-tight uppercase">Des Institutions <br />Connectées.</h2>
              <div className="space-y-6">
                {[
                  { title: "RNE (Registre National des Entreprises)", desc: "Cartographie directe pour la vérification du statut juridique et les demandes d'extraits numériques.", color: "bg-red-100 text-red-700" },
                  { title: "CNSS & Conformité Sociale", desc: "Suivi automatisé pour l'immatriculation de l'employeur et les déclarations trimestrielles.", color: "bg-red-100 text-red-700" },
                  { title: "Portail du Ministère des Finances", desc: "Passerelle numérique pour l'identifiant fiscal et l'état de conformité fiscale.", color: "bg-red-100 text-red-700" }
                ].map((item, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 flex items-center gap-6 group hover:border-red-300 transition-all">
                    <div className={`w-12 h-12 ${item.color} rounded-full flex items-center justify-center flex-shrink-0 font-black font-display`}>0{idx+1}</div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm uppercase tracking-tight">{item.title}</h4>
                      <p className="text-slate-500 text-xs font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 relative">
               <div className="bg-white p-4 rounded-[3rem] shadow-2xl border border-slate-200 overflow-hidden transform rotate-2">
                  <img 
                    src="https://images.unsplash.com/photo-1551288049-bbbda50d14aba?q=80&w=2070&auto=format&fit=crop" 
                    className="rounded-2xl" 
                    alt="Analyses et structure" 
                  />
               </div>
               <div className="absolute -bottom-6 -left-6 bg-red-700 p-8 rounded-3xl shadow-2xl text-white font-bold hidden md:block border border-red-800">
                 <div className="text-[10px] font-bold text-red-200 uppercase tracking-widest mb-1">État</div>
                 <div className="text-2xl font-black font-display">Sync Active</div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Footer */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 font-display tracking-tight uppercase">Évoluez Sans Friction.</h2>
          <p className="text-lg text-slate-500 mb-12 max-w-2xl mx-auto font-medium">
            Rejoignez le cercle d'élite des entreprises tunisiennes qui exploitent la gouvernance numérique comme un avantage concurrentiel.
          </p>
          <button 
            onClick={onStart}
            className="btn-executive px-16 py-6 rounded-lg text-sm uppercase tracking-[0.2em] hover:bg-red-800 transition-all"
          >
            Lancer le Portfolio
          </button>
        </div>
      </section>
    </div>
  );
};
