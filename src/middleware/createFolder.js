const fs = require("fs");
const path = require("path");
const { logger } = require("./activityLog");

exports.ensureFolderExisted = () => {
  // Navigate to the root directory where index.js is located
  const rootDir = path.join(__dirname, "../../");

  const iteneraryFolder = path.join(rootDir, "uploads/itenerary");
  const bannerFolder = path.join(rootDir, "uploads/banner");
  const blogsFolder = path.join(rootDir, "uploads/blogs");
  const cvFolder = path.join(rootDir, "uploads/cv");
  const teamFolder = path.join(rootDir, "uploads/team");
  const rewardFolder = path.join(rootDir, "uploads/reward");
  const backupFolder = path.join(rootDir, "backup");
  const dataFolder = path.join(rootDir, "data");
  const pgadminFolder = path.join(rootDir, "data/pgadmin");
  const postgresFolder = path.join(rootDir, "data/postgres");
  const logFolder = path.join(rootDir, "log");
  const accessLog = path.join(rootDir, "log/access");
  const activityLog = path.join(rootDir, "log/activity");
  const debugLog = path.join(rootDir, "log/activity/debug");
  const errorLog = path.join(rootDir, "log/activity/error");
  const httpLog = path.join(rootDir, "log/activity/http");
  const infoLog = path.join(rootDir, "log/activity/info");
  const verboseLog = path.join(rootDir, "log/activity/verbose");
  const warnLog = path.join(rootDir, "log/activity/warn");

  // Check if itenerary folder exists or not
  if (!fs.existsSync(iteneraryFolder)) {
    fs.mkdirSync(iteneraryFolder, { recursive: true });
    console.log("Itenerary folder created.");
    logger.info("Itenerary folder created.");
  } else {
    console.log("Itenerary folder existed.");
    logger.info("Itenerary folder existed.");
  }

  // Check if banner folder exists or not
  if (!fs.existsSync(bannerFolder)) {
    fs.mkdirSync(bannerFolder, { recursive: true });
    console.log("Banner folder created.");
    logger.info("Banner folder created.");
  } else {
    console.log("Banner folder existed.");
    logger.info("Banner folder existed.");
  }

  // Check if blogs folder exists or not
  if (!fs.existsSync(blogsFolder)) {
    fs.mkdirSync(blogsFolder, { recursive: true });
    console.log("Banner folder created.");
    logger.info("Banner folder created.");
  } else {
    console.log("Banner folder existed.");
    logger.info("Banner folder existed.");
  }

  // Check if cv folder exists or not
  if (!fs.existsSync(cvFolder)) {
    fs.mkdirSync(cvFolder, { recursive: true });
    console.log("CV folder created.");
    logger.info("CV folder created.");
  } else {
    console.log("CV folder existed.");
    logger.info("CV folder existed.");
  }

  // Check if team folder exists or not
  if (!fs.existsSync(teamFolder)) {
    fs.mkdirSync(teamFolder, { recursive: true });
    console.log("Team folder created.");
    logger.info("Team folder created.");
  } else {
    console.log("Team folder existed.");
    logger.info("Team folder existed.");
  }

  // Check if reward folder exists or not
  if (!fs.existsSync(rewardFolder)) {
    fs.mkdirSync(rewardFolder, { recursive: true });
    console.log("Reward folder created.");
    logger.info("Reward folder created.");
  } else {
    console.log("Reward folder existed.");
    logger.info("Reward folder existed.");
  }

  // Check if backup folder exists or not
  if (!fs.existsSync(backupFolder)) {
    fs.mkdirSync(backupFolder, { recursive: true });
    console.log("Backup folder created.");
    logger.info("Backup folder created.");
  } else {
    console.log("Backup folder existed.");
    logger.info("Backup folder existed.");
  }

  // Check if data folder exists or not
  if (!fs.existsSync(dataFolder)) {
    fs.mkdirSync(dataFolder, { recursive: true });
    console.log("Data folder created.");
    logger.info("Data folder created.");
  } else {
    console.log("Data folder existed.");
    logger.info("Data folder existed.");
  }

  // Check if pgadmin folder exists or not
  if (!fs.existsSync(pgadminFolder)) {
    fs.mkdirSync(pgadminFolder, { recursive: true });
    console.log("PG Admin folder created.");
    logger.info("PG Admin folder created.");
  } else {
    console.log("PG Admin folder existed.");
    logger.info("PG Admin folder existed.");
  }

  // Check if postgres folder exists or not
  if (!fs.existsSync(postgresFolder)) {
    fs.mkdirSync(postgresFolder, { recursive: true });
    console.log("PostgreSQL folder created.");
    logger.info("PostgreSQL folder created.");
  } else {
    console.log("PostgreSQL folder existed.");
    logger.info("PostgreSQL folder existed.");
  }

  // Check if log folder exists or not
  if (!fs.existsSync(logFolder)) {
    fs.mkdirSync(logFolder, { recursive: true });
    console.log("Log folder created.");
    logger.info("Log folder created.");
  } else {
    console.log("Log folder existed.");
    logger.info("Log folder existed.");
  }

  // Check if access log folder exists or not
  if (!fs.existsSync(accessLog)) {
    fs.mkdirSync(accessLog, { recursive: true });
    console.log("Access log folder created.");
    logger.info("Access log folder created.");
  } else {
    console.log("Access log folder existed.");
    logger.info("Access log folder existed.");
  }

  // Check if activity log folder exists or not
  if (!fs.existsSync(activityLog)) {
    fs.mkdirSync(activityLog, { recursive: true });
    console.log("Activity log folder created.");
    logger.info("Activity log folder created.");
  } else {
    console.log("Activity log folder existed.");
    logger.info("Activity log folder existed.");
  }

  // Check if activity debug log folder exists or not
  if (!fs.existsSync(debugLog)) {
    fs.mkdirSync(debugLog, { recursive: true });
    console.log("Activity debug log folder created.");
    logger.info("Activity debug log folder created.");
  } else {
    console.log("Activity debug log folder existed.");
    logger.info("Activity debug log folder existed.");
  }

  // Check if activity log folder exists or not
  if (!fs.existsSync(errorLog)) {
    fs.mkdirSync(errorLog, { recursive: true });
    console.log("Activity error log folder created.");
    logger.info("");
  } else {
    console.log("Activity errorlog folder existed.");
    logger.info("Activity error log folder created.");
  }

  // Check if activity log folder exists or not
  if (!fs.existsSync(httpLog)) {
    fs.mkdirSync(httpLog, { recursive: true });
    console.log("Activity http log folder created.");
    logger.info("Activity http log folder created.");
  } else {
    console.log("Activity http log folder existed.");
    logger.info("Activity http log folder existed.");
  }

  // Check if activity log folder exists or not
  if (!fs.existsSync(infoLog)) {
    fs.mkdirSync(infoLog, { recursive: true });
    console.log("Activity info log folder created.");
    logger.info("Activity info log folder created.");
  } else {
    console.log("Activity info log folder existed.");
    logger.info("Activity info log folder existed.");
  }

  // Check if activity log folder exists or not
  if (!fs.existsSync(verboseLog)) {
    fs.mkdirSync(verboseLog, { recursive: true });
    console.log("Activity verbose log folder created.");
    logger.info("Activity verbose log folder created.");
  } else {
    console.log("Activity verbose log folder existed.");
    logger.info("Activity verbose log folder existed.");
  }

  // Check if activity log folder exists or not
  if (!fs.existsSync(warnLog)) {
    fs.mkdirSync(warnLog, { recursive: true });
    console.log("Activity warn log folder created.");
    logger.info("Activity warn log folder created.");
  } else {
    console.log("Activity warn log folder existed.");
    logger.info("Activity warn log folder existed.");
  }
};
