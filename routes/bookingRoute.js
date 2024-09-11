const express = require('express');
const BookingController = require('../controllers/bookingController');
const uploadImage = require('../middlewares/uploadImage');

const router = express.Router();

router.post('/add-booking', uploadImage.single('image'), BookingController.createBooking);
router.get('/bookings', BookingController.getBooking);
router.put('/update-booking-status', BookingController.updateBookingStatus);

module.exports = router;