const express = require("express");
const ImageController = require("../controller/Image");
const UploadFile = require("../middleware/UploadImage");

const router = express.Router();

router.post("/image", (req, res, next) => {
  req.uid = "122313";
  next();
}, UploadFile.array("./uploads", "files", 25, null, "uid"), ImageController.save );

module.exports = router;
