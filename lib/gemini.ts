
/**
 * Kaza X Labs - Senior Partner Intelligence Engine
 */
import { GoogleGenAI } from "@google/genai";

export type AIModelMode = 'speed' | 'precision' | 'deep-thought';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  image?: string;
}

export const generateLabResponse = async (
  prompt: string, 
  mode: AIModelMode = 'precision',
  image?: { data: string, mimeType: string }
) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  let modelName = 'gemini-3-flash-preview';
  let config: any = {
    systemInstruction: `You are a world-class senior partner at Kaza X Labs, a structural intervention firm. 
    You provide high-level strategic perspective on brand modernization and technical architecture. 
    Your tone is professional, clinical, precise, and authoritative. 
    Focus on "structural friction" and "operational clutter". 
    You do not speak like a software bot; you speak like a high-level consultant.`,
  };

  if (mode === 'deep-thought') {
    modelName = 'gemini-3-pro-preview';
    config.thinkingConfig = { thinkingBudget: 16000 };
  }

  try {
    const contents = image 
      ? {
          parts: [
            { inlineData: { data: image.data, mimeType: image.mimeType } },
            { text: prompt }
          ]
        }
      : { parts: [{ text: prompt }] };

    const response = await ai.models.generateContent({
      model: modelName,
      contents,
      config
    });

    return {
      text: response.text || "I'm currently reviewing internal strategies. Please reach out via our request protocol.",
    };
  } catch (error) {
    console.error("Kaza Lab AI Error:", error);
    return {
      text: "Our partners are currently engaged in high-level sessions. Please utilize the request protocol for formal inquiries.",
    };
  }
};
