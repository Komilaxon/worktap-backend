import { Router } from "express";
import orderController from "../controller/order.controller";
import { upload } from "../../../utils/multer.js";

export const orderRouter: Router = Router();

orderRouter.get("/orders", orderController.getOrder);

orderRouter.post(
  "/orders/:id",
  upload.single("image"),
  orderController.createOrder
);