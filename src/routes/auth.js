const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");

const { login, register, verify, logout } = require("../controller/auth");

router.post("/login", login);
router.post("/register", register);
router.get("/verify", auth, verify);
router.get("/logout", auth, logout);

module.exports = router;
