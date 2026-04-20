import { sendImageToOllama } from "../service/ollamaService.js";
import { DEFAULT_IMAGE_PROMPT } from "../utils/gemini.js";
import { buildUserInstruction, handleApiError } from "../utils/res.js";






export const analyzeImage = async (req, res) => {
  try {
    const file = req.file;
    const prompt = req.body.prompt;


    if (!file) {
      return res.status(400).json({
        success: false,
        error: "No image uploaded",
      });
    }



    let rawPrompt = req.body.prompt;

    if (typeof rawPrompt === "string") {
      try {
        rawPrompt = JSON.parse(rawPrompt);
      } catch {
        rawPrompt = rawPrompt.trim();
      }
    }

    const userInstruction = buildUserInstruction(rawPrompt);

    const finalPrompt = userInstruction
      ? `${DEFAULT_IMAGE_PROMPT}\n\nAdditional user instruction:\n${userInstruction}`
      : DEFAULT_IMAGE_PROMPT;


    const result = await sendImageToOllama({ file, prompt: finalPrompt });

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