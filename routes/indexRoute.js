const express = require("express");
const router = express.Router();
const bookingRoute = require("./bookingRoute");
const authRouthe = require("./authRoute");
const catalogRoute = require("./catalogRoute");
const calendarRoute = require("./calendarRoute");

const apiUrl = "/api/v1";

router.use(apiUrl, bookingRoute);
router.use(apiUrl, authRouthe);
router.use(apiUrl, catalogRoute);
router.use(apiUrl, calendarRoute);

module.exports = router;