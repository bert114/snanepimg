export function isValidFileSize(file, maxSize = 5 * 1024 * 1024) {
  return file.size <= maxSize;
}

export const IMAGE_ERRORS = {
  noFile: "No file selected.",
  type: "Only JPG, PNG, and WEBP files are allowed.",
  size: "File must be 5MB or less.",
};


