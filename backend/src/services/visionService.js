import dotenv from "dotenv";
import { bufferToBase64 } from "../utils/imageUtils.js";
import { generateWithOllama } from "../utils/ollamaClient.js";
dotenv.config();

export const generateImageDescription = async (imageBuffer) => {
  const base64Image = bufferToBase64(imageBuffer);
  const prompt = `Describe this image in detail. Include objects, people, background, colors, lighting, style, mood, camera angle, visible text, and small details.`;

  const data = await generateWithOllama({
    model: process.env.OLLAMA_MODEL || "moondream",
    prompt,
    images: [base64Image],
  });

  if (!data?.response) {
    console.log("Ollama response:", data);
    throw new Error("No description returned from Ollama");
  }

  return data.response.trim();
};
