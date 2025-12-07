const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const { CVDocs } = require("../middleware/upload");

const {
  getAllCVs,
  getCVs,
  filterByPosition,
  filterByPositionWithPagination,
  createCV,
  updateCVStatus,
  deleteCV,
  getCVstatuses,
  filterByStatus,
  filterByStatusWithPagination,
} = require("../controller/cv");

router.post("/alls", getAllCVs);
router.get("/all", getCVs);
router.post("/pos", filterByPosition);
router.post("/pos-pagination", filterByPositionWithPagination);
router.post("/add", CVDocs("document"), createCV);
router.post("/edit", auth, updateCVStatus);
router.delete("/:id", auth, deleteCV);
router.get("/stat", filterByStatus);
router.post("/stat-pagination", filterByStatusWithPagination);

router.get("/status", getCVstatuses);

module.exports = router;
