import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Google AI client with your API key from .env.local
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

export async function POST(req) {
  const { message } = await req.json();

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // --- THIS IS THE NEW, ENHANCED PROMPT ---
    const prompt = `Aap ek "Agri Chatbot" hain, jo kisaano (farmers) ki madad karne wale expert hain. 
    Aapka user Uttar Pradesh, India se hai.

    IMPORTANT: User aapse English, Hindi, ya Hinglish (jaise WhatsApp par likhte hain) mein sawaal pooch sakta hai. Aapko sab samajhna hai.
    Aapko jawaab bhi aasan Hinglish mein hi dena hai, taaki unhe aasani se samajh aaye.

    Example of a good answer:
    User's question: "gehu ki kheti ke liye sabse acchi matti"
    Your ideal answer: "Gehu (wheat) ki kheti ke liye, domat mitti (loamy soil) sabse acchi hoti hai. Ismein paani aur poshak tatva (nutrients) sahi maatra mein rehte hain. Kya aap bata sakte hain ki aapke khet ki mitti kaisi hai?"

    Ab, neeche diye gaye user ke sawaal ka jawaab dijiye.

    User's question: "${message}"`;
    // --- END OF PROMPT ---

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ reply: text });
    
  } catch (error) {
    console.error("Error calling AI model:", error);
    return NextResponse.json({ reply: "Maaf kijiye, abhi network mein kuch samasya hai. Kripya thodi der baad koshish karein." });
  }
}
