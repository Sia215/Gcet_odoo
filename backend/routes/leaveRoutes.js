const express = require("express");
const router = express.Router();
const leaveController = require("../controllers/leaveController");
const { protect, allowRoles } = require("../middleware/authMiddleware");

// employee
router.post("/", protect, leaveController.applyLeave);
router.get("/me", protect, leaveController.getMyLeaves);

// admin
router.get(
  "/",
  protect,
  allowRoles("ADMIN"),
  leaveController.getAllLeaves
);
router.patch(
  "/:id/approve",
  protect,
  allowRoles("ADMIN"),
  leaveController.approveLeave
);
router.patch(
  "/:id/reject",
  protect,
  allowRoles("ADMIN"),
  leaveController.rejectLeave
);

module.exports = router;
