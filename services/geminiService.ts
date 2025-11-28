import { GoogleGenAI } from "@google/genai";
import { slides } from '../data/slides';

const getContext = () => {
  return slides.map(s => {
    return `Slide ${s.id} (${s.type}): ${s.title || ''} ${s.subtitle || ''} \n ${s.content?.join('\n') || ''} \n ${s.citations?.join('\n') || ''}`;
  }).join('\n---\n');
};

const SYSTEM_INSTRUCTION = `
You are an expert Game Design assistant, specifically knowledgeable about "Ludonarrative Dissonance in VR Games".
You are embedded inside a retro presentation web app.
Answer questions based strictly on the provided presentation context below.
Keep answers concise, formatted for a retro low-res screen (avoid long paragraphs, use bullet points).
Tone: Academic but accessible, slightly "techy".

Presentation Context:
${getContext()}
`;

export const sendMessageToGemini = async (history: {role: 'user'|'model', text: string}[], newMessage: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // We construct a chat history for the model
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const result = await chat.sendMessage({ message: newMessage });
    return result.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error: Unable to connect to neural link.";
  }
};
