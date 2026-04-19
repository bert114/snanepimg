import { fileBufferToBase64 } from "./fileToBase64.js";

export const createGeminiContents = ({ file, base64Image, prompt }) => [
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
];

export const getImageRequestData = (req) => {
  const file = req.file;
  const prompt = req.body.prompt || "Describe this image.";

  if (!file) {
    const error = new Error(IMAGE_ERRORS.noFile || "No image uploaded");
    error.statusCode = 400;
    throw error;
  }

  return {
    file,
    prompt,
  };
};