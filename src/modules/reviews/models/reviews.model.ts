import { model } from "mongoose";
import { Reviews, reviewsSchema } from "../schema/reviews.schema";

export const reviewModel = model<Reviews>("reviews", reviewsSchema);
