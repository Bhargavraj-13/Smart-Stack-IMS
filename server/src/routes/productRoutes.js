import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  sellProduct,
  restockProduct,
  getMostSoldProductToday
} from "../controllers/productController.js";

const router = express.Router();

router.get("/most-sold-today", getMostSoldProductToday);
router.post("/", createProduct);
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.patch("/:id/sell", sellProduct);
router.patch("/:id/restock", restockProduct);

export default router;