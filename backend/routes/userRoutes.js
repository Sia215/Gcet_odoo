import express from "express";
import { getUserProfile, updateUserProfile } from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get logged-in user profile
router.get("/me", authMiddleware, getUserProfile);

// Update logged-in user profile
router.put("/me", authMiddleware, updateUserProfile);

export default router;
