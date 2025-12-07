const express = require("express");
const router = express.Router();

const {
  migrate,
  dropTable,
  seeding,
  unseeding,
} = require("../controller/migration");

router.get("/up", migrate);
router.get("/down", dropTable);
router.get("/seeding", seeding);
router.get("/unseeding", unseeding);

module.exports = router;
