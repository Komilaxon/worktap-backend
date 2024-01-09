import { Schema, Types } from "mongoose";
import { Categories } from "../../categories/schemas/categories-schema";
import { SubCategories } from "../../subcategories/schema/subcategories.schema";
import { User } from "../../user/schema/user-schema";

export interface Order {
  title: string;
  caption: string;
  files: [string];
  time: number;
  user?: User;
  categories?: Categories;
  sub_categories?: SubCategories;
}

export const orderSchema = new Schema<Order>({
  title: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    required: true,
  },
  files: {
    type: [String],
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
  user: { type: Schema.Types.ObjectId, ref: "users" },
  categories: { type: Schema.Types.ObjectId, ref: "categories" },
  sub_categories: { type: Schema.Types.ObjectId, ref: "sub_categories" },
});
