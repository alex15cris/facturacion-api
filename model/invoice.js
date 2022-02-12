"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Invoice = void 0;
const mongoose_1 = require("mongoose");
let InvoiceSchema = new mongoose_1.Schema({
    company: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    establishment: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Establishment',
        required: true
    },
    branch: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Branch',
        required: true
    },
    customer: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    taxId: {
        type: String,
        required: true
    },
    secuence: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
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
    },
    detail: {
        type: mongoose_1.Schema.Types.Array,
        ref: 'InvoiceDetail'
    },
    payments: [{
            code: {
                type: String,
                required: true,
                trim: true
            },
            description: {
                type: String,
                required: false,
                trim: true
            },
            value: {
                type: Number,
                required: true,
                default: 0
            }
        }]
});
InvoiceSchema.index({ company: 1, secuence: 1 }, { unique: true });
exports.Invoice = (0, mongoose_1.model)("Invoice", InvoiceSchema);
