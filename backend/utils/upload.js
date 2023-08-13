const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const getUploadMiddleware = () => {
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: "images/products",
      format: async (req, file) => "png", // supports promises as well
      allowedFormats: ["jpg", "jpeg", "png", "gif"],
      public_id: (req, file) => file.filename,
    },
  });
  return multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });
};

module.exports = getUploadMiddleware;
