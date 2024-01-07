import { model } from "mongoose";
import { orderSchema, Order } from "../schema/order.schema";

export const orderModel = model<Order>("orders", orderSchema);
