const multer = require("multer");

exports.profileImg = (img) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/profile");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname.replace(/\s/g, ""));
    },
  });

  const fileFilter = (req, file, cb) => {
    if (file.fieldname === img) {
      if (
        !file.originalname.match(
          /\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|webp|WEBP|svg|SVG)$/
        )
      ) {
        req.fileValidationError = {
          message: "Only image files are allowed",
        };
        return cb(new Error("Only image files are allowed"), false);
      }
    }
    cb(null, true);
  };

  const maxSize = 10 * 1024 * 1024;

  const upload = multer({
    storage,
    fileFilter,
    limits: {
      fileSize: maxSize,
    },
  }).single(img);

  return upload;
};

exports.blogsImg = (img) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/blogs");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname.replace(/\s/g, ""));
    },
  });

  const fileFilter = (req, file, cb) => {
    if (file.fieldname === img) {
      if (
        !file.originalname.match(
          /\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|webp|WEBP|svg|SVG)$/
        )
      ) {
        req.fileValidationError = {
          message: "Only image files are allowed",
        };
        return cb(new Error("Only image files are allowed"), false);
      }
    }
    cb(null, true);
  };

  const maxSize = 10 * 1024 * 1024;

  const upload = multer({
    storage,
    fileFilter,
    limits: {
      fileSize: maxSize,
    },
  }).single(img);

  return upload;
};

exports.iteneraryDocs = (docs) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/itenerary");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname.replace(/\s/g, ""));
    },
  });

  const fileFilter = (req, file, cb) => {
    if (file.fieldname === docs) {
      if (!file.originalname.match(/\.(doc|DOC|docx|DOCX|pdf|PDF)$/)) {
        req.fileValidationError = {
          message: "Only document files are allowed",
        };
        return cb(new Error("Only document files are allowed"), false);
      }
    }
    cb(null, true);
  };

  const maxSize = 10 * 1024 * 1024;

  const upload = multer({
    storage,
    fileFilter,
    limits: {
      fileSize: maxSize,
    },
  }).single(docs);

  return upload;
};

exports.CVDocs = (doc) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/cv");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname.replace(/\s/g, ""));
    },
  });

  const fileFilter = (req, file, cb) => {
    if (file.fieldname === doc) {
      if (!file.originalname.match(/\.(doc|DOC|docx|DOCX|pdf|PDF)$/)) {
        req.fileValidationError = {
          message: "Only image files are allowed",
        };
        return cb(new Error("Only document files are allowed"), false);
      }
    }
    cb(null, true);
  };

  const maxSize = 10 * 1024 * 1024;

  const upload = multer({
    storage,
    fileFilter,
    limits: {
      fileSize: maxSize,
    },
  }).single(doc);

  return upload;
};

exports.teamImg = (img) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/team");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname.replace(/\s/g, ""));
    },
  });

  const fileFilter = (req, file, cb) => {
    if (file.fieldname === img) {
      if (
        !file.originalname.match(
          /\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|webp|WEBP|svg|SVG)$/
        )
      ) {
        req.fileValidationError = {
          message: "Only image files are allowed",
        };
        return cb(new Error("Only image files are allowed"), false);
      }
    }
    cb(null, true);
  };

  const maxSize = 10 * 1024 * 1024;

  const upload = multer({
    storage,
    fileFilter,
    limits: {
      fileSize: maxSize,
    },
  }).single(img);

  return upload;
};

exports.rewardImg = (img) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/reward");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname.replace(/\s/g, ""));
    },
  });

  const fileFilter = (req, file, cb) => {
    if (file.fieldname === img) {
      if (
        !file.originalname.match(
          /\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|webp|WEBP|svg|SVG)$/
        )
      ) {
        req.fileValidationError = {
          message: "Only image files are allowed",
        };
        return cb(new Error("Only image files are allowed"), false);
      }
    }
    cb(null, true);
  };

  const maxSize = 10 * 1024 * 1024;

  const upload = multer({
    storage,
    fileFilter,
    limits: {
      fileSize: maxSize,
    },
  }).single(img);

  return upload;
};
