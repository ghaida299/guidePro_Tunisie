
import React from 'react';
import { AppView } from '../types';
import { auth } from '../firebase';

interface HeaderProps {
  view: AppView;
  setView: (view: AppView) => void;
  hasProjects: boolean;
  isLoggedIn: boolean;
  onLogout: () => void;
  isSyncing?: boolean;
  onStartFree: () => void;
}

export const Header: React.FC<HeaderProps> = ({ view, setView, hasProjects, isLoggedIn, onLogout, isSyncing, onStartFree }) => {
  const user = auth.currentUser;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-header">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={() => setView('landing')}
        >
          <div className="relative flex items-center justify-center">
            <div className="w-8 h-8 bg-red-700 rounded-md rotate-45 transition-transform group-hover:rotate-90 duration-500"></div>
            <span className="absolute text-white font-black text-xs">G</span>
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-900 font-display">
            GUIDEPRO <span className="text-slate-400 font-medium">TUNISIE</span>
          </span>
        </div>
        
        <nav className="flex items-center gap-8">
          <div className="hidden lg:flex items-center gap-8">
            <button onClick={() => setView('features')} className={`text-xs font-bold uppercase tracking-widest transition-colors ${view === 'features' ? 'text-red-700' : 'text-slate-500 hover:text-slate-900'}`}>Outils</button>
            <button onClick={() => setView('resources')} className={`text-xs font-bold uppercase tracking-widest transition-colors ${view === 'resources' ? 'text-red-700' : 'text-slate-500 hover:text-slate-900'}`}>Aide</button>
            {isLoggedIn && hasProjects && (
              <button onClick={() => setView('project-list')} className={`text-xs font-bold uppercase tracking-widest transition-colors ${view === 'project-list' || view === 'dashboard' ? 'text-red-700' : 'text-slate-500 hover:text-slate-900'}`}>Mes Projets</button>
            )}
          </div>
          
          <div className="flex items-center gap-5 border-l border-slate-200 pl-8">
            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setView('profile')} 
                  className={`flex items-center gap-2 group`}
                >
                  <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-[10px] text-slate-900 font-bold border border-slate-200 group-hover:bg-red-700 group-hover:text-white transition-all">
                     {user?.displayName?.charAt(0) || 'U'}
                  </div>
                </button>
                <button onClick={onLogout} className="text-slate-400 hover:text-red-700 transition-colors text-[10px] font-bold uppercase tracking-widest">
                  Sortir
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-6">
                <button onClick={() => setView('login')} className="text-xs font-bold text-slate-500 hover:text-slate-900 uppercase tracking-widest">Entrer</button>
                <button 
                  onClick={onStartFree} 
                  className="btn-executive px-6 py-2.5 rounded text-xs uppercase tracking-widest !bg-red-700 hover:!bg-red-800"
                >
                  Commencer
                </button>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};
