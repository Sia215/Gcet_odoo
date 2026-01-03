import express from "express";
import { applyLeave, getMyLeaves, approveLeave } from "../controllers/leaveController.js";
import authMiddleware from "../middleware/authMiddleware.js";

import { roleMiddleware } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Employee applies for leave
router.post("/", authMiddleware, applyLeave);

// Employee views own leaves
router.get("/", authMiddleware, getMyLeaves);

// Admin approves/rejects leave
router.put("/:id", authMiddleware, roleMiddleware("ADMIN"), approveLeave);

export default router;
