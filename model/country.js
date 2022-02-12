"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Country = void 0;
const mongoose_1 = require("mongoose");
let CountrySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    states: {
        type: mongoose_1.Schema.Types.Array,
        ref: 'State'
    }
});
CountrySchema.index({ name: 1 }, { unique: true });
exports.Country = (0, mongoose_1.model)("Country", CountrySchema);
