const multer = require("multer");
const { nanoid } = require("nanoid");
const path = require("path");
const fs = require("fs");

const fileUploader = ({
  destinationFolder = "uploads",
  fileTypes = [],
  prefix = "",
} = {}) => {
  const uploadPath = path.join(__dirname, `../public/${destinationFolder}`);

  // Buat folder jika belum ada
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }

  const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const fileExt = path.extname(file.originalname);
      const fileName = `${prefix}_${nanoid(10)}${fileExt}`;
      cb(null, fileName);
    },
  });

  const fileFilter = (req, file, cb) => {
    console.log("File upload attempt:", {
      originalname: file.originalname,
      mimetype: file.mimetype,
      fieldname: file.fieldname,
    });

    if (fileTypes.length === 0 || fileTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          `Invalid file type: ${file.mimetype}. Allowed types: ${fileTypes.join(
            ", "
          )}`
        ),
        false
      );
    }
  };

  return multer({
    storage: storageConfig,
    fileFilter,
    limits: {
      fileSize: 80 * 1024 * 1024, // 10MB limit
    },
  });
};

module.exports = fileUploader;
