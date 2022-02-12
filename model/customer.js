"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customer = void 0;
const mongoose_1 = require("mongoose");
let CustomerSchema = new mongoose_1.Schema({
    company: {
        type: mongoose_1.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    firstName: {
        type: String,
        required: false,
        trim: true
    },
    lastName: {
        type: String,
        required: false,
        trim: true
    },
    phone: {
        type: String,
        required: false,
        trim: true
    },
    taxIdType: {
        type: String,
        required: true,
        trim: true
    },
    taxId: {
        type: String,
        required: true,
        minlength: [10, 'taxId not valid min lenght should be 10'],
        trim: true
    },
    address: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    type: {
        type: String,
        required: false
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    }
});
CustomerSchema.index({ company: 1, taxId: 1 }, { unique: true });
exports.Customer = (0, mongoose_1.model)("Customer", CustomerSchema);
