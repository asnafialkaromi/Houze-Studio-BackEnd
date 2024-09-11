const express = require("express");
const router = express.Router();
const bookingRoute = require("./bookingRoute");
const authRouthe = require("./authRoute");

const apiUrl = "/api/v1";

router.use(apiUrl, bookingRoute);
router.use(apiUrl, authRouthe);

module.exports = router;