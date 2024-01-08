import { Schema, Types } from "mongoose";
import { Skill } from "../../skills/schema/skills-schema.js";
import { Categories } from "../../categories/schemas/categories-schema.js";
import { Reviews } from "../../reviews/schema/reviews.schema.js";
import { SubCategories } from "../../subcategories/schema/subcategories.schema.js";
import { Order } from "../../order/schema/order.schema.js";
import { Work } from "../../work/schema/work-schema.js";

export interface User {
  fullname: string;
  lastname: string;
  email: string;
  password: any;
  phone: string;
  isAdmin: boolean;
  image: string;
  info: string;
  region: string;
  role: string;
  in_site: Date | string;
  study: [string];
  rating: number;
  sertificate: [string];
  language: [string];
  categories: Categories;
  subcategories: SubCategories;
  skills: Skill;
  reviews: Array<Reviews>;
  orders: Array<Order>;
}

export const userSchema = new Schema<User>({
  fullname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  image: {
    type: String,
    default: null,
  },
  info: {
    type: String,
    default: null,
  },
  region: {
    type: String,
    default: null,
  },
  in_site: {
    type: String,
    default: Date.now(),
  },
  study: {
    type: [String],
    default: null,
  },
  rating: {
    type: Number,
    default: null,
  },
  role: {
    type: String,
    required: true,
  },
  sertificate: {
    type: [String],
    default: null,
  },
  language: {
    type: [String],
    default: null,
  },
  orders: [{ type: Schema.Types.ObjectId, ref: "orders" }],
  subcategories: { type: Schema.Types.ObjectId, ref: "sub_categories" },
  categories: { type: Schema.Types.ObjectId, ref: "categories" },
  skills: { type: Schema.Types.ObjectId, ref: "skills" },
  reviews: [{ type: Schema.Types.ObjectId, ref: "reviews" }],
});
