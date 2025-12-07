const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");

const {
  getAllTestimonies,
  getTestimonies,
  getTestimony,
  createTestimony,
  updateTestimony,
  deleteTestimony,
} = require("../controller/testimony");

router.post("/alls", getAllTestimonies);
router.get("/all", getTestimonies);
router.get("/:id", getTestimony);
router.post("/add", auth, createTestimony);
router.patch("/edit", auth, updateTestimony);
router.delete("/:id", auth, deleteTestimony);

module.exports = router;
