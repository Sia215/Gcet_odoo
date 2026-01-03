const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");
const { protect, allowRoles } = require("../middleware/authMiddleware");

router.get(
  "/",
  protect,
  allowRoles("ADMIN"),
  employeeController.getEmployees
);

router.post(
  "/",
  protect,
  allowRoles("ADMIN"),
  employeeController.createEmployee
);

module.exports = router;
