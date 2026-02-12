
export type BusinessType = 'Startup' | 'SME' | 'Individual';

export type WizardData = {
  procedure: string;
  sector: string;
  location: string;
  legalStatus: string;
};

export type ItemStatus = 'todo' | 'doing' | 'done';

export interface DriveFile {
  id: string;
  name: string;
  webViewLink: string;
  mimeType: string;
}

export interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  status: ItemStatus;
  requiredDocuments: string[];
  documents: DriveFile[]; 
  links: { label: string; url: string }[];
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  targetDate?: string;
  data: WizardData;
  items: ChecklistItem[];
  createdAt: number;
  lastUpdated?: string;
}

export interface UserDocument {
  uid: string;
  profile: {
    fullName: string;
    email: string;
    phoneNumber?: string;
    createdAt: string;
  };
  lastActiveProjectId?: string;
}

export type AppView = 'landing' | 'wizard' | 'dashboard' | 'project-list' | 'resources' | 'contact' | 'features' | 'about' | 'login' | 'signup' | 'profile';
