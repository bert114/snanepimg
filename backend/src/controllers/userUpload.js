// export const uploadController = async (req, res) => {
//   try {
//     const file = req.file;

//     if (!file) {
//       return res.status(400).json({
//         success: false,
//         message: "No image uploaded",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Image uploaded successfully",
//       data: {
//         originalName: file.originalname,
//         mimeType: file.mimetype,
//         size: file.size,
//         filename: file.filename,
//         path: file.path,
//       },
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message || "Upload failed",
//     });
//   }
// };

/*
export const uploadController = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded",
      });
    }

    const base64Image = req.file.buffer.toString("base64");
    const dataUrl = `data:${req.file.mimetype};base64,${base64Image}`;

    return res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      data: {
        originalName: req.file.originalname,
        mimeType: req.file.mimetype,
        size: req.file.size,
        preview: dataUrl, 
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Upload failed",
    });
  }
};



*/

export const uploadController = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No images uploaded",
      });
    }

    const uploadedImages = req.files.map((file) => ({
      originalName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
      preview: `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
    }));

    return res.status(200).json({
      success: true,
      message: `${req.files.length} images uploaded successfully`,
      data: uploadedImages,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Upload failed",
    });
  }
};
