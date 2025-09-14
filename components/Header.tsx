import React from 'react';
import { useAppContext } from '../hooks/useAppContext';

const NavLink: React.FC<{
  onClick: () => void;
  isActive: boolean;
  children: React.ReactNode;
}> = ({ onClick, isActive, children }) => (
  <button
    onClick={onClick}
    className={`px-3 py-2 text-md font-bold transition-colors duration-200 ${
      isActive
        ? 'text-primary'
        : 'text-foreground hover:text-primary'
    }`}
  >
    {children}
  </button>
);

const Header: React.FC = () => {
  const { user, logout, setView, currentView, openModal, setIsChatbotOpen } = useAppContext();

  return (
    <header className="sticky top-0 z-30 w-full bg-background border-b-4 border-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <button onClick={() => setView('home')} className="flex-shrink-0 flex items-center gap-2">
              <span className="text-3xl font-extrabold text-foreground">zen mind</span>
            </button>
          </div>
          <nav className="hidden md:flex md:space-x-4">
            <NavLink onClick={() => setView('home')} isActive={currentView === 'home'}>Home</NavLink>
            <NavLink onClick={() => setView('therapists')} isActive={currentView === 'therapists'}>Our Team</NavLink>
          </nav>
          <div className="flex items-center space-x-3">
             {user?.email ? (
              <div className="flex items-center space-x-3">
                <span className="text-md font-bold text-foreground hidden sm:block">Hi, {user.name}</span>
                <button
                  onClick={logout}
                  className="px-4 py-2 rounded-md text-sm font-bold border-2 border-foreground shadow-neubrutalist-sm bg-secondary hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-transform"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                 <button
                  onClick={() => openModal('login')}
                  className="hidden sm:block px-4 py-2 text-md font-bold"
                >
                  Login
                </button>
                <button
                  onClick={() => setIsChatbotOpen(true)}
                  className="px-5 py-3 rounded-lg text-md font-bold bg-primary text-background border-2 border-foreground shadow-neubrutalist-sm hover:-translate-x-1 hover:-translate-y-1 hover:shadow-neubrutalist transition-all"
                >
                  Get Started
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;