import axios from "axios";
import { IMAGE_ERRORS, isValidFileSize } from "./helper.js";
import useImageStore1 from "../store/useImageStorecopy.js";

export function isValidImageFile(file) {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

  if (!file) {
    return { valid: false, error: IMAGE_ERRORS.noFile };
  }

  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: IMAGE_ERRORS.type };
  }

  if (!isValidFileSize(file)) {
    return { valid: false, error: IMAGE_ERRORS.size };
  }

  return { valid: true, error: "" };
}

export function createImagePreviewState(file) {
  return {
    error: "",
    preview: URL.createObjectURL(file),
    imgFile: file,
  };
}

export function isSelectionValid(selections) {
  if (!selections.aspectRatio) {
    return { valid: false, error: "Select aspect ratio" };
  }

  if (!selections.color) {
    return { valid: false, error: "Select color" };
  }

  return { valid: true, error: "" };
}

export const getDescription = async () => {
  const { file } = useImageStore1.getState();

  try {
    const formData = new FormData();
    formData.append("image", file); // must match upload.single("image")

    const response = await axios.post(
      "http://localhost:5000/api/vision/describe",
      formData,
    );

    console.log("Ollama response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Description error:", error.response?.data || error.message);
    throw error;
  }
};
