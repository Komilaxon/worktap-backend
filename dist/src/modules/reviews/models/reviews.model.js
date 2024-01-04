"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewModel = void 0;
const mongoose_1 = require("mongoose");
const reviews_schema_1 = require("../schema/reviews.schema");
exports.reviewModel = (0, mongoose_1.model)("reviews", reviews_schema_1.reviewsSchema);
