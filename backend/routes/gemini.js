import express from "express";
import multer from "multer";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { fileBufferToBase64 } from "../utils/fileToBase64.js";
dotenv.config();

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

router.post("/analyze-image", upload.single("image"), async (req, res) => {
  try {
    const file = req.file;
    const prompt = req.body.prompt || "Describe this image.";

    console.log(file);

    if (!file) {
      return res.status(400).json({
        success: false,
        error: "No image uploaded",
      });
    }

    const base64Image = fileBufferToBase64(file.buffer);

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

    return res.json({
      success: true,
      result: response.text,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      error: error.message || "Something went wrong",
    });
  }
});

export default router;