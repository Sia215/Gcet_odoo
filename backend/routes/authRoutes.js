import express from "express";
import {
  createEmployee,
  signIn,
  changePassword
} from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js"; // if you want to protect routes

const router = express.Router();

// ✅ Only HR/Admin can create employee accounts
router.post("/create-employee", authMiddleware, createEmployee);

// ✅ Employee login using Employee ID
router.post("/signin", signIn);

// ✅ First-time password change (after login)
router.post("/change-password", authMiddleware, changePassword);

export default router;
