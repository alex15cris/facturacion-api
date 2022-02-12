"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductCategory = void 0;
const mongoose_1 = require("mongoose");
let ProductCategorySchema = new mongoose_1.Schema({
    company: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: false,
        trim: true
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    }
});
ProductCategorySchema.index({ company: 1, name: 1 }, { unique: true });
exports.ProductCategory = (0, mongoose_1.model)('ProductCategory', ProductCategorySchema);
