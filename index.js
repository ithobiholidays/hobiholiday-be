const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { Connection } = require("./config");
const { ensureFolderExisted } = require("./src/middleware/createFolder");
const { accessLog } = require("./src/middleware/accessLog");
const { formatErrorToHTML } = require("./src/middleware/convertToHtml");
const { cronBackup } = require("./src/middleware/backup");
const { publishScheduledPosts } = require("./src/middleware/scheduledPost");
const {
  deleteExpiredSessions,
} = require("./src/middleware/scheduledDeleteSession");

const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const { globalSanitizer } = require("./src/middleware/globalSanitizer");

const { activityLogger, logger } = require("./src/middleware/activityLog");

// Ensure necessary folders exist
ensureFolderExisted();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Register upload paths
app.use("/uploads", express.static("uploads"));
app.set("trust proxy", 1);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // Limit each IP to 1000 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// app.use(limiter);
app.use(helmet());
app.use(globalSanitizer);

// Logging
app.use(accessLog);
app.use(activityLogger);

// Routes
const authRoute = require("./src/routes/auth");
const migrateRoute = require("./src/routes/migrate");
const categoryRoutes = require("./src/routes/category");
const backupRoutes = require("./src/routes/backup");
const productRoutes = require("./src/routes/product");
const blogRoutes = require("./src/routes/blog");
const blogCategoryRoutes = require("./src/routes/blogCategory");
const jobPositionRoutes = require("./src/routes/jobPosition");
const cvRoutes = require("./src/routes/cv");
const testimoniesRoutes = require("./src/routes/testimony");
const teamRoutes = require("./src/routes/team");
const rewardRoutes = require("./src/routes/reward");
const dashboardRoutes = require("./src/routes/dashboard");

// Endpoint
app.use("/auth", authRoute);
app.use("/migrate", migrateRoute);
app.use("/category", categoryRoutes);
app.use("/backup", backupRoutes);
app.use("/product", productRoutes);
app.use("/blogs", blogRoutes);
app.use("/cat", blogCategoryRoutes);
app.use("/jobpos", jobPositionRoutes);
app.use("/cv", cvRoutes);
app.use("/testi", testimoniesRoutes);
app.use("/team", teamRoutes);
app.use("/reward", rewardRoutes);
app.use("/dashboard", dashboardRoutes);

app.get("/", (req, res) => {
  res.status(200).send({
    status: "Success",
    message: "Your API is running",
  });
});

app.get("/error", (req, res, next) => {
  const err = new Error("This is a test error");
  err.status = 500;
  next(err);
});

app.use((err, req, res, next) => {
  const errorMessage = `Error - IP: ${req.ip}, Method: ${req.method}, URL: ${
    req.originalUrl
  }, Status: ${err.status || 500}, Message: ${err.message}`;

  const errorLog = {
    message: errorMessage,
    error: err.stack,
  };

  logger.error(errorLog);

  res
    .status(err.status || 500)
    .send(formatErrorToHTML("Error Has Been Occured", err.stack));
});

Connection();
cronBackup();
publishScheduledPosts();
deleteExpiredSessions();
const port = process.env.PORT;
app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
  console.log(`Server is running on port ${port}`);
});
