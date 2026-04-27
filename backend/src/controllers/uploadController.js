import cloudinary from "../config/cloudinary.js";
import { errorResponse, successResponse } from "../helper/responseHelper.js";
import { saveDb } from "../services/cloudinaryService.js";

const uploadController = async (req, res) => {
  console.log("Received file:", req.file);
  try {
    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "uploads" },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );

      stream.end(req.file.buffer);
    });

    return successResponse(res, 200, {
      url: uploadResult.secure_url,
      public_id: uploadResult.public_id,
    });

    // return;
    // if (!req.file) return errorResponse(res, 400, "No image uploaded");

    // const saveUpload = await saveDb(req.file);

    // return successResponse(res, 200, {
    //   savedUpload,
    // });
  } catch (error) {
    return errorResponse(
      res,
      error.statusCode || 500,
      error.message || "Failed to upload image",
      error.details || error.message,
    );
  }
};

export default uploadController;
