const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { sendSuccess, sendError } = require('../utils/baseResponse');
const { getToday } = require('../utils/dateUtils');

const verifyOtp = async (req, res, next) => {
    const { email, otp } = req.body;
    if (!email || !otp) {
        sendError(res, 'All fields are required', 400);
        return;
    }

    try {
        const user = await prisma.auth.findFirst({
            where: {
                email,
            },
        });
        if (!user) {
            sendError(res, 'User not found', 404);
            return;
        }

        const otpNumber = parseInt(otp);

        if (user.otp !== otpNumber) {
            sendError(res, 'Invalid OTP', 400);
            return;
        }
        if (user.updated_at < getToday() - 210000) {
            sendError(res, 'OTP expired', 400);
            return;
        }
        next();
    } catch (error) {
        sendError(res, error.message, 500);
        console.log(error);
    }
};

module.exports = verifyOtp;