const express = require("express");
const router = express.Router();

const { dashboardView } = require("../controller/dashboard");

router.get("/all", dashboardView);

module.exports = router;
