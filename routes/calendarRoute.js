const express = require("express");
const calendarController = require("../controllers/calendarController");

const router = express.Router();

router.get("/events/:day", calendarController.getEvents);

module.exports = router;