const multer = require("multer");
const fs = require("fs");
const path = require("path"); // Import the path module

const getUploadMiddleware = (destinationFolder) => {
  // Create the destination folder and its parent directories if they don't exist
  if (!fs.existsSync(destinationFolder)) {
    const parentDir = path.dirname(destinationFolder);
    fs.mkdirSync(parentDir, { recursive: true });
    fs.mkdirSync(destinationFolder);
  }

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, destinationFolder);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });

  return multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });
};

module.exports = getUploadMiddleware;
