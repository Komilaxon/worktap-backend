import fs from "fs";
import path from "path";

import { Request, Response, NextFunction } from "express";
import { userModel } from "../model/user-model.js";

class UserController {
  async getUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const users = await userModel
        .find()
        .populate("categories")
        .populate("subcategories")
        .populate("skills")
        .exec();

      res.status(200).json({ msg: "OK", data: users, error: false });
    } catch (error: any) {
      error.code = 500;
      next(error);
    }
  }

  async getMe(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.headers;
      const findedUser = await userModel.findOne({ id }).populate("skills");
      res.status(200).json({ msg: "SUCCESS", data: findedUser, error: false });
    } catch (error: any) {
      error.code = 500;
      next(error);
    }
  }

  async updateUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const image = req.file?.filename;
      req.body.image = image;

      const error: any = new Error();

// Update user
      const user = await userModel
        .findOneAndUpdate({ _id: id }, req.body, {
          new: true,
        })
        .populate("skills");

      if (user) {
        const { filename }: any = req.file;

        fs.unlinkSync(path.join(path.resolve(), "uploads", filename));

        (error.message = "User image is already exist"),
          (error.code = 400),
          next(error);
      } else {
        error.message = "File information is missing";
        error.code = 400;
        next(error);
      }

      if (!user) {
        const error: any = new Error();
        (error.code = 404), (error.message = "User is not found"), next();
      }

      res.status(200).json({ msg: "UPDATED", data: user, error: false });
    } catch (error: any) {
      error.code = 500;
      next(error);
    }
  }

// o'zgartirish kk
  async updateUserRating(req: Request, res: Response, next: NextFunction) {
    try {
      let totalRating = 0;
      let numberOfRating = 0;
      const { rating } = req.body;
      const { id } = req.params;

      if (rating) {
        totalRating += rating;
        numberOfRating++;
      }
      const averageRating: any = totalRating / numberOfRating;
      console.log(averageRating.toFixed(2));

      const user = await userModel.findOneAndUpdate(
        { id },
        { $set: averageRating.toFixed(2) },
        {
          new: true,
        }
      );

      if (!user) {
        const error: any = new Error();
        (error.message = "User is not found"), (error.code = 404), next(error);
        return;
      }
      res
        .status(200)
        .json({ msg: "User rating is updated!", data: user, error: false });
    } catch (error: any) {
      error.code = 500;
      next(error);
    }
  }
}

export default new UserController();
