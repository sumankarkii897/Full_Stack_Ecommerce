const express = require("express");
const { authenticateUser } = require("../middleware/authMiddleware");
const {
  createProduct,
  getAllProduct,
  getProductById,
} = require("../controllers/productController");
const router = express.Router();

router.post("/", createProduct);
router.get("/", authenticateUser, getAllProduct);
router.get("/:id", authenticateUser, getProductById);

module.exports = router;
