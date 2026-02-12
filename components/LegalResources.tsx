
import React from 'react';

export const LegalResources: React.FC = () => {
  const resources = [
    { category: 'Lois & Décrets', items: [
      { title: 'Loi sur l\'Investissement 2016-71', desc: 'La loi fondamentale régissant l\'investissement en Tunisie.', icon: 'fa-file-invoice' },
      { title: 'Startup Act 2018-20', desc: 'Incentives spécifiques et cadre juridique pour les startups innovantes.', icon: 'fa-rocket' },
      { title: 'Code Fiscal 2024', desc: 'Dernières mises à jour sur l\'impôt sur les sociétés et le revenu.', icon: 'fa-scale-balanced' }
    ]},
    { category: 'Modèles', items: [
      { title: 'Statuts de SARL', desc: 'Modèle standard pour une société à responsabilité limitée.', icon: 'fa-file-lines' },
      { title: 'Contrat de Travail (CDI/CDD)', desc: 'Contrats types conformes au droit du travail tunisien.', icon: 'fa-handshake-simple' },
      { title: 'Accord de Transfert de PI', desc: 'Protégez vos actifs technologiques.', icon: 'fa-copyright' }
    ]}
  ];

  return (
    <div className="bg-white py-24 px-4 selection:bg-red-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24 animate-in fade-in slide-in-from-top-8 duration-700">
          <div className="text-red-700 font-bold uppercase tracking-[0.3em] text-[9px] mb-4">Bibliothèque de Documentation</div>
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight font-display uppercase">Centre de Ressources Juridiques</h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed font-medium">
            Accédez à notre bibliothèque de documents officiels, de résumés de lois et de modèles adaptés à l'environnement des affaires en Tunisie.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {resources.map((section, idx) => (
            <div key={idx}>
              <h2 className="text-2xl font-black text-slate-900 mb-10 flex items-center gap-4 font-display uppercase tracking-tight">
                <span className="w-8 h-1 bg-red-700 rounded-full"></span>
                {section.category}
              </h2>
              <div className="space-y-6">
                {section.items.map((item, i) => (
                  <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all group hover:border-red-200">
                    <div className="flex items-start gap-6">
                      <div className="w-14 h-14 bg-red-50 text-red-700 rounded-2xl flex items-center justify-center text-2xl group-hover:bg-red-700 group-hover:text-white transition-all duration-300">
                        <i className={`fas ${item.icon}`}></i>
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-bold text-slate-900 text-xl mb-2 font-display uppercase tracking-tight group-hover:text-red-700 transition-colors">{item.title}</h3>
                        <p className="text-slate-500 text-sm mb-6 leading-relaxed font-medium">{item.desc}</p>
                        <button className="text-red-700 font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:underline">
                          <i className="fas fa-download"></i> Télécharger l'Archive
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-24 bg-slate-900 rounded-[3rem] p-16 text-white text-center shadow-2xl relative overflow-hidden border border-slate-800">
          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-black mb-4 font-display uppercase tracking-tight">Vous ne trouvez pas ce que vous cherchez ?</h3>
            <p className="text-slate-400 font-medium mb-10 max-w-xl mx-auto opacity-80">Nos experts juridiques mettent à jour cette base de données chaque semaine en fonction du Journal Officiel de la République Tunisienne (JORT).</p>
            <button className="bg-red-700 text-white px-12 py-5 rounded-xl font-bold text-sm uppercase tracking-[0.2em] hover:bg-red-600 transition shadow-xl">
              Demander une Ressource
            </button>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-700/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
        </div>
      </div>
    </div>
  );
};
