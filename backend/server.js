import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import imgRoute from "./src/routes/imgRoute.js";
import visionRoute from "./src/routes/visionRoute.js";
import modelRoute from "./src/routes/modelRoute.js";
import uploadRoue from "./src/routes/uploadRoute.js";
import connectDB from "./src/config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
  }),
);
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Backend is running" });
});

connectDB();

app.use("/api/images", imgRoute);
app.use("/api/user", uploadRoue);
app.use("/api/vision", visionRoute);
app.use("/api/models", modelRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
