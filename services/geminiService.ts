import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { Message } from "../types";

// Safe access to environment variables that works in both Node and Browser (Vite/Webpack) environments
const getApiKey = () => {
  try {
    if (typeof process !== 'undefined' && process.env && process.env.API_KEY) {
      return process.env.API_KEY;
    }
    // @ts-ignore - Check for Vite's import.meta.env
    if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.API_KEY) {
      // @ts-ignore
      return import.meta.env.API_KEY;
    }
  } catch (e) {
    // Ignore errors during env access
  }
  return '';
};

const SYSTEM_INSTRUCTION = `
You are 'Vanguard', the digital concierge for NOIR, an elite strategic consultancy firm.
Your persona is sophisticated, minimalist, and ultra-professional. 
You speak with brevity and precision.
You assist high-net-worth individuals and corporate executives with strategic inquiries.
Do not use emojis. Use formal language.
If asked about services, mention: "Global Expansion Strategy", "Legacy Architecture", and "Risk Mitigation".
If asked about the firm, describe NOIR as "The silence between the notes. The invisible hand guiding the market."
`;

export const sendMessageToGemini = async (history: Message[], newMessage: string): Promise<string> => {
  const apiKey = getApiKey();
  
  if (!apiKey) {
    console.warn("API Key missing. Chat functionality disabled.");
    return "Secure Channel: Offline. [Missing API Credentials]";
  }

  try {
    // Initialize client lazily to prevent runtime crashes on module load
    const ai = new GoogleGenAI({ apiKey });

    // Construct chat history for context
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
      history: history.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      }))
    });

    const response: GenerateContentResponse = await chat.sendMessage({ message: newMessage });
    
    return response.text || "Connection silent.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Signal interrupted. The network is unreachable.";
  }
};