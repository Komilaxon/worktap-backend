import { mongo } from "mongoose";
import jwt from "../../../utils/jwt.js";
import { NextFunction, Request, Response } from "express";
import { userModel } from "../../user/model/user-model.js";
import bcryptHook from "../../../utils/bcrypt-hook.js";
import { saltOrRounds } from "../../../utils/constants.js";
import { handleNotFound } from "../../../utils/error.handler.js";

class AuthController {
  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;

      const user = await userModel.findOne({ email });

      const comparedPass = bcryptHook.compareSync(password, user?.password);

      const error: any = new Error();

      if (!user || !comparedPass) {
        handleNotFound(error, "User is not found", 404, next);
        return;
      }
      const TOKEN = jwt.sign({ id: user._id, isAdmin: user.isAdmin });

      res.status(200).json({ msg: "OK", data: TOKEN, error: false });
    } catch (error: any) {
      error.code = 500;
      next(error);
    }
  }

  async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      req.body.password = bcryptHook.hashSync(req.body.password, saltOrRounds);

      const { fullname, password, email, lastname, phone } = req.body;
      const user = await userModel.create({
        fullname,
        email,
        password,
        lastname,
        phone,
      });

      const TOKEN = jwt.sign({ id: user._id, isAdmin: user.isAdmin });

      res.status(201).json({ msg: "CREATED", data: TOKEN, error: false });
    } catch (error: any) {
      if (error instanceof mongo.MongoServerError) {
        error.message = "User is already exist";
        error.code = 409;
        next(error);
        return;
      }
      error.code = 500;
      next(error);
    }
  }
}

export default new AuthController();
