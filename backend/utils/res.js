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