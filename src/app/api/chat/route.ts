import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY 
});

export async function POST(req: Request) {
  try {
    const { messages, context } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response("Missing or invalid messages array", { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
      return new Response(JSON.stringify({ 
        role: "ai", 
        text: "API Key missing. Please set GEMINI_API_KEY in your .env.local file to activate live responses." 
      }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

    // Format messages for the Gemini API
    const formattedHistory = messages.slice(0, -1).map((msg: any) => ({
      role: msg.role === 'ai' ? 'model' : 'user',
      parts: [{ text: msg.text }]
    }));
    
    const lastMessage = messages[messages.length - 1].text;

    let baseInstruction = "You are OmniOS, an advanced, omnimodal Artificial Intelligence ecosystem operating as the user's ultimate digital companion. You manage agents, synthesize information, and write code. Keep your responses concise, intelligent, and formatted cleanly. You understand plain English, and you don't use unnecessary filler words.";

    if (context) {
      baseInstruction += `\n\n[SYSTEM CONTEXT]\nThe user is currently looking at the "${context.mode}" workspace tab.`;
      
      if (context.mode === "CODE" && context.code) {
        baseInstruction += `\n\nHere is the exact code occupying the user's screen:\n\`\`\`\n${context.code}\n\`\`\`\nIf the user says 'this' or asks for help, they are referring to this code.`;
      } else if (context.mode === "DOCUMENT" && context.document) {
        baseInstruction += `\n\nHere is the exact document they are reading:\n"${context.document}"\nAddress any questions with this document in mind.`;
      }
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        ...formattedHistory,
        { role: "user", parts: [{ text: lastMessage }] }
      ],
      config: {
        systemInstruction: baseInstruction,
        temperature: 0.7,
      }
    });

    return new Response(JSON.stringify({
      role: "ai",
      text: response.text
    }), { status: 200, headers: { 'Content-Type': 'application/json' } });

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
