import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { Chat } from '@google/genai';
import { initChat, sendMessageToAI } from '../services/geminiService';
import type { Message } from '../types';
import { SendIcon, CloseIcon } from './Icons';
import { useAppContext } from '../hooks/useAppContext';

type OnboardingStep = 'intro' | 'name' | 'mood' | 'ready' | 'chatting';

const moodOptions = [
    { text: "😊 Feeling great!", payload: "great" },
    { text: "🙂 Just okay", payload: "okay" },
    { text: "😕 A bit down", payload: "down" },
    { text: "😥 Really struggling", payload: "struggling" },
];

const Chatbot: React.FC = () => {
    const { user, updateUser, openModal, isChatbotOpen, setIsChatbotOpen } = useAppContext();
    const [chat, setChat] = useState<Chat | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [onboardingStep, setOnboardingStep] = useState<OnboardingStep>('intro');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    const addMessage = useCallback((message: Omit<Message, 'id'>) => {
        setMessages(prev => [...prev, { ...message, id: `msg-${Date.now()}-${Math.random()}` }]);
    }, []);

    useEffect(() => {
        if(isChatbotOpen) {
            setIsVisible(true);
            if (messages.length === 0) { // Only start onboarding if it hasn't started
                setOnboardingStep('intro');
                setIsLoading(true);
                 setTimeout(() => {
                    addMessage({ sender: 'ai', text: "Hey there! I'm Zen, your personal AI companion. 🤖" });
                    setIsLoading(false);
                    setTimeout(() => {
                        setIsLoading(true);
                        addMessage({ sender: 'ai', text: "To make this space feel like yours, what should I call you?" });
                        setIsLoading(false);
                        setOnboardingStep('name');
                    }, 1200);
                }, 1000);
            }
        } else {
            setIsVisible(false);
        }
    }, [isChatbotOpen, addMessage, messages.length]);


    const handleOnboardingName = (name: string) => {
        updateUser({ name });
        addMessage({ sender: 'user', text: `You can call me ${name}.` });
        setIsLoading(true);
        setTimeout(() => {
            addMessage({ sender: 'ai', text: `Awesome to meet you, ${name}! ✨` });
            setIsLoading(false);
            setTimeout(() => {
                setIsLoading(true);
                addMessage({ sender: 'ai', text: "How are you feeling right now?", options: moodOptions });
                setIsLoading(false);
                setOnboardingStep('mood');
            }, 1200);
        }, 1000);
    };

    const handleOnboardingMood = (mood: { text: string; payload: string }) => {
        addMessage({ sender: 'user', text: mood.text });
        setIsLoading(true);
        setTimeout(() => {
            let responseText = "";
            switch (mood.payload) {
                case 'great': responseText = "That's fantastic to hear! I'm here to help keep that good energy flowing."; break;
                case 'okay': responseText = "Got it. Sometimes 'okay' is a perfect place to be. I'm here if you want to talk or just chill."; break;
                case 'down': responseText = "Thanks for sharing that. It's okay to not be okay. I'm here to listen without any judgment."; break;
                case 'struggling': responseText = "I'm really sorry to hear that, but I'm glad you're here. Talking about it is a brave first step. I'm here for you."; break;
            }
            addMessage({ sender: 'ai', text: responseText });
            setIsLoading(false);
            setTimeout(() => {
                setIsLoading(true);
                addMessage({ sender: 'ai', text: "This is your safe space. We can talk about anything you want, or I can offer some resources. What's on your mind?" });
                setIsLoading(false);
                setOnboardingStep('chatting');
            }, 1500);
        }, 1000);
    };

    useEffect(() => {
        if (onboardingStep === 'chatting' && !chat) {
            try {
                const newChat = initChat(user?.name);
                setChat(newChat);
            } catch (error) {
                console.error(error);
                addMessage({ sender: 'ai', text: "I'm having trouble connecting right now. Please make sure the API key is configured correctly." });
            }
        }
    }, [onboardingStep, chat, user?.name, addMessage]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [messages]);
  
    const handleCrisis = useCallback(() => {
        addMessage({
            sender: 'ai',
            text: "It sounds like you're going through a lot right now. Your safety is the most important thing. I'm connecting you with immediate support resources.",
            isCrisis: true
        });
        setTimeout(() => openModal('crisis'), 500);
    }, [openModal, addMessage]);

    const handleSend = useCallback(async () => {
        if (!input.trim() || !chat || isLoading || onboardingStep !== 'chatting') return;

        const userMessageText = input;
        addMessage({ sender: 'user', text: userMessageText });
        setInput('');
        setIsLoading(true);

        try {
            const response = await sendMessageToAI(chat, userMessageText);
            const aiText = response.text;

            if (aiText.includes('CRISIS_DETECTED')) {
                handleCrisis();
            } else {
                addMessage({ sender: 'ai', text: aiText });
            }
        } catch (error: any) {
            addMessage({ sender: 'ai', text: error.message });
        } finally {
            setIsLoading(false);
        }
    }, [chat, input, isLoading, onboardingStep, handleCrisis, addMessage]);

    const handleInputSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (onboardingStep === 'name') {
            handleOnboardingName(input);
            setInput('');
        } else {
            handleSend();
        }
    };
    
    if(!isChatbotOpen) return null;

    return (
        <div className={`fixed inset-0 z-40 flex items-center justify-center transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="absolute inset-0 bg-black/40" onClick={() => setIsChatbotOpen(false)}></div>
            <div className="relative flex flex-col h-full md:h-[85vh] w-full md:max-w-lg md:my-8 bg-background border-4 border-foreground rounded-lg shadow-neubrutalist transition-transform duration-300 transform animate-fade-in-up">
                 <header className="flex items-center justify-between p-4 border-b-4 border-foreground">
                    <h3 className="text-xl font-extrabold">Zen Companion</h3>
                    <button onClick={() => setIsChatbotOpen(false)} className="p-1 rounded-full text-foreground hover:bg-black/10">
                        <CloseIcon className="h-6 w-6" />
                    </button>
                 </header>
                <main className="flex-1 p-4 pt-4 overflow-y-auto space-y-6">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            {msg.sender === 'ai' && <div className="w-9 h-9 rounded-full bg-secondary border-2 border-foreground flex-shrink-0 shadow-neubrutalist-sm"></div>}
                            <div className="flex flex-col gap-2 w-full max-w-[80%]">
                                <div className={`rounded-lg px-4 py-3 border-2 border-foreground shadow-neubrutalist-sm ${
                                    msg.sender === 'user'
                                        ? 'bg-primary text-background self-end'
                                        : msg.isCrisis
                                        ? 'bg-accent text-white'
                                        : 'bg-white text-foreground'
                                    }`}
                                >
                                    <p className="text-base whitespace-pre-wrap">{msg.text}</p>
                                </div>
                                {msg.options && (
                                    <div className="flex flex-wrap gap-2 pt-2 self-start">
                                        {msg.options.map(option => (
                                            <button 
                                                key={option.payload}
                                                onClick={() => handleOnboardingMood(option)}
                                                className="px-4 py-2 bg-white border-2 border-foreground rounded-lg text-sm font-bold shadow-neubrutalist-sm hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-neubrutalist transition-all"
                                            >
                                                {option.text}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex items-start gap-3">
                            <div className="w-9 h-9 rounded-full bg-secondary border-2 border-foreground flex-shrink-0 shadow-neubrutalist-sm"></div>
                            <div className="bg-white rounded-lg px-5 py-4 border-2 border-foreground shadow-neubrutalist-sm">
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-foreground rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-foreground rounded-full animate-bounce [animation-delay:0.2s]"></div>
                                    <div className="w-2 h-2 bg-foreground rounded-full animate-bounce [animation-delay:0.4s]"></div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </main>

                <footer className="p-3 mt-auto border-t-4 border-foreground bg-background">
                    <form onSubmit={handleInputSubmit} className="flex items-center gap-3">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={onboardingStep === 'name' ? 'Type your name...' : 'Type your message...'}
                            className="flex-1 px-4 py-3 bg-white border-2 border-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                            disabled={isLoading || onboardingStep === 'mood'}
                            autoFocus
                        />
                        <button type="submit" className="bg-primary text-background rounded-lg p-3 border-2 border-foreground shadow-neubrutalist-sm hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-neubrutalist transition-all disabled:opacity-70 disabled:transform-none disabled:shadow-neubrutalist-sm" disabled={isLoading || !input.trim() || onboardingStep === 'mood'}>
                            <SendIcon className="h-6 w-6" />
                        </button>
                    </form>
                </footer>
            </div>
        </div>
    );
};

export default Chatbot;