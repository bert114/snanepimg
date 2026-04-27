import { errorResponse, successResponse } from "../helper/responseHelper.js";
import Upload from "../model/uploadModel.js";
import { saveDb } from "../services/cloudinaryService.js";

const uploadController = async (req, res) => {
  try {
    if (!req.file) return errorResponse(res, 400, "No image uploaded");

    const saveUpload = await saveDb(req.file);

    return successResponse(res, 200, {
      savedUpload,
    });
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
