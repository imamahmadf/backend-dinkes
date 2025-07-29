const express = require("express");
const { titikControllers } = require("../controllers");
const router = express.Router();

router.get("/get", titikControllers.getTitik);
router.post("/post", titikControllers.addTitik);
router.get("/get-pusban", titikControllers.getPusban);
router.get("/get/detail-pusban/:id", titikControllers.getDetailPusban);
module.exports = router;
