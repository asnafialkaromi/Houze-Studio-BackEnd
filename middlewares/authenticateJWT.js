const jwt = require("jsonwebtoken");
const { sendError } = require("../utils/baseResponse");

const authenticateJWT = (req, res, next) => {
    const token = req.session.token;
    if (!token) {
        sendError(res, "Unauthorized", 401);
        return;
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            sendError(res, "Unauthorized", 401);
            return;
        }
        req.user = user;
        next();
    });
};

module.exports = authenticateJWT;