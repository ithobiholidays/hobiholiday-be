const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");

const {
  getAllJobPositions,
  getJobPositions,
  getJobPosition,
  createJobPosition,
  updateJobPosition,
  deleteJobPosition,
} = require("../controller/jobPosition");

router.post("/alls", getAllJobPositions);
router.get("/all", getJobPositions);
router.get("/:id", getJobPosition);
router.post("/add", auth, createJobPosition);
router.patch("/edit", auth, updateJobPosition);
router.delete("/:id", auth, deleteJobPosition);

module.exports = router;
