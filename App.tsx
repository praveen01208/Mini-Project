import React from 'react';
import type { Therapist } from './types';
import { therapists } from './data/mockData';
import { useAppContext } from './hooks/useAppContext';
import Header from './components/Header';
import { Modals } from './components/Modals';
import Chatbot from './components/Chatbot';
import LandingPage from './components/LandingPage';

const TeamMemberCard: React.FC<{ therapist: Therapist; onBook: (therapist: Therapist) => void; index: number; }> = ({ therapist, onBook, index }) => (
  <div 
    className="bg-white border-4 border-foreground rounded-xl shadow-neubrutalist overflow-hidden flex flex-col animate-fade-in-up"
    style={{ animationDelay: `${index * 100}ms` }}
  >
    <div className="h-56 w-full bg-secondary border-b-4 border-foreground flex items-center justify-center">
      <img className="h-48 w-48 object-cover rounded-full border-4 border-foreground" src={therapist.imageUrl} alt={therapist.name} />
    </div>
    <div className="p-6 flex flex-col flex-grow">
      <h3 className="text-2xl font-extrabold text-foreground">{therapist.name}</h3>
      <div className="flex flex-wrap gap-2 my-3">
        {therapist.specialties.map(specialty => (
          <span key={specialty} className="text-xs font-bold bg-gray-200 text-foreground px-3 py-1 rounded-full border-2 border-foreground">{specialty}</span>
        ))}
      </div>
      <p className="text-md text-black/80 flex-grow mb-4">{therapist.bio}</p>
      <button
        onClick={() => onBook(therapist)}
        className="mt-auto w-full bg-secondary border-2 border-foreground text-foreground font-bold py-3 px-4 rounded-lg shadow-neubrutalist-sm hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-neubrutalist transition-all"
      >
        Book Appointment
      </button>
    </div>
  </div>
);


const TherapistsView: React.FC = () => {
    const { user, openModal } = useAppContext();
    
    const handleBook = (therapist: Therapist) => {
        if (user) {
            openModal('appointment', therapist);
        } else {
            openModal('login');
        }
    };
    
    return (
        <div className="py-16 md:py-24 animate-fade-in">
            <div className="text-center mb-16">
                <h2 className="text-5xl md:text-6xl font-extrabold text-foreground tracking-tight">
                  Meet Our Team
                </h2>
                <p className="mt-4 max-w-2xl mx-auto text-xl text-black/80">
                    Our compassionate and experienced therapists are here to support you.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {therapists.map((therapist, index) => (
                    <TeamMemberCard key={therapist.id} therapist={therapist} onBook={handleBook} index={index} />
                ))}
            </div>
        </div>
    );
};


function App() {
  const { currentView } = useAppContext();

  return (
    <div className="min-h-screen text-foreground transition-colors duration-300">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {currentView === 'home' && <LandingPage />}
        {currentView === 'therapists' && <TherapistsView />}
      </main>
      <Modals />
      <Chatbot />
    </div>
  );
}

export default App;