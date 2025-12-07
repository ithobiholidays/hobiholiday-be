const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const { teamImg } = require("../middleware/upload");

const {
  getAllTeams,
  getTeams,
  getTeam,
  createTeam,
  updateTeam,
  deleteTeam,
} = require("../controller/team");

router.post("/alls", getAllTeams);
router.get("/all", getTeams);
router.get("/:id", getTeam);
router.post("/add", auth, teamImg("picture"), createTeam);
router.patch("/edit", auth, teamImg("picture"), updateTeam);
router.delete("/:id", auth, deleteTeam);

module.exports = router;
