export interface Therapist {
  id: number;
  name: string;
  specialties: string[];
  imageUrl: string;
  bio: string;
  availability: string[];
}

export interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  isCrisis?: boolean;
  options?: { text: string; payload: string }[];
}

export interface User {
  name: string;
  email?: string; // Email is now optional for onboarding
}

export type View = 'home' | 'therapists';

export type ModalType = 'login' | 'register' | 'appointment' | 'crisis' | null;