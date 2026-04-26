export const uploadController = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      data: {
        originalName: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
        filename: file.filename,
        path: file.path,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Upload failed",
    });
  }
};
