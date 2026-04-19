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


const responseFormat = {
  "overall_scene": "",
  "main_subject": "",
  "appearance_and_clothing": "",
  "pose_and_body_position": "",
  "face_and_expression": "",
  "background_and_environment": "",
  "objects_and_positions_description": "",
  "colors_and_lighting": "",
  "composition_and_camera_angle": "",
  "image_style": "",
  "visible_text": "",
  "fine_details": "",
  "unclear_or_ambiguous_details": ""
};

export const DEFAULT_IMAGE_PROMPT = `
Analyze the image and return only valid JSON.

Rules:
- Every field must be a string.
- Every field must contain a natural-language description.
- Do not output arrays.
- Do not output coordinates.
- Do not output numbers for object locations.
- Describe positions using words such as left, right, center, foreground, background, upper area, lower area.
- Do not repeat visible text like "EXIT" in unrelated fields.
- Only use visible text in the "visible_text" field.
- Only describe what is visible.
- If something is unclear, write "unclear".
- No markdown.
- No explanation.
- Output JSON only.

Return exactly this object:
{
  "overall_scene_description": "",
  "main_subject_description": "",
  "clothing_description": "",
  "body_pose_description": "",
  "facial_expression_description": "",
  "background_description": "",
  "object_positions_in_words": "",
  "lighting_and_color_description": "",
  "camera_and_framing_description": "",
  "image_type_description": "",
  "visible_text": "",
  "small_visible_details": "",
  "uncertain_details": ""
}
`;