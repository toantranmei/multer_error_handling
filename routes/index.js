const express = require("express");
const ImageController = require("../controller/Image");
const UploadFile = require("../middleware/UploadImage");

const router = express.Router();

router.post("/image", UploadFile.array("./uploads", "files", 25), ImageController.save );

module.exports = router;
