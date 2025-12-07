const express = require("express");
const router = express.Router();

const {
  backup,
  restoreDataBackup,
  restoreLogBackup,
  dumpPG,
  restorePG,
  deleteOldFIles,
} = require("../controller/backup");

router.get("/start", backup);
router.get("/restore/data/:filename", restoreDataBackup);
router.get("/restore/log/:filename", restoreLogBackup);
router.get("/dump/postgres", dumpPG);
router.get("/restore/postgres/:filename", restorePG);
router.get("/delete", deleteOldFIles);

module.exports = router;
