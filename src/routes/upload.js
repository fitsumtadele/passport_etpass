const express = require("express");
const router = express.Router();
const controller = require("../controller/file.controller");

router.post("/upload", controller.upload);
router.post("/upload_viditure", controller.upload_viditure);


module.exports = router;