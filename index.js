require('dotenv').config();
const express = require("express");
const indexRoutes = require("./routes/indexRoute");
const cors = require('cors');
const session = require('express-session');

const app = express();
const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
    optionSuccessStatus: 200,
};
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        saveUninitialized: false,
        resave: false,
        proxy: true,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24,
            secure: false,
            httpOnly: false,
            sameSite: 'strict',
        },
    })
);
app.use(indexRoutes);

app.get("/", (req, res) => {
    res.status(200).json({ message: "Server Has Been Running Successfully" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});