const xss = require("xss");

const globalSanitizer = (req, res, next) => {
  if (req.body) {
    if (typeof req.body.content === "string") {
      req.body.content = xss(req.body.content);
    }
    if (typeof req.body.description === "string") {
      req.body.description = xss(req.body.description);
    }
  }
  next();
};

module.exports = { globalSanitizer };
