import express from "express"
import { Deliveries } from "../controller/DeliveryController";
export const Router = express.Router()

Router.all("/deliveries", Deliveries );
