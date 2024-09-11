const express = require("express");
const authController = require("../controllers/authController");
const otpServices = require("../services/otpServices");
const verifyOtp = require("../middlewares/verifyOtp");
const authenticateJWT = require("../middlewares/authenticateJWT");

const router = express.Router();

router.post("/register", authController.createUser);
router.post("/login", authController.sighnIn);
router.post("/reset-password", verifyOtp, authController.resetPassword);
router.get("/me", authenticateJWT, authController.getUserData);
router.post("/logout", authController.logout);
router.post("/otp", otpServices.requestOtp);

module.exports = router