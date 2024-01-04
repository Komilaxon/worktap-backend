import { Schema, Types } from "mongoose";
import { Categories } from "../../categories/schemas/categories-schema";
import { User } from "../../user/schema/user-schema";
import { Reviews } from "../../reviews/schema/reviews.schema";
import { SubCategories } from "../../subcategories/schema/subcategories.schema";
import { Skill } from "../../skills/schema/skills-schema";

export interface Work {
  title: string;
  caption: string;
  image: string;
  offers_count: number;
  sum: number;
  rating: any;
  user?: User;
  categories?: Categories;
  sub_categories?: SubCategories;
  skills?: Skill,
  reviews?: Array<Reviews>;
  desc: string,
  questions: [{ question: string, answer: string }],
  requirements: string,
  gallery: [string],
  files: [string]
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
