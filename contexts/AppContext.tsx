import React, { createContext, useState, useEffect, useCallback, useMemo } from 'react';
import type { User, View, ModalType } from '../types';

interface AppContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
  currentView: View;
  setView: (view: View) => void;
  modal: ModalType;
  openModal: (type: ModalType, data?: any) => void;
  closeModal: () => void;
  modalData: any;
  isChatbotOpen: boolean;
  setIsChatbotOpen: (isOpen: boolean) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<View>('home');
  const [modal, setModal] = useState<ModalType>(null);
  const [modalData, setModalData] = useState<any>(null);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  useEffect(() => {
    try {
        const storedUser = localStorage.getItem('zen-mind-user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    } catch (error) {
        console.error("Failed to parse user from localStorage", error);
        localStorage.removeItem('zen-mind-user');
    }
  }, []);
  
  const updateUser = useCallback((userData: Partial<User>) => {
      setUser(prevUser => {
          const newUser = { ...prevUser, ...userData } as User;
          localStorage.setItem('zen-mind-user', JSON.stringify(newUser));
          return newUser;
      });
  }, []);

  const login = useCallback((userData: User) => {
    localStorage.setItem('zen-mind-user', JSON.stringify(userData));
    setUser(userData);
    closeModal();
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('zen-mind-user');
    setUser(null);
  }, []);

  const setView = useCallback((view: View) => {
    setCurrentView(view);
  }, []);

  const openModal = useCallback((type: ModalType, data: any = null) => {
    setModal(type);
    setModalData(data);
  }, []);

  const closeModal = useCallback(() => {
    setModal(null);
    setModalData(null);
  }, []);

  const contextValue = useMemo(() => ({
    user,
    login,
    logout,
    updateUser,
    currentView,
    setView,
    modal,
    openModal,
    closeModal,
    modalData,
    isChatbotOpen,
    setIsChatbotOpen,
  }), [user, login, logout, updateUser, currentView, setView, modal, openModal, closeModal, modalData, isChatbotOpen, setIsChatbotOpen]);

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};