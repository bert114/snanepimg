import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import imgRoute from "./src/routes/imgRoute.js";
import visionRoute from "./src/routes/visionRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Backend is running" });
});

app.use("/api/images", imgRoute);
app.use("/api/vision", visionRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
