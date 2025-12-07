const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const { rewardImg } = require("../middleware/upload");

const {
  getAllRewards,
  getRewards,
  getReward,
  createReward,
  updateReward,
  deleteReward,
} = require("../controller/reward");

router.post("/alls", getAllRewards);
router.get("/all", getRewards);
router.get("/:id", getReward);
router.post("/add", auth, rewardImg("picture"), createReward);
router.patch("/edit", auth, rewardImg("picture"), updateReward);
router.delete("/:id", auth, deleteReward);

module.exports = router;
