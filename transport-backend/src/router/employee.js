import express from "express";
import {
  addNewEmployee,
  updateEmployee,
  getEmployee,
  getAllEmployees,
} from "../controller/employee.js";

const router = express.Router();

router.post("/", addNewEmployee);
router.put("/:id", updateEmployee);
router.get("/:id", getEmployee);
router.get("/", getAllEmployees);

export default router;
