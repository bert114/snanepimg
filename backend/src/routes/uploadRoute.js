import express from "express";

import { upload } from "../middlewares/upload.js";
import uploadController from "../controllers/uploadController.js";

const router = express.Router();

router.post("/upload", upload.single("image"), uploadController);

export default router;
