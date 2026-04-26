import express from "express";
import { upload } from "../middlewares/upload.js";
import { uploadController } from "../controllers/userUpload.js";
const router = express.Router();

router.post("/upload", upload.array("images", 100), uploadController);

export default router;
