"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaxValue = void 0;
const mongoose_1 = require("mongoose");
let TaxValueSchema = new mongoose_1.Schema({
    company: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    tax: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: false,
        trim: true
    },
    percentage: {
        type: Number,
        required: true
    },
    retention: {
        type: Number,
        required: false
    },
    description: {
        type: String,
        required: false,
        trim: true
    },
    type: {
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
exports.TaxValue = (0, mongoose_1.model)("TaxValue", TaxValueSchema);
