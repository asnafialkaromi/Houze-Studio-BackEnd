const express = require("express");
const router = express.Router();
const bookingRoute = require("./bookingRoute");

const apiUrl = "/api/v1";

router.use(apiUrl, bookingRoute);

module.exports = router;