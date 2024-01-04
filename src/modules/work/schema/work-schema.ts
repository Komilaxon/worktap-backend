import { Schema, Types } from "mongoose";
import { Categories } from "../../categories/schemas/categories-schema";
import { User } from "../../user/schema/user-schema";
import { Reviews } from "../../reviews/schema/reviews.schema";

export interface Work {
  title: string;
  caption: string;
  image: string;
  offers_count: number;
  sum: number;
  rating: any;
  user?: User;
  categories?: Categories;
  reviews?: Array<Reviews>;
}

export const workSchema = new Schema({
  title: String,
  caption: String,
  image: String,
  offers_count: {
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
    default: 0,
  },
  sum: Number,
  user: { type: Schema.Types.ObjectId, ref: "users" },
  categories: { type: Schema.Types.ObjectId, ref: "categories" },
  reviews: [{ type: Schema.Types.ObjectId, ref: "reviews" }],
});
