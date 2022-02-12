"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceDetail = void 0;
const mongoose_1 = require("mongoose");
let InvoiceDetailSchema = new mongoose_1.Schema({
    company: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    invoice: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Invoice',
        required: true
    },
    product: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    price: {
        type: Number,
        required: true,
        default: 0.0
    },
    quantity: {
        type: Number,
        required: true,
        default: 0.0
    },
    totalWithoutTax: {
        type: Number,
        required: true,
        default: 0.0
    },
    total: {
        type: Number,
        required: true,
        default: 0.0
    }
});
InvoiceDetailSchema.index({ company: 1, invoice: 1, product: 1 }, { unique: true });
exports.InvoiceDetail = (0, mongoose_1.model)("InvoiceDetail", InvoiceDetailSchema);
