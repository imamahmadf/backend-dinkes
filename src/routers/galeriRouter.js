const express = require("express");
const { galeriControllers } = require("../controllers");
const router = express.Router();

router.get("/get", galeriControllers.getFoto);

module.exports = router;
