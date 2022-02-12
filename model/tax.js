"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tax = void 0;
const mongoose_1 = require("mongoose");
let TaxSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    }
});
TaxSchema.index({ name: 1 }, { unique: true });
exports.Tax = (0, mongoose_1.model)("Tax", TaxSchema);
