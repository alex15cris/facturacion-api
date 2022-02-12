"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
let ProductSchema = new mongoose_1.Schema({
    company: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    category: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Category',
        required: false
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    code: {
        type: String,
        required: false,
        trim: true
    },
    auxCode: {
        type: String,
        required: false,
        trim: true
    },
    description: {
        type: String,
        required: false,
        trim: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    type: {
        type: String,
        required: false,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        default: 0.0
    },
    taxes: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'TaxValue',
        }],
    discount: {
        type: Number,
        required: false,
        default: 0.0
    }
});
ProductSchema.index({ company: 1, code: 1 }, { unique: true });
exports.Product = (0, mongoose_1.model)('Product', ProductSchema);
