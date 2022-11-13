import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import * as dotenv from "dotenv";
import { Router } from "./routes/DeliveryRoutes";
const PORT = process.env.PORT || 5000
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

const server = app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});


app.use("/api", Router);
