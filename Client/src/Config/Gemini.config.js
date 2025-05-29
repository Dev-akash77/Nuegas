import { GoogleGenerativeAI } from "@google/generative-ai";
import { SUBTODO_SYSTEM_PROMPT } from "../Data/system_prompt";

const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export const generateSubTodo = async (prompt) => {
  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });


  await chatSession.sendMessage(SUBTODO_SYSTEM_PROMPT);


  const result = await chatSession.sendMessage(prompt);

  return result.response.text(); 
};
