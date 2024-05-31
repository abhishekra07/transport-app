import express from "express";
import {
  createParty,
  updateParty,
  getAllParties,
  deleteParty,
} from "./party.js";

const router = express.Router();

router.post("/", createParty);
router.put("/:id", updateParty);
router.get("/", getAllParties);
router.delete("/:id", deleteParty);

export default router;
