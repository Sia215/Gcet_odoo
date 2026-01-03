import express from "express";
import { getMyPayroll, getAllPayrolls, createOrUpdatePayroll } from "../controllers/payrollController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Employee views own payroll
router.get("/me", authMiddleware, getMyPayroll);

// Admin views all payrolls
router.get("/", authMiddleware, roleMiddleware("ADMIN"), getAllPayrolls);

// Admin creates/updates payroll
router.post("/", authMiddleware, roleMiddleware("ADMIN"), createOrUpdatePayroll);

export default router;
