const express = require('express');
const BookingController = require('../controllers/bookingController');
const uploadImage = require('../middlewares/uploadImage');

const router = express.Router();

router.post('/bookings', uploadImage.single('image'), BookingController);

module.exports = router;