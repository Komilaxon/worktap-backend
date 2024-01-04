"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewsRouter = void 0;
const express_1 = require("express");
const reviews_controller_1 = __importDefault(require("../controller/reviews.controller"));
exports.reviewsRouter = (0, express_1.Router)();
exports.reviewsRouter.get("/user_reviews", reviews_controller_1.default.getUserReviews);
exports.reviewsRouter.get("/work_reviews", reviews_controller_1.default.getWorkReviews);
exports.reviewsRouter.post("/user_reviews/:id", reviews_controller_1.default.createUserReview);
exports.reviewsRouter.post("/work_reviews/:id", reviews_controller_1.default.createWorkReview);
