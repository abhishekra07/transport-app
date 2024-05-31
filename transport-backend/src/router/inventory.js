import express from "express";
import {
  createInventoryMovement,
  updateInventoryMovement,
  getAllInventoryMovements,
} from "../controller/inventory.js";

const router = express.Router();

router.post("/", createInventoryMovement);
router.put("/:id", updateInventoryMovement);
router.get("/", getAllInventoryMovements);

export default router;
