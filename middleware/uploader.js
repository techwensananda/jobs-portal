const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: "images/",
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const uploader = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const supportedFiles = /png|jpg|pdf/;
    const extension = path.extname(file.originalname);
    if (supportedFiles.test(extension)) {
      cb(null, true);
    } else {
      cb(new Error("Must be PNG,JPG or PDF"));
    }
  },
  limits: { fileSize: 5000000 },
});
module.exports = uploader;
