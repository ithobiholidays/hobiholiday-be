const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "banner") {
      cb(null, "uploads/banner");
    } else if (file.fieldname === "itenerary") {
      cb(null, "uploads/itenerary");
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname.replace(/\s/g, ""));
  },
});

const fileFilter = (req, file, cb) => {
  if (file.fieldname === "banner") {
    if (
      !file.originalname.match(
        /\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|webp|WEBP|svg|SVG)$/
      )
    ) {
      return cb(new Error("Only image files are allowed"), false);
    }
  } else if (file.fieldname === "itenerary") {
    if (!file.originalname.match(/\.(doc|DOC|docx|DOCX|pdf|PDF)$/)) {
      return cb(new Error("Only document files are allowed"), false);
    }
  }
  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 15 * 1024 * 1024 },
}).fields([
  { name: "banner", maxCount: 1 },
  { name: "itenerary", maxCount: 1 },
]);

console.log(upload);

module.exports = upload;
