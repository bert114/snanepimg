import dotenv from "dotenv";
dotenv.config();

export const describeImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image file is required",
      });
    }

    const base64Image = req.file.buffer.toString("base64");

    const response = await fetch(`${process.env.OLLAMA_URL}/api/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OLLAMA_MODEL || "moondream",
        prompt: "Describe this image clearly and in detail.",
        images: [base64Image],
        stream: false,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        success: false,
        error: data,
      });
    }

    return res.status(200).json({
      success: true,
      description: data.response,
    });
  } catch (error) {
    console.error("Describe image error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to describe image",
      error: error.message,
    });
  }
};
