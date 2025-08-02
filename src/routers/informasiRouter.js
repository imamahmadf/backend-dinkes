const express = require("express");
const multer = require("multer");
const { informasiControllers } = require("../controllers");
const fileUploader = require("../middleware/uploader");
const { sanitizeInformasiInput } = require("../middleware/validation");
const router = express.Router();

// Konfigurasi uploader untuk file PDF
const uploader = fileUploader({
  destinationFolder: "informasi",
  fileTypes: ["application/pdf"],
  prefix: "INFORMASI",
});

// Middleware untuk handle error upload
const handleUploadError = (err, req, res, next) => {
  console.log("Upload error:", err);

  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        message: "File terlalu besar (maksimal 10MB)",
        code: 400,
      });
    }
    if (err.code === "LIMIT_FILE_COUNT") {
      return res.status(400).json({
        message: "Terlalu banyak file",
        code: 400,
      });
    }
    if (err.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(400).json({
        message: 'Field file tidak sesuai. Gunakan field "file" untuk file PDF',
        code: 400,
      });
    }
  }

  if (err.message && err.message.includes("Invalid file type")) {
    return res.status(400).json({
      message: "Tipe file tidak didukung. Hanya file PDF yang diperbolehkan",
      code: 400,
    });
  }

  return res.status(500).json({
    message: "Error saat upload file",
    code: 500,
  });
};

// Endpoint test untuk debugging
router.post("/test-upload", uploader.single("file"), (req, res) => {
  console.log("Test upload - Request body:", req.body);
  console.log("Test upload - Request file:", req.file);

  return res.status(200).json({
    message: "Test upload berhasil",
    body: req.body,
    file: req.file,
  });
});

router.get("/get/seed", informasiControllers.getSeed);
router.get("/get/:id", informasiControllers.getInformasi);
router.post(
  "/post",
  uploader.single("file"),
  handleUploadError,

  informasiControllers.postInformasi
);

module.exports = router;
