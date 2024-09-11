const express = require("express");
const catalogController = require("../controllers/catalogController");
const authenticateJWT = require("../middlewares/authenticateJWT");
const uploadImage = require("../middlewares/uploadImage");

const router = express.Router();

router.post("/add-catalog", authenticateJWT, uploadImage.array('image', 5), catalogController.createCatalog);
router.get("/catalogs", authenticateJWT, catalogController.getCatalog);

module.exports = router