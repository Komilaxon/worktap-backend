import { NextFunction, Request, Response } from "express";
import { reviewModel } from "../models/reviews.model";
import { Types } from "mongoose";
import { userModel } from "../../user/model/user-model";
import { workModel } from "../../work/models/work-model";

class ReviewsController {
  async getUserReviews(req: Request, res: Response, next: NextFunction) {
    try {
      const reviews = await reviewModel.find().populate("user").exec();
      res.status(200).json({ msg: "OK", data: reviews, error: false });
    } catch (error: any) {
      error.code = 500;
      next(error);
    }
  }

  async getWorkReviews(req: Request, res: Response, next: NextFunction) {
    try {
      const reviews = await reviewModel.find().populate("work").exec();
      res.status(200).json({ msg: "OK", data: reviews, error: false });
    } catch (error: any) {
      error.code = 500;
      next(error);
    }
  }

  async createUserReview(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { userId } = req.body;
      const to_user = await userModel.findOne({ _id: id });
      const from_user = await userModel.findOne({ _id: userId });

      const error: any = new Error();

      if (!to_user || !from_user) {
        error.message = "User is not found";
        error.code = 404;
        next(error);
        return;
      }

      const reviews = await new reviewModel({
        title: req.body.title,
        from_to: from_user,
        user: to_user,
      }).save();

      to_user.reviews?.push(reviews);

      await to_user.save();

      res.status(201).json({ msg: "CREATED", data: reviews, error: false });
    } catch (error: any) {
      error.code = 500;
      next(error);
    }
  }

  async createWorkReview(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { userId } = req.body;
      const work = await workModel.findOne({ _id: id });
      console.log(work);

      const error: any = new Error();

      if (!work) {
        error.message = "Work is not found";
        error.code = 404;
        next(error);
        return;
      }

      const reviews = await new reviewModel({
        title: req.body.title,
        from_to: userId,
        work: work,
      }).save();

      work.reviews?.push(reviews);

      await work.save();

      res.status(201).json({ msg: "CREATED", data: reviews, error: false });
    } catch (error: any) {
      error.code = 500;
      next(error);
    }
  }
}

export default new ReviewsController();