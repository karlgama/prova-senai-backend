const multer = require("multer");

module.exports = {
  Multer: multer({
    storage: multer.memoryStorage(),
    limits: 1024 * 1024,
  }),
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      "image/jpeg",
      "image/png",
      "image/pjpeg",
      "image/gif",
    ];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("invalid file type."));
    }
  },
  uploadImage: require("../services/firebase"),
};
