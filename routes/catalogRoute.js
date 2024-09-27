const express = require("express");
const catalogController = require("../controllers/catalogController");
const authenticateJWT = require("../middlewares/authenticateJWT");
const uploadImage = require("../middlewares/uploadImage");

const router = express.Router();

router.post("/catalog/add", authenticateJWT, uploadImage.array('image', 5), catalogController.createCatalog);
router.get("/catalogs", catalogController.getCatalog);
router.get("/catalog/:id", catalogController.getCatalogById);

module.exports = router