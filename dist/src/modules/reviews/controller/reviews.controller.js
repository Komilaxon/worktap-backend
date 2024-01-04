"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const reviews_model_1 = require("../models/reviews.model");
const user_model_1 = require("../../user/model/user-model");
const work_model_1 = require("../../work/models/work-model");
class ReviewsController {
    getUserReviews(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reviews = yield reviews_model_1.reviewModel.find().populate("user").exec();
                res.status(200).json({ msg: "OK", data: reviews, error: false });
            }
            catch (error) {
                error.code = 500;
                next(error);
            }
        });
    }
    getWorkReviews(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reviews = yield reviews_model_1.reviewModel.find().populate("work").exec();
                res.status(200).json({ msg: "OK", data: reviews, error: false });
            }
            catch (error) {
                error.code = 500;
                next(error);
            }
        });
    }
    createUserReview(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { userId } = req.body;
                const to_user = yield user_model_1.userModel.findOne({ _id: id });
                const from_user = yield user_model_1.userModel.findOne({ _id: userId });
                const error = new Error();
                if (!to_user || !from_user) {
                    error.message = "User is not found";
                    error.code = 404;
                    next(error);
                    return;
                }
                const reviews = yield new reviews_model_1.reviewModel({
                    title: req.body.title,
                    from_to: from_user,
                    user: to_user,
                }).save();
                (_a = to_user.reviews) === null || _a === void 0 ? void 0 : _a.push(reviews);
                yield to_user.save();
                res.status(201).json({ msg: "CREATED", data: reviews, error: false });
            }
            catch (error) {
                error.code = 500;
                next(error);
            }
        });
    }
    createWorkReview(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { userId } = req.body;
                const work = yield work_model_1.workModel.findOne({ _id: id });
                console.log(work);
                const error = new Error();
                if (!work) {
                    error.message = "Work is not found";
                    error.code = 404;
                    next(error);
                    return;
                }
                const reviews = yield new reviews_model_1.reviewModel({
                    title: req.body.title,
                    from_to: userId,
                    work: work,
                }).save();
                (_a = work.reviews) === null || _a === void 0 ? void 0 : _a.push(reviews);
                yield work.save();
                res.status(201).json({ msg: "CREATED", data: reviews, error: false });
            }
            catch (error) {
                error.code = 500;
                next(error);
            }
        });
    }
}
exports.default = new ReviewsController();
