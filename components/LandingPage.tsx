import React from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { MeditatingPersonIcon } from './Icons';

const CTAButton: React.FC<{onClick: () => void, children: React.ReactNode, className?: string, variant?: 'primary' | 'secondary'}> = ({ onClick, children, className, variant = 'primary' }) => {
    const bgColor = variant === 'primary' ? 'bg-primary' : 'bg-secondary';
    const textColor = variant === 'primary' ? 'text-background' : 'text-foreground';
    return (
        <button
            onClick={onClick}
            className={`px-8 py-4 text-lg font-bold rounded-lg transform transition-all duration-200 border-2 border-foreground shadow-neubrutalist hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0px_#000000] ${bgColor} ${textColor} ${className}`}
        >
            {children}
        </button>
    )
}

const FeatureCard: React.FC<{title: string, description: string, delay: number, color: 'primary' | 'secondary'}> = ({ title, description, delay, color }) => (
    <div 
        className={`p-8 rounded-xl border-4 border-foreground shadow-neubrutalist animate-fade-in-up bg-${color}`} 
        style={{ animationDelay: `${delay}ms` }}
    >
        <h3 className="text-3xl font-extrabold text-foreground mb-3">{title}</h3>
        <p className="text-lg text-black/80">{description}</p>
    </div>
);

const TestimonialCard: React.FC<{quote: string, author: string, delay: number}> = ({ quote, author, delay }) => (
    <div className="bg-white border-4 border-foreground rounded-xl p-6 animate-fade-in-up shadow-neubrutalist" style={{ animationDelay: `${delay}ms` }}>
        <p className="text-lg text-black/80 mb-4">"{quote}"</p>
        <p className="font-bold text-foreground text-md">- {author}</p>
    </div>
);


const LandingPage: React.FC = () => {
    const { setIsChatbotOpen, setView } = useAppContext();
    
    return (
        <div className="py-16 md:py-24 space-y-24 md:space-y-32">
            {/* Hero Section */}
            <section className="grid md:grid-cols-2 gap-12 items-center">
                <div className="animate-fade-in text-center md:text-left">
                    <h1 className="text-6xl md:text-7xl font-extrabold tracking-tighter mb-6">
                        A safe space,
                        <br />
                        just for you.
                    </h1>
                    <p className="max-w-md mx-auto md:mx-0 mt-6 text-xl text-black/80">
                       Zen-Mind is your personal AI companion, here to listen, support, and guide you through life's ups and downs.
                    </p>
                    <div className="mt-10">
                        <CTAButton onClick={() => setIsChatbotOpen(true)} variant="primary">
                            Start a Conversation
                        </CTAButton>
                    </div>
                </div>
                 <div className="relative h-80 md:h-96 flex items-center justify-center animate-fade-in">
                    <div className="absolute w-full h-full bg-secondary rounded-xl border-4 border-foreground transform rotate-[-4deg]"></div>
                    <div className="relative w-full h-full bg-background rounded-xl border-4 border-foreground p-4 flex items-center justify-center">
                       <MeditatingPersonIcon className="w-48 h-48 text-foreground" />
                    </div>
                </div>
            </section>

            {/* Body Section */}
            <section>
                 <div className="text-center mb-16">
                    <h2 className="text-5xl font-extrabold text-center">
                       A Smarter Way to Wellness
                    </h2>
                     <p className="mt-4 max-w-2xl mx-auto text-xl text-black/80">
                        Explore tools and resources designed to empower your mental health journey.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                   <FeatureCard
                        title="Your AI Companion"
                        description="Chat with Zen anytime. It adapts to offer personalized advice and coping strategies."
                        delay={100}
                        color="secondary"
                    />
                    <TestimonialCard 
                        quote="I finally found a space where I don't feel judged. Talking to Zen actually helps me clear my head."
                        author="Alex, 17"
                        delay={250}
                    />
                     <FeatureCard
                        title="Connect with Pros"
                        description="When you're ready, browse our directory of vetted therapists and book appointments."
                        delay={400}
                        color="primary"
                    />
                     <TestimonialCard 
                        quote="The design is so cool and easy to use. It doesn't feel like a typical 'mental health' app, which is why I like it."
                        author="Jamie, 15"
                        delay={100}
                    />
                     <FeatureCard
                        title="Safe & Anonymous"
                        description="Your privacy is our priority. Share your thoughts freely in a secure and anonymous environment."
                        delay={250}
                        color="primary"
                    />
                    <TestimonialCard 
                        quote="Booking a session with a therapist was surprisingly straightforward. Really grateful for this platform."
                        author="Sam, 18"
                        delay={400}
                    />
                </div>
            </section>
            
            {/* Final CTA Section */}
            <section className="text-center bg-secondary border-4 border-foreground rounded-xl py-16 px-8 animate-fade-in shadow-neubrutalist">
                 <h2 className="text-5xl font-extrabold mb-4">
                    Ready to Prioritize Yourself?
                </h2>
                 <p className="max-w-2xl mx-auto mt-4 text-xl text-black/80">
                    Your journey towards better mental well-being starts with a single step. Zen is here to walk it with you.
                </p>
                <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-6">
                     <CTAButton onClick={() => setIsChatbotOpen(true)} variant="primary">
                        Talk to Zen Now
                    </CTAButton>
                     <button 
                        onClick={() => setView('therapists')}
                        className="font-bold text-lg underline"
                    >
                        Or Meet Our Team
                    </button>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;