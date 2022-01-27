const express = require("express");
const { route } = require("../app");
const router = express.Router();

const {
  getProduct,
  newProduct,
  getProductById,
  updateProduct,
  deleteProductById,
  deleteProducts,
} = require("../controllers/productController");

router.route("/products").get(getProduct);
router.route("/product/:id").get(getProductById);

router.route("/admin/product/new").post(newProduct);
router.route("/admin/product/:id").put(updateProduct);
router.route("/admin/product/:id").delete(deleteProductById);
router.route("/admin/products").delete(deleteProducts);

module.exports = router;
