const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/signup", authController.signup);
router.post("/signin", authController.signin);

// simple ping for frontend
router.get("/ping", (req, res) => res.json({ ok: true }));

module.exports = router;
