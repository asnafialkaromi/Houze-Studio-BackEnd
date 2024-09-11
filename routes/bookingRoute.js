const express = require('express');
const BookingController = require('../controllers/bookingController');
const uploadImage = require('../middlewares/uploadImage');
const authenticateJWT = require('../middlewares/authenticateJWT');

const router = express.Router();

router.post('/add-booking', uploadImage.single('image'), BookingController.createBooking);
router.get('/bookings', authenticateJWT, BookingController.getBooking);
router.put('/update-booking-status', authenticateJWT, BookingController.updateBookingStatus);

module.exports = router;