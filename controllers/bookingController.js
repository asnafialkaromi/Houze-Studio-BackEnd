const cloudinary = require('../config/cloudinaryConfig');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { sendSuccess, sendError, sendSuccessGetPaginationData } = require('../utils/baseResponse');
const { getToday, getTodayRange } = require('../utils/dateUtils');
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
                created_at: getToday(),
                updated_at: getToday(),
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
                created_at: getToday(),
                updated_at: getToday(),
                catalog_id: catalog_id,
            },
        });

        return sendSuccess(res, { bookings, payment }, "Booking Success");
    } catch (error) {
        console.error(error);
        return sendError(res, error);
    }
}

const getBookings = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;

        const skip = (page - 1) * limit;
        const take = parseInt(limit);

        const bookings = await prisma.booking.findMany(
            {
                skip,
                take,
                orderBy: { id: 'desc' },
                include: {
                    payment: true,
                },
            });

        const totalItems = await prisma.booking.count();

        const normalizedResponse = bookings.map(booking => ({
            booking_id: booking.id,
            customer_name: booking.customer_name,
            email: booking.email,
            phone_number: booking.phone_number,
            price: booking.price,
            schedule: booking.schedule,
            notes: booking.notes,
            booking_status: booking.booking_status,
            catalog_id: booking.catalog_id,
            payment_id: booking.payment_id,
            account_name: booking.payment.account_name,
            account_number: booking.payment.account_number,
            payment_method: booking.payment.payment_method,
            transfer_nominal: booking.payment.transfer_nominal,
            payment_status: booking.payment.status,
        }));

        return sendSuccessGetPaginationData(res, page, limit, totalItems, normalizedResponse, "Success");
    } catch (error) {
        console.error(error);
        return sendError(res, 'Failed to retrieve bookings', 500);
    }
};

const getBookingById = async (req, res) => {
    try {
        const { booking_id } = req.params;
        const booking = await prisma.booking.findUnique({
            where: {
                id: booking_id,
            },
            include: {
                payment: true,
            },
        });

        if (!booking) {
            return sendError(res, 'Booking not found', 404);
        }

        const normalizedResponse = {
            booking_id: booking.id,
            customer_name: booking.customer_name,
            email: booking.email,
            phone_number: booking.phone_number,
            price: booking.price,
            schedule: booking.schedule,
            notes: booking.notes,
            booking_status: booking.booking_status,
            catalog_id: booking.catalog_id,
            payment_id: booking.payment_id,
            account_name: booking.payment.account_name,
            account_number: booking.payment.account_number,
            payment_method: booking.payment.payment_method,
            transfer_nominal: booking.payment.transfer_nominal,
            payment_status: booking.payment.status,
        };

        return sendSuccess(res, normalizedResponse, "Success");
    } catch (error) {
        console.error(error);
        return sendError(res, 'Failed to retrieve booking', 500);
    }
};

const updateBookingStatus = async (req, res) => {
    try {
        const { booking_id, booking_status, payment_status } = req.body;
        const booking = await prisma.booking.update({
            where: {
                id: booking_id,
            },
            data: {
                booking_status,
                updated_at: getToday(),
                payment: {
                    update: {
                        status: payment_status,
                        updated_at: getToday(),
                    },
                },
            },
            include: {
                payment: true,
            },
        });

        return sendSuccess(res, booking, "Success");
    } catch (error) {
        console.error(error);
        return sendError(res, 'Failed to update booking status', 500);
    }
};

const getTotalBooking = async (req, res) => {
    try {
        const { startOfToday, endOfToday } = getTodayRange();

        const totalBooking = await prisma.booking.count();
        const todayBooking = await prisma.booking.count({
            where: { created_at: { gte: startOfToday, lte: endOfToday } },
        })
        const completedBooking = await prisma.booking.count({
            where: { booking_status: 'Completed' },
        })
        const pendingBooking = await prisma.booking.count({
            where: { booking_status: 'Active' },
        })
        const canceledBooking = await prisma.booking.count({
            where: { booking_status: 'Canceled' },
        })

        const acumulatedData = {
            totalBookings: totalBooking,
            todayBookings: todayBooking,
            completedBookings: completedBooking,
            pendingBookings: pendingBooking,
            canceledBookings: canceledBooking
        }

        return sendSuccess(res, acumulatedData, "Get total booking data success");
    } catch (error) {
        console.error(error);
        return sendError(res, 'Failed to get total booking', 500);
    }
};

module.exports = { createBooking, getBookings, getBookingById, updateBookingStatus, getTotalBooking };