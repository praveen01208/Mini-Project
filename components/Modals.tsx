import React, { useState, useEffect } from 'react';
import type { Therapist } from '../types';
import { useAppContext } from '../hooks/useAppContext';
import { CloseIcon } from './Icons';

const ModalWrapper: React.FC<{
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}> = ({ title, onClose, children }) => (
  <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
    <div className="bg-background border-4 border-foreground rounded-lg shadow-neubrutalist w-full max-w-md transform transition-transform duration-300" onClick={(e) => e.stopPropagation()}>
      <div className="flex items-center justify-between p-5 border-b-4 border-foreground">
        <h3 className="text-xl font-extrabold text-foreground">{title}</h3>
        <button onClick={onClose} className="p-1 rounded-full text-foreground hover:bg-black/10">
          <CloseIcon className="h-6 w-6" />
        </button>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  </div>
);

const AuthModalContent: React.FC<{ isRegister: boolean }> = ({ isRegister }) => {
    const { login } = useAppContext();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const inputStyles = "mt-1 block w-full px-3 py-3 bg-background border-2 border-foreground rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm";
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isRegister && !name) {
            alert("Please enter your name.");
            return;
        }
        if (!email || !password) {
            alert("Please enter email and password.");
            return;
        }
        login({ name: isRegister ? name : email.split('@')[0], email });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
                <div>
                    <label className="block text-md font-bold text-foreground">Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={inputStyles} placeholder="Your Name" />
                </div>
            )}
            <div>
                <label className="block text-md font-bold text-foreground">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputStyles} placeholder="you@example.com" />
            </div>
            <div>
                <label className="block text-md font-bold text-foreground">Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={inputStyles} placeholder="••••••••" />
            </div>
            <button type="submit" className="w-full flex justify-center py-3 px-4 border-2 border-foreground rounded-lg shadow-neubrutalist-sm text-md font-bold text-background bg-primary hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-neubrutalist transition-all">
                {isRegister ? 'Create Account' : 'Sign In'}
            </button>
        </form>
    );
};

const AppointmentModalContent: React.FC<{ therapist: Therapist }> = ({ therapist }) => {
    const { closeModal } = useAppContext();
    const [selectedSlot, setSelectedSlot] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedSlot) {
            alert("Please select an available time slot.");
            return;
        }
        alert(`Appointment booked with ${therapist.name} for ${selectedSlot}. A confirmation has been sent to your email.`);
        closeModal();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center space-x-4">
                <img src={therapist.imageUrl} alt={therapist.name} className="h-20 w-20 rounded-lg object-cover border-2 border-foreground" />
                <div>
                    <h4 className="text-xl font-bold text-foreground">{therapist.name}</h4>
                    <p className="text-sm text-black/70">{therapist.specialties.join(', ')}</p>
                </div>
            </div>
            <div>
                <label className="block text-md font-bold text-foreground">Select a time slot</label>
                <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {therapist.availability.map(slot => (
                        <button type="button" key={slot} onClick={() => setSelectedSlot(slot)} className={`px-3 py-2 rounded-md text-sm font-bold border-2 border-foreground transition-colors ${selectedSlot === slot ? 'bg-primary text-background' : 'bg-transparent hover:bg-black/10'}`}>
                            {slot}
                        </button>
                    ))}
                </div>
            </div>
            <button type="submit" className="w-full flex justify-center py-3 px-4 border-2 border-foreground rounded-lg shadow-neubrutalist-sm text-md font-bold text-background bg-primary hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-neubrutalist transition-all">
                Book Appointment
            </button>
        </form>
    );
};

const CrisisModalContent: React.FC = () => (
    <div className="space-y-4 text-center">
        <h4 className="text-3xl font-extrabold text-accent">You Are Not Alone</h4>
        <p className="text-foreground text-lg">If you are in immediate danger or crisis, please reach out now. Help is available 24/7.</p>
        <div className="space-y-3 text-left bg-secondary/50 p-4 rounded-lg border-2 border-foreground">
            <p><strong>Crisis Text Line:</strong> Text HOME to 741741</p>
            <p><strong>National Suicide Prevention Lifeline:</strong> Call or text 988</p>
            <p><strong>The Trevor Project (LGBTQ Youth):</strong> 1-866-488-7386</p>
        </div>
         <a href="tel:911" className="w-full inline-block text-center py-3 px-4 border-2 border-foreground rounded-lg shadow-neubrutalist-sm text-lg font-bold text-white bg-accent hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-neubrutalist transition-all">
            Call 911 Immediately
        </a>
    </div>
);


export const Modals: React.FC = () => {
    const { modal, closeModal, modalData } = useAppContext();
    
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
           if (event.key === 'Escape') {
              closeModal();
           }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [closeModal]);

    if (!modal) return null;

    const renderContent = () => {
        switch (modal) {
            case 'login':
                return <AuthModalContent isRegister={false} />;
            case 'register':
                return <AuthModalContent isRegister={true} />;
            case 'appointment':
                return modalData ? <AppointmentModalContent therapist={modalData} /> : <p>Therapist data is missing.</p>;
            case 'crisis':
                return <CrisisModalContent />;
            default:
                return null;
        }
    };
    
    const getTitle = () => {
        switch(modal) {
            case 'login': return 'Welcome Back';
            case 'register': return 'Create Your Account';
            case 'appointment': return 'Book an Appointment';
            case 'crisis': return 'Immediate Support Available';
            default: return '';
        }
    }

    return (
        <ModalWrapper title={getTitle()} onClose={closeModal}>
            {renderContent()}
        </ModalWrapper>
    );
};