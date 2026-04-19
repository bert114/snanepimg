import { GoogleGenAI } from "@google/genai";
import { fileBufferToBase64 } from "../utils/fileToBase64.js";
import dotenv from "dotenv";
import { createGeminiContents } from "../utils/gemini.js";

dotenv.config();
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});


export const sendImageToGemini = async ({ file, prompt }) => {
    const base64Image = fileBufferToBase64(file);

    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
        {
            role: "user",
            parts: [
            {
                inlineData: {
                mimeType: file.mimetype,
                data: base64Image,
                },
            },
            {
                text: prompt,
            },
            ],
        },
        ],
    });

  return response.text;
}; 