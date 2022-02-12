"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.City = void 0;
const mongoose_1 = require("mongoose");
let CitySchema = new mongoose_1.Schema({
    state: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'State',
        required: true
    },
    name: {
        type: String,
        required: true
    }
});
CitySchema.index({ state: 1, name: 1 }, { unique: true });
exports.City = (0, mongoose_1.model)("City", CitySchema);
