import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import employeeRouter from "./src/router/employee.js";
import usersRouter from "./src/router/users.js";
import productRouter from "./src/router/product.js";
import fleetsRouter from "./src/router/fleets.js";
import partyRouter from "./src/router/party.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1/employees", employeeRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/fleets", fleetsRouter);
app.use("/api/v1/inventory-movements", fleetsRouter);
app.use("/api/v1/parties", partyRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
