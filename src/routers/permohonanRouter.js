const express = require("express");
const { permohonanControllers } = require("../controllers");
const fileUploader = require("../middleware/uploader");
const routers = express.Router();

routers.post(
  "/post",
  fileUploader({
    destinationFolder: "permohonan",
    fileTypes: ["image/jpeg", "image/png", "image/jpg"],
    prefix: "KTP",
  }).single("pic"),
  permohonanControllers.postPermohonan
);

routers.get("/get/status", permohonanControllers.cekPermohonan);
routers.get("/get", permohonanControllers.getPermohonan);
routers.post("/post/keberatan", permohonanControllers.postKeberatan);

module.exports = routers;
  