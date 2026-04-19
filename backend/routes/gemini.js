import express from "express";
import multer from "multer";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { fileBufferToBase64 } from "../utils/fileToBase64.js";
import { analyzeImage } from "../controllers/ollamaController.js";

dotenv.config();

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

router.post("/analyze-image", upload.single("image"), analyzeImage);


export default router;