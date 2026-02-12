
import React from 'react';
import { Project } from '../types';

interface ProjectListProps {
  projects: Project[];
  onSelect: (project: Project) => void;
  onCreateNew: () => void;
  onDelete: (projectId: string) => void;
  onDeduplicate: () => void;
}

export const ProjectList: React.FC<ProjectListProps> = ({ projects, onSelect, onCreateNew, onDelete, onDeduplicate }) => {
  const getProgress = (project: Project) => {
    if (!project.items || project.items.length === 0) return 0;
    const done = project.items.filter(i => i.status === 'done').length;
    return Math.round((done / project.items.length) * 100);
  };

  const handleDeleteClick = (e: React.MouseEvent, project: Project) => {
    e.stopPropagation();
    if (window.confirm(`Voulez-vous supprimer "${project.name}" ?`)) onDelete(project.id);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-20 animate-in fade-in slide-in-from-top-4 duration-700">
        <div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter font-display uppercase">Mes Projets.</h1>
          <p className="text-slate-500 font-medium text-lg mt-4 max-w-lg">Retrouvez ici tous vos projets en cours.</p>
        </div>
        <button 
          onClick={onCreateNew}
          className="btn-executive px-10 py-5 rounded-lg text-sm flex items-center gap-3 uppercase tracking-widest shadow-xl !bg-red-700"
        >
          <i className="fas fa-plus text-xs"></i>
          Nouveau Projet
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.length === 0 ? (
          <div className="col-span-full py-40 flex flex-col items-center text-center opacity-40">
            <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">Aucun projet pour le moment</p>
          </div>
        ) : (
          projects.map(project => (
            <div 
              key={project.id}
              onClick={() => onSelect(project)}
              className="group card-pro rounded-3xl p-8 cursor-pointer flex flex-col h-full bg-white relative overflow-hidden"
            >
              <div className="flex justify-between items-start mb-10">
                <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-900 text-xl border border-slate-100 group-hover:bg-slate-900 group-hover:text-white transition-all duration-500">
                  <i className="fas fa-briefcase"></i>
                </div>
                <button 
                  onClick={(e) => handleDeleteClick(e, project)} 
                  className="text-slate-200 hover:text-red-600 transition-colors"
                >
                  <i className="fas fa-trash text-xs"></i>
                </button>
              </div>

              <div className="flex-grow mb-10">
                <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                  {project.data.location}
                </div>
                <h3 className="text-2xl font-black text-slate-900 font-display tracking-tight group-hover:text-red-700 transition-colors uppercase leading-none">{project.name}</h3>
              </div>

              <div className="pt-8 border-t border-slate-50">
                <div className="flex justify-between items-end mb-3">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Avancement</span>
                  <span className="text-xl font-black text-slate-900 font-display">{getProgress(project)}%</span>
                </div>
                <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-slate-900 transition-all duration-1000 group-hover:bg-red-700" 
                    style={{ width: `${getProgress(project)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
