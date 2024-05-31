import express from "express";
import {
  addProduct,
  deleteProduct,
  updateProduct,
  getProduct,
  getAllProducts,
} from "../controller/product.js";

const router = express.Router();

router.post("/", addProduct);
router.delete("/:id", deleteProduct);
router.put("/:id", updateProduct);
router.get("/:id", getProduct);
router.get("/", getAllProducts);

export default router;
