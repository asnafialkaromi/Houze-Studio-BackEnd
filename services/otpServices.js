const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const sendEmail = require('../utils/sendEmail');
const { sendSuccess, sendError } = require('../utils/baseResponse');
const generateOTP = require('../utils/otpGenerator');
const { getToday } = require('../utils/dateUtils');

const requestOtp = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        sendError(res, 'Email are required', 400);
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
        if (user.updated_at > getToday() - 60000) {
            sendError(res, 'OTP already sent, Please wait for 1 minutes', 400);
            return;
        }

        const otpNumber = parseInt(generateOTP());

        const updatedUser = await prisma.auth.update({
            where: {
                id: user.id,
            },
            data: {
                otp: otpNumber,
                updated_at: getToday(),
            },
        });
        sendSuccess(res, { otp: otpNumber }, 'OTP sent successfully');
    } catch (error) {
        sendError(res, error.message, 500);
    }
};

module.exports = { requestOtp }