import { Schema, Types } from "mongoose";
import { Categories } from "../../categories/schemas/categories-schema";
import { User } from "../../user/schema/user-schema";
import { Reviews } from "../../reviews/schema/reviews.schema";
import { SubCategories } from "../../subcategories/schema/subcategories.schema";
import { Skill } from "../../skills/schema/skills-schema";

export interface Work {
  title: string;
  caption: string;
  offers_count: number;
  sum: number;
  rating: any;
  user?: User;
  categories?: Categories;
  sub_categories?: SubCategories;
  skills?: Array<Skill>;
  reviews?: Array<Reviews>;
  desc?: string;
  questions?: [{ question: string; answer: string }];
  requirements?: string;
  images: [string];
  files?: [string];
  youtube_link: string
}

export const workSchema = new Schema<Work>({
  title: String,
  caption: String,
  desc: String,
  questions: Array,
  requirements: String,
  images: Array<String>,
  files: Array<String>,
  sum: Number,
  offers_count: {
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
    default: 0,
  },
  youtube_link: {
    type: String,
    default: ""
  },
  user: { type: Schema.Types.ObjectId, ref: "users" },
  categories: { type: Schema.Types.ObjectId, ref: "categories" },
  sub_categories: { type: Schema.Types.ObjectId, ref: "sub_categories" },
  skills: [{ type: Schema.Types.ObjectId, ref: "skills" }],
  reviews: [{ type: Schema.Types.ObjectId, ref: "reviews" }],
});
