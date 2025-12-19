import { GoogleGenAI } from "@google/genai";
import { SignalSet } from '../types';

/**
 * Kaza X Labs - Controlled Narrative Engine
 * 
 * Rules:
 * 1. AI never determines track, pricing, or modules.
 * 2. AI only refines technical clarity and cause-effect mapping.
 * 3. Style must remain "System-Oriented" and "Plain Language".
 */

const getApiKey = () => {
  try {
    return process.env.API_KEY || "";
  } catch (e) {
    return "";
  }
};

export const getRefinedSummaryPrompt = (signals: SignalSet, staticSummary: string, track: string) => {
  return `
    ROLE: Technical Systems Architect at Kaza X Labs.
    TASK: Rewrite the provided summary for a digital intervention proposal.
    
    DIAGNOSTIC DATA:
    - Engagement Track: ${track}
    - Technical Debt: ${signals.technicalDebt}/100
    - Brand Clarity: ${signals.brandClarity}/100
    - Automation Readiness: ${signals.automationReadiness}/100
    - Urgency: ${signals.urgency}/100
    
    CORE SUMMARY (DETERMINISTIC):
    "${staticSummary}"
    
    INSTRUCTIONS:
    - Use plain, confident, system-oriented language.
    - Explain the CAUSE-EFFECT relationship between the diagnostic data and the recommended track.
    - Clarify technical TRADEOFFS (e.g., speed vs. depth if urgency is high).
    - Avoid marketing fluff, adjectives like "amazing" or "world-class", and generic agency clichés.
    - Do NOT suggest new services or change the pricing/track logic.
    - Maximum 80 words.
  `;
};

export const getRefinedReasoningPrompt = (title: string, reasoning: string, signalValue: number) => {
  return `
    REWRITE the reasoning for including the module "${title}".
    CURRENT REASONING: "${reasoning}"
    SIGNAL STRENGTH: ${signalValue}/100
    
    The tone should be clinical and objective. Focus on how the signal indicates a bottleneck that this module specifically resolves. 
    15 words max.
  `;
};

export const refineNarrative = async (prompt: string) => {
  const apiKey = getApiKey();
  if (!apiKey) return null;

  const ai = new GoogleGenAI({ apiKey });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text?.trim() || "SIGNAL_REFINE_ERROR";
  } catch (error) {
    console.error("Narrative Engine Failure:", error);
    return null;
  }
};