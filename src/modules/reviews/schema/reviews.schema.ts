import { Schema, Types } from "mongoose";
import { User } from "../../user/schema/user-schema";
import { Work } from "../../work/schema/work-schema";

export interface Reviews {
  title: string;
  user?: User;
  work?: Work;
  from_to?: User;
}

export const reviewsSchema = new Schema<Reviews>({
  title: {
    type: String,
    required: true,
  },

  from_to: { type: Types.ObjectId, ref: "users" },
  user: { type: Types.ObjectId, ref: "users" },
  work: { type: Types.ObjectId, ref: "works" },
});
