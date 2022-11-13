import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import * as dotenv from "dotenv";
import { Router } from "./routes/DeliveryRoutes";
const app = express();
app.use(cors());
app.use(express.json());

dotenv.config();
mongoose
  .connect(
    "mongodb://mongo:824j2AX4zThZbRGAH96d@containers-us-west-117.railway.app:7926"
  )
  .then(() => {
    console.log("DB UP");
  })
  .catch((err) => {
    console.log(err.message);
  });

const server = app.listen(5000, () => {
  console.log(`Server started on port 5000`);
});


app.use("/api", Router);
