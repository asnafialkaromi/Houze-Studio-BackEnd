const express = require("express");
const calendarController = require("../controllers/calendarController");

const router = express.Router();

router.get("/event/:day", calendarController.getEvents);
router.post("/event/add", calendarController.createEvent);

module.exports = router;