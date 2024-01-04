import { Router } from "express";
import subcategoryController from "../controller/subcategory.controller.js";
import authMiddle from "../../auth/middlewares/auth-middle.js";
export const subCategoriesRouter: Router = Router();

subCategoriesRouter.get(
  "/sub_categories",
  subcategoryController.getSubCategories
);

subCategoriesRouter.post(
  "/sub_categories/:id",
  authMiddle.checkToken,
  subcategoryController.createSubCategory
);
