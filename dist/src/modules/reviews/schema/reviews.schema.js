"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewsSchema = void 0;
const mongoose_1 = require("mongoose");
exports.reviewsSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    from_to: { type: mongoose_1.Types.ObjectId, ref: "users" },
    user: { type: mongoose_1.Types.ObjectId, ref: "users" },
    work: { type: mongoose_1.Types.ObjectId, ref: "works" },
});
