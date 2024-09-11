const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: process.env.HOST_SMTP,
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
});

function sendEMail(to, OTP) {
    try {
        const mailOptions = {
            from: {
                name: "OTP Verification code",
                address: "no-reply@gmail.com",
            },
            replyTo: process.env.EMAIL,
            to,
            subject: "OTP Verification code",
            html: "<p>OTP: " + OTP + "</p>",
        };
        transporter.sendMail(mailOptions);
    } catch (error) {
        return error;
    }
}
module.exports = sendEMail;