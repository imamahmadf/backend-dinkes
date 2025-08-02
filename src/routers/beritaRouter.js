const express = require("express");
const { beritaControllers } = require("../controllers");
const fileUploader = require("../middleware/uploader");
const { sanitizeBeritaInput } = require("../middleware/validation");
const routers = express.Router();

// Konfigurasi uploader untuk gambar
const uploader = fileUploader({
  destinationFolder: "berita",
  fileTypes: ["image/jpeg", "image/png", "image/gif", "image/webp"],
  prefix: "BERITA",
});

routers.post(
  "/post",
  uploader.single("gambar"),
  sanitizeBeritaInput,
  beritaControllers.postBerita
);
routers.get("/get/seed", beritaControllers.getSeed);
routers.get("/list", beritaControllers.getListBerita);
routers.get("/get/all", beritaControllers.getAllBerita);
routers.get("/get/detail/:slug", beritaControllers.getDetailberita);
module.exports = routers;
