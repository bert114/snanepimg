export const saveDb = async (req) => {
  const base64Image = bufferToBase64(imageBuffer);

  const { originalname, mimetype, size, path, filename } = req;

  const data = await Upload.create({
    originalName: originalname,
    mimeType: mimetype,
    size: size,
    url: path,
    publicId: filename,
  });

  return data.response;
};
