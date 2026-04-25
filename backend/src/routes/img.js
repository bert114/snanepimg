import express from "express";
import { generateImage } from "../controllers/img.js";

const router = express.Router();

router.post("/generate", generateImage);

export default router;
