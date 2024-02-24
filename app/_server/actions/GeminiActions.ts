'use server'

import { GoogleGenerativeAI } from "@google/generative-ai";
export async function askGemini(question: string,answer:string) {

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

  console.log("key  is",process.env.GEMINI_API_KEY)
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});

  const prompt = `Explain the question and answer, why is it that way ? you do not need to repeat the question or answer only the reason for it, question: ${question} answer: ${answer} `

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();
  return text;
}