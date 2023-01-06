const express = require("express");
const router = express.Router();
const productController = require("../controller/products");

router.get("/", productController.getIndex);
router.post("/", productController.postAddProduct);

module.exports = router;
