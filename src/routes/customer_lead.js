const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const {
  createCustomerLead,
  getAllCustomerLeads,
  exportCustomerLeads,
  deleteCustomerLead,
} = require("../controller/customer_lead");

router.post("/add", createCustomerLead);
router.post("/alls", auth, getAllCustomerLeads);
router.post("/export", auth, exportCustomerLeads);
router.delete("/:id", auth, deleteCustomerLead);

module.exports = router;