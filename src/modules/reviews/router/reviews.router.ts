import { Router } from "express";
import reviewsController from "../controller/reviews.controller";

export const reviewsRouter: Router = Router();

reviewsRouter.get("/user_reviews", reviewsController.getUserReviews);
reviewsRouter.get("/work_reviews", reviewsController.getWorkReviews);
reviewsRouter.post("/user_reviews/:id", reviewsController.createUserReview);
reviewsRouter.post("/work_reviews/:id", reviewsController.createWorkReview);
