export const sendSuccess = (res, result) => {
  return res.json({
    success: true,
    result,
  });
};

export const sendError = (res, error) => {
  return res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Something went wrong",
  });
};


export const handleApiError = (res, error) => {
  console.error(error);

  if (error.message === "NO_FILE") {
    return res.status(400).json({
      success: false,
      error: "No image uploaded",
    });
  }

  if (error.message === "Request timeout") {
    return res.status(408).json({
      success: false,
      error: "Request timed out",
    });
  }

  if (error.message.includes("429")) {
    return res.status(429).json({
      success: false,
      error: "Too many requests",
    });
  }

  return res.status(500).json({
    success: false,
    error: error.message || "Server error",
  });
};

export function buildUserInstruction(userInput) {
  if (!userInput) return "";

  if (typeof userInput === "string") {
    return userInput.trim();
  }

  if (typeof userInput === "object") {
    const parts = [];

    if (userInput.noText === true) {
      parts.push("Prefer no visible text in the described result, but only if the image actually contains no text.");
    }

    if (userInput.plainBackground === true) {
      parts.push("Pay attention to whether the background looks plain or simple.");
    }

    if (userInput.color) {
      parts.push(`Pay attention to the dominant color, especially whether blue is visible.`);
    }

    if (userInput.aspectRatio) {
      parts.push(`Note the apparent framing or aspect ratio if it is visually relevant, such as ${userInput.aspectRatio}.`);
    }

    return parts.join(" ");
  }

  return "";
}