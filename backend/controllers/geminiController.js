import express from "express";
import multer from "multer";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { fileBufferToBase64 } from "../utils/fileToBase64.js";
import {  sendImageToGemini } from "../service/gemini.js";
import { getImageRequestData } from "../utils/gemini.js";
import { handleApiError, sendError, sendSuccess } from "../utils/res.js";
dotenv.config();

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });


export const analyzeImage = async (req, res) => {
  try {
    const file = req.file;
    const prompt = req.body.prompt || "Describe this image";

    if (!file) {
      throw new Error("NO_FILE");
    }

    const result = await sendImageToGemini({ file, prompt });
    console.log(result)
    return res.json({
      success: true,
      result,
    });

  } catch (error) {
    return handleApiError(res, error);
  }
};