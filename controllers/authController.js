const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { sendSuccess, sendError } = require('../utils/baseResponse');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        sendError(res, 'All fields are required', 400);
        return;
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await prisma.auth.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });
        sendSuccess(res, user, 'User created successfully');
    } catch (error) {
        sendError(res, error.message, 500);
        console.log(error);
    }
};

const sighnIn = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
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
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            sendError(res, 'Invalid credentials', 401);
            return;
        } else {
            const token = jwt.sign({ name: user.name, email: user.email }, process.env.JWT_SECRET, {
                expiresIn: '1d',
            });
            req.session.token = token
            sendSuccess(res, { token: token }, 'User signed in successfully', 200);
            return;
        }
    } catch (error) {
        sendError(res, error.message, 500);
        console.log(error);
    }
};

const resetPassword = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        sendError(res, 'All fields are required', 400);
        return;
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await prisma.auth.update({
            where: {
                email,
            },
            data: {
                password: hashedPassword,
                otp: null,
                updated_at: currentTimeJakarta(),
            },
        });
        sendSuccess(res, { name: user.name, email: user.email }, 'Password reset successfully');
    } catch (error) {
        sendError(res, error.message, 500);
        console.log(error);
    }
};

const getUserData = async (req, res) => {
    const user = req.user;

    sendSuccess(res, { name: user.name, email: user.email }, 'User data fetched successfully');
}

const logout = async (req, res) => {
    res.clearCookie('connect.sid')
    req.session.destroy()
    return sendSuccess(res, {}, 'User logged out successfully');
}

module.exports = { createUser, sighnIn, resetPassword, getUserData, logout };