export function isValidImageFile(file) {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

  if (!file) {
    return { valid: false, error: "No file selected." };
  }

  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: "Only JPG, PNG, and WEBP files are allowed." };
  }

  return { valid: true, error: "" };
}

export function createImagePreviewState(file) {
  return {
    error: "",
    preview: URL.createObjectURL(file),
  };
}

