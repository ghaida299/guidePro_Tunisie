
import React from 'react';

interface AboutProps {
  onStart: () => void;
}

export const About: React.FC<AboutProps> = ({ onStart }) => {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="py-24 px-4 max-w-7xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-8">Résoudre pour la <span className="text-red-700">Tunisie.</span></h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Nous sommes une équipe de passionnés de tech et d'experts juridiques basés à Tunis, travaillant à moderniser la façon dont les entreprises interagissent avec l'État.
        </p>
      </section>

      {/* L'Histoire */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <img src="https://picsum.photos/seed/tunis-city/800/1000" className="rounded-[3rem] shadow-2xl grayscale" alt="Scène Startup Tunis" />
            <div className="absolute -bottom-10 -right-10 bg-red-700 p-12 rounded-[3rem] hidden md:block">
              <div className="text-5xl font-bold mb-2">2024</div>
              <div className="text-red-100 uppercase tracking-widest text-sm font-bold">Fondé à Tunis</div>
            </div>
          </div>
          <div>
            <h2 className="text-4xl font-bold mb-8">Notre Histoire</h2>
            <div className="prose prose-invert prose-lg text-slate-400">
              <p className="mb-6">
                Tout a commencé par un constat simple : les entrepreneurs en Tunisie passent jusqu'à 40% de leur temps sur l'administration plutôt que sur l'innovation.
              </p>
              <p className="mb-6">
                De l'enregistrement complexe au RNE aux déclarations fiscales confuses, la « paperasse » était le plus grand obstacle à la croissance. Nous avons décidé d'y remédier.
              </p>
              <p className="mb-8">
                GuidePro a été conçu pour traduire le paysage juridique dense de la Tunisie en une expérience claire, exploitable et axée sur le numérique.
              </p>
            </div>
            <div className="flex gap-8">
               <div>
                  <div className="text-3xl font-bold text-white mb-1">500+</div>
                  <div className="text-slate-500 text-sm">Fondateurs Actifs</div>
               </div>
               <div>
                  <div className="text-3xl font-bold text-white mb-1">120+</div>
                  <div className="text-slate-500 text-sm">Modèles Juridiques</div>
               </div>
               <div>
                  <div className="text-3xl font-bold text-white mb-1">24/7</div>
                  <div className="text-slate-500 text-sm">Surveillance Système</div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 text-slate-900">Ce Qui Nous Anime</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { title: "Transparence", desc: "Aucune règle cachée. Nous cartographions l'ensemble du processus pour que vous sachiez exactement ce qui suit.", icon: "fa-eye" },
            { title: "Tech Localisée", desc: "Construit par des Tunisiens, pour des Tunisiens. Nous comprenons les nuances spécifiques de notre système juridique.", icon: "fa-map-location-dot" },
            { title: "Émancipation", desc: "Notre objectif n'est pas de remplacer les avocats, mais de donner aux fondateurs les moyens de gérer leur propre santé d'entreprise.", icon: "fa-hand-holding-heart" }
          ].map((v, i) => (
            <div key={i} className="bg-slate-50 p-10 rounded-[2rem] border border-slate-100">
              <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center text-red-700 text-2xl mb-6">
                <i className={`fas ${v.icon}`}></i>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">{v.title}</h3>
              <p className="text-slate-600 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 text-center">
        <div className="max-w-4xl mx-auto bg-red-50 p-16 rounded-[3rem] border border-red-100">
          <h2 className="text-4xl font-bold text-slate-900 mb-6">Vous voulez rejoindre la mission ?</h2>
          <p className="text-lg text-slate-600 mb-10">Nous sommes toujours à la recherche de partenaires, d'experts juridiques et de développeurs.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button onClick={onStart} className="bg-red-700 text-white px-8 py-4 rounded-2xl font-bold hover:bg-red-800 transition">Commencer</button>
            <button className="bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-2xl font-bold hover:bg-slate-50 transition">Contactez-nous</button>
          </div>
        </div>
      </section>
    </div>
  );
};
