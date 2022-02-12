"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.State = void 0;
const mongoose_1 = require("mongoose");
let StateSchema = new mongoose_1.Schema({
    country: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Country',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    cities: {
        type: mongoose_1.Schema.Types.Array,
        ref: 'City'
    }
});
StateSchema.index({ country: 1, name: 1 }, { unique: true });
exports.State = (0, mongoose_1.model)("State", StateSchema);
