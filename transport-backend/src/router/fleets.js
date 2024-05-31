import express from "express";
import {
  addFleet,
  deleteFleet,
  getAllFleets,
  getFleet,
  updateFleet,
} from "../controller/fleets";

const router = express.Router();

router.post("/", addFleet);
router.delete("/:id", deleteFleet);
router.put("/:id", updateFleet);
router.get("/:id", getFleet);
router.get("/", getAllFleets);

export default router;
