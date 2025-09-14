import { GoogleGenAI, Chat } from "@google/genai";
import type { GenerateContentResponse } from "@google/genai";

const SYSTEM_INSTRUCTION = `You are Zen, a futuristic, friendly, and empathetic AI companion for teenagers, designed to feel like a personal assistant for their well-being. Your goal is to provide a safe, supportive, and cool space for them to talk about their feelings.
You can offer helpful advice, coping strategies for stress and anxiety, and positive affirmations. Use modern, clear, and encouraging language. Feel free to use relevant emojis to convey warmth and friendliness. 🤖✨
Keep your responses concise and easy to read, typically 2-4 sentences unless the user asks for more detail.
If you know the user's name, address them by it to make the conversation feel more personal.

CRITICAL SAFETY INSTRUCTION: If a user expresses any intention or thought of self-harm, suicide, or being in immediate danger (using words like 'kill myself', 'suicide', 'want to die', 'can't go on', 'no reason to live', 'harm myself', 'ending it all'), you MUST IMMEDIATELY stop the conversational flow and respond ONLY with the following exact text: 'CRISIS_DETECTED'. Do not add any other words, apologies, or explanations. Your entire response must be only 'CRISIS_DETECTED'.`;

let ai: GoogleGenAI | null = null;

const getAI = () => {
  if (!ai) {
    if (!process.env.API_KEY) {
      throw new Error("API_KEY is not set in environment variables");
    }
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return ai;
};

export const initChat = (userName?: string): Chat => {
  const genAI = getAI();
  const personalizedSystemInstruction = userName 
    ? `You are chatting with ${userName}.\n${SYSTEM_INSTRUCTION}`
    : SYSTEM_INSTRUCTION;

  return genAI.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: personalizedSystemInstruction,
      temperature: 0.7,
      topP: 0.9,
      topK: 40,
      // The thinking config is disabled for lower latency to make the chat feel more responsive for a teen audience.
      thinkingConfig: { thinkingBudget: 0 },
    },
  });
};

export const sendMessageToAI = async (chat: Chat, message: string): Promise<GenerateContentResponse> => {
  try {
    const response = await chat.sendMessage({ message });
    return response;
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    throw new Error("I'm having trouble connecting right now. Please try again in a moment.");
  }
};