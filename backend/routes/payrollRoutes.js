const express = require("express");
const router = express.Router();
const payrollController = require("../controllers/payrollController");
const { protect, allowRoles } = require("../middleware/authMiddleware");

// employee
router.get("/me", protect, payrollController.getMyPayroll);

// admin
router.get(
  "/",
  protect,
  allowRoles("ADMIN"),
  payrollController.getAllPayroll
);

module.exports = router;
