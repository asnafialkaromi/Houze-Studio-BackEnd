const cloudinary = require('../config/cloudinaryConfig');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { sendSuccess, sendError } = require('../utils/baseResponse');

const createBooking = async (req, res) => {
    const { account_name, account_number, payment_method, transfer_nominal, customer_name, email, phone_number, price, notes, schedule, catalog_id } = req.body;
    try {
        const imageUpload = await cloudinary.uploader.upload(req.file.path, {
            folder: 'payments',
        });

        const status = 'Pending';

        const payment = await prisma.payment.create({
            data: {
                account_name,
                account_number,
                payment_method,
                status: status,
                transfer_nominal: parseFloat(transfer_nominal),
                img_url: imageUpload.secure_url,
                created_at: new Date(),
                updated_at: new Date(),
            },
        });

        const latestBooking = await prisma.booking.findFirst({
            orderBy: { id: 'desc' },
        });

        let newBookingId = 'B0001';
        if (latestBooking) {
            const lastIdNumber = parseInt(latestBooking.id.slice(1));
            const newIdNumber = lastIdNumber + 1;
            newBookingId = `B${newIdNumber.toString().padStart(4, '0')}`;
        }

        const booking_status = 'Active';

        const bookings = await prisma.booking.create({
            data: {
                id: newBookingId,
                customer_name,
                payment_id: payment.id,
                email,
                phone_number,
                price: parseFloat(price),
                notes,
                schedule: new Date(schedule),
                booking_status: booking_status,
                created_at: new Date(),
                updated_at: new Date(),
                catalog_id: catalog_id,
            },
        });

        return sendSuccess(res, { bookings, payment }, "Booking Success");

    } catch (error) {
        return sendError(res, error);
    }
}

module.exports = createBooking;