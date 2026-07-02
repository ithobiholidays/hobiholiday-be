const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const {
  createCustomerLead,
  getAllCustomerLeads,
} = require("../controller/customer_lead");

router.post("/add", createCustomerLead);
router.post("/alls", auth, getAllCustomerLeads);

module.exports = router;