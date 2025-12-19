import { GoogleGenAI } from "@google/genai";
import { SignalSet } from '../types';

export type AIModelMode = 'speed' | 'precision' | 'deep-thought';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  image?: string; // base64
  thinking?: string;
}

const getApiKey = () => {
  try {
    return process.env.API_KEY || "";
  } catch (e) {
    return "";
  }
};

export const generateLabResponse = async (
  prompt: string, 
  mode: AIModelMode = 'precision',
  image?: { data: string, mimeType: string },
  systemContext?: { signals: SignalSet, confidence: number }
) => {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error("COMMUNICATION_BREAKDOWN: API credentials unavailable.");
  }

  const ai = new GoogleGenAI({ apiKey });
  const modelName = mode === 'speed' ? 'gemini-flash-lite-latest' : 'gemini-3-pro-preview';
  
  const config: any = {
    temperature: 0.7,
    topP: 0.95,
  };

  if (mode === 'deep-thought') {
    config.thinkingConfig = { thinkingBudget: 32768 };
  }

  let fullPrompt = prompt;
  if (systemContext) {
    const { signals, confidence } = systemContext;
    fullPrompt = `
      [SYSTEM_CONTEXT_INJECTED]
      User Diagnostic State:
      - Technical Debt: ${signals.technicalDebt}/100
      - Brand Clarity: ${signals.brandClarity}/100
      - Business Maturity: ${signals.businessMaturity}/100
      - Urgency: ${signals.urgency}/100
      - Diagnostic Confidence: ${(confidence * 100).toFixed(0)}%
      
      INSTRUCTION: Integrate these signals into your analysis if relevant. Maintain a clinical, system-oriented tone.
      
      USER_QUERY: ${prompt}
    `;
  }

  const parts: any[] = [{ text: fullPrompt }];
  
  if (image) {
    parts.push({
      inlineData: {
        data: image.data,
        mimeType: image.mimeType
      }
    });
  }

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: { parts },
      config
    });

    if (!response) throw new Error("Null response");

    return {
      text: response.text || "SYSTEM_ERROR: Empty signal returned.",
    };
  } catch (error) {
    console.error("AI_LAB_ERROR:", error);
    throw new Error("COMMUNICATION_BREAKDOWN: Infrastructure unavailable.");
  }
};