import { sendImageToOllama } from "../service/ollamaService.js";
import { DEFAULT_IMAGE_PROMPT } from "../utils/gemini.js";
import { handleApiError } from "../utils/res.js";






export const analyzeImage = async (req, res) => {
  try {
    const file = req.file;
    const prompt = DEFAULT_IMAGE_PROMPT;


    if (!file) {
      return res.status(400).json({
        success: false,
        error: "No image uploaded",
      });
    }

    const result = await sendImageToOllama({ file, prompt });

    console.log(result);

    return res.json({
      success: true,
      result,
    });

  } catch (error) {
    console.error(error);

    handleApiError(res,error);
  }
};