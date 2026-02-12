
import React, { useState, useRef } from 'react';
import { Project, ChecklistItem, ItemStatus, DriveFile } from '../types';
import { DRIVE_API_CONFIG } from '../config';

interface DashboardProps {
  project: Project;
  onUpdateItems: (items: ChecklistItem[]) => void;
  onBackToList: () => void;
  onContact: () => void;
  isSyncing: boolean;
  isLoggedIn: boolean;
  onLoginRequest: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ project, onUpdateItems, onBackToList }) => {
  const [selectedItem, setSelectedItem] = useState<ChecklistItem | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const calculateProgress = () => {
    if (!project.items || project.items.length === 0) return 0;
    const doneCount = project.items.filter(i => i.status === 'done').length;
    return Math.round((doneCount / project.items.length) * 100);
  };

  const toggleStatus = (id: string) => {
    const newItems = project.items.map(item => {
      if (item.id === id) {
        return { ...item, status: (item.status === 'done' ? 'todo' : 'done') as ItemStatus };
      }
      return item;
    });
    onUpdateItems(newItems);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !selectedItem) return;

    setIsUploading(true);
    setUploadError(null);
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('targetFolderId', DRIVE_API_CONFIG.TARGET_FOLDER_ID);

      const response = await fetch(DRIVE_API_CONFIG.UPLOAD_ENDPOINT, {
        method: 'POST',
        body: formData,
      }).catch(() => {
        throw new Error("Erreur de connexion.");
      });

      if (!response.ok) {
        throw new Error(`Envoi impossible`);
      }

      const driveFile: DriveFile = await response.json();
      updateProjectWithFile(driveFile);

    } catch (error: any) {
      setUploadError(error.message);
      setIsUploading(false);
    }
  };

  const updateProjectWithFile = (driveFile: DriveFile) => {
    const newItems = project.items.map(item => {
      if (item.id === selectedItem?.id) {
        return {
          ...item,
          documents: [...(item.documents || []), driveFile],
          status: 'done' as ItemStatus
        };
      }
      return item;
    });
    onUpdateItems(newItems);
    setSelectedItem(newItems.find(i => i.id === selectedItem?.id) || null);
    setIsUploading(false);
  };

  const progress = calculateProgress();

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-12">
      {/* Top Console */}
      <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-slate-100 pb-12">
        <div>
          <button 
            onClick={onBackToList} 
            className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400 hover:text-red-700 transition-colors mb-4 flex items-center gap-2"
          >
            <i className="fas fa-chevron-left text-[8px]"></i> Mes Projets
          </button>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight font-display mb-2 uppercase">{project.name}</h1>
          <div className="flex items-center gap-4">
             <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded">{project.data.location}</span>
             <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded">{project.data.procedure}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="text-right">
             <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Avancement</div>
             <div className="flex items-center gap-4">
                <span className="text-3xl font-black font-display text-red-700">{progress}%</span>
                <div className="w-32 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                   <div className="h-full bg-red-700 transition-all duration-1000" style={{ width: `${progress}%` }}></div>
                </div>
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Sidebar Analytics */}
        <div className="lg:col-span-4 space-y-6">
           <div className="card-pro rounded-2xl p-8 bg-slate-900 text-white shadow-2xl relative overflow-hidden">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-red-600 mb-8">Infos Projet</h3>
              <div className="space-y-6 relative z-10">
                 {[
                   { l: 'Type de société', v: project.data.legalStatus },
                   { l: 'Domaine', v: project.data.sector },
                   { l: 'Lancé le', v: new Date(project.createdAt).toLocaleDateString('fr-FR') }
                 ].map((stat, i) => (
                   <div key={i} className="border-b border-white/10 pb-4 last:border-0 last:pb-0">
                      <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">{stat.l}</p>
                      <p className="font-bold text-sm tracking-tight">{stat.v}</p>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Action Roadmap */}
        <div className="lg:col-span-8 space-y-3">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-4 px-2">Vos étapes à suivre</div>
          {project.items.map((item, idx) => (
            <div 
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className={`card-pro p-6 rounded-xl flex items-center gap-8 cursor-pointer group hover:bg-slate-50 transition-all ${selectedItem?.id === item.id ? 'border-red-500 ring-4 ring-red-50' : ''}`}
            >
              <div className="text-[10px] font-black text-slate-300 w-6 font-display">
                {idx + 1}
              </div>
              <div 
                onClick={(e) => { e.stopPropagation(); toggleStatus(item.id); }}
                className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${item.status === 'done' ? 'bg-red-700 border-red-700 text-white' : 'border-slate-200 bg-white group-hover:border-red-400'}`}
              >
                {item.status === 'done' && <i className="fas fa-check text-[8px]"></i>}
              </div>
              <div className="flex-grow">
                <h4 className="text-lg font-bold text-slate-900 group-hover:text-red-700 transition-colors font-display tracking-tight uppercase">{item.title}</h4>
                <p className="text-slate-500 text-xs font-medium">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="relative bg-white w-full max-w-5xl rounded-3xl shadow-3xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-10 py-10 flex justify-between items-start border-b border-slate-50">
              <div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight font-display mb-2 uppercase">{selectedItem.title}</h2>
                <p className="text-slate-500 text-sm font-medium">{selectedItem.description}</p>
              </div>
              <button onClick={() => setSelectedItem(null)} className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors border border-slate-100">
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-7 space-y-10">
                <section>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Comment faire ?</h4>
                  <div className="text-sm text-slate-600 leading-relaxed font-medium">
                    {selectedItem.longDescription}
                  </div>
                </section>
                <section className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
                  <h4 className="text-[10px] font-bold text-red-700 uppercase tracking-widest mb-6">Papiers nécessaires</h4>
                  <ul className="space-y-4">
                    {selectedItem.requiredDocuments.map((doc, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-800 font-bold text-xs">
                        <i className="fas fa-file-invoice text-red-300 mt-0.5"></i> {doc}
                      </li>
                    ))}
                  </ul>
                </section>
              </div>

              <div className="lg:col-span-5 bg-slate-900 rounded-3xl p-8 text-white flex flex-col min-h-[400px]">
                <h4 className="text-[10px] font-bold text-red-500 uppercase tracking-widest mb-8">Vos Documents</h4>
                <div className="flex-grow flex flex-col justify-center">
                  {selectedItem.documents?.length > 0 ? (
                    <div className="space-y-3">
                      {selectedItem.documents.map((file, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors cursor-pointer">
                          <div className="flex items-center gap-3">
                            <i className="fas fa-file-pdf text-red-400"></i>
                            <span className="text-xs font-bold truncate max-w-[140px]">{file.name}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center opacity-30">
                      <p className="text-[10px] font-bold uppercase tracking-widest">Aucun fichier ici</p>
                    </div>
                  )}
                </div>
                <div className="mt-10">
                  <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileUpload} />
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="w-full bg-red-700 text-white py-5 rounded-xl font-bold text-sm hover:bg-red-600 transition-all flex items-center justify-center gap-3 uppercase tracking-widest active:scale-[0.98]"
                  >
                    Ajouter un papier
                  </button>
                </div>
              </div>
            </div>

            <div className="px-10 py-8 bg-slate-50 border-t border-slate-100 flex gap-4">
               <button onClick={() => setSelectedItem(null)} className="flex-grow bg-white border border-slate-200 py-4 rounded-xl font-bold text-slate-600 hover:bg-slate-100 text-sm uppercase tracking-widest">Fermer</button>
               <button 
                onClick={() => toggleStatus(selectedItem.id)} 
                className={`px-12 py-4 rounded-xl font-bold text-white transition-all text-sm uppercase tracking-widest ${selectedItem.status === 'done' ? 'bg-emerald-600' : 'bg-red-700 hover:bg-red-800'}`}
               >
                 {selectedItem.status === 'done' ? 'Refaire' : 'Valider l\'étape'}
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
