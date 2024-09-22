const express = require('express');
const BookingController = require('../controllers/bookingController');
const uploadImage = require('../middlewares/uploadImage');
const authenticateJWT = require('../middlewares/authenticateJWT');

const router = express.Router();

router.post('/booking/add', uploadImage.single('image'), BookingController.createBooking);
router.get('/bookings', authenticateJWT, BookingController.getBookings);
router.get('/bookings/count', authenticateJWT, BookingController.getTotalBooking);
router.put('/booking/update', authenticateJWT, BookingController.updateBookingStatus);

module.exports = router;