require('dotenv').config();
const express = require("express");
const indexRoutes = require("./routes/indexRoute");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(indexRoutes);

app.get("/", (req, res) => {
    res.status(200).json({ message: "Server Has Been Running Successfully" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});