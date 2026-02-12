
import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import { db } from '../firebase';
import { UserDocument } from '../types';

interface ProfileProps {
  user: firebase.User;
  onBack: () => void;
}

export const Profile: React.FC<ProfileProps> = ({ user, onBack }) => {
  const [userData, setUserData] = useState<UserDocument | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snap = await db.collection("users").doc(user.uid).get();
        if (snap.exists) {
          setUserData(snap.data() as UserDocument);
        } else {
          setError("Profil cloud non trouvé. Synchronisation initiale...");
        }
      } catch (e) {
        console.error("Erreur de récupération de profil :", e);
        setError("Impossible de se connecter au coffre d'identité.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user.uid]);

  const handleSave = async () => {
    if (!userData) return;
    setIsSaving(true);
    setError(null);
    try {
      await db.collection("users").doc(user.uid).update({
        "profile.fullName": userData.profile.fullName,
        "profile.phoneNumber": userData.profile.phoneNumber || ""
      });

      if (userData.profile.fullName !== user.displayName) {
        await user.updateProfile({ displayName: userData.profile.fullName });
      }

      setIsEditing(false);
    } catch (e: any) {
      console.error("Erreur d'enregistrement du profil :", e);
      setError("Échec de la synchronisation des infos personnelles.");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) return (
    <div className="py-20 text-center">
      <i className="fas fa-circle-notch fa-spin text-4xl text-red-700 mb-4"></i>
      <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Accès au Coffre d'Identité...</p>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 selection:bg-red-50">
      <div className="mb-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <button onClick={onBack} className="text-slate-400 font-bold text-[10px] flex items-center gap-2 mb-4 group uppercase tracking-[0.2em] hover:text-red-700 transition-colors">
            <i className="fas fa-arrow-left group-hover:-translate-x-1 transition-transform text-[8px]"></i> Retour au Portfolio
          </button>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight font-display uppercase">Registre d'Identité</h1>
          <p className="text-slate-500 font-medium">Vos identifiants personnels et paramètres institutionnels.</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            disabled={isSaving}
            className={`px-8 py-4 rounded-2xl font-bold transition flex items-center gap-3 shadow-xl text-xs uppercase tracking-widest ${isEditing ? 'bg-emerald-600 text-white' : 'bg-red-700 text-white hover:bg-red-800'}`}
          >
            {isSaving ? <i className="fas fa-circle-notch fa-spin"></i> : <i className={`fas ${isEditing ? 'fa-cloud-arrow-up' : 'fa-edit'}`}></i>}
            {isEditing ? 'Synchronisation...' : 'Modifier l\'Identité'}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[3rem] shadow-3xl border border-slate-100 overflow-hidden">
        <div className="h-40 bg-slate-900 relative">
          <div className="absolute -bottom-14 left-10 w-28 h-28 bg-red-700 rounded-[2.5rem] border-[10px] border-white flex items-center justify-center text-white text-5xl font-black shadow-2xl font-display">
            {userData?.profile.fullName.charAt(0) || user.displayName?.charAt(0) || 'U'}
          </div>
        </div>
        
        <div className="pt-20 pb-12 px-10 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] block mb-3 px-1">Nom Légal Complet</label>
              {isEditing ? (
                <input 
                  className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-red-700 transition font-bold text-slate-900"
                  value={userData?.profile.fullName}
                  onChange={(e) => setUserData(prev => prev ? {...prev, profile: {...prev.profile, fullName: e.target.value}} : null)}
                />
              ) : (
                <p className="text-2xl font-black text-slate-900 p-1 font-display uppercase tracking-tight">{userData?.profile.fullName || 'Utilisateur Enregistré'}</p>
              )}
            </div>
            
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] block mb-3 px-1">Email Synchro</label>
              <p className="font-bold text-slate-500 bg-slate-50 p-4 rounded-2xl border border-slate-100 opacity-60 cursor-not-allowed text-sm">
                {userData?.profile.email}
              </p>
            </div>
            
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] block mb-3 px-1">Lien Téléphonique</label>
              {isEditing ? (
                <input 
                  className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-red-700 transition font-bold text-slate-900"
                  placeholder="+216 -- --- ---"
                  value={userData?.profile.phoneNumber || ""}
                  onChange={(e) => setUserData(prev => prev ? {...prev, profile: {...prev.profile, phoneNumber: e.target.value}} : null)}
                />
              ) : (
                <p className="font-bold text-slate-800 p-1 text-lg">{userData?.profile.phoneNumber || "Aucun téléphone lié"}</p>
              )}
            </div>

            <div className="bg-red-50 p-6 rounded-3xl border border-red-100">
               <div className="flex items-center gap-3 mb-2">
                 <i className="fas fa-shield-check text-red-700"></i>
                 <span className="text-[10px] font-black text-red-900 uppercase tracking-[0.1em]">Protocole de Sécurité</span>
               </div>
               <p className="text-[10px] text-red-800 font-medium leading-relaxed opacity-80 uppercase tracking-wider">
                 Vos feuilles de route professionnelles sont cryptées et stockées dans des silos de projet indépendants pour une conformité de gouvernance maximale.
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
