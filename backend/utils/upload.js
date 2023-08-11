const multer = require("multer");

const getUploadMiddleware = (destinationFolder) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, destinationFolder); // Use the destination folder provided as a parameter
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });

  return multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });
};

module.exports = getUploadMiddleware;
