"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Catalog = void 0;
const mongoose_1 = require("mongoose");
let CatalogSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    items: {
        type: [{ code: String, value: String }],
        required: true
    }
});
CatalogSchema.index({ name: 1 }, { unique: true });
exports.Catalog = (0, mongoose_1.model)("Catalog", CatalogSchema);
