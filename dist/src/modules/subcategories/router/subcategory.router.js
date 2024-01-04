"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subCategoriesRouter = void 0;
const express_1 = require("express");
const subcategory_controller_js_1 = __importDefault(require("../controller/subcategory.controller.js"));
const auth_middle_js_1 = __importDefault(require("../../auth/middlewares/auth-middle.js"));
exports.subCategoriesRouter = (0, express_1.Router)();
exports.subCategoriesRouter.get("/sub_categories", subcategory_controller_js_1.default.getSubCategories);
exports.subCategoriesRouter.post("/sub_categories/:id", auth_middle_js_1.default.checkToken, subcategory_controller_js_1.default.createSubCategory);
