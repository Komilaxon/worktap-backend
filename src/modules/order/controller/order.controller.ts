import fs from "fs";
import path from "path";
import { Response, Request, NextFunction } from "express";
import { orderModel } from "../models/order.model.js";
import { userModel } from "../../user/model/user-model";
import { categoryModel } from "../../categories/models/categories-model";
import { subCategoryModel } from "../../subcategories/models/subcategory.model";
import { handleNotFound } from "../../../utils/error.handler.js";

class OrderController {
  async getOrder(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { page, limit }: any = req.query;
      const Cpage = parseInt(page) || 1;
      const Climit = parseInt(limit) || 10;

      const startIndex = (Cpage - 1) * Climit;
      const endIndex = Cpage * Climit;

      let orders: any = {};
      orders = await orderModel
        .find()
        .limit(Climit)
        .skip(startIndex)
        .populate("user")
        .populate({ path: "categories", select: "name" })
        .populate({ path: "sub_categories", select: "name" })
        .exec();

      if (endIndex < (await orderModel.countDocuments().exec())) {
        orders.next = {
          page: Cpage + 1,
          limit: Climit,
        };
      }

      if (startIndex > 0) {
        orders.previous = {
          page: Cpage - 1,
          limit: Climit,
        };
      }

      const error: any = new Error();
      if (!orders) {
        error.message = "Orders are not found";
        error.code = 404;
        next(error);
        return;
      }

      res.status(200).json({ msg: "OK", data: orders, error: false });
    } catch (error: any) {
      error.code = 500;
      next(error);
    }
  }

  async createOrder(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const { categories, subcategories } = req.body;
      const user = await userModel.findOne({ _id: id });
      const findedCategory = await categoryModel.findOne({
        _id: categories,
      });
      const findedSubcategory = await subCategoryModel.findOne({
        _id: subcategories,
      });

      const error: any = new Error();

      if (!user || !findedCategory || !findedSubcategory) {
        handleNotFound(error, "Not found", 404, next);
        return;
      }

      // Create order

      const orders = await new orderModel({
        image: req.file?.filename,
        title: req.body.title,
        caption: req.body.caption,
        time: req.body.time,
        user: user._id,
        categories: findedCategory?._id,
        sub_categories: findedSubcategory._id,
      }).save();

      // If image is exist

      if (req.file) {
        const { filename }: any = req.file;
        const filePath = path.join(path.resolve(), "uploads", filename);

        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
        user.orders?.push(orders);
        await user.save();

        res.status(201).json({ msg: "CREATED", data: orders, error: false });
      } else {
        error.message = "File information is missing";
        error.code = 400;
        next(error);
        return;
      }
    } catch (error: any) {
      error.code = 500;
      next(error);
    }
  }
}

export default new OrderController();
