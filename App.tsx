
import React, { useState, useEffect, useRef, useMemo } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { auth, db } from './firebase';
import { Landing } from './components/Landing';
import { Wizard } from './components/Wizard';
import { Dashboard } from './components/Dashboard';
import { ProjectList } from './components/ProjectList';
import { Header } from './components/Header';
import { LegalResources } from './components/LegalResources';
import { Contact } from './components/Contact';
import { Features } from './components/Features';
import { About } from './components/About';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { Profile } from './components/Profile';
import { AppView, WizardData, Project, ChecklistItem } from './types';
import { GoogleGenAI, Type } from "@google/genai";

const getDynamicChecklistWithGemini = async (data: WizardData): Promise<ChecklistItem[]> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = `Vous êtes un conseiller pour les entreprises en Tunisie. Créez une liste d'étapes simples pour un créateur d'entreprise. 
  Utilisez des mots très simples et clairs en français.
  
  Détails :
  - Ce qu'il veut faire : ${data.procedure}
  - Son domaine : ${data.sector}
  - Où : ${data.location}
  - Type de société : ${data.legalStatus}
  
  Instructions :
  - Donnez 5 à 7 étapes faciles.
  - Parlez des bureaux officiels (RNE, Impôts, CNSS).
  - Listez les papiers nécessaires pour chaque étape.
  - Donnez des noms simples pour les sites web officiels.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              longDescription: { type: Type.STRING },
              requiredDocuments: { type: Type.ARRAY, items: { type: Type.STRING } },
              links: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    label: { type: Type.STRING },
                    url: { type: Type.STRING }
                  },
                  required: ["label", "url"]
                }
              }
            },
            required: ["title", "description", "longDescription", "requiredDocuments", "links"]
          }
        }
      }
    });

    const text = response.text || "[]";
    const items = JSON.parse(text);
    return items.map((item: any, index: number) => ({
      ...item,
      id: `step-${index}-${Date.now()}`,
      status: 'todo',
      documents: []
    }));
  } catch (error) {
    console.error("Erreur Gemini :", error);
    return [];
  }
};

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('landing');
  const [user, setUser] = useState<firebase.User | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [authInitialized, setAuthInitialized] = useState(false);
  const [syncError, setSyncError] = useState<string | null>(null);
  
  const creatingRef = useRef(false);

  const activeProject = useMemo(() => {
    return projects.find(p => p.id === activeProjectId) || null;
  }, [projects, activeProjectId]);

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
      setAuthInitialized(true);
    });
    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (!user) {
      setProjects([]);
      return;
    }

    const projectsRef = db.collection("users").doc(user.uid).collection("projects");
    const unsubscribeProjects = projectsRef.orderBy("createdAt", "desc").onSnapshot((snapshot) => {
      const projectData: Project[] = [];
      snapshot.forEach((doc) => {
        projectData.push({ id: doc.id, ...doc.data() } as Project);
      });
      setProjects(projectData);
    }, (err) => {
      setSyncError("Problème d'accès à vos données.");
    });
    
    return () => unsubscribeProjects();
  }, [user?.uid]);

  const handleWizardComplete = async (data: WizardData, name: string, description?: string, targetDate?: string) => {
    if (creatingRef.current) return;
    creatingRef.current = true;
    setIsSyncing(true);
    
    const items = await getDynamicChecklistWithGemini(data);
    const projectId = `p_${Date.now()}`;
    const newProject: Project = {
      id: projectId,
      name: name,
      description,
      targetDate,
      data,
      items,
      createdAt: Date.now(),
      lastUpdated: new Date().toISOString()
    };
    
    if (user) {
      try {
        await db.collection("users").doc(user.uid).collection("projects").doc(projectId).set(newProject);
        setActiveProjectId(projectId);
        setView('dashboard');
      } catch (e) {
        setSyncError("Erreur d'enregistrement.");
      } finally {
        setIsSyncing(false);
        creatingRef.current = false;
      }
    } else {
      setProjects(prev => [newProject, ...prev]);
      setActiveProjectId(projectId);
      setView('dashboard');
      setIsSyncing(false);
      creatingRef.current = false;
    }
  };

  const handleUpdateItems = async (newItems: ChecklistItem[]) => {
    if (!activeProject || !user) return;
    setIsSyncing(true);
    try {
      await db.collection("users").doc(user.uid).collection("projects").doc(activeProject.id).update({
        items: newItems,
        lastUpdated: new Date().toISOString()
      });
    } catch (e) {
      setSyncError("Erreur de mise à jour.");
    } finally {
      setIsSyncing(false);
    }
  };

  const renderView = () => {
    if (!authInitialized && view !== 'landing') {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
          <i className="fas fa-circle-notch fa-spin text-4xl text-red-700 mb-4"></i>
        </div>
      );
    }

    switch (view) {
      case 'landing': return <Landing onStart={() => setView(user ? 'project-list' : 'login')} onDemo={() => setView('wizard')} />;
      case 'wizard': return <Wizard onComplete={handleWizardComplete} />;
      case 'project-list': return <ProjectList projects={projects} onSelect={(p) => { setActiveProjectId(p.id); setView('dashboard'); }} onCreateNew={() => setView('wizard')} onDelete={(id) => {}} onDeduplicate={() => {}} />;
      case 'dashboard': 
        return activeProject ? (
          <Dashboard 
            project={activeProject} 
            onUpdateItems={handleUpdateItems} 
            onBackToList={() => setView('project-list')}
            onContact={() => setView('contact')} 
            isSyncing={isSyncing}
            isLoggedIn={!!user}
            onLoginRequest={() => setView('login')}
          />
        ) : <Landing onStart={() => setView('login')} onDemo={() => setView('wizard')} />;
      case 'resources': return <LegalResources />;
      case 'contact': return <Contact onBack={() => setView('landing')} />;
      case 'features': return <Features onStart={() => setView('login')} />;
      case 'login': return <Login onComplete={() => setView('project-list')} onBack={() => setView('landing')} onSignup={() => setView('signup')} />;
      case 'signup': return <Signup onComplete={() => setView('project-list')} onBack={() => setView('landing')} onLogin={() => setView('login')} />;
      case 'profile': return user ? <Profile user={user} onBack={() => setView('project-list')} /> : null;
      default: return <Landing onStart={() => setView('login')} onDemo={() => setView('wizard')} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        view={view} 
        setView={setView} 
        hasProjects={projects.length > 0} 
        isLoggedIn={!!user}
        onLogout={async () => { await auth.signOut(); setView('landing'); }}
        isSyncing={isSyncing}
        onStartFree={() => setView('login')}
      />
      <main className="flex-grow pt-16">
        {renderView()}
      </main>
    </div>
  );
};

export default App;
