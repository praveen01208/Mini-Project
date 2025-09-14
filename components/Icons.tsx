import React from 'react';

const iconProps = {
  strokeWidth: "2.5",
};

export const SunIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={iconProps.strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
  </svg>
);

export const MoonIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={iconProps.strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
);

export const LogoIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM8.78 16.5c-.78.78-2.05.78-2.83 0s-.78-2.05 0-2.83L8.78 10.84l2.83 2.83-2.83 2.83zm6.44-6.44l-2.83-2.83 2.83-2.83c.78-.78 2.05-.78 2.83 0s.78 2.05 0 2.83L15.22 10.06zM12 14.83l-2.83-2.83 2.83-2.83 2.83 2.83L12 14.83z" />
    </svg>
);

export const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={iconProps.strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

export const ChatIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={iconProps.strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
);

export const SendIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={iconProps.strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        <line x1="22" y1="2" x2="11" y2="13"></line>
        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
    </svg>
);

export const BrainCircuitIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={iconProps.strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a2.5 2.5 0 0 0-2.5 2.5v.5a2.5 2.5 0 0 0 5 0v-.5A2.5 2.5 0 0 0 12 2Z"/>
        <path d="M12 13a2.5 2.5 0 0 0 2.5-2.5v-1a2.5 2.5 0 0 0-5 0v1a2.5 2.5 0 0 0 2.5 2.5Z"/>
        <path d="M5 12.5a2.5 2.5 0 0 0 2.5-2.5v-1a2.5 2.5 0 0 0-5 0v1a2.5 2.5 0 0 0 2.5 2.5Z"/>
        <path d="M19 12.5a2.5 2.5 0 0 0 2.5-2.5v-1a2.5 2.5 0 0 0-5 0v1a2.5 2.5 0 0 0 2.5 2.5Z"/>
        <path d="M12 22a2.5 2.5 0 0 0 2.5-2.5v-.5a2.5 2.5 0 0 0-5 0v.5a2.5 2.5 0 0 0 2.5 2.5Z"/>
        <path d="M5 19.5a2.5 2.5 0 0 0 2.5-2.5v-.5a2.5 2.5 0 0 0-5 0v.5a2.5 2.5 0 0 0 2.5 2.5Z"/>
        <path d="M19 19.5a2.5 2.5 0 0 0 2.5-2.5v-.5a2.5 2.5 0 0 0-5 0v.5a2.5 2.5 0 0 0 2.5 2.5Z"/>
        <path d="M12 13v6.5"/>
        <path d="m9.5 7.5-3 3"/>
        <path d="m14.5 7.5 3 3"/>
        <path d="M5 12.5v4"/>
        <path d="M19 12.5v4"/>
    </svg>
);

export const UsersIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={iconProps.strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
);

export const ShieldCheckIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={iconProps.strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <path d="m9 12 2 2 4-4"/>
    </svg>
);

export const MeditatingPersonIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
        {/* Head */}
        <circle cx="50" cy="30" r="10" />
        {/* Body */}
        <path d="M35 70 C 35 50, 65 50, 65 70 Z" />
        {/* Legs */}
        <path d="M20 90 C 20 70, 50 70, 50 90" />
        <path d="M80 90 C 80 70, 50 70, 50 90" />
         {/* Arms */}
        <path d="M35 55 C 25 55, 25 65, 35 65" />
        <path d="M65 55 C 75 55, 75 65, 65 65" />
    </svg>
);